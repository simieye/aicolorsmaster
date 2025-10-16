// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Palette, FlaskConical, Beaker, Users, ShoppingBag, TrendingUp, User, FileText, Library, MessageCircle } from 'lucide-react';

export function TabBar({
  currentPage,
  onPageChange
}) {
  const tabs = [{
    id: 'home',
    name: '首页',
    icon: Home
  }, {
    id: 'color-recognition',
    name: '识别',
    icon: Palette
  }, {
    id: 'formula-generation',
    name: '配方',
    icon: FlaskConical
  }, {
    id: 'mixing-simulation',
    name: '模拟',
    icon: Beaker
  }, {
    id: 'community',
    name: '社区',
    icon: Users
  }, {
    id: 'products',
    name: '产品',
    icon: ShoppingBag
  }, {
    id: 'marketing',
    name: '营销',
    icon: TrendingUp
  }, {
    id: 'user-management',
    name: '我的',
    icon: User
  }, {
    id: 'formula-management',
    name: '配方库',
    icon: FileText
  }, {
    id: 'color-library',
    name: '色彩库',
    icon: Library
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentPage === tab.id;
        return <button key={tab.id} onClick={() => onPageChange(tab.id)} className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'}`}>
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs truncate max-w-full">{tab.name}</span>
            </button>;
      })}
      </div>
    </div>;
}