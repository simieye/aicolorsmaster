// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Home, Package, Bot, Users, User, BarChart3, TrendingUp, ShoppingCart, Star, Clock, Eye, Heart, MessageSquare, Settings, LogOut, Bell, Search, Filter, Grid, List, Store } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { useAuth } from '@/components/AuthProvider';
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;
  const {
    user,
    logout,
    hasPermission
  } = useAuth();
  const {
    toast
  } = useToast();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalFormulas: 0,
    totalColors: 0,
    totalStores: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [popularFormulas, setPopularFormulas] = useState([]);
  const [recentColors, setRecentColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 加载统计数据
        const [productsResult, formulasResult, colorsResult, storesResult] = await Promise.all([$w.cloud.callDataSource({
          dataSourceName: 'products',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            getCount: true,
            pageSize: 1
          }
        }), $w.cloud.callDataSource({
          dataSourceName: 'formulas',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            getCount: true,
            pageSize: 1
          }
        }), $w.cloud.callDataSource({
          dataSourceName: 'colors',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            getCount: true,
            pageSize: 1
          }
        }), $w.cloud.callDataSource({
          dataSourceName: 'stores',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            getCount: true,
            pageSize: 1
          }
        })]);
        setStats({
          totalProducts: productsResult.total || 0,
          totalFormulas: formulasResult.total || 0,
          totalColors: colorsResult.total || 0,
          totalStores: storesResult.total || 0
        });

        // 加载最近产品
        const recentProductsResult = await $w.cloud.callDataSource({
          dataSourceName: 'products',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            orderBy: [{
              createdAt: 'desc'
            }],
            pageSize: 6
          }
        });
        setRecentProducts(recentProductsResult.records || []);

        // 加载热门配方
        const popularFormulasResult = await $w.cloud.callDataSource({
          dataSourceName: 'formulas',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            orderBy: [{
              likes: 'desc'
            }],
            pageSize: 4
          }
        });
        setPopularFormulas(popularFormulasResult.records || []);

        // 加载最新颜色
        const recentColorsResult = await $w.cloud.callDataSource({
          dataSourceName: 'colors',
          methodName: 'wedaGetRecordsV2',
          params: {
            select: {
              $master: true
            },
            orderBy: [{
              createdAt: 'desc'
            }],
            pageSize: 8
          }
        });
        setRecentColors(recentColorsResult.records || []);
      } catch (error) {
        console.error('加载数据失败:', error);
        toast({
          title: "加载失败",
          description: "无法加载首页数据",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 处理用户登出
  const handleLogout = () => {
    logout();
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'login',
        params: {}
      });
    }
  };

  // 导航到页面
  const navigateTo = pageId => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }
  };

  // 格式化日期
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">加载中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-xl font-bold text-white">智能涂料管理系统</h1>
                <p className="text-sm text-white/80">欢迎回来，{user?.username || '用户'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* 通知按钮 */}
              <Button variant="ghost" className="text-white hover:bg-white/20 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
              {/* 设置按钮 */}
              <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => navigateTo('user-management')}>
                <Settings className="w-5 h-5" />
              </Button>
              
              {/* 用户菜单 */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm">{user?.username}</span>
                <Button variant="ghost" className="text-white hover:bg-white/20" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">产品总数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">配方总数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalFormulas}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">颜色总数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalColors}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-blue-400 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">门店总数</p>
                  <p className="text-2xl font-bold text-white">{stats.totalStores}</p>
                </div>
                <Store className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快捷操作 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">快捷操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => navigateTo('products')} className="bg-blue-500 hover:bg-blue-600 text-white h-20 flex flex-col">
                <Package className="w-6 h-6 mb-2" />
                <span>产品管理</span>
              </Button>
              
              <Button onClick={() => navigateTo('formula-management')} className="bg-green-500 hover:bg-green-600 text-white h-20 flex flex-col">
                <BarChart3 className="w-6 h-6 mb-2" />
                <span>配方管理</span>
              </Button>
              
              <Button onClick={() => navigateTo('color-library')} className="bg-purple-500 hover:bg-purple-600 text-white h-20 flex flex-col">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-blue-400 rounded-full mb-2"></div>
                <span>色彩库</span>
              </Button>
              
              <Button onClick={() => navigateTo('ai-chat')} className="bg-orange-500 hover:bg-orange-600 text-white h-20 flex flex-col">
                <Bot className="w-6 h-6 mb-2" />
                <span>AI助手</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 最近产品 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">最近产品</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setViewMode('grid')}>
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setViewMode('list')}>
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => navigateTo('products')}>
                  查看全部
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? <div className="grid grid-cols-2 gap-4">
                  {recentProducts.map(product => <div key={product._id} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => navigateTo('products')}>
                      <div className="aspect-square bg-white/20 rounded-lg mb-2 flex items-center justify-center">
                        <Package className="w-8 h-8 text-white/60" />
                      </div>
                      <h4 className="text-white font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-white/60 text-xs">{product.brand}</p>
                      <p className="text-white font-bold text-sm">¥{product.price}</p>
                    </div>)}
                </div> : <div className="space-y-3">
                  {recentProducts.map(product => <div key={product._id} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => navigateTo('products')}>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-white/60" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{product.name}</h4>
                          <p className="text-white/60 text-sm">{product.brand} • ¥{product.price}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-white/60 text-sm">
                            <Star className="w-4 h-4 mr-1" />
                            {product.rating}
                          </div>
                          <p className="text-white/60 text-xs">{formatDate(product.createdAt)}</p>
                        </div>
                      </div>
                    </div>)}
                </div>}
            </CardContent>
          </Card>

          {/* 热门配方 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">热门配方</CardTitle>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => navigateTo('formula-management')}>
                查看全部
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularFormulas.map(formula => <div key={formula._id} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => navigateTo('formula-management')}>
                    <h4 className="text-white font-medium text-sm truncate">{formula.name}</h4>
                    <p className="text-white/60 text-xs truncate">{formula.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-white/60 text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        {formula.likes}
                      </div>
                      <div className="flex items-center text-white/60 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        {formula.views}
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最新颜色 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">最新颜色</CardTitle>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => navigateTo('color-library')}>
              查看全部
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {recentColors.map(color => <div key={color._id} className="text-center cursor-pointer group" onClick={() => navigateTo('color-library')}>
                  <div className="aspect-square rounded-lg mb-1 transition-transform group-hover:scale-110" style={{
                backgroundColor: color.hex
              }}></div>
                  <p className="text-white text-xs truncate">{color.name}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="home" />
    </div>;
}