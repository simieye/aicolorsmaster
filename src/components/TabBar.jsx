// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Home, Users, Package, Settings, Heart, MessageSquare, CalendarAlt, Scissors } from 'lucide-react';

export const TabBar = ({
  currentPage
}) => {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home,
    pageId: 'store-management-enhanced'
  }, {
    id: 'corporate-culture',
    label: '企业文化',
    icon: Heart,
    pageId: 'corporate-culture'
  }, {
    id: 'ai-customer-service',
    label: 'AI客服',
    icon: MessageSquare,
    pageId: 'ai-customer-service'
  }, {
    id: 'ai-booking-system',
    label: '预约系统',
    icon: CalendarAlt,
    pageId: 'ai-booking-system'
  }, {
    id: 'settings',
    label: '设置',
    icon: Settings,
    pageId: 'settings'
  }];
  const handleTabClick = pageId => {
    if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
      window.$w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }
  };
  return <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id;
          return <Button key={tab.id} variant="ghost" onClick={() => handleTabClick(tab.pageId)} className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${isActive ? 'text-white bg-white/20' : 'text-white/60 hover:text-white'}`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>;
        })}
        </div>
      </div>
    </div>;
};