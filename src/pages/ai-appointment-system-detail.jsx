// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, Users, TrendingUp, MobileAlt, CalendarDays, User, Check, Bell, UserTie, ChartBar, Microchip, ShieldAlt, X, ArrowRight, Star, Briefcase, ConciergeBell } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AIAppointmentSystemDetailPage(props) {
  const {
    $w
  } = props;
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState('professional');

  // 管理功能数据
  const managementFeatures = [{
    icon: CalendarDays,
    title: '预约管理',
    description: '全面的预约管理功能，支持查看、修改、取消预约',
    color: 'bg-green-500',
    features: ['实时预约状态更新', '批量操作支持', '预约冲突检测']
  }, {
    icon: Users,
    title: '客户管理',
    description: '完整的客户信息管理，建立客户档案',
    color: 'bg-blue-500',
    features: ['客户信息档案', '预约历史记录', '客户标签管理']
  }, {
    icon: ConciergeBell,
    title: '服务管理',
    description: '灵活的服务项目管理，自定义服务内容',
    color: 'bg-purple-500',
    features: ['服务项目设置', '价格时长管理', '服务分类管理']
  }, {
    icon: UserTie,
    title: '员工管理',
    description: '员工排班管理，技能标签分配',
    color: 'bg-yellow-500',
    features: ['员工排班设置', '技能标签管理', '工作时间设置']
  }, {
    icon: Bell,
    title: '提醒通知',
    description: '智能提醒系统，多种通知方式',
    color: 'bg-red-500',
    features: ['短信提醒', '微信通知', '邮件提醒']
  }, {
    icon: ChartBar,
    title: '数据分析',
    description: '预约数据统计，经营分析报告',
    color: 'bg-indigo-500',
    features: ['预约统计分析', '客流量分析', '收入统计报表']
  }];

  // 价格方案
  const pricingPlans = [{
    id: 'basic',
    name: '基础版',
    price: '2,680',
    description: '适合小型门店',
    features: ['基础预约管理功能', '最多5个员工账号', '1000次/月预约', '基础数据统计', '邮件技术支持'],
    excludedFeatures: ['高级分析功能', 'API接口'],
    color: 'border-gray-200',
    buttonColor: 'bg-green-500 hover:bg-green-600'
  }, {
    id: 'professional',
    name: '专业版',
    price: '4,980',
    description: '适合中大型门店',
    features: ['高级预约管理功能', '无限员工账号', '无限预约次数', '高级数据分析', '7×24小时技术支持', 'API接口支持', '定制化功能'],
    excludedFeatures: [],
    color: 'from-green-600 to-teal-600',
    buttonColor: 'bg-white hover:bg-gray-100 text-green-600',
    recommended: true
  }];

  // 技术特点
  const techFeatures = [{
    icon: Microchip,
    title: '核心技术',
    items: [{
      title: '智能排班算法',
      description: '基于AI的智能排班算法，自动优化员工工作时间安排'
    }, {
      title: '实时同步技术',
      description: '多端实时数据同步，确保信息一致性'
    }, {
      title: '云计算架构',
      description: '基于云计算的高可用架构，保证系统稳定运行'
    }, {
      title: '移动端适配',
      description: '完美适配移动设备，支持随时随地预约管理'
    }]
  }, {
    icon: ShieldAlt,
    title: '安全保障',
    items: [{
      title: '数据加密',
      description: '采用SSL加密传输，保护客户隐私数据'
    }, {
      title: '备份机制',
      description: '多重数据备份，确保数据安全和业务连续性'
    }, {
      title: '权限管理',
      description: '细粒度权限控制，确保数据访问安全'
    }, {
      title: '合规认证',
      description: '符合相关法规要求，保护用户权益'
    }]
  }];

  // 预约流程步骤
  const bookingSteps = [{
    icon: MobileAlt,
    title: '选择服务',
    description: '客户通过手机或网页选择所需的服务项目',
    color: 'bg-green-500'
  }, {
    icon: Calendar,
    title: '选择时间',
    description: '查看可用时间段，选择合适的预约时间',
    color: 'bg-blue-500'
  }, {
    icon: User,
    title: '填写信息',
    description: '填写联系信息和特殊需求',
    color: 'bg-purple-500'
  }, {
    icon: Check,
    title: '确认预约',
    description: '确认预约信息，收到提醒通知',
    color: 'bg-yellow-500'
  }];

  // 核心优势
  const advantages = [{
    icon: Clock,
    title: '节省时间',
    description: '自动化预约流程，减少人工操作，提高工作效率',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  }, {
    icon: Users,
    title: '提升体验',
    description: '便捷的预约方式，智能提醒服务，增强客户满意度',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }, {
    icon: TrendingUp,
    title: '数据洞察',
    description: '实时数据分析，深入了解客户行为，优化经营策略',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }];

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'booking-flow', 'management', 'pricing', 'technology'];
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
      <TopNavigation currentPage="ai-appointment-system-detail" />
      
      {/* 快速导航 */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {['overview', 'booking-flow', 'management', 'pricing', 'technology'].map(section => <button key={section} onClick={() => scrollToSection(section)} className={`text-gray-600 hover:text-green-600 font-medium whitespace-nowrap transition-colors ${activeSection === section ? 'text-green-600' : ''}`}>
                {section === 'overview' && '系统概览'}
                {section === 'booking-flow' && '预约流程'}
                {section === 'management' && '管理功能'}
                {section === 'pricing' && '价格信息'}
                {section === 'technology' && '技术特点'}
              </button>)}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        {/* 系统概览 */}
        <section id="overview" className="mb-20">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold">AI客户预约系统</h1>
                </div>
                <p className="text-xl text-white/90 mb-8 max-w-3xl">
                  基于��工智能技术的智能预约管理解决方案，为美发行业提供高效的预约服务。
                  智能排班、自动提醒、数据分析，全面提升客户体验和运营效率。
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">智能排班</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">自动提醒</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">数据分析</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-24 h-24 text-white/30" />
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

        {/* 预约流程 */}
        <section id="booking-flow" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">预约流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => {
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

          {/* 预约界面预览 */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">预约界面预览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">日历视图</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  <div className="text-gray-500">日</div>
                  <div className="text-gray-500">一</div>
                  <div className="text-gray-500">二</div>
                  <div className="text-gray-500">三</div>
                  <div className="text-gray-500">四</div>
                  <div className="text-gray-500">五</div>
                  <div className="text-gray-500">六</div>
                  <div className="text-gray-400 p-2">29</div>
                  <div className="text-gray-400 p-2">30</div>
                  <div className="text-gray-400 p-2">31</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">1</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">2</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">3</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">4</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">5</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">6</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">7</div>
                  <div className="p-2 bg-green-500 text-white rounded cursor-pointer">8</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">9</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">10</div>
                  <div className="p-2 hover:bg-green-100 rounded cursor-pointer transition-colors">11</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">时间段选择</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-100 text-gray-400 p-2 rounded text-center text-sm cursor-not-allowed">09:00</div>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm cursor-pointer hover:bg-green-200 transition-colors">09:30</div>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm cursor-pointer hover:bg-green-200 transition-colors">10:00</div>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm cursor-pointer hover:bg-green-200 transition-colors">10:30</div>
                  <div className="bg-gray-100 text-gray-400 p-2 rounded text-center text-sm cursor-not-allowed">11:00</div>
                  <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm cursor-pointer hover:bg-green-200 transition-colors">11:30</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 管理功能 */}
        <section id="management" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">管理功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementFeatures.map((feature, index) => {
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
                  <div className={`text-4xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-green-600'}`}>¥{plan.price}</div>
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
                  <GroupIcon className="w-6 h-6 text-green-500 mr-3" />
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
        <section className="text-center bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">开启智能预约新时代</h2>
          <p className="text-xl mb-8 text-white/90">立即体验AI客户预约系统，提升预约效率，优化客户体验</p>
          <div className="flex items-center justify-center space-x-4">
            <Button onClick={() => handlePurchase('professional')} className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300">
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

      <TabBar currentPage="ai-appointment-system-detail" />
    </div>;
}