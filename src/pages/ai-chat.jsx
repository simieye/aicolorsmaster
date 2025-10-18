// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Bot, Send, Mic, MicOff, Paperclip, Smile, Settings, History, Trash2, Copy, ThumbsUp, ThumbsDown, Share2, User, BotIcon, Sparkles, Palette, Beaker, Package, Store } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { useAuth } from '@/components/AuthProvider';
export default function AIChatPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [aiSettings, setAiSettings] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: '你是一个专业的涂料行业AI助手，可以帮助用户解决涂料相关的问题。'
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 预设的快捷问题
  const quickQuestions = ['推荐适合卧室的环保涂料', '如何选择外墙防水涂料？', '涂料配色有什么技巧？', '涂料施工的注意事项', '如何计算涂料用量？', '涂料储存的方法'];

  // AI功能模块
  const aiModules = [{
    id: 'color',
    name: '色彩搭配',
    icon: Palette,
    description: '智能色彩推荐和搭配建议',
    prompt: '请帮我推荐一些适合室内装修的色彩搭配方案'
  }, {
    id: 'formula',
    name: '配方生成',
    icon: Beaker,
    description: '根据需求生成涂料配方',
    prompt: '请帮我生成一个环保内墙漆的基础配方'
  }, {
    id: 'product',
    name: '产品推荐',
    icon: Package,
    description: '根据场景推荐合适产品',
    prompt: '请推荐一些适合潮湿环境的涂料产品'
  }, {
    id: 'store',
    name: '门店查询',
    icon: Store,
    description: '查找附近的门店信息',
    prompt: '请帮我查找附近的涂料门店'
  }];

  // 初始化
  useEffect(() => {
    // 加载聊天历史
    loadChatHistory();

    // 添加欢迎消息
    setMessages([{
      id: 'welcome',
      type: 'ai',
      content: '您好！我是您的智能涂料助手。我可以帮您解决涂料相关的问题，包括色彩搭配、配方生成、产品推荐等。请问有什么可以帮助您的吗？',
      timestamp: new Date().toISOString(),
      modules: aiModules
    }]);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // 加载聊天历史
  const loadChatHistory = async () => {
    try {
      // 从本地存储加载历史记录
      const savedHistory = localStorage.getItem('aiChatHistory');
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('加载聊天历史失败:', error);
    }
  };

  // 保存聊天历史
  const saveChatHistory = history => {
    try {
      localStorage.setItem('aiChatHistory', JSON.stringify(history));
    } catch (error) {
      console.error('保存聊天历史失败:', error);
    }
  };

  // 发送消息
  const sendMessage = async content => {
    if (!content.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      // 调用AI聊天云函数
      const result = await $w.cloud.callFunction({
        name: 'aiChat',
        data: {
          message: content,
          history: messages.slice(-10),
          // 发送最近10条消息作为上下文
          settings: aiSettings,
          userId: user?._id
        }
      });
      if (result.success) {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: result.data.response,
          timestamp: new Date().toISOString(),
          suggestions: result.data.suggestions || []
        };
        setMessages(prev => [...prev, aiMessage]);

        // 保存到历史记录
        if (!currentChatId) {
          const newChatId = Date.now().toString();
          setCurrentChatId(newChatId);
          const newChat = {
            id: newChatId,
            title: content.slice(0, 20) + '...',
            messages: [userMessage, aiMessage],
            timestamp: new Date().toISOString()
          };
          const updatedHistory = [newChat, ...chatHistory];
          setChatHistory(updatedHistory);
          saveChatHistory(updatedHistory);
        } else {
          const updatedHistory = chatHistory.map(chat => chat.id === currentChatId ? {
            ...chat,
            messages: [...chat.messages, userMessage, aiMessage],
            timestamp: new Date().toISOString()
          } : chat);
          setChatHistory(updatedHistory);
          saveChatHistory(updatedHistory);
        }
      } else {
        throw new Error(result.message || 'AI响应失败');
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '抱歉，我现在无法回应。请稍后再试。',
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: "发送失败",
        description: "无法获取AI响应，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理快捷问题点击
  const handleQuickQuestion = question => {
    sendMessage(question);
  };

  // 处理AI模块点击
  const handleModuleClick = module => {
    sendMessage(module.prompt);
  };

  // 处理语音录制
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // 这里可以添加语音识别逻辑
      toast({
        title: "录音已停止",
        description: "语音识别功能开发中"
      });
    } else {
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "语音识别功能开发中"
      });
    }
  };

  // 复制消息
  const copyMessage = content => {
    navigator.clipboard.writeText(content);
    toast({
      title: "已复制",
      description: "消息内容已复制到剪贴板"
    });
  };

  // 点赞/点踩
  const rateMessage = (messageId, rating) => {
    toast({
      title: rating === 'up' ? "感谢您的反馈" : "我们会改进",
      description: "您的反馈对我们很重要"
    });
  };

  // 清空聊天
  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      type: 'ai',
      content: '您好！我是您的智能涂料助手。我可以帮您解决涂料相关的问题，包括色彩搭配、配方生成、产品推荐等。请问有什么可以帮助您的吗？',
      timestamp: new Date().toISOString(),
      modules: aiModules
    }]);
    setCurrentChatId(null);
  };

  // 格式化时间
  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex">
      {/* 侧边栏 */}
      <aside className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col">
        {/* 侧边栏头部 */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-white" />
              <h2 className="text-white font-medium">AI助手</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          <Button onClick={clearChat} className="w-full bg-white/20 hover:bg-white/30 text-white">
            <Trash2 className="w-4 h-4 mr-2" />
            新建对话
          </Button>
        </div>

        {/* 聊天历史 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/80 text-sm font-medium">聊天历史</h3>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
              <History className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {chatHistory.map(chat => <button key={chat.id} className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <p className="text-white text-sm truncate">{chat.title}</p>
                <p className="text-white/60 text-xs">{formatTime(chat.timestamp)}</p>
              </button>)}
          </div>
        </div>

        {/* AI设置 */}
        {showSettings && <div className="p-4 border-t border-white/20">
            <h3 className="text-white/80 text-sm font-medium mb-3">AI设置</h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/60 text-xs">模型</label>
                <select value={aiSettings.model} onChange={e => setAiSettings(prev => ({
              ...prev,
              model: e.target.value
            }))} className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded text-white text-sm">
                  <option value="gpt-3.5-turbo" className="text-gray-800">GPT-3.5 Turbo</option>
                  <option value="gpt-4" className="text-gray-800">GPT-4</option>
                </select>
              </div>
              
              <div>
                <label className="text-white/60 text-xs">温度: {aiSettings.temperature}</label>
                <input type="range" min="0" max="1" step="0.1" value={aiSettings.temperature} onChange={e => setAiSettings(prev => ({
              ...prev,
              temperature: parseFloat(e.target.value)
            }))} className="w-full mt-1" />
              </div>
            </div>
          </div>}
      </aside>

      {/* 主聊天区域 */}
      <main className="flex-1 flex flex-col">
        {/* 聊天头部 */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-medium">智能涂料助手</h1>
                <p className="text-white/60 text-sm">专业涂料行业AI助手</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-white/60 text-sm">在线</span>
            </div>
          </div>
        </header>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-blue-500' : 'bg-gradient-to-r from-purple-400 to-blue-400'}`}>
                    {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <BotIcon className="w-4 h-4 text-white" />}
                  </div>
                  
                  <div className={`rounded-2xl p-4 ${message.type === 'user' ? 'bg-blue-500 text-white' : message.error ? 'bg-red-500/20 text-red-200' : 'bg-white/10 text-white'}`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {/* AI模块推荐 */}
                    {message.modules && <div className="grid grid-cols-2 gap-2 mt-3">
                        {message.modules.map(module => {
                    const Icon = module.icon;
                    return <button key={module.id} onClick={() => handleModuleClick(module)} className="bg-white/10 hover:bg-white/20 rounded-lg p-3 text-left transition-colors">
                            <Icon className="w-5 h-5 text-white mb-1" />
                            <p className="text-white text-sm font-medium">{module.name}</p>
                            <p className="text-white/60 text-xs">{module.description}</p>
                          </button>;
                  })}
                      </div>}
                    
                    {/* 建议回复 */}
                    {message.suggestions && message.suggestions.length > 0 && <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => <button key={index} onClick={() => sendMessage(suggestion)} className="w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-2 text-white/80 text-sm transition-colors">
                            {suggestion}
                          </button>)}
                      </div>}
                  </div>
                </div>
                
                {/* 消息操作 */}
                <div className={`flex items-center space-x-2 mt-1 text-xs ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-white/40">{formatTime(message.timestamp)}</span>
                  {message.type === 'ai' && <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="text-white/40 hover:text-white p-1" onClick={() => copyMessage(message.content)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/40 hover:text-white p-1" onClick={() => rateMessage(message.id, 'up')}>
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/40 hover:text-white p-1" onClick={() => rateMessage(message.id, 'down')}>
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>}
                </div>
              </div>
            </div>)}
          
          {/* 加载指示器 */}
          {isLoading && <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <BotIcon className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{
                  animationDelay: '0.1s'
                }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{
                  animationDelay: '0.2s'
                }}></div>
                  </div>
                </div>
              </div>
            </div>}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 快捷问题 */}
        {messages.length <= 1 && <div className="px-4 pb-2">
            <p className="text-white/60 text-sm mb-2">快捷问题：</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => <button key={index} onClick={() => handleQuickQuestion(question)} className="bg-white/10 hover:bg-white/20 text-white/80 text-sm px-3 py-1 rounded-full transition-colors">
                  {question}
                </button>)}
            </div>
          </div>}

        {/* 输入区域 */}
        <div className="border-t border-white/20 p-4">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-2">
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 relative">
              <textarea ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputMessage);
              }
            }} placeholder="输入您的问题..." className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:outline-none resize-none" rows={1} style={{
              minHeight: '48px',
              maxHeight: '120px'
            }} />
            </div>
            
            <Button variant="ghost" size="sm" className={`text-white/60 hover:text-white p-2 ${isRecording ? 'text-red-400' : ''}`} onClick={toggleRecording}>
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Button onClick={() => sendMessage(inputMessage)} disabled={!inputMessage.trim() || isLoading} className="bg-white text-purple-600 hover:bg-white/90 px-4 py-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-chat" />
    </div>;
}