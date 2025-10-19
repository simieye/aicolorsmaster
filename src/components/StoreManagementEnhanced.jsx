// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, Users, Calendar as CalendarIcon, DollarSign, TrendingUp, Package, MessageSquare, UserCheck, Heart, HeadphonesIcon, Crown, ChevronRight, BarChart3, Target, Award, Lightbulb, Clock, FileText, ShoppingCart, Star, AlertCircle, CheckCircle } from 'lucide-react';

export const StoreManagementEnhanced = ({
  onBack,
  onNavigateToSystem
}) => {
  const {
    toast
  } = useToast();
  const [activeModule, setActiveModule] = useState('overview');

  // AI系统模块数据
  const [aiSystems] = useState([{
    id: 'finance-management',
    name: 'AI财务管理系统',
    price: 2680,
    icon: DollarSign,
    color: 'bg-green-500',
    description: '智能财务管理，自动化报表生成',
    features: ['财务报表', '成本分析', '预算管理', '税务计算'],
    status: 'active',
    category: 'core'
  }, {
    id: 'attendance-management',
    name: 'AI考勤管理系统',
    price: 2680,
    icon: UserCheck,
    color: 'bg-blue-500',
    description: '人脸识别考勤，智能排班管理',
    features: ['人脸识别', '考勤统计', '异常处理', '排班管理'],
    status: 'active',
    category: 'core'
  }, {
    id: 'corporate-culture',
    name: 'AI文化管理系统',
    price: 2680,
    icon: Heart,
    color: 'bg-purple-500',
    description: '企业文化展示，员工活动管理',
    features: ['文化展示', '员工活动', '培训管理', '内部通知'],
    status: 'active',
    category: 'core'
  }, {
    id: 'ceo-management',
    name: 'AI门店店长CEO管理系统',
    price: 19800,
    icon: Crown,
    color: 'bg-yellow-500',
    description: '全店智能管理，决策支持系统',
    features: ['AI财务管理系统', 'AI考勤管理系统', 'AI文化管理系统', 'AI染发膏库存管理系统', 'AI客户配方管理系统', 'AI客户（会员）管理系统CRM', 'AI员工管理系统', 'AI发型师管理系统', 'AI社区管理系统', 'AI客服系统', 'AI客户预约系统'],
    status: 'premium',
    category: 'premium'
  }, {
    id: 'inventory-management',
    name: 'AI染发膏库存管理系统',
    price: 1680,
    icon: Package,
    color: 'bg-orange-500',
    description: '智能库存管理，自动补货提醒',
    features: ['库存管理', '批次追踪', '过期提醒', '数据分析'],
    status: 'active',
    category: 'inventory'
  }, {
    id: 'formula-management',
    name: 'AI客户配方管理系统',
    price: 2680,
    icon: FileText,
    color: 'bg-indigo-500',
    description: '客户染发配方管理，个性化推荐',
    features: ['配方管理', '客户档案', '历史记录', '个性化推荐'],
    status: 'active',
    category: 'customer'
  }, {
    id: 'crm-system',
    name: 'AI客户（会员）管理系统CRM',
    price: 6800,
    icon: Users,
    color: 'bg-pink-500',
    description: '客户关系管理，营销自动化',
    features: ['客户管理', '营销自动化', '数据分析', '会员管理'],
    status: 'active',
    category: 'customer'
  }, {
    id: 'employee-management',
    name: 'AI员工管理系统',
    price: 3680,
    icon: Users,
    color: 'bg-teal-500',
    description: '员工信息管理，绩效考核',
    features: ['员工档案', '绩效考核', '培训管理', '薪酬管理'],
    status: 'active',
    category: 'hr'
  }, {
    id: 'stylist-management',
    name: 'AI发型师管理系统',
    price: 2680,
    icon: Star,
    color: 'bg-cyan-500',
    description: '发型师技能管理，作品展示',
    features: ['技能档案', '作品展示', '客户评价', '排班管理'],
    status: 'active',
    category: 'hr'
  }, {
    id: 'community-management',
    name: 'AI社区管理系统',
    price: 1680,
    icon: MessageSquare,
    color: 'bg-lime-500',
    description: '社区互动管理，内容审核',
    features: ['内容管理', '用户互动', '活动组织', '数据分析'],
    status: 'active',
    category: 'community'
  }, {
    id: 'customer-service',
    name: 'AI客服系统',
    price: 0,
    icon: HeadphonesIcon,
    color: 'bg-red-500',
    description: '智能客服机器人，在线咨询',
    features: ['智能客服', '在线咨询', '工单管理', '知识库'],
    status: 'coming-soon',
    category: 'service'
  }, {
    id: 'appointment-system',
    name: 'AI客户预约系统',
    price: 0,
    icon: CalendarIcon,
    color: 'bg-violet-500',
    description: '在线预约，智能排期管理',
    features: ['在线预约', '智能排期', '客户管理', '服务提醒'],
    status: 'coming-soon',
    category: 'service'
  }]);

  // 系统统计数据
  const [systemStats] = useState({
    totalSystems: 12,
    activeSystems: 10,
    comingSoon: 2,
    totalValue: 51880,
    coreSystems: 3,
    premiumSystems: 1
  });

  // 处理系统导航
  const handleSystemNavigation = systemId => {
    if (onNavigateToSystem) {
      onNavigateToSystem(systemId);
    } else {
      toast({
        title: "系统导航",
        description: `正在打开${systemId}系统`
      });
    }
  };

  // 处理模块切换
  const handleModuleChange = moduleId => {
    setActiveModule(moduleId);
  };

  // 渲染系统卡片
  const renderSystemCard = system => {
    const Icon = system.icon;
    return <Card key={system.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${system.color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              {system.status === 'active' && <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                  已激活
                </span>}
              {system.status === 'coming-soon' && <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                  即将上线
                </span>}
              {system.status === 'premium' && <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                  高级版
                </span>}
            </div>
          </div>
          
          <h3 className="text-white font-semibold text-lg mb-2">{system.name}</h3>
          <p className="text-white/60 text-sm mb-4">{system.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {system.features.slice(0, 3).map((feature, index) => <span key={index} className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                {feature}
              </span>)}
            {system.features.length > 3 && <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                +{system.features.length - 3}
              </span>}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-white">
              {system.price > 0 ? `¥${system.price.toLocaleString()}` : '定制价格'}
            </div>
            <Button onClick={() => handleSystemNavigation(system.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm group-hover:bg-blue-600 transition-colors">
              {system.status === 'coming-soon' ? '了解详情' : '进入系统'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染统计卡片
  const renderStatCard = (title, value, icon, color) => {
    const Icon = icon;
    return <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-white/60 text-sm">{title}</div>
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
            <h1 className="text-xl font-semibold text-white">AI门店管理系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">系统正常</span>
            </div>
            <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      {/* 系统概览 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {renderStatCard('总系统数', systemStats.totalSystems, Package, 'bg-blue-500')}
        {renderStatCard('已激活', systemStats.activeSystems, CheckCircle, 'bg-green-500')}
        {renderStatCard('即将上线', systemStats.comingSoon, AlertCircle, 'bg-yellow-500')}
        {renderStatCard('总价值', `¥${systemStats.totalValue.toLocaleString()}`, DollarSign, 'bg-purple-500')}
        {renderStatCard('核心系统', systemStats.coreSystems, Target, 'bg-orange-500')}
        {renderStatCard('高级版', systemStats.premiumSystems, Crown, 'bg-red-500')}
      </div>

      {/* 核心AI系统 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">核心AI系统</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            查看全部
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSystems.filter(system => system.category === 'core' || system.category === 'premium').map(renderSystemCard)}
        </div>
      </div>

      {/* 业务管理系统 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">业务管理系统</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            查看全部
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSystems.filter(system => ['inventory', 'customer'].includes(system.category)).map(renderSystemCard)}
        </div>
      </div>

      {/* 人力资源系统 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">人力资源系统</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            查看全部
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSystems.filter(system => system.category === 'hr').map(renderSystemCard)}
        </div>
      </div>

      {/* 服务支持系统 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">服务支持系统</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            查看全部
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSystems.filter(system => ['community', 'service'].includes(system.category)).map(renderSystemCard)}
        </div>
      </div>
    </div>;
};