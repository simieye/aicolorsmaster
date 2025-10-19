// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Brain, Palette, HandPointer, ThermometerHalf, Star, ShoppingCart, PlayCircle, Calendar, Phone, MessageCircle, MapPin, Download, Microchip, Code, Check, Store, Building, GraduationCap, Package, Zap, Shield, Award } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
export default function AIColorDevicePage(props) {
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
    id: 'ai-color-device-2024',
    name: 'AI智能染发自动调色宝机',
    model: 'AI-HC-2024',
    price: 4980,
    originalPrice: 5980,
    discount: 1000,
    rating: 4.9,
    reviews: 256,
    monthlySales: 500,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop',
    description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程，大幅提升门店效率',
    features: ['AI发质识别', '精准自动调色', '一键操作', '智能温控'],
    hardware: {
      processor: 'AI专用芯片 A15',
      sensor: '多光谱发质传感器',
      display: '10.1英寸高清触控屏',
      storage: '256GB SSD',
      network: 'WiFi 6 + 蓝牙5.0',
      dimensions: '350×280×450mm',
      weight: '8.5kg',
      power: '150W'
    },
    performance: {
      accuracy: '99.5%',
      precision: '±0.1%',
      speed: '3秒/次',
      formulas: '10,000+'
    },
    support: {
      warranty: '1年',
      support: '7×24小时',
      updates: '免费',
      training: '包含'
    }
  };

  // 核心功能数据
  const coreFeatures = [{
    id: 1,
    icon: Brain,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    title: 'AI发质识别',
    description: '智能分析发质类型、受损程度、色素沉淀，为每位顾客提供个性化染发方案'
  }, {
    id: 2,
    icon: Palette,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    title: '精准自动调色',
    description: '基于AI算法的精准调色系统，确保每次调色的一致性和准确性'
  }, {
    id: 3,
    icon: HandPointer,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    title: '一键操作',
    description: '简化操作流程，一键完成从发质检测到染料配制的全过程'
  }, {
    id: 4,
    icon: ThermometerHalf,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    title: '智能温控',
    description: '精确控制染发温度，保护发质的同时确保最佳染色效果'
  }];

  // 使用场景数据
  const useScenarios = [{
    id: 1,
    icon: Store,
    color: 'from-blue-500 to-purple-600',
    title: '专业美发店',
    description: '提升染发效率，减少人工误差，提高客户满意度',
    benefits: ['标准化染发流程', '降低培训成本', '提高翻台率']
  }, {
    id: 2,
    icon: Building,
    color: 'from-green-500 to-teal-600',
    title: '连锁美发店',
    description: '统一染发标准，确保各分店服务质量一致',
    benefits: ['统一配方管理', '质量监控', '数据分析']
  }, {
    id: 3,
    icon: GraduationCap,
    color: 'from-orange-500 to-red-600',
    title: '美发培训学校',
    description: '辅助教学，提高学员染发技能掌握速度',
    benefits: ['理论实践结合', '错误纠正', '技能评估']
  }];

  // 软件算法特点
  const softwareFeatures = [{
    title: '深度学习算法',
    description: '基于百万级发质数据训练的深度学习模型'
  }, {
    title: '色彩匹配引擎',
    description: '精准匹配目标色彩，误差率低于0.1%'
  }, {
    title: '实时优化系统',
    description: '根据环境变化实时调整染发参数'
  }, {
    title: '云端同步',
    description: '配方数据云端同步，多店共享'
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
          productId: 1
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

  // 处理预约试用
  const handleBookTrial = () => {
    toast({
      title: "预约试用",
      description: "正在为您安排产品试用..."
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
      <TopNavigation currentPage="ai-color-device" />

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 产品头部展示 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                热销产品 · 月销{productData.monthlySales}+
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                AI智能染发<br />自动调色宝机
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
                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full">
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
                <Button onClick={handleBookTrial} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  预约试用
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                <img src={productData.image} alt={productData.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white p-4 rounded-xl">
                <Brain className="w-8 h-8 mb-2" />
                <p className="font-semibold">AI智能识别</p>
                <p className="text-sm">准确率{productData.performance.accuracy}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">核心功能</h2>
            <p className="text-xl text-white/80">四大核心功能，打造专业染发体验</p>
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
            <p className="text-xl text-white/80">先进技术支撑，引领行业创新</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Microchip className="w-6 h-6 text-blue-400 mr-3" />
                  硬件配置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(productData.hardware).map(([key, value]) => <div key={key} className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/80 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-6 h-6 text-green-400 mr-3" />
                  软件算法
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {softwareFeatures.map((feature, index) => <div key={index} className="bg-white/5 rounded-lg p-4">
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
            <p className="text-xl text-white/80">适用于各种美发场景，满足不同需求</p>
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
            <p className="text-xl text-white/80">详细技术参数，了解产品性能</p>
          </div>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">基本参数</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">产品型号</span>
                      <span className="text-white">{productData.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">尺寸</span>
                      <span className="text-white">{productData.hardware.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">重量</span>
                      <span className="text-white">{productData.hardware.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">功率</span>
                      <span className="text-white">{productData.hardware.power}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">性能指标</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">识别准确率</span>
                      <span className="text-white">{productData.performance.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">调色精度</span>
                      <span className="text-white">{productData.performance.precision}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">处理速度</span>
                      <span className="text-white">{productData.performance.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">存储配方</span>
                      <span className="text-white">{productData.performance.formulas}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">服务支持</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">质保期</span>
                      <span className="text-white">{productData.support.warranty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">技术支持</span>
                      <span className="text-white">{productData.support.support}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">软件更新</span>
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
              <h2 className="text-3xl font-bold text-white mb-4">立即升级您的美发店</h2>
              <p className="text-xl text-white/80 mb-8">专业团队为您提供全方位服务支持</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">电话咨询</h3>
                  <p className="text-white/70">400-888-8888</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">在线客服</h3>
                  <p className="text-white/70">7×24小时服务</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">门店体验</h3>
                  <p className="text-white/70">全国200+体验店</p>
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
                <Button onClick={handleBookTrial} variant="outline" className="border-white/30 text-white hover:bg-white/20 px-8">
                  <Calendar className="w-4 h-4 mr-2" />
                  预约演示
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-color-device" />
    </div>;
}