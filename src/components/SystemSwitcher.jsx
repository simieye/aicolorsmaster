// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, Calendar, GraduationCap, ShoppingBag, Settings, ChevronDown } from 'lucide-react';

export function SystemSwitcher({
  currentSystem,
  onSystemChange,
  onSettingsClick
}) {
  const systems = [{
    id: 'customer-service',
    name: 'AI客服系统',
    description: '智能客服对话',
    icon: HeadphonesIcon,
    color: 'purple'
  }, {
    id: 'appointment',
    name: 'AI预约系统',
    description: '预约管理服务',
    icon: Calendar,
    color: 'blue'
  }, {
    id: 'training',
    name: 'AI培训系统',
    description: '员工培训管理',
    icon: GraduationCap,
    color: 'green'
  }, {
    id: 'micro-store',
    name: 'AI微店系统',
    description: '电商开店服务',
    icon: ShoppingBag,
    color: 'orange'
  }];
  const currentSystemData = systems.find(s => s.id === currentSystem) || systems[0];
  const CurrentIcon = currentSystemData.icon;
  const [isOpen, setIsOpen] = React.useState(false);
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
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        hover: 'hover:bg-orange-50'
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  return <div className="relative">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-3 px-4 py-2">
          <div className={`w-8 h-8 ${getColorClasses(currentSystemData.color).bg} rounded-full flex items-center justify-center`}>
            <CurrentIcon className={`w-4 h-4 ${getColorClasses(currentSystemData.color).text}`} />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">{currentSystemData.name}</div>
            <div className="text-xs text-gray-500">{currentSystemData.description}</div>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onSettingsClick} className="p-2">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {isOpen && <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {systems.map(system => {
          const colors = getColorClasses(system.color);
          const Icon = system.icon;
          const isActive = system.id === currentSystem;
          return <button key={system.id} onClick={() => {
            onSystemChange(system.id);
            setIsOpen(false);
          }} className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? colors.bg : 'hover:bg-gray-50'}`}>
                <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="text-left flex-1">
                  <div className={`font-medium ${isActive ? colors.text : 'text-gray-900'}`}>{system.name}</div>
                  <div className="text-sm text-gray-500">{system.description}</div>
                </div>
                {isActive && <div className={`w-2 h-2 ${colors.text} rounded-full`}></div>}
              </button>;
        })}
          </div>
        </div>}
    </div>;
}