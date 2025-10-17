// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Globe, Download, Upload, Edit, Save, Search, Filter, Plus, Trash2, Eye, CheckCircle, AlertCircle, Clock, Users, BookOpen, Settings, ArrowLeft, FileText, Database, Zap, Shield } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function I18nConfig(props) {
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
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  const [editingKey, setEditingKey] = useState(null);
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // 模拟翻译数据
  const mockTranslations = {
    'zh-CN': {
      'app.name': 'AI染发色彩大师',
      'app.description': '智能染发色彩分析与配方生成系统',
      'home.title': '首页',
      'home.subtitle': '开启智能染发之旅',
      'color.recognition': '色彩识别',
      'formula.generation': '配方生成',
      'community': '社区',
      'profile': '个人中心',
      'settings': '设置',
      'login': '登录',
      'register': '注册',
      'logout': '退出登录',
      'save': '保存',
      'cancel': '取消',
      'confirm': '确认',
      'delete': '删除',
      'edit': '编辑',
      'search': '搜索',
      'filter': '筛选',
      'loading': '加载中...',
      'success': '成功',
      'error': '错误',
      'warning': '警告',
      'info': '信息'
    },
    'en-US': {
      'app.name': 'AI Hair Color Master',
      'app.description': 'Intelligent Hair Color Analysis and Formula Generation System',
      'home.title': 'Home',
      'home.subtitle': 'Start Your Smart Hair Color Journey',
      'color.recognition': 'Color Recognition',
      'formula.generation': 'Formula Generation',
      'community': 'Community',
      'profile': 'Profile',
      'settings': 'Settings',
      'login': 'Login',
      'register': 'Register',
      'logout': 'Logout',
      'save': 'Save',
      'cancel': 'Cancel',
      'confirm': 'Confirm',
      'delete': 'Delete',
      'edit': 'Edit',
      'search': 'Search',
      'filter': 'Filter',
      'loading': 'Loading...',
      'success': 'Success',
      'error': 'Error',
      'warning': 'Warning',
      'info': 'Info'
    },
    'ja-JP': {
      'app.name': 'AIヘアカラーマスター',
      'app.description': 'インテリジェントヘアカラー分析と処方生成システム',
      'home.title': 'ホーム',
      'home.subtitle': 'スマートヘアカラーの旅を始めよう',
      'color.recognition': 'カラー認識',
      'formula.generation': '処方生成',
      'community': 'コミュニティ',
      'profile': 'プロフィール',
      'settings': '設定',
      'login': 'ログイン',
      'register': '登録',
      'logout': 'ログアウト',
      'save': '保存',
      'cancel': 'キャンセル',
      'confirm': '確認',
      'delete': '削除',
      'edit': '編集',
      'search': '検索',
      'filter': 'フィルター',
      'loading': '読み込み中...',
      'success': '成功',
      'error': 'エラー',
      'warning': '警告',
      'info': '情報'
    }
  };

  // 支持的语言
  const supportedLanguages = [{
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳',
    progress: 100,
    lastUpdate: '2024-01-15',
    translator: 'AI翻译 + 人工校对'
  }, {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸',
    progress: 100,
    lastUpdate: '2024-01-15',
    translator: 'Native Speaker'
  }, {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵',
    progress: 95,
    lastUpdate: '2024-01-14',
    translator: 'AI翻译'
  }];

  // 翻译统计
  const translationStats = {
    totalKeys: 50,
    translatedKeys: 48,
    missingKeys: 2,
    progress: 96,
    lastUpdate: '2024-01-15 14:30',
    contributors: 12
  };

  // 初始化翻译数据
  useEffect(() => {
    setTranslations(mockTranslations);
  }, []);

  // 处理翻译编辑
  const handleEditTranslation = (key, language, value) => {
    setTranslations(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        [key]: value
      }
    }));
  };

  // 保存翻译
  const handleSaveTranslations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "保存成功",
        description: "翻译内容已保存"
      });
    }, 1500);
  };

  // 导入翻译
  const handleImportTranslations = file => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowImportModal(false);
      toast({
        title: "导入成功",
        description: "翻译文件已导入"
      });
    }, 2000);
  };

  // 导出翻译
  const handleExportTranslations = format => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowExportModal(false);
      toast({
        title: "导出成功",
        description: `翻译文件已导出为 ${format} 格式`
      });
    }, 1500);
  };

  // 获取翻译键列表
  const getTranslationKeys = () => {
    const allKeys = new Set();
    Object.values(translations).forEach(langTranslations => {
      Object.keys(langTranslations).forEach(key => allKeys.add(key));
    });
    return Array.from(allKeys);
  };

  // 过滤翻译键
  const filteredKeys = getTranslationKeys().filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()));

  // 渲染概览页面
  const renderOverview = () => {
    return <div className="space-y-6">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{supportedLanguages.length}</p>
                <p className="text-sm text-gray-600">支持语言</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{translationStats.totalKeys}</p>
                <p className="text-sm text-gray-600">翻译条目</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{translationStats.progress}%</p>
                <p className="text-sm text-gray-600">完成度</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{translationStats.contributors}</p>
                <p className="text-sm text-gray-600">贡献者</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 语言状态 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              语言状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportedLanguages.map(language => <div key={language.code} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h4 className="font-semibold">{language.name}</h4>
                      <p className="text-sm text-gray-600">最后更新: {language.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">翻译进度</p>
                      <p className="font-medium">{language.progress}%</p>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${language.progress === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{
                    width: `${language.progress}%`
                  }}></div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 mr-1" />
                      编辑
                    </Button>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                导入翻译
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">从JSON、CSV或XML文件导入翻译内容</p>
              <Button onClick={() => setShowImportModal(true)} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                选择文件导入
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                导出翻译
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">导出翻译内容为多种格式</p>
              <Button onClick={() => setShowExportModal(true)} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                导出翻译文件
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染翻译编辑器
  const renderEditor = () => {
    return <div className="space-y-6">
        {/* 语言选择和搜索 */}
        <div className="flex flex-col md:flex-row gap-4">
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            {supportedLanguages.map(language => <option key={language.code} value={language.code}>
                {language.flag} {language.name}
              </option>)}
          </select>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索翻译键..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <Button onClick={handleSaveTranslations} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? '保存中...' : '保存'}
          </Button>
        </div>

        {/* 翻译编辑表格 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              翻译编辑器
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">翻译键</th>
                    <th className="text-left py-3 px-4">翻译值</th>
                    <th className="text-left py-3 px-4">状态</th>
                    <th className="text-center py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeys.map(key => <tr key={key} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{key}</td>
                      <td className="py-3 px-4">
                        {editingKey === key ? <input type="text" value={translations[selectedLanguage]?.[key] || ''} onChange={e => handleEditTranslation(key, selectedLanguage, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus /> : <span>{translations[selectedLanguage]?.[key] || <span className="text-gray-400 italic">未翻译</span>}</span>}
                      </td>
                      <td className="py-3 px-4">
                        {translations[selectedLanguage]?.[key] ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已翻译</span> : <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">未翻译</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {editingKey === key ? <>
                              <Button size="sm" onClick={() => setEditingKey(null)}>
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingKey(null)}>
                                取消
                              </Button>
                            </> : <>
                              <Button size="sm" variant="outline" onClick={() => setEditingKey(key)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                            </>}
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染设置页面
  const renderSettings = () => {
    return <div className="space-y-6">
        {/* 基本设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              基本设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">自动翻译</h4>
                  <p className="text-sm text-gray-600">使用AI自动翻译缺失的文本</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">实时预览</h4>
                  <p className="text-sm text-gray-600">编辑时实时预览翻译效果</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">备份翻译</h4>
                  <p className="text-sm text-gray-600">自动备份翻译数据</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">版本控制</h4>
                  <p className="text-sm text-gray-600">启用翻译版本控制</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"></span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 高级设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              高级设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">默认语言</h4>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {supportedLanguages.map(language => <option key={language.code} value={language.code}>
                      {language.flag} {language.name}
                    </option>)}
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">翻译缓存时间</h4>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="1">1小时</option>
                  <option value="6">6小时</option>
                  <option value="24">24小时</option>
                  <option value="168">7天</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">API密钥</h4>
                <input type="password" placeholder="输入翻译API密钥" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 危险操作 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              危险操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">清除所有翻译</h4>
                  <p className="text-sm text-gray-600">删除所有翻译数据，此操作不可恢复</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  清除
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">重置为默认</h4>
                  <p className="text-sm text-gray-600">重置所有设置为默认值</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  重置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">国际化配置</h1>
            <p className="text-gray-600">管理多语言翻译和国际化设置</p>
          </div>
          <Button onClick={() => $w.utils.navigateTo({
          pageId: 'language-selector',
          params: {}
        })} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回语言选择
          </Button>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'overview',
            name: '概览',
            icon: Globe
          }, {
            id: 'editor',
            name: '翻译编辑器',
            icon: Edit
          }, {
            id: 'settings',
            name: '设置',
            icon: Settings
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'editor' && renderEditor()}
        {activeTab === 'settings' && renderSettings()}

        {/* 导入弹窗 */}
        {showImportModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">导入翻译</h2>
                <button onClick={() => setShowImportModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择文件</label>
                  <input type="file" accept=".json,.csv,.xml" onChange={e => handleImportTranslations(e.target.files[0])} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">目标语言</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {supportedLanguages.map(language => <option key={language.code} value={language.code}>
                        {language.flag} {language.name}
                      </option>)}
                  </select>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="overwrite" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                  <label htmlFor="overwrite" className="ml-2 text-sm text-gray-700">覆盖现有翻译</label>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <Button onClick={() => setShowImportModal(false)} variant="outline" className="flex-1">
                  取消
                </Button>
                <Button onClick={() => handleImportTranslations()} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  导入
                </Button>
              </div>
            </div>
          </div>}

        {/* 导出弹窗 */}
        {showExportModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">导出翻译</h2>
                <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">导出格式</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="xml">XML</option>
                    <option value="xlsx">Excel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择语言</label>
                  <div className="space-y-2">
                    {supportedLanguages.map(language => <label key={language.code} className="flex items-center">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                        <span className="ml-2 text-sm">{language.flag} {language.name}</span>
                      </label>)}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <Button onClick={() => setShowExportModal(false)} variant="outline" className="flex-1">
                  取消
                </Button>
                <Button onClick={() => handleExportTranslations('json')} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  导出
                </Button>
              </div>
            </div>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="i18n-config" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}