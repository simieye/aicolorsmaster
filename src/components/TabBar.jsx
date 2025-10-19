// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Package, Bot, User, ShoppingCart, MessageCircle, Settings, Search, Filter, Star, Heart, BarChart3 } from 'lucide-react';

export const TabBar = ({
  currentPage
}) => {
  const handleNavigation = pageId => {
    if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
      window.$w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    } else {
      console.log('Navigate to:', pageId);
    }
  };
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'products',
    label: '产品',
    icon: Package
  }, {
    id: 'ai-chat',
    label: 'AI助手',
    icon: Bot
  }, {
    id: 'orders',
    label: '订单',
    icon: BarChart3
  }, {
    id: 'user',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id;
          return <button key={tab.id} onClick={() => handleNavigation(tab.id)} className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/60'}`} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>;
        })}
        </div>
      </div>
    </div>;
};