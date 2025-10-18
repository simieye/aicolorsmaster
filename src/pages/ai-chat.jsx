// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Send, Mic, Image as ImageIcon, Paperclip, Smile, Settings, Bot, User, Clock, CheckCircle, XCircle, AlertCircle, Star, Heart, Share2, Bookmark, ChevronDown, Plus, Zap, Sparkles, MessageCircle, ThumbsUp, ThumbsDown, Copy, Download, Upload, Filter, Search, Globe, Trash2, X, ChevronRight } from 'lucide-react';

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

  // 状态管理
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [showSettings, setShowSettings] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // 支持的语言列表
  const languages = [{
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳'
  }, {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵'
  }, {
    code: 'ko-KR',
    name: '한국어',
    flag: '🇰🇷'
  }];

  // AI模型列表
  const aiModels = [{
    id: 'gpt-4',
    name: 'GPT-4',
    description: '最强大的语言模型，适合复杂任务',
    icon: '🧠',
    color: 'purple'
  }, {
    id: 'gpt-3.5',
    name: 'GPT-3.5',
    description: '快速响应，适合日常对话',
    icon: '⚡',
    color: 'blue'
  }, {
    id: 'claude',
    name: 'Claude',
    description: '专业分析，适合技术问题',
    icon: '🔬',
    color: 'green'
  }, {
    id: 'gemini',
    name: 'Gemini',
    description: '多模态理解，支持图像分析',
    icon: '🌟',
    color: 'orange'
  }];

  // 多语言文本
  const getText = key => {
    const texts = {
      'zh-CN': {
        title: 'AI智能助手',
        subtitle: '专业的染发咨询与色彩推荐',
        inputPlaceholder: '请输入您的问题...',
        send: '发送',
        record: '录音',
        image: '图片',
        file: '文件',
        emoji: '表情',
        settings: '设置',
        newChat: '新建对话',
        chatHistory: '聊天记录',
        searchHistory: '搜索历史记录',
        today: '今天',
        yesterday: '昨天',
        thisWeek: '本周',
        earlier: '更早',
        clearHistory: '清空历史',
        exportHistory: '导出历史',
        modelSettings: '模型设置',
        languageSettings: '语言设置',
        themeSettings: '主题设置',
        about: '关于',
        help: '帮助',
        feedback: '反馈',
        typing: '正在输入...',
        online: '在线',
        offline: '离线',
        copy: '复制',
        share: '分享',
        bookmark: '收藏',
        like: '点赞',
        dislike: '踩',
        regenerate: '重新生成',
        continue: '继续对话',
        stop: '停止生成',
        voiceInput: '语音输入',
        imageInput: '图片输入',
        fileInput: '文件输入',
        emojiInput: '表情输入',
        selectModel: '选择模型',
        clearChat: '清空对话',
        saveChat: '保存对话',
        loadChat: '加载对话',
        deleteChat: '删除对话',
        renameChat: '重命名对话',
        exportChat: '导出对话',
        searchPlaceholder: '搜索对话...',
        noHistory: '暂无聊天记录',
        noMessages: '暂无消息',
        startConversation: '开始新的对话',
        welcomeMessage: '您好！我是AI染发色彩大师，很高兴为您服务！我可以帮您：\n\n🎨 推荐适合您的染发色彩\n📋 解答染发相关问题\n💡 提供专业的染发建议\n🔍 分析您的肤色和发质\n\n请问有什么可以帮助您的吗？',
        errorMessage: '发送失败，请重试',
        successMessage: '发送成功',
        copySuccess: '复制成功',
        shareSuccess: '分享成功',
        bookmarkSuccess: '收藏成功',
        deleteSuccess: '删除成功',
        confirmDelete: '确认删除这条消息吗？',
        confirmClearHistory: '确认清空所有聊天记录吗？'
      },
      'en-US': {
        title: 'AI Assistant',
        subtitle: 'Professional Hair Dye Consulting & Color Recommendations',
        inputPlaceholder: 'Type your message...',
        send: 'Send',
        record: 'Record',
        image: 'Image',
        file: 'File',
        emoji: 'Emoji',
        settings: 'Settings',
        newChat: 'New Chat',
        chatHistory: 'Chat History',
        searchHistory: 'Search History',
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This Week',
        earlier: 'Earlier',
        clearHistory: 'Clear History',
        exportHistory: 'Export History',
        modelSettings: 'Model Settings',
        languageSettings: 'Language Settings',
        themeSettings: 'Theme Settings',
        about: 'About',
        help: 'Help',
        feedback: 'Feedback',
        typing: 'Typing...',
        online: 'Online',
        offline: 'Offline',
        copy: 'Copy',
        share: 'Share',
        bookmark: 'Bookmark',
        like: 'Like',
        dislike: 'Dislike',
        regenerate: 'Regenerate',
        continue: 'Continue',
        stop: 'Stop',
        voiceInput: 'Voice Input',
        imageInput: 'Image Input',
        fileInput: 'File Input',
        emojiInput: 'Emoji Input',
        selectModel: 'Select Model',
        clearChat: 'Clear Chat',
        saveChat: 'Save Chat',
        loadChat: 'Load Chat',
        deleteChat: 'Delete Chat',
        renameChat: 'Rename Chat',
        exportChat: 'Export Chat',
        searchPlaceholder: 'Search conversations...',
        noHistory: 'No chat history',
        noMessages: 'No messages',
        startConversation: 'Start a new conversation',
        welcomeMessage: 'Hello! I am AI Hair Color Master, happy to serve you! I can help you:\n\n🎨 Recommend suitable hair colors\n📋 Answer hair dye related questions\n💡 Provide professional hair dye advice\n🔍 Analyze your skin tone and hair quality\n\nHow can I help you?',
        errorMessage: 'Failed to send, please try again',
        successMessage: 'Sent successfully',
        copySuccess: 'Copied successfully',
        shareSuccess: 'Shared successfully',
        bookmarkSuccess: 'Bookmarked successfully',
        deleteSuccess: 'Deleted successfully',
        confirmDelete: 'Are you sure you want to delete this message?',
        confirmClearHistory: 'Are you sure you want to clear all chat history?'
      },
      'ja-JP': {
        title: 'AIアシスタント',
        subtitle: 'プロのヘアカラー相談と推薦',
        inputPlaceholder: 'メッセージを入力...',
        send: '送信',
        record: '録音',
        image: '画像',
        file: 'ファイル',
        emoji: '絵文字',
        settings: '設定',
        newChat: '新しいチャット',
        chatHistory: 'チャット履歴',
        searchHistory: '履歴を検索',
        today: '今日',
        yesterday: '昨日',
        thisWeek: '今週',
        earlier: 'それ以前',
        clearHistory: '履歴をクリア',
        exportHistory: '履歴をエクスポート',
        modelSettings: 'モデル設定',
        languageSettings: '言語設定',
        themeSettings: 'テーマ設定',
        about: 'について',
        help: 'ヘルプ',
        feedback: 'フィードバック',
        typing: '入力中...',
        online: 'オンライン',
        offline: 'オフライン',
        copy: 'コピー',
        share: '共有',
        bookmark: 'ブックマーク',
        like: 'いいね',
        dislike: 'よくない',
        regenerate: '再生成',
        continue: '続行',
        stop: '停止',
        voiceInput: '音声入力',
        imageInput: '画像入力',
        fileInput: 'ファイル入力',
        emojiInput: '絵文字入力',
        selectModel: 'モデルを選択',
        clearChat: 'チャットをクリア',
        saveChat: 'チャットを保存',
        loadChat: 'チャットを読み込み',
        deleteChat: 'チャットを削除',
        renameChat: 'チャット名を変更',
        exportChat: 'チャットをエクスポート',
        searchPlaceholder: '会話を検索...',
        noHistory: 'チャット履歴がありません',
        noMessages: 'メッセージがありません',
        startConversation: '新しい会話を開始',
        welcomeMessage: 'こんにちは！AIヘアカラーマスターです。お手伝いできることを嬉しく思います！以下のことができます：\n\n🎨 適切なヘアカラーを推薦\n📋 ヘアカラー関連の質問に回答\n💡 プロのヘアカラー助言\n🔭 肌質と髪質を分析\n\nどのようにお手伝いできますか？',
        errorMessage: '送信に失敗しました。もう一度お試しください',
        successMessage: '送信成功',
        copySuccess: 'コピー成功',
        shareSuccess: '共有成功',
        bookmarkSuccess: 'ブックマーク成功',
        deleteSuccess: '削除成功',
        confirmDelete: 'このメッセージを削除してもよろしいですか？',
        confirmClearHistory: 'すべてのチャット履歴をクリアしてもよろしいですか？'
      },
      'ko-KR': {
        title: 'AI 어시스턴트',
        subtitle: '전문 염색 상담 및 색상 추천',
        inputPlaceholder: '메시지를 입력하세요...',
        send: '전송',
        record: '녹음',
        image: '이미지',
        file: '파일',
        emoji: '이모지',
        settings: '설정',
        newChat: '새 채팅',
        chatHistory: '채팅 기록',
        searchHistory: '기록 검색',
        today: '오늘',
        yesterday: '어제',
        thisWeek: '이번 주',
        earlier: '이전',
        clearHistory: '기록 지우기',
        exportHistory: '기록 내보내기',
        modelSettings: '모델 설정',
        languageSettings: '언어 설정',
        themeSettings: '테마 설정',
        about: '정보',
        help: '도움말',
        feedback: '피드백',
        typing: '입력 중...',
        online: '온라인',
        offline: '오프라인',
        copy: '복사',
        share: '공유',
        bookmark: '북마크',
        like: '좋아요',
        dislike: '싫어요',
        regenerate: '재생성',
        continue: '계속',
        stop: '중지',
        voiceInput: '음성 입력',
        imageInput: '이미지 입력',
        fileInput: '파일 입력',
        emojiInput: '이모지 입력',
        selectModel: '모델 선택',
        clearChat: '채팅 지우기',
        saveChat: '채팅 저장',
        loadChat: '채팅 불러오기',
        deleteChat: '채팅 삭제',
        renameChat: '채팅 이름 변경',
        exportChat: '채팅 내보내기',
        searchPlaceholder: '대화 검색...',
        noHistory: '채팅 기록이 없습니다',
        noMessages: '메시지가 없습니다',
        startConversation: '새 대화 시작',
        welcomeMessage: '안녕하세요! AI 헤어컬러 마스터입니다. 도움을 드릴 수 있어 기쁩니다! 다음을 도와드릴 수 있습니다:\n\n🎨 적합한 헤어컬러 추천\n📋 염색 관련 질문 답변\n💡 전문 염색 조언\n🔭 피부질과 머리카락 질 분석\n\n어떻게 도와드릴까요?',
        errorMessage: '전송 실패, 다시 시도하세요',
        successMessage: '전송 성공',
        copySuccess: '복사 성공',
        shareSuccess: '공유 성공',
        bookmarkSuccess: '북마크 성공',
        deleteSuccess: '삭제 성공',
        confirmDelete: '이 메시지를 삭제하시겠습니까?',
        confirmClearHistory: '모든 채팅 기록을 지우시겠습니까?'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key] || key;
  };

  // 初始化聊天记录
  useEffect(() => {
    const mockHistory = [{
      id: 1,
      title: '染发色彩咨询',
      lastMessage: '根据您的肤色，我推荐您尝试...',
      timestamp: new Date('2024-01-15 14:30:00'),
      messageCount: 12,
      model: 'gpt-4'
    }, {
      id: 2,
      title: '护理建议',
      lastMessage: '染发后的护理非常重要...',
      timestamp: new Date('2024-01-15 10:20:00'),
      messageCount: 8,
      model: 'gpt-3.5'
    }, {
      id: 3,
      title: '色彩搭配',
      lastMessage: '这个颜色搭配您的气质很合适...',
      timestamp: new Date('2024-01-14 16:45:00'),
      messageCount: 15,
      model: 'claude'
    }];
    setChatHistory(mockHistory);

    // 初始化欢迎消息
    setMessages([{
      id: 1,
      type: 'bot',
      content: getText('welcomeMessage'),
      timestamp: new Date(),
      model: selectedModel
    }]);
  }, [selectedLanguage]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  // 处理发送消息
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
    setIsLoading(true);
    try {
      // 模拟AI回复
      await new Promise(resolve => setTimeout(resolve, 2000));
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `感谢您的咨询！基于您的问题"${inputMessage}"，我为您提供以下建议：\n\n🎨 **色彩推荐**：根据您的描述，建议您考虑暖色调的染发方案，如焦糖棕或蜂蜜金。\n\n💡 **专业建议**：染发前建议进行皮肤过敏测试，确保安全。\n\n📋 **护理方案**：染发后使用专门的护色洗发水，延长色彩保持时间。\n\n还有什么其他问题需要我帮助的吗？`,
        timestamp: new Date(),
        model: selectedModel
      };
      setMessages(prev => [...prev, botMessage]);
      toast({
        title: getText('successMessage'),
        description: "AI回复已生成"
      });
    } catch (error) {
      toast({
        title: getText('errorMessage'),
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理语音输入
  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "录音结束",
        description: "正在转换语音为文字..."
      });
    } else {
      setIsRecording(true);
      toast({
        title: "开始录音",
        description: "请说话..."
      });
    }
  };

  // 处理图片输入
  const handleImageInput = () => {
    fileInputRef.current?.click();
  };

  // 处理文件上传
  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file) {
      toast({
        title: "文件上传",
        description: `已选择文件: ${file.name}`
      });
    }
  };

  // 处理消息操作
  const handleMessageAction = (messageId, action) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(messages.find(m => m.id === messageId)?.content || '');
        toast({
          title: getText('copySuccess'),
          description: "内容已复制到剪贴板"
        });
        break;
      case 'share':
        toast({
          title: getText('shareSuccess'),
          description: "正在分享..."
        });
        break;
      case 'bookmark':
        toast({
          title: getText('bookmarkSuccess'),
          description: "已添加到收藏"
        });
        break;
      case 'regenerate':
        toast({
          title: "重新生成",
          description: "正在重新生成回复..."
        });
        break;
      case 'delete':
        setMessages(prev => prev.filter(m => m.id !== messageId));
        toast({
          title: getText('deleteSuccess'),
          description: "消息已删除"
        });
        break;
    }
  };

  // 处理键盘事件
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 渲染消息
  const renderMessage = message => {
    const isBot = message.type === 'bot';
    const model = aiModels.find(m => m.id === message.model);
    return <div key={message.id} className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start space-x-3 max-w-3xl`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-purple-100' : 'bg-blue-100'}`}>
            {isBot ? <Bot className="w-5 h-5 text-purple-600" /> : <User className="w-5 h-5 text-blue-600" />}
          </div>
          <div className={`flex-1 ${isBot ? 'order-2' : 'order-1'}`}>
            <div className={`p-4 rounded-lg ${isBot ? 'bg-white border border-gray-200' : 'bg-purple-600 text-white'}`}>
              {isBot && model && <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{model.icon}</span>
                  <span className="text-sm font-medium text-gray-600">{model.name}</span>
                </div>}
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
            <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 ${isBot ? 'justify-start' : 'justify-end'}`}>
              <span>{message.timestamp.toLocaleTimeString()}</span>
              {isBot && <div className="flex space-x-1">
                  <button onClick={() => handleMessageAction(message.id, 'copy')} className="p-1 hover:bg-gray-100 rounded">
                    <Copy className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleMessageAction(message.id, 'share')} className="p-1 hover:bg-gray-100 rounded">
                    <Share2 className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleMessageAction(message.id, 'bookmark')} className="p-1 hover:bg-gray-100 rounded">
                    <Bookmark className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleMessageAction(message.id, 'regenerate')} className="p-1 hover:bg-gray-100 rounded">
                    <Sparkles className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleMessageAction(message.id, 'delete')} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-3 h-3" />
                  </button>
                </div>}
            </div>
          </div>
        </div>
      </div>;
  };

  // 渲染聊天历史
  const renderChatHistory = () => {
    const filteredHistory = chatHistory.filter(chat => chat.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{getText('chatHistory')}</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              {getText('exportHistory')}
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              {getText('clearHistory')}
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder={getText('searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </div>

        <div className="space-y-2">
          {filteredHistory.map(chat => <div key={chat.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{chat.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{chat.timestamp.toLocaleDateString()}</span>
                    <span className="text-xs text-gray-500">{chat.messageCount} 条消息</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {aiModels.find(m => m.id === chat.model)?.name}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>)}
        </div>
      </div>;
  };

  // 渲染设置面板
  const renderSettings = () => {
    return <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{getText('modelSettings')}</h3>
          <div className="space-y-3">
            {aiModels.map(model => <div key={model.id} onClick={() => setSelectedModel(model.id)} className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedModel === model.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{model.icon}</span>
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-gray-600">{model.description}</p>
                    </div>
                  </div>
                  {selectedModel === model.id && <CheckCircle className="w-5 h-5 text-purple-600" />}
                </div>
              </div>)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{getText('languageSettings')}</h3>
          <div className="space-y-3">
            {languages.map(lang => <div key={lang.code} onClick={() => setSelectedLanguage(lang.code)} className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedLanguage === lang.code ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  {selectedLanguage === lang.code && <CheckCircle className="w-5 h-5 text-purple-600" />}
                </div>
              </div>)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{getText('themeSettings')}</h3>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">深色模式</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                </button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">字体大小</span>
                <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>小</option>
                  <option>中</option>
                  <option>大</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{getText('title')}</h1>
              <p className="text-sm text-gray-600">{getText('subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* 语言切换 */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {languages.map(lang => <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)} className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${selectedLanguage === lang.code ? 'bg-purple-50' : ''}`}>
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>)}
              </div>
            </div>
            
            {/* 设置按钮 */}
            <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              {getText('settings')}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex space-x-6 overflow-hidden">
          {/* 聊天区域 */}
          <div className={`flex-1 flex flex-col ${showSettings ? 'w-2/3' : 'w-full'}`}>
            {/* 消息列表 */}
            <Card className="flex-1 flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{getText('noMessages')}</h3>
                    <p className="text-gray-600">{getText('startConversation')}</p>
                  </div> : <div className="space-y-4">
                    {messages.map(renderMessage)}
                    {isLoading && <div className="flex justify-start mb-4">
                        <div className="flex items-start space-x-3 max-w-3xl">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="p-4 rounded-lg bg-white border border-gray-200">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{
                            animationDelay: '0.1s'
                          }}></div>
                                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{
                            animationDelay: '0.2s'
                          }}></div>
                                <span className="text-sm text-gray-600 ml-2">{getText('typing')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                    <div ref={messagesEndRef} />
                  </div>}
              </CardContent>
            </Card>

            {/* 输入区域 */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <Button onClick={handleVoiceInput} variant={isRecording ? "destructive" : "outline"} size="sm">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleImageInput} variant="outline" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 relative">
                    <textarea value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder={getText('inputPlaceholder')} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" rows={1} />
                  </div>
                  
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="bg-purple-600 hover:bg-purple-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 */}
          {showSettings && <div className="w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>{getText('settings')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderSettings()}
                </CardContent>
              </Card>
            </div>}
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="ai-chat" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}