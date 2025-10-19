// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Bot, MessageSquare, Settings, History, Star, Zap, Users, HeadphonesIcon, Calendar, GraduationCap, Briefcase, Menu, X, ChevronRight, Clock, TrendingUp, Award, Target } from 'lucide-react';

// @ts-ignore;
import { SystemSwitcher } from '@/components/SystemSwitcher';
// @ts-ignore;
import { ChatInterface } from '@/components/ChatInterface';
// @ts-ignore;
import { AssistantSettings } from '@/components/AssistantSettings';
export default function AIChatPage(props) {
  const {
    $w
  } = props;
  const [activeSystem, setActiveSystem] = useState('customer-service');
  const [messages, setMessages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    notifications: true,
    autoResponse: true,
    language: 'zh-CN',
    theme: 'light',
    privacy: true,
    smartSwitch: true,
    taskPriority: true,
    dataSync: true
  });

  // 系统信息
  const systemInfo = {
    'customer-service': {
      name: 'AI客服系统',
      description: '24小时智能客服，自动回复，提升客户满意度',
      icon: HeadphonesIcon,
      color: 'purple',
      features: ['智能对话', '自动回复', '多语言支持', '数据分析'],
      stats: {
        satisfaction: '98%',
        responseTime: '&lt;2秒',
        dailyChats: '10万+'
      },
      price: '¥1,680'
    },
    'appointment': {
      name: 'AI预约系统',
      description: '智能预约管理，自动提醒，提升预约效率',
      icon: Calendar,
      color: 'blue',
      features: ['智能排班', '自动提醒', '客户管理', '数据分析'],
      stats: {
        efficiency: '85%',
        noShow: '&lt;5%',
        dailyBookings: '5000+'
      },
      price: '¥1,680'
    },
    'training': {
      name: 'AI培训系统',
      description: '个性化培训方案，提升员工技能，降低培训成本',
      icon: GraduationCap,
      color: 'green',
      features: ['个性化学习', '进度跟踪', '考试测评', '证书颁发'],
      stats: {
        completion: '92%',
        skillImprovement: '76%',
        costReduction: '60%'
      },
      price: '¥3,680'
    },
    'recruitment': {
      name: 'AI招聘系统',
      description: '智能招聘代理，自动筛选简历，精准匹配人才',
      icon: Briefcase,
      color: 'indigo',
      features: ['简历筛选', '智能匹配', '面试安排', '人才库管理'],
      stats: {
        matchRate: '89%',
        timeToHire: '-65%',
        qualityScore: '4.8/5'
      },
      price: '¥2,680'
    }
  };
  const currentSystem = systemInfo[activeSystem];

  // 处理消息发送
  const handleSendMessage = message => {
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      system: activeSystem
    };
    setMessages(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(message, activeSystem),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        system: activeSystem
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // 获取AI回复
  const getAIResponse = (message, system) => {
    const responses = {
      'customer-service': '感谢您的咨询！我已经收到您的问题，正在为您查找相关信息。作为AI客服系统，我可以为您提供24小时不间断的服务，包括产品咨询、技术支持、售后服务等。',
      'appointment': '好的，我来帮您安排预约。请告诉我您希望的时间和具体服务项目。AI预约系统可以智能分析您的时间偏好，自动安排最合适的预约时间。',
      'training': '很好的问题！我来为您提供专业的培训指导和建议。AI培训系统会根据您的学习进度和能力水平，为您制定个性化的学习计划。',
      'recruitment': '我理解您的招聘需求，让我来帮您找到最合适的人才。AI招聘系统可以自动筛选简历，进行智能匹配，大大提高招聘效率。'
    };
    return responses[system] || '我正在处理您的请求，请稍候...';
  };

  // 处理设置变更
  const handleSettingsChange = newSettings => {
    setSettings(newSettings);
  };

  // 处理系统切换
  const handleSystemChange = systemId => {
    setActiveSystem(systemId);
    setMessages([]); // 清空消息历史
  };

  // 获取聊天历史
  const getChatHistory = () => {
    const history = [{
      id: 1,
      title: '客服咨询',
      preview: '关于产品价格的咨询...',
      time: '2分钟前',
      system: 'customer-service',
      unread: 2
    }, {
      id: 2,
      title: '预约服务',
      preview: '明天下午的预约安排...',
      time: '1小时前',
      system: 'appointment',
      unread: 0
    }, {
      id: 3,
      title: '培训问题',
      preview: '新员工培训计划制定...',
      time: '昨天',
      system: 'training',
      unread: 1
    }, {
      id: 4,
      title: '招聘需求',
      preview: '前端工程师岗位招聘...',
      time: '2天前',
      system: 'recruitment',
      unread: 0
    }];
    return history;
  };

  // 获取系统统计
  const getSystemStats = () => {
    return {
      totalUsers: '50,000+',
      totalMessages: '1,000万+',
      satisfactionRate: '98%',
      activeSystems: 4,
      dailyActive: '10,000+'
    };
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">多任务全能AI助手</h1>
                  <p className="text-sm text-gray-500">智能客服 • 预约管理 • 员工培训 • 人才招聘</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <SystemSwitcher activeSystem={activeSystem} onSystemChange={handleSystemChange} />
              <Button variant="ghost" onClick={() => setShowSettings(!showSettings)} className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                设置
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* 侧边栏 */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-80 bg-white border-r border-gray-200`}>
          <div className="p-6 h-full overflow-y-auto">
            {/* 当前系统信息 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 bg-${currentSystem.color}-100 rounded-full flex items-center justify-center mr-3`}>
                    <currentSystem.icon className={`w-6 h-6 text-${currentSystem.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{currentSystem.name}</h3>
                    <p className="text-sm text-gray-500">{currentSystem.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {Object.entries(currentSystem.stats).map(([key, value]) => <div key={key} className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-xs text-gray-500">{key === 'satisfaction' ? '满意度' : key === 'responseTime' ? '响应时间' : key === 'dailyChats' ? '日咨询量' : key === 'efficiency' ? '效率提升' : key === 'noShow' ? '爽约率' : key === 'dailyBookings' ? '日预约量' : key === 'completion' ? '完成率' : key === 'skillImprovement' ? '技能提升' : key === 'costReduction' ? '成本降低' : key === 'matchRate' ? '匹配率' : key === 'timeToHire' ? '招聘周期' : '质量评分'}</div>
                      <div className="text-sm font-semibold text-gray-900">{value}</div>
                    </div>)}
                </div>
                
                <div className="space-y-2">
                  {currentSystem.features.map((feature, index) => <div key={index} className="flex items-center text-sm text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 mr-2" />
                      {feature}
                    </div>)}
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">系统价格</span>
                    <span className="text-sm font-semibold text-green-600">{currentSystem.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 快速操作 */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">快速操作</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50 hover:border-blue-300" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
                pageId: 'products'
              })}>
                  <Star className="w-4 h-4 mr-2" />
                  查看所有系统
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-green-50 hover:border-green-300" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
                pageId: 'system-demo'
              })}>
                  <Zap className="w-4 h-4 mr-2" />
                  系统演示
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-purple-50 hover:border-purple-300" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
                pageId: 'online-consultation'
              })}>
                  <Users className="w-4 h-4 mr-2" />
                  联系客服
                </Button>
              </div>
            </div>

            {/* 聊天历史 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">聊天历史</h4>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  查看全部
                </Button>
              </div>
              <div className="space-y-2">
                {getChatHistory().map(chat => {
                const system = systemInfo[chat.system];
                const Icon = system.icon;
                return <div key={chat.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 bg-${system.color}-100 rounded-full flex items-center justify-center mr-2`}>
                          <Icon className={`w-3 h-3 text-${system.color}-600`} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{chat.title}</span>
                      </div>
                      <div className="flex items-center">
                        {chat.unread > 0 && <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>}
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate ml-8">{chat.preview}</p>
                  </div>;
              })}
              </div>
            </div>

            {/* 系统统计 */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">系统统计</h4>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(getSystemStats()).map(([key, value]) => <div key={key} className="text-center">
                      <div className="text-lg font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-600">{key === 'totalUsers' ? '总用户' : key === 'totalMessages' ? '总消息' : key === 'satisfactionRate' ? '满意度' : key === 'activeSystems' ? '活跃系统' : '日活跃'}</div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 flex">
          {showSettings ? <div className="w-full max-w-4xl mx-auto p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI助手设置</h2>
                <p className="text-gray-600">自定义您的AI助手体验，优化工作效率</p>
              </div>
              <AssistantSettings settings={settings} onSettingsChange={handleSettingsChange} />
              
              {/* 系统集成设置 */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">系统集成设置</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(systemInfo).map(system => {
                const Icon = system.icon;
                return <Card key={system.name} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 bg-${system.color}-100 rounded-full flex items-center justify-center mr-3`}>
                            <Icon className={`w-5 h-5 text-${system.color}-600`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{system.name}</h4>
                            <p className="text-sm text-gray-500">{system.price}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">启用系统</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">自动切换</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">数据同步</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </label>
                        </div>
                      </CardContent>
                    </Card>;
              })}
                </div>
              </div>
            </div> : <ChatInterface activeSystem={activeSystem} messages={messages} onSendMessage={handleSendMessage} className="flex-1" />}
        </main>
      </div>
    </div>;
}