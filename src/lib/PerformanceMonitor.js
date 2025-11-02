
/**
 * 性能监控器
 * 提供组件渲染性能监控、用���交互性能跟踪、内存使用监控等功能
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      components: new Map(),
      interactions: new Map(),
      navigation: new Map(),
      memory: [],
      errors: []
    };
    
    this.config = {
      enabled: true,
      maxMetrics: 1000,
      samplingRate: 0.1, // 10% 采样率
      reportInterval: 30000, // 30秒上报一次
      thresholds: {
        renderTime: 16.67, // 60fps = 16.67ms per frame
        interactionTime: 100, // 100ms内响应
        memoryUsage: 50 * 1024 * 1024, // 50MB
        jsHeapSize: 100 * 1024 * 1024 // 100MB
      }
    };

    this.observers = [];
    this.timers = new Map();
    this.isSupported = this.checkSupport();
    
    if (this.isSupported && this.config.enabled) {
      this.init();
    }
  }

  /**
   * 检查浏览器支持
   */
  checkSupport() {
    return typeof window !== 'undefined' && 
           typeof performance !== 'undefined' && 
           typeof PerformanceObserver !== 'undefined';
  }

  /**
   * 初始化性能监控
   */
  init() {
    this.setupPerformanceObservers();
    this.startMemoryMonitoring();
    this.startPeriodicReporting();
    this.setupErrorTracking();
  }

  /**
   * 设置性能观察器
   */
  setupPerformanceObservers() {
    try {
      // 监控长任务
      if ('PerformanceObserver' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.recordLongTask(entry);
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);

        // 监控导航性能
        const navigationObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.recordNavigation(entry);
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);

        // 监控资源加载
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.recordResourceLoad(entry);
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      }
    } catch (error) {
      console.warn('性能观察器初始化失败:', error);
    }
  }

  /**
   * 开始组件渲染监控
   */
  startComponentRender(componentName, props = {}) {
    if (!this.isSupported || !this.config.enabled) return;

    const renderId = `${componentName}_${Date.now()}_${Math.random()}`;
    const startTime = performance.now();

    this.timers.set(renderId, {
      componentName,
      startTime,
      props: this.sanitizeProps(props),
      type: 'render'
    });

    return renderId;
  }

  /**
   * 结束组件渲染监控
   */
  endComponentRender(renderId) {
    if (!this.isSupported || !this.config.enabled) return;

    const timer = this.timers.get(renderId);
    if (!timer) return;

    const endTime = performance.now();
    const renderTime = endTime - timer.startTime;

    this.recordComponentMetric(timer.componentName, {
      renderTime,
      props: timer.props,
      timestamp: endTime
    });

    this.timers.delete(renderId);

    // 检查性能阈值
    if (renderTime > this.config.thresholds.renderTime) {
      this.reportPerformanceIssue('slow_render', {
        componentName: timer.componentName,
        renderTime,
        threshold: this.config.thresholds.renderTime
      });
    }

    return renderTime;
  }

  /**
   * 记录组件性能指标
   */
  recordComponentMetric(componentName, metric) {
    if (!this.metrics.components.has(componentName)) {
      this.metrics.components.set(componentName, {
        renderCount: 0,
        totalRenderTime: 0,
        averageRenderTime: 0,
        maxRenderTime: 0,
        minRenderTime: Infinity,
        renders: []
      });
    }

    const componentMetrics = this.metrics.components.get(componentName);
    componentMetrics.renderCount++;
    componentMetrics.totalRenderTime += metric.renderTime;
    componentMetrics.averageRenderTime = componentMetrics.totalRenderTime / componentMetrics.renderCount;
    componentMetrics.maxRenderTime = Math.max(componentMetrics.maxRenderTime, metric.renderTime);
    componentMetrics.minRenderTime = Math.min(componentMetrics.minRenderTime, metric.renderTime);
    
    componentMetrics.renders.push({
      ...metric,
      timestamp: Date.now()
    });

    // 限制存储的渲染记录数量
    if (componentMetrics.renders.length > 100) {
      componentMetrics.renders = componentMetrics.renders.slice(-100);
    }
  }

  /**
   * 开始交互监控
   */
  startInteraction(interactionType, target) {
    if (!this.isSupported || !this.config.enabled) return;

    const interactionId = `${interactionType}_${Date.now()}_${Math.random()}`;
    const startTime = performance.now();

    this.timers.set(interactionId, {
      interactionType,
      target,
      startTime,
      type: 'interaction'
    });

    return interactionId;
  }

  /**
   * 结束交互监控
   */
  endInteraction(interactionId) {
    if (!this.isSupported || !this.config.enabled) return;

    const timer = this.timers.get(interactionId);
    if (!timer) return;

    const endTime = performance.now();
    const interactionTime = endTime - timer.startTime;

    this.recordInteractionMetric(timer.interactionType, {
      target: timer.target,
      interactionTime,
      timestamp: endTime
    });

    this.timers.delete(interactionId);

    // 检查性能阈值
    if (interactionTime > this.config.thresholds.interactionTime) {
      this.reportPerformanceIssue('slow_interaction', {
        interactionType: timer.interactionType,
        target: timer.target,
        interactionTime,
        threshold: this.config.thresholds.interactionTime
      });
    }

    return interactionTime;
  }

  /**
   * 记录交互性能指标
   */
  recordInteractionMetric(interactionType, metric) {
    if (!this.metrics.interactions.has(interactionType)) {
      this.metrics.interactions.set(interactionType, {
        count: 0,
        totalTime: 0,
        averageTime: 0,
        maxTime: 0,
        interactions: []
      });
    }

    const interactionMetrics = this.metrics.interactions.get(interactionType);
    interactionMetrics.count++;
    interactionMetrics.totalTime += metric.interactionTime;
    interactionMetrics.averageTime = interactionMetrics.totalTime / interactionMetrics.count;
    interactionMetrics.maxTime = Math.max(interactionMetrics.maxTime, metric.interactionTime);
    
    interactionMetrics.interactions.push({
      ...metric,
      timestamp: Date.now()
    });

    // 限制存储的交互记录数量
    if (interactionMetrics.interactions.length > 100) {
      interactionMetrics.interactions = interactionMetrics.interactions.slice(-100);
    }
  }

  /**
   * 记录长任务
   */
  recordLongTask(entry) {
    this.reportPerformanceIssue('long_task', {
      duration: entry.duration,
      startTime: entry.startTime,
      name: entry.name
    });
  }

  /**
   * 记录导航性能
   */
  recordNavigation(entry) {
    const navigationData = {
      name: entry.name,
      type: entry.type,
      loadTime: entry.loadEventEnd - entry.fetchStart,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      timestamp: Date.now()
    };

    this.metrics.navigation.set(entry.name, navigationData);
  }

  /**
   * 记录资源加载
   */
  recordResourceLoad(entry) {
    // 可以在这里记录资源加载性能
    // 暂时不实现，避免过多数据
  }

  /**
   * 开始内存监控
   */
  startMemoryMonitoring() {
    if (!performance.memory) return;

    const checkMemory = () => {
      const memoryInfo = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        timestamp: Date.now()
      };

      this.metrics.memory.push(memoryInfo);

      // 限制存储的内存记录数量
      if (this.metrics.memory.length > 100) {
        this.metrics.memory = this.metrics.memory.slice(-100);
      }

      // 检查内存使用阈值
      if (memoryInfo.usedJSHeapSize > this.config.thresholds.jsHeapSize) {
        this.reportPerformanceIssue('high_memory', memoryInfo);
      }
    };

    // 每10秒检查一次内存使用情况
    setInterval(checkMemory, 10000);
  }

  /**
   * 设置错误跟踪
   */
  setupErrorTracking() {
    window.addEventListener('error', (event) => {
      this.recordError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: Date.now()
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.recordError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        timestamp: Date.now()
      });
    });
  }

  /**
   * 记录错误
   */
  recordError(error) {
    this.metrics.errors.push(error);

    // 限制存储的错误记录数量
    if (this.metrics.errors.length > 50) {
      this.metrics.errors = this.metrics.errors.slice(-50);
    }
  }

  /**
   * 报告性能问题
   */
  reportPerformanceIssue(type, data) {
    const issue = {
      type,
      data,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.warn('性能问题检测到:', issue);

    // 这里可以发送到监控系统
    this.sendToAnalytics(issue);
  }

  /**
   * 发送数据到分析系统
   */
  sendToAnalytics(data) {
    // 这里可以实���发送到后端分析系统
    // 暂时只在开发环境输出
    if (process.env.NODE_ENV === 'development') {
      console.log('性能数据:', data);
    }
  }

  /**
   * 开始定期报告
   */
  startPeriodicReporting() {
    setInterval(() => {
      this.generateReport();
    }, this.config.reportInterval);
  }

  /**
   * 生成性能报告
   */
  generateReport() {
    const report = {
      timestamp: Date.now(),
      components: this.getComponentSummary(),
      interactions: this.getInteractionSummary(),
      memory: this.getMemorySummary(),
      navigation: this.getNavigationSummary(),
      errors: this.getErrorSummary()
    };

    this.sendToAnalytics(report);
    return report;
  }

  /**
   * 获取组件性能摘要
   */
  getComponentSummary() {
    const summary = {};
    for (const [name, metrics] of this.metrics.components.entries()) {
      summary[name] = {
        renderCount: metrics.renderCount,
        averageRenderTime: Math.round(metrics.averageRenderTime * 100) / 100,
        maxRenderTime: Math.round(metrics.maxRenderTime * 100) / 100,
        minRenderTime: Math.round(metrics.minRenderTime * 100) / 100
      };
    }
    return summary;
  }

  /**
   * 获取交互性能摘要
   */
  getInteractionSummary() {
    const summary = {};
    for (const [type, metrics] of this.metrics.interactions.entries()) {
      summary[type] = {
        count: metrics.count,
        averageTime: Math.round(metrics.averageTime * 100) / 100,
        maxTime: Math.round(metrics.maxTime * 100) / 100
      };
    }
    return summary;
  }

  /**
   * 获取内存使用摘要
   */
  getMemorySummary() {
    if (this.metrics.memory.length === 0) return null;

    const latest = this.metrics.memory[this.metrics.memory.length - 1];
    return {
      usedJSHeapSize: Math.round(latest.usedJSHeapSize / 1024 / 1024 * 100) / 100,
      totalJSHeapSize: Math.round(latest.totalJSHeapSize / 1024 / 1024 * 100) / 100,
      jsHeapSizeLimit: Math.round(latest.jsHeapSizeLimit / 1024 / 1024 * 100) / 100
    };
  }

  /**
   * 获取导航性能摘要
   */
  getNavigationSummary() {
    const summary = {};
    for (const [name, data] of this.metrics.navigation.entries()) {
      summary[name] = {
        loadTime: Math.round(data.loadTime * 100) / 100,
        domContentLoaded: Math.round(data.domContentLoaded * 100) / 100
      };
    }
    return summary;
  }

  /**
   * 获取错误摘要
   */
  getErrorSummary() {
    return {
      totalErrors: this.metrics.errors.length,
      recentErrors: this.metrics.errors.slice(-10)
    };
  }

  /**
   * 清理属性数据（移除敏感信息）
   */
  sanitizeProps(props) {
    if (!props || typeof props !== 'object') return props;
    
    const sanitized = {};
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'string' && value.length > 100) {
        sanitized[key] = '[Large String]';
      } else if (typeof value === 'function') {
        sanitized[key] = '[Function]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = '[Object]';
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  /**
   * 获取所有性能指标
   */
  getMetrics() {
    return {
      components: this.getComponentSummary(),
      interactions: this.getInteractionSummary(),
      memory: this.getMemorySummary(),
      navigation: this.getNavigationSummary(),
      errors: this.getErrorSummary()
    };
  }

  /**
   * 清除所有指标
   */
  clearMetrics() {
    this.metrics.components.clear();
    this.metrics.interactions.clear();
    this.metrics.navigation.clear();
    this.metrics.memory = [];
    this.metrics.errors = [];
  }

  /**
   * 销毁监控器
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.timers.clear();
    this.clearMetrics();
  }
}

// 创建全局性能监控器实例
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
