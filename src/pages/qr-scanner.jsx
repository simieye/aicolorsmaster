// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Camera, CameraOff, Scan, Upload, History, Settings, Zap, CheckCircle, AlertCircle, Copy, Share2, Download } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner } from '@/components/LoadingSpinner';
// @ts-ignore;
import { QRScanner } from '@/components/QRScanner';
// @ts-ignore;
import { ScanResult } from '@/components/ScanResult';
// @ts-ignore;
import { ScanHistory } from '@/components/ScanHistory';
// @ts-ignore;
import { ScanSettings } from '@/components/ScanSettings';
// @ts-ignore;

export default function QRScannerPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('scanner');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    autoSave: true,
    vibrate: true,
    sound: true,
    continuous: false
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  useEffect(() => {
    // 加载扫描历史
    const savedHistory = localStorage.getItem('qrScanHistory');
    if (savedHistory) {
      setScanHistory(JSON.parse(savedHistory));
    }
    return () => {
      // 清理摄像头
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setIsScanning(true);
    } catch (error) {
      console.error('无法访问摄像头:', error);
      alert('无法访问摄像头，请检查权限设置');
    }
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };
  const handleScan = result => {
    setScanResult(result);
    if (settings.autoSave) {
      const newHistory = [{
        id: Date.now(),
        content: result,
        timestamp: new Date(),
        type: 'qr'
      }, ...scanHistory];
      setScanHistory(newHistory);
      localStorage.setItem('qrScanHistory', JSON.stringify(newHistory));
    }
    if (settings.vibrate) {
      navigator.vibrate && navigator.vibrate(200);
    }
    if (settings.sound) {
      // 播放扫描成功音效
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(() => {});
    }
  };
  const handleUpload = event => {
    const file = event.target.files[0];
    if (file) {
      // 这里可以添加图片上传和解析逻辑
      console.log('上传文件:', file);
    }
  };
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板');
    });
  };
  const shareResult = async result => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR码扫描结果',
          text: result
        });
      } catch (error) {
        console.log('分享失败:', error);
      }
    } else {
      copyToClipboard(result);
    }
  };
  const clearHistory = () => {
    setScanHistory([]);
    localStorage.removeItem('qrScanHistory');
  };
  const tabs = [{
    id: 'scanner',
    label: '扫描',
    icon: <Scan className="w-4 h-4" />
  }, {
    id: 'history',
    label: '历史',
    icon: <History className="w-4 h-4" />
  }, {
    id: 'settings',
    label: '设置',
    icon: <Settings className="w-4 h-4" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="QR码扫描器" showBack={true} />
        
        <div className="pb-20">
          {/* 标签页 */}
          <div className="bg-card border-b">
            <div className="flex">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>)}
            </div>
          </div>

          {/* 扫描页面 */}
          {activeTab === 'scanner' && <div className="p-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>QR码扫描</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 相机视图 */}
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{
                aspectRatio: '1'
              }}>
                    {isScanning ? <>
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <canvas ref={canvasRef} className="hidden" />
                        {/* 扫描框 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                            {/* 扫描线 */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary transform -translate-y-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      </> : <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                          <CameraOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">相机未启动</p>
                          <p className="text-sm opacity-75">点击下方按钮开始扫描</p>
                        </div>
                      </div>}
                  </div>

                  {/* 控制按钮 */}
                  <div className="flex space-x-4">
                    <Button onClick={isScanning ? stopCamera : startCamera} className="flex-1">
                      {isScanning ? <>
                          <CameraOff className="w-4 h-4 mr-2" />
                          停止扫描
                        </> : <>
                          <Camera className="w-4 h-4 mr-2" />
                          开始扫描
                        </>}
                    </Button>
                    <Button variant="outline" onClick={() => document.getElementById('file-upload').click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      上传图片
                    </Button>
                    <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </div>
                </CardContent>
              </Card>

              {/* 扫描结果 */}
              {scanResult && <ScanResult result={scanResult} onCopy={copyToClipboard} onShare={shareResult} onClose={() => setScanResult(null)} />}
            </div>}

          {/* 历史页面 */}
          {activeTab === 'history' && <div className="p-4">
              <ScanHistory history={scanHistory} onClear={clearHistory} onSelect={setScanResult} />
            </div>}

          {/* 设置页面 */}
          {activeTab === 'settings' && <div className="p-4">
              <ScanSettings settings={settings} onSettingsChange={setSettings} />
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}