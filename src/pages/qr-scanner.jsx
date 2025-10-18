// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, QrCode, Scan, History, Settings, Download, Upload, X, CheckCircle, AlertCircle, Clock, MapPin, Phone, Mail, Globe, Search, Filter, Copy, Share2, Trash2, Eye, Edit, RefreshCw, Zap, Shield, Smartphone, Monitor, Tablet, ArrowRight, ChevronRight, Info, HelpCircle, Star, TrendingUp, BarChart3, Users, Package, ShoppingCart, DollarSign, Target, Award, Gift, Bell, Menu, Home, Palette, FlaskConical, Beaker, Users2, Store, BookOpen, Megaphone, UserCog, Database, FileText } from 'lucide-react';

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
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');

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
        title: '智能扫码系统',
        subtitle: '快速识别二维码，获取产品信息',
        scanner: '扫码识别',
        history: '扫码历史',
        settings: '扫码设置',
        startScanning: '开始扫码',
        stopScanning: '停止扫码',
        scanResult: '扫码结果',
        scanHistory: '扫码历史',
        noHistory: '暂无扫码记录',
        scanSuccess: '扫码成功',
        scanFailed: '扫码失败',
        copySuccess: '复制成功',
        shareSuccess: '分享成功',
        deleteSuccess: '删除成功',
        productInfo: '产品信息',
        productName: '产品名称',
        productCode: '产品编码',
        category: '分类',
        price: '价格',
        stock: '库存',
        description: '描述',
        manufacturer: '制造商',
        productionDate: '生产日期',
        expiryDate: '有效期',
        batchNumber: '批次号',
        ingredients: '成分',
        usage: '使用方法',
        warnings: '注意事项',
        storage: '储存条件',
        qrCode: '二维码',
        scanTime: '扫码时间',
        scanType: '扫码类型',
        actions: '操作',
        view: '查看',
        copy: '复制',
        share: '分享',
        delete: '删除',
        clearHistory: '清空历史',
        confirmDelete: '确认删除',
        cancel: '取消',
        confirm: '确认',
        search: '搜索',
        filter: '筛选',
        allTypes: '全部类型',
        productQR: '产品二维码',
        websiteQR: '网址二维码',
        textQR: '文本二维码',
        contactQR: '联系方式二维码',
        wifiQR: 'WiFi二维码',
        locationQR: '位置二维码',
        eventQR: '活动二维码',
        paymentQR: '支付二维码',
        otherQR: '其他',
        scanSettings: '扫码设置',
        autoFocus: '自动对焦',
        flashLight: '闪光灯',
        soundEffect: '音效',
        vibrate: '震动',
        saveHistory: '保存历史',
        autoRecognize: '自动识别',
        scanSpeed: '扫码速度',
        quality: '识别质量',
        fast: '快速',
        normal: '正常',
        accurate: '精确',
        high: '高',
        medium: '中',
        low: '低',
        on: '开启',
        off: '关闭',
        saveSettings: '保存设置',
        resetSettings: '重置设置',
        scanningTips: '扫码提示',
        tip1: '将二维码对准扫描框',
        tip2: '保持手机稳定，避免抖动',
        tip3: '确保光线充足，二维码清晰',
        tip4: '支持多种二维码格式',
        tip5: '扫码失败请重试',
        recentScans: '最近扫码',
        today: '今天',
        yesterday: '昨天',
        thisWeek: '本周',
        thisMonth: '本月',
        older: '更早',
        totalScans: '总扫码次数',
        successRate: '成功率',
        avgScanTime: '平均扫码时间',
        popularTypes: '热门类型',
        scanStatistics: '扫码统计',
        noResults: '暂无结果',
        tryAgain: '请重试',
        invalidQR: '无效的二维码',
        unsupportedQR: '不支持的二维码类型',
        networkError: '网络错误',
        permissionDenied: '权限被拒绝',
        cameraError: '相机错误',
        loading: '加载中...',
        processing: '处理中...',
        completed: '完成',
        failed: '失败',
        pending: '待处理',
        success: '成功',
        error: '错误',
        warning: '警告',
        info: '信息'
      },
      'en-US': {
        title: 'Smart QR Scanner',
        subtitle: 'Quickly recognize QR codes and get product information',
        scanner: 'Scanner',
        history: 'History',
        settings: 'Settings',
        startScanning: 'Start Scanning',
        stopScanning: 'Stop Scanning',
        scanResult: 'Scan Result',
        scanHistory: 'Scan History',
        noHistory: 'No scan history',
        scanSuccess: 'Scan Successful',
        scanFailed: 'Scan Failed',
        copySuccess: 'Copy Successful',
        shareSuccess: 'Share Successful',
        deleteSuccess: 'Delete Successful',
        productInfo: 'Product Information',
        productName: 'Product Name',
        productCode: 'Product Code',
        category: 'Category',
        price: 'Price',
        stock: 'Stock',
        description: 'Description',
        manufacturer: 'Manufacturer',
        productionDate: 'Production Date',
        expiryDate: 'Expiry Date',
        batchNumber: 'Batch Number',
        ingredients: 'Ingredients',
        usage: 'Usage',
        warnings: 'Warnings',
        storage: 'Storage',
        qrCode: 'QR Code',
        scanTime: 'Scan Time',
        scanType: 'Scan Type',
        actions: 'Actions',
        view: 'View',
        copy: 'Copy',
        share: 'Share',
        delete: 'Delete',
        clearHistory: 'Clear History',
        confirmDelete: 'Confirm Delete',
        cancel: 'Cancel',
        confirm: 'Confirm',
        search: 'Search',
        filter: 'Filter',
        allTypes: 'All Types',
        productQR: 'Product QR',
        websiteQR: 'Website QR',
        textQR: 'Text QR',
        contactQR: 'Contact QR',
        wifiQR: 'WiFi QR',
        locationQR: 'Location QR',
        eventQR: 'Event QR',
        paymentQR: 'Payment QR',
        otherQR: 'Other',
        scanSettings: 'Scan Settings',
        autoFocus: 'Auto Focus',
        flashLight: 'Flash Light',
        soundEffect: 'Sound Effect',
        vibrate: 'Vibrate',
        saveHistory: 'Save History',
        autoRecognize: 'Auto Recognize',
        scanSpeed: 'Scan Speed',
        quality: 'Quality',
        fast: 'Fast',
        normal: 'Normal',
        accurate: 'Accurate',
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        on: 'On',
        off: 'Off',
        saveSettings: 'Save Settings',
        resetSettings: 'Reset Settings',
        scanningTips: 'Scanning Tips',
        tip1: 'Align QR code with scanning frame',
        tip2: 'Keep phone stable, avoid shaking',
        tip3: 'Ensure sufficient light and clear QR code',
        tip4: 'Support multiple QR code formats',
        tip5: 'Retry if scan fails',
        recentScans: 'Recent Scans',
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        older: 'Older',
        totalScans: 'Total Scans',
        successRate: 'Success Rate',
        avgScanTime: 'Average Scan Time',
        popularTypes: 'Popular Types',
        scanStatistics: 'Scan Statistics',
        noResults: 'No Results',
        tryAgain: 'Try Again',
        invalidQR: 'Invalid QR Code',
        unsupportedQR: 'Unsupported QR Code Type',
        networkError: 'Network Error',
        permissionDenied: 'Permission Denied',
        cameraError: 'Camera Error',
        loading: 'Loading...',
        processing: 'Processing...',
        completed: 'Completed',
        failed: 'Failed',
        pending: 'Pending',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information'
      },
      'ja-JP': {
        title: 'スマートQRスキャナー',
        subtitle: 'QRコードを素早く認識し、製品情報を取得',
        scanner: 'スキャナー',
        history: '履歴',
        settings: '設定',
        startScanning: 'スキャン開始',
        stopScanning: 'スキャン停止',
        scanResult: 'スキャン結果',
        scanHistory: 'スキャン履歴',
        noHistory: 'スキャン履歴なし',
        scanSuccess: 'スキャン成功',
        scanFailed: 'スキャン失敗',
        copySuccess: 'コピー成功',
        shareSuccess: '共有成功',
        deleteSuccess: '削除成功',
        productInfo: '製品情報',
        productName: '製品名',
        productCode: '製品コード',
        category: 'カテゴリ',
        price: '価格',
        stock: '在庫',
        description: '説明',
        manufacturer: '製造元',
        productionDate: '製造日',
        expiryDate: '有効期限',
        batchNumber: 'バッチ番号',
        ingredients: '成分',
        usage: '使用方法',
        warnings: '注意事項',
        storage: '保管条件',
        qrCode: 'QRコード',
        scanTime: 'スキャン時間',
        scanType: 'スキャンタイプ',
        actions: 'アクション',
        view: '表示',
        copy: 'コピー',
        share: '共有',
        delete: '削除',
        clearHistory: '履歴をクリア',
        confirmDelete: '削除確認',
        cancel: 'キャンセル',
        confirm: '確認',
        search: '検索',
        filter: 'フィルター',
        allTypes: 'すべてのタイプ',
        productQR: '製品QR',
        websiteQR: 'ウェブサイトQR',
        textQR: 'テキストQR',
        contactQR: '連絡先QR',
        wifiQR: 'WiFi QR',
        locationQR: '位置QR',
        eventQR: 'イベントQR',
        paymentQR: '支払いQR',
        otherQR: 'その他',
        scanSettings: 'スキャン設定',
        autoFocus: 'オートフォーカス',
        flashLight: 'フラッシュライト',
        soundEffect: '音響効果',
        vibrate: 'バイブレーション',
        saveHistory: '履歴保存',
        autoRecognize: '自動認識',
        scanSpeed: 'スキャン速度',
        quality: '品質',
        fast: '高速',
        normal: '通常',
        accurate: '高精度',
        high: '高',
        medium: '中',
        low: '低',
        on: 'オン',
        off: 'オフ',
        saveSettings: '設定保存',
        resetSettings: '設定リセット',
        scanningTips: 'スキャンのヒント',
        tip1: 'QRコードをスキャンフレームに合わせる',
        tip2: '携帯電話を安定させ、揺れを避ける',
        tip3: '十分な光と明確なQRコードを確保する',
        tip4: '複数のQRコードフォーマットをサポート',
        tip5: 'スキャン失敗時は再試行',
        recentScans: '最近のスキャン',
        today: '今日',
        yesterday: '昨日',
        thisWeek: '今週',
        thisMonth: '今月',
        older: 'それ以前',
        totalScans: '総スキャン回数',
        successRate: '成功率',
        avgScanTime: '平均スキャン時間',
        popularTypes: '人気タイプ',
        scanStatistics: 'スキャン統計',
        noResults: '結果なし',
        tryAgain: '再試行',
        invalidQR: '無効なQRコード',
        unsupportedQR: 'サポートされていないQRコードタイプ',
        networkError: 'ネットワークエラー',
        permissionDenied: '権限拒否',
        cameraError: 'カメラエラー',
        loading: '読み込み中...',
        processing: '処理中...',
        completed: '完了',
        failed: '失敗',
        pending: '保留中',
        success: '成功',
        error: 'エラー',
        warning: '警告',
        info: '情報'
      },
      'ko-KR': {
        title: '스마트 QR 스캐너',
        subtitle: 'QR 코드를 빠르게 인식하고 제품 정보 얻기',
        scanner: '스캐너',
        history: '기록',
        settings: '설정',
        startScanning: '스캔 시작',
        stopScanning: '스캔 중지',
        scanResult: '스캔 결과',
        scanHistory: '스캔 기록',
        noHistory: '스캔 기록 없음',
        scanSuccess: '스캔 성공',
        scanFailed: '스캔 실패',
        copySuccess: '복사 성공',
        shareSuccess: '공유 성공',
        deleteSuccess: '삭제 성공',
        productInfo: '제품 정보',
        productName: '제품명',
        productCode: '제품 코드',
        category: '카테고리',
        price: '가격',
        stock: '재고',
        description: '설명',
        manufacturer: '제조업체',
        productionDate: '생산일',
        expiryDate: '유효기간',
        batchNumber: '배치 번호',
        ingredients: '성분',
        usage: '사용법',
        warnings: '주의사항',
        storage: '보관 조건',
        qrCode: 'QR 코드',
        scanTime: '스캔 시간',
        scanType: '스캔 유형',
        actions: '작업',
        view: '보기',
        copy: '복사',
        share: '공유',
        delete: '삭제',
        clearHistory: '기록 지우기',
        confirmDelete: '삭제 확인',
        cancel: '취소',
        confirm: '확인',
        search: '검색',
        filter: '필터',
        allTypes: '모든 유형',
        productQR: '제품 QR',
        websiteQR: '웹사이트 QR',
        textQR: '텍스트 QR',
        contactQR: '연락처 QR',
        wifiQR: 'WiFi QR',
        locationQR: '위치 QR',
        eventQR: '이벤트 QR',
        paymentQR: '결제 QR',
        otherQR: '기타',
        scanSettings: '스캔 설정',
        autoFocus: '자동 초점',
        flashLight: '플래시라이트',
        soundEffect: '음향 효과',
        vibrate: '진동',
        saveHistory: '기록 저장',
        autoRecognize: '자동 인식',
        scanSpeed: '스캔 속도',
        quality: '품질',
        fast: '빠름',
        normal: '보통',
        accurate: '정확함',
        high: '높음',
        medium: '보통',
        low: '낮음',
        on: '켜기',
        off: '끄기',
        saveSettings: '설정 저장',
        resetSettings: '설정 재설정',
        scanningTips: '스캔 팁',
        tip1: 'QR 코드를 스캔 프레임에 맞추기',
        tip2: '휴대폰을 안정적으로 유지하고 흔들림 피하기',
        tip3: '충분한 조명과 명확한 QR 코드 확인',
        tip4: '다양한 QR 코드 형식 지원',
        tip5: '스캔 실패 시 재시도',
        recentScans: '최근 스캔',
        today: '오늘',
        yesterday: '어제',
        thisWeek: '이번 주',
        thisMonth: '이번 달',
        older: '이전',
        totalScans: '총 스캔 횟수',
        successRate: '성공률',
        avgScanTime: '평균 스캔 시간',
        popularTypes: '인기 유형',
        scanStatistics: '스캔 통계',
        noResults: '결과 없음',
        tryAgain: '다시 시도',
        invalidQR: '잘못된 QR 코드',
        unsupportedQR: '지원되지 않는 QR 코드 유형',
        networkError: '네트워크 오류',
        permissionDenied: '권한 거부',
        cameraError: '카메라 오류',
        loading: '로딩 중...',
        processing: '처리 중...',
        completed: '완료됨',
        failed: '실패함',
        pending: '보류 중',
        success: '성공',
        error: '오류',
        warning: '경고',
        info: '정보'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key] || key;
  };

  // 初始化数据
  useEffect(() => {
    // 模拟扫码历史数据
    setScanHistory([{
      id: 1,
      type: 'product',
      content: 'AI染发色彩大师 - 微潮紫染发剂',
      result: {
        productName: '微潮紫染发剂',
        productCode: 'AI-HAIR-001',
        category: '染发剂',
        price: '¥128.00',
        stock: 45,
        description: '时尚潮流的微潮紫色染发剂，适合追求个性的年轻人',
        manufacturer: 'AI染发科技有限公司',
        productionDate: '2024-01-01',
        expiryDate: '2025-01-01',
        batchNumber: 'BATCH001',
        ingredients: '氨水、过氧化氢、紫色色素、护发成分',
        usage: '1. 将染发剂与显色剂按1:1比例混合\n2. 均匀涂抹在干燥的头发上\n3. 等待30-45分钟\n4. 彻底冲洗干净',
        warnings: '1. 使用前请进行皮肤过敏测试\n2. 避免接触眼睛\n3. 请戴手套操作',
        storage: '请存放在阴凉干燥处，避免阳光直射'
      },
      scanTime: '2024-01-15 14:30:25',
      status: 'success'
    }, {
      id: 2,
      type: 'website',
      content: 'https://www.aihair.com/products',
      result: {
        url: 'https://www.aihair.com/products',
        title: 'AI染发色彩大师 - 产品中心',
        description: '查看我们的全系列产品，包括染发剂、护理产品、造型用品等'
      },
      scanTime: '2024-01-15 13:15:10',
      status: 'success'
    }, {
      id: 3,
      type: 'contact',
      content: '客服热线：400-123-4567',
      result: {
        phone: '400-123-4567',
        email: 'service@aihair.com',
        address: '北京市朝阳区科技园区AI大厦',
        workingHours: '周一至周日 9:00-21:00'
      },
      scanTime: '2024-01-15 11:45:30',
      status: 'success'
    }, {
      id: 4,
      type: 'text',
      content: '欢迎使用AI染发色彩大师！',
      result: {
        text: '欢迎使用AI染发色彩大师！',
        timestamp: '2024-01-15 10:20:15'
      },
      scanTime: '2024-01-15 10:20:15',
      status: 'success'
    }]);
  }, []);

  // 处理扫码
  const handleScan = () => {
    setIsScanning(true);
    // 模拟扫码过程
    setTimeout(() => {
      const mockResult = {
        id: Date.now(),
        type: 'product',
        content: 'AI染发色彩大师 - 樱花粉染发剂',
        result: {
          productName: '樱花粉染发剂',
          productCode: 'AI-HAIR-002',
          category: '染发剂',
          price: '¥118.00',
          stock: 32,
          description: '温柔甜美的樱花粉色染发剂，适合春季氛围',
          manufacturer: 'AI染发科技有限公司',
          productionDate: '2024-01-05',
          expiryDate: '2025-01-05',
          batchNumber: 'BATCH002',
          ingredients: '氨水、过氧化氢、粉色色素、护发成分',
          usage: '1. 将染发剂与显色剂按1:1比例混合\n2. 均匀涂抹在干燥的头发上\n3. 等待25-35分钟\n4. 彻底冲洗干净',
          warnings: '1. 使用前请进行皮肤过敏测试\n2. 避免接触眼睛\n3. 请戴手套操作',
          storage: '请存放在阴凉干燥处，避免阳光直射'
        },
        scanTime: new Date().toLocaleString(),
        status: 'success'
      };
      setScanResult(mockResult);
      setScanHistory(prev => [mockResult, ...prev]);
      setIsScanning(false);
      setShowResult(true);
      toast({
        title: getText('scanSuccess'),
        description: mockResult.content
      });
    }, 2000);
  };

  // 处理复制
  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    toast({
      title: getText('copySuccess'),
      description: "内容已复制到剪贴板"
    });
  };

  // 处理分享
  const handleShare = result => {
    toast({
      title: getText('shareSuccess'),
      description: "正在分享扫码结果"
    });
  };

  // 处理删除
  const handleDelete = id => {
    setScanHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: getText('deleteSuccess'),
      description: "记录已删除"
    });
  };

  // 处理清空历史
  const handleClearHistory = () => {
    if (window.confirm(getText('confirmDelete'))) {
      setScanHistory([]);
      toast({
        title: getText('deleteSuccess'),
        description: "历史记录已清空"
      });
    }
  };

  // 渲染扫码界面
  const renderScanner = () => {
    return <div className="space-y-6">
        {/* 扫码区域 */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              {!isScanning ? <div className="space-y-6">
                  <div className="w-64 h-64 mx-auto border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">{getText('startScanning')}</p>
                      <Button onClick={handleScan} className="bg-purple-600 hover:bg-purple-700">
                        <Camera className="w-4 h-4 mr-2" />
                        {getText('startScanning')}
                      </Button>
                    </div>
                  </div>
                  
                  {/* 扫码提示 */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">{getText('scanningTips')}</h4>
                    <div className="space-y-1 text-sm text-blue-700">
                      <p>• {getText('tip1')}</p>
                      <p>• {getText('tip2')}</p>
                      <p>• {getText('tip3')}</p>
                      <p>• {getText('tip4')}</p>
                      <p>• {getText('tip5')}</p>
                    </div>
                  </div>
                </div> : <div className="space-y-6">
                  <div className="w-64 h-64 mx-auto border-4 border-purple-600 rounded-2xl flex items-center justify-center bg-purple-50 relative overflow-hidden">
                    {/* 扫描动画 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-200 to-transparent animate-pulse"></div>
                    <div className="relative text-center">
                      <Camera className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-pulse" />
                      <p className="text-purple-600 font-medium">{getText('scanning')}...</p>
                    </div>
                  </div>
                  
                  <Button onClick={() => setIsScanning(false)} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    {getText('stopScanning')}
                  </Button>
                </div>}
            </div>
          </CardContent>
        </Card>

        {/* 扫码结果 */}
        {showResult && scanResult && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                {getText('scanResult')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{scanResult.content}</h3>
                    <p className="text-sm text-gray-600">{scanResult.scanTime}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleCopy(scanResult.content)} variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleShare(scanResult)} variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {scanResult.type === 'product' && <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">{getText('productInfo')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{getText('productName')}</p>
                        <p className="font-medium">{scanResult.result.productName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{getText('productCode')}</p>
                        <p className="font-medium">{scanResult.result.productCode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{getText('category')}</p>
                        <p className="font-medium">{scanResult.result.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{getText('price')}</p>
                        <p className="font-medium">{scanResult.result.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{getText('stock')}</p>
                        <p className="font-medium">{scanResult.result.stock}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{getText('manufacturer')}</p>
                        <p className="font-medium">{scanResult.result.manufacturer}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">{getText('description')}</p>
                      <p className="text-sm">{scanResult.result.description}</p>
                    </div>
                  </div>}
                
                {scanResult.type === 'website' && <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">网站信息</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">URL</p>
                        <p className="font-medium text-blue-600">{scanResult.result.url}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">标题</p>
                        <p className="font-medium">{scanResult.result.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">描述</p>
                        <p className="text-sm">{scanResult.result.description}</p>
                      </div>
                    </div>
                  </div>}
                
                {scanResult.type === 'contact' && <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">联系方式</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{scanResult.result.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{scanResult.result.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{scanResult.result.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{scanResult.result.workingHours}</span>
                      </div>
                    </div>
                  </div>}
                
                {scanResult.type === 'text' && <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">文本内容</h4>
                    <p className="text-sm bg-gray-50 p-3 rounded">{scanResult.result.text}</p>
                  </div>}
              </div>
            </CardContent>
          </Card>}
      </div>;
  };

  // 渲染历史记录
  const renderHistory = () => {
    const filteredHistory = scanHistory.filter(item => item.status === 'success');
    return <div className="space-y-6">
        {/* 历史统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('totalScans')}</p>
                <p className="text-2xl font-bold text-gray-800">{filteredHistory.length}</p>
                <p className="text-xs text-gray-500">总次数</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('successRate')}</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-xs text-gray-500">成功率</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('avgScanTime')}</p>
                <p className="text-2xl font-bold text-blue-600">2.3s</p>
                <p className="text-xs text-gray-500">平均时间</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('popularTypes')}</p>
                <p className="text-2xl font-bold text-purple-600">产品</p>
                <p className="text-xs text-gray-500">热门类型</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 历史记录列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                {getText('scanHistory')}
              </CardTitle>
              <div className="flex space-x-2">
                <Button onClick={handleClearHistory} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {getText('clearHistory')}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredHistory.length === 0 ? <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{getText('noHistory')}</h3>
                <p className="text-gray-600">开始扫码后，记录将显示在这里</p>
              </div> : <div className="space-y-4">
                {filteredHistory.map(item => <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {item.type === 'product' && <Package className="w-6 h-6 text-purple-600" />}
                        {item.type === 'website' && <Globe className="w-6 h-6 text-purple-600" />}
                        {item.type === 'contact' && <Phone className="w-6 h-6 text-purple-600" />}
                        {item.type === 'text' && <FileText className="w-6 h-6 text-purple-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.content}</h4>
                        <p className="text-sm text-gray-600">{item.scanTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => {
                  setScanResult(item);
                  setShowResult(true);
                  setActiveTab('scanner');
                }} variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleCopy(item.content)} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleShare(item)} variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDelete(item.id)} variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>)}
              </div>}
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染设置
  const renderSettings = () => {
    return <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              {getText('scanSettings')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{getText('autoFocus')}</h4>
                  <p className="text-sm text-gray-600">自动对焦二维码</p>
                </div>
                <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{getText('flashLight')}</h4>
                  <p className="text-sm text-gray-600">在光线不足时开启闪光灯</p>
                </div>
                <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{getText('soundEffect')}</h4>
                  <p className="text-sm text-gray-600">扫码成功时播放提示音</p>
                </div>
                <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{getText('vibrate')}</h4>
                  <p className="text-sm text-gray-600">扫码成功时震动提醒</p>
                </div>
                <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{getText('saveHistory')}</h4>
                  <p className="text-sm text-gray-600">自动保存扫码历史记录</p>
                </div>
                <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{getText('autoRecognize')}</h4>
                  <p className="text-sm text-gray-600">自动识别二维码类型</p>
                </div>
                <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>高级设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">{getText('scanSpeed')}</h4>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">{getText('fast')}</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{getText('normal')}</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{getText('accurate')}</button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">{getText('quality')}</h4>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{getText('high')}</button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">{getText('medium')}</button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">{getText('low')}</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
            {getText('saveSettings')}
          </Button>
          <Button variant="outline" className="flex-1">
            {getText('resetSettings')}
          </Button>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
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
            icon: Scan
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

      {/* 底部导航 */}
      <TabBar currentPage="qr-scanner" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}