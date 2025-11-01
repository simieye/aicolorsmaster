// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Bell, BellOff, Check, CheckCheck, Trash2, Filter, Search, Settings, MessageSquare, Package, Star, TrendingUp, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

// @ts-ignore;

export default function NotificationsPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBatchActions, setShowBatchActions] = useState(false);
  const notificationTypes = [{
    value: 'all',
    label: '全部类型',
    icon: <Bell className="w-4 h-4" />
  }, {
    value: 'system',
    label: '系统通知',
    icon: <Info className="w-4 h-4" />
  }, {
    value: 'order',
    label: '订单状态',
    icon: <Package className="w-4 h-4" />
  }, {
    value: 'promotion',
    label: '促销活动',
    icon: <TrendingUp className="w-4 h-4" />
  }, {
    value: 'review',
    label: '评价提醒',
    icon: <Star className="w-4 h-4" />
  }, {
    value: 'message',
    label: '消息通知',
    icon: <MessageSquare className="w-4 h-4" />
  }];
  const statusOptions = [{
    value: 'all',
    label: '全部状态'
  }, {
    value: 'unread',
    label: '未读'
  }, {
    value: 'read',
    label: '已读'
  }];
  useEffect(() => {
    loadNotifications();
  }, []);
  useEffect(() => {
    filterNotifications();
  }, [notifications, searchTerm, typeFilter, statusFilter]);
  useEffect(() => {
    setShowBatchActions(selectedItems.length > 0);
  }, [selectedItems]);
  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      // 模拟加载通知数据
      const mockNotifications = [{
        id: 'NOTIF001',
        type: 'order',
        title: '订单已发货',
        content: '您的订单 #202401020001 已发货，预计3-5天送达',
        status: 'unread',
        createdAt: '2024-01-05T10:30:00Z',
        data: {
          orderId: 'ORD002',
          orderNumber: '202401020001'
        }
      }, {
        id: 'NOTIF002',
        type: 'promotion',
        title: '限时优惠',
        content: 'AI染发套装限时8折，仅限今日！',
        status: 'unread',
        createdAt: '2024-01-05T09:15:00Z',
        data: {
          promotionId: 'PROMO001'
        }
      }, {
        id: 'NOTIF003',
        type: 'system',
        title: '系统维护通知',
        content: '系统将于今晚22:00-24:00进行维护，期间可能影响部分功能使用',
        status: 'read',
        createdAt: '2024-01-04T16:20:00Z'
      }, {
        id: 'NOTIF004',
        type: 'review',
        title: '评价提醒',
        content: '您购买的"AI智能染发剂"待评价，分享您的使用体验吧！',
        status: 'unread',
        createdAt: '2024-01-04T14:45:00Z',
        data: {
          orderId: 'ORD001',
          productId: 'PROD001'
        }
      }, {
        id: 'NOTIF005',
        type: 'message',
        title: '客服回复',
        content: '您的问题已得到回复，请查看详情',
        status: 'read',
        createdAt: '2024-01-03T11:30:00Z',
        data: {
          messageId: 'MSG001'
        }
      }];
      setNotifications(mockNotifications);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载通知列表",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const filterNotifications = () => {
    let filtered = [...notifications];

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(notif => notif.title.toLowerCase().includes(searchTerm.toLowerCase()) || notif.content.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 类型过滤
    if (typeFilter !== 'all') {
      filtered = filtered.filter(notif => notif.type === typeFilter);
    }

    // 状态过滤
    if (statusFilter !== 'all') {
      filtered = filtered.filter(notif => notif.status === statusFilter);
    }
    setFilteredNotifications(filtered);
  };
  const getNotificationIcon = type => {
    const typeConfig = notificationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : <Bell className="w-4 h-4" />;
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'unread':
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
      case 'read':
        return <div className="w-2 h-2 bg-gray-300 rounded-full"></div>;
      default:
        return null;
    }
  };
  const handleMarkAsRead = async notificationId => {
    try {
      setNotifications(prev => prev.map(notif => notif.id === notificationId ? {
        ...notif,
        status: 'read'
      } : notif));
      toast({
        title: "已标记为已读",
        description: "通知已标记为已读"
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleMarkAllAsRead = async () => {
    try {
      setNotifications(prev => prev.map(notif => ({
        ...notif,
        status: 'read'
      })));
      toast({
        title: "全部已读",
        description: "所有通知已标记为已读"
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleDeleteNotification = async notificationId => {
    try {
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      toast({
        title: "删除成功",
        description: "通知已删除"
      });
    } catch (error) {
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleSelectItem = notificationId => {
    setSelectedItems(prev => prev.includes(notificationId) ? prev.filter(id => id !== notificationId) : [...prev, notificationId]);
  };
  const handleSelectAll = () => {
    if (selectedItems.length === filteredNotifications.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredNotifications.map(notif => notif.id));
    }
  };
  const handleBatchDelete = async () => {
    try {
      setNotifications(prev => prev.filter(notif => !selectedItems.includes(notif.id)));
      setSelectedItems([]);
      toast({
        title: "删除成功",
        description: `已删除 ${selectedItems.length} 条通知`
      });
    } catch (error) {
      toast({
        title: "删除失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleBatchMarkAsRead = async () => {
    try {
      setNotifications(prev => prev.map(notif => selectedItems.includes(notif.id) ? {
        ...notif,
        status: 'read'
      } : notif));
      setSelectedItems([]);
      toast({
        title: "标记成功",
        description: `已标记 ${selectedItems.length} 条通知为已读`
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const handleNotificationClick = notification => {
    // 标记为已读
    if (notification.status === 'unread') {
      handleMarkAsRead(notification.id);
    }

    // 根据通知类型跳转到相应页面
    switch (notification.type) {
      case 'order':
        if (notification.data?.orderId) {
          $w?.utils?.navigateTo({
            pageId: 'order-detail',
            params: {
              orderId: notification.data.orderId
            }
          });
        }
        break;
      case 'promotion':
        $w?.utils?.navigateTo({
          pageId: 'products'
        });
        break;
      case 'review':
        if (notification.data?.orderId) {
          $w?.utils?.navigateTo({
            pageId: 'review',
            params: {
              orderId: notification.data.orderId
            }
          });
        }
        break;
      case 'message':
        $w?.utils?.navigateTo({
          pageId: 'ai-chat'
        });
        break;
      default:
        break;
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit'
      });
    }
  };
  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="消息通知" showBack={true} />
        
        <div className="pb-20">
          {/* 通知统计 */}
          {unreadCount > 0 && <div className="bg-blue-50 border-b border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">您有 {unreadCount} 条未读通知</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  <CheckCheck className="w-4 h-4 mr-1" />
                  全部已读
                </Button>
              </div>
            </div>}

          {/* 搜索和筛选 */}
          <div className="bg-card border-b p-4 space-y-4">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索通知内容..." className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>
            
            {/* 筛选选项 */}
            <div className="flex flex-wrap gap-2">
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {notificationTypes.map(type => <option key={type.value} value={type.value}>
                    {type.label}
                  </option>)}
              </select>
              
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                {statusOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
            </div>
            
            {/* 批量操作 */}
            {showBatchActions && <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedItems.length === filteredNotifications.length} onChange={handleSelectAll} className="w-4 h-4" />
                  <span className="text-sm">已选择 {selectedItems.length} 项</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleBatchMarkAsRead}>
                    <Check className="w-4 h-4 mr-1" />
                    标记已读
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBatchDelete}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    删除
                  </Button>
                </div>
              </div>}
          </div>

          {/* 通知列表 */}
          <div className="p-4">
            {isLoading ? <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div> : filteredNotifications.length === 0 ? <div className="text-center py-8">
                <BellOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">暂无通知</p>
              </div> : <div className="space-y-2">
                {filteredNotifications.map(notification => <Card key={notification.id} className={`cursor-pointer transition-colors ${notification.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted'}`} onClick={() => handleNotificationClick(notification)}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(notification.status)}
                        </div>
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium truncate ${notification.status === 'unread' ? 'text-blue-900' : 'text-foreground'}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                              {formatDate(notification.createdAt)}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${notification.status === 'unread' ? 'text-blue-700' : 'text-muted-foreground'}`}>
                            {notification.content}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <input type="checkbox" checked={selectedItems.includes(notification.id)} onChange={() => handleSelectItem(notification.id)} onClick={e => e.stopPropagation()} className="w-4 h-4" />
                          <Button variant="ghost" size="sm" onClick={e => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}