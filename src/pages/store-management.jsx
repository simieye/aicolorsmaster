// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Store, Package, ShoppingCart, Users, Settings, BarChart3, Plus, Edit, Trash2, Search, Filter, Download, Upload } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { StoreDashboard } from '@/components/StoreDashboard';
// @ts-ignore;
import { StoreSidebar } from '@/components/StoreSidebar';
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
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // 模拟数据
  const [stats, setStats] = useState({
    todayRevenue: 15680,
    todayOrders: 45,
    todayCustomers: 38,
    lowStockCount: 5
  });
  const [recentOrders, setRecentOrders] = useState([{
    id: 1,
    customerName: '张小姐',
    service: '微潮紫染发',
    amount: 280,
    status: 'completed',
    time: '14:30'
  }, {
    id: 2,
    customerName: '李女士',
    service: '樱花粉染发',
    amount: 320,
    status: 'processing',
    time: '15:15'
  }, {
    id: 3,
    customerName: '王先生',
    service: '奶茶棕染发',
    amount: 260,
    status: 'pending',
    time: '15:45'
  }]);
  const [lowStockItems, setLowStockItems] = useState([{
    id: 1,
    name: '微潮紫染发剂',
    currentStock: 3,
    reorderLevel: 10
  }, {
    id: 2,
    name: '6%双氧奶',
    currentStock: 5,
    reorderLevel: 15
  }]);
  const [inventory, setInventory] = useState([{
    id: 1,
    name: '微潮紫染发剂',
    category: '染发剂',
    currentStock: 3,
    minStock: 10,
    maxStock: 50,
    price: 120,
    supplier: '美妆供应商A',
    lastUpdate: '2024-01-15'
  }, {
    id: 2,
    name: '樱花粉染发剂',
    category: '染发剂',
    currentStock: 15,
    minStock: 10,
    maxStock: 50,
    price: 110,
    supplier: '美妆供应商A',
    lastUpdate: '2024-01-14'
  }, {
    id: 3,
    name: '6%双氧奶',
    category: '氧化剂',
    currentStock: 5,
    minStock: 15,
    maxStock: 100,
    price: 45,
    supplier: '化工供应商B',
    lastUpdate: '2024-01-13'
  }]);
  const [orders, setOrders] = useState([{
    id: 1,
    orderNo: 'ORD20240115001',
    customerName: '张小姐',
    phone: '138****5678',
    service: '微潮紫染发',
    amount: 280,
    status: 'completed',
    employee: '发型师A',
    createTime: '2024-01-15 14:30',
    completeTime: '2024-01-15 16:30'
  }, {
    id: 2,
    orderNo: 'ORD20240115002',
    customerName: '李女士',
    phone: '139****1234',
    service: '樱花粉染发',
    amount: 320,
    status: 'processing',
    employee: '发型师B',
    createTime: '2024-01-15 15:15',
    completeTime: null
  }]);
  const [employees, setEmployees] = useState([{
    id: 1,
    name: '发型师A',
    phone: '138****1111',
    position: '高级发型师',
    status: 'active',
    joinDate: '2023-01-15',
    todayOrders: 8,
    monthlyRevenue: 15680
  }, {
    id: 2,
    name: '发型师B',
    phone: '139****2222',
    position: '中级发型师',
    status: 'active',
    joinDate: '2023-06-20',
    todayOrders: 6,
    monthlyRevenue: 12450
  }]);
  const [storeInfo, setStoreInfo] = useState({
    name: 'AI染发色彩大师旗舰店',
    address: '北京市朝阳区三里屯SOHO',
    phone: '010-12345678',
    email: 'store@aihair.com',
    businessHours: '09:00-21:00',
    description: '专业AI智能染发服务'
  });

  // 渲染仪表板
  const renderDashboard = () => <StoreDashboard stats={stats} recentOrders={recentOrders} lowStockItems={lowStockItems} />;

  // 渲染门店信息
  const renderStoreInfo = () => <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">门店基本信息</h3>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Edit className="w-4 h-4 mr-2" />
              编辑信息
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">门店名称</label>
              <input type="text" value={storeInfo.name} onChange={e => setStoreInfo(prev => ({
              ...prev,
              name: e.target.value
            }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
              <input type="tel" value={storeInfo.phone} onChange={e => setStoreInfo(prev => ({
              ...prev,
              phone: e.target.value
            }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
              <input type="email" value={storeInfo.email} onChange={e => setStoreInfo(prev => ({
              ...prev,
              email: e.target.value
            }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">营业时间</label>
              <input type="text" value={storeInfo.businessHours} onChange={e => setStoreInfo(prev => ({
              ...prev,
              businessHours: e.target.value
            }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">门店地址</label>
              <input type="text" value={storeInfo.address} onChange={e => setStoreInfo(prev => ({
              ...prev,
              address: e.target.value
            }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">门店描述</label>
              <textarea value={storeInfo.description} onChange={e => setStoreInfo(prev => ({
              ...prev,
              description: e.target.value
            }))} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">
              保存修改
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染库存管理
  const renderInventory = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">库存管理</h3>
        <div className="flex space-x-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            添加商品
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            导入
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="搜索商品..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">商品名称</th>
                  <th className="text-left py-3 px-4">分类</th>
                  <th className="text-left py-3 px-4">当前库存</th>
                  <th className="text-left py-3 px-4">最低库存</th>
                  <th className="text-left py-3 px-4">最高库存</th>
                  <th className="text-left py-3 px-4">单价</th>
                  <th className="text-left py-3 px-4">供应商</th>
                  <th className="text-left py-3 px-4">最后更新</th>
                  <th className="text-center py-3 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${item.currentStock <= item.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {item.currentStock}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.minStock}</td>
                    <td className="py-3 px-4">{item.maxStock}</td>
                    <td className="py-3 px-4">¥{item.price}</td>
                    <td className="py-3 px-4">{item.supplier}</td>
                    <td className="py-3 px-4">{item.lastUpdate}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
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

  // 渲染订单管理
  const renderOrders = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">订单管理</h3>
        <div className="flex space-x-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            新建订单
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="搜索订单..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">订单号</th>
                  <th className="text-left py-3 px-4">客户姓名</th>
                  <th className="text-left py-3 px-4">联系电话</th>
                  <th className="text-left py-3 px-4">服务项目</th>
                  <th className="text-left py-3 px-4">金额</th>
                  <th className="text-left py-3 px-4">状态</th>
                  <th className="text-left py-3 px-4">服务员工</th>
                  <th className="text-left py-3 px-4">创建时间</th>
                  <th className="text-center py-3 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{order.orderNo}</td>
                    <td className="py-3 px-4">{order.customerName}</td>
                    <td className="py-3 px-4">{order.phone}</td>
                    <td className="py-3 px-4">{order.service}</td>
                    <td className="py-3 px-4">¥{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status === 'completed' ? '已完成' : order.status === 'processing' ? '进行中' : '待处理'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{order.employee}</td>
                    <td className="py-3 px-4">{order.createTime}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
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

  // 渲染员工管理
  const renderEmployees = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">员工管理</h3>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          添加员工
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map(employee => <div key={employee.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {employee.status === 'active' ? '在职' : '离职'}
                  </span>
                </div>
                
                <h4 className="font-semibold mb-2">{employee.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{employee.position}</p>
                <p className="text-sm text-gray-600 mb-1">{employee.phone}</p>
                <p className="text-sm text-gray-600 mb-3">入职时间：{employee.joinDate}</p>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>今日订单</span>
                    <span className="font-medium">{employee.todayOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>本月业绩</span>
                    <span className="font-medium">¥{employee.monthlyRevenue}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染数据分析
  const renderAnalytics = () => <div className="space-y-6">
      <h3 className="text-lg font-semibold">数据分析</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">营业额趋势</h4>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-600">图表区域</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4">服务项目分析</h4>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-gray-400" />
              <span className="ml-2 text-gray-600">图表区域</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;

  // 渲染设置
  const renderSettings = () => <div className="space-y-6">
      <h3 className="text-lg font-semibold">系统设置</h3>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">自动备份</h4>
                <p className="text-sm text-gray-600">每日自动备份门店数据</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">库存预警</h4>
                <p className="text-sm text-gray-600">库存不足时自动提醒</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">短信通知</h4>
                <p className="text-sm text-gray-600">订单状态变更时发送短信</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"></span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染内容
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'store-info':
        return renderStoreInfo();
      case 'inventory':
        return renderInventory();
      case 'orders':
        return renderOrders();
      case 'employees':
        return renderEmployees();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-20">
      <div className="flex h-screen">
        {/* 侧边栏 */}
        <StoreSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        
        {/* 主内容区 */}
        <div className="flex-1 overflow-y-auto">
          {/* 顶部导航 */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeMenu === 'dashboard' && '仪表板'}
                {activeMenu === 'store-info' && '门店信息'}
                {activeMenu === 'inventory' && '库存管理'}
                {activeMenu === 'orders' && '订单管理'}
                {activeMenu === 'employees' && '员工管理'}
                {activeMenu === 'analytics' && '数据分析'}
                {activeMenu === 'settings' && '系统设置'}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">管理员</span>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 页面内容 */}
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
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