
/**
 * 数据缓存管理器
 * 提供统一的缓存接口，支持内存缓存、localStorage 缓存和会话缓存
 */
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.cacheConfig = {
      // 默认缓存时间（毫秒）
      defaultTTL: 5 * 60 * 1000, // 5分钟
      // 不同类型数据的缓存时间
      ttl: {
        products: 10 * 60 * 1000, // 10分钟
        userInfo: 30 * 60 * 1000, // 30分钟
        orders: 5 * 60 * 1000, // 5分钟
        categories: 60 * 60 * 1000, // 1小时
        recommendations: 15 * 60 * 1000, // 15分钟
        userStats: 20 * 60 * 1000, // 20分钟
        favorites: 30 * 60 * 1000, // 30分钟
        notifications: 2 * 60 * 1000, // 2分钟
        systemConfig: 24 * 60 * 60 * 1000 // 24小时
      },
      // 最大缓存条目数
      maxMemoryItems: 100,
      // 是否启用 localStorage
      useLocalStorage: true,
      // localStorage 前缀
      storagePrefix: 'hair_dye_app_'
    };
    
    // 初始化时清理过期缓存
    this.cleanExpiredCache();
  }

  /**
   * 生成缓存键
   * @param {string} type - 数据类型
   * @param {string} key - 缓存键
   * @returns {string} 完整的缓存键
   */
  generateKey(type, key) {
    return `${type}_${key}`;
  }

  /**
   * 获取缓存项
   * @param {string} type - 数据类型
   * @param {string} key - 缓存键
   * @returns {any|null} 缓存的数据或 null
   */
  get(type, key) {
    const cacheKey = this.generateKey(type, key);
    
    // 优先从内存缓存获取
    if (this.memoryCache.has(cacheKey)) {
      const item = this.memoryCache.get(cacheKey);
      if (!this.isExpired(item)) {
        // 更新访问时间
        item.lastAccessed = Date.now();
        return item.data;
      } else {
        // 清理过期的内存缓存
        this.memoryCache.delete(cacheKey);
      }
    }

    // 从 localStorage 获取
    if (this.cacheConfig.useLocalStorage && typeof localStorage !== 'undefined') {
      try {
        const storageKey = this.cacheConfig.storagePrefix + cacheKey;
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const item = JSON.parse(stored);
          if (!this.isExpired(item)) {
            // 将数据加载到内存缓存
            this.memoryCache.set(cacheKey, {
              ...item,
              lastAccessed: Date.now()
            });
            return item.data;
          } else {
            // 清理过期的存储缓存
            localStorage.removeItem(storageKey);
          }
        }
      } catch (error) {
        console.warn('读取 localStorage 缓存失败:', error);
      }
    }

    return null;
  }

  /**
   * 设置缓存项
   * @param {string} type - 数据类型
   * @param {string} key - 缓存键
   * @param {any} data - 要缓存的数据
   * @param {number} [ttl] - 自定义缓存时间（毫秒）
   */
  set(type, key, data, ttl) {
    const cacheKey = this.generateKey(type, key);
    const now = Date.now();
    const cacheTTL = ttl || this.cacheConfig.ttl[type] || this.cacheConfig.defaultTTL;
    
    const cacheItem = {
      data,
      timestamp: now,
      expiry: now + cacheTTL,
      lastAccessed: now,
      type
    };

    // 设置内存缓存
    this.memoryCache.set(cacheKey, cacheItem);
    
    // 检查内存缓存大小限制
    this.enforceMemoryLimit();

    // 设置 localStorage 缓存
    if (this.cacheConfig.useLocalStorage && typeof localStorage !== 'undefined') {
      try {
        const storageKey = this.cacheConfig.storagePrefix + cacheKey;
        localStorage.setItem(storageKey, JSON.stringify(cacheItem));
      } catch (error) {
        console.warn('写入 localStorage 缓存失败:', error);
        // 如果 localStorage 空间不足，清理一些旧缓存
        if (error.name === 'QuotaExceededError') {
          this.cleanupLocalStorage();
        }
      }
    }
  }

  /**
   * 删除缓存项
   * @param {string} type - 数据类型
   * @param {string} key - 缓存键
   */
  delete(type, key) {
    const cacheKey = this.generateKey(type, key);
    
    // 删除内存缓存
    this.memoryCache.delete(cacheKey);
    
    // 删除 localStorage 缓存
    if (this.cacheConfig.useLocalStorage && typeof localStorage !== 'undefined') {
      try {
        const storageKey = this.cacheConfig.storagePrefix + cacheKey;
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn('删除 localStorage 缓存失败:', error);
      }
    }
  }

  /**
   * 清除指定类型的所有缓存
   * @param {string} type - 数据类型
   */
  clearType(type) {
    // 清除内存缓存
    for (const [key, item] of this.memoryCache.entries()) {
      if (item.type === type) {
        this.memoryCache.delete(key);
      }
    }
    
    // 清除 localStorage 缓存
    if (this.cacheConfig.useLocalStorage && typeof localStorage !== 'undefined') {
      try {
        const prefix = this.cacheConfig.storagePrefix + type + '_';
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn('清除 localStorage 缓存失败:', error);
      }
    }
  }

  /**
   * 清除所有缓存
   */
  clearAll() {
    // 清除内存缓存
    this.memoryCache.clear();
    
    // 清除 localStorage 缓存
    if (this.cacheConfig.useLocalStorage && typeof localStorage !== 'undefined') {
      try {
        const prefix = this.cacheConfig.storagePrefix;
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn('清除所有 localStorage 缓存失败:', error);
      }
    }
  }

  /**
   * 检查缓存项是否过期
   * @param {Object} item - 缓存项
   * @returns {boolean} 是否过期
   */
  isExpired(item) {
    return Date.now() > item.expiry;
  }

  /**
   * 强制执行内存缓存大小限制
   */
  enforceMemoryLimit() {
    if (this.memoryCache.size <= this.cacheConfig.maxMemoryItems) {
      return;
    }

    // 按最后访问时间排序，删除最久未访问的项
    const entries = Array.from(this.memoryCache.entries())
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);
    
    const toDelete = entries.slice(0, this.memoryCache.size - this.cacheConfig.maxMemoryItems);
    toDelete.forEach(([key]) => this.memoryCache.delete(key));
  }

  /**
   * 清理 localStorage 中的旧缓存
   */
  cleanupLocalStorage() {
    if (!this.cacheConfig.useLocalStorage || typeof localStorage === 'undefined') {
      return;
    }

    try {
      const prefix = this.cacheConfig.storagePrefix;
      const items = [];
      
      // 收集所有缓存项
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          try {
            const item = JSON.parse(localStorage.getItem(key));
            items.push({ key, item });
          } catch (e) {
            // 删除损坏的缓存项
            localStorage.removeItem(key);
          }
        }
      }

      // 按过期时间排序，删除过期的项
      items.sort((a, b) => a.item.expiry - b.item.expiry);
      const now = Date.now();
      
      for (const { key, item } of items) {
        if (this.isExpired(item)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn('清理 localStorage 失败:', error);
    }
  }

  /**
   * 清理所有过期缓存
   */
  cleanExpiredCache() {
    // 清理内存缓存
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key);
      }
    }

    // 清理 localStorage 缓存
    this.cleanupLocalStorage();
  }

  /**
   * 获取缓存统计信息
   * @returns {Object} 缓存统计
   */
  getStats() {
    const memoryStats = {
      total: this.memoryCache.size,
      byType: {}
    };

    for (const [key, item] of this.memoryCache.entries()) {
      if (!memoryStats.byType[item.type]) {
        memoryStats.byType[item.type] = 0;
      }
      memoryStats.byType[item.type]++;
    }

    let storageStats = { total: 0, byType: {} };
    
    if (this.cacheConfig.useLocalStorage && typeof localStorage !== 'undefined') {
      try {
        const prefix = this.cacheConfig.storagePrefix;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(prefix)) {
            storageStats.total++;
            try {
              const item = JSON.parse(localStorage.getItem(key));
              if (!storageStats.byType[item.type]) {
                storageStats.byType[item.type] = 0;
              }
              storageStats.byType[item.type]++;
            } catch (e) {
              // 忽略损坏的项
            }
          }
        }
      } catch (error) {
        console.warn('获取 localStorage 统计失败:', error);
      }
    }

    return {
      memory: memoryStats,
      storage: storageStats
    };
  }

  /**
   * 预热缓存 - 预加载常用数据
   * @param {Array} preloadItems - 预加载项目列表
   */
  async preload(preloadItems) {
    const promises = preloadItems.map(async ({ type, key, loader, ttl }) => {
      try {
        // 检查是否已缓存
        if (this.get(type, key) !== null) {
          return;
        }
        
        // 加载数据并缓存
        const data = await loader();
        this.set(type, key, data, ttl);
      } catch (error) {
        console.warn(`预加载缓存失败 ${type}:${key}`, error);
      }
    });

    await Promise.allSettled(promises);
  }
}

// 创建全局缓存管理器实例
const cacheManager = new CacheManager();

// 定期清理过期缓存（每5分钟）
setInterval(() => {
  cacheManager.cleanExpiredCache();
}, 5 * 60 * 1000);

export default cacheManager;
