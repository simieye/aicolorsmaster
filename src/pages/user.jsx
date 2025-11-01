// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { User, Settings, ShoppingBag, Heart, FileText, HelpCircle, LogOut, ChevronRight, Bell, Shield, CreditCard, MapPin, Star, Package, Headphones, MessageSquare, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner } from '@/components/LoadingSpinner';
// @ts-ignore;
import { HoverCard } from '@/components/HoverEffects';
// @ts-ignore;

export default function UserPage(props) {
  const {
    $w
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = $w?.auth?.currentUser;
  const handleNavigation = (pageId, params = {}) => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId,
        params
      });
    }
  };
  const handleLogout = () => {
    if ($w && $w.auth) {
      $w.auth.signOut().then(() => {
        handleNavigation('login');
      }).catch(error => {
        console.error('登出失败:', error);
      });
    }
  };
  const menuItems = [{
    icon: <ShoppingBag className="w-5 h-5" />,
    label: '我的订单',
    description: '查看订单状态和历史',
    onClick: () => handleNavigation('orders'),
    badge: '3'
  }, {
    icon: <Heart className="w-5 h-5" />,
    label: '我的收藏',
    description: '管理收藏的商品',
    onClick: () => handleNavigation('favorites'),
    badge: null
  }, {
    icon: <MapPin className="w-5 h-5" />,
    label: '收货地址',
    description: '管理收货地址',
    onClick: () => handleNavigation('addresses'),
    badge: null
  }, {
    icon: <CreditCard className="w-5 h-5" />,
    label: '支付方式',
    description: '管理支付方式',
    onClick: () => handleNavigation('payment-methods'),
    badge: null
  }, {
    icon: <Package className="w-5 h-5" />,
    label: '优惠券',
    description: '查看可用优惠券',
    onClick: () => handleNavigation('coupons'),
    badge: '5'
  }, {
    icon: <Star className="w-5 h-5" />,
    label: '会员中心',
    description: '会员权益和等级',
    onClick: () => handleNavigation('membership'),
    badge: null
  }];
  const serviceItems = [{
    icon: <Headphones className="w-5 h-5" />,
    label: '在线客服',
    description: '24小时在线客服',
    onClick: () => handleNavigation('ai-chat'),
    badge: null
  }, {
    icon: <MessageSquare className="w-5 h-5" />,
    label: '意见反馈',
    description: '提交意见和建议',
    onClick: () => handleNavigation('feedback'),
    badge: null
  }, {
    icon: <HelpCircle className="w-5 h-5" />,
    label: '帮助中心',
    description: '常见问题解答',
    onClick: () => handleNavigation('help'),
    badge: null
  }, {
    icon: <FileText className="w-5 h-5" />,
    label: '服务协议',
    description: '查看服务条款',
    onClick: () => handleNavigation('terms'),
    badge: null
  }];
  const stats = [{
    label: '累计订单',
    value: '28',
    icon: <ShoppingBag className="w-4 h-4" />
  }, {
    label: '收藏商品',
    value: '15',
    icon: <Heart className="w-4 h-4" />
  }, {
    label: '优惠券',
    value: '5',
    icon: <CreditCard className="w-4 h-4" />
  }, {
    label: '积分',
    value: '1,280',
    icon: <Award className="w-4 h-4" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="我的" showBack={false} />
        
        <div className="pb-20">
          {/* 用户信息卡片 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  {currentUser?.avatarUrl ? <img src={currentUser.avatarUrl} alt="头像" className="w-full h-full rounded-full object-cover" /> : <User className="w-10 h-10" />}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">
                    {currentUser?.nickName || currentUser?.name || '用户'}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {currentUser?.type === 'vip' ? 'VIP会员' : '普通会员'}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleNavigation('profile')} className="text-white hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* 用户统计 */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {stats.map((stat, index) => <div key={index} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-blue-100">{stat.label}</div>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* 快捷功能 */}
            <Card>
              <CardHeader>
                <CardTitle>快捷功能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {menuItems.slice(0, 4).map((item, index) => <HoverCard key={index} onClick={item.onClick} className="flex items-center space-x-3 p-4 bg-card border rounded-lg cursor-pointer hover:bg-accent">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                      {item.badge && <div className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </div>}
                    </HoverCard>)}
                </div>
              </CardContent>
            </Card>

            {/* 订单管理 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>我的订单</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => handleNavigation('orders')}>
                  查看全部
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center cursor-pointer" onClick={() => handleNavigation('orders', {
                  status: 'pending'
                })}>
                    <div className="relative">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="text-sm">待付款</div>
                  </div>
                  <div className="text-center cursor-pointer" onClick={() => handleNavigation('orders', {
                  status: 'shipped'
                })}>
                    <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm">待收货</div>
                  </div>
                  <div className="text-center cursor-pointer" onClick={() => handleNavigation('orders', {
                  status: 'completed'
                })}>
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="text-sm">已完成</div>
                  </div>
                  <div className="text-center cursor-pointer" onClick={() => handleNavigation('orders', {
                  status: 'review'
                })}>
                    <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-sm">待评价</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 账户管理 */}
            <Card>
              <CardHeader>
                <CardTitle>账户管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {menuItems.slice(4).map((item, index) => <div key={index} onClick={item.onClick} className="flex items-center justify-between p-4 bg-card border rounded-lg cursor-pointer hover:bg-accent">
                    <div className="flex items-center space-x-3">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && <div className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </div>}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>)}
              </CardContent>
            </Card>

            {/* 客户服务 */}
            <Card>
              <CardHeader>
                <CardTitle>客户服务</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {serviceItems.map((item, index) => <div key={index} onClick={item.onClick} className="flex items-center justify-between p-4 bg-card border rounded-lg cursor-pointer hover:bg-accent">
                    <div className="flex items-center space-x-3">
                      <div className="text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>)}
              </CardContent>
            </Card>

            {/* 退出登录 */}
            <Card>
              <CardContent className="pt-6">
                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}