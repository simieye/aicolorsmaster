// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, Calendar, GraduationCap, Briefcase, MessageSquare, Bot, ChevronDown } from 'lucide-react';

export function SystemSwitcher({
  activeSystem,
  onSystemChange,
  className = ''
}) {
  const systems = [{
    id: 'customer-service',
    name: 'AI客服系统',
    icon: HeadphonesIcon,
    description: '智能客服，自动回复',
    color: 'purple'
  }, {
    id: 'appointment',
    name: 'AI预约系统',
    icon: Calendar,
    description: '智能预约，自动提醒',
    color: 'blue'
  }, {
    id: 'training',
    name: 'AI培训系统',
    icon: GraduationCap,
    description: '员工培训，技能提升',
    color: 'green'
  }, {
    id: 'recruitment',
    name: 'AI招聘系统',
    icon: Briefcase,
    description: '智能招聘，人才匹配',
    color: 'indigo'
  }];
  const currentSystem = systems.find(s => s.id === activeSystem) || systems[0];
  const CurrentIcon = currentSystem.icon;
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-50'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-50'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:bg-green-50'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        hover: 'hover:bg-indigo-50'
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  return <div className={`relative ${className}`}>
      <Button variant="outline" className="flex items-center space-x-3 px-4 py-2 bg-white border-gray-200 hover:bg-gray-50">
        <div className={`w-8 h-8 ${getColorClasses(currentSystem.color).bg} rounded-full flex items-center justify-center`}>
          <CurrentIcon className={`w-4 h-4 ${getColorClasses(currentSystem.color).text}`} />
        </div>
        <div className="text-left">
          <div className="font-medium text-gray-900">{currentSystem.name}</div>
          <div className="text-xs text-gray-500">{currentSystem.description}</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </Button>
      
      {/* 下拉菜单 */}
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 hidden">
        {systems.map(system => {
        const Icon = system.icon;
        const colors = getColorClasses(system.color);
        return <button key={system.id} onClick={() => onSystemChange(system.id)} className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:${colors.hover} border-b border-gray-100 last:border-b-0`}>
            <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${colors.text}`} />
            </div>
            <div>
              <div className="font-medium text-gray-900">{system.name}</div>
              <div className="text-xs text-gray-500">{system.description}</div>
            </div>
          </button>;
      })}
      </div>
    </div>;
}