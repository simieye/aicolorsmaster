// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { History, Download, Calendar, Clock, Users, Zap, TrendingUp, AlertTriangle, CheckCircle, XCircle, BarChart3, Trash2 } from 'lucide-react';

export function StressTestHistory({
  history
}) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const filteredHistory = history.filter(test => {
    if (filterStatus === 'all') return true;
    return test.status === filterStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return b.timestamp - a.timestamp;
      case 'duration':
        return b.duration - a.duration;
      case 'errorRate':
        return b.metrics.errorRate - a.metrics.errorRate;
      case 'avgResponseTime':
        return b.metrics.averageResponseTime - a.metrics.averageResponseTime;
      default:
        return b.timestamp - a.timestamp;
    }
  });
  const getStatusIcon = status => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'success':
        return <Badge variant="default">成功</Badge>;
      case 'warning':
        return <Badge variant="secondary">警告</Badge>;
      case 'error':
        return <Badge variant="destructive">错误</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  const formatDuration = ms => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };
  const formatNumber = num => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  const exportTestResult = test => {
    const exportData = {
      test,
      exportedAt: Date.now(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stress-test-${test.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const clearHistory = () => {
    if (confirm('确定要清除所有测试历史吗？此操作不可恢复。')) {
      // 这里应该调用清除历史的函数
      console.log('清除历史记录');
    }
  };
  const getTestTypeLabel = testType => {
    const typeMap = {
      load: '负载测试',
      stress: '压力测试',
      spike: '峰值测试',
      endurance: '耐久测试'
    };
    return typeMap[testType] || testType;
  };
  return <div className="space-y-6">
      {/* 历史记录控制 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5" />
              测试历史记录
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="error">错误</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="timestamp">按时间</SelectItem>
                  <SelectItem value="duration">按时长</SelectItem>
                  <SelectItem value="errorRate">按错误率</SelectItem>
                  <SelectItem value="avgResponseTime">按响应时间</SelectItem>
                </SelectContent>
              </Select>
              {history.length > 0 && <Button variant="outline" size="sm" onClick={clearHistory}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  清除
                </Button>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-4" />
              <p>暂无测试历史记录</p>
            </div> : <div className="space-y-3">
              {filteredHistory.map(test => <div key={test.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h4 className="font-medium">{getTestTypeLabel(test.config.testType)}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(test.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(test.status)}
                      <Button variant="ghost" size="sm" onClick={() => setSelectedTest(selectedTest?.id === test.id ? null : test)}>
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportTestResult(test)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">持续时间: </span>
                      <span className="font-medium">{formatDuration(test.duration)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">并发用户: </span>
                      <span className="font-medium">{formatNumber(test.config.concurrentUsers)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">总请求数: </span>
                      <span className="font-medium">{formatNumber(test.metrics.totalRequests)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">响应时间: </span>
                      <span className="font-medium">{test.metrics.averageResponseTime.toFixed(0)}ms</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">错误率: </span>
                      <span className={`font-medium ${test.metrics.errorRate > 5 ? 'text-red-500' : 'text-green-500'}`}>
                        {test.metrics.errorRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* 详细信息展开 */}
                  {selectedTest?.id === test.id && <div className="mt-4 pt-4 border-t space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            负载配置
                          </h5>
                          <div className="text-xs space-y-1 bg-muted p-3 rounded">
                            <div>测试类型: {getTestTypeLabel(test.config.testType)}</div>
                            <div>并发用户数: {test.config.concurrentUsers}</div>
                            <div>持续时间: {formatDuration(test.config.duration * 1000)}</div>
                            <div>启动时间: {test.config.rampUpTime}秒</div>
                            <div>请求频率: {test.config.requestRate} req/s</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            性能指标
                          </h5>
                          <div className="text-xs space-y-1 bg-muted p-3 rounded">
                            <div>成功请求: {formatNumber(test.metrics.successfulRequests)}</div>
                            <div>失败请求: {formatNumber(test.metrics.failedRequests)}</div>
                            <div>成功率: {(test.metrics.successfulRequests / test.metrics.totalRequests * 100).toFixed(1)}%</div>
                            <div>平均响应时间: {test.metrics.averageResponseTime.toFixed(0)}ms</div>
                            <div>错误率: {test.metrics.errorRate.toFixed(2)}%</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            系统资源
                          </h5>
                          <div className="text-xs space-y-1 bg-muted p-3 rounded">
                            <div>CPU使用率: {test.metrics.cpuUsage.toFixed(1)}%</div>
                            <div>内存使用率: {test.metrics.memoryUsage.toFixed(1)}%</div>
                            <div>当前RPS: {test.metrics.currentRPS}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            测试评估
                          </h5>
                          <div className="text-xs space-y-1 bg-muted p-3 rounded">
                            <div>测试状态: {test.status}</div>
                            <div>建议: {test.metrics.errorRate < 1 ? '系统表现优秀' : test.metrics.errorRate < 5 ? '系统表现良好' : '需要优化'}</div>
                          </div>
                        </div>
                      </div>
                    </div>}
                </div>)}
            </div>}
        </CardContent>
      </Card>

      {/* 统计概览 */}
      {history.length > 0 && <Card>
          <CardHeader>
            <CardTitle>统计概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{history.length}</div>
                <div className="text-sm text-muted-foreground">总测试次数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {history.filter(t => t.status === 'success').length}
                </div>
                <div className="text-sm text-muted-foreground">成功测试</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">
                  {history.filter(t => t.status === 'warning').length}
                </div>
                <div className="text-sm text-muted-foreground">警告测试</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {history.filter(t => t.status === 'error').length}
                </div>
                <div className="text-sm text-muted-foreground">失败测试</div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
}