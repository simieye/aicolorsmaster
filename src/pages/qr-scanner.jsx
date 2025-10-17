// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Camera, Image as ImageIcon, History, Settings, Search, Filter, Download, Upload, X, CheckCircle, AlertCircle, Clock, Star, Trash2, Eye, Copy, Share2, ExternalLink, QrCode, Barcode, Zap, Grid3x3, List, ChevronDown, Plus, Minus, Globe } from 'lucide-react';

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
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  const [scanSettings, setScanSettings] = useState({
    autoSave: true,
    soundEnabled: true,
    vibrateEnabled: true,
    autoCopy: false,
    showPreview: true
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

  // 多语言文本
  const getText = key => {
    const texts = {
      'zh-CN': {
        title: '智能扫码',
        subtitle: '快速识别二维码和条形码',
        scanner: '扫码',
        history: '历史',
        settings: '设置',
        smartScan: '智能扫码',
        description: '支持二维码、条形码快速识别',
        scanning: '扫码中...',
        cameraScan: '相机扫码',
        albumSelect: '相册选择',
        qrCode: '二维码',
        barcode: '条形码',
        quickRecognize: '快速识别',
        productRecognize: '商品识别',
        viewHistory: '查看历史',
        scanSettings: '扫码设置',
        scanningResult: '扫码结果',
        copy: '复制',
        share: '分享',
        openLink: '打开链接',
        saveToHistory: '保存到历史',
        totalRecords: '总记录',
        favorite: '收藏',
        searchHistory: '搜索历史记录...',
        all: '全部',
        noHistory: '暂无历史记录',
        view: '查看',
        delete: '删除',
        autoSave: '自动保存',
        autoSaveDesc: '扫码后自动保存到历史记录',
        soundAlert: '声音提示',
        soundAlertDesc: '扫码成功时播放提示音',
        vibrateFeedback: '震动反馈',
        vibrateFeedbackDesc: '扫码成功时震动提醒',
        autoCopy: '自动复制',
        autoCopyDesc: '扫码后自动复制内容',
        previewResult: '预览结果',
        previewResultDesc: '扫码后显示结果预览',
        dataManagement: '数据管理',
        exportHistory: '导出历史记录',
        exportHistoryDesc: '将历史记录导出为文件',
        importHistory: '导入历史记录',
        importHistoryDesc: '从文件导入历史记录',
        clearHistory: '清空历史记录',
        clearHistoryDesc: '删除所有历史记录',
        export: '导出',
        import: '导入',
        clear: '清空',
        scanSuccess: '扫码成功',
        scanSuccessDesc: '已识别',
        copySuccess: '复制成功',
        copySuccessDesc: '内容已复制到剪贴板',
        shareDesc: '正在打开分享界面...',
        openLinkDesc: '正在跳转到网页...',
        saveSuccess: '保存成功',
        saveSuccessDesc: '已保存到历史记录',
        deleteSuccess: '删除成功',
        deleteSuccessDesc: '已删除该记录',
        selectImage: '选择图片',
        selectImageDesc: '正在打开相册...',
        recognizing: '正在识别...',
        clickStartScan: '点击下方按钮开始扫码',
        scanComplete: '扫码完成',
        rescan: '重新扫码'
      },
      'en-US': {
        title: 'Smart Scanner',
        subtitle: 'Quick recognition of QR codes and barcodes',
        scanner: 'Scanner',
        history: 'History',
        settings: 'Settings',
        smartScan: 'Smart Scan',
        description: 'Support QR code and barcode quick recognition',
        scanning: 'Scanning...',
        cameraScan: 'Camera Scan',
        albumSelect: 'Album Select',
        qrCode: 'QR Code',
        barcode: 'Barcode',
        quickRecognize: 'Quick Recognize',
        productRecognize: 'Product Recognize',
        viewHistory: 'View History',
        scanSettings: 'Scan Settings',
        scanningResult: 'Scan Result',
        copy: 'Copy',
        share: 'Share',
        openLink: 'Open Link',
        saveToHistory: 'Save to History',
        totalRecords: 'Total Records',
        favorite: 'Favorite',
        searchHistory: 'Search history...',
        all: 'All',
        noHistory: 'No history records',
        view: 'View',
        delete: 'Delete',
        autoSave: 'Auto Save',
        autoSaveDesc: 'Automatically save to history after scanning',
        soundAlert: 'Sound Alert',
        soundAlertDesc: 'Play alert sound when scan successful',
        vibrateFeedback: 'Vibrate Feedback',
        vibrateFeedbackDesc: 'Vibrate when scan successful',
        autoCopy: 'Auto Copy',
        autoCopyDesc: 'Automatically copy content after scanning',
        previewResult: 'Preview Result',
        previewResultDesc: 'Show result preview after scanning',
        dataManagement: 'Data Management',
        exportHistory: 'Export History',
        exportHistoryDesc: 'Export history records to file',
        importHistory: 'Import History',
        importHistoryDesc: 'Import history records from file',
        clearHistory: 'Clear History',
        clearHistoryDesc: 'Delete all history records',
        export: 'Export',
        import: 'Import',
        clear: 'Clear',
        scanSuccess: 'Scan Successful',
        scanSuccessDesc: 'Recognized',
        copySuccess: 'Copy Successful',
        copySuccessDesc: 'Content copied to clipboard',
        shareDesc: 'Opening share interface...',
        openLinkDesc: 'Jumping to webpage...',
        saveSuccess: 'Save Successful',
        saveSuccessDesc: 'Saved to history',
        deleteSuccess: 'Delete Successful',
        deleteSuccessDesc: 'Record deleted',
        selectImage: 'Select Image',
        selectImageDesc: 'Opening album...',
        recognizing: 'Recognizing...',
        clickStartScan: 'Click button below to start scanning',
        scanComplete: 'Scan Complete',
        rescan: 'Rescan'
      },
      'ja-JP': {
        title: 'スマートスキャン',
        subtitle: 'QRコードとバーコードの高速認識',
        scanner: 'スキャン',
        history: '履歴',
        settings: '設定',
        smartScan: 'スマートスキャン',
        description: 'QRコードとバーコードの高速認識をサポート',
        scanning: 'スキャン中...',
        cameraScan: 'カメラスキャン',
        albumSelect: 'アルバム選択',
        qrCode: 'QRコード',
        barcode: 'バーコード',
        quickRecognize: '高速認識',
        productRecognize: '商品認識',
        viewHistory: '履歴表示',
        scanSettings: 'スキャン設定',
        scanningResult: 'スキャン結果',
        copy: 'コピー',
        share: '共有',
        openLink: 'リンクを開く',
        saveToHistory: '履歴に保存',
        totalRecords: '総記録数',
        favorite: 'お気に入り',
        searchHistory: '履歴を検索...',
        all: 'すべて',
        noHistory: '履歴がありません',
        view: '表示',
        delete: '削除',
        autoSave: '自動保存',
        autoSaveDesc: 'スキャン後に自動的に履歴に保存',
        soundAlert: '音声アラート',
        soundAlertDesc: 'スキャン成功時にアラート音を再生',
        vibrateFeedback: 'バイブレーションフィードバック',
        vibrateFeedbackDesc: 'スキャン成功時にバイブレーション',
        autoCopy: '自動コピー',
        autoCopyDesc: 'スキャン後に自動的に内容をコピー',
        previewResult: '結果プレビュー',
        previewResultDesc: 'スキャン後に結果プレビューを表示',
        dataManagement: 'データ管理',
        exportHistory: '履歴をエクスポート',
        exportHistoryDesc: '履歴記録をファイルにエクスポート',
        importHistory: '履歴をインポート',
        importHistoryDesc: 'ファイルから履歴記録をインポート',
        clearHistory: '履歴をクリア',
        clearHistoryDesc: 'すべての履歴記録を削除',
        export: 'エクスポート',
        import: 'インポート',
        clear: 'クリア',
        scanSuccess: 'スキャン成功',
        scanSuccessDesc: '認識完了',
        copySuccess: 'コピー成功',
        copySuccessDesc: '内容をクリップボードにコピー',
        shareDesc: '共有インターフェースを開いています...',
        openLinkDesc: 'ウェブページにジャンプしています...',
        saveSuccess: '保存成功',
        saveSuccessDesc: '履歴に保存しました',
        deleteSuccess: '削除成功',
        deleteSuccessDesc: '記録を削除しました',
        selectImage: '画像を選択',
        selectImageDesc: 'アルバムを開いています...',
        recognizing: '認識中...',
        clickStartScan: '下のボタンをクリックしてスキャンを開始',
        scanComplete: 'スキャン完了',
        rescan: '再スキャン'
      },
      'ko-KR': {
        title: '스마트 스캔',
        subtitle: 'QR코드 및 바코드 빠른 인식',
        scanner: '스캔',
        history: '기록',
        settings: '설정',
        smartScan: '스마트 스캔',
        description: 'QR코드 및 바코드 빠른 인식 지원',
        scanning: '스캔 중...',
        cameraScan: '카메라 스캔',
        albumSelect: '앨범 선택',
        qrCode: 'QR코드',
        barcode: '바코드',
        quickRecognize: '빠른 인식',
        productRecognize: '제품 인식',
        viewHistory: '기록 보기',
        scanSettings: '스캔 설정',
        scanningResult: '스캔 결과',
        copy: '복사',
        share: '공유',
        openLink: '링크 열기',
        saveToHistory: '기록에 저장',
        totalRecords: '총 기록 수',
        favorite: '즐겨찾기',
        searchHistory: '기록 검색...',
        all: '전체',
        noHistory: '기록이 없습니다',
        view: '보기',
        delete: '삭제',
        autoSave: '자동 저장',
        autoSaveDesc: '스캔 후 자동으로 기록에 저장',
        soundAlert: '소리 알림',
        soundAlertDesc: '스캔 성공 시 알림음 재생',
        vibrateFeedback: '진동 피드백',
        vibrateFeedbackDesc: '스캔 성공 시 진동',
        autoCopy: '자동 복사',
        autoCopyDesc: '스캔 후 자동으로 내용 복사',
        previewResult: '결과 미리보기',
        previewResultDesc: '스캔 후 결과 미리보기 표시',
        dataManagement: '데이터 관리',
        exportHistory: '기록 내보내기',
        exportHistoryDesc: '기록을 파일로 내보내기',
        importHistory: '기록 가져오기',
        importHistoryDesc: '파일에서 기록 가져오기',
        clearHistory: '기록 지우기',
        clearHistoryDesc: '모든 기록 삭제',
        export: '내보내기',
        import: '가져오기',
        clear: '지우기',
        scanSuccess: '스캔 성공',
        scanSuccessDesc: '인식됨',
        copySuccess: '복사 성공',
        copySuccessDesc: '내용이 클립보드에 복사됨',
        shareDesc: '공유 인터페이스 열기 중...',
        openLinkDesc: '웹페이지로 이동 중...',
        saveSuccess: '저장 성공',
        saveSuccessDesc: '기록에 저장됨',
        deleteSuccess: '삭제 성공',
        deleteSuccessDesc: '기록이 삭제됨',
        selectImage: '이미지 선택',
        selectImageDesc: '앨범 열기 중...',
        recognizing: '인식 중...',
        clickStartScan: '아래 버튼을 클릭하여 스캔 시작',
        scanComplete: '스캔 완료',
        rescan: '재스캔'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key] || key;
  };

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
        title: getText('scanSuccess'),
        description: `${getText('scanSuccessDesc')}${randomResult.type === 'qr' ? getText('qrCode') : getText('barcode')}`
      });
    }, 2000);
  };

  // 处理相册选择
  const handleImageSelect = () => {
    // 模拟相册选择
    toast({
      title: getText('selectImage'),
      description: getText('selectImageDesc')
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
          title: getText('copySuccess'),
          description: getText('copySuccessDesc')
        });
        break;
      case 'share':
        toast({
          title: getText('share'),
          description: getText('shareDesc')
        });
        break;
      case 'open':
        if (scanResult.content.startsWith('http')) {
          toast({
            title: getText('openLink'),
            description: getText('openLinkDesc')
          });
        }
        break;
      case 'save':
        setScanHistory(prev => [scanResult, ...prev].slice(0, 50));
        toast({
          title: getText('saveSuccess'),
          description: getText('saveSuccessDesc')
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
          title: getText('deleteSuccess'),
          description: getText('deleteSuccessDesc')
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{getText('smartScan')}</h2>
              <p className="text-gray-600">{getText('description')}</p>
            </div>

            {/* 扫码预览区 */}
            <div className="relative mb-6">
              <div className="w-full h-64 bg-gray-900 rounded-lg overflow-hidden relative">
                {isScanning ? <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white">{getText('recognizing')}</p>
                    </div>
                  </div> : <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">{getText('clickStartScan')}</p>
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
                {isScanning ? getText('scanning') : getText('cameraScan')}
              </Button>
              <Button onClick={handleImageSelect} variant="outline" className="flex-1">
                <ImageIcon className="w-5 h-5 mr-2" />
                {getText('albumSelect')}
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
              <h3 className="font-medium text-sm">{getText('qrCode')}</h3>
              <p className="text-xs text-gray-600">{getText('quickRecognize')}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Barcode className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-sm">{getText('barcode')}</h3>
              <p className="text-xs text-gray-600">{getText('productRecognize')}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <History className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-sm">{getText('history')}</h3>
              <p className="text-xs text-gray-600">{getText('viewHistory')}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-sm">{getText('settings')}</h3>
              <p className="text-xs text-gray-600">{getText('scanSettings')}</p>
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
              <h3 className="text-lg font-semibold">{getText('scanningResult')}</h3>
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
                  {getText('copy')}
                </Button>
                <Button onClick={() => handleResultAction('share')} variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  {getText('share')}
                </Button>
              </div>
              
              {scanResult.content.startsWith('http') && <Button onClick={() => handleResultAction('open')} className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {getText('openLink')}
                </Button>}
              
              <Button onClick={() => handleResultAction('save')} variant="outline" className="w-full">
                <Star className="w-4 h-4 mr-2" />
                {getText('saveToHistory')}
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
              <p className="text-sm text-gray-600">{getText('totalRecords')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.qr}</p>
              <p className="text-sm text-gray-600">{getText('qrCode')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.barcode}</p>
              <p className="text-sm text-gray-600">{getText('barcode')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.favorite}</p>
              <p className="text-sm text-gray-600">{getText('favorite')}</p>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder={getText('searchHistory')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              
              <div className="flex space-x-2">
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">{getText('all')}</option>
                  <option value="qr">{getText('qrCode')}</option>
                  <option value="barcode">{getText('barcode')}</option>
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
                <p className="text-gray-600">{getText('noHistory')}</p>
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
                        {getText('view')}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleHistoryAction(item.id, 'delete')}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        {getText('delete')}
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
            <CardTitle>{getText('scanSettings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{getText('autoSave')}</h4>
                <p className="text-sm text-gray-600">{getText('autoSaveDesc')}</p>
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
                <h4 className="font-medium">{getText('soundAlert')}</h4>
                <p className="text-sm text-gray-600">{getText('soundAlertDesc')}</p>
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
                <h4 className="font-medium">{getText('vibrateFeedback')}</h4>
                <p className="text-sm text-gray-600">{getText('vibrateFeedbackDesc')}</p>
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
                <h4 className="font-medium">{getText('autoCopy')}</h4>
                <p className="text-sm text-gray-600">{getText('autoCopyDesc')}</p>
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
                <h4 className="font-medium">{getText('previewResult')}</h4>
                <p className="text-sm text-gray-600">{getText('previewResultDesc')}</p>
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
            <CardTitle>{getText('dataManagement')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">{getText('exportHistory')}</h4>
                <p className="text-sm text-gray-600">{getText('exportHistoryDesc')}</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {getText('export')}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">{getText('importHistory')}</h4>
                <p className="text-sm text-gray-600">{getText('importHistoryDesc')}</p>
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                {getText('import')}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-red-600">{getText('clearHistory')}</h4>
                <p className="text-sm text-gray-600">{getText('clearHistoryDesc')}</p>
              </div>
              <Button variant="outline" className="text-red-600 border-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                {getText('clear')}
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{getText('title')}</h1>
              <p className="text-gray-600">{getText('subtitle')}</p>
            </div>
            
            {/* 语言切换 */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {languages.map(lang => <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)} className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${selectedLanguage === lang.code ? 'bg-purple-50' : ''}`}>
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>)}
              </div>
            </div>
          </div>

          {/* 标签导航 */}
          <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {[{
              id: 'scanner',
              name: getText('scanner'),
              icon: Camera
            }, {
              id: 'history',
              name: getText('history'),
              icon: History
            }, {
              id: 'settings',
              name: getText('settings'),
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