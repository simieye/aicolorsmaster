// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Lock, Mail, Eye, EyeOff, LogIn, UserPlus, AlertCircle, CheckCircle, Globe, Smartphone, Fingerprint, Shield, Zap, ArrowRight, ChevronRight, Star, Heart, Gift, Crown } from 'lucide-react';

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

  // 状态管理
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    code: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');

  // 支持的语言列表
  const languages = [{
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳'
  }, {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵'
  }, {
    code: 'ko-KR',
    name: '한국어',
    flag: '🇰🇷'
  }];

  // 多语言文本
  const getText = key => {
    const texts = {
      'zh-CN': {
        title: 'AI染发色彩大师',
        subtitle: '智能色彩推荐，个性化染发方案',
        loginTab: '登录',
        registerTab: '注册',
        email: '邮箱',
        password: '密码',
        confirmPassword: '确认密码',
        phone: '手机号',
        code: '验证码',
        getCode: '获取验证码',
        agreeTerms: '我已阅读并同意',
        terms: '用户协议',
        privacy: '隐私政策',
        loginBtn: '登录',
        registerBtn: '注册',
        forgotPassword: '忘记密码？',
        orLogin: '或使用以下方式登录',
        quickLogin: '快速登录',
        wechatLogin: '微信登录',
        phoneLogin: '手机号登录',
        faceLogin: '面容登录',
        fingerprintLogin: '指纹登录',
        noAccount: '还没有账号？',
        hasAccount: '已有账号？',
        goRegister: '立即注册',
        goLogin: '立即登录',
        emailRequired: '请输入邮箱',
        emailInvalid: '邮箱格式不正确',
        passwordRequired: '请输入密码',
        passwordMinLength: '密码至少6位',
        passwordMismatch: '两次密码不一致',
        phoneRequired: '请输入手机号',
        phoneInvalid: '手机号格式不正确',
        codeRequired: '请输入验证码',
        termsRequired: '请同意用户协议和隐私政策',
        loginSuccess: '登录成功',
        registerSuccess: '注册成功',
        codeSent: '验证码已发送',
        countdown: '秒后重新发送'
      },
      'en-US': {
        title: 'AI Hair Color Master',
        subtitle: 'Smart Color Recommendation, Personalized Hair Dyeing Solutions',
        loginTab: 'Login',
        registerTab: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        phone: 'Phone',
        code: 'Verification Code',
        getCode: 'Get Code',
        agreeTerms: 'I have read and agree to',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        loginBtn: 'Login',
        registerBtn: 'Register',
        forgotPassword: 'Forgot Password?',
        orLogin: 'Or login with',
        quickLogin: 'Quick Login',
        wechatLogin: 'WeChat Login',
        phoneLogin: 'Phone Login',
        faceLogin: 'Face Login',
        fingerprintLogin: 'Fingerprint Login',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        goRegister: 'Register Now',
        goLogin: 'Login Now',
        emailRequired: 'Please enter email',
        emailInvalid: 'Invalid email format',
        passwordRequired: 'Please enter password',
        passwordMinLength: 'Password must be at least 6 characters',
        passwordMismatch: 'Passwords do not match',
        phoneRequired: 'Please enter phone number',
        phoneInvalid: 'Invalid phone number format',
        codeRequired: 'Please enter verification code',
        termsRequired: 'Please agree to Terms of Service and Privacy Policy',
        loginSuccess: 'Login successful',
        registerSuccess: 'Registration successful',
        codeSent: 'Verification code sent',
        countdown: 'seconds to resend'
      },
      'ja-JP': {
        title: 'AIヘアカラーマスター',
        subtitle: 'スマートカラー推薦、パーソナライズドヘアカラー溶液',
        loginTab: 'ログイン',
        registerTab: '登録',
        email: 'メール',
        password: 'パスワード',
        confirmPassword: 'パスワード確認',
        phone: '電話番号',
        code: '認証コード',
        getCode: 'コード取得',
        agreeTerms: '利用規約に同意します',
        terms: '利用規約',
        privacy: 'プライバシーポリシー',
        loginBtn: 'ログイン',
        registerBtn: '登録',
        forgotPassword: 'パスワードを忘れた？',
        orLogin: 'または以下でログイン',
        quickLogin: 'クイックログイン',
        wechatLogin: 'WeChatログイン',
        phoneLogin: '電話番号ログイン',
        faceLogin: '顔認証ログイン',
        fingerprintLogin: '指紋ログイン',
        noAccount: 'アカウントをお持ちでない場合',
        hasAccount: 'アカウントをお持ちの場合',
        goRegister: '今すぐ登録',
        goLogin: '今すぐログイン',
        emailRequired: 'メールを入力してください',
        emailInvalid: 'メール形式が正しくありません',
        passwordRequired: 'パスワードを入力してください',
        passwordMinLength: 'パスワードは6文字以上必要です',
        passwordMismatch: 'パスワードが一致しません',
        phoneRequired: '電話番号を入力してください',
        phoneInvalid: '電話番号形式が正しくありません',
        codeRequired: '認証コードを入力してください',
        termsRequired: '利用規約とプライバシーポリシーに同意してください',
        loginSuccess: 'ログイン成功',
        registerSuccess: '登録成功',
        codeSent: '認証コードを送信しました',
        countdown: '秒后再送'
      },
      'ko-KR': {
        title: 'AI 헤어컬러 마스터',
        subtitle: '스마트 색상 추천, 개인화된 헤어 염색 솔루션',
        loginTab: '로그인',
        registerTab: '회원가입',
        email: '이메일',
        password: '비밀번호',
        confirmPassword: '비밀번호 확인',
        phone: '전화번호',
        code: '인증코드',
        getCode: '코드 받기',
        agreeTerms: '이용약관에 동의합니다',
        terms: '이용약관',
        privacy: '개인정보처리방침',
        loginBtn: '로그인',
        registerBtn: '회원가입',
        forgotPassword: '비밀번호를 잊으셨나요?',
        orLogin: '또는 다음으로 로그인',
        quickLogin: '빠른 로그인',
        wechatLogin: '위챗 로그인',
        phoneLogin: '전화번호 로그인',
        faceLogin: '얼굴 인식 로그인',
        fingerprintLogin: '지문 로그인',
        noAccount: '계정이 없으신가요?',
        hasAccount: '이미 계정이 있으신가요?',
        goRegister: '지금 가입',
        goLogin: '지금 로그인',
        emailRequired: '이메일을 입력하세요',
        emailInvalid: '이메일 형식이 올바르지 않습니다',
        passwordRequired: '비밀번호를 입력하세요',
        passwordMinLength: '비밀번호는 최소 6자 이상이어야 합니다',
        passwordMismatch: '비밀번호가 일치하지 않습니다',
        phoneRequired: '전화번호를 입력하세요',
        phoneInvalid: '전화번호 형식이 올바르지 않습니다',
        codeRequired: '인증코드를 입력하세요',
        termsRequired: '이용약관과 개인정보처리방침에 동의하세요',
        loginSuccess: '로그인 성공',
        registerSuccess: '회원가입 성공',
        codeSent: '인증코드를 보냈습니다',
        countdown: '초 후 재전송'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key] || key;
  };

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 表单验证
  const validateForm = () => {
    const newErrors = {};
    const t = getText;
    if (!formData.email) {
      newErrors.email = t('emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('emailInvalid');
    }
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordMinLength');
    }
    if (activeTab === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordRequired');
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordMismatch');
      }
      if (!formData.phone) {
        newErrors.phone = t('phoneRequired');
      } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = t('phoneInvalid');
      }
      if (!formData.code) {
        newErrors.code = t('codeRequired');
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = t('termsRequired');
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理登录
  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: getText('loginSuccess'),
        description: "欢迎回来！"
      });

      // 跳转到首页
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    } catch (error) {
      toast({
        title: "登录失败",
        description: "请检查您的账号和密码",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // 模拟注册请求
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: getText('registerSuccess'),
        description: "注册成功，请登录"
      });

      // 切换到登录标签
      setActiveTab('login');
    } catch (error) {
      toast({
        title: "注册失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 发送验证码
  const sendCode = async () => {
    if (!formData.phone) {
      setErrors({
        phone: getText('phoneRequired')
      });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setErrors({
        phone: getText('phoneInvalid')
      });
      return;
    }
    try {
      // 模拟发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      toast({
        title: getText('codeSent'),
        description: `验证码已发送至 ${formData.phone}`
      });
    } catch (error) {
      toast({
        title: "发送失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };

  // 快速登录
  const handleQuickLogin = type => {
    toast({
      title: "快速登录",
      description: `正在使用${type}登录...`
    });
  };

  // 渲染登录表单
  const renderLoginForm = () => {
    const t = getText;
    return <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="email" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('email')} />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('password')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('password')} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
            <span className="ml-2 text-sm text-gray-600">记住我</span>
          </label>
          <button type="button" className="text-sm text-purple-600 hover:text-purple-800">
            {t('forgotPassword')}
          </button>
        </div>

        <Button onClick={handleLogin} disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
          {isLoading ? '登录中...' : t('loginBtn')}
        </Button>
      </div>;
  };

  // 渲染注册表单
  const renderRegisterForm = () => {
    const t = getText;
    return <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="email" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('email')} />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('password')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('password')} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('confirmPassword')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={e => setFormData({
            ...formData,
            confirmPassword: e.target.value
          })} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('confirmPassword')} />
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('phone')}
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="tel" value={formData.phone} onChange={e => setFormData({
            ...formData,
            phone: e.target.value
          })} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('phone')} />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('code')}
          </label>
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <input type="text" value={formData.code} onChange={e => setFormData({
              ...formData,
              code: e.target.value
            })} className={`w-full pl-4 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.code ? 'border-red-500' : 'border-gray-300'}`} placeholder={t('code')} />
            </div>
            <Button type="button" onClick={sendCode} disabled={countdown > 0} variant="outline" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {countdown > 0 ? `${countdown}${t('countdown')}` : t('getCode')}
            </Button>
          </div>
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
        </div>

        <div className="flex items-start">
          <input type="checkbox" checked={formData.agreeTerms} onChange={e => setFormData({
          ...formData,
          agreeTerms: e.target.checked
        })} className={`mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500 ${errors.agreeTerms ? 'border-red-500' : ''}`} />
          <span className="ml-2 text-sm text-gray-600">
            {t('agreeTerms')}
            <button type="button" className="text-purple-600 hover:text-purple-800 ml-1">
              {t('terms')}
            </button>
            {getText('zh-CN') === '简体中文' ? '和' : ' and '}
            <button type="button" className="text-purple-600 hover:text-purple-800 ml-1">
              {t('privacy')}
            </button>
          </span>
        </div>
        {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}

        <Button onClick={handleRegister} disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center">
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
          {isLoading ? '注册中...' : t('registerBtn')}
        </Button>
      </div>;
  };

  // 渲染快速登录
  const renderQuickLogin = () => {
    const t = getText;
    return <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">{t('orLogin')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleQuickLogin(t('wechatLogin'))} className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium">{t('wechatLogin')}</span>
          </button>
          
          <button onClick={() => handleQuickLogin(t('phoneLogin'))} className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Smartphone className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium">{t('phoneLogin')}</span>
          </button>
          
          <button onClick={() => handleQuickLogin(t('faceLogin'))} className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Fingerprint className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm font-medium">{t('faceLogin')}</span>
          </button>
          
          <button onClick={() => handleQuickLogin(t('fingerprintLogin'))} className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-sm font-medium">{t('fingerprintLogin')}</span>
          </button>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 语言切换 */}
        <div className="flex justify-end mb-4">
          <div className="relative">
            <button className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {languages.map(lang => <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)} className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${selectedLanguage === lang.code ? 'bg-purple-50' : ''}`}>
                  <span>{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>)}
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Logo和标题 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{getText('title')}</h1>
            <p className="text-gray-600">{getText('subtitle')}</p>
          </div>

          {/* 登录/注册卡片 */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* 标签切换 */}
              <div className="flex mb-8">
                <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === 'login' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  {getText('loginTab')}
                </button>
                <button onClick={() => setActiveTab('register')} className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === 'register' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  {getText('registerTab')}
                </button>
              </div>

              {/* 表单内容 */}
              {activeTab === 'login' ? renderLoginForm() : renderRegisterForm()}

              {/* 快速登录 */}
              {activeTab === 'login' && renderQuickLogin()}

              {/* 切换提示 */}
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">
                  {activeTab === 'login' ? getText('noAccount') : getText('hasAccount')}
                </span>
                <button type="button" onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')} className="ml-1 text-sm text-purple-600 hover:text-purple-800 font-medium">
                  {activeTab === 'login' ? getText('goRegister') : getText('goLogin')}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* 特色功能展示 */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">智能推荐</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-xs text-gray-600">个性定制</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600">专属优惠</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}