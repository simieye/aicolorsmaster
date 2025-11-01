// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Send, User, Bot, Clock, Phone, Mail, MapPin, Star, ThumbsUp, ThumbsDown, CheckCircle, AlertCircle, Info, ChevronDown, ChevronUp, Filter, Search, Download, RefreshCw, Settings, Headphones, FileText, Calendar, TrendingUp, Users, Zap, Shield, Award, X } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
// @ts-ignore;

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function OnlineConsultationPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [consultationHistory, setConsultationHistory] = useState([]);
  const [serviceStats, setServiceStats] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = $w?.auth?.currentUser;
  useEffect(() => {
    loadConsultationHistory();
    loadServiceStats();
    initializeChat();
  }, []);
  const initializeChat = () => {
    const welcomeMessage = {
      id: 'welcome',
      type: 'system',
      content: '您好！欢迎使用染发咨询客服，我是您的专属AI助手，有什么可以帮助您的吗？',
      timestamp: new Date().toISOString(),
      sender: 'ai'
    };
    setMessages([welcomeMessage]);
  };
  const loadConsultationHistory = async () => {
    try {
      // 模拟从数据源获取咨询历史
      const mockHistory = generateMockConsultationHistory();
      setConsultationHistory(mockHistory);
    } catch (error) {
      console.error('加载咨询历史失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取咨询历史",
        variant: "destructive"
      });
    }
  };
  const generateMockConsultationHistory = () => {
    const history = [];
    for (let i = 0; i < 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      history.push({
        id: `consultation_${i + 1}`,
        userId: `USER_${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`,
        userName: `用户${i + 1}`,
        type: Math.random() > 0.5 ? 'ai' : 'human',
        status: Math.random() > 0.3 ? 'completed' : 'pending',
        duration: Math.floor(Math.random() * 30) + 5,
        rating: Math.floor(Math.random() * 5) + 1,
        satisfaction: Math.random() > 0.3 ? 'satisfied' : 'neutral',
        topic: ['产品咨询', '使用指导', '售后问题', '技术支持', '投诉建议'][Math.floor(Math.random() * 5)],
        summary: `关于染发产品使用的咨询${i + 1}`,
        timestamp: date.toISOString(),
        messages: [{
          type: 'user',
          content: '请问这款染发剂适合什么发质？',
          timestamp: date.toISOString()
        }, {
          type: 'ai',
          content: '这款染发剂适合所有发质，特别推荐给干性发质的用户...',
          timestamp: date.toISOString()
        }]
      });
    }
    return history;
  };
  const loadServiceStats = async () => {
    const mockStats = {
      totalConsultations: 1250,
      todayConsultations: 45,
      averageDuration: 12.5,
      satisfactionRate: 92.3,
      aiResponseRate: 78.5,
      humanResponseRate: 21.5,
      averageRating: 4.6,
      responseTime: 2.3,
      activeConsultations: 8,
      queueLength: 3,
      dailyTrend: [],
      topicDistribution: [{
        topic: '产品咨询',
        count: 450,
        percentage: 36
      }, {
        topic: '使用指导',
        count: 320,
        percentage: 25.6
      }, {
        topic: '售后问题',
        count: 280,
        percentage: 22.4
      }, {
        topic: '技术支持',
        count: 150,
        percentage: 12
      }, {
        topic: '投诉建议',
        count: 50,
        percentage: 4
      }],
      performanceMetrics: {
        accuracy: 94.2,
        responseSpeed: 96.8,
        problemSolving: 89.5,
        userSatisfaction: 92.3
      }
    };

    // 生成每日趋势数据
    const trendData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      trendData.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        consultations: Math.floor(Math.random() * 100) + 50,
        satisfaction: Math.random() * 10 + 85,
        responseTime: Math.random() * 2 + 1
      });
    }
    mockStats.dailyTrend = trendData;
    setServiceStats(mockStats);
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      // 模拟AI响应
      setTimeout(() => {
        const aiResponse = {
          id: `ai_${Date.now()}`,
          type: 'ai',
          content: generateAIResponse(inputMessage),
          timestamp: new Date().toISOString(),
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('发送消息失败:', error);
      setIsTyping(false);
      toast({
        title: "发送失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    }
  };
  const generateAIResponse = userMessage => {
    const responses = {
      '产品': '我们的染发产品采用天然植物成分，温和不刺激，适合各种发质使用。您想了解哪款产品的详细信息呢？',
      '价格': '我们的产品价格从99元到399元不等，根据产品系列和规格有所不同。您有预算范围吗？',
      '使用': '使用方法很简单：1. 先做皮肤测试 2. 按照说明书调配 3. 均匀涂抹 4. 等待20-30分钟 5. 彻底清洗。需要我详细说明吗？',
      '效果': '我们的染发剂颜色持久，可以保持6-8周，同时含有护发成分，染发后头发依然柔顺有光泽。',
      '售后': '我们提供7天无理由退换货，30天质量问题包换，还有专业的客服团队为您服务。'
    };
    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }
    return '感谢您的咨询！我会尽力为您解答。如果您需要更详细的帮助，我可以为您转接人工客服。';
  };
  const handleToggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
    toast({
      title: isAIEnabled ? "已切换到人工客服" : "已切换到AI客服",
      description: isAIEnabled ? "正在为您连接人工客服..." : "AI客服已就绪"
    });
  };
  const handleEndConsultation = () => {
    setMessages([]);
    initializeChat();
    toast({
      title: "咨询已结束",
      description: "感谢您的使用，期待下次为您服务"
    });
  };
  const handleRateConsultation = rating => {
    toast({
      title: "感谢评价",
      description: `您给了${rating}星评价，我们会继续努力`
    });
  };
  const handleExportHistory = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `consultation_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "导出成功",
      description: "咨询历史已导出为CSV文件"
    });
  };
  const generateCSV = () => {
    const headers = ['ID', '用户ID', '用户名', '类型', '状态', '时长(分钟)', '评分', '满意度', '主题', '摘要', '时间戳'];
    const rows = consultationHistory.map(item => [item.id, item.userId, item.userName, item.type, item.status, item.duration, item.rating, item.satisfaction, item.topic, item.summary, item.timestamp]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };
  const filteredHistory = consultationHistory.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = !searchTerm || item.userName.toLowerCase().includes(searchTerm.toLowerCase()) || item.topic.toLowerCase().includes(searchTerm.toLowerCase()) || item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  if (activeTab === 'chat') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="在线咨询" showBack={true} />
          
          <div className="pb-20">
            {/* 服务状态栏 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isAIEnabled ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
                  <span className="font-medium">
                    {isAIEnabled ? 'AI客服在线' : '人工客服'}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleToggleAI} className="text-white hover:bg-white/10">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  切换客服
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>平均响应: {serviceStats.responseTime}分钟</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>满意度: {serviceStats.satisfactionRate}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>当前咨询: {serviceStats.activeConsultations}</span>
                </div>
              </div>
            </div>

            {/* 聊天区域 */}
            <div className="flex flex-col h-[calc(100vh-200px)]">
              {/* 消息列表 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-center space-x-2 mb-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.sender === 'ai' && <Bot className="w-4 h-4 text-blue-500" />}
                        {message.sender === 'user' && <User className="w-4 h-4 text-green-500" />}
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>)}
                {isTyping && <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                      animationDelay: '0.1s'
                    }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                      animationDelay: '0.2s'
                    }}></div>
                      </div>
                    </div>
                  </div>}
              </div>

              {/* 输入区域 */}
              <div className="border-t p-4 bg-card">
                <div className="flex items-center space-x-2">
                  <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="请输入您的问题..." className="flex-1 px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
                      <Info className="w-4 h-4 mr-1" />
                      服务详情
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleEndConsultation}>
                      <Phone className="w-4 h-4 mr-1" />
                      结束咨询
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">服务评价:</span>
                    {[1, 2, 3, 4, 5].map(star => <button key={star} onClick={() => handleRateConsultation(star)} className="text-yellow-500 hover:text-yellow-600">
                        <Star className={`w-4 h-4 ${star <= 3 ? 'fill-current' : ''}`} />
                      </button>)}
                  </div>
                </div>
              </div>
            </div>

            {/* 服务详情 */}
            {showDetails && <div className="border-t p-4 bg-muted">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">服务特色</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>24小时在线服务</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>专业染发顾问</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>个性化解决方案</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">联系方式</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span>400-123-4567</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span>service@example.com</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>全国服务网点</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>}
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-3 p-2">
              <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center py-2 ${activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs mt-1">咨询</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                <FileText className="w-5 h-5" />
                <span className="text-xs mt-1">记录</span>
              </button>
              <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center py-2 ${activeTab === 'stats' ? 'text-primary' : 'text-muted-foreground'}`}>
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs mt-1">统计</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'history') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="咨询记录" showBack={true} />
          
          <div className="pb-20">
            {/* 搜索和筛选 */}
            <div className="bg-card border-b p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="搜索咨询记录..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">全部类型</option>
                      <option value="ai">AI客服</option>
                      <option value="human">人工客服</option>
                    </select>
                  </div>
                </div>
                <Button variant="outline" onClick={handleExportHistory}>
                  <Download className="w-4 h-4 mr-2" />
                  导出记录
                </Button>
              </div>
            </div>

            {/* 咨询记录列表 */}
            <div className="p-4 space-y-4">
              {filteredHistory.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedHistory(item)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {item.type === 'ai' ? <Bot className="w-4 h-4 text-blue-500" /> : <User className="w-4 h-4 text-green-500" />}
                          <span className="font-medium">{item.userName}</span>
                          <span className={`px-2 py-1 rounded text-xs ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            {item.status === 'completed' ? '已完成' : '进行中'}
                          </span>
                          <span className="text-sm text-muted-foreground">{item.topic}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{new Date(item.timestamp).toLocaleString()}</span>
                          <span>时长: {item.duration}分钟</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* 咨询详情弹窗 */}
            {selectedHistory && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">咨询详情</h3>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedHistory(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">用户:</span>
                          <span className="ml-2">{selectedHistory.userName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">类型:</span>
                          <span className="ml-2">{selectedHistory.type === 'ai' ? 'AI客服' : '人工客服'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">状态:</span>
                          <span className="ml-2">{selectedHistory.status === 'completed' ? '已完成' : '进行中'}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">时长:</span>
                          <span className="ml-2">{selectedHistory.duration}分钟</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">对话记录</h4>
                        <div className="space-y-2">
                          {selectedHistory.messages.map((msg, index) => <div key={index} className={`p-2 rounded ${msg.type === 'user' ? 'bg-primary/10' : 'bg-muted'}`}>
                              <div className="text-xs text-muted-foreground mb-1">
                                {msg.type === 'user' ? '用户' : '客服'} - {new Date(msg.timestamp).toLocaleTimeString()}
                              </div>
                              <div className="text-sm">{msg.content}</div>
                            </div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-3 p-2">
              <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center py-2 ${activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs mt-1">咨询</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                <FileText className="w-5 h-5" />
                <span className="text-xs mt-1">记录</span>
              </button>
              <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center py-2 ${activeTab === 'stats' ? 'text-primary' : 'text-muted-foreground'}`}>
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs mt-1">统计</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'stats') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="服务统计" showBack={true} />
          
          <div className="pb-20 p-4 space-y-6">
            {/* 统计卡片 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                    <span className="text-sm text-muted-foreground">总咨询量</span>
                  </div>
                  <div className="text-2xl font-bold">{serviceStats.totalConsultations?.toLocaleString()}</div>
                  <div className="text-xs text-green-600">+12.5%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-8 h-8 text-green-500" />
                    <span className="text-sm text-muted-foreground">今日咨询</span>
                  </div>
                  <div className="text-2xl font-bold">{serviceStats.todayConsultations}</div>
                  <div className="text-xs text-green-600">+8.3%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-8 h-8 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">满意度</span>
                  </div>
                  <div className="text-2xl font-bold">{serviceStats.satisfactionRate}%</div>
                  <div className="text-xs text-green-600">+2.1%</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-purple-500" />
                    <span className="text-sm text-muted-foreground">平均时长</span>
                  </div>
                  <div className="text-2xl font-bold">{serviceStats.averageDuration}分钟</div>
                  <div className="text-xs text-green-600">-1.2分钟</div>
                </CardContent>
              </Card>
            </div>

            {/* 咨询趋势 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>咨询趋势</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={serviceStats.dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="consultations" stroke="#3b82f6" name="咨询量" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10b981" name="满意度" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 主题分布 */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>咨询主题分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={serviceStats.topicDistribution} cx="50%" cy="50%" labelLine={false} label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="count">
                        {serviceStats.topicDistribution?.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>服务性能指标</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">准确率</span>
                        <span className="text-sm font-medium">{serviceStats.performanceMetrics?.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{
                        width: `${serviceStats.performanceMetrics?.accuracy}%`
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">响应速度</span>
                        <span className="text-sm font-medium">{serviceStats.performanceMetrics?.responseSpeed}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{
                        width: `${serviceStats.performanceMetrics?.responseSpeed}%`
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">问题解决率</span>
                        <span className="text-sm font-medium">{serviceStats.performanceMetrics?.problemSolving}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{
                        width: `${serviceStats.performanceMetrics?.problemSolving}%`
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">用户满意度</span>
                        <span className="text-sm font-medium">{serviceStats.performanceMetrics?.userSatisfaction}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{
                        width: `${serviceStats.performanceMetrics?.userSatisfaction}%`
                      }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-3 p-2">
              <button onClick={() => setActiveTab('chat')} className={`flex flex-col items-center py-2 ${activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs mt-1">咨询</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                <FileText className="w-5 h-5" />
                <span className="text-xs mt-1">记录</span>
              </button>
              <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center py-2 ${activeTab === 'stats' ? 'text-primary' : 'text-muted-foreground'}`}>
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs mt-1">统计</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p>页面加载中...</p>
        </div>
      </div>
    </ErrorBoundary>;
}