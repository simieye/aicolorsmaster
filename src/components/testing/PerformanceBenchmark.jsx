// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Progress, Badge, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TrendingUp, TrendingDown, Clock, Zap, HardDrive, Wifi, Cpu, Activity, Play, RotateCcw } from 'lucide-react';

export function PerformanceBenchmark({
  baseline,
  onRunBenchmark
}) {
  const [benchmarkResults, setBenchmarkResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const performanceMetrics = [{
    key: 'loadTime',
    name: '页面加载时间',
    icon: <Clock className="w-4 h-4" />,
    unit: 'ms',
    description: '从请求开始到页面完全加载的时间',
    threshold: {
      good: 2000,
      warning: 3000,
      critical: 5000
    }
  }, {
    key: 'renderTime',
    name: '渲染时间',
    icon: <Zap className="w-4 h-4" />,
    unit: 'ms',
    description: '组件渲染和更新的平均时间',
    threshold: {
      good: 16.67,
      warning: 33.33,
      critical: 100
    }
  }, {
    key: 'memoryUsage',
    name: '内存使用',
    icon: <HardDrive className="w-4 h-4" />,
    unit: 'MB',
    description: 'JavaScript堆内存使用量',
    threshold: {
      good: 50,
      warning: 100,
      critical: 200
    }
  }, {
    key: 'apiResponseTime',
    name: 'API响应时间',
    icon: <Wifi className="w-4 h-4" />,
    unit: 'ms',
    description: 'API请求的平均响应时间',
    threshold: {
      good: 500,
      warning: 1000,
      critical: 2000
    }
  }, {
    key: 'errorRate',
    name: '错误率',
    icon: <Activity className="w-4 h-4" />,
    unit: '%',
    description: '请求失败率',
    threshold: {
      good: 1,
      warning: 5,
      critical: 10
    }
  }];
  const getMetricStatus = (value, threshold) => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.warning) return 'warning';
    return 'critical';
  };
  const getStatusColor = status => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'good':
        return <Badge variant="default">优秀</Badge>;
      case 'warning':
        return <Badge variant="secondary">警告</Badge>;
      case 'critical':
        return <Badge variant="destructive">严重</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  const formatValue = (value, unit) => {
    if (unit === 'MB') {
      return (value / (1024 * 1024)).toFixed(1);
    }
    if (unit === '%') {
      return (value * 100).toFixed(2);
    }
    return value.toFixed(1);
  };
  const calculateImprovement = (current, baseline) => {
    if (!baseline) return null;
    const improvement = (baseline - current) / baseline * 100;
    return {
      value: improvement.toFixed(1),
      isPositive: improvement > 0
    };
  };
  const runBenchmark = async () => {
    setIsRunning(true);
    setCurrentMetrics(null);
    try {
      // 模拟基准测试
      const results = {
        timestamp: Date.now(),
        metrics: {
          loadTime: Math.random() * 2000 + 1000,
          renderTime: Math.random() * 20 + 10,
          memoryUsage: Math.random() * 50 * 1024 * 1024 + 30 * 1024 * 1024,
          apiResponseTime: Math.random() * 500 + 200,
          errorRate: Math.random() * 0.05
        }
      };
      setCurrentMetrics(results);
      setBenchmarkResults(prev => [...prev, results]);
      await onRunBenchmark(results);
    } catch (error) {
      console.error('基准测试失败:', error);
    } finally {
      setIsRunning(false);
    }
  };
  const getHistoricalTrend = key => {
    const recent = benchmarkResults.slice(-5);
    if (recent.length < 2) return null;
    const values = recent.map(r => r.metrics[key]);
    const trend = values[values.length - 1] - values[0];
    return {
      trend,
      isImproving: key === 'errorRate' ? trend < 0 : trend < 0
    };
  };
  return <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            性能基准测试
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                运行性能基准测试以评估应用性能表现
              </p>
              {benchmarkResults.length > 0 && <p className="text-xs text-muted-foreground">
                  已完成 {benchmarkResults.length} 次测试
                </p>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setBenchmarkResults([])}>
                <RotateCcw className="w-4 h-4 mr-2" />
                清除历史
              </Button>
              <Button onClick={runBenchmark} disabled={isRunning}>
                {isRunning ? <>
                    <Activity className="w-4 h-4 mr-2 animate-pulse" />
                    测试中...
                  </> : <>
                    <Play className="w-4 h-4 mr-2" />
                    运行基准测试
                  </>}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 当前测试结果 */}
      {currentMetrics && <Card>
          <CardHeader>
            <CardTitle>最新测试结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceMetrics.map(metric => {
            const value = currentMetrics.metrics[metric.key];
            const status = getMetricStatus(value, metric.threshold);
            const improvement = calculateImprovement(value, baseline[metric.key]);
            const trend = getHistoricalTrend(metric.key);
            return <div key={metric.key} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {metric.icon}
                        <span className="font-medium text-sm">{metric.name}</span>
                      </div>
                      {getStatusBadge(status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold ${getStatusColor(status)}`}>
                          {formatValue(value, metric.unit)}
                        </span>
                        <span className="text-sm text-muted-foreground">{metric.unit}</span>
                      </div>
                      
                      {/* 与基准对比 */}
                      {improvement && <div className="flex items-center gap-1">
                          {improvement.isPositive ? <TrendingDown className="w-3 h-3 text-green-500" /> : <TrendingUp className="w-3 h-3 text-red-500" />}
                          <span className={`text-xs ${improvement.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {improvement.isPositive ? '改善' : '恶化'} {Math.abs(improvement.value)}%
                          </span>
                        </div>}
                      
                      {/* 趋势指示 */}
                      {trend && <div className="flex items-center gap-1">
                          {trend.isImproving ? <TrendingDown className="w-3 h-3 text-green-500" /> : <TrendingUp className="w-3 h-3 text-red-500" />}
                          <span className={`text-xs ${trend.isImproving ? 'text-green-500' : 'text-red-500'}`}>
                            {trend.isImproving ? '改善中' : '恶化中'}
                          </span>
                        </div>}
                    </div>
                    
                    {/* 进度条 */}
                    <div className="mt-3">
                      <Progress value={status === 'good' ? 100 : status === 'warning' ? 66 : 33} className="w-full h-2" />
                    </div>
                  </div>;
          })}
            </div>
          </CardContent>
        </Card>}

      {/* 性能指标详情 */}
      <Card>
        <CardHeader>
          <CardTitle>性能指标详情</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map(metric => {
            const currentValue = currentMetrics?.metrics[metric.key];
            const status = currentValue ? getMetricStatus(currentValue, metric.threshold) : 'none';
            return <div key={metric.key} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <h4 className="font-medium">{metric.name}</h4>
                    </div>
                    {currentValue && getStatusBadge(status)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">基准值: </span>
                      <span>{formatValue(baseline[metric.key], metric.unit)}{metric.unit}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">当前值: </span>
                      <span className={currentValue ? getStatusColor(status) : ''}>
                        {currentValue ? formatValue(currentValue, metric.unit) : '-'}{metric.unit}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">优秀阈值: </span>
                      <span className="text-green-500">≤{metric.threshold.good}{metric.unit}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">警告阈值: </span>
                      <span className="text-yellow-500">≤{metric.threshold.warning}{metric.unit}</span>
                    </div>
                  </div>
                </div>;
          })}
          </div>
        </CardContent>
      </Card>

      {/* 历史趋势 */}
      {benchmarkResults.length > 1 && <Card>
          <CardHeader>
            <CardTitle>历史趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map(metric => {
            const values = benchmarkResults.map(r => r.metrics[metric.key]);
            const latest = values[values.length - 1];
            const oldest = values[0];
            const change = (latest - oldest) / oldest * 100;
            return <div key={metric.key} className="flex items-center justify-between p-3 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {formatValue(oldest, metric.unit)} → {formatValue(latest, metric.unit)}
                      </span>
                      <div className="flex items-center gap-1">
                        {change < 0 ? <TrendingDown className="w-3 h-3 text-green-500" /> : <TrendingUp className="w-3 h-3 text-red-500" />}
                        <span className={`text-sm ${change < 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {change > 0 ? '+' : ''}{change.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>;
          })}
            </div>
          </CardContent>
        </Card>}
    </div>;
}