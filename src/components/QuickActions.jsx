// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { MessageSquare, Calendar, BookOpen, ShoppingBag, Users, TrendingUp, Star, Clock } from 'lucide-react';

export function QuickActions({
  currentSystem,
  onActionClick
}) {
  const getActions = systemId => {
    const actions = {
      'customer-service': [{
        icon: MessageSquare,
        label: '开始对话',
        description: '与AI客服开始对话',
        color: 'purple'
      }, {
        icon: Clock,
        label: '历史记录',
        description: '查看对话历史',
        color: 'blue'
      }, {
        icon: Star,
        label: '常用回复',
        description: '管理快捷回复',
        color: 'yellow'
      }, {
        icon: Users,
        label: '客户管理',
        description: '查看客户信息',
        color: 'green'
      }],
      'appointment': [{
        icon: Calendar,
        label: '新建预约',
        description: '创建新的预约',
        color: 'blue'
      }, {
        icon: Clock,
        label: '今日预约',
        description: '查看今日预约',
        color: 'orange'
      }, {
        icon: Users,
        label: '客户列表',
        description: '管理客户信息',
        color: 'purple'
      }, {
        icon: TrendingUp,
        label: '数据分析',
        description: '查看预约统计',
        color: 'green'
      }],
      'training': [{
        icon: BookOpen,
        label: '课程中心',
        description: '浏览培训课程',
        color: 'green'
      }, {
        icon: Users,
        label: '学员管理',
        description: '管理学员信息',
        color: 'blue'
      }, {
        icon: TrendingUp,
        label: '学习进度',
        description: '查看学习统计',
        color: 'purple'
      }, {
        icon: Star,
        label: '考试测评',
        description: '进行在线考试',
        color: 'yellow'
      }],
      'micro-store': [{
        icon: ShoppingBag,
        label: '商品管理',
        description: '管理店铺商品',
        color: 'orange'
      }, {
        icon: MessageSquare,
        label: '订单处理',
        description: '处理客户订单',
        color: 'blue'
      }, {
        icon: Users,
        label: '客户管理',
        description: '管理客户信息',
        color: 'purple'
      }, {
        icon: TrendingUp,
        label: '销售分析',
        description: '查看销售数据',
        color: 'green'
      }]
    };
    return actions[systemId] || actions['customer-service'];
  };
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-50',
        border: 'border-purple-200'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-50',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        hover: 'hover:bg-green-50',
        border: 'border-green-200'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        hover: 'hover:bg-yellow-50',
        border: 'border-yellow-200'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-50',
        border: 'border-orange-200'
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  const actions = getActions(currentSystem);
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => {
      const colors = getColorClasses(action.color);
      const Icon = action.icon;
      return <Button key={index} variant="outline" onClick={() => onActionClick(action)} className={`flex flex-col items-center space-y-2 h-24 p-4 ${colors.hover} ${colors.border}`}>
          <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900 text-sm">{action.label}</div>
            <div className="text-xs text-gray-500">{action.description}</div>
          </div>
        </Button>;
    })}
    </div>;
}