// @ts-ignore;
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast, Alert, AlertDescription, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Play, RefreshCw, AlertTriangle, CheckCircle, Clock, Database, Zap, Bug, Activity, FileText, Trash2, Download, Upload, Settings, TestTube, Beaker, FlaskConical } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, ContextualLoading, InlineLoading } from '@/components/LoadingStates';

// 性能监控相关
// @ts-ignore;
import { usePerformanceMonitor, useInteractionMonitor } from '@/hooks/usePerformanceMonitor';
// @ts-ignore;
import { useDataLoader, useBatchDataLoader } from '@/hooks/useDataLoader';
// @ts-ignore;
import { usePerformanceMetrics } from '@/hooks/usePerformanceMonitor';

// 测试场景组件
// @ts-ignore;
import { TestScenarioSelector } from '@/components/testing/TestScenarioSelector';
// @ts-ignore;
import { LoadingStatusDisplay } from '@/components/testing/LoadingStatusDisplay';
// @ts-ignore;
import { TestDataDisplay } from '@/components/testing/TestDataDisplay';
// @ts-ignore;
import { PerformanceMetricsPanel } from '@/components/testing/PerformanceMetricsPanel';
// @ts-ignore;
import { ErrorLogViewer } from '@/components/testing/ErrorLogViewer';
export default function DataLoadingTestPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();

  // 性能监控
  const {
    startMonitoring,
    endMonitoring
  } = usePerformanceMonitor('DataLoadingTestPage');
  const {
    startInteraction,
    endInteraction
  } = useInteractionMonitor();
  const performanceMetrics = usePerformanceMetrics();

  // 状态管理
  const [selectedScenario, setSelectedScenario] = useState('normal');
  const [testResults, setTestResults] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testHistory, setTestHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('scenarios');

  // 使用 useRef 避免无限循环
  const isRunningRef = useRef(isRunning);
  const currentTestRef = useRef(currentTest);
  const batchLoaderRef = useRef(null);

  // 同步 ref 和 state
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);
  useEffect(() => {
    currentTestRef.current = currentTest;
  }, [currentTest]);

  // 测试场景定义 - 使用 useMemo 避免重复创建
  const testScenarios = useMemo(() => ({
    normal: {
      name: '正常数据加载',
      description: '测试正常情况下的数据加载',
      icon: <CheckCircle className="w-4 h-4" />,
      configs: [{
        type: 'products',
        key: 'test_products_normal',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return Array.from({
            length: 20
          }, (_, i) => ({
            id: `product_${i}`,
            name: `测试产品 ${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            category: '测试分类'
          }));
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'users',
        key: 'test_users_normal',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 800));
          return Array.from({
            length: 10
          }, (_, i) => ({
            id: `user_${i}`,
            name: `测试用户 ${i + 1}`,
            email: `user${i + 1}@test.com`
          }));
        },
        options: {
          ttl: 60000
        }
      }]
    },
    empty: {
      name: '空数据场景',
      description: '测试返回空数据的情况',
      icon: <Database className="w-4 h-4" />,
      configs: [{
        type: 'products',
        key: 'test_products_empty',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return [];
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'users',
        key: 'test_users_empty',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 300));
          return [];
        },
        options: {
          ttl: 60000
        }
      }]
    },
    partial: {
      name: '部分数据缺失',
      description: '测试部分数据加载失败的情况',
      icon: <AlertTriangle className="w-4 h-4" />,
      configs: [{
        type: 'products',
        key: 'test_products_partial',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 800));
          return Array.from({
            length: 15
          }, (_, i) => ({
            id: `product_${i}`,
            name: i % 3 === 0 ? null : `测试产品 ${i + 1}`,
            price: i % 5 === 0 ? undefined : Math.floor(Math.random() * 1000) + 100,
            category: '测试分类'
          }));
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'users',
        key: 'test_users_partial',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 600));
          throw new Error('用户数据加载失败');
        },
        options: {
          ttl: 60000
        },
        showErrorToast: false
      }]
    },
    network: {
      name: '网络错误',
      description: '测试网络连接失败的情况',
      icon: <Bug className="w-4 h-4" />,
      configs: [{
        type: 'products',
        key: 'test_products_network',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          throw new Error('网络连接超时');
        },
        options: {
          ttl: 60000
        },
        retryCount: 3,
        showErrorToast: false
      }, {
        type: 'users',
        key: 'test_users_network',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 800));
          throw new Error('服务器错误 500');
        },
        options: {
          ttl: 60000
        },
        retryCount: 2,
        showErrorToast: false
      }]
    },
    slow: {
      name: '慢速加载',
      description: '测试数据加载缓慢的情况',
      icon: <Clock className="w-4 h-4" />,
      configs: [{
        type: 'products',
        key: 'test_products_slow',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 5000));
          return Array.from({
            length: 30
          }, (_, i) => ({
            id: `product_${i}`,
            name: `慢速产品 ${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            category: '慢速分类'
          }));
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'users',
        key: 'test_users_slow',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
          return Array.from({
            length: 15
          }, (_, i) => ({
            id: `user_${i}`,
            name: `慢速用户 ${i + 1}`,
            email: `slow${i + 1}@test.com`
          }));
        },
        options: {
          ttl: 60000
        }
      }]
    },
    concurrent: {
      name: '并发加载',
      description: '测试大量并发数据加载',
      icon: <Zap className="w-4 h-4" />,
      configs: [{
        type: 'products',
        key: 'test_products_concurrent',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 1200));
          return Array.from({
            length: 25
          }, (_, i) => ({
            id: `product_${i}`,
            name: `并发产品 ${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            category: '并发分类'
          }));
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'users',
        key: 'test_users_concurrent',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 900));
          return Array.from({
            length: 20
          }, (_, i) => ({
            id: `user_${i}`,
            name: `并发用户 ${i + 1}`,
            email: `concurrent${i + 1}@test.com`
          }));
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'orders',
        key: 'test_orders_concurrent',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 1500));
          return Array.from({
            length: 35
          }, (_, i) => ({
            id: `order_${i}`,
            orderNumber: `ORD${String(i + 1).padStart(6, '0')}`,
            amount: Math.floor(Math.random() * 5000) + 100,
            status: ['pending', 'completed', 'cancelled'][i % 3]
          }));
        },
        options: {
          ttl: 60000
        }
      }, {
        type: 'analytics',
        key: 'test_analytics_concurrent',
        loader: async () => {
          await new Promise(resolve => setTimeout(resolve, 800));
          return {
            totalSales: Math.floor(Math.random() * 100000) + 10000,
            totalOrders: Math.floor(Math.random() * 1000) + 100,
            conversionRate: (Math.random() * 10 + 1).toFixed(2)
          };
        },
        options: {
          ttl: 60000
        }
      }]
    }
  }), []);

  // 获取当前场景的配置 - 使用 useMemo
  const currentScenario = useMemo(() => testScenarios[selectedScenario], [selectedScenario, testScenarios]);
  const batchLoader = useBatchDataLoader(currentScenario?.configs || []);

  // 更新 batchLoader ref
  useEffect(() => {
    batchLoaderRef.current = batchLoader;
  }, [batchLoader]);

  // 运行测试 - 修复无限循环问题
  const runTest = useCallback(async () => {
    // 防止重复执行
    if (isRunningRef.current) {
      console.log('Test already running, skipping...');
      return;
    }
    const interactionId = startInteraction('run_test', selectedScenario);
    setIsRunning(true);
    const testStartData = {
      scenario: selectedScenario,
      startTime: Date.now(),
      status: 'running'
    };
    setCurrentTest(testStartData);
    try {
      const renderId = startMonitoring({
        phase: 'test_execution',
        scenario: selectedScenario
      });
      const startTime = performance.now();

      // 执行批量加载
      const results = await batchLoader.loadAll();
      const endTime = performance.now();
      const duration = endTime - startTime;
      const testResult = {
        scenario: selectedScenario,
        startTime: testStartData.startTime,
        endTime: Date.now(),
        duration,
        status: batchLoader.hasErrors ? 'partial' : 'success',
        results: results,
        errors: batchLoader.errors || {},
        performance: {
          duration,
          cacheHits: Object.values(batchLoader).filter(loader => loader.isFromCache).length,
          totalRequests: Object.keys(batchLoader).length
        }
      };
      setTestResults(prev => [...prev, testResult]);
      setTestHistory(prev => [...prev, testResult]);
      setCurrentTest(testResult);
      endMonitoring(renderId);
      toast({
        title: "测试完成",
        description: `${currentScenario.name} 测试完成，耗时 ${duration.toFixed(2)}ms`,
        variant: batchLoader.hasErrors ? "default" : "default"
      });
    } catch (error) {
      console.error('Test execution error:', error);
      const testResult = {
        scenario: selectedScenario,
        startTime: testStartData.startTime,
        endTime: Date.now(),
        status: 'failed',
        error: error.message,
        errors: batchLoader.errors || {}
      };
      setTestResults(prev => [...prev, testResult]);
      setTestHistory(prev => [...prev, testResult]);
      setCurrentTest(testResult);
      toast({
        title: "测试失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
      endInteraction(interactionId);
    }
  }, [selectedScenario, currentScenario, batchLoader, startInteraction, endInteraction, startMonitoring, endMonitoring, toast]);

  // 重置测试
  const resetTest = useCallback(() => {
    setTestResults([]);
    setCurrentTest(null);
    if (batchLoaderRef.current && batchLoaderRef.current.cancelAll) {
      batchLoaderRef.current.cancelAll();
    }
  }, []);

  // 清除缓存
  const clearCache = useCallback(() => {
    if (batchLoaderRef.current) {
      Object.values(batchLoaderRef.current).forEach(loader => {
        if (loader.clearCache) {
          loader.clearCache();
        }
      });
    }
    toast({
      title: "缓存已清除",
      description: "所有测试数据缓存已清除"
    });
  }, [toast]);

  // 导出测试结果
  const exportResults = useCallback(() => {
    const exportData = {
      testHistory,
      performanceMetrics,
      timestamp: Date.now(),
      scenarios: Object.keys(testScenarios)
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-loading-test-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "导出成功",
      description: "测试结果已导出"
    });
  }, [testHistory, performanceMetrics, testScenarios, toast]);

  // 清除错误日志
  const clearErrorLogs = useCallback(() => {
    setTestResults(prev => prev.map(result => ({
      ...result,
      errors: {}
    })));
  }, []);

  // 导出错误日志
  const exportErrorLogs = useCallback(() => {
    const errorData = {
      errors: batchLoaderRef.current?.errors || {},
      testResults: testResults.filter(r => r.errors && Object.keys(r.errors).length > 0),
      timestamp: Date.now()
    };
    const blob = new Blob([JSON.stringify(errorData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [testResults]);
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="数据加载测试" showBack={true} actions={<div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearCache}>
                <Trash2 className="w-4 h-4 mr-2" />
                清除缓存
              </Button>
              <Button variant="outline" size="sm" onClick={exportResults} disabled={testHistory.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                导出结果
              </Button>
            </div>} />

        <div className="container mx-auto px-4 py-6 pb-20">
          {/* 测试控制面板 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                数据加载功能测试
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 场景选择 */}
                <div>
                  <h3 className="text-sm font-medium mb-3">选择测试场景</h3>
                  <TestScenarioSelector scenarios={testScenarios} selectedScenario={selectedScenario} onScenarioChange={setSelectedScenario} disabled={isRunning} />
                </div>

                {/* 测试控制 */}
                <div>
                  <h3 className="text-sm font-medium mb-3">测试控制</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={runTest} disabled={isRunning} className="flex items-center gap-2">
                      {isRunning ? <>
                          <LoadingSpinner size="small" />
                          测试中...
                        </> : <>
                          <Play className="w-4 h-4" />
                          运行测试
                        </>}
                    </Button>
                    <Button variant="outline" onClick={resetTest} disabled={isRunning}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      重置
                    </Button>
                  </div>

                  {/* 当前测试状态 */}
                  {currentTest && <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">当前测试状态</span>
                        <Badge variant={currentTest.status === 'success' ? 'default' : currentTest.status === 'failed' ? 'destructive' : currentTest.status === 'partial' ? 'secondary' : 'outline'}>
                          {currentTest.status}
                        </Badge>
                      </div>
                      {currentTest.duration && <div className="text-xs text-muted-foreground">
                          耗时: {currentTest.duration.toFixed(2)}ms
                        </div>}
                    </div>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测试结果标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="scenarios">测试场景</TabsTrigger>
              <TabsTrigger value="loading">加载状态</TabsTrigger>
              <TabsTrigger value="data">数据展示</TabsTrigger>
              <TabsTrigger value="performance">性能分析</TabsTrigger>
              <TabsTrigger value="errors">错误日志</TabsTrigger>
            </TabsList>

            {/* 测试场景 */}
            <TabsContent value="scenarios">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="w-5 h-5" />
                    测试场景详情
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentScenario && <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">{currentScenario.name}</h4>
                        <p className="text-sm text-muted-foreground">{currentScenario.description}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2">包含的数据加载器:</h5>
                        <div className="space-y-1">
                          {currentScenario.configs.map((config, index) => <div key={index} className="text-xs p-2 bg-muted rounded">
                              <div className="flex items-center justify-between">
                                <span>{config.type}</span>
                                <Badge variant="outline">{config.key}</Badge>
                              </div>
                              {config.retryCount && <div className="text-muted-foreground mt-1">
                                  重试次数: {config.retryCount}
                                </div>}
                            </div>)}
                        </div>
                      </div>
                    </div>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 加载状态 */}
            <TabsContent value="loading">
              <LoadingStatusDisplay batchLoader={batchLoader} isRunning={isRunning} currentTest={currentTest} />
            </TabsContent>

            {/* 数据展示 */}
            <TabsContent value="data">
              <TestDataDisplay batchLoader={batchLoader} currentScenario={currentScenario} />
            </TabsContent>

            {/* 性能分析 */}
            <TabsContent value="performance">
              <PerformanceMetricsPanel testResults={testResults} testHistory={testHistory} performanceMetrics={performanceMetrics} />
            </TabsContent>

            {/* 错误日志 */}
            <TabsContent value="errors">
              <ErrorLogViewer errors={batchLoader.errors || {}} testResults={testResults} onClear={clearErrorLogs} onExport={exportErrorLogs} />
            </TabsContent>
          </Tabs>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}