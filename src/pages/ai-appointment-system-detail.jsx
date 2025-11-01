// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Star, ArrowRight, Zap, Shield, Smartphone, BarChart, Bell, User, MapPin } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner } from '@/components/LoadingSpinner';
// @ts-ignore;
import { HoverCard } from '@/components/HoverEffects';
// @ts-ignore;

export default function AIAppointmentSystemDetail(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const handleTabChange = tab => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };
  const handleTryNow = () => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'ai-appointment',
        params: {
          service: 'appointment-system'
        }
      });
    }
  };
  const features = [{
    icon: <Calendar className="w-6 h-6" />,
    title: '智能排班',
    description: '基于AI算法的智能排班系统，自动优化时间安排'
  }, {
    icon: <Clock className="w-6 h-6" />,
    title: '实时提醒',
    description: '多渠道提醒机制，确保预约不遗漏'
  }, {
    icon: <Users className="w-6 h-6" />,
    title: '客户管理',
    description: '完整的客户信息管理，提供个性化服务'
  }, {
    icon: <Smartphone className="w-6 h-6" />,
    title: '移动端支持',
    description: '支持手机端预约和管理，随时随地处理业务'
  }, {
    icon: <Shield className="w-6 h-6" />,
    title: '数据安全',
    description: '企业级安全保障，保护客户隐私数据'
  }, {
    icon: <BarChart className="w-6 h-6" />,
    title: '数据分析',
    description: '实时分析预约数据，提供业务洞察'
  }];
  const techAdvantages = [{
    title: '智能调度算法',
    description: '采用先进的调度算法，最大化资源利用率'
  }, {
    title: '冲突检测',
    description: '自动检测时间冲突，避免重复预约'
  }, {
    title: '预测分析',
    description: '基于历史数据预测预约趋势，优化资源配置'
  }, {
    title: '多平台同步',
    description: '支持多平台数据同步，确保信息一致性'
  }];
  const stats = [{
    label: '预约效率',
    value: '提升80%',
    icon: <Zap className="w-5 h-5" />
  }, {
    label: '客户满意度',
    value: '96%',
    icon: <Star className="w-5 h-5" />
  }, {
    label: '准时率',
    value: '99%',
    icon: <CheckCircle className="w-5 h-5" />
  }, {
    label: '日处理量',
    value: '1000+',
    icon: <BarChart className="w-5 h-5" />
  }];
  const processSteps = [{
    title: '在线预约',
    description: '客户通过多渠道进行预约',
    icon: <Smartphone className="w-6 h-6" />
  }, {
    title: '智能审核',
    description: '系统自动审核预约信息',
    icon: <CheckCircle className="w-6 h-6" />
  }, {
    title: '自动排班',
    description: 'AI算法优化时间安排',
    icon: <Calendar className="w-6 h-6" />
  }, {
    title: '提醒通知',
    description: '多渠道发送提醒通知',
    icon: <Bell className="w-6 h-6" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="AI智能预约系统" showBack={true} />
        
        <div className="pb-20">
          {/* 头部介绍 */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI智能预约系统</h1>
              </div>
              <p className="text-green-100 mb-6">
                基于人工智能的智能预约管理解决方案，提供自动化排班、
                实时提醒、数据分析等功能，提升预约效率，改善客户体验。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleTryNow} className="bg-white text-green-600 hover:bg-green-50">
                  立即体验
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  了解更多
                </Button>
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => <HoverCard key={index} className="bg-card border rounded-lg p-4 text-center hover:shadow-lg">
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </HoverCard>)}
            </div>

            {/* 功能特点 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>核心功能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 流程展示 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>预约流程</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  {processSteps.map((step, index) => <div key={index} className="text-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-3">
                          {step.icon}
                        </div>
                        {index < processSteps.length - 1 && <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-y-1/2"></div>}
                      </div>
                      <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 技术优势 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>技术优势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {techAdvantages.map((tech, index) => <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h3 className="font-semibold text-foreground">{tech.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{tech.description}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 应用场景 */}
            <Card>
              <CardHeader>
                <CardTitle>应用场景</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">医疗预约</h3>
                        <p className="text-sm text-muted-foreground">医院、诊所挂号预约</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">美容美发</h3>
                        <p className="text-sm text-muted-foreground">美容院、理发店预约</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">教育培训</h3>
                        <p className="text-sm text-muted-foreground">课程、培训预约管理</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">场地预订</h3>
                        <p className="text-sm text-muted-foreground">会议室、运动场地预订</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}