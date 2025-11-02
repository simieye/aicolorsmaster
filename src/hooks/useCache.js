
import { useState, useEffect, useCallback } from 'react';
import cacheManager from '@/lib/CacheManager';

/**
 * 缓存 Hook
 * 提供React组件中使用缓存的功能
 * @param {string} type - 数据类型
 * @param {string} key - 缓存键
 * @param {Function} loader - 数据加载函数
 * @param {Object} options - 配置选项
 * @returns {Object} 缓存数据和操作方法
 */
export function useCache(type, key, loader, options = {}) {
  const {
    ttl,
    dependencies = [],
    enabled = true,
    staleWhileRevalidate = false,
    onSuccess,
    onError
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 从缓存加载数据
  const loadFromCache = useCallback(() => {
    if (!enabled) return null;
    return cacheManager.get(type, key);
  }, [type, key, enabled]);

  // 设置缓存数据
  const setCacheData = useCallback((newData, customTTL) => {
    if (!enabled) return;
    cacheManager.set(type, key, newData, customTTL || ttl);
    setData(newData);
    setLastUpdated(Date.now());
  }, [type, key, ttl, enabled]);

  // 清除缓存
  const clearCache = useCallback(() => {
    if (!enabled) return;
    cacheManager.delete(type, key);
    setData(null);
    setError(null);
    setLastUpdated(null);
  }, [type, key, enabled]);

  // 刷新数据
  const refresh = useCallback(async () => {
    if (!enabled || !loader) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await loader();
      setCacheData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loader, setCacheData, onSuccess, onError, enabled]);

  // 初始化加载
  useEffect(() => {
    if (!enabled) return;

    const cachedData = loadFromCache();
    
    if (cachedData !== null) {
      setData(cachedData);
      setLastUpdated(Date.now());
      
      // 如果启用了 stale-while-revalidate，在后台刷新数据
      if (staleWhileRevalidate && loader) {
        refresh().catch(() => {
          // 静默失败，不显示错误
        });
      }
    } else if (loader) {
      // 没有缓存数据，直接加载
      refresh();
    }
  }, [type, key, ...dependencies]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    clearCache,
    setCacheData,
    isFromCache: data !== null && !loading
  };
}

/**
 * 多缓存 Hook
 * 管理多个相关的缓存项
 * @param {Array} cacheConfigs - 缓存配置数组
 * @returns {Object} 多个缓存数据和操作方法
 */
export function useMultiCache(cacheConfigs) {
  const [states, setStates] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);

  const results = {};

  cacheConfigs.forEach(({ type, key, loader, options = {} }) => {
    const cacheResult = useCache(type, key, loader, options);
    results[`${type}_${key}`] = cacheResult;
  });

  // 批量刷新
  const refreshAll = useCallback(async () => {
    setGlobalLoading(true);
    try {
      const promises = Object.values(results).map(result => 
        result.refresh ? result.refresh() : Promise.resolve()
      );
      await Promise.allSettled(promises);
    } finally {
      setGlobalLoading(false);
    }
  }, [results]);

  // 批量清除
  const clearAll = useCallback(() => {
    Object.values(results).forEach(result => {
      if (result.clearCache) {
        result.clearCache();
      }
    });
  }, [results]);

  return {
    ...results,
    refreshAll,
    clearAll,
    globalLoading
  };
}

/**
 * 缓存统计 Hook
 * @returns {Object} 缓存统计信息
 */
export function useCacheStats() {
  const [stats, setStats] = useState(null);

  const updateStats = useCallback(() => {
    const cacheStats = cacheManager.getStats();
    setStats(cacheStats);
  }, []);

  useEffect(() => {
    updateStats();
    
    // 定期更新统计信息
    const interval = setInterval(updateStats, 30000); // 30秒
    return () => clearInterval(interval);
  }, [updateStats]);

  return {
    stats,
    updateStats,
    clearAll: () => {
      cacheManager.clearAll();
      updateStats();
    },
    clearType: (type) => {
      cacheManager.clearType(type);
      updateStats();
    }
  };
}

export default useCache;
