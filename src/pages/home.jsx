// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Palette, Zap, Users, TrendingUp, ChevronRight, Sparkles, Droplets, MessageCircle, Bot } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [trendingColors, setTrendingColors] = useState([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  useEffect(() => {
    // 模拟加载潮流色彩数据
    setTrendingColors([{
      id: 1,
      name: '微潮紫',
      category: '微潮色系',
      hex: '#9B59B6',
      users: 2341
    }, {
      id: 2,
      name: '樱花粉',
      category: '日系色',
      hex: '#FFB6C1',
      users: 1892
    }, {
      id: 3,
      name: '薄荷绿',
      category: '潮色系',
      hex: '#98FB98',
      users: 1567
    }, {
      id: 4,
      name: '奶茶棕',
      category: '生活色系',
      hex: '#D2B48C',
      users: 2103
    }]);
  }, []);
  const handleQuickAction = action => {
    toast({
      title: "功能启动中",
      description: `正在进入${action}功能...`
    });

    // 模拟页面跳转
    const pageMap = {
      '拍照识别': 'color-recognition',
      '选择色系': 'formula-generation',
      '一键调染': 'mixing-simulation',
      '客户管理': 'community'
    };
    if (pageMap[action]) {
      $w.utils.navigateTo({
        pageId: pageMap[action],
        params: {}
      });
    }
  };
  const handleAIChat = () => {
    setShowAIChat(true);
    // 添加欢迎消息
    setChatMessages([{
      id: 1,
      type: 'bot',
      content: '您好！我是AI染发色彩大师的智能助手，我可以为您提供个性化的色彩推荐和染发建议。请问有什么可以帮助您的吗？',
      timestamp: new Date()
    }]);
  };
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);

    // 模拟AI回复
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: '根据您的描述，我推荐您尝试今年流行的微潮紫色系，这个颜色既时尚又显白，很适合亚洲人的肤色。您想了解更多关于这个颜色的信息吗？',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
    setCurrentMessage('');
  };
  const quickActions = [{
    icon: Camera,
    title: '拍照识别',
    desc: 'AI智能分析头发底色',
    color: 'from-purple-500 to-pink-500'
  }, {
    icon: Palette,
    title: '选择色系',
    desc: '711种独特色调任选',
    color: 'from-blue-500 to-purple-500'
  }, {
    icon: Zap,
    title: '一键调染',
    desc: '50秒精准调配完成',
    color: 'from-green-500 to-blue-500'
  }, {
    icon: Users,
    title: '客户管理',
    desc: '云端配方智能管理',
    color: 'from-orange-500 to-red-500'
  }];
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      {/* 顶部Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white relative">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl font-bold mb-4 flex items-center">
                <Sparkles className="mr-3" />
                AI染发色彩大师
              </h1>
              <p className="text-xl mb-6">Agentic AI 驱动，重新定义染发未来，开启调染新时代</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold">711</span>
                  <span className="ml-2">种色调</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold">0.2g</span>
                  <span className="ml-2">精准误差</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold">50s</span>
                  <span className="ml-2">快速调配</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Droplets className="w-16 h-16" />
                </div>
                <p className="text-sm">扫码体验小程序</p>
                <div className="w-24 h-24 bg-white rounded-lg mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat入口 */}
        <div className="absolute bottom-4 right-4">
          <Button onClick={handleAIChat} className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-6 py-3 shadow-lg flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span className="font-medium">AI智能对话</span>
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 快速入口 */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">快速开始</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
          const Icon = action.icon;
          return <Card key={index} className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl" onClick={() => handleQuickAction(action.title)}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.desc}</p>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>

      {/* 潮流色彩推荐 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">潮流色彩推荐</h2>
          <div className="flex items-center text-purple-600">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="text-sm">Insight Agent 实时更新</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingColors.map(color => <Card key={color.id} className="overflow-hidden">
              <div className="h-32 relative" style={{
            backgroundColor: color.hex
          }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{color.name}</h3>
                  <p className="text-sm opacity-90">{color.category}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{color.users}人使用</span>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    试用
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>

      {/* 技术优势 */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Agentic AI 技术优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">7层</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">洋葱圈架构</h3>
              <p className="text-gray-600">从AI基础到Agentic AI的完整技术栈</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">6+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">智能体矩阵</h3>
              <p className="text-gray-600">多Agent协同工作，自主优化配方</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">99%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">染膏利用率</h3>
              <p className="text-gray-600">精准控制，节约20%+染膏成本</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat弹窗 */}
      {showAIChat && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold">AI智能色彩对话</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAIChat(false)}>
                ✕
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>)}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input type="text" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="home" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}