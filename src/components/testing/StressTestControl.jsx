// @ts-ignore;
import React, { useState, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Alert, AlertDescription, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Zap, Play, Pause, Square, Settings, Activity, HardDrive, Cpu, Wifi, Users, Clock, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';

export function StressTestControl({
  isActive = false,
  onActiveChange
}) {
  const [config, setConfig] = useState({
    concurrentUsers: 100,
    duration: 300,
    // 5分钟
    rampUpTime: 30,
    // 30秒
    testType: 'load',
    targetEndpoint: '/api/test'
  });
  const [metrics, setMetrics] = useState({
    currentUsers: 0,
    requestsPerSecond: 0,
    averageResponseTime: 0,
    errorRate: 0,
    cpuUsage: 0,
    memoryUsage: 0
  });
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('control');

  // 使用 useMemo 优化测试类型配置
  const testTypes = useMemo(() => [{
    value: 'load',
    label: '负载测试',
    description: '模拟正常用户负载'
  }, {
    value: 'stress',
    label: '压力测试',
    description: '测试系统极限性能'
  }, {
    value: 'spike',
    label: '峰值测试',
    description: '模拟突发流量'
  }, {
    value: 'endurance',
    label: '耐久测试',
    description: '长时间稳定性测试'
  }], []);

  // 使用 useMemo 优化当前测试类型
  const currentTestType = useMemo(() => {
    return testTypes.find(type => type.value === config.testType) || testTypes[0];
  }, [config.testType, testTypes]);

  // 开始压力测试
  const startStressTest = useCallback(() => {
    onActiveChange && onActiveChange(true);

    // 模拟测试开始
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = {
          currentUsers: Math.min(prev.currentUsers + Math.random() * 10, config.concurrentUsers),
          requestsPerSecond: Math.random() * 1000 + 500,
          averageResponseTime: Math.random() * 200 + 100,
          errorRate: Math.random() * 0.05,
          cpuUsage: Math.random() * 80 + 20,
          memoryUsage: Math.random() * 70 + 30
        };

        // 添加到历史记录
        setHistory(history => [...history.slice(-99), {
          timestamp: Date.now(),
          ...newMetrics
        }]);
        return newMetrics;
      });
    }, 1000);

    // 设置定时器在指定时间后停止
    setTimeout(() => {
      clearInterval(interval);
      onActiveChange && onActiveChange(false);
    }, config.duration * 1000);
  }, [config, onActiveChange]);

  // 停止压力测试
  const stopStressTest = useCallback(() => {
    onActiveChange && onActiveChange(false);
    setMetrics({
      currentUsers: 0,
      requestsPerSecond: 0,
      averageResponseTime: 0,
      errorRate: 0,
      cpuUsage: 0,
      memoryUsage: 0
    });
  }, [onActiveChange]);

  // 更新配置
  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // 格式化数值
  const formatValue = useCallback((value, unit) => {
    if (unit === 'percentage') {
      return `${value.toFixed(1)}%`;
    }
    if (unit === 'ms') {
      return `${value.toFixed(0)}ms`;
    }
    if (unit === 'rps') {
      return `${value.toFixed(0)} RPS`;
    }
    return value.toFixed(0);
  }, []);

  // 获取状态颜色
  const getStatusColor = useCallback((value, thresholds) => {
    if (value <= thresholds.good) return 'text-green-500';
    if (value <= thresholds.warning) return 'text-yellow-500';
    return 'text-red-500';
  }, []);
  return <div className="space-y-6">
      {/* 压力测试状态 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              压力测试控制
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isActive ? "default" : "outline"}>
                {isActive ? "运行中" : "停止"}
              </Badge>
              {isActive ? <Button variant="destructive" onClick={stopStressTest}>
                  <Square className="w-4 h-4 mr-2" />
                  停止测试
                </Button> : <Button onClick={startStressTest}>
                  <Play className="w-4 h-4 mr-2" />
                  开始测试
                </Button>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{metrics.currentUsers.toFixed(0)}</div>
              <div className="text-xs text-muted-foreground">当前用户</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{formatValue(metrics.requestsPerSecond, 'rps')}</div>
              <div className="text-xs text-muted-foreground">请求/秒</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStatusColor(metrics.averageResponseTime, {
              good: 200,
              warning: 500
            })}`}>
                {formatValue(metrics.averageResponseTime, 'ms')}
              </div>
              <div className="text-xs text-muted-foreground">响应时间</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStatusColor(metrics.errorRate * 100, {
              good: 1,
              warning: 5
            })}`}>
                {formatValue(metrics.errorRate * 100, 'percentage')}
              </div>
              <div className="text-xs text-muted-foreground">错误率</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStatusColor(metrics.cpuUsage, {
              good: 50,
              warning: 80
            })}`}>
                {formatValue(metrics.cpuUsage, 'percentage')}
              </div>
              <div className="text-xs text-muted-foreground">CPU使用</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStatusColor(metrics.memoryUsage, {
              good: 50,
              warning: 80
            })}`}>
                {formatValue(metrics.memoryUsage, 'percentage')}
              </div>
              <div className="text-xs text-muted-foreground">内存使用</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 控制面板和监控 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="control">控制面板</TabsTrigger>
          <TabsTrigger value="monitoring">实时监控</TabsTrigger>
          <TabsTrigger value="history">历史数据</TabsTrigger>
        </TabsList>

        {/* 控制面板 */}
        <TabsContent value="control">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                测试配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testType">测试类型</Label>
                    <Select value={config.testType} onValueChange={value => updateConfig('testType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testTypes.map(type => <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentTestType.description}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="concurrentUsers">并发用户数</Label>
                    <Input id="concurrentUsers" type="number" value={config.concurrentUsers} onChange={e => updateConfig('concurrentUsers', parseInt(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="duration">测试时长 (秒)</Label>
                    <Input id="duration" type="number" value={config.duration} onChange={e => updateConfig('duration', parseInt(e.target.value))} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rampUpTime">递增时间 (秒)</Label>
                    <Input id="rampUpTime" type="number" value={config.rampUpTime} onChange={e => updateConfig('rampUpTime', parseInt(e.target.value))} />
                  </div>
                  <div>
                    <Label htmlFor="targetEndpoint">目标端点</Label>
                    <Input id="targetEndpoint" value={config.targetEndpoint} onChange={e => updateConfig('targetEndpoint', e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoStop">自动停止</Label>
                      <p className="text-xs text-muted-foreground">错误率超过5%时自动停止</p>
                    </div>
                    <Switch id="autoStop" defaultChecked />
                  </div>
                </div>
              </div>

              {isActive && <Alert>
                  <Activity className="h-4 w-4" />
                  <AlertDescription>
                    压力测试正在运行中，当前模拟 {metrics.currentUsers.toFixed(0)} 个并发用户
                  </AlertDescription>
                </Alert>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 实时监控 */}
        <TabsContent value="monitoring">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                实时监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(metrics).map(([key, value]) => {
                const configs = {
                  currentUsers: {
                    label: '当前用户数',
                    icon: <Users className="w-4 h-4" />,
                    max: config.concurrentUsers
                  },
                  requestsPerSecond: {
                    label: '请求/秒',
                    icon: <Wifi className="w-4 h-4" />,
                    max: 2000
                  },
                  averageResponseTime: {
                    label: '平均响应时间',
                    icon: <Clock className="w-4 h-4" />,
                    max: 1000
                  },
                  errorRate: {
                    label: '错误率',
                    icon: <AlertTriangle className="w-4 h-4" />,
                    max: 0.1
                  },
                  cpuUsage: {
                    label: 'CPU使用率',
                    icon: <Cpu className="w-4 h-4" />,
                    max: 100
                  },
                  memoryUsage: {
                    label: '内存使用率',
                    icon: <HardDrive className="w-4 h-4" />,
                    max: 100
                  }
                };
                const config = configs[key];
                const percentage = value / config.max * 100;
                return <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {config.icon}
                          <span className="font-medium">{config.label}</span>
                        </div>
                        <span className="text-sm">
                          {key === 'errorRate' ? formatValue(value * 100, 'percentage') : key === 'requestsPerSecond' ? formatValue(value, 'rps') : key === 'averageResponseTime' ? formatValue(value, 'ms') : formatValue(value, 'percentage')}
                        </span>
                      </div>
                      <Progress value={Math.min(percentage, 100)} className="w-full" />
                    </div>;
              })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 历史数据 */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                历史数据
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    最近 {history.length} 个数据点
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">用户数趋势</h4>
                      <div className="text-2xl font-bold text-blue-500">
                        {history[history.length - 1]?.currentUsers.toFixed(0) || 0}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">平均响应时间</h4>
                      <div className="text-2xl font-bold">
                        {formatValue(history.reduce((sum, h) => sum + h.averageResponseTime, 0) / history.length, 'ms')}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">平均错误率</h4>
                      <div className="text-2xl font-bold text-red-500">
                        {formatValue(history.reduce((sum, h) => sum + h.errorRate, 0) / history.length * 100, 'percentage')}
                      </div>
                    </div>
                  </div>
                </div> : <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4" />
                  <p>暂无历史数据</p>
                </div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
export default StressTestControl;