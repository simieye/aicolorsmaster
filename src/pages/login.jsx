// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Alert, AlertDescription, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Lock, Mail, User, LogIn } from 'lucide-react';

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
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      name: ''
    }
  });
  const handleLogin = async data => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async data => {
    setIsLoading(true);
    try {
      const result = await register({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: data.name
      });
      if (result.success) {
        // 切换到登录模式
        setIsLogin(true);
        form.reset();
      }
    } catch (error) {
      console.error('注册失败:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async data => {
    if (isLogin) {
      await handleLogin(data);
    } else {
      await handleRegister(data);
    }
  };
  const toggleMode = () => {
    setIsLogin(!isLogin);
    form.reset();
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-white" />
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
                        <Input placeholder="请输入用户名" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
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
                        <Input type="email" placeholder="请输入邮箱" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />}

                {/* 姓名（仅注册时显示） */}
                {!isLogin && <FormField control={form.control} name="name" rules={{
                required: '请输入姓名'
              }} render={({
                field
              }) => <FormItem>
                    <FormLabel className="text-white">姓名</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                        <Input placeholder="请输入姓名" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
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
                        <Input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" {...field} className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
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
                        <Input type={showPassword ? 'text' : 'password'} placeholder="请再次输入密码" {...field} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />}

                {/* 提交按钮 */}
                <Button type="submit" className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30" disabled={isLoading || loading}>
                  {isLoading || loading ? <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {isLogin ? '登录中...' : '注册中...'}
                    </> : <>
                      <LogIn className="w-4 h-4 mr-2" />
                      {isLogin ? '登录' : '注册'}
                    </>}
                </Button>
              </form>
            </Form>

            {/* 切换登录/注册模式 */}
            <div className="mt-6 text-center">
              <button onClick={toggleMode} className="text-white/80 hover:text-white text-sm">
                {isLogin ? '还没有账户？点击注册' : '已有账户？点击登录'}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 测试账号提示 */}
        <Alert className="mt-6 bg-white/10 border-white/20 text-white">
          <AlertDescription>
            <div className="text-sm">
              <strong>测试账号：</strong><br />
              管理员：admin / admin123<br />
              普通用户：user / user123
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>;
}