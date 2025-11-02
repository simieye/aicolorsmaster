// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Settings, LogOut, RefreshCw, AlertCircle, User, Package, Heart, Bell } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, PageLoading, FullScreenLoading, InlineLoading, ButtonLoading } from '@/components/LoadingStates';

// 用户相关组件
// @ts-ignore;
import { UserProfileCard } from '@/components/user/UserProfileCard';
// @ts-ignore;
import { UserStatsCard } from '@/components/user/UserStatsCard';
// @ts-ignore;
import { RecentOrdersList } from '@/components/user/RecentOrdersList';
// @ts-ignore;
import { FavoritesList } from '@/components/user/FavoritesList';
// @ts-ignore;
import { NotificationsList } from '@/components/user/NotificationsList';

// @ts-ignore;
import { useDataLoader, useBatchDataLoader } from '@/hooks/useDataLoader';
export default function UserPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // 获取当前用户信息
  const currentUser = $w?.auth?.currentUser;

  // 使用缓存的数据加载器
  const userInfoLoader = useDataLoader({
    type: 'userInfo',
    key: `user_${currentUser?.userId || 'default'}`,
    loader: async () => {
      if (!currentUser) {
        throw new Error('用户未登录');
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      return generateMockUserInfo();
    },
    options: {
      ttl: 30 * 60 * 1000,
      // 30分钟缓存
      staleWhileRevalidate: true
    },
    autoLoad: !!currentUser,
    errorMessage: '无法获取用户信息'
  });
  const userStatsLoader = useDataLoader({
    type: 'userStats',
    key: `stats_${currentUser?.userId || 'default'}`,
    loader: async () => {
      if (!currentUser) {
        throw new Error('用户未登录');
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMockUserStats();
    },
    options: {
      ttl: 20 * 60 * 1000 // 20分钟缓存
    },
    autoLoad: !!currentUser
  });
  const recentOrdersLoader = useDataLoader({
    type: 'orders',
    key: `recent_orders_${currentUser?.userId || 'default'}`,
    loader: async () => {
      if (!currentUser) {
        throw new Error('用户未登录');
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      return generateMockRecentOrders();
    },
    options: {
      ttl: 5 * 60 * 1000 // 5分钟缓存
    },
    autoLoad: !!currentUser
  });
  const favoritesLoader = useDataLoader({
    type: 'favorites',
    key: `user_favorites_${currentUser?.userId || 'default'}`,
    loader: async () => {
      if (!currentUser) {
        throw new Error('用户未登录');
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 600));
      return generateMockFavorites();
    },
    options: {
      ttl: 30 * 60 * 1000 // 30分钟缓存
    },
    autoLoad: !!currentUser
  });
  const notificationsLoader = useDataLoader({
    type: 'notifications',
    key: `user_notifications_${currentUser?.userId || 'default'}`,
    loader: async () => {
      if (!currentUser) {
        throw new Error('用户未登录');
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 400));
      return generateMockNotifications();
    },
    options: {
      ttl: 2 * 60 * 1000 // 2分钟缓存
    },
    autoLoad: !!currentUser
  });

  // 批量加载用户数据
  const batchLoader = useBatchDataLoader([userInfoLoader.config, userStatsLoader.config, recentOrdersLoader.config, favoritesLoader.config, notificationsLoader.config]);

  // 初始化加载
  useEffect(() => {
    if (currentUser && batchLoader.loadAll) {
      batchLoader.loadAll();
    }
  }, [currentUser]);
  const generateMockUserInfo = () => ({
    id: currentUser?.userId || 'user_001',
    name: currentUser?.name || '张三',
    nickName: currentUser?.nickName || '染发爱好者',
    email: currentUser?.email || 'zhangsan@example.com',
    phone: '138****1234',
    avatar: currentUser?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.userId || 'default'}`,
    gender: 'male',
    birthday: '1990-01-01',
    address: '北京市朝阳区建国路88号',
    zipCode: '100000',
    memberLevel: 'gold',
    memberSince: '2023-01-15',
    totalSpent: 5680,
    totalOrders: 23,
    totalReviews: 15,
    averageRating: 4.6,
    preferences: {
      hairColor: 'brown',
      skinType: 'sensitive',
      favoriteBrand: '染发专家',
      notificationEmail: true,
      notificationSMS: false,
      notificationPush: true
    },
    verification: {
      email: true,
      phone: true,
      identity: false
    }
  });
  const generateMockUserStats = () => ({
    totalOrders: 23,
    totalReviews: 15,
    totalFavorites: 8,
    totalSpent: 5680,
    referrals: 5,
    points: 2580,
    thisMonthOrders: 3,
    thisMonthSpent: 680,
    averageOrderValue: 247
  });
  const generateMockRecentOrders = () => [{
    id: 'order_1',
    orderNumber: 'ORD202401001',
    status: 'delivered',
    totalAmount: 299,
    orderDate: '2024-01-15T10:30:00Z',
    items: [{
      name: '天然植物染发剂',
      quantity: 2,
      price: 149
    }]
  }, {
    id: 'order_2',
    orderNumber: 'ORD202401002',
    status: 'shipped',
    totalAmount: 189,
    orderDate: '2024-01-18T14:20:00Z',
    items: [{
      name: '深度护理发膜',
      quantity: 1,
      price: 189
    }]
  }, {
    id: 'order_3',
    orderNumber: 'ORD202401003',
    status: 'processing',
    totalAmount: 456,
    orderDate: '2024-01-20T09:15:00Z',
    items: [{
      name: '持久显色染发膏',
      quantity: 2,
      price: 228
    }]
  }];
  const generateMockFavorites = () => [{
    id: 'fav_1',
    name: '天然植物染发剂',
    price: 149,
    rating: 4.6,
    image: 'https://picsum.photos/seed/product1/200/200.jpg'
  }, {
    id: 'fav_2',
    name: '深度护理发膜',
    price: 189,
    rating: 4.8,
    image: 'https://picsum.photos/seed/product2/200/200.jpg'
  }, {
    id: 'fav_3',
    name: '持久显色染发膏',
    price: 228,
    rating: 4.5,
    image: 'https://picsum.photos/seed/product3/200/200.jpg'
  }, {
    id: 'fav_4',
    name: '修复护发素',
    price: 98,
    rating: 4.7,
    image: 'https://picsum.photos/seed/product4/200/200.jpg'
  }];
  const generateMockNotifications = () => [{
    id: 'notif_1',
    type: 'order',
    title: '订单已发货',
    content: '您的订单 ORD202401002 已发货，预计3天内送达',
    timestamp: '2024-01-19T10:00:00Z',
    read: false
  }, {
    id: 'notif_2',
    type: 'promotion',
    title: '限时优惠',
    content: '染发产品限时8折优惠，快来选购吧',
    timestamp: '2024-01-18T15:30:00Z',
    read: false
  }, {
    id: 'notif_3',
    type: 'review',
    title: '评价提醒',
    content: '您购买的订单已完成，快来评价吧',
    timestamp: '2024-01-17T09:20:00Z',
    read: true
  }, {
    id: 'notif_4',
    type: 'system',
    title: '系统通知',
    content: '您的会员等级已升级为黄金会员',
    timestamp: '2024-01-16T14:15:00Z',
    read: true
  }];
  const handleRefresh = async () => {
    try {
      await batchLoader.refreshAll();
      toast({
        title: "刷新成功",
        description: "用户数据已更新"
      });
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleUploadAvatar = async () => {
    setIsUploadingAvatar(true);
    try {
      // 模拟上传头像
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 更新缓存中的用户信息
      const updatedUserInfo = {
        ...userInfoLoader.data,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
      };
      userInfoLoader.setCacheData(updatedUserInfo);
      toast({
        title: "上传成功",
        description: "头像已更新"
      });
    } catch (error) {
      toast({
        title: "上传失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };
  const handleEditProfile = () => {
    // 跳转到编辑资料页面
    $w.utils.navigateTo({
      pageId: 'profile-edit',
      params: {}
    });
  };
  const handleViewOrder = order => {
    // 跳转到订单详情页面
    $w.utils.navigateTo({
      pageId: 'order-detail',
      params: {
        orderId: order.id
      }
    });
  };
  const handleViewProduct = product => {
    // 跳转到产品详情页面
    $w.utils.navigateTo({
      pageId: 'product-detail',
      params: {
        productId: product.id
      }
    });
  };
  const handleAddToCart = async product => {
    try {
      // 模拟添加到购物车
      await new Promise(resolve => setTimeout(resolve, 1000));
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
  const handleLogout = () => {
    // 清除所有用户相关的缓存
    userInfoLoader.clearCache();
    userStatsLoader.clearCache();
    recentOrdersLoader.clearCache();
    favoritesLoader.clearCache();
    notificationsLoader.clearCache();

    // 实现登出逻辑
    toast({
      title: "登出成功",
      description: "期待您的下次访问"
    });

    // 跳转到登录页面
    $w.utils.navigateTo({
      pageId: 'login',
      params: {}
    });
  };
  const handleSettings = () => {
    // 跳转到设置页面
    $w.utils.navigateTo({
      pageId: 'settings',
      params: {}
    });
  };
  if (batchLoader.hasErrors) {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="个人中心" showBack={true} />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">加载失败</h2>
              <p className="text-muted-foreground mb-4">
                {Object.values(batchLoader.errors).map(error => error?.message).filter(Boolean).join(', ') || '未知错误'}
              </p>
              <Button onClick={() => batchLoader.retryAll()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                重新加载
              </Button>
            </div>
          </div>
          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  if (!currentUser) {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="个人中心" showBack={true} />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">请先登录</h2>
              <p className="text-muted-foreground mb-4">您需要登录后才能查看个人信息</p>
              <Button onClick={() => $w.utils.navigateTo({
              pageId: 'login',
              params: {}
            })}>
                前往登录
              </Button>
            </div>
          </div>
          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  if (batchLoader.isAnyLoading && !userInfoLoader.data) {
    return <PageLoading title="加载用户信息" description="请稍候，正在获取您的数据..." />;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="个人中心" showBack={true} actions={<div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={batchLoader.isAnyLoading}>
                <RefreshCw className={`w-4 h-4 ${batchLoader.isAnyLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSettings}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>} />
        
        <div className="container mx-auto px-4 py-6 pb-20">
          {/* 缓存状态指示器 */}
          {userInfoLoader.isFromCache && <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              📦 部分数据来自缓存，最后更新: {new Date(userInfoLoader.lastUpdated).toLocaleString()}
            </div>}

          {/* 标签页导航 */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
            <button onClick={() => setActiveTab('overview')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <User className="w-4 h-4 inline mr-2" />
              概览
            </button>
            <button onClick={() => setActiveTab('orders')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Package className="w-4 h-4 inline mr-2" />
              订单
            </button>
            <button onClick={() => setActiveTab('favorites')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'favorites' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Heart className="w-4 h-4 inline mr-2" />
              收藏
            </button>
            <button onClick={() => setActiveTab('notifications')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Bell className="w-4 h-4 inline mr-2" />
              通知
            </button>
          </div>

          {/* 标签页内容 */}
          {activeTab === 'overview' && <div className="space-y-6">
              <UserProfileCard userInfo={userInfoLoader.data} isUploadingAvatar={isUploadingAvatar} onUploadAvatar={handleUploadAvatar} onEdit={handleEditProfile} />
              <UserStatsCard userStats={userStatsLoader.data} />
            </div>}

          {activeTab === 'orders' && <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">最近订单</h3>
                <Button variant="outline" onClick={() => $w.utils.navigateTo({
              pageId: 'orders',
              params: {}
            })}>
                  查看全部
                </Button>
              </div>
              <RecentOrdersList recentOrders={recentOrdersLoader.data} onViewOrder={handleViewOrder} />
            </div>}

          {activeTab === 'favorites' && <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">我的收藏</h3>
                <span className="text-sm text-muted-foreground">
                  共 {favoritesLoader.data?.length || 0} 件商品
                  {favoritesLoader.isFromCache && <span className="ml-2 text-green-600">📦</span>}
                </span>
              </div>
              <FavoritesList favorites={favoritesLoader.data} onViewProduct={handleViewProduct} onAddToCart={handleAddToCart} />
            </div>}

          {activeTab === 'notifications' && <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">通知消息</h3>
                <span className="text-sm text-muted-foreground">
                  {notificationsLoader.data?.filter(n => !n.read).length || 0} 条未读
                  {notificationsLoader.isFromCache && <span className="ml-2 text-green-600">📦</span>}
                </span>
              </div>
              <NotificationsList notifications={notificationsLoader.data} />
            </div>}

          {/* 登出按钮 */}
          <div className="mt-8">
            <Button variant="outline" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}