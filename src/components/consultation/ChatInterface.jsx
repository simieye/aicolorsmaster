// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Send, User, Bot, Clock, Star, Phone, Info, CheckCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

// @ts-ignore;
import { LoadingSpinner, MessageEmpty } from '@/components/LoadingStates';
export const ChatInterface = ({
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
  connectionStatus,
  currentServiceType,
  isOnline,
  queuePosition,
  onToggleAI,
  onEndConsultation,
  onRateConsultation,
  showDetails,
  setShowDetails
}) => {
  const {
    toast
  } = useToast();
  return <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? messages.map((message, index) => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-center space-x-2 mb-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'ai' && <Bot className="w-4 h-4 text-blue-500" />}
                {message.sender === 'human' && <User className="w-4 h-4 text-green-500" />}
                {message.sender === 'user' && <User className="w-4 h-4 text-green-500" />}
                {message.sender === 'system' && <Info className="w-4 h-4 text-orange-500" />}
                <span className="text-xs text-muted-foreground">
                  {message.sender === 'ai' ? 'AI客服' : message.sender === 'human' ? '人工客服' : message.sender === 'system' ? '系统' : '用户'} - {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : message.sender === 'system' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'bg-muted'}`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </div>) : <MessageEmpty />}
        
        {isTyping && <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center space-x-2">
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
      </div>

      {/* 输入区域 */}
      <div className="border-t p-4 bg-card">
        <div className="flex items-center space-x-2">
          <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && onSendMessage()} placeholder="请输入您的问题..." disabled={connectionStatus === 'connecting' || !isOnline} className="flex-1 px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50" />
          <Button onClick={onSendMessage} disabled={!inputMessage.trim() || isTyping || connectionStatus === 'connecting' || !isOnline}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
              <Info className="w-4 h-4 mr-1" />
              服务详情
            </Button>
            <Button variant="ghost" size="sm" onClick={onEndConsultation}>
              <Phone className="w-4 h-4 mr-1" />
              结束咨询
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-foreground">服务评价:</span>
            {[1, 2, 3, 4, 5].map(star => <button key={star} onClick={() => onRateConsultation(star)} className="text-yellow-500 hover:text-yellow-600">
                <Star className={`w-4 h-4 ${star <= 3 ? 'fill-current' : ''}`} />
              </button>)}
          </div>
        </div>
      </div>
    </div>;
};