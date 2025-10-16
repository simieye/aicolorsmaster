// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Users, Heart, TrendingUp, Star } from 'lucide-react';

export function CommunityStats() {
  const stats = [{
    icon: Users,
    value: '1000万+',
    label: '美业者',
    color: 'text-purple-600'
  }, {
    icon: Heart,
    value: '50万+',
    label: '作品',
    color: 'text-red-500'
  }, {
    icon: TrendingUp,
    value: '33%',
    label: '复购提升',
    color: 'text-green-600'
  }, {
    icon: Star,
    value: '4.8',
    label: '平均评分',
    color: 'text-yellow-500'
  }];
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
      const Icon = stat.icon;
      return <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Icon className={`w-8 h-8 ${stat.color} mr-3`} />
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>;
    })}
    </div>;
}