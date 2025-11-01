// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ShoppingBag, Heart, CreditCard, Award } from 'lucide-react';

// @ts-ignore;

export function UserStats({
  stats
}) {
  return <div className="grid grid-cols-4 gap-4 mt-6">
      {stats.map((stat, index) => <div key={index} className="text-center">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-xs text-blue-100">{stat.label}</div>
        </div>)}
    </div>;
}