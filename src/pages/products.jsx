// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, Calendar, GraduationCap, ShoppingBag, Star, Briefcase, MessageSquare, History, Bolt, TicketAlt, Users, ConciergeBell, ChartLine, Book, FolderOpen, ClipboardCheck, Store, Box, ShoppingCart, Bullhorn, UserPlus, Award, Certificate, Industry, ArrowRight, Check } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;

export default function ProductsPage(props) {
  const {
    $w
  } = props;
  const [selectedProduct, setSelectedProduct] = useState(null);

  // AI系统产品数据
  const aiProducts = [{
    id: 'customer-service',
    name: 'AI客服系统',
    description: '智能客服机器人，24小时在线服务，提升客户满意度',
    icon: HeadphonesIcon,
    gradient: 'from-blue-500 to-purple-600',
    prices: [{
      name: '标准版',
      price: '2,680',
      color: 'bg-white/20'
    }, {
      name: '企业版',
      price: '4,980',
      color: 'bg-yellow-500/20'
    }],
    features: [{
      icon: MessageSquare,
      title: '智能对话',
      description: '基于NLP技术，理解客户意图，提供精准回复',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }, {
      icon: History,
      title: '历史记录',
      description: '完整保存聊天记录，支持搜索和管理',
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    }, {
      icon: Bolt,
      title: '快捷回复',
      description: '预设常用回复模板，提高响应效率',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }, {
      icon: TicketAlt,
      title: '工单管理',
      description: '自动创建工单，跟踪处理进度',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }],
    scenarios: [{
      icon: Store,
      title: '美发门店',
      description: '处理客户咨询、预约服务、产品推荐',
      gradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-500'
    }, {
      icon: ShoppingCart,
      title: '电商平台',
      description: '商品咨询、订单查询、售后服务',
      gradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-500'
    }, {
      icon: Users,
      title: '连锁品牌',
      description: '统一客服标准、多店协同服务',
      gradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-500'
    }]
  }, {
    id: 'appointment-system',
    name: 'AI客户预约系统',
    description: '智能预约管理，优化时间安排，提升服务效率',
    icon: Calendar,
    gradient: 'from-green-500 to-teal-600',
    prices: [{
      name: '基础版',
      price: '2,680',
      color: 'bg-white/20'
    }, {
      name: '专业版',
      price: '4,980',
      color: 'bg-yellow-500/20'
    }],
    features: [{
      icon: Calendar,
      title: '预约日历',
      description: '可视化日历界面，直观查看预约安排',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }, {
      icon: Users,
      title: '客户管理',
      description: '客户信息管理，历史记录查询',
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    }, {
      icon: ConciergeBell,
      title: '服务管理',
      description: '服务项目设置，价格时长管理',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }, {
      icon: ChartLine,
      title: '数据分析',
      description: '预约统计，客户分析，收入报表',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }],
    scenarios: [{
      icon: Briefcase,
      title: '美发沙龙',
      description: '发型师预约，服务时间管理',
      gradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-500'
    }, {
      icon: Briefcase,
      title: '美容院',
      description: '美容师排班，护理项目预约',
      gradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-500'
    }, {
      icon: Store,
      title: '连锁门店',
      description: '多店统一管理，资源调配',
      gradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-500'
    }]
  }, {
    id: 'employee-training',
    name: 'AI员工成长业务培训系统',
    description: '智能培训平台，提升员工技能，促进业务成长',
    icon: GraduationCap,
    gradient: 'from-purple-500 to-pink-600',
    prices: [{
      name: '标准版',
      price: '3,680',
      color: 'bg-white/20'
    }, {
      name: '企业版',
      price: '6,980',
      color: 'bg-yellow-500/20'
    }],
    features: [{
      icon: Book,
      title: '课程管理',
      description: '丰富的培训课程，分类管理，进度跟踪',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }, {
      icon: ChartLine,
      title: '学习跟踪',
      description: '学习进度监控，成绩统计分析',
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    }, {
      icon: FolderOpen,
      title: '资料下载',
      description: '培训资料管理，支持多种格式下载',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }, {
      icon: ClipboardCheck,
      title: '考试测评',
      description: '在线考试，自动评分，证书颁发',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }],
    scenarios: [{
      icon: UserPlus,
      title: '新员工培训',
      description: '入职培训，企业文化，岗位技能',
      gradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-500'
    }, {
      icon: Award,
      title: '技能提升',
      description: '技术培训，服务技能，管理能力',
      gradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-500'
    }, {
      icon: Certificate,
      title: '认证考核',
      description: '技能认证，等级评定，证书管理',
      gradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-500'
    }]
  }, {
    id: 'micro-store',
    name: 'AI微店开店通商城系统',
    description: '一站式电商解决方案，轻松开店，智能运营',
    icon: ShoppingBag,
    gradient: 'from-orange-500 to-red-600',
    prices: [{
      name: '基础版',
      price: '4,980',
      color: 'bg-white/20'
    }, {
      name: '专业版',
      price: '8,980',
      color: 'bg-yellow-500/20'
    }],
    features: [{
      icon: Store,
      title: '店铺管理',
      description: '店铺信息设置，装修模板，支付配置',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }, {
      icon: Box,
      title: '商品管理',
      description: '商品上架，库存管理，价格设置',
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    }, {
      icon: ShoppingCart,
      title: '订单处理',
      description: '订单管理，发货处理，物流跟踪',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }, {
      icon: Bullhorn,
      title: '营销活动',
      description: '优惠券，促销活动，会员管理',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }],
    scenarios: [{
      icon: User,
      title: '个人创业者',
      description: '快速开店，低成本创业，简单易用',
      gradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-500'
    }, {
      icon: Store,
      title: '实体门店',
      description: '线上线下融合，拓展销售渠道',
      gradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-500'
    }, {
      icon: Industry,
      title: '品牌商家',
      description: '多店管理，品牌展示，数据分析',
      gradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-500'
    }]
  }];
  const handleProductClick = productId => {
    setSelectedProduct(productId);
    // 可以添加导航到详情页的逻辑
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-detail',
        params: {
          productId
        }
      });
    }
  };
  const handlePurchase = productId => {
    // 处理购买逻辑
    console.log('购买产品:', productId);
  };
  const handleTrial = productId => {
    // 处理试用逻辑
    console.log('申请试用:', productId);
  };
  return <div className="min-h-screen bg-gray-50">
      <TopNavigation currentPage="products" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* 页面标题 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI智能系统产品中心
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            为美发行业量身定制的AI智能解决方案，助力门店数字化转型，提升运营效率
          </p>
        </section>

        {/* 产品列表 */}
        <div className="space-y-20">
          {aiProducts.map(product => {
          const Icon = product.icon;
          return <section key={product.id} className="product-card">
                <div className={`bg-gradient-to-r ${product.gradient} rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h2 className="text-3xl font-bold">{product.name}</h2>
                        </div>
                        <p className="text-white/90 text-lg mb-6">{product.description}</p>
                        <div className="flex items-center space-x-6">
                          {product.prices.map((price, index) => <div key={index} className={`${price.color} backdrop-blur-sm rounded-lg px-6 py-3 transform transition-all duration-300 hover:scale-105`}>
                              <span className="text-white/80 text-sm">{price.name}</span>
                              <span className="text-2xl font-bold ml-2">¥{price.price}</span>
                            </div>)}
                        </div>
                      </div>
                      <div className="hidden lg:block">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                          <Icon className="w-16 h-16 text-white/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-white">
                    {/* 功能特点 */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 mr-2" />
                        核心功能特点
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return <div key={index} className="feature-item bg-gray-50 rounded-lg p-4 transform transition-all duration-300 hover:translate-x-2 hover:bg-gray-100">
                              <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 ${feature.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                  <FeatureIcon className={`w-4 h-4 ${feature.iconColor}`} />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                  <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                              </div>
                            </div>;
                    })}
                      </div>
                    </div>

                    {/* 使用场景 */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
                        适用场景
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {product.scenarios.map((scenario, index) => {
                      const ScenarioIcon = scenario.icon;
                      return <div key={index} className={`scenario-card bg-gradient-to-br ${scenario.gradient} rounded-lg p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                              <div className={`w-10 h-10 ${scenario.iconBg} rounded-full flex items-center justify-center mb-3`}>
                                <ScenarioIcon className="w-5 h-5 text-white" />
                              </div>
                              <h4 className="font-medium text-gray-900 mb-2">{scenario.title}</h4>
                              <p className="text-gray-600 text-sm">{scenario.description}</p>
                            </div>;
                    })}
                      </div>
                    </div>

                    {/* 购买按钮 */}
                    <div className="flex items-center justify-center space-x-4">
                      <Button onClick={() => handlePurchase(product.id)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                        立即购买
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" onClick={() => handleTrial(product.id)} className="border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
                        申请试用
                      </Button>
                    </div>
                  </div>
                </div>
              </section>;
        })}
        </div>

        {/* 底部CTA */}
        <section className="mt-20 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">选择适合您的AI解决方案</h2>
          <p className="text-xl mb-8 text-white/90">专业团队支持，定制化服务，助力您的业务腾飞</p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
              联系咨询
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
              预约演示
            </Button>
          </div>
        </section>
      </main>

      <TabBar currentPage="products" />
    </div>;
}