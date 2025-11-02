
// @ts-ignore;
import { useEffect, useRef, useCallback, useState } from 'react';
// @ts-ignore;
import performanceMonitor from '@/lib/PerformanceMonitor';

// React Hook for component performance monitoring
export function usePerformanceMonitor(componentName, options = {}) {
  const {
    enableRenderTracking = true,
    enableInteractionTracking = true,
    trackProps = false,
    customMetrics = {}
  } = options;

  const renderStartTime = useRef(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [isTracking, setIsTracking] = useState(true);

  // 开始渲染计时
  useEffect(() => {
    if (!enableRenderTracking || !isTracking) return;

    renderStartTime.current = performance.now();
    
    return () => {
      if (renderStartTime.current) {
        const renderTime = performance.now() - renderStartTime.current;
        performanceMonitor.recordComponentRender(componentName, renderTime, {
          trackProps,
          customMetrics
        });
      }
    };
  }, [componentName, enableRenderTracking, isTracking, trackProps, customMetrics]);

  // 监听性能指标更新
  useEffect(() => {
    const handleMetricUpdate = (event) => {
      const { type, metric } = event.detail;
      setPerformanceData(prev => ({
        ...prev,
        [type]: metric
      }));
    };

    window.addEventListener('performanceMetric', handleMetricUpdate);
    
    return () => {
      window.removeEventListener('performanceMetric', handleMetricUpdate);
    };
  }, []);

  // 记录用户交互
  const recordInteraction = useCallback((interactionType, element, duration) => {
    if (!enableInteractionTracking || !isTracking) return;
    
    performanceMonitor.recordUserInteraction(interactionType, element, duration);
  }, [enableInteractionTracking, isTracking]);

  // 记录自定义指标
  const recordCustomMetric = useCallback((name, value, unit = '') => {
    if (!isTracking) return;
    
    const customMetric = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      componentName
    };
    
    performanceMonitor.recordMetric('custom', customMetric);
  }, [isTracking, componentName]);

  // 开始计时
  const startTimer = useCallback((timerName) => {
    if (!isTracking) return null;
    
    const startTime = performance.now();
    return {
      startTime,
      timerName,
      end: () => {
        const duration = performance.now() - startTime;
        recordCustomMetric(timerName, duration, 'ms');
        return duration;
      }
    };
  }, [isTracking, recordCustomMetric]);

  // 获取性能统计
  const getStats = useCallback(() => {
    return performanceMonitor.getStats();
  }, []);

  // 获取性能评分
  const getScore = useCallback(() => {
    return performanceMonitor.getPerformanceScore();
  }, []);

  // 暂停/恢复跟踪
  const toggleTracking = useCallback(() => {
    setIsTracking(prev => !prev);
  }, []);

  // 清理数据
  const clearData = useCallback(() => {
    performanceMonitor.cleanup();
    setPerformanceData(null);
  }, []);

  return {
    performanceData,
    recordInteraction,
    recordCustomMetric,
    startTimer,
    getStats,
    getScore,
    isTracking,
    toggleTracking,
    clearData
  };
}

// Hook for monitoring specific performance metrics
export function usePerformanceMetrics(metricTypes = []) {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateMetrics = () => {
      const allMetrics = performanceMonitor.getMetrics();
      const filteredMetrics = {};
      
      metricTypes.forEach(type => {
        if (allMetrics[type]) {
          filteredMetrics[type] = allMetrics[type];
        }
      });
      
      setMetrics(filteredMetrics);
      setLoading(false);
    };

    updateMetrics();
    
    const handlePerformanceReport = (event) => {
      updateMetrics();
    };

    window.addEventListener('performanceReport', handlePerformanceReport);
    
    return () => {
      window.removeEventListener('performanceReport', handlePerformanceReport);
    };
  }, [metricTypes]);

  return { metrics, loading };
}

// Hook for performance alerts
export function usePerformanceAlerts(thresholds = {}) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const checkThresholds = () => {
      const stats = performanceMonitor.getStats();
      const newAlerts = [];

      // 检查页面加载时间
      if (thresholds.pageLoadTime && stats.pageLoad) {
        if (stats.pageLoad.pageLoadTime > thresholds.pageLoadTime) {
          newAlerts.push({
            type: 'pageLoad',
            level: 'warning',
            message: `页面加载时间过长: ${Math.round(stats.pageLoad.pageLoadTime)}ms`,
            value: stats.pageLoad.pageLoadTime,
            threshold: thresholds.pageLoadTime
          });
        }
      }

      // 检查网络请求成功率
      if (thresholds.successRate && stats.network) {
        if (stats.network.successRate < thresholds.successRate) {
          newAlerts.push({
            type: 'network',
            level: 'error',
            message: `网络请求成功率过低: ${Math.round(stats.network.successRate)}%`,
            value: stats.network.successRate,
            threshold: thresholds.successRate
          });
        }
      }

      // 检查内存使用率
      if (thresholds.memoryUsage && stats.memory) {
        const memoryUsage = parseFloat(stats.memory.memoryUsagePercent);
        if (memoryUsage > thresholds.memoryUsage) {
          newAlerts.push({
            type: 'memory',
            level: 'warning',
            message: `内存使用率过高: ${memoryUsage}%`,
            value: memoryUsage,
            threshold: thresholds.memoryUsage
          });
        }
      }

      // 检查长任务
      if (thresholds.longTaskTime && stats.longTask) {
        if (stats.longTask.totalBlockingTime > thresholds.longTaskTime) {
          newAlerts.push({
            type: 'longTask',
            level: 'error',
            message: `长任务阻塞时间过长: ${Math.round(stats.longTask.totalBlockingTime)}ms`,
            value: stats.longTask.totalBlockingTime,
            threshold: thresholds.longTaskTime
          });
        }
      }

      setAlerts(newAlerts);
      
      // 触发警告事件
      newAlerts.forEach(alert => {
        const event = new CustomEvent('performanceAlert', {
          detail: alert
        });
        window.dispatchEvent(event);
      });
    };

    const interval = setInterval(checkThresholds, 5000);
    checkThresholds();
    
    return () => clearInterval(interval);
  }, [thresholds]);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return { alerts, clearAlerts };
}

