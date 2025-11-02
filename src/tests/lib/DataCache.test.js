
// @ts-ignore;
import DataCache, { CACHE_KEYS, CACHE_TTL, cacheUtils } from '@/lib/DataCache';

describe('DataCache', () => {
  let cache;

  beforeEach(() => {
    cache = new DataCache();
    jest.clearAllMocks();
  });

  describe('Basic Cache Operations', () => {
    it('sets and gets cache data', () => {
      const testData = { id: 1, name: 'test' };
      cache.set('test-key', testData);
      
      const result = cache.get('test-key');
      expect(result).toEqual(testData);
    });

    it('returns null for non-existent key', () => {
      const result = cache.get('non-existent-key');
      expect(result).toBeNull();
    });

    it('deletes cache data', () => {
      const testData = { id: 1, name: 'test' };
      cache.set('test-key', testData);
      cache.delete('test-key');
      
      const result = cache.get('test-key');
      expect(result).toBeNull();
    });

    it('checks if cache has valid data', () => {
      const testData = { id: 1, name: 'test' };
      cache.set('test-key', testData);
      
      expect(cache.has('test-key')).toBe(true);
      expect(cache.has('non-existent-key')).toBe(false);
    });

    it('clears all cache data', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      
      cache.clear();
      
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
      expect(cache.size()).toBe(0);
    });

    it('returns cache size', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      
      expect(cache.size()).toBe(2);
    });

    it('returns all cache keys', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      
      const keys = cache.keys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toHaveLength(2);
    });
  });

  describe('TTL (Time To Live)', () => {
    it('expires cache after TTL', (done) => {
      const testData = { id: 1, name: 'test' };
      const shortTTL = 100; // 100ms
      
      cache.set('test-key', testData, shortTTL);
      
      // Should be available immediately
      expect(cache.get('test-key')).toEqual(testData);
      
      // Should be null after TTL expires
      setTimeout(() => {
        const result = cache.get('test-key');
        expect(result).toBeNull();
        done();
      }, shortTTL + 10);
    });

    it('uses default TTL when not specified', () => {
      const testData = { id: 1, name: 'test' };
      cache.set('test-key', testData);
      
      // Should use default TTL (5 minutes)
      expect(cache.get('test-key')).toEqual(testData);
    });

    it('cleans up expired cache entries', (done) => {
      const testData1 = { id: 1, name: 'test1' };
      const testData2 = { id: 2, name: 'test2' };
      const shortTTL = 50;
      const longTTL = 1000;
      
      cache.set('key1', testData1, shortTTL);
      cache.set('key2', testData2, longTTL);
      
      setTimeout(() => {
        cache.cleanup();
        
        expect(cache.get('key1')).toBeNull();
        expect(cache.get('key2')).toEqual(testData2);
        done();
      }, shortTTL + 10);
    });
  });

  describe('Cache Listeners', () => {
    it('adds and removes listeners', () => {
      const callback = jest.fn();
      
      cache.addListener('test-key', callback);
      cache.set('test-key', 'test-data');
      
      expect(callback).toHaveBeenCalledWith('test-data', 'test-key');
      
      cache.removeListener('test-key', callback);
      cache.set('test-key', 'new-data');
      
      // Callback should not be called after removal
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('notifies listeners on data change', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      
      cache.addListener('test-key', callback1);
      cache.addListener('test-key', callback2);
      
      cache.set('test-key', 'test-data');
      
      expect(callback1).toHaveBeenCalledWith('test-data', 'test-key');
      expect(callback2).toHaveBeenCalledWith('test-data', 'test-key');
    });

    it('notifies listeners on delete', () => {
      const callback = jest.fn();
      
      cache.addListener('test-key', callback);
      cache.set('test-key', 'test-data');
      cache.delete('test-key');
      
      expect(callback).toHaveBeenCalledWith(null, 'test-key');
    });
  });

  describe('Cache Statistics', () => {
    it('returns correct statistics', () => {
      const testData1 = { id: 1, name: 'test1' };
      const testData2 = { id: 2, name: 'test2' };
      
      cache.set('key1', testData1, 1000); // Long TTL
      cache.set('key2', testData2, 50); // Short TTL
      
      const stats = cache.getStats();
      
      expect(stats.total).toBe(2);
      expect(stats.keys).toContain('key1');
      expect(stats.keys).toContain('key2');
    });
  });

  describe('Cache Warmup', () => {
    it('warms up cache with provided configs', async () => {
      const mockFetcher1 = jest.fn().mockResolvedValue('data1');
      const mockFetcher2 = jest.fn().mockResolvedValue('data2');
      
      const configs = [
        { key: 'key1', fetcher: mockFetcher1 },
        { key: 'key2', fetcher: mockFetcher2 }
      ];
      
      const results = await cache.warmup(configs);
      
      expect(mockFetcher1).toHaveBeenCalled();
      expect(mockFetcher2).toHaveBeenCalled();
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({ key: 'key1', success: true });
      expect(results[1]).toEqual({ key: 'key2', success: true });
    });

    it('handles warmup errors gracefully', async () => {
      const mockErrorFetcher = jest.fn().mockRejectedValue(new Error('Fetch failed'));
      
      const configs = [
        { key: 'key1', fetcher: mockErrorFetcher }
      ];
      
      const results = await cache.warmup(configs);
      
      expect(results[0]).toEqual({
        key: 'key1',
        success: false,
        error: 'Fetch failed'
      });
    });
  });
});

