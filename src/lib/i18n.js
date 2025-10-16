
// @ts-ignore;
import { useState, useEffect, createContext, useContext } from 'react';

// 支持的语言列表
export const supportedLanguages = [
  {
    code: 'zh-CN',
    name: '简体中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
    rtl: false,
    dateFormat: 'YYYY-MM-DD',
    numberFormat: 'zh-CN'
  },
  {
    code: 'zh-TW',
    name: '繁体中文',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    rtl: false,
    dateFormat: 'YYYY-MM-DD',
    numberFormat: 'zh-TW'
  },
  {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US'
  },
  {
    code: 'en-GB',
    name: 'English (UK)',
    nativeName: 'English (UK)',
    flag: '🇬🇧',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'en-GB'
  },
  {
    code: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    rtl: false,
    dateFormat: 'YYYY/MM/DD',
    numberFormat: 'ja-JP'
  },
  {
    code: 'ko-KR',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    rtl: false,
    dateFormat: 'YYYY. MM. DD.',
    numberFormat: 'ko-KR'
  },
  {
    code: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'fr-FR'
  },
  {
    code: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false,
    dateFormat: 'DD.MM.YYYY',
    numberFormat: 'de-DE'
  },
  {
    code: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'es-ES'
  },
  {
    code: 'it-IT',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'it-IT'
  },
  {
    code: 'pt-BR',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'pt-BR'
  },
  {
    code: 'ru-RU',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    rtl: false,
    dateFormat: 'DD.MM.YYYY',
    numberFormat: 'ru-RU'
  },
  {
    code: 'ar-SA',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'ar-SA'
  },
  {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'hi-IN'
  },
  {
    code: 'th-TH',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'th-TH'
  },
  {
    code: 'vi-VN',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'vi-VN'
  },
  {
    code: 'id-ID',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'id-ID'
  },
  {
    code: 'ms-MY',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    flag: '🇲🇾',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'ms-MY'
  },
  {
    code: 'tr-TR',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    rtl: false,
    dateFormat: 'DD.MM.YYYY',
    numberFormat: 'tr-TR'
  },
  {
    code: 'pl-PL',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    rtl: false,
    dateFormat: 'DD.MM.YYYY',
    numberFormat: 'pl-PL'
  },
  {
    code: 'nl-NL',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    rtl: false,
    dateFormat: 'DD-MM-YYYY',
    numberFormat: 'nl-NL'
  }
];

// 语言包数据
export const languagePacks = {
  'zh-CN': {
    common: {
      appName: 'AI染发色彩大师',
      home: '首页',
      colorRecognition: '识色',
      formulaGeneration: '配方',
      community: '社区',
      user: '我的',
      search: '搜索',
      settings: '设置',
      language: '语言',
      logout: '退出登录',
      save: '保存',
      cancel: '取消',
      confirm: '确认',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息'
    },
    home: {
      title: 'AI染发色彩大师',
      subtitle: '智能色彩识别，专业配方生成',
      aiChat: 'AI对话',
      cameraRecognition: '拍照识色',
      voiceAssistant: '语音助手',
      smartSearch: '智能搜索',
      trendingColors: '流行色彩',
      recommendedFormulas: '推荐配方',
      communityPosts: '社区动态'
    },
    colorRecognition: {
      title: '颜色识别',
      uploadImage: '上传图片',
      takePhoto: '拍照',
      selectFromGallery: '从相册选择',
      recognitionResult: '识别结果',
      colorCode: '颜色代码',
      colorName: '颜色名称',
      similarColors: '相似颜色',
      recommendedFormulas: '推荐配方'
    },
    formulaGeneration: {
      title: '配方生成',
      currentColor: '当前颜色',
      targetColor: '目标颜色',
      generateFormula: '生成配方',
      formulaResult: '配方结果',
      ingredients: '成分',
      instructions: '使用说明',
      saveFormula: '保存配方'
    },
    community: {
      title: '社区',
      posts: '帖子',
      comments: '评论',
      likes: '点赞',
      shares: '分享',
      createPost: '发布帖子',
      trendingTopics: '热门话题',
      followUsers: '关注用户'
    },
    user: {
      title: '个人中心',
      profile: '个人资料',
      settings: '设置',
      myFormulas: '我的配方',
      myColors: '我的颜色',
      favorites: '收藏',
      history: '历史记录',
      help: '帮助中心',
      feedback: '意见反馈'
    }
  },
  'en-US': {
    common: {
      appName: 'AI Hair Color Master',
      home: 'Home',
      colorRecognition: 'Color ID',
      formulaGeneration: 'Formula',
      community: 'Community',
      user: 'Profile',
      search: 'Search',
      settings: 'Settings',
      language: 'Language',
      logout: 'Logout',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info'
    },
    home: {
      title: 'AI Hair Color Master',
      subtitle: 'Smart Color Recognition, Professional Formula Generation',
      aiChat: 'AI Chat',
      cameraRecognition: 'Camera ID',
      voiceAssistant: 'Voice Assistant',
      smartSearch: 'Smart Search',
      trendingColors: 'Trending Colors',
      recommendedFormulas: 'Recommended Formulas',
      communityPosts: 'Community Posts'
    },
    colorRecognition: {
      title: 'Color Recognition',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      selectFromGallery: 'Select from Gallery',
      recognitionResult: 'Recognition Result',
      colorCode: 'Color Code',
      colorName: 'Color Name',
      similarColors: 'Similar Colors',
      recommendedFormulas: 'Recommended Formulas'
    },
    formulaGeneration: {
      title: 'Formula Generation',
      currentColor: 'Current Color',
      targetColor: 'Target Color',
      generateFormula: 'Generate Formula',
      formulaResult: 'Formula Result',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      saveFormula: 'Save Formula'
    },
    community: {
      title: 'Community',
      posts: 'Posts',
      comments: 'Comments',
      likes: 'Likes',
      shares: 'Shares',
      createPost: 'Create Post',
      trendingTopics: 'Trending Topics',
      followUsers: 'Follow Users'
    },
    user: {
      title: 'User Center',
      profile: 'Profile',
      settings: 'Settings',
      myFormulas: 'My Formulas',
      myColors: 'My Colors',
      favorites: 'Favorites',
      history: 'History',
      help: 'Help Center',
      feedback: 'Feedback'
    }
  },
  'ja-JP': {
    common: {
      appName: 'AIヘアカラーマスター',
      home: 'ホーム',
      colorRecognition: 'カラー認識',
      formulaGeneration: '処方',
      community: 'コミュニティ',
      user: 'プロフィール',
      search: '検索',
      settings: '設定',
      language: '言語',
      logout: 'ログアウト',
      save: '保存',
      cancel: 'キャンセル',
      confirm: '確認',
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      warning: '警告',
      info: '情報'
    },
    home: {
      title: 'AIヘアカラーマスター',
      subtitle: 'スマートカラー認識、プロの処方生成',
      aiChat: 'AIチャット',
      cameraRecognition: 'カメラ認識',
      voiceAssistant: '音声アシスタント',
      smartSearch: 'スマート検索',
      trendingColors: 'トレンドカラー',
      recommendedFormulas: 'おすすめ処方',
      communityPosts: 'コミュニティ投稿'
    },
    colorRecognition: {
      title: 'カラー認識',
      uploadImage: '画像アップロード',
      takePhoto: '写真撮影',
      selectFromGallery: 'ギャラリーから選択',
      recognitionResult: '認識結果',
      colorCode: 'カラーコード',
      colorName: 'カラー名',
      similarColors: '類似カラー',
      recommendedFormulas: 'おすすめ処方'
    },
    formulaGeneration: {
      title: '処方生成',
      currentColor: '現在のカラー',
      targetColor: '目標カラー',
      generateFormula: '処方生成',
      formulaResult: '処方結果',
      ingredients: '成分',
      instructions: '使用説明',
      saveFormula: '処方保存'
    },
    community: {
      title: 'コミュニティ',
      posts: '投稿',
      comments: 'コメント',
      likes: 'いいね',
      shares: 'シェア',
      createPost: '投稿作成',
      trendingTopics: 'トレンドトピック',
      followUsers: 'フォローユーザー'
    },
    user: {
      title: 'ユーザーセンター',
      profile: 'プロフィール',
      settings: '設定',
      myFormulas: 'マイ処方',
      myColors: 'マイカラー',
      favorites: 'お気に入り',
      history: '履歴',
      help: 'ヘルプセンター',
      feedback: 'フィードバック'
    }
  }
};

