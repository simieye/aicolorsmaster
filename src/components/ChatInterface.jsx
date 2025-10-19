// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, Paperclip, Smile } from 'lucide-react';

export function ChatInterface({
  activeSystem,
  messages = [],
  onSendMessage,
  className = ''
}) {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const getSystemWelcome = () => {
    const welcomeMessages = {
      'customer-service': '您好！我是AI智能客服，很高兴为您服务。请问有什么可以帮助您的吗？',
      'appointment': '您好！我是AI预约助手，可以帮您安排预约时间。请问您需要预约什么服务？',
      'training': '您好！我是AI培训助手，可以为您提供专业的培训指导。请问您想学习什么内容？',
      'recruitment': '您好！我是AI招聘助手，可以帮您找到合适的人才。请问您需要招聘什么职位？'
    };
    return welcomeMessages[activeSystem] || '您好！我是AI助手，很高兴为您服务！';
  };
  return <div className={`flex flex-col h-full ${className}`}>
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 欢迎消息 */}
        {messages.length === 0 && <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-md">
              <p className="text-gray-800">{getSystemWelcome()}</p>
            </div>
          </div>}
        
        {/* 历史消息 */}
        {messages.map((message, index) => <div key={index} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-green-100' : 'bg-blue-100'}`}>
              {message.sender === 'user' ? <User className="w-4 h-4 text-green-600" /> : <Bot className="w-4 h-4 text-blue-600" />}
            </div>
            <div className={`rounded-lg p-3 max-w-md ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>{message.text}</p>
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>)}
        
        {/* 正在输入指示器 */}
        {isTyping && <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
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
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入消息..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={handleSend} disabled={!inputMessage.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>;
}