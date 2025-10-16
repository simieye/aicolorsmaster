// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Store, Package, ShoppingCart, Users, Settings, BarChart3, ChevronDown } from 'lucide-react';

export function StoreSidebar({
  activeMenu,
  onMenuChange
}) {
  const menuItems = [{
    id: 'dashboard',
    name: '仪表板',
    icon: Home
  }, {
    id: 'store-info',
    name: '门店信息',
    icon: Store
  }, {
    id: 'inventory',
    name: '库存管理',
    icon: Package
  }, {
    id: 'orders',
    name: '订单管理',
    icon: ShoppingCart
  }, {
    id: 'employees',
    name: '员工管理',
    icon: Users
  }, {
    id: 'analytics',
    name: '数据分析',
    icon: BarChart3
  }, {
    id: 'settings',
    name: '系统设置',
    icon: Settings
  }];
  return <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">门店管理</h2>
      </div>
      
      <nav className="px-2">
        {menuItems.map(item => {
        const Icon = item.icon;
        return <button key={item.id} onClick={() => onMenuChange(item.id)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeMenu === item.id ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>;
      })}
      </nav>
    </div>;
}