// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Loader2 } from 'lucide-react';

// 简单的加载指示器组件 - 避免与 LoadingStates 中的 LoadingSpinner 冲突
export function SimpleLoadingSpinner({
  size = 'default',
  text = '加载中...',
  className = ''
}) {
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
}
export default SimpleLoadingSpinner;