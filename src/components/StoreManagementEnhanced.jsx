// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, DollarSign, Users, CalendarCheck, Headset, TrendingUp, Fingerprint, Building, Robot, CalendarAlt, PlusCircle, UserPlus, FileInvoice, Bell, Lightbulb, ArrowUp, ArrowDown, CheckCircle, AlertCircle } from 'lucide-react';

export const StoreManagementEnhanced = ({
  onBack,
  onModuleClick,
  onQuickAction
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('finance');
  const [animatedStats, setAnimatedStats] = useState(false);

  // 统计数据
  const [stats] = useState([{
    id: 1,
    title: '今日收入',
    value: 128500,
    icon: DollarSign,
    color: 'bg-blue-500',
    change: '+12.5%',
    changeType: 'positive'
  }, {
    id: 2,
    title: '今日客户',
    value: 156,
    icon: Users,
    color: 'bg-green-500',
    change: '+8.3%',
    changeType: 'positive'
  }, {
    id: 3,
    title: '员工出勤',
    value: 24,
    icon: CalendarCheck,
    color: 'bg-purple-500',
    change: '2人请假',
    changeType: 'neutral'
  }, {
    id: 4,
    title: '客户满意度',
    value: 98.5,
    icon: Headset,
    color: 'bg-orange-500',
    change: '+2.1%',
    changeType: 'positive'
  }]);

  // 功能模块
  const [modules] = useState([{
    id: 1,
    name: 'AI财务管理',
    description: '智能财务分析、成本控制、收入统计',
    icon: TrendingUp,
    color: 'bg-blue-500',
    features: ['实时财务监控', '智能成本分析', '利润预测']
  }, {
    id: 2,
    name: 'AI考勤管理',
    description: '人脸识别打卡、考勤统计、排班管理',
    icon: Fingerprint,
    color: 'bg-green-500',
    features: ['人脸识别打卡', '智能排班', '考勤异常处理']
  }, {
    id: 3,
    name: 'AI企业文化',
    description: '企业文化展示、员工活动、培训管理',
    icon: Building,
    color: 'bg-purple-500',
    features: ['文化活动管理', '员工培训', '内部通知']
  }, {
    id: 4,
    name: 'AI客服系统',
    description: '智能客服机器人、在线咨询、工单管理',
    icon: Robot,
    color: 'bg-orange-500',
    features: ['智能客服机器人', '工单管理', '知识库管理']
  }, {
    id: 5,
    name: 'AI预约系统',
    description: '在线预约、智能排期、客户管理',
    icon: CalendarAlt,
    color: 'bg-cyan-500',
    features: ['智能排期', '客户管理', '服务提醒']
  }]);

  // 成本分析数据
  const [costAnalysis] = useState([{
    name: '人力成本',
    value: 45000,
    percentage: 35,
    color: 'bg-blue-400'
  }, {
    name: '材料成本',
    value: 28000,
    percentage: 22,
    color: 'bg-green-400'
  }, {
    name: '运营成本',
    value: 15000,
    percentage: 12,
    color: 'bg-purple-400'
  }, {
    name: '其他成本',
    value: 8000,
    percentage: 6,
    color: 'bg-orange-400'
  }]);

  // AI财务建议
  const [aiSuggestions] = useState([{
    type: 'opportunity',
    title: '收入增长机会',
    description: '根据历史数据分析，建议增加高端服务项目，预计可提升收入15%',
    icon: ArrowUp,
    iconColor: 'text-green-400'
  }, {
    type: 'optimization',
    title: '成本优化建议',
    description: '材料成本占比偏高，建议优化供应链管理，预计可降低成本8%',
    icon: ArrowDown,
    iconColor: 'text-red-400'
  }]);

  // 快速操作
  const [quickActions] = useState([{
    id: 1,
    name: '新建工单',
    icon: PlusCircle,
    color: 'text-blue-400'
  }, {
    id: 2,
    name: '员工排班',
    icon: UserPlus,
    color: 'text-green-400'
  }, {
    id: 3,
    name: '生成报表',
    icon: FileInvoice,
    color: 'text-purple-400'
  }, {
    id: 4,
    name: '发送通知',
    icon: Bell,
    color: 'text-orange-400'
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理模块点击
  const handleModuleClick = module => {
    if (onModuleClick) {
      onModuleClick(module);
    } else {
      toast({
        title: "模块功能",
        description: `正在打开${module.name}模块`
      });
    }
  };

  // 处理快速操作
  const handleQuickAction = action => {
    if (onQuickAction) {
      onQuickAction(action);
    } else {
      toast({
        title: "快速操作",
        description: `正在执行${action.name}操作`
      });
    }
  };

  // 启动数字动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 渲染统计数据
  const renderStatCard = stat => {
    const Icon = stat.icon;
    return <div key={stat.id} className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">
          {stat.title === '今日收入' ? '¥' : ''}
          {animatedStats ? stat.value.toLocaleString() : '0'}
          {stat.title === '客户满意度' ? '%' : ''}
        </div>
        <div className="text-white/60">{stat.title}</div>
        <div className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-400' : stat.changeType === 'negative' ? 'text-red-400' : 'text-yellow-400'}`}>
          {stat.change}
        </div>
      </div>;
  };

  // 渲染模块卡片
  const renderModuleCard = module => {
    const Icon = module.icon;
    return <div key={module.id} className="module-card bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 cursor-pointer" onClick={() => handleModuleClick(module)}>
        <div className={`w-20 h-20 ${module.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-white font-semibold mb-2">{module.name}</h3>
        <p className="text-white/60 text-sm mb-4">{module.description}</p>
        <div className="space-y-2 text-left">
          {module.features.map((feature, index) => <div key={index} className="flex items-center text-white/80 text-sm">
              <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
              {feature}
            </div>)}
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

      {/* 数据概览 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(renderStatCard)}
      </section>

      {/* 功能模块 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">功能模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {modules.map(renderModuleCard)}
        </div>
      </section>

      {/* 详细功能展示 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">今日重点数据</h2>
          
          {/* 标签切换 */}
          <div className="flex items-center space-x-1 mb-8 bg-white/10 rounded-lg p-1">
            <Button variant={activeTab === 'finance' ? 'default' : 'ghost'} onClick={() => handleTabChange('finance')} className={`flex-1 ${activeTab === 'finance' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
              财务概览
            </Button>
            <Button variant={activeTab === 'attendance' ? 'default' : 'ghost'} onClick={() => handleTabChange('attendance')} className={`flex-1 ${activeTab === 'attendance' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
              考勤状态
            </Button>
            <Button variant={activeTab === 'service' ? 'default' : 'ghost'} onClick={() => handleTabChange('service')} className={`flex-1 ${activeTab === 'service' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
              客服工单
            </Button>
            <Button variant={activeTab === 'appointment' ? 'default' : 'ghost'} onClick={() => handleTabChange('appointment')} className={`flex-1 ${activeTab === 'appointment' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
              预约情况
            </Button>
          </div>

          {/* 财务概览内容 */}
          {activeTab === 'finance' && <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 收入趋势 */}
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">本周收入趋势</h3>
                  <div className="chart-container bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-white/60">收入趋势图表</p>
                    </div>
                  </div>
                </div>

                {/* 成本分析 */}
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">成本分析</h3>
                  <div className="space-y-4">
                    {costAnalysis.map((cost, index) => <div key={index}>
                        <div className="flex justify-between text-white mb-2">
                          <span>{cost.name}</span>
                          <span>¥{cost.value.toLocaleString()}</span>
                        </div>
                        <div className="bg-white/20 rounded-full h-2">
                          <div className={`${cost.color} h-2 rounded-full`} style={{
                      width: `${cost.percentage}%`
                    }}></div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>

              {/* AI财务建议 */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">AI财务建议</h3>
                </div>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return <div key={index} className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 mt-1 ${suggestion.iconColor}`} />
                      <div>
                        <p className="text-white font-medium">{suggestion.title}</p>
                        <p className="text-white/60 text-sm">{suggestion.description}</p>
                      </div>
                    </div>;
              })}
                </div>
              </div>
            </div>}

          {/* 其他标签内容占位 */}
          {activeTab !== 'finance' && <div className="bg-white/10 rounded-xl p-12 text-center">
              <div className="text-white/60">
                <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">该功能模块正在开发中</p>
                <p className="text-sm mt-2">敬请期待更多精彩功能</p>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">快速操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(action => {
          const Icon = action.icon;
          return <Button key={action.id} variant="ghost" onClick={() => handleQuickAction(action)} className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left justify-start h-auto">
              <Icon className={`${action.color} text-xl mb-2`} />
              <p className="text-white font-medium">{action.name}</p>
            </Button>;
        })}
        </div>
      </section>
    </div>;
};