describe('cacheUtils', () => {
  let cache;

  beforeEach(() => {
    cache = new DataCache();
    global.globalCache = cache;
  });

  describe('batchGet', () => {
    it('gets multiple cache values', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      
      const results = cacheUtils.batchGet(['key1', 'key2']);
      
      expect(results).toEqual({
        key1: 'data1',
        key2: 'data2'
      });
    });
  });

  describe('batchSet', () => {
    it('sets multiple cache values', () => {
      const items = [
        { key: 'key1', data: 'data1' },
        { key: 'key2', data: 'data2' }
      ];
      
      cacheUtils.batchSet(items);
      
      expect(cache.get('key1')).toBe('data1');
      expect(cache.get('key2')).toBe('data2');
    });

    it('uses custom TTL when provided', (done) => {
      const items = [
        { key: 'key1', data: 'data1', customTtl: 50 }
      ];
      
      cacheUtils.batchSet(items);
      
      setTimeout(() => {
        expect(cache.get('key1')).toBeNull();
        done();
      }, 60);
    });
  });

  describe('invalidateDependent', () => {
    it('invalidates dependent caches', () => {
      cache.set(CACHE_KEYS.PRODUCTS, 'products-data');
      cache.set(CACHE_KEYS.USER_INFO, 'user-data');
      cache.set(CACHE_KEYS.USER_STATS, 'user-stats-data');
      
      cacheUtils.invalidateDependent(CACHE_KEYS.USER_INFO);
      
      expect(cache.get(CACHE_KEYS.USER_INFO)).toBeNull();
      expect(cache.get(CACHE_KEYS.USER_STATS)).toBeNull();
      expect(cache.get(CACHE_KEYS.PRODUCTS)).toBe('products-data'); // Should not be affected
    });
  });

  describe('preloadCommonData', () => {
    it('preloads common data', async () => {
      const result = await cacheUtils.preloadCommonData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

describe('CACHE_KEYS and CACHE_TTL', () => {
  it('exports correct cache keys', () => {
    expect(CACHE_KEYS.PRODUCTS).toBe('products');
    expect(CACHE_KEYS.USER_INFO).toBe('user_info');
    expect(CACHE_KEYS.ORDERS).toBe('orders');
  });

  it('exports correct TTL values', () => {
    expect(CACHE_TTL.SHORT).toBe(2 * 60 * 1000);
    expect(CACHE_TTL.MEDIUM).toBe(5 * 60 * 1000);
    expect(CACHE_TTL.LONG).toBe(15 * 60 * 1000);
    expect(CACHE_TTL.VERY_LONG).toBe(60 * 60 * 1000);
  });
});
