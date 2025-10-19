
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Calendar, Users, ConciergeBell, ChartLine, Smartphone, Search, CheckCircle, Bell, Brain, Cloud, Bell as BellIcon, BarChart3, Star, Phone, Calendar as CalendarIcon, Download, Play, Check, CheckCircle as CheckCircleIcon } from 'lucide-react';

export default function AIAppointmentSystemDetailPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('features');
  
  // 系统核心功能数据
  const coreFeatures = [{
    icon: Calendar,
    title: '预约日历',
    description: '可视化日历界面，直观展示预约安排，支持拖拽调整，智能时间冲突检测',
    features: ['可视化日历', '时间管理', '冲突检测'],
    color: 'blue'
  }, {
    icon: Users,
    title: '客户管理',
    description: '完整的客户档案管理，历史预约记录，偏好设置，个性化服务体验',
    features: ['客户档案', '历史记录', '偏好设置'],
    color: 'green'
  }, {
    icon: ConciergeBell,
    title: '服务管理',
    description: '服务项目分类管理，价格设置，时长配置，技师分配，服务标准化',
    features: ['服务分类', '价格设置', '技师分配'],
    color: 'purple'
  }, {
    icon: ChartLine,
    title: '数据分析',
    description: '预约数据统计分析，收入趋势，客户行为分析，经营决策支持',
    features: ['预约统计', '收入分析', '客户洞察'],
    color: 'yellow'
  }];
  
  // 预约流程数据
  const appointmentProcess = [{
    icon: Smartphone,
    title: '1. 客户选择',
    description: '客户通过手机或网页选择服务项目和期望时间',
    highlight: '多渠道接入',
    color: 'blue'
  }, {
    icon: Search,
    title: '2. 智能匹配',
    description: '系统智能匹配可用技师和时间，自动检测冲突',
    highlight: 'AI智能推荐',
    color: 'green'
  }, {
    icon: CheckCircle,
    title: '3. 确认预约',
    description: '客户确认预约信息，支付定金（可选）',
    highlight: '即时确认',
    color: 'purple'
  }, {
    icon: Bell,
    title: '4. 自动提醒',
    description: '系统自动发送预约提醒，减少爽约率',
    highlight: '智能提醒',
    color: 'yellow'
  }];
  
  // 使用场景数据
  const useScenarios = [{
    icon: Calendar,
    title: '单体美发店',
    description: '为小型美发店提供简单易用的预约管理，提升客户预约体验',
    features: ['简单操作界面', '快速预约流程', '客户关系维护'],
    color: 'blue'
  }, {
    icon: Users,
    title: '连锁美发店',
    description: '为连锁美发店提供多店统一管理，技师调度，客户分流',
    features: ['多店统一管理', '技师智能调度', '客户分流管理'],
    color: 'green'
  }, {
    icon: Smartphone,
    title: '在线预约平台',
    description: '为在线预约平台提供API接口，支持第三方系统集成',
    features: ['API接口支持', '第三方集成', '数据同步'],
    color: 'purple'
  }];
  
  // 技术优势数据
  const techAdvantages = [{
    icon: Brain,
    title: '智能排班算法',
    description: '基于AI的智能排班，优化技师时间分配',
    color: 'blue'
  }, {
    icon: Cloud,
    title: '云端同步',
    description: '多端实时同步，随时随地管理预约',
    color: 'green'
  }, {
    icon: BellIcon,
    title: '自动提醒系统',
    description: '智能提醒机制，有效减少爽约率',
    color: 'purple'
  }, {
    icon: BarChart3,
    title: '数据分析引擎',
    description: '深度分析预约数据，提供经营洞察',
    color: 'yellow'
  }];
  
  // 客户案例数据
  const customerCases = [{
    name: '时尚造型美发店',
    rating: 5.0,
    comment: 'AI预约系统让我们的预约效率提升了60%，客户满意度达到92%，爽约率大幅降低！',
    author: '刘店长',
    duration: '使用8个月',
    avatar: 'salon4'
  }, {
    name: '美丽时光连锁',
    rating: 5.0,
    comment: '多店统一管理非常方便，技师调度智能化，大大提升了我们的运营效率。',
    author: '陈经理',
    duration: '使用1年',
    avatar: 'salon5'
  }, {
    name: '艺剪工作室',
    rating: 4.8,
    comment: '系统操作简单，客户反馈很好，特别是自动提醒功能，减少了我们的工作量。',
    author: '赵主管',
    duration: '使用6个月',
    avatar: 'salon6'
  }];
  
  // 获取颜色样式
  const getColorClasses = color => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        light: 'bg-blue-50'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        light: 'bg-green-50'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        light: 'bg-purple-50'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-200',
        light: 'bg-yellow-50'
      }
    };
    return colorMap[color] || colorMap.blue;
  };
  
  // 处理购买
  const handlePurchase = () => {
    console.log('购买AI客户预约系统');
    // 这里可以跳转到购买页面或打开购买对话框
  };
  
  // 处理演示
  const handleDemo = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          system: 'ai-appointment-system'
        }
      });
    }
  };
  
  // 处理下载
  const handleDownload = () => {
    console.log('下载AI客户预约系统资料');
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">智能预约管理解决方案</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">AI客户预约系统</h1>
              <p className="text-xl text-white/90 mb-8">
                专为美发行业打造的智能预约管理系统，优化时间安排，提升客户体验，减少爽约率
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div>
                  <div className="text-4xl font-bold">¥2,680</div>
                  <div className="text-white/80">一次性购买</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">60%</div>
                  <div className="text-white/80">预约效率提升</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">92%</div>
                  <div className="text-white/80">客户满意度</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
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
                  <Calendar className="w-32 h-32 text-white/80" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
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
              全方位的预约管理功能，满足美发行业的各种预约需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const Icon = feature.icon;
            return <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {feature.features.map((item, idx) => <li key={idx} className="flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>)}
                  </ul>
                </CardContent>
              </Card>;
          })}
          </div>
        </div>
      </section>

      {/* 预约流程 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">智能预约流程</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              简化预约流程，提升客户体验，减少人工操作
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {appointmentProcess.map((step, index) => {
            const colors = getColorClasses(step.color);
            const Icon = step.icon;
            return <div key={index} className="text-center hover:scale-105 transition-all duration-300">
                  <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className={`${colors.light} rounded-lg p-3`}>
                    <span className={`text-sm ${colors.text}`}>{step.highlight}</span>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">使用场景</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              适用于美发行业的多种业务场景，提供定制化的预约解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useScenarios.map((scenario, index) => {
            const colors = getColorClasses(scenario.color);
            const Icon = scenario.icon;
            return <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{scenario.title}</h3>
                  <p className="text-gray-600 mb-6">{scenario.description}</p>
                  <ul className="space-y-3 text-left">
                    {scenario.features.map((item, idx) => <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>)}
                  </ul>
                </CardContent>
              </Card>;
          })}
          </div>
        </div>
      </section>

      {/* 技术优势 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">技术优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于先进的AI技术，提供稳定可靠的预约管理服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">核心技术</h3>
              <div className="space-y-4">
                {techAdvantages.map((tech, index) => {
                const colors = getColorClasses(tech.color);
                const Icon = tech.icon;
                return <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border ${colors.border} hover:shadow-md transition-all duration-300 hover:translate-x-2`}>
                    <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{tech.title}</h4>
                      <p className="text-gray-600">{tech.description}</p>
                    </div>
                  </div>;
              })}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">性能指标</h3>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                   