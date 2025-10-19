// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Bot, Palette, Users, Store, Heart, Cloud, Camera, MessageCircle, BarChart3, Settings, Package } from 'lucide-react';

export const QuickActions = ({
  onQuickAction
}) => {
  const quickActions = [{
    id: 'ai-chat',
    title: 'AI染发顾问',
    description: '智能染发建议和配方推荐',
    icon: Bot,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500'
  }, {
    id: 'color-recognition',
    title: '色彩识别',
    description: '拍照识别发色和配方',
    icon: Camera,
    color: 'text-green-400',
    bgColor: 'bg-green-500'
  }, {
    id: 'formula-generation',
    title: '配方生成',
    description: 'AI智能生成染发配方',
    icon: Palette,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500'
  }, {
    id: 'store-management',
    title: '门店管理',
    description: '全面的门店运营管理',
    icon: Store,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500'
  }, {
    id: 'customer-management',
    title: '客户管理',
    description: '客户档案和偏好管理',
    icon: Users,
    color: 'text-red-400',
    bgColor: 'bg-red-500'
  }, {
    id: 'inventory-management',
    title: '库存管理',
    description: '染发产品库存追踪',
    icon: Package,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500'
  }];
  return <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
      <CardHeader>
        <CardTitle className="text-white">快速操作</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map(action => {
          const Icon = action.icon;
          return <Button key={action.id} onClick={() => onQuickAction(action.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 h-20 flex flex-col p-3 group">
              <Icon className={`w-6 h-6 mb-2 ${action.color} group-hover:scale-110 transition-transform`} />
              <span className="text-xs text-center">{action.title}</span>
            </Button>;
        })}
        </div>
      </CardContent>
    </Card>;
};