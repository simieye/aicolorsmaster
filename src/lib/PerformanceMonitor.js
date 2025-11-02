
// 性能监控核心类
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.config = {
      sampleRate: 0.1, // 10% 采样率
      maxMetrics: 1000, // 最大指标数量
      reportInterval: 30000, // 30秒上报间隔
      enableConsoleLog: true
    };
    this.isSupported = this.checkSupport();
    this.startTime = performance.now();
    this.init();
  }

  // 检查浏览器支持
  checkSupport() {
    return !!(window.performance && window.performance.now && window.PerformanceObserver);
  }

  // 初始化性能监控
  init() {
    if (!this.isSupported) {
      console.warn('Performance monitoring is not supported in this browser');
      return;
    }

    // 监控页面加载性能
    this.observePageLoad();
    
    // 监控资源加载性能
    this.observeResources();
    
    // 监控长任务
    this.observeLongTasks();
    
    // 监控内存使用
    this.observeMemory();
    
    // 监控网络请求
    this.observeNetwork();
    
    // 定期上报性能数据
    this.startPeriodicReporting();
  }

  // 监控页面加载性能
  observePageLoad() {
    if (performance.timing) {
      const timing = performance.timing;
      const navigation = performance.navigation;
      
      const pageLoadMetrics = {
        // DNS查询时间
        dnsTime: timing.domainLookupEnd - timing.domainLookupStart,
        // TCP连接时间
        tcpTime: timing.connectEnd - timing.connectStart,
        // 请求响应时间
        requestTime: timing.responseEnd - timing.requestStart,
        // DOM解析时间
        domParseTime: timing.domComplete - timing.domLoading,
        // 白屏时间
        whiteScreenTime: timing.responseStart - timing.navigationStart,
        // 首次渲染时间
        firstPaintTime: 0,
        // 首次内容渲染时间
        firstContentfulPaintTime: 0,
        // 首次有意义渲染时间
        firstMeaningfulPaintTime: 0,
        // 页面完全加载时间
        pageLoadTime: timing.loadEventEnd - timing.navigationStart,
        // 导航类型
        navigationType: navigation.type,
        // 重定向次数
        redirectCount: navigation.redirectCount
      };

      // 获取Paint Timing API数据
      if (performance.getEntriesByType) {
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          if (entry.name === 'first-paint') {
            pageLoadMetrics.firstPaintTime = entry.startTime;
          }
          if (entry.name === 'first-contentful-paint') {
            pageLoadMetrics.firstContentfulPaintTime = entry.startTime;
          }
        });
      }

      this.recordMetric('pageLoad', pageLoadMetrics);
    }
  }

  // 监控资源加载性能
  observeResources() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'resource') {
            const resourceMetrics = {
              name: entry.name,
              type: this.getResourceType(entry.name),
              duration: entry.duration,
              size: entry.transferSize || 0,
              startTime: entry.startTime,
              responseEnd: entry.responseEnd,
              cacheHit: entry.transferSize === 0 && entry.decodedBodySize > 0
            };
            this.recordMetric('resource', resourceMetrics);
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', observer);
    } catch (error) {
      console.warn('Resource performance observation failed:', error);
    }
  }

  // 监控长任务
  observeLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'longtask') {
            const longTaskMetrics = {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name || 'unknown'
            };
            this.recordMetric('longTask', longTaskMetrics);
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.set('longtask', observer);
    } catch (error) {
      console.warn('Long task observation failed:', error);
    }
  }

  // 监控内存使用
  observeMemory() {
    if (performance.memory) {
      const recordMemoryMetrics = () => {
        const memoryMetrics = {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          timestamp: Date.now()
        };
        this.recordMetric('memory', memoryMetrics);
      };

      // 立即记录一次
      recordMemoryMetrics();
      
      // 每10秒记录一次
      setInterval(recordMemoryMetrics, 10000);
    }
  }

  // 监控网络请求
  observeNetwork() {
    // 拦截fetch请求
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        const networkMetrics = {
          url: typeof url === 'string' ? url : url.url,
          method: args[1]?.method || 'GET',
          status: response.status,
          duration: endTime - startTime,
          success: response.ok,
          size: response.headers.get('content-length') || 0,
          timestamp: Date.now()
        };
        
        this.recordMetric('network', networkMetrics);
        return response;
      } catch (error) {
        const endTime = performance.now();
        
        const networkMetrics = {
          url: typeof url === 'string' ? url : url.url,
          method: args[1]?.method || 'GET',
          status: 0,
          duration: endTime - startTime,
          success: false,
          error: error.message,
          timestamp: Date.now()
        };
        
        this.recordMetric('network', networkMetrics);
        throw error;
      }
    };

    // 拦截XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      this._method = method;
      this._url = url;
      this._startTime = performance.now();
      return originalXHROpen.apply(this, [method, url, ...args]);
    };
    
    XMLHttpRequest.prototype.send = function(...args) {
      const originalOnReadyStateChange = this.onreadystatechange;
      
      this.onreadystatechange = function() {
        if (this.readyState === 4) {
          const endTime = performance.now();
          const networkMetrics = {
            url: this._url,
            method: this._method,
            status: this.status,
            duration: endTime - this._startTime,
            success: this.status >= 200 && this.status < 300,
            timestamp: Date.now()
          };
          
          window.performanceMonitor.recordMetric('network', networkMetrics);
        }
        
        if (originalOnReadyStateChange) {
          originalOnReadyStateChange.apply(this, arguments);
        }
      };
      
      return originalXHRSend.apply(this, args);
    };
  }

  // 记录性能指标
  recordMetric(type, data) {
    if (!this.shouldSample()) return;
    
    const timestamp = Date.now();
    const metric = {
      type,
      data,
      timestamp,
      id: this.generateId()
    };
    
    if (!this.metrics.has(type)) {
      this.metrics.set(type, []);
    }
    
    const typeMetrics = this.metrics.get(type);
    typeMetrics.push(metric);
    
    // 限制指标数量
    if (typeMetrics.length > this.config.maxMetrics) {
      typeMetrics.shift();
    }
    
    if (this.config.enableConsoleLog) {
      console.log(`Performance Metric [${type}]:`, metric);
    }
    
    // 触发指标更新事件
    this.notifyMetricUpdate(type, metric);
  }

  // 记录组件渲染性能
  recordComponentRender(componentName, renderTime, props = {}) {
    const componentMetrics = {
      componentName,
      renderTime,
      props: JSON.stringify(props).length, // 记录props大小而不是内容
      timestamp: Date.now()
    };
    
    this.recordMetric('component', componentMetrics);
  }

  // 记录用户交互性能
  recordUserInteraction(interactionType, element, duration) {
    const interactionMetrics = {
      type: interactionType,
      element: element.tagName || 'unknown',
      elementId: element.id || '',
      elementClass: element.className || '',
      duration,
      timestamp: Date.now()
    };
    
    this.recordMetric('interaction', interactionMetrics);
  }

  // 获取性能指标
  getMetrics(type = null) {
    if (type) {
      return this.metrics.get(type) || [];
    }
    
    const allMetrics = {};
    this.metrics.forEach((metrics, key) => {
      allMetrics[key] = metrics;
    });
    
    return allMetrics;
  }

  // 获取性能统计
  getStats(type = null) {
    const metrics = this.getMetrics(type);
    const stats = {};
    
    Object.entries(metrics).forEach(([metricType, metricList]) => {
      if (metricList.length === 0) return;
      
      switch (metricType) {
        case 'pageLoad':
          stats.pageLoad = this.calculatePageLoadStats(metricList);
          break;
        case 'resource':
          stats.resource = this.calculateResourceStats(metricList);
          break;
        case 'network':
          stats.network = this.calculateNetworkStats(metricList);
          break;
        case 'component':
          stats.component = this.calculateComponentStats(metricList);
          break;
        case 'longTask':
          stats.longTask = this.calculateLongTaskStats(metricList);
          break;
        case 'memory':
          stats.memory = this.calculateMemoryStats(metricList);
          break;
        default:
          stats[metricType] = {
            count: metricList.length,
            latest: metricList[metricList.length - 1]
          };
      }
    });
    
    return stats;
  }

  // 计算页面加载统计
  calculatePageLoadStats(metrics) {
    const latest = metrics[metrics.length - 1].data;
    return {
      pageLoadTime: latest.pageLoadTime,
      firstPaintTime: latest.firstPaintTime,
      firstContentfulPaintTime: latest.firstContentfulPaintTime,
      domParseTime: latest.domParseTime,
      dnsTime: latest.dnsTime,
      tcpTime: latest.tcpTime,
      requestTime: latest.requestTime
    };
  }

  // 计算资源加载统计
  calculateResourceStats(metrics) {
    const resourceData = metrics.map(m => m.data);
    const totalSize = resourceData.reduce((sum, r) => sum + r.size, 0);
    const averageLoadTime = resourceData.reduce((sum, r) => sum + r.duration, 0) / resourceData.length;
    const cacheHitRate = resourceData.filter(r => r.cacheHit).length / resourceData.length * 100;
    
    return {
      totalResources: resourceData.length,
      totalSize,
      averageLoadTime,
      cacheHitRate,
      slowResources: resourceData.filter(r => r.duration > 1000).length
    };
  }

  // 计算网络请求统计
  calculateNetworkStats(metrics) {
    const networkData = metrics.map(m => m.data);
    const totalRequests = networkData.length;
    const successRate = networkData.filter(n => n.success).length / totalRequests * 100;
    const averageResponseTime = networkData.reduce((sum, n) => sum + n.duration, 0) / totalRequests;
    const failedRequests = networkData.filter(n => !n.success);
    
    return {
      totalRequests,
      successRate,
      averageResponseTime,
      failedRequests: failedRequests.length,
      errors: failedRequests.map(f => f.error).filter(Boolean)
    };
  }

  // 计算组件渲染统计
  calculateComponentStats(metrics) {
    const componentData = metrics.map(m => m.data);
    const averageRenderTime = componentData.reduce((sum, c) => sum + c.renderTime, 0) / componentData.length;
    const slowComponents = componentData.filter(c => c.renderTime > 16); // 超过一帧的时间
    
    return {
      totalRenders: componentData.length,
      averageRenderTime,
      slowRenders: slowComponents.length,
      slowestComponent: slowComponents.sort((a, b) => b.renderTime - a.renderTime)[0]
    };
  }

  // 计算长任务统计
  calculateLongTaskStats(metrics) {
    const taskData = metrics.map(m => m.data);
    const totalBlockingTime = taskData.reduce((sum, t) => sum + t.duration, 0);
    const averageTaskTime = totalBlockingTime / taskData.length;
    
    return {
      totalLongTasks: taskData.length,
      totalBlockingTime,
      averageTaskTime,
      longestTask: Math.max(...taskData.map(t => t.duration))
    };
  }

  // 计算内存统计
  calculateMemoryStats(metrics) {
    const memoryData = metrics.map(m => m.data);
    const latest = memoryData[memoryData.length - 1];
    
    return {
      usedJSHeapSize: latest.usedJSHeapSize,
      totalJSHeapSize: latest.totalJSHeapSize,
      jsHeapSizeLimit: latest.jsHeapSizeLimit,
      memoryUsagePercent: (latest.usedJSHeapSize / latest.jsHeapSizeLimit * 100).toFixed(2)
    };
  }

  // 获取资源类型
  getResourceType(url) {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font';
    if (url.includes('/api/')) return 'api';
    return 'other';
  }

  // 生成唯一ID
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // 采样判断
  shouldSample() {
    return Math.random() < this.config.sampleRate;
  }

  // 通知指标更新
  notifyMetricUpdate(type, metric) {
    if (this.onMetricUpdate) {
      this.onMetricUpdate(type, metric);
    }
    
    // 触发自定义事件
    const event = new CustomEvent('performanceMetric', {
      detail: { type, metric }
    });
    window.dispatchEvent(event);
  }

  // 设置指标更新回调
  setMetricUpdateCallback(callback) {
    this.onMetricUpdate = callback;
  }

  // 开始定期上报
  startPeriodicReporting() {
    setInterval(() => {
      this.reportMetrics();
    }, this.config.reportInterval);
  }

  // 上报性能数据
  reportMetrics() {
    const stats = this.getStats();
    
    // 这里可以发送到后端服务
    if (this.config.enableConsoleLog) {
      console.log('Performance Report:', stats);
    }
    
    // 触发上报事件
    const event = new CustomEvent('performanceReport', {
      detail: stats
    });
    window.dispatchEvent(event);
  }

  // 清理监控
  cleanup() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
    this.metrics.clear();
  }

  // 导出性能数据
  exportData() {
    const data = {
      metrics: Object.fromEntries(this.metrics),
      stats: this.getStats(),
      config: this.config,
      exportTime: Date.now()
    };
    
    return JSON.stringify(data, null, 2);
  }

  // 获取性能评分
  getPerformanceScore() {
    const stats = this.getStats();
    let score = 100;
    
    // 页面加载时间评分 (0-30分)
    if (stats.pageLoad) {
      const loadTime = stats.pageLoad.pageLoadTime;
      if (loadTime > 3000) score -= 30;
      else if (loadTime > 2000) score -= 20;
      else if (loadTime > 1000) score -= 10;
    }
    
    // 网络请求评分 (0-20分)
    if (stats.network) {
      const successRate = stats.network.successRate;
      if (successRate < 90) score -= 20;
      else if (successRate < 95) score -= 10;
    }
    
    // 长任务评分 (0-20分)
    if (stats.longTask) {
      const totalBlockingTime = stats.longTask.totalBlockingTime;
      if (totalBlockingTime > 200) score -= 20;
      else if (totalBlockingTime > 100) score -= 10;
    }
    
    // 内存使用评分 (0-15分)
    if (stats.memory) {
      const memoryUsage = parseFloat(stats.memory.memoryUsagePercent);
      if (memoryUsage > 80) score -= 15;
      else if (memoryUsage > 60) score -= 10;
      else if (memoryUsage > 40) score -= 5;
    }
    
    // 组件渲染评分 (0-15分)
    if (stats.component) {
      const slowRenderRate = stats.component.slowRenders / stats.component.totalRenders;
      if (slowRenderRate > 0.1) score -= 15;
      else if (slowRenderRate > 0.05) score -= 10;
      else if (slowRenderRate > 0.02) score -= 5;
    }
    
    return Math.max(0, Math.round(score));
  }
}

