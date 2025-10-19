// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { ShoppingBag, Rocket, Magic, TrendingUp, UserPlus, Store, Package, Play, Check, X, ArrowRight, Star, Briefcase, Box, ShoppingCart, Bullhorn, ChartBar, Users, Microchip, ShieldAlt } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AIMicroStoreDetailPage(props) {
  const {
    $w
  } = props;
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState('professional');

  // 商城功能数据
  const mallFeatures = [{
    icon: Store,
    title: '店铺管理',
    description: '完整的店铺管理功能，支持店铺信息设置、装修模板、支付配置',
    color: 'bg-orange-500',
    features: ['店铺信息设置', '装修模板选择', '支付方式配置']
  }, {
    icon: Box,
    title: '商品管理',
    description: '便捷的商品管理，支持批量上传、库存管理、价格设置',
    color: 'bg-blue-500',
    features: ['批量商品上传', '库存实时管理', '价格策略设置']
  }, {
    icon: ShoppingCart,
    title: '订单处理',
    description: '高效的订单管理系统，支持订单查看、发货处理、物流跟踪',
    color: 'bg-purple-500',
    features: ['订单状态管理', '发货信息录入', '物流跟踪查询']
  }, {
    icon: Bullhorn,
    title: '营销活动',
    description: '丰富的营销工具，支持优惠券、促销活动、会员管理',
    color: 'bg-green-500',
    features: ['优惠券发放', '促销活动设置', '会员等级管理']
  }, {
    icon: ChartBar,
    title: '数据分析',
    description: '专业的数据分析工具，提供销售统计、用户分析、流量监控',
    color: 'bg-yellow-500',
    features: ['销售数据统计', '用户行为分析', '流量来源监控']
  }, {
    icon: Users,
    title: '客户管理',
    description: '完善的客户管理系统，支持客户信息管理、沟通记录、标签分类',
    color: 'bg-red-500',
    features: ['客户信息档案', '沟通记录管理', '客户标签分类']
  }];

  // 开店流程步骤
  const storeProcess = [{
    icon: UserPlus,
    title: '注册账号',
    description: '手机号快速注册，完善基本信息',
    color: 'bg-orange-500'
  }, {
    icon: Store,
    title: '创建店铺',
    description: '选择店铺模板，设置店铺信息',
    color: 'bg-blue-500'
  }, {
    icon: Package,
    title: '上传商品',
    description: '批量上传商品，设置价格库存',
    color: 'bg-purple-500'
  }, {
    icon: Play,
    title: '开始营业',
    description: '店铺上线运营，开始接单',
    color: 'bg-green-500'
  }];

  // 价格方案
  const pricingPlans = [{
    id: 'basic',
    name: '基础版',
    price: '4,980',
    description: '适合个人创业者',
    features: ['基础店铺功能', '最多100个商品', '基础营销工具', '简单数据分析', '邮件技术支持'],
    excludedFeatures: ['高级营销功能', 'API接口'],
    color: 'border-gray-200',
    buttonColor: 'bg-orange-500 hover:bg-orange-600'
  }, {
    id: 'professional',
    name: '专业版',
    price: '8,980',
    description: '适合企业商家',
    features: ['全部店铺功能', '无限商品数量', '高级营销工具', '专业数据分析', '7×24小时技术支持', 'API接口支持', '定制化功能'],
    excludedFeatures: [],
    color: 'from-orange-600 to-red-600',
    buttonColor: 'bg-white hover:bg-gray-100 text-orange-600',
    recommended: true
  }];

  // 技术特点
  const techFeatures = [{
    icon: Microchip,
    title: '核心技术',
    items: [{
      title: '云计算架构',
      description: '基于云计算的高可用架构，确保系统稳定运行和数据安全'
    }, {
      title: 'AI智能推荐',
      description: '智能商品推荐算法，提升用户购物体验和转化率'
    }, {
      title: '移动端优化',
      description: '完美适配移动设备，支持H5、小程序、APP多端访问'
    }, {
      title: '实时同步',
      description: '多端数据实时同步，确保信息一致性和准确性'
    }]
  }, {
    icon: ShieldAlt,
    title: '安全保障',
    items: [{
      title: '支付安全',
      description: '多重支付安全保障，支持主流支付方式，确保交易安全'
    }, {
      title: '数据加密',
      description: '采用SSL加密传输，保护用户隐私和商业数据'
    }, {
      title: '风险控制',
      description: '智能风控系统，实时监控异常交易，防范风险'
    }, {
      title: '备份恢复',
      description: '多重数据备份机制，确保业务连续性和数据安全'
    }]
  }];

  // 核心优势
  const advantages = [{
    icon: Rocket,
    title: '快速开店',
    description: '3分钟快速搭建微店，无需技术基础，一键上线运营',
    color: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }, {
    icon: Magic,
    title: '智能运营',
    description: 'AI智能推荐，自动化营销，提升店铺运营效率',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }, {
    icon: TrendingUp,
    title: '数据驱动',
    description: '实时数据分析，洞察用户行为，优化经营策略',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }];

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'store-process', 'mall-features', 'pricing', 'technology'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handlePurchase = planId => {
    console.log('购买方案:', planId);
    // 处理购买逻辑
  };
  const handleTrial = () => {
    console.log('申请试用');
    // 处理试用逻辑
  };
  const handleDemo = () => {
    console.log('预约演示');
    // 处理演示逻辑
  };
  return <div className="min-h-screen bg-gray-50">
      <TopNavigation currentPage="ai-micro-store-detail" />
      
      {/* 快速导航 */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {['overview', 'store-process', 'mall-features', 'pricing', 'technology'].map(section => <button key={section} onClick={() => scrollToSection(section)} className={`text-gray-600 hover:text-orange-600 font-medium whitespace-nowrap transition-colors ${activeSection === section ? 'text-orange-600' : ''}`}>
                {section === 'overview' && '系统概览'}
                {section === 'store-process' && '开店流程'}
                {section === 'mall-features' && '商城功能'}
                {section === 'pricing' && '价格信息'}
                {section === 'technology' && '技术特点'}
              </button>)}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        {/* 系统概览 */}
        <section id="overview" className="mb-20">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold">AI微店开店通商城系统</h1>
                </div>
                <p className="text-xl text-white/90 mb-8 max-w-3xl">
                  基于人工智能技术的一站式电商解决方案，为美发行业提供便捷的微店开店服务。
                  智能店铺搭建、商品管理、订单处理、营销推广，助力商家快速开启线上销售。
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">快速开店</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">智能运营</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">数据分析</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-white/30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 核心优势 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">核心优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return <div key={index} className="text-center">
                <div className={`w-20 h-20 ${advantage.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-10 h-10 ${advantage.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>;
          })}
          </div>
        </section>

        {/* 开店流程 */}
        <section id="store-process" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">开店流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storeProcess.map((step, index) => {
            const Icon = step.icon;
            return <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{index + 1}. {step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>;
          })}
          </div>

          {/* 开店界面预览 */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">开店界面预览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">店铺创建向导</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">店铺名称</span>
                      <span className="text-xs text-green-600">✓ 已完成</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">店铺分类</span>
                      <span className="text-xs text-green-600">✓ 已完成</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">店铺logo</span>
                      <span className="text-xs text-blue-600">进行中</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">支付设置</span>
                      <span className="text-xs text-gray-400">待完成</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">店铺模板选择</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border-2 border-orange-500 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-full h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded mb-2"></div>
                    <p className="text-xs font-medium text-gray-900 text-center">时尚模板</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 cursor-pointer hover:border-orange-300 transition-all duration-300">
                    <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-2"></div>
                    <p className="text-xs font-medium text-gray-900 text-center">简约模板</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 cursor-pointer hover:border-orange-300 transition-all duration-300">
                    <div className="w-full h-20 bg-gradient-to-br from-green-100 to-teal-100 rounded mb-2"></div>
                    <p className="text-xs font-medium text-gray-900 text-center">清新模板</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 cursor-pointer hover:border-orange-300 transition-all duration-300">
                    <div className="w-full h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded mb-2"></div>
                    <p className="text-xs font-medium text-gray-900 text-center">个性模板</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 商城功能 */}
        <section id="mall-features" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">商城功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mallFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => <li key={itemIndex} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </li>)}
                </ul>
              </div>;
          })}
          </div>
        </section>

        {/* 价格信息 */}
        <section id="pricing" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">价格信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map(plan => <div key={plan.id} className={`bg-white rounded-xl shadow-lg p-8 ${plan.recommended ? 'bg-gradient-to-br ' + plan.color + ' text-white relative' : 'border-2 ' + plan.color}`}>
                {plan.recommended && <div className="absolute -top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    推荐
                  </div>}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-orange-600'}`}>¥{plan.price}</div>
                  <p className={plan.recommended ? 'text-white/80' : 'text-gray-600'}>{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => <li key={index} className={`flex items-center ${plan.recommended ? 'text-white' : 'text-gray-600'}`}>
                      <Check className={`w-4 h-4 mr-2 ${plan.recommended ? 'text-green-300' : 'text-green-500'}`} />
                      {feature}
                    </li>)}
                  {plan.excludedFeatures.map((feature, index) => <li key={index} className="flex items-center text-gray-400">
                      <X className="w-4 h-4 text-red-500 mr-2" />
                      {feature}
                    </li>)}
                </ul>
                <Button onClick={() => handlePurchase(plan.id)} className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${plan.recommended ? plan.buttonColor : plan.buttonColor + ' text-white'}`}>
                  立即购买
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>)}
          </div>
        </section>

        {/* 技术特点 */}
        <section id="technology" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">技术特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techFeatures.map((techGroup, index) => {
            const GroupIcon = techGroup.icon;
            return <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <GroupIcon className="w-6 h-6 text-orange-500 mr-3" />
                  {techGroup.title}
                </h3>
                <div className="space-y-4">
                  {techGroup.items.map((item, itemIndex) => <div key={itemIndex} className="bg-gray-50 rounded-lg p-4 transform transition-all duration-300 hover:translate-x-2 hover:bg-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>)}
                </div>
              </div>;
          })}
          </div>
        </section>

        {/* 行动号召 */}
        <section className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">开启微店创业新时代</h2>
          <p className="text-xl mb-8 text-white/90">立即体验AI微店开店通商城系统，快速搭建线上店铺，开启电商创业之路</p>
          <div className="flex items-center justify-center space-x-4">
            <Button onClick={() => handlePurchase('professional')} className="bg-white text-orange-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
              立即购买
            </Button>
            <Button variant="outline" onClick={handleTrial} className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
              申请试用
            </Button>
            <Button variant="outline" onClick={handleDemo} className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
              预约演示
            </Button>
          </div>
        </section>
      </main>

      <TabBar currentPage="ai-micro-store-detail" />
    </div>;
}