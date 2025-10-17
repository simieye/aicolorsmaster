// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Phone, Lock, MessageCircle, User, ArrowRight, Shield, CheckCircle } from 'lucide-react';

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
  const [loginType, setLoginType] = useState('phone'); // phone, wechat
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 处理手机号登录
  const handlePhoneLogin = async () => {
    if (!phoneNumber || !password) {
      toast({
        title: "请填写完整信息",
        description: "手机号和密码不能为空",
        variant: "destructive"
      });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false);

      // 模拟登录成功
      toast({
        title: "登录成功",
        description: "欢迎回来！"
      });

      // 跳转到首页
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }, 1500);
  };

  // 处理微信登录
  const handleWechatLogin = () => {
    toast({
      title: "微信登录",
      description: "正在跳转到微信授权页面..."
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

  // 发送验证码
  const sendVerificationCode = () => {
    if (!phoneNumber) {
      toast({
        title: "请输入手机号",
        description: "手机号不能为空",
        variant: "destructive"
      });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码",
        variant: "destructive"
      });
      return;
    }
    setCountdown(60);
    toast({
      title: "验证码已发送",
      description: "验证码已发送到您的手机"
    });
  };

  // 处理验证码登录
  const handleCodeLogin = () => {
    if (!phoneNumber || !verificationCode) {
      toast({
        title: "请填写完整信息",
        description: "手机号和验证码不能为空",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "登录成功",
        description: "验证码登录成功！"
      });
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }, 1500);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">欢迎回来</h1>
          <p className="text-gray-600">登录您的账户，开启色彩之旅</p>
        </div>

        {/* 登录卡片 */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* 登录方式切换 */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button onClick={() => setLoginType('phone')} className={`flex-1 py-2 px-4 rounded-md transition-all ${loginType === 'phone' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'}`}>
                <Phone className="w-4 h-4 inline mr-2" />
                手机号登录
              </button>
              <button onClick={() => setLoginType('wechat')} className={`flex-1 py-2 px-4 rounded-md transition-all ${loginType === 'wechat' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'}`}>
                <MessageCircle className="w-4 h-4 inline mr-2" />
                微信登录
              </button>
            </div>

            {/* 手机号登录表单 */}
            {loginType === 'phone' && <div className="space-y-4">
                {/* 手机号输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="请输入手机号" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                </div>

                {/* 登录方式切换 */}
                <div className="flex space-x-2">
                  <button onClick={() => setLoginType('phone-password')} className={`flex-1 py-2 px-4 rounded-lg border ${loginType === 'phone-password' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300 text-gray-600'}`}>
                    密码登录
                  </button>
                  <button onClick={() => setLoginType('phone-code')} className={`flex-1 py-2 px-4 rounded-lg border ${loginType === 'phone-code' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300 text-gray-600'}`}>
                    验证码登录
                  </button>
                </div>

                {/* 密码登录 */}
                {loginType === 'phone-password' && <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      密码
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="请输入密码" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>}

                {/* 验证码登录 */}
                {loginType === 'phone-code' && <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      验证码
                    </label>
                    <div className="flex space-x-2">
                      <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} placeholder="请输入验证码" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                      <button onClick={sendVerificationCode} disabled={countdown > 0} className={`px-4 py-3 rounded-lg font-medium transition-colors ${countdown > 0 ? 'bg-gray-200 text-gray-500' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                        {countdown > 0 ? `${countdown}s` : '获取验证码'}
                      </button>
                    </div>
                  </div>}

                {/* 记住我和忘记密码 */}
                {loginType === 'phone-password' && <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">记住我</span>
                    </label>
                    <button onClick={() => $w.utils.navigateTo({
                pageId: 'forgot-password',
                params: {}
              })} className="text-sm text-purple-600 hover:text-purple-700">
                      忘记密码？
                    </button>
                  </div>}

                {/* 登录按钮 */}
                <Button onClick={loginType === 'phone-password' ? handlePhoneLogin : handleCodeLogin} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50">
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </div>}

            {/* 微信登录 */}
            {loginType === 'wechat' && <div className="text-center py-8">
                <div className="w-32 h-32 bg-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">微信快速登录</h3>
                <p className="text-gray-600 mb-6">使用微信账号一键登录</p>
                <Button onClick={handleWechatLogin} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  微信登录
                </Button>
              </div>}

            {/* 分割线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或</span>
              </div>
            </div>

            {/* 注册链接 */}
            <div className="text-center">
              <p className="text-gray-600">
                还没有账户？
                <button onClick={() => $w.utils.navigateTo({
                pageId: 'register',
                params: {}
              })} className="text-purple-600 hover:text-purple-700 font-medium">
                  立即注册
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 安全提示 */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Shield className="w-4 h-4 mr-1" />
            <span>您的信息将被安全加密保护</span>
          </div>
        </div>
      </div>
    </div>;
}