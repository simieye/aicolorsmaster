// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, UserCircle, Bullhorn, TrendingUp, MessageSquare, Star, ShoppingCart, PlayCircle, Calendar, Phone, MessageCircle, MapPin, Download, Database, Brain, Check, Store, Building, GraduationCap, Package, Zap, Award } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
export default function AICrmPage(props) {
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
    id: 'ai-crm-2024',
    name: 'AI美发客户管理系统CRM',
    model: 'AI-CRM-2024',
    price: 6800,
    originalPrice: 8800,
    discount: 2000,
    rating: 4.9,
    reviews: 245,
    monthlySales: 300,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
    description: '专业客户关系管理系统，智能客户画像、营销自动化、客户生命周期管理，全面提升客户满意度和忠诚度',
    features: ['智能客户画像', '营销自动化', '客户生命周期', '客户服务管理'],
    dataManagement: {
      database: '云端数据库',
      sync: '实时同步',
      backup: '多重备份',
      security: '企业级加密',
      api: 'RESTful API'
    },
    performance: {
      response: '<0.3秒',
      accuracy: '99.95%',
      concurrency: '1000+',
      availability: '99.95%'
    },
    support: {
      deployment: 'SaaS',
      support: '7×24小时',
      updates: '周度',
      training: '包含'
    }
  };

  // 核心功能数据
  const coreFeatures = [{
    id: 1,
    icon: UserCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    title: '智能客户画像',
    description: '基于AI算法构建精准客户画像，深度分析客户行为和偏好'
  }, {
    id: 2,
    icon: Bullhorn,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    title: '营销自���化',
    description: '智能营销推送、个性化推荐、精准营销活动管理'
  }, {
    id: 3,
    icon: TrendingUp,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    title: '客户生命周期',
    description: '全生命周期管理，从获客到留存，提升客户价值'
  }, {
    id: 4,
    icon: MessageSquare,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    title: '客户服务管理',
    description: '智能客服、投诉处理、满意度调查，提升服务质量'
  }];

  // 使用场景数据
  const useScenarios = [{
    id: 1,
    icon: Store,
    color: 'from-red-500 to-pink-600',
    title: '高端美发沙龙',
    description: '为高端客户提供个性化服务体验',
    benefits: ['VIP客户管理', '个性化营销', '客户忠诚度计划']
  }, {
    id: 2,
    icon: Building,
    color: 'from-blue-500 to-purple-600',
    title: '连锁美发店',
    description: '统一客户管理，跨店服务体验',
    benefits: ['跨店数据共享', '统一营销策略', '客户行为分析']
  }, {
    id: 3,
    icon: GraduationCap,
    color: 'from-green-500 to-teal-600',
    title: '美发培训机构',
    description: '学员客户管理，就业推荐服务',
    benefits: ['学员档案管理', '就业跟踪服务', '校友网络管理']
  }];

  // 智能算法特点
  const algorithmFeatures = [{
    title: '客户分群算法',
    description: '基于行为数据智能分群，精准定位目标客户'
  }, {
    title: '流失预测算法',
    description: '提前预测客户流失风险，及时挽留'
  }, {
    title: '价值评估算法',
    description: '智能评估客户终身价值，优化资源配置'
  }, {
    title: '推荐算法',
    description: '个性化推荐系统，提升转化率'
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
          productId: 5
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
      <TopNavigation currentPage="ai-crm" />

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 产品头部展示 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                热销软件 · 月销{productData.monthlySales}+
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                AI美发客户<br />管理系统CRM
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {productData.description}
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg">
                    <span className="text-3xl font-bold">¥{productData.price.toLocaleString()}</span>
                  </div>
                  <span className="text-white/60 line-through text-lg">¥{productData.originalPrice.toLocaleString()}</span>
                </div>
                <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full">
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
              <div className="absolute -bottom-6 -right-6 bg-red-500 text-white p-4 rounded-xl">
                <UserCircle className="w-8 h-8 mb-2" />
                <p className="font-semibold">智能客户管理</p>
                <p className="text-sm">满意度提升60%</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">核心功能</h2>
            <p className="text-xl text-white/80">四大核心功能，优化客户关系</p>
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
            <p className="text-xl text-white/80">先进技术支撑，提升管理效率</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Database className="w-6 h-6 text-red-400 mr-3" />
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
                      <span className="text-white">无限</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">营销自动化</span>
                      <span className="text-white">智能</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">数据分析</span>
                      <span className="text-white">实时</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">报表系统</span>
                      <span className="text-white">自定义</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">立即升级您的客户管理</h2>
              <p className="text-xl text-white/80 mb-8">专业团队为您提供全方位服务支持</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <TabBar currentPage="ai-crm" />
    </div>;
}