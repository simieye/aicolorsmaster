// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Loader2, Check, X } from 'lucide-react';

export const EnhancedButton = ({
  children,
  onClick,
  loading = false,
  success = false,
  error = false,
  loadingText = '处理中...',
  successText = '成功',
  errorText = '失败',
  showIcon = true,
  hapticFeedback = true,
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const handleClick = async e => {
    if (loading || success || error) return;

    // 触觉反馈
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(10);
    }
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    if (onClick) {
      await onClick(e);
    }
  };
  const getButtonContent = () => {
    if (loading) {
      return <>
          {showIcon && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {loadingText}
        </>;
    }
    if (success) {
      return <>
          {showIcon && <Check className="w-4 h-4 mr-2" />}
          {successText}
        </>;
    }
    if (error) {
      return <>
          {showIcon && <X className="w-4 h-4 mr-2" />}
          {errorText}
        </>;
    }
    return children;
  };
  const getButtonVariant = () => {
    if (success) return 'default';
    if (error) return 'destructive';
    return props.variant || 'default';
  };
  return <Button {...props} variant={getButtonVariant()} onClick={handleClick} disabled={loading || success || error || props.disabled} className={`
        transition-all duration-200 ease-in-out
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${loading ? 'cursor-wait' : 'cursor-pointer'}
        ${success ? 'bg-green-600 hover:bg-green-700' : ''}
        ${error ? 'bg-red-600 hover:bg-red-700' : ''}
        ${className}
      `}>
      {getButtonContent()}
    </Button>;
};
export const IconButton = ({
  icon: Icon,
  onClick,
  loading = false,
  tooltip,
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleClick = async e => {
    if (loading) return;
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    if (onClick) {
      await onClick(e);
    }
  };
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  return <div className="relative inline-block">
      <Button {...props} variant={variant} size="sm" onClick={handleClick} disabled={loading} className={`
          ${sizeClasses[size]}
          p-0
          transition-all duration-200 ease-in-out
          ${isPressed ? 'scale-95' : 'scale-100'}
          ${loading ? 'cursor-wait' : 'cursor-pointer'}
          hover:scale-105
          active:scale-95
          ${className}
        `} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {loading ? <Loader2 className={`animate-spin ${iconSizes[size]}`} /> : <Icon className={iconSizes[size]} />}
      </Button>

      {tooltip && showTooltip && <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>}
    </div>;
};
export default EnhancedButton;