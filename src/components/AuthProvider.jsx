// @ts-ignore;
import React, { createContext, useContext, useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider = ({
  children
}) => {
  const {
    toast
  } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  // 权限配置
  const rolePermissions = {
    admin: ['read', 'write', 'delete', 'manage_users', 'manage_stores', 'manage_products', 'manage_formulas', 'manage_colors'],
    manager: ['read', 'write', 'manage_stores', 'manage_products', 'manage_formulas'],
    technician: ['read', 'write', 'manage_formulas', 'manage_colors'],
    user: ['read']
  };

  // 初始化认证状态
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setPermissions(rolePermissions[parsedUser.role] || []);
        }
      } catch (error) {
        console.error('初始化认证失败:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // 登录函数
  const login = async credentials => {
    try {
      setLoading(true);

      // 调用云函数进行登录验证
      const result = await window.$w.cloud.callFunction({
        name: 'userLogin',
        data: credentials
      });
      if (result.success) {
        const {
          user: userData,
          token
        } = result.data;

        // 保存认证信息
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);
        setPermissions(rolePermissions[userData.role] || []);
        toast({
          title: "登录成功",
          description: `欢迎回来，${userData.username}！`
        });
        return {
          success: true,
          user: userData
        };
      } else {
        throw new Error(result.message || '登录失败');
      }
    } catch (error) {
      console.error('登录失败:', error);
      toast({
        title: "登录失败",
        description: error.message || "用户名或密码错误",
        variant: "destructive"
      });
      return {
        success: false,
        message: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // 注册函数
  const register = async userData => {
    try {
      setLoading(true);

      // 调用云函数进行注册
      const result = await window.$w.cloud.callFunction({
        name: 'userRegister',
        data: userData
      });
      if (result.success) {
        toast({
          title: "注册成功",
          description: "账户创建成功，请登录"
        });
        return {
          success: true
        };
      } else {
        throw new Error(result.message || '注册失败');
      }
    } catch (error) {
      console.error('注册失败:', error);
      toast({
        title: "注册失败",
        description: error.message || "创建账户失败",
        variant: "destructive"
      });
      return {
        success: false,
        message: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setPermissions([]);
    toast({
      title: "已退出登录",
      description: "您已成功退出登录"
    });
  };

  // 检查权限
  const hasPermission = permission => {
    return permissions.includes(permission);
  };

  // 检查角色
  const hasRole = role => {
    return user?.role === role;
  };

  // 更新用户信息
  const updateUser = async userData => {
    try {
      const result = await window.$w.cloud.callFunction({
        name: 'updateUser',
        data: {
          userId: user._id,
          ...userData
        }
      });
      if (result.success) {
        const updatedUser = {
          ...user,
          ...result.data
        };
        setUser(updatedUser);
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        toast({
          title: "更新成功",
          description: "用户信息已更新"
        });
        return {
          success: true,
          user: updatedUser
        };
      } else {
        throw new Error(result.message || '更新失败');
      }
    } catch (error) {
      console.error('更新用户信息失败:', error);
      toast({
        title: "更新失败",
        description: error.message || "更新用户信息失败",
        variant: "destructive"
      });
      return {
        success: false,
        message: error.message
      };
    }
  };
  const value = {
    user,
    loading,
    permissions,
    login,
    register,
    logout,
    hasPermission,
    hasRole,
    updateUser,
    isAuthenticated: !!user
  };
  return <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>;
};