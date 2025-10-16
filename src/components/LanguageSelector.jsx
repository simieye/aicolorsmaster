// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Globe, Search, Check, ChevronDown, X, Loader2 } from 'lucide-react';

// @ts-ignore;
import { useI18n, supportedLanguages } from '@/lib/i18n';
export function LanguageSelector({
  variant = 'button',
  size = 'md',
  showFlag = true,
  showNativeName = true,
  className = ''
}) {
  const {
    currentLanguage,
    changeLanguage,
    t,
    isLoading,
    getCurrentLanguageInfo
  } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(supportedLanguages);
  const dropdownRef = useRef(null);
  const currentLangInfo = getCurrentLanguageInfo();

  // 过滤语言列表
  useEffect(() => {
    const filtered = supportedLanguages.filter(lang => lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) || lang.code.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredLanguages(filtered);
  }, [searchTerm]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 处理语言切换
  const handleLanguageChange = async languageCode => {
    if (languageCode === currentLanguage) {
      setIsOpen(false);
      return;
    }
    await changeLanguage(languageCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  // 按钮变体
  if (variant === 'button') {
    return <div className="relative" ref={dropdownRef}>
        <Button variant="outline" size={size} onClick={() => setIsOpen(!isOpen)} disabled={isLoading} className={`flex items-center space-x-2 ${className}`}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
              {showFlag && currentLangInfo?.flag && <span className="text-lg">{currentLangInfo.flag}</span>}
              <Globe className="w-4 h-4" />
              <span>{showNativeName ? currentLangInfo?.nativeName : currentLangInfo?.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </>}
        </Button>

        {isOpen && <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder={t('common.search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {filteredLanguages.map(language => {
            const isSelected = language.code === currentLanguage;
            return <button key={language.code} onClick={() => handleLanguageChange(language.code)} className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}>
                    <span className="text-xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{language.name}</div>
                      <div className="text-sm text-gray-500">{language.nativeName}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-purple-600" />}
                  </button>;
          })}
              
              {filteredLanguages.length === 0 && <div className="p-4 text-center text-gray-500">
                  {t('common.noResults', 'No languages found')}
                </div>}
            </div>
          </div>}
      </div>;
  }

  // 下拉菜单变体
  if (variant === 'dropdown') {
    return <div className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} disabled={isLoading} className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors ${className}`}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
              {showFlag && currentLangInfo?.flag && <span className="text-lg">{currentLangInfo.flag}</span>}
              <Globe className="w-4 h-4" />
              <span>{showNativeName ? currentLangInfo?.nativeName : currentLangInfo?.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </>}
        </button>

        {isOpen && <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder={t('common.search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {filteredLanguages.map(language => {
            const isSelected = language.code === currentLanguage;
            return <button key={language.code} onClick={() => handleLanguageChange(language.code)} className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}>
                    <span className="text-xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{language.name}</div>
                      <div className="text-sm text-gray-500">{language.nativeName}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-purple-600" />}
                  </button>;
          })}
              
              {filteredLanguages.length === 0 && <div className="p-4 text-center text-gray-500">
                  {t('common.noResults', 'No languages found')}
                </div>}
            </div>
          </div>}
      </div>;
  }

  // 简单选择器变体
  return <div className="relative" ref={dropdownRef}>
      <select value={currentLanguage} onChange={e => handleLanguageChange(e.target.value)} disabled={isLoading} className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}>
        {supportedLanguages.map(language => <option key={language.code} value={language.code}>
            {showFlag && `${language.flag} `}{language.name}
          </option>)}
      </select>
      
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>}
    </div>;
}

// 语言切换弹窗组件
export function LanguageModal({
  isOpen,
  onClose,
  title = '选择语言 / Select Language'
}) {
  const {
    currentLanguage,
    changeLanguage,
    t,
    isLoading
  } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(supportedLanguages);

  // 过滤语言列表
  useEffect(() => {
    const filtered = supportedLanguages.filter(lang => lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) || lang.code.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredLanguages(filtered);
  }, [searchTerm]);

  // 处理语言切换
  const handleLanguageChange = async languageCode => {
    if (languageCode === currentLanguage) {
      onClose();
      return;
    }
    await changeLanguage(languageCode);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder={t('common.search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLanguages.map(language => {
            const isSelected = language.code === currentLanguage;
            return <button key={language.code} onClick={() => handleLanguageChange(language.code)} disabled={isLoading} className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <span className="text-3xl">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">{language.name}</div>
                    <div className="text-sm text-gray-600">{language.nativeName}</div>
                    <div className="text-xs text-gray-500 mt-1">{language.code}</div>
                  </div>
                  {isSelected && <Check className="w-6 h-6 text-purple-600" />}
                </button>;
          })}
          </div>
          
          {filteredLanguages.length === 0 && <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">{t('common.noResults', 'No languages found')}</p>
            </div>}
        </div>
      </div>
    </div>;
}
export default LanguageSelector;