// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Store, Package, ShoppingCart, Users, BarChart3, Settings, Bell, Search, Plus, Edit, Trash2, Eye, Calendar, Clock, MapPin, Phone, Mail, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, XCircle, Filter, Download, Upload, X } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function StoreManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [activeTab, setActiveTab] = useState('dashboard');
  const [storeData, setStoreData] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
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
        title: '门店管理系统',
        subtitle: '智能化的门店运营管理平台',
        dashboard: '数据概览',
        inventory: '库存管理',
        orders: '订单管理',
        employees: '员工管理',
        todayRevenue: '今日营收',
        todayOrders: '今日订单',
        todayCustomers: '今日客户',
        storeRating: '门店评分',
        totalProducts: '总商品数',
        inventoryAlert: '库存预警',
        totalValue: '库存总值',
        todayUpdates: '今日更新',
        totalOrders: '总订单',
        pending: '待处理',
        processing: '处理中',
        completed: '已完成',
        totalEmployees: '员工总数',
        todayServices: '今日服务',
        avgRating: '平均评分',
        attendance: '出勤率',
        storeStatus: '门店状态',
        basicInfo: '基本信息',
        businessInfo: '营业信息',
        businessHours: '营业时间',
        manager: '店长',
        services: '服务项目',
        quickActions: '快捷操作',
        newOrder: '新建订单',
        inventoryManagement: '库存管理',
        employeeManagement: '员工管理',
        dataReports: '数据报表',
        createNewOrder: '创建新的服务订单',
        viewAndUpdateInventory: '查看和更新库存状态',
        manageEmployeeInfo: '管理员工信息和排班',
        viewBusinessData: '查看经营数据分析',
        lowStockWarning: '库存预警',
        immediateRestock: '立即补货',
        restockSuccess: '补货成功',
        restockQuantity: '已成功补货',
        inventoryList: '库存列表',
        productName: '商品名称',
        category: '分类',
        stock: '库存',
        unitPrice: '单价',
        supplier: '供应商',
        lastUpdate: '最后更新',
        status: '状态',
        actions: '操作',
        normal: '正常',
        lowStock: '库存不足',
        addProduct: '添加商品',
        orderList: '订单列表',
        orderNumber: '订单号',
        customerInfo: '客户信息',
        serviceItem: '服务项目',
        technician: '技师',
        amount: '金额',
        orderTime: '下单时间',
        start: '开始',
        complete: '完成',
        employeeList: '员工列表',
        employeeInfo: '员工信息',
        position: '职位',
        contactInfo: '联系方式',
        joinDate: '入职时间',
        monthlyOrders: '本月订单',
        schedule: '排班',
        workingEmployees: '在职员工',
        totalServices: '总服务次数',
        customerSatisfaction: '客户满意度',
        todayAttendance: '今日出勤',
        notificationCenter: '通知中心',
        newOrderNotification: '新订单',
        orderCompleted: '订单完成',
        search: '搜索',
        filter: '筛选',
        export: '导出',
        open: '营业中',
        closed: '休息中',
        units: '种商品',
        needRestock: '需要补货',
        totalValueDesc: '总价值',
        productUpdates: '商品更新',
        waitingProcess: '等待处理',
        inService: '正在服务',
        serviceCompleted: '服务完成',
        onDuty: '在职员工',
        serviceTimes: '总服务次数',
        attendanceRate: '出勤率',
        todayDuty: '今日出勤'
      },
      'en-US': {
        title: 'Store Management System',
        subtitle: 'Intelligent Store Operation Management Platform',
        dashboard: 'Dashboard',
        inventory: 'Inventory',
        orders: 'Orders',
        employees: 'Employees',
        todayRevenue: "Today's Revenue",
        todayOrders: "Today's Orders",
        todayCustomers: "Today's Customers",
        storeRating: 'Store Rating',
        totalProducts: 'Total Products',
        inventoryAlert: 'Inventory Alert',
        totalValue: 'Total Value',
        todayUpdates: "Today's Updates",
        totalOrders: 'Total Orders',
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        totalEmployees: 'Total Employees',
        todayServices: "Today's Services",
        avgRating: 'Average Rating',
        attendance: 'Attendance',
        storeStatus: 'Store Status',
        basicInfo: 'Basic Information',
        businessInfo: 'Business Information',
        businessHours: 'Business Hours',
        manager: 'Manager',
        services: 'Services',
        quickActions: 'Quick Actions',
        newOrder: 'New Order',
        inventoryManagement: 'Inventory Management',
        employeeManagement: 'Employee Management',
        dataReports: 'Data Reports',
        createNewOrder: 'Create new service order',
        viewAndUpdateInventory: 'View and update inventory status',
        manageEmployeeInfo: 'Manage employee information and scheduling',
        viewBusinessData: 'View business data analysis',
        lowStockWarning: 'Low Stock Warning',
        immediateRestock: 'Immediate Restock',
        restockSuccess: 'Restock Successful',
        restockQuantity: 'Successfully restocked',
        inventoryList: 'Inventory List',
        productName: 'Product Name',
        category: 'Category',
        stock: 'Stock',
        unitPrice: 'Unit Price',
        supplier: 'Supplier',
        lastUpdate: 'Last Update',
        status: 'Status',
        actions: 'Actions',
        normal: 'Normal',
        lowStock: 'Low Stock',
        addProduct: 'Add Product',
        orderList: 'Order List',
        orderNumber: 'Order Number',
        customerInfo: 'Customer Info',
        serviceItem: 'Service Item',
        technician: 'Technician',
        amount: 'Amount',
        orderTime: 'Order Time',
        start: 'Start',
        complete: 'Complete',
        employeeList: 'Employee List',
        employeeInfo: 'Employee Info',
        position: 'Position',
        contactInfo: 'Contact Info',
        joinDate: 'Join Date',
        monthlyOrders: 'Monthly Orders',
        schedule: 'Schedule',
        workingEmployees: 'Active Employees',
        totalServices: 'Total Services',
        customerSatisfaction: 'Customer Satisfaction',
        todayAttendance: "Today's Attendance",
        notificationCenter: 'Notification Center',
        newOrderNotification: 'New Order',
        orderCompleted: 'Order Completed',
        search: 'Search',
        filter: 'Filter',
        export: 'Export',
        open: 'Open',
        closed: 'Closed',
        units: 'products',
        needRestock: 'need restock',
        totalValueDesc: 'total value',
        productUpdates: 'product updates',
        waitingProcess: 'waiting process',
        inService: 'in service',
        serviceCompleted: 'service completed',
        onDuty: 'active employees',
        serviceTimes: 'total services',
        attendanceRate: 'attendance rate',
        todayDuty: "today's attendance"
      },
      'ja-JP': {
        title: '店舗管理システム',
        subtitle: 'インテリジェント店舗運営管理プラットフォーム',
        dashboard: 'ダッシュボード',
        inventory: '在庫管理',
        orders: '注文管理',
        employees: '従業員管理',
        todayRevenue: '本日の売上',
        todayOrders: '本日の注文',
        todayCustomers: '本日の顧客',
        storeRating: '店舗評価',
        totalProducts: '総商品数',
        inventoryAlert: '在庫警告',
        totalValue: '総価値',
        todayUpdates: '本日の更新',
        totalOrders: '総注文数',
        pending: '待機中',
        processing: '処理中',
        completed: '完了',
        totalEmployees: '総従業員数',
        todayServices: '本日のサービス',
        avgRating: '平均評価',
        attendance: '出勤率',
        storeStatus: '店舗状態',
        basicInfo: '基本情報',
        businessInfo: '営業情報',
        businessHours: '営業時間',
        manager: '店長',
        services: 'サービス項目',
        quickActions: 'クイックアクション',
        newOrder: '新規注文',
        inventoryManagement: '在庫管理',
        employeeManagement: '従業員管理',
        dataReports: 'データレポート',
        createNewOrder: '新しいサービス注文を作成',
        viewAndUpdateInventory: '在庫状況を表示・更新',
        manageEmployeeInfo: '従業員情報とシフト管理',
        viewBusinessData: '営業データ分析を表示',
        lowStockWarning: '在庫警告',
        immediateRestock: '即時補充',
        restockSuccess: '補充成功',
        restockQuantity: '補充完了',
        inventoryList: '在庫リスト',
        productName: '商品名',
        category: 'カテゴリー',
        stock: '在庫',
        unitPrice: '単価',
        supplier: 'サプライヤー',
        lastUpdate: '最終更新',
        status: 'ステータス',
        actions: 'アクション',
        normal: '正常',
        lowStock: '在庫不足',
        addProduct: '商品追加',
        orderList: '注文リスト',
        orderNumber: '注文番号',
        customerInfo: '顧客情報',
        serviceItem: 'サービス項目',
        technician: '技術者',
        amount: '金額',
        orderTime: '注文時間',
        start: '開始',
        complete: '完了',
        employeeList: '従業員リスト',
        employeeInfo: '従業員情報',
        position: '役職',
        contactInfo: '連絡先情報',
        joinDate: '入社日',
        monthlyOrders: '月次注文',
        schedule: 'シフト',
        workingEmployees: '勤務中従業員',
        totalServices: '総サービス数',
        customerSatisfaction: '顧客満足度',
        todayAttendance: '本日出勤',
        notificationCenter: '通知センター',
        newOrderNotification: '新規注文',
        orderCompleted: '注文完了',
        search: '検索',
        filter: 'フィルター',
        export: 'エクスポート',
        open: '営業中',
        closed: '休業中',
        units: '商品',
        needRestock: '補充が必要',
        totalValueDesc: '総価値',
        productUpdates: '商品更新',
        waitingProcess: '処理待ち',
        inService: 'サービス中',
        serviceCompleted: 'サービス完了',
        onDuty: '勤務中',
        serviceTimes: '総サービス数',
        attendanceRate: '出勤率',
        todayDuty: '本日出勤'
      },
      'ko-KR': {
        title: '매장 관리 시스템',
        subtitle: '지능형 매장 운영 관리 플랫폼',
        dashboard: '대시보드',
        inventory: '재고 관리',
        orders: '주문 관리',
        employees: '직원 관리',
        todayRevenue: '오늘 매출',
        todayOrders: '오늘 주문',
        todayCustomers: '오늘 고객',
        storeRating: '매장 평점',
        totalProducts: '총 상품수',
        inventoryAlert: '재고 경고',
        totalValue: '총 가치',
        todayUpdates: '오늘 업데이트',
        totalOrders: '총 주문수',
        pending: '대기 중',
        processing: '처리 중',
        completed: '완료',
        totalEmployees: '총 직원수',
        todayServices: '오늘 서비스',
        avgRating: '평균 평점',
        attendance: '출근률',
        storeStatus: '매장 상태',
        basicInfo: '기본 정보',
        businessInfo: '영업 정보',
        businessHours: '영업 시간',
        manager: '점장',
        services: '서비스 항목',
        quickActions: '빠른 작업',
        newOrder: '신규 주문',
        inventoryManagement: '재고 관리',
        employeeManagement: '직원 관리',
        dataReports: '데이터 보고서',
        createNewOrder: '새로운 서비스 주문 생성',
        viewAndUpdateInventory: '재고 상태 보기 및 업데이트',
        manageEmployeeInfo: '직원 정보 및 근무표 관리',
        viewBusinessData: '영업 데이터 분석 보기',
        lowStockWarning: '재고 부족 경고',
        immediateRestock: '즉시 재입고',
        restockSuccess: '재입고 성공',
        restockQuantity: '성공적으로 재입고됨',
        inventoryList: '재고 목록',
        productName: '상품명',
        category: '카테고리',
        stock: '재고',
        unitPrice: '단가',
        supplier: '공급업체',
        lastUpdate: '마지막 업데이트',
        status: '상태',
        actions: '작업',
        normal: '정상',
        lowStock: '재고 부족',
        addProduct: '상품 추가',
        orderList: '주문 목록',
        orderNumber: '주문번호',
        customerInfo: '고객 정보',
        serviceItem: '서비스 항목',
        technician: '기술자',
        amount: '금액',
        orderTime: '주문 시간',
        start: '시작',
        complete: '완료',
        employeeList: '직원 목록',
        employeeInfo: '직원 정보',
        position: '직책',
        contactInfo: '연락처 정보',
        joinDate: '입사일',
        monthlyOrders: '월간 주문',
        schedule: '근무표',
        workingEmployees: '재직 직원',
        totalServices: '총 서비스수',
        customerSatisfaction: '고객 만족도',
        todayAttendance: '오늘 출근',
        notificationCenter: '알림 센터',
        newOrderNotification: '신규 주문',
        orderCompleted: '주문 완료',
        search: '검색',
        filter: '필터',
        export: '내보내기',
        open: '영업 중',
        closed: '휴업',
        units: '상품',
        needRestock: '재입고 필요',
        totalValueDesc: '총 가치',
        productUpdates: '상품 업데이트',
        waitingProcess: '처리 대기',
        inService: '서비스 중',
        serviceCompleted: '서비스 완료',
        onDuty: '재직 직원',
        serviceTimes: '총 서비스수',
        attendanceRate: '출근률',
        todayDuty: '오늘 출근'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key] || key;
  };

  // 初始化数据
  useEffect(() => {
    // 模拟门店数据
    setStoreData({
      name: 'AI染发色彩大师 - 朝阳店',
      address: '北京市朝阳区三里屯路19号',
      phone: '010-12345678',
      email: 'chaoyang@aihair.com',
      manager: '张经理',
      status: '营业中',
      todayRevenue: 15680.50,
      todayOrders: 28,
      todayCustomers: 25,
      monthlyRevenue: 456780.90,
      monthlyOrders: 680,
      monthlyCustomers: 620,
      rating: 4.8,
      openTime: '09:00',
      closeTime: '21:00',
      services: ['染发', '护理', '造型', '咨询']
    });

    // 模拟库存数据
    setInventoryData([{
      id: 1,
      name: '微潮紫染发剂',
      category: '染发剂',
      stock: 45,
      minStock: 20,
      maxStock: 100,
      unit: '瓶',
      price: 128.00,
      supplier: '美妆供应商A',
      lastUpdate: '2024-01-15',
      status: 'normal'
    }, {
      id: 2,
      name: '樱花粉染发剂',
      category: '染发剂',
      stock: 15,
      minStock: 20,
      maxStock: 100,
      unit: '瓶',
      price: 118.00,
      supplier: '美妆供应商A',
      lastUpdate: '2024-01-15',
      status: 'low'
    }, {
      id: 3,
      name: '深层护理套装',
      category: '护理产品',
      stock: 32,
      minStock: 15,
      maxStock: 80,
      unit: '套',
      price: 268.00,
      supplier: '美妆供应商B',
      lastUpdate: '2024-01-14',
      status: 'normal'
    }, {
      id: 4,
      name: '定型喷雾',
      category: '造型产品',
      stock: 8,
      minStock: 10,
      maxStock: 50,
      unit: '瓶',
      price: 58.00,
      supplier: '美妆供应商C',
      lastUpdate: '2024-01-15',
      status: 'low'
    }]);

    // 模拟订单数据
    setOrderData([{
      id: 'ORD-2024-001',
      customerName: '李小姐',
      customerPhone: '138****5678',
      service: '微潮紫染发',
      employee: '王技师',
      amount: 298.00,
      status: 'completed',
      orderTime: '2024-01-15 14:30',
      completeTime: '2024-01-15 16:45',
      rating: 5
    }, {
      id: 'ORD-2024-002',
      customerName: '张女士',
      customerPhone: '139****1234',
      service: '樱花粉染发+护理',
      employee: '李技师',
      amount: 398.00,
      status: 'processing',
      orderTime: '2024-01-15 15:20',
      completeTime: null,
      rating: null
    }, {
      id: 'ORD-2024-003',
      customerName: '王先生',
      customerPhone: '137****9876',
      service: '造型设计',
      employee: '赵技师',
      amount: 168.00,
      status: 'pending',
      orderTime: '2024-01-15 16:00',
      completeTime: null,
      rating: null
    }]);

    // 模拟员工数据
    setEmployeeData([{
      id: 1,
      name: '王技师',
      position: '高级技师',
      phone: '138****1111',
      email: 'wang@aihair.com',
      joinDate: '2022-03-15',
      status: 'active',
      todayOrders: 8,
      monthlyOrders: 156,
      rating: 4.9,
      salary: 8500.00,
      schedule: '09:00-18:00'
    }, {
      id: 2,
      name: '李技师',
      position: '中级技师',
      phone: '139****2222',
      email: 'li@aihair.com',
      joinDate: '2023-01-20',
      status: 'active',
      todayOrders: 6,
      monthlyOrders: 128,
      rating: 4.7,
      salary: 6500.00,
      schedule: '10:00-19:00'
    }, {
      id: 3,
      name: '赵技师',
      position: '初级技师',
      phone: '137****3333',
      email: 'zhao@aihair.com',
      joinDate: '2023-06-10',
      status: 'active',
      todayOrders: 4,
      monthlyOrders: 89,
      rating: 4.5,
      salary: 4500.00,
      schedule: '09:00-18:00'
    }]);
  }, []);

  // 处理库存补货
  const handleRestock = (itemId, quantity) => {
    setInventoryData(prev => prev.map(item => item.id === itemId ? {
      ...item,
      stock: item.stock + quantity,
      lastUpdate: new Date().toISOString().split('T')[0]
    } : item));
    toast({
      title: getText('restockSuccess'),
      description: `${getText('restockQuantity')} ${quantity} 件`
    });
  };

  // 处理订单状态更新
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setOrderData(prev => prev.map(order => order.id === orderId ? {
      ...order,
      status: newStatus,
      completeTime: newStatus === 'completed' ? new Date().toLocaleString() : null
    } : order));
    const statusText = newStatus === 'completed' ? getText('completed') : newStatus === 'processing' ? getText('processing') : getText('pending');
    toast({
      title: "状态更新成功",
      description: `订单状态已更新为 ${statusText}`
    });
  };

  // 处理员工排班
  const handleScheduleUpdate = (employeeId, newSchedule) => {
    setEmployeeData(prev => prev.map(employee => employee.id === employeeId ? {
      ...employee,
      schedule: newSchedule
    } : employee));
    toast({
      title: "排班更新成功",
      description: "员工排班时间已更新"
    });
  };

  // 渲染仪表板
  const renderDashboard = () => {
    if (!storeData) return null;
    return <div className="space-y-6">
        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('todayRevenue')}</p>
                  <p className="text-2xl font-bold text-gray-800">¥{storeData.todayRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12.5% 较昨日</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('todayOrders')}</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.todayOrders}</p>
                  <p className="text-xs text-blue-600">+8.2% 较昨日</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('todayCustomers')}</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.todayCustomers}</p>
                  <p className="text-xs text-purple-600">+15.3% 较昨日</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{getText('storeRating')}</p>
                  <p className="text-2xl font-bold text-gray-800">{storeData.rating}</p>
                  <p className="text-xs text-orange-600">⭐ 4.8分</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Store className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 门店状态 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="w-5 h-5 mr-2" />
              {getText('storeStatus')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">{getText('basicInfo')}</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Store className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{storeData.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">{getText('businessInfo')}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{getText('status')}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${storeData.status === '营业中' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {storeData.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{getText('businessHours')}</span>
                    <span className="text-sm">{storeData.openTime} - {storeData.closeTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{getText('manager')}</span>
                    <span className="text-sm">{storeData.manager}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{getText('services')}</span>
                    <span className="text-sm">{storeData.services.join('、')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">{getText('newOrder')}</h3>
              <p className="text-sm text-gray-600">{getText('createNewOrder')}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">{getText('inventoryManagement')}</h3>
              <p className="text-sm text-gray-600">{getText('viewAndUpdateInventory')}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">{getText('employeeManagement')}</h3>
              <p className="text-sm text-gray-600">{getText('manageEmployeeInfo')}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">{getText('dataReports')}</h3>
              <p className="text-sm text-gray-600">{getText('viewBusinessData')}</p>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染库存管理
  const renderInventory = () => {
    const lowStockItems = inventoryData.filter(item => item.status === 'low');
    return <div className="space-y-6">
        {/* 库存概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('totalProducts')}</p>
                <p className="text-2xl font-bold text-gray-800">{inventoryData.length}</p>
                <p className="text-xs text-gray-500">{getText('units')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('inventoryAlert')}</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
                <p className="text-xs text-gray-500">{getText('needRestock')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('totalValue')}</p>
                <p className="text-2xl font-bold text-green-600">¥{inventoryData.reduce((sum, item) => sum + item.stock * item.price, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">{getText('totalValueDesc')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('todayUpdates')}</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-xs text-gray-500">{getText('productUpdates')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 库存预警 */}
        {lowStockItems.length > 0 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                {getText('lowStockWarning')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map(item => <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-red-500" />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{getText('stock')}: {item.stock} {item.unit} ({getText('lowStock')}: {item.minStock} {item.unit})</p>
                      </div>
                    </div>
                    <Button onClick={() => handleRestock(item.id, item.maxStock - item.stock)} size="sm" className="bg-red-600 hover:bg-red-700">
                      {getText('immediateRestock')}
                    </Button>
                  </div>)}
              </div>
            </CardContent>
          </Card>}

        {/* 库存列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                {getText('inventoryList')}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  {getText('filter')}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {getText('export')}
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {getText('addProduct')}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">{getText('productName')}</th>
                    <th className="text-left py-3 px-4">{getText('category')}</th>
                    <th className="text-left py-3 px-4">{getText('stock')}</th>
                    <th className="text-left py-3 px-4">{getText('unitPrice')}</th>
                    <th className="text-left py-3 px-4">{getText('supplier')}</th>
                    <th className="text-left py-3 px-4">{getText('lastUpdate')}</th>
                    <th className="text-center py-3 px-4">{getText('status')}</th>
                    <th className="text-center py-3 px-4">{getText('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map(item => <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.unit}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${item.stock <= item.minStock ? 'text-red-600' : 'text-gray-800'}`}>
                            {item.stock}
                          </span>
                          {item.stock <= item.minStock && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </div>
                      </td>
                      <td className="py-3 px-4">¥{item.price}</td>
                      <td className="py-3 px-4">{item.supplier}</td>
                      <td className="py-3 px-4">{item.lastUpdate}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'low' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status === 'low' ? getText('lowStock') : getText('normal')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRestock(item.id, 10)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染订单管理
  const renderOrders = () => {
    const orderStats = {
      total: orderData.length,
      pending: orderData.filter(order => order.status === 'pending').length,
      processing: orderData.filter(order => order.status === 'processing').length,
      completed: orderData.filter(order => order.status === 'completed').length
    };
    return <div className="space-y-6">
        {/* 订单统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('totalOrders')}</p>
                <p className="text-2xl font-bold text-gray-800">{orderStats.total}</p>
                <p className="text-xs text-gray-500">{getText('todayOrders')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('pending')}</p>
                <p className="text-2xl font-bold text-orange-600">{orderStats.pending}</p>
                <p className="text-xs text-gray-500">{getText('waitingProcess')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('processing')}</p>
                <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
                <p className="text-xs text-gray-500">{getText('inService')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('completed')}</p>
                <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
                <p className="text-xs text-gray-500">{getText('serviceCompleted')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 订单列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {getText('orderList')}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  {getText('filter')}
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {getText('newOrder')}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">{getText('orderNumber')}</th>
                    <th className="text-left py-3 px-4">{getText('customerInfo')}</th>
                    <th className="text-left py-3 px-4">{getText('serviceItem')}</th>
                    <th className="text-left py-3 px-4">{getText('technician')}</th>
                    <th className="text-left py-3 px-4">{getText('amount')}</th>
                    <th className="text-left py-3 px-4">{getText('orderTime')}</th>
                    <th className="text-center py-3 px-4">{getText('status')}</th>
                    <th className="text-center py-3 px-4">{getText('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map(order => <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium">{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <h4 className="font-medium">{order.customerName}</h4>
                          <p className="text-xs text-gray-600">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.service}</td>
                      <td className="py-3 px-4">{order.employee}</td>
                      <td className="py-3 px-4">¥{order.amount}</td>
                      <td className="py-3 px-4">{order.orderTime}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                          {order.status === 'completed' ? getText('completed') : order.status === 'processing' ? getText('processing') : getText('pending')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          {order.status !== 'completed' && <Button size="sm" onClick={() => handleOrderStatusUpdate(order.id, order.status === 'pending' ? 'processing' : 'completed')}>
                            {order.status === 'pending' ? getText('start') : getText('complete')}
                          </Button>}
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染员工管理
  const renderEmployees = () => {
    const employeeStats = {
      total: employeeData.length,
      active: employeeData.filter(emp => emp.status === 'active').length,
      todayOrders: employeeData.reduce((sum, emp) => sum + emp.todayOrders, 0),
      avgRating: (employeeData.reduce((sum, emp) => sum + emp.rating, 0) / employeeData.length).toFixed(1)
    };
    return <div className="space-y-6">
        {/* 员工统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('totalEmployees')}</p>
                <p className="text-2xl font-bold text-gray-800">{employeeStats.total}</p>
                <p className="text-xs text-gray-500">{getText('onDuty')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('todayServices')}</p>
                <p className="text-2xl font-bold text-blue-600">{employeeStats.todayOrders}</p>
                <p className="text-xs text-gray-500">{getText('serviceTimes')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('avgRating')}</p>
                <p className="text-2xl font-bold text-purple-600">{employeeStats.avgRating}</p>
                <p className="text-xs text-gray-500">{getText('customerSatisfaction')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{getText('attendance')}</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-xs text-gray-500">{getText('todayDuty')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 员工列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {getText('employeeList')}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {getText('export')}
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加员工
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">{getText('employeeInfo')}</th>
                    <th className="text-left py-3 px-4">{getText('position')}</th>
                    <th className="text-left py-3 px-4">{getText('contactInfo')}</th>
                    <th className="text-left py-3 px-4">{getText('joinDate')}</th>
                    <th className="text-left py-3 px-4">{getText('todayOrders')}</th>
                    <th className="text-left py-3 px-4">{getText('monthlyOrders')}</th>
                    <th className="text-left py-3 px-4">{getText('avgRating')}</th>
                    <th className="text-left py-3 px-4">{getText('schedule')}</th>
                    <th className="text-center py-3 px-4">{getText('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.map(employee => <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-medium">{employee.name[0]}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{employee.name}</h4>
                            <p className="text-xs text-gray-600">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {employee.position}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm">{employee.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{employee.joinDate}</td>
                      <td className="py-3 px-4">{employee.todayOrders}</td>
                      <td className="py-3 px-4">{employee.monthlyOrders}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{employee.rating}</span>
                          <span className="text-yellow-500">⭐</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{employee.schedule}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
          
          <div className="flex items-center space-x-4">
            {/* 语言切换 */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm font-medium">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {languages.map(lang => <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)} className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${selectedLanguage === lang.code ? 'bg-purple-50' : ''}`}>
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>)}
              </div>
            </div>
            
            {/* 通知按钮 */}
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder={getText('search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'dashboard',
            name: getText('dashboard'),
            icon: BarChart3
          }, {
            id: 'inventory',
            name: getText('inventory'),
            icon: Package
          }, {
            id: 'orders',
            name: getText('orders'),
            icon: ShoppingCart
          }, {
            id: 'employees',
            name: getText('employees'),
            icon: Users
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'inventory' && renderInventory()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'employees' && renderEmployees()}
      </div>

      {/* 通知面板 */}
      {showNotifications && <div className="fixed top-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{getText('notificationCenter')}</h3>
              <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{getText('lowStockWarning')}</h4>
                <p className="text-xs text-gray-600">樱花粉染发剂库存不足，请及时补货</p>
                <p className="text-xs text-gray-500 mt-1">5分钟前</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{getText('newOrderNotification')}</h4>
                <p className="text-xs text-gray-600">张女士预约了樱花粉染发服务</p>
                <p className="text-xs text-gray-500 mt-1">10分钟前</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{getText('orderCompleted')}</h4>
                <p className="text-xs text-gray-600">李小姐的染发服务已完成，评分5星</p>
                <p className="text-xs text-gray-500 mt-1">30分钟前</p>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="store-management" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}