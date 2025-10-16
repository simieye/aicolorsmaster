// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Clock, Link, Tag, Trash2, Share2, Eye, Calendar, TrendingUp } from 'lucide-react';

export function ScanHistory({
  onScanSelect,
  onClose
}) {
  const {
    toast
  } = useToast();
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('time');
  useEffect(() => {
    loadHistory();
  }, []);
  const loadHistory = () => {
    const savedHistory = localStorage.getItem('scanHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    } else {
      // 模拟历史数据
      const mockHistory = [{
        id: 1,
        raw: 'https://aihair.com/product/12345',
        type: 'product',
        data: {
          url: 'https://aihair.com/product/12345',
          productId: '12345',
          type: 'product'
        },
        timestamp: new Date('2024-01-15T10:30:00'),
        title: '微潮紫染发剂',
        description: '热门产品 - 微潮紫色系'
      }, {
        id: 2,
        raw: 'https://aihair.com/promo/spring2024',
        type: 'promotion',
        data: {
          url: 'https://aihair.com/promo/spring2024',
          promoCode: 'spring2024',
          type: 'promotion'
        },
        timestamp: new Date('2024-01-14T15:20:00'),
        title: '春季促销活动',
        description: '限时优惠 - 全场8折'
      }, {
        id: 3,
        raw: 'AIHAIR-PRODUCT-001',
        type: 'product',
        data: {
          code: 'AIHAIR-PRODUCT-001',
          productId: '001',
          type: 'product'
        },
        timestamp: new Date('2024-01-13T09:15:00'),
        title: '樱花粉染发剂',
        description: '新品推荐 - 日系色系'
      }, {
        id: 4,
        raw: 'https://aihair.com/user/invite?code=ABC123',
        type: 'invite',
        data: {
          url: 'https://aihair.com/user/invite?code=ABC123',
          inviteCode: 'ABC123',
          type: 'invite'
        },
        timestamp: new Date('2024-01-12T14:45:00'),
        title: '邀请码',
        description: '用户邀请 - ABC123'
      }];
      setHistory(mockHistory);
    }
  };
  const saveHistory = newHistory => {
    localStorage.setItem('scanHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };
  const deleteHistoryItem = id => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
    toast({
      title: "删除成功",
      description: "已删除扫描记录"
    });
  };
  const clearAllHistory = () => {
    if (window.confirm('确定要清空所有扫描记录吗？')) {
      saveHistory([]);
      toast({
        title: "清空成功",
        description: "已清空所有扫描记录"
      });
    }
  };
  const shareHistoryItem = item => {
    if (navigator.share) {
      navigator.share({
        title: item.title || '扫描结果',
        text: item.description || item.raw,
        url: item.data.url || item.raw
      });
    } else {
      navigator.clipboard.writeText(item.raw);
      toast({
        title: "复制成功",
        description: "已复制到剪贴板"
      });
    }
  };
  const getTypeIcon = type => {
    switch (type) {
      case 'product':
        return <Tag className="w-4 h-4 text-purple-600" />;
      case 'promotion':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'invite':
        return <Link className="w-4 h-4 text-blue-600" />;
      default:
        return <Link className="w-4 h-4 text-gray-600" />;
    }
  };
  const getTypeLabel = type => {
    switch (type) {
      case 'product':
        return '产品';
      case 'promotion':
        return '促销';
      case 'invite':
        return '邀请';
      default:
        return '其他';
    }
  };
  const formatDate = date => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    if (days > 0) {
      return `${days}天前`;
    } else if (hours > 0) {
      return `${hours}小时前`;
    } else if (minutes > 0) {
      return `${minutes}分钟前`;
    } else {
      return '刚刚';
    }
  };
  const filteredHistory = history.filter(item => {
    const matchesSearch = item.raw.toLowerCase().includes(searchTerm.toLowerCase()) || item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });
  return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* 头部 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">扫描历史</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* 搜索和筛选 */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="搜索扫描记录..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">全部类型</option>
              <option value="product">产品</option>
              <option value="promotion">促销</option>
              <option value="invite">邀请</option>
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="time">按时间</option>
              <option value="type">按类型</option>
            </select>
          </div>
        </div>

        {/* 历史记录列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredHistory.length === 0 ? <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">暂无扫描记录</p>
            </div> : <div className="space-y-3">
              {filteredHistory.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(item.type)}
                          <span className="text-sm font-medium text-gray-600">
                            {getTypeLabel(item.type)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(new Date(item.timestamp))}
                          </span>
                        </div>
                        
                        {item.title && <h4 className="font-medium text-gray-800 mb-1">
                            {item.title}
                          </h4>}
                        
                        {item.description && <p className="text-sm text-gray-600 mb-2">
                            {item.description}
                          </p>}
                        
                        <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded break-all">
                          {item.raw}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 ml-4">
                        <Button variant="ghost" size="sm" onClick={() => onScanSelect && onScanSelect(item)} className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => shareHistoryItem(item)} className="text-green-600 hover:text-green-800">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteHistoryItem(item.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}
        </div>

        {/* 底部操作 */}
        {history.length > 0 && <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                共 {filteredHistory.length} 条记录
              </span>
              <Button variant="outline" size="sm" onClick={clearAllHistory} className="text-red-600 border-red-600 hover:bg-red-50">
                清空历史
              </Button>
            </div>
          </div>}
      </div>
    </div>;
}
export default ScanHistory;