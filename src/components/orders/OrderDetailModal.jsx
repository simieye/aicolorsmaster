// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { User, Phone, Mail, MapPin, Star, Package } from 'lucide-react';

// @ts-ignore;
import { OrderStatusBadge } from './OrderStatusBadge';
export function OrderDetailModal({
  order,
  onClose,
  orderStatuses
}) {
  if (!order) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">订单详情</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          <div className="space-y-4">
            {/* 订单基本信息 */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">基本信息</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">订单号:</span>
                    <span className="ml-2">{order.orderNumber}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">下单时间:</span>
                    <span className="ml-2">{new Date(order.orderDate).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">订单状态:</span>
                    <span className="ml-2">
                      <OrderStatusBadge status={order.status} size="small" />
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">支付方式:</span>
                    <span className="ml-2">{order.paymentMethod}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 客户信息 */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">客户信息</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{order.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{order.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{order.customerAddress}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 商品列表 */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">商品列表</h4>
                <div className="space-y-2">
                  {order.items.map(item => <div key={item.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ¥{item.price} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">¥{item.price * item.quantity}</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 费用明细 */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">费用明细</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>商品总价:</span>
                    <span>¥{order.totalAmount}</span>
                  </div>
                  {order.discountAmount > 0 && <div className="flex justify-between text-green-600">
                      <span>优惠金额:</span>
                      <span>-¥{order.discountAmount}</span>
                    </div>}
                  <div className="flex justify-between font-medium text-lg">
                    <span>实付金额:</span>
                    <span className="text-primary">¥{order.finalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 备注 */}
            {order.notes && <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">订单备注</h4>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </CardContent>
              </Card>}

            {/* 评价 */}
            {order.review && <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">客户评价</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{order.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.review}</p>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
}