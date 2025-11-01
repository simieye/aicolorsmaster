// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, MicOff, Paperclip, Smile, MoreVertical, Phone, Video, Settings, Lightbulb, Clock, TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, Share2, Bookmark, Zap } from 'lucide-react';

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

export default function AIChatPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('chat');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userIntent, setUserIntent] = useState(null);
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatStats, setChatStats] = useState({
    totalMessages: 0,
    avgResponseTime: 0,
    satisfactionScore: 0,
    topics: []
  });
  const handleNavigation = (pageId, params = {}) => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId,
        params
      });
    }
  };
  const handleMessage = async ({
    userMessage,
    botReply
  }) => {
    // 记录对话历史
    const newMessage = {
      id: Date.now(),
      userMessage,
      botReply,
      timestamp: new Date(),
      intent: await analyzeUserIntent(userMessage),
      satisfaction: null
    };
    setConversationHistory(prev => [...prev, newMessage]);

    // 更新聊天统计
    updateChatStats(newMessage);

    // 生成智能建议
    generateSmartSuggestions(userMessage, botReply);

    // 分析用户意图
    const intent = await analyzeUserIntent(userMessage);
    setUserIntent(intent);
    console.log('用户消息:', userMessage);
    console.log('AI回复:', botReply);
    console.log('用户意图:', intent);
  };
  const analyzeUserIntent = async message => {
    try {
      const prompt = `分析用户消息的意图和情感：
用户消息：${message}

请分析并返回JSON格式的结果，包含：
1. intent: 主要意图（如：产品咨询、技术支持、使用指导、投诉建议等）
2. emotion: 情感倾向（如：积极、中性、消极）
3. urgency: 紧急程度（如：高、中、低）
4. keywords: 关键词列表
5. category: 问题分类`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的用户意图分析专家，能够准确分析用户消息的意图和情感。'
      }, {
        role: 'user',
        content: prompt
      }], {
        temperature: 0.3,
        max_tokens: 500
      });
      try {
        return JSON.parse(response);
      } catch (e) {
        return {
          intent: '一般咨询',
          emotion: '中性',
          urgency: '低',
          keywords: [],
          category: '其他'
        };
      }
    } catch (error) {
      console.error('意图分析失败:', error);
      return null;
    }
  };
  const generateSmartSuggestions = async (userMessage, botReply) => {
    try {
      const prompt = `基于当前对话生成智能建议：
用户消息：${userMessage}
AI回复：${botReply}

请生成3-4个相关的智能建议，包括：
1. 可能的后续问题
2. 相关产品推荐
3. 有用的链接或资源
4. 相关服务

以JSON数组格式返回，每个建议包含：text（建议文本）、type（类型）、action（动作）`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的对话建议生成专家，能够根据对话内容提供有价值的后续建议。'
      }, {
        role: 'user',
        content: prompt
      }], {
        temperature: 0.7,
        max_tokens: 800
      });
      try {
        const suggestions = JSON.parse(response);
        setSmartSuggestions(suggestions.slice(0, 4));
      } catch (e) {
        // 设置默认建议
        setSmartSuggestions([{
          text: '查看相关产品',
          type: 'product',
          action: 'navigate'
        }, {
          text: '联系人工客服',
          type: 'service',
          action: 'contact'
        }, {
          text: '查看使用指南',
          type: 'guide',
          action: 'navigate'
        }]);
      }
    } catch (error) {
      console.error('生成建议失败:', error);
    }
  };
  const updateChatStats = newMessage => {
    setChatStats(prev => {
      const newStats = {
        ...prev,
        totalMessages: prev.totalMessages + 1,
        topics: updateTopics(prev.topics, newMessage.intent?.category)
      };

      // 计算平均响应时间（模拟）
      newStats.avgResponseTime = Math.random() * 2 + 0.5;

      // 计算满意度（模拟）
      newStats.satisfactionScore = Math.min(100, prev.satisfactionScore + Math.random() * 5);
      return newStats;
    });
  };
  const updateTopics = (topics, newCategory) => {
    if (!newCategory) return topics;
    const updatedTopics = [...topics];
    const existingTopic = updatedTopics.find(t => t.name === newCategory);
    if (existingTopic) {
      existingTopic.count += 1;
    } else {
      updatedTopics.push({
        name: newCategory,
        count: 1
      });
    }
    return updatedTopics.sort((a, b) => b.count - a.count).slice(0, 5);
  };
  const handleSuggestionClick = suggestion => {
    // 根据建议类型执行相应动作
    switch (suggestion.action) {
      case 'navigate':
        if (suggestion.type === 'product') {
          handleNavigation('products');
        } else if (suggestion.type === 'guide') {
          // 跳转到使用指南
        }
        break;
      case 'contact':
        // 联系人工客服
        break;
      case 'search':
        // 执行搜索
        break;
      default:
        break;
    }
  };
  const handleFeedback = (messageId, feedback) => {
    setConversationHistory(prev => prev.map(msg => msg.id === messageId ? {
      ...msg,
      satisfaction: feedback
    } : msg));
  };
  const handleShareConversation = async () => {
    try {
      const conversationText = conversationHistory.map(msg => `用户: ${msg.userMessage}\nAI: ${msg.botReply}`).join('\n\n');
      if (navigator.share) {
        await navigator.share({
          title: 'AI对话记录',
          text: conversationText
        });
      } else {
        await navigator.clipboard.writeText(conversationText);
      }
    } catch (error) {
      console.log('分享失败:', error);
    }
  };
  const handleBookmarkConversation = () => {
    // 收藏对话记录
    localStorage.setItem('bookmarkedConversation', JSON.stringify(conversationHistory));
  };
  const tabs = [{
    id: 'chat',
    label: '智能对话',
    icon: <Bot className="w-4 h-4" />
  }, {
    id: 'history',
    label: '对话历史',
    icon: <Clock className="w-4 h-4" />
  }, {
    id: 'analytics',
    label: '对话分析',
    icon: <TrendingUp className="w-4 h-4" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background flex flex-col">
        <TopNavigation title="AI智能对话" showBack={true} />
        
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
          {/* 标签页 */}
          <div className="bg-card border-b">
            <div className="flex">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>)}
            </div>
          </div>

          {/* 聊天界面 */}
          {activeTab === 'chat' && <div className="flex-1 flex">
              <div className="flex-1">
                <AIChatInterface onMessage={handleMessage} context={{
              page: 'ai-chat',
              userId: $w?.auth?.currentUser?.userId,
              conversationHistory: conversationHistory.slice(-5) // 传递最近5条对话作为上下文
            }} placeholder="输入您的问题，AI助手将为您提供智能解答..." title="AI智能助手" />
              </div>
              
              {/* 智能建议侧边栏 */}
              {smartSuggestions.length > 0 && <div className="w-80 border-l bg-card p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">智能建议</h3>
                </div>
                <div className="space-y-2">
                  {smartSuggestions.map((suggestion, index) => <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full text-left p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{suggestion.text}</span>
                      </div>
                    </button>)}
                </div>
                
                {/* 用户意图分析 */}
                {userIntent && <div className="mt-6">
                    <h4 className="font-medium mb-3">意图分析</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">主要意图:</span>
                        <span className="font-medium">{userIntent.intent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">情感倾向:</span>
                        <span className={`font-medium ${userIntent.emotion === '积极' ? 'text-green-600' : userIntent.emotion === '消极' ? 'text-red-600' : 'text-gray-600'}`}>{userIntent.emotion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">紧急程度:</span>
                        <span className={`font-medium ${userIntent.urgency === '高' ? 'text-red-600' : userIntent.urgency === '中' ? 'text-yellow-600' : 'text-gray-600'}`}>{userIntent.urgency}</span>
                      </div>
                    </div>
                  </div>}
              </div>}
            </div>}

          {/* 历史记录 */}
          {activeTab === 'history' && <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">对话历史</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleShareConversation}>
                    <Share2 className="w-4 h-4 mr-1" />
                    分享
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBookmarkConversation}>
                    <Bookmark className="w-4 h-4 mr-1" />
                    收藏
                  </Button>
                </div>
              </div>
              
              {conversationHistory.length === 0 ? <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>暂无对话历史</p>
                </div> : <div className="space-y-4">
                  {conversationHistory.map(message => <Card key={message.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <User className="w-4 h-4" />
                              <span className="font-medium">用户</span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-sm mb-3">{message.userMessage}</p>
                            
                            <div className="flex items-center space-x-2 mb-2">
                              <Bot className="w-4 h-4" />
                              <span className="font-medium">AI助手</span>
                            </div>
                            <p className="text-sm mb-3">{message.botReply}</p>
                            
                            {message.intent && <div className="text-xs text-muted-foreground">
                                意图: {message.intent.intent} | 情感: {message.intent.emotion}
                              </div>}
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleFeedback(message.id, 'like')}>
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleFeedback(message.id, 'dislike')}>
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
            </div>}

          {/* 对话分析 */}
          {activeTab === 'analytics' && <div className="flex-1 p-4">
              <h2 className="text-xl font-semibold mb-4">对话分析</h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{chatStats.totalMessages}</div>
                      <div className="text-sm text-muted-foreground">总消息数</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{chatStats.avgResponseTime.toFixed(1)}s</div>
                      <div className="text-sm text-muted-foreground">平均响应时间</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{chatStats.satisfactionScore.toFixed(0)}%</div>
                      <div className="text-sm text-muted-foreground">满意度评分</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>热门话题</CardTitle>
                </CardHeader>
                <CardContent>
                  {chatStats.topics.length === 0 ? <div className="text-center py-4 text-muted-foreground">
                      暂无话题数据
                    </div> : <div className="space-y-2">
                      {chatStats.topics.map((topic, index) => <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="font-medium">{topic.name}</span>
                          <span className="text-sm text-muted-foreground">{topic.count} 次</span>
                        </div>)}
                    </div>}
                </CardContent>
              </Card>
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}