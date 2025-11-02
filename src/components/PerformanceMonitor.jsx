// @ts-ignore;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Activity, Clock, Zap, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, Download, Settings, Eye, BarChart3, PieChart, Cpu, HardDrive, Wifi, Database } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// @ts-ignore;
import performanceMonitor, { usePerformanceMonitor } from '@/lib/PerformanceMonitor';

// 性能指标卡片组件
const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  threshold
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };
  const getValueColor = () => {
    if (!threshold) return 'text-foreground';
    if (value > threshold.max) return 'text-red-500';
    if (value > threshold.min) return 'text-yellow-500';
    return 'text-green-500';
  };
  return <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 text-${color}-500`} />
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>
        {getTrendIcon()}
      </div>
      <div className={`text-2xl font-bold ${getValueColor()}`}>
        {value}{unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
      </div>
      {trendValue && <div className="text-xs text-muted-foreground mt-1">
          {trendValue}
        </div>}
    </div>;
};

// 性能图表组件
const PerformanceChart = ({
  data,
  type = 'line',
  title,
  height = 300
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>;
      case 'area':
        return <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
          </AreaChart>;
      case 'bar':
        return <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>;
      default:
        return null;
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>;
};

// 性能监控面板组件
export const PerformanceMonitorPanel = ({
  showDetails = false,
  onExport,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [stats, setStats] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [score, setScore] = useState(100);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  // 获取性能数据
  const fetchPerformanceData = useCallback(async () => {
    setRefreshing(true);
    try {
      const performanceStats = performanceMonitor.getStats();
      const performanceMetrics = performanceMonitor.getMetrics();
      const performanceScore = performanceMonitor.getPerformanceScore();
      setStats(performanceStats);
      setMetrics(performanceMetrics);
      setScore(performanceScore);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
      toast({
        title: "获取性能数据失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  }, [toast]);

  // 初始化数据
  useEffect(() => {
    fetchPerformanceData();

    // 监听性能报告事件
    const handlePerformanceReport = event => {
      setStats(event.detail);
    };
    window.addEventListener('performanceReport', handlePerformanceReport);
    return () => {
      window.removeEventListener('performanceReport', handlePerformanceReport);
    };
  }, [fetchPerformanceData]);

  // 刷新数据
  const handleRefresh = useCallback(() => {
    fetchPerformanceData();
  }, [fetchPerformanceData]);

  // 导出数据
  const handleExport = useCallback(() => {
    try {
      const data = performanceMonitor.exportData();
      const blob = new Blob([data], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `performance-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "导出成功",
        description: "性能数据已导出"
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [toast]);

  // 生成图表数据
  const generateChartData = useCallback(() => {
    if (!metrics) return [];
    return Object.entries(metrics).map(([type, metricList]) => ({
      type,
      data: metricList.slice(-10).map((metric, index) => ({
        time: new Date(metric.timestamp).toLocaleTimeString(),
        value: metric.data.duration || metric.data.renderTime || metric.data.usedJSHeapSize || 0
      }))
    }));
  }, [metrics]);
  const chartData = useMemo(() => generateChartData(), [generateChartData]);

  // 性能评分颜色
  const getScoreColor = score => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  // 概览标签页
  const OverviewTab = () => {
    if (!stats) return <div className="text-center py-8">加载中...</div>;
    return <div className="space-y-6">
        {/* 性能评分 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">性能评分</h3>
                <p className="text-sm text-muted-foreground">综合性能表现</p>
              </div>
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 核心指标 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.pageLoad && <MetricCard title="页面加载时间" value={Math.round(stats.pageLoad.pageLoadTime)} unit="ms" icon={Clock} color="blue" threshold={{
          min: 1000,
          max: 3000
        }} />}
          {stats.network && <MetricCard title="网络请求成功率" value={Math.round(stats.network.successRate)} unit="%" icon={Wifi} color="green" threshold={{
          min: 95,
          max: 100
        }} />}
          {stats.longTask && <MetricCard title="长任务阻塞时间" value={Math.round(stats.longTask.totalBlockingTime)} unit="ms" icon={AlertTriangle} color="yellow" threshold={{
          min: 50,
          max: 200
        }} />}
          {stats.memory && <MetricCard title="内存使用率" value={stats.memory.memoryUsagePercent} unit="%" icon={Cpu} color="purple" threshold={{
          min: 40,
          max: 80
        }} />}
        </div>

        {/* 性能趋势图 */}
        {chartData.length > 0 && <div className="grid md:grid-cols-2 gap-6">
            {chartData.slice(0, 2).map((chart, index) => <PerformanceChart key={index} data={chart.data} type="area" title={`${chart.type} 性能趋势`} />)}
          </div>}
      </div>;
  };

  // 详细信息标签页
  const DetailsTab = () => {
    if (!stats) return <div className="text-center py-8">加载中...</div>;
    return <div className="space-y-6">
        {/* 页面加载详情 */}
        {stats.pageLoad && <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>页面加载性能</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">DNS查询时间:</span>
                    <span className="font-medium">{stats.pageLoad.dnsTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TCP连接时间:</span>
                    <span className="font-medium">{stats.pageLoad.tcpTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">请求响应时间:</span>
                    <span className="font-medium">{stats.pageLoad.requestTime}ms</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">DOM解析时间:</span>
                    <span className="font-medium">{stats.pageLoad.domParseTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">首次渲染时间:</span>
                    <span className="font-medium">{Math.round(stats.pageLoad.firstPaintTime)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">内容渲染时间:</span>
                    <span className="font-medium">{Math.round(stats.pageLoad.firstContentfulPaintTime)}ms</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* 网络请求详情 */}
        {stats.network && <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="w-5 h-5" />
                <span>网络请求统计</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">总请求数:</span>
                    <span className="font-medium">{stats.network.totalRequests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">成功率:</span>
                    <span className="font-medium">{Math.round(stats.network.successRate)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">平均响应时间:</span>
                    <span className="font-medium">{Math.round(stats.network.averageResponseTime)}ms</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">失败请求数:</span>
                    <span className="font-medium text-red-500">{stats.network.failedRequests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">慢请求数:</span>
                    <span className="font-medium text-yellow-500">
                      {metrics.network?.filter(m => m.data.duration > 1000).length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* 组件渲染详情 */}
        {stats.component && <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>组件渲染性能</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">总渲染次数:</span>
                    <span className="font-medium">{stats.component.totalRenders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">平均渲染时间:</span>
                    <span className="font-medium">{Math.round(stats.component.averageRenderTime)}ms</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">慢渲染次数:</span>
                    <span className="font-medium text-yellow-500">{stats.component.slowRenders}</span>
                  </div>
                  {stats.component.slowestComponent && <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">最慢组件:</span>
                      <span className="font-medium text-red-500">{stats.component.slowestComponent.componentName}</span>
                    </div>}
                </div>
              </div>
            </CardContent>
          </Card>}
      </div>;
  };
  return <div className="space-y-4">
      {/* 操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
          {onSettings && <Button variant="outline" size="sm" onClick={onSettings}>
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>}
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Activity className="w-4 h-4" />
          <span>实时监控中</span>
        </div>
      </div>

      {/* 标签页 */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {['overview', 'details'].map(tab => <button key={tab} onClick={() => setSelectedTab(tab)} className={`py-2 px-1 border-b-2 font-medium text-sm ${selectedTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              {tab === 'overview' ? '概览' : '详情'}
            </button>)}
        </nav>
      </div>

      {/* 内容区域 */}
      <div className="mt-6">
        {selectedTab === 'overview' && <OverviewTab />}
        {selectedTab === 'details' && <DetailsTab />}
      </div>
    </div>;
};

// 性能监控悬浮窗组件
export const PerformanceMonitorWidget = ({
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(100);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const updateData = () => {
      setScore(performanceMonitor.getPerformanceScore());
      setStats(performanceMonitor.getStats());
    };
    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, []);
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };
  const getScoreColor = score => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return <div className={`fixed ${getPositionClasses()} z-50`}>
      {!isOpen ? <button onClick={() => setIsOpen(true)} className="bg-card border rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">性能</span>
              <div className={`text-lg font-bold ${getScoreColor(score).replace('bg-', 'text-')}`}>
                {score}
              </div>
            </div>
          </div>
        </button> : <div className="bg-card border rounded-lg shadow-xl w-80">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold">性能监控</h3>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              ×
            </button>
          </div>
          <div className="p-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">性能评分</span>
                <span className={`font-bold ${getScoreColor(score).replace('bg-', 'text-')}`}>
                  {score}
                </span>
              </div>
              {stats?.pageLoad && <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">页面加载</span>
                  <span className="font-medium">{Math.round(stats.pageLoad.pageLoadTime)}ms</span>
                </div>}
              {stats?.network && <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">网络成功率</span>
                  <span className="font-medium">{Math.round(stats.network.successRate)}%</span>
                </div>}
              {stats?.memory && <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">内存使用</span>
                  <span className="font-medium">{stats.memory.memoryUsagePercent}%</span>
                </div>}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
            if (window.performanceMonitor) {
              const data = window.performanceMonitor.exportData();
              console.log('Performance Data:', data);
            }
          }}>
                <Eye className="w-4 h-4 mr-2" />
                查看详情
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};
export default PerformanceMonitorPanel;