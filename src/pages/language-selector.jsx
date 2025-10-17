// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Globe, Search, Download, Check, Star, ChevronRight, Settings, BookOpen, Users, Zap, Shield, ArrowLeft } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function LanguageSelector(props) {
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  const [showSettings, setShowSettings] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 支持的语言列表
  const languages = [{
    code: 'zh-CN',
    name: '简体中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
    region: 'Asia',
    users: '1.4B+',
    progress: 100,
    isDefault: true,
    isRTL: false
  }, {
    code: 'zh-TW',
    name: '繁體中文',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    region: 'Asia',
    users: '23M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    region: 'Americas',
    users: '1.1B+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'en-GB',
    name: 'English (UK)',
    nativeName: 'English (UK)',
    flag: '🇬🇧',
    region: 'Europe',
    users: '67M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'ja-JP',
    name: '日本語',
    nativeName: '日本語',
    flag: '🇯🇵',
    region: 'Asia',
    users: '125M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'ko-KR',
    name: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷',
    region: 'Asia',
    users: '77M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'es-ES',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
    region: 'Europe',
    users: '500M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'fr-FR',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    region: 'Europe',
    users: '280M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'de-DE',
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    region: 'Europe',
    users: '130M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'it-IT',
    name: 'Italiano',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    region: 'Europe',
    users: '65M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'pt-BR',
    name: 'Português',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    region: 'Americas',
    users: '260M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'ru-RU',
    name: 'Русский',
    nativeName: 'Русский',
    flag: '🇷🇺',
    region: 'Europe',
    users: '258M+',
    progress: 100,
    isDefault: false,
    isRTL: false
  }, {
    code: 'ar-SA',
    name: 'العربية',
    nativeName: 'العربية',
    flag: '🇸🇦',
    region: 'Middle East',
    users: '422M+',
    progress: 95,
    isDefault: false,
    isRTL: true
  }, {
    code: 'hi-IN',
    name: 'हिन्दी',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    region: 'Asia',
    users: '600M+',
    progress: 90,
    isDefault: false,
    isRTL: false
  }, {
    code: 'th-TH',
    name: 'ไทย',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    region: 'Asia',
    users: '70M+',
    progress: 85,
    isDefault: false,
    isRTL: false
  }, {
    code: 'vi-VN',
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    region: 'Asia',
    users: '95M+',
    progress: 88,
    isDefault: false,
    isRTL: false
  }, {
    code: 'id-ID',
    name: 'Bahasa Indonesia',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    region: 'Asia',
    users: '200M+',
    progress: 92,
    isDefault: false,
    isRTL: false
  }, {
    code: 'ms-MY',
    name: 'Bahasa Melayu',
    nativeName: 'Bahasa Melayu',
    flag: '🇲🇾',
    region: 'Asia',
    users: '290M+',
    progress: 87,
    isDefault: false,
    isRTL: false
  }, {
    code: 'tr-TR',
    name: 'Türkçe',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    region: 'Europe',
    users: '88M+',
    progress: 93,
    isDefault: false,
    isRTL: false
  }, {
    code: 'pl-PL',
    name: 'Polski',
    nativeName: 'Polski',
    flag: '🇵🇱',
    region: 'Europe',
    users: '50M+',
    progress: 89,
    isDefault: false,
    isRTL: false
  }, {
    code: 'nl-NL',
    name: 'Nederlands',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    region: 'Europe',
    users: '24M+',
    progress: 91,
    isDefault: false,
    isRTL: false
  }, {
    code: 'sv-SE',
    name: 'Svenska',
    nativeName: 'Svenska',
    flag: '🇸🇪',
    region: 'Europe',
    users: '10M+',
    progress: 86,
    isDefault: false,
    isRTL: false
  }, {
    code: 'da-DK',
    name: 'Dansk',
    nativeName: 'Dansk',
    flag: '🇩🇰',
    region: 'Europe',
    users: '6M+',
    progress: 84,
    isDefault: false,
    isRTL: false
  }, {
    code: 'no-NO',
    name: 'Norsk',
    nativeName: 'Norsk',
    flag: '🇳🇴',
    region: 'Europe',
    users: '5M+',
    progress: 82,
    isDefault: false,
    isRTL: false
  }, {
    code: 'fi-FI',
    name: 'Suomi',
    nativeName: 'Suomi',
    flag: '🇫🇮',
    region: 'Europe',
    users: '5M+',
    progress: 80,
    isDefault: false,
    isRTL: false
  }];

  // 区域分组
  const regions = ['Asia', 'Europe', 'Americas', 'Middle East', 'Africa', 'Oceania'];

  // 过滤语言
  const filteredLanguages = languages.filter(lang => lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) || lang.code.toLowerCase().includes(searchTerm.toLowerCase()));

  // 按区域分组语言
  const groupedLanguages = regions.reduce((acc, region) => {
    const regionLanguages = filteredLanguages.filter(lang => lang.region === region);
    if (regionLanguages.length > 0) {
      acc[region] = regionLanguages;
    }
    return acc;
  }, {});

  // 处理语言选择
  const handleLanguageSelect = languageCode => {
    setSelectedLanguage(languageCode);
    const language = languages.find(lang => lang.code === languageCode);
    toast({
      title: "语言切换成功",
      description: `已切换到 ${language.nativeName}`
    });

    // 模拟语言切换
    setTimeout(() => {
      // 这里可以调用实际的语言切换逻辑
      console.log('Language switched to:', languageCode);
    }, 500);
  };

  // 处理语言包下载
  const handleDownloadLanguage = languageCode => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language.progress === 100) {
      toast({
        title: "语言包已存在",
        description: `${language.nativeName} 语言包已安装`
      });
      return;
    }
    setDownloadProgress(prev => ({
      ...prev,
      [languageCode]: 0
    }));

    // 模拟下载进度
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[languageCode] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          toast({
            title: "下载完成",
            description: `${language.nativeName} 语言包已下载完成`
          });
          return {
            ...prev,
            [languageCode]: 100
          };
        }
        return {
          ...prev,
          [languageCode]: currentProgress + 10
        };
      });
    }, 200);
  };

  // 获取进度条颜色
  const getProgressColor = progress => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 80) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 获取区域名称
  const getRegionName = region => {
    const regionNames = {
      'Asia': '亚洲',
      'Europe': '欧洲',
      'Americas': '美洲',
      'Middle East': '中东',
      'Africa': '非洲',
      'Oceania': '大洋洲'
    };
    return regionNames[region] || region;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">语言选择</h1>
            <p className="text-gray-600">选择您偏好的语言，享受本地化体验</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={() => setShowSettings(!showSettings)} variant="outline" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              语言设置
            </Button>
            <Button onClick={() => $w.utils.navigateTo({
            pageId: 'i18n-config',
            params: {}
          })} className="bg-purple-600 hover:bg-purple-700">
              <Globe className="w-4 h-4 mr-2" />
              国际化配置
            </Button>
          </div>
        </div>

        {/* 搜索栏 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索语言..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{languages.length}</p>
                <p className="text-sm text-gray-600">支持语言</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">5B+</p>
                <p className="text-sm text-gray-600">覆盖用户</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">95%</p>
                <p className="text-sm text-gray-600">翻译完成度</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">实时</p>
                <p className="text-sm text-gray-600">语言切换</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 语言列表 */}
        <div className="space-y-6">
          {Object.entries(groupedLanguages).map(([region, regionLanguages]) => <Card key={region}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  {getRegionName(region)} ({regionLanguages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionLanguages.map(language => <div key={language.code} className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${selectedLanguage === language.code ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`} onClick={() => handleLanguageSelect(language.code)}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{language.flag}</span>
                          <div>
                            <h3 className="font-semibold text-gray-800">{language.nativeName}</h3>
                            <p className="text-sm text-gray-600">{language.name}</p>
                          </div>
                        </div>
                        {selectedLanguage === language.code && <Check className="w-5 h-5 text-purple-600" />}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">用户量</span>
                          <span className="font-medium">{language.users}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">翻译进度</span>
                          <span className="font-medium">{language.progress}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full transition-all ${getProgressColor(language.progress)}`} style={{
                      width: `${language.progress}%`
                    }}></div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            {language.isDefault && <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">默认</span>}
                            {language.isRTL && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">RTL</span>}
                          </div>
                          <button onClick={e => {
                      e.stopPropagation();
                      handleDownloadLanguage(language.code);
                    }} className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center">
                            {downloadProgress[language.code] !== undefined ? `${downloadProgress[language.code]}%` : <><Download className="w-3 h-3 mr-1" />下载</>}
                          </button>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 语言设置弹窗 */}
        {showSettings && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">语言设置</h2>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">自动检测语言</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">记住语言选择</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">显示语言代码</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">自动下载语言包</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <Button onClick={() => setShowSettings(false)} variant="outline" className="flex-1">
                  取消
                </Button>
                <Button onClick={() => setShowSettings(false)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  保存
                </Button>
              </div>
            </div>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="language-selector" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}