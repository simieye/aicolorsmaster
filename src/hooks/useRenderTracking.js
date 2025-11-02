
import { useEffect, useRef, useCallback, useState } from 'react';
import performanceMonitor from '@/lib/PerformanceMonitor';

/**
 * 渲染跟踪 Hook
 * 自动跟踪组件的渲染性能
 */
export function useRenderTracking(componentName, options = {}) {
  const {
    trackProps = false,
    trackUpdates = true,
    threshold = 16.67, // 60fps
    onSlowRender = null
  } = options;

  const renderCountRef = useRef(0);
  const lastRenderTimeRef = useRef(0);
  const propsRef = useRef({});

  // 跟踪组件渲染
  useEffect(() => {
    renderCountRef.current++;
    const now = performance.now();
    
    if (lastRenderTimeRef.current > 0) {
      const renderTime = now - lastRenderTimeRef.current;
      
      // 记录渲染性能
      performanceMonitor.recordComponentMetric(componentName, {
        renderTime,
        renderCount: renderCountRef.current,
        props: trackProps ? propsRef.current : undefined,
        timestamp: now
      });

      // 检查是否超过阈值
      if (renderTime > threshold && onSlowRender) {
        onSlowRender({
          componentName,
          renderTime,
          threshold,
          renderCount: renderCountRef.current
        });
      }
    }
    
    lastRenderTimeRef.current = now;
  });

  // 更新 props 引用
  const updateProps = useCallback((newProps) => {
    if (trackProps) {
      propsRef.current = newProps;
    }
  }, [trackProps]);

  return {
    renderCount: renderCountRef.current,
    updateProps
  };
}

/**
 * 重渲染优化 Hook
 * 检测不必要的重渲染
 */
export function useRerenderOptimization(componentName) {
  const renderCountRef = useRef(0);
  const propsHistoryRef = useRef([]);
  const lastPropsRef = useRef({});

  useEffect(() => {
    renderCountRef.current++;
  });

  const trackProps = useCallback((props) => {
    const currentProps = JSON.stringify(props);
    const lastProps = JSON.stringify(lastPropsRef.current);

    if (currentProps !== lastProps) {
      propsHistoryRef.current.push({
        timestamp: Date.now(),
        propsChanged: true,
        renderCount: renderCountRef.current
      });
    } else {
      propsHistoryRef.current.push({
        timestamp: Date.now(),
        propsChanged: false,
        renderCount: renderCountRef.current
      });

      // 检测不必要的重渲染
      if (propsHistoryRef.current.length > 1) {
        const lastEntry = propsHistoryRef.current[propsHistoryRef.current.length - 2];
        if (!lastEntry.propsChanged) {
          console.warn(`${componentName} 可能存在不必要的重渲染`, {
            renderCount: renderCountRef.current,
            timestamp: Date.now()
          });
        }
      }
    }

    lastPropsRef.current = props;

    // 限制历史记录长度
    if (propsHistoryRef.current.length > 50) {
      propsHistoryRef.current = propsHistoryRef.current.slice(-50);
    }
  }, [componentName]);

  return {
    renderCount: renderCountRef.current,
    trackProps,
    propsHistory: propsHistoryRef.current
  };
}

/**
 * 性能边界 Hook
 * 在性能下降时降级功能
 */
export function usePerformanceBoundary(componentName, options = {}) {
  const {
    renderThreshold = 16.67,
    memoryThreshold = 50 * 1024 * 1024, // 50MB
    onPerformanceDegradation = null
  } = options;

  const [isDegraded, setIsDegraded] = useState(false);
  const performanceHistoryRef = useRef([]);

  const checkPerformance = useCallback(() => {
    const metrics = performanceMonitor.getMetrics();
    const componentMetrics = metrics.components[componentName];
    
    if (componentMetrics) {
      const currentPerformance = {
        renderTime: componentMetrics.averageRenderTime,
        memory: metrics.memory?.usedJSHeapSize || 0,
        timestamp: Date.now()
      };

      performanceHistoryRef.current.push(currentPerformance);

      // 限制历史记录长度
      if (performanceHistoryRef.current.length > 10) {
        performanceHistoryRef.current = performanceHistoryRef.current.slice(-10);
      }

      // 检查性能是否下降
      const recentPerformance = performanceHistoryRef.current.slice(-5);
      const avgRenderTime = recentPerformance.reduce((sum, p) => sum + p.renderTime, 0) / recentPerformance.length;
      const avgMemory = recentPerformance.reduce((sum, p) => sum + p.memory, 0) / recentPerformance.length;

      const shouldDegrade = avgRenderTime > renderThreshold || avgMemory > memoryThreshold;

      if (shouldDegrade && !isDegraded) {
        setIsDegraded(true);
        onPerformanceDegradation?.({
          componentName,
          avgRenderTime,
          avgMemory,
          threshold: { render: renderThreshold, memory: memoryThreshold }
        });
      } else if (!shouldDegrade && isDegraded) {
        setIsDegraded(false);
      }
    }
  }, [componentName, renderThreshold, memoryThreshold, isDegraded, onPerformanceDegradation]);

  useEffect(() => {
    const interval = setInterval(checkPerformance, 5000); // 每5秒检查一次
    return () => clearInterval(interval);
  }, [checkPerformance]);

  return {
    isDegraded,
    checkPerformance,
    performanceHistory: performanceHistoryRef.current
  };
}

export default useRenderTracking;
