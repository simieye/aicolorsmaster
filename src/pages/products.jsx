// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, ShoppingCart, Eye, Heart, Star, Package, TrendingUp, Grid, List, Plus, Edit, Trash2 } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function ProductsPage(props) {
  const {
    $w,
    style
  } = props;

  // 临时模拟数据 - 更新为AI美发相关产品
  const [user] = useState({
    name: '访客用户',
    role: 'user',
    permissions: ['product:read']
  });
  const [isAuthenticated] = useState(false);
  const [products] = useState([{
    id: 1,
    name: 'AI智能染发自动调色宝机',
    category: '智能设备',
    price: 4980,
    description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程，大幅提升门店效率',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop',
    stock: 50,
    rating: 4.9,
    reviews: 256,
    features: ['AI发质识别', '精准自动调色', '一键操作', '智能温控'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }, {
    id: 2,
    name: 'AI品牌染发膏管理系统',
    category: '管理软件',
    price: 1680,
    description: '专业染发膏库存管理系统，智能预警、批次追踪、成本控制，让染发产品管理更高效',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.7,
    reviews: 128,
    features: ['智能库存管理', '批次追踪', '成本分析', '预警提醒'],
    createdAt: '2024-01-10T15:30:00Z',
    updatedAt: '2024-01-10T15:30:00Z'
  }, {
    id: 3,
    name: 'AI客户配方管理系统',
    category: '管理软件',
    price: 2680,
    description: '智能客户染发配方管理，记录客户偏好、历史配方、过敏信息，提供个性化服务体验',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.8,
    reviews: 189,
    features: ['客户档案管理', '配方历史记录', '过敏信息提醒', '个性化推荐'],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z'
  }, {
    id: 4,
    name: 'AI美发连锁门店管理系统',
    category: '管理软件',
    price: 3680,
    description: '专为美发连锁店设计的一体化管理解决方案，涵盖预约、员工、财务、营销等全方位管理',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.6,
    reviews: 167,
    features: ['多店统一管理', '智能预约系统', '员工绩效管理', '财务报表分析'],
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-05T14:20:00Z'
  }, {
    id: 5,
    name: 'AI美发客户管理系统CRM',
    category: '管理软件',
    price: 6800,
    description: '专业美发行业CRM系统，客户关系维护、营销自动化、数据分析，助力门店业绩增长',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.8,
    reviews: 234,
    features: ['客户关系管理', '营销自动化', '数据分析洞察', '会员积分系统'],
    createdAt: '2024-01-03T11:45:00Z',
    updatedAt: '2024-01-03T11:45:00Z'
  }, {
    id: 6,
    name: 'AI染发色彩大师AI原生开源SaaS系统',
    category: 'SaaS平台',
    price: 8800,
    description: '基于AI原生技术开发的染发色彩管理SaaS平台，开源架构、云端部署、支持定制化开发',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.9,
    reviews: 312,
    features: ['AI原生架构', '开源可定制', '云端SaaS部署', 'API接口丰富'],
    createdAt: '2024-01-01T16:30:00Z',
    updatedAt: '2024-01-01T16:30:00Z'
  }]);
  const [loading] = useState(false);
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 权限检查函数
  const hasPermission = permission => {
    return user?.permissions?.includes(permission) || user?.permissions?.includes('admin');
  };

  // 过滤和排序产品
  useEffect(() => {
    let filtered = products;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // 获取分类列表
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // 处理产品操作
  const handleProductClick = product => {
    toast({
      title: "产品详情",
      description: `查看 ${product.name} 的详细信息`
    });
  };
  const handleAddToCart = product => {
    if (!isAuthenticated) {
      toast({
        title: "请先登录",
        description: "登录后才能添加到购物车",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "添加成功",
      description: `${product.name} 已添加到购物车`
    });
  };
  const handleToggleFavorite = product => {
    if (!isAuthenticated) {
      toast({
        title: "请先登录",
        description: "登录后才能收藏产品",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "收藏成功",
      description: `${product.name} 已添加到收藏`
    });
  };
  const handleEditProduct = product => {
    if (!hasPermission('product:write')) {
      toast({
        title: "权限不足",
        description: "您没有编辑产品的权限",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "编辑产品",
      description: `正在编辑 ${product.name}`
    });
  };
  const handleDeleteProduct = product => {
    if (!hasPermission('product:write')) {
      toast({
        title: "权限不足",
        description: "您没有删除产品的权限",
        variant: "destructive"
      });
      return;
    }
    if (confirm(`确定要删除产品 ${product.name} 吗？`)) {
      toast({
        title: "删除成功",
        description: `${product.name} 已删除`
      });
    }
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>加载中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">AI美发产品中心</h1>
              <p className="text-white/80">探索智能美发解决方案，提升门店效率与服务质量</p>
            </div>
            
            {hasPermission('product:write') && <Button onClick={() => toast({
            title: "添加产品",
            description: "产品添加功能正在开发中"
          })} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <Plus className="w-4 h-4 mr-2" />
                添加产品
              </Button>}
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 搜索和筛选 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input placeholder="搜索AI美发产品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
              </div>

              {/* 分类筛选 */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category} value={category} className="text-gray-800">
                      {category === 'all' ? '全部分类' : category}
                    </SelectItem>)}
                </SelectContent>
              </Select>

              {/* 排序 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name" className="text-gray-800">按名称</SelectItem>
                  <SelectItem value="price" className="text-gray-800">按价格</SelectItem>
                  <SelectItem value="rating" className="text-gray-800">按评分</SelectItem>
                  <SelectItem value="created" className="text-gray-800">按时间</SelectItem>
                </SelectContent>
              </Select>

              {/* 视图切换 */}
              <div className="flex bg-white/10 rounded-lg border border-white/20">
                <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="text-white">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="text-white">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 产品列表 */}
        {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => <Card key={product.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
                  <CardHeader className="p-4">
                    <div className="aspect-video bg-white/10 rounded-lg overflow-hidden mb-4">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer" onClick={() => handleProductClick(product)} />
                    </div>
                    <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-bold text-xl">¥{product.price.toLocaleString()}</span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm ml-1">{product.rating}</span>
                        <span className="text-white/60 text-sm ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/60 text-sm">库存: {product.stock}</span>
                      <span className="text-white/60 text-sm">{product.category}</span>
                    </div>

                    {/* 产品特性标签 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.features.slice(0, 2).map((feature, index) => <span key={index} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
                          {feature}
                        </span>)}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleAddToCart(product)} className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        购买
                      </Button>
                      
                      <Button variant="ghost" size="sm" onClick={() => handleToggleFavorite(product)} className="text-white/80 hover:text-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      
                      <Button variant="ghost" size="sm" onClick={() => handleProductClick(product)} className="text-white/80 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {hasPermission('product:write') && <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)} className="text-white/80 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product)} className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>}
                    </div>
                  </CardContent>
                </Card>)}
            </div> : <div className="space-y-4">
              {filteredProducts.map(product => <Card key={product.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                            <p className="text-white/60 text-sm mb-3 line-clamp-2">{product.description}</p>
                            
                            {/* 产品特性标签 */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {product.features.slice(0, 3).map((feature, index) => <span key={index} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
                                  {feature}
                                </span>)}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-white font-bold">¥{product.price.toLocaleString()}</span>
                              <div className="flex items-center text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="ml-1">{product.rating}</span>
                              </div>
                              <span className="text-white/60">库存: {product.stock}</span>
                              <span className="text-white/60">{product.category}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button onClick={() => handleAddToCart(product)} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                            
                            <Button variant="ghost" size="sm" onClick={() => handleToggleFavorite(product)} className="text-white/80 hover:text-white">
                              <Heart className="w-4 h-4" />
                            </Button>
                            
                            <Button variant="ghost" size="sm" onClick={() => handleProductClick(product)} className="text-white/80 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            
                            {hasPermission('product:write') && <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)} className="text-white/80 hover:text-white">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product)} className="text-red-400 hover:text-red-300">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}

        {filteredProducts.length === 0 && <div className="text-center py-12">
              <Package className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">没有找到产品</h3>
              <p className="text-white/60">尝试调整搜索条件或筛选器</p>
            </div>}
        </main>

        {/* 底部导航 */}
        <TabBar currentPage="products" />
      </div>;
}