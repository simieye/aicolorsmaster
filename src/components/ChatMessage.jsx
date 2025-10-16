// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Bot, User, Palette, Camera, Mic, Image as ImageIcon } from 'lucide-react';

export function ChatMessage({
  message,
  onImageClick,
  onColorSelect
}) {
  const isUser = message.type === 'user';
  const isBot = message.type === 'bot';
  return <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
        {/* 头像 */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-purple-600 ml-2' : 'bg-gray-200 mr-2'}`}>
          {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
        </div>
        
        {/* 消息内容 */}
        <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`}>
          {/* 文本内容 */}
          {message.content && <p className={`text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>{message.content}</p>}
          
          {/* 图片内容 */}
          {message.images && message.images.length > 0 && <div className="mt-2 grid grid-cols-2 gap-2">
              {message.images.map((image, index) => <div key={index} className="relative">
                  <img src={image.url} alt={image.alt || '上传的图片'} className="w-full h-24 object-cover rounded-lg cursor-pointer" onClick={() => onImageClick && onImageClick(image)} />
                  {image.analysis && <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-xs p-1 rounded">
                      {image.analysis}
                    </div>}
                </div>)}
            </div>}
          
          {/* 色彩推荐 */}
          {message.colors && message.colors.length > 0 && <div className="mt-3">
              <p className={`text-xs font-medium mb-2 ${isUser ? 'text-purple-200' : 'text-gray-600'}`}>推荐色彩：</p>
              <div className="flex flex-wrap gap-2">
                {message.colors.map((color, index) => <button key={index} onClick={() => onColorSelect && onColorSelect(color)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${isUser ? 'border-purple-400 bg-purple-700' : 'border-gray-200 hover:border-purple-300'} transition-colors`}>
                    <div className="w-4 h-4 rounded-full" style={{
                backgroundColor: color.hex
              }}></div>
                    <span className={`text-xs ${isUser ? 'text-white' : 'text-gray-700'}`}>{color.name}</span>
                  </button>)}
              </div>
            </div>}
          
          {/* 配方推荐 */}
          {message.formulas && message.formulas.length > 0 && <div className="mt-3">
              <p className={`text-xs font-medium mb-2 ${isUser ? 'text-purple-200' : 'text-gray-600'}`}>推荐配方：</p>
              <div className="space-y-2">
                {message.formulas.map((formula, index) => <div key={index} className={`p-2 rounded-lg ${isUser ? 'bg-purple-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${isUser ? 'text-white' : 'text-gray-800'}`}>{formula.name}</span>
                      <span className={`text-xs ${isUser ? 'text-purple-200' : 'text-gray-600'}`}>{formula.match}%</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full mr-1" style={{
                  backgroundColor: formula.hex
                }}></div>
                      <span className={`text-xs ${isUser ? 'text-purple-200' : 'text-gray-600'}`}>{formula.hex}</span>
                    </div>
                  </div>)}
              </div>
            </div>}
          
          {/* 时间戳 */}
          <div className={`text-xs mt-1 ${isUser ? 'text-purple-200' : 'text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>;
}