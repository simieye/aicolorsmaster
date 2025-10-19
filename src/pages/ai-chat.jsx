// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Bot, MessageSquare, Settings, History, Star, Zap, Users, HeadphonesIcon, Calendar, GraduationCap, Briefcase } from 'lucide-react';

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
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    notifications: true,
    autoResponse: true,
    language: 'zh-CN',
    theme: 'light',
    privacy: true
  });

  // 系统信息
  const systemInfo = {
    'customer-service': {
      name: 'AI客服系统',
      description: '24小时智能客服，自动回复，提升客户满意度',
      icon: HeadphonesIcon,
      color: 'purple',
      features: ['智能对话', '自动回复', '多语言支持', '数据分析']
    },
    'appointment': {
      name: 'AI预约系统',
      description: '智能预约管理，自动提醒，提升预约效率',
      icon: Calendar,
      color: 'blue',
      features: ['智能排班', '自动提醒', '客户管理', '数据分析']
    },
    'training': {
      name: 'AI培训系统',
      description: '个性化培训方案，提升员工技能，降低培训成本',
      icon: GraduationCap,
      color: 'green',
      features: ['个性化学习', '进度跟踪', '考试测评', '证书颁发']
    },
    'recruitment': {
      name: 'AI招聘系统',
      description: '智能招聘代理，自动筛选简历，精准匹配人才',
      icon: Briefcase,
      color: 'indigo',
      features: ['简历筛选', '智能匹配', '面试安排', '人才库管理']
    }
  };
  const currentSystem = systemInfo[activeSystem];

  // 处理消息发送
  const handleSendMessage = message => {
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(message, activeSystem),
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // 获取AI回复
  const getAIResponse = (message, system) => {
    const responses = {
      'customer-service': '感谢您的咨询！我已经收到您的问题，正在为您查找相关信息...',
      'appointment': '好的，我来帮您安排预约。请告诉我您希望的时间和具体服务项目。',
      'training': '很好的问题！我来为您提供专业的培训指导和建议。',
      'recruitment': '我理解您的招聘需求，让我来帮您找到最合适的人才。'
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
  return <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bot className="w-8 h-8 text-blue-600 mr-3" />
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
        <aside className="w-80 bg-white border-r border-gray-200">
          <div className="p-6">
            {/* 当前系统信息 */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 bg-${currentSystem.color}-100 rounded-full flex items-center justify-center mr-3`}>
                    <currentSystem.icon className={`w-6 h-6 text-${currentSystem.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentSystem.name}</h3>
                    <p className="text-sm text-gray-500">{currentSystem.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {currentSystem.features.map((feature, index) => <div key={index} className="flex items-center text-sm text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 mr-2" />
                      {feature}
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 快速操作 */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">快速操作</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
                pageId: 'products'
              })}>
                  <Star className="w-4 h-4 mr-2" />
                  查看所有系统
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
                pageId: 'system-demo'
              })}>
                  <Zap className="w-4 h-4 mr-2" />
                  系统演示
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
                pageId: 'online-consultation'
              })}>
                  <Users className="w-4 h-4 mr-2" />
                  联系客服
                </Button>
              </div>
            </div>

            {/* 聊天历史 */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">聊天历史</h4>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">客服咨询</span>
                    <span className="text-xs text-gray-500">2分钟前</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">关于产品价格的咨询...</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">预约服务</span>
                    <span className="text-xs text-gray-500">1小时前</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">明天下午的预约安排...</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">培训问题</span>
                    <span className="text-xs text-gray-500">昨天</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">新员工培训计划制定...</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 flex">
          {showSettings ? <div className="w-full max-w-2xl mx-auto p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">AI助手设置</h2>
                <p className="text-gray-600">自定义您的AI助手体验</p>
              </div>
              <AssistantSettings settings={settings} onSettingsChange={handleSettingsChange} />
            </div> : <ChatInterface activeSystem={activeSystem} messages={messages} onSendMessage={handleSendMessage} className="flex-1" />}
        </main>
      </div>
    </div>;
}