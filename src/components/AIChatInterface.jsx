// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, MicOff, Paperclip, Smile, MoreVertical, Phone, Video, Settings, Loader2 } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;

export function AIChatInterface({
  onMessage,
  context = {},
  placeholder = '输入消息...',
  title = 'AI助手'
}) {
  const {
    toast
  } = useRef();
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
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      const response = await deepseekService.getCustomerServiceReply(inputMessage, context);
      const botReply = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botReply]);
      if (onMessage) {
        onMessage({
          userMessage: inputMessage,
          botReply: response
        });
      }
    } catch (error) {
      console.error('AI回复失败:', error);
      const errorReply = {
        id: Date.now() + 1,
        type: 'bot',
        content: '抱歉，我现在无法回复。请稍后再试或联系人工客服。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorReply]);
      toast?.({
        title: "AI回复失败",
        description: "请检查网络连接后重试",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
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
    action: () => setInputMessage('我想了解你们的染发产品')
  }, {
    label: '使用方法',
    action: () => setInputMessage('如何正确使用染发产品？')
  }, {
    label: '安全注意',
    action: () => setInputMessage('使用染发产品有哪些注意事项？')
  }, {
    label: '配色建议',
    action: () => setInputMessage('我适合什么颜色的染发剂？')
  }];
  return <div className="flex flex-col h-full">
      {/* 聊天头部 */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{title}</h2>
              <p className="text-xs text-muted-foreground">在线中 • AI驱动</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">AI正在思考...</span>
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
            <textarea ref={inputRef} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={placeholder} className="w-full px-3 py-2 bg-background border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={1} style={{
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
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="flex-shrink-0">
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>;
}