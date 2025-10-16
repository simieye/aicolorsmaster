// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Globe, Check, Search, ChevronLeft } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
const languages = [{
  code: 'zh-CN',
  name: '简体中文',
  nativeName: '简体中文',
  flag: '🇨🇳'
}, {
  code: 'zh-TW',
  name: '繁体中文',
  nativeName: '繁體中文',
  flag: '🇹🇼'
}, {
  code: 'en',
  name: 'English',
  nativeName: 'English',
  flag: '🇺🇸'
}, {
  code: 'ja',
  name: 'Japanese',
  nativeName: '日本語',
  flag: '🇯🇵'
}, {
  code: 'ko',
  name: 'Korean',
  nativeName: '한국어',
  flag: '🇰🇷'
}, {
  code: 'es',
  name: 'Spanish',
  nativeName: 'Español',
  flag: '🇪🇸'
}, {
  code: 'fr',
  name: 'French',
  nativeName: 'Français',
  flag: '🇫🇷'
}, {
  code: 'de',
  name: 'German',
  nativeName: 'Deutsch',
  flag: '🇩🇪'
}, {
  code: 'it',
  name: 'Italian',
  nativeName: 'Italiano',
  flag: '🇮🇹'
}, {
  code: 'pt',
  name: 'Portuguese',
  nativeName: 'Português',
  flag: '🇵🇹'
}, {
  code: 'ru',
  name: 'Russian',
  nativeName: 'Русский',
  flag: '🇷🇺'
}, {
  code: 'ar',
  name: 'Arabic',
  nativeName: 'العربية',
  flag: '🇸🇦'
}, {
  code: 'hi',
  name: 'Hindi',
  nativeName: 'हिन्दी',
  flag: '🇮🇳'
}, {
  code: 'th',
  name: 'Thai',
  nativeName: 'ไทย',
  flag: '🇹🇭'
}, {
  code: 'vi',
  name: 'Vietnamese',
  nativeName: 'Tiếng Việt',
  flag: '🇻🇳'
}, {
  code: 'id',
  name: 'Indonesian',
  nativeName: 'Bahasa Indonesia',
  flag: '🇮🇩'
}, {
  code: 'ms',
  name: 'Malay',
  nativeName: 'Bahasa Melayu',
  flag: '🇲🇾'
}, {
  code: 'tr',
  name: 'Turkish',
  nativeName: 'Türkçe',
  flag: '🇹🇷'
}, {
  code: 'pl',
  name: 'Polish',
  nativeName: 'Polski',
  flag: '🇵🇱'
}, {
  code: 'nl',
  name: 'Dutch',
  nativeName: 'Nederlands',
  flag: '🇳🇱'
}, {
  code: 'sv',
  name: 'Swedish',
  nativeName: 'Svenska',
  flag: '🇸🇪'
}, {
  code: 'da',
  name: 'Danish',
  nativeName: 'Dansk',
  flag: '🇩🇰'
}, {
  code: 'no',
  name: 'Norwegian',
  nativeName: 'Norsk',
  flag: '🇳🇴'
}, {
  code: 'fi',
  name: 'Finnish',
  nativeName: 'Suomi',
  flag: '🇫🇮'
}];
export default function LanguageSwitch(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t,
    currentLanguage,
    changeLanguage
  } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'zh-CN');
  const filteredLanguages = languages.filter(lang => lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleLanguageSelect = languageCode => {
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode);
    toast({
      title: "语言切换成功",
      description: `已切换到 ${languages.find(l => l.code === languageCode)?.nativeName}`
    });
  };
  const popularLanguages = languages.slice(0, 8);
  const allLanguages = languages.slice(8);
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <button onClick={() => $w.utils.navigateBack()} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-purple-600" />
            <h1 className="text-lg font-semibold">语言设置</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="搜索语言..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>

        {/* 当前语言 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">当前语言</h3>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {languages.find(l => l.code === selectedLanguage)?.flag}
                </span>
                <div>
                  <div className="font-medium">
                    {languages.find(l => l.code === selectedLanguage)?.nativeName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {languages.find(l => l.code === selectedLanguage)?.name}
                  </div>
                </div>
              </div>
              <Check className="w-5 h-5 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {searchTerm === '' ? <>
            {/* 热门语言 */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">热门语言</h3>
                <div className="space-y-2">
                  {popularLanguages.map(language => <button key={language.code} onClick={() => handleLanguageSelect(language.code)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedLanguage === language.code ? 'bg-purple-50 border-2 border-purple-500' : 'bg-white border-2 border-gray-200 hover:border-purple-300'}`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div className="text-left">
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-sm text-gray-600">{language.name}</div>
                        </div>
                      </div>
                      {selectedLanguage === language.code && <Check className="w-5 h-5 text-purple-600" />}
                    </button>)}
                </div>
              </CardContent>
            </Card>

            {/* 所有语言 */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">所有语言</h3>
                <div className="space-y-2">
                  {allLanguages.map(language => <button key={language.code} onClick={() => handleLanguageSelect(language.code)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedLanguage === language.code ? 'bg-purple-50 border-2 border-purple-500' : 'bg-white border-2 border-gray-200 hover:border-purple-300'}`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div className="text-left">
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-sm text-gray-600">{language.name}</div>
                        </div>
                      </div>
                      {selectedLanguage === language.code && <Check className="w-5 h-5 text-purple-600" />}
                    </button>)}
                </div>
              </CardContent>
            </Card>
          </> : (/* 搜索结果 */
      <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">搜索结果</h3>
              {filteredLanguages.length > 0 ? <div className="space-y-2">
                  {filteredLanguages.map(language => <button key={language.code} onClick={() => handleLanguageSelect(language.code)} className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedLanguage === language.code ? 'bg-purple-50 border-2 border-purple-500' : 'bg-white border-2 border-gray-200 hover:border-purple-300'}`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div className="text-left">
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-sm text-gray-600">{language.name}</div>
                        </div>
                      </div>
                      {selectedLanguage === language.code && <Check className="w-5 h-5 text-purple-600" />}
                    </button>)}
                </div> : <div className="text-center py-8 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>未找到匹配的语言</p>
                </div>}
            </CardContent>
          </Card>)}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="language-switch" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}