// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Globe, Settings, Download, RefreshCw, Check, AlertCircle, Info } from 'lucide-react';

// @ts-ignore;
import { useI18n, supportedLanguages } from '@/lib/i18n';
// @ts-ignore;
import { LanguageSelector } from '@/components/LanguageSelector';
export function LanguageSettings() {
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
  const currentLangInfo = getCurrentLanguageInfo();

  // 模拟语言包下载状态
  const languagePackStatus = {
    'zh-CN': {
      downloaded: true,
      size: '2.3 MB',
      version: '1.0.0'
    },
    'en-US': {
      downloaded: true,
      size: '2.1 MB',
      version: '1.0.0'
    },
    'ja-JP': {
      downloaded: false,
      size: '2.5 MB',
      version: '1.0.0'
    },
    'ko-KR': {
      downloaded: false,
      size: '2.4 MB',
      version: '1.0.0'
    }
  };
  return <div className="space-y-6">
      {/* 当前语言设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            {t('user.settings.languageSettings', 'Language Settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('user.settings.currentLanguage', 'Current Language')}</h3>
              <p className="text-sm text-gray-600">{t('user.settings.currentLanguageDesc', 'Select your preferred language')}</p>
            </div>
            <LanguageSelector variant="button" showFlag={true} showNativeName={true} />
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">{currentLangInfo?.flag}</span>
            <div className="flex-1">
              <p className="font-medium">{currentLangInfo?.name}</p>
              <p className="text-sm text-gray-600">{currentLangInfo?.nativeName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{currentLangInfo?.code}</p>
              <p className="text-xs text-gray-400">
                {currentLangInfo?.rtl ? 'RTL' : 'LTR'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 自动检测设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            {t('user.settings.autoSettings', 'Automatic Settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('user.settings.autoDetect', 'Auto Detect Language')}</h4>
              <p className="text-sm text-gray-600">{t('user.settings.autoDetectDesc', 'Automatically detect browser language')}</p>
            </div>
            <button onClick={() => setAutoDetect(!autoDetect)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoDetect ? 'bg-purple-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoDetect ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('user.settings.downloadOnWifi', 'Download on WiFi Only')}</h4>
              <p className="text-sm text-gray-600">{t('user.settings.downloadOnWifiDesc', 'Only download language packs on WiFi connection')}</p>
            </div>
            <button onClick={() => setDownloadOnWifi(!downloadOnWifi)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${downloadOnWifi ? 'bg-purple-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${downloadOnWifi ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              {t('user.settings.languagePacks', 'Language Packs')}
            </div>
            <Button variant="outline" size="sm">
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
            return <div key={code} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{langInfo?.flag}</span>
                    <div>
                      <p className="font-medium">{langInfo?.name}</p>
                      <p className="text-sm text-gray-600">{langInfo?.nativeName}</p>
                    </div>
                    {isCurrent && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {t('user.settings.current', 'Current')}
                      </span>}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{status.size}</p>
                      <p className="text-xs text-gray-500">v{status.version}</p>
                    </div>
                    
                    {status.downloaded ? <div className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">{t('user.settings.downloaded', 'Downloaded')}</span>
                      </div> : <Button variant="outline" size="sm">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            {t('user.settings.regionalFormat', 'Regional Format')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">{t('user.settings.dateFormat', 'Date Format')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD.MM.YYYY'].map(format => <button key={format} className={`p-2 border rounded text-sm ${currentLangInfo?.dateFormat === format ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300 hover:border-gray-400'}`}>
                  {formatDate(new Date(), format)}
                </button>)}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('user.settings.numberFormat', 'Number Format')}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[1234.56, 1234.5, 1234, 1234567].map(number => <div key={number} className="p-2 border rounded text-center text-sm border-gray-300">
                  {formatNumber(number)}
                </div>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 提示信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">{t('user.settings.tips', 'Tips')}</h4>
            <p className="text-sm text-blue-700 mt-1">
              {t('user.settings.languageTips', 'Language packs are downloaded automatically when you switch languages. You can manage them in the settings above.')}
            </p>
          </div>
        </div>
      </div>
    </div>;
}
export default LanguageSettings;