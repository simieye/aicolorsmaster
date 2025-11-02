// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Clock, CheckCircle, Package, Truck, XCircle, AlertCircle } from 'lucide-react';

export function OrderStats({
  orders
}) {
  const statusConfig = {
    pending: {
      label: '待付款',
      icon: Clock,
      color: 'text-yellow-500'
    },
    paid: {
      label: '已付款',
      icon: CheckCircle,
      color: 'text-blue-500'
    },
    processing: {
      label: '处理中',
      icon: Package,
      color: 'text-purple-500'
    },
    shipped: {
      label: '已发货',
      icon: Truck,
      color: 'text-green-500'
    },
    delivered: {
      label: '已送达',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    cancelled: {
      label: '已取消',
      icon: XCircle,
      color: 'text-red-500'
    },
    refunded: {
      label: '已退款',
      icon: AlertCircle,
      color: 'text-gray-500'
    }
  };
  const stats = Object.entries(statusConfig).map(([key, config]) => {
    const count = orders?.filter(order => order.status === key).length || 0;
    return {
      key,
      ...config,
      count
    };
  });
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map(stat => <Card key={stat.key}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>)}
    </div>;
}