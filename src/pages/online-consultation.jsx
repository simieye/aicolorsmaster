// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { RefreshCw, MessageCircle, FileText, TrendingUp, Users, Clock, Star, Wifi, WifiOff } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner, ErrorState, DataLoader } from '@/components/LoadingStates';
// @ts-ignore;
import { ChatInterface } from '@/components/consultation/ChatInterface';
// @ts-ignore;
import { ConsultationHistory } from '@/components/consultation/ConsultationHistory';
// @ts-ignore;
import { ServiceStats } from '@/components/consultation/ServiceStats';
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
  const [serviceStats, setServiceStats] = useState({
    totalConsultations: 0,
    todayConsultations: 0,
    averageDuration: 0,
    satisfactionRate: 0,
    aiResponseRate: 0,
    humanResponseRate: 0,
    averageRating: 0,
    responseTime: 0,
    activeConsultations: 0,
    queueLength: 0,
    dailyTrend: [],
    topicDistribution: [],
    performanceMetrics: {
      accuracy: 0,
      responseSpeed: 0,
      problemSolving: 0,
      userSatisfaction: 0
    }
  });
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected'); // connected, connecting, disconnected
  const [currentServiceType, setCurrentServiceType] = useState('ai'); // ai, human
  const [isOnline, setIsOnline] = useState(true);
  const [queuePosition, setQueuePosition] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const currentUser = $w?.auth?.currentUser;

  // 初始化聊天
  useEffect(() => {
    initializeChat();
    loadConsultationHistory();
    loadServiceStats();
    checkConnectionStatus();
  }, []);

  // 监听客服类型切换
  useEffect(() => {
    if (isAIEnabled) {
      setCurrentServiceType('ai');
      setConnectionStatus('connected');
      setQueuePosition(0);
    } else {
      setCurrentServiceType('human');
      // 模拟连接人工客服的过程
      setConnectionStatus('connecting');
      setQueuePosition(Math.floor(Math.random() * 5) + 1);
      setTimeout(() => {
        setConnectionStatus('connected');
        setQueuePosition(0);
        addSystemMessage('已为您连接人工客服，我是客服小王，很高兴为您服务！');
      }, 3000);
    }
  }, [isAIEnabled]);

  // 检查连���状态
  const checkConnectionStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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
  const addSystemMessage = content => {
    const systemMessage = {
      id: `system_${Date.now()}`,
      type: 'system',
      content: content,
      timestamp: new Date().toISOString(),
      sender: 'system'
    };
    setMessages(prev => [...prev, systemMessage]);
  };
  const loadConsultationHistory = async () => {
    try {
      setHistoryLoading(true);
      const mockHistory = generateMockConsultationHistory();
      setConsultationHistory(mockHistory);
    } catch (error) {
      console.error('加载咨询历史失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取咨询历史",
        variant: "destructive"
      });
    } finally {
      setHistoryLoading(false);
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
        summary: `关于���发产品使用的咨询${i + 1}`,
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
    try {
      setStatsLoading(true);
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
    } catch (error) {
      console.error('加载服务统计失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取服务统计数据",
        variant: "destructive"
      });
    } finally {
      setStatsLoading(false);
    }
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || connectionStatus === 'connecting') return;
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
      if (currentServiceType === 'ai') {
        // AI响应
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
      } else {
        // 人工客服响应
        setTimeout(() => {
          const humanResponse = {
            id: `human_${Date.now()}`,
            type: 'human',
            content: generateHumanResponse(inputMessage),
            timestamp: new Date().toISOString(),
            sender: 'human'
          };
          setMessages(prev => [...prev, humanResponse]);
          setIsTyping(false);
        }, 2000);
      }
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
      '售后': '我们提供7天无理由退换货，30天质量问题包换，还有专业的客服团队为您服务。',
      '切换': '我可以为您转接人工客服，请稍等...',
      '人工': '正在为您连接人工客服，预计等待时间2-3分钟...'
    };
    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }
    return '感谢您的咨询！我会尽力为您解答。如果您需要更详细的帮助，我可以为您转接人工客服。';
  };
  const generateHumanResponse = userMessage => {
    const responses = ['您好，我是人工客服小王。关于您的问题，我来为您详细解答...', '感谢您的耐心等待。根据您的描述，我建议您选择我们的天然植物染发剂系列。', '我理解您的需求。让我为您查询一下相关的产品信息和优惠活动...', '很高兴为您服务。关于这个问题，我们的专业建议是先进行皮肤过敏测试。', '根据您的发质情况，我推荐使用我们的保湿修护型染发产品。'];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  const handleToggleAI = () => {
    const newAIEnabled = !isAIEnabled;
    setIsAIEnabled(newAIEnabled);
    if (newAIEnabled) {
      toast({
        title: "已切换到AI客服",
        description: "AI客服已就绪，可以立即为您服务"
      });
      addSystemMessage('已切换到AI客服模式');
    } else {
      toast({
        title: "正在连接人工客服",
        description: "请稍候，正在为您安排专业客服..."
      });
      addSystemMessage('正在为您连接人工客服，当前排队位置：' + queuePosition);
    }
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
  if (activeTab === 'chat') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="在线咨询" showBack={true} />
          
          <div className="pb-20">
            {/* 服务状态栏 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'} animate-pulse`}></div>
                  <span className="font-medium">
                    {currentServiceType === 'ai' ? 'AI客服在线' : connectionStatus === 'connecting' ? '连接中...' : '人工客服在线'}
                  </span>
                  {!isOnline && <WifiOff className="w-4 h-4 ml-2" />}
                  {queuePosition > 0 && <span className="ml-2 text-sm">排队位置: {queuePosition}</span>}
                </div>
                <Button variant="ghost" size="sm" onClick={handleToggleAI} disabled={connectionStatus === 'connecting' || !isOnline} className="text-white hover:bg-white/10 disabled:opacity-50">
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

            {/* 聊天界面 */}
            <ChatInterface messages={messages} inputMessage={inputMessage} setInputMessage={setInputMessage} onSendMessage={handleSendMessage} isTyping={isTyping} connectionStatus={connectionStatus} currentServiceType={currentServiceType} isOnline={isOnline} queuePosition={queuePosition} onToggleAI={handleToggleAI} onEndConsultation={handleEndConsultation} onRateConsultation={handleRateConsultation} showDetails={showDetails} setShowDetails={setShowDetails} />

            {/* 服务详情 */}
            {showDetails && <div className="border-t p-4 bg-muted">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">服务特色</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-4 h-4 text-green-500">✓</div>
                        <span>24小时在线服务</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-4 h-4 text-green-500">✓</div>
                        <span>专业染发顾问</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-4 h-4 text-green-500">✓</div>
                        <span>个性化解决方案</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">联系方式</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center space-x-2">
                        <span className="w-4 h-4 text-blue-500">📞</span>
                        <span>400-123-4567</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-4 h-4 text-blue-500">📧</span>
                        <span>service@example.com</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="w-4 h-4 text-blue-500">📍</span>
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
          
          <ConsultationHistory consultationHistory={consultationHistory} loading={historyLoading} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterType={filterType} setFilterType={setFilterType} onExportHistory={handleExportHistory} />

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
          
          <ServiceStats serviceStats={serviceStats} loading={statsLoading} />

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
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full mx-auto mb-4"></div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute mx-auto mb-4"></div>
          <p>页面加载中...</p>
        </div>
      </div>
    </ErrorBoundary>;
}