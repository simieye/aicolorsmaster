// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Package, Truck, CheckCircle, XCircle, Clock, ArrowLeft, Eye, MessageCircle } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function OrdersPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);

  // 订单状态配置
  const orderStatusConfig = {
    pending: {
      label: '待付款',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      icon: Clock
    },
    paid: {
      label: '待发货',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      icon: Package
    },
    shipped: {
      label: '已发货',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      icon: Truck
    },
    delivered: {
      label: '已送达',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      icon: CheckCircle
    },
    cancelled: {
      label: '已取消',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      icon: XCircle
    }
  };

  // 模拟订单数据
  const mockOrders = [{
    id: 'ORD20240115001',
    orderNumber: 'ORD20240115001',
    status: 'delivered',
    totalAmount: 4980,
    itemCount: 1,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
    items: [{
      id: 1,
      name: 'AI智能染发自动调色宝机',
      price: 4980,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=80&h=80&fit=crop'
    }],
    shippingAddress: '北京市朝阳区xxx街道xxx号',
    trackingNumber: 'SF1234567890'
  }, {
    id: 'ORD20240114002',
    orderNumber: 'ORD20240114002',
    status: 'shipped',
    totalAmount: 4360,
    itemCount: 2,
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
    items: [{
      id: 2,
      name: 'AI品牌染发膏管理系统',
      price: 1680,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=80&h=80&fit=crop'
    }, {
      id: 3,
      name: 'AI客户配方管理系统',
      price: 2680,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop'
    }],
    shippingAddress: '上海市浦东新区xxx路xxx号',
    trackingNumber: 'YTO9876543210'
  }, {
    id: 'ORD20240113003',
    orderNumber: 'ORD20240113003',
    status: 'paid',
    totalAmount: 6800,
    itemCount: 1,
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-13T11:25:00Z',
    items: [{
      id: 5,
      name: 'AI美发客户管理系统CRM',
      price: 6800,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop'
    }],
    shippingAddress: '广州市天河区xxx大道xxx号'
  }, {
    id: 'ORD20240112004',
    orderNumber: 'ORD20240112004',
    status: 'pending',
    totalAmount: 8800,
    itemCount: 1,
    createdAt: '2024-01-12T16:10:00Z',
    updatedAt: '2024-01-12T16:10:00Z',
    items: [{
      id: 6,
      name: 'AI染发色彩大师AI原生开源SaaS系统',
      price: 8800,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop'
    }],
    shippingAddress: '深圳市南山区xxx科技园'
  }];

  // 加载订单数据
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        console.error('加载订单失败:', error);
        toast({
          title: "加载失败",
          description: "订单数据加载失败，请稍后重试",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [toast]);

  // 过滤订单
  useEffect(() => {
    let filtered = orders;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(order => order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    // 状态过滤
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else {
      if ($w.utils && $w.utils.navigateTo) {
        $w.utils.navigateTo({
          pageId: 'home',
          params: {}
        });
      }
    }
  };

  // 处理查看订单详情
  const handleViewOrder = order => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'order-detail',
        params: {
          orderId: order.id
        }
      });
    } else {
      toast({
        title: "订单详情",
        description: `查看订单 ${order.orderNumber} 的详细信息`
      });
    }
  };

  // 处理联系客服
  const handleContactSupport = order => {
    toast({
      title: "联系客服",
      description: "正在为您连接客服..."
    });
  };

  // 处理取消订单
  const handleCancelOrder = order => {
    if (order.status !== 'pending') {
      toast({
        title: "无法取消",
        description: "该订单状态不允许取消",
        variant: "destructive"
      });
      return;
    }
    if (confirm(`确定要取消订单 ${order.orderNumber} 吗？`)) {
      // 模拟取消订单
      setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? {
        ...o,
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      } : o));
      toast({
        title: "订单已取消",
        description: `订单 ${order.orderNumber} 已成功取消`
      });
    }
  };

  // 处理确认收货
  const handleConfirmDelivery = order => {
    if (order.status !== 'shipped') {
      toast({
        title: "无法确认",
        description: "该订单状态不允许确认收货",
        variant: "destructive"
      });
      return;
    }
    // 模拟确认收货
    setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? {
      ...o,
      status: 'delivered',
      updatedAt: new Date().toISOString()
    } : o));
    toast({
      title: "确认收货",
      description: `订单 ${order.orderNumber} 已确认收货`
    });
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>加载订单中...</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-white/80 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-white">我的订单</h1>
            </div>
            <div className="text-white/60 text-sm">
              共 {filteredOrders.length} 个订单
            </div>
          </div>
        </div>
      </header>

      {/* 搜索和筛选 */}
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input placeholder="搜索订单号或商品名称" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
              </div>

              {/* 状态筛选 */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="订单状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-gray-800">全部状态</SelectItem>
                  {Object.entries(orderStatusConfig).map(([key, config]) => <SelectItem key={key} value={key} className="text-gray-800">
                      {config.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 订单列表 */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? <div className="text-center py-16">
              <Package className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">暂无订单</h3>
              <p className="text-white/60 mb-6">您还没有任何订单记录</p>
              <Button onClick={() => {
            if ($w.utils && $w.utils.navigateTo) {
              $w.utils.navigateTo({
                pageId: 'products',
                params: {}
              });
            }
          }} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                去购物
              </Button>
            </div> : filteredOrders.map(order => {
          const statusConfig = orderStatusConfig[order.status];
          const StatusIcon = statusConfig.icon;
          return <Card key={order.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                <CardContent className="p-6">
                  {/* 订单头部 */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-white font-medium">{order.orderNumber}</h3>
                      <div className={`flex items-center space-x-1 ${statusConfig.color} ${statusConfig.bgColor} px-2 py-1 rounded-full text-xs`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusConfig.label}</span>
                      </div>
                    </div>
                    <div className="text-white/60 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* 商品列表 */}
                  <div className="flex items-center space-x-4 mb-4">
                    {order.items.slice(0, 3).map((item, index) => <div key={index} className="relative">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        {item.quantity > 1 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </div>}
                      </div>)}
                    {order.items.length > 3 && <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-white/60 text-sm">+{order.items.length - 3}</span>
                      </div>}
                    <div className="flex-1">
                      <p className="text-white/80 text-sm">
                        {order.items.map(item => item.name).join('、')}
                      </p>
                      <p className="text-white/60 text-xs mt-1">共 {order.itemCount} 件商品</p>
                    </div>
                    <div className="text-right">
                      <div className="text-red-400 font-bold text-lg">¥{order.totalAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="text-white/60 text-sm">
                      {order.trackingNumber && <span>物流单号: {order.trackingNumber}</span>}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)} className="text-white/80 hover:text-white">
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleContactSupport(order)} className="text-white/80 hover:text-white">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        客服
                      </Button>
                      {order.status === 'pending' && <Button variant="ghost" size="sm" onClick={() => handleCancelOrder(order)} className="text-red-400 hover:text-red-300">
                          取消订单
                        </Button>}
                      {order.status === 'shipped' && <Button variant="ghost" size="sm" onClick={() => handleConfirmDelivery(order)} className="text-green-400 hover:text-green-300">
                          确认收货
                        </Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="orders" />
    </div>;
}