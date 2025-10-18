// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Home, Package, Bot, Users, TrendingUp, Star, ShoppingCart, Eye, Heart, MessageCircle, Share2, BarChart3, Zap, Shield, Award } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;

  // 临时模拟数据，避免context错误 - 更新为AI美发相关产品
  const [user] = useState({
    name: '访客用户',
    lastLogin: new Date().toISOString()
  });
  const [isAuthenticated] = useState(false);
  const [products] = useState([{
    id: 1,
    name: 'AI智能染发自动调色宝机',
    category: '智能设备',
    price: 4980,
    description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程',
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
  const [formulas] = useState([{
    id: 1,
    name: '时尚奶茶色染发配方',
    type: '潮流染发',
    color: '#D2B48C',
    ingredients: [{
      name: '奶茶色染发剂',
      amount: 60,
      unit: 'ml'
    }, {
      name: '双氧奶',
      amount: 60,
      unit: 'ml'
    }, {
      name: '护色精华',
      amount: 10,
      unit: 'ml'
    }, {
      name: '修护精华',
      amount: 5,
      unit: 'ml'
    }],
    totalWeight: 135,
    cost: 89.9,
    createdBy: 1,
    createdAt: '2024-01-12T14:20:00Z',
    usage: 456
  }, {
    id: 2,
    name: '高级灰金色染发配方',
    type: '高端染发',
    color: '#C0C0C0',
    ingredients: [{
      name: '灰金色染发剂',
      amount: 75,
      unit: 'ml'
    }, {
      name: '9%双氧奶',
      amount: 75,
      unit: 'ml'
    }, {
      name: '抗褪色剂',
      amount: 15,
      unit: 'ml'
    }, {
      name: '光泽精华',
      amount: 8,
      unit: 'ml'
    }],
    totalWeight: 173,
    cost: 128.5,
    createdBy: 1,
    createdAt: '2024-01-11T16:45:00Z',
    usage: 289
  }]);
  const [colors] = useState([{
    id: 1,
    name: '奶茶色',
    hex: '#D2B48C',
    rgb: '210, 180, 140',
    category: '棕色系',
    pantone: '4685 C',
    usage: 156,
    popularity: 4.8,
    description: '温柔自然的奶茶色，适合各种肤色，是当下最流行的发色之一',
    combinations: ['#8B4513', '#F5DEB3', '#DEB887'],
    createdAt: '2024-01-05T11:30:00Z'
  }, {
    id: 2,
    name: '灰金色',
    hex: '#C0C0C0',
    rgb: '192, 192, 192',
    category: '金色系',
    pantone: '877 C',
    usage: 134,
    popularity: 4.6,
    description: '高级感十足的灰金色，时尚前卫，适合追求个性的年轻人群',
    combinations: ['#FFFFFF', '#808080', '#FFD700'],
    createdAt: '2024-01-06T13:15:00Z'
  }, {
    id: 3,
    name: '玫瑰粉',
    hex: '#FFB6C1',
    rgb: '255, 182, 193',
    category: '粉色系',
    pantone: '706 C',
    usage: 98,
    popularity: 4.4,
    description: '浪漫甜美的玫瑰粉，充满少女感，适合皮肤白皙的人群',
    combinations: ['#FFFFFF', '#FFC0CB', '#FF69B4'],
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
                {isAuthenticated ? `欢迎回来，${user?.name}！` : '欢迎来到AI美发智能系统'}
              </h1>
              <p className="text-white/80">
                {isAuthenticated ? '探索AI美发的无限可能' : '登录以体验完整功能'}
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
              <div className="text-sm text-white/80">AI产品总数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalFormulas}</div>
              <div className="text-sm text-white/80">染发配方总数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-white">{stats.totalColors}</div>
              <div className="text-sm text-white/80">流行色彩总数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <div className="text-sm text-white/80">合作门店总数</div>
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
                <span className="text-sm">AI染发顾问</span>
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
                热门AI美发产品
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
                热门染发配方
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
                流行发色趋势
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