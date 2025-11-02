// @ts-ignore;
import React, { useState, useEffect, useMemo, useCallback } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Package, Truck, CheckCircle, Clock, AlertCircle, Star, MessageCircle, Download, Filter, Search, Calendar, ChevronRight, Eye, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, OrderLoading, OrderEmpty, ErrorState, DataLoader } from '@/components/LoadingStates';
// @ts-ignore;
import { useDataCache } from '@/hooks/useDataCache';
// @ts-ignore;
import { CACHE_KEYS, CACHE_TTL, cacheUtils } from '@/lib/DataCache';
export default function OrdersPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // 使用数据缓存Hook
  const {
    data: orders,
    loading,
    error,
    refresh,
    invalidate
  } = useDataCache({
    key: CACHE_KEYS.ORDERS,
    fetcher: async () => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1200));
      return [{
        id: 'ORD202401001',
        orderDate: '2024-01-15T10:30:00Z',
        status: 'delivered',
        totalAmount: 568,
        items: [{
          id: 1,
          name: '天然植物染发剂 - 棕色系',
          price: 128,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop'
        }, {
          id: 2,
          name: '专业染发套装 - 红色系',
          price: 298,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop'
        }],
        shippingAddress: {
          name: '张三',
          phone: '138****5678',
          address: '北京市朝阳区某某街道123号'
        },
        trackingNumber: 'SF1234567890',
        estimatedDelivery: '2024-01-18'
      }, {
        id: 'ORD202401002',
        orderDate: '2024-01-16T14:20:00Z',
        status: 'shipped',
        totalAmount: 188,
        items: [{
          id: 3,
          name: '无氨染发剂 - 黑色系',
          price: 188,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
        }],
        shippingAddress: {
          name: '李四',
          phone: '139****8765',
          address: '上海市浦东新区某某路456号'
        },
        trackingNumber: 'YTO9876543210',
        estimatedDelivery: '2024-01-19'
      }];
    },
    ttl: CACHE_TTL.MEDIUM,
    immediate: true
  });

  // 订单状态配置
  const orderStatuses = useMemo(() => ({
    pending: {
      label: '待付款',
      color: 'text-yellow-600 bg-yellow-100',
      icon: Clock
    },
    paid: {
      label: '待发货',
      color: 'text-blue-600 bg-blue-100',
      icon: Package
    },
    shipped: {
      label: '已发货',
      color: 'text-purple-600 bg-purple-100',
      icon: Truck
    },
    delivered: {
      label: '已送达',
      color: 'text-green-600 bg-green-100',
      icon: CheckCircle
    },
    cancelled: {
      label: '已取消',
      color: 'text-red-600 bg-red-100',
      icon: AlertCircle
    },
    refunded: {
      label: '已退款',
      color: 'text-gray-600 bg-gray-100',
      icon: RefreshCw
    }
  }), []);

  // 过滤订单
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter(order => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, searchTerm]);

  // 处理重试
  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  // 处理刷新
  const handleRefresh = useCallback(() => {
    refresh();
    toast({
      title: "刷新成功",
      description: "订单数据已更新"
    });
  }, [refresh, toast]);

  // 处理缓存失效
  const handleInvalidateCache = useCallback(() => {
    invalidate();
    // 同时清理相关的用户统计缓存
    cacheUtils.invalidateDependent(CACHE_KEYS.ORDERS);
    toast({
      title: "缓存已清理",
      description: "订单缓存已清理，下次访问将重新加载"
    });
  }, [invalidate, toast]);

  // 订单点击处理
  const handleOrderClick = useCallback(order => {
    setSelectedOrder(order);
    setShowDetail(true);
  }, []);

  // 物流查询
  const handleTrackOrder = useCallback(order => {
    toast({
      title: "物流查询",
      description: `正在查询订单 ${order.id} 的物流信息...`
    });
  }, [toast]);

  // 联系客服
  const handleContactService = useCallback(order => {
    toast({
      title: "联系客服",
      description: "正在为您转接客服..."
    });
  }, [toast]);

  // 取消订单
  const handleCancelOrder = useCallback(order => {
    // 更新订单状态
    const updatedOrders = orders.map(o => o.id === order.id ? {
      ...o,
      status: 'cancelled'
    } : o);

    // 更新缓存
    cacheUtils.batchSet([{
      key: CACHE_KEYS.ORDERS,
      data: updatedOrders,
      ttl: CACHE_TTL.MEDIUM
    }]);

    // 刷新当前数据
    refresh();
    toast({
      title: "取消订单",
      description: `订单 ${order.id} 已取消`,
      variant: "destructive"
    });
  }, [orders, refresh, toast]);

  // 确认收货
  const handleConfirmReceipt = useCallback(order => {
    // 更新订单状态
    const updatedOrders = orders.map(o => o.id === order.id ? {
      ...o,
      status: 'delivered'
    } : o);

    // 更新缓存
    cacheUtils.batchSet([{
      key: CACHE_KEYS.ORDERS,
      data: updatedOrders,
      ttl: CACHE_TTL.MEDIUM
    }]);

    // 刷新当前数据
    refresh();
    toast({
      title: "确认收货",
      description: `订单 ${order.id} 已确认收货`
    });
  }, [orders, refresh, toast]);

  // 评价订单
  const handleReviewOrder = useCallback(order => {
    toast({
      title: "评价订单",
      description: "正在跳转到评价页面..."
    });
  }, [toast]);
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="我的订单" showBack={true} />
        
        <div className="pb-20">
          {/* 搜索和筛选栏 */}
          <div className="bg-card border-b p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input type="text" placeholder="搜索订单号、商品名称..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                时间筛选
              </Button>
            </div>

            {/* 状态筛选 */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <button onClick={() => setSelectedStatus('all')} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${selectedStatus === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                全部订单
              </button>
              {Object.entries(orderStatuses).map(([key, status]) => <button key={key} onClick={() => setSelectedStatus(key)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${selectedStatus === key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {status.label}
                </button>)}
            </div>
          </div>

          {/* 订单列表 */}
          <div className="p-4">
            <DataLoader loading={loading} error={error} data={filteredOrders} loadingComponent={<OrderLoading />} errorComponent={<ErrorState error={error} onRetry={handleRetry} />} emptyComponent={<OrderEmpty />} onRetry={handleRetry}>
              <div className="space-y-4">
                {filteredOrders.map(order => {
                const StatusIcon = orderStatuses[order.status].icon;
                const statusConfig = orderStatuses[order.status];
                return <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{order.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              <span>{statusConfig.label}</span>
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          {order.items.map(item => <div key={item.id} className="flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">¥{item.price} x {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">¥{item.price * item.quantity}</p>
                              </div>
                            </div>)}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
                            </span>
                            <span className="font-medium text-lg">
                              总计: ¥{order.totalAmount}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleOrderClick(order)}>
                              <Eye className="w-4 h-4 mr-1" />
                              详情
                            </Button>
                            
                            {order.status === 'shipped' && <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order)}>
                                <Truck className="w-4 h-4 mr-1" />
                                查看物流
                              </Button>}
                            
                            {order.status === 'delivered' && <Button size="sm" onClick={() => handleReviewOrder(order)}>
                                <Star className="w-4 h-4 mr-1" />
                                评价
                              </Button>}
                            
                            {order.status === 'pending' && <Button variant="destructive" size="sm" onClick={() => handleCancelOrder(order)}>
                                取消订单
                              </Button>}
                            
                            <Button variant="outline" size="sm" onClick={() => handleContactService(order)}>
                              <MessageCircle className="w-4 h-4 mr-1" />
                              客服
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>;
              })}
              </div>
            </DataLoader>
          </div>

          {/* 缓存管理按钮（开发环境） */}
          {process.env.NODE_ENV === 'development' && <div className="fixed bottom-24 right-4 space-y-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                刷新缓存
              </Button>
              <Button variant="outline" size="sm" onClick={handleInvalidateCache}>
                清理缓存
              </Button>
            </div>}
        </div>

        {/* 订单详情弹窗 */}
        {showDetail && selectedOrder && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">订单详情</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetail(false)}>
                    ×
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* 订单信息 */}
                  <div>
                    <h4 className="font-medium mb-3">订单信息</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">订单号:</span>
                        <span className="ml-2">{selectedOrder.id}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">下单时间:</span>
                        <span className="ml-2">{new Date(selectedOrder.orderDate).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">订单状态:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${orderStatuses[selectedOrder.status].color}`}>
                          {orderStatuses[selectedOrder.status].label}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">订单总额:</span>
                        <span className="ml-2 font-medium">¥{selectedOrder.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* 收货信息 */}
                  <div>
                    <h4 className="font-medium mb-3">收货信息</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.shippingAddress.phone}</p>
                      <p className="text-sm">{selectedOrder.shippingAddress.address}</p>
                    </div>
                  </div>

                  {/* 物流信息 */}
                  {(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') && <div>
                      <h4 className="font-medium mb-3">物流信息</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm">
                          <span className="text-muted-foreground">物流单号:</span>
                          <span className="ml-2">{selectedOrder.trackingNumber}</span>
                        </p>
                        {selectedOrder.estimatedDelivery && <p className="text-sm mt-1">
                            <span className="text-muted-foreground">预计送达:</span>
                            <span className="ml-2">{selectedOrder.estimatedDelivery}</span>
                          </p>}
                      </div>
                    </div>}

                  {/* 商品列表 */}
                  <div>
                    <h4 className="font-medium mb-3">商品列表</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map(item => <div key={item.id} className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{item.name}</h5>
                            <p className="text-sm text-muted-foreground">¥{item.price} x {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">¥{item.price * item.quantity}</p>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}

        <TabBar />
      </div>
    </ErrorBoundary>;
}