// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, RefreshCw, Bug, Home, ArrowLeft } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false
    };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // 这里可以添加错误上报逻辑
    this.logErrorToService(error, errorInfo);
  }
  logErrorToService = (error, errorInfo) => {
    // 实际项目中可以发送到错误监控服务
    try {
      // 示例：发送错误信息到监控服务
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      console.log('Error logged:', errorData);
      // 实际项目中可以使用 fetch 或其他方式发送到服务器
      // fetch('/api/log-error', { method: 'POST', body: JSON.stringify(errorData) });
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  };
  handleRetry = () => {
    this.setState({
      isRetrying: true,
      hasError: false,
      error: null,
      errorInfo: null
    });

    // 延迟一下再重试，给用户视觉反馈
    setTimeout(() => {
      this.setState({
        isRetrying: false,
        retryCount: this.state.retryCount + 1
      });
    }, 500);
  };
  handleGoHome = () => {
    if (this.props.$w && this.props.$w.utils) {
      this.props.$w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } else {
      window.location.href = '/';
    }
  };
  handleGoBack = () => {
    if (this.props.$w && this.props.$w.utils) {
      this.props.$w.utils.navigateBack();
    } else {
      window.history.back();
    }
  };
  render() {
    if (this.state.isRetrying) {
      return <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">正在重试...</p>
          </div>
        </div>;
    }
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const maxRetries = this.props.maxRetries || 3;
      const canRetry = this.state.retryCount < maxRetries;
      return <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            {/* 错误图标和标题 */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {this.props.fallbackTitle || '页面出现错误'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {this.props.fallbackMessage || '抱歉，页面遇到了一些问题。请尝试刷新页面或返回首页。'}
                </p>
              </div>
            </div>

            {/* 错误信息卡片 */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <Bug className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">错误详情</h2>
              </div>
              
              {/* 用户友好的错误信息 */}
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">错误类型：</span>
                  <span className="text-sm text-foreground ml-2">
                    {this.state.error?.name || '未知错误'}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">错误信息：</span>
                  <span className="text-sm text-foreground ml-2">
                    {this.state.error?.message || '发生了未知错误'}
                  </span>
                </div>
                {this.state.retryCount > 0 && <div>
                    <span className="text-sm font-medium text-muted-foreground">重试次数：</span>
                    <span className="text-sm text-foreground ml-2">
                      {this.state.retryCount} / {maxRetries}
                    </span>
                  </div>}
              </div>

              {/* 开发环境显示详细错误信息 */}
              {isDevelopment && this.state.error && <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    查看详细错误信息 (开发模式)
                  </summary>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">错误堆栈：</span>
                      <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto max-h-32 text-foreground">
                        {this.state.error.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && <div>
                        <span className="text-sm font-medium text-muted-foreground">组件堆栈：</span>
                        <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto max-h-32 text-foreground">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>}
                  </div>
                </details>}
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {canRetry && <Button onClick={this.handleRetry} className="flex items-center space-x-2" disabled={this.state.isRetrying}>
                  <RefreshCw className={`w-4 h-4 ${this.state.isRetrying ? 'animate-spin' : ''}`} />
                  <span>重试</span>
                </Button>}
              
              <Button variant="outline" onClick={this.handleGoBack} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>返回上页</span>
              </Button>
              
              <Button variant="outline" onClick={this.handleGoHome} className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>返回首页</span>
              </Button>
            </div>

            {/* 帮助信息 */}
            <div className="text-center text-sm text-muted-foreground">
              <p>如果问题持续存在，请联系技术支持。</p>
              <p className="mt-1">错误ID: {Date.now().toString(36)}</p>
            </div>
          </div>
        </div>;
    }
    return this.props.children;
  }
}

// 函数式组件包装器，方便使用
export const withErrorBoundary = (Component, fallbackProps = {}) => {
  const WrappedComponent = props => <ErrorBoundary {...fallbackProps} $w={props.$w}>
      <Component {...props} />
    </ErrorBoundary>;
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// 默认导出
export default ErrorBoundary;