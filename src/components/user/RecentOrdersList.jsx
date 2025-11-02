// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Package, Clock, CheckCircle, Truck, ChevronRight } from 'lucide-react';

// @ts-ignore;
import { ListItemLoading } from '@/components/LoadingStates';
export function RecentOrdersList({
  recentOrders,
  onViewOrder
}) {
  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'pending':
        return '待处理';
      case 'processing':
        return '处理中';
      case 'shipped':
        return '已发货';
      case 'delivered':
        return '已送达';
      default:
        return '未知状态';
    }
  };
  if (!recentOrders) {
    return <ListItemLoading count={3} />;
  }
  if (recentOrders.length === 0) {
    return <Card>
        <CardContent className="p-6 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">暂无订单记录</p>
        </CardContent>
      </Card>;
  }
  return <div className="space-y-3">
      {recentOrders.map(order => <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">{order.orderNumber}</h4>
                  {getStatusIcon(order.status)}
                  <span className="text-sm text-muted-foreground">
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="font-medium text-primary">¥{order.totalAmount}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onViewOrder(order)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>)}
    </div>;
}