// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Package, RefreshCw, Download, AlertCircle } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { OrderListLoading, FullScreenLoading, InlineLoading, ButtonLoading } from '@/components/LoadingStates';

// 订单相关组件
// @ts-ignore;
import { OrderCard } from '@/components/orders/OrderCard';
// @ts-ignore;
import { OrderStats } from '@/components/orders/OrderStats';
// @ts-ignore;
import { OrderDetailModal } from '@/components/orders/OrderDetailModal';

// @ts-ignore;
import { useDataLoader, usePaginatedDataLoader } from '@/hooks/useDataLoader';
export default function OrdersPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isExporting, setIsExporting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // 订单状态配置
  const orderStatuses = {
    pending: {
      label: '待付款',
      color: 'yellow',
      icon: 'Clock'
    },
    paid: {
      label: '已付款',
      color: 'blue',
      icon: 'CheckCircle'
    },
    processing: {
      label: '处理中',
      color: 'purple',
      icon: 'Package'
    },
    shipped: {
      label: '已发货',
      color: 'green',
      icon: 'Truck'
    },
    delivered: {
      label: '已送达',
      color: 'green',
      icon: 'CheckCircle'
    },
    cancelled: {
      label: '已取消',
      color: 'red',
      icon: 'XCircle'
    },
    refunded: {
      label: '已退款',
      color: 'gray',
      icon: 'AlertCircle'
    }
  };

  // 使用分页数据加载器
  const ordersLoader = usePaginatedDataLoader({
    type: 'orders',
    key: 'orders_list',
    loader: async (pageNum = 1, pageSize = 10) => {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockOrders = generateMockOrders();
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedOrders = mockOrders.slice(startIndex, endIndex);
      return {
        data: paginatedOrders,
        totalCount: mockOrders.length,
        hasMore: endIndex < mockOrders.length
      };
    },
    pageSize: 10,
    options: {
      ttl: 5 * 60 * 1000,
      // 5分钟缓存
      staleWhileRevalidate: true
    },
    successMessage: '订单列表加载成功',
    errorMessage: '无法获取订单列表'
  });

  // 过滤和排序订单
  useEffect(() => {
    filterAndSortOrders();
  }, [ordersLoader.data, searchTerm, statusFilter, dateFilter, sortBy]);
  const generateMockOrders = () => {
    const customers = [{
      name: '张三',
      phone: '138****1234',
      email: 'zhang***@example.com'
    }, {
      name: '李四',
      phone: '139****5678',
      email: 'li***@example.com'
    }, {
      name: '王五',
      phone: '137****9012',
      email: 'wang***@example.com'
    }, {
      name: '赵六',
      phone: '136****3456',
      email: 'zhao***@example.com'
    }];
    const addresses = ['北京市朝阳区建国路88号', '上海市浦东新区陆家嘴环路1000号', '广州市天河区珠江新城花城大道', '深圳市南山区科技园南区'];
    const statusKeys = Object.keys(orderStatuses);
    return Array.from({
      length: 25
    }, (_, index) => {
      const status = statusKeys[Math.floor(Math.random() * statusKeys.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      return {
        id: `ORD${String(index + 1).padStart(8, '0')}`,
        orderNumber: `ORD${Date.now()}${index}`,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        customerAddress: addresses[Math.floor(Math.random() * addresses.length)],
        status: status,
        totalAmount: Math.floor(Math.random() * 2000) + 100,
        discountAmount: Math.floor(Math.random() * 200),
        finalAmount: 0,
        // 将在下面计算
        items: generateOrderItems(),
        orderDate: date.toISOString(),
        deliveryDate: new Date(date.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: ['alipay', 'wechat', 'card', 'cash'][Math.floor(Math.random() * 4)],
        paymentStatus: status === 'pending' ? 'unpaid' : 'paid',
        trackingNumber: status === 'shipped' || status === 'delivered' ? `SF${Math.random().toString(36).substr(2, 10).toUpperCase()}` : null,
        notes: Math.random() > 0.7 ? '请尽快发货，谢谢' : null,
        rating: status === 'delivered' ? (Math.random() * 2 + 3).toFixed(1) : null,
        review: status === 'delivered' && Math.random() > 0.5 ? '产品质量很好，物流很快' : null
      };
    }).map(order => ({
      ...order,
      finalAmount: order.totalAmount - order.discountAmount
    }));
  };
  const generateOrderItems = () => {
    const productNames = ['天然植物染发剂', '持久显色染发膏', '温和漂发剂', '深度护理发膜', '专业显色剂', '修复护发素', '色彩锁护发油', '抗褪色洗发水'];
    const itemCount = Math.floor(Math.random() * 3) + 1;
    return Array.from({
      length: itemCount
    }, (_, index) => ({
      id: `item_${index + 1}`,
      name: productNames[Math.floor(Math.random() * productNames.length)],
      price: Math.floor(Math.random() * 500) + 50,
      quantity: Math.floor(Math.random() * 3) + 1,
      image: `https://picsum.photos/seed/product${index}/100/100.jpg`
    }));
  };
  const filterAndSortOrders = () => {
    let filtered = [...(ordersLoader.data || [])];

    // 状态过滤
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(order => order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerPhone.includes(searchTerm) || order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 日期过滤
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          break;
      }
      if (dateFilter !== 'all') {
        filtered = filtered.filter(order => new Date(order.orderDate) >= filterDate);
      }
    }

    // 排序
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        break;
      case 'amount':
        filtered.sort((a, b) => b.finalAmount - a.finalAmount);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
    setFilteredOrders(filtered);
  };
  const handleRefresh = async () => {
    try {
      await ordersLoader.refresh();
      toast({
        title: "刷新成功",
        description: "订单列表已更新"
      });
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleExportOrders = async () => {
    if (isExporting) return;
    try {
      setIsExporting(true);

      // 模拟导出过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 这里应该实现真实的导出逻辑
      const csvContent = generateCSV();
      const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "导出成功",
        description: "订单数据已导出"
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  const generateCSV = () => {
    const headers = ['订单号', '客户姓名', '联系电话', '订单金额', '订单状态', '下单时间'];
    const rows = filteredOrders.map(order => [order.orderNumber, order.customerName, order.customerPhone, order.finalAmount, orderStatuses[order.status].label, new Date(order.orderDate).toLocaleString()]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (isUpdatingStatus[orderId]) return;
    try {
      setIsUpdatingStatus(prev => ({
        ...prev,
        [orderId]: true
      }));

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新本地数据
      const updatedOrders = (ordersLoader.data || []).map(order => order.id === orderId ? {
        ...order,
        status: newStatus
      } : order);
      ordersLoader.setCacheData(updatedOrders);
      toast({
        title: "状态更新成功",
        description: `订单状态已更新为${orderStatuses[newStatus].label}`
      });
    } catch (error) {
      toast({
        title: "更新失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingStatus(prev => ({
        ...prev,
        [orderId]: false
      }));
    }
  };
  const handleViewOrderDetail = order => {
    setSelectedOrder(order);
  };
  const handleContactCustomer = order => {
    // 实现联系客户功能
    toast({
      title: "联系客户",
      description: `正在联系 ${order.customerName}`
    });
  };
  const handleLoadMore = async () => {
    if (!ordersLoader.hasMore || ordersLoader.loading) return;
    try {
      await ordersLoader.loadNext();
    } catch (error) {
      console.error('加载更多失败:', error);
    }
  };
  if (ordersLoader.error) {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="订单管理" showBack={true} />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">加载失败</h2>
              <p className="text-muted-foreground mb-4">{ordersLoader.error.message}</p>
              <Button onClick={() => ordersLoader.refresh()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                重新加载
              </Button>
            </div>
          </div>
          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="订单管理" showBack={true} />
        
        <div className="container mx-auto px-4 py-6 pb-20">
          {/* 搜索和筛选栏 */}
          <div className="bg-card border rounded-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input type="text" placeholder="搜索订单号、客户姓名、电话..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  筛选
                </Button>

                <Button variant="outline" onClick={handleRefresh} disabled={ordersLoader.loading} className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 ${ordersLoader.loading ? 'animate-spin' : ''}`} />
                  刷新
                </Button>

                <Button variant="outline" onClick={handleExportOrders} disabled={isExporting || filteredOrders.length === 0} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {isExporting ? <ButtonLoading text="导出中..." /> : '导出'}
                </Button>
              </div>
            </div>

            {/* 高级筛选 */}
            {showFilters && <div className="mt-4 pt-4 border-t space-y-4">
                {/* 状态筛选 */}
                <div>
                  <label className="block text-sm font-medium mb-2">订单状态</label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant={statusFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter('all')}>
                      全部
                    </Button>
                    {Object.entries(orderStatuses).map(([key, status]) => <Button key={key} variant={statusFilter === key ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(key)}>
                        {status.label}
                      </Button>)}
                  </div>
                </div>

                {/* 日期筛选 */}
                <div>
                  <label className="block text-sm font-medium mb-2">时间范围</label>
                  <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="all">全部时间</option>
                    <option value="today">今天</option>
                    <option value="week">最近一周</option>
                    <option value="month">最近一个月</option>
                    <option value="quarter">最近三个月</option>
                  </select>
                </div>

                {/* 排序 */}
                <div>
                  <label className="block text-sm font-medium mb-2">排序方式</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="date">下单时间</option>
                    <option value="amount">订单金额</option>
                    <option value="status">订单状态</option>
                  </select>
                </div>
              </div>}
          </div>

          {/* 订单统计 */}
          <OrderStats orders={ordersLoader.data} />

          {/* 缓存状态指示器 */}
          {ordersLoader.isFromCache && <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              📦 数据来自缓存，最后更新: {new Date(ordersLoader.lastUpdated).toLocaleString()}
            </div>}

          {/* 订单列表 */}
          {ordersLoader.loading && !ordersLoader.data ? <OrderListLoading count={5} /> : filteredOrders.length === 0 ? <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">未找到订单</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? '尝试调整搜索关键词' : '暂无订单数据'}
              </p>
              <Button onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setDateFilter('all');
          }}>
                清除筛选
              </Button>
            </div> : <div className="space-y-4">
              {filteredOrders.map(order => <OrderCard key={order.id} order={order} onViewDetail={handleViewOrderDetail} onContactCustomer={handleContactCustomer} onUpdateStatus={handleUpdateOrderStatus} isUpdatingStatus={isUpdatingStatus} />)}

              {/* 加载更多 */}
              {ordersLoader.hasMore && <div className="text-center">
                  <Button variant="outline" onClick={handleLoadMore} disabled={ordersLoader.loading}>
                    {ordersLoader.isLoadingMore ? <ButtonLoading text="加载中..." /> : '加载更多'}
                  </Button>
                </div>}
            </div>}
        </div>

        <TabBar />

        {/* 订单详情弹窗 */}
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} orderStatuses={orderStatuses} />
      </div>
    </ErrorBoundary>;
}