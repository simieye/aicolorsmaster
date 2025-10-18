// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Camera, QrCode, Scan, Zap, Images, X, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function QRScanner({
  onScanResult,
  isScanning,
  onStartScan,
  onStopScan,
  selectedLanguage
}) {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const getText = key => {
    const texts = {
      'zh-CN': {
        startScanning: '开始扫码',
        stopScanning: '停止扫码',
        selectFromAlbum: '相册选择',
        flashLight: '闪光灯',
        scanningTips: '扫码提示',
        tip1: '将二维码对准扫描框',
        tip2: '保持适当距离确保清晰',
        tip3: '在光线充足的环境下扫码',
        tip4: '支持多种码制快速识别'
      },
      'en-US': {
        startScanning: 'Start Scanning',
        stopScanning: 'Stop Scanning',
        selectFromAlbum: 'Select from Album',
        flashLight: 'Flash Light',
        scanningTips: 'Scanning Tips',
        tip1: 'Align QR code with scan frame',
        tip2: 'Maintain proper distance for clarity',
        tip3: 'Scan in well-lit environment',
        tip4: 'Support multiple code types'
      },
      'ja-JP': {
        startScanning: 'スキャン開始',
        stopScanning: 'スキャン停止',
        selectFromAlbum: 'アルバムから選択',
        flashLight: 'フラッシュライト',
        scanningTips: 'スキャンのヒント',
        tip1: 'QRコードをスキャンフレームに合わせる',
        tip2: '適切な距離を保って鮮明にする',
        tip3: '明るい環境でスキャンする',
        tip4: '複数のコードタイプをサポート'
      },
      'ko-KR': {
        startScanning: '스캔 시작',
        stopScanning: '스캔 중지',
        selectFromAlbum: '앨범에서 선택',
        flashLight: '플래시',
        scanningTips: '스캔 팁',
        tip1: 'QR코드를 스캔 프레임에 맞추세요',
        tip2: '적절한 거리를 유지하여 선명하게 하세요',
        tip3: '밝은 환경에서 스캔하세요',
        tip4: '여러 코드 유형을 지원합니다'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key];
  };
  const handleSelectFromAlbum = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        // 模拟从相册选择图片扫码
        const mockResult = {
          type: 'qr',
          content: `https://example.com/scan/${Date.now()}`,
          timestamp: new Date().toISOString()
        };
        onScanResult(mockResult);
      }
    };
    input.click();
  };
  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };
  return <div className="space-y-6">
      {/* 扫码区域 */}
      <div className="relative mx-auto w-80 h-80 bg-black/30 rounded-2xl overflow-hidden border-2 border-white/20">
        {/* 扫描框 */}
        <div className="absolute inset-4 border-2 border-white rounded-lg">
          {/* 四角装饰 */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400 rounded-br-lg"></div>
          
          {/* 扫描线动画 */}
          {isScanning && <div className="scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>}
        </div>
        
        {/* 相机预览占位 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isScanning ? <Camera className="w-16 h-16 text-white/50 animate-pulse" /> : <QrCode className="w-16 h-16 text-white/50" />}
        </div>

        {/* 视频元素 */}
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" style={{
        display: 'none'
      }} />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{
        display: 'none'
      }} />
      </div>
      
      {/* 控制按钮 */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleSelectFromAlbum} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
          <Images className="w-4 h-4 mr-2" />
          {getText('selectFromAlbum')}
        </Button>
        
        <Button onClick={isScanning ? onStopScan : onStartScan} className={`${isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}>
          {isScanning ? <>
              <X className="w-4 h-4 mr-2" />
              {getText('stopScanning')}
            </> : <>
              <Scan className="w-4 h-4 mr-2" />
              {getText('startScanning')}
            </>}
        </Button>
        
        <Button onClick={toggleFlash} className={`bg-white/20 hover:bg-white/30 text-white border border-white/30 ${flashEnabled ? 'bg-yellow-500/30' : ''}`}>
          <Zap className="w-4 h-4 mr-2" />
          {getText('flashLight')}
        </Button>
      </div>

      {/* 扫码提示 */}
      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <h4 className="font-semibold mb-2 flex items-center">
          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
          {getText('scanningTips')}
        </h4>
        <ul className="text-sm space-y-1 opacity-80">
          <li>• {getText('tip1')}</li>
          <li>• {getText('tip2')}</li>
          <li>• {getText('tip3')}</li>
          <li>• {getText('tip4')}</li>
        </ul>
      </div>
    </div>;
}