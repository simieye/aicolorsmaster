// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Phone, Video, MoreVertical, Paperclip, Image, Send, CalendarAlt, QuestionCircle, Headset, Robot, ChevronDown, ChevronUp, Clock, Mail, MapPin } from 'lucide-react';

export const OnlineConsultation = ({
  onBack,
  onPhoneCall,
  onVideoCall
}) => {
  const {
    toast
  } = useToast();
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'bot',
    content: '您好！欢迎使用AI美发智能系统在线咨询。我是您的专属客服，有什么可以帮助您的吗？',
    timestamp: '10:30',
    sender: 'AI美发客服'
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const chatMessagesRef = useRef(null);

  // 系统选项
  const systemOptions = [{
    value: '1',
    label: 'AI智能染发自动调色宝机'
  }, {
    value: '2',
    label: 'AI品牌染发膏管理系统'
  }, {
    value: '3',
    label: 'AI客户配方管理系统'
  }, {
    value: '4',
    label: 'AI美发连锁门店管理系统'
  }, {
    value: '5',
    label: 'AI美发客户管理系统CRM'
  }, {
    value: '6',
    label: 'AI染发色彩大师SaaS系统'
  }];

  // 时间选项
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  // 快捷回复选项
  const quickReplies = ['产品介绍', '价格咨询', '预约演示', '技术支持'];

  // 常见问题
  const faqs = [{
    id: 1,
    question: 'AI智能调色宝机的价格是多少？',
    answer: 'AI智能调色宝机的标准版价格为4,980元，专业版为6,980元。我们提供分期付款和租赁方案。'
  }, {
    id: 2,
    question: '产品质保期是多久？',
    answer: '所有产品均提供一年质保，终身技术支持。质保期内免费维修和更换。'
  }, {
    id: 3,
    question: '如何预约产品演示？',
    answer: '您可以通过在线咨询、电话或填写预约表单来预约产品演示。我们会在24小时内与您联系确认。'
  }, {
    id: 4,
    question: '是否提供培训服务？',
    answer: '我们提供免费的线上培训和线下指导，确保您的团队能够熟练使用我们的产品。'
  }];

  // 发送消息
  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage.trim(),
        timestamp: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        sender: '用户'
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // 显示输入中状态
      setIsTyping(true);

      // 模拟客服回复
      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          type: 'bot',
          content: '感谢您的咨询！我会尽快为您解答。如需更详细的信息，建议您预约产品演示。',
          timestamp: new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          sender: 'AI美发客服'
        };
        setMessages(prev => [...prev, botReply]);
        setIsTyping(false);
      }, 2000);
    }
  };

  // 处理快捷回复
  const handleQuickReply = reply => {
    setInputMessage(reply);
    setTimeout(() => sendMessage(), 100);
  };

  // 处理FAQ切换
  const toggleFAQ = faqId => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  // 处理预约提交
  const handleAppointmentSubmit = e => {
    e.preventDefault();
    if (!selectedSystem || !selectedDate || !selectedTime || !contactPhone) {
      toast({
        title: "请完善信息",
        description: "请填写所有必填项",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "预约提交成功",
      description: "我们会尽快与您联系确认预约时间"
    });

    // 重置表单
    setSelectedSystem('');
    setSelectedDate('');
    setSelectedTime('');
    setContactPhone('');
    setNotes('');
  };

  // 滚动到底部
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 渲染消息
  const renderMessage = message => {
    if (message.type === 'bot') {
      return <div key={message.id} className="flex items-start space-x-3 chat-bubble">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Robot className="w-4 h-4 text-white" />
          </div>
          <div className="max-w-[70%]">
            <div className="bg-white/10 rounded-2xl rounded-tl-none p-3">
              <p className="text-white text-sm">{message.content}</p>
            </div>
            <p className="text-white/40 text-xs mt-1">{message.timestamp}</p>
          </div>
        </div>;
    } else {
      return <div key={message.id} className="flex items-start space-x-3 justify-end chat-bubble">
          <div className="max-w-[70%]">
            <div className="bg-blue-500 rounded-2xl rounded-tr-none p-3">
              <p className="text-white text-sm">{message.content}</p>
            </div>
            <p className="text-white/40 text-xs mt-1 text-right">{message.timestamp}</p>
          </div>
        </div>;
    }
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">在线咨询</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">在线客服</span>
            </div>
            <Button onClick={onPhoneCall} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Phone className="w-4 h-4 mr-2" />
              电话咨询
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 聊天区域 */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 h-[600px] flex flex-col">
            {/* 聊天头部 */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Headset className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">AI美发客服</h3>
                    <p className="text-white/60 text-sm">平均响应时间 &lt; 1分钟</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={onPhoneCall} className="text-white/60 hover:text-white">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onVideoCall} className="text-white/60 hover:text-white">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 聊天消息区域 */}
            <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(renderMessage)}
              
              {/* 输入中指示器 */}
              {isTyping && <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Robot className="w-4 h-4 text-white" />
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>}
            </div>

            {/* 快捷回复 */}
            <div className="p-4 border-t border-white/20">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map(reply => <Button key={reply} variant="ghost" size="sm" onClick={() => handleQuickReply(reply)} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-sm">
                    {reply}
                  </Button>)}
              </div>

              {/* 输入框 */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <Image className="w-4 h-4" />
                </Button>
                <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="输入消息..." className="flex-1 bg-white/10 border border-white/30 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧功能区 */}
        <div className="space-y-6">
          {/* 预约演示 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CalendarAlt className="text-blue-400 mr-2" />
                预约演示
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">选择系统</label>
                  <select value={selectedSystem} onChange={e => setSelectedSystem(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="">请选择系统</option>
                    {systemOptions.map(option => <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>)}
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">选择日期</label>
                  <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50" />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">选择时间</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => <Button key={time} type="button" variant={selectedTime === time ? 'default' : 'ghost'} onClick={() => setSelectedTime(time)} className={`py-2 text-sm ${selectedTime === time ? 'bg-blue-500' : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'}`}>
                        {time}
                      </Button>)}
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">联系方式</label>
                  <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="手机号码" className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">备注</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="请输入您的需求或问题" rows={3} className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  提交预约
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 常见问题 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <QuestionCircle className="text-green-400 mr-2" />
                常见问题
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faqs.map(faq => <div key={faq.id} className="bg-white/5 rounded-lg p-3">
                    <Button variant="ghost" onClick={() => toggleFAQ(faq.id)} className="w-full text-left text-white text-sm font-medium flex items-center justify-between p-0 h-auto">
                      <span>{faq.question}</span>
                      {expandedFAQ === faq.id ? <ChevronUp className="w-4 h-4 text-white/60" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
                    </Button>
                    {expandedFAQ === faq.id && <div className="text-white/60 text-sm mt-2">
                        {faq.answer}
                      </div>}
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* 联系方式 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Phone className="text-orange-400 mr-2" />
                联系方式
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-white/80">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>400-888-8888</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span>service@aihair.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>工作时间：9:00-18:00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>北京市朝阳区AI科技园</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};