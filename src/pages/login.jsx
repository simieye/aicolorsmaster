// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

// @ts-ignore;
import { useAuth } from '@/components/AuthProvider';
export default function LoginPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    login,
    register,
    loading
  } = useAuth();
  const {
    toast
  } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const onSubmit = async data => {
    setIsLoading(true);
    try {
      if (isLogin) {
        // 登录
        const result = await login({
          username: data.username,
          password: data.password
        });
        if (result.success) {
          // 跳转到首页
          if ($w.utils && $w.utils.navigateTo) {
            $w.utils.navigateTo({
              pageId: 'home',
              params: {}
            });
          }
        }
      } else {
        // 注册
        if (data.password !== data.confirmPassword) {
          toast({
            title: "密码不匹配",
            description: "请确保两次输入的密码相同",
            variant: "destructive"
          });
          return;
        }
        const result = await register({
          username: data.username,
          email: data.email,
          password: data.password
        });
        if (result.success) {
          // 切换到登录模式
          setIsLogin(true);
          form.reset();
        }
      }
    } catch (error) {
      console.error('操作失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleMode = () => {
    setIsLogin(!isLogin);
    form.reset();
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? '欢迎回来' : '创建账户'}
          </h1>
          <p className="text-white/80">
            {isLogin ? '登录您的账户以继续' : '注册新账户开始使用'}
          </p>
        </div>

        {/* 登录/注册表单 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">
              {isLogin ? '登录' : '注册'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* 用户名 */}
                <FormField control={form.control} name="username" rules={{
                required: '请输入用户名',
                minLength: {
                  value: 3,
                  message: '用户名至少3个字符'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-white">用户名</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                        <Input placeholder="请输入用户名" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                {/* 邮箱（仅注册时显示） */}
                {!isLogin && <FormField control={form.control} name="email" rules={{
                required: '请输入邮箱',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的邮箱地址'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-white">邮箱</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                        <Input type="email" placeholder="请输入邮箱" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />}

                {/* 密码 */}
                <FormField control={form.control} name="password" rules={{
                required: '请输入密码',
                minLength: {
                  value: 6,
                  message: '密码至少6个字符'
                }
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-white">密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                        <Input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" {...field} className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

                {/* 确认密码（仅注册时显示） */}
                {!isLogin && <FormField control={form.control} name="confirmPassword" rules={{
                required: '请确认密码',
                validate: value => value === form.watch('password') || '两次输入的密码不一致'
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-white">确认密码</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                        <Input type={showPassword ? 'text' : 'password'} placeholder="请再次输入密码" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />}

                {/* 提交按钮 */}
                <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-white/90 font-medium" disabled={isLoading || loading}>
                  {isLoading || loading ? <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                      {isLogin ? '登录中...' : '注册中...'}
                    </div> : isLogin ? '登录' : '注册'}
                </Button>
              </form>
            </Form>

            {/* 切换登录/注册模式 */}
            <div className="mt-6 text-center">
              <p className="text-white/80">
                {isLogin ? '还没有账户？' : '已有账户？'}
                <button onClick={toggleMode} className="text-white font-medium hover:underline ml-1">
                  {isLogin ? '立即注册' : '立即登录'}
                </button>
              </p>
            </div>

            {/* 演示账户信息 */}
            {isLogin && <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-white/80 text-sm mb-2">演示账户：</p>
                <div className="space-y-1 text-white/60 text-xs">
                  <p>管理员：admin / 123456</p>
                  <p>经理：manager / 123456</p>
                  <p>技术员：technician / 123456</p>
                </div>
              </div>}
          </CardContent>
        </Card>

        {/* 底部信息 */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>&copy; 2024 智能涂料管理系统. 保留所有权利.</p>
        </div>
      </div>
    </div>;
}