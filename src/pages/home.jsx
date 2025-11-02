// @ts-ignore;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Home, ShoppingBag, User, Settings, Search, Bell, Menu, X, TrendingUp, Star, Package, Clock, ArrowRight, RefreshCw, AlertCircle, Activity } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, PageLoading, InlineLoading, ButtonLoading } from '@/components/LoadingStates';

// 性能监控相关
// @ts-ignore;
import { usePerformanceMonitor, useInteractionMonitor } from '@/hooks/usePerformanceMonitor';
// @ts-ignore;
import { useRenderTracking, usePerformanceBoundary } from '@/hooks/useRenderTracking';
// @ts-ignore;
import { useDataLoader, useBatchDataLoader } from '@/hooks/useDataLoader';

// 组件相关
// @ts-ignore;
import { HomeHero } from '@/components/HomeHero';
// @ts-ignore;
import { StatsCards } from '@/components/StatsCards';
// @ts-ignore;
import { ProductShowcase } from '@/components/ProductShowcase';
// @ts-ignore;
import { QuickActions } from '@/components/QuickActions';
// @ts-ignore;
import { RecentActivity } from '@/components/RecentActivity';
// @ts-ignore;
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
export default function HomePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();

  // 性能监控
  const {
    startMonitoring,
    endMonitoring
  } = usePerformanceMonitor('HomePage');
  const {
    startInteraction,
    endInteraction
  } = useInteractionMonitor();
  const {
    renderCount,
    trackProps
  } = useRenderTracking('HomePage', {
    trackProps: true,
    threshold: 16.67,
    onSlowRender: data => {
      console.warn('HomePage 渲染性能警告:', data);
      toast({
        title: "性能警告",
        description: "页面渲染较慢，正在优化...",
        variant: "default"
      });
    }
  });
  const {
    isDegraded,
    checkPerformance
  } = usePerformanceBoundary('HomePage', {
    renderThreshold: 20,
    memoryThreshold: 40 * 1024 * 1024,
    onPerformanceDegradation: data => {
      console.warn('HomePage 性能下降，启用降级模式:', data);
      toast({
        title: "性能优化",
        description: "已启用性能优化模式",
        variant: "default"
      });
    }
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // 获取当前用户信息
  const currentUser = $w?.auth?.currentUser;

  // 使用缓存的数据加载器
  const recommendationsLoader = useDataLoader({
    type: 'recommendations',
    key: `home_recommendations_${currentUser?.userId || 'guest'}`,
    loader: async () => {
      const renderId = startMonitoring({
        phase: 'recommendations_load'
      });
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 800));
        const recommendations = generateRecommendations();
        trackProps({
          recommendationsCount: recommendations.length
        });
        return recommendations;
      } finally {
        endMonitoring(renderId);
      }
    },
    options: {
      ttl: 15 * 60 * 1000,
      // 15分钟缓存
      staleWhileRevalidate: true
    },
    autoLoad: true
  });
  const statsLoader = useDataLoader({
    type: 'userStats',
    key: `home_stats_${currentUser?.userId || 'guest'}`,
    loader: async () => {
      const renderId = startMonitoring({
        phase: 'stats_load'
      });
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        return generateStats();
      } finally {
        endMonitoring(renderId);
      }
    },
    options: {
      ttl: 20 * 60 * 1000 // 20分钟缓存
    },
    autoLoad: true
  });
  const recentActivityLoader = useDataLoader({
    type: 'recentActivity',
    key: `home_activity_${currentUser?.userId || 'guest'}`,
    loader: async () => {
      const renderId = startMonitoring({
        phase: 'activity_load'
      });
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        return generateRecentActivity();
      } finally {
        endMonitoring(renderId);
      }
    },
    options: {
      ttl: 5 * 60 * 1000 // 5分钟缓存
    },
    autoLoad: true
  });

  // 批量加载器
  const batchLoader = useBatchDataLoader([recommendationsLoader.config, statsLoader.config, recentActivityLoader.config]);

  // 初始化加载
  useEffect(() => {
    const renderId = startMonitoring({
      phase: 'initial_load'
    });
    try {
      if (batchLoader.loadAll) {
        batchLoader.loadAll();
      }
      loadNotifications();
    } finally {
      endMonitoring(renderId);
    }
  }, [currentUser]);

  // 性能检查
  useEffect(() => {
    const interval = setInterval(() => {
      checkPerformance();
    }, 10000); // 每10秒检查一次性能

    return () => clearInterval(interval);
  }, [checkPerformance]);

  // 生成推荐数据
  const generateRecommendations = useCallback(() => {
    const categories = ['染发剂', '护理产品', '美发工具', '造型产品'];
    const products = [{
      name: '天然植物染发剂',
      category: '染发剂',
      price: 128,
      rating: 4.8,
      image: 'https://picsum.photos/seed/dye1/200/200.jpg'
    }, {
      name: '深度修复发膜',
      category: '护理产品',
      price: 89,
      rating: 4.6,
      image: 'https://picsum.photos/seed/mask1/200/200.jpg'
    }, {
      name: '专业卷发棒',
      category: '美发工具',
      price: 156,
      rating: 4.7,
      image: 'https://picsum.photos/seed/tool1/200/200.jpg'
    }, {
      name: '定型喷雾',
      category: '造型产品',
      price: 68,
      rating: 4.5,
      image: 'https://picsum.photos/seed/spray1/200/200.jpg'
    }];
    return categories.map(category => ({
      category,
      items: products.filter(p => p.category === category).slice(0, 3)
    }));
  }, []);

  // 生成统计数据
  const generateStats = useCallback(() => ({
    totalOrders: currentUser ? 156 : 0,
    totalSpent: currentUser ? 8956 : 0,
    savedAmount: currentUser ? 1248 : 0,
    memberLevel: currentUser ? '黄金会员' : '未登录'
  }), [currentUser]);

  // 生成最近活动
  const generateRecentActivity = useCallback(() => {
    if (!currentUser) return [];
    return [{
      type: 'order',
      title: '订单已发货',
      description: '您的订单 #12345 已发货',
      time: '2小时前'
    }, {
      type: 'promotion',
      title: '限时优惠',
      description: '染发产品8折优惠进行中',
      time: '5小时前'
    }, {
      type: 'review',
      title: '评价提醒',
      description: '您购买的商品等待评价',
      time: '1天前'
    }, {
      type: 'system',
      title: '会员升级',
      description: '恭喜升级为黄金会员',
      time: '3天前'
    }];
  }, [currentUser]);

  // 加载通知
  const loadNotifications = useCallback(() => {
    const mockNotifications = [{
      id: 1,
      title: '新功能上线',
      description: 'AI染发推荐功能已上线',
      read: false
    }, {
      id: 2,
      title: '限时优惠',
      description: '全场染发产品8折',
      read: false
    }, {
      id: 3,
      title: '订单提醒',
      description: '您有订单即将送达',
      read: true
    }];
    setNotifications(mockNotifications);
  }, []);

  // 处理搜索
  const handleSearch = useCallback(() => {
    const interactionId = startInteraction('search', 'home_search');
    try {
      if (searchQuery.trim()) {
        $w.utils.navigateTo({
          pageId: 'products',
          params: {
            search: searchQuery
          }
        });
      }
    } finally {
      endInteraction(interactionId);
    }
  }, [searchQuery, $w, startInteraction, endInteraction]);

  // 处理刷新
  const handleRefresh = useCallback(async () => {
    const interactionId = startInteraction('refresh', 'home_refresh');
    setRefreshing(true);
    try {
      await batchLoader.refreshAll();
      toast({
        title: "刷新成功",
        description: "数据已更新"
      });
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
      endInteraction(interactionId);
    }
  }, [batchLoader, toast, startInteraction, endInteraction]);

  // 处理推荐反馈
  const handleRecommendationFeedback = useCallback((category, item, action) => {
    const interactionId = startInteraction('recommendation_feedback', `${category}_${item.name}`);
    try {
      // 记录用户行为
      const feedback = {
        category,
        item: item.name,
        action,
        timestamp: Date.now(),
        userId: currentUser?.userId || 'guest'
      };

      // 保存到 localStorage
      const existingFeedback = JSON.parse(localStorage.getItem('recommendation_feedback') || '[]');
      existingFeedback.push(feedback);
      localStorage.setItem('recommendation_feedback', JSON.stringify(existingFeedback));
      toast({
        title: action === 'like' ? "感谢反馈" : "已记录",
        description: `我们会根据您的偏好优化推荐`
      });
    } finally {
      endInteraction(interactionId);
    }
  }, [currentUser, toast, startInteraction, endInteraction]);

  // 优化的推荐数据
  const optimizedRecommendations = useMemo(() => {
    if (isDegraded) {
      // 性能降级时返回简化的数据
      return recommendationsLoader.data?.slice(0, 2) || [];
    }
    return recommendationsLoader.data || [];
  }, [isDegraded, recommendationsLoader.data]);
  if (batchLoader.hasErrors) {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="首页" />
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
  if (batchLoader.isAnyLoading && !recommendationsLoader.data) {
    return <PageLoading title="加载首页" description="正在为您准备个性化内容..." />;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="首页" showBack={false} actions={<div className="flex items-center gap-2">
              {/* 搜索框 */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input type="text" placeholder="搜索产品..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64" />
              </div>

              {/* 通知 */}
              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)}>
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                </Button>
              </div>

              {/* 刷新 */}
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>

              {/* 性能监控 */}
              <Button variant="ghost" size="sm" onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}>
                <Activity className="w-5 h-5" />
              </Button>
            </div>} />

        {/* 移动端搜索 */}
        <div className="md:hidden px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input type="text" placeholder="搜索产品..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 pb-20">
          {/* 性能状态指示器 */}
          {process.env.NODE_ENV === 'development' && <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
              📊 渲染次数: {renderCount} | 
              性能状态: {isDegraded ? '降级模式' : '正常'} |
              缓存状态: {recommendationsLoader.isFromCache ? '来自缓存' : '新鲜数据'}
            </div>}

          {/* 主要内容 */}
          <div className="space-y-6">
            {/* Hero 区域 */}
            <HomeHero currentUser={currentUser} onStartInteraction={startInteraction} onEndInteraction={endInteraction} />

            {/* 统计卡片 */}
            <StatsCards stats={statsLoader.data} loading={statsLoader.loading} isDegraded={isDegraded} />

            {/* 产品推荐 */}
            <ProductShowcase recommendations={optimizedRecommendations} loading={recommendationsLoader.loading} onFeedback={handleRecommendationFeedback} isDegraded={isDegraded} />

            {/* 快捷操作 */}
            <QuickActions onStartInteraction={startInteraction} onEndInteraction={endInteraction} />

            {/* 最近活动 */}
            <RecentActivity activities={recentActivityLoader.data} loading={recentActivityLoader.loading} currentUser={currentUser} />
          </div>
        </div>

        <TabBar />

        {/* 通知弹窗 */}
        {showNotifications && <div className="fixed top-16 right-4 w-80 bg-background border rounded-lg shadow-lg z-50">
            <div className="p-4 border-b">
              <h3 className="font-medium">通知</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => <div key={notification.id} className="p-4 border-b hover:bg-muted cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>}

        {/* 性能监控面板 */}
        <PerformanceMonitor visible={showPerformanceMonitor} onToggle={() => setShowPerformanceMonitor(!showPerformanceMonitor)} />
      </div>
    </ErrorBoundary>;
}