// 创建全局性能监控实例
const performanceMonitor = new PerformanceMonitor();

// React Hook for performance monitoring
export function usePerformanceMonitor(componentName) {
  const [renderStartTime, setRenderStartTime] = React.useState(null);
  const [performanceStats, setPerformanceStats] = React.useState(null);

  // 开始渲染计时
  React.useEffect(() => {
    setRenderStartTime(performance.now());
    
    return () => {
      if (renderStartTime) {
        const renderTime = performance.now() - renderStartTime;
        performanceMonitor.recordComponentRender(componentName, renderTime);
      }
    };
  });

  // 监听性能指标更新
  React.useEffect(() => {
    const handleMetricUpdate = (event) => {
      const { type, metric } = event.detail;
      setPerformanceStats(prev => ({
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
  const recordInteraction = React.useCallback((interactionType, element, duration) => {
    performanceMonitor.recordUserInteraction(interactionType, element, duration);
  }, []);

  return {
    performanceStats,
    recordInteraction,
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    getStats: performanceMonitor.getStats.bind(performanceMonitor),
    getPerformanceScore: performanceMonitor.getPerformanceScore.bind(performanceMonitor)
  };
}

// 高阶组件用于性能监控
export function withPerformanceMonitor(WrappedComponent, componentName) {
  return function PerformanceMonitoredComponent(props) {
    const { recordInteraction } = usePerformanceMonitor(componentName);
    
    const handleClick = React.useCallback((event) => {
      const startTime = performance.now();
      
      // 调用原始点击处理
      if (WrappedComponent.prototype?.handleClick) {
        WrappedComponent.prototype.handleClick.call(this, event);
      }
      
      const duration = performance.now() - startTime;
      recordInteraction('click', event.target, duration);
    }, [recordInteraction]);

    return <WrappedComponent {...props} onClick={handleClick} />;
  };
}

export default performanceMonitor;
