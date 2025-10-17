// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Phone, Lock, ArrowLeft, ArrowRight, Shield, CheckCircle, AlertCircle, Mail, EyeOff, Eye } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function ForgotPassword(props) {
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
  const [step, setStep] = useState(1); // 1: 验证手机号, 2: 重置密码, 3: 完成
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // 倒计时效果
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 密码强度检测
  useEffect(() => {
    if (newPassword.length === 0) {
      setPasswordStrength(0);
    } else if (newPassword.length < 6) {
      setPasswordStrength(1);
    } else if (newPassword.length < 10 && /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword)) {
      setPasswordStrength(2);
    } else if (newPassword.length >= 10 && /[0-9]/.test(newPassword) && /[a-zA-Z]/.test(newPassword) && /[^a-zA-Z0-9]/.test(newPassword)) {
      setPasswordStrength(3);
    } else {
      setPasswordStrength(2);
    }
  }, [newPassword]);

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

  // 验证手机号和验证码
  const verifyPhone = () => {
    if (!phoneNumber || !verificationCode) {
      toast({
        title: "请填写完整信息",
        description: "手机号和验证码不能为空",
        variant: "destructive"
      });
      return;
    }
    if (verificationCode.length !== 6) {
      toast({
        title: "验证码格式错误",
        description: "请输入6位验证码",
        variant: "destructive"
      });
      return;
    }

    // 模拟验证
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      toast({
        title: "验证成功",
        description: "手机号验证通过，请设置新密码"
      });
    }, 1500);
  };

  // 重置密码
  const resetPassword = () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "请填写完整信息",
        description: "新密码和确认密码不能为空",
        variant: "destructive"
      });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        title: "密码强度不足",
        description: "密码长度至少6位",
        variant: "destructive"
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: "密码不一致",
        description: "两次输入的密码不一致",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      toast({
        title: "密码重置成功",
        description: "您的密码已成功重置"
      });
    }, 1500);
  };

  // 返回登录
  const backToLogin = () => {
    $w.utils.navigateTo({
      pageId: 'login',
      params: {}
    });
  };

  // 获取密码强度文本
  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return '';
      case 1:
        return '弱';
      case 2:
        return '中';
      case 3:
        return '强';
      default:
        return '';
    }
  };

  // 获取密码强度颜色
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return '';
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-green-500';
      default:
        return '';
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">重置密码</h1>
          <p className="text-gray-600">找回您的账户密码</p>
        </div>

        {/* 重置密码卡片 */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* 步骤指示器 */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map(stepNumber => <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNumber ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && <div className={`w-16 h-1 ${step > stepNumber ? 'bg-purple-600' : 'bg-gray-200'}`}></div>}
                </div>)}
            </div>

            {/* 步骤1: 验证手机号 */}
            {step === 1 && <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">验证手机号</h3>
                  <p className="text-sm text-gray-600 mb-4">请输入您的手机号以接收验证码</p>
                </div>

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

                {/* 验证码输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    验证码
                  </label>
                  <div className="flex space-x-2">
                    <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} placeholder="请输入验证码" maxLength={6} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    <button onClick={sendVerificationCode} disabled={countdown > 0} className={`px-4 py-3 rounded-lg font-medium transition-colors ${countdown > 0 ? 'bg-gray-200 text-gray-500' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                      {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </button>
                  </div>
                </div>

                {/* 按钮组 */}
                <div className="flex space-x-3">
                  <Button onClick={backToLogin} variant="outline" className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回登录
                  </Button>
                  <Button onClick={verifyPhone} disabled={isLoading} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    {isLoading ? '验证中...' : '下一步'}
                  </Button>
                </div>
              </div>}

            {/* 步骤2: 重置密码 */}
            {step === 2 && <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">设置新密码</h3>
                  <p className="text-sm text-gray-600 mb-4">请设置您的新密码</p>
                </div>

                {/* 新密码 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    新密码
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="请输入新密码" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* 密码强度指示器 */}
                  {newPassword && <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">密码强度</span>
                        <span className={`font-medium ${passwordStrength === 1 ? 'text-red-600' : passwordStrength === 2 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`} style={{
                    width: `${passwordStrength * 33.33}%`
                  }}></div>
                      </div>
                    </div>}
                </div>

                {/* 确认密码 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认新密码
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="请再次输入新密码" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* 密码要求 */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">密码要求：</p>
                      <ul className="space-y-1 text-xs">
                        <li>• 至少6个字符</li>
                        <li>• 包含字母和数字</li>
                        <li>• 建议包含特殊字符</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 按钮组 */}
                <div className="flex space-x-3">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    上一步
                  </Button>
                  <Button onClick={resetPassword} disabled={isLoading} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    {isLoading ? '重置中...' : '重置密码'}
                  </Button>
                </div>
              </div>}

            {/* 步骤3: 完成 */}
            {step === 3 && <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">密码重置成功！</h3>
                <p className="text-gray-600 mb-6">您的密码已成功重置，现在可以使用新密码登录</p>
                
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center text-green-800">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm">为了您的账户安全，建议定期更换密码</span>
                  </div>
                </div>

                <Button onClick={backToLogin} className="w-full bg-purple-600 hover:bg-purple-700">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  返回登录
                </Button>
              </div>}
          </CardContent>
        </Card>

        {/* 其他选项 */}
        {step === 1 && <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">其他找回方式</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center mx-auto">
              <Mail className="w-4 h-4 mr-2" />
              邮箱找回
            </button>
          </div>}

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