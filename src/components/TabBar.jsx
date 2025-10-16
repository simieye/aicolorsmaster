// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Camera, Palette, Beaker, Users } from 'lucide-react';

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
    icon: Camera
  }, {
    id: 'formula-generation',
    name: '配方',
    icon: Palette
  }, {
    id: 'mixing-simulation',
    name: '调配',
    icon: Beaker
  }, {
    id: 'community',
    name: '社区',
    icon: Users
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-around items-center py-2">
              {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id;
          return <button key={tab.id} onClick={() => onPageChange(tab.id)} className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${isActive ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-600'}`} />
                    <span className={`text-xs mt-1 ${isActive ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}>
                      {tab.name}
                    </span>
                  </button>;
        })}
            </div>
          </div>
        </div>;
}