// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Progress, Badge, Alert, AlertDescription, Button, ScrollArea } from '@/components/ui';
// @ts-ignore;
import { Activity, Play, Pause, Square, CheckCircle, XCircle, AlertTriangle, Clock, Terminal, FileText, RefreshCw, Eye, EyeOff } from 'lucide-react';

export function TestExecutionMonitor({
  currentTest,
  isRunning,
  testResults,
  onAction
}) {
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef(null);

  // 模拟日志生成
  useEffect(() => {
    if (isRunning && currentTest) {
      const logInterval = setInterval(() => {
        const newLog = generateRandomLog();
        setLogs(prev => [...prev, newLog]);
      }, 2000);
      return () => clearInterval(logInterval);
    }
  }, [isRunning, currentTest]);

  // 自动滚动到底部
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);
  const generateRandomLog = () => {
    const logTypes = ['info', 'success', 'warning', 'error'];
    const logMessages = [{
      type: 'info',
      message: '正在初始化测试环境...'
    }, {
      type: 'info',
      message: '加载测试配置文件...'
    }, {
      type: 'success',
      message: '测试环境初始化完成'
    }, {
      type: 'info',
      message: '开始执行单元测试...'
    }, {
      type: 'success',
      message: '单元测试套件 1/3 完成'
    }, {
      type: 'info',
      message: '开始执行集成测试...'
    }, {
      type: 'warning',
      message: '发现 2 个警告'
    }, {
      type: 'success',
      message: '集成测试完成'
    }, {
      type: 'info',
      message: '开始执行性能测试...'
    }, {
      type: 'error',
      message: '性能测试超时'
    }, {
      type: 'info',
      message: '生成测试报告...'
    }, {
      type: 'success',
      message: '测试执行完成'
    }];
    const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
    return {
      id: `log_${Date.now()}_${Math.random()}`,
      timestamp: Date.now(),
      ...randomMessage
    };
  };
  const getLogIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };
  const getLogColor = type => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };
  const formatTimestamp = timestamp => {
    return new Date(timestamp).toLocaleTimeString();
  };
  const clearLogs = () => {
    setLogs([]);
  };
  const exportLogs = () => {
    const logText = logs.map(log => `[${formatTimestamp(log.timestamp)}] [${log.type.toUpperCase()}] ${log.message}`).join('\n');
    const blob = new Blob([logText], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const getTestProgress = () => {
    if (!currentTest || !isRunning) return 0;

    // 模拟进度计算
    const elapsed = Date.now() - currentTest.startTime;
    const estimatedDuration = 30000; // 30秒
    return Math.min(elapsed / estimatedDuration * 100, 95);
  };
  const getExecutionStats = () => {
    const totalLogs = logs.length;
    const errorLogs = logs.filter(log => log.type === 'error').length;
    const warningLogs = logs.filter(log => log.type === 'warning').length;
    const successLogs = logs.filter(log => log.type === 'success').length;
    return {
      total: totalLogs,
      errors: errorLogs,
      warnings: warningLogs,
      success: successLogs
    };
  };
  const stats = getExecutionStats();
  return <div className="space-y-6">
      {/* 执行状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              测试执行监控
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isRunning ? "default" : "outline"}>
                {isRunning ? "运行中" : "空闲"}
              </Badge>
              {currentTest && <span className="text-sm text-muted-foreground">
                  ID: {currentTest.id}
                </span>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 进度条 */}
            {isRunning && <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>执行进度</span>
                  <span>{getTestProgress().toFixed(1)}%</span>
                </div>
                <Progress value={getTestProgress()} className="w-full" />
              </div>}

            {/* 统计信息 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{stats.total}</div>
                <div className="text-xs text-muted-foreground">总日志数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{stats.success}</div>
                <div className="text-xs text-muted-foreground">成功</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{stats.warnings}</div>
                <div className="text-xs text-muted-foreground">警告</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{stats.errors}</div>
                <div className="text-xs text-muted-foreground">错误</div>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowLogs(!showLogs)}>
                {showLogs ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showLogs ? '隐藏日志' : '显示日志'}
              </Button>
              <Button variant="outline" size="sm" onClick={clearLogs}>
                <RefreshCw className="w-4 h-4 mr-2" />
                清除日志
              </Button>
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <FileText className="w-4 h-4 mr-2" />
                导出日志
              </Button>
              <div className="flex items-center gap-2 ml-auto">
                <input type="checkbox" id="autoScroll" checked={autoScroll} onChange={e => setAutoScroll(e.target.checked)} className="rounded" />
                <label htmlFor="autoScroll" className="text-sm">
                  自动滚动
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实时日志 */}
      {showLogs && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              实时日志
              {isRunning && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-black text-green-400 font-mono text-sm" ref={logContainerRef}>
              <div className="space-y-1">
                {logs.length === 0 ? <div className="text-center text-muted-foreground py-8">
                    {isRunning ? '等待日志输出...' : '暂无日志'}
                  </div> : logs.map(log => <div key={log.id} className="flex items-start gap-2">
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatTimestamp(log.timestamp)}
                      </span>
                      {getLogIcon(log.type)}
                      <span className={`flex-1 ${getLogColor(log.type)}`}>
                        {log.message}
                      </span>
                    </div>)}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>}

      {/* 错误摘要 */}
      {stats.errors > 0 && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <XCircle className="w-5 h-5" />
              错误摘要
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {logs.filter(log => log.type === 'error').slice(-5).map(log => <Alert key={log.id} variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <span>{log.message}</span>
                        <span className="text-xs opacity-75">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                    </AlertDescription>
                  </Alert>)}
            </div>
          </CardContent>
        </Card>}

      {/* 测试套件执行状态 */}
      {currentTest && currentTest.config && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              测试套件状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTest.config.testSuites?.map((suite, index) => {
            const isCompleted = getTestProgress() > (index + 1) * 25;
            const isRunning = getTestProgress() > index * 25 && getTestProgress() <= (index + 1) * 25;
            return <div key={suite} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : isRunning ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
                      <span className="font-medium">{suite}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {isRunning && <Activity className="w-4 h-4 text-blue-500 animate-pulse" />}
                      <Badge variant={isCompleted ? "default" : isRunning ? "secondary" : "outline"}>
                        {isCompleted ? '完成' : isRunning ? '运行中' : '等待中'}
                      </Badge>
                    </div>
                  </div>;
          })}
            </div>
          </CardContent>
        </Card>}
    </div>;
}
export default TestExecutionMonitor;