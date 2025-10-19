// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Menu, Bell, Search, User } from 'lucide-react';

export const TopNavigation = ({
  currentPage
}) => {
  const getPageTitle = pageId => {
    const titles = {
      'home': 'AI门店管理系统',
      'store-management-enhanced': 'AI门店管理系统',
      'corporate-culture': 'AI企业文化管理',
      'ai-customer-service': 'AI客服系统',
      'ai-booking-system': 'AI客户预约系统',
      'settings': '系统设置'
    };
    return titles[pageId] || 'AI门店管理系统';
  };
  const handleMenuClick = () => {
    // 处理菜单点击
    console.log('Menu clicked');
  };
  const handleNotificationClick = () => {
    // 处理通知点击
    console.log('Notification clicked');
  };
  const handleSearchClick = () => {
    // 处理搜索点击
    console.log('Search clicked');
  };
  const handleUserClick = () => {
    // 处理用户点击
    console.log('User clicked');
  };
  return <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleMenuClick} className="text-white/80 hover:text-white">
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">{getPageTitle(currentPage)}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleSearchClick} className="text-white/80 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNotificationClick} className="text-white/80 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleUserClick} className="text-white/80 hover:text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>;
};