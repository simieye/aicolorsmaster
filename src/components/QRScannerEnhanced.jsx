// @ts-ignore;
import React, { useState, useRef, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, X, Zap, Image as ImageIcon, FlashlightOn, FlashlightOff, History, Settings, QrCode, Smartphone, Link, Package, User, ChevronLeft, Grid3x3, Maximize2, Volume2, VolumeX } from 'lucide-react';

export function QRScannerEnhanced({
  onScanResult,
  onClose,
  showHistory = false,
  showSettings = false,
  enableSound = true,
  enableVibration = true
}) {
  const {
    toast
  } = useToast();
  const [isScanning, setIsScanning] = useState(true);
  const [torchOn, setTorchOn] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanMode, setScanMode] = useState('qr'); // qr, barcode, miniprogram
  const [soundEnabled, setSoundEnabled] = useState(enableSound);
  const [vibrationEnabled, setVibrationEnabled] = useState(enableVibration);
  const [scanCount, setScanCount] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  // 检查相机权限
  useEffect(() => {
    checkCameraPermission();
    return () => {
      stopCamera();
    };
  }, []);

  // 检查相机权限
  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      setHasCamera(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera permission denied:', error);
      setHasCamera(false);
      toast({
        title: "相机权限",
        description: "请允许访问相机以使用扫码功能",
        variant: "destructive"
      });
    }
  };

  // 启动相机
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: {
            ideal: 1920
          },
          height: {
            ideal: 1080
          },
          focusMode: 'continuous',
          exposureMode: 'continuous'
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsScanning(true);
          startScanning();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "相机启动失败",
        description: "无法访问相机，请检查权限设置",
        variant: "destructive"
      });
    }
  };

  // 停止相机
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsScanning(false);
  };

  // 开始扫描
  const startScanning = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const scan = () => {
      if (!isScanning || !video.readyState === video.HAVE_ENOUGH_DATA) {
        animationFrameRef.current = requestAnimationFrame(scan);
        return;
      }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = scanQRCode(imageData);
      if (code) {
        handleScanSuccess(code);
      } else {
        animationFrameRef.current = requestAnimationFrame(scan);
      }
    };
    scan();
  };

  // 模拟二维码扫描（实际项目中需要使用真实的扫码库）
  const scanQRCode = imageData => {
    // 模拟不同类型的码
    const mockResults = {
      qr: ['https://aihair.com/product/12345', 'https://aihair.com/promo/spring2024', 'AIHAIR-PRODUCT-001', 'https://aihair.com/user/invite?code=ABC123'],
      barcode: ['6901234567890', '9787115423456', '6901023456789'],
      miniprogram: ['weixin://dl/business/?t=xxx&appid=wx123456&path=pages/index/index', 'alipays://platformapi/startapp?appId=2021001234567890&page=pages/index/index']
    };

    // 模拟扫描延迟
    if (Math.random() > 0.98) {
      const results = mockResults[scanMode] || mockResults.qr;
      return results[Math.floor(Math.random() * results.length)];
    }
    return null;
  };

  // 处理扫描成功
  const handleScanSuccess = async code => {
    setIsProcessing(true);
    setIsScanning(false);
    stopCamera();
    setScanCount(prev => prev + 1);

    // 震动反馈
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }

    // 播放提示音
    if (soundEnabled) {
      playBeep();
    }

    // 解析扫码结果
    const parsedResult = parseScanResult(code);
    setScanResult(parsedResult);

    // 保存到历史记录
    saveToHistory(parsedResult);
    setTimeout(() => {
      setIsProcessing(false);
      if (onScanResult) {
        onScanResult(parsedResult);
      }
    }, 1000);
  };

  // 解析扫码结果
  const parseScanResult = code => {
    let type = 'unknown';
    let data = code;

    // 检测小程序码
    if (code.includes('weixin://dl/business/') || code.includes('alipays://platformapi/startapp')) {
      type = 'miniprogram';
      data = {
        url: code,
        platform: code.includes('weixin') ? 'wechat' : 'alipay',
        appId: extractAppId(code),
        path: extractPath(code),
        type: 'miniprogram'
      };
    }
    // 检测普通URL
    else if (code.startsWith('http')) {
      type = 'url';
      try {
        const url = new URL(code);
        if (url.hostname.includes('aihair.com')) {
          if (url.pathname.includes('/product/')) {
            type = 'product';
            data = {
              url: code,
              productId: url.pathname.split('/product/')[1],
              type: 'product'
            };
          } else if (url.pathname.includes('/promo/')) {
            type = 'promotion';
            data = {
              url: code,
              promoCode: url.pathname.split('/promo/')[1],
              type: 'promotion'
            };
          } else if (url.pathname.includes('/user/invite')) {
            type = 'invite';
            data = {
              url: code,
              inviteCode: url.searchParams.get('code'),
              type: 'invite'
            };
          }
        }
      } catch (e) {
        // URL解析失败，保持原始类型
      }
    }
    // 检测产品码
    else if (code.startsWith('AIHAIR-')) {
      type = 'product';
      data = {
        code: code,
        productId: code.split('-')[2],
        type: 'product'
      };
    }
    // 检测条形码
    else if (/^\d{12,13}$/.test(code)) {
      type = 'barcode';
      data = {
        code: code,
        type: 'barcode'
      };
    }
    return {
      raw: code,
      type: type,
      data: data,
      timestamp: new Date(),
      scanMode: scanMode
    };
  };

  // 提取小程序AppId
  const extractAppId = code => {
    const match = code.match(/appid[=:]([^&]+)/);
    return match ? match[1] : '';
  };

  // 提取小程序路径
  const extractPath = code => {
    const match = code.match(/path[=:]([^&]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  };

  // 播放提示音
  const playBeep = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // 切换手电筒
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    try {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();
      if (capabilities.torch) {
        const newTorchState = !torchOn;
        await videoTrack.applyConstraints({
          advanced: [{
            torch: newTorchState
          }]
        });
        setTorchOn(newTorchState);
      } else {
        toast({
          title: "手电筒不可用",
          description: "您的设备不支持手电筒功能",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error toggling torch:', error);
      toast({
        title: "手电筒控制失败",
        description: "无法控制手电筒",
        variant: "destructive"
      });
    }
  };

  // 处理图片上传
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = scanQRCode(imageData);
          if (code) {
            handleScanSuccess(code);
          } else {
            toast({
              title: "未识别到二维码",
              description: "请选择包含二维码的图片",
              variant: "destructive"
            });
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // 保存到历史记录
  const saveToHistory = result => {
    const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
    const newHistory = [{
      ...result,
      id: Date.now()
    }, ...history.slice(0, 99)]; // 最多保存100条
    localStorage.setItem('scanHistory', JSON.stringify(newHistory));
  };

  // 恢复扫描
  const resumeScanning = () => {
    setScanResult(null);
    setIsProcessing(false);
    startCamera();
  };

  // 切换扫描模式
  const switchScanMode = mode => {
    setScanMode(mode);
    resumeScanning();
  };

  // 切换全屏
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  if (!hasCamera) {
    return <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
          <div className="text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">无法访问相机</h3>
            <p className="text-gray-600 mb-4">请允许访问相机权限以使用扫码功能</p>
            <Button onClick={onClose} className="w-full">
              关闭
            </Button>
          </div>
        </div>
      </div>;
  }
  return <div className="fixed inset-0 bg-black z-50">
      {/* 相机预览 */}
      <div className="relative w-full h-full">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* 扫描网格 */}
        {showGrid && <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {[...Array(9)].map((_, i) => <div key={i} className="border border-white/10" />)}
            </div>
          </div>}

        {/* 扫描框 */}
        {isScanning && <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* 扫描框边角 */}
              <div className="w-72 h-72 relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
                
                {/* 扫描线动画 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
              </div>
              
              {/* 扫描模式指示器 */}
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <div className="inline-flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                  {scanMode === 'qr' && <QrCode className="w-4 h-4 text-white" />}
                  {scanMode === 'barcode' && <Package className="w-4 h-4 text-white" />}
                  {scanMode === 'miniprogram' && <Smartphone className="w-4 h-4 text-white" />}
                  <span className="text-white text-sm">
                    {scanMode === 'qr' ? '二维码' : scanMode === 'barcode' ? '条形码' : '小程序码'}
                  </span>
                </div>
              </div>
            </div>
          </div>}

        {/* 处理中状态 */}
        {isProcessing && <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-800 font-medium">正在识别...</p>
            </div>
          </div>}

        {/* 扫描结果 */}
        {scanResult && !isProcessing && <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">扫描成功</h3>
                <div className="text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">类型:</span>
                    <span className="text-sm font-medium">
                      {scanResult.type === 'miniprogram' ? '小程序码' : scanResult.type === 'product' ? '产品码' : scanResult.type === 'promotion' ? '促销码' : scanResult.type === 'invite' ? '邀请码' : scanResult.type === 'barcode' ? '条形码' : '二维码'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">内容:</span>
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {scanResult.data.url || scanResult.data.code || scanResult.raw}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" onClick={resumeScanning} className="flex-1">
                  继续扫描
                </Button>
                <Button onClick={onClose} className="flex-1">
                  完成
                </Button>
              </div>
            </div>
          </div>}

        {/* 顶部控制栏 */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-2 text-white">
              <span className="text-sm">扫描次数: {scanCount}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowGrid(!showGrid)} className="text-white hover:bg-white/20">
                <Grid3x3 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                <Maximize2 className="w-5 h-5" />
              </Button>
              {showHistory && <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <History className="w-5 h-5" />
                </Button>}
              {showSettings && <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="w-5 h-5" />
                </Button>}
            </div>
          </div>
        </div>

        {/* 扫描模式切换 */}
        <div className="absolute top-20 left-0 right-0 flex justify-center">
          <div className="bg-black/50 rounded-full p-1 flex space-x-1">
            {[{
            mode: 'qr',
            icon: QrCode,
            label: '二维码'
          }, {
            mode: 'barcode',
            icon: Package,
            label: '条形码'
          }, {
            mode: 'miniprogram',
            icon: Smartphone,
            label: '小程序码'
          }].map(({
            mode,
            icon: Icon,
            label
          }) => <button key={mode} onClick={() => switchScanMode(mode)} className={`p-2 rounded-full transition-all ${scanMode === mode ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white hover:bg-white/20'}`} title={label}>
                <Icon className="w-4 h-4" />
              </button>)}
          </div>
        </div>

        {/* 底部控制栏 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {/* 手电筒按钮 */}
              <Button variant="ghost" size="sm" onClick={toggleTorch} className="text-white hover:bg-white/20">
                {torchOn ? <FlashlightOff className="w-6 h-6" /> : <FlashlightOn className="w-6 h-6" />}
              </Button>

              {/* 相册选择按钮 */}
              <label className="cursor-pointer">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                  <span>
                    <ImageIcon className="w-6 h-6" />
                  </span>
                </Button>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {/* 声音控制 */}
              <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} className="text-white hover:bg-white/20">
                {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}