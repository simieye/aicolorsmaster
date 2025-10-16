// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Globe, Settings, Download, RefreshCw, Check, AlertCircle, Info, ArrowLeft } from 'lucide-react';

// @ts-ignore;
import { useI18n, supportedLanguages } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { LanguageSelector } from '@/components/LanguageSelector';
export default function LanguageSettings(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    currentLanguage,
    changeLanguage,
    t,
    getCurrentLanguageInfo,
    formatDate,
    formatNumber
  } = useI18n();
  const [autoDetect, setAutoDetect] = useState(true);
  const [downloadOnWifi, setDownloadOnWifi] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const currentLangInfo = getCurrentLanguageInfo();

  // 模拟语言包下载状态
  const languagePackStatus = {
    'zh-CN': {
      downloaded: true,
      size: '2.3 MB',
      version: '1.0.0',
      lastUpdate: '2024-01-15'
    },
    'en-US': {
      downloaded: true,
      size: '2.1 MB',
      version: '1.0.0',
      lastUpdate: '2024-01-15'
    },
    'ja-JP': {
      downloaded: false,
      size: '2.5 MB',
      version: '1.0.0',
      lastUpdate: '2024-01-15'
    },
    'ko-KR': {
      downloaded: false,
      size: '2.4 MB',
      version: '1.0.0',
      lastUpdate: '2024-01-15'
    },
    'fr-FR': {
      downloaded: false,
      size: '2.2 MB',
      version: '1.0.0',
      lastUpdate: '2024-01-15'
    },
    'de-DE': {
      downloaded: false,
      size: '2.1 MB',
      version: '1.0.0',
      lastUpdate: '2024-01-15'
    }
  };

  // 处理语言包下载
  const handleDownloadPack = async languageCode => {
    const langInfo = supportedLanguages.find(lang => lang.code === languageCode);
    toast({
      title: "开始下载",
      description: `正在下载${langInfo?.name}语言包...`
    });

    // 模拟下载过程
    setTimeout(() => {
      toast({
        title: "下载完成",
        description: `${langInfo?.name}语言包已下载完成`
      });
    }, 2000);
  };

  // 处理检查更新
  const handleCheckUpdates = () => {
    toast({
      title: "检查更新",
      description: "正在检查语言包更新..."
    });
    setTimeout(() => {
      toast({
        title: "检查完成",
        description: "所有语言包都是最新版本"
      });
    }, 1500);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => $w.utils.navigateTo({
          pageId: 'user',
          params: {}
        })} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{t('user.settings.languageSettings', 'Language Settings')}</h1>
            <p className="text-gray-600">{t('user.settings.languageSettingsDesc', 'Manage your language preferences and regional settings')}</p>
          </div>
        </div>

        {/* 当前语言设置 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              {t('user.settings.currentLanguage', 'Current Language')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t('user.settings.selectLanguage', 'Select Language')}</h3>
                <p className="text-sm text-gray-600">{t('user.settings.currentLanguageDesc', 'Choose your preferred display language')}</p>
              </div>
              <LanguageSelector variant="button" showFlag={true} showNativeName={true} />
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <span className="text-3xl">{currentLangInfo?.flag}</span>
              <div className="flex-1">
                <p className="font-medium text-lg">{currentLangInfo?.name}</p>
                <p className="text-sm text-gray-600">{currentLangInfo?.nativeName}</p>
                <p className="text-xs text-gray-500 mt-1">{currentLangInfo?.code} • {currentLangInfo?.rtl ? 'RTL' : 'LTR'}</p>
              </div>
              <div className="text-right">
                <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full mb-2">
                  {t('user.settings.current', 'Current')}
                </div>
                <Button size="sm" onClick={() => setShowLanguageModal(true)}>
                  {t('user.settings.changeLanguage', 'Change')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 自动检测设置 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              {t('user.settings.autoSettings', 'Automatic Settings')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{t('user.settings.autoDetect', 'Auto Detect Language')}</h4>
                <p className="text-sm text-gray-600">{t('user.settings.autoDetectDesc', 'Automatically detect browser language')}</p>
              </div>
              <button onClick={() => setAutoDetect(!autoDetect)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoDetect ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoDetect ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{t('user.settings.downloadOnWifi', 'Download on WiFi Only')}</h4>
                <p className="text-sm text-gray-600">{t('user.settings.downloadOnWifiDesc', 'Only download language packs on WiFi connection')}</p>
              </div>
              <button onClick={() => setDownloadOnWifi(!downloadOnWifi)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${downloadOnWifi ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${downloadOnWifi ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{t('user.settings.offlineMode', 'Offline Mode')}</h4>
                <p className="text-sm text-gray-600">{t('user.settings.offlineModeDesc', 'Use downloaded language packs offline')}</p>
              </div>
              <button onClick={() => setOfflineMode(!offlineMode)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${offlineMode ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${offlineMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 语言包管理 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                {t('user.settings.languagePacks', 'Language Packs')}
              </div>
              <Button variant="outline" size="sm" onClick={handleCheckUpdates}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('user.settings.checkUpdates', 'Check Updates')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(languagePackStatus).map(([code, status]) => {
              const langInfo = supportedLanguages.find(lang => lang.code === code);
              const isCurrent = code === currentLanguage;
              return <div key={code} className={`flex items-center justify-between p-4 border rounded-lg transition-all ${isCurrent ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{langInfo?.flag}</span>
                      <div>
                        <p className="font-medium">{langInfo?.name}</p>
                        <p className="text-sm text-gray-600">{langInfo?.nativeName}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{status.size}</span>
                          <span className="text-xs text-gray-500">v{status.version}</span>
                          {status.downloaded && <span className="text-xs text-green-600">• {t('user.settings.downloaded', 'Downloaded')}</span>}
                        </div>
                      </div>
                      {isCurrent && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {t('user.settings.current', 'Current')}
                        </span>}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {status.downloaded ? <div className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-1" />
                          <span className="text-sm">{t('user.settings.downloaded', 'Downloaded')}</span>
                        </div> : <Button variant="outline" size="sm" onClick={() => handleDownloadPack(code)}>
                          <Download className="w-4 h-4 mr-1" />
                          {t('user.settings.download', 'Download')}
                        </Button>}
                    </div>
                  </div>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* 区域格式设置 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              {t('user.settings.regionalFormat', 'Regional Format')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">{t('user.settings.dateFormat', 'Date Format')}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD.MM.YYYY'].map(format => <button key={format} className={`p-3 border rounded-lg text-sm transition-all ${currentLangInfo?.dateFormat === format ? 'border-purple-500 bg-purple-50 text-purple-700 font-medium' : 'border-gray-300 hover:border-gray-400'}`}>
                    {formatDate(new Date(), format)}
                  </button>)}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">{t('user.settings.numberFormat', 'Number Format')}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1234.56, 1234.5, 1234, 1234567].map(number => <div key={number} className="p-3 border rounded-lg text-center text-sm border-gray-300 bg-gray-50">
                    {formatNumber(number)}
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 提示信息 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">{t('user.settings.tips', 'Tips')}</h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                {t('user.settings.languageTips', 'Language packs are downloaded automatically when you switch languages. You can manage them in the settings above. Enable offline mode to use downloaded language packs without internet connection.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 语言选择弹窗 */}
      {showLanguageModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{t('user.settings.selectLanguage', 'Select Language')}</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowLanguageModal(false)}>
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportedLanguages.map(language => {
              const isSelected = language.code === currentLanguage;
              return <button key={language.code} onClick={() => {
                changeLanguage(language.code);
                setShowLanguageModal(false);
              }} className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                      <span className="text-2xl">{language.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900">{language.name}</div>
                        <div className="text-sm text-gray-600">{language.nativeName}</div>
                        <div className="text-xs text-gray-500 mt-1">{language.code}</div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-purple-600" />}
                    </button>;
            })}
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="user" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}