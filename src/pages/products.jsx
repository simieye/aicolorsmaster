// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { HeadphonesIcon, Calendar, GraduationCap, ShoppingBag, Robot, History, Bolt, TicketAlt, Users, ConciergeBell, ChartLine, Book, FolderOpen, ClipboardCheck, Store, Box, ShoppingCart, Bullhorn, CheckCircle, Star, Phone, MessageSquare, Download, Play } from 'lucide-react';

export default function ProductsPage(props) {
  const {
    $w
  } = props;
  const [selectedSystem, setSelectedSystem] = useState(null);
  const aiSystems = [{
    id: 'customer-service',
    name: 'AI客服系统',
    price: '2680',
    description: '智能客服对话，提升客户满意度',
    icon: HeadphonesIcon,
    color: 'purple',
    features: [{
      icon: Robot,
      title: '智能对话',
      description: 'AI智能回复，多轮对话支持'
    }, {
      icon: History,
      title: '历史记录',
      description: '聊天记录保存，搜索功能'
    }, {
      icon: Bolt,
      title: '快捷回复',
      description: '预设回复模板，快速响应'
    }, {
      icon: TicketAlt,
      title: '工单管理',
      description: '工单创建、分配、跟踪'
    }],
    advantages: ['24小时智能客服，无需人工值守', '多渠道接入，统一管理', '智能学习，持续优化回复质量', '数据分析，客户洞察', '支持多语言，服务全球客户'],
    stats: [{
      label: '客户满意度提升',
      value: '35%'
    }, {
      label: '响应时间缩短',
      value: '80%'
    }, {
      label: '运营成本降低',
      value: '45%'
    }]
  }, {
    id: 'appointment-system',
    name: 'AI客户预约系统',
    price: '2680',
    description: '智能预约管理，优化客户体验',
    icon: Calendar,
    color: 'blue',
    features: [{
      icon: Calendar,
      title: '预约日历',
      description: '可视化日历，时间管理'
    }, {
      icon: Users,
      title: '客户管理',
      description: '客户档案，历史记录'
    }, {
      icon: ConciergeBell,
      title: '服务管理',
      description: '服务分类，价格设置'
    }, {
      icon: ChartLine,
      title: '数据分析',
      description: '预约统计，收入分析'
    }],
    advantages: ['智能排班，避免时间冲突', '自动提醒，减少爽约率', '多端同步，随时随地管理', '客户自助预约，减轻工作量', '数据报表，经营决策支持'],
    stats: [{
      label: '预约效率提升',
      value: '60%'
    }, {
      label: '客户满意度',
      value: '92%'
    }, {
      label: '时间利用率',
      value: '85%'
    }]
  }, {
    id: 'employee-training',
    name: 'AI员工成长业务培训系统',
    price: '3680',
    description: '智能培训管理，提升员工技能',
    icon: GraduationCap,
    color: 'green',
    features: [{
      icon: Book,
      title: '课程管理',
      description: '课程创建，分类管理'
    }, {
      icon: GraduationCap,
      title: '学习中心',
      description: '进度跟踪，学习统计'
    }, {
      icon: FolderOpen,
      title: '培训资料',
      description: '资料管理，下载功能'
    }, {
      icon: ClipboardCheck,
      title: '考试测评',
      description: '在线考试，成绩统计'
    }],
    advantages: ['个性化学习路径推荐', '多媒体教学内容支持', '智能学习进度跟踪', '证书自动颁发系统', '培训效果数据分析'],
    stats: [{
      label: '培训完成率',
      value: '78%'
    }, {
      label: '技能提升效果',
      value: '65%'
    }, {
      label: '培训成本降低',
      value: '40%'
    }]
  }, {
    id: 'micro-store',
    name: 'AI微店开店通商城系统',
    price: '4980',
    description: '一站式电商解决方案，轻松开店',
    icon: ShoppingBag,
    color: 'yellow',
    features: [{
      icon: Store,
      title: '店铺设置',
      description: '店铺装修，支付配置'
    }, {
      icon: Box,
      title: '商品管理',
      description: '商品上架，库存管理'
    }, {
      icon: ShoppingCart,
      title: '订单处理',
      description: '订单管理，发货跟踪'
    }, {
      icon: Bullhorn,
      title: '营销活动',
      description: '优惠券，促销活动'
    }],
    advantages: ['零门槛开店，快速上线', '多渠道支付，安全便捷', '智能营销，提升销量', '数据分析，精准运营', '移动端适配，随时随地'],
    stats: [{
      label: '开店成功率',
      value: '95%'
    }, {
      label: '平均月收入',
      value: '¥8,500'
    }, {
      label: '运营成本',
      value: '降低50%'
    }]
  }];
  const handlePurchase = systemId => {
    // 跳转到购买页面或打开购买对话框
    console.log('购买系统:', systemId);
  };
  const handleDemo = systemId => {
    // 跳转到演示页面
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          system: systemId
        }
      });
    }
  };
  const handleDownload = systemId => {
    // 下载产品资料
    console.log('下载资料:', systemId);
  };
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        light: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-600',
        gradient: 'from-purple-600 to-blue-600'
      },
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        light: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-600',
        gradient: 'from-blue-600 to-cyan-600'
      },
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        light: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-600',
        gradient: 'from-green-600 to-emerald-600'
      },
      yellow: {
        bg: 'bg-yellow-600',
        hover: 'hover:bg-yellow-700',
        light: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-600',
        gradient: 'from-yellow-600 to-orange-600'
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI智能系统产品中心
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专为美发行业打造的智能化解决方案，助力门店数字化转型，提升运营效率
          </p>
        </div>
      </section>

      {/* 系统展示 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {aiSystems.map((system, index) => {
        const colors = getColorClasses(system.color);
        const Icon = system.icon;
        return <section key={system.id} className="mb-20">
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* 系统头部 */}
                <div className={`bg-gradient-to-r ${colors.gradient} p-8 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{system.name}</h2>
                      <p className="text-white/80 text-lg">{system.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold">¥{system.price}</div>
                      <div className="text-white/80">一次性购买</div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 核心功能 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">核心功能</h3>
                      <div className="space-y-3">
                        {system.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className={`w-8 h-8 ${colors.light} rounded-full flex items-center justify-center`}>
                                <FeatureIcon className={`w-4 h-4 ${colors.text}`} />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{feature.title}</div>
                                <div className="text-sm text-gray-600">{feature.description}</div>
                              </div>
                            </div>;
                    })}
                      </div>
                    </div>
                    
                    {/* 产品优势 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">产品优势</h3>
                      <div className="space-y-3 mb-6">
                        {system.advantages.map((advantage, idx) => <div key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{advantage}</span>
                          </div>)}
                      </div>
                      
                      {/* 数据统计 */}
                      <div className={`p-4 ${colors.light} rounded-lg`}>
                        {system.stats.map((stat, idx) => <div key={idx} className="flex items-center justify-between mb-2 last:mb-0">
                            <span className="text-sm text-gray-600">{stat.label}</span>
                            <span className={`text-sm font-semibold ${colors.text}`}>{stat.value}</span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex items-center space-x-4 mt-8">
                    <Button onClick={() => handlePurchase(system.id)} className={`flex-1 ${colors.bg} ${colors.hover} text-white`}>
                      立即购买
                    </Button>
                    <Button onClick={() => handleDemo(system.id)} variant="outline" className={`flex-1 border-2 ${colors.border} ${colors.text} hover:${colors.light}`}>
                      <Play className="w-4 h-4 mr-2" />
                      在线演示
                    </Button>
                    <Button onClick={() => handleDownload(system.id)} variant="outline" className={`px-6 py-3 border-2 ${colors.border} ${colors.text} hover:${colors.light}`}>
                      <Download className="w-4 h-4 mr-2" />
                      下载资料
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>;
      })}

        {/* 价格对比 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">选择适合您的方案</h2>
            <p className="text-xl text-gray-600">不同系统满足不同需求，灵活组合使用</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiSystems.map(system => {
            const colors = getColorClasses(system.color);
            const Icon = system.icon;
            const isRecommended = system.id === 'micro-store';
            return <Card key={system.id} className={`hover:shadow-xl transition-shadow duration-300 ${isRecommended ? 'border-2 border-purple-500 relative' : 'border-2 border-gray-200'}`}>
                  {isRecommended && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                      推荐
                    </div>}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <Icon className={`w-12 h-12 ${colors.text} mx-auto mb-3`} />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.name}</h3>
                      <div className={`text-3xl font-bold ${colors.text}`}>¥{system.price}</div>
                      <div className="text-gray-600 text-sm">一次性购买</div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {system.features.slice(0, 4).map((feature, idx) => <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature.title}
                        </li>)}
                    </ul>
                    <Button onClick={() => handlePurchase(system.id)} className={`w-full ${colors.bg} ${colors.hover} text-white`}>
                      选择此方案
                    </Button>
                  </CardContent>
                </Card>;
          })}
          </div>
        </section>

        {/* 联系咨询 */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">需要帮助选择合适的系统？</h2>
          <p className="text-xl mb-8 text-white/80">我们的专业顾问为您提供一对一咨询服务</p>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              <Phone className="w-4 h-4 mr-2" />
              免费咨询
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              <Calendar className="w-4 h-4 mr-2" />
              预约演示
            </Button>
          </div>
        </section>
      </div>
    </div>;
}