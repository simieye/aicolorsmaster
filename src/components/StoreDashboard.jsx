// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, Users, Package, DollarSign, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';

export function StoreDashboard({
  stats,
  recentOrders,
  lowStockItems
}) {
  return <div className="space-y-6">
      {/* 数据统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日营业额</p>
                <p className="text-2xl font-bold text-gray-800">¥{stats.todayRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% 较昨日</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">今日订单</p>
                <p className="text-2xl font-bold text-gray-800">{stats.todayOrders}</p>
                <p className="text-xs text-blue-600">+8.3% 较昨日</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">服务客户</p>
                <p className="text-2xl font-bold text-gray-800">{stats.todayCustomers}</p>
                <p className="text-xs text-purple-600">+15.2% 较昨日</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">库存预警</p>
                <p className="text-2xl font-bold text-gray-800">{stats.lowStockCount}</p>
                <p className="text-xs text-red-600">需要补货</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近订单 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">最近订单</h3>
          <div className="space-y-3">
            {recentOrders.map(order => <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === 'completed' ? 'bg-green-500' : order.status === 'processing' ? 'bg-blue-500' : order.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-600">{order.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">¥{order.amount}</p>
                  <p className="text-xs text-gray-600">{order.time}</p>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 库存预警 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">库存预警</h3>
          <div className="space-y-3">
            {lowStockItems.map(item => <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">当前库存：{item.currentStock}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-orange-600">低于最低库存</p>
                  <p className="text-xs text-gray-600">建议补货：{item.reorderLevel}</p>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}