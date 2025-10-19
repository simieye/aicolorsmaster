
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, Robot, History, Bolt, TicketAlt, Store, Building, ShoppingCart, Brain, Language, ChartLine, ShieldAlt, Star, Phone, Calendar, Download, Play, Check, CheckCircle } from 'lucide-react';

export default function AICustomerServiceDetailPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('features');
  
  // 系统核心功能数据
  const coreFeatures = [{
    icon: Robot,
    title: '智能对话',
    description: '基于先进AI技术的智能对话系统，支持多轮对话，理解客户需求，提供精准回复',
    features: ['自然语言处理', '多轮对话支持', '情感识别'],
    color: 'purple'
  }, {
    icon: History,
    title: '历史记录',
    description: '完整的聊天记录管理，支持搜索、筛选、导出，方便客户服务跟踪和分析',
    features: ['对话记录保存', '智能搜索功能', '数据导出'],
    color: 'blue'
  }, {
    icon: Bolt,
    title: '快捷回复',
    description: '预设常用回复模板，支持自定义快捷回复，大幅提升客服响应效率',
    features: ['模板管理', '快速响应', '个性化设置'],
    color: 'green'
  }, {
    icon: TicketAlt,
    title: '工单管理',
    description: '完整的工单管理系统，支持工单创建、分配、跟踪、统计，提升服务质量',
    features: ['工单创建分配', '状态跟踪', '统计分析'],
    color: 'yellow'
  }];
  
  // 使用场景数据
  const useScenarios = [{
    icon: Store,
    title: '单体美发店',
    description: '为小��美发店提供24小时在线客服，解答客户咨询，预约服务，提升客户体验',
    features: ['服务咨询解答', '预约时间安排', '价格查询'],
    color: 'purple'
  }, {
    icon: Building,
    title: '连锁美发店',
    description: '为连锁美发店提供统一的客服管理平台，支持多门店管理，提升品牌形象',
    features: ['多门店统一管理', '品牌标准化服务', '客户数据统一'],
    color: 'blue'
  }, {
    icon: ShoppingCart,
    title: '在线商城',
    description: '为美发产品在线商城提供智能客服，产品咨询，订单处理，售后服务',
    features: ['产品推荐咨询', '订单状态查询', '售后问题处理'],
    color: 'green'
  }];
  
  // 技术优势数据
  const techAdvantages = [{
    icon: Brain,
    title: '深度学习算法',
    description: '基于最新的深度学习技术，持续优化对话质量',
    color: 'purple'
  }, {
    icon: Language,
    title: '多语言支持',
    description: '支持中英文等多种语言，服务全球客户',
    color: 'blue'
  }, {
    icon: ChartLine,
    title: '数据分析',
    description: '智能分析客户数据，提供业务洞察',
    color: 'green'
  }, {
    icon: ShieldAlt,
    title: '数据安全',
    description: '企业级数据加密，保护客户隐私',
    color: 'yellow'
  }];
  
  // 客户案例数据
  const customerCases = [{
    name: '时尚造型美发店',
    rating: 5.0,
    comment: 'AI客服系统让我们的客户服务效率提升了80%，客户满意度显著提高，强烈推荐！',
    author: '张店长',
    duration: '使用6个月',
    avatar: 'salon1'
  }, {
    name: '美丽时光连锁',
    rating: 5.0,
    comment: '多门店统一管理非常方便，AI客服能够处理大部分客户咨询，大大减轻了人工压力。',
    author: '李经理',
    duration: '使用1年',
    avatar: 'salon2'
  }, {
    name: '艺剪工作室',
    rating: 4.8,
    comment: '系统操作简单，功能强大，特别是快捷回复功能，让我们的客服效率提升了很多。',
    author: '王主管',
    duration: '使用3个月',
    avatar: 'salon3'
  }];
  
  // 获取颜色样式
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-200'
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  
  // 处理购买
  const handlePurchase = () => {
    console.log('购买AI客服系统');
    // 这里可以跳转到购买页面或打开购买对话框
  };
  
  // 处理演示
  const handleDemo = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          system: 'ai-customer-service'
        }
      });
    }
  };
  
  // 处理下载
  const handleDownload = () => {
    console.log('下载AI客服系统资料');
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
      {/* 系统概�� */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">智能客服解决方案</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">AI客服系统</h1>
              <p className="text-xl text-white/90 mb-8">
                专为美发行业打造的智能客服解决方案，24小时在线服务，提升客户满意度，降低运营成本
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div>
                  <div className="text-4xl font-bold">¥2,680</div>
                  <div className="text-white/80">一次性购买</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">35%</div>
                  <div className="text-white/80">客户满意度提升</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">80%</div>
                  <div className="text-white/80">响应时间缩短</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
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
                  <HeadphonesIcon className="w-32 h-32 text-white/80" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Robot className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <History className="w-6 h-6 text-white" />
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
              全方位的智能客服功能，满足美发行业的各种服务需求
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
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>)}
                  </ul>
                </CardContent>
              </Card>;
          })}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">使用场景</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              适用于美发行业的多种业务场景，提供定制化的客服解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useScenarios.map((scenario, index) => {
            const colors = getColorClasses(scenario.color);
            const Icon = scenario.icon;
            return <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{scenario.title}</h3>
                  <p className="text-gray-600 mb-6">{scenario.description}</p>
                  <ul className="space-y-3 text-left">
                    {scenario.features.map((item, idx) => <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">技术优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于先进的AI技术，提供稳定可靠的智能客服服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">核心技术</h3>
              <div className="space-y-4">
                {techAdvantages.map((tech, index) => {
                const colors = getColorClasses(tech.color);
                const Icon = tech.icon;
                return <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg border ${colors.border} hover:shadow-md transition-all duration-300 hover:translate-x-2`>
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
                    <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                    <div className="text-gray-600">系统可用性</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">&lt;1s</div>
                    <div className="text-gray-600">响应时间</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-gray-600">识别准确率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">24/7</div>
                    <div className="text-gray-600">在线服务</div>
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
                      <span className="text-gray-600">AI引擎</span>
                      <span className="text-gray-900">GPT + 自研算法</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">数据库</span>
                      <span className="text-gray-900">MongoDB + Redis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 客户案例 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">客户案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              已为众多美发企业提供智能客服解决方案，获得客户一致好评
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">价格方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              透明合理的价格，一次性购买，终身使用
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">AI客服系统</h3>
                <p className="text-white/80">完整功能版本，无隐藏费用</p>
              </div>
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">¥2,680</div>
                <div className="text-white/80 text-lg">一次性购买 • 终身使用</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-semibold mb-3">包含功能</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      智能对话系统
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      历史记录管理
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      快捷回复功能
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      工单管理系统
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
                      在线培训指导
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      免费系统升级
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">准备开始使用AI客服系统？</h2>
            <p className="text-xl mb-8 text-white/80">
              专业团队为您提供一对一咨询服务，解答所有疑问
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={handleConsultation} className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
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
