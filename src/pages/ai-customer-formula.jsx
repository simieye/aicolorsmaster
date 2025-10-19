// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, UserFriends, Flask, ShieldAlt, Magic, Star, ShoppingCart, PlayCircle, Calendar, Phone, MessageCircle, MapPin, Download, Database, Brain, Check, Store, Building, GraduationCap, Package, Zap, Award } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
export default function AICustomerFormulaPage(props) {
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
    id: 'ai-customer-formula-2024',
    name: 'AI客户配方管理系统',
    model: 'AI-CF-2024',
    price: 2680,
    originalPrice: 3280,
    discount: 600,
    rating: 4.8,
    reviews: 189,
    monthlySales: 600,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop',
    description: '智能客户染发配方管理，记录客户偏好、历史配方、过敏信息，提供个性化服务体验，提升客户满意度',
    features: ['客户档案管理', '配方历史记录', '过敏信息提醒', '个性化推荐'],
    dataManagement: {
      database: '云端数据库',
      sync: '实时同步',
      backup: '自动备份',
      security: '银行级加密',
      api: 'RESTful API'
    },
    performance: {
      response: '<1秒',
      accuracy: '99.8%',
      concurrency: '200+',
      storage: '无限'
    },
    support: {
      deployment: 'SaaS',
      support: '7×24小时',
      updates: '月度',
      training: '包含'
    }
  };

  // 核心功能数据
  const coreFeatures = [{
    id: 1,
    icon: UserFriends,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    title: '客户档案管理',
    description: '完整的客户信息管理，包括基本信息、消费记录、偏好设置等'
  }, {
    id: 2,
    icon: Flask,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    title: '配方历史记录',
    description: '详细记录每次染发配方，支持快速复现和效果对比'
  }, {
    id: 3,
    icon: ShieldAlt,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    title: '过敏信息提醒',
    description: '智能识别过敏成分，提前预警，确保客户安全'
  }, {
    id: 4,
    icon: Magic,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    title: '个性化推荐',
    description: '基于历史数据智能推荐最适合的染发方案'
  }];

  // 使用场景数据
  const useScenarios = [{
    id: 1,
    icon: Store,
    color: 'from-purple-500 to-pink-600',
    title: '高端美发沙龙',
    description: '为高端客户提供个性化定制服务',
    benefits: ['VIP客户管理', '个性化服务', '效果追踪']
  }, {
    id: 2,
    icon: Building,
    color: 'from-blue-500 to-purple-600',
    title: '连锁美发店',
    description: '统一客户管理，跨店服务体验',
    benefits: ['跨店数据共享', '统一服务标准', '客户忠诚度管理']
  }, {
    id: 3,
    icon: GraduationCap,
    color: 'from-green-500 to-teal-600',
    title: '美发培训机构',
    description: '学员实践管理，案例教学支持',
    benefits: ['学员案例管理', '教学效果评估', '技能提升追踪']
  }];

  // 智能算法特点
  const algorithmFeatures = [{
    title: '客户画像算法',
    description: '基于多维度数据构建精准客户画像'
  }, {
    title: '配方推荐算法',
    description: '智能推荐最适合的染发配方组合'
  }, {
    title: '满意度预测算法',
    description: '预测客户对新配方的满意度'
  }, {
    title: '过敏检测算法',
    description: '智能识别潜在过敏成分'
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
          productId: 3
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

  // 处理免费试用
  const handleFreeTrial = () => {
    toast({
      title: "免费试用",
      description: "正在为您安排30天免费试用..."
    });
  };

  // 处理下载手册
  const handleDownloadManual = () => {
    toast({
      title: "下载产品手册",
      description: "产品手册下载中..."
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
      <TopNavigation currentPage="ai-customer-formula" />

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 产品头部展示 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                热销软件 · 月销{productData.monthlySales}+
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                AI客户配方<br />管理系统
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {productData.description}
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg">
                    <span className="text-3xl font-bold">¥{productData.price.toLocaleString()}</span>
                  </div>
                  <span className="text-white/60 line-through text-lg">¥{productData.originalPrice.toLocaleString()}</span>
                </div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full">
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
                <Button onClick={handleFreeTrial} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  免费试用
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                <img src={productData.image} alt={productData.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-purple-500 text-white p-4 rounded-xl">
                <UserFriends className="w-8 h-8 mb-2" />
                <p className="font-semibold">智能客户管理</p>
                <p className="text-sm">满意度提升40%</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">核心功能</h2>
            <p className="text-xl text-white/80">四大核心功能，优化客户服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <p className="text-xl text-white/80">先进技术支撑，提升服务质量</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="w-6 h-6 text-purple-400 mr-3" />
                  数据管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(productData.dataManagement).map(([key, value]) => <div key={key} className="flex justify-between items-center py-3 border-b border-white/20">
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
                  智能算法
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {algorithmFeatures.map((feature, index) => <div key={index} className="bg-white/5 rounded-lg p-4">
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
            <p className="text-xl text-white/80">适用于各种规模的美发店</p>
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
            <p className="text-xl text-white/80">详细功能参数，了解产品能力</p>
          </div>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">基本功能</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">客户管理</span>
                      <span className="text-white">完整</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">配方管理</span>
                      <span className="text-white">智能</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">过敏管理</span>
                      <span className="text-white">自动</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">推荐系统</span>
                      <span className="text-white">AI驱动</span>
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
                      <span className="text-white/70">数据准确率</span>
                      <span className="text-white">{productData.performance.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">并发用户</span>
                      <span className="text-white">{productData.performance.concurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">存储容量</span>
                      <span className="text-white">{productData.performance.storage}</span>
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
                      <span className="text-white/70">培训服务</span>
                      <span className="text-white">{productData.support.training}</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">立即提升客户服务质量</h2>
              <p className="text-xl text-white/80 mb-8">专业团队为您提供全方位服务支持</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">免费试用</h3>
                  <p className="text-white/70">30天免费体验</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={handleBuyNow} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  立即购买 ¥{productData.price.toLocaleString()}
                </Button>
                <Button onClick={handleDownloadManual} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Download className="w-4 h-4 mr-2" />
                  下载产品手册
                </Button>
                <Button onClick={handleFreeTrial} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  预约演示
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-customer-formula" />
    </div>;
}