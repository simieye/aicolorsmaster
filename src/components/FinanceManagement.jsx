// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Download, Settings, DollarSign, CreditCard, TrendingUp, Percent, ChartPie, Coins, ShoppingCart, Lightbulb, FileAlt, PlusCircle, MinusCircle, FileInvoice, Calculator, ArrowTrendUp, ArrowTrendDown, CheckCircle, AlertTriangle } from 'lucide-react';

export const FinanceManagement = ({
  onBack,
  onExportReport,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedStats, setAnimatedStats] = useState(false);

  // 财务统计数据
  const [financeStats] = useState([{
    id: 1,
    title: '本月收入',
    value: 458600,
    icon: DollarSign,
    color: 'bg-green-500',
    change: '+15.3%',
    changeType: 'positive'
  }, {
    id: 2,
    title: '本月支出',
    value: 186400,
    icon: CreditCard,
    color: 'bg-red-500',
    change: '+8.7%',
    changeType: 'negative'
  }, {
    id: 3,
    title: '净利润',
    value: 272200,
    icon: TrendingUp,
    color: 'bg-blue-500',
    change: '+22.1%',
    changeType: 'positive'
  }, {
    id: 4,
    title: '利润率',
    value: 59.4,
    icon: Percent,
    color: 'bg-purple-500',
    change: '+3.2%',
    changeType: 'positive'
  }]);

  // 收入来源数据
  const [incomeSources] = useState([{
    name: '染发服务',
    value: 186500,
    percentage: 40,
    color: 'bg-blue-400'
  }, {
    name: '剪发造型',
    value: 124300,
    percentage: 27,
    color: 'bg-green-400'
  }, {
    name: '护理服务',
    value: 87200,
    percentage: 19,
    color: 'bg-purple-400'
  }, {
    name: '产品销售',
    value: 60600,
    percentage: 14,
    color: 'bg-orange-400'
  }]);

  // 支付方式数据
  const [paymentMethods] = useState([{
    name: '微信支付',
    value: 234200,
    percentage: 51,
    color: 'bg-green-400'
  }, {
    name: '支付宝',
    value: 156800,
    percentage: 34,
    color: 'bg-blue-400'
  }, {
    name: '银行卡',
    value: 45600,
    percentage: 10,
    color: 'bg-purple-400'
  }, {
    name: '现金',
    value: 22000,
    percentage: 5,
    color: 'bg-orange-400'
  }]);

  // AI建议数据
  const [aiSuggestions] = useState([{
    type: 'growth',
    title: '收入增长建议',
    icon: ArrowTrendUp,
    iconColor: 'text-green-500',
    bgColor: 'from-green-500/20 to-blue-500/20',
    borderColor: 'border-green-400/30',
    suggestions: [{
      title: '增加高端染发服务',
      description: '基于客户消费分析，建议增加高端染发项目，预计月增收¥15,000',
      icon: CheckCircle,
      iconColor: 'text-green-400'
    }, {
      title: '优化会员套餐',
      description: '调整会员价格体系，预计可提升客单价8%',
      icon: CheckCircle,
      iconColor: 'text-green-400'
    }]
  }, {
    type: 'cost',
    title: '成本控制建议',
    icon: ArrowTrendDown,
    iconColor: 'text-red-500',
    bgColor: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-400/30',
    suggestions: [{
      title: '染发膏采购优化',
      description: '当前染发膏成本偏高，建议更换供应商，预计月节省¥8,000',
      icon: AlertTriangle,
      iconColor: 'text-yellow-400'
    }, {
      title: '能耗管理',
      description: '优化设备使用时间，预计可降低电费12%',
      icon: AlertTriangle,
      iconColor: 'text-yellow-400'
    }]
  }]);

  // 快速操作
  const [quickActions] = useState([{
    id: 1,
    name: '录入收入',
    icon: PlusCircle,
    color: 'text-blue-400'
  }, {
    id: 2,
    name: '录入支出',
    icon: MinusCircle,
    color: 'text-red-400'
  }, {
    id: 3,
    name: '生成报表',
    icon: FileInvoice,
    color: 'text-purple-400'
  }, {
    id: 4,
    name: '成本分析',
    icon: Calculator,
    color: 'text-green-400'
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理快速操作
  const handleQuickAction = action => {
    toast({
      title: "快速操作",
      description: `正在执行${action.name}操作`
    });
  };

  // 启动数字动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 渲染统计卡片
  const renderStatCard = stat => {
    const Icon = stat.icon;
    return <div key={stat.id} className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">
          {stat.title === '本月收入' || stat.title === '本月支出' || stat.title === '净利润' ? '¥' : ''}
          {animatedStats ? stat.value.toLocaleString() : '0'}
          {stat.title === '利润率' ? '%' : ''}
        </div>
        <div className="text-white/60">{stat.title}</div>
        <div className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {stat.change}
        </div>
      </div>;
  };

  // 渲染进度条
  const renderProgressBar = (percentage, color) => {
    return <div className="bg-white/20 rounded-full h-2">
        <div className={`${color} h-2 rounded-full progress-bar`} style={{
        width: `${percentage}%`
      }}></div>
      </div>;
  };

  // 渲染AI建议卡片
  const renderSuggestionCard = suggestion => {
    const Icon = suggestion.icon;
    return <div key={suggestion.type} className={`suggestion-card bg-gradient-to-r ${suggestion.bgColor} rounded-xl p-6 border ${suggestion.borderColor} hover:translate-x-1 transition-all duration-300`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 ${suggestion.iconColor === 'text-green-500' ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-semibold">{suggestion.title}</h3>
        </div>
        <div className="space-y-3">
          {suggestion.suggestions.map((item, index) => {
          const ItemIcon = item.icon;
          return <div key={index} className="flex items-start space-x-3">
              <ItemIcon className={`w-5 h-5 mt-1 ${item.iconColor}`} />
              <div>
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            </div>;
        })}
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
            <h1 className="text-xl font-semibold text-white">AI财务管理</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onExportReport} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Download className="w-4 h-4 mr-2" />
              导出报表
            </Button>
            <Button onClick={onSettings} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      {/* 财务概览 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financeStats.map(renderStatCard)}
      </section>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'overview' ? 'default' : 'ghost'} onClick={() => handleTabChange('overview')} className={`flex-1 ${activeTab === 'overview' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <ChartPie className="w-4 h-4 mr-2" />
          财务概览
        </Button>
        <Button variant={activeTab === 'income' ? 'default' : 'ghost'} onClick={() => handleTabChange('income')} className={`flex-1 ${activeTab === 'income' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Coins className="w-4 h-4 mr-2" />
          收入分析
        </Button>
        <Button variant={activeTab === 'cost' ? 'default' : 'ghost'} onClick={() => handleTabChange('cost')} className={`flex-1 ${activeTab === 'cost' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          成本管理
        </Button>
        <Button variant={activeTab === 'ai' ? 'default' : 'ghost'} onClick={() => handleTabChange('ai')} className={`flex-1 ${activeTab === 'ai' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Lightbulb className="w-4 h-4 mr-2" />
          AI建议
        </Button>
        <Button variant={activeTab === 'reports' ? 'default' : 'ghost'} onClick={() => handleTabChange('reports')} className={`flex-1 ${activeTab === 'reports' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <FileAlt className="w-4 h-4 mr-2" />
          报表中心
        </Button>
      </div>

      {/* 财务概览内容 */}
      {activeTab === 'overview' && <div className="space-y-8">
          {/* 收入趋势图 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">收入趋势分析</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="chart-container bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                      <p className="text-white/60">收入趋势图表</p>
                      <p className="text-white/40 text-sm mt-2">显示最近6个月的收入变化趋势</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60">日均收入</span>
                      <span className="text-white font-bold">¥15,287</span>
                    </div>
                    <div className="text-green-400 text-sm">+12.5% vs 上月</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60">最高单日</span>
                      <span className="text-white font-bold">¥28,450</span>
                    </div>
                    <div className="text-white/40 text-sm">2024-01-15</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60">预测下月</span>
                      <span className="text-white font-bold">¥485,000</span>
                    </div>
                    <div className="text-blue-400 text-sm">AI预测</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 收入来源分析 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">收入来源分析</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">服务项目收入</h3>
                  <div className="space-y-3">
                    {incomeSources.map((source, index) => <div key={index}>
                        <div className="flex justify-between text-white mb-2">
                          <span>{source.name}</span>
                          <span>¥{source.value.toLocaleString()}</span>
                        </div>
                        {renderProgressBar(source.percentage, source.color)}
                      </div>)}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">支付方式分析</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method, index) => <div key={index}>
                        <div className="flex justify-between text-white mb-2">
                          <span>{method.name}</span>
                          <span>¥{method.value.toLocaleString()}</span>
                        </div>
                        {renderProgressBar(method.percentage, method.color)}
                      </div>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI财务建议 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">AI财务建议</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiSuggestions.map(renderSuggestionCard)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 其他标签内容占位 */}
      {activeTab !== 'overview' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-12 text-center">
            <div className="text-white/60">
              <Lightbulb className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">该功能模块正在开发中</p>
              <p className="text-sm mt-2">敬请期待更多精彩功能</p>
            </div>
          </CardContent>
        </Card>}

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