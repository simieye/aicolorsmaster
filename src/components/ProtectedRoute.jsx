// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

// @ts-ignore;
import { useAuth } from './AuthProvider';
// @ts-ignore;

export const ProtectedRoute = ({
  children,
  requiredPermission,
  requiredRole,
  fallback = null
}) => {
  const {
    user,
    loading,
    hasPermission,
    hasRole,
    isAuthenticated
  } = useAuth();
  const {
    toast
  } = useToast();

  // 加载中状态
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>;
  }

  // 未登录
  if (!isAuthenticated) {
    toast({
      title: "需要登录",
      description: "请先登录以访问此页面",
      variant: "destructive"
    });

    // 跳转到登录页面
    if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
      window.$w.utils.navigateTo({
        pageId: 'login',
        params: {}
      });
    }
    return fallback || <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">需要登录</h2>
          <p className="text-gray-600 mb-6">请先登录以访问此页面</p>
          <button onClick={() => {
          if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
            window.$w.utils.navigateTo({
              pageId: 'login',
              params: {}
            });
          }
        }} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            前往登录
          </button>
        </div>
      </div>;
  }

  // 检查角色权限
  if (requiredRole && !hasRole(requiredRole)) {
    toast({
      title: "权限不足",
      description: `需要${requiredRole}角色才能访问此页面`,
      variant: "destructive"
    });
    return fallback || <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">权限不足</h2>
          <p className="text-gray-600 mb-6">您没有权限访问此页面</p>
          <button onClick={() => window.history.back()} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            返回上一页
          </button>
        </div>
      </div>;
  }

  // 检查具体权限
  if (requiredPermission && !hasPermission(requiredPermission)) {
    toast({
      title: "权限不足",
      description: `需要${requiredPermission}权限才能访问此页面`,
      variant: "destructive"
    });
    return fallback || <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">权限不足</h2>
          <p className="text-gray-600 mb-6">您没有权限访问此页面</p>
          <button onClick={() => window.history.back()} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            返回上一页
          </button>
        </div>
      </div>;
  }
  return <>{children}</>;
};
export default ProtectedRoute;