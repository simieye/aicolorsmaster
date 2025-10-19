// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Palette, Flask, Eye, CodeBranch, Cloud, Users, Star, ShoppingCart, PlayCircle, Phone, MessageCircle, MapPin, Download, Brain, Check, Store, Building, Industry, Package, Zap, Award, GitBranch, Calendar } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
export default function AIColorMasterPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);

  // 产品数据
  const productData = {
    id: 'ai-color-master-2024',
    name: 'AI染发色彩大师AI原生开源SaaS系统',
    model: 'AI-CM-2024',
    price: 8800,
    originalPrice: 12800,
    discount: 4000,
    rating: 4.9,
    reviews: 156,
    monthlySales: 200,
    image: 'https://images.unsplash.com/photo-1621609764065-f13d0d47bcae?w=600&h=600&fit=crop',
    description: '业界领先的AI原生开源染发色彩管理系统，支持深度定制、社区共建，为美发行业提供完整的数字化色彩解决方案',
    features: ['智能色彩管理', '配方智能生成', 'AR效果预览', '开源架构', '云原生部署', '社区生态'],
    techStack: {
      frontend: 'React + TypeScript',
      backend: 'Node.js + Express',
      database: 'PostgreSQL + Redis',
      ai: 'TensorFlow + PyTorch',
      container: 'Docker + Kubernetes'
    },
    performance: {
      response: '<0.2秒',
      accuracy: '99.99%',
      concurrency: '2000+',
      availability: '99.99%'
    },
    support: {
      deployment: '灵活部署',
      support: '7×24小时',
      updates: '持续更新',
      community: '活跃社区'
    }
  };

  // 核心功能数据
  const coreFeatures = [{
    id: 1,
    icon: Palette,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500',
    title: '智能色彩管理',
    description: 'AI驱动的色彩库管理，支持自定义色彩体系和品牌色彩标准'
  }, {
    id: 2,
    icon: Flask,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    title: '配方智能生成',
    description: '基于AI算法的配方生成，确保色彩一致性和效果可预测'
  }, {
    id: 3,
    icon: Eye,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    title: 'AR效果预览',
    description: '增强现实技术，实时预览染发效果，提升客户体验'
  }, {
    id: 4,
    icon: CodeBranch,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    title: '开源架构',
    description: '完全开源，支持二次开发和深度定制，满足个性化需求'
  }, {
    id: 5,
    icon: Cloud,
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    title: '云原生部署',
    description: '支持公有云、私有云、混合云部署，灵活适应不同需求'
  }, {
    id: 6,
    icon: Users,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    title: '社区生态',
    description: '活跃的开发者社区，持续更新迭代，共享最佳实践'
  }];

  // 使用场景数据
  const useScenarios = [{
    id: 1,
    icon: Store,
    color: 'from-amber-500 to-orange-600',
    title: '高端美发沙龙',
    description: '为高端沙龙提供定制化色彩管理解决方案',
    benefits: ['品牌色彩定制', 'VIP客户管理', '效果精准预览']
  }, {
    id: 2,
    icon: Building,
    color: 'from-blue-500 to-purple-600',
    title: '连锁美发集团',
    description: '为大型连锁提供统一色彩标准和定制开发',
    benefits: ['统一色彩体系', '深度定制开发', '私有化部署']
  }, {
    id: 3,
    icon: Industry,
    color: 'from-green-500 to-teal-600',
    title: '染发产品厂商',
    description: '为厂商提供产品色彩管理和配方开发平台',
    benefits: ['产品色彩库', '配方研发工具', 'API接口服务']
  }];

  // AI核心能力特点
  const aiFeatures = [{
    title: '色彩识别算法',
    description: '高精度色彩识别，支持多种色彩空间转换'
  }, {
    title: '配方优化引擎',
    description: '智能优化配方比例，确保最佳染色效果'
  }, {
    title: '效果预测��型',
    description: '基于深度学习的染发效果预测'
  }, {
    title: '个性化推荐',
    description: '根据客户特征推荐最适合的色彩方案'
  }];

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }
  };

  // 处理立即购买
  const handleBuyNow = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          productId: 6
        }
      });
    } else {
      toast({
        title: "立即购买",
        description: "正在跳转到购买页面..."
      });
    }
  };

  // 处理观看演示
  const handleWatchDemo = () => {
    setIsPlaying(true);
    toast({
      title: "产品演示",
      description: "正在加载产品演示视频..."
    });
  };

  // 处理开源体验
  const handleOpenSource = () => {
    toast({
      title: "开源体验",
      description: "正在跳转到GitHub仓库..."
    });
  };

  // 处理下载源码
  const handleDownloadSource = () => {
    toast({
      title: "下载源码",
      description: "源码下载中..."
    });
  };

  // 处理联系客服
  const handleContactSupport = () => {
    toast({
      title: "联系客服",
      description: "客服热线：400-888-8888"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="ai-color-master" />

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 产品头部展示 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                开源旗舰 · 月销{productData.monthlySales}+
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                AI染发色彩大师<br />AI原生开源SaaS系统
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {productData.description}
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg">
                    <span className="text-3xl font-bold">¥{productData.price.toLocaleString()}</span>
                  </div>
                  <span className="text-white/60 line-through text-lg">¥{productData.originalPrice.toLocaleString()}</span>
                </div>
                <div className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full">
                  <Package className="w-4 h-4 mr-2 inline" />
                  限时优惠 ¥{productData.discount.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleBuyNow} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  立即购买
                </Button>
                <Button onClick={handleWatchDemo} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  观看演示
                </Button>
                <Button onClick={handleOpenSource} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <GitBranch className="w-4 h-4 mr-2" />
                  开源体验
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                <img src={productData.image} alt={productData.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-4 rounded-xl">
                <CodeBranch className="w-8 h-8 mb-2" />
                <p className="font-semibold">开源定制</p>
                <p className="text-sm">100%可定制</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">核心功能</h2>
            <p className="text-xl text-white/80">六大核心功能，打造专业色彩管理</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map(feature => {
            const Icon = feature.icon;
            return <Card key={feature.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:translateY-[-5px]">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 tech-icon`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </CardContent>
              </Card>;
          })}
          </div>
        </section>

        {/* 技术特点 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">技术特点</h2>
            <p className="text-xl text-white/80">先进技术架构，引领行业创新</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CodeBranch className="w-6 h-6 text-amber-400 mr-3" />
                  开源技术栈
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(productData.techStack).map(([key, value]) => <div key={key} className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/80 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-6 h-6 text-blue-400 mr-3" />
                  AI核心能力
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiFeatures.map((feature, index) => <div key={index} className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 使用场景 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">使用场景</h2>
            <p className="text-xl text-white/80">适用于各种规模的美发企业</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useScenarios.map(scenario => {
            const Icon = scenario.icon;
            return <Card key={scenario.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className={`h-48 bg-gradient-to-br ${scenario.color} flex items-center justify-center`}>
                  <Icon className="text-white text-4xl" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{scenario.title}</h3>
                  <p className="text-white/70 mb-4">{scenario.description}</p>
                  <ul className="text-white/60 text-sm space-y-2">
                    {scenario.benefits.map((benefit, index) => <li key={index} className="flex items-center">
                        <Check className="w-3 h-3 text-green-400 mr-2" />
                        {benefit}
                      </li>)}
                  </ul>
                </CardContent>
              </Card>;
          })}
          </div>
        </section>

        {/* 产品规格 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">产品规格</h2>
            <p className="text-xl text-white/80">详细技术参数，了解产品能力</p>
          </div>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">基本功能</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">色彩管理</span>
                      <span className="text-white">专业版</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">配方生成</span>
                      <span className="text-white">AI驱动</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">效果预览</span>
                      <span className="text-white">AR技术</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">开源定制</span>
                      <span className="text-white">100%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">技术指标</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">响应时间</span>
                      <span className="text-white">{productData.performance.response}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">色彩精度</span>
                      <span className="text-white">{productData.performance.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">并发用户</span>
                      <span className="text-white">{productData.performance.concurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">可用性</span>
                      <span className="text-white">{productData.performance.availability}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">服务支持</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">部署方式</span>
                      <span className="text-white">{productData.support.deployment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">技术支持</span>
                      <span className="text-white">{productData.support.support}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">更新频率</span>
                      <span className="text-white">{productData.support.updates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">社区支持</span>
                      <span className="text-white">{productData.support.community}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 购买咨询 */}
        <section className="mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">立即开启开源色彩管理新时代</h2>
              <p className="text-xl text-white/80 mb-8">专业团队为您提供全方位技术支持</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">电话咨询</h3>
                  <p className="text-white/70">400-888-8888</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">在线客服</h3>
                  <p className="text-white/70">7×24小时服务</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">开源社区</h3>
                  <p className="text-white/70">GitHub社区支持</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={handleBuyNow} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  立即购买 ¥{productData.price.toLocaleString()}
                </Button>
                <Button onClick={handleDownloadSource} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Download className="w-4 h-4 mr-2" />
                  下载源码
                </Button>
                <Button onClick={handleWatchDemo} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  预约演示
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-color-master" />
    </div>;
}