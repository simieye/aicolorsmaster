
import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  HeadphonesIcon, 
  Calendar, 
  GraduationCap, 
  ShoppingBag, 
  Check, 
  X, 
  Star, 
  Users, 
  Clock,
  Award,
  TrendingUp,
  ArrowRight,
  Phone,
  MessageCircle,
  Play
} from 'lucide-react';

export default function ProductsPage(props) {
  const { $w } = props;
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const aiSystems = [
    {
      id: 'customer-service',
      name: 'AI客服系统',
      description: '智能客服解决方案，24小时在线服务，提升客户满意度和转化率',
      icon: HeadphonesIcon,
      price: 2680,
      color: 'purple',
      badge: '热门产品',
      features: [
        { icon: 'robot', title: '智能对话', description: '自然语言处理，理解客户需求' },
        { icon: 'clock', title: '24小时服务', description: '全天候在线，随时响应客户' },
        { icon: 'language', title: '多语言支持', description: '支持中英文等多种语言' },
        { icon: 'chart-line', title: '数据分析', description: '客户行为分析，优化服务策略' }
      ],
      scenarios: [
        { icon: 'store', title: '门店咨询', description: '产品介绍、价格咨询' },
        { icon: 'calendar-check', title: '预约服务', description: '在线预约、时间安排' },
        { icon: 'headset', title: '售后支持', description: '问题解答、投诉处理' }
      ],
      benefits: [
        '提升客户满意度30%',
        '降低人工成本40%',
        '提高服务效率50%',
        '7x24小时不间断服务'
      ]
    },
    {
      id: 'appointment-system',
      name: 'AI客户预约系统',
      description: '智能预约管理，优化时间安排，提升客户体验和运营效率',
      icon: Calendar,
      price: 2680,
      color: 'blue',
      badge: '推荐产品',
      features: [
        { icon: 'calendar', title: '智能排班', description: '自动优化时间安排，避免冲突' },
        { icon: 'bell', title: '智能提醒', description: '自动发送预约提醒，减少爽约' },
        { icon: 'users', title: '客户管理', description: '客户信息管理，偏好记录' },
        { icon: 'chart-bar', title: '数据分析', description: '预约数据统计，业务洞察' }
      ],
      scenarios: [
        { icon: 'cut', title: '美发沙龙', description: '发型设计、染发预约' },
        { icon: 'spa', title: '美容院', description: '美容护理、SPA预约' },
        { icon: 'user-tie', title: '造型工作室', description: '个人造型、形象设计' }
      ],
      benefits: [
        '减少预约冲突80%',
        '提高客户到店率25%',
        '节省排班时间60%',
        '提升运营效率35%'
      ]
    },
    {
      id: 'employee-training',
      name: 'AI员工成长业务培训系统',
      description: '智能培训平台，个性化学习路径，提升员工技能和业务水平',
      icon: GraduationCap,
      price: 3680,
      color: 'green',
      badge: '新品上市',
      features: [
        { icon: 'brain', title: '智能推荐', description: 'AI推荐个性化学习内容' },
        { icon: 'chart-line', title: '进度跟踪', description: '实时监控学习进度和效果' },
        { icon: 'certificate', title: '证书管理', description: '自动颁发培训证书' },
        { icon: 'clipboard-check', title: '考试测评', description: '在线考试，自动评分' }
      ],
      scenarios: [
        { icon: 'user-plus', title: '新员工培训', description: '入职培训，快速上手' },
        { icon: 'tools', title: '技能提升', description: '技术培训，专业提升' },
        { icon: 'users-cog', title: '管理培训', description: '管理技能，领导力培养' }
      ],
      benefits: [
        '提升培训效果40%',
        '降低培训成本30%',
        '缩短培训周期50%',
        '提高员工留存率25%'
      ]
    },
    {
      id: 'micro-store',
      name: 'AI微店开店通商城系统',
      description: '一站式电商解决方案，智能店铺管理，助力线上业务快速增长',
      icon: ShoppingBag,
      price: 4980,
      color: 'orange',
      badge: '爆款产品',
      features: [
        { icon: 'box', title: '商品管理', description: '智能商品管理，库存预警' },
        { icon: 'shopping-cart', title: '订单处理', description: '自动化订单处理，物流跟踪' },
        { icon: 'bullhorn', title: '营销工具', description: '优惠券、促销活动管理' },
        { icon: 'chart-pie', title: '数据分析', description: '销售数据，用户行为分析' }
      ],
      scenarios: [
        { icon: 'store', title: '美发产品店', description: '美发用品、设备销售' },
        { icon: 'mobile-alt', title: '移动电商', description: '手机端商城，便捷购物' },
        { icon: 'link', title: '多店管理', description: '连锁店统一管理' }
      ],
      benefits: [
        '提升销售额60%',
        '降低运营成本35%',
        '提高转化率45%',
        '增强客户粘性30%'
      ]
    }
  ];

  const getIconComponent = (iconName) => {
    const iconMap = {
      'robot': () => <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"><span className="text-purple-600 text-xs">🤖</span></div>,
      'clock': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><Clock className="w-4 h-4 text-blue-600" /></div>,
      'language': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">🌐</span></div>,
      'chart-line': () => <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center"><TrendingUp className="w-4 h-4 text-yellow-600" /></div>,
      'calendar': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><Calendar className="w-4 h-4 text-blue-600" /></div>,
      'bell': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">🔔</span></div>,
      'users': () => <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"><Users className="w-4 h-4 text-purple-600" /></div>,
      'chart-bar': () => <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center"><span className="text-yellow-600 text-xs">📊</span></div>,
      'brain': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">🧠</span></div>,
      'certificate': () => <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"><Award className="w-4 h-4 text-purple-600" /></div>,
      'clipboard-check': () => <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center"><span className="text-yellow-600 text-xs">📋</span></div>,
      'box': () => <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center"><span className="text-orange-600 text-xs">📦</span></div>,
      'shopping-cart': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-blue-600" /></div>,
      'bullhorn': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">📢</span></div>,
      'chart-pie': () => <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"><span className="text-purple-600 text-xs">🥧</span></div>,
      'store': () => <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center"><span className="text-orange-600 text-xs">🏪</span></div>,
      'calendar-check': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><span className="text-blue-600 text-xs">📅</span></div>,
      'headset': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><HeadphonesIcon className="w-4 h-4 text-green-600" /></div>,
      'cut': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><span className="text-blue-600 text-xs">✂️</span></div>,
      'spa': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">💆</span></div>,
      'user-tie': () => <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"><span className="text-purple-600 text-xs">👔</span></div>,
      'user-plus': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">👤</span></div>,
      'tools': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><span className="text-blue-600 text-xs">🔧</span></div>,
      'users-cog': () => <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center"><span className="text-purple-600 text-xs">⚙️</span></div>,
      'mobile-alt': () => <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><span className="text-blue-600 text-xs">📱</span></div>,
      'link': () => <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center"><span className="text-green-600 text-xs">🔗</span></div>
    };
    return iconMap[iconName] || (() => <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center"><span className="text-gray-600 text-xs">❓</span></div>);
  };

  const getScenarioIcon = (iconName) => {
    const iconMap = {
      'store': () => <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-600 text-lg">🏪</span></div>,
      'calendar-check': () => <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 text-lg">📅</span></div>,
      'headset': () => <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><HeadphonesIcon className="w-6 h-6 text-green-600" /></div>,
      'cut': () => <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 text-lg">✂️</span></div>,
      'spa': () => <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 text-lg">💆</span></div>,
      'user-tie': () => <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-600 text-lg">👔</span></div>,
      'user-plus': () => <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 text-lg">👤</span></div>,
      'tools': () => <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 text-lg">🔧</span></div>,
      'users-cog': () => <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-600 text-lg">⚙️</span></div>,
      'mobile-alt': () => <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 text-lg">📱</span></div>,
      'link': () => <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><span className="text-green-600 text-lg">🔗</span></div>
    };
    return iconMap[iconName] || (() => <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"><span className="text-gray-600 text-lg">❓</span></div>);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: 'from-purple-600 to-blue-600',
        light: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-700'
      },
      blue: {
        bg: 'from-blue-600 to-cyan-600',
        light: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700'
      },
      green: {
        bg: 'from-green-600 to-teal-600',
        light: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-700'
      },
      orange: {
        bg: 'from-orange-600 to-red-600',
        light: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  const handleSystemClick = (system) => {
    setSelectedSystem(system);
    setActiveTab('overview');
  };

  const handlePurchase = (system) => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'checkout',
        params: { system: system.id, price: system.price }
      });
    }
  };

  const handleDemo = (system) => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: { system: system.id }
      });
    }
  };

  const handleConsultation = () => {
    if ($w?.utils?.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'online-consultation'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI智能系统产品中心</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              为美发行业量身定制的AI智能解决方案，助力门店数字化转型，提升运营效率和服务质量
            </p>
          </div>
        </div>
      </section>

      {/* 系统列表 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aiSystems.map((system) => {
              const Icon = system.icon;
              const colors = getColorClasses(system.color);
              
              return (
                <div
                  key={system.id}
                  onClick={() => handleSystemClick(system)}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 ${colors.light} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    {system.badge && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                        {system.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{system.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">¥{system.price}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 系统详情 */}
          {selectedSystem && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 详情内容 */}
                <div className="lg:col-span-2 p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 ${getColorClasses(selectedSystem.color).light} rounded-xl flex items-center justify-center`}>
                      <selectedSystem.icon className={`w-8 h-8 ${getColorClasses(selectedSystem.color).text}`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{selectedSystem.name}</h2>
                      <p className="text-gray-600">{selectedSystem.description}</p>
                    </div>
                  </div>

                  {/* 标签切换 */}
                  <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
                    {['overview', 'features', 'scenarios', 'benefits'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab === 'overview' && '概览'}
                        {tab === 'features' && '功能特点'}
                        {tab === 'scenarios' && '使用场景'}
                        {tab === 'benefits' && '核心优势'}
                      </button>
                    ))}
                  </div>

                  {/* 内容区域 */}
                  <div className="min-h-[400px]">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">产品介绍</h3>
                          <p className="text-gray-600 leading-relaxed">
                            {selectedSystem.description}该系统采用先进的AI技术，为美发行业提供全方位的智能化解决方案。
                            通过深度学习和大数据分析，系统能够精准理解用户需求，提供个性化的服务体验。
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">技术优势</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                              <Star className="w-5 h-5 text-yellow-500 mt-1" />
                              <div>
                                <h4 className="font-medium text-gray-900">AI驱动</h4>
                                <p className="text-sm text-gray-600">基于深度学习的智能算法</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Star className="w-5 h-5 text-yellow-500 mt-1" />
                              <div>
                                <h4 className="font-medium text-gray-900">云端部署</h4>
                                <p className="text-sm text-gray-600">SaaS模式，无需本地部署</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Star className="w-5 h-5 text-yellow-500 mt-1" />
                              <div>
                                <h4 className="font-medium text-gray-900">数据安全</h4>
                                <p className="text-sm text-gray-600">企业级安全保障</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Star className="w-5 h-5 text-yellow-500 mt-1" />
                              <div>
                                <h4 className="font-medium text-gray-900">持续更新</h4>
                                <p className="text-sm text-gray-600">定期功能升级和优化</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">核心功能特点</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedSystem.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              {getIconComponent(feature.icon)}
                              <div>
                                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'scenarios' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">适用场景</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {selectedSystem.scenarios.map((scenario, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              {getScenarioIcon(scenario.icon)}
                              <h4 className="font-medium text-gray-900 mt-3 mb-1">{scenario.title}</h4>
                              <p className="text-sm text-gray-600">{scenario.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'benefits' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">核心优势</h3>
                        <div className="space-y-4">
                          {selectedSystem.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                              <Check className="w-6 h-6 text-green-600" />
                              <span className="text-gray-900 font-medium">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 价格和操作 */}
                <div className="lg:col-span-1">
                  <div className={`bg-gradient-to-br ${getColorClasses(selectedSystem.color).bg} p-8 text-white h-full`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">价格方案</h3>
                      <div className="text-5xl font-bold mb-2">¥{selectedSystem.price}</div>
                      <p className="text-white/80">一次性购买，永久使用</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
