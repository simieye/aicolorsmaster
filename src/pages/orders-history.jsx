// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingBag, Package, Clock, CheckCircle, XCircle, Star, Filter, Search, Calendar, Download, Eye, MessageSquare } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

// @ts-ignore;

export default function OrdersHistoryPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const statusOptions = [{
    value: 'all',
    label: '全部',
    color: 'text-muted-foreground'
  }, {
    value: 'pending',
    label: '待付款',
    color: 'text-orange-500'
  }, {
    value: 'paid',
    label: '已付款',
    color: 'text-blue-500'
  }, {
    value: 'shipped',
    label: '已发货',
    color: 'text-purple-500'
  }, {
    value: 'delivered',
    label: '已送达',
    color: 'text-green-500'
  }, {
    value: 'completed',
    label: '已完成',
    color: 'text-green-600'
  }, {
    value: 'cancelled',
    label: '已取消',
    color: 'text-red-500'
  }];
  const sortOptions = [{
    value: 'date',
    label: '按时间排序'
  }, {
    value: 'amount',
    label: '按金额排序'
  }, {
    value: 'status',
    label: '按状态排序'
  }];
  useEffect(() => {
    loadOrders();
  }, []);
  useEffect(() => {
    filterAndSortOrders();
  }, [orders, searchTerm, statusFilter, dateFilter, sortBy]);
  const loadOrders = async () => {
    setIsLoading(true);
    try {
      // 模拟加载订单数据
      const mockOrders = [{
        id: 'ORD001',
        orderNumber: '202401010001',
        status: 'completed',
        totalAmount: 299.00,
        items: [{
          name: 'AI智能染发剂',
          quantity: 2,
          price: 149.50,
          image: 'https://picsum.photos/seed/product1/100/100.jpg'
        }],
        createdAt: '2024-01-01T10:30:00Z',
        deliveredAt: '2024-01-03T14:20:00Z'
      }, {
        id: 'ORD002',
        orderNumber: '202401020001',
        status: 'shipped',
        totalAmount: 199.00,
        items: [{
          name: '色彩调配工具',
          quantity: 1,
          price: 199.00,
          image: 'https://picsum.photos/seed/product2/100/100.jpg'
        }],
        createdAt: '2024-01-02T15:45:00Z',
        shippedAt: '2024-01-04T09:15:00Z'
      }, {
        id: 'ORD003',
        orderNumber: '202401030001',
        status: 'pending',
        totalAmount: 399.00,
        items: [{
          name: 'AI染发套装',
          quantity: 1,
          price: 399.00,
          image: 'https://picsum.photos/seed/product3/100/100.jpg'
        }],
        createdAt: '2024-01-03T20:10:00Z'
      }];
      setOrders(mockOrders);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载订单列表",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const filterAndSortOrders = () => {
    let filtered = [...orders];

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(order => order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    // 状态过滤
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // 日期过滤
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (dateFilter) {
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
        filtered = filtered.filter(order => new Date(order.createdAt) >= filterDate);
      }
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.totalAmount - a.totalAmount;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <Package className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };
  const getStatusText = status => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleViewOrder = orderId => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'order-detail',
        params: {
          orderId
        }
      });
    }
  };
  const handleTrackOrder = orderId => {
    toast({
      title: "物流跟踪",
      description: "正在查询物流信息..."
    });
  };
  const handleCancelOrder = async orderId => {
    try {
      // 这里可以调用API取消订单
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(prev => prev.map(order => order.id === orderId ? {
        ...order,
        status: 'cancelled'
      } : order));
      toast({
        title: "取消成功",
        description: "订单已取消"
      });
    } catch (error) {
      toast({
        title: "取消失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleReviewOrder = orderId => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'review',
        params: {
          orderId
        }
      });
    }
  };
  // 分页计算
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="订单历史" showBack={true} />
        
        <div className="pb-20">
          {/* 搜索和筛选 */}
          <div className="bg-card border-b p-4 space-y-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索订单号、商品名称..." className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            
            {/* 筛选选项 */}
            <div className="flex flex-wrap gap-2">
              {/* 状态筛选 */}
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {statusOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
              
              {/* 日期筛选 */}
              <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="all">全部时间</option>
                <option value="week">最近一周</option>
                <option value="month">最近一月</option>
                <option value="quarter">最近三月</option>
              </select>
              
              {/* 排序选项 */}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {sortOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
            </div>
          </div>

          {/* 订单列表 */}
          <div className="p-4">
            {isLoading ? <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div> : paginatedOrders.length === 0 ? <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">暂无订单</p>
              </div> : <div className="space-y-4">
                {paginatedOrders.map(order => <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className="font-medium">{getStatusText(order.status)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 订单号 */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">订单号：{order.orderNumber}</span>
                        <span className="font-semibold">¥{order.totalAmount.toFixed(2)}</span>
                      </div>
                      
                      {/* 商品列表 */}
                      <div className="space-y-2">
                        {order.items.map((item, index) => <div key={index} className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">数量：{item.quantity} | 单价：¥{item.price.toFixed(2)}</p>
                            </div>
                          </div>)}
                      </div>
                      
                      {/* 操作按钮 */}
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.id)}>
                          <Eye className="w-4 h-4 mr-1" />
                          查看
                        </Button>
                        
                        {order.status === 'shipped' && <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.id)}>
                            <Package className="w-4 h-4 mr-1" />
                            物流
                          </Button>}
                        
                        {order.status === 'pending' && <Button variant="outline" size="sm" onClick={() => handleCancelOrder(order.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            取消
                          </Button>}
                        
                        {order.status === 'completed' && <Button variant="outline" size="sm" onClick={() => handleReviewOrder(order.id)}>
                            <Star className="w-4 h-4 mr-1" />
                            评价
                          </Button>}
                        
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          客服
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>

          {/* 分页 */}
          {totalPages > 1 && <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  显示 {startIndex + 1}-{Math.min(startIndex + ordersPerPage, filteredOrders.length)} 条，共 {filteredOrders.length} 条
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                    上一页
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
                    下一页
                  </Button>
                </div>
              </div>
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}