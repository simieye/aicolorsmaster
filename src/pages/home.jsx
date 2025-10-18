// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Home, Package, Bot, Users, TrendingUp, Star, ShoppingCart, Eye, Heart, MessageCircle, Share2, BarChart3, Zap, Shield, Award } from 'lucide-react';

// @ts-ignore;
import { useAuth } from '@/components/AuthProvider';
// @ts-ignore;
import { useData } from '@/components/DataManager';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;

  // 临时模拟数据，避免context错误
  const [user] = useState({
    name: '访客用户',
    lastLogin: new Date().toISOString()
  });
  const [isAuthenticated] = useState(false);
  const [products] = useState([{
    id: 1,
    name: '智能调色机 Pro',
    category: '设备',
    price: 29999,
    description: '高精度智能调色设备，支持AI辅助调色',
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
    description: '便携式色彩分析工具，专业级色彩识别',
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
    description: '全面的配方管理和分析系统',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.7,
    reviews: 56,
    features: ['配方管理', '成本分析', '库存管理', '报表生成'],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z'
  }]);
  const [formulas] = useState([{
    id: 1,
    name: '天空蓝标准配方',
    type: '水性涂料',
    color: '#87CEEB',
    ingredients: [{
      name: '钛白粉',
      amount: 45,
      unit: 'kg'
    }, {
      name: '蓝色颜料',
      amount: 12,
      unit: 'kg'
    }, {
      name: '添加剂',
      amount: 3,
      unit: 'kg'
    }, {
      name: '水',
      amount: 40,
      unit: 'kg'
    }],
    totalWeight: 100,
    cost: 156.8,
    createdBy: 1,
    createdAt: '2024-01-12T14:20:00Z',
    usage: 234
  }, {
    id: 2,
    name: '森林绿环保配方',
    type: '环保涂料',
    color: '#228B22',
    ingredients: [{
      name: '环保树脂',
      amount: 50,
      unit: 'kg'
    }, {
      name: '绿色颜料',
      amount: 8,
      unit: 'kg'
    }, {
      name: '天然填料',
      amount: 30,
      unit: 'kg'
    }, {
      name: '水',
      amount: 12,
      unit: 'kg'
    }],
    totalWeight: 100,
    cost: 189.5,
    createdBy: 1,
    createdAt: '2024-01-11T16:45:00Z',
    usage: 156
  }]);
  const [colors] = useState([{
    id: 1,
    name: '天空蓝',
    hex: '#87CEEB',
    rgb: '135, 206, 235',
    category: '蓝色系',
    pantone: '290 C',
    usage: 89,
    popularity: 4.7,
    description: '清新明亮的天空蓝色，适合室内装饰',
    combinations: ['#FFFFFF', '#F0F8FF', '#4682B4'],
    createdAt: '2024-01-05T11:30:00Z'
  }, {
    id: 2,
    name: '森林绿',
    hex: '#228B22',
    rgb: '34, 139, 34',
    category: '绿色系',
    pantone: '355 C',
    usage: 67,
    popularity: 4.5,
    description: '自然深沉的森林绿色，环保涂料首选',
    combinations: ['#FFFFFF', '#F5DEB3', '#8B4513'],
    createdAt: '2024-01-06T13:15:00Z'
  }, {
    id: 3,
    name: '珊瑚红',
    hex: '#FF7F50',
    rgb: '255, 127, 80',
    category: '红色系',
    pantone: '164 C',
    usage: 45,
    popularity: 4.3,
    description: '温暖活力的珊瑚红色，现代装饰流行色',
    combinations: ['#FFFFFF', '#FFE4B5', '#FF6347'],
    createdAt: '2024-01-07T10:45:00Z'
  }]);
  const [loading] = useState(false);
  const {
    toast
  } = useToast();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularFormulas, setPopularFormulas] = useState([]);
  const [trendingColors, setTrendingColors] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalFormulas: 0,
    totalColors: 0,
    totalUsers: 0
  });

  // 加载数据
  useEffect(() => {
    if (!loading) {
      // 设置特色产品
      setFeaturedProducts(products.slice(0, 3));

      // 设置热门配方
      setPopularFormulas(formulas.slice(0, 3));

      // 设置流行色彩
      setTrendingColors(colors.slice(0, 6));

      // 设置统计数据
      setStats({
        totalProducts: products.length,
        totalFormulas: formulas.length,
        totalColors: colors.length,
        totalUsers: 128 // 模拟数据
      });
    }
  }, [products, formulas, colors, loading]);

  // 处理产品点击
  const handleProductClick = product => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'products',
        params: {
          productId: product.id
        }
      });
    } else {
      toast({
        title: "产品详情",
        description: `查看 ${product.name} 的详细信息`
      });
    }
  };

  // 处理配方点击
  const handleFormulaClick = formula => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'formula-management',
        params: {
          formulaId: formula.id
        }
      });
    } else {
      toast({
        title: "配方详情",
        description: `查看 ${formula.name} 的详细信息`
      });
    }
  };

  // 处理色彩点击
  const handleColorClick = color => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'color-library',
        params: {
          colorId: color.id
        }
      });
    } else {
      toast({
        title: "色彩详情",
        description: `查看 ${color.name} 的详细信息`
      });
    }
  };

  // 快速操作
  const handleQuickAction = action => {
    switch (action) {
      case 'ai-chat':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'ai-chat',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "AI聊天功能正在开发中，敬请期待"
          });
        }
        break;
      case 'qr-scanner':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'qr-scanner',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "扫码功能正在开发中，敬请期待"
          });
        }
        break;
      case 'color-recognition':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'color-recognition',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "色彩识别功能正在开发中，敬请期待"
          });
        }
        break;
      case 'formula-generation':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'formula-generation',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "配方生成功能正在开发中，敬请期待"
          });
        }
        break;
      default:
        toast({
          title: "功能开发中",
          description: "该功能正在开发中，敬请期待"
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
      {/* 头部欢迎区域 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isAuthenticated ? `欢迎回来，${user?.name}！` : '欢迎来到智能调色系统'}
              </h1>
              <p className="text-white/80">
                {isAuthenticated ? '探索智能调色的无限可能' : '登录以体验完整功能'}
              </p>
            </div>
            
            {isAuthenticated && <div className="text-right">
                <p className="text-white/60 text-sm">上次登录</p>
                <p className="text-white">{new Date(user?.lastLogin || Date.now()).toLocaleDateString()}</p>
              </div>}
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 统计数据卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalProducts}</div>
              <div className="text-sm text-white/80">产品总数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalFormulas}</div>
              <div className="text-sm text-white/80">配方总数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-white">{stats.totalColors}</div>
              <div className="text-sm text-white/80">色彩总数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <div className="text-sm text-white/80">用户总数</div>
            </CardContent>
          </Card>
        </div>

        {/* 快速操作 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              快速操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => handleQuickAction('ai-chat')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
                <Bot className="w-6 h-6 mb-2" />
                <span className="text-sm">AI助手</span>
              </Button>
              
              <Button onClick={() => handleQuickAction('qr-scanner')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
                <div className="w-6 h-6 bg-white rounded mb-2"></div>
                <span className="text-sm">扫码识别</span>
              </Button>
              
              <Button onClick={() => handleQuickAction('color-recognition')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-blue-400 rounded mb-2"></div>
                <span className="text-sm">色彩识别</span>
              </Button>
              
              <Button onClick={() => handleQuickAction('formula-generation')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-yellow-400 rounded mb-2"></div>
                <span className="text-sm">配方生成</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 特色产品 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                特色产品
              </span>
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => $w.utils?.navigateTo && $w.utils.navigateTo({
              pageId: 'products',
              params: {}
            })}>
                查看全部
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map(product => <div key={product.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleProductClick(product)}>
                  <div className="aspect-video bg-white/10 rounded-lg mb-4 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">¥{product.price.toLocaleString()}</span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 热门配方 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                热门配方
              </span>
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => $w.utils?.navigateTo && $w.utils.navigateTo({
              pageId: 'formula-management',
              params: {}
            })}>
                查看全部
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularFormulas.map(formula => <div key={formula.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleFormulaClick(formula)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg border-2 border-white/20" style={{
                    backgroundColor: formula.color
                  }}></div>
                      <div>
                        <h4 className="text-white font-semibold">{formula.name}</h4>
                        <p className="text-white/60 text-sm">{formula.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">¥{formula.cost}</div>
                      <div className="text-white/60 text-sm">使用 {formula.usage} 次</div>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 流行色彩 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <div className="w-5 h-5 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full mr-2"></div>
                流行色彩
              </span>
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => $w.utils?.navigateTo && $w.utils.navigateTo({
              pageId: 'color-library',
              params: {}
            })}>
                查看全部
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {trendingColors.map(color => <div key={color.id} className="text-center cursor-pointer group" onClick={() => handleColorClick(color)}>
                  <div className="w-full aspect-square rounded-lg border-2 border-white/20 mb-2 group-hover:scale-105 transition-transform" style={{
                backgroundColor: color.hex
              }}></div>
                  <p className="text-white text-sm font-medium">{color.name}</p>
                  <p className="text-white/60 text-xs">{color.hex}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="home" />
    </div>;
}