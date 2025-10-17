// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Phone, Lock, Eye, EyeOff, Mail, User, ArrowLeft, CheckCircle, AlertCircle, Shield, Smartphone, MessageCircle } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Login(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [currentView, setCurrentView] = useState('login'); // login, register, forgot
  const [loginMethod, setLoginMethod] = useState('phone'); // phone, wechat
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    verifyCode: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 倒计时处理
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 处理表单输入
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 手机号验证
  const validatePhone = phone => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // 密码强度验证
  const validatePassword = password => {
    if (password.length < 6) return '密码长度至少6位';
    if (!/[A-Za-z]/.test(password)) return '密码需包含字母';
    if (!/\d/.test(password)) return '密码需包含数字';
    return '';
  };

  // 发送验证码
  const handleSendVerifyCode = async () => {
    if (!validatePhone(formData.phone)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码"
      });
      return;
    }
    setIsLoading(true);
    // 模拟发送验证码
    setTimeout(() => {
      setCountdown(60);
      setIsLoading(false);
      toast({
        title: "验证码已发送",
        description: "验证码已发送到您的手机"
      });
    }, 1000);
  };

  // 处理登录
  const handleLogin = async () => {
    if (!validatePhone(formData.phone)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码"
      });
      return;
    }
    if (!formData.password) {
      toast({
        title: "请输入密码",
        description: "密码不能为空"
      });
      return;
    }
    setIsLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "登录成功",
        description: "欢迎回来！"
      });
      // 跳转到主页
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }, 1500);
  };

  // 处理注册
  const handleRegister = async () => {
    if (!validatePhone(formData.phone)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码"
      });
      return;
    }
    if (!formData.verifyCode) {
      toast({
        title: "请输入验证码",
        description: "验证码不能为空"
      });
      return;
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast({
        title: "密码格式错误",
        description: passwordError
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "密码不一致",
        description: "两次输入的密码不一致"
      });
      return;
    }
    if (!formData.agreeTerms) {
      toast({
        title: "请同意用户协议",
        description: "请阅读并同意用户协议和隐私政策"
      });
      return;
    }
    setIsLoading(true);
    // 模拟注册请求
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "注册成功",
        description: "欢迎加入AI染发色彩大师！"
      });
      // 跳转到主页
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }, 1500);
  };

  // 处理忘记密码
  const handleForgotPassword = async () => {
    if (!validatePhone(formData.phone)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码"
      });
      return;
    }
    if (!formData.verifyCode) {
      toast({
        title: "请输入验证码",
        description: "验证码不能为空"
      });
      return;
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast({
        title: "密码格式错误",
        description: passwordError
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "密码不一致",
        description: "两次输入的密码不一致"
      });
      return;
    }
    setIsLoading(true);
    // 模拟重置密码请求
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "密码重置成功",
        description: "请使用新密码登录"
      });
      setCurrentView('login');
    }, 1500);
  };

  // 处理微信登录
  const handleWechatLogin = () => {
    toast({
      title: "微信登录",
      description: "正在跳转到微信授权..."
    });
    // 模拟微信登录
    setTimeout(() => {
      toast({
        title: "登录成功",
        description: "微信登录成功！"
      });
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }, 2000);
  };

  // 渲染登录界面
  const renderLogin = () => {
    return <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">欢迎回来</h2>
          <p className="text-gray-600">登录您的账户继续使用</p>
        </div>

        {/* 登录方式选择 */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setLoginMethod('phone')} className={`flex-1 py-2 px-4 rounded-md transition-all ${loginMethod === 'phone' ? 'bg-white shadow-sm' : ''}`}>
            <Smartphone className="w-4 h-4 inline mr-2" />
            手机号登录
          </button>
          <button onClick={() => setLoginMethod('wechat')} className={`flex-1 py-2 px-4 rounded-md transition-all ${loginMethod === 'wechat' ? 'bg-white shadow-sm' : ''}`}>
            <MessageCircle className="w-4 h-4 inline mr-2" />
            微信登录
          </button>
        </div>

        {loginMethod === 'phone' ? <div className="space-y-4">
            {/* 手机号输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="tel" placeholder="请输入手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 记住密码和忘记密码 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">记住密码</span>
              </label>
              <button onClick={() => setCurrentView('forgot')} className="text-sm text-purple-600 hover:text-purple-700">
                忘记密码？
              </button>
            </div>

            {/* 登录按钮 */}
            <Button onClick={handleLogin} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </div> : <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">微信快捷登录</h3>
            <p className="text-gray-600 mb-6">使用微信账号一键登录</p>
            <Button onClick={handleWechatLogin} className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              微信登录
            </Button>
          </div>}

        {/* 注册链接 */}
        <div className="text-center mt-6">
          <span className="text-gray-600">还没有账户？</span>
          <button onClick={() => setCurrentView('register')} className="text-purple-600 hover:text-purple-700 ml-1">
            立即注册
          </button>
        </div>
      </div>;
  };

  // 渲染注册界面
  const renderRegister = () => {
    return <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">创建账户</h2>
          <p className="text-gray-600">加入我们，开启智能染发之旅</p>
        </div>

        <div className="space-y-4">
          {/* 手机号输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="tel" placeholder="请输入手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          {/* 验证码输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="请输入验证码" value={formData.verifyCode} onChange={e => handleInputChange('verifyCode', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <Button onClick={handleSendVerifyCode} disabled={countdown > 0 || isLoading} variant="outline" className="px-4">
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </div>
          </div>

          {/* 密码输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type={showPassword ? 'text' : 'password'} placeholder="请输入密码（6-20位，包含字母和数字）" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 确认密码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="请再次输入密码" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 用户协议 */}
          <div className="flex items-start">
            <input type="checkbox" checked={formData.agreeTerms} onChange={e => handleInputChange('agreeTerms', e.target.checked)} className="mt-1 mr-2" />
            <span className="text-sm text-gray-600">
              我已阅读并同意
              <button className="text-purple-600 hover:text-purple-700">《用户协议》</button>
              和
              <button className="text-purple-600 hover:text-purple-700">《隐私政策》</button>
            </span>
          </div>

          {/* 注册按钮 */}
          <Button onClick={handleRegister} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
            {isLoading ? '注册中...' : '注册'}
          </Button>
        </div>

        {/* 登录链接 */}
        <div className="text-center mt-6">
          <span className="text-gray-600">已有账户？</span>
          <button onClick={() => setCurrentView('login')} className="text-purple-600 hover:text-purple-700 ml-1">
            立即登录
          </button>
        </div>
      </div>;
  };

  // 渲染忘记密码界面
  const renderForgotPassword = () => {
    return <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">重置密码</h2>
          <p className="text-gray-600">请输入手机号验证身份</p>
        </div>

        <div className="space-y-4">
          {/* 手机号输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="tel" placeholder="请输入手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          {/* 验证码输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="请输入验证码" value={formData.verifyCode} onChange={e => handleInputChange('verifyCode', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <Button onClick={handleSendVerifyCode} disabled={countdown > 0 || isLoading} variant="outline" className="px-4">
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </div>
          </div>

          {/* 新密码输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">新密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type={showPassword ? 'text' : 'password'} placeholder="请输入新密码（6-20位，包含字母和数字）" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 确认新密码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">确认新密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="请再次输入新密码" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 重置按钮 */}
          <Button onClick={handleForgotPassword} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
            {isLoading ? '重置中...' : '重置密码'}
          </Button>
        </div>

        {/* 返回登录 */}
        <div className="text-center mt-6">
          <button onClick={() => setCurrentView('login')} className="text-purple-600 hover:text-purple-700 flex items-center mx-auto">
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回登录
          </button>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8">
          {currentView === 'login' && renderLogin()}
          {currentView === 'register' && renderRegister()}
          {currentView === 'forgot' && renderForgotPassword()}
        </CardContent>
      </Card>

      {/* 安全提示 */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg flex items-center space-x-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-medium">安全提示：</span>
              您的信息将被加密保护，请放心使用
            </p>
          </div>
        </div>
      </div>
    </div>;
}