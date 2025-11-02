// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Loader2, Package, ShoppingBag, User, FileText, TrendingUp, MessageCircle, Star, Clock, RefreshCw } from 'lucide-react';

// 通用加载指示器组件
export const LoadingSpinner = ({
  size = 'default',
  text = '加载中...',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  return <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>;
};

// 页面级加载状态
export const PageLoading = ({
  title = '页面加载中',
  description = '请稍候，正在获取数据...'
}) => <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>;

// 卡片加载状态
export const CardLoading = ({
  count = 1,
  className = ''
}) => <div className={`space-y-4 ${className}`}>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="bg-card border rounded-lg p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>)}
  </div>;

// 列表项加载状态
export const ListItemLoading = ({
  count = 5,
  className = ''
}) => <div className={`space-y-3 ${className}`}>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="flex items-center space-x-3 p-3 bg-card border rounded-lg animate-pulse">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>)}
  </div>;

// 表格加载状态
export const TableLoading = ({
  rows = 5,
  columns = 4,
  className = ''
}) => <div className={`space-y-3 ${className}`}>
    {/* 表头 */}
    <div className="grid gap-4" style={{
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  }}>
      {Array.from({
      length: columns
    }).map((_, index) => <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>)}
    </div>
    {/* 表格行 */}
    {Array.from({
    length: rows
  }).map((_, rowIndex) => <div key={rowIndex} className="grid gap-4" style={{
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  }}>
        {Array.from({
      length: columns
    }).map((_, colIndex) => <div key={colIndex} className="h-3 bg-gray-200 rounded animate-pulse"></div>)}
      </div>)}
  </div>;

// 统计卡片加载状态
export const StatsCardLoading = ({
  count = 4,
  className = ''
}) => <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="bg-card border rounded-lg p-4 animate-pulse">
        <div className="flex items-center justify-between mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="w-24 h-6 bg-gray-200 rounded mb-2"></div>
        <div className="w-20 h-3 bg-gray-200 rounded"></div>
      </div>)}
  </div>;

// 图表加载状态
export const ChartLoading = ({
  height = 300,
  className = ''
}) => <div className={`bg-card border rounded-lg p-4 ${className}`}>
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
    <div className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center" style={{
    height: `${height}px`
  }}>
      <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
    </div>
  </div>;

// 产品列表加载状态
export const ProductListLoading = ({
  count = 8,
  className = ''
}) => <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="bg-card border rounded-lg overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>)}
  </div>;

// 订单列表加载状态
export const OrderListLoading = ({
  count = 5,
  className = ''
}) => <div className={`space-y-4 ${className}`}>
    {Array.from({
    length: count
  }).map((_, index) => <div key={index} className="bg-card border rounded-lg p-4 animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>)}
  </div>;

// 用户信息加载状态
export const UserInfoLoading = ({
  className = ''
}) => <div className={`bg-card border rounded-lg p-6 ${className}`}>
    <div className="flex items-center space-x-4 mb-6 animate-pulse">
      <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({
      length: 6
    }).map((_, index) => <div key={index} className="flex items-center justify-between py-2 animate-pulse">
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
          <div className="w-32 h-3 bg-gray-200 rounded"></div>
        </div>)}
    </div>
  </div>;

// 聊天消息加载状态
export const ChatMessageLoading = ({
  className = ''
}) => <div className={`flex items-start space-x-3 ${className}`}>
    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    <div className="flex-1 space-y-2 animate-pulse">
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      <div className="bg-gray-100 rounded-lg p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>;

// 专门的加载状态组件，根据不同场景显示不同的加载指示器
export const ContextualLoading = ({
  type,
  count = 1,
  className = '',
  ...props
}) => {
  const loadingComponents = {
    page: PageLoading,
    card: CardLoading,
    list: ListItemLoading,
    table: TableLoading,
    stats: StatsCardLoading,
    chart: ChartLoading,
    products: ProductListLoading,
    orders: OrderListLoading,
    user: UserInfoLoading,
    chat: ChatMessageLoading,
    spinner: LoadingSpinner
  };
  const LoadingComponent = loadingComponents[type] || LoadingSpinner;
  return <LoadingComponent count={count} className={className} {...props} />;
};

// 骨架屏组件 - 用于复杂布局的加载状态
export const Skeleton = ({
  className,
  ...props
}) => <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} {...props} />;

// 带图标的加载状态
export const IconLoading = ({
  icon: Icon = Loader2,
  text = '加载中...',
  className = ''
}) => <div className={`flex items-center justify-center space-x-2 ${className}`}>
    <Icon className="w-5 h-5 animate-spin text-primary" />
    {text && <span className="text-sm text-muted-foreground">{text}</span>}
  </div>;

// 产品加载状态
export const ProductLoading = () => <IconLoading icon={Package} text="产品加载中..." />;

// 订单加载状态
export const OrderLoading = () => <IconLoading icon={ShoppingBag} text="订单加载中..." />;

// 用户加载状态
export const UserLoading = () => <IconLoading icon={User} text="用户信息加载中..." />;

// 文档加载状态
export const DocumentLoading = () => <IconLoading icon={FileText} text="文档加载中..." />;

// 统计加载状态
export const StatsLoading = () => <IconLoading icon={TrendingUp} text="统计数据加载中..." />;

// 消息加载状态
export const MessageLoading = () => <IconLoading icon={MessageCircle} text="消息加载中..." />;

// 评价加载状态
export const RatingLoading = () => <IconLoading icon={Star} text="评价加载中..." />;

// 时间加载状态
export const TimeLoading = () => <IconLoading icon={Clock} text="时间数据加载中..." />;

// 刷新加载状态
export const RefreshLoading = () => <IconLoading icon={RefreshCw} text="刷新中..." />;

// 全屏加载遮罩
export const FullScreenLoading = ({
  text = '处���中...'
}) => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-card rounded-lg p-6 shadow-lg">
      <div className="flex items-center space-x-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  </div>;

// 内联加载指示器
export const InlineLoading = ({
  text = '加载中...',
  className = ''
}) => <div className={`flex items-center space-x-2 ${className}`}>
    <Loader2 className="w-4 h-4 animate-spin text-primary" />
    <span className="text-xs text-muted-foreground">{text}</span>
  </div>;

// 按钮加载状态
export const ButtonLoading = ({
  text = '处理中...',
  className = ''
}) => <div className={`flex items-center justify-center space-x-2 ${className}`}>
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>{text}</span>
  </div>;
export default {
  LoadingSpinner,
  PageLoading,
  CardLoading,
  ListItemLoading,
  TableLoading,
  StatsCardLoading,
  ChartLoading,
  ProductListLoading,
  OrderListLoading,
  UserInfoLoading,
  ChatMessageLoading,
  ContextualLoading,
  Skeleton,
  IconLoading,
  ProductLoading,
  OrderLoading,
  UserLoading,
  DocumentLoading,
  StatsLoading,
  MessageLoading,
  RatingLoading,
  TimeLoading,
  RefreshLoading,
  FullScreenLoading,
  InlineLoading,
  ButtonLoading
};