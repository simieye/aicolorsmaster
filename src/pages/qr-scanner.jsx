// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, QrCode, History, Settings, Zap, Link, Tag, TrendingUp, Clock, ChevronRight, Shield, Flashlight, Smartphone, Package, BarChart3, Activity, PieChart, Download, Filter } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { QRScannerEnhanced } from '@/components/QRScannerEnhanced';
// @ts-ignore;
import { ScanHistoryEnhanced } from '@/components/ScanHistoryEnhanced';
export default function QRScannerPage(props) {
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
  const [showScanner, setShowScanner] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [lastScanResult, setLastScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [scannerSettings, setScannerSettings] = useState({
    autoSave: true,
    soundEnabled: true,
    vibrationEnabled: true,
    torchEnabled: false,
    beepVolume: 0.5,
    scanMode: 'qr',
    showGrid: true,
    enableFullscreen: true
  });
  useEffect(() => {
    loadScanHistory();
    loadSettings();
  }, []);
  const loadScanHistory = () => {
    const saved = localStorage.getItem('scanHistory');
    if (saved) {
      setScanHistory(JSON.parse(saved));
    }
  };
  const loadSettings = () => {
    const saved = localStorage.getItem('scannerSettings');
    if (saved) {
      setScannerSettings(JSON.parse(saved));
    }
  };
  const saveSettings = newSettings => {
    localStorage.setItem('scannerSettings', JSON.stringify(newSettings));
    setScannerSettings(newSettings);
  };
  const handleScanResult = result => {
    setLastScanResult(result);

    // 保存到历史记录
    if (scannerSettings.autoSave) {
      const newHistory = [{
        ...result,
        id: Date.now()
      }, ...scanHistory.slice(0, 99)]; // 最多保存100条
      setScanHistory(newHistory);
      localStorage.setItem('scanHistory', JSON.stringify(newHistory));
    }

    // 处理不同类型的扫描结果
    handleScanResultByType(result);
  };
  const handleScanResultByType = result => {
    switch (result.type) {
      case 'miniprogram':
        toast({
          title: "小程序码识别",
          description: `识别到${result.data.platform === 'wechat' ? '微信' : '支付宝'}小程序`
        });
        // 处理小程序跳转
        setTimeout(() => {
          if (result.data.platform === 'wechat') {
            toast({
              title: "微信小程序",
              description: "正在跳转到微信小程序..."
            });
          } else {
            toast({
              title: "支付宝小程序",
              description: "正在跳转到支付宝小程序..."
            });
          }
        }, 1500);
        break;
      case 'product':
        toast({
          title: "产品二维码",
          description: `识别到产品: ${result.data.productId}`
        });
        // 跳转到产品页面
        setTimeout(() => {
          $w.utils.navigateTo({
            pageId: 'products',
            params: {
              productId: result.data.productId
            }
          });
        }, 1500);
        break;
      case 'promotion':
        toast({
          title: "促销二维码",
          description: `识别到促销活动: ${result.data.promoCode}`
        });
        // 跳转到促销页面
        setTimeout(() => {
          $w.utils.navigateTo({
            pageId: 'marketing',
            params: {
              promoCode: result.data.promoCode
            }
          });
        }, 1500);
        break;
      case 'invite':
        toast({
          title: "邀请二维码",
          description: `识别到邀请码: ${result.data.inviteCode}`
        });
        // 处理邀请逻辑
        break;
      case 'barcode':
        toast({
          title: "条形码识别",
          description: `识别到条形码: ${result.data.code}`
        });
        break;
      case 'url':
        toast({
          title: "网址二维码",
          description: "识别到网址链接"
        });
        // 打开外部链接
        setTimeout(() => {
          window.open(result.data, '_blank');
        }, 1500);
        break;
      default:
        toast({
          title: "扫描完成",
          description: result.raw
        });
    }
  };
  const handleHistorySelect = item => {
    setShowHistory(false);
    handleScanResultByType(item);
  };
  const getStats = () => {
    const today = new Date();
    const todayScans = scanHistory.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate.toDateString() === today.toDateString();
    }).length;
    const typeStats = scanHistory.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});
    const modeStats = scanHistory.reduce((acc, item) => {
      acc[item.scanMode] = (acc[item.scanMode] || 0) + 1;
      return acc;
    }, {});
    return {
      totalScans: scanHistory.length,
      todayScans,
      typeStats,
      modeStats
    };
  };
  const stats = getStats();
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">扫码功能</h1>
          <p className="text-gray-600">快速扫描二维码，支持小程序码、条形码等多种格式</p>
        </div>

        {/* 主要功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 扫码卡片 */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowScanner(true)}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">开始扫码</h3>
              <p className="text-gray-600 text-sm">支持二维码、条形码、小程序码</p>
            </CardContent>
          </Card>

          {/* 历史记录卡片 */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowHistory(true)}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <History className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">扫描历史</h3>
              <p className="text-gray-600 text-sm">查看和管理扫描记录</p>
            </CardContent>
          </Card>

          {/* 设置卡片 */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowSettings(true)}>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">扫码设置</h3>
              <p className="text-gray-600 text-sm">配置扫码功能和偏好</p>
            </CardContent>
          </Card>

          {/* 统计卡片 */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">扫码统计</h3>
              <p className="text-gray-600 text-sm">查看扫码数据分析</p>
            </CardContent>
          </Card>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalScans}</div>
              <p className="text-gray-600 text-sm">总扫描次数</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.todayScans}</div>
              <p className="text-gray-600 text-sm">今日扫描</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.typeStats.product || 0}</div>
              <p className="text-gray-600 text-sm">产品扫描</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{stats.typeStats.miniprogram || 0}</div>
              <p className="text-gray-600 text-sm">小程序扫描</p>
            </CardContent>
          </Card>
        </div>

        {/* 扫码类型分布 */}
        {Object.keys(stats.typeStats).length > 0 && <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                扫描类型分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(stats.typeStats).map(([type, count]) => {
              const getIcon = type => {
                switch (type) {
                  case 'product':
                    return <Tag className="w-4 h-4 text-purple-600" />;
                  case 'promotion':
                    return <TrendingUp className="w-4 h-4 text-green-600" />;
                  case 'miniprogram':
                    return <Smartphone className="w-4 h-4 text-orange-600" />;
                  case 'barcode':
                    return <Package className="w-4 h-4 text-gray-600" />;
                  default:
                    return <QrCode className="w-4 h-4 text-gray-600" />;
                }
              };
              const getLabel = type => {
                switch (type) {
                  case 'product':
                    return '产品';
                  case 'promotion':
                    return '促销';
                  case 'miniprogram':
                    return '小程序';
                  case 'barcode':
                    return '条形码';
                  default:
                    return '其他';
                }
              };
              return <div key={type} className="text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        {getIcon(type)}
                      </div>
                      <div className="text-lg font-bold">{count}</div>
                      <div className="text-sm text-gray-600">{getLabel(type)}</div>
                    </div>;
            })}
              </div>
            </CardContent>
          </Card>}

        {/* 最近扫描 */}
        {scanHistory.length > 0 && <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  最近扫描
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowHistory(true)}>
                  查看全部
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scanHistory.slice(0, 5).map(item => <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleHistorySelect(item)}>
                    <div className="flex items-center space-x-3">
                      {item.type === 'product' && <Tag className="w-4 h-4 text-purple-600" />}
                      {item.type === 'promotion' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {item.type === 'miniprogram' && <Smartphone className="w-4 h-4 text-orange-600" />}
                      {item.type === 'barcode' && <Package className="w-4 h-4 text-gray-600" />}
                      {item.type === 'invite' && <Link className="w-4 h-4 text-blue-600" />}
                      {item.type === 'url' && <Link className="w-4 h-4 text-gray-600" />}
                      
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.type === 'product' && `产品: ${item.data.productId}`}
                          {item.type === 'promotion' && `促销: ${item.data.promoCode}`}
                          {item.type === 'miniprogram' && `${item.data.platform === 'wechat' ? '微信' : '支付宝'}小程序`}
                          {item.type === 'barcode' && `条形码: ${item.data.code}`}
                          {item.type === 'invite' && `邀请: ${item.data.inviteCode}`}
                          {item.type === 'url' && '网址链接'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>)}
              </div>
            </CardContent>
          </Card>}

        {/* 功能说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              功能说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <QrCode className="w-4 h-4 mr-2 text-purple-600" />
                  支持的码类型
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 二维码 - 产品、促销、邀请等</li>
                  <li>• 小程序码 - 微信、支付宝小程序</li>
                  <li>• 条形码 - 商品条码识别</li>
                  <li>• 网址二维码 - 快速访问链接</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Flashlight className="w-4 h-4 mr-2 text-blue-600" />
                  扫码功能特点
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 智能识别多种码类型</li>
                  <li>• 支持手电筒和网格辅助</li>
                  <li>• 可从相册选择图片识别</li>
                  <li>• 完整的扫描历史记录</li>
                  <li>• 支持声音和震动反馈</li>
                  <li>• 全屏模式提升扫码体验</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 增强版扫码器组件 */}
      {showScanner && <QRScannerEnhanced onScanResult={handleScanResult} onClose={() => setShowScanner(false)} showHistory={true} showSettings={true} enableSound={scannerSettings.soundEnabled} enableVibration={scannerSettings.vibrationEnabled} />}

      {/* 增强版历史记录组件 */}
      {showHistory && <ScanHistoryEnhanced onScanSelect={handleHistorySelect} onClose={() => setShowHistory(false)} />}

      {/* 设置弹窗 */}
      {showSettings && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">扫码设置</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">自动保存历史</span>
                  <button onClick={() => saveSettings({
                ...scannerSettings,
                autoSave: !scannerSettings.autoSave
              })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${scannerSettings.autoSave ? 'bg-purple-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scannerSettings.autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">提示音</span>
                  <button onClick={() => saveSettings({
                ...scannerSettings,
                soundEnabled: !scannerSettings.soundEnabled
              })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${scannerSettings.soundEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scannerSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">震动反馈</span>
                  <button onClick={() => saveSettings({
                ...scannerSettings,
                vibrationEnabled: !scannerSettings.vibrationEnabled
              })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${scannerSettings.vibrationEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scannerSettings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">显示网格</span>
                  <button onClick={() => saveSettings({
                ...scannerSettings,
                showGrid: !scannerSettings.showGrid
              })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${scannerSettings.showGrid ? 'bg-purple-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scannerSettings.showGrid ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">全屏模式</span>
                  <button onClick={() => saveSettings({
                ...scannerSettings,
                enableFullscreen: !scannerSettings.enableFullscreen
              })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${scannerSettings.enableFullscreen ? 'bg-purple-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scannerSettings.enableFullscreen ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowSettings(false)}>
                  取消
                </Button>
                <Button className="flex-1" onClick={() => setShowSettings(false)}>
                  保存
                </Button>
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