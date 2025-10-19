// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { TrendingUp, TrendingDown, Wallet, ChartBar } from 'lucide-react';

export const FinanceOverview = ({
  stats
}) => {
  const renderStatCard = stat => {
    const Icon = stat.icon;
    return <div key={stat.id} className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">¥{stat.value.toLocaleString()}</div>
        <div className="text-white/60">{stat.title}</div>
        <div className={`text-sm mt-2 ${stat.changeColor}`}>{stat.change}</div>
      </div>;
  };
  return <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map(renderStatCard)}
    </section>;
};