// @ts-ignore;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Settings, LogOut, Shield, Award, Star, TrendingUp, Package, Heart, MessageCircle, ChevronRight } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, UserLoading, UserEmpty, ErrorState, DataLoader } from '@/components/LoadingStates';
// @ts-ignore;
import { useMultiDataCache } from '@/hooks/useDataCache';
// @ts-ignore;
import { CACHE_KEYS, CACHE_TTL, cacheUtils } from '@/lib/DataCache';
export default function UserPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  // 使用多数据缓存Hook
  const {
    states,
    globalLoading,
    refreshAll,
    invalidateAll
  } = useMultiDataCache([{
    key: CACHE_KEYS.USER_INFO,
    fetcher: async () => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        id: 'USER001',
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '138****5678',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        joinDate: '2023-06-15',
        level: 'VIP',
        points: 2580,
        address: {
          province: '北京市',
          city: '北京市',
          district: '朝阳区',
          detail: '某某街道123号'
        },
        preferences: {
          favoriteCategory: '植物染发',
          skinType: '敏感性',
          hairType: '干性'
        }
      };
    },
    ttl: CACHE_TTL.LONG
  }, {
    key: CACHE_KEYS.USER_STATS,
    fetcher: async () => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        totalOrders: 23,
        totalSpent: 5680,
        favoriteProducts: 8,
        reviews: 15,
        averageRating: 4.8,
        memberLevel: '黄金会员',
        nextLevelPoints: 420,
        benefits: ['专享折扣', '生日礼券', '优先客服', '免费配送']
      };
    },
    ttl: CACHE_TTL.MEDIUM
  }]);
  const userData = states[CACHE_KEYS.USER_INFO]?.data || null;
  const userStats = states[CACHE_KEYS.USER_STATS]?.data || null;
  const userLoading = states[CACHE_KEYS.USER_INFO]?.loading || false;
  const userError = states[CACHE_KEYS.USER_INFO]?.error || null;

  // 处理重试
  const handleRetry = useCallback(() => {
    refreshAll();
  }, [refreshAll]);

  // 处理刷新
  const handleRefresh = useCallback(() => {
    refreshAll();
    toast({
      title: "刷新成功",
      description: "用户数据已更新"
    });
  }, [refreshAll, toast]);

  // 处理缓存失效
  const handleInvalidateCache = useCallback(() => {
    invalidateAll();
    toast({
      title: "缓存已清理",
      description: "用户数据缓存已清理，下次访问将重新加载"
    });
  }, [invalidateAll, toast]);

  // 编辑个人资料
  const handleEditProfile = useCallback(() => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'profile-edit',
        params: {}
      });
    }
  }, [$w]);

  // 查看订单
  const handleViewOrders = useCallback(() => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'orders',
        params: {}
      });
    }
  }, [$w]);

  // 查看收藏
  const handleViewFavorites = useCallback(() => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'favorites',
        params: {}
      });
    }
  }, [$w]);

  // 查看通知
  const handleViewNotifications = useCallback(() => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'notifications',
        params: {}
      });
    }
  }, [$w]);

  // 退出登录
  const handleLogout = useCallback(() => {
    // 清理所有用户相关缓存
    invalidateAll();
    cacheUtils.invalidateDependent(CACHE_KEYS.USER_INFO);
    toast({
      title: "退出登录",
      description: "正在退出登录..."
    });

    // 模拟退出登录
    setTimeout(() => {
      if ($w?.utils?.navigateTo) {
        $w.utils.navigateTo({
          pageId: 'login',
          params: {}
        });
      }
    }, 1000);
  }, [invalidateAll, $w, toast]);
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="个人中心" showBack={true} />
        
        <div className="pb-20">
          <DataLoader loading={globalLoading} error={userError} data={userData} loadingComponent={<UserLoading />} errorComponent={<ErrorState error={userError} onRetry={handleRetry} />} emptyComponent={<UserEmpty />} onRetry={handleRetry}>
            {userData && <>
                {/* 用户信息头部 */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img src={userData.avatar} alt={userData.name} className="w-20 h-20 rounded-full border-4 border-white/20" />
                      <button className="absolute bottom-0 right-0 p-1 bg-white text-primary rounded-full">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{userData.name}</h2>
                      <p className="text-white/80">{userData.level}会员</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span>积分: {userData.points}</span>
                        <span>加入时间: {new Date(userData.joinDate).getFullYear()}年</span>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" onClick={handleEditProfile} className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                  </div>
                </div>

                {/* 统计信息 */}
                {userStats && <div className="p-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <p className="text-2xl font-bold">{userStats.totalOrders}</p>
                          <p className="text-sm text-muted-foreground">总订单</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <p className="text-2xl font-bold">¥{userStats.totalSpent}</p>
                          <p className="text-sm text-muted-foreground">总消费</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                          <p className="text-2xl font-bold">{userStats.favoriteProducts}</p>
                          <p className="text-sm text-muted-foreground">收藏</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                          <p className="text-2xl font-bold">{userStats.reviews}</p>
                          <p className="text-sm text-muted-foreground">评价</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>}

                {/* 功能菜单 */}
                <div className="p-4 space-y-4">
                  {/* 订单相关 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">我的订单</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <button onClick={handleViewOrders} className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Package className="w-5 h-5 text-blue-500" />
                          <span>全部订单</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-green-500" />
                          <span>待评价</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-purple-500" />
                          <span>售后服务</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </CardContent>
                  </Card>

                  {/* 我的收藏 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">我的收藏</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <button onClick={handleViewFavorites} className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-red-500" />
                          <span>收藏商品</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </CardContent>
                  </Card>

                  {/* 账户设置 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">账户设置</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-blue-500" />
                          <span>个人信息</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-green-500" />
                          <span>收货地址</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Settings className="w-5 h-5 text-purple-500" />
                          <span>偏好设置</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button onClick={handleViewNotifications} className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <MessageCircle className="w-5 h-5 text-orange-500" />
                          <span>消息通知</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </CardContent>
                  </Card>

                  {/* 其他操作 */}
                  <Card>
                    <CardContent className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-yellow-500" />
                          <span>会员中心</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-blue-500" />
                          <span>账户安全</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button onClick={handleLogout} className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors text-red-500">
                        <div className="flex items-center space-x-3">
                          <LogOut className="w-5 h-5" />
                          <span>退出登录</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </>}
          </DataLoader>

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