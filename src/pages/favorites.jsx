// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Heart, HeartOff, Search, Filter, Grid, List, ShoppingCart, Eye, Share2, Trash2, Star, TrendingUp, Clock } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

// @ts-ignore;

export default function FavoritesPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBatchActions, setShowBatchActions] = useState(false);
  const categories = [{
    value: 'all',
    label: '全部分类'
  }, {
    value: 'hair-dye',
    label: '染发产品'
  }, {
    value: 'tools',
    label: '工具设备'
  }, {
    value: 'accessories',
    label: '配件用品'
  }, {
    value: 'kits',
    label: '套装组合'
  }];
  const sortOptions = [{
    value: 'date',
    label: '收藏时间'
  }, {
    value: 'price-low',
    label: '价格从低到高'
  }, {
    value: 'price-high',
    label: '价格从高到低'
  }, {
    value: 'name',
    label: '名称排序'
  }, {
    value: 'popularity',
    label: '热门程度'
  }];
  useEffect(() => {
    loadFavorites();
  }, []);
  useEffect(() => {
    filterAndSortFavorites();
  }, [favorites, searchTerm, categoryFilter, sortBy]);
  useEffect(() => {
    setShowBatchActions(selectedItems.length > 0);
  }, [selectedItems]);
  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      // 模拟加载收藏数据
      const mockFavorites = [{
        id: 'FAV001',
        productId: 'PROD001',
        name: 'AI智能染发剂 - 自然棕色',
        price: 149.00,
        originalPrice: 199.00,
        image: 'https://picsum.photos/seed/fav1/200/200.jpg',
        category: 'hair-dye',
        rating: 4.8,
        sales: 1234,
        favoritedAt: '2024-01-15T10:30:00Z',
        description: '采用AI技术调配的天然染发剂，温和不刺激'
      }, {
        id: 'FAV002',
        productId: 'PROD002',
        name: '专业染发工具套装',
        price: 299.00,
        originalPrice: 399.00,
        image: 'https://picsum.photos/seed/fav2/200/200.jpg',
        category: 'tools',
        rating: 4.9,
        sales: 856,
        favoritedAt: '2024-01-14T15:20:00Z',
        description: '专业级染发工具，包含所有必备配件'
      }, {
        id: 'FAV003',
        productId: 'PROD003',
        name: '色彩调配配件包',
        price: 89.00,
        originalPrice: 129.00,
        image: 'https://picsum.photos/seed/fav3/200/200.jpg',
        category: 'accessories',
        rating: 4.6,
        sales: 2341,
        favoritedAt: '2024-01-13T09:45:00Z',
        description: '多种色彩调配配件，满足不同需求'
      }];
      setFavorites(mockFavorites);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载收藏列表",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const filterAndSortFavorites = () => {
    let filtered = [...favorites];

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 分类过滤
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return b.sales - a.sales;
        case 'date':
        default:
          return new Date(b.favoritedAt) - new Date(a.favoritedAt);
      }
    });
    setFilteredFavorites(filtered);
  };
  const handleToggleFavorite = async itemId => {
    try {
      // 这里可以调用API取消收藏
      setFavorites(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "取消收藏",
        description: "商品已从收藏列表移除"
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleSelectItem = itemId => {
    setSelectedItems(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };
  const handleSelectAll = () => {
    if (selectedItems.length === filteredFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFavorites.map(item => item.id));
    }
  };
  const handleBatchDelete = async () => {
    try {
      // 这里可以调用API批量删除
      setFavorites(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      toast({
        title: "删除成功",
        description: `已删除 ${selectedItems.length} 个收藏`
      });
    } catch (error) {
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleAddToCart = async item => {
    try {
      // 这里可以调用API添加到购物车
      toast({
        title: "添加成功",
        description: `${item.name} 已添加到购物车`
      });
    } catch (error) {
      toast({
        title: "添加失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleViewProduct = productId => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          productId
        }
      });
    }
  };
  const handleShare = async item => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.origin + '/product/' + item.productId
        });
      } catch (error) {
        console.log('分享取消');
      }
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.origin + '/product/' + item.productId);
      toast({
        title: "链接已复制",
        description: "商品链接已复制到剪贴板"
      });
    }
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  const renderGridView = () => <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredFavorites.map(item => <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0" onClick={() => handleToggleFavorite(item.id)}>
                <HeartOff className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0" onClick={() => handleSelectItem(item.id)}>
                <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => {}} className="w-4 h-4" />
              </Button>
            </div>
            {item.originalPrice > item.price && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{Math.round((1 - item.price / item.originalPrice) * 100)}%
              </div>}
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">{item.rating}</span>
              <span className="text-xs text-muted-foreground">({item.sales})</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-red-500 font-semibold">¥{item.price.toFixed(2)}</span>
                {item.originalPrice > item.price && <span className="text-xs text-muted-foreground line-through ml-1">
                    ¥{item.originalPrice.toFixed(2)}
                  </span>}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => handleViewProduct(item.productId)}>
                <Eye className="w-3 h-3 mr-1" />
                查看
              </Button>
              <Button size="sm" className="flex-1" onClick={() => handleAddToCart(item)}>
                <ShoppingCart className="w-3 h-3 mr-1" />
                购买
              </Button>
            </div>
          </CardContent>
        </Card>)}
    </div>;
  const renderListView = () => <div className="space-y-4">
      {filteredFavorites.map(item => <Card key={item.id} className="overflow-hidden">
          <div className="flex">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                    <span>销量 {item.sales}</span>
                    <span>收藏于 {formatDate(item.favoritedAt)}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="mb-2">
                    <span className="text-red-500 font-semibold">¥{item.price.toFixed(2)}</span>
                    {item.originalPrice > item.price && <div className="text-xs text-muted-foreground line-through">
                        ¥{item.originalPrice.toFixed(2)}
                      </div>}
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => handleToggleFavorite(item.id)}>
                      <HeartOff className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleShare(item)}>
                      <Share2 className="w-3 h-3" />
                    </Button>
                    <Button size="sm" onClick={() => handleAddToCart(item)}>
                      <ShoppingCart className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>)}
    </div>;
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="我的收藏" showBack={true} />
        
        <div className="pb-20">
          {/* 搜索和筛选 */}
          <div className="bg-card border-b p-4 space-y-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索收藏的商品..." className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            
            {/* 筛选选项 */}
            <div className="flex flex-wrap gap-2">
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {categories.map(category => <option key={category.value} value={category.value}>
                    {category.label}
                  </option>)}
              </select>
              
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {sortOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
              
              <div className="flex border rounded-lg">
                <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="rounded-r-none">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="rounded-l-none">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* 批量操作 */}
            {showBatchActions && <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedItems.length === filteredFavorites.length} onChange={handleSelectAll} className="w-4 h-4" />
                  <span className="text-sm">已选择 {selectedItems.length} 项</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleBatchDelete}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    删除
                  </Button>
                </div>
              </div>}
          </div>

          {/* 收藏列表 */}
          <div className="p-4">
            {isLoading ? <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div> : filteredFavorites.length === 0 ? <div className="text-center py-8">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">暂无收藏</p>
                <Button className="mt-4" onClick={() => $w?.utils?.navigateTo({
              pageId: 'products'
            })}>
                  去逛逛
                </Button>
              </div> : viewMode === 'grid' ? renderGridView() : renderListView()}
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}