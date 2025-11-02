// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Clock, CheckCircle, Package, Truck, XCircle, AlertCircle } from 'lucide-react';

export function OrderStatusBadge({
  status,
  size = 'default'
}) {
  const statusConfig = {
    pending: {
      label: '待付款',
      color: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      icon: Clock
    },
    paid: {
      label: '已付款',
      color: 'text-blue-600 bg-blue-100 border-blue-200',
      icon: CheckCircle
    },
    processing: {
      label: '处理中',
      color: 'text-purple-600 bg-purple-100 border-purple-200',
      icon: Package
    },
    shipped: {
      label: '已发货',
      color: 'text-green-600 bg-green-100 border-green-200',
      icon: Truck
    },
    delivered: {
      label: '已送达',
      color: 'text-green-600 bg-green-100 border-green-200',
      icon: CheckCircle
    },
    cancelled: {
      label: '已取消',
      color: 'text-red-600 bg-red-100 border-red-200',
      icon: XCircle
    },
    refunded: {
      label: '已退款',
      color: 'text-gray-600 bg-gray-100 border-gray-200',
      icon: AlertCircle
    }
  };
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };
  const iconSizes = {
    small: 'w-3 h-3',
    default: 'w-4 h-4',
    large: 'w-5 h-5'
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border ${config.color} ${sizeClasses[size]}`}>
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>;
}