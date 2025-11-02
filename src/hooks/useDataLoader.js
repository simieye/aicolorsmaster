
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCache } from './useCache';
import { useToast } from '@/components/ui';

/**
 * 数据加载 Hook
 * 提供统一的数据加载、缓存和错误处理机制
 * @param {Object} config - 配置对象
 * @returns {Object} 加载状态和数据
 */
export function useDataLoader(config) {
  const {
    type,
    key,
    loader,
    options = {},
    autoLoad = true,
    retryCount = 3,
    retryDelay = 1000,
    showErrorToast = true,
    successMessage,
    errorMessage
  } = config;

  const { toast } = useToast();
  const [retryAttempts, setRetryAttempts] = useState(0);
  const abortControllerRef = useRef(null);

  // 包装加载器以支持取消请求
  const wrappedLoader = useCallback(async (...args) => {
    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();

    try {
      const result = await loader(...args, {
        signal: abortControllerRef.current.signal
      });
      setRetryAttempts(0);
      
      if (successMessage) {
        toast({
          title: "成功",
          description: successMessage,
          variant: "default"
        });
      }
      
      return result;
    } catch (error) {
      // 如果是取消错误，不重试
      if (error.name === 'AbortError') {
        throw error;
      }

      // 重试逻辑
      if (retryAttempts < retryCount) {
        setRetryAttempts(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, retryDelay * (retryAttempts + 1)));
        return wrappedLoader(...args);
      }

      // 显示错误提示
      if (showErrorToast) {
        toast({
          title: "加载失败",
          description: errorMessage || error.message || '数据加载失败',
          variant: "destructive"
        });
      }

      throw error;
    }
  }, [loader, retryAttempts, retryCount, showErrorToast, errorMessage, successMessage, toast]);

  // 使用缓存 Hook
  const cacheResult = useCache(type, key, wrappedLoader, {
    ...options,
    dependencies: [retryAttempts]
  });

  // 手动加载
  const load = useCallback(async (...args) => {
    try {
      return await cacheResult.refresh(...args);
    } catch (error) {
      throw error;
    }
  }, [cacheResult]);

  // 取消加载
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // 重置重试次数
  const resetRetry = useCallback(() => {
    setRetryAttempts(0);
  }, []);

  // 清理
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...cacheResult,
    load,
    cancel,
    retryAttempts,
    resetRetry,
    canRetry: retryAttempts < retryCount
  };
}

/**
 * 批量数据加载 Hook
 * @param {Array} configs - 配置数组
 * @returns {Object} 批量加载结果
 */
export function useBatchDataLoader(configs) {
  const [loadingStates, setLoadingStates] = useState({});
  const [errors, setErrors] = useState({});

  const results = {};

  configs.forEach((config, index) => {
    const key = config.key || `loader_${index}`;
    results[key] = useDataLoader(config);
  });

  // 批量加载
  const loadAll = useCallback(async () => {
    const promises = Object.entries(results).map(([key, loader]) => 
      loader.load().catch(error => {
        setErrors(prev => ({ ...prev, [key]: error }));
        return null;
      })
    );

    setLoadingStates(Object.keys(results).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {}));

    try {
      const results = await Promise.allSettled(promises);
      return results;
    } finally {
      setLoadingStates({});
    }
  }, [results]);

  // 批量重试
  const retryAll = useCallback(() => {
    Object.values(results).forEach(loader => {
      if (loader.canRetry) {
        loader.load();
      }
    });
  }, [results]);

  // 批量取消
  const cancelAll = useCallback(() => {
    Object.values(results).forEach(loader => {
      loader.cancel();
    });
  }, [results]);

  return {
    ...results,
    loadingStates,
    errors,
    loadAll,
    retryAll,
    cancelAll,
    isAnyLoading: Object.values(loadingStates).some(Boolean),
    hasErrors: Object.keys(errors).length > 0
  };
}

/**
 * 分页数据加载 Hook
 * @param {Object} config - 配置对象
 * @returns {Object} 分页加载结果
 */
export function usePaginatedDataLoader(config) {
  const {
    type,
    key,
    loader,
    pageSize = 20,
    options = {}
  } = config;

  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // 分页加载器
  const paginatedLoader = useCallback(async (pageNum = 1, opts = {}) => {
    const result = await loader(pageNum, pageSize, opts);
    return result;
  }, [loader, pageSize]);

  const cacheKey = `${key}_page_${page}`;
  const cacheResult = useDataLoader({
    type,
    key: cacheKey,
    loader: () => paginatedLoader(page),
    options: {
      ...options,
      staleWhileRevalidate: true
    }
  });

  // 加载下一页
  const loadNext = useCallback(async () => {
    if (!hasMore || cacheResult.loading) return;

    const nextPage = page + 1;
    try {
      const result = await paginatedLoader(nextPage);
      
      if (result.data && result.data.length > 0) {
        setAllData(prev => [...prev, ...result.data]);
        setPage(nextPage);
        setHasMore(result.data.length === pageSize);
        setTotalCount(result.totalCount || totalCount + result.data.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('加载下一页失败:', error);
    }
  }, [page, hasMore, cacheResult.loading, paginatedLoader, pageSize, totalCount]);

  // 重置分页
  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    setTotalCount(0);
    cacheResult.clearCache();
  }, [cacheResult]);

  // 刷新
  const refresh = useCallback(async () => {
    reset();
    return cacheResult.refresh();
  }, [reset, cacheResult]);

  return {
    ...cacheResult,
    data: allData,
    page,
    hasMore,
    totalCount,
    loadNext,
    reset,
    refresh,
    isLoadingMore: cacheResult.loading && page > 1
  };
}

export default useDataLoader;
