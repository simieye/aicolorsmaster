// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Store, Package, ShoppingCart, Users, BarChart3, Settings, Bell, Search, Plus, Edit, Trash2, Eye, Calendar, Clock, MapPin, Phone, Mail, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, XCircle, Filter, Download, Upload, X } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function StoreManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [activeTab, setActiveTab] = useState('dashboard');
  const [storeData, setStoreData] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // 初始化数据
  useEffect(() => {
    // 模拟门店数据
    setStoreData({
      name: 'AI染发色彩大师 - 朝阳店',
      address: '北京市朝阳区三里屯路19号',
      phone: '010-12345678',
      email: 'chaoyang@aihair.com',
      manager: '张经理',
      status: '营业中',
      todayRevenue: 15680.50,
      todayOrders: 28,
      todayCustomers: 25,
      monthlyRevenue: 456780.90,
      monthlyOrders: 680,
      monthlyCustomers: 620,
      rating: 4.8,
      openTime: '09:00',
      closeTime: '21:00',
      services: ['染发', '护理', '造型', '咨询']
    });

    // 模拟库存数据
    setInventoryData([{
      id: 1,
      name: '微潮紫染发剂',
      category: '染发剂',
      stock: 45,
      minStock: 20,
      maxStock: 100,
      unit: '瓶',
      price: 128.00,
      supplier: '美妆供应商A',
      lastUpdate: '2024-01-15',
      status: 'normal'
    }, {
      id: 2,
      name: '樱花粉染发剂',
      category: '染发剂',
      stock: 15,
      minStock: 20,
      maxStock: 100,
      unit: '瓶',
      price: 118.00,
      supplier: '美妆供应商A',
      lastUpdate: '2024-01-15',
      status: 'low'
    }, {
      id: 3,
      name: '深层护理套装',
      category: '护理产品',
      stock: 32,
      minStock: 15,
      maxStock: 80,
      unit: '套',
      price: 268.00,
      supplier: '美妆供应商B',
      lastUpdate: '2024-01-14',
      status: 'normal'
    }, {
      id: 4,
      name: '定型喷雾',
      category: '造型产品',
      stock: 8,
      minStock: 10,
      maxStock: 50,
      unit: '瓶',
      price: 58.00,
      supplier: '美妆供应商C',
      lastUpdate: '2024-01-15',
      status: 'low'
    }]);

    // 模拟订单数据
    setOrderData([{
      id: 'ORD-2024-001',
      customerName: '李小姐',
      customerPhone: '138****5678',
      service: '微潮紫染发',
      employee: '王技师',
      amount: 298.00,
      status: 'completed',
      orderTime: '2024-01-15 14:30',
      completeTime: '2024-01-15 16:45',
      rating: 5
    }, {
      id: 'ORD-2024-002',
      customerName: '张女士',
      customerPhone: '139****1234',
      service: '樱花粉染发+护理',
      employee: '李技师',
      amount: 398.00,
      status: 'processing',
      orderTime: '2024-01-15 15:20',
      completeTime: null,
      rating: null
    }, {
      id: 'ORD-2024-003',
      customerName: '王先生',
      customerPhone: '137****9876',
      service: '造型设计',
      employee: '赵技师',
      amount: 168.00,
      status: 'pending',
      orderTime: '2024-01-15 16:00',
      completeTime: null,
      rating: null
    }]);

    // 模拟员工数据
    setEmployeeData([{
      id: 1,
      name: '王技师',
      position: '高级技师',
      phone: '138****1111',
      email: 'wang@aihair.com',
      joinDate: '2022-03-15',
      status: 'active',
      todayOrders: 8,
      monthlyOrders: 156,
      rating: 4.9,
      salary: 8500.00,
      schedule: '09:00-18:00'
    }, {
      id: 2,
      name: '李技师',
      position: '中级技师',
      phone: '139****2222',
      email: 'li@aihair.com',
      joinDate: '2023-01-20',
      status: 'active',
      todayOrders: 6,
      monthlyOrders: 128,
      rating: 4.7,
      salary: 6500.00,
      schedule: '10:00-19:00'
    }, {
      id: 3,
      name: '赵技师',
      position: '初级技师',
      phone: '137****3333',
      email: 'zhao@aihair.com',
      joinDate: '2023-06-10',
      status: 'active',
      todayOrders: 4,
      monthlyOrders: 89,
      rating: 4.5,
      salary: 4500.00,
      schedule: '09:00-18:00'
    }]);
  }, []);

  // 处理库存补货
  const handleRestock = (itemId, quantity) => {
    setInventoryData(prev => prev.map(item => item.id === itemId ? {
      ...item,
      stock: item.stock + quantity,
      lastUpdate: new Date().toISOString().split('T')[0]
    } : item));
    toast({
      title: "补货成功",
      description: `已成功补货 ${quantity} 件`
    });
  };

  // 处理订单状态更新
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setOrderData(prev => prev.map(order => order.id === orderId ? {
      ...order,
      status: newStatus,
      completeTime: newStatus === 'completed' ? new Date().toLocaleString() : null
    } : order));
    toast({
      title: "状态更新成功",
      description: `订单状态已更新为 ${newStatus === 'completed' ? '已完成' : newStatus === 'processing' ? '处理中' : '待处理'}`
    });
  };

  // 处理员工排班
  const handleScheduleUpdate = (employeeId, newSchedule) => {
    setEmployeeData(prev => prev.map(employee => employee.id === employeeId ? {
      ...employee,
      schedule: newSchedule
    } : employee));
    toast({
      title: "排班更新成功",
      description: "员工排班时间已更新"
    });
  };

  // 渲染仪表板
  const renderDashboard = () => {
    if (!storeData) return null;
    return <div className="space-y-6">
        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">今日营收</p>
                  <p className="text-2xl font-bold text-gray-800">¥{storeData.todayRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12.5% 较昨日</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">今日订单</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.todayOrders}</p>
                  <p className="text-xs text-blue-600">+8.2% 较昨日</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">今日客户</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.todayCustomers}</p>
                  <p className="text-xs text-purple-600">+15.3% 较昨日</p>
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
                  <p className="text-sm text-gray-600">门店评分</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.rating}</p>
                  <p className="text-xs text-orange-600">⭐ 4.8分</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Store className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 门店状态 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="w-5 h-5 mr-2" />
              门店状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">基本信息</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">营业信息</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">营业状态</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${storeData.status === '营业中' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {storeData.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">营业时间</span>
                    <span className="text-sm">{storeData.openTime} - {storeData.closeTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">店长</span>
                    <span className="text-sm">{storeData.manager}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">服务项目</span>
                    <span className="text-sm">{storeData.services.join('、')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">新建订单</h3>
              <p className="text-sm text-gray-600">创建新的服务订单</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">库存管理</h3>
              <p className="text-sm text-gray-600">查看和更新库存状态</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">员工管理</h3>
              <p className="text-sm text-gray-600">管理员工信息和排班</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">数据报表</h3>
              <p className="text-sm text-gray-600">查看经营数据分析</p>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染库存管理
  const renderInventory = () => {
    const lowStockItems = inventoryData.filter(item => item.status === 'low');
    return <div className="space-y-6">
        {/* 库存概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总商品数</p>
                <p className="text-2xl font-bold text-gray-800">{inventoryData.length}</p>
                <p className="text-xs text-gray-500">种商品</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">库存预警</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
                <p className="text-xs text-gray-500">需要补货</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">库存总值</p>
                <p className="text-2xl font-bold text-green-600">¥{inventoryData.reduce((sum, item) => sum + item.stock * item.price, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">总价值</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">今日更新</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-xs text-gray-500">商品更新</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 库存预警 */}
        {lowStockItems.length > 0 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                库存预警
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map(item => <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-red-500" />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">当前库存: {item.stock} {item.unit} (最低: {item.minStock} {item.unit})</p>
                      </div>
                    </div>
                    <Button onClick={() => handleRestock(item.id, item.maxStock - item.stock)} size="sm" className="bg-red-600 hover:bg-red-700">
                      立即补货
                    </Button>
                  </div>)}
              </div>
            </CardContent>
          </Card>}

        {/* 库存列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                库存列表
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加商品
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">商品名称</th>
                    <th className="text-left py-3 px-4">分类</th>
                    <th className="text-left py-3 px-4">库存</th>
                    <th className="text-left py-3 px-4">单价</th>
                    <th className="text-left py-3 px-4">供应商</th>
                    <th className="text-left py-3 px-4">最后更新</th>
                    <th className="text-center py-3 px-4">状态</th>
                    <th className="text-center py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map(item => <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.unit}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${item.stock <= item.minStock ? 'text-red-600' : 'text-gray-800'}`}>
                            {item.stock}
                          </span>
                          {item.stock <= item.minStock && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </div>
                      </td>
                      <td className="py-3 px-4">¥{item.price}</td>
                      <td className="py-3 px-4">{item.supplier}</td>
                      <td className="py-3 px-4">{item.lastUpdate}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'low' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status === 'low' ? '库存不足' : '正常'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRestock(item.id, 10)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染订单管理
  const renderOrders = () => {
    const orderStats = {
      total: orderData.length,
      pending: orderData.filter(order => order.status === 'pending').length,
      processing: orderData.filter(order => order.status === 'processing').length,
      completed: orderData.filter(order => order.status === 'completed').length
    };
    return <div className="space-y-6">
        {/* 订单统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总订单</p>
                <p className="text-2xl font-bold text-gray-800">{orderStats.total}</p>
                <p className="text-xs text-gray-500">今日订单</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">待处理</p>
                <p className="text-2xl font-bold text-orange-600">{orderStats.pending}</p>
                <p className="text-xs text-gray-500">等待处理</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">处理中</p>
                <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
                <p className="text-xs text-gray-500">正在服务</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">已完成</p>
                <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
                <p className="text-xs text-gray-500">服务完成</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 订单列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                订单列表
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  新建订单
                </Button>
              </div>
            </div>
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
                    <th className="text-left py-3 px-4">金额</th>
                    <th className="text-left py-3 px-4">下单时间</th>
                    <th className="text-center py-3 px-4">状态</th>
                    <th className="text-center py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium">{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <h4 className="font-medium">{order.customerName}</h4>
                          <p className="text-xs text-gray-600">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.service}</td>
                      <td className="py-3 px-4">{order.employee}</td>
                      <td className="py-3 px-4">¥{order.amount}</td>
                      <td className="py-3 px-4">{order.orderTime}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                          {order.status === 'completed' ? '已完成' : order.status === 'processing' ? '处理中' : '待处理'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          {order.status !== 'completed' && <Button size="sm" onClick={() => handleOrderStatusUpdate(order.id, order.status === 'pending' ? 'processing' : 'completed')}>
                            {order.status === 'pending' ? '开始' : '完成'}
                          </Button>}
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染员工管理
  const renderEmployees = () => {
    const employeeStats = {
      total: employeeData.length,
      active: employeeData.filter(emp => emp.status === 'active').length,
      todayOrders: employeeData.reduce((sum, emp) => sum + emp.todayOrders, 0),
      avgRating: (employeeData.reduce((sum, emp) => sum + emp.rating, 0) / employeeData.length).toFixed(1)
    };
    return <div className="space-y-6">
        {/* 员工统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">员工总数</p>
                <p className="text-2xl font-bold text-gray-800">{employeeStats.total}</p>
                <p className="text-xs text-gray-500">在职员工</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">今日服务</p>
                <p className="text-2xl font-bold text-blue-600">{employeeStats.todayOrders}</p>
                <p className="text-xs text-gray-500">总服务次数</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">平均评分</p>
                <p className="text-2xl font-bold text-purple-600">{employeeStats.avgRating}</p>
                <p className="text-xs text-gray-500">客户满意度</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">出勤率</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-xs text-gray-500">今日出勤</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 员工列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                员工列表
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加员工
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">员工信息</th>
                    <th className="text-left py-3 px-4">职位</th>
                    <th className="text-left py-3 px-4">联系方式</th>
                    <th className="text-left py-3 px-4">入职时间</th>
                    <th className="text-left py-3 px-4">今日订单</th>
                    <th className="text-left py-3 px-4">本月订单</th>
                    <th className="text-left py-3 px-4">评分</th>
                    <th className="text-left py-3 px-4">排班</th>
                    <th className="text-center py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.map(employee => <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-medium">{employee.name[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{employee.name}</h4>
                            <p className="text-xs text-gray-600">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {employee.position}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm">{employee.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{employee.joinDate}</td>
                      <td className="py-3 px-4">{employee.todayOrders}</td>
                      <td className="py-3 px-4">{employee.monthlyOrders}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{employee.rating}</span>
                          <span className="text-yellow-500">⭐</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{employee.schedule}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">门店管理系统</h1>
            <p className="text-gray-600">智能化的门店运营管理平台</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* 通知按钮 */}
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="搜索..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'dashboard',
            name: '数据概览',
            icon: BarChart3
          }, {
            id: 'inventory',
            name: '库存管理',
            icon: Package
          }, {
            id: 'orders',
            name: '订单管理',
            icon: ShoppingCart
          }, {
            id: 'employees',
            name: '员工管理',
            icon: Users
          }].map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>;
          })}
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'employees' && renderEmployees()}
      </div>

      {/* 通知面板 */}
      {showNotifications && <div className="fixed top-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">通知中心</h3>
              <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">库存预警</h4>
                <p className="text-xs text-gray-600">樱花粉染发剂库存不足，请及时补货</p>
                <p className="text-xs text-gray-500 mt-1">5分钟前</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">新订单</h4>
                <p className="text-xs text-gray-600">张女士预约了樱花粉染发服务</p>
                <p className="text-xs text-gray-500 mt-1">10分钟前</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">订单完成</h4>
                <p className="text-xs text-gray-600">李小姐的染发服务已完成，评分5星</p>
                <p className="text-xs text-gray-500 mt-1">30分钟前</p>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="store-management" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}