
import { useEffect, useRef, useCallback } from 'react';
import performanceMonitor from '@/lib/PerformanceMonitor';

/**
 * 性能监控 Hook
 * 用于监控组件渲染性能
 */
export function usePerformanceMonitor(componentName, props = {}) {
  const renderIdRef = useRef(null);
  const mountTimeRef = useRef(null);

  // 组件挂载时开始监控
  useEffect(() => {
    mountTimeRef.current = performance.now();
    renderIdRef.current = performanceMonitor.startComponentRender(componentName, {
      ...props,
      phase: 'mount'
    });

    return () => {
      // 组件卸载时结束监控
      if (renderIdRef.current) {
        const renderTime = performanceMonitor.endComponentRender(renderIdRef.current);
        if (renderTime) {
          console.log(`${componentName} 组件渲染时间: ${renderTime.toFixed(2)}ms`);
        }
      }
    };
  }, []);

  // 监控更新渲染
  useEffect(() => {
    if (mountTimeRef.current) {
      const updateRenderId = performanceMonitor.startComponentRender(componentName, {
        ...props,
        phase: 'update'
      });
      
      return () => {
        performanceMonitor.endComponentRender(updateRenderId);
      };
    }
  });

  // 手动开始性能监控
  const startMonitoring = useCallback((customProps = {}) => {
    return performanceMonitor.startComponentRender(componentName, {
      ...props,
      ...customProps
    });
  }, [componentName, props]);

  // 手动结束性能监控
  const endMonitoring = useCallback((renderId) => {
    return performanceMonitor.endComponentRender(renderId);
  }, []);

  return {
    startMonitoring,
    endMonitoring
  };
}

/**
 * 交互性能监控 Hook
 */
export function useInteractionMonitor() {
  const startInteraction = useCallback((type, target) => {
    return performanceMonitor.startInteraction(type, target);
  }, []);

  const endInteraction = useCallback((interactionId) => {
    return performanceMonitor.endInteraction(interactionId);
  }, []);

  return {
    startInteraction,
    endInteraction
  };
}

/**
 * 性能指标显示 Hook
 */
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const updateMetrics = () => {
      const currentMetrics = performanceMonitor.getMetrics();
      setMetrics(currentMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // 每5秒更新一次

    return () => clearInterval(interval);
  }, []);

  return metrics;
}

export default usePerformanceMonitor;
