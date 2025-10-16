// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Lock, Phone, Eye, EyeOff, ChevronLeft, MessageCircle, Shield } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Auth(props) {
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
  const [authMode, setAuthMode] = useState('login'); // login, register, forgot
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handlePhoneLogin = () => {
    if (!formData.phone || !formData.password) {
      toast({
        title: "请填写完整信息",
        description: "手机号和密码不能为空"
      });
      return;
    }

    // 模拟登录
    toast({
      title: "登录成功",
      description: "欢迎回来！"
    });

    // 跳转到首页
    $w.utils.navigateTo({
      pageId: 'home',
      params: {}
    });
  };
  const handleWechatLogin = () => {
    toast({
      title: "微信登录",
      description: "正在跳转到微信授权..."
    });
  };
  const handleRegister = () => {
    if (!formData.phone || !formData.password || !formData.confirmPassword) {
      toast({
        title: "请填写完整信息",
        description: "所有字段都是必填的"
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "两次输入的密码不一致"
      });
      return;
    }

    // 模拟注册
    toast({
      title: "注册成功",
      description: "欢迎加入AI染发色彩大师！"
    });

    // 跳转到首页
    $w.utils.navigateTo({
      pageId: 'home',
      params: {}
    });
  };
  const handleForgotPassword = () => {
    if (!formData.phone || !formData.verificationCode) {
      toast({
        title: "请填写完整信息",
        description: "手机号和验证码不能为空"
      });
      return;
    }

    // 模拟重置密码
    toast({
      title: "重置成功",
      description: "密码重置链接已发送到您的手机"
    });
    setAuthMode('login');
  };
  const sendVerificationCode = () => {
    if (!formData.phone) {
      toast({
        title: "请输入手机号",
        description: "手机号不能为空"
      });
      return;
    }
    toast({
      title: "验证码已发送",
      description: "验证码已发送到您的手机"
    });
  };
  const renderLoginForm = () => <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="tel" placeholder="请输入手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type={showPassword ? "text" : "password"} placeholder="请输入密码" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm text-gray-600">记住我</span>
        </label>
        <button onClick={() => setAuthMode('forgot')} className="text-sm text-purple-600 hover:text-purple-700">
          忘记密码？
        </button>
      </div>

      <Button onClick={handlePhoneLogin} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
        登录
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">或</span>
        </div>
      </div>

      <Button onClick={handleWechatLogin} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold">
        <MessageCircle className="w-5 h-5 mr-2" />
        微信登录
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">还没有账号？</span>
        <button onClick={() => setAuthMode('register')} className="text-sm text-purple-600 hover:text-purple-700 ml-1">
          立即注册
        </button>
      </div>
    </div>;
  const renderRegisterForm = () => <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="tel" placeholder="请输入手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="请输入验证码" value={formData.verificationCode} onChange={e => handleInputChange('verificationCode', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <Button onClick={sendVerificationCode} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">
            获取验证码
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type={showPassword ? "text" : "password"} placeholder="请输入密码" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type={showPassword ? "text" : "password"} placeholder="请再次输入密码" value={formData.confirmPassword} onChange={e => handleInputChange('confirmPassword', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>

      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <span className="text-sm text-gray-600">
          我已阅读并同意
          <button className="text-purple-600 hover:text-purple-700 ml-1">用户协议</button>
          和
          <button className="text-purple-600 hover:text-purple-700 ml-1">隐私政策</button>
        </span>
      </div>

      <Button onClick={handleRegister} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
        注册
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">已有账号？</span>
        <button onClick={() => setAuthMode('login')} className="text-sm text-purple-600 hover:text-purple-700 ml-1">
          立即登录
        </button>
      </div>
    </div>;
  const renderForgotPasswordForm = () => <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="tel" placeholder="请输入手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="请输入验证码" value={formData.verificationCode} onChange={e => handleInputChange('verificationCode', e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <Button onClick={sendVerificationCode} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg">
            获取验证码
          </Button>
        </div>
      </div>

      <Button onClick={handleForgotPassword} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
        重置密码
      </Button>

      <div className="text-center">
        <button onClick={() => setAuthMode('login')} className="text-sm text-purple-600 hover:text-purple-700">
          返回登录
        </button>
      </div>
    </div>;
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <button onClick={() => $w.utils.navigateBack()} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-purple-600" />
            <h1 className="text-lg font-semibold">
              {authMode === 'login' ? '登录' : authMode === 'register' ? '注册' : '忘记密码'}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Logo和标题 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {authMode === 'login' ? '欢迎回来' : authMode === 'register' ? '加入我们' : '重置密码'}
            </h2>
            <p className="text-gray-600">
              {authMode === 'login' ? '登录您的账号，享受专业染发服务' : authMode === 'register' ? '注册账号，开启智能染发之旅' : '输入手机号，重置您的密码'}
            </p>
          </div>

          {/* 表单 */}
          <Card>
            <CardContent className="p-6">
              {authMode === 'login' && renderLoginForm()}
              {authMode === 'register' && renderRegisterForm()}
              {authMode === 'forgot' && renderForgotPasswordForm()}
            </CardContent>
          </Card>

          {/* 安全提示 */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              <Shield className="w-4 h-4 inline mr-1" />
              您的信息将被安全加密保护
            </p>
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="auth" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}