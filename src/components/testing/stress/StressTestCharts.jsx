// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TrendingUp, Activity, Zap } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
// @ts-ignore;

export function StressTestCharts({
  metrics,
  testHistory
}) {
  const [selectedMetric, setSelectedMetric] = useState('responseTime');
  const [timeRange, setTimeRange] = useState('1h');

  // 生成模拟的时序数据
  const generateTimeSeriesData = () => {
    const data = [];
    const now = Date.now();
    for (let i = 59; i >= 0; i--) {
      const timestamp = now - i * 1000;
      data.push({
        time: new Date(timestamp).toLocaleTimeString(),
        timestamp,
        responseTime: 50 + Math.random() * 150 + Math.sin(i / 10) * 50,
        rps: 5 + Math.random() * 10 + Math.cos(i / 8) * 3,
        errorRate: Math.random() * 2,
        cpuUsage: 20 + Math.random() * 30 + Math.sin(i / 15) * 10,
        memoryUsage: 30 + Math.random() * 20 + Math.cos(i / 12) * 8,
        activeUsers: Math.max(0, 50 + Math.sin(i / 20) * 30 + Math.random() * 10)
      });
    }
    return data;
  };
  const timeSeriesData = generateTimeSeriesData();
  const metricConfigs = {
    responseTime: {
      name: '响应时间',
      unit: 'ms',
      color: '#3b82f6',
      icon: <Activity className="w-4 h-4" />
    },
    rps: {
      name: '每秒请求数',
      unit: 'req/s',
      color: '#10b981',
      icon: <Zap className="w-4 h-4" />
    },
    errorRate: {
      name: '错误率',
      unit: '%',
      color: '#ef4444',
      icon: <TrendingUp className="w-4 h-4" />
    },
    cpuUsage: {
      name: 'CPU使用率',
      unit: '%',
      color: '#f59e0b',
      icon: <BarChart3 className="w-4 h-4" />
    },
    memoryUsage: {
      name: '内存使用率',
      unit: '%',
      color: '#8b5cf6',
      icon: <BarChart3 className="w-4 h-4" />
    },
    activeUsers: {
      name: '活跃用户',
      unit: '人',
      color: '#06b6d4',
      icon: <Activity className="w-4 h-4" />
    }
  };
  const currentMetricConfig = metricConfigs[selectedMetric];

  // 生成历史对比数据
  const generateHistoryComparisonData = () => {
    return testHistory.slice(-5).map((test, index) => ({
      name: `测试${index + 1}`,
      timestamp: test.timestamp,
      avgResponseTime: test.metrics.averageResponseTime,
      maxResponseTime: test.metrics.averageResponseTime * 1.5,
      errorRate: test.metrics.errorRate,
      throughput: test.metrics.totalRequests / (test.duration / 1000),
      // RPS
      cpuUsage: test.metrics.cpuUsage,
      memoryUsage: test.metrics.memoryUsage
    }));
  };
  const historyData = generateHistoryComparisonData();
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (active && payload && payload.length) {
      return <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry, index) => <p key={index} className="text-sm" style={{
          color: entry.color
        }}>
              {entry.name}: {entry.value.toFixed(2)}{currentMetricConfig.unit}
            </p>)}
        </div>;
    }
    return null;
  };
  return <div className="space-y-6">
      {/* 实时性能图表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              实时性能监控
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(metricConfigs).map(([key, config]) => <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {config.icon}
                        {config.name}
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1分钟</SelectItem>
                  <SelectItem value="5m">5分钟</SelectItem>
                  <SelectItem value="1h">1小时</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" tick={{
                fontSize: 12
              }} interval="preserveStartEnd" />
                <YAxis tick={{
                fontSize: 12
              }} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey={selectedMetric} stroke={currentMetricConfig.color} fill={currentMetricConfig.color} fillOpacity={0.3} strokeWidth={2} name={currentMetricConfig.name} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* 当前值显示 */}
          <div className="mt-4 flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              {currentMetricConfig.icon}
              <span className="text-sm font-medium">当前{currentMetricConfig.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold" style={{
              color: currentMetricConfig.color
            }}>
                {metrics[selectedMetric]?.toFixed(1) || '0'}
              </span>
              <span className="text-sm text-muted-foreground">{currentMetricConfig.unit}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 历史测试对比 */}
      {testHistory.length > 0 && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              历史测试对比
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{
                fontSize: 12
              }} />
                  <YAxis tick={{
                fontSize: 12
              }} />
                  <Tooltip content={({
                active,
                payload,
                label
              }) => {
                if (active && payload && payload.length) {
                  return <div className="bg-background border rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-medium mb-2">{label}</p>
                            {payload.map((entry, index) => <p key={index} className="text-sm" style={{
                      color: entry.color
                    }}>
                                {entry.name}: {entry.value.toFixed(2)}
                                {entry.dataKey === 'avgResponseTime' ? 'ms' : entry.dataKey === 'errorRate' || entry.dataKey === 'cpuUsage' || entry.dataKey === 'memoryUsage' ? '%' : entry.dataKey === 'throughput' ? 'req/s' : ''}
                              </p>)}
                          </div>;
                }
                return null;
              }} />
                  <Line type="monotone" dataKey="avgResponseTime" stroke="#3b82f6" strokeWidth={2} name="平均响应时间" dot={{
                fill: '#3b82f6',
                r: 4
              }} />
                  <Line type="monotone" dataKey="errorRate" stroke="#ef4444" strokeWidth={2} name="错误率" dot={{
                fill: '#ef4444',
                r: 4
              }} />
                  <Line type="monotone" dataKey="throughput" stroke="#10b981" strokeWidth={2} name="吞吐量" dot={{
                fill: '#10b981',
                r: 4
              }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* 统计信息 */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">
                  {historyData.length > 0 ? (historyData.reduce((sum, d) => sum + d.avgResponseTime, 0) / historyData.length).toFixed(0) : 0}ms
                </div>
                <div className="text-xs text-muted-foreground">平均响应时间</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-500">
                  {historyData.length > 0 ? (historyData.reduce((sum, d) => sum + d.throughput, 0) / historyData.length).toFixed(1) : 0}req/s
                </div>
                <div className="text-xs text-muted-foreground">平均吞吐量</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-500">
                  {historyData.length > 0 ? (historyData.reduce((sum, d) => sum + d.errorRate, 0) / historyData.length).toFixed(2) : 0}%
                </div>
                <div className="text-xs text-muted-foreground">平均错误率</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-500">
                  {testHistory.length}
                </div>
                <div className="text-xs text-muted-foreground">测试次数</div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
}