// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Lock, User } from 'lucide-react';

// @ts-ignore;
import { useAuth } from './AuthProvider';
// @ts-ignore;

export const ProtectedRoute = ({
  children,
  requiredPermission,
  fallback = null
}) => {
  const {
    isAuthenticated,
    hasPermission,
    user
  } = useAuth();

  // 未登录
  if (!isAuthenticated) {
    if (fallback) {
      return fallback;
    }
    return <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center">
            <Lock className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">需要登录</h2>
            <p className="text-white/80 mb-6">请先登录以访问此功能</p>
            
            <Alert className="bg-white/10 border-white/20 text-white">
              <User className="w-4 h-4" />
              <AlertDescription>
                请使用以下测试账号登录：<br />
                管理员：admin / admin123<br />
                普通用户：user / user123
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>;
  }

  // 权限检查
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center">
            <Lock className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">权限不足</h2>
            <p className="text-white/80">您没有访问此功能的权限</p>
          </div>
        </div>
      </div>;
  }
  return <>{children}</>;
};
export default ProtectedRoute;