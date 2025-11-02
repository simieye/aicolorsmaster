
// @ts-ignore;
import { useCallback, useEffect, useState } from 'react';
// @ts-ignore;
import { globalCache, CACHE_TTL } from '@/lib/DataCache';

// 自定义Hook：数据缓存管理
export function useDataCache(options = {}) {
  const {
    key,
    fetcher,
    ttl = CACHE_TTL.MEDIUM,
    dependencies = [],
    immediate = true,
    staleWhileRevalidate = false
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 执行数据获取
  const execute = useCallback(async (forceRefresh = false) => {
    if (!key || !fetcher) return;

    try {
      setLoading(true);
      setError(null);

      // 尝试从缓存获取
      if (!forceRefresh) {
        const cachedData = globalCache.get(key);
        if (cachedData) {
          setData(cachedData);
          setLastUpdated(Date.now());
          
          // 如果启用staleWhileRevalidate，在后台更新数据
          if (staleWhileRevalidate) {
            setTimeout(async () => {
              try {
                const freshData = await fetcher();
                globalCache.set(key, freshData, ttl);
                setData(freshData);
                setLastUpdated(Date.now());
              } catch (err) {
                console.warn('Background refresh failed:', err);
              }
            }, 100);
          }
          
          setLoading(false);
          return cachedData;
        }
      }

      // 获取新数据
      const freshData = await fetcher();
      globalCache.set(key, freshData, ttl);
      setData(freshData);
      setLastUpdated(Date.now());
      
      return freshData;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl, staleWhileRevalidate]);

  // 刷新数据
  const refresh = useCallback(() => {
    return execute(true);
  }, [execute]);

  // 使缓存失效
  const invalidate = useCallback(() => {
    if (key) {
      globalCache.delete(key);
      setData(null);
      setLastUpdated(null);
    }
  }, [key]);

  // 预加载数据
  const preload = useCallback(async () => {
    if (key && fetcher && !globalCache.has(key)) {
      try {
        const data = await fetcher();
        globalCache.set(key, data, ttl);
        return data;
      } catch (err) {
        console.error('Preload failed:', err);
        throw err;
      }
    }
  }, [key, fetcher, ttl]);

  // 检查数据是否新鲜
  const isFresh = useCallback(() => {
    return key ? globalCache.has(key) : false;
  }, [key]);

  // 初始化数据加载
  useEffect(() => {
    if (immediate && key && fetcher) {
      execute();
    }
  }, [immediate, key, fetcher, execute, ...dependencies]);

  // 监听缓存变化
  useEffect(() => {
    if (!key) return;

    const handleCacheChange = (newData) => {
      setData(newData);
      setLastUpdated(Date.now());
    };

    globalCache.addListener(key, handleCacheChange);

    return () => {
      globalCache.removeListener(key, handleCacheChange);
    };
  }, [key]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    execute,
    refresh,
    invalidate,
    preload,
    isFresh
  };
}

// Hook for multiple cache keys
export function useMultiDataCache(configs = []) {
  const [states, setStates] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);

  const executeAll = useCallback(async (forceRefresh = false) => {
    setGlobalLoading(true);
    const results = {};

    try {
      await Promise.all(
        configs.map(async (config) => {
          const { key, fetcher, ttl = CACHE_TTL.MEDIUM } = config;
          
          try {
            if (!forceRefresh) {
              const cachedData = globalCache.get(key);
              if (cachedData) {
                results[key] = cachedData;
                setStates(prev => ({
                  ...prev,
                  [key]: {
                    data: cachedData,
                    loading: false,
                    error: null,
                    lastUpdated: Date.now()
                  }
                }));
                return;
              }
            }

            const freshData = await fetcher();
            globalCache.set(key, freshData, ttl);
            results[key] = freshData;
            
            setStates(prev => ({
              ...prev,
              [key]: {
                data: freshData,
                loading: false,
                error: null,
                lastUpdated: Date.now()
              }
            }));
          } catch (err) {
            setStates(prev => ({
              ...prev,
              [key]: {
                data: null,
                loading: false,
                error: err,
                lastUpdated: null
              }
            }));
          }
        })
      );
    } finally {
      setGlobalLoading(false);
    }

    return results;
  }, [configs]);

  const refreshAll = useCallback(() => {
    return executeAll(true);
  }, [executeAll]);

  const invalidateAll = useCallback(() => {
    configs.forEach(config => {
      if (config.key) {
        globalCache.delete(config.key);
      }
    });
    setStates({});
  }, [configs]);

  useEffect(() => {
    executeAll();
  }, [executeAll]);

  return {
    states,
    globalLoading,
    executeAll,
    refreshAll,
    invalidateAll
  };
}

// Hook for paginated data with cache
export function usePaginatedCache(options = {}) {
  const {
    baseKey,
    fetcher,
    ttl = CACHE_TTL.MEDIUM,
    pageSize = 20,
    dependencies = []
  } = options;

  const [pages, setPages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const getPageKey = useCallback((page) => `${baseKey}_page_${page}`, [baseKey]);

  const loadPage = useCallback(async (page, forceRefresh = false) => {
    const pageKey = getPageKey(page);
    
    try {
      setLoading(true);
      setError(null);

      if (!forceRefresh) {
        const cachedData = globalCache.get(pageKey);
        if (cachedData) {
          setPages(prev => ({
            ...prev,
            [page]: cachedData
          }));
          setLoading(false);
          return cachedData;
        }
      }

      const data = await fetcher(page, pageSize);
      globalCache.set(pageKey, data, ttl);
      
      setPages(prev => ({
        ...prev,
        [page]: data
      }));

      setHasMore(data.length === pageSize);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseKey, fetcher, ttl, pageSize, getPageKey]);

  const loadNextPage = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      return loadPage(nextPage);
    }
  }, [currentPage, hasMore, loading, loadPage]);

  const refresh = useCallback(() => {
    return loadPage(currentPage, true);
  }, [currentPage, loadPage]);

  const invalidate = useCallback(() => {
    // 清理所有分页缓存
    Object.keys(pages).forEach(page => {
      const pageKey = getPageKey(parseInt(page.split('_').pop()));
      globalCache.delete(pageKey);
    });
    setPages({});
    setCurrentPage(1);
  }, [pages, getPageKey]);

  // 获取所有已加载的数据
  const allData = useMemo(() => {
    return Object.values(pages).flat();
  }, [pages]);

  useEffect(() => {
    loadPage(1);
  }, [loadPage, ...dependencies]);

  return {
    data: allData,
    pages,
    currentPage,
    loading,
    error,
    hasMore,
    loadPage,
    loadNextPage,
    refresh,
    invalidate,
    setCurrentPage
  };
}

export default useDataCache;
