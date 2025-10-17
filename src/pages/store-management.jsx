// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Store, Package, ShoppingCart, Users, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign, Star, Settings, Plus, Edit, Trash2, Eye, Filter, Search, Download, Upload, X } from 'lucide-react';

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
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // 初始化数据
  useEffect(() => {
    // 模拟门店数据
    setStoreData({
      name: 'AI染发色彩大师 - 旗舰店',
      address: '北京市朝阳区三里屯太古里南区S2-18',
      phone: '010-12345678',
      email: 'flagship@aihair.com',
      businessHours: '09:00-21:00',
      rating: 4.8,
      totalReviews: 1256,
      status: '营业中',
      todayRevenue: 15680.50,
      todayOrders: 23,
      monthRevenue: 456780.90,
      monthOrders: 678
    });

    // 模拟订单数据
    setOrders([{
      id: 'ORD-2024-001',
      customerName: '张小姐',
      customerPhone: '138****5678',
      service: '微潮紫染发套餐',
      price: 680.00,
      status: '待服务',
      appointmentTime: '2024-01-15 14:30',
      employee: '李美容师',
      duration: '120分钟',
      notes: '客户要求颜色稍微深一点'
    }, {
      id: 'ORD-2024-002',
      customerName: '李女士',
      customerPhone: '139****1234',
      service: '樱花粉染发套餐',
      price: 580.00,
      status: '服务中',
      appointmentTime: '2024-01-15 15:00',
      employee: '王美容师',
      duration: '90分钟',
      notes: '首次染发，需要做皮肤测试'
    }, {
      id: 'ORD-2024-003',
      customerName: '王先生',
      customerPhone: '137****9876',
      service: '奶茶棕染发套餐',
      price: 480.00,
      status: '已完成',
      appointmentTime: '2024-01-15 10:00',
      employee: '张美容师',
      duration: '60分钟',
      notes: '客户很满意，要求办理会员卡'
    }]);

    // 模拟库存数据
    setInventory([{
      id: 1,
      name: '微潮紫染发剂',
      category: '染发剂',
      brand: 'AI色彩',
      stock: 45,
      unit: '支',
      minStock: 20,
      maxStock: 100,
      price: 120.00,
      supplier: 'AI色彩供应商',
      lastUpdate: '2024-01-15',
      status: '正常'
    }, {
      id: 2,
      name: '樱花粉染发剂',
      category: '染发剂',
      brand: 'AI色彩',
      stock: 15,
      unit: '支',
      minStock: 20,
      maxStock: 100,
      price: 100.00,
      supplier: 'AI色彩供应商',
      lastUpdate: '2024-01-15',
      status: '库存不足'
    }, {
      id: 3,
      name: '奶茶棕染发剂',
      category: '染发剂',
      brand: 'AI色彩',
      stock: 78,
      unit: '支',
      minStock: 20,
      maxStock: 100,
      price: 80.00,
      supplier: 'AI色彩供应商',
      lastUpdate: '2024-01-15',
      status: '正常'
    }]);

    // 模拟员工数据
    setEmployees([{
      id: 1,
      name: '李美容师',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      position: '高级美容师',
      phone: '138****1111',
      email: 'li@aihair.com',
      joinDate: '2022-03-15',
      status: '在职',
      todayOrders: 8,
      monthOrders: 156,
      rating: 4.9,
      salary: 8500.00,
      schedule: '09:00-18:00'
    }, {
      id: 2,
      name: '王美容师',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      position: '中级美容师',
      phone: '139****2222',
      email: 'wang@aihair.com',
      joinDate: '2023-01-20',
      status: '在职',
      todayOrders: 6,
      monthOrders: 134,
      rating: 4.7,
      salary: 6500.00,
      schedule: '10:00-19:00'
    }, {
      id: 3,
      name: '张美容师',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      position: '初级美容师',
      phone: '137****3333',
      email: 'zhang@aihair.com',
      joinDate: '2023-06-10',
      status: '在职',
      todayOrders: 5,
      monthOrders: 98,
      rating: 4.6,
      salary: 4500.00,
      schedule: '11:00-20:00'
    }]);
  }, []);

  // 处理订单状态更新
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => order.id === orderId ? {
      ...order,
      status: newStatus
    } : order));
    toast({
      title: "订单状态已更新",
      description: `订单 ${orderId} 状态已更新为 ${newStatus}`
    });
  };

  // 处理库存操作
  const handleInventoryUpdate = (itemId, operation, quantity) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = operation === 'in' ? item.stock + quantity : item.stock - quantity;
        return {
          ...item,
          stock: newStock,
          status: newStock <= item.minStock ? '库存不足' : newStock >= item.maxStock ? '库存过多' : '正常'
        };
      }
      return item;
    }));
    toast({
      title: "库存已更新",
      description: `${operation === 'in' ? '入库' : '出库'} ${quantity} ${inventory.find(item => item.id === itemId)?.unit}`
    });
  };

  // 处理员工状态更新
  const handleEmployeeStatusUpdate = (employeeId, newStatus) => {
    setEmployees(prev => prev.map(employee => employee.id === employeeId ? {
      ...employee,
      status: newStatus
    } : employee));
    toast({
      title: "员工状态已更新",
      description: `员工状态已更新为 ${newStatus}`
    });
  };

  // 获取订单状态颜色
  const getOrderStatusColor = status => {
    const colors = {
      '待服务': 'bg-yellow-100 text-yellow-800',
      '服务中': 'bg-blue-100 text-blue-800',
      '已完成': 'bg-green-100 text-green-800',
      '已取消': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // 获取库存状态颜色
  const getInventoryStatusColor = status => {
    const colors = {
      '正常': 'bg-green-100 text-green-800',
      '库存不足': 'bg-red-100 text-red-800',
      '库存过多': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // 渲染仪表板
  const renderDashboard = () => {
    if (!storeData) return null;
    return <div className="space-y-6">
        {/* 门店信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="w-5 h-5 mr-2" />
              门店信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{storeData.name}</h3>
                <p className="text-gray-600 mb-1">{storeData.address}</p>
                <p className="text-gray-600 mb-1">电话：{storeData.phone}</p>
                <p className="text-gray-600 mb-1">邮箱：{storeData.email}</p>
                <p className="text-gray-600 mb-1">营业时间：{storeData.businessHours}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{storeData.rating}</span>
                  <span className="text-gray-500 ml-1">({storeData.totalReviews}条评价)</span>
                </div>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${storeData.status === '营业中' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${storeData.status === '营业中' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {storeData.status}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">今日营业额：</span>
                    <span className="font-semibold text-lg">¥{storeData.todayRevenue.toLocaleString()}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">今日订单：</span>
                    <span className="font-semibold text-lg">{storeData.todayOrders}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">本月营业额：</span>
                    <span className="font-semibold">¥{storeData.monthRevenue.toLocaleString()}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">本月订单：</span>
                    <span className="font-semibold">{storeData.monthOrders}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数据统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">今日订单</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.todayOrders}</p>
                  <p className="text-xs text-green-600">+15.3% 昨日</p>
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
                  <p className="text-sm text-gray-600">今日收入</p>
                  <p className="text-2xl font-bold text-gray-800">¥{storeData.todayRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12.5% 昨日</p>
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
                  <p className="text-sm text-gray-600">库存预警</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                  <p className="text-xs text-red-600">需要补货</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">在岗员工</p>
                  <p className="text-2xl font-bold text-gray-800">{employees.filter(e => e.status === '在职').length}</p>
                  <p className="text-xs text-blue-600">正常排班</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 今日订单概览 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                今日订单
              </CardTitle>
              <Button onClick={() => setActiveTab('orders')} className="bg-purple-600 hover:bg-purple-700">
                查看全部
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 3).map(order => <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-medium">{order.customerName}</h4>
                      <p className="text-sm text-gray-600">{order.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">¥{order.price}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染订单管理
  const renderOrders = () => {
    return <div className="space-y-6">
        {/* 订单统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">待服务</p>
                <p className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === '待服务').length}</p>
                <p className="text-xs text-gray-500">需要安排</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">服务中</p>
                <p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === '服务中').length}</p>
                <p className="text-xs text-gray-500">正在进行</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">已完成</p>
                <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === '已完成').length}</p>
                <p className="text-xs text-gray-500">今日完成</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总收入</p>
                <p className="text-2xl font-bold text-purple-600">¥{orders.reduce((sum, order) => sum + order.price, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">今日收入</p>
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
                订单管理
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索订单..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
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
                    <th className="text-left py-3 px-4">客户</th>
                    <th className="text-left py-3 px-4">服务</th>
                    <th className="text-left py-3 px-4">预约时间</th>
                    <th className="text-left py-3 px-4">美容师</th>
                    <th className="text-right py-3 px-4">价格</th>
                    <th className="text-center py-3 px-4">状态</th>
                    <th className="text-center py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.filter(order => order.customerName.includes(searchTerm) || order.id.includes(searchTerm)).map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.service}</td>
                      <td className="py-3 px-4">{order.appointmentTime}</td>
                      <td className="py-3 px-4">{order.employee}</td>
                      <td className="py-3 px-4 text-right font-medium">¥{order.price}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetail(true);
                      }} className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          {order.status === '待服务' && <button onClick={() => handleOrderStatusUpdate(order.id, '服务中')} className="p-1 hover:bg-gray-100 rounded">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          </button>}
                          {order.status === '服务中' && <button onClick={() => handleOrderStatusUpdate(order.id, '已完成')} className="p-1 hover:bg-gray-100 rounded">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>}
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

  // 渲染库存管理
  const renderInventory = () => {
    return <div className="space-y-6">
        {/* 库存统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总库存</p>
                <p className="text-2xl font-bold text-gray-800">{inventory.reduce((sum, item) => sum + item.stock, 0)}</p>
                <p className="text-xs text-gray-500">所有商品</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">库存不足</p>
                <p className="text-2xl font-bold text-red-600">{inventory.filter(item => item.status === '库存不足').length}</p>
                <p className="text-xs text-gray-500">需要补货</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">库存过多</p>
                <p className="text-2xl font-bold text-orange-600">{inventory.filter(item => item.status === '库存过多').length}</p>
                <p className="text-xs text-gray-500">需要促销</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">库存价值</p>
                <p className="text-2xl font-bold text-purple-600">¥{inventory.reduce((sum, item) => sum + item.stock * item.price, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">总价值</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 库存列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                库存管理
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
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
                    <th className="text-left py-3 px-4">品牌</th>
                    <th className="text-center py-3 px-4">当前库存</th>
                    <th className="text-center py-3 px-4">安全库存</th>
                    <th className="text-right py-3 px-4">单价</th>
                    <th className="text-center py-3 px-4">状态</th>
                    <th className="text-center py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">供应商：{item.supplier}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.brand}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${item.stock <= item.minStock ? 'text-red-600' : item.stock >= item.maxStock ? 'text-orange-600' : 'text-green-600'}`}>
                          {item.stock} {item.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.minStock} {item.unit}</td>
                      <td className="py-3 px-4 text-right">¥{item.price}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${getInventoryStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => handleInventoryUpdate(item.id, 'in', 10)} className="p-1 hover:bg-gray-100 rounded" title="入库">
                            <Upload className="w-4 h-4 text-green-600" />
                          </button>
                          <button onClick={() => handleInventoryUpdate(item.id, 'out', 5)} className="p-1 hover:bg-gray-100 rounded" title="出库">
                            <Download className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="编辑">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
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
    return <div className="space-y-6">
        {/* 员工统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总员工</p>
                <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                <p className="text-xs text-gray-500">全部员工</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">在岗员工</p>
                <p className="text-2xl font-bold text-green-600">{employees.filter(e => e.status === '在职').length}</p>
                <p className="text-xs text-gray-500">正常工作</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">今日订单</p>
                <p className="text-2xl font-bold text-blue-600">{employees.reduce((sum, e) => sum + e.todayOrders, 0)}</p>
                <p className="text-xs text-gray-500">总服务数</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">平均评分</p>
                <p className="text-2xl font-bold text-purple-600">{(employees.reduce((sum, e) => sum + e.rating, 0) / employees.length).toFixed(1)}</p>
                <p className="text-xs text-gray-500">服务质量</p>
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
                员工管理
              </CardTitle>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                添加员工
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map(employee => <div key={employee.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <img src={employee.avatar} alt={employee.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <h4 className="font-semibold">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${employee.status === '在职' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {employee.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">电话：</span>
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">邮箱：</span>
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">入职时间：</span>
                      <span>{employee.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">工作时间：</span>
                      <span>{employee.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">今日订单：</span>
                      <span className="font-medium">{employee.todayOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">本月订单：</span>
                      <span className="font-medium">{employee.monthOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">评分：</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{employee.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">薪资：</span>
                      <span className="font-medium">¥{employee.salary}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      查看详情
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => handleEmployeeStatusUpdate(employee.id, employee.status === '在职' ? '休假' : '在职')} className="p-1 hover:bg-gray-100 rounded">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染门店设置
  const renderSettings = () => {
    return <div className="space-y-6">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              门店设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">基本信息</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">门店名称</label>
                    <input type="text" defaultValue={storeData?.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">门店地址</label>
                    <input type="text" defaultValue={storeData?.address} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
                    <input type="tel" defaultValue={storeData?.phone} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
                    <input type="email" defaultValue={storeData?.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">营业设置</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">营业时间</label>
                    <input type="text" defaultValue={storeData?.businessHours} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">门店状态</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="营业中">营业中</option>
                      <option value="休息中">休息中</option>
                      <option value="暂停营业">暂停营业</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">服务项目</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-sm">染发服务</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-sm">护理服务</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-sm">造型设计</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                保存设置
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">门店管理系统</h1>
          <p className="text-gray-600">智能门店管理，提升运营效率</p>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'dashboard',
            name: '数据概览',
            icon: TrendingUp
          }, {
            id: 'orders',
            name: '订单管理',
            icon: ShoppingCart
          }, {
            id: 'inventory',
            name: '库存管理',
            icon: Package
          }, {
            id: 'employees',
            name: '员工管理',
            icon: Users
          }, {
            id: 'settings',
            name: '门店设置',
            icon: Settings
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
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* 订单详情弹窗 */}
      {showOrderDetail && selectedOrder && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">订单详情</h2>
              <button onClick={() => setShowOrderDetail(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">订单号</p>
                <p className="font-medium">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">客户信息</p>
                <p className="font-medium">{selectedOrder.customerName}</p>
                <p className="text-sm">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">服务项目</p>
                <p className="font-medium">{selectedOrder.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">预约时间</p>
                <p className="font-medium">{selectedOrder.appointmentTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">服务时长</p>
                <p className="font-medium">{selectedOrder.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">服务美容师</p>
                <p className="font-medium">{selectedOrder.employee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">备注</p>
                <p className="font-medium">{selectedOrder.notes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">价格</p>
                <p className="font-medium text-lg">¥{selectedOrder.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">状态</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getOrderStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <Button onClick={() => setShowOrderDetail(false)} variant="outline" className="flex-1">
                关闭
              </Button>
              <Button onClick={() => setShowOrderDetail(false)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                确认
              </Button>
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