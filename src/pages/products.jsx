// @ts-ignore;
import React, { useState, useEffect, useMemo } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, ShoppingCart, Star, Package, ChevronRight, Grid, List, SlidersHorizontal, Heart, Eye, Zap, Shield, Award } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, ProductLoading, ProductEmpty, ErrorState, DataLoader } from '@/components/LoadingStates';
// @ts-ignore;
import { useDataCache, useMultiDataCache } from '@/hooks/useDataCache';
// @ts-ignore;
import { CACHE_KEYS, CACHE_TTL, cacheUtils } from '@/lib/DataCache';
export default function ProductsPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // 使用多数据缓存Hook
  const {
    states,
    globalLoading,
    refreshAll,
    invalidateAll
  } = useMultiDataCache([{
    key: CACHE_KEYS.PRODUCTS,
    fetcher: async () => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [{
        id: 1,
        name: '天然植物染发剂 - 棕色系',
        category: 'plant',
        price: 128,
        originalPrice: 168,
        rating: 4.8,
        reviews: 256,
        sales: 1523,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
        description: '采用天然植物精华，温和不刺激，持久显色',
        features: ['天然成分', '持久显色', '温和配方'],
        stock: 50,
        badge: '热销'
      }, {
        id: 2,
        name: '专业染发套装 - 红色系',
        category: 'professional',
        price: 298,
        originalPrice: 398,
        rating: 4.9,
        reviews: 189,
        sales: 892,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop',
        description: '专业级染发效果， salon品质在家体验',
        features: ['专业配方', 'salon效果', '护发成分'],
        stock: 30,
        badge: '新品'
      }, {
        id: 3,
        name: '无氨染发剂 - 黑色系',
        category: 'ammonia-free',
        price: 188,
        originalPrice: 238,
        rating: 4.7,
        reviews: 342,
        sales: 2103,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
        description: '无氨配方，健康染发新选择',
        features: ['无氨配方', '健康安全', '自然显色'],
        stock: 80,
        badge: '推荐'
      }];
    },
    ttl: CACHE_TTL.MEDIUM
  }, {
    key: CACHE_KEYS.CATEGORIES,
    fetcher: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return [{
        id: 'all',
        name: '全部',
        count: 156
      }, {
        id: 'plant',
        name: '植物染发',
        count: 45
      }, {
        id: 'professional',
        name: '专业染发',
        count: 38
      }, {
        id: 'ammonia-free',
        name: '无氨染发',
        count: 32
      }, {
        id: 'temporary',
        name: '临时染发',
        count: 28
      }, {
        id: 'bleach',
        name: '漂发产品',
        count: 13
      }];
    },
    ttl: CACHE_TTL.VERY_LONG
  }]);
  const products = states[CACHE_KEYS.PRODUCTS]?.data || [];
  const categories = states[CACHE_KEYS.CATEGORIES]?.data || [];
  const productsLoading = states[CACHE_KEYS.PRODUCTS]?.loading || false;
  const productsError = states[CACHE_KEYS.PRODUCTS]?.error || null;

  // 使用缓存的过滤和排序逻辑
  const filteredAndSortedProducts = useMemo(() => {
    if (!products.length) return [];
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'sales':
          return b.sales - a.sales;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  // 处理重试
  const handleRetry = () => {
    refreshAll();
  };

  // 处理刷新
  const handleRefresh = () => {
    refreshAll();
  };

  // 处理缓存失效
  const handleInvalidateCache = () => {
    invalidateAll();
    toast({
      title: "缓存已清理",
      description: "产品缓存已清理，下次访问将重新加载"
    });
  };

  // 切换收藏状态
  const toggleFavorite = useCallback(productId => {
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

    // 更新收藏缓存
    const currentFavorites = Array.from(newFavorites);
    cacheUtils.batchSet([{
      key: CACHE_KEYS.FAVORITES,
      data: currentFavorites,
      ttl: CACHE_TTL.LONG
    }]);
  }, [favorites, toast]);

  // 添加到购物车
  const handleAddToCart = useCallback(product => {
    // 获取当前购物车数据
    const currentCart = cacheUtils.batchGet([CACHE_KEYS.CART])[CACHE_KEYS.CART] || [];

    // 检查产品是否已在购物车中
    const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
    if (existingItemIndex >= 0) {
      // 更新数量
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // 添加新商品
      currentCart.push({
        ...product,
        quantity: 1,
        addedAt: Date.now()
      });
    }

    // 更新购物车缓存
    cacheUtils.batchSet([{
      key: CACHE_KEYS.CART,
      data: currentCart,
      ttl: CACHE_TTL.LONG
    }]);
    toast({
      title: "添加成功",
      description: `${product.name} 已添加到购物车`
    });
  }, [toast]);

  // 产品点击处理
  const handleProductClick = useCallback(product => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          id: product.id
        }
      });
    }
  }, [$w]);

  // 初始化时预加载收藏数据
  useEffect(() => {
    const cachedFavorites = cacheUtils.batchGet([CACHE_KEYS.FAVORITES])[CACHE_KEYS.FAVORITES];
    if (cachedFavorites) {
      setFavorites(new Set(cachedFavorites));
    }
  }, []);
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="产品中心" showBack={true} />
        
        <div className="pb-20">
          {/* 搜索和筛选栏 */}
          <div className="bg-card border-b p-4 sticky top-0 z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input type="text" placeholder="搜索产品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>筛选</span>
              </Button>
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-background shadow-sm' : ''}`}>
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-background shadow-sm' : ''}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 分类标签 */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {category.name}
                  <span className="ml-1 text-xs opacity-75">({category.count})</span>
                </button>)}
            </div>

            {/* 筛选面板 */}
            {showFilters && <div className="mt-4 p-4 bg-muted rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">价格范围</label>
                  <div className="flex items-center space-x-4">
                    <input type="range" min="0" max="1000" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="flex-1" />
                    <span className="text-sm font-medium">¥{priceRange[0]} - ¥{priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">排序方式</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="name">按名称</option>
                    <option value="price-low">价格从低到高</option>
                    <option value="price-high">价格从高到低</option>
                    <option value="rating">按评分</option>
                    <option value="sales">按销量</option>
                  </select>
                </div>
              </div>}
          </div>

          {/* 产品列表 */}
          <div className="p-4">
            <DataLoader loading={globalLoading} error={productsError} data={filteredAndSortedProducts} loadingComponent={<ProductLoading />} errorComponent={<ErrorState error={productsError} onRetry={handleRetry} />} emptyComponent={<ProductEmpty />} onRetry={handleRetry}>
              {viewMode === 'grid' ? <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAndSortedProducts.map(product => <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" onClick={() => handleProductClick(product)} />
                          {product.badge && <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                              {product.badge}
                            </span>}
                          <button onClick={() => toggleFavorite(product.id)} className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                            <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">{product.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                            <span className="text-xs text-muted-foreground">已售{product.sales}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-primary">¥{product.price}</span>
                              {product.originalPrice > product.price && <span className="text-xs text-muted-foreground line-through ml-1">
                                  ¥{product.originalPrice}
                                </span>}
                            </div>
                            <Button size="sm" onClick={() => handleAddToCart(product)} className="flex items-center space-x-1">
                              <ShoppingCart className="w-3 h-3" />
                              <span>加购</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div> : <div className="space-y-4">
                  {filteredAndSortedProducts.map(product => <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" onClick={() => handleProductClick(product)} />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium group-hover:text-primary transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                              {product.badge && <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                  {product.badge}
                                </span>}
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1">{product.rating}</span>
                                <span className="text-muted-foreground ml-1">({product.reviews})</span>
                              </div>
                              <span className="text-muted-foreground">已售{product.sales}</span>
                              <span className="text-muted-foreground">库存{product.stock}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-primary">¥{product.price}</span>
                                {product.originalPrice > product.price && <span className="text-sm text-muted-foreground line-through ml-1">
                                    ¥{product.originalPrice}
                                  </span>}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => toggleFavorite(product.id)}>
                                  <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>
                                <Button size="sm" onClick={() => handleAddToCart(product)}>
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  加购
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
            </DataLoader>
          </div>

          {/* 缓存管理按钮（开发环境） */}
          {process.env.NODE_ENV === 'development' && <div className="fixed bottom-24 right-4 space-y-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                刷新缓存
              </Button>
              <Button variant="outline" size="sm" onClick={handleInvalidateCache}>
                清理缓存
              </Button>
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}