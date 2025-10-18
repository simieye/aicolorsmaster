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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  // 检查本地存储的用户信息
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setPermissions(userData.permissions || []);
      } catch (error) {
        console.error('解析用户数据失败:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // 登录函数
  const login = async credentials => {
    try {
      setLoading(true);
      // 模拟API调用
      const response = await mockLoginAPI(credentials);
      if (response.success) {
        const {
          user: userData,
          token
        } = response.data;

        // 保存到本地存储
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);

        // 更新状态
        setUser(userData);
        setIsAuthenticated(true);
        setPermissions(userData.permissions || []);
        toast({
          title: "登录成功",
          description: `欢迎回来，${userData.name}！`
        });
        return {
          success: true,
          user: userData
        };
      } else {
        throw new Error(response.message || '登录失败');
      }
    } catch (error) {
      toast({
        title: "登录失败",
        description: error.message,
        variant: "destructive"
      });
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // 注册函数
  const register = async userData => {
    try {
      setLoading(true);
      // 模拟API调用
      const response = await mockRegisterAPI(userData);
      if (response.success) {
        toast({
          title: "注册成功",
          description: "请使用您的账号登录"
        });
        return {
          success: true
        };
      } else {
        throw new Error(response.message || '注册失败');
      }
    } catch (error) {
      toast({
        title: "注册失败",
        description: error.message,
        variant: "destructive"
      });
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setPermissions([]);
    toast({
      title: "已退出登录",
      description: "期待您的再次访问"
    });
  };

  // 检查权限
  const hasPermission = permission => {
    return permissions.includes(permission) || permissions.includes('admin');
  };

  // 更新用户信息
  const updateUser = userData => {
    const updatedUser = {
      ...user,
      ...userData
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // 模拟登录API
  const mockLoginAPI = async credentials => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟用户数据
    const users = [{
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      name: '管理员',
      role: 'admin',
      permissions: ['admin', 'product:read', 'product:write', 'user:read', 'user:write'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }, {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@example.com',
      name: '普通用户',
      role: 'user',
      permissions: ['product:read', 'user:read'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }];
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    if (user) {
      const {
        password,
        ...userWithoutPassword
      } = user;
      return {
        success: true,
        data: {
          user: userWithoutPassword,
          token: 'mock-jwt-token-' + Date.now()
        }
      };
    } else {
      return {
        success: false,
        message: '用户名或密码错误'
      };
    }
  };

  // 模拟注册API
  const mockRegisterAPI = async userData => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟验证
    if (userData.password !== userData.confirmPassword) {
      return {
        success: false,
        message: '两次输入的密码不一致'
      };
    }

    // 模拟用户名检查
    if (userData.username === 'admin' || userData.username === 'user') {
      return {
        success: false,
        message: '用户名已存在'
      };
    }
    return {
      success: true,
      message: '注册成功'
    };
  };
  const value = {
    user,
    isAuthenticated,
    loading,
    permissions,
    login,
    register,
    logout,
    hasPermission,
    updateUser
  };
  return <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>;
};