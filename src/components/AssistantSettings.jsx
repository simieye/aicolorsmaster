// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Settings, User, Bell, Shield, Palette, Globe, HelpCircle, Save, X } from 'lucide-react';

export function AssistantSettings({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) {
  const [localSettings, setLocalSettings] = useState(settings || {
    language: 'zh-CN',
    theme: 'light',
    notifications: true,
    autoResponse: true,
    soundEnabled: true,
    fontSize: 'medium'
  });
  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };
  const updateSetting = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">AI助手设置</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* 个人设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>个人设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                <input type="text" value={localSettings.username || ''} onChange={e => updateSetting('username', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="请输入用户名" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">语言</label>
                <select value={localSettings.language} onChange={e => updateSetting('language', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="zh-CN">简体中文</option>
                  <option value="zh-TW">繁体中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 通知设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>通知设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">桌面通知</div>
                  <div className="text-sm text-gray-500">接收新消息通知</div>
                </div>
                <Button variant={localSettings.notifications ? "default" : "outline"} onClick={() => updateSetting('notifications', !localSettings.notifications)}>
                  {localSettings.notifications ? '开启' : '关闭'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">声音提醒</div>
                  <div className="text-sm text-gray-500">消息提示音</div>
                </div>
                <Button variant={localSettings.soundEnabled ? "default" : "outline"} onClick={() => updateSetting('soundEnabled', !localSettings.soundEnabled)}>
                  {localSettings.soundEnabled ? '开启' : '关闭'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 界面设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>界面设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">主题</label>
                <select value={localSettings.theme} onChange={e => updateSetting('theme', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="light">浅色主题</option>
                  <option value="dark">深色主题</option>
                  <option value="auto">跟随系统</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">字体大小</label>
                <select value={localSettings.fontSize} onChange={e => updateSetting('fontSize', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="small">小</option>
                  <option value="medium">中</option>
                  <option value="large">大</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 高级设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>高级设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">自动回复</div>
                  <div className="text-sm text-gray-500">启用智能自动回复</div>
                </div>
                <Button variant={localSettings.autoResponse ? "default" : "outline"} onClick={() => updateSetting('autoResponse', !localSettings.autoResponse)}>
                  {localSettings.autoResponse ? '开启' : '关闭'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </div>
    </div>;
}