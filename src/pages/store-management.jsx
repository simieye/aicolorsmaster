// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Store, Package, ShoppingCart, Users, BarChart3, Settings, Clock, MapPin, Phone, Mail, Calendar, TrendingUp, AlertCircle, CheckCircle, Plus, Edit, Trash2, Eye, Filter, Search, Download } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { StoreStatsCard } from '@/components/StoreStatsCard';
// @ts-ignore;
import { InventoryTable } from '@/components/InventoryTable';
// @ts-ignore;
import { OrderTable } from '@/components/OrderTable';
// @ts-ignore;
import { EmployeeCard } from '@/components/EmployeeCard';
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
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // 初始化数据
  useEffect(() => {
    // 模拟门店数据
    setStoreData({
      id: 1,
      name: 'AI染发色彩大师旗舰店',
      address: '北京市朝阳区三里屯太古里南区S2-18',
      phone: '010-12345678',
      email: 'store@aihair.com',
      businessHours: {
        monday: {
          open: '09:00',
          close: '21:00',
          isOpen: true
        },
        tuesday: {
          open: '09:00',
          close: '21:00',
          isOpen: true
        },
        wednesday: {
          open: '09:00',
          close: '21:00',
          isOpen: true
        },
        thursday: {
          open: '09:00',
          close: '21:00',
          isOpen: true
        },
        friday: {
          open: '09:00',
          close: '22:00',
          isOpen: true
        },
        saturday: {
          open: '09:00',
          close: '22:00',
          isOpen: true
        },
        sunday: {
          open: '10:00',
          close: '20:00',
          isOpen: true
        }
      },
      services: ['染发', '护理', '造型', '咨询'],
      status: '营业中',
      rating: 4.8,
      totalOrders: 1256,
      monthlyRevenue: 156800,
      employees: 12
    });

    // 模拟库存数据
    setInventoryData([{
      id: 1,
      name: '微潮紫染发剂',
      category: '染发剂',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: '瓶',
      price: 128.00,
      supplier: '色彩供应商A',
      lastUpdate: '2024-01-15',
      status: 'normal'
    }, {
      id: 2,
      name: '樱花粉染发剂',
      category: '染发剂',
      currentStock: 15,
      minStock: 20,
      maxStock: 100,
      unit: '瓶',
      price: 118.00,
      supplier: '色彩供应商A',
      lastUpdate: '2024-01-14',
      status: 'low'
    }, {
      id: 3,
      name: '护发素',
      category: '护理产品',
      currentStock: 80,
      minStock: 30,
      maxStock: 150,
      unit: '瓶',
      price: 68.00,
      supplier: '护理供应商B',
      lastUpdate: '2024-01-13',
      status: 'normal'
    }, {
      id: 4,
      name: '洗发水',
      category: '护理产品',
      currentStock: 120,
      minStock: 50,
      maxStock: 200,
      unit: '瓶',
      price: 48.00,
      supplier: '护理供应商B',
      lastUpdate: '2024-01-12',
      status: 'normal'
    }]);

    // 模拟订单数据
    setOrderData([{
      id: 'ORD-2024-001',
      customerName: '张小姐',
      customerPhone: '138****5678',
      service: '微潮紫染发',
      employee: '李技师',
      appointmentTime: '2024-01-15 14:00',
      status: '进行中',
      amount: 298.00,
      paymentStatus: '已支付',
      createTime: '2024-01-15 10:30'
    }, {
      id: 'ORD-2024-002',
      customerName: '王女士',
      customerPhone: '139****1234',
      service: '樱花粉染发+护理',
      employee: '陈技师',
      appointmentTime: '2024-01-15 15:30',
      status: '待服务',
      amount: 368.00,
      paymentStatus: '已支付',
      createTime: '2024-01-15 09:15'
    }, {
      id: 'ORD-2024-003',
      customerName: '刘先生',
      customerPhone: '137****9876',
      service: '头发护理',
      employee: '张技师',
      appointmentTime: '2024-01-15 16:00',
      status: '已完成',
      amount: 128.00,
      paymentStatus: '已支付',
      createTime: '2024-01-14 18:20'
    }]);

    // 模拟员工数据
    setEmployeeData([{
      id: 1,
      name: '李技师',
      position: '高级技师',
      phone: '138****1111',
      email: 'li@aihair.com',
      joinDate: '2022-03-15',
      status: '在职',
      todayOrders: 8,
      monthlyOrders: 156,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    }, {
      id: 2,
      name: '陈技师',
      position: '中级技师',
      phone: '139****2222',
      email: 'chen@aihair.com',
      joinDate: '2023-01-20',
      status: '在职',
      todayOrders: 6,
      monthlyOrders: 124,
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
    }, {
      id: 3,
      name: '张技师',
      position: '初级技师',
      phone: '137****3333',
      email: 'zhang@aihair.com',
      joinDate: '2023-06-10',
      status: '在职',
      todayOrders: 4,
      monthlyOrders: 89,
      rating: 4.5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
    }]);
  }, []);

  // 处理订单状态更新
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setOrderData(prev => prev.map(order => order.id === orderId ? {
      ...order,
      status: newStatus
    } : order));
    toast({
      title: "状态更新成功",
      description: `订单 ${orderId} 状态已更新为 ${newStatus}`
    });
  };

  // 处理库存补货
  const handleRestock = item => {
    toast({
      title: "补货申请已提交",
      description: "库存补货申请已提交给供应商"
    });
  };

  // 处理员工编辑
  const handleEditEmployee = employee => {
    toast({
      title: "编辑员工",
      description: `正在编辑 ${employee.name} 的信息`
    });
  };

  // 处理员工查看
  const handleViewEmployee = employee => {
    toast({
      title: "查看员工详情",
      description: `正在查看 ${employee.name} 的详细信息`
    });
  };

  // 处理订单查看
  const handleViewOrder = order => {
    toast({
      title: "查看订单详情",
      description: `正在查看订单 ${order.id} 的详细信息`
    });
  };

  // 处理库存编辑
  const handleEditInventory = item => {
    toast({
      title: "编辑库存",
      description: `正在编辑 ${item.name} 的库存信息`
    });
  };

  // 渲染仪表板
  const renderDashboard = () => {
    if (!storeData) return null;
    return <div className="space-y-6">
        {/* 数据概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StoreStatsCard title="今日订单" value="18" change="+25% 较昨日" changeType="up" icon={ShoppingCart} color="blue" />
          <StoreStatsCard title="今日营收" value="¥3,680" change="+18% 较昨日" changeType="up" icon={TrendingUp} color="green" />
          <StoreStatsCard title="库存预警" value="2" change="需要补货" changeType="down" icon={Package} color="orange" />
          <StoreStatsCard title="在岗员工" value="8" change="4位技师" changeType="up" icon={Users} color="purple" />
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
                  <div className="flex items-center text-sm">
                    <Store className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">门店名称：</span>
                    <span className="font-medium ml-1">{storeData.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">地址：</span>
                    <span className="font-medium ml-1">{storeData.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">电话：</span>
                    <span className="font-medium ml-1">{storeData.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">邮箱：</span>
                    <span className="font-medium ml-1">{storeData.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">营业状态</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">当前状态</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {storeData.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">营业时间</span>
                    <span className="text-sm font-medium">09:00 - 21:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">服务项目</span>
                    <div className="flex gap-2">
                      {storeData.services.map((service, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {service}
                        </span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 今日待办 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                待处理事项
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="text-sm">樱花粉染发剂库存不足</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleRestock(inventoryData[1])}>
                    立即补货
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <ShoppingCart className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">3个待确认订单</span>
                  </div>
                  <Button size="sm" variant="outline">
                    查看详情
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                今日业绩
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">完成订单</span>
                  <span className="font-medium">12单</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">营收金额</span>
                  <span className="font-medium text-green-600">¥3,680</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">平均客单价</span>
                  <span className="font-medium">¥306</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">客户满意度</span>
                  <span className="font-medium text-purple-600">4.8分</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染库存管理
  const renderInventory = () => {
    const filteredInventory = inventoryData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterStatus === 'all' || item.status === filterStatus));
    return <div className="space-y-6">
        {/* 库存统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StoreStatsCard title="总库存" value="260" change="件商品" changeType="up" icon={Package} color="blue" />
          <StoreStatsCard title="库存预警" value="2" change="需要补货" changeType="down" icon={AlertCircle} color="orange" />
          <StoreStatsCard title="库存价值" value="¥18,560" change="总价值" changeType="up" icon={TrendingUp} color="green" />
          <StoreStatsCard title="供应商" value="5" change="合作供应商" changeType="up" icon={Store} color="purple" />
        </div>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="搜索商品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex gap-2">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">全部状态</option>
                  <option value="normal">正常</option>
                  <option value="low">库存不足</option>
                  <option value="high">库存过多</option>
                </select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  导出报表
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 库存列表 */}
        <InventoryTable inventory={filteredInventory} onEdit={handleEditInventory} onRestock={handleRestock} />
      </div>;
  };

  // 渲染订单管理
  const renderOrders = () => {
    const filteredOrders = orderData.filter(order => order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || order.service.toLowerCase().includes(searchTerm.toLowerCase()));
    return <div className="space-y-6">
        {/* 订单统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StoreStatsCard title="今日订单" value="18" change="+25% 较昨日" changeType="up" icon={ShoppingCart} color="blue" />
          <StoreStatsCard title="待服务" value="5" change="等待服务" changeType="down" icon={Clock} color="orange" />
          <StoreStatsCard title="进行中" value="3" change="服务进行中" changeType="up" icon={Eye} color="purple" />
          <StoreStatsCard title="已完成" value="10" change="今日完成" changeType="up" icon={CheckCircle} color="green" />
        </div>

        {/* 搜索筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="搜索订单..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">全部状态</option>
                  <option value="待服务">待服务</option>
                  <option value="进行中">进行中</option>
                  <option value="已完成">已完成</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 订单列表 */}
        <OrderTable orders={filteredOrders} onView={handleViewOrder} onUpdateStatus={handleOrderStatusUpdate} />
      </div>;
  };

  // 渲染员工管理
  const renderEmployees = () => {
    return <div className="space-y-6">
        {/* 员工统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StoreStatsCard title="总员工数" value="12" change="在职员工" changeType="up" icon={Users} color="blue" />
          <StoreStatsCard title="在岗员工" value="8" change="今日在岗" changeType="up" icon={CheckCircle} color="green" />
          <StoreStatsCard title="平均评分" value="4.7" change="客户满意度" changeType="up" icon={Star} color="purple" />
          <StoreStatsCard title="本月订单" value="369" change="+15% 较上月" changeType="up" icon={TrendingUp} color="orange" />
        </div>

        {/* 员工列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                员工列表
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加员工
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeeData.map(employee => <EmployeeCard key={employee.id} employee={employee} onEdit={handleEditEmployee} onView={handleViewEmployee} />)}
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

      {/* 底部导航 */}
      <TabBar currentPage="store-management" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}