// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { ShoppingBag, Store, Box, ShoppingCart, Bullhorn, UserPlus, TrendingUp, Building, Zap, Shield, Smartphone, BarChart3, Globe, CreditCard, Phone, Calendar, Download, Play, Check, CheckCircle, Star, ArrowRight } from 'lucide-react';

// @ts-ignore;
import { StoreFeatureCard } from '@/components/StoreFeatureCard';
// @ts-ignore;
import { StoreProcessStep } from '@/components/StoreProcessStep';
// @ts-ignore;
import { StoreScenarioCard } from '@/components/StoreScenarioCard';
// @ts-ignore;
import { StoreTechItem } from '@/components/StoreTechItem';
export default function AIMicroStoreDetailPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('features');

  // 系统核心功能数据
  const coreFeatures = [{
    icon: Store,
    title: '店铺设置',
    description: '完整的店铺创建和装修系统，支持个性化定制，专业模板选择',
    features: ['店铺装修', '支付配置', '域名绑定', '品牌定制'],
    color: 'orange'
  }, {
    icon: Box,
    title: '商品管理',
    description: '强大的商品管理系统，支持批量上传，库存管理，规格设置',
    features: ['商品上架', '库存管理', '规格设置', '批量操作'],
    color: 'blue'
  }, {
    icon: ShoppingCart,
    title: '订单处理',
    description: '智能订单管理系统，自动处理，物流跟踪，售后服务',
    features: ['订单管理', '发货跟踪', '退换货处理', '客户服务'],
    color: 'green'
  }, {
    icon: Bullhorn,
    title: '营销活动',
    description: '丰富的营销工具，优惠券，促销活动，会员管理，提升销量',
    features: ['优惠券', '促销活动', '会员管理', '营销分析'],
    color: 'yellow'
  }];

  // 开店流程数据
  const storeProcess = [{
    icon: UserPlus,
    title: '注册账号',
    description: '简单注册，快速开店',
    color: 'orange',
    items: ['手机号注册', '邮箱验证', '身份认证', '协议签署']
  }, {
    icon: Store,
    title: '店铺设置',
    description: '个性化店铺装修，品牌展示',
    color: 'blue',
    items: ['选择模板', '上传Logo', '店铺信息', '支付设置']
  }, {
    icon: Box,
    title: '商品上架',
    description: '批量上传商品，快速开店',
    color: 'green',
    items: ['商品分类', '价格设置', '库存管理', '商品描述']
  }, {
    icon: Zap,
    title: '正式运营',
    description: '营销推广，订单管理',
    color: 'yellow',
    items: ['营销活动', '订单处理', '客户服务', '数据分析']
  }];

  // 使用场景数据
  const useScenarios = [{
    icon: UserPlus,
    title: '个人创业者',
    description: '为个人创业者提供零门槛开店方案，快速实现电商梦想',
    features: ['零成本开店', '简单操作', '快速上手', '专业指导'],
    color: 'orange'
  }, {
    icon: Building,
    title: '美发店转型',
    description: '帮助传统美发店数字化转型，拓展线上销售渠道',
    features: ['线上线下融合', '产品销售', '服务预约', '会员管理'],
    color: 'blue'
  }, {
    icon: TrendingUp,
    title: '品牌扩展',
    description: '为成熟品牌提供多渠道销售，扩大市场影响力',
    features: ['多店铺管理', '品牌统一', '数据分析', '营销推广'],
    color: 'green'
  }];

  // 技术优势数据
  const techAdvantages = [{
    icon: Zap,
    title: '零门槛开店',
    description: '无需技术背景，拖拽式操作，3分钟快速开店',
    color: 'orange'
  }, {
    icon: Smartphone,
    title: '移动端适配',
    description: '完美适配手机端，随时随地管理店铺',
    color: 'blue'
  }, {
    icon: Shield,
    title: '安全可靠',
    description: '企业级安全保障，数据加密，支付安全',
    color: 'green'
  }, {
    icon: Globe,
    title: '全球部署',
    description: 'CDN加速，全球访问，稳定可靠',
    color: 'yellow'
  }];

  // 客户案例数据
  const customerCases = [{
    name: '美妆达人小铺',
    rating: 5.0,
    comment: 'AI微店系统让我轻松开店，月收入达到8,500元，操作简单，功能强大！',
    author: '李小姐',
    duration: '使用6个月',
    avatar: 'store1'
  }, {
    name: '时尚造型工作室',
    rating: 5.0,
    comment: '从线下转型到线上，系统帮助我们快速建立电商渠道，销售额增长300%！',
    author: '王经理',
    duration: '使用1年',
    avatar: 'store2'
  }, {
    name: '美发用品批发',
    rating: 4.9,
    comment: '多店铺管理功能很实用，营销工具丰富，客户服务响应及时，推荐！',
    author: '张总',
    duration: '使用8个月',
    avatar: 'store3'
  }];

  // 处理购买
  const handlePurchase = () => {
    console.log('购买AI微店开店通商城系统');
    // 这里可以跳转到购买页面或打开购买对话框
  };

  // 处理演示
  const handleDemo = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          system: 'ai-micro-store'
        }
      });
    }
  };

  // 处理下载
  const handleDownload = () => {
    console.log('下载AI微店开店通商城系统资料');
    // 这里可以下载产品资料
  };

  // 处理咨询
  const handleConsultation = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'online-consultation'
      });
    }
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 系统概览 */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">一站式电商解决方案</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">AI微店开店通商城系统</h1>
              <p className="text-xl text-white/90 mb-8">
                专为创业者打造的智能电商平台，零门槛开店，智能营销，助力电商成功
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div>
                  <div className="text-4xl font-bold">¥4,980</div>
                  <div className="text-white/80">一次性购买</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">95%</div>
                  <div className="text-white/80">开店成功率</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">¥8,500</div>
                  <div className="text-white/80">平均月收入</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                  立即购买
                </Button>
                <Button onClick={handleDemo} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                  <Play className="w-4 h-4 mr-2" />
                  在线演示
                </Button>
                <Button onClick={handleDownload} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                  <Download className="w-4 h-4 mr-2" />
                  下载资料
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="animate-pulse">
                <div className="w-96 h-96 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <ShoppingBag className="w-32 h-32 text-white/80" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              全方位的电商功能，满足各种开店需求，让经营更简单
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => <StoreFeatureCard key={index} feature={feature} />)}
          </div>
        </div>
      </section>

      {/* 开店流程 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">简单四步，轻松开店</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              零门槛开店，3分钟快速上线，无需技术背景
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {storeProcess.map((step, index) => <StoreProcessStep key={index} step={step} index={index} />)}
          </div>
          
          <div className="mt-12 text-center">
            <Button onClick={handleDemo} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
              <ArrowRight className="w-4 h-4 mr-2" />
              立即体验开店流程
            </Button>
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">适用场景</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              适合不同类型的创业者，提供定制化的电商解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useScenarios.map((scenario, index) => <StoreScenarioCard key={index} scenario={scenario} />)}
          </div>
        </div>
      </section>

      {/* 技术优势 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">技术优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于先进的电商技术，提供稳定可靠的商城服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">核心技术</h3>
              <div className="space-y-4">
                {techAdvantages.map((tech, index) => <StoreTechItem key={index} tech={tech} />)}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">性能指标</h3>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
                    <div className="text-gray-600">系统稳定性</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">&lt;2s</div>
                    <div className="text-gray-600">页面加载</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-gray-600">开店成功率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">50%</div>
                    <div className="text-gray-600">运营成本降低</div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">系统架构</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">前端框架</span>
                      <span className="text-gray-900">React + TypeScript</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">后端服务</span>
                      <span className="text-gray-900">Node.js + Express</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">数据库</span>
                      <span className="text-gray-900">MySQL + Redis</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">支付系统</span>
                      <span className="text-gray-900">支付宝 + 微信支付</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 客户案例 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">成功案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              已帮助众多创业者实现电商梦想，获得客户一致好评
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerCases.map((caseItem, index) => <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={`https://picsum.photos/seed/${caseItem.avatar}/60/60.jpg`} alt={caseItem.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{caseItem.name}</h4>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(caseItem.rating) ? 'fill-current' : ''}`} />)}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">{caseItem.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">"{caseItem.comment}"</p>
                  <div className="text-sm text-gray-500">
                    <span>{caseItem.author}</span> • <span>{caseItem.duration}</span>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* 价格方案 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">价格方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              透明合理的价格，一次性购买，终身使用
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">AI微店开店通商城系统</h3>
                <p className="text-white/80">完整功能版本，无隐藏费用</p>
              </div>
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">¥4,980</div>
                <div className="text-white/80 text-lg">一次性购买 • 终身使用</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-semibold mb-3">包含功能</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      店铺信息设置
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      商品管理系统
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      订单处理系统
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      营销活动管理
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">服务支持</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      免费安装部署
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      1年技术支持
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      开店指导培训
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      免费系统升级
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                  立即购买
                </Button>
                <Button onClick={handleConsultation} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                  联系销售
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 购买咨询 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">准备开始您的电商之旅？</h2>
            <p className="text-xl mb-8 text-white/80">
              专业团队为您提供一对一开店指导，助您成功创业
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={handleConsultation} className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                <Phone className="w-4 h-4 mr-2" />
                免费咨询
              </Button>
              <Button onClick={handleDemo} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                预约演示
              </Button>
              <Button onClick={handleDownload} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                <Download className="w-4 h-4 mr-2" />
                下载资料
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
}