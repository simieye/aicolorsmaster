// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, Sparkles, Palette, Camera, Mic, Image as ImageIcon, History, Settings, HelpCircle, ChevronDown, Volume2, X, Plus, Minus } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AIChat(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showVoicePlayer, setShowVoicePlayer] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recordingInterval = useRef(null);

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      content: '您好！我是AI染发色彩大师的智能助手🤖\n\n我可以为您提供：\n• 🎨 个性化色彩推荐\n• 📸 图片色彩分析\n• 🎤 语音对话咨询\n• 📋 专业配方建议\n\n请问有什么可以帮助您的吗？',
      timestamp: new Date(),
      colors: [{
        name: '微潮紫',
        hex: '#9B59B6'
      }, {
        name: '樱花粉',
        hex: '#FFB6C1'
      }, {
        name: '奶茶棕',
        hex: '#D2B48C'
      }]
    };
    setMessages([welcomeMessage]);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // 录音计时
  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isRecording]);

  // 快速操作选项
  const quickActions = [{
    icon: Palette,
    text: '色彩推荐',
    color: 'bg-purple-100 text-purple-700'
  }, {
    icon: Camera,
    text: '拍照分析',
    color: 'bg-blue-100 text-blue-700'
  }, {
    icon: Mic,
    text: '语音咨询',
    color: 'bg-green-100 text-green-700'
  }, {
    icon: ImageIcon,
    text: '图片识别',
    color: 'bg-orange-100 text-orange-700'
  }];

  // 历史对话
  const chatHistory = [{
    id: 1,
    title: '微潮紫染发咨询',
    date: '2024-01-15',
    preview: '我想染微潮紫色，适合我的肤色吗？'
  }, {
    id: 2,
    title: '春季流行色彩',
    date: '2024-01-14',
    preview: '今年春季流行什么发色？'
  }, {
    id: 3,
    title: '染发护理建议',
    date: '2024-01-13',
    preview: '染发后如何护理头发？'
  }];

  // 处理文本发送
  const handleSendText = async () => {
    if (!inputText.trim() && selectedImages.length === 0) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      images: selectedImages.map(img => ({
        url: img.url,
        alt: img.name,
        analysis: null
      })),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImages([]);
    setIsLoading(true);
    setShowQuickActions(false);

    // 模拟AI回复
    setTimeout(() => {
      const botResponse = generateAIResponse(userMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // 生成AI回复
  const generateAIResponse = userMessage => {
    const responses = [{
      content: '根据您的描述，我为您推荐了几款非常适合的色彩方案！',
      colors: [{
        name: '微潮紫',
        hex: '#9B59B6'
      }, {
        name: '薰衣草紫',
        hex: '#E6E6FA'
      }, {
        name: '雾霾蓝',
        hex: '#778899'
      }],
      formulas: [{
        name: '微潮紫配方',
        hex: '#9B59B6',
        match: 95
      }, {
        name: '薰衣草紫配方',
        hex: '#E6E6FA',
        match: 92
      }]
    }, {
      content: '基于您的图片分析，我检测到了以下色彩信息，并为您推荐了相应的染发方案。',
      colors: [{
        name: '奶茶棕',
        hex: '#D2B48C'
      }, {
        name: '焦糖色',
        hex: '#CD853F'
      }],
      formulas: [{
        name: '奶茶棕配方',
        hex: '#D2B48C',
        match: 88
      }]
    }];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return {
      id: Date.now() + 1,
      type: 'bot',
      ...randomResponse,
      timestamp: new Date()
    };
  };

  // 处理语音录制
  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "开始录音",
      description: "正在录制您的语音..."
    });
  };
  const handleStopRecording = () => {
    setIsRecording(false);
    setIsLoading(true);

    // 模拟语音识别和AI回复
    setTimeout(() => {
      const voiceMessage = {
        id: Date.now(),
        type: 'user',
        content: '🎤 语音消息：我想了解一下今年流行的发色',
        voiceUrl: 'https://example.com/voice.mp3',
        duration: recordingTime,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, voiceMessage]);
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: '我听到了您的语音！今年特别流行这些色彩：',
        colors: [{
          name: '樱花粉',
          hex: '#FFB6C1'
        }, {
          name: '薄荷绿',
          hex: '#98FB98'
        }, {
          name: '珊瑚橙',
          hex: '#FF7F50'
        }],
        formulas: [{
          name: '樱花粉配��',
          hex: '#FFB6C1',
          match: 93
        }, {
          name: '薄荷绿配方',
          hex: '#98FB98',
          match: 89
        }],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  // 处理图片上传
  const handleImageUpload = event => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      type: 'upload'
    }));
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 3));
  };

  // 处理拍照
  const handleCameraCapture = () => {
    // 模拟拍照功能
    const mockImage = {
      file: null,
      url: 'https://images.unsplash.com/photo-1560066985-274c6a8a3f5a?w=300&h=400&fit=crop',
      name: 'camera-photo.jpg',
      type: 'camera'
    };
    setSelectedImages(prev => [...prev, mockImage].slice(0, 3));
    toast({
      title: "拍照成功",
      description: "照片已添加到对话中"
    });
  };

  // 处理图片删除
  const handleImageRemove = index => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 处理快速操作
  const handleQuickAction = action => {
    const actionMessages = {
      '色彩推荐': '我想了解一下适合我的色彩推荐',
      '拍照分析': '我想通过拍照分析头发颜色',
      '语音咨询': '我想通过语音咨询染发建议',
      '图片识别': '我想上传图片进行色彩识别'
    };
    setInputText(actionMessages[action.text] || '');
    setShowQuickActions(false);
    inputRef.current?.focus();
  };

  // 处理图片点击
  const handleImageClick = image => {
    toast({
      title: "图片分析",
      description: "正在分析图片中的色彩信息..."
    });
  };

  // 处理色彩选择
  const handleColorSelect = color => {
    toast({
      title: "色彩选择",
      description: `您选择了${color.name}，正在生成配方...`
    });
  };

  // 处理历史记录选择
  const handleHistorySelect = history => {
    setShowHistory(false);
    toast({
      title: "历史对话",
      description: `正在加载：${history.title}`
    });
  };

  // 格式化录音时间
  const formatRecordingTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 渲染消息组件
  const renderMessage = message => {
    const isUser = message.type === 'user';
    return <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 max-w-[80%]`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-purple-600 ml-2' : 'bg-gray-200'}`}>
            {isUser ? <span className="text-white text-sm">我</span> : <Bot className="w-4 h-4 text-gray-600" />}
          </div>
          <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`}>
            {message.content && <p className="text-sm whitespace-pre-line">{message.content}</p>}
            
            {/* 图片展示 */}
            {message.images && message.images.length > 0 && <div className="grid grid-cols-2 gap-2 mt-2">
                {message.images.map((img, index) => <div key={index} className="relative">
                    <img src={img.url} alt={img.alt} className="w-24 h-24 object-cover rounded-lg cursor-pointer" onClick={() => handleImageClick(img)} />
                  </div>)}
              </div>}
            
            {/* 语音消息 */}
            {message.voiceUrl && <div className="flex items-center space-x-2 mt-2">
                <button onClick={() => setShowVoicePlayer(!showVoicePlayer)} className="p-2 bg-white/20 rounded-full hover:bg-white/30">
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs">{formatRecordingTime(message.duration || 0)}</span>
              </div>}
            
            {/* 色彩推荐 */}
            {message.colors && message.colors.length > 0 && <div className="mt-3">
                <p className="text-xs font-medium mb-2">推荐色彩：</p>
                <div className="flex flex-wrap gap-2">
                  {message.colors.map((color, index) => <button key={index} onClick={() => handleColorSelect(color)} className="flex items-center space-x-1 px-2 py-1 bg-white/20 rounded-full hover:bg-white/30">
                      <div className="w-4 h-4 rounded-full border border-white/50" style={{
                  backgroundColor: color.hex
                }}></div>
                      <span className="text-xs">{color.name}</span>
                    </button>)}
                </div>
              </div>}
            
            {/* 配方推荐 */}
            {message.formulas && message.formulas.length > 0 && <div className="mt-3 space-y-2">
                <p className="text-xs font-medium">推荐配方：</p>
                {message.formulas.map((formula, index) => <div key={index} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{
                  backgroundColor: formula.hex
                }}></div>
                      <span className="text-xs">{formula.name}</span>
                    </div>
                    <span className="text-xs">匹配度 {formula.match}%</span>
                  </div>)}
              </div>}
            
            <p className="text-xs mt-1 opacity-70">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>;
  };
  return <>
      <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
        <div className="flex flex-col h-screen">
          {/* 头部 */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">AI色彩助手</h1>
                  <p className="text-xs text-gray-500">智能色彩对话 • 个性化推荐</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button onClick={() => setShowHistory(!showHistory)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <History className="w-5 h-5 text-gray-600" />
                </button>
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* 聊天区域 */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* 快速操作 */}
            {showQuickActions && messages.length === 1 && <div className="mb-6">
                <div className="text-center mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">选择您需要的服务</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => {
                const Icon = action.icon;
                return <button key={index} onClick={() => handleQuickAction(action)} className={`flex items-center justify-center space-x-2 p-3 rounded-lg ${action.color} hover:opacity-80 transition-opacity`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{action.text}</span>
                    </button>;
              })}
                </div>
              </div>}

            {/* 消息列表 */}
            <div className="space-y-4">
              {messages.map(message => renderMessage(message))}
              
              {/* 加载状态 */}
              {isLoading && <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
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
                  </div>
                </div>}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 输入区域 */}
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            {/* 图片预览 */}
            {selectedImages.length > 0 && <div className="mb-3 flex flex-wrap gap-2">
                {selectedImages.map((image, index) => <div key={index} className="relative">
                    <img src={image.url} alt={image.name} className="w-16 h-16 object-cover rounded-lg" />
                    <button onClick={() => handleImageRemove(index)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>)}
              </div>}

            <div className="flex items-end space-x-2">
              {/* 文本输入 */}
              <div className="flex-1">
                <textarea ref={inputRef} value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendText();
                }
              }} placeholder="输入您的问题..." className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500" rows={1} />
              </div>

              {/* 语音录制 */}
              <button onMouseDown={handleStartRecording} onMouseUp={handleStopRecording} onTouchStart={handleStartRecording} onTouchEnd={handleStopRecording} disabled={isLoading} className={`p-3 rounded-lg transition-colors ${isRecording ? 'bg-red-500 text-white' : 'border border-gray-300 hover:border-purple-500'} disabled:opacity-50`}>
                {isRecording ? <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs">{formatRecordingTime(recordingTime)}</span>
                  </div> : <Mic className="w-5 h-5 text-gray-600" />}
              </button>

              {/* 图片上传 */}
              <button onClick={() => fileInputRef.current?.click()} disabled={isLoading} className="p-3 rounded-lg border border-gray-300 hover:border-purple-500 transition-colors disabled:opacity-50">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>

              {/* 拍照 */}
              <button onClick={handleCameraCapture} disabled={isLoading} className="p-3 rounded-lg border border-gray-300 hover:border-purple-500 transition-colors disabled:opacity-50">
                <Camera className="w-5 h-5 text-gray-600" />
              </button>

              {/* 发送按钮 */}
              <button onClick={handleSendText} disabled={!inputText.trim() && selectedImages.length === 0 || isLoading} className="p-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* 隐藏的文件上传输入 */}
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
          </div>
        </div>
      </div>

      {/* 历史记录侧边栏 */}
      {showHistory && <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">历史对话</h2>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronDown className="w-5 h-5 rotate-180" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
              {chatHistory.map(history => <div key={history.id} onClick={() => handleHistorySelect(history)} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm">{history.title}</h3>
                    <span className="text-xs text-gray-500">{history.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{history.preview}</p>
                </div>)}
            </div>
          </div>
        </div>}

      {/* 设置弹窗 */}
      {showSettings && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">对话设置</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">语音回复</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">智能推荐</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">保存历史</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"></span>
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button onClick={() => setShowSettings(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                取消
              </button>
              <button onClick={() => setShowSettings(false)} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                保存
              </button>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="ai-chat" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </>;
}