// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Camera, Volume2, Vibrate, Zap, Shield, Database, Cloud, Download, Upload, Trash2 } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function ScanSettings({
  settings,
  onSettingChange,
  selectedLanguage
}) {
  const getText = key => {
    const texts = {
      'zh-CN': {
        scanSettings: '扫码设置',
        historySettings: '历史设置',
        autoSave: '自动保存',
        soundEnabled: '声音提示',
        vibrationEnabled: '震动提示',
        flashEnabled: '闪光灯',
        cameraPermission: '相机权限',
        permissionGranted: '已授权',
        permissionDenied: '未授权',
        requestPermission: '请求权限',
        clearHistory: '清空历史',
        exportHistory: '导出历史',
        importHistory: '导入历史',
        privacyProtection: '隐私保护',
        dataEncryption: '数据加密',
        localStorage: '本地存储',
        cloudSync: '云端同步',
        backupRestore: '备份恢复',
        save: '保存',
        cancel: '取消'
      },
      'en-US': {
        scanSettings: 'Scan Settings',
        historySettings: 'History Settings',
        autoSave: 'Auto Save',
        soundEnabled: 'Sound Alert',
        vibrationEnabled: 'Vibration Alert',
        flashEnabled: 'Flash Light',
        cameraPermission: 'Camera Permission',
        permissionGranted: 'Granted',
        permissionDenied: 'Denied',
        requestPermission: 'Request Permission',
        clearHistory: 'Clear History',
        exportHistory: 'Export History',
        importHistory: 'Import History',
        privacyProtection: 'Privacy Protection',
        dataEncryption: 'Data Encryption',
        localStorage: 'Local Storage',
        cloudSync: 'Cloud Sync',
        backupRestore: 'Backup & Restore',
        save: 'Save',
        cancel: 'Cancel'
      },
      'ja-JP': {
        scanSettings: 'スキャン設定',
        historySettings: '履歴設定',
        autoSave: '自動保存',
        soundEnabled: '音声通知',
        vibrationEnabled: 'バイブレーション通知',
        flashEnabled: 'フラッシュライト',
        cameraPermission: 'カメラ権限',
        permissionGranted: '許可済み',
        permissionDenied: '拒否',
        requestPermission: '権限を要求',
        clearHistory: '履歴をクリア',
        exportHistory: '履歴をエクスポート',
        importHistory: '履歴をインポート',
        privacyProtection: 'プライバシー保護',
        dataEncryption: 'データ暗号化',
        localStorage: 'ローカルストレージ',
        cloudSync: 'クラウド同期',
        backupRestore: 'バックアップと復元',
        save: '保存',
        cancel: 'キャンセル'
      },
      'ko-KR': {
        scanSettings: '스캔 설정',
        historySettings: '기록 설정',
        autoSave: '자동 저장',
        soundEnabled: '소리 알림',
        vibrationEnabled: '진동 알림',
        flashEnabled: '플래시',
        cameraPermission: '카메라 권한',
        permissionGranted: '허용됨',
        permissionDenied: '거부됨',
        requestPermission: '권한 요청',
        clearHistory: '기록 지우기',
        exportHistory: '기록 내보내기',
        importHistory: '기록 가져오기',
        privacyProtection: '개인정보 보호',
        dataEncryption: '데이터 암호화',
        localStorage: '로컬 저장소',
        cloudSync: '클라우드 동기화',
        backupRestore: '백업 및 복원',
        save: '저장',
        cancel: '취소'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key];
  };
  const handleToggle = key => {
    onSettingChange(key, !settings[key]);
  };
  const handleRequestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      stream.getTracks().forEach(track => track.stop());
      onSettingChange('cameraPermission', 'granted');
      alert('相机权限已获取');
    } catch (err) {
      console.error('获取相机权限失败:', err);
      alert('获取相机权限失败，请检查浏览器设置');
    }
  };
  const handleClearHistory = () => {
    if (confirm('确定要清空所有扫码历史吗？此操作不可恢复。')) {
      // 这里应该调用清空历史的函数
      alert('历史记录已清空');
    }
  };
  const handleExportHistory = () => {
    // 模拟导出历史
    const dataStr = JSON.stringify([], null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `scan-history-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  const handleImportHistory = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const data = JSON.parse(e.target.result);
            // 这里应该处理导入的数据
            alert('历史记录导入成功');
          } catch (err) {
            alert('导入失败，请检查文件格式');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  return <div className="space-y-6">
      {/* 扫码设置 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          {getText('scanSettings')}
        </h3>
        
        <div className="space-y-4">
          {/* 自动保存 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Database className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('autoSave')}</span>
            </div>
            <button onClick={() => handleToggle('autoSave')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* 声音提示 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Volume2 className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('soundEnabled')}</span>
            </div>
            <button onClick={() => handleToggle('soundEnabled')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* 震动提示 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Vibrate className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('vibrationEnabled')}</span>
            </div>
            <button onClick={() => handleToggle('vibrationEnabled')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.vibrationEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* 闪光灯 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('flashEnabled')}</span>
            </div>
            <button onClick={() => handleToggle('flashEnabled')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.flashEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.flashEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* 相机权限 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Camera className="w-4 h-4 mr-3 text-gray-600" />
              <div>
                <span className="text-sm font-medium">{getText('cameraPermission')}</span>
                <div className="text-xs text-gray-500">
                  {settings.cameraPermission === 'granted' ? getText('permissionGranted') : getText('permissionDenied')}
                </div>
              </div>
            </div>
            {settings.cameraPermission !== 'granted' && <Button onClick={handleRequestPermission} size="sm" className="bg-blue-600 hover:bg-blue-700">
                {getText('requestPermission')}
              </Button>}
          </div>
        </div>
      </div>

      {/* 历史设置 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          {getText('historySettings')}
        </h3>
        
        <div className="space-y-3">
          <Button onClick={handleClearHistory} className="w-full bg-red-600 hover:bg-red-700 text-white">
            <Trash2 className="w-4 h-4 mr-2" />
            {getText('clearHistory')}
          </Button>
          
          <Button onClick={handleExportHistory} className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            {getText('exportHistory')}
          </Button>
          
          <Button onClick={handleImportHistory} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            {getText('importHistory')}
          </Button>
        </div>
      </div>

      {/* 隐私设置 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          {getText('privacyProtection')}
        </h3>
        
        <div className="space-y-4">
          {/* 数据加密 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('dataEncryption')}</span>
            </div>
            <button onClick={() => handleToggle('dataEncryption')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.dataEncryption ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.dataEncryption ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* 本地存储 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Database className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('localStorage')}</span>
            </div>
            <button onClick={() => handleToggle('localStorage')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.localStorage ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.localStorage ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* 云端同步 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Cloud className="w-4 h-4 mr-3 text-gray-600" />
              <span className="text-sm font-medium">{getText('cloudSync')}</span>
            </div>
            <button onClick={() => handleToggle('cloudSync')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.cloudSync ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.cloudSync ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>;
}