// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Users, Scissors, UserCheck, Package, Palette, BarChart3, Settings, Plus, Edit, Trash2, Search, Filter, Calendar, TrendingUp, Award, Clock, DollarSign, Star, Phone, Mail, MapPin } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
;
export default function StoreManagementSystemPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // 模拟数据
  const [storeStats] = useState({
    totalEmployees: 24,
    totalStylists: 12,
    totalCustomers: 1850,
    totalFormulas: 156,
    monthlyRevenue: 285000,
    monthlyGrowth: 15.6
  });
  const [employees] = useState([{
    id: 1,
    name: '张店长',
    position: '店长',
    phone: '13800138001',
    email: 'zhang@store.com',
    joinDate: '2022-01-15',
    status: 'active',
    performance: 4.8,
    monthlyRevenue: 45000
  }, {
    id: 2,
    name: '李发型师',
    position: '高级发型师',
    phone: '13800138002',
    email: 'li@store.com',
    joinDate: '2022-03-20',
    status: 'active',
    performance: 4.9,
    monthlyRevenue: 38000
  }, {
    id: 3,
    name: '王助理',
    position: '助理',
    phone: '13800138003',
    email: 'wang@store.com',
    joinDate: '2023-06-10',
    status: 'active',
    performance: 4.2,
    monthlyRevenue: 15000
  }]);
  const [stylists] = useState([{
    id: 1,
    name: '李发型师',
    level: '高级发型师',
    specialties: ['染发', '烫发', '剪发'],
    experience: 8,
    rating: 4.9,
    customers: 156,
    monthlyRevenue: 38000,
    commission: 0.15
  }, {
    id: 2,
    name: '陈发型师',
    level: '中级发型师',
    specialties: ['剪发', '造型'],
    experience: 5,
    rating: 4.7,
    customers: 98,
    monthlyRevenue: 28000,
    commission: 0.12
  }]);
  const [customers] = useState([{
    id: 1,
    name: '刘女士',
    phone: '13900139001',
    email: 'liu@email.com',
    joinDate: '2023-01-15',
    lastVisit: '2024-01-10',
    totalSpent: 15680,
    visitCount: 12,
    level: 'VIP',
    preferences: ['奶茶色', '自然卷'],
    allergies: ['对某种化学成分过敏']
  }, {
    id: 2,
    name: '张先生',
    phone: '13900139002',
    email: 'zhang@email.com',
    joinDate: '2023-03-20',
    lastVisit: '2024-01-08',
    totalSpent: 8900,
    visitCount: 6,
    level: '普通',
    preferences: ['黑色', '短发'],
    allergies: []
  }]);
  const [formulas] = useState([{
    id: 1,
    name: '时尚奶茶色染发配方',
    type: '染发',
    color: '#D2B48C',
    ingredients: ['奶茶色染发剂', '双氧奶', '护色精华'],
    cost: 89.9,
    price: 280,
    usage: 45,
    createdBy: '李发型师',
    createdAt: '2024-01-12'
  }, {
    id: 2,
    name: '高级灰金色染发配方',
    type: '染发',
    color: '#C0C0C0',
    ingredients: ['灰金色染发剂', '9%双氧奶', '抗褪色剂'],
    cost: 128.5,
    price: 380,
    usage: 28,
    createdBy: '陈发型师',
    createdAt: '2024-01-10'
  }]);
  const [inventory] = useState([{
    id: 1,
    name: '奶茶色染发剂',
    brand: 'AI品牌',
    category: '染发剂',
    stock: 45,
    unit: '支',
    price: 68,
    supplier: 'AI美发供应商',
    lastRestock: '2024-01-05',
    expiryDate: '2024-12-31'
  }, {
    id: 2,
    name: '双氧奶 9%',
    brand: 'AI品牌',
    category: '氧化剂',
    stock: 120,
    unit: '瓶',
    price: 25,
    supplier: 'AI美发供应商',
    lastRestock: '2024-01-08',
    expiryDate: '2024-10-31'
  }]);

  // 处理搜索
  const handleSearch = value => {
    setSearchTerm(value);
  };

  // 处理添加员工
  const handleAddEmployee = () => {
    toast({
      title: "添加员工",
      description: "员工添加功能正在开发中"
    });
  };

  // 处理编辑员工
  const handleEditEmployee = employee => {
    toast({
      title: "编辑员工",
      description: `正在编辑 ${employee.name} 的信息`
    });
  };

  // 处理删除员工
  const handleDeleteEmployee = employee => {
    if (confirm(`确定要删除员工 ${employee.name} 吗？`)) {
      toast({
        title: "删除成功",
        description: `${employee.name} 已被删除`
      });
    }
  };

  // 渲染仪表板
  const renderDashboard = () => <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">员工总数</p>
                <p className="text-2xl font-bold text-white">{storeStats.totalEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">发型师</p>
                <p className="text-2xl font-bold text-white">{storeStats.totalStylists}</p>
              </div>
              <Scissors className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">客户总数</p>
                <p className="text-2xl font-bold text-white">{storeStats.totalCustomers}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">月营收</p>
                <p className="text-2xl font-bold text-white">¥{(storeStats.monthlyRevenue / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => setActiveTab('employees')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span className="text-sm">员工管理</span>
            </Button>
            <Button onClick={() => setActiveTab('stylists')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
              <Scissors className="w-6 h-6 mb-2" />
              <span className="text-sm">发型师管理</span>
            </Button>
            <Button onClick={() => setActiveTab('customers')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
              <UserCheck className="w-6 h-6 mb-2" />
              <span className="text-sm">客户管理</span>
            </Button>
            <Button onClick={() => setActiveTab('formulas')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 h-20 flex flex-col">
              <Palette className="w-6 h-6 mb-2" />
              <span className="text-sm">配方管理</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染员工管理
  const renderEmployees = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">员工管理</h2>
        <Button onClick={handleAddEmployee} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
          <Plus className="w-4 h-4 mr-2" />
          添加员工
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {employees.map(employee => <div key={employee.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{employee.name}</h3>
                      <p className="text-white/60 text-sm">{employee.position}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-white/60 text-xs flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {employee.phone}
                        </span>
                        <span className="text-white/60 text-xs flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {employee.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{employee.performance}</span>
                    </div>
                    <p className="text-white/60 text-sm">月营收: ¥{employee.monthlyRevenue.toLocaleString()}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditEmployee(employee)} className="text-white/80 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteEmployee(employee)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染发型师管理
  const renderStylists = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">发型师管理</h2>
        <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
          <Plus className="w-4 h-4 mr-2" />
          添加发型师
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {stylists.map(stylist => <div key={stylist.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Scissors className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{stylist.name}</h3>
                      <p className="text-white/60 text-sm">{stylist.level} · {stylist.experience}年经验</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {stylist.specialties.map((specialty, index) => <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full">
                            {specialty}
                          </span>)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{stylist.rating}</span>
                    </div>
                    <p className="text-white/60 text-sm">客户: {stylist.customers}</p>
                    <p className="text-white/60 text-sm">月营收: ¥{stylist.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-white/60 text-sm">提成: {(stylist.commission * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染客户管理
  const renderCustomers = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">客户管理</h2>
        <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
          <Plus className="w-4 h-4 mr-2" />
          添加客户
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {customers.map(customer => <div key={customer.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{customer.name}</h3>
                      <p className="text-white/60 text-sm">{customer.level}客户</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-white/60 text-xs flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone}
                        </span>
                        <span className="text-white/60 text-xs flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          最后访问: {customer.lastVisit}
                        </span>
                      </div>
                      {customer.preferences.length > 0 && <div className="flex flex-wrap gap-1 mt-2">
                          {customer.preferences.map((pref, index) => <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full">
                              {pref}
                            </span>)}
                        </div>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm">消费: ¥{customer.totalSpent.toLocaleString()}</p>
                    <p className="text-white/60 text-sm">访问: {customer.visitCount}次</p>
                    {customer.allergies.length > 0 && <p className="text-red-400 text-xs mt-1">⚠ 过敏信息</p>}
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染配方管理
  const renderFormulas = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">配方管理</h2>
        <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
          <Plus className="w-4 h-4 mr-2" />
          创建配方
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {formulas.map(formula => <div key={formula.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg border-2 border-white/20" style={{
                  backgroundColor: formula.color
                }}></div>
                    <div>
                      <h3 className="font-medium text-white">{formula.name}</h3>
                      <p className="text-white/60 text-sm">{formula.type} · 创建者: {formula.createdBy}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-white/60 text-xs">成本: ¥{formula.cost}</span>
                        <span className="text-white text-xs">售价: ¥{formula.price}</span>
                        <span className="text-white/60 text-xs">使用: {formula.usage}次</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;

  // 渲染库存管理
  const renderInventory = () => <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">品牌染膏库存管理</h2>
        <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
          <Plus className="w-4 h-4 mr-2" />
          添加产品
        </Button>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {inventory.map(item => <div key={item.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <p className="text-white/60 text-sm">{item.brand} · {item.category}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-white/60 text-xs">供应商: {item.supplier}</span>
                        <span className="text-white/60 text-xs">过期: {item.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${item.stock < 50 ? 'text-red-400' : 'text-green-400'}`}>
                      {item.stock} {item.unit}
                    </p>
                    <p className="text-white/60 text-sm">¥{item.price}/{item.unit}</p>
                    <p className="text-white/60 text-xs">最后补货: {item.lastRestock}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="store-management-system" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI门店管理系统</h1>
          <p className="text-white/80">店长CEO面板 - 全方位门店运营管理</p>
        </div>

        {/* 标签页导航 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/10 border border-white/20">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white/20">
              仪表板
            </TabsTrigger>
            <TabsTrigger value="employees" className="text-white data-[state=active]:bg-white/20">
              员工管理
            </TabsTrigger>
            <TabsTrigger value="stylists" className="text-white data-[state=active]:bg-white/20">
              发型师管理
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-white data-[state=active]:bg-white/20">
              客户管理
            </TabsTrigger>
            <TabsTrigger value="formulas" className="text-white data-[state=active]:bg-white/20">
              配方管理
            </TabsTrigger>
            <TabsTrigger value="inventory" className="text-white data-[state=active]:bg-white/20">
              库存管理
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            {renderDashboard()}
          </TabsContent>
          <TabsContent value="employees" className="mt-6">
            {renderEmployees()}
          </TabsContent>
          <TabsContent value="stylists" className="mt-6">
            {renderStylists()}
          </TabsContent>
          <TabsContent value="customers" className="mt-6">
            {renderCustomers()}
          </TabsContent>
          <TabsContent value="formulas" className="mt-6">
            {renderFormulas()}
          </TabsContent>
          <TabsContent value="inventory" className="mt-6">
            {renderInventory()}
          </TabsContent>
        </Tabs>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="store-management-system" />
    </div>;
}