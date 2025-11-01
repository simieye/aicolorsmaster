// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({
  size = 'md',
  className = '',
  text = '',
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    destructive: 'text-destructive',
    white: 'text-white',
    current: 'text-current'
  };
  return <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} />
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    </div>;
};
export const LoadingDots = ({
  className = '',
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    destructive: 'bg-destructive',
    white: 'bg-white',
    current: 'bg-current'
  };
  return <div className={`flex space-x-1 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${colorClasses[color]} animate-bounce`} style={{
      animationDelay: '0ms'
    }}></div>
      <div className={`w-2 h-2 rounded-full ${colorClasses[color]} animate-bounce`} style={{
      animationDelay: '150ms'
    }}></div>
      <div className={`w-2 h-2 rounded-full ${colorClasses[color]} animate-bounce`} style={{
      animationDelay: '300ms'
    }}></div>
    </div>;
};
export const LoadingSkeleton = ({
  className = '',
  lines = 3,
  height = 'h-4'
}) => {
  return <div className={`space-y-2 ${className}`}>
      {Array.from({
      length: lines
    }).map((_, index) => <div key={index} className={`${height} bg-muted rounded animate-pulse`} style={{
      width: index === lines - 1 ? '60%' : '100%'
    }}></div>)}
    </div>;
};
export const PageLoader = ({
  text = '加载中...'
}) => {
  return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-lg text-muted-foreground">{text}</p>
      </div>
    </div>;
};
export const CardLoader = ({
  className = ''
}) => {
  return <div className={`bg-card border rounded-lg p-6 space-y-4 ${className}`}>
      <LoadingSkeleton lines={2} height="h-6" />
      <LoadingSkeleton lines={3} height="h-4" />
      <div className="flex space-x-2">
        <LoadingSkeleton lines={1} height="h-10" className="flex-1" />
        <LoadingSkeleton lines={1} height="h-10" className="flex-1" />
      </div>
    </div>;
};
export default LoadingSpinner;