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
  const {
    user,
    isAuthenticated
  } = useAuth();
  const {
    products,
    formulas,
    colors,
    loading
  } = useData();
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
        }
        break;
      case 'qr-scanner':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'qr-scanner',
            params: {}
          });
        }
        break;
      case 'color-recognition':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'color-recognition',
            params: {}
          });
        }
        break;
      case 'formula-generation':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'formula-generation',
            params: {}
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
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => $w.utils?.navigateTo({
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
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => $w.utils?.navigateTo({
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
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => $w.utils?.navigateTo({
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