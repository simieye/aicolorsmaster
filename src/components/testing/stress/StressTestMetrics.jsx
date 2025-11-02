// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Progress, Badge } from '@/components/ui';
// @ts-ignore;
import { Users, Activity, Wifi, Cpu, HardDrive, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

export function StressTestMetrics({
  metrics,
  config,
  isActive
}) {
  const getMetricStatus = (value, type) => {
    const thresholds = {
      responseTime: {
        good: 200,
        warning: 500,
        critical: 1000
      },
      errorRate: {
        good: 1,
        warning: 5,
        critical: 10
      },
      cpuUsage: {
        good: 50,
        warning: 75,
        critical: 90
      },
      memoryUsage: {
        good: 60,
        warning: 80,
        critical: 95
      }
    };
    const threshold = thresholds[type];
    if (!threshold) return 'good';
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
  const getStatusIcon = status => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };
  const formatNumber = num => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  const responseTimeStatus = getMetricStatus(metrics.averageResponseTime, 'responseTime');
  const errorRateStatus = getMetricStatus(metrics.errorRate, 'errorRate');
  const cpuStatus = getMetricStatus(metrics.cpuUsage, 'cpuUsage');
  const memoryStatus = getMetricStatus(metrics.memoryUsage, 'memoryUsage');
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 当前用户数 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            当前用户数
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{formatNumber(metrics.currentUsers)}</div>
            <div className="text-xs text-muted-foreground">
              目标: {formatNumber(config.concurrentUsers)}
            </div>
            <Progress value={metrics.currentUsers / config.concurrentUsers * 100} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 请求统计 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            请求统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">总请求数</span>
              <span className="font-medium">{formatNumber(metrics.totalRequests)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">成功</span>
              <span className="font-medium text-green-500">{formatNumber(metrics.successfulRequests)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">失败</span>
              <span className="font-medium text-red-500">{formatNumber(metrics.failedRequests)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">当前RPS</span>
              <span className="font-medium">{metrics.currentRPS}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 响应时间 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              响应时间
            </div>
            {getStatusIcon(responseTimeStatus)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getStatusColor(responseTimeStatus)}`}>
              {metrics.averageResponseTime.toFixed(0)}ms
            </div>
            <div className="text-xs text-muted-foreground">
              平均响应时间
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-green-500">优秀: &lt;200ms</span>
              <span className="text-yellow-500">警告: &lt;500ms</span>
              <span className="text-red-500">严重: &gt;500ms</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 错误率 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              错误率
            </div>
            {getStatusIcon(errorRateStatus)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getStatusColor(errorRateStatus)}`}>
              {metrics.errorRate.toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground">
              请求失败率
            </div>
            <Progress value={Math.min(metrics.errorRate, 100)} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>

      {/* CPU使用率 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              CPU使用率
            </div>
            {getStatusIcon(cpuStatus)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getStatusColor(cpuStatus)}`}>
              {metrics.cpuUsage.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              处理器使用率
            </div>
            <Progress value={metrics.cpuUsage} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 内存使用率 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              内存使用率
            </div>
            {getStatusIcon(memoryStatus)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getStatusColor(memoryStatus)}`}>
              {metrics.memoryUsage.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              内存占用率
            </div>
            <Progress value={metrics.memoryUsage} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 成功率 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            成功率
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-500">
              {metrics.totalRequests > 0 ? (metrics.successfulRequests / metrics.totalRequests * 100).toFixed(1) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">
              请求成功率
            </div>
            <Progress value={metrics.totalRequests > 0 ? metrics.successfulRequests / metrics.totalRequests * 100 : 0} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 测试状态 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            测试状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Badge variant={isActive ? 'default' : 'outline'} className="w-full justify-center">
              {isActive ? '运行中' : '已停止'}
            </Badge>
            <div className="text-xs text-muted-foreground text-center">
              {isActive ? '压力测试正在进行' : '等待开始测试'}
            </div>
            {isActive && <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500">实时监控中</span>
              </div>}
          </div>
        </CardContent>
      </Card>
    </div>;
}