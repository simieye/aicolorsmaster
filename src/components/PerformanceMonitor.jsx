// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Activity, Clock, Cpu, MemoryStick, AlertTriangle, TrendingUp, RefreshCw, Eye, EyeOff } from 'lucide-react';

// @ts-ignore;
import { usePerformanceMetrics } from '@/hooks/usePerformanceMonitor';
export function PerformanceMonitor({
  visible = false,
  onToggle
}) {
  const [expanded, setExpanded] = useState(false);
  const metrics = usePerformanceMetrics();
  if (!visible) {
    return <Button variant="outline" size="sm" onClick={onToggle} className="fixed bottom-4 right-4 z-50">
        <Eye className="w-4 h-4 mr-2" />
        性能监控
      </Button>;
  }
  return <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-auto bg-background border rounded-lg shadow-lg">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              性能监控
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
                {expanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {metrics ? <div className="space-y-4">
              {/* 组件性能 */}
              {Object.keys(metrics.components).length > 0 && <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    组件性能
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(metrics.components).slice(0, expanded ? undefined : 3).map(([name, data]) => <div key={name} className="text-xs p-2 bg-muted rounded">
                        <div className="flex justify-between">
                          <span className="font-medium">{name}</span>
                          <span className={data.averageRenderTime > 16.67 ? 'text-red-500' : 'text-green-500'}>
                            {data.averageRenderTime}ms
                          </span>
                        </div>
                        {expanded && <div className="mt-1 text-muted-foreground">
                            渲染次数: {data.renderCount} | 
                            最大: {data.maxRenderTime}ms | 
                            最小: {data.minRenderTime}ms
                          </div>}
                      </div>)}
                  </div>
                </div>}

              {/* 交互性能 */}
              {Object.keys(metrics.interactions).length > 0 && <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    交互性能
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(metrics.interactions).slice(0, expanded ? undefined : 3).map(([type, data]) => <div key={type} className="text-xs p-2 bg-muted rounded">
                        <div className="flex justify-between">
                          <span className="font-medium">{type}</span>
                          <span className={data.averageTime > 100 ? 'text-red-500' : 'text-green-500'}>
                            {data.averageTime}ms
                          </span>
                        </div>
                        {expanded && <div className="mt-1 text-muted-foreground">
                            次数: {data.count} | 
                            最大: {data.maxTime}ms
                          </div>}
                      </div>)}
                  </div>
                </div>}

              {/* 内存使用 */}
              {metrics.memory && <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <MemoryStick className="w-4 h-4" />
                    内存使用
                  </h4>
                  <div className="text-xs p-2 bg-muted rounded">
                    <div className="flex justify-between">
                      <span>已使用</span>
                      <span className={metrics.memory.usedJSHeapSize > 50 ? 'text-red-500' : 'text-green-500'}>
                        {metrics.memory.usedJSHeapSize}MB
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>总计</span>
                      <span>{metrics.memory.totalJSHeapSize}MB</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>限制</span>
                      <span>{metrics.memory.jsHeapSizeLimit}MB</span>
                    </div>
                  </div>
                </div>}

              {/* 错误统计 */}
              {metrics.errors.totalErrors > 0 && <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    错误统计
                  </h4>
                  <div className="text-xs p-2 bg-red-50 border border-red-200 rounded">
                    <div className="flex justify-between">
                      <span>总错误数</span>
                      <span className="text-red-500">{metrics.errors.totalErrors}</span>
                    </div>
                    {expanded && metrics.errors.recentErrors.length > 0 && <div className="mt-2 space-y-1">
                        {metrics.errors.recentErrors.slice(0, 3).map((error, index) => <div key={index} className="text-red-600">
                            {error.message}
                          </div>)}
                      </div>}
                  </div>
                </div>}

              {/* 性能趋势 */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  性能状态
                </h4>
                <div className="text-xs p-2 bg-muted rounded">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${Object.values(metrics.components).every(c => c.averageRenderTime <= 16.67) && Object.values(metrics.interactions).every(i => i.averageTime <= 100) && (!metrics.memory || metrics.memory.usedJSHeapSize <= 50) ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span>
                      {Object.values(metrics.components).every(c => c.averageRenderTime <= 16.67) && Object.values(metrics.interactions).every(i => i.averageTime <= 100) && (!metrics.memory || metrics.memory.usedJSHeapSize <= 50) ? '性能良好' : '需要优化'}
                    </span>
                  </div>
                </div>
              </div>
            </div> : <div className="text-center py-4 text-muted-foreground">
              <RefreshCw className="w-4 h-4 animate-spin mx-auto mb-2" />
              <p className="text-sm">加载性能数据...</p>
            </div>}
        </CardContent>
      </Card>
    </div>;
}
export default PerformanceMonitor;