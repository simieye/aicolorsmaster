// @ts-ignore;
import React, { useState, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Switch, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ScrollArea, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, Settings, CheckCircle, XCircle, AlertTriangle, Clock, FileText, RefreshCw, Plus, Trash2, Edit, Save, X } from 'lucide-react';

export function TestSuiteManager({
  config = {},
  onConfigChange,
  testResults = [],
  isRunning = false
}) {
  const [editingSuite, setEditingSuite] = useState(null);
  const [newSuiteName, setNewSuiteName] = useState('');
  const [showAddSuite, setShowAddSuite] = useState(false);
  const [selectedSuites, setSelectedSuites] = useState([]);

  // 使用 useMemo 优化测试套件列表
  const testSuites = useMemo(() => {
    return config.testSuites || ['unit', 'integration', 'e2e', 'performance'];
  }, [config.testSuites]);

  // 使用 useMemo 优化测试结果统计
  const suiteStats = useMemo(() => {
    const stats = {};
    testSuites.forEach(suite => {
      const suiteResults = testResults.filter(result => result.results && result.results.some(r => r.suite === suite));
      const latestResult = suiteResults[suiteResults.length - 1];
      stats[suite] = {
        total: suiteResults.length,
        latest: latestResult,
        status: latestResult ? latestResult.status === 'passed' ? 'success' : 'failed' : 'idle'
      };
    });
    return stats;
  }, [testSuites, testResults]);

  // 获取套件图标
  const getSuiteIcon = useCallback(suite => {
    switch (suite) {
      case 'unit':
        return <CheckCircle className="w-4 h-4" />;
      case 'integration':
        return <AlertTriangle className="w-4 h-4" />;
      case 'e2e':
        return <FileText className="w-4 h-4" />;
      case 'performance':
        return <Clock className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  }, []);

  // 获取套件状态颜色
  const getSuiteStatusColor = useCallback(status => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      case 'running':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  }, []);

  // 获取套件状态徽章
  const getSuiteStatusBadge = useCallback(status => {
    switch (status) {
      case 'success':
        return <Badge variant="default">通过</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      case 'running':
        return <Badge variant="secondary">运行中</Badge>;
      default:
        return <Badge variant="outline">未运行</Badge>;
    }
  }, []);

  // 添加新测试套件
  const addTestSuite = useCallback(() => {
    if (newSuiteName.trim() && !testSuites.includes(newSuiteName.trim())) {
      const newSuites = [...testSuites, newSuiteName.trim()];
      onConfigChange && onConfigChange({
        ...config,
        testSuites: newSuites
      });
      setNewSuiteName('');
      setShowAddSuite(false);
    }
  }, [newSuiteName, testSuites, config, onConfigChange]);

  // 删除测试套件
  const removeTestSuite = useCallback(suiteToRemove => {
    const newSuites = testSuites.filter(suite => suite !== suiteToRemove);
    onConfigChange && onConfigChange({
      ...config,
      testSuites: newSuites
    });
  }, [testSuites, config, onConfigChange]);

  // 切换套件选择状态
  const toggleSuiteSelection = useCallback(suite => {
    setSelectedSuites(prev => {
      if (prev.includes(suite)) {
        return prev.filter(s => s !== suite);
      } else {
        return [...prev, suite];
      }
    });
  }, []);

  // 运行选中的测试套件
  const runSelectedSuites = useCallback(() => {
    if (selectedSuites.length === 0) {
      alert('请选择要运行的测试套件');
      return;
    }
    console.log('Running selected suites:', selectedSuites);
    // 这里可以触发测试运行逻辑
  }, [selectedSuites]);

  // 格式化持续时间
  const formatDuration = useCallback(duration => {
    if (!duration) return 'N/A';
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  }, []);
  return <div className="space-y-6">
      {/* 测试套件概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              测试套件管理
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddSuite(true)}>
                <Plus className="w-4 h-4 mr-2" />
                添加套件
              </Button>
              <Button variant="outline" size="sm" onClick={runSelectedSuites} disabled={isRunning || selectedSuites.length === 0}>
                <Play className="w-4 h-4 mr-2" />
                运行选中 ({selectedSuites.length})
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testSuites.map(suite => {
            const stats = suiteStats[suite];
            const isSelected = selectedSuites.includes(suite);
            return <div key={suite} className={`border rounded-lg p-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/50'}`} onClick={() => toggleSuiteSelection(suite)}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getSuiteIcon(suite)}
                      <span className="font-medium">{suite}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSuiteStatusBadge(stats.status)}
                      <Button variant="ghost" size="sm" onClick={e => {
                    e.stopPropagation();
                    removeTestSuite(suite);
                  }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">运行次数:</span>
                      <span>{stats.total}</span>
                    </div>
                    {stats.latest && <div className="flex justify-between">
                        <span className="text-muted-foreground">最近状态:</span>
                        <span className={getSuiteStatusColor(stats.status)}>
                          {stats.latest.status}
                        </span>
                      </div>}
                    {stats.latest && stats.latest.duration && <div className="flex justify-between">
                        <span className="text-muted-foreground">持续时间:</span>
                        <span>{formatDuration(stats.latest.duration)}</span>
                      </div>}
                  </div>

                  {isSelected && <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <CheckCircle className="w-3 h-3" />
                        已选择运行
                      </div>
                    </div>}
                </div>;
          })}
          </div>

          {/* 添加新套件表单 */}
          {showAddSuite && <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Input placeholder="输入新套件名称" value={newSuiteName} onChange={e => setNewSuiteName(e.target.value)} className="flex-1" />
                <Button size="sm" onClick={addTestSuite}>
                  <Save className="w-4 h-4 mr-2" />
                  添加
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
              setShowAddSuite(false);
              setNewSuiteName('');
            }}>
                  <X className="w-4 h-4 mr-2" />
                  取消
                </Button>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* 测试配置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            测试配置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="parallel">并行执行</Label>
                <Switch id="parallel" checked={config.parallel || false} onCheckedChange={checked => onConfigChange && onConfigChange({
                ...config,
                parallel: checked
              })} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="timeout">超时时间 (ms)</Label>
                <Input id="timeout" type="number" value={config.timeout || 30000} onChange={e => onConfigChange && onConfigChange({
                ...config,
                timeout: parseInt(e.target.value)
              })} className="w-24" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="retries">重试次数</Label>
                <Input id="retries" type="number" value={config.retries || 2} onChange={e => onConfigChange && onConfigChange({
                ...config,
                retries: parseInt(e.target.value)
              })} className="w-24" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="maxConcurrency">最大并发数</Label>
                <Input id="maxConcurrency" type="number" value={config.maxConcurrency || 4} onChange={e => onConfigChange && onConfigChange({
                ...config,
                maxConcurrency: parseInt(e.target.value)
              })} className="w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 最近测试结果 */}
      {testResults.length > 0 && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              最近测试结果
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {testResults.slice(-5).reverse().map((result, index) => <div key={result.id || index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {result.status === 'passed' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        <span className="font-medium">测试 #{testResults.length - index}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                          {result.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(result.endTime || result.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {result.results && <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        {result.results.map((suiteResult, suiteIndex) => <div key={suiteIndex} className="flex items-center gap-1">
                            {getSuiteIcon(suiteResult.suite)}
                            <span>{suiteResult.suite}:</span>
                            <span className={suiteResult.status === 'passed' ? 'text-green-500' : 'text-red-500'}>
                              {suiteResult.status}
                            </span>
                          </div>)}
                      </div>}
                  </div>)}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>}
    </div>;
}
export default TestSuiteManager;