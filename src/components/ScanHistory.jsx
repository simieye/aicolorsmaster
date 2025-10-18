// @ts-ignore;
import React, { useState, useMemo } from 'react';
// @ts-ignore;
import { Search, Filter, Clock, QrCode, Barcode, Trash2, Eye, Calendar, Tag } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function ScanHistory({
  history,
  onDeleteItem,
  selectedLanguage
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const getText = key => {
    const texts = {
      'zh-CN': {
        searchPlaceholder: '搜索扫码记录...',
        filterByType: '按类型筛选',
        filterByDate: '按日期筛选',
        allTypes: '全部类型',
        allDates: '全部日期',
        today: '今天',
        yesterday: '昨天',
        thisWeek: '本周',
        thisMonth: '本月',
        qrCode: '二维码',
        barcode: '条形码',
        dataMatrix: 'Data Matrix',
        actions: '操作',
        view: '查看',
        delete: '删除',
        noHistory: '暂无扫码记录',
        startFirstScan: '开始您的第一次扫码',
        scanTime: '扫码时间',
        scanContent: '扫码内容'
      },
      'en-US': {
        searchPlaceholder: 'Search scan records...',
        filterByType: 'Filter by Type',
        filterByDate: 'Filter by Date',
        allTypes: 'All Types',
        allDates: 'All Dates',
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        qrCode: 'QR Code',
        barcode: 'Barcode',
        dataMatrix: 'Data Matrix',
        actions: 'Actions',
        view: 'View',
        delete: 'Delete',
        noHistory: 'No scan records',
        startFirstScan: 'Start your first scan',
        scanTime: 'Scan Time',
        scanContent: 'Scan Content'
      },
      'ja-JP': {
        searchPlaceholder: 'スキャン記録を検索...',
        filterByType: 'タイプで絞り込み',
        filterByDate: '日付で絞り込み',
        allTypes: 'すべてのタイプ',
        allDates: 'すべての日付',
        today: '今日',
        yesterday: '昨日',
        thisWeek: '今週',
        thisMonth: '今月',
        qrCode: 'QRコード',
        barcode: 'バーコード',
        dataMatrix: 'データマトリックス',
        actions: 'アクション',
        view: '表示',
        delete: '削除',
        noHistory: 'スキャン記録がありません',
        startFirstScan: '最初のスキャンを開始',
        scanTime: 'スキャン時間',
        scanContent: 'スキャン内容'
      },
      'ko-KR': {
        searchPlaceholder: '스캔 기록 검색...',
        filterByType: '유형별 필터',
        filterByDate: '날짜별 필터',
        allTypes: '모든 유형',
        allDates: '모든 날짜',
        today: '오늘',
        yesterday: '어제',
        thisWeek: '이번 주',
        thisMonth: '이번 달',
        qrCode: 'QR코드',
        barcode: '바코드',
        dataMatrix: '데이터 매트릭스',
        actions: '작업',
        view: '보기',
        delete: '삭제',
        noHistory: '스캔 기록이 없습니다',
        startFirstScan: '첫 번째 스캔을 시작하세요',
        scanTime: '스캔 시간',
        scanContent: '스캔 내용'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key];
  };
  const filteredHistory = useMemo(() => {
    let filtered = history;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(item => item.content.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 类型过滤
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    // 日期过滤
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    if (filterDate === 'today') {
      filtered = filtered.filter(item => new Date(item.timestamp) >= today);
    } else if (filterDate === 'yesterday') {
      filtered = filtered.filter(item => {
        const date = new Date(item.timestamp);
        return date >= yesterday && date < today;
      });
    } else if (filterDate === 'thisWeek') {
      filtered = filtered.filter(item => new Date(item.timestamp) >= thisWeek);
    } else if (filterDate === 'thisMonth') {
      filtered = filtered.filter(item => new Date(item.timestamp) >= thisMonth);
    }
    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [history, searchTerm, filterType, filterDate]);
  const getTypeIcon = type => {
    switch (type) {
      case 'qr':
        return <QrCode className="w-4 h-4" />;
      case 'barcode':
        return <Barcode className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString();
  };
  if (history.length === 0) {
    return <div className="text-center py-12">
        <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">{getText('noHistory')}</h3>
        <p className="text-gray-500">{getText('startFirstScan')}</p>
      </div>;
  }
  return <div className="space-y-4">
      {/* 搜索和筛选 */}
      <div className="space-y-3">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder={getText('searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>

        {/* 筛选器 */}
        <div className="flex space-x-3">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">{getText('allTypes')}</option>
            <option value="qr">{getText('qrCode')}</option>
            <option value="barcode">{getText('barcode')}</option>
            <option value="datamatrix">{getText('dataMatrix')}</option>
          </select>

          <select value={filterDate} onChange={e => setFilterDate(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">{getText('allDates')}</option>
            <option value="today">{getText('today')}</option>
            <option value="yesterday">{getText('yesterday')}</option>
            <option value="thisWeek">{getText('thisWeek')}</option>
            <option value="thisMonth">{getText('thisMonth')}</option>
          </select>
        </div>
      </div>

      {/* 历史记录列表 */}
      <div className="space-y-2">
        {filteredHistory.map((item, index) => <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2">
                  {getTypeIcon(item.type)}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {item.type.toUpperCase()}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-800 truncate">{item.content}</p>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800" onClick={() => onDeleteItem(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>)}
      </div>

      {filteredHistory.length === 0 && <div className="text-center py-8">
          <p className="text-gray-500">没有找到匹配的记录</p>
        </div>}
    </div>;
}