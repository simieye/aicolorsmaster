// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Progress, Badge } from '@/components/ui';
// @ts-ignore;
import { Activity, Clock, Zap, Database, TrendingUp, AlertTriangle } from 'lucide-react';

export function PerformanceMetricsPanel({
  testResults,
  testHistory,
  performanceMetrics
}) {
  const calculateAverageDuration = results => {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, result) => sum + (result.duration || 0), 0);
    return total / results.length;
  };
  const getSuccessRate = results => {
    if (results.length === 0) return 0;
    const successCount = results.filter(result => result.status === 'success').length;
    return successCount / results.length * 100;
  };
  const getScenarioStats = () => {
    const stats = {};
    testHistory.forEach(result => {
      if (!stats[result.scenario]) {
        stats[result.scenario] = {
          count: 0,
          successCount: 0,
          totalDuration: 0,
          avgDuration: 0
        };
      }
      stats[result.scenario].count++;
      if (result.status === 'success') {
        stats[result.scenario].successCount++;
      }
      stats[result.scenario].totalDuration += result.duration || 0;
      stats[result.scenario].avgDuration = stats[result.scenario].totalDuration / stats[result.scenario].count;
    });
    return stats;
  };
  const scenarioStats = getScenarioStats();
  return <div className="space-y-6">
      {/* 总体性能指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            总体性能指标
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {testHistory.length}
              </div>
              <div className="text-xs text-muted-foreground">总测试次数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {getSuccessRate(testHistory).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">成功率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {calculateAverageDuration(testHistory).toFixed(0)}ms
              </div>
              <div className="text-xs text-muted-foreground">平均耗时</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {performanceMetrics ? Object.keys(performanceMetrics.components || {}).length : 0}
              </div>
              <div className="text-xs text-muted-foreground">监控组件</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 场景性能统计 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            场景性能统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(scenarioStats).map(([scenario, stats]) => <div key={scenario} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{scenario}</h4>
                  <Badge variant={stats.successCount === stats.count ? 'default' : 'secondary'}>
                    {stats.successCount}/{stats.count} 成功
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">成功率</div>
                    <div className="font-medium">
                      {(stats.successCount / stats.count * 100).toFixed(1)}%
                    </div>
                    <Progress value={stats.successCount / stats.count * 100} className="mt-1" />
                  </div>
                  <div>
                    <div className="text-muted-foreground">平均耗时</div>
                    <div className="font-medium">{stats.avgDuration.toFixed(0)}ms</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">测试次数</div>
                    <div className="font-medium">{stats.count}</div>
                  </div>
                </div>
              </div>)}
            
            {Object.keys(scenarioStats).length === 0 && <div className="text-center py-8 text-muted-foreground">
                暂无测试数据
              </div>}
          </div>
        </CardContent>
      </Card>

      {/* 最近测试结果 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            最近测试结果
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testHistory.slice(-10).reverse().map((result, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${result.status === 'success' ? 'bg-green-500' : result.status === 'failed' ? 'bg-red-500' : result.status === 'partial' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
                  <div>
                    <div className="font-medium text-sm">{result.scenario}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(result.endTime).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={result.status === 'success' ? 'default' : result.status === 'failed' ? 'destructive' : 'secondary'}>
                    {result.status}
                  </Badge>
                  {result.duration && <span className="text-xs text-muted-foreground">
                      {result.duration.toFixed(0)}ms
                    </span>}
                </div>
              </div>)}
            
            {testHistory.length === 0 && <div className="text-center py-8 text-muted-foreground">
                暂无测试历史
              </div>}
          </div>
        </CardContent>
      </Card>

      {/* 性能监控数据 */}
      {performanceMetrics && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              实时性能监控
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 组件性能 */}
              {Object.keys(performanceMetrics.components || {}).length > 0 && <div>
                  <h4 className="font-medium mb-3">组件性能</h4>
                  <div className="space-y-2">
                    {Object.entries(performanceMetrics.components).slice(0, 5).map(([name, metrics]) => <div key={name} className="flex items-center justify-between text-sm">
                        <span>{name}</span>
                        <span className={metrics.averageRenderTime > 16.67 ? 'text-red-500' : 'text-green-500'}>
                          {metrics.averageRenderTime.toFixed(2)}ms
                        </span>
                      </div>)}
                  </div>
                </div>}

              {/* 内存使用 */}
              {performanceMetrics.memory && <div>
                  <h4 className="font-medium mb-3">内存使用</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>已使用</span>
                      <span>{performanceMetrics.memory.usedJSHeapSize}MB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>总计</span>
                      <span>{performanceMetrics.memory.totalJSHeapSize}MB</span>
                    </div>
                  </div>
                </div>}
            </div>
          </CardContent>
        </Card>}
    </div>;
}