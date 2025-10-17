// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Camera, Image as ImageIcon, History, Settings, X, CheckCircle, AlertCircle, Clock, Link, QrCode, Zap, Shield, ChevronLeft, Search, Filter, Trash2, Eye, Download, Share2 } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function QRScanner(props) {
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
  const [activeTab, setActiveTab] = useState('scanner');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [scanSettings, setScanSettings] = useState({
    autoSave: true,
    soundEnabled: true,
    vibrateEnabled: true,
    continuousScan: false
  });

  // 引用
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // 初始化历史记录
  useEffect(() => {
    // 模拟历史记录数据
    const mockHistory = [{
      id: 1,
      content: 'https://aihair.com/product/12345',
      type: 'url',
      timestamp: new Date('2024-01-15 14:30:00'),
      result: '产品页面 - 微潮紫染发剂',
      status: 'success'
    }, {
      id: 2,
      content: 'WIFI:T:WPA;S:AIHair_Shop;P:password123;;',
      type: 'wifi',
      timestamp: new Date('2024-01-15 10:15:00'),
      result: 'WiFi网络 - AIHair_Shop',
      status: 'success'
    }, {
      id: 3,
      content: 'BEGIN:VCARD\nVERSION:3.0\nFN:张小姐\nTEL:13812345678\nEND:VCARD',
      type: 'vcard',
      timestamp: new Date('2024-01-14 16:45:00'),
      result: '名片 - 张小姐',
      status: 'success'
    }, {
      id: 4,
      content: 'tel:13812345678',
      type: 'phone',
      timestamp: new Date('2024-01-14 09:20:00'),
      result: '电话号码 - 138****5678',
      status: 'success'
    }];
    setScanHistory(mockHistory);
  }, []);

  // 开始扫码
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      setCameraStream(stream);
      setIsScanning(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast({
        title: "开始扫码",
        description: "请将二维码对准扫描框"
      });
    } catch (error) {
      toast({
        title: "相机启动失败",
        description: "无法访问相机，请检查权限设置",
        variant: "destructive"
      });
    }
  };

  // 停止扫码
  const stopScanning = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsScanning(false);
  };

  // 模拟扫码成功
  const simulateScanSuccess = () => {
    const mockResults = [{
      content: 'https://aihair.com/product/67890',
      type: 'url',
      result: '产品页面 - 樱花粉染发剂'
    }, {
      content: 'WIFI:T:WPA;S:AIHair_Guest;P:guest123;;',
      type: 'wifi',
      result: 'WiFi网络 - AIHair_Guest'
    }, {
      content: 'BEGIN:VCARD\nVERSION:3.0\nFN:李女士\nTEL:13987654321\nEND:VCARD',
      type: 'vcard',
      result: '名片 - 李女士'
    }, {
      content: 'tel:13987654321',
      type: 'phone',
      result: '电话号码 - 139****4321'
    }];
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setScanResult({
      ...randomResult,
      timestamp: new Date(),
      id: Date.now()
    });
    setShowResult(true);
    stopScanning();

    // 添加到历史记录
    if (scanSettings.autoSave) {
      const newHistory = {
        ...randomResult,
        id: Date.now(),
        timestamp: new Date(),
        status: 'success'
      };
      setScanHistory(prev => [newHistory, ...prev]);
    }

    // 震动反馈
    if (scanSettings.vibrateEnabled) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  // 处理相册选择
  const handleFileSelect = event => {
    const file = event.target.files[0];
    if (file) {
      // 模拟图片识别
      setTimeout(() => {
        simulateScanSuccess();
        toast({
          title: "识别成功",
          description: "已从图片中识别二维码"
        });
      }, 1000);
    }
  };

  // 处理扫码结果
  const handleScanResult = action => {
    if (!scanResult) return;
    switch (action) {
      case 'open':
        if (scanResult.type === 'url') {
          window.open(scanResult.content, '_blank');
        } else if (scanResult.type === 'phone') {
          window.location.href = scanResult.content;
        } else if (scanResult.type === 'wifi') {
          toast({
            title: "WiFi连接",
            description: "请手动连接到WiFi网络"
          });
        } else if (scanResult.type === 'vcard') {
          toast({
            title: "名片信息",
            description: "已保存到通讯录"
          });
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(scanResult.content);
        toast({
          title: "复制成功",
          description: "内容已复制到剪贴板"
        });
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: '扫码结果',
            text: scanResult.content
          });
        } else {
          navigator.clipboard.writeText(scanResult.content);
          toast({
            title: "分享",
            description: "内容已复制，可以分享给朋友"
          });
        }
        break;
    }
  };

  // 删除历史记录
  const deleteHistory = id => {
    setScanHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "删除成功",
      description: "历史记录已删除"
    });
  };

  // 清空历史记录
  const clearHistory = () => {
    setScanHistory([]);
    toast({
      title: "清空成功",
      description: "所有历史记录已清空"
    });
  };

  // 重新扫描
  const rescanHistory = item => {
    setScanResult({
      ...item,
      timestamp: new Date(),
      id: Date.now()
    });
    setShowResult(true);
    setActiveTab('scanner');
  };

  // 获取类型图标
  const getTypeIcon = type => {
    const icons = {
      'url': Link,
      'wifi': Shield,
      'vcard': Users,
      'phone': Camera,
      'text': FileText
    };
    return icons[type] || QrCode;
  };

  // 获取类型颜色
  const getTypeColor = type => {
    const colors = {
      'url': 'text-blue-600 bg-blue-100',
      'wifi': 'text-green-600 bg-green-100',
      'vcard': 'text-purple-600 bg-purple-100',
      'phone': 'text-orange-600 bg-orange-100',
      'text': 'text-gray-600 bg-gray-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  // 过滤历史记录
  const filteredHistory = scanHistory.filter(item => item.content.toLowerCase().includes(searchTerm.toLowerCase()) || item.result.toLowerCase().includes(searchTerm.toLowerCase()));

  // 渲染扫码界面
  const renderScanner = () => {
    return <div className="space-y-6">
        {/* 扫码区域 */}
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            {isScanning ? <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-96 object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* 扫描框 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg"></div>
                    
                    {/* 扫描线动画 */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                  </div>
                </div>

                {/* 控制按钮 */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                  <Button onClick={stopScanning} variant="outline" className="bg-white/80 backdrop-blur">
                    <X className="w-4 h-4 mr-2" />
                    取消
                  </Button>
                  <Button onClick={simulateScanSuccess} className="bg-purple-600 hover:bg-purple-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    模拟扫码
                  </Button>
                </div>
              </div> : <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-br from-purple-50 to-pink-50">
                <QrCode className="w-24 h-24 text-purple-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">二维码扫描</h3>
                <p className="text-gray-600 text-center mb-8 px-4">
                  选择扫描方式，快速识别二维码内容
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={startScanning} className="bg-purple-600 hover:bg-purple-700">
                    <Camera className="w-4 h-4 mr-2" />
                    相机扫描
                  </Button>
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    相册选择
                  </Button>
                </div>
                
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>}
          </CardContent>
        </Card>

        {/* 快捷功能 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <History className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium">历史记录</h4>
              <p className="text-sm text-gray-600">{scanHistory.length} 条</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">扫码设置</h4>
              <p className="text-sm text-gray-600">自定义</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium">快速扫码</h4>
              <p className="text-sm text-gray-600">一键扫描</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium">安全模式</h4>
              <p className="text-sm text-gray-600">隐私保护</p>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染历史记录
  const renderHistory = () => {
    return <div className="space-y-6">
        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索历史记录..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <Button onClick={clearHistory} variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                清空历史
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 历史记录列表 */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? <Card>
              <CardContent className="p-8 text-center">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无历史记录</h3>
                <p className="text-gray-600">开始扫描二维码，历史记录将显示在这里</p>
              </CardContent>
            </Card> : filteredHistory.map(item => {
          const Icon = getTypeIcon(item.type);
          return <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{item.result}</h4>
                          <p className="text-sm text-gray-600 truncate mt-1">{item.content}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              {item.timestamp.toLocaleString()}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                              {item.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button onClick={() => rescanHistory(item)} size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => deleteHistory(item.id)} size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>;
        })}
        </div>
      </div>;
  };

  // 渲染设置
  const renderSettings = () => {
    return <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              扫码设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">自动保存历史</h4>
                  <p className="text-sm text-gray-600">扫码成功后自动保存到历史记录</p>
                </div>
                <button onClick={() => setScanSettings(prev => ({
                ...prev,
                autoSave: !prev.autoSave
              }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.autoSave ? 'bg-purple-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scanSettings.autoSave ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">扫码声音</h4>
                  <p className="text-sm text-gray-600">扫码成功时播放提示音</p>
                </div>
                <button onClick={() => setScanSettings(prev => ({
                ...prev,
                soundEnabled: !prev.soundEnabled
              }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.soundEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scanSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">震动反馈</h4>
                  <p className="text-sm text-gray-600">扫码成功时震动提醒</p>
                </div>
                <button onClick={() => setScanSettings(prev => ({
                ...prev,
                vibrateEnabled: !prev.vibrateEnabled
              }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.vibrateEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scanSettings.vibrateEnabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">连续扫码</h4>
                  <p className="text-sm text-gray-600">扫码成功后继续扫描</p>
                </div>
                <button onClick={() => setScanSettings(prev => ({
                ...prev,
                continuousScan: !prev.continuousScan
              }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.continuousScan ? 'bg-purple-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scanSettings.continuousScan ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              隐私设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">数据安全</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      所有扫码数据仅在本地存储，不会上传到服务器
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">隐私保护</h4>
                    <p className="text-sm text-green-600 mt-1">
                      不会收集任何个人信息，扫码记录完全由您控制
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                清除所有数据
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">二维码扫描</h1>
          <p className="text-gray-600">快速识别二维码，支持多种格式</p>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'scanner',
            name: '扫码',
            icon: Camera
          }, {
            id: 'history',
            name: '历史',
            icon: History
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
        {activeTab === 'scanner' && renderScanner()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* 扫码结果弹窗 */}
      {showResult && scanResult && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">扫码结果</h2>
                <button onClick={() => setShowResult(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getTypeColor(scanResult.type)}`}>
                    {React.createElement(getTypeIcon(scanResult.type), {
                  className: "w-6 h-6"
                })}
                  </div>
                  <div>
                    <h3 className="font-medium">{scanResult.result}</h3>
                    <p className="text-sm text-gray-600">{scanResult.type.toUpperCase()}</p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 break-all">{scanResult.content}</p>
                </div>

                <div className="text-xs text-gray-500">
                  扫描时间：{scanResult.timestamp.toLocaleString()}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button onClick={() => handleScanResult('open')} className="bg-purple-600 hover:bg-purple-700">
                    打开
                  </Button>
                  <Button onClick={() => handleScanResult('copy')} variant="outline">
                    复制
                  </Button>
                  <Button onClick={() => handleScanResult('share')} variant="outline">
                    分享
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="qr-scanner" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}