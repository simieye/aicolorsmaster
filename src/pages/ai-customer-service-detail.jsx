// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Users, Clock, TrendingUp, Star, ArrowRight, Check, Zap, Shield, Headphones, BarChart, Bot, User } from 'lucide-react';

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

export default function AICustomerServiceDetail(props) {
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
        pageId: 'ai-chat',
        params: {
          service: 'customer-service'
        }
      });
    }
  };
  const features = [{
    icon: <Bot className="w-6 h-6" />,
    title: '智能对话',
    description: '基于自然语言处理技术，理解用户意图并提供准确回答'
  }, {
    icon: <Users className="w-6 h-6" />,
    title: '多轮对话',
    description: '支持复杂的多轮对话，保持上下文连贯性'
  }, {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7服务',
    description: '全天候在线服务，随时响应用户咨询'
  }, {
    icon: <TrendingUp className="w-6 h-6" />,
    title: '持续学习',
    description: '通过机器学习不断优化服务质量'
  }, {
    icon: <Shield className="w-6 h-6" />,
    title: '数据安全',
    description: '企业级安全保障，保护用户隐私数据'
  }, {
    icon: <BarChart className="w-6 h-6" />,
    title: '数据分析',
    description: '实时分析服务数据，提供业务洞察'
  }];
  const techAdvantages = [{
    title: '深度学习算法',
    description: '采用最新的深度学习技术，提升对话理解准确率'
  }, {
    title: '知识图谱',
    description: '构建完整的知识图谱，支持复杂问题推理'
  }, {
    title: '情感分析',
    description: '识别用户情感状态，提供更贴心的服务体验'
  }, {
    title: '多语言支持',
    description: '支持多种语言，满足全球化业务需求'
  }];
  const stats = [{
    label: '响应时间',
    value: '< 1秒',
    icon: <Zap className="w-5 h-5" />
  }, {
    label: '准确率',
    value: '95%+',
    icon: <Star className="w-5 h-5" />
  }, {
    label: '满意度',
    value: '98%',
    icon: <User className="w-5 h-5" />
  }, {
    label: '并发处理',
    value: '10万+',
    icon: <BarChart className="w-5 h-5" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="AI智能客服" showBack={true} />
        
        <div className="pb-20">
          {/* 头部介绍 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI智能客服系统</h1>
              </div>
              <p className="text-blue-100 mb-6">
                基于人工智能技术的智能客服解决方案，提供24/7全天候服务，
                提升客户满意度，降低运营成本。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleTryNow} className="bg-white text-blue-600 hover:bg-blue-50">
                  立即体验
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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

            {/* 技术优势 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>技术优势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {techAdvantages.map((tech, index) => <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500" />
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
                        <Headphones className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">在线咨询</h3>
                        <p className="text-sm text-muted-foreground">网站、APP在线客服</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">社交媒体</h3>
                        <p className="text-sm text-muted-foreground">微信、微博等平台客服</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">企业内部</h3>
                        <p className="text-sm text-muted-foreground">HR、IT支持服务</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">智能助手</h3>
                        <p className="text-sm text-muted-foreground">个人智能助理服务</p>
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