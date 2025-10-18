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

  // 临时模拟数据
  const [user] = useState({
    name: '访客用户',
    role: 'user',
    permissions: ['product:read']
  });
  const [isAuthenticated] = useState(false);
  const [products] = useState([{
    id: 1,
    name: '智能调色机 Pro',
    category: '设备',
    price: 29999,
    description: '高精度智能调色设备，支持AI辅助调色，适用于专业调色场景',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
    stock: 50,
    rating: 4.8,
    reviews: 128,
    features: ['AI智能调色', '高精度传感器', '云端同步', '移动端控制'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }, {
    id: 2,
    name: '色彩分析仪 Lite',
    category: '设备',
    price: 8999,
    description: '便携式色彩分析工具，专业级色彩识别，适合现场使用',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
    stock: 120,
    rating: 4.6,
    reviews: 89,
    features: ['便携设计', '专业级精度', '蓝牙连接', 'APP控制'],
    createdAt: '2024-01-10T15:30:00Z',
    updatedAt: '2024-01-10T15:30:00Z'
  }, {
    id: 3,
    name: '配方管理系统',
    category: '软件',
    price: 4999,
    description: '全面的配方管理和分析系统，支持成本分析和库存管理',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.7,
    reviews: 56,
    features: ['配方管理', '成本分析', '库存管理', '报表生成'],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z'
  }, {
    id: 4,
    name: '智能配色助手',
    category: '软件',
    price: 2999,
    description: 'AI驱动的配色建议工具，提供专业的色彩搭配方案',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.5,
    reviews: 34,
    features: ['AI配色建议', '色彩趋势分析', '搭配方案生成', '历史记录管理'],
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-05T14:20:00Z'
  }, {
    id: 5,
    name: '环保涂料套装',
    category: '材料',
    price: 1599,
    description: '环保型涂料套装，包含基础色彩和工具',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=200&fit=crop',
    stock: 200,
    rating: 4.4,
    reviews: 67,
    features: ['环保配方', '无毒无害', '易于施工', '持久耐用'],
    createdAt: '2024-01-03T11:45:00Z',
    updatedAt: '2024-01-03T11:45:00Z'
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
              <h1 className="text-3xl font-bold text-white mb-2">产品中心</h1>
              <p className="text-white/80">探索我们的智能调色产品系列</p>
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
                <Input placeholder="搜索产品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
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