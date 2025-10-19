// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Settings, Volume2, Bell, Shield, Palette, Globe, HelpCircle, Save, RotateCcw, Bot, Zap, Database, Lock, Eye, EyeOff, Moon, Sun } from 'lucide-react';

export function AssistantSettings({
  settings,
  onSettingsChange,
  className = ''
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings || {
    voiceEnabled: true,
    notifications: true,
    autoResponse: true,
    language: 'zh-CN',
    theme: 'light',
    privacy: true,
    smartSwitch: true,
    taskPriority: true,
    dataSync: true
  });
  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...localSettings,
      [key]: value
    };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };
  const handleReset = () => {
    const defaultSettings = {
      voiceEnabled: true,
      notifications: true,
      autoResponse: true,
      language: 'zh-CN',
      theme: 'light',
      privacy: true,
      smartSwitch: true,
      taskPriority: true,
      dataSync: true
    };
    setLocalSettings(defaultSettings);
    onSettingsChange(defaultSettings);
  };
  const handleSave = () => {
    onSettingsChange(localSettings);
    console.log('设置已保存');
  };
  return <div className={`space-y-6 ${className}`}>
      {/* 基本设置 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">基本设置</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <span className="text-gray-700">语音功能</span>
                  <p className="text-xs text-gray-500">启用语音输入和语音回复</p>
                </div>
              </div>
              <button onClick={() => handleSettingChange('voiceEnabled', !localSettings.voiceEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.voiceEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.voiceEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <span className="text-gray-700">消息通知</span>
                  <p className="text-xs text-gray-500">接收新消息和系统通知</p>
                </div>
              </div>
              <button onClick={() => handleSettingChange('notifications', !localSettings.notifications)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.notifications ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <span className="text-gray-700">自动回复</span>
                  <p className="text-xs text-gray-500">AI自动回复常见问题</p>
                </div>
              </div>
              <button onClick={() => handleSettingChange('autoResponse', !localSettings.autoResponse)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.autoResponse ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.autoResponse ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 智能功能设置 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Zap className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">智能功能</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <span className="text-gray-700">智能切换</span>
                  <p className="text-xs text-gray-500">根据对话内容自动切换AI系统</p>
                </div>
              </div>
              <button onClick={() => handleSettingChange('smartSwitch', !localSettings.smartSwitch)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.smartSwitch ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.smartSwitch ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <span className="text-gray-700">任务优先级</span>
                  <p className="text-xs text-gray-500">智能分配任务优先级</p>
                </div>
              </div>
              <button onClick={() => handleSettingChange('taskPriority', !localSettings.taskPriority)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.taskPriority ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.taskPriority ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="w-4 h-4 text-gray-500 mr-2" />
                <div>
                  <span className="text-gray-700">数据同步</span>
                  <p className="text-xs text-gray-500">跨系统数据自动同步</p>
                </div>
              </div>
              <button onClick={() => handleSettingChange('dataSync', !localSettings.dataSync)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.dataSync ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.dataSync ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 高级设置 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">高级设置</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          
          {showAdvanced && <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <Globe className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">语言设置</span>
                </div>
                <select value={localSettings.language} onChange={e => handleSettingChange('language', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="zh-CN">简体中文</option>
                  <option value="zh-TW">繁体中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Palette className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">主题设置</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleSettingChange('theme', 'light')} className={`p-3 rounded-lg border-2 ${localSettings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <Sun className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs">浅色</span>
                  </button>
                  <button onClick={() => handleSettingChange('theme', 'dark')} className={`p-3 rounded-lg border-2 ${localSettings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <Moon className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs">深色</span>
                  </button>
                  <button onClick={() => handleSettingChange('theme', 'auto')} className={`p-3 rounded-lg border-2 ${localSettings.theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <Settings className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-xs">自动</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="w-4 h-4 text-gray-500 mr-2" />
                  <div>
                    <span className="text-gray-700">隐私保护</span>
                    <p className="text-xs text-gray-500">启用端到端加密</p>
                  </div>
                </div>
                <button onClick={() => handleSettingChange('privacy', !localSettings.privacy)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.privacy ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${localSettings.privacy ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={handleReset} className="flex items-center">
          <RotateCcw className="w-4 h-4 mr-2" />
          重置设置
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <HelpCircle className="w-4 h-4 mr-2" />
            帮助
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </div>
    </div>;
}