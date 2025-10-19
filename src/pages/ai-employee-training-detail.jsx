// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { GraduationCap, Book, Users, TrendingUp, Brain, Certificate, Clock, Signal, Check, X, ArrowRight, Star, Briefcase, Palette, Store, Bullhorn, Smartphone, Microchip, ShieldAlt, Scissors } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AIEmployeeTrainingDetailPage(props) {
  const {
    $w
  } = props;
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPlan, setSelectedPlan] = useState('enterprise');

  // 培训课程数据
  const trainingCourses = [{
    icon: Scissors,
    title: '美发技术基础',
    description: '从基础到高级的美发技术培训，包含剪发、染发、烫发等核心技术',
    color: 'bg-purple-500',
    features: ['基础剪发技巧', '染发技术原理', '烫发造型设计'],
    duration: '40课时',
    level: '初级'
  }, {
    icon: Palette,
    title: '色彩设计',
    description: '专业的色彩理论和搭配技巧，培养色彩设计师的专业能力',
    color: 'bg-blue-500',
    features: ['色彩理论基础', '个性化配色', '流行色彩趋势'],
    duration: '32课时',
    level: '中级'
  }, {
    icon: Users,
    title: '客户服务',
    description: '提升客户沟通和服务能力，打造专业的服务体验',
    color: 'bg-green-500',
    features: ['沟通技巧培训', '客户需求分析', '投诉处理技巧'],
    duration: '24课时',
    level: '初级'
  }, {
    icon: Store,
    title: '门店管理',
    description: '门店运营管理知识，培养管理型人才',
    color: 'bg-yellow-500',
    features: ['人员管理', '库存管理', '财务基础'],
    duration: '36课时',
    level: '高级'
  }, {
    icon: Bullhorn,
    title: '营销推广',
    description: '现代营销理念和推广技巧，提升门店业绩',
    color: 'bg-red-500',
    features: ['社交媒体营销', '活动策划执行', '品牌建设'],
    duration: '28课时',
    level: '中级'
  }, {
    icon: Smartphone,
    title: '数字化运营',
    description: '数字化工具使用和线上运营能力培养',
    color: 'bg-indigo-500',
    features: ['预约系统使用', '线上运营', '数据分析基础'],
    duration: '20课时',
    level: '中级'
  }];

  // 学习路径数据
  const learningPaths = [{
    title: '新员工成长路径',
    paths: [{
      title: '入职培训',
      duration: '1-2周',
      description: '企业文化、规章制度、基础技能',
      progress: 100,
      color: 'border-green-500',
      bgColor: 'bg-green-500'
    }, {
      title: '基础技能培训',
      duration: '1-3个月',
      description: '美发技术基础、服务标准',
      progress: 75,
      color: 'border-blue-500',
      bgColor: 'bg-blue-500'
    }, {
      title: '进阶技能提升',
      duration: '3-6个月',
      description: '高级技术、创意设计',
      progress: 50,
      color: 'border-purple-500',
      bgColor: 'bg-purple-500'
    }, {
      title: '专业技能认证',
      duration: '6-12个月',
      description: '专业技能考核、证书获取',
      progress: 25,
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-500'
    }]
  }, {
    title: '在职员工提升路径',
    paths: [{
      title: '技能评估',
      duration: '1周',
      description: '现有技能水平评估、个性化方案制定',
      progress: 90,
      color: 'border-indigo-500',
      bgColor: 'bg-indigo-500'
    }, {
      title: '针对性培训',
      duration: '2-4周',
      description: '根据评估结果进行专项技能提升',
      progress: 60,
      color: 'border-red-500',
      bgColor: 'bg-red-500'
    }, {
      title: '管理能力培养',
      duration: '3-6个月',
      description: '团队管理、门店运营培训',
      progress: 40,
      color: 'border-teal-500',
      bgColor: 'bg-teal-500'
    }, {
      title: '职业发展规划',
      duration: '长期',
      description: '职业路径规划、持续学习指导',
      progress: 30,
      color: 'border-orange-500',
      bgColor: 'bg-orange-500'
    }]
  }];

  // 价格方案
  const pricingPlans = [{
    id: 'standard',
    name: '标准版',
    price: '3,680',
    description: '适合中小型门店',
    features: ['基础培训课程', '最多20个员工账号', '学习进度跟踪', '基础考试测评', '邮件技术支持'],
    excludedFeatures: ['定制化课程', '线下培训'],
    color: 'border-gray-200',
    buttonColor: 'bg-purple-500 hover:bg-purple-600'
  }, {
    id: 'enterprise',
    name: '企业版',
    price: '6,980',
    description: '适合大型连锁品牌',
    features: ['全部培训课程', '无限员工账号', '高级学习分析', '专业认证考试', '7×24小时技术支持', '定制化课程', '线下培训支持'],
    excludedFeatures: [],
    color: 'from-purple-600 to-violet-600',
    buttonColor: 'bg-white hover:bg-gray-100 text-purple-600',
    recommended: true
  }];

  // 技术特点
  const techFeatures = [{
    icon: Microchip,
    title: '核心技术',
    items: [{
      title: '智能推荐算法',
      description: '基于机器学习的个性化课程推荐，根据员工能力和学习习惯优化学习路径'
    }, {
      title: '学习行为分析',
      description: '深度学习分析学习行为，识别学习难点，提供针对性辅导'
    }, {
      title: '多媒体教学',
      description: '支持视频、音频、图文等多种教学形式，提升学习体验'
    }, {
      title: '移动学习',
      description: '完美适配移动设备，支持随时随地学习'
    }]
  }, {
    icon: ShieldAlt,
    title: '安全保障',
    items: [{
      title: '数据安全',
      description: '采用企业级数据加密，保护员工隐私和学习数据'
    }, {
      title: '内容版权',
      description: '所有课程内容均有合法版权，确保培训质量'
    }, {
      title: '系统稳定',
      description: '高可用架构设计，确保学习平台稳定运行'
    }, {
      title: '备份恢复',
      description: '多重数据备份，保障学习记录不丢失'
    }]
  }];

  // 核心优势
  const advantages = [{
    icon: Brain,
    title: '智能学习',
    description: '基于AI的个性化学习推荐，根据员工特点定制培训内容',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }, {
    icon: TrendingUp,
    title: '效果追踪',
    description: '实时学习进度监控，数据分析培训效果，持续优化',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }, {
    icon: Certificate,
    title: '认证体系',
    description: '完善的技能认证体系，专业证书颁发，提升职业价值',
    color: 'bg-green-100',
    iconColor: 'text-green-600'
  }];

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'courses', 'learning-path', 'pricing', 'technology'];
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
      <TopNavigation currentPage="ai-employee-training-detail" />
      
      {/* 快速导航 */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {['overview', 'courses', 'learning-path', 'pricing', 'technology'].map(section => <button key={section} onClick={() => scrollToSection(section)} className={`text-gray-600 hover:text-purple-600 font-medium whitespace-nowrap transition-colors ${activeSection === section ? 'text-purple-600' : ''}`}>
                {section === 'overview' && '系统概览'}
                {section === 'courses' && '培训课程'}
                {section === 'learning-path' && '学习路径'}
                {section === 'pricing' && '价格信息'}
                {section === 'technology' && '技术特点'}
              </button>)}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-8">
        {/* 系统概览 */}
        <section id="overview" className="mb-20">
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h1 className="text-4xl font-bold">AI员工成长业务培训系统</h1>
                </div>
                <p className="text-xl text-white/90 mb-8 max-w-3xl">
                  基于人工智能技术的智能培训平台，为美发行业提供全方位的员工成长解决方案。
                  个性化学习路径、智能课程推荐、实时学习跟踪，全面提升员工技能和业务水平。
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">个性化学习</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">智能推荐</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">实时跟踪</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                  <Book className="w-24 h-24 text-white/30" />
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

        {/* 培训课程 */}
        <section id="courses" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">培训课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingCourses.map((course, index) => {
            const Icon = course.icon;
            return <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className={`w-12 h-12 ${course.color} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <ul className="space-y-2 mb-4">
                  {course.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>)}
                </ul>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <Signal className="w-4 h-4 mr-1" />
                    {course.level}
                  </span>
                </div>
              </div>;
          })}
          </div>
        </section>

        {/* 学习路径 */}
        <section id="learning-path" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">学习路径</h2>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {learningPaths.map((pathGroup, groupIndex) => <div key={groupIndex}>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{pathGroup.title}</h3>
                  <div className="space-y-4">
                    {pathGroup.paths.map((path, pathIndex) => <div key={pathIndex} className={`bg-white rounded-lg p-4 border-l-4 ${path.color} transform transition-all duration-300 hover:translate-x-2 hover:shadow-lg`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{path.title}</h4>
                          <span className="text-sm text-gray-500">{path.duration}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{path.description}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full transition-all duration-300 ${path.bgColor}`} style={{
                      width: `${path.progress}%`
                    }}></div>
                        </div>
                      </div>)}
                  </div>
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
                  <div className={`text-4xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-purple-600'}`}>¥{plan.price}</div>
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
                  <GroupIcon className="w-6 h-6 text-purple-500 mr-3" />
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
        <section className="text-center bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">开启员工成长新时代</h2>
          <p className="text-xl mb-8 text-white/90">立即体验AI员工成长业务培训系统，提升团队专业能力，增强企业竞争力</p>
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

      <TabBar currentPage="ai-employee-training-detail" />
    </div>;
}