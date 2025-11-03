// @ts-ignore;
import React, { useState, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Alert, AlertDescription, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TrendingUp, TrendingDown, Clock, Zap, HardDrive, Cpu, Wifi, Play, RefreshCw, Download, AlertTriangle, CheckCircle } from 'lucide-react';

export function PerformanceBenchmark({
  baseline = {},
  onRunBenchmark
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentResults, setCurrentResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // 使用 useMemo 优化基准数据
  const baselineMetrics = useMemo(() => ({
    loadTime: baseline.loadTime || 2000,
    renderTime: baseline.renderTime || 16.67,
    memoryUsage: baseline.memoryUsage || 50 * 1024 * 1024,
    apiResponseTime: baseline.apiResponseTime || 500,
    errorRate: baseline.errorRate || 0.01
  }), [baseline]);

  // 模拟运行基准测试
  const runBenchmark = useCallback(async () => {
    setIsRunning(true);
    try {
      // 模拟测试过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      const results = {
        timestamp: Date.now(),
        metrics: {
          loadTime: Math.random() * 1000 + 1500,
          renderTime: Math.random() * 10 + 12,
          memoryUsage: Math.random() * 20 * 1024 * 1024 + 40 * 1024 * 1024,
          apiResponseTime: Math.random() * 300 + 200,
          errorRate: Math.random() * 0.02
        }
      };

      // 计算对比数据
      results.comparison = {
        loadTime: (results.metrics.loadTime / baselineMetrics.loadTime * 100).toFixed(1),
        renderTime: (results.metrics.renderTime / baselineMetrics.renderTime * 100).toFixed(1),
        memoryUsage: (results.metrics.memoryUsage / baselineMetrics.memoryUsage * 100).toFixed(1),
        apiResponseTime: (results.metrics.apiResponseTime / baselineMetrics.apiResponseTime * 100).toFixed(1),
        errorRate: (results.metrics.errorRate / baselineMetrics.errorRate * 100).toFixed(1)
      };
      setCurrentResults(results);
      setHistory(prev => [...prev.slice(-9), results]); // 保留最近10次记录

      if (onRunBenchmark) {
        onRunBenchmark(results);
      }
    } catch (error) {
      console.error('Benchmark error:', error);
    } finally {
      setIsRunning(false);
    }
  }, [baselineMetrics, onRunBenchmark]);

  // 格式化数值
  const formatValue = useCallback((value, unit) => {
    if (unit === 'bytes') {
      return (value / 1024 / 1024).toFixed(1) + ' MB';
    }
    if (unit === 'percentage') {
      return (value * 100).toFixed(2) + '%';
    }
    if (unit === 'ms') {
      return value.toFixed(2) + ' ms';
    }
    return value.toFixed(2);
  }, []);

  // 获取状态图标
  const getStatusIcon = useCallback((current, baseline, lowerIsBetter = true) => {
    const ratio = current / baseline;
    if (lowerIsBetter) {
      return ratio < 1 ? <TrendingDown className="w-4 h-4 text-green-500" /> : <TrendingUp className="w-4 h-4 text-red-500" />;
    } else {
      return ratio > 1 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
    }
  }, []);

  // 获取指标配置
  const getMetricConfig = useCallback(key => {
    const configs = {
      loadTime: {
        label: '页面加载时间',
        icon: <Clock className="w-4 h-4" />,
        unit: 'ms',
        lowerIsBetter: true
      },
      renderTime: {
        label: '渲染时间',
        icon: <Zap className="w-4 h-4" />,
        unit: 'ms',
        lowerIsBetter: true
      },
      memoryUsage: {
        label: '内存使用',
        icon: <HardDrive className="w-4 h-4" />,
        unit: 'bytes',
        lowerIsBetter: true
      },
      apiResponseTime: {
        label: 'API响应时间',
        icon: <Wifi className="w-4 h-4" />,
        unit: 'ms',
        lowerIsBetter: true
      },
      errorRate: {
        label: '错误率',
        icon: <AlertTriangle className="w-4 h-4" />,
        unit: 'percentage',
        lowerIsBetter: true
      }
    };
    return configs[key] || {
      label: key,
      icon: <BarChart3 className="w-4 h-4" />,
      unit: '',
      lowerIsBetter: true
    };
  }, []);

  // 导出基准测试结果
  const exportResults = useCallback(() => {
    const exportData = {
      baseline: baselineMetrics,
      current: currentResults,
      history,
      exportedAt: Date.now()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-benchmark-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [baselineMetrics, currentResults, history]);
  return <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              性能基准测试
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportResults} disabled={!currentResults}>
                <Download className="w-4 h-4 mr-2" />
                导出结果
              </Button>
              <Button onClick={runBenchmark} disabled={isRunning}>
                {isRunning ? <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    测试中...
                  </> : <>
                    <Play className="w-4 h-4 mr-2" />
                    运行基准测试
                  </>}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="comparison">对比分析</TabsTrigger>
              <TabsTrigger value="history">历史记录</TabsTrigger>
            </TabsList>

            {/* 概览 */}
            <TabsContent value="overview" className="space-y-4">
              {currentResults ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(currentResults.metrics).map(([key, value]) => {
                const config = getMetricConfig(key);
                const baselineValue = baselineMetrics[key];
                const comparison = currentResults.comparison[key];
                return <Card key={key}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {config.icon}
                            <span className="text-sm font-medium">{config.label}</span>
                          </div>
                          {getStatusIcon(value, baselineValue, config.lowerIsBetter)}
                        </div>
                        <div className="text-2xl font-bold mb-1">
                          {formatValue(value, config.unit)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          基准: {formatValue(baselineValue, config.unit)}
                        </div>
                        {comparison && <div className={`text-xs mt-1 ${parseFloat(comparison) > 100 ? 'text-red-500' : 'text-green-500'}`}>
                            {comparison}% of baseline
                          </div>}
                      </CardContent>
                    </Card>;
              })}
                </div> : <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>点击"运行基准测试"开始性能测试</p>
                </div>}
            </TabsContent>

            {/* 对比分析 */}
            <TabsContent value="comparison" className="space-y-4">
              {currentResults ? <div className="space-y-4">
                  {Object.entries(currentResults.metrics).map(([key, value]) => {
                const config = getMetricConfig(key);
                const baselineValue = baselineMetrics[key];
                const percentage = value / baselineValue * 100;
                const isGood = config.lowerIsBetter ? percentage < 100 : percentage > 100;
                return <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {config.icon}
                        <span className="font-medium">{config.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{formatValue(value, config.unit)}</span>
                        <Badge variant={isGood ? 'default' : 'destructive'}>
                          {isGood ? '优秀' : '需改进'}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={Math.min(percentage, 200)} className="w-full" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>基准: {formatValue(baselineValue, config.unit)}</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>;
              })}
                </div> : <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    请先运行基准测试以查看对比分析
                  </AlertDescription>
                </Alert>}
            </TabsContent>

            {/* 历史记录 */}
            <TabsContent value="history" className="space-y-4">
              {history.length > 0 ? <div className="space-y-3">
                  {history.map((result, index) => <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">测试 #{index + 1}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(result.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        {Object.entries(result.metrics).map(([key, value]) => {
                    const config = getMetricConfig(key);
                    return <div key={key} className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              {config.icon}
                            </div>
                            <div>{formatValue(value, config.unit)}</div>
                          </div>;
                  })}
                      </div>
                    </div>)}
                </div> : <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4" />
                  <p>暂无历史记录</p>
                </div>}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
}
export default PerformanceBenchmark;