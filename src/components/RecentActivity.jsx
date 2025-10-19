// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Clock, TrendingUp, Users, Package } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [{
    id: 1,
    type: 'product',
    title: 'AI智能调色宝机',
    description: '新增订单 5 台',
    time: '2小时前',
    icon: Package,
    color: 'text-blue-400'
  }, {
    id: 2,
    type: 'formula',
    title: '奶茶色染发配方',
    description: '使用次数 +12',
    time: '4小时前',
    icon: TrendingUp,
    color: 'text-green-400'
  }, {
    id: 3,
    type: 'customer',
    title: '新客户注册',
    description: 'VIP客户刘女士',
    time: '6小时前',
    icon: Users,
    color: 'text-purple-400'
  }, {
    id: 4,
    type: 'system',
    title: '系统更新',
    description: 'AI算法优化完成',
    time: '1天前',
    icon: Clock,
    color: 'text-orange-400'
  }];
  return <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">最近活动</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => {
          const Icon = activity.icon;
          return <div key={activity.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{activity.title}</h4>
                <p className="text-white/60 text-sm">{activity.description}</p>
              </div>
              <div className="text-white/60 text-xs">
                {activity.time}
              </div>
            </div>;
        })}
        </div>
      </CardContent>
    </Card>;
};