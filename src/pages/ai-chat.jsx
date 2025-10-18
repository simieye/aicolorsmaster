// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, useToast } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, MicOff, Paperclip, Smile, History, Settings, Sparkles, Zap } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AIChatPage(props) {
  const {
    $w,
    style
  } = props;

  // 临时模拟用户数据
  const [user] = useState({
    name: '访客用户',
    isAuthenticated: false
  });
  const [isAuthenticated] = useState(false);
  const {
    toast
  } = useToast();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      type: 'bot',
      content: '您好！我是您的AI智能助手 🤖\n\n我可以帮助您：\n• 🎨 色彩搭配建议\n• 🧪 配方生成和优化\n• 📊 数据分析和报告\n• 💡 产品推荐和咨询\n\n请问有什么可以帮助您的吗？',
      timestamp: new Date().toISOString(),
      suggestions: ['色彩搭配建议', '生成新配方', '产品推荐', '数据分析']
    };
    setMessages([welcomeMessage]);
    setSuggestions(welcomeMessage.suggestions);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // 处理发送消息
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      // 模拟AI响应
      const botResponse = await generateAIResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setSuggestions(botResponse.suggestions || []);
    } catch (error) {
      console.error('AI响应失败:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: '抱歉，我现在遇到了一些问题，请稍后再试。',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // 生成AI响应
  const generateAIResponse = async userInput => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    const input = userInput.toLowerCase();
    let response = '';
    let suggestions = [];
    if (input.includes('色彩') || input.includes('颜色') || input.includes('搭配')) {
      response = '关于色彩搭配，我可以为您提供专业的建议：\n\n🎨 **经典搭配方案**：\n• 蓝色 + 白色 = 清新自然\n• 绿色 + 木色 = 自然环保\n• 灰色 + 黄色 = 现代时尚\n\n💡 **根据空间选择**：\n• 卧室：建议使用柔和的暖色调\n• 办公室：建议使用冷静的蓝绿色调\n• 客厅：建议使用中性色调作为基础\n\n您想了解哪个空间的色彩搭配呢？';
      suggestions = ['卧室色彩搭配', '办公室色彩建议', '客厅配色方案', '儿童房色彩'];
    } else if (input.includes('配方') || input.includes('调色')) {
      response = '我可以帮您生成专业的调色配方：\n\n🧪 **配方类型**：\n• 水性涂料配方\n• 油性涂料配方\n• 环保涂料配方\n• 特殊效果配方\n\n📋 **需要的信息**：\n• 目标颜色（可上传图片或提供色号）\n• 使用场景（室内/室外）\n• 预算范围\n• 环保要求\n\n请告诉我您的具体需求，我会为您生成最优配方！';
      suggestions = ['生成水性配方', '环保配方推荐', '成本优化配方', '特殊效果配方'];
    } else if (input.includes('产品') || input.includes('推荐')) {
      response = '根据您的需求，我推荐以下产品：\n\n🏆 **热门产品**：\n1. **智能调色机 Pro** - 高精度AI调色\n2. **色彩分析仪 Lite** - 便携式色彩识别\n3. **配方管理系统** - 全流程配方管理\n\n💰 **性价比之选**：\n• 色彩分析仪 Lite - 适合个人用户\n• 基础配方软件 - 适合小型工作室\n\n您想了解哪个产品的详细信息？';
      suggestions = ['智能调色机详情', '色彩分析仪功能', '价格对比', '用户评价'];
    } else if (input.includes('数据') || input.includes('分析') || input.includes('报告')) {
      response = '我可以为您提供全面的数据分析服务：\n\n📊 **分析维度**：\n• 销售趋势分析\n• 用户行为分析\n• 色彩流行趋势\n• 成本效益分析\n\n📈 **报告类型**：\n• 日报、周报、月报\n• 自定义时间段报告\n• 对比分析报告\n• 预测分析报告\n\n您需要哪种类型的分析报告？';
      suggestions = ['销售趋势分析', '色彩流行报告', '成本分析', '用户行为分析'];
    } else {
      response = '我理解您的需求。作为您的AI助手，我可以帮助您：\n\n🎨 **色彩相关**：搭配建议、色彩分析、趋势预测\n🧪 **配方相关**：配方生成、成本优化、环保建议\n📊 **数据相关**：趋势分析、报告生成、预测模型\n🛒 **产品相关**：产品推荐、使用指导、技术支持\n\n请告诉我您的具体需求，我会为您提供专业的帮助！';
      suggestions = ['色彩搭配建议', '生成新配方', '产品推荐', '数据分析'];
    }
    return {
      id: Date.now(),
      type: 'bot',
      content: response,
      timestamp: new Date().toISOString(),
      suggestions
    };
  };

  // 处理建议点击
  const handleSuggestionClick = suggestion => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  // 处理语音录制
  const handleToggleRecording = () => {
    if (!isRecording) {
      // 开始录音
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "请说出您的问题"
      });

      // 模拟录音结束
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage('请帮我推荐一些适合客厅的色彩搭配');
        toast({
          title: "录音完成",
          description: "已转换为文字"
        });
      }, 3000);
    } else {
      // 停止录音
      setIsRecording(false);
    }
  };

  // 处理文件上传
  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        toast({
          title: "图片上传成功",
          description: "正在分析图片中的色彩..."
        });

        // 模拟图片分析
        setTimeout(() => {
          const analysisMessage = {
            id: Date.now(),
            type: 'bot',
            content: '📸 **图片分析结果**：\n\n检测到主要颜色：\n• 主色调：天空蓝 (#87CEEB)\n• 辅助色：纯白 (#FFFFFF)\n• 点缀色：珊瑚红 (#FF7F50)\n\n💡 **搭配建议**：\n这是一个非常清新的色彩组合，适合用于：\n• 卧室墙面 - 天空蓝\n• 家具搭配 - 纯白色\n• 装饰品点缀 - 珊瑚红\n\n您觉得这个分析如何？需要我生成相应的配方吗？',
            timestamp: new Date().toISOString(),
            suggestions: ['生成对应配方', '其他搭配建议', '保存色彩方案', '分析其他图片']
          };
          setMessages(prev => [...prev, analysisMessage]);
          setSuggestions(analysisMessage.suggestions);
        }, 2000);
      }
    };
    input.click();
  };

  // 处理键盘事件
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI智能助手</h1>
                <p className="text-white/80 text-sm">专业的调色和配色顾问</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => toast({
              title: "聊天历史",
              description: "聊天历史功能正在开发中"
            })}>
                <History className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" className="text-white/80 hover:text-white" onClick={() => toast({
              title: "设置",
              description: "AI设置功能正在开发中"
            })}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 聊天区域 */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* 消息列表 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-4" style={{
          height: 'calc(100vh - 300px)',
          minHeight: '400px'
        }}>
            <div className="h-full overflow-y-auto p-6 space-y-4">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* 头像 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-blue-500' : message.isError ? 'bg-red-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}>
                      {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    
                    {/* 消息内容 */}
                    <div className={`rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : message.isError ? 'bg-red-500/20 border border-red-500/30 text-red-100' : 'bg-white/10 border border-white/20 text-white'}`}>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>)}
              
              {/* 正在输入指示器 */}
              {isTyping && <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
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
          </div>

          {/* 建议按钮 */}
          {suggestions.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map((suggestion, index) => <Button key={index} variant="outline" size="sm" onClick={() => handleSuggestionClick(suggestion)} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  {suggestion}
                </Button>)}
            </div>}

          {/* 输入区域 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-end space-x-3">
                {/* 文件上传 */}
                <Button variant="ghost" size="sm" onClick={handleFileUpload} className="text-white/80 hover:text-white">
                  <Paperclip className="w-5 h-5" />
                </Button>

                {/* 输入框 */}
                <div className="flex-1">
                  <Input ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入您的问题..." className="bg-white/10 border-white/20 text-white placeholder-white/60 resize-none" rows={1} />
                </div>

                {/* 语音录制 */}
                <Button variant="ghost" size="sm" onClick={handleToggleRecording} className={`text-white/80 hover:text-white ${isRecording ? 'text-red-400' : ''}`}>
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                {/* 表情 */}
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white" onClick={() => toast({
                title: "表情功能",
                description: "表情功能正在开发中"
              })}>
                  <Smile className="w-5 h-5" />
                </Button>

                {/* 发送按钮 */}
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-chat" />
    </div>;
}