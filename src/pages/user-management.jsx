// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Users, Search, Filter, Plus, Edit, Eye, Calendar, TrendingUp, Star, Phone, Mail, MapPin, Clock, DollarSign, Heart, MessageCircle, Target, BarChart3, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';

export default function UserManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [customers, setCustomers] = useState([]);
  const [formulas, setFormulas] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);
  useEffect(() => {
    // 模拟加载客户数据
    const mockCustomers = [{
      id: 1,
      name: '张小雅',
      phone: '138****5678',
      email: 'zhangxy@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      level: 'VIP',
      totalSpent: 3580,
      visitCount: 12,
      lastVisit: '2024-06-15',
      hairType: '细软发质',
      preferredColors: ['奶茶棕', '樱花粉'],
      satisfaction: 4.8,
      status: 'active',
      tags: ['高频客户', '色彩敏感', '推荐达人']
    }, {
      id: 2,
      name: '李美琪',
      phone: '139****1234',
      email: 'limq@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      level: '普通',
      totalSpent: 1890,
      visitCount: 6,
      lastVisit: '2024-06-10',
      hairType: '粗硬发质',
      preferredColors: ['自然黑', '巧克力色'],
      satisfaction: 4.5,
      status: 'active',
      tags: ['新客户', '保守风格']
    }, {
      id: 3,
      name: '王思雨',
      phone: '137****9876',
      email: 'wangsy@example.com',
      avatar: 'https://images.unsplash.com/photo-1534534573828-da4a8dc8b49c?w=100&h=100&fit=crop&crop=face',
      level: 'VIP',
      totalSpent: 5260,
      visitCount: 18,
      lastVisit: '2024-06-18',
      hairType: '中性发质',
      preferredColors: ['微潮紫', '薄荷绿'],
      satisfaction: 4.9,
      status: 'active',
      tags: ['时尚达人', '尝鲜者', '社交媒体活跃']
    }];
    const mockFormulas = [{
      id: 1,
      customerId: 1,
      customerName: '张小雅',
      formulaName: '奶茶棕渐变',
      date: '2024-06-15',
      baseColor: '自然深棕',
      targetColor: '奶茶棕',
      proportions: {
        '棕色剂': 70,
        '漂染霜': 20,
        '护色素': 8,
        '营养精华': 2
      },
      processingTime: '30分钟',
      cost: 280,
      effect: '非常满意',
      feedback: '颜色很自然，朋友都说好看',
      rating: 5,
      photos: ['before1.jpg', 'after1.jpg']
    }, {
      id: 2,
      customerId: 1,
      customerName: '张小雅',
      formulaName: '樱花粉日系',
      date: '2024-05-20',
      baseColor: '浅棕色',
      targetColor: '樱花粉',
      proportions: {
        '粉色剂': 60,
        '漂染霜': 25,
        '护色素': 10,
        '营养精华': 5
      },
      processingTime: '35分钟',
      cost: 320,
      effect: '满意',
      feedback: '粉色很温柔，就是有点掉色',
      rating: 4,
      photos: ['before2.jpg', 'after2.jpg']
    }];
    const mockServiceHistory = [{
      id: 1,
      customerId: 1,
      customerName: '张小雅',
      date: '2024-06-15',
      service: '染发+护理',
      formula: '奶茶棕渐变',
      cost: 380,
      staff: 'Tony老师',
      duration: '2小时',
      satisfaction: 5,
      notes: '客户很满意，预约了下一次护理'
    }, {
      id: 2,
      customerId: 1,
      customerName: '张小雅',
      date: '2024-05-20',
      service: '染发',
      formula: '樱花粉日系',
      cost: 320,
      staff: 'Lisa造型师',
      duration: '1.5小时',
      satisfaction: 4,
      notes: '建议加强护色护理'
    }];
    setCustomers(mockCustomers);
    setFormulas(mockFormulas);
    setServiceHistory(mockServiceHistory);
  }, []);
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  const handleCustomerSelect = customer => {
    setSelectedCustomer(customer);
    setActiveTab('detail');
    toast({
      title: "查看客户详情",
      description: `正在查看${customer.name}的详细信息`
    });
  };
  const handleAddCustomer = () => {
    toast({
      title: "添加客户",
      description: "正在打开添加客户表单"
    });
  };
  const handleEditCustomer = customer => {
    toast({
      title: "编辑客户",
      description: `正在编辑${customer.name}的信息`
    });
  };
  const getCustomerLevelColor = level => {
    switch (level) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case '普通':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getSatisfactionColor = satisfaction => {
    if (satisfaction >= 4.5) return 'text-green-600';
    if (satisfaction >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">客户管理中心</h1>
          <p className="text-xl text-gray-600">智能客户关系管理，提升服务质量和复购率</p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总客户数</p>
                  <p className="text-2xl font-bold text-purple-600">{customers.length}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">VIP客户</p>
                  <p className="text-2xl font-bold text-yellow-600">{customers.filter(c => c.level === 'VIP').length}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3%
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">平均满意度</p>
                  <p className="text-2xl font-bold text-green-600">4.7</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.3
                  </p>
                </div>
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">月度复购率</p>
                  <p className="text-2xl font-bold text-blue-600">68%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.2%
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 标签导航 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['overview', 'detail', 'formulas', 'history', 'analytics'].map(tab => <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'bg-purple-600 hover:bg-purple-700' : ''}>
              {tab === 'overview' && '👥 客户总览'}
              {tab === 'detail' && '📋 客户详情'}
              {tab === 'formulas' && '🧪 配方记录'}
              {tab === 'history' && '📅 服务历史'}
              {tab === 'analytics' && '📊 数据分析'}
            </Button>)}
        </div>

        {activeTab === 'overview' && <>
            {/* 搜索和筛选 */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="搜索客户姓名或手机号..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="筛选状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部客户</SelectItem>
                  <SelectItem value="active">活跃客户</SelectItem>
                  <SelectItem value="inactive">非活跃客户</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddCustomer} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 w-4 h-4" />
                添加客户
              </Button>
            </div>

            {/* 客户列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map(customer => <Card key={customer.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCustomerSelect(customer)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <img src={customer.avatar} alt={customer.name} className="w-12 h-12 rounded-full mr-3" />
                        <div>
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getCustomerLevelColor(customer.level)}`}>
                        {customer.level}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {customer.hairType}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        最后访问: {customer.lastVisit}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {customer.tags.slice(0, 2).map((tag, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {tag}
                        </span>)}
                      {customer.tags.length > 2 && <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{customer.tags.length - 2}
                        </span>}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(customer.satisfaction) ? 'fill-current' : ''}`} />)}
                          <span className={`ml-1 text-sm ${getSatisfactionColor(customer.satisfaction)}`}>
                            {customer.satisfaction}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">消费</p>
                        <p className="font-semibold text-green-600">￥{customer.totalSpent}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </>}

        {activeTab === 'detail' && selectedCustomer && <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左侧：基本信息 */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">{selectedCustomer.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm ${getCustomerLevelColor(selectedCustomer.level)}`}>
                        {selectedCustomer.level}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-3" />
                        {selectedCustomer.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-3" />
                        {selectedCustomer.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-3" />
                        {selectedCustomer.hairType}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-3" />
                        最后访问: {selectedCustomer.lastVisit}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-3">偏好色彩</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCustomer.preferredColors.map((color, index) => <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {color}
                          </span>)}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-3">客户标签</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCustomer.tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {tag}
                          </span>)}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button onClick={() => handleEditCustomer(selectedCustomer)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Edit className="mr-2 w-4 h-4" />
                        编辑
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageCircle className="mr-2 w-4 h-4" />
                        联系
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：详细信息 */}
              <div className="lg:col-span-2 space-y-6">
                {/* 消费统计 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="mr-2" />
                      消费统计
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">￥{selectedCustomer.totalSpent}</p>
                        <p className="text-sm text-gray-600">总消费</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{selectedCustomer.visitCount}</p>
                        <p className="text-sm text-gray-600">访问次数</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">￥{Math.round(selectedCustomer.totalSpent / selectedCustomer.visitCount)}</p>
                        <p className="text-sm text-gray-600">平均消费</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">{selectedCustomer.satisfaction}</p>
                        <p className="text-sm text-gray-600">满意度</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 最近配方 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2" />
                      最近配方
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {formulas.filter(f => f.customerId === selectedCustomer.id).slice(0, 3).map(formula => <div key={formula.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">{formula.formulaName}</h4>
                            <p className="text-sm text-gray-600">{formula.date} • {formula.processingTime}</p>
                            <p className="text-sm text-gray-600">{formula.baseColor} → {formula.targetColor}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">￥{formula.cost}</p>
                            <div className="flex items-center text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="ml-1 text-sm">{formula.rating}</span>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                {/* 服务记录 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2" />
                      服务记录
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {serviceHistory.filter(h => h.customerId === selectedCustomer.id).slice(0, 3).map(history => <div key={history.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-semibold">{history.service}</h4>
                            <p className="text-sm text-gray-600">{history.date} • {history.staff}</p>
                            <p className="text-sm text-gray-600">{history.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">￥{history.cost}</p>
                            <div className="flex items-center text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="ml-1 text-sm">{history.satisfaction}</span>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>}

        {activeTab === 'formulas' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">配方记录管理</h2>
              <p className="text-gray-600">客户配方历史记录和效果追踪</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formulas.map(formula => <Card key={formula.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{formula.formulaName}</h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm">{formula.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <UserCheck className="w-4 h-4 mr-2" />
                        {formula.customerName}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formula.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {formula.processingTime}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">配方详情</h4>
                      <div className="text-sm text-gray-600">
                        <p>{formula.baseColor} → {formula.targetColor}</p>
                        <div className="mt-2">
                          {Object.entries(formula.proportions).slice(0, 2).map(([ingredient, percentage]) => <span key={ingredient} className="inline-block mr-2">
                              {ingredient}: {percentage}%
                            </span>)}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">客户反馈</h4>
                      <p className="text-sm text-gray-600">"{formula.feedback}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-gray-600">效果: {formula.effect}</span>
                      <span className="font-semibold text-green-600">￥{formula.cost}</span>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </>}

        {activeTab === 'history' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">服务历史</h2>
              <p className="text-gray-600">完整的服务记录和消费追踪</p>
            </div>

            <div className="space-y-4">
              {serviceHistory.map(history => <Card key={history.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{history.customerName}</h3>
                          <p className="text-sm text-gray-600">{history.service}</p>
                          <p className="text-sm text-gray-600">{history.date} • {history.staff} • {history.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">￥{history.cost}</p>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm">{history.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                    {history.notes && <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">备注：</span> {history.notes}
                        </p>
                      </div>}
                  </CardContent>
                </Card>)}
            </div>
          </>}

        {activeTab === 'analytics' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">客户数据分析</h2>
              <p className="text-gray-600">Insight Agent 智能分析客户行为和趋势</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">客户等级分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">VIP客户</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{
                        width: '35%'
                      }}></div>
                        </div>
                        <span className="text-sm font-semibold">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">普通客户</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: '65%'
                      }}></div>
                        </div>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">满意度分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">4.7</p>
                    <p className="text-gray-600">平均满意度</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>5星</span>
                        <span className="font-semibold">65%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>4星</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>3星及以下</span>
                        <span className="font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">复购分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">68%</p>
                    <p className="text-gray-600">月度复购率</p>
                    <div className="mt-4">
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">较上月提升 15.2%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>智能推荐</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Target className="w-5 h-5 text-purple-600 mr-2" />
                        <h4 className="font-semibold">营销建议</h4>
                      </div>
                      <ul className="text-sm space-y-1">
                        <li>• VIP客户专属优惠活动</li>
                        <li>• 季节性色彩推广方案</li>
                        <li>• 生日月特别折扣</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-semibold">风险提醒</h4>
                      </div>
                      <ul className="text-sm space-y-1">
                        <li>• 3名客户超过30天未访问</li>
                        <li>• 2名客户满意度低于4.0</li>
                        <li>• 建议主动联系关怀</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>}
      </div>
    </div>;
}