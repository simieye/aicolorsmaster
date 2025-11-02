// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Lock, Mail, Phone, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, Shield, Zap, Users, Star, ChevronRight, LogIn, UserPlus, Smartphone, MessageCircle } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
export default function LoginPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [loginMethod, setLoginMethod] = useState('phone'); // phone, email, wechat
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    verifyCode: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState({});
  const [currentView, setCurrentView] = useState('login'); // login, register, forgot

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 表单验证
  const validateForm = () => {
    const newErrors = {};
    if (loginMethod === 'phone') {
      if (!formData.phone) {
        newErrors.phone = '请输入手机号';
      } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = '请输入正确的手机号';
      }
      if (!formData.verifyCode) {
        newErrors.verifyCode = '请输入验证码';
      } else if (formData.verifyCode.length !== 6) {
        newErrors.verifyCode = '请输入6位验证码';
      }
    } else if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = '请输入邮箱';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '请输入正确的邮箱地址';
      }
      if (!formData.password) {
        newErrors.password = '请输入密码';
      } else if (formData.password.length < 6) {
        newErrors.password = '密码至少6位';
      }
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '请同意用户协议和隐私政策';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 发送验证码
  const handleSendCode = async () => {
    if (!formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)) {
      toast({
        title: "错误",
        description: "请输入正确的手机号",
        variant: "destructive"
      });
      return;
    }
    try {
      setIsLoading(true);
      // 模拟发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      toast({
        title: "验证码已发送",
        description: `验证码已发送至 ${formData.phone}`
      });
    } catch (error) {
      toast({
        title: "发送失败",
        description: "验证码发送失败，请重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理登录
  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      setIsLoading(true);

      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟登录成功
      const mockUser = {
        userId: 'USER_' + Date.now(),
        name: formData.phone ? `用户${formData.phone.slice(-4)}` : formData.email.split('@')[0],
        nickName: formData.phone ? `用户${formData.phone.slice(-4)}` : formData.email.split('@')[0],
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.phone || formData.email}`,
        type: 'individual',
        phone: formData.phone,
        email: formData.email
      };

      // 使用云开发实例保存用户信息
      if ($w?.cloud?.getCloudInstance) {
        try {
          const tcb = await $w.cloud.getCloudInstance();
          // 这里可以保存用户信息到数据库
          console.log('用户登录成功:', mockUser);
        } catch (cloudError) {
          console.error('云开发操作失败:', cloudError);
        }
      }
      toast({
        title: "登录成功",
        description: `欢迎回来，${mockUser.name}！`
      });

      // 跳转到首页
      if ($w?.utils?.navigateTo) {
        $w.utils.navigateTo({
          pageId: 'home',
          params: {}
        });
      }
    } catch (error) {
      console.error('登录失败:', error);
      toast({
        title: "登录失败",
        description: "登录失败，请检查您的信息",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      setIsLoading(true);

      // 模拟注册请求
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "注册成功",
        description: "注册成功，请登录"
      });

      // 切换到登录页面
      setCurrentView('login');
      setFormData({
        phone: '',
        email: '',
        password: '',
        verifyCode: '',
        agreeTerms: false
      });
    } catch (error) {
      console.error('注册失败:', error);
      toast({
        title: "注册失败",
        description: "注册失败，请重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理微信登录
  const handleWechatLogin = () => {
    toast({
      title: "微信登录",
      description: "正在跳转到微信登录..."
    });
  };

  // 渲染登录表单
  const renderLoginForm = () => <div className="space-y-6">
      {/* 登录方式切换 */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button onClick={() => setLoginMethod('phone')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <Smartphone className="w-4 h-4 inline mr-2" />
          手机号登录
        </button>
        <button onClick={() => setLoginMethod('email')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <Mail className="w-4 h-4 inline mr-2" />
          邮箱登录
        </button>
      </div>

      {/* 手机号登录表单 */}
      {loginMethod === 'phone' && <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              手机号
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="tel" value={formData.phone} onChange={e => setFormData({
            ...formData,
            phone: e.target.value
          })} placeholder="请输入手机号" className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              验证码
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" value={formData.verifyCode} onChange={e => setFormData({
              ...formData,
              verifyCode: e.target.value
            })} placeholder="请输入验证码" maxLength={6} className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.verifyCode ? 'border-red-500' : 'border-gray-300'}`} />
              </div>
              <button onClick={handleSendCode} disabled={countdown > 0 || isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
            {errors.verifyCode && <p className="mt-1 text-sm text-red-600">{errors.verifyCode}</p>}
          </div>
        </div>}

      {/* 邮箱登录表单 */}
      {loginMethod === 'email' && <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="email" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} placeholder="请输入邮箱" className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })} placeholder="请输入密码" className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
        </div>}

      {/* 用户协议 */}
      <div className="flex items-start space-x-2">
        <input type="checkbox" id="agreeTerms" checked={formData.agreeTerms} onChange={e => setFormData({
        ...formData,
        agreeTerms: e.target.checked
      })} className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          我已阅读并同意
          <a href="#" className="text-blue-600 hover:underline ml-1">用户协议</a>
          和
          <a href="#" className="text-blue-600 hover:underline ml-1">隐私政策</a>
        </label>
      </div>
      {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

      {/* 登录按钮 */}
      <button onClick={handleLogin} disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium">
        {isLoading ? <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>登录中...</span>
          </div> : <div className="flex items-center justify-center space-x-2">
            <LogIn className="w-5 h-5" />
            <span>登录</span>
          </div>}
      </button>

      {/* 其他登录方式 */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">其他登录方式</span>
          </div>
        </div>

        <button onClick={handleWechatLogin} className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          <MessageCircle className="w-5 h-5 inline mr-2" />
          微信登录
        </button>
      </div>

      {/* 切换到注册 */}
      <div className="text-center">
        <span className="text-gray-600">还没有账号？</span>
        <button onClick={() => setCurrentView('register')} className="text-blue-600 hover:underline ml-1 font-medium">
          立即注册
        </button>
      </div>
    </div>;

  // 渲染注册表单
  const renderRegisterForm = () => <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">创建账号</h2>
      
      {/* 注册表单内容与登录类似，这里简化处理 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            手机号
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="tel" value={formData.phone} onChange={e => setFormData({
            ...formData,
            phone: e.target.value
          })} placeholder="请输入手机号" className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            验证码
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" value={formData.verifyCode} onChange={e => setFormData({
              ...formData,
              verifyCode: e.target.value
            })} placeholder="请输入验证码" maxLength={6} className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.verifyCode ? 'border-red-500' : 'border-gray-300'}`} />
            </div>
            <button onClick={handleSendCode} disabled={countdown > 0 || isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          </div>
          {errors.verifyCode && <p className="mt-1 text-sm text-red-600">{errors.verifyCode}</p>}
        </div>

        {/* 用户协议 */}
        <div className="flex items-start space-x-2">
          <input type="checkbox" id="agreeTerms" checked={formData.agreeTerms} onChange={e => setFormData({
          ...formData,
          agreeTerms: e.target.checked
        })} className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="agreeTerms" className="text-sm text-gray-600">
            我已阅读并同意
            <a href="#" className="text-blue-600 hover:underline ml-1">用户协议</a>
            和
            <a href="#" className="text-blue-600 hover:underline ml-1">隐私政策</a>
          </label>
        </div>
        {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}

        {/* 注册按钮 */}
        <button onClick={handleRegister} disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium">
          {isLoading ? <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>注册中...</span>
            </div> : <div className="flex items-center justify-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>注册</span>
            </div>}
        </button>
      </div>

      {/* 切换到登录 */}
      <div className="text-center">
        <span className="text-gray-600">已有账号？</span>
        <button onClick={() => setCurrentView('login')} className="text-blue-600 hover:underline ml-1 font-medium">
          立即登录
        </button>
      </div>
    </div>;
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* 顶部导航 */}
        <TopNavigation title={currentView === 'login' ? '登录' : '注册'} showBack={true} />

        <div className="flex items-center justify-center min-h-screen pt-16 pb-20 px-4">
          <div className="w-full max-w-md">
            {/* Logo和标题 */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">染发专家</h1>
              <p className="text-gray-600">专业的染发解决方案平台</p>
            </div>

            {/* 登录/注册卡片 */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                {currentView === 'login' ? renderLoginForm() : renderRegisterForm()}
              </CardContent>
            </Card>

            {/* 特色功能展示 */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">安全可靠</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">快速便捷</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">专业服务</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部导航 */}
        <TabBar />
      </div>
    </ErrorBoundary>;
}