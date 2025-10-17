// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Globe, Search, Check, Star, Download, Upload, Settings, BarChart3, Users, TrendingUp, ChevronRight, Volume2, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function LanguageSettings(props) {
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
  const [activeTab, setActiveTab] = useState('selection');
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [languageStats, setLanguageStats] = useState(null);

  // 支持的语言列表
  const languages = [{
    code: 'zh-CN',
    name: '简体中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
    popular: true,
    completion: 100
  }, {
    code: 'zh-TW',
    name: '繁体中文',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    popular: true,
    completion: 98
  }, {
    code: 'en-US',
    name: '英语',
    nativeName: 'English',
    flag: '🇺🇸',
    popular: true,
    completion: 100
  }, {
    code: 'ja-JP',
    name: '日语',
    nativeName: '日本語',
    flag: '🇯🇵',
    popular: true,
    completion: 95
  }, {
    code: 'ko-KR',
    name: '韩语',
    nativeName: '한국어',
    flag: '🇰🇷',
    popular: true,
    completion: 92
  }, {
    code: 'es-ES',
    name: '西班牙语',
    nativeName: 'Español',
    flag: '🇪🇸',
    popular: true,
    completion: 88
  }, {
    code: 'fr-FR',
    name: '法语',
    nativeName: 'Français',
    flag: '🇫🇷',
    popular: true,
    completion: 85
  }, {
    code: 'de-DE',
    name: '德语',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    popular: true,
    completion: 82
  }, {
    code: 'it-IT',
    name: '意大利语',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    popular: false,
    completion: 78
  }, {
    code: 'pt-BR',
    name: '葡萄牙语',
    nativeName: 'Português',
    flag: '🇧🇷',
    popular: true,
    completion: 80
  }, {
    code: 'ru-RU',
    name: '俄语',
    nativeName: 'Русский',
    flag: '🇷🇺',
    popular: true,
    completion: 75
  }, {
    code: 'ar-SA',
    name: '阿拉伯语',
    nativeName: 'العربية',
    flag: '🇸🇦',
    popular: false,
    completion: 70
  }, {
    code: 'hi-IN',
    name: '印地语',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    popular: false,
    completion: 65
  }, {
    code: 'th-TH',
    name: '泰语',
    nativeName: 'ไทย',
    flag: '🇹🇭',
    popular: false,
    completion: 60
  }, {
    code: 'vi-VN',
    name: '越南语',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    popular: false,
    completion: 55
  }, {
    code: 'id-ID',
    name: '印尼语',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    popular: false,
    completion: 50
  }, {
    code: 'ms-MY',
    name: '马来语',
    nativeName: 'Bahasa Melayu',
    flag: '🇲🇾',
    popular: false,
    completion: 45
  }, {
    code: 'tr-TR',
    name: '土耳其语',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    popular: false,
    completion: 40
  }, {
    code: 'pl-PL',
    name: '波兰语',
    nativeName: 'Polski',
    flag: '🇵🇱',
    popular: false,
    completion: 35
  }, {
    code: 'nl-NL',
    name: '荷兰语',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    popular: false,
    completion: 30
  }, {
    code: 'sv-SE',
    name: '瑞典语',
    nativeName: 'Svenska',
    flag: '🇸🇪',
    popular: false,
    completion: 25
  }, {
    code: 'da-DK',
    name: '丹麦语',
    nativeName: 'Dansk',
    flag: '🇩🇰',
    popular: false,
    completion: 20
  }, {
    code: 'no-NO',
    name: '挪威语',
    nativeName: 'Norsk',
    flag: '🇳🇴',
    popular: false,
    completion: 15
  }, {
    code: 'fi-FI',
    name: '芬兰语',
    nativeName: 'Suomi',
    flag: '🇫🇮',
    popular: false,
    completion: 10
  }];

  // 初始化数据
  useEffect(() => {
    // 模拟语言统计数据
    setLanguageStats({
      totalLanguages: languages.length,
      completedLanguages: languages.filter(lang => lang.completion === 100).length,
      totalUsers: 125680,
      activeLanguages: 8,
      mostPopular: 'zh-CN',
      recentUpdates: 3,
      translationProgress: 78.5
    });
  }, []);

  // 过滤语言
  const filteredLanguages = languages.filter(lang => lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) || lang.code.toLowerCase().includes(searchTerm.toLowerCase()));

  // 处理语言切换
  const handleLanguageChange = languageCode => {
    setSelectedLanguage(languageCode);
    toast({
      title: "语言切换成功",
      description: `已切换到 ${languages.find(lang => lang.code === languageCode)?.nativeName}`
    });
  };

  // 处理语言预览
  const handlePreview = languageCode => {
    setShowPreview(true);
    setSelectedLanguage(languageCode);
  };

  // 渲染语言选择界面
  const renderLanguageSelection = () => {
    const popularLanguages = languages.filter(lang => lang.popular);
    const otherLanguages = languages.filter(lang => !lang.popular);
    return <div className="space-y-6">
        {/* 当前语言显示 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">当前语言</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {languages.find(lang => lang.code === selectedLanguage)?.flag} {languages.find(lang => lang.code === selectedLanguage)?.nativeName}
                  </p>
                  <p className="text-sm text-gray-600">{languages.find(lang => lang.code === selectedLanguage)?.name}</p>
                </div>
              </div>
              <Button onClick={() => setShowPreview(true)} variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                预览效果
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 搜索框 */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="搜索语言..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </CardContent>
        </Card>

        {/* 热门语言 */}
        {!searchTerm && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                热门语言
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularLanguages.map(language => <div key={language.code} onClick={() => handleLanguageChange(language.code)} className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedLanguage === language.code ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <h4 className="font-semibold">{language.nativeName}</h4>
                          <p className="text-sm text-gray-600">{language.name}</p>
                        </div>
                      </div>
                      {selectedLanguage === language.code && <Check className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">完成度</span>
                        <span className="font-medium">{language.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{
                    width: `${language.completion}%`
                  }}></div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>}

        {/* 所有语言 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              所有语言 ({filteredLanguages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredLanguages.map(language => <div key={language.code} onClick={() => handleLanguageChange(language.code)} className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedLanguage === language.code ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{language.flag}</span>
                      <div>
                        <h5 className="font-medium text-sm">{language.nativeName}</h5>
                        <p className="text-xs text-gray-600">{language.name}</p>
                      </div>
                    </div>
                    {selectedLanguage === language.code && <Check className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full" style={{
                    width: `${language.completion}%`
                  }}></div>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染国际化配置
  const renderI18nConfig = () => {
    return <div className="space-y-6">
        {/* 配置概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">支持语言</p>
                <p className="text-2xl font-bold text-gray-800">{languageStats?.totalLanguages}</p>
                <p className="text-xs text-green-600">+2 本月新增</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">完成翻译</p>
                <p className="text-2xl font-bold text-green-600">{languageStats?.completedLanguages}</p>
                <p className="text-xs text-gray-500">100%完成</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">翻译进度</p>
                <p className="text-2xl font-bold text-purple-600">{languageStats?.translationProgress}%</p>
                <p className="text-xs text-gray-500">平均完成度</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">活跃语言</p>
                <p className="text-2xl font-bold text-blue-600">{languageStats?.activeLanguages}</p>
                <p className="text-xs text-gray-500">正在使用</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 语言包管理 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                语言包管理
              </CardTitle>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加语言包
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languages.slice(0, 5).map(language => <div key={language.code} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h4 className="font-semibold">{language.nativeName}</h4>
                      <p className="text-sm text-gray-600">{language.name} • {language.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{language.completion}% 完成</p>
                      <p className="text-xs text-gray-500">最后更新: 2024-01-15</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        下载
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="w-3 h-3 mr-1" />
                        上传
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 格式配置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              格式配置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">日期格式</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">简体中文</span>
                    <span className="text-sm font-medium">YYYY-MM-DD</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">English</span>
                    <span className="text-sm font-medium">MM/DD/YYYY</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">日本語</span>
                    <span className="text-sm font-medium">YYYY/MM/DD</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">数字格式</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">简体中文</span>
                    <span className="text-sm font-medium">1,234.56</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">English</span>
                    <span className="text-sm font-medium">1,234.56</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <span className="text-sm">Deutsch</span>
                    <span className="text-sm font-medium">1.234,56</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染语言统计
  const renderLanguageStats = () => {
    return <div className="space-y-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总用户数</p>
                <p className="text-2xl font-bold text-gray-800">{languageStats?.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% 本月</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">活跃语言</p>
                <p className="text-2xl font-bold text-blue-600">{languageStats?.activeLanguages}</p>
                <p className="text-xs text-gray-500">本周使用</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">最热门</p>
                <p className="text-2xl font-bold text-purple-600">
                  {languages.find(lang => lang.code === languageStats?.mostPopular)?.flag}
                </p>
                <p className="text-xs text-gray-500">最受欢迎</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">最近更新</p>
                <p className="text-2xl font-bold text-orange-600">{languageStats?.recentUpdates}</p>
                <p className="text-xs text-gray-500">语言包</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 语言使用分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              语言使用分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[{
              language: '简体中文',
              users: 45680,
              percentage: 36.3,
              flag: '🇨🇳'
            }, {
              language: 'English',
              users: 32150,
              percentage: 25.6,
              flag: '🇺🇸'
            }, {
              language: '日本語',
              users: 18920,
              percentage: 15.0,
              flag: '🇯🇵'
            }, {
              language: '한국어',
              users: 12340,
              percentage: 9.8,
              flag: '🇰🇷'
            }, {
              language: 'Español',
              users: 8760,
              percentage: 7.0,
              flag: '🇪🇸'
            }, {
              language: '其他',
              users: 7830,
              percentage: 6.3,
              flag: '🌍'
            }].map((item, index) => <div key={index} className="flex items-center space-x-4">
                  <span className="text-2xl">{item.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{item.language}</span>
                      <span className="text-sm text-gray-600">{item.users.toLocaleString()} 用户 ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{
                    width: `${item.percentage}%`
                  }}></div>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 翻译进度统计 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              翻译进度统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">完成度分布</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span className="text-sm font-medium">100% 完成</span>
                    <span className="text-sm text-green-600">{languages.filter(lang => lang.completion === 100).length} 种语言</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <span className="text-sm font-medium">80-99% 完成</span>
                    <span className="text-sm text-blue-600">{languages.filter(lang => lang.completion >= 80 && lang.completion < 100).length} 种语言</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                    <span className="text-sm font-medium">50-79% 完成</span>
                    <span className="text-sm text-orange-600">{languages.filter(lang => lang.completion >= 50 && lang.completion < 80).length} 种语言</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                    <span className="text-sm font-medium">50% 以下</span>
                    <span className="text-sm text-red-600">{languages.filter(lang => lang.completion < 50).length} 种语言</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">最近更新</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <span>🇹🇭</span>
                      <span className="text-sm font-medium">泰语</span>
                    </div>
                    <span className="text-sm text-gray-600">2024-01-15</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <span>🇻🇳</span>
                      <span className="text-sm font-medium">越南语</span>
                    </div>
                    <span className="text-sm text-gray-600">2024-01-14</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <span>🇮🇩</span>
                      <span className="text-sm font-medium">印尼语</span>
                    </div>
                    <span className="text-sm text-gray-600">2024-01-13</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染预览弹窗
  const renderPreviewModal = () => {
    if (!showPreview) return null;
    const currentLang = languages.find(lang => lang.code === selectedLanguage);
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">语言预览</h3>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="text-4xl">{currentLang?.flag}</span>
              <h2 className="text-2xl font-bold mt-2">{currentLang?.nativeName}</h2>
              <p className="text-gray-600">{currentLang?.name}</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">示例文本</h4>
                <p className="text-sm">欢迎使用AI染发色彩大师</p>
                <p className="text-sm">智能色彩推荐，个性化染发方案</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">日期格式</h4>
                <p className="text-sm">2024年1月15日</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">数字格式</h4>
                <p className="text-sm">1,234.56</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">货币格式</h4>
                <p className="text-sm">¥1,234.56</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                关闭
              </Button>
              <Button onClick={() => {
              handleLanguageChange(selectedLanguage);
              setShowPreview(false);
            }}>
                应用此语言
              </Button>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">多语言设置</h1>
          <p className="text-gray-600">支持20+种语言，全球用户无障碍体验</p>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'selection',
            name: '语言选择',
            icon: Globe
          }, {
            id: 'config',
            name: '国际化配置',
            icon: Settings
          }, {
            id: 'stats',
            name: '语言统计',
            icon: BarChart3
          }].map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>;
          })}
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'selection' && renderLanguageSelection()}
        {activeTab === 'config' && renderI18nConfig()}
        {activeTab === 'stats' && renderLanguageStats()}
      </div>

      {/* 预览弹窗 */}
      {renderPreviewModal()}

      {/* 底部导航 */}
      <TabBar currentPage="language-settings" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}