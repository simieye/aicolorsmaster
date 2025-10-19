// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, MessageSquare, History, Bolt, TicketAlt, ChartBar, Users, Brain, Clock, TrendingUp, Microchip, ShieldAlt, Check, X, ArrowRight, Star, Briefcase } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AICustomerServiceDetailPage(props) {
  const {
    $w
  } = props;
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState('enterprise');

  // 功能���块数据
  const features = [{
    icon: MessageSquare,
    title: '智能对话',
    description: '基于自然语言处理技术，理解客户咨询内容，提供准确、自然的回复',
    color: 'bg-blue-500',
    features: ['多轮对话支持', '意图识别准确率95%+', '情感分析能力']
  }, {
    icon: History,
    title: '历史记录',
    description: '完整保存客户对话历史，支持搜索和管理，便于后续跟进',
    color: 'bg-green-500',
    features: ['对话记录永久保存', '智能搜索功能', '客户画像分析']
  }, {
    icon: Bolt,
    title: '快捷回复',
    description: '预设常用回复模板，提高响应效率，确保回复质量',
    color: 'bg-purple-500',
    features: ['自定义回复模板', '智能推荐回复', '一键发送功能']
  }, {
    icon: TicketAlt,
    title: '工单管理',
    description: '自动创建工单，跟踪处理进度，确保问题得到及时解决',
    color: 'bg-yellow-500',
    features: ['自动工单创建', '优先级智能分配', '处理进度跟踪']
  }, {
    icon: ChartBar,
    title: '数据分析',
    description: '实时监控客服数据，生成分析报告，优化服务质量',
    color: 'bg-red-500',
    features: ['实时数据监控', '自动报告生成', 'KPI指标分析']
  }, {
    icon: Users,
    title: '多渠道接入',
    description: '支持多种接入方式，满足不同场景需求',
    color: 'bg-indigo-500',
    features: ['网站在线客服', '微信公众号', 'APP内嵌客服']
  }];

  // 价格方案
  const pricingPlans = [{
    id: 'standard',
    name: '标准版',
    price: '2,680',
    description: '适合中小型门店',
    features: ['基础智能对话功能', '1000次/月对话额度', '历史记录保存30天', '基础数据分析报告', '邮件技术支持'],
    excludedFeatures: ['自定义AI训练', '专属客户经理'],
    color: 'border-gray-200',
    buttonColor: 'bg-blue-500 hover:bg-blue-600'
  }, {
    id: 'enterprise',
    name: '企业版',
    price: '4,980',
    description: '适合大型连锁品牌',
    features: ['高级智能对话功能', '无限对话额度', '永久历史记录保存', '高级数据分析报告', '7×24小时技术支持', '自定义AI训练', '专属客户经理'],
    excludedFeatures: [],
    color: 'from-purple-600 to-blue-600',
    buttonColor: 'bg-white hover:bg-gray-100 text-purple-600',
    recommended: true
  }];

  // 技术特点
  const techFeatures = [{
    icon: Microchip,
    title: '核心技术',
    items: [{
      title: '自然语言处理',
      description: '采用最新的NLP技术，支持多语言识别，理解准确率达到95%以上'
    }, {
      title: '机器学习算法',
      description: '基于深度学习的对话模型，持续学习优化，提升服务质量'
    }, {
      title: '知识图谱',
      description: '构建行业知识图谱，提供专业准确的业务咨询'
    }, {
      title: '情感计算',
      description: '实时分析客户情绪，提供个性化服务体验'
    }]
  }, {
    icon: ShieldAlt,
    title: '安全保障',
    items: [{
      title: '数据加密',
      description: '采用AES-256加密算法，确保数据传输和存储安全'
    }, {
      title: '隐私保护',
      description: '严格遵守隐私保护法规，客户信息绝不泄露'
    }, {
      title: '访问控制',
      description: '多级权限管理，确保系统访问安全可控'
    }, {
      title: '备份恢复',
      description: '多重备份机制，确保数据安全和业务连续性'
    }]
  }];

  // 使用流程
  const processSteps = [{
    number: 1,
    title: '系统部署',
    description: '快速部署，支持云端和本地部署，根据需求选择合适方案',
    position: 'right',
    color: 'bg-blue-500'
  }, {
    number: 2,
    title: '知识库配置',
    description: '导入业务知识，配置回复模板，训练AI模型',
    position: 'left',
    color: 'bg-green-500'
  }, {
    number: 3,
    title: '接入集成',
    description: '通过API或SDK接入现有系统，支持多种平台',
    position: 'right',
    color: 'bg-purple-500'
  }, {
    number: 4,
    title: '上线运营',
    description: '系统上线运行，实时监控，持续优化',
    position: 'left',
    color: 'bg-yellow-500'
  }];

  // 核心优势
  const advantages = [{
    icon: Brain,
    title: '智能理解',
    description: '基于NLP技术，准确理解客户意图，提供精准回复',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }, {
    icon: Clock,
    title: '24小时服务',
    description: '全天候在线服务，随时响应客户咨询，不错过任何商机',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  }, {
    icon: TrendingUp,
    title: '数据分析',
    description: '实时数据分析，洞察客户需求，优化服务质量',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }];

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'features', 'process', 'pricing', 'technology'];
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
      <TopNavigation currentPage="ai-customer-service-detail" />
      
      {/* 快速导航 */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {['overview', 'features', 'process', 'pricing', 'technology'].map(section => <button key={section} onClick={() => scrollToSection(section)} className={`text-gray-600 hover:text-purple-600 font-medium whitespace-nowrap transition-colors ${activeSection === section ? 'text-purple-600' : ''}`}>
                {section === 'overview' && '系统概览'}
                {section === 'features' && '功能模块'}
                {section === 'process' && '使用流程'}
                {section === 'pricing' && '价格信息'}
                {section === 'technology' && '技术特点'}
              </button>)}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        {/* 系统概览 */}
        <section id="overview" className="mb-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <HeadphonesIcon className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold">AI客服系统</h1>
                </div>
                <p className="text-xl text-white/90 mb-8 max-w-3xl">
                  基于先进的人工智能技术，为美发行业量身打造的智能客服解决方案。
                  24小时在线服务，智能对话理解，自动工单处理，大幅提升客户满意度和服务效率。
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">24小时在线</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">智能对话</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">自动处理</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                  <HeadphonesIcon className="w-24 h-24 text-white/30" />
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

        {/* 功能模块 */}
        <section id="features" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">功能模块</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
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

        {/* 使用流程 */}
        <section id="process" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">使用流程</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            <div className="space-y-12">
              {processSteps.map((step, index) => <div key={index} className={`flex items-center ${step.position === 'left' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${step.position === 'left' ? 'text-left pl-8' : 'text-right pr-8'}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.number}. {step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold transform transition-all duration-300 hover:scale-110`}>
                    {step.number}
                  </div>
                  <div className="flex-1"></div>
                </div>)}
            </div>
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
                  <div className={`text-4xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-blue-600'}`}>¥{plan.price}</div>
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
                  <GroupIcon className="w-6 h-6 text-blue-500 mr-3" />
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
        <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">开启智能客服新时代</h2>
          <p className="text-xl mb-8 text-white/90">立即体验AI客服系统，提升客户满意度，降低运营成本</p>
          <div className="flex items-center justify-center space-x-4">
            <Button onClick={() => handlePurchase('enterprise')} className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
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

      <TabBar currentPage="ai-customer-service-detail" />
    </div>;
}