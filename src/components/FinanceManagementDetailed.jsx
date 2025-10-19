// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, ExchangeAlt, ChartBar, Analytics, Calculator, Bell, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

// 导入子组件
// @ts-ignore;
import { FinanceOverview } from './finance/FinanceOverview';
// @ts-ignore;
import { IncomeExpenseManagement } from './finance/IncomeExpenseManagement';
// @ts-ignore;
import { FinancialReports } from './finance/FinancialReports';
// @ts-ignore;
import { CostAnalysis } from './finance/CostAnalysis';
// @ts-ignore;
import { BudgetManagement } from './finance/BudgetManagement';
// @ts-ignore;
import { FinancialAlerts } from './finance/FinancialAlerts';
export const FinanceManagementDetailed = ({
  onBack,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('income-expense');

  // 财务统计数据
  const [financeStats] = useState([{
    id: 1,
    title: '本月收入',
    value: 128500,
    icon: TrendingUp,
    color: 'bg-green-500',
    change: '+15.2%',
    changeColor: 'text-green-400'
  }, {
    id: 2,
    title: '本月支出',
    value: 86300,
    icon: TrendingDown,
    color: 'bg-red-500',
    change: '+8.5%',
    changeColor: 'text-red-400'
  }, {
    id: 3,
    title: '净利润',
    value: 42200,
    icon: ChartBar,
    color: 'bg-blue-500',
    change: '+28.3%',
    changeColor: 'text-green-400'
  }, {
    id: 4,
    title: '账户余额',
    value: 358600,
    icon: Wallet,
    color: 'bg-purple-500',
    change: '+12.8%',
    changeColor: 'text-green-400'
  }]);

  // 收支记录数据
  const [incomeRecords] = useState([{
    id: 1,
    title: '美发服务收入',
    amount: 2800,
    category: '服务收入',
    time: '2024-01-15 14:30',
    icon: TrendingUp,
    color: 'bg-green-500'
  }, {
    id: 2,
    title: '产品销售',
    amount: 1200,
    category: '产品收入',
    time: '2024-01-15 10:15',
    icon: TrendingUp,
    color: 'bg-green-500'
  }, {
    id: 3,
    title: '会员充值',
    amount: 5000,
    category: '会员收入',
    time: '2024-01-14 16:45',
    icon: TrendingUp,
    color: 'bg-green-500'
  }]);
  const [expenseRecords] = useState([{
    id: 1,
    title: '染发膏采购',
    amount: 3500,
    category: '采购支出',
    time: '2024-01-15 09:20',
    icon: TrendingDown,
    color: 'bg-red-500'
  }, {
    id: 2,
    title: '员工工资',
    amount: 25000,
    category: '人力成本',
    time: '2024-01-10 10:00',
    icon: TrendingDown,
    color: 'bg-red-500'
  }, {
    id: 3,
    title: '店面租金',
    amount: 12000,
    category: '固定支出',
    time: '2024-01-05 14:00',
    icon: TrendingDown,
    color: 'bg-red-500'
  }]);

  // 收支分类统计
  const [incomeCategories] = useState([{
    name: '美发服务',
    amount: 83525,
    percentage: 65
  }, {
    name: '产品销售',
    amount: 32125,
    percentage: 25
  }, {
    name: '会员充值',
    amount: 12850,
    percentage: 10
  }]);
  const [expenseCategories] = useState([{
    name: '人力成本',
    amount: 38835,
    percentage: 45
  }, {
    name: '产品采购',
    amount: 25890,
    percentage: 30
  }, {
    name: '固定支出',
    amount: 21575,
    percentage: 25
  }]);

  // 财务报表数据
  const [financialReports] = useState([{
    id: 1,
    title: '利润表',
    description: '展示收入、成本和利润情况',
    icon: ChartBar,
    color: 'bg-blue-500'
  }, {
    id: 2,
    title: '资产负债表',
    description: '展示资产、负债和所有者权益',
    icon: Calculator,
    color: 'bg-green-500'
  }, {
    id: 3,
    title: '现金流量表',
    description: '展示现金流入和流出情况',
    icon: Wallet,
    color: 'bg-purple-500'
  }]);

  // 利润表数据
  const [profitStatement] = useState([{
    item: '营业收入',
    currentMonth: 128500,
    lastMonth: 111600,
    growth: '+15.2%',
    growthColor: 'text-green-400'
  }, {
    item: '营业成本',
    currentMonth: 64250,
    lastMonth: 58900,
    growth: '+9.1%',
    growthColor: 'text-red-400'
  }, {
    item: '毛利润',
    currentMonth: 64250,
    lastMonth: 52700,
    growth: '+21.9%',
    growthColor: 'text-green-400'
  }, {
    item: '营业费用',
    currentMonth: 22050,
    lastMonth: 19800,
    growth: '+11.4%',
    growthColor: 'text-red-400'
  }, {
    item: '净利润',
    currentMonth: 42200,
    lastMonth: 32900,
    growth: '+28.3%',
    growthColor: 'text-green-400'
  }]);

  // 成本结构数据
  const [costStructure] = useState([{
    name: '人力成本',
    percentage: 45,
    color: 'bg-blue-400'
  }, {
    name: '产品成本',
    percentage: 30,
    color: 'bg-green-400'
  }, {
    name: '固定成本',
    percentage: 25,
    color: 'bg-purple-400'
  }]);

  // 成本对比数据
  const [costComparison] = useState({
    currentMonth: 86300,
    lastMonth: 79550,
    growth: 8.5,
    costRate: 67.2
  });

  // 预算数据
  const [budgetData] = useState([{
    title: '年度预算',
    total: 1200000,
    used: 780000,
    remaining: 420000,
    percentage: 65,
    color: 'bg-blue-400'
  }, {
    title: '月度预算',
    total: 100000,
    used: 86000,
    remaining: 14000,
    percentage: 86,
    color: 'bg-yellow-400'
  }, {
    title: '项目预算',
    total: 50000,
    used: 21000,
    remaining: 29000,
    percentage: 42,
    color: 'bg-green-400'
  }]);

  // 预算执行情况
  const [budgetExecution] = useState([{
    item: '人力成本',
    budget: 40000,
    actual: 38835,
    percentage: 97.1,
    status: '正常'
  }, {
    item: '产品采购',
    budget: 30000,
    actual: 25890,
    percentage: 86.3,
    status: '正常'
  }, {
    item: '营销费用',
    budget: 15000,
    actual: 16200,
    percentage: 108.0,
    status: '超支'
  }, {
    item: '运营费用',
    budget: 15000,
    actual: 5375,
    percentage: 35.8,
    status: '节约'
  }]);

  // 财务预警数据
  const [financialAlerts] = useState([{
    id: 1,
    title: '营销费用超支预警',
    description: '本月营销费用已超出预算8%，建议控制支出',
    time: '2024-01-15 10:30',
    level: 'high',
    levelColor: 'bg-red-500/20 border-red-400/30',
    levelText: '高风险',
    levelTextColor: 'bg-red-500/20 text-red-300',
    icon: AlertTriangle
  }, {
    id: 2,
    title: '现金流预警',
    description: '预计下月现金流可能紧张，建议提前准备',
    time: '2024-01-14 15:20',
    level: 'medium',
    levelColor: 'bg-yellow-500/20 border-yellow-400/30',
    levelText: '中风险',
    levelTextColor: 'bg-yellow-500/20 text-yellow-300',
    icon: AlertCircle
  }, {
    id: 3,
    title: '成本增长提醒',
    description: '本月成本同比增长8.5%，建议关注成本控制',
    time: '2024-01-13 09:15',
    level: 'low',
    levelColor: 'bg-blue-500/20 border-blue-400/30',
    levelText: '低风险',
    levelTextColor: 'bg-blue-500/20 text-blue-300',
    icon: Info
  }]);

  // 预警统计
  const [alertStats] = useState({
    high: 1,
    medium: 1,
    low: 1,
    total: 3
  });

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">AI财务管理系统</h1>
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

      {/* 财务概览 */}
      <FinanceOverview stats={financeStats} />

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'income-expense' ? 'default' : 'ghost'} onClick={() => handleTabChange('income-expense')} className={`flex-1 ${activeTab === 'income-expense' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <ExchangeAlt className="w-4 h-4 mr-2" />
          收支管理
        </Button>
        <Button variant={activeTab === 'reports' ? 'default' : 'ghost'} onClick={() => handleTabChange('reports')} className={`flex-1 ${activeTab === 'reports' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <ChartBar className="w-4 h-4 mr-2" />
          财务报表
        </Button>
        <Button variant={activeTab === 'cost-analysis' ? 'default' : 'ghost'} onClick={() => handleTabChange('cost-analysis')} className={`flex-1 ${activeTab === 'cost-analysis' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Analytics className="w-4 h-4 mr-2" />
          成本分析
        </Button>
        <Button variant={activeTab === 'budget' ? 'default' : 'ghost'} onClick={() => handleTabChange('budget')} className={`flex-1 ${activeTab === 'budget' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Calculator className="w-4 h-4 mr-2" />
          预算管理
        </Button>
        <Button variant={activeTab === 'alerts' ? 'default' : 'ghost'} onClick={() => handleTabChange('alerts')} className={`flex-1 ${activeTab === 'alerts' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Bell className="w-4 h-4 mr-2" />
          财务预警
        </Button>
      </div>

      {/* 标签内容 */}
      {activeTab === 'income-expense' && <IncomeExpenseManagement incomeRecords={incomeRecords} expenseRecords={expenseRecords} incomeCategories={incomeCategories} expenseCategories={expenseCategories} />}
      
      {activeTab === 'reports' && <FinancialReports financialReports={financialReports} profitStatement={profitStatement} />}
      
      {activeTab === 'cost-analysis' && <CostAnalysis costStructure={costStructure} costComparison={costComparison} />}
      
      {activeTab === 'budget' && <BudgetManagement budgetData={budgetData} budgetExecution={budgetExecution} />}
      
      {activeTab === 'alerts' && <FinancialAlerts alertStats={alertStats} financialAlerts={financialAlerts} />}
    </div>;
};