// Hook for performance optimization suggestions
export function usePerformanceOptimization() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const generateSuggestions = () => {
      const stats = performanceMonitor.getStats();
      const newSuggestions = [];

      // 页面加载优化建议
      if (stats.pageLoad) {
        if (stats.pageLoad.pageLoadTime > 3000) {
          newSuggestions.push({
            type: 'pageLoad',
            priority: 'high',
            title: '优化页面加载速度',
            description: '页面加载时间超过3秒，建议优化资源加载和渲染性能',
            actions: [
              '启用资源压缩',
              '使用CDN加速',
              '优化图片大小',
              '减少HTTP请求数'
            ]
          });
        }

        if (stats.pageLoad.firstContentfulPaintTime > 1500) {
          newSuggestions.push({
            type: 'render',
            priority: 'medium',
            title: '优化首次内容渲染',
            description: '首次内容渲染时间过长，影响用户体验',
            actions: [
              '内联关键CSS',
              '预加载重要资源',
              '优化渲染路径'
            ]
          });
        }
      }

      // 网络请求优化建议
      if (stats.network) {
        if (stats.network.successRate < 95) {
          newSuggestions.push({
            type: 'network',
            priority: 'high',
            title: '提高网络请求成功率',
            description: '网络请求成功率过低，需要检查网络连接和API稳定性',
            actions: [
              '实现请求重试机制',
              '添加网络状态检测',
              '优化API响应处理'
            ]
          });
        }

        if (stats.network.averageResponseTime > 1000) {
          newSuggestions.push({
            type: 'network',
            priority: 'medium',
            title: '优化API响应时间',
            description: 'API响应时间过长，影响用户体验',
            actions: [
              '优化数据库查询',
              '添加缓存机制',
              '使用更快的网络协议'
            ]
          });
        }
      }

      // 内存使用优化建议
      if (stats.memory) {
        const memoryUsage = parseFloat(stats.memory.memoryUsagePercent);
        if (memoryUsage > 70) {
          newSuggestions.push({
            type: 'memory',
            priority: 'medium',
            title: '优化内存使用',
            description: '内存使用率过高，可能导致性能问题',
            actions: [
              '检查内存泄漏',
              '优化数据结构',
              '及时清理无用对象'
            ]
          });
        }
      }

      // 组件渲染优化建议
      if (stats.component) {
        const slowRenderRate = stats.component.slowRenders / stats.component.totalRenders;
        if (slowRenderRate > 0.1) {
          newSuggestions.push({
            type: 'component',
            priority: 'medium',
            title: '优化组件渲染性能',
            description: '存在较多慢渲染组件，影响界面流畅度',
            actions: [
              '使用React.memo优化',
              '避免不必要的重渲染',
              '优化组件结构'
            ]
          });
        }
      }

      setSuggestions(newSuggestions);
    };

    generateSuggestions();
    const interval = setInterval(generateSuggestions, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { suggestions };
}

// Higher-order component for performance monitoring
export function withPerformanceMonitor(WrappedComponent, options = {}) {
  const {
    componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component',
    enableRenderTracking = true,
    enableInteractionTracking = true
  } = options;

  return function PerformanceMonitoredComponent(props) {
    const { recordInteraction } = usePerformanceMonitor(componentName, {
      enableRenderTracking,
      enableInteractionTracking
    });

    const handleClick = useCallback((event) => {
      const startTime = performance.now();
      
      // 调用原始点击处理
      if (props.onClick) {
        props.onClick(event);
      }
      
      const duration = performance.now() - startTime;
      recordInteraction('click', event.target, duration);
    }, [props.onClick, recordInteraction]);

    const handleChange = useCallback((event) => {
      const startTime = performance.now();
      
      // 调用原始变化处理
      if (props.onChange) {
        props.onChange(event);
      }
      
      const duration = performance.now() - startTime;
      recordInteraction('change', event.target, duration);
    }, [props.onChange, recordInteraction]);

    return <WrappedComponent {...props} onClick={handleClick} onChange={handleChange} />;
  };
}

export default usePerformanceMonitor;
