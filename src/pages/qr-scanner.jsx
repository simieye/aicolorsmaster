// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { QrCode, History, Settings, Globe, BarChart3 } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';

import { TabBar } from '@/components/TabBar';
import { QRScanner } from '@/components/QRScanner';
import { ScanResult } from '@/components/ScanResult';
import { ScanHistory } from '@/components/ScanHistory';
import { ScanSettings } from '@/components/ScanSettings';
export default function QRScannerPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [activeTab, setActiveTab] = useState('scan');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  const [settings, setSettings] = useState({
    autoSave: true,
    soundEnabled: true,
    vibrationEnabled: true,
    flashEnabled: false,
    cameraPermission: 'denied',
    dataEncryption: true,
    localStorage: true,
    cloudSync: false
  });

  // 支持的语言列表
  const languages = [{
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳'
  }, {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵'
  }, {
    code: 'ko-KR',
    name: '한국어',
    flag: '🇰🇷'
  }];

  // 获取文本
  const getText = key => {
    const texts = {
      'zh-CN': {
        title: '智能扫码',
        subtitle: '快速识别二维码、条形码等多种码制',
        scanHistory: '扫码历史',
        settings: '设置',
        statistics: '统计信息',
        totalScans: '总扫码次数',
        todayScans: '今日扫码',
        successRate: '成功率',
        averageTime: '平均用时',
        popularTypes: '热门类型',
        recentActivity: '最近活动'
      },
      'en-US': {
        title: 'Smart QR Scanner',
        subtitle: 'Quickly recognize QR codes, barcodes and more',
        scanHistory: 'Scan History',
        settings: 'Settings',
        statistics: 'Statistics',
        totalScans: 'Total Scans',
        todayScans: "Today's Scans",
        successRate: 'Success Rate',
        averageTime: 'Average Time',
        popularTypes: 'Popular Types',
        recentActivity: 'Recent Activity'
      },
      'ja-JP': {
        title: 'スマートQRスキャナー',
        subtitle: 'QRコード、バーコードなどを素早く認識',
        scanHistory: 'スキャン履歴',
        settings: '設定',
        statistics: '統計',
        totalScans: '総スキャン数',
        todayScans: '今日のスキャン',
        successRate: '成功率',
        averageTime: '平均時間',
        popularTypes: '人気のタイプ',
        recentActivity: '最近のアクティビティ'
      },
      'ko-KR': {
        title: '스마트 QR 스캐너',
        subtitle: 'QR코드, 바코드 등을 빠르게 인식',
        scanHistory: '스캔 기록',
        settings: '설정',
        statistics: '통계',
        totalScans: '총 스캔 횟수',
        todayScans: '오늘 스캔',
        successRate: '성공률',
        averageTime: '평균 시간',
        popularTypes: '인기 유형',
        recentActivity: '최근 활동'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key];
  };

  // 初始化历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('scanHistory');
    if (savedHistory) {
      try {
        setScanHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('加载历史记录失败:', err);
      }
    }

    // 检查相机权限
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.permissions.query({
        name: 'camera'
      }).then(result => {
        setSettings(prev => ({
          ...prev,
          cameraPermission: result.state
        }));
      }).catch(() => {
        setSettings(prev => ({
          ...prev,
          cameraPermission: 'denied'
        }));
      });
    }
  }, []);

  // 保存历史记录
  useEffect(() => {
    if (settings.autoSave && scanHistory.length > 0) {
      localStorage.setItem('scanHistory', JSON.stringify(scanHistory));
    }
  }, [scanHistory, settings.autoSave]);

  // 开始扫码
  const handleStartScan = () => {
    setIsScanning(true);
    // 模拟扫码过程
    setTimeout(() => {
      const mockResult = {
        type: 'qr',
        content: `https://example.com/scan/${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      handleScanResult(mockResult);
      setIsScanning(false);
    }, 3000);
  };

  // 停止扫码
  const handleStopScan = () => {
    setIsScanning(false);
  };

  // 处理扫码结果
  const handleScanResult = result => {
    setScanResult(result);
    if (settings.autoSave) {
      setScanHistory(prev => [result, ...prev]);
    }
    if (settings.soundEnabled) {
      // 播放成功音效
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(() => {});
    }
    if (settings.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(200);
    }
    toast({
      title: "扫码成功",
      description: "已成功识别二维码"
    });
  };

  // 删除历史记录项
  const handleDeleteHistoryItem = index => {
    setScanHistory(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "删除成功",
      description: "历史记录已删除"
    });
  };

  // 更新设置
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 计算统计数据
  const statistics = {
    totalScans: scanHistory.length,
    todayScans: scanHistory.filter(item => {
      const today = new Date();
      const itemDate = new Date(item.timestamp);
      return itemDate.toDateString() === today.toDateString();
    }).length,
    successRate: 95,
    // 模拟数据
    averageTime: 2.3 // 模拟数据
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <QrCode className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-xl font-bold text-white">{getText('title')}</h1>
                <p className="text-sm text-white/80">{getText('subtitle')}</p>
              </div>
            </div>
            
            {/* 语言选择 */}
            <div className="flex items-center space-x-4">
              <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                {languages.map(lang => <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.flag} {lang.name}
                  </option>)}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* 统计信息卡片 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              {getText('statistics')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{statistics.totalScans}</div>
                <div className="text-sm text-white/80">{getText('totalScans')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{statistics.todayScans}</div>
                <div className="text-sm text-white/80">{getText('todayScans')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{statistics.successRate}%</div>
                <div className="text-sm text-white/80">{getText('successRate')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{statistics.averageTime}s</div>
                <div className="text-sm text-white/80">{getText('averageTime')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能标签页 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          {/* 标签导航 */}
          <div className="flex border-b border-white/20">
            <button onClick={() => setActiveTab('scan')} className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'scan' ? 'text-white border-b-2 border-white' : 'text-white/70 hover:text-white'}`}>
              <QrCode className="w-5 h-5 mx-auto mb-1" />
              扫码
            </button>
            <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'history' ? 'text-white border-b-2 border-white' : 'text-white/70 hover:text-white'}`}>
              <History className="w-5 h-5 mx-auto mb-1" />
              {getText('scanHistory')}
            </button>
            <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'settings' ? 'text-white border-b-2 border-white' : 'text-white/70 hover:text-white'}`}>
              <Settings className="w-5 h-5 mx-auto mb-1" />
              {getText('settings')}
            </button>
          </div>

          {/* 标签内容 */}
          <div className="p-6">
            {activeTab === 'scan' && <QRScanner onScanResult={handleScanResult} isScanning={isScanning} onStartScan={handleStartScan} onStopScan={handleStopScan} selectedLanguage={selectedLanguage} />}
            
            {activeTab === 'history' && <ScanHistory history={scanHistory} onDeleteItem={handleDeleteHistoryItem} selectedLanguage={selectedLanguage} />}
            
            {activeTab === 'settings' && <ScanSettings settings={settings} onSettingChange={handleSettingChange} selectedLanguage={selectedLanguage} />}
          </div>
        </div>
      </main>

      {/* 扫码结果弹窗 */}
      {scanResult && <ScanResult result={scanResult} onClose={() => setScanResult(null)} selectedLanguage={selectedLanguage} />}

      {/* 底部导航 */}
      <TabBar />
    </div>;
}