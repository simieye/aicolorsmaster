// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, AlertCircle, Info, Download, Heart, Share2, Star } from 'lucide-react';

// @ts-ignore;
import { EnhancedButton } from './EnhancedButton';
// @ts-ignore;
import { EnhancedForm, FormFieldEnhanced } from './EnhancedForm';
// @ts-ignore;
import { LoadingSpinner, LoadingDots, LoadingSkeleton } from './LoadingSpinner';
// @ts-ignore;
import { HoverCard, HoverButton, HoverImage, HoverTooltip } from './HoverEffects';
// @ts-ignore;
import { useToast } from './ToastProvider';
// @ts-ignore;

export const InteractionDemo = () => {
  const {
    success,
    error,
    warning,
    info
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const handleToastDemo = type => {
    const messages = {
      success: '操作成功完成！',
      error: '操作失败，请重试',
      warning: '请注意这个警告信息',
      info: '这是一条信息提示'
    };
    switch (type) {
      case 'success':
        success(messages.success);
        break;
      case 'error':
        error(messages.error);
        break;
      case 'warning':
        warning(messages.warning);
        break;
      case 'info':
        info(messages.info);
        break;
    }
  };
  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      success('加载完成！');
    }, 2000);
  };
  const handleFormSubmit = async data => {
    setFormData(data);
    console.log('Form submitted:', data);
    return true;
  };
  return <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">用户交互反馈演示</h1>
          <p className="text-muted-foreground">体验各种交互反馈效果</p>
        </div>

        {/* Toast 演示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Toast 提示演示</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => handleToastDemo('success')} className="bg-green-600 hover:bg-green-700">
                成功提示
              </Button>
              <Button onClick={() => handleToastDemo('error')} variant="destructive">
                错误提示
              </Button>
              <Button onClick={() => handleToastDemo('warning')} variant="outline">
                警告提示
              </Button>
              <Button onClick={() => handleToastDemo('info')} variant="outline">
                信息提示
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 按钮状态演示 */}
        <Card>
          <CardHeader>
            <CardTitle>按钮状态演示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EnhancedButton onClick={() => success('点击成功！')}>
                普通按钮
              </EnhancedButton>
              
              <EnhancedButton loading={isLoading} onClick={handleLoadingDemo} loadingText="处理中...">
                加载状态
              </EnhancedButton>
              
              <EnhancedButton onClick={() => error('演示错误')} error={false} errorText="操作失败">
                错误状态
              </EnhancedButton>
            </div>
          </CardContent>
        </Card>

        {/* 加载动画演示 */}
        <Card>
          <CardHeader>
            <CardTitle>加载动画演示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <LoadingSpinner size="lg" text="旋转加载" />
              </div>
              
              <div className="text-center space-y-2">
                <LoadingDots color="primary" />
                <p className="text-sm text-muted-foreground">点状加载</p>
              </div>
              
              <div className="space-y-2">
                <LoadingSkeleton lines={3} />
                <p className="text-sm text-muted-foreground">骨架屏</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 表单演示 */}
        <Card>
          <CardHeader>
            <CardTitle>增强表单演示</CardTitle>
          </CardHeader>
          <CardContent>
            <EnhancedForm onSubmit={handleFormSubmit} submitText="提交表单" submittingText="提交中..." successText="提交成功！">
              <FormFieldEnhanced name="name" label="姓名" placeholder="请输入您的姓名" required />
              
              <FormFieldEnhanced name="email" label="邮箱" type="email" placeholder="请输入您的邮箱" required />
              
              <FormFieldEnhanced name="message" label="留言" placeholder="请输入您的留言" />
            </EnhancedForm>
          </CardContent>
        </Card>

        {/* 悬停效果演示 */}
        <Card>
          <CardHeader>
            <CardTitle>悬停效果演示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <HoverCard className="p-4 bg-card border rounded-lg cursor-pointer">
                <h3 className="font-medium">悬停卡片</h3>
                <p className="text-sm text-muted-foreground mt-1">鼠标悬停查看效果</p>
              </HoverCard>
              
              <HoverButton className="p-4 bg-secondary rounded-lg w-full">
                悬停按钮
              </HoverButton>
              
              <HoverTooltip content="这是一个工具提示">
                <div className="p-4 bg-muted rounded-lg text-center cursor-pointer">
                  悬停提示
                </div>
              </HoverTooltip>
              
              <div className="p-4 bg-card border rounded-lg">
                <div className="flex justify-around">
                  <HoverTooltip content="下载">
                    <Download className="w-5 h-5 cursor-pointer hover:text-primary" />
                  </HoverTooltip>
                  <HoverTooltip content="收藏">
                    <Heart className="w-5 h-5 cursor-pointer hover:text-red-500" />
                  </HoverTooltip>
                  <HoverTooltip content="分享">
                    <Share2 className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                  </HoverTooltip>
                  <HoverTooltip content="评分">
                    <Star className="w-5 h-5 cursor-pointer hover:text-yellow-500" />
                  </HoverTooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 图片悬停效果 */}
        <Card>
          <CardHeader>
            <CardTitle>图片悬停效果演示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <HoverImage src="https://picsum.photos/seed/demo1/300/200.jpg" alt="示例图片1" className="h-48 rounded-lg" zoom={1.1} />
              
              <HoverImage src="https://picsum.photos/seed/demo2/300/200.jpg" alt="示例图片2" className="h-48 rounded-lg" overlay overlayContent={<div className="text-white text-center">
                    <p className="text-lg font-medium">图片标题</p>
                    <p className="text-sm">悬停查看详情</p>
                  </div>} />
              
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Star className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">渐变背景</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default InteractionDemo;