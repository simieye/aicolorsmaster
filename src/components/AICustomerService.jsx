// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, MessageSquare, Ticket, Book, Send, Paperclip, Search, Plus, Clock, User, Calendar, CheckCircle, TrendingUp, Cube, Tools, BookOpen, Eye, Robot } from 'lucide-react';

export const AICustomerService = ({
  onBack,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'bot',
    content: '您好！我是AI智能客服，很高兴为您服务。请问有什么可以帮助您的吗？',
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // 工单数据
  const [tickets] = useState([{
    id: 1,
    title: '系统登录异常',
    description: '无法正常登录系统，提示密码错误但密码正确',
    status: '待处理',
    statusColor: 'bg-blue-500/20 text-blue-300',
    category: '技术问题',
    categoryColor: 'bg-purple-500/20 text-purple-300',
    user: '张三',
    date: '2024-01-15',
    timeAgo: '2小时前',
    icon: Ticket,
    iconColor: 'bg-blue-500'
  }, {
    id: 2,
    title: '产品功能咨询',
    description: '想了解AI调色宝机的具体功能和价格',
    status: '处理中',
    statusColor: 'bg-yellow-500/20 text-yellow-300',
    category: '产品咨询',
    categoryColor: 'bg-green-500/20 text-green-300',
    user: '李四',
    date: '2024-01-14',
    timeAgo: '1天前',
    icon: Ticket,
    iconColor: 'bg-yellow-500'
  }]);

  // 工单统计数据
  const [ticketStats] = useState({
    pending: 28,
    processing: 15,
    completed: 156,
    avgProcessTime: '4.2h'
  });

  // 快速回复选项
  const [quickReplies] = useState(['产品功能介绍', '价格和套餐', '技术支持', '售后服务', '联系人工客服']);

  // 对话历史
  const [chatHistory] = useState([{
    id: 1,
    title: '产品咨询',
    preview: '关于AI调色宝机的使用方法...',
    timeAgo: '2小时前'
  }, {
    id: 2,
    title: '技术问题',
    preview: '系统登录遇到问题...',
    timeAgo: '昨天'
  }]);

  // 知识库分类
  const [knowledgeCategories] = useState([{
    title: '产品使用',
    icon: Cube,
    iconColor: 'bg-blue-500',
    items: ['AI调色宝机使用指南', '染发膏管理系统操作', '客户管理系统使用']
  }, {
    title: '技术支持',
    icon: Tools,
    iconColor: 'bg-green-500',
    items: ['常见问题解答', '系统故障排除', '性能优化建议']
  }, {
    title: '帮助文档',
    icon: BookOpen,
    iconColor: 'bg-purple-500',
    items: ['用户手册', '视频教程', 'API文档']
  }]);

  // 热门文章
  const [popularArticles] = useState([{
    title: '如何快速上手AI调色宝机',
    description: '详细介绍AI调色宝机的安装、配置和基本使用方法',
    views: 1234
  }, {
    title: '染发膏管理系统最佳实践',
    description: '分享染发膏管理系统的使用技巧和优化建议',
    views: 987
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理消息发送
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: '感谢您的咨询，我正在为您查找相关信息...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // 处理快速回复
  const handleQuickReply = reply => {
    setInputMessage(reply);
  };

  // 处理工单操作
  const handleTicketAction = (ticketId, action) => {
    toast({
      title: "工单操作",
      description: `${action}工单 ${ticketId}`
    });
  };

  // 处理知识库搜索
  const handleKnowledgeSearch = searchTerm => {
    toast({
      title: "知识库搜索",
      description: `搜索: ${searchTerm}`
    });
  };

  // 处理知识库文章点击
  const handleArticleClick = articleTitle => {
    toast({
      title: "文章详情",
      description: `查看文章: ${articleTitle}`
    });
  };

  // 滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 渲染消息气泡
  const renderMessage = message => {
    if (message.type === 'bot') {
      return <div key={message.id} className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Robot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 max-w-xs animate-fadeIn">
            <p className="text-white text-sm">{message.content}</p>
          </div>
        </div>;
    } else {
      return <div key={message.id} className="flex items-start space-x-3 justify-end">
          <div className="bg-blue-500 rounded-2xl rounded-tr-none p-3 max-w-xs animate-fadeIn">
            <p className="text-white text-sm">{message.content}</p>
          </div>
        </div>;
    }
  };

  // 渲染工单卡片
  const renderTicketCard = ticket => {
    const Icon = ticket.icon;
    return <Card key={ticket.id} className="ticket-card bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 ${ticket.iconColor} rounded-full flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={ticket.statusColor}>{ticket.status}</span>
                  <span className={ticket.categoryColor}>{ticket.category}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{ticket.title}</h3>
                <p className="text-white/60 text-sm mb-2">{ticket.description}</p>
                <div className="flex items-center space-x-4 text-white/40 text-xs">
                  <span>
                    <User className="w-3 h-3 inline mr-1" />
                    {ticket.user}
                  </span>
                  <span>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {ticket.date}
                  </span>
                  <span>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {ticket.timeAgo}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleTicketAction(ticket.id, ticket.status === '待处理' ? '处理' : '查看')} className="text-blue-400 hover:text-blue-300">
              {ticket.status === '待处理' ? '处理' : '查看'}
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染知识库分类
  const renderKnowledgeCategory = category => {
    const Icon = category.icon;
    return <Card key={category.title} className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 ${category.iconColor} rounded-full flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold">{category.title}</h3>
          </div>
          <div className="space-y-2">
            {category.items.map((item, index) => <div key={index} className="knowledge-item bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/15 transition-all duration-300" onClick={() => handleArticleClick(item)}>
                <span className="text-white text-sm">{item}</span>
              </div>)}
          </div>
        </CardContent>
      </Card>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">AI客服系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">在线</span>
            </div>
            <Button onClick={onSettings} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'chat' ? 'default' : 'ghost'} onClick={() => handleTabChange('chat')} className={`flex-1 ${activeTab === 'chat' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <MessageSquare className="w-4 h-4 mr-2" />
          智能客服
        </Button>
        <Button variant={activeTab === 'tickets' ? 'default' : 'ghost'} onClick={() => handleTabChange('tickets')} className={`flex-1 ${activeTab === 'tickets' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Ticket className="w-4 h-4 mr-2" />
          工单管理
        </Button>
        <Button variant={activeTab === 'knowledge' ? 'default' : 'ghost'} onClick={() => handleTabChange('knowledge')} className={`flex-1 ${activeTab === 'knowledge' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Book className="w-4 h-4 mr-2" />
          知识库
        </Button>
      </div>

      {/* 智能客服内容 */}
      {activeTab === 'chat' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 聊天窗口 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
              <div className="bg-white/10 p-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Robot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI智能客服</h3>
                    <p className="text-white/60 text-sm">随时为您服务</p>
                  </div>
                </div>
              </div>
              
              <div ref={chatContainerRef} className="chat-container overflow-y-auto p-4 space-y-4" style={{
            height: '400px'
          }}>
                {messages.map(renderMessage)}
                
                {/* 输入指示器 */}
                {isTyping && <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Robot className="w-4 h-4 text-white" />
                    </div>
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>}
              </div>
              
              <div className="bg-white/10 p-4 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="输入您的问题..." className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                  <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 快速回复 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">快速回复</h3>
                <div className="space-y-2">
                  {quickReplies.map((reply, index) => <Button key={index} variant="ghost" onClick={() => handleQuickReply(reply)} className="quick-reply w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-3 text-white text-sm justify-start">
                      {reply}
                    </Button>)}
                </div>
              </CardContent>
            </Card>
            
            {/* 对话历史 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">对话历史</h3>
                <div className="space-y-3">
                  {chatHistory.map(chat => <div key={chat.id} className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{chat.title}</span>
                        <span className="text-white/40 text-xs">{chat.timeAgo}</span>
                      </div>
                      <p className="text-white/60 text-xs">{chat.preview}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>}

      {/* 工单管理内容 */}
      {activeTab === 'tickets' && <div className="space-y-8">
          {/* 工单统计 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{ticketStats.pending}</div>
                <div className="text-white/60">待处理工单</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{ticketStats.processing}</div>
                <div className="text-white/60">处理中工单</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{ticketStats.completed}</div>
                <div className="text-white/60">已完成工单</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{ticketStats.avgProcessTime}</div>
                <div className="text-white/60">平均处理时间</div>
              </CardContent>
            </Card>
          </div>

          {/* 工单列表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">工单列表</h2>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  创建工单
                </Button>
              </div>
              
              <div className="space-y-4">
                {tickets.map(renderTicketCard)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 知识库内容 */}
      {activeTab === 'knowledge' && <div className="space-y-8">
          {/* 知识库搜索 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <input type="text" placeholder="搜索知识库..." className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/50" onKeyPress={e => e.key === 'Enter' && handleKnowledgeSearch(e.target.value)} />
                </div>
                <Button onClick={() => handleKnowledgeSearch('')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
                  搜索
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 知识分类 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {knowledgeCategories.map(renderKnowledgeCategory)}
          </div>

          {/* 热门文章 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">热门文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularArticles.map((article, index) => <div key={index} className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-2">{article.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs">阅读量：{article.views}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleArticleClick(article.title)} className="text-blue-400 hover:text-blue-300">
                        阅读更多
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
};