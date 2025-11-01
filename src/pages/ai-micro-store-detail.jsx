// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Store, ShoppingCart, Package, TrendingUp, Star, ArrowRight, CheckCircle, Zap, Shield, Smartphone, BarChart, Users, Clock, MapPin, CreditCard } from 'lucide-react';

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

export default function AIMicroStoreDetail(props) {
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
        pageId: 'ai-store',
        params: {
          service: 'micro-store'
        }
      });
    }
  };
  const features = [{
    icon: <Store className="w-6 h-6" />,
    title: '智能店铺管理',
    description: '基于AI的店铺运营管理，提升经营效率'
  }, {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: '智能推荐',
    description: '个性化商品推荐，提高转化率'
  }, {
    icon: <Package className="w-6 h-6" />,
    title: '库存管理',
    description: '智能库存预测和管理，避免缺货'
  }, {
    icon: <Smartphone className="w-6 h-6" />,
    title: '移动端支持',
    description: '支持手机端管理，随时随地经营'
  }, {
    icon: <Shield className="w-6 h-6" />,
    title: '数据安全',
    description: '企业级安全保障，保护商业数据'
  }, {
    icon: <BarChart className="w-6 h-6" />,
    title: '数据分析',
    description: '实时分析经营数据，提供决策支持'
  }];
  const techAdvantages = [{
    title: 'AI销售预测',
    description: '采用机器学习算法预测销售趋势，优化库存管理'
  }, {
    title: '智能定价',
    description: '基于市场数据和竞争分析，智能调整商品价格'
  }, {
    title: '客户画像',
    description: '构建客户画像，实现精准营销'
  }, {
    title: '多平台同步',
    description: '支持多平台数据同步，统一管理'
  }];
  const stats = [{
    label: '销售增长',
    value: '提升45%',
    icon: <TrendingUp className="w-5 h-5" />
  }, {
    label: '客户满意度',
    value: '94%',
    icon: <Star className="w-5 h-5" />
  }, {
    label: '库存周转',
    value: '提升30%',
    icon: <Package className="w-5 h-5" />
  }, {
    label: '运营效率',
    value: '提升50%',
    icon: <Zap className="w-5 h-5" />
  }];
  const processSteps = [{
    title: '店铺搭建',
    description: '快速搭建个性化店铺',
    icon: <Store className="w-6 h-6" />
  }, {
    title: '商品管理',
    description: '智能商品分类和管理',
    icon: <Package className="w-6 h-6" />
  }, {
    title: '营销推广',
    description: 'AI驱动的营销策略',
    icon: <TrendingUp className="w-6 h-6" />
  }, {
    title: '数据分析',
    description: '实时数据分析和优化',
    icon: <BarChart className="w-6 h-6" />
  }];
  const useScenarios = [{
    title: '电商小店',
    description: '个人或小团队电商经营',
    icon: <ShoppingCart className="w-6 h-6" />
  }, {
    title: '实体店铺',
    description: '线下实体店数字化转型',
    icon: <MapPin className="w-6 h-6" />
  }, {
    title: '社交电商',
    description: '社交媒体平台电商',
    icon: <Users className="w-6 h-6" />
  }, {
    title: '跨境电商',
    description: '国际贸易和跨境电商',
    icon: <CreditCard className="w-6 h-6" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="AI微店系统" showBack={true} />
        
        <div className="pb-20">
          {/* 头部介绍 */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Store className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI微店系统</h1>
              </div>
              <p className="text-orange-100 mb-6">
                基于人工智能的智能微店解决方案，提供店铺管理、智能推荐、
                库存管理、数据分析等功能，助力小微商家数字化转型。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleTryNow} className="bg-white text-orange-600 hover:bg-orange-50">
                  立即体验
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
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
                <CardTitle>开店流程</CardTitle>
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
                  {useScenarios.map((scenario, index) => <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {scenario.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{scenario.title}</h3>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}