
// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Bot, User, Send, Phone, Mail, Calendar, Clock, Star, TrendingUp, Users, Headphones, FileText, ShoppingBag, Settings, ThumbsUp, ThumbsDown, Share2, Bookmark, Zap, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { AIChatInterface } from '@/components/AIChatInterface';
// @ts-ignore;

export default function OnlineConsultationPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [consultationType, setConsultationType] = useState('general');
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [isHumanAvailable, setIsHumanAvailable] = useState(true);
  const [consultationHistory, setConsultationHistory] = useState([]);
  const [smartRecommendations, setSmartRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    consultationHistory: [],
    preferences: {}
  });
  const [consultationStats, setConsultationStats] = useState({
    totalConsultations: 0,
    avgResponseTime: 0,
    satisfactionRate: 0,
    resolvedIssues: 0
  });
  const messagesEndRef = useRef(null);
  const consultationTypes = [{
    id: 'general',
    name: '一般咨询',
    icon: <MessageCircle className="w-5 h-5" />,
    description: '产品信息、使用方法等一般问题',
    color: 'blue'
  }, {
    id: 'technical',
    name: '技术支持',
    icon: <Settings className="w-5 h-5" />,
    description: '技术问题、故障排除等专业支持',
    color: 'green'
  }, {
    id: 'product',
    name: '产品咨询',
    icon: <ShoppingBag className="w-5 h-5" />,
    description: '产品推荐、价格、库存等咨询',
    color: 'purple'
  }, {
    id: 'complaint',
    name: '投诉建议',
    icon: <AlertCircle className="w-5 h-5" />,
    description: '投诉处理、意见反馈等',
    color: 'orange'
  }];
  const quickQuestions = [{
    id: 'q1',
    text: '如何选择适合的染发剂？',
    type: 'product',
    category: 'product-selection'
  }, {
    id: 'q2',
    text: '染发后如何护理头发？',
    type: 'general',
    category: 'after-care'
  }, {
    id: 'q3',
    text: '产品过敏怎么办？',
    type: 'technical',
    category: 'allergy'
  }, {
    id: 'q4',
    text: '退换货政策是什么？',
    type: 'general',
    category: 'policy'
  }, {
    id: 'q5',
    text: '如何联系人工客服？',
    type: 'general',
    category: 'human-service'
  }];
  useEffect(() => {
    loadUserProfile();
    loadConsultationHistory();
    loadSmartRecommendations();
    checkHumanServiceAvailability();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [consultationHistory]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const loadUserProfile = () => {
    const currentUser = $w?.auth?.currentUser;
    if (currentUser) {
      setUserProfile(prev => ({
        ...prev,
        name: currentUser.nickName || currentUser.name || '',
        userId: currentUser.userId
      }));
    }
  };
  const loadConsultationHistory = () => {
    // 从本地存储或API加载咨询历史
    const saved = localStorage.getItem('consultationHistory');
    if (saved) {
      setConsultationHistory(JSON.parse(saved));
    }
  };
  const loadSmartRecommendations = async () => {
    try {
      const recommendations = await deepseekService.getProductRecommendations(userProfile, {
        type: 'customer_service',
        limit: 5
      });
      setSmartRecommendations(recommendations.recommendations || []);
    } catch (error) {
      console.error('加载推荐失败:', error);
    }
  };
  const checkHumanServiceAvailability = () => {
    // 检查人工客服可用性（模拟）
    const currentHour = new Date().getHours();
    setIsHumanAvailable(currentHour >= 9 && currentHour <= 18);
  };
  const handleConsultationMessage = async ({
    userMessage,
    botReply
  }) => {
    // 记录咨询历史
    const newConsultation = {
      id: Date.now(),
      type: consultationType,
      userMessage,
      botReply,
      timestamp: new Date(),
      satisfaction: null,
      resolved: false,
      agent: isAIEnabled ? 'AI' : 'Human'
    };
    setConsultationHistory(prev => [...prev, newConsultation]);
    localStorage.setItem('consultationHistory', JSON.stringify([...consultationHistory, newConsultation]));

    // 更新统计信息
    updateConsultationStats(newConsultation);

    // 生成智能推荐
    generateContextualRecommendations(userMessage, consultationType);
  };
  const generateContextualRecommendations = async (message, type) => {
    try {
      const prompt = `基于用户咨询生成相关推荐：
用户消息：${message}
咨询类型：${type}

请生成2-3个相关的推荐，包含：
1. 相关产品推荐
2. 有用的文章或指南
3. 相关服务

以JSON格式返回。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的客服推荐专家，根据用户咨询提供有价值的推荐。'
      }, {
        role: 'user',
        content: prompt
      }]);
      try {
        const recommendations = JSON.parse(response);
        setSmartRecommendations(recommendations);
      } catch (e) {
        console.error('解析推荐失败:', e);
      }
    } catch (error) {
      console.error('生成推荐失败:', error);
    }
  };
  const updateConsultationStats = newConsultation => {
    setConsultationStats(prev => ({
      ...prev,
      totalConsultations: prev.totalConsultations + 1,
      avgResponseTime: Math.random() * 3 + 1, // 模拟响应时间
      satisfactionRate: Math.min(100, prev.satisfactionRate + Math.random() * 2),
      resolvedIssues: prev.resolvedIssues + (Math.random() > 0.3 ? 1 : 0)
    }));
  };
  const handleQuickQuestion = question => {
    // 设置咨询类型
    setConsultationType(question.type);
    
    // 自动填充问题到聊天输入框
    // 这里可以通过ref或state来设置输入框的值
    console.log('快速问题:', question.text);
  };
  const handleTypeChange = type => {
    setConsultationType(type);
    // 可以根据类型加载不同的快速问题或预设回复
  };
  const handleToggleAI = () => {
    setIsAIEnabled(!isAIEnabled);
    toast({
      title: isAIEnabled ? "已切换到人工客服" : "已切换到AI客服",
      description: isAIEnabled ? "正在为您连接人工客服..." : "AI客服将为您服务"
    });
  };
  const handleHumanService = () => {
    if (!isHumanAvailable) {
      toast({
        title: "人工客服暂不可用",
        description: "请稍后再试或使用AI客服",
        variant: "destructive"
      });
      return;
    }
    
    setIsAIEnabled(false);
    toast({
      title: "正在连接人工客服",
      description: "请稍等，客服人员将尽快为您服务"
    });
  };
  const handleScheduleConsultation = () => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'ai-appointment-system-detail'
      });
    }
  };
  const handleFeedback = (consultationId, feedback) => {
    setConsultationHistory(prev => prev.map(consultation => consultation.id === consultationId ? {
      ...consultation,
      satisfaction: feedback,
      resolved: feedback === 'satisfied'
    } : consultation));
    
    toast({
      title: "感谢反馈",
      description: "您的反馈将帮助我们改进服务质量"
    });
  };
  const handleShareConsultation = async consultation => {
    try {
      const text = `咨询记录：\n用户：${consultation.userMessage}\n客服：${consultation.botReply}`;
      if (navigator.share) {
        await navigator.share({
          title: '咨询记录',
          text
        });
      } else {
        await navigator.clipboard.writeText(text);
        toast({
          title: "已复制到剪贴板",
          description: "咨询记录已复制"
        });
      }
    } catch (error) {
      console.log('分享失败:', error);
    }
  };
  const tabs = [{
    id: 'chat',
    label: '在线咨询',
    icon: <MessageCircle className="w-4 h-4" />
  }, {
    id: 'history',
    label: '咨询记录',
    icon: <Clock className="w-4 h-4" />
  }, {
    id: 'stats',
    label: '服务统计',
    icon: <TrendingUp className="w-4 h-4" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="在线咨询" showBack={true} />
        
        <div className="pb-20">
          {/* 咨询类型选择 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Headphones className="w-8 h-8" />
                  <h1 className="text-2xl font-bold">智能客服中心</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleToggleAI} className="text-white hover:bg-white/10">
                    {isAIEnabled ? <Bot className="w-4 h-4 mr-1" /> : <Users className="w-4 h-4 mr-1" />}
                    {isAIEnabled ? 'AI客服' : '人工客服'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleHumanService} className="text-white hover:bg-white/10">
                    <Phone className="w-4 h-4 mr-1" />
                    人工客服
                  </Button>
                </div>
              </div>
              
              {/* 咨询类型网格 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {consultationTypes.map(type => <button key={type.id} onClick={() => handleTypeChange(type.id)} className={`p-3 rounded-lg text-left transition-all ${consultationType === type.id ? 'bg-white text-gray-900' : 'bg-white/10 hover:bg-white/20'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`text-${type.color}-500`}>{type.icon}</div>
                      <span className="font-medium text-sm">{type.name}</span>
                    </div>
                    <p className="text-xs opacity-80">{type.description}</p>
                  </button>)}
              </div>
            </div>
          </div>

          {/* 标签页 */}
          <div className="bg-card border-b">
            <div className="flex">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}>
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>)}
            </div>
          </div>

          {/* 在线咨询 */}
          {activeTab === 'chat' && <div className="flex h-[calc(100vh-280px)]">
              <div className="flex-1 flex flex-col">
                {/* 快速问题 */}
                <div className="bg-card border-b p-4">
                  <h3 className="font-medium mb-3 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>快速问题</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map(question => <button key={question.id} onClick={() => handleQuickQuestion(question)} className="px-3 py-2 bg-muted rounded-full text-sm hover:bg-accent transition-colors">
                        {question.text}
                      </button>)}
                  </div>
                </div>

                {/* 聊天界面 */}
                <div className="flex-1">
                  <AIChatInterface onMessage={handleConsultationMessage} context={{
                    page: 'online-consultation',
                    userId: $w?.auth?.currentUser?.userId,
                    consultationType: consultationType,
                    userProfile: userProfile
                  }} placeholder="请描述您的问题，AI客服将为您解答..." title={isAIEnabled ? "AI智能客服" : "人工客服"} />
                </div>

                {/* 服务状态栏 */}
                <div className="bg-card border-t p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${isAIEnabled ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        <span>{isAIEnabled ? 'AI客服在线' : '人工客服'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">平均响应: {consultationStats.avgResponseTime.toFixed(1)}s</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleScheduleConsultation}>
                      <Calendar className="w-4 h-4 mr-1" />
                      预约咨询
                    </Button>
                  </div>
                </div>
              </div>

              {/* 智能推荐侧边栏 */}
              {smartRecommendations.length > 0 && <div className="w-80 border-l bg-card p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">智能推荐</h3>
                </div>
                <div className="space-y-3">
                  {smartRecommendations.map((rec, index) => <div key={index} className="bg-muted rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-1">{rec.name || rec.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{rec.description || rec.reason}</p>
                      {rec.price && <div className="text-sm font-medium text-blue-600 mb-2">
                          ¥{rec.price}
                        </div>}
                      <Button size="sm" className="w-full">
                        查看详情
                      </Button>
                    </div>)}
                </div>
              </div>}
            </div>}

          {/* 咨询记录 */}
          {activeTab === 'history' && <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">咨询记录</h2>
                <div className="text-sm text-muted-foreground">
                  共 {consultationHistory.length} 条记录
                </div>
              </div>
              
              {consultationHistory.length === 0 ? <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>暂无咨询记录</p>
                </div> : <div className="space-y-4">
                  {consultationHistory.map(consultation => <Card key={consultation.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${consultation.agent === 'AI' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                              {consultation.agent === 'AI' ? <Bot className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-medium">{consultation.agent === 'AI' ? 'AI客服' : '人工客服'}</div>
                              <div className="text-xs text-muted-foreground">
                                {consultation.timestamp.toLocaleString()} • {consultationTypes.find(t => t.id === consultation.type)?.name}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {consultation.resolved && <CheckCircle className="w-4 h-4 text-green-500" />}
                            <Button variant="ghost" size="sm" onClick={() => handleShareConsultation(consultation)}>
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">用户问题：</div>
                            <p className="text-sm">{consultation.userMessage}</p>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">客服回复：</div>
                            <p className="text-sm">{consultation.botReply}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">满意度：</span>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => handleFeedback(consultation.id, 'satisfied')} className={consultation.satisfaction === 'satisfied' ? 'text-green-600' : ''}>
                                <ThumbsUp className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleFeedback(consultation.id, 'unsatisfied')} className={consultation.satisfaction === 'unsatisfied' ? 'text-red-600' : ''}>
                                <ThumbsDown className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {consultation.resolved && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                              已解决
                            </span>}
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
            </div>}

          {/* 服务统计 */}
          {activeTab === 'stats' && <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">服务统计</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{consultationStats.totalConsultations}</div>
                      <div className="text-sm text-muted-foreground">总咨询次数</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{consultationStats.avgResponseTime.toFixed(1)}s</div>
                      <div className="text-sm text-muted-foreground">平均响应时间</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{consultationStats.satisfactionRate.toFixed(0)}%</div>
                      <div className="text-sm text-muted-foreground">满意度率</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{consultationStats.resolvedIssues}</div>
                      <div className="text-sm text-muted-foreground">已解决问题</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>咨询类型分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {consultationTypes.map(type => {
                        const count = consultationHistory.filter(c => c.type === type.id).length;
                        const percentage = consultationHistory.length > 0 ? (count / consultationHistory.length * 100).toFixed(0) : 0;
                        return <div key={type.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {type.icon}
                              <span className="text-sm">{type.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-muted rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: `${percentage}%`}}></div>
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">{percentage}%</span>
                            </div>
                          </div>;
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>服务质量指标</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AI客服解决率</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">人工客服满意度</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">平均处理时间</span>
                        <span className="text-sm font-medium">3.2分钟</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">首次响应时间</span>
                        <span className="text-sm font-medium">1.5秒</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}
