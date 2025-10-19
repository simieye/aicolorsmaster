// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, History, Zap, TicketAlt, Robot, ShoppingBag, GraduationCap, Heartbeat, Plane, Landmark, Cogs, Star, Check, ArrowRight, Play, Phone, Share2, Heart, Users, Target, TrendingUp, Award, BarChart, Shield, Clock, MessageCircle, Brain, Language, ProjectDiagram, ChevronRight } from 'lucide-react';

export default function AICustomerServiceDetailPage(props) {
  const {
    $w,
    style
  } = props;
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 核心功能模块数据
  const featureModules = [{
    icon: Robot,
    title: '智能对话机器人',
    description: '基于GPT技术的自然语言处理，理解复杂语境，提供精准回答',
    features: ['多轮对话支持', '情感识别分析', '个性化回复'],
    color: 'purple'
  }, {
    icon: History,
    title: '历史聊天记录',
    description: '完整保存对话历史，支持搜索分析，持续优化服务质量',
    features: ['云端存储', '智能搜索', '数据分析'],
    color: 'blue'
  }, {
    icon: Zap,
    title: '快捷回复模板',
    description: '预设常用回复模板，提高响应效率，保持服务一致性',
    features: ['自定义模板', '智能推荐', '一键发送'],
    color: 'green'
  }, {
    icon: TicketAlt,
    title: '工单创建管理',
    description: '智能工单分类和分配，跟踪处理进度，确保问题及时解决',
    features: ['自动分类', '优先级排序', '进度跟踪'],
    color: 'yellow'
  }];

  // 使用流程数据
  const processSteps = [{
    step: 1,
    title: '需求分析',
    description: '专业团队了解您的业务需求，制定定制化方案',
    color: 'purple'
  }, {
    step: 2,
    title: '系统部署',
    description: '快速部署系统，配置基础参数和知识库',
    color: 'blue'
  }, {
    step: 3,
    title: '培训上线',
    description: '员工培训，系统测试，正式上线运行',
    color: 'green'
  }, {
    step: 4,
    title: '持续优化',
    description: '数据分析，持续优化，提升服务质量',
    color: 'yellow'
  }];

  // 技术特点数据
  const techStack = [{
    icon: Brain,
    title: '深度学习算法',
    description: '基于Transformer架构的NLP模型',
    color: 'purple'
  }, {
    icon: Language,
    title: '自然语言处理',
    description: '支持中英文多语言理解',
    color: 'blue'
  }, {
    icon: ProjectDiagram,
    title: '知识图谱技术',
    description: '构建行业专业知识图谱',
    color: 'green'
  }, {
    icon: TrendingUp,
    title: '机器学习模型',
    description: '持续学习和模型优化',
    color: 'yellow'
  }];

  // 性能指标数据
  const performanceMetrics = [{
    label: '响应准确率',
    value: 98,
    color: 'purple'
  }, {
    label: '客户满意度',
    value: 95,
    color: 'blue'
  }, {
    label: '成本降低',
    value: 65,
    color: 'green'
  }, {
    label: '效率提升',
    value: 85,
    color: 'yellow'
  }];

  // 价格方案数据
  const pricingPlans = [{
    id: 'basic',
    name: '基础版',
    price: 1680,
    features: ['基础对话功能', '1000次/月对话', '基础工单管理', '7×8小时技术支持'],
    color: 'bg-gray-100 text-gray-700'
  }, {
    id: 'professional',
    name: '专业版',
    price: 2680,
    badge: '推荐',
    features: ['完整对话功能', '无限次对话', '高级工单管理', '数据分析报告', '7×24小时技术支持'],
    color: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white',
    popular: true
  }, {
    id: 'enterprise',
    name: '企业版',
    price: 4980,
    features: ['定制化功能', '无限次对话', '企业级工单系统', '高级数据分析', '专属客户经理'],
    color: 'bg-gray-100 text-gray-700'
  }];

  // 用户评价数据
  const testimonials = [{
    name: '张经理',
    position: '电商公司客服总监',
    avatar: 'https://picsum.photos/seed/user1/50/50.jpg',
    rating: 5,
    comment: 'AI客服系统大大提升了我们的客户服务效率，响应速度快，准确率高，客户满意度从85%提升到95%，人工成本降低了60%。'
  }, {
    name: '李总监',
    position: '教育机构运营负责人',
    avatar: 'https://picsum.photos/seed/user2/50/50.jpg',
    rating: 5,
    comment: '系统智能化程度很高，能够准确理解学员需求，提供个性化的服务，大大减轻了人工客服的压力，客服团队效率提升了80%。'
  }, {
    name: '王主管',
    position: '医疗集团IT经理',
    avatar: 'https://picsum.photos/seed/user3/50/50.jpg',
    rating: 4,
    comment: '系统稳定可靠，功能完善，技术支持团队响应及时，为我们的医疗服务提供了有力保障，患者满意度显著提升。'
  }];

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        light: 'bg-purple-100',
        text: 'text-purple-600',
        bg: 'bg-purple-600'
      },
      blue: {
        light: 'bg-blue-100',
        text: 'text-blue-600',
        bg: 'bg-blue-600'
      },
      green: {
        light: 'bg-green-100',
        text: 'text-green-600',
        bg: 'bg-green-600'
      },
      yellow: {
        light: 'bg-yellow-100',
        text: 'text-yellow-600',
        bg: 'bg-yellow-600'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  // 处理购买
  const handlePurchase = planId => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'checkout',
        params: {
          productId: 'ai-customer-service',
          planId
        }
      });
    }
  };

  // 处理试用
  const handleTrial = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          productId: 'ai-customer-service'
        }
      });
    }
  };

  // 处理联系
  const handleContact = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'online-consultation'
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/95' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => $w.utils.navigateBack()} className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-arrow-left text-xl"></i>
              </button>
              <h1 className="text-xl font-bold text-gray-900">AI客服系统</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 产品头部 */}
        <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">热销产品</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">AI驱动</span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">24/7服务</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">AI客服系统</h1>
                <p className="text-xl mb-6 text-purple-100">
                  新一代智能客服解决方案，基于深度学习技术，提供24小时全天候服务，大幅提升客户满意度和运营效率
                </p>
                <div className="flex items-center space-x-6 mb-8">
                  <div>
                    <div className="text-3xl font-bold">¥2,680</div>
                    <div className="text-purple-200">一次性购买</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">4.9</div>
                    <div className="text-purple-200">用户评分</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-purple-200">企业选择</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handlePurchase('professional')} className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                    立即购买
                  </button>
                  <button onClick={handleTrial} className="bg-purple-700 text-white hover:bg-purple-800 px-8 py-3 rounded-lg font-medium transition-colors">
                    免费试用
                  </button>
                  <button className="border border-white text-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-lg font-medium transition-colors">
                    <Play className="w-4 h-4 inline mr-2" />
                    观看演示
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="animate-bounce">
                  <HeadphonesIcon className="w-24 h-24 mx-auto mb-4" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-purple-200 text-sm">全天候服务</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-purple-200 text-sm">问题解决率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2秒</div>
                    <div className="text-purple-200 text-sm">平均响应时间</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签切换 */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {['features', 'process', 'technology', 'demo', 'pricing', 'reviews'].map(tab => {
              const tabLabels = {
                features: '功能模块',
                process: '使用流程',
                technology: '技术特点',
                demo: '界面演示',
                pricing: '价格方案',
                reviews: '用户评价'
              };
              return <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-purple-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tabLabels[tab]}
                </button>;
            })}
            </div>
          </div>
        </section>

        {/* 功能模块 */}
        {activeTab === 'features' && <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能模块</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  全方位的智能客服功能，满足不同场景的客户服务需求
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureModules.map((module, index) => {
              const Icon = module.icon;
              const colors = getColorClasses(module.color);
              return <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
                      <div className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {module.features.map((feature, idx) => <li key={idx}>
                            <Check className="w-4 h-4 text-green-500 inline mr-2" />
                            {feature}
                          </li>)}
                      </ul>
                    </div>;
            })}
              </div>
            </div>
          </section>}

        {/* 使用流程 */}
        {activeTab === 'process' && <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">使用流程</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  简单四步，快速部署AI客服系统
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => {
              const colors = getColorClasses(step.color);
              return <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center transition-all duration-300 hover:transform hover:translate-x-2 hover:bg-gray-50">
                      <div className={`w-16 h-16 ${colors.light} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className={`text-2xl font-bold ${colors.text}`}>{step.step}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>;
            })}
              </div>
            </div>
          </section>}

        {/* 技术特点 */}
        {activeTab === 'technology' && <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">技术特点</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  采用最新的AI技术，为您提供最优质的客服体验
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">AI技术栈</h3>
                  <div className="space-y-4">
                    {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  const colors = getColorClasses(tech.color);
                  return <div key={index} className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:transform hover:scale-105">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${colors.light} rounded-lg flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{tech.title}</h4>
                              <p className="text-sm text-gray-600">{tech.description}</p>
                            </div>
                          </div>
                        </div>;
                })}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">性能指标</h3>
                  <div className="space-y-6">
                    {performanceMetrics.map((metric, index) => {
                  const colors = getColorClasses(metric.color);
                  return <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700">{metric.label}</span>
                          <span className={`${colors.text} font-semibold`}>{metric.value}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3">
                          <div className={`${colors.bg} h-3 rounded-full transition-all duration-500`} style={{
                        width: `${metric.value}%`
                      }}></div>
                        </div>
                      </div>;
                })}
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2秒</div>
                      <div className="text-sm text-gray-600">平均响应时间</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">99.9%</div>
                      <div className="text-sm text-gray-600">系统可用性</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>}

        {/* 界面演示 */}
        {activeTab === 'demo' && <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">界面演示</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  直观的用户界面，简单易用的操作体验
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex h-96">
                    <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700">
                      <div className="text-white text-sm mb-4">对话列表</div>
                      <div className="space-y-2">
                        <div className="bg-gray-700 rounded p-2 text-white text-sm cursor-pointer hover:bg-gray-600">客户咨询 - 产品介绍</div>
                        <div className="bg-gray-700 rounded p-2 text-white text-sm cursor-pointer hover:bg-gray-600">技术支持 - 使用问题</div>
                        <div className="bg-gray-700 rounded p-2 text-white text-sm cursor-pointer hover:bg-gray-600">售后服务 - 退换货</div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-4">
                      <div className="text-sm text-gray-600 mb-4">对话内容</div>
                      <div className="space-y-3">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">您好，我想了解一下你们的产品</p>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-3 max-w-xs ml-auto">
                          <p className="text-sm">您好！很高兴为您服务，请问您想了解哪方面的产品呢？</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">我想了解AI客服系统的功能特点</p>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-3 max-w-xs ml-auto">
                          <p className="text-sm">我们的AI客服系统具有智能对话、历史记录、快捷回复、工单管理等功能...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>}

        {/* 价格方案 */}
        {activeTab === 'pricing' && <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">价格方案</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  透明的价格体系，选择最适合您需求的方案
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map(plan => <div key={plan.id} className={`rounded-xl p-8 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl ${plan.popular ? 'transform scale-105 ring-2 ring-purple-600' : ''} ${plan.color.includes('gradient') ? plan.color : 'bg-white'}`}>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-2">
                        <h3 className={`text-xl font-semibold ${plan.color.includes('gradient') ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                        {plan.badge && <span className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-sm ml-2">{plan.badge}</span>}
                      </div>
                      <div className={`text-3xl font-bold mb-2 ${plan.color.includes('gradient') ? 'text-white' : 'text-gray-900'}`}>¥{plan.price.toLocaleString()}</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => <li key={idx} className={`flex items-center ${plan.color.includes('gradient') ? 'text-white' : 'text-gray-600'}`}>
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </li>)}
                    </ul>
                    <button onClick={() => handlePurchase(plan.id)} className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      选择方案
                    </button>
                  </div>)}
              </div>
            </div>
          </section>}

        {/* 用户评价 */}
        {activeTab === 'reviews' && <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">用户评价</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  来自真实用户的使用反馈和评价
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <img src={testimonial.avatar} alt="用户头像" className="w-12 h-12 rounded-full mr-3" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                    </div>
                    <p className="text-gray-600">{testimonial.comment}</p>
                  </div>)}
              </div>
            </div>
          </section>}

        {/* 购买咨询 */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好提升您的客户服务了吗？</h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              立即体验AI客服系统，让您的客户服务更智能、更高效、更贴心
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button onClick={() => handlePurchase('professional')} className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                立即购买
              </button>
              <button onClick={handleTrial} className="bg-purple-700 text-white hover:bg-purple-800 px-8 py-3 rounded-lg font-medium transition-colors">
                免费试用
              </button>
              <button onClick={handleContact} className="border border-white text-white hover:bg-white hover:text-purple-600 px-6 py-3 rounded-lg font-medium transition-colors">
                <Phone className="w-4 h-4 inline mr-2" />
                联系我们
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>;
}