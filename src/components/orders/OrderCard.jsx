// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Eye, MessageCircle, Star, User, Phone, Mail, MapPin } from 'lucide-react';

// @ts-ignore;
import { OrderStatusBadge } from './OrderStatusBadge';
// @ts-ignore;
import { ButtonLoading } from '@/components/LoadingStates';
export function OrderCard({
  order,
  onViewDetail,
  onContactCustomer,
  onUpdateStatus,
  isUpdatingStatus
}) {
  const handleStatusUpdate = newStatus => {
    if (onUpdateStatus && !isUpdatingStatus[order.id]) {
      onUpdateStatus(order.id, newStatus);
    }
  };
  return <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium">{order.orderNumber}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <div>
            <p className="text-sm text-muted-foreground">客户信息</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-muted-foreground" />
                <p className="font-medium text-sm">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <p className="text-sm">{order.customerPhone}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">订单金额</p>
            <p className="font-medium text-primary">¥{order.finalAmount}</p>
            {order.discountAmount > 0 && <p className="text-sm text-muted-foreground line-through">
                ¥{order.totalAmount}
              </p>}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">商品数量</p>
            <p className="font-medium">{order.items.length} 件</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {order.trackingNumber && <span className="text-sm text-muted-foreground">
                物流单号: {order.trackingNumber}
              </span>}
            {order.rating && <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{order.rating}</span>
              </div>}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onViewDetail(order)}>
              <Eye className="w-4 h-4 mr-1" />
              详情
            </Button>
            
            <Button variant="ghost" size="sm" onClick={() => onContactCustomer(order)}>
              <MessageCircle className="w-4 h-4 mr-1" />
              联系
            </Button>

            {order.status === 'pending' && <Button size="sm" onClick={() => handleStatusUpdate('paid')} disabled={isUpdatingStatus[order.id]}>
                {isUpdatingStatus[order.id] ? <ButtonLoading text="处理中..." /> : '确认付款'}
              </Button>}

            {order.status === 'paid' && <Button size="sm" onClick={() => handleStatusUpdate('processing')} disabled={isUpdatingStatus[order.id]}>
                {isUpdatingStatus[order.id] ? <ButtonLoading text="处理中..." /> : '开始处理'}
              </Button>}

            {order.status === 'processing' && <Button size="sm" onClick={() => handleStatusUpdate('shipped')} disabled={isUpdatingStatus[order.id]}>
                {isUpdatingStatus[order.id] ? <ButtonLoading text="处理中..." /> : '发货'}
              </Button>}
          </div>
        </div>
      </CardContent>
    </Card>;
}