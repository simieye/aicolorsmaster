// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Store, CalendarCheck, UsersCog, TrendingUp, Star, ShoppingCart, PlayCircle, Calendar, Phone, MessageCircle, MapPin, Download, Cloud, Brain, Check, Building, City, Package, Zap, Award } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
export default function AIChainStorePage(props) {
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
    id: 'ai-chain-store-2024',
    name: 'AI美发连锁门店管理系统',
    model: 'AI-CS-2024',
    price: 3680,
    originalPrice: 4680,
    discount: 1000,
    rating: 4.6,
    reviews: 167,
    monthlySales: 400,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
    description: '专为美发连锁店设计的一体化管理解决方案，涵盖预约、员工、财务、营销等全方位管理，提升运营效率',
    features: ['多店统一管理', '智能预约系统', '员工绩效管理', '财务报表分析'],
    cloudArchitecture: {
      deployment: '云端SaaS',
      sync: '实时同步',
      backup: '多重备份',
      security: '企业级加密',
      scalability: '弹性扩展'
    },
    performance: {
      response: '<0.5秒',
      accuracy: '99.95%',
      concurrency: '500+',
      availability: '99.9%'
    },
    support: {
      deployment: 'SaaS',
      support: '7×24小时',
      updates: '双周',
      training: '包含'
    }
  };

  // 核心功能数据
  const coreFeatures = [{
    id: 1,
    icon: Store,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    title: '多店统一管理',
    description: '实时监控各分店运营状况，统一管理标准，确保服务质量一致'
  }, {
    id: 2,
    icon: CalendarCheck,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    title: '智能预约系统',
    description: '在线预约、智能排班、客户提醒，提升预约转化率'
  }, {
    id: 3,
    icon: UsersCog,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    title: '员工绩效管理',
    description: '智能考核系统、绩效分析、激励机制，提升员工积极性'
  }, {
    id: 4,
    icon: TrendingUp,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    title: '财务报表分析',
    description: '实时财务数据、多维度分析、智能预警，辅助经营决策'
  }];

  // 使用场景数据
  const useScenarios = [{
    id: 1,
    icon: Store,
    color: 'from-orange-500 to-red-600',
    title: '小型连锁店',
    description: '3-10家分店的小型连锁，实现标准化管理',
    benefits: ['统一预约管理', '员工排班优化', '财务集中管理']
  }, {
    id: 2,
    icon: Building,
    color: 'from-blue-500 to-purple-600',
    title: '中型连锁店',
    description: '10-50家分店的中型连锁，提升运营效率',
    benefits: ['多维度数据分析', '区域化管理', '供应链优化']
  }, {
    id: 3,
    icon: City,
    color: 'from-green-500 to-teal-600',
    title: '大型连锁集团',
    description: '50+分店的大型集团，全面数字化管理',
    benefits: ['集团级管控', '智能决策支持', '品牌统一管理']
  }];

  // 智能分析特点
  const analysisFeatures = [{
    title: '销售预测算法',
    description: '基于历史数据预测未来销售趋势'
  }, {
    title: '客户行为分析',
    description: '深度分析客户消费习惯和偏好'
  }, {
    title: '运营优化建议',
    description: 'AI驱动的运营优化方案推荐'
  }, {
    title: '风险预警系统',
    description: '提前识别经营风险，及时预警'
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
          productId: 4
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
      <TopNavigation currentPage="ai-chain-store" />

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 产品头部展示 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                热销软件 · 月销{productData.monthlySales}+
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                AI美发连锁门店<br />管理系统
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {productData.description}
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg">
                    <span className="text-3xl font-bold">¥{productData.price.toLocaleString()}</span>
                  </div>
                  <span className="text-white/60 line-through text-lg">¥{productData.originalPrice.toLocaleString()}</span>
                </div>
                <div className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full">
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
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-xl">
                <Store className="w-8 h-8 mb-2" />
                <p className="font-semibold">多店统一管理</p>
                <p className="text-sm">效率提升50%</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">核心功能</h2>
            <p className="text-xl text-white/80">四大核心功能，优化连锁运营</p>
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
                  <Cloud className="w-6 h-6 text-orange-400 mr-3" />
                  云端架构
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(productData.cloudArchitecture).map(([key, value]) => <div key={key} className="flex justify-between items-center py-3 border-b border-white/20">
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
                  智能分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisFeatures.map((feature, index) => <div key={index} className="bg-white/5 rounded-lg p-4">
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
            <p className="text-xl text-white/80">适用于各种规模的连锁美发店</p>
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
                      <span className="text-white/70">门店管理</span>
                      <span className="text-white">无限</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">员工管理</span>
                      <span className="text-white">1000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">客户管理</span>
                      <span className="text-white">10万+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">预约系统</span>
                      <span className="text-white">智能</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">立即升级您的连锁管理</h2>
              <p className="text-xl text-white/80 mb-8">专业团队为您提供全方位服务支持</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <TabBar currentPage="ai-chain-store" />
    </div>;
}