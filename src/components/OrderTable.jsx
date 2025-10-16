// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Eye, Clock, CheckCircle, PlayCircle } from 'lucide-react';

export function OrderTable({
  orders,
  onView,
  onUpdateStatus
}) {
  const getStatusColor = status => {
    switch (status) {
      case '待服务':
        return 'bg-orange-100 text-orange-800';
      case '进行中':
        return 'bg-blue-100 text-blue-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '已取消':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case '待服务':
        return <Clock className="w-4 h-4" />;
      case '进行中':
        return <PlayCircle className="w-4 h-4" />;
      case '已完成':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          订单列表
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">订单号</th>
                <th className="text-left py-3 px-4">客户信息</th>
                <th className="text-left py-3 px-4">服务项目</th>
                <th className="text-left py-3 px-4">技师</th>
                <th className="text-left py-3 px-4">预约时间</th>
                <th className="text-left py-3 px-4">金额</th>
                <th className="text-left py-3 px-4">状态</th>
                <th className="text-center py-3 px-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{order.service}</td>
                  <td className="py-3 px-4">{order.employee}</td>
                  <td className="py-3 px-4">{order.appointmentTime}</td>
                  <td className="py-3 px-4 font-medium">¥{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => onView(order)}>
                        <Eye className="w-3 h-3" />
                      </Button>
                      {order.status === '待服务' && <Button size="sm" onClick={() => onUpdateStatus(order.id, '进行中')}>
                          开始服务
                        </Button>}
                      {order.status === '进行中' && <Button size="sm" onClick={() => onUpdateStatus(order.id, '已完成')}>
                          完成服务
                        </Button>}
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>;
}