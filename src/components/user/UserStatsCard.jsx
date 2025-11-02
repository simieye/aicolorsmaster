// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Package, Star, Heart, TrendingUp, Users, Zap } from 'lucide-react';

export function UserStatsCard({
  userStats
}) {
  if (!userStats) {
    return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({
        length: 6
      }).map((_, index) => <Card key={index}>
            <CardContent className="p-4">
              <div className="animate-pulse space-y-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>)}
      </div>;
  }
  const stats = [{
    icon: Package,
    label: '总订单',
    value: userStats.totalOrders,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100'
  }, {
    icon: Star,
    label: '总评价',
    value: userStats.totalReviews,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100'
  }, {
    icon: Heart,
    label: '收藏',
    value: userStats.totalFavorites,
    color: 'text-red-500',
    bgColor: 'bg-red-100'
  }, {
    icon: TrendingUp,
    label: '总消费',
    value: `¥${userStats.totalSpent}`,
    color: 'text-green-500',
    bgColor: 'bg-green-100'
  }, {
    icon: Users,
    label: '推荐数',
    value: userStats.referrals,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100'
  }, {
    icon: Zap,
    label: '积分',
    value: userStats.points,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100'
  }];
  return <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>)}
    </div>;
}