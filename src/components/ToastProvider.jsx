// @ts-ignore;
import React, { createContext, useContext, useState, useCallback } from 'react';
// @ts-ignore;
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
export const ToastProvider = ({
  children
}) => {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback(({
    message,
    type = 'info',
    duration = 3000,
    action
  }) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      message,
      type,
      duration,
      action
    };
    setToasts(prev => [...prev, newToast]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);
  const removeToast = useCallback(id => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  const success = useCallback((message, options) => {
    return toast({
      ...options,
      message,
      type: 'success'
    });
  }, [toast]);
  const error = useCallback((message, options) => {
    return toast({
      ...options,
      message,
      type: 'error',
      duration: 5000
    });
  }, [toast]);
  const warning = useCallback((message, options) => {
    return toast({
      ...options,
      message,
      type: 'warning'
    });
  }, [toast]);
  const info = useCallback((message, options) => {
    return toast({
      ...options,
      message,
      type: 'info'
    });
  }, [toast]);
  const value = {
    toast,
    success,
    error,
    warning,
    info,
    removeToast
  };
  const getIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };
  const getToastStyles = type => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };
  return <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast容器 */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
        {toasts.map(toast => <div key={toast.id} className={`
              transform transition-all duration-300 ease-in-out
              ${getToastStyles(toast.type)}
              border rounded-lg shadow-lg p-4 flex items-start space-x-3
              animate-in slide-in-from-right-full
              hover:shadow-xl
            `}>
            {getIcon(toast.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium break-words">{toast.message}</p>
              {toast.action && <button onClick={toast.action.onClick} className="mt-2 text-sm font-medium underline hover:no-underline">
                  {toast.action.label}
                </button>}
            </div>
            <button onClick={() => removeToast(toast.id)} className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>)}
      </div>
    </ToastContext.Provider>;
};
export default ToastProvider;