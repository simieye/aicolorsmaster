// @ts-ignore;
import React, { useState, useRef, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, X, Zap, Image as ImageIcon, FlashlightOn, FlashlightOff, History, Settings } from 'lucide-react';

export function QRScanner({
  onScanResult,
  onClose,
  showHistory = false,
  showSettings = false
}) {
  const {
    toast
  } = useToast();
  const [isScanning, setIsScanning] = useState(true);
  const [torchOn, setTorchOn] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        // 等待视频加载完成
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
    // 这里应该使用真实的二维码扫描库，如 jsQR
    // 为了演示，我们模拟扫描结果
    const mockResults = ['https://aihair.com/product/12345', 'https://aihair.com/promo/spring2024', 'AIHAIR-PRODUCT-001', 'https://aihair.com/user/invite?code=ABC123'];

    // 模拟扫描延迟
    if (Math.random() > 0.98) {
      return mockResults[Math.floor(Math.random() * mockResults.length)];
    }
    return null;
  };
  const handleScanSuccess = async code => {
    setIsProcessing(true);
    setIsScanning(false);
    stopCamera();

    // 震动反馈
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }

    // 播放提示音
    playBeep();
    setScanResult(code);

    // 解析扫码结果
    const parsedResult = parseScanResult(code);
    setTimeout(() => {
      setIsProcessing(false);
      if (onScanResult) {
        onScanResult(parsedResult);
      }
    }, 1000);
  };
  const parseScanResult = code => {
    let type = 'unknown';
    let data = code;
    if (code.startsWith('http')) {
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
    } else if (code.startsWith('AIHAIR-')) {
      type = 'product';
      data = {
        code: code,
        productId: code.split('-')[2],
        type: 'product'
      };
    }
    return {
      raw: code,
      type: type,
      data: data,
      timestamp: new Date()
    };
  };
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
  const resumeScanning = () => {
    setScanResult(null);
    setIsProcessing(false);
    startCamera();
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
        
        {/* 扫描框 */}
        {isScanning && <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* 扫描框边角 */}
              <div className="w-64 h-64 relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
                
                {/* 扫描线动画 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
              </div>
              
              {/* 提示文字 */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-white text-sm">将二维码放入框内即可自动扫描</p>
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
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">扫描成功</h3>
                <p className="text-gray-600 text-sm break-all">{scanResult}</p>
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
              <X className="w-5 h-5" />
            </Button>
            
            <div className="flex space-x-2">
              {showHistory && <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <History className="w-5 h-5" />
                </Button>}
              {showSettings && <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="w-5 h-5" />
                </Button>}
            </div>
          </div>
        </div>

        {/* 底部控制栏 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <div className="flex items-center justify-center space-x-6">
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
          </div>
        </div>
      </div>
    </div>;
}
export default QRScanner;