// @ts-ignore;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast, ButtonLoading } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, ShoppingCart, Star, Package, Eye, Heart, Grid, List, SlidersHorizontal, ChevronDown, RefreshCw, AlertCircle, Activity } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, ProductListLoading, ContextualLoading, FullScreenLoading, InlineLoading } from '@/components/LoadingStates';

// 性能监控相关
// @ts-ignore;
import { usePerformanceMonitor, useInteractionMonitor } from '@/hooks/usePerformanceMonitor';
// @ts-ignore;
import { useRenderTracking, usePerformanceBoundary } from '@/hooks/useRenderTracking';
// @ts-ignore;
import { useDataLoader, useBatchDataLoader } from '@/hooks/useDataLoader';

// 产品相关组件
// @ts-ignore;
import { ProductCard } from '@/components/products/ProductCard';
// @ts-ignore;
import { ProductFilters } from '@/components/products/ProductFilters';
// @ts-ignore;
import { ProductStats } from '@/components/products/ProductStats';
// @ts-ignore;
import { ProductGrid } from '@/components/products/ProductGrid';
export default function ProductsPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();

  // 性能监控
  const {
    startMonitoring,
    endMonitoring
  } = usePerformanceMonitor('ProductsPage');
  const {
    startInteraction,
    endInteraction
  } = useInteractionMonitor();
  const {
    renderCount,
    trackProps
  } = useRenderTracking('ProductsPage', {
    trackProps: true,
    threshold: 20,
    // 产品页面允许稍长的渲染时间
    onSlowRender: data => {
      console.warn('ProductsPage 渲染性能警告:', data);
    }
  });
  const {
    isDegraded
  } = usePerformanceBoundary('ProductsPage', {
    renderThreshold: 25,
    memoryThreshold: 60 * 1024 * 1024,
    onPerformanceDegradation: data => {
      console.warn('ProductsPage 性能下降，启用降级模式:', data);
    }
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const [isFiltering, setIsFiltering] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 使用缓存的数据加载器
  const productsLoader = useDataLoader({
    type: 'products',
    key: 'all_products',
    loader: async () => {
      const renderId = startMonitoring({
        phase: 'products_load'
      });
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockProducts = generateMockProducts();
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setHasMore(mockProducts.length > page * 12);
        trackProps({
          productsCount: mockProducts.length
        });
        return mockProducts;
      } finally {
        endMonitoring(renderId);
      }
    },
    options: {
      ttl: 10 * 60 * 1000,
      staleWhileRevalidate: true
    },
    successMessage: '产品列表加载成功',
    errorMessage: '无法获取产品列表'
  });
  const categoriesLoader = useDataLoader({
    type: 'categories',
    key: 'product_categories',
    loader: async () => {
      const renderId = startMonitoring({
        phase: 'categories_load'
      });
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockCategories = [{
          id: 'all',
          name: '全部产品',
          count: 0
        }, {
          id: 'hair-dye',
          name: '染发剂',
          count: 45
        }, {
          id: 'bleach',
          name: '漂发剂',
          count: 23
        }, {
          id: 'developer',
          name: '显色剂',
          count: 18
        }, {
          id: 'treatment',
          name: '护理产品',
          count: 32
        }, {
          id: 'tools',
          name: '美发工具',
          count: 28
        }];
        setCategories(mockCategories);
        return mockCategories;
      } finally {
        endMonitoring(renderId);
      }
    },
    options: {
      ttl: 60 * 60 * 1000
    }
  });
  const userPreferencesLoader = useDataLoader({
    type: 'userPreferences',
    key: 'shopping_preferences',
    loader: async () => {
      const renderId = startMonitoring({
        phase: 'preferences_load'
      });
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const mockFavorites = new Set(['product_1', 'product_3', 'product_5']);
        const mockCart = ['product_2', 'product_4'];
        setFavorites(mockFavorites);
        setCart(mockCart);
        return {
          favorites: mockFavorites,
          cart: mockCart
        };
      } finally {
        endMonitoring(renderId);
      }
    },
    options: {
      ttl: 30 * 60 * 1000
    }
  });

  // 批量加载初始数据
  const batchLoader = useBatchDataLoader([productsLoader.config, categoriesLoader.config, userPreferencesLoader.config]);

  // 初始化加载
  useEffect(() => {
    const renderId = startMonitoring({
      phase: 'initial_load'
    });
    try {
      if (batchLoader.loadAll) {
        batchLoader.loadAll();
      }
    } finally {
      endMonitoring(renderId);
    }
  }, []);

  // 优化的过滤和排序函数
  const filterAndSortProducts = useCallback(() => {
    const interactionId = startInteraction('filter_sort', 'products_filter');
    setIsFiltering(true);
    try {
      let filtered = [...products];

      // 分类过滤
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // 搜索过滤
      if (searchTerm) {
        filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.brand.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      // 价格过滤
      filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

      // 排序
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
      setFilteredProducts(filtered);
    } catch (error) {
      console.error('过滤产品失败:', error);
    } finally {
      setIsFiltering(false);
      endInteraction(interactionId);
    }
  }, [products, selectedCategory, searchTerm, sortBy, priceRange, startInteraction, endInteraction]);

  // 使用 useMemo 优化产品列表渲染
  const optimizedFilteredProducts = useMemo(() => {
    if (isDegraded) {
      // 性能降级时限制显示数量
      return filteredProducts.slice(0, 20);
    }
    return filteredProducts;
  }, [isDegraded, filteredProducts]);

  // 生成模拟数据
  const generateMockProducts = useCallback(() => {
    const productNames = ['天然植物染发剂', '持久显色染发膏', '温和漂发剂', '深度护理发膜', '专业显色剂', '修复护发素', '色彩锁护发油', '抗褪色洗发水', '滋养发膜', '快速染发剂', '无氨染发膏', '植物漂发粉', '护色洗护套装', '深层修复精华', '光泽护理喷雾', '柔顺护发素'];
    const brands = ['染发专家', '色彩大师', '护发之家', '专业美发', '天然护理'];
    const types = ['permanent', 'semi-permanent', 'temporary', 'bleach', 'treatment'];
    return Array.from({
      length: 48
    }, (_, index) => ({
      id: `product_${index + 1}`,
      name: productNames[index % productNames.length],
      brand: brands[Math.floor(Math.random() * brands.length)],
      category: ['hair-dye', 'bleach', 'developer', 'treatment', 'tools'][Math.floor(Math.random() * 5)],
      type: types[Math.floor(Math.random() * types.length)],
      price: Math.floor(Math.random() * 500) + 50,
      originalPrice: Math.floor(Math.random() * 600) + 100,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 500) + 10,
      image: `https://picsum.photos/seed/product${index + 1}/300/300.jpg`,
      description: `高品质${productNames[index % productNames.length]}，采用天然成分，温和不刺激`,
      features: ['天然成分', '持久显色', '温和配方', '易冲洗'],
      inStock: Math.random() > 0.1,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
      isNew: Math.random() > 0.8,
      isBestseller: Math.random() > 0.7,
      sku: `SKU${String(index + 1).padStart(6, '0')}`,
      weight: `${(Math.random() * 200 + 50).toFixed(0)}g`,
      shelfLife: `${Math.floor(Math.random() * 24) + 12}个月`
    }));
  }, []);

  // 处理刷新
  const handleRefresh = useCallback(async () => {
    const interactionId = startInteraction('refresh', 'products_refresh');
    try {
      await Promise.all([productsLoader.refresh(), categoriesLoader.refresh(), userPreferencesLoader.refresh()]);
      toast({
        title: "刷新成功",
        description: "产品列表已更新"
      });
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      endInteraction(interactionId);
    }
  }, [productsLoader, categoriesLoader, userPreferencesLoader, toast, startInteraction, endInteraction]);

  // 处理添加到购物车
  const handleAddToCart = useCallback(async productId => {
    if (isAddingToCart[productId]) return;
    const interactionId = startInteraction('add_to_cart', productId);
    setIsAddingToCart(prev => ({
      ...prev,
      [productId]: true
    }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCart(prev => [...prev, productId]);
      userPreferencesLoader.setCacheData({
        favorites,
        cart: [...cart, productId]
      });
      toast({
        title: "添加成功",
        description: "产品已添加到购物车"
      });
    } catch (error) {
      toast({
        title: "添加失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsAddingToCart(prev => ({
        ...prev,
        [productId]: false
      }));
      endInteraction(interactionId);
    }
  }, [isAddingToCart, favorites, cart, userPreferencesLoader, toast, startInteraction, endInteraction]);

  // 处理收藏切换
  const handleToggleFavorite = useCallback(async productId => {
    const interactionId = startInteraction('toggle_favorite', productId);
    try {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        toast({
          title: "已取消收藏",
          description: "产品已从收藏中移除"
        });
      } else {
        newFavorites.add(productId);
        toast({
          title: "收藏成功",
          description: "产品已添加到收藏"
        });
      }
      setFavorites(newFavorites);
      userPreferencesLoader.setCacheData({
        favorites: newFavorites,
        cart
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      endInteraction(interactionId);
    }
  }, [favorites, cart, userPreferencesLoader, toast, startInteraction, endInteraction]);

  // 处理加载更多
  const handleLoadMore = useCallback(async () => {
    if (!hasMore || productsLoader.loading) return;
    const interactionId = startInteraction('load_more', 'products_pagination');
    try {
      setPage(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newProducts = generateMockProducts().slice(0, 12);
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(newProducts.length === 12);
    } catch (error) {
      console.error('加载更多失败:', error);
    } finally {
      endInteraction(interactionId);
    }
  }, [hasMore, productsLoader.loading, generateMockProducts, startInteraction, endInteraction]);

  // 处理快速查看
  const handleQuickView = useCallback(product => {
    const interactionId = startInteraction('quick_view', product.id);
    try {
      console.log('Quick view:', product);
    } finally {
      endInteraction(interactionId);
    }
  }, [startInteraction, endInteraction]);

  // 处理产品比较
  const handleCompare = useCallback(product => {
    const interactionId = startInteraction('compare', product.id);
    try {
      console.log('Compare:', product);
    } finally {
      endInteraction(interactionId);
    }
  }, [startInteraction, endInteraction]);

  // 监听过滤条件变化
  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);
  if (productsLoader.error || categoriesLoader.error || userPreferencesLoader.error) {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="产品中心" showBack={true} />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">加载失败</h2>
              <p className="text-muted-foreground mb-4">
                {productsLoader.error?.message || categoriesLoader.error?.message || userPreferencesLoader.error?.message || '未知错误'}
              </p>
              <Button onClick={() => batchLoader.retryAll()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                重新加载
              </Button>
            </div>
          </div>
          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="产品中心" showBack={true} actions={<div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={batchLoader.isAnyLoading}>
                <RefreshCw className={`w-4 h-4 ${batchLoader.isAnyLoading ? 'animate-spin' : ''}`} />
              </Button>
              {process.env.NODE_ENV === 'development' && <div className="text-xs text-muted-foreground">
                  渲染: {renderCount} | {isDegraded ? '降级' : '正常'}
                </div>}
            </div>} />
        
        <div className="container mx-auto px-4 py-6 pb-20">
          {/* 性能状态指示器 */}
          {process.env.NODE_ENV === 'development' && <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              📊 渲染次数: {renderCount} | 
              性能状态: {isDegraded ? '降级模式' : '正常'} |
              缓存状态: {productsLoader.isFromCache ? '来自缓存' : '新鲜数据'} |
              产品数量: {optimizedFilteredProducts.length}
            </div>}

          {/* 产品筛选器 */}
          <ProductFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} priceRange={priceRange} onPriceRangeChange={setPriceRange} sortBy={sortBy} onSortByChange={setSortBy} categories={categoriesLoader.data} showFilters={showFilters} onToggleFilters={() => setShowFilters(!showFilters)} isFiltering={isFiltering} viewMode={viewMode} onViewModeChange={setViewMode} />

          {/* 产品统计 */}
          <ProductStats filteredCount={optimizedFilteredProducts.length} cartCount={cart.length} favoritesCount={favorites.size} isFromCache={productsLoader.isFromCache} isFiltering={isFiltering} />

          {/* 产品列表 */}
          {productsLoader.loading ? <ProductListLoading count={8} /> : <ProductGrid products={optimizedFilteredProducts} viewMode={viewMode} favorites={favorites} isAddingToCart={isAddingToCart} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} onQuickView={handleQuickView} onCompare={handleCompare} hasMore={hasMore} onLoadMore={handleLoadMore} loading={productsLoader.loading} />}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}