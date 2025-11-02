
// @ts-ignore;
import { renderHook, act } from '@testing-library/react';
// @ts-ignore;
import { useDataCache, useMultiDataCache, usePaginatedCache } from '@/hooks/useDataCache';
// @ts-ignore;
import { globalCache, CACHE_TTL } from '@/lib/DataCache';

// Mock the global cache
jest.mock('@/lib/DataCache', () => ({
  globalCache: {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    has: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn()
  },
  CACHE_TTL: {
    MEDIUM: 5 * 60 * 1000
  }
}));

describe('useDataCache', () => {
  const mockFetcher = jest.fn();
  const mockKey = 'test-key';

  beforeEach(() => {
    jest.clearAllMocks();
    globalCache.get.mockReturnValue(null);
    globalCache.has.mockReturnValue(false);
  });

  it('returns initial loading state', () => {
    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('fetches data on mount', async () => {
    const mockData = { id: 1, name: 'test' };
    mockFetcher.mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockFetcher).toHaveBeenCalled();
    expect(globalCache.set).toHaveBeenCalledWith(mockKey, mockData, CACHE_TTL.MEDIUM);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it('uses cached data when available', async () => {
    const mockData = { id: 1, name: 'cached' };
    globalCache.get.mockReturnValue(mockData);
    globalCache.has.mockReturnValue(true);

    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockFetcher).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });

  it('handles fetch errors', async () => {
    const mockError = new Error('Fetch failed');
    mockFetcher.mockRejectedValue(mockError);

    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.loading).toBe(false);
  });

  it('refreshes data', async () => {
    const mockData = { id: 1, name: 'refreshed' };
    mockFetcher.mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    await act(async () => {
      await result.current.refresh();
    });

    expect(mockFetcher).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual(mockData);
  });

  it('invalidates cache', () => {
    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    act(() => {
      result.current.invalidate();
    });

    expect(globalCache.delete).toHaveBeenCalledWith(mockKey);
    expect(result.current.data).toBeNull();
  });

  it('checks if data is fresh', () => {
    globalCache.has.mockReturnValue(true);

    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    expect(result.current.isFresh()).toBe(true);
  });

  it('preloads data', async () => {
    const mockData = { id: 1, name: 'preloaded' };
    mockFetcher.mockResolvedValue(mockData);
    globalCache.has.mockReturnValue(false);

    const { result } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher,
        immediate: false
      })
    );

    await act(async () => {
      await result.current.preload();
    });

    expect(mockFetcher).toHaveBeenCalled();
    expect(globalCache.set).toHaveBeenCalledWith(mockKey, mockData, CACHE_TTL.MEDIUM);
  });

  it('adds and removes cache listeners', () => {
    const { unmount } = renderHook(() => 
      useDataCache({
        key: mockKey,
        fetcher: mockFetcher
      })
    );

    expect(globalCache.addListener).toHaveBeenCalledWith(mockKey, expect.any(Function));

    unmount();

    expect(globalCache.removeListener).toHaveBeenCalledWith(mockKey, expect.any(Function));
  });
});

describe('useMultiDataCache', () => {
  const mockConfigs = [
    {
      key: 'key1',
      fetcher: jest.fn().mockResolvedValue('data1')
    },
    {
      key: 'key2',
      fetcher: jest.fn().mockResolvedValue('data2')
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    globalCache.get.mockReturnValue(null);
    globalCache.has.mockReturnValue(false);
  });

  it('loads multiple data sources', async () => {
    const { result } = renderHook(() => 
      useMultiDataCache(mockConfigs)
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.globalLoading).toBe(false);
    expect(result.current.states.key1.data).toBe('data1');
    expect(result.current.states.key2.data).toBe('data2');
  });

  it('refreshes all data sources', async () => {
    const { result } = renderHook(() => 
      useMultiDataCache(mockConfigs)
    );

    await act(async () => {
      await result.current.refreshAll();
    });

    expect(mockConfigs[0].fetcher).toHaveBeenCalledTimes(2);
    expect(mockConfigs[1].fetcher).toHaveBeenCalledTimes(2);
  });

  it('invalidates all data sources', () => {
    const { result } = renderHook(() => 
      useMultiDataCache(mockConfigs)
    );

    act(() => {
      result.current.invalidateAll();
    });

    expect(globalCache.delete).toHaveBeenCalledWith('key1');
    expect(globalCache.delete).toHaveBeenCalledWith('key2');
  });
});

describe('usePaginatedCache', () => {
  const mockBaseKey = 'paginated-data';
  const mockFetcher = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    globalCache.get.mockReturnValue(null);
    globalCache.has.mockReturnValue(false);
  });

  it('loads first page on mount', async () => {
    const mockData = ['item1', 'item2'];
    mockFetcher.mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      usePaginatedCache({
        baseKey: mockBaseKey,
        fetcher: mockFetcher,
        pageSize: 10
      })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockFetcher).toHaveBeenCalledWith(1, 10);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.currentPage).toBe(1);
  });

  it('loads next page', async () => {
    const mockPage1 = ['item1', 'item2'];
    const mockPage2 = ['item3', 'item4'];
    mockFetcher
      .mockResolvedValueOnce(mockPage1)
      .mockResolvedValueOnce(mockPage2);

    const { result } = renderHook(() => 
      usePaginatedCache({
        baseKey: mockBaseKey,
        fetcher: mockFetcher,
        pageSize: 2
      })
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.hasMore).toBe(true);

    await act(async () => {
      await result.current.loadNextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.data).toEqual([...mockPage1, ...mockPage2]);
  });

  it('refreshes current page', async () => {
    const mockData = ['item1', 'item2'];
    mockFetcher.mockResolvedValue(mockData);

    const { result } = renderHook(() => 
      usePaginatedCache({
        baseKey: mockBaseKey,
        fetcher: mockFetcher,
        pageSize: 10
      })
    );

    await act(async () => {
      await result.current.refresh();
    });

    expect(mockFetcher).toHaveBeenCalledWith(1, 10);
    expect(mockFetcher).toHaveBeenCalledTimes(2);
  });

  it('invalidates all pages', () => {
    const { result } = renderHook(() => 
      usePaginatedCache({
        baseKey: mockBaseKey,
        fetcher: mockFetcher,
        pageSize: 10
      })
    );

    act(() => {
      result.current.invalidate();
    });

    expect(globalCache.delete).toHaveBeenCalledWith('paginated-data_page_1');
    expect(result.current.data).toEqual([]);
  });
});
