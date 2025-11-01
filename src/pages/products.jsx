// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, ShoppingCart, Heart, Star, Sparkles, TrendingUp, Clock, Eye, RefreshCw, Settings, Loader2, Brain } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function ProductsPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    viewedProducts: [],
    favoriteCategories: [],
    pricePreference: 'medium',
    colorPreference: []
  });
  const categories = [{
    value: 'all',
    label: '全部分类'
  }, {
    value: 'hair-dye',
    label: '染发剂'
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
  const priceRanges = [{
    value: 'all',
    label: '全部价格'
  }, {
    value: '0-100',
    label: '0-100元'
  }, {
    value: '100-300',
    label: '100-300元'
  }, {
    value: '300-500',
    label: '300-500元'
  }, {
    value: '500+',
    label: '500元以上'
  }];
  const sortOptions = [{
    value: 'name',
    label: '按名称'
  }, {
    value: 'price-low',
    label: '价格从低到高'
  }, {
    value: 'price-high',
    label: '价格从高到低'
  }, {
    value: 'rating',
    label: '按评分'
  }, {
    value: 'sales',
    label: '按销量'
  }];
  useEffect(() => {
    loadProducts();
    loadUserPreferences();
    loadRecommendations();
  }, []);
  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // 模拟加载产品数据
      const mockProducts = [{
        id: 'PROD001',
        name: 'AI智能染发剂 - 自然棕色',
        category: 'hair-dye',
        price: 149.00,
        originalPrice: 199.00,
        rating: 4.8,
        sales: 1234,
        image: 'https://picsum.photos/seed/product1/300/300.jpg',
        description: '采用AI技术调配的天然染发剂，温和不刺激',
        features: ['AI调配', '天然成分', '持久显色'],
        tags: ['热销', '推荐']
      }, {
        id: 'PROD002',
        name: '专业染发工具套装',
        category: 'tools',
        price: 299.00,
        originalPrice: 399.00,
        rating: 4.9,
        sales: 856,
        image: 'https://picsum.photos/seed/product2/300/300.jpg',
        description: '专业级染发工具，包含所有必备配件',
        features: ['专业级', '全套配件', '耐用材质'],
        tags: ['专业']
      }, {
        id: 'PROD003',
        name: '色彩调配配件包',
        category: 'accessories',
        price: 89.00,
        originalPrice: 129.00,
        rating: 4.6,
        sales: 2341,
        image: 'https://picsum.photos/seed/product3/300/300.jpg',
        description: '多种色彩调配配件，满足不同需求',
        features: ['多色可选', '调配精准', '使用简便'],
        tags: ['热销']
      }, {
        id: 'PROD004',
        name: 'AI染发套装',
        category: 'kits',
        price: 399.00,
        originalPrice: 599.00,
        rating: 4.7,
        sales: 567,
        image: 'https://picsum.photos/seed/product4/300/300.jpg',
        description: '包含染发剂、工具和配件的完整套装',
        features: ['AI智能', '完整套装', '性价比高'],
        tags: ['套装', '推荐']
      }, {
        id: 'PROD005',
        name: '植物染发剂',
        category: 'hair-dye',
        price: 179.00,
        originalPrice: 229.00,
        rating: 4.5,
        sales: 1890,
        image: 'https://picsum.photos/seed/product5/300/300.jpg',
        description: '纯植物提取，安全温和的染发产品',
        features: ['植物提取', '安全温和', '自然色泽'],
        tags: ['天然', '安全']
      }];
      setProducts(mockProducts);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载产品列表",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const loadUserPreferences = () => {
    // 从本地存储或用户数据中获取偏好设置
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      setUserPreferences(JSON.parse(saved));
    }
  };
  const loadRecommendations = async () => {
    setIsRecommendationsLoading(true);
    try {
      const currentUser = $w?.auth?.currentUser;
      const userProfile = {
        userId: currentUser?.userId,
        userName: currentUser?.nickName || currentUser?.name,
        viewedProducts: userPreferences.viewedProducts,
        favoriteCategories: userPreferences.favoriteCategories,
        pricePreference: userPreferences.pricePreference,
        colorPreference: userPreferences.colorPreference
      };
      const aiRecommendations = await deepseekService.getProductRecommendations(userProfile, {
        category: selectedCategory,
        priceRange: priceRange
      });
      setRecommendations(aiRecommendations.recommendations || []);
    } catch (error) {
      console.error('加载推荐失败:', error);
      // 设置默认推荐
      setRecommendations([{
        name: 'AI智能染发剂',
        reason: '基于您的浏览历史推荐',
        suitable: '适合您的需求',
        notes: '高品质产品',
        price: 199,
        rating: 4.8,
        image: 'https://picsum.photos/seed/rec1/200/200.jpg',
        productId: 'PROD001'
      }]);
    } finally {
      setIsRecommendationsLoading(false);
    }
  };
  const filterProducts = () => {
    let filtered = [...products];

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 价格过滤
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
      filtered = filtered.filter(product => {
        if (max === Infinity) {
          return product.price >= min;
        }
        return product.price >= min && product.price <= max;
      });
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'sales':
          return b.sales - a.sales;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(filtered);
  };
  const handleProductClick = product => {
    // 记录用户浏览历史
    const newViewedProducts = [product.id, ...userPreferences.viewedProducts.filter(id => id !== product.id)].slice(0, 10);
    const newPreferences = {
      ...userPreferences,
      viewedProducts: newViewedProducts
    };
    setUserPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));

    // 跳转到产品详情页
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          productId: product.id
        }
      });
    }
  };
  const handleAddToCart = async product => {
    try {
      // 这里可以调用API添加到购物车
      toast({
        title: "添加成功",
        description: `${product.name} 已添加到购物车`
      });
    } catch (error) {
      toast({
        title: "添加失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleToggleFavorite = async product => {
    try {
      // 这里可以调用API切换收藏状态
      toast({
        title: "操作成功",
        description: `${product.name} 收藏状态已更新`
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleRefreshRecommendations = () => {
    loadRecommendations();
  };
  const handleRecommendationFeedback = (recommendationId, feedback) => {
    // 记录用户对推荐的反馈
    console.log('推荐反馈:', recommendationId, feedback);
    toast({
      title: "感谢反馈",
      description: "您的反馈将帮助我们改进推荐算法"
    });
  };
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="产品中心" showBack={true} />
        
        <div className="pb-20">
          {/* AI智能推荐区域 */}
          {showRecommendations && <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-8 h-8" />
                    <h2 className="text-xl font-bold">AI智能推荐</h2>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      基于您的浏览历史
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleRefreshRecommendations} disabled={isRecommendationsLoading} className="text-white hover:bg-white/10">
                      {isRecommendationsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowRecommendations(false)} className="text-white hover:bg-white/10">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {isRecommendationsLoading ? <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div> : <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recommendations.slice(0, 4).map((rec, index) => <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-colors" onClick={() => rec.productId && handleProductClick({
                id: rec.productId,
                name: rec.name,
                price: rec.price,
                image: rec.image
              })}>
                        <div className="relative mb-3">
                          <img src={rec.image || 'https://picsum.photos/seed/rec' + index + '/200/200.jpg'} alt={rec.name} className="w-full h-32 object-cover rounded-lg" />
                          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>AI推荐</span>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{rec.name}</h3>
                        <p className="text-xs text-purple-100 mb-2 line-clamp-2">{rec.reason}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">¥{rec.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs">{rec.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex space-x-1">
                          <Button size="sm" variant="secondary" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleRecommendationFeedback(rec.id, 'like');
                  }}>
                            👍 喜欢
                          </Button>
                          <Button size="sm" variant="secondary" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleRecommendationFeedback(rec.id, 'dislike');
                  }}>
                            👎 不喜欢
                          </Button>
                        </div>
                      </div>)}
                  </div>}
              </div>
            </div>}

          {/* 搜索和筛选 */}
          <div className="bg-card border-b p-4 space-y-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索产品名称或描述..." className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            
            {/* 筛选选项 */}
            <div className="flex flex-wrap gap-2">
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {categories.map(category => <option key={category.value} value={category.value}>
                    {category.label}
                  </option>)}
              </select>
              
              <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {priceRanges.map(range => <option key={range.value} value={range.value}>
                    {range.label}
                  </option>)}
              </select>
              
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {sortOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
            </div>
          </div>

          {/* 产品列表 */}
          <div className="p-4">
            {isLoading ? <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div> : filteredProducts.length === 0 ? <div className="text-center py-12">
                <div className="text-muted-foreground">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>未找到匹配的产品</p>
                </div>
              </div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleProductClick(product)}>
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      {product.originalPrice > product.price && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>}
                      <div className="absolute top-2 right-2 flex flex-col space-y-1">
                        {product.tags.map((tag, index) => <div key={index} className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                            {tag}
                          </div>)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({product.sales})</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-red-500">¥{product.price.toFixed(2)}</span>
                          {product.originalPrice > product.price && <span className="text-sm text-muted-foreground line-through ml-2">
                              ¥{product.originalPrice.toFixed(2)}
                            </span>}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1" onClick={e => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}>
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          购买
                        </Button>
                        <Button variant="outline" size="sm" onClick={e => {
                    e.stopPropagation();
                    handleToggleFavorite(product);
                  }}>
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}