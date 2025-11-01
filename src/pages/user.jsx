// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { User, Edit, ShoppingBag, Heart, FileText, HelpCircle, LogOut, ChevronRight, Bell, Shield, CreditCard, MapPin, Star, Package, Headphones, MessageSquare, Award, Lock, Smartphone } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { UserStats } from '@/components/UserStats';
// @ts-ignore;
import { QuickActions } from '@/components/QuickActions';
// @ts-ignore;
import { OrderStatusGrid } from '@/components/OrderStatusGrid';
// @ts-ignore;
import { MenuList } from '@/components/MenuList';
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
    onClick: () => handleNavigation('orders-history'),
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
  const accountItems = [{
    icon: <Edit className="w-5 h-5" />,
    label: '个人资料',
    description: '编辑个人信息',
    onClick: () => handleNavigation('profile-edit'),
    badge: null
  }, {
    icon: <Lock className="w-5 h-5" />,
    label: '账户安全',
    description: '密码和隐私设置',
    onClick: () => handleNavigation('account-security'),
    badge: null
  }, {
    icon: <Bell className="w-5 h-5" />,
    label: '消息通知',
    description: '查看系统通知',
    onClick: () => handleNavigation('notifications'),
    badge: '2'
  }, {
    icon: <Smartphone className="w-5 h-5" />,
    label: '设备管理',
    description: '管理登录设备',
    onClick: () => handleNavigation('devices'),
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
                <Button variant="ghost" size="sm" onClick={() => handleNavigation('profile-edit')} className="text-white hover:bg-white/10">
                  <Edit className="w-5 h-5" />
                </Button>
              </div>

              {/* 用户统计 */}
              <UserStats stats={stats} />
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* 快捷功能 */}
            <Card>
              <CardHeader>
                <CardTitle>快捷功能</CardTitle>
              </CardHeader>
              <CardContent>
                <QuickActions items={menuItems} />
              </CardContent>
            </Card>

            {/* 订单管理 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>我的订单</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => handleNavigation('orders-history')}>
                  查看全部
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <OrderStatusGrid onNavigate={handleNavigation} />
              </CardContent>
            </Card>

            {/* 账户管理 */}
            <Card>
              <CardHeader>
                <CardTitle>账户管理</CardTitle>
              </CardHeader>
              <CardContent>
                <MenuList items={accountItems} />
              </CardContent>
            </Card>

            {/* 购物管理 */}
            <Card>
              <CardHeader>
                <CardTitle>购物管理</CardTitle>
              </CardHeader>
              <CardContent>
                <MenuList items={menuItems.slice(4)} />
              </CardContent>
            </Card>

            {/* 客户服务 */}
            <Card>
              <CardHeader>
                <CardTitle>客户服务</CardTitle>
              </CardHeader>
              <CardContent>
                <MenuList items={serviceItems} />
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