// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Package, BarChart3, Users, TrendingUp } from 'lucide-react';

export const StatsCards = ({
  stats
}) => {
  const statsData = [{
    icon: Package,
    color: 'text-blue-400',
    label: 'AI产品总数',
    value: stats.totalProducts
  }, {
    icon: BarChart3,
    color: 'text-green-400',
    label: '染发配方总数',
    value: stats.totalFormulas
  }, {
    icon: TrendingUp,
    color: 'text-yellow-400',
    label: '流行色彩总数',
    value: stats.totalColors
  }, {
    icon: Users,
    color: 'text-purple-400',
    label: '合作门店总数',
    value: stats.totalUsers
  }];
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => {
      const Icon = stat.icon;
      return <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4 text-center">
            <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-white/80">{stat.label}</div>
          </CardContent>
        </Card>;
    })}
    </div>;
};