// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Send, Mic, Paperclip, Smile, MoreVertical } from 'lucide-react';

export function ChatInterface({
  currentSystem,
  messages,
  onSendMessage,
  onTyping
}) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleInputChange = e => {
    setInputValue(e.target.value);
    if (onTyping) {
      onTyping(e.target.value.length > 0);
    }
  };
  const getSystemWelcome = () => {
    const welcomes = {
      'customer-service': '您好！我是AI客服助手，有什么可以帮助您的吗？',
      'appointment': '欢迎使用AI预约系统！我可以帮您管理预约、查看日程等。',
      'training': '欢迎使用AI培训系统！我可以为您提供学习指导和培训支持。',
      'micro-store': '欢迎使用AI微店系统！我可以帮您管理店铺、处理订单等。'
    };
    return welcomes[currentSystem] || welcomes['customer-service'];
  };
  return <div className="flex flex-col h-full bg-white">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-gray-600 mb-2">{getSystemWelcome()}</p>
            <p className="text-sm text-gray-400">请输入您的问题或需求</p>
          </div>}
        
        {messages.map((message, index) => <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>)}
        
        {isTyping && <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
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
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </Button>
          
          <div className="flex-1 relative">
            <input ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="输入您的问题..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          
          <Button variant="ghost" size="sm" className="p-2">
            <Smile className="w-5 h-5 text-gray-500" />
          </Button>
          
          <Button variant="ghost" size="sm" className="p-2">
            <Mic className="w-5 h-5 text-gray-500" />
          </Button>
          
          <Button onClick={handleSend} disabled={!inputValue.trim()} className="p-2">
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">
            按 Enter 发送，Shift+Enter 换行
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-1">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
}