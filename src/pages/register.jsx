// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Phone, MessageSquare, Eye, EyeOff, User, Lock, ArrowRight, Wechat, Shield, CheckCircle, AlertCircle, RefreshCw, Camera, Upload } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
export default function Register(props) {
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
  const [registerType, setRegisterType] = useState('phone'); // phone, wechat
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [registerStep, setRegisterStep] = useState('input'); // input, verify, info
  const [avatar, setAvatar] = useState(null);
  const inputRefs = useRef([]);
  const fileInputRef = useRef(null);

  // 验证码倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 手机号验证
  const validatePhone = phone => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // 密码验证
  const validatePassword = pwd => {
    return pwd.length >= 6 && /[A-Za-z]/.test(pwd) && /\d/.test(pwd);
  };

  // 发送验证码
  const sendVerificationCode = async () => {
    if (!validatePhone(phoneNumber)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      setRegisterStep('verify');
      toast({
        title: "验证码已发送",
        description: `验证码已发送至 ${phoneNumber}`
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

  // 处理头像上传
  const handleAvatarUpload = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "头像大小不能超过5MB",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 验证码输入处理
  const handleCodeInput = (index, value) => {
    if (value.length > 1) return;
    const newCode = verificationCode.split('');
    newCode[index] = value;
    setVerificationCode(newCode.join(''));

    // 自动跳转到下一个输入框
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // 验证码键盘事件处理
  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 粘贴验证码
  const handleCodePaste = e => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      setVerificationCode(pastedData);
      inputRefs.current[pastedData.length - 1]?.focus();
    }
  };

  // 手机号注册
  const handlePhoneRegister = async () => {
    if (registerStep === 'input') {
      // 验证手机号
      if (!validatePhone(phoneNumber)) {
        toast({
          title: "手机号格式错误",
          description: "请输入正确的手机号码",
          variant: "destructive"
        });
        return;
      }
      await sendVerificationCode();
      return;
    }
    if (registerStep === 'verify') {
      // 验证验证码
      if (verificationCode.length !== 6) {
        toast({
          title: "验证码错误",
          description: "请输入6位验证码",
          variant: "destructive"
        });
        return;
      }
      setRegisterStep('info');
      return;
    }

    // 最终注册验证
    if (!nickname.trim()) {
      toast({
        title: "请输入昵称",
        description: "昵称不能为空",
        variant: "destructive"
      });
      return;
    }
    if (!validatePassword(password)) {
      toast({
        title: "密码格式错误",
        description: "密码至少6位，包含字母和数字",
        variant: "destructive"
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "密码不一致",
        description: "两次输入的密码不一致",
        variant: "destructive"
      });
      return;
    }
    if (!agreedToTerms) {
      toast({
        title: "请同意服务条款",
        description: "请阅读并同意服务条款和隐私政策",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟注册请求
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 保存用户信息
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify({
        phone: phoneNumber,
        nickname: nickname,
        avatar: avatar || 'https://via.placeholder.com/100',
        registerTime: new Date().toISOString()
      }));
      toast({
        title: "注册成功",
        description: "欢迎加入AI染发色彩大师！"
      });

      // 跳转到首页
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } catch (error) {
      toast({
        title: "注册失败",
        description: "注册失败，请重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 微信注册
  const handleWechatRegister = async () => {
    setIsLoading(true);
    try {
      // 模拟微信授权
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 保存用户信息
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify({
        loginType: 'wechat',
        nickname: '微信用户',
        avatar: 'https://via.placeholder.com/100',
        registerTime: new Date().toISOString()
      }));
      toast({
        title: "注册成功",
        description: "微信注册成功！"
      });

      // 跳转到首页
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } catch (error) {
      toast({
        title: "注册失败",
        description: "微信授权失败，请重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('common.appName', 'AI染发色彩大师')}</h1>
          <p className="text-gray-600">{t('register.subtitle', '创建您的专属色彩账户')}</p>
        </div>

        {/* 注册卡片 */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {registerStep === 'input' && t('register.title', '注册账号')}
                {registerStep === 'verify' && t('register.verifyTitle', '验证手机号')}
                {registerStep === 'info' && t('register.infoTitle', '完善信息')}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {registerStep === 'input' && t('register.subtitle', '请选择注册方式')}
                {registerStep === 'verify' && t('register.verifySubtitle', '验证码已发送至您的手机')}
                {registerStep === 'info' && t('register.infoSubtitle', '请完善您的个人信息')}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {registerStep === 'input' && <>
                  {/* 注册方式选择 */}
                  <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
                    <button onClick={() => setRegisterType('phone')} className={`flex-1 py-2 px-4 rounded-md transition-all ${registerType === 'phone' ? 'bg-white shadow-sm text-purple-600 font-medium' : 'text-gray-600'}`}>
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t('register.phoneRegister', '手机注册')}
                      </button>
                    <button onClick={() => setRegisterType('wechat')} className={`flex-1 py-2 px-4 rounded-md transition-all ${registerType === 'wechat' ? 'bg-white shadow-sm text-purple-600 font-medium' : 'text-gray-600'}`}>
                        <Wechat className="w-4 h-4 inline mr-2" />
                        {t('register.wechatRegister', '微信注册')}
                      </button>
                  </div>

                  {/* 手机号注册 */}
                  {registerType === 'phone' && <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('register.phoneNumber', '手机号码')}
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input type="tel" placeholder={t('register.phonePlaceholder', '请输入手机号码')} value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" maxLength={11} />
                        </div>
                      </div>

                      <Button onClick={handlePhoneRegister} disabled={isLoading} className="w-full py-3 bg-purple-600 hover:bg-purple-700">
                        {isLoading ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                        {t('register.nextStep', '下一步')}
                      </Button>
                    </div>}

                  {/* 微信注册 */}
                  {registerType === 'wechat' && <div className="space-y-4">
                      <div className="text-center py-8">
                        <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Wechat className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-gray-600 mb-6">
                          {t('register.wechatDesc', '使用微信账号快速注册')}
                        </p>
                        <Button onClick={handleWechatRegister} disabled={isLoading} className="w-full py-3 bg-green-500 hover:bg-green-600">
                          {isLoading ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Wechat className="w-5 h-5 mr-2" />}
                          {t('register.wechatRegisterBtn', '微信注册')}
                        </Button>
                      </div>
                    </div>}
                </>}

              {registerStep === 'verify' && <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-gray-600">
                      {t('register.codeSentTo', '验证码已发送至')} {phoneNumber}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-2" onPaste={handleCodePaste}>
                    {[0, 1, 2, 3, 4, 5].map(index => <input key={index} ref={el => inputRefs.current[index] = el} type="text" maxLength={1} value={verificationCode[index] || ''} onChange={e => handleCodeInput(index, e.target.value)} onKeyDown={e => handleCodeKeyDown(index, e)} className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />)}
                  </div>

                  <div className="text-center">
                    <button onClick={sendVerificationCode} disabled={countdown > 0} className="text-purple-600 hover:underline text-sm">
                      {countdown > 0 ? t('register.resendCode', '重新发送') + ` (${countdown}s)` : t('register.resendCode', '重新发送')}
                    </button>
                  </div>

                  <Button onClick={handlePhoneRegister} disabled={verificationCode.length !== 6 || isLoading} className="w-full py-3 bg-purple-600 hover:bg-purple-700">
                    {isLoading ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                    {t('register.verifyCode', '验证码验证')}
                  </Button>

                  <button onClick={() => setRegisterStep('input')} className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm">
                    {t('register.backToRegister', '返回注册')}
                  </button>
                </div>}

              {registerStep === 'info' && <div className="space-y-4">
                  {/* 头像上传 */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                        {avatar ? <img src={avatar} alt="头像" className="w-full h-full object-cover" /> : <User className="w-full h-full text-gray-400 p-6" />}
                      </div>
                      <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700">
                        <Camera className="w-4 h-4" />
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                    </div>
                    <p className="text-sm text-gray-600">{t('register.uploadAvatar', '点击上传头像')}</p>
                  </div>

                  {/* 昵称 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('register.nickname', '昵称')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="text" placeholder={t('register.nicknamePlaceholder', '请输入昵称')} value={nickname} onChange={e => setNickname(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" maxLength={20} />
                    </div>
                  </div>

                  {/* 密码 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('register.password', '密码')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type={showPassword ? 'text' : 'password'} placeholder={t('register.passwordPlaceholder', '请输入密码')} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t('register.passwordTip', '密码至少6位，包含字母和数字')}
                    </p>
                  </div>

                  {/* 确认密码 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('register.confirmPassword', '确认密码')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type={showConfirmPassword ? 'text' : 'password'} placeholder={t('register.confirmPasswordPlaceholder', '请再次输入密码')} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* 服务条款 */}
                  <div className="flex items-center">
                    <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mr-2" />
                    <span className="text-sm text-gray-600">
                      {t('register.agreeTerms', '我已阅读并同意')}
                      <a href="#" className="text-purple-600 hover:underline ml-1">
                        {t('register.termsOfService', '服务条款')}
                      </a>
                      {t('register.and', '和')}
                      <a href="#" className="text-purple-600 hover:underline ml-1">
                        {t('register.privacyPolicy', '隐私政策')}
                      </a>
                    </span>
                  </div>

                  <Button onClick={handlePhoneRegister} disabled={isLoading} className="w-full py-3 bg-purple-600 hover:bg-purple-700">
                    {isLoading ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                    {t('register.completeRegister', '完成注册')}
                  </Button>
                </div>}

              {/* 登录链接 */}
              {registerStep === 'input' && <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    {t('register.hasAccount', '已有账号？')}
                    <button onClick={() => $w.utils.navigateTo({
                  pageId: 'login',
                  params: {}
                })} className="text-purple-600 hover:underline ml-1 font-medium">
                      {t('register.loginNow', '立即登录')}
                    </button>
                  </p>
                </div>}
            </CardContent>
          </Card>

          {/* 安全提示 */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>{t('register.securityTip', '您的信息将被安全加密保护')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}