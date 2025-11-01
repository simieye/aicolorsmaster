// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, MicOff, Paperclip, Smile, MoreVertical, Phone, Video, Settings } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner } from '@/components/LoadingSpinner';
// @ts-ignore;

export default function AIChat(props) {
  const {
    $w
  } = props;
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'bot',
    content: '您好！我是AI助手，很高兴为您服务。请问有什么可以帮助您的吗？',
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    // 模拟AI回复
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        type: 'bot',
        content: '感谢您的提问！我正在为您处理，请稍等片刻...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 1500);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // 这里可以添加语音识别逻辑
  };
  const formatTime = date => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const quickActions = [{
    label: '产品咨询',
    action: () => setInputMessage('我想了解你们的产品')
  }, {
    label: '技术支持',
    action: () => setInputMessage('我需要技术支持')
  }, {
    label: '售后服务',
    action: () => setInputMessage('关于售后服务的问题')
  }, {
    label: '投诉建议',
    action: () => setInputMessage('我有投诉或建议')
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background flex flex-col">
        <TopNavigation title="AI智能对话" showBack={true} />
        
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* 聊天头部 */}
          <div className="bg-card border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">AI助手</h2>
                  <p className="text-xs text-muted-foreground">在线中 • 平均响应时间 1秒</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>)}
            
            {isTyping && <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{
                    animationDelay: '0.1s'
                  }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{
                    animationDelay: '0.2s'
                  }}></div>
                    </div>
                  </div>
                </div>
              </div>}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 快捷操作 */}
          <div className="bg-card border-t p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickActions.map((action, index) => <Button key={index} variant="outline" size="sm" onClick={action.action} className="text-xs">
                  {action.label}
                </Button>)}
            </div>

            {/* 输入区域 */}
            <div className="flex items-end space-x-2">
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <textarea ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入消息..." className="w-full px-3 py-2 bg-background border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={1} style={{
                minHeight: '40px',
                maxHeight: '120px'
              }} />
              <Button variant="ghost" size="sm" className="absolute right-2 bottom-2">
                <Smile className="w-4 h-4" />
              </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={handleVoiceToggle} className={`flex-shrink-0 ${isRecording ? 'text-red-500' : ''}`}>
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}