// 创建国际化上下文
const I18nContext = createContext();

// 国际化Provider组件
export function I18nProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('zh-CN');
  const [isLoading, setIsLoading] = useState(false);

  // 从localStorage获取保存的语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage && supportedLanguages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // 自动检测浏览器语言
      const browserLanguage = navigator.language || navigator.languages[0];
      const matchedLanguage = supportedLanguages.find(lang => 
        lang.code === browserLanguage || lang.code.startsWith(browserLanguage.split('-')[0])
      );
      if (matchedLanguage) {
        setCurrentLanguage(matchedLanguage.code);
      }
    }
  }, []);

  // 切换语言
  const changeLanguage = async (languageCode) => {
    setIsLoading(true);
    try {
      // 模拟语言包加载
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentLanguage(languageCode);
      localStorage.setItem('app-language', languageCode);
      
      // 更新HTML lang属性
      document.documentElement.lang = languageCode;
      
      // 更新RTL方向
      const language = supportedLanguages.find(lang => lang.code === languageCode);
      document.documentElement.dir = language?.rtl ? 'rtl' : 'ltr';
    } catch (error) {
      console.error('Language change failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取翻译文本
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let translation = languagePacks[currentLanguage];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    if (!translation) {
      // 回退到英文
      translation = languagePacks['en-US'];
      for (const k of keys) {
        translation = translation?.[k];
      }
    }
    
    if (!translation) {
      return key; // 如果没有翻译，返回key
    }
    
    // 参数替换
    return Object.keys(params).reduce((str, param) => {
      return str.replace(`{{${param}}}`, params[param]);
    }, translation);
  };

  // 获取当前语言信息
  const getCurrentLanguageInfo = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage);
  };

  // 格式化日期
  const formatDate = (date, format = null) => {
    const language = supportedLanguages.find(lang => lang.code === currentLanguage);
    const dateFormat = format || language?.dateFormat || 'YYYY-MM-DD';
    
    // 简单的日期格式化实现
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return dateFormat
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  };

  // 格式化数字
  const formatNumber = (number) => {
    const language = supportedLanguages.find(lang => lang.code === currentLanguage);
    return new Intl.NumberFormat(language?.numberFormat || 'en-US').format(number);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getCurrentLanguageInfo,
    formatDate,
    formatNumber,
    isLoading,
    supportedLanguages
  };

  return <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>;
}

// 使用国际化的Hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// 导出默认语言包
export default languagePacks;
