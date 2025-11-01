// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Clock, Package, CheckCircle, Star } from 'lucide-react';

// @ts-ignore;

export function OrderStatusGrid({
  onNavigate
}) {
  const orderStatuses = [{
    icon: <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />,
    label: '待付款',
    status: 'pending',
    hasBadge: true
  }, {
    icon: <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />,
    label: '待收货',
    status: 'shipped',
    hasBadge: false
  }, {
    icon: <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />,
    label: '已完成',
    status: 'completed',
    hasBadge: false
  }, {
    icon: <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />,
    label: '待评价',
    status: 'review',
    hasBadge: false
  }];
  return <div className="grid grid-cols-4 gap-4">
      {orderStatuses.map((status, index) => <div key={index} className="text-center cursor-pointer" onClick={() => onNavigate('orders-history', {
      status: status.status
    })}>
          <div className="relative">
            {status.icon}
            {status.hasBadge && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>}
          </div>
          <div className="text-sm">{status.label}</div>
        </div>)}
    </div>;
}