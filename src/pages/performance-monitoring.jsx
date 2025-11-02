// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Activity, Clock, Zap, AlertTriangle, TrendingUp, Settings, Download, RefreshCw, BarChart3, PieChart, Cpu, HardDrive, Wifi, Database, Eye, Filter, Calendar } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { PerformanceMonitorPanel, PerformanceMonitorWidget } from '@/components/PerformanceMonitor';
// @ts-ignore;
import performanceMonitor from '@/lib/PerformanceMonitor';
export default function PerformanceMonitoringPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [showWidget, setShowWidget] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [alertThresholds, setAlertThresholds] = useState({
    pageLoadTime: 3000,
    responseTime: 1000,
    memoryUsage: 80,
    errorRate: 5
  });

  // 监听性能警告
  useEffect(() => {
    const handlePerformanceAlert = event => {
      const {
        type,
        message,
        level
      } = event.detail;
      toast({
        title: `性能${level === 'error' ? '警告' : '提醒'}`,
        description: message,
        variant: level === 'error' ? 'destructive' : 'default'
      });
    };
    window.addEventListener('performanceAlert', handlePerformanceAlert);
    return () => {
      window.removeEventListener('performanceAlert', handlePerformanceAlert);
    };
  }, [toast]);

  // 自动刷新设置
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // 触发性能数据刷新
        const event = new CustomEvent('refreshPerformanceData');
        window.dispatchEvent(event);
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // 处理导出
  const handleExport = useCallback(() => {
    try {
      const data = performanceMonitor.exportData();
      const blob = new Blob([data], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "导出成功",
        description: "性能报告已导出"
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [toast]);

  // 处理设置
  const handleSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  // 保存设置
  const saveSettings = useCallback(() => {
    // 保存设置到本地存储
    localStorage.setItem('performanceSettings', JSON.stringify({
      autoRefresh,
      refreshInterval,
      alertThresholds
    }));
    setShowSettings(false);
    toast({
      title: "设置已保存",
      description: "性能监控设置已更新"
    });
  }, [autoRefresh, refreshInterval, alertThresholds, toast]);

  // 加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('performanceSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setAutoRefresh(settings.autoRefresh ?? true);
        setRefreshInterval(settings.refreshInterval ?? 5000);
        setAlertThresholds(settings.alertThresholds ?? alertThresholds);
      } catch (error) {
        console.error('Failed to load performance settings:', error);
      }
    }
  }, []);

  // 设置面板
  const SettingsPanel = () => {
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">性能监控设置</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* 自动刷新设置 */}
              <div>
                <h4 className="font-medium mb-3">数据刷新</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">自动刷新</label>
                    <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">刷新间隔</label>
                    <select value={refreshInterval} onChange={e => setRefreshInterval(Number(e.target.value))} className="px-3 py-1 bg-background border rounded" disabled={!autoRefresh}>
                      <option value={1000}>1秒</option>
                      <option value={5000}>5秒</option>
                      <option value={10000}>10秒</option>
                      <option value={30000}>30秒</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 警告阈值设置 */}
              <div>
                <h4 className="font-medium mb-3">警告阈值</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">页面加载时间 (ms)</label>
                    <input type="number" value={alertThresholds.pageLoadTime} onChange={e => setAlertThresholds(prev => ({
                    ...prev,
                    pageLoadTime: Number(e.target.value)
                  }))} className="w-24 px-3 py-1 bg-background border rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">API响应时间 (ms)</label>
                    <input type="number" value={alertThresholds.responseTime} onChange={e => setAlertThresholds(prev => ({
                    ...prev,
                    responseTime: Number(e.target.value)
                  }))} className="w-24 px-3 py-1 bg-background border rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">内存使用率 (%)</label>
                    <input type="number" value={alertThresholds.memoryUsage} onChange={e => setAlertThresholds(prev => ({
                    ...prev,
                    memoryUsage: Number(e.target.value)
                  }))} className="w-24 px-3 py-1 bg-background border rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">错误率 (%)</label>
                    <input type="number" value={alertThresholds.errorRate} onChange={e => setAlertThresholds(prev => ({
                    ...prev,
                    errorRate: Number(e.target.value)
                  }))} className="w-24 px-3 py-1 bg-background border rounded" />
                  </div>
                </div>
              </div>

              {/* 显示设置 */}
              <div>
                <h4 className="font-medium mb-3">显示设置</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">显示悬浮窗</label>
                    <input type="checkbox" checked={showWidget} onChange={e => setShowWidget(e.target.checked)} className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                取消
              </Button>
              <Button onClick={saveSettings}>
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>;
  };
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="性能监控" showBack={true} />
        
        <div className="pb-20">
          {/* 操作栏 */}
          <div className="bg-card border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-medium">实时性能监控</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowWidget(!showWidget)}>
                  <Eye className="w-4 h-4 mr-2" />
                  {showWidget ? '隐藏' : '显示'}悬浮窗
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  导出报告
                </Button>
                <Button variant="outline" size="sm" onClick={handleSettings}>
                  <Settings className="w-4 h-4 mr-2" />
                  设置
                </Button>
              </div>
            </div>
          </div>

          {/* 性能监控面板 */}
          <div className="p-4">
            <PerformanceMonitorPanel showDetails={true} onExport={handleExport} onSettings={handleSettings} />
          </div>

          {/* 性能提示 */}
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span>性能优化建议</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">监控页面加载时间</p>
                      <p className="text-xs text-muted-foreground">保持页面加载时间在3秒以内，提升用户体验</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">优化资源加载</p>
                      <p className="text-xs text-muted-foreground">使用CDN、压缩资源、启用缓存以减少加载时间</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">监控内存使用</p>
                      <p className="text-xs text-muted-foreground">定期检查内存泄漏，避免内存使用过高</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">减少长任务</p>
                      <p className="text-xs text-muted-foreground">避免执行时间超过50ms的同步任务，保持界面流畅</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 性能监控悬浮窗 */}
        {showWidget && <PerformanceMonitorWidget position="bottom-right" />}

        {/* 设置面板 */}
        {showSettings && <SettingsPanel />}

        <TabBar />
      </div>
    </ErrorBoundary>;
}