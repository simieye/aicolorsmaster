// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, Users, ShoppingCart, TrendingUp, Calendar, MessageSquare, CreditCard, UserCheck, Heart, Crown, BarChart3, Package, DollarSign, Target, Zap, Shield, Database, HeadphonesIcon, Clock, Star, Award, AlertCircle, CheckCircle } from 'lucide-react';

export const StoreManagementEnhanced = ({
  onBack,
  onSettings,
  onAIManagementNavigation
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');

  // AI管理系统数据
  const aiManagementSystems = [{
    id: 'finance-management',
    name: 'AI财务管理系统',
    price: 2680,
    originalPrice: 3680,
    description: '智能财务管理，提升效率',
    features: ['智能记账', '财务报表', '成本分析', '预算管理'],
    icon: CreditCard,
    color: 'from-blue-500 to-cyan-600',
    badge: '热销',
    pageId: 'finance-management',
    status: 'available'
  }, {
    id: 'attendance-management',
    name: 'AI考勤管理系统',
    price: 2680,
    originalPrice: 3680,
    description: '人脸识别打卡，智能考勤',
    features: ['人脸识别', '考勤统计', '异常处理', '排班管理'],
    icon: UserCheck,
    color: 'from-green-500 to-emerald-600',
    badge: '新品',
    pageId: 'attendance-management',
    status: 'available'
  }, {
    id: 'culture-management',
    name: 'AI文化管理系统',
    price: 2680,
    originalPrice: 3680,
    description: '企业文化管理，员工活动',
    features: ['文化展示', '员工活动', '培训管理', '内部通知'],
    icon: Heart,
    color: 'from-purple-500 to-pink-600',
    badge: '推荐',
    pageId: 'corporate-culture',
    status: 'available'
  }, {
    id: 'ceo-management',
    name: 'AI门店店长CEO管理系统',
    price: 19800,
    originalPrice: 29800,
    description: '全方位门店管理，CEO视角',
    features: ['全系统整合', '数据分析', '决策支持', '智能预警'],
    icon: Crown,
    color: 'from-yellow-500 to-orange-600',
    badge: '旗舰',
    pageId: 'store-management-enhanced',
    status: 'active'
  }];

  // 门店管理功能模块
  const managementModules = [{
    id: 'inventory',
    name: '染发膏库存管理',
    description: '实时监控库存，智能补货提醒',
    icon: Package,
    color: 'from-blue-500 to-blue-600',
    stats: {
      total: 156,
      lowStock: 12,
      value: '¥45,680'
    }
  }, {
    id: 'customer-formula',
    name: '客户配方管理',
    description: '个性化配方记录，精准匹配',
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    stats: {
      total: 892,
      new: 45,
      satisfaction: '98.5%'
    }
  }, {
    id: 'member-crm',
    name: '会员管理CRM',
    description: '会员信息管理，精准营销',
    icon: Users,
    color: 'from-green-500 to-green-600',
    stats: {
      total: 2341,
      active: 1856,
      new: 89
    }
  }, {
    id: 'employee',
    name: '员工管理',
    description: '员工档案，绩效管理',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    stats: {
      total: 24,
      active: 22,
      training: 8
    }
  }, {
    id: 'hairstylist',
    name: '发型师管理',
    description: '发型师档案，作品展示',
    icon: Star,
    color: 'from-pink-500 to-pink-600',
    stats: {
      total: 18,
      rating: 4.8,
      appointments: 1256
    }
  }, {
    id: 'community',
    name: '社区管理',
    description: '用户互动，内容管理',
    icon: MessageSquare,
    color: 'from-indigo-500 to-indigo-600',
    stats: {
      posts: 1456,
      users: 892,
      engagement: '76%'
    }
  }, {
    id: 'customer-service',
    name: '客服系统',
    description: '智能客服，工单管理',
    icon: HeadphonesIcon,
    color: 'from-teal-500 to-teal-600',
    stats: {
      tickets: 234,
      resolved: 198,
      satisfaction: '95%'
    }
  }, {
    id: 'appointment',
    name: '预约系统',
    description: '在线预约，智能排期',
    icon: Calendar,
    color: 'from-red-500 to-red-600',
    stats: {
      total: 567,
      today: 23,
      completion: '92%'
    }
  }];

  // 门店统计数据
  const [storeStats] = useState([{
    title: '今日营业额',
    value: '¥12,580',
    change: '+15.2%',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600'
  }, {
    title: '订单数量',
    value: '89',
    change: '+8.7%',
    icon: ShoppingCart,
    color: 'from-blue-500 to-cyan-600'
  }, {
    title: '活跃会员',
    value: '1,234',
    change: '+12.3%',
    icon: Users,
    color: 'from-purple-500 to-pink-600'
  }, {
    title: '库存预警',
    value: '12',
    change: '-3.2%',
    icon: AlertCircle,
    color: 'from-orange-500 to-red-600'
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理AI管理系统点击
  const handleAIManagementClick = system => {
    if (onAIManagementNavigation) {
      onAIManagementNavigation(system.id, system.name, system.pageId);
    } else {
      toast({
        title: system.name,
        description: `正在打开${system.name}`
      });
    }
  };

  // 处理模块点击
  const handleModuleClick = moduleId => {
    toast({
      title: "功能模块",
      description: `正在打开${moduleId}模块`
    });
  };

  // 渲染AI管理系统卡片
  const renderAIManagementCard = system => {
    const Icon = system.icon;
    const isActive = system.status === 'active';
    return <div key={system.id} className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border ${isActive ? 'border-yellow-400/50' : 'border-white/20'} hover:bg-white/15 transition-all duration-300 cursor-pointer ${isActive ? 'ring-2 ring-yellow-400/30' : ''}`} onClick={() => handleAIManagementClick(system)}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${system.color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            {system.badge && <span className={`${system.badge === '旗舰' ? 'bg-yellow-400 text-yellow-900' : system.badge === '热销' ? 'bg-red-400 text-white' : system.badge === '新品' ? 'bg-green-400 text-white' : 'bg-blue-400 text-white'} px-2 py-1 rounded-full text-xs font-bold`}>
                {system.badge}
              </span>}
            {isActive && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2">{system.name}</h3>
        <p className="text-white/70 text-sm mb-4">{system.description}</p>
        
        <div className="space-y-2 mb-4">
          {system.features.slice(0, 2).map((feature, index) => <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span className="text-white/60 text-xs">{feature}</span>
            </div>)}
          {system.features.length > 2 && <div className="text-white/40 text-xs">
              +{system.features.length - 2} 个功能
            </div>}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-white">¥{system.price.toLocaleString()}</div>
            {system.originalPrice && <div className="text-white/60 text-xs line-through">
                ¥{system.originalPrice.toLocaleString()}
              </div>}
          </div>
          <div className="flex items-center space-x-1">
            {system.originalPrice && <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                省¥{(system.originalPrice - system.price).toLocaleString()}
              </div>}
            {isActive && <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                当前使用
              </span>}
          </div>
        </div>
      </div>;
  };

  // 渲染管理模块卡片
  const renderModuleCard = module => {
    const Icon = module.icon;
    return <div key={module.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer" onClick={() => handleModuleClick(module.id)}>
        <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2">{module.name}</h3>
        <p className="text-white/70 text-sm mb-4">{module.description}</p>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          {Object.entries(module.stats).map(([key, value]) => <div key={key} className="bg-white/10 rounded-lg p-2">
              <div className="text-white font-bold text-sm">{value}</div>
              <div className="text-white/60 text-xs">{key === 'total' ? '总计' : key === 'lowStock' ? '预警' : key === 'value' ? '价值' : key === 'new' ? '新增' : key === 'satisfaction' ? '满意度' : key === 'active' ? '活跃' : key === 'training' ? '培训中' : key === 'rating' ? '评分' : key === 'appointments' ? '预约' : key === 'posts' ? '帖子' : key === 'users' ? '用户' : key === 'engagement' ? '互动率' : key === 'tickets' ? '工单' : key === 'resolved' ? '已解决' : key === 'today' ? '今日' : key === 'completion' ? '完成率' : key}</div>
            </div>)}
        </div>
      </div>;
  };

  // 渲染统计卡片
  const renderStatCard = stat => {
    const Icon = stat.icon;
    return <div key={stat.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
        <div className="text-white/60 text-sm mb-2">{stat.title}</div>
        <div className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {stat.change}
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">AI门店店长CEO管理系统</h1>
              <p className="text-white/60 text-sm">全方位门店管理解决方案</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">系统正常</span>
            </div>
            <Button onClick={onSettings} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      {/* AI管理系统快速入口 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI管理系统</h2>
            <p class="text-white/60">智能化管理工具，提升门店运营效率</p>
          </div>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
            <Crown className="w-4 h-4 mr-2" />
            查看全部
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiManagementSystems.map(renderAIManagementCard)}
        </div>
      </section>

      {/* 门店管理功能模块 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">门店管理功能</h2>
            <p class="text-white/60">核心业务模块，全面管理门店运营</p>
          </div>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
            <Settings className="w-4 h-4 mr-2" />
            模块配置
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managementModules.map(renderModuleCard)}
        </div>
      </section>

      {/* 门店数据统计 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">门店数据统计</h2>
            <p class="text-white/60">实时数据监控，助力经营决策</p>
          </div>
          <div className="flex items-center space-x-2">
            <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-white/50">
              <option value="today">今日</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="year">本年</option>
            </select>
            <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <BarChart3 className="w-4 h-4 mr-2" />
              详细报表
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeStats.map(renderStatCard)}
        </div>
      </section>

      {/* 快速操作 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">快速操作</h2>
            <p class="text-white/60">常用功能快速访问</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 flex-col h-20">
            <Package className="w-6 h-6 mb-2" />
            <span className="text-xs">库存盘点</span>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 flex-col h-20">
            <Users className="w-6 h-6 mb-2" />
            <span className="text-xs">会员管理</span>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 flex-col h-20">
            <Calendar className="w-6 h-6 mb-2" />
            <span className="text-xs">预约管理</span>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 flex-col h-20">
            <DollarSign className="w-6 h-6 mb-2" />
            <span className="text-xs">财务报表</span>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 flex-col h-20">
            <TrendingUp className="w-6 h-6 mb-2" />
            <span className="text-xs">数据分析</span>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 flex-col h-20">
            <Settings className="w-6 h-6 mb-2" />
            <span className="text-xs">系统设置</span>
          </Button>
        </div>
      </section>
    </div>;
};