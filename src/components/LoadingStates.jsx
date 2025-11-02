// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Loader2, RefreshCw, AlertCircle, Package, ShoppingBag, User, FileText, TrendingUp, MessageCircle, Star } from 'lucide-react';

// 通用加载指示器组件
export const LoadingSpinner = ({
  size = 'default',
  text = '加载中...',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  };
  return <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>;
};

// 页面级加载组件
export const PageLoading = ({
  message = '页面加载中...'
}) => <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium text-foreground">{message}</p>
        <p className="text-sm text-muted-foreground">请稍候，正在为您准备内容...</p>
      </div>
    </div>
  </div>;

// 卡片加载骨架屏
export const CardSkeleton = ({
  count = 1
}) => <>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="bg-card rounded-lg border p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-pulse"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-5/6"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded animate-pulse w-20"></div>
          <div className="h-8 bg-muted rounded animate-pulse w-24"></div>
        </div>
      </div>)}
  </>;

// 列表项加载骨架屏
export const ListItemSkeleton = ({
  count = 5
}) => <>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="flex items-center space-x-4 p-4 border-b">
        <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
        <div className="h-6 bg-muted rounded animate-pulse w-16"></div>
      </div>)}
  </>;

// 表格加载骨架屏
export const TableSkeleton = ({
  rows = 5,
  columns = 4
}) => <div className="space-y-2">
    {/* 表头 */}
    <div className="grid gap-4 p-4 border-b bg-muted/50" style={{
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  }}>
      {Array.from({
      length: columns
    }).map((_, index) => <div key={index} className="h-4 bg-muted rounded animate-pulse"></div>)}
    </div>
    {/* 表格行 */}
    {Array.from({
    length: rows
  }).map((_, rowIndex) => <div key={rowIndex} className="grid gap-4 p-4 border-b" style={{
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  }}>
        {Array.from({
      length: columns
    }).map((_, colIndex) => <div key={colIndex} className="h-3 bg-muted rounded animate-pulse"></div>)}
      </div>)}
  </div>;

// 专用加载组件
export const ProductLoading = () => <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <CardSkeleton count={8} />
  </div>;
export const OrderLoading = () => <div className="space-y-4">
    <ListItemSkeleton count={5} />
  </div>;
export const UserLoading = () => <div className="space-y-6">
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-muted rounded-full animate-pulse"></div>
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-muted rounded animate-pulse w-1/3"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({
        length: 6
      }).map((_, index) => <div key={index} className="space-y-2">
            <div className="h-3 bg-muted rounded animate-pulse w-1/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          </div>)}
      </div>
    </div>
  </div>;
export const StatsLoading = () => <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({
    length: 4
  }).map((_, index) => <div key={index} className="bg-card rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-16"></div>
        </div>
        <div className="h-8 bg-muted rounded animate-pulse w-1/2 mb-2"></div>
        <div className="h-3 bg-muted rounded animate-pulse w-1/3"></div>
      </div>)}
  </div>;

// 空状态组件
export const EmptyState = ({
  icon = Package,
  title = '暂无数据',
  description = '当前没有相关数据',
  action = null
}) => {
  const Icon = icon;
  return <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action}
    </div>;
};

// 错误状态组件
export const ErrorState = ({
  error,
  onRetry,
  title = '加载失败',
  description = '数据加载失败，请稍后重试'
}) => <div className="flex flex-col items-center justify-center py-12 text-center">
    <AlertCircle className="w-16 h-16 text-destructive mb-4" />
    <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
    {onRetry && <button onClick={onRetry} className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        <RefreshCw className="w-4 h-4" />
        <span>重试</span>
      </button>}
    {error && <details className="mt-4 text-xs text-muted-foreground">
        <summary>错误详情</summary>
        <pre className="mt-2 p-2 bg-muted rounded text-left overflow-auto">
          {error.message || error}
        </pre>
      </details>}
  </div>;

// 数据加载包装器
export const DataLoader = ({
  loading,
  error,
  data,
  children,
  loadingComponent,
  errorComponent,
  emptyComponent,
  onRetry
}) => {
  if (loading) {
    return loadingComponent || <PageLoading />;
  }
  if (error) {
    return errorComponent || <ErrorState error={error} onRetry={onRetry} />;
  }
  if (!data || Array.isArray(data) && data.length === 0) {
    return emptyComponent || <EmptyState />;
  }
  return children;
};

// 带有加载状态的按钮
export const LoadingButton = ({
  loading,
  children,
  disabled,
  className = '',
  ...props
}) => <button className={`relative ${className}`} disabled={disabled || loading} {...props}>
    {loading && <Loader2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 animate-spin" />}
    <span className={loading ? 'opacity-0' : ''}>
      {children}
    </span>
  </button>;

// 专用空状态组件
export const ProductEmpty = () => <EmptyState icon={Package} title="暂无产品" description="当前没有可用的产品，请稍后再来查看" action={<button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        刷新页面
      </button>} />;
export const OrderEmpty = () => <EmptyState icon={ShoppingBag} title="暂无订单" description="您还没有任何订单，快去选购心仪的产品吧" action={<button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        去购物
      </button>} />;
export const UserEmpty = () => <EmptyState icon={User} title="暂无用户" description="当前没有用户数据" />;
export const MessageEmpty = () => <EmptyState icon={MessageCircle} title="暂无消息" description="您还没有收到任何消息" />;
export const ReviewEmpty = () => <EmptyState icon={Star} title="暂无评价" description="还没有用户评价，成为第一个评价的人吧" />;
export const ChartEmpty = () => <EmptyState icon={TrendingUp} title="暂无数据" description="当前时间范围内没有可显示的数据" />;