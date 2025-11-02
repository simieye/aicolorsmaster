// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, FileText, Bot, User, Star, X } from 'lucide-react';

// @ts-ignore;
import { LoadingSpinner, ListItemSkeleton, MessageEmpty } from '@/components/LoadingStates';
export const ConsultationHistory = ({
  consultationHistory,
  loading,
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  onExportHistory,
  onRetry
}) => {
  const [selectedHistory, setSelectedHistory] = useState(null);
  const filteredHistory = consultationHistory.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = !searchTerm || item.userName.toLowerCase().includes(searchTerm.toLowerCase()) || item.topic.toLowerCase().includes(searchTerm.toLowerCase()) || item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  if (loading) {
    return <div className="p-4">
        <ListItemSkeleton count={5} />
      </div>;
  }
  return <div className="p-4 space-y-4">
      {/* 搜索和筛选 */}
      <div className="bg-card border-b p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="搜索咨询记录..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64" />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="all">全部类型</option>
                <option value="ai">AI客服</option>
                <option value="human">人工客服</option>
              </select>
            </div>
          </div>
          <Button variant="outline" onClick={onExportHistory}>
            <Download className="w-4 h-4 mr-2" />
            导出记录
          </Button>
        </div>
      </div>

      {/* 咨询记录列表 */}
      {!filteredHistory || filteredHistory.length === 0 ? <MessageEmpty /> : filteredHistory.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedHistory(item)}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {item.type === 'ai' ? <Bot className="w-4 h-4 text-blue-500" /> : <User className="w-4 h-4 text-green-500" />}
                  <span className="font-medium">{item.userName}</span>
                  <span className={`px-2 py-1 rounded text-xs ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {item.status === 'completed' ? '已完成' : '进行中'}
                  </span>
                  <span className="text-sm text-muted-foreground">{item.topic}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                  <span>时长: {item.duration}分钟</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>)}

      {/* 咨询详情弹窗 */}
      {selectedHistory && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">咨询详情</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedHistory(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">用户:</span>
                    <span className="ml-2">{selectedHistory.userName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">类型:</span>
                    <span className="ml-2">{selectedHistory.type === 'ai' ? 'AI客服' : '人工客服'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">状态:</span>
                    <span className="ml-2">{selectedHistory.status === 'completed' ? '已完成' : '进行中'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">时长:</span>
                    <span className="ml-2">{selectedHistory.duration}分钟</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">对话记录</h4>
                  <div className="space-y-2">
                    {selectedHistory.messages && selectedHistory.messages.map((msg, index) => <div key={index} className={`p-2 rounded ${msg.type === 'user' ? 'bg-primary/10' : 'bg-muted'}`}>
                        <div className="text-xs text-muted-foreground mb-1">
                          {msg.type === 'user' ? '用户' : '客服'} - {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-sm">{msg.content}</div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};