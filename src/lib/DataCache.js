
// 数据缓存管理器
class DataCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 默认缓存5分钟
    this.listeners = new Map();
  }

  // 设置缓存
  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now() + ttl);
    this.notifyListeners(key, data);
  }

  // 获取缓存
  get(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp || Date.now() > timestamp) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  // 删除缓存
  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
    this.notifyListeners(key, null);
  }

  // 检查缓存是否存在且有效
  has(key) {
    const timestamp = this.timestamps.get(key);
    return timestamp && Date.now() <= timestamp;
  }

  // 清空所有缓存
  clear() {
    this.cache.clear();
    this.timestamps.clear();
    this.listeners.clear();
  }

  // 获取缓存大小
  size() {
    return this.cache.size;
  }

  // 获取所有缓存键
  keys() {
    return Array.from(this.cache.keys());
  }

  // 清理过期缓存
  cleanup() {
    const now = Date.now();
    for (const [key, timestamp] of this.timestamps.entries()) {
      if (now > timestamp) {
        this.delete(key);
      }
    }
  }

  // 添加缓存变化监听器
  addListener(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
  }

  // 移除缓存变化监听器
  removeListener(key, callback) {
    const keyListeners = this.listeners.get(key);
    if (keyListeners) {
      keyListeners.delete(callback);
      if (keyListeners.size === 0) {
        this.listeners.delete(key);
      }
    }
  }

  // 通知监听器
  notifyListeners(key, data) {
    const keyListeners = this.listeners.get(key);
    if (keyListeners) {
      keyListeners.forEach(callback => callback(data, key));
    }
  }

  // 获取缓存统计信息
  getStats() {
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;

    for (const [key, timestamp] of this.timestamps.entries()) {
      if (now <= timestamp) {
        validCount++;
      } else {
        expiredCount++;
      }
    }

    return {
      total: this.cache.size,
      valid: validCount,
      expired: expiredCount,
      keys: this.keys()
    };
  }

  // 预热缓存
  async warmup(cacheConfigs) {
    const promises = cacheConfigs.map(async config => {
      const { key, fetcher, ttl } = config;
      try {
        if (!this.has(key)) {
          const data = await fetcher();
          this.set(key, data, ttl);
          return { key, success: true };
        }
        return { key, success: true, cached: true };
      } catch (error) {
        console.error(`Failed to warmup cache for ${key}:`, error);
        return { key, success: false, error: error.message };
      }
    });

    return Promise.all(promises);
  }
}

// 创建全局缓存实例
const globalCache = new DataCache();

// 定期清理过期缓存
setInterval(() => {
  globalCache.cleanup();
}, 60000); // 每分钟清理一次

// 缓存配置
export const CACHE_KEYS = {
  PRODUCTS: 'products',
  PRODUCT_DETAIL: 'product_detail_',
  CATEGORIES: 'categories',
  USER_INFO: 'user_info',
  USER_STATS: 'user_stats',
  ORDERS: 'orders',
  ORDER_DETAIL: 'order_detail_',
  CONSULTATION_HISTORY: 'consultation_history',
  SERVICE_STATS: 'service_stats',
  FAVORITES: 'favorites',
  CART: 'cart'
};

export const CACHE_TTL = {
  SHORT: 2 * 60 * 1000, // 2分钟
  MEDIUM: 5 * 60 * 1000, // 5分钟
  LONG: 15 * 60 * 1000, // 15分钟
  VERY_LONG: 60 * 60 * 1000 // 1小时
};

// 缓存装饰器函数
export function withCache(cacheKey, ttl = CACHE_TTL.MEDIUM) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      const fullKey = typeof cacheKey === 'function' ? cacheKey(...args) : cacheKey;
      
      // 尝试从缓存获取
      const cachedData = globalCache.get(fullKey);
      if (cachedData) {
        return cachedData;
      }

      // 缓存未命中，执行原方法
      try {
        const result = await originalMethod.apply(this, args);
        globalCache.set(fullKey, result, ttl);
        return result;
      } catch (error) {
        console.error(`Cache error for ${fullKey}:`, error);
        throw error;
      }
    };

    return descriptor;
  };
}

// React Hook for cache
export function useCache(key, fetcher, ttl = CACHE_TTL.MEDIUM, dependencies = []) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 尝试从缓存获取
        const cachedData = globalCache.get(key);
        if (cachedData) {
          if (isMounted) {
            setData(cachedData);
            setLoading(false);
          }
          return;
        }

        // 缓存未命中，获取新数据
        const freshData = await fetcher();
        globalCache.set(key, freshData, ttl);
        
        if (isMounted) {
          setData(freshData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // 添加缓存变化监听器
    const handleCacheChange = (newData) => {
      if (isMounted) {
        setData(newData);
      }
    };

    globalCache.addListener(key, handleCacheChange);

    return () => {
      isMounted = false;
      globalCache.removeListener(key, handleCacheChange);
    };
  }, [key, ...dependencies]);

  const invalidate = React.useCallback(() => {
    globalCache.delete(key);
  }, [key]);

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const freshData = await fetcher();
      globalCache.set(key, freshData, ttl);
      setData(freshData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  return { data, loading, error, invalidate, refresh };
}

// 缓存工具函数
export const cacheUtils = {
  // 批量获取缓存
  batchGet: (keys) => {
    const results = {};
    keys.forEach(key => {
      results[key] = globalCache.get(key);
    });
    return results;
  },

  // 批量设置缓存
  batchSet: (items, ttl = CACHE_TTL.MEDIUM) => {
    items.forEach(({ key, data, customTtl }) => {
      globalCache.set(key, data, customTtl || ttl);
    });
  },

  // 缓存依赖管理
  invalidateDependent: (key) => {
    // 根据key清理相关缓存
    if (key.startsWith(CACHE_KEYS.PRODUCT_DETAIL)) {
      // 清理产品列表缓存
      globalCache.delete(CACHE_KEYS.PRODUCTS);
    }
    
    if (key === CACHE_KEYS.USER_INFO) {
      // 清理用户相关缓存
      globalCache.delete(CACHE_KEYS.USER_STATS);
      globalCache.delete(CACHE_KEYS.ORDERS);
      globalCache.delete(CACHE_KEYS.FAVORITES);
    }

    if (key === CACHE_KEYS.ORDERS) {
      // 清理订单统计相关缓存
      globalCache.delete(CACHE_KEYS.USER_STATS);
    }
  },

  // 预加载常用数据
  preloadCommonData: async () => {
    const commonConfigs = [
      {
        key: CACHE_KEYS.CATEGORIES,
        fetcher: async () => {
          // 模拟获取分类数据
          return [
            { id: 'all', name: '全部', count: 156 },
            { id: 'plant', name: '植物染发', count: 45 },
            { id: 'professional', name: '专业染发', count: 38 },
            { id: 'ammonia-free', name: '无氨染发', count: 32 }
          ];
        },
        ttl: CACHE_TTL.VERY_LONG
      }
    ];

    return globalCache.warmup(commonConfigs);
  }
};

export default globalCache;
