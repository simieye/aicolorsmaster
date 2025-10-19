// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, History, Star, Settings, Maximize2, Minimize2 } from 'lucide-react';

// @ts-ignore;
import { SystemSwitcher } from '@/components/SystemSwitcher';
// @ts-ignore;
import { QuickActions } from '@/components/QuickActions';
// @ts-ignore;
import { ChatInterface } from '@/components/ChatInterface';
// @ts-ignore;
import { AssistantSettings } from '@/components/AssistantSettings';
export default function AIChatPage(props) {
  const {
    $w
  } = props;
  const [currentSystem, setCurrentSystem] = useState('customer-service');
  const [messages, setMessages] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [settings, setSettings] = useState({
    language: 'zh-CN',
    theme: 'light',
    notifications: true,
    autoResponse: true,
    soundEnabled: true,
    fontSize: 'medium'
  });

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessages = {
      'customer-service': [{
        id: 1,
        sender: 'assistant',
        content: '您好！我是AI客服助手，有什么可以帮助您的吗？',
        timestamp: new Date().toLocaleTimeString()
      }],
      'appointment': [{
        id: 1,
        sender: 'assistant',
        content: '欢迎使用AI预约系统！我可以帮您管理预约、查看日程等。',
        timestamp: new Date().toLocaleTimeString()
      }],
      'training': [{
        id: 1,
        sender: 'assistant',
        content: '欢迎使用AI培训系统！我可以为您提供学习指导和培训支持。',
        timestamp: new Date().toLocaleTimeString()
      }],
      'micro-store': [{
        id: 1,
        sender: 'assistant',
        content: '欢迎使用AI微店系统！我可以帮您管理店铺、处理订单等。',
        timestamp: new Date().toLocaleTimeString()
      }]
    };
    setMessages(welcomeMessages[currentSystem] || welcomeMessages['customer-service']);
  }, [currentSystem]);
  const handleSystemChange = systemId => {
    setCurrentSystem(systemId);
  };
  const handleSendMessage = content => {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      content: content,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const responses = {
        'customer-service': '感谢您的咨询！我会尽力帮助您解决问题。',
        'appointment': '预约已收到！我会为您安排合适的时间。',
        'training': '学习资料已准备！请查看相关课程内容。',
        'micro-store': '订单处理中！我们会尽快为您安排发货。'
      };
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'assistant',
        content: responses[currentSystem] || '感谢您的消息！我会尽力帮助您。',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  const handleActionClick = action => {
    const actionMessages = {
      '开始对话': '请告诉我您需要什么帮助？',
      '新建预约': '请选择您希望预约的时间和服务项目。',
      '课程中心': '以下是推荐的培训课程，请选择您感兴趣的内容。',
      '商品管理': '请选择您要管理的商品类别。'
    };
    const message = actionMessages[action.label] || `正在执行${action.label}操作...`;
    handleSendMessage(message);
  };
  const handleSettingsChange = newSettings => {
    setSettings(newSettings);
    // 这里可以保存设置到本地存储或服务器
    localStorage.setItem('ai-assistant-settings', JSON.stringify(newSettings));
  };
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  return <div className="h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">AI全能助手</h1>
              </div>
              
              <SystemSwitcher currentSystem={currentSystem} onSystemChange={handleSystemChange} onSettingsClick={() => setIsSettingsOpen(true)} />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
              pageId: 'history'
            })}>
                <History className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Star className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <div className="flex-1 flex">
        {!isMinimized && <>
            {/* 侧边栏 */}
            <aside className="w-80 bg-white border-r border-gray-200 p-4">
              <div className="space-y-6">
                {/* 快捷操作 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h3>
                  <QuickActions currentSystem={currentSystem} onActionClick={handleActionClick} />
                </div>

                {/* 系统信息 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">当前系统</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">系统名称</span>
                        <span className="text-gray-900">
                          {currentSystem === 'customer-service' && 'AI客服系统'}
                          {currentSystem === 'appointment' && 'AI预约系统'}
                          {currentSystem === 'training' && 'AI培训系统'}
                          {currentSystem === 'micro-store' && 'AI微店系统'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">状态</span>
                        <span className="text-green-600">在线</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">响应时间</span>
                        <span className="text-gray-900">&lt;1s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 使用统计 */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">今日统计</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">对话次数</span>
                        <span className="text-gray-900">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">处理任务</span>
                        <span className="text-gray-900">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">满意度</span>
                        <span className="text-gray-900">98%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* 聊天界面 */}
            <main className="flex-1">
              <ChatInterface currentSystem={currentSystem} messages={messages} onSendMessage={handleSendMessage} />
            </main>
          </>}
      </div>

      {/* 设置弹窗 */}
      <AssistantSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} onSettingsChange={handleSettingsChange} />
    </div>;
}