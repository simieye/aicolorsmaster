// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Camera, Image as ImageIcon, History, Settings, Search, Filter, Download, Upload, X, CheckCircle, AlertCircle, Clock, Star, Trash2, Eye, Copy, Share2, ExternalLink, QrCode, Barcode, Zap, Grid3x3, List, ChevronDown, Plus, Minus } from 'lucide-react';

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
  const [scanHistory, setScanHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, qr, barcode
  const [showSettings, setShowSettings] = useState(false);
  const [scanSettings, setScanSettings] = useState({
    autoSave: true,
    soundEnabled: true,
    vibrateEnabled: true,
    autoCopy: false,
    showPreview: true
  });

  // 初始化历史记录
  useEffect(() => {
    const mockHistory = [{
      id: 1,
      type: 'qr',
      content: 'https://www.aihair.com/product/123',
      title: 'AI染发产品页面',
      timestamp: new Date('2024-01-15 14:30:00'),
      category: 'product',
      favorite: true,
      image: 'https://images.unsplash.com/photo-1560066985-274c6a8a3f5a?w=100&h=100&fit=crop'
    }, {
      id: 2,
      type: 'barcode',
      content: '6901234567890',
      title: '微潮紫染发剂',
      timestamp: new Date('2024-01-15 10:20:00'),
      category: 'product',
      favorite: false,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop'
    }, {
      id: 3,
      type: 'qr',
      content: 'WIFI:T:WPA;S:AIHair_Shop;P:password123;;',
      title: '店铺WiFi',
      timestamp: new Date('2024-01-14 16:45:00'),
      category: 'wifi',
      favorite: true,
      image: null
    }, {
      id: 4,
      type: 'qr',
      content: 'tel:13812345678',
      title: '客服电话',
      timestamp: new Date('2024-01-14 09:15:00'),
      category: 'contact',
      favorite: false,
      image: null
    }, {
      id: 5,
      type: 'barcode',
      content: '1234567890123',
      title: '深层护理套装',
      timestamp: new Date('2024-01-13 15:30:00'),
      category: 'product',
      favorite: false,
      image: 'https://images.unsplash.com/photo-1559568495-17e4a6ca8c0f?w=100&h=100&fit=crop'
    }];
    setScanHistory(mockHistory);
  }, []);

  // 处理扫码
  const handleScan = () => {
    setIsScanning(true);
    // 模拟扫码过程
    setTimeout(() => {
      const mockResults = [{
        type: 'qr',
        content: 'https://www.aihair.com/special-offer',
        title: '限时优惠活动',
        category: 'promotion'
      }, {
        type: 'barcode',
        content: '6901234567891',
        title: '樱花粉染发剂',
        category: 'product'
      }, {
        type: 'qr',
        content: 'WIFI:T:WPA;S:AIHair_Guest;P:guest123;;',
        title: '访客WiFi',
        category: 'wifi'
      }];
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanResult({
        ...randomResult,
        timestamp: new Date(),
        id: Date.now()
      });
      setIsScanning(false);
      setShowResult(true);

      // 自动保存到历史记录
      if (scanSettings.autoSave) {
        setScanHistory(prev => [randomResult, ...prev].slice(0, 50));
      }

      // 震动反馈
      if (scanSettings.vibrateEnabled && navigator.vibrate) {
        navigator.vibrate(200);
      }
      toast({
        title: "扫码成功",
        description: `已识别${randomResult.type === 'qr' ? '二维码' : '条形码'}`
      });
    }, 2000);
  };

  // 处理相册选择
  const handleImageSelect = () => {
    // 模拟相册选择
    toast({
      title: "选择图片",
      description: "正在打开相册..."
    });
    setTimeout(() => {
      handleScan();
    }, 1000);
  };

  // 处理结果操作
  const handleResultAction = action => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(scanResult.content);
        toast({
          title: "复制成功",
          description: "内容已复制到剪贴板"
        });
        break;
      case 'share':
        toast({
          title: "分享",
          description: "正在打开分享界面..."
        });
        break;
      case 'open':
        if (scanResult.content.startsWith('http')) {
          toast({
            title: "打开链接",
            description: "正在跳转到网页..."
          });
        }
        break;
      case 'save':
        setScanHistory(prev => [scanResult, ...prev].slice(0, 50));
        toast({
          title: "保存成功",
          description: "已保存到历史记录"
        });
        break;
    }
  };

  // 处理历史记录操作
  const handleHistoryAction = (id, action) => {
    switch (action) {
      case 'favorite':
        setScanHistory(prev => prev.map(item => item.id === id ? {
          ...item,
          favorite: !item.favorite
        } : item));
        break;
      case 'delete':
        setScanHistory(prev => prev.filter(item => item.id !== id));
        toast({
          title: "删除成功",
          description: "已删除该记录"
        });
        break;
      case 'rescan':
        const item = scanHistory.find(h => h.id === id);
        if (item) {
          setScanResult(item);
          setShowResult(true);
          setActiveTab('scanner');
        }
        break;
    }
  };

  // 过滤历史记录
  const filteredHistory = scanHistory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // 渲染扫码界面
  const renderScanner = () => {
    return <div className="space-y-6">
        {/* 扫码区域 */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">智能扫码</h2>
              <p className="text-gray-600">支持二维码、条形码快速识别</p>
            </div>

            {/* 扫码预览区 */}
            <div className="relative mb-6">
              <div className="w-full h-64 bg-gray-900 rounded-lg overflow-hidden relative">
                {isScanning ? <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white">正在识别...</p>
                    </div>
                  </div> : <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">点击下方按钮开始扫码</p>
                    </div>
                  </div>}
                
                {/* 扫码框 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-purple-500 rounded-lg">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 扫码按钮 */}
            <div className="flex space-x-4">
              <Button onClick={handleScan} disabled={isScanning} className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Camera className="w-5 h-5 mr-2" />
                {isScanning ? '扫码中...' : '相机扫码'}
              </Button>
              <Button onClick={handleImageSelect} variant="outline" className="flex-1">
                <ImageIcon className="w-5 h-5 mr-2" />
                相册选择
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 快捷功能 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-sm">二维码</h3>
              <p className="text-xs text-gray-600">快速识别</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Barcode className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-sm">条形码</h3>
              <p className="text-xs text-gray-600">商品识别</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <History className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-sm">历史记录</h3>
              <p className="text-xs text-gray-600">查看历史</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-sm">设置</h3>
              <p className="text-xs text-gray-600">扫码设置</p>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染扫码结果
  const renderScanResult = () => {
    if (!scanResult) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">扫码结果</h3>
              <button onClick={() => setShowResult(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* 结果类型 */}
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${scanResult.type === 'qr' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {scanResult.type === 'qr' ? <QrCode className="w-8 h-8 text-blue-600" /> : <Barcode className="w-8 h-8 text-green-600" />}
              </div>
            </div>

            {/* 结果内容 */}
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold mb-2">{scanResult.title}</h4>
              <p className="text-sm text-gray-600 break-all">{scanResult.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                {scanResult.timestamp.toLocaleString()}
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => handleResultAction('copy')} variant="outline" className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  复制
                </Button>
                <Button onClick={() => handleResultAction('share')} variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
              </div>
              
              {scanResult.content.startsWith('http') && <Button onClick={() => handleResultAction('open')} className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  打开链接
                </Button>}
              
              <Button onClick={() => handleResultAction('save')} variant="outline" className="w-full">
                <Star className="w-4 h-4 mr-2" />
                保存到历史
              </Button>
            </div>
          </div>
        </div>
      </div>;
  };

  // 渲染历史记录
  const renderHistory = () => {
    const stats = {
      total: scanHistory.length,
      qr: scanHistory.filter(item => item.type === 'qr').length,
      barcode: scanHistory.filter(item => item.type === 'barcode').length,
      favorite: scanHistory.filter(item => item.favorite).length
    };
    return <div className="space-y-6">
        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-600">总记录</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.qr}</p>
              <p className="text-sm text-gray-600">二维码</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.barcode}</p>
              <p className="text-sm text-gray-600">条形码</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.favorite}</p>
              <p className="text-sm text-gray-600">收藏</p>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="搜索历史记录..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              
              <div className="flex space-x-2">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">全部</option>
                  <option value="qr">二维码</option>
                  <option value="barcode">条形码</option>
                </select>
                
                <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 历史记录列表 */}
        <Card>
          <CardContent className="p-4">
            {filteredHistory.length === 0 ? <div className="text-center py-8">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">暂无历史记录</p>
              </div> : <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {filteredHistory.map(item => <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'qr' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {item.type === 'qr' ? <QrCode className="w-5 h-5 text-blue-600" /> : <Barcode className="w-5 h-5 text-green-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.timestamp.toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <button onClick={() => handleHistoryAction(item.id, 'favorite')} className="p-1 hover:bg-gray-100 rounded">
                        <Star className={`w-4 h-4 ${item.favorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    
                    {item.image && <img src={item.image} alt={item.title} className="w-full h-24 object-cover rounded mb-3" />}
                    
                    <p className="text-sm text-gray-600 break-all mb-3">{item.content}</p>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleHistoryAction(item.id, 'rescan')}>
                        <Eye className="w-3 h-3 mr-1" />
                        查看
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleHistoryAction(item.id, 'delete')}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        删除
                      </Button>
                    </div>
                  </div>)}
              </div>}
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染设置界面
  const renderSettings = () => {
    return <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>扫码设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">自动保存</h4>
                <p className="text-sm text-gray-600">扫码后自动保存到历史记录</p>
              </div>
              <button onClick={() => setScanSettings(prev => ({
              ...prev,
              autoSave: !prev.autoSave
            }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.autoSave ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${scanSettings.autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">声音提示</h4>
                <p className="text-sm text-gray-600">扫码成功时播放提示音</p>
              </div>
              <button onClick={() => setScanSettings(prev => ({
              ...prev,
              soundEnabled: !prev.soundEnabled
            }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.soundEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${scanSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
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
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${scanSettings.vibrateEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">自动复制</h4>
                <p className="text-sm text-gray-600">扫码后自动复制内容</p>
              </div>
              <button onClick={() => setScanSettings(prev => ({
              ...prev,
              autoCopy: !prev.autoCopy
            }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.autoCopy ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${scanSettings.autoCopy ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">预览结果</h4>
                <p className="text-sm text-gray-600">扫码后显示结果预览</p>
              </div>
              <button onClick={() => setScanSettings(prev => ({
              ...prev,
              showPreview: !prev.showPreview
            }))} className={`relative inline-flex h-6 w-11 items-center rounded-full ${scanSettings.showPreview ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${scanSettings.showPreview ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>数据管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">导出历史记录</h4>
                <p className="text-sm text-gray-600">将历史记录导出为文件</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">导入历史记录</h4>
                <p className="text-sm text-gray-600">从文件导入历史记录</p>
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                导入
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-red-600">清空历史记录</h4>
                <p className="text-sm text-gray-600">删除所有历史记录</p>
              </div>
              <Button variant="outline" className="text-red-600 border-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                清空
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <>
      <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
        <div className="container mx-auto px-4 py-8">
          {/* 页面头部 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">智能扫码</h1>
            <p className="text-gray-600">快速识别二维码和条形码</p>
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
      </div>

      {/* 扫码结果弹窗 */}
      {showResult && renderScanResult()}

      {/* 底部导航 */}
      <TabBar currentPage="qr-scanner" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </>;
}