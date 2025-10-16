// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { QrCode, Camera, History, ChevronLeft, Zap, Check, AlertCircle, Copy, Share2 } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Scan(props) {
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
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // 模拟扫描历史
  useEffect(() => {
    setScanHistory([{
      id: 1,
      type: 'product',
      content: '微潮紫染发剂',
      result: '产品信息：微潮紫染发剂，适合亚洲肤色，持久度3-4周',
      timestamp: '2024-01-15 14:30',
      icon: '🧴'
    }, {
      id: 2,
      type: 'formula',
      content: '配方编号：A001',
      result: '配方详情：6%双氧奶 + 微潮紫染膏，比例1:1',
      timestamp: '2024-01-14 10:15',
      icon: '🧪'
    }, {
      id: 3,
      type: 'color',
      content: '色彩代码：#9B59B6',
      result: '色彩分析：微潮紫色，RGB(155,89,182)，适合春季肤色',
      timestamp: '2024-01-13 16:45',
      icon: '🎨'
    }]);
  }, []);
  const startScanning = async () => {
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

      // 模拟扫描过程
      setTimeout(() => {
        const mockResults = [{
          type: 'product',
          content: '微潮紫染发剂',
          result: '产品信息：微潮紫染发剂，适合亚洲肤色，持久度3-4周。主要成分：氨、过氧化氢、色素粒子。使用方法：与双氧奶按1:1比例调配。',
          icon: '🧴'
        }, {
          type: 'formula',
          content: '配方编号：A001',
          result: '配方详情：6%双氧奶 + 微潮紫染膏，比例1:1。适用发质：正常至粗硬发质。预期效果：均匀紫色，光泽度佳。',
          icon: '🧪'
        }, {
          type: 'color',
          content: '色彩代码：#9B59B6',
          result: '色彩分析：微潮紫色，RGB(155,89,182)。适合肤色：春季、夏季肤色。搭配建议：避免橙色系服装，推荐蓝色、紫色系。',
          icon: '🎨'
        }];
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        setScanResult({
          ...randomResult,
          timestamp: new Date().toLocaleString()
        });
        stopScanning();
        toast({
          title: "扫描成功",
          description: "已识别到相关信息"
        });
      }, 3000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "相机权限错误",
        description: "请允许访问相机权限"
      });
    }
  };
  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };
  const handleCopyResult = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult.result);
      toast({
        title: "复制成功",
        description: "扫描结果已复制到剪贴板"
      });
    }
  };
  const handleShareResult = () => {
    if (scanResult) {
      toast({
        title: "分享功能",
        description: "正在准备分享内容..."
      });
    }
  };
  const saveToHistory = () => {
    if (scanResult) {
      const newHistoryItem = {
        id: Date.now(),
        ...scanResult
      };
      setScanHistory(prev => [newHistoryItem, ...prev]);
      toast({
        title: "保存成功",
        description: "已添加到扫描历史"
      });
    }
  };
  const handleHistoryItemClick = item => {
    setScanResult(item);
    setShowHistory(false);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => $w.utils.navigateBack()} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <QrCode className="w-5 h-5 text-purple-600" />
              <h1 className="text-lg font-semibold">扫码识别</h1>
            </div>
          </div>
          <button onClick={() => setShowHistory(!showHistory)} className="p-2 hover:bg-gray-100 rounded-lg">
            <History className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 扫描区域 */}
        {!scanResult ? <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                {isScanning ? <div className="relative">
                    {/* 相机预览 */}
                    <div className="relative bg-black rounded-lg overflow-hidden" style={{
                height: '300px'
              }}>
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      
                      {/* 扫描框 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-purple-500 rounded-lg relative">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-600 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-600 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-600 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-600 rounded-br-lg"></div>
                          
                          {/* 扫描线动画 */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* 提示文字 */}
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white text-sm bg-black/50 inline-block px-3 py-1 rounded">
                          将二维码放入框内，自动扫描
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button onClick={stopScanning} className="bg-red-500 hover:bg-red-600 text-white">
                        停止扫描
                      </Button>
                    </div>
                  </div> : <div className="text-center py-8">
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">智能扫码识别</h3>
                    <p className="text-gray-600 mb-6">
                      支持产品二维码、配方码、色彩码等多种类型识别
                    </p>
                    
                    <div className="space-y-3">
                      <Button onClick={startScanning} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                        <Camera className="w-5 h-5 mr-2" />
                        开始扫描
                      </Button>
                      
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl mb-1">🧴</div>
                          <div className="text-xs text-gray-600">产品识别</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl mb-1">🧪</div>
                          <div className="text-xs text-gray-600">配方识别</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl mb-1">🎨</div>
                          <div className="text-xs text-gray-600">色彩识别</div>
                        </div>
                      </div>
                    </div>
                  </div>}
              </CardContent>
            </Card>
          </div> : (/* 扫描结果 */
      <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">扫描成功</h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-2xl">{scanResult.icon}</span>
                    <span className="text-lg font-medium text-gray-700">{scanResult.content}</span>
                  </div>
                  <div className="text-xs text-gray-500">{scanResult.timestamp}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-800 mb-2">识别结果</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{scanResult.result}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button onClick={handleCopyResult} className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                    <Copy className="w-4 h-4 mr-2" />
                    复制结果
                  </Button>
                  <Button onClick={handleShareResult} className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享结果
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Button onClick={saveToHistory} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <History className="w-4 h-4 mr-2" />
                    保存到历史
                  </Button>
                  
                  <Button onClick={() => setScanResult(null)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                    继续扫描
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>)}

        {/* 扫描历史侧边栏 */}
        {showHistory && <div className="fixed inset-0 bg-black/50 z-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">扫描历史</h2>
                  <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
                {scanHistory.length > 0 ? scanHistory.map(item => <div key={item.id} onClick={() => handleHistoryItemClick(item)} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.content}</h4>
                          <p className="text-xs text-gray-500">{item.timestamp}</p>
                        </div>
                      </div>
                    </div>) : <div className="text-center py-8 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>暂无扫描历史</p>
                  </div>}
              </div>
            </div>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="scan" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}