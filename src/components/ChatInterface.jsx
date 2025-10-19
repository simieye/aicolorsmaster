// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, Paperclip, Smile, Phone, Video, MoreVertical, Clock, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

export function ChatInterface({
  activeSystem,
  messages = [],
  onSendMessage,
  className = ''
}) {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
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
  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // 这里可以添加语音录制逻辑
  };
  const handleCopyMessage = text => {
    navigator.clipboard.writeText(text);
    // 可以添加复制成功的提示
  };
  const handleFeedback = (messageId, type) => {
    // 处理消息反馈
    console.log(`Message ${messageId} feedback: ${type}`);
  };
  const getSystemWelcome = () => {
    const welcomeMessages = {
      'customer-service': '您好！我是AI智能客服，很高兴为您服务。我可以帮助您解答产品咨询、技术支持、售后服务等问题。请问有什么可以帮助您的吗？',
      'appointment': '您好！我是AI预约助手，可以帮您安排预约时间。我可以智能分析您的时间偏好，自动安排最合适的预约时间。请问您需要预约什么服务？',
      'training': '您好！我是AI培训助手，可以为您提供专业的培训指导。我会根据您的学习进度和能力水平，为您制定个性化的学习计划。请问您想学习什么内容？',
      'recruitment': '您好！我是AI招聘助手，可以帮您找到合适的人才。我可以自动筛选简历，进行智能匹配，大大提高招聘效率。请问您需要招聘什么职位？'
    };
    return welcomeMessages[activeSystem] || '您好！我是AI助手，很高兴为您服务！';
  };
  const getSystemColor = () => {
    const colorMap = {
      'customer-service': 'purple',
      'appointment': 'blue',
      'training': 'green',
      'recruitment': 'indigo'
    };
    return colorMap[activeSystem] || 'blue';
  };
  const systemColor = getSystemColor();
  return <div className={`flex flex-col h-full ${className}`}>
      {/* 聊天头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 bg-${systemColor}-100 rounded-full flex items-center justify-center mr-3`}>
              <Bot className={`w-5 h-5 text-${systemColor}-600`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI助手</h3>
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                在线
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {/* 欢迎消息 */}
        {messages.length === 0 && <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 bg-${systemColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
              <Bot className={`w-4 h-4 text-${systemColor}-600`} />
            </div>
            <div className="bg-white rounded-lg p-4 max-w-md shadow-sm">
              <p className="text-gray-800">{getSystemWelcome()}</p>
              <div className="mt-3 flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  了解更多
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  查看演示
                </Button>
              </div>
            </div>
          </div>}
        
        {/* 历史消息 */}
        {messages.map((message, index) => <div key={index} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-green-100' : `bg-${systemColor}-100`}`}>
              {message.sender === 'user' ? <User className="w-4 h-4 text-green-600" /> : <Bot className={`w-4 h-4 text-${systemColor}-600`} />}
            </div>
            <div className={`rounded-lg p-4 max-w-md shadow-sm ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
              <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>{message.text}</p>
              <div className={`flex items-center justify-between mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                <div className="flex items-center text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
                {message.sender === 'ai' && <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100" onClick={() => handleCopyMessage(message.text)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100" onClick={() => handleFeedback(message.id, 'up')}>
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100" onClick={() => handleFeedback(message.id, 'down')}>
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>}
              </div>
            </div>
          </div>)}
        
        {/* 正在输入指示器 */}
        {isTyping && <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 bg-${systemColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
              <Bot className={`w-4 h-4 text-${systemColor}-600`} />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
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
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <textarea value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="输入消息..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" rows={1} />
            <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleVoiceRecord} className={`text-gray-500 hover:text-gray-700 ${isRecording ? 'text-red-500' : ''}`}>
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={handleSend} disabled={!inputMessage.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>;
}