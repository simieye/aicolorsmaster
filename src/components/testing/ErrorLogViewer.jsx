// @ts-ignore;
import React, { useState, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Alert, AlertDescription, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, ScrollArea } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, XCircle, Bug, Search, Filter, Download, RefreshCw, Eye, EyeOff, Calendar, Clock, FileText, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

export function ErrorLogViewer({
  errors = {},
  testResults = [],
  onClear,
  onExport
}) {
  const [selectedError, setSelectedError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedErrors, setExpandedErrors] = useState(new Set());
  const [showDetails, setShowDetails] = useState(true);

  // 将错误对象转换为数组格式
  const errorList = useMemo(() => {
    const list = [];
    Object.entries(errors).forEach(([key, error]) => {
      list.push({
        id: key,
        key,
        ...error,
        timestamp: error.timestamp || Date.now(),
        type: error.type || 'error',
        severity: error.severity || 'medium'
      });
    });
    return list.sort((a, b) => b.timestamp - a.timestamp);
  }, [errors]);

  // 过滤和搜索错误
  const filteredErrors = useMemo(() => {
    return errorList.filter(error => {
      // 类型过滤
      if (filterType !== 'all' && error.type !== filterType) {
        return false;
      }

      // 搜索过滤
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return error.message?.toLowerCase().includes(searchLower) || error.key?.toLowerCase().includes(searchLower) || error.source?.toLowerCase().includes(searchLower);
      }
      return true;
    });
  }, [errorList, filterType, searchTerm]);

  // 错误统计
  const errorStats = useMemo(() => {
    const stats = {
      total: errorList.length,
      critical: errorList.filter(e => e.severity === 'critical').length,
      high: errorList.filter(e => e.severity === 'high').length,
      medium: errorList.filter(e => e.severity === 'medium').length,
      low: errorList.filter(e => e.severity === 'low').length,
      byType: {}
    };
    errorList.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
    });
    return stats;
  }, [errorList]);
  const getSeverityIcon = severity => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Bug className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };
  const getSeverityBadge = severity => {
    const variants = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'secondary',
      low: 'outline'
    };
    const labels = {
      critical: '严重',
      high: '高',
      medium: '中',
      low: '低'
    };
    return <Badge variant={variants[severity] || 'outline'}>
        {labels[severity] || '未知'}
      </Badge>;
  };
  const getTypeIcon = type => {
    switch (type) {
      case 'network':
        return <Bug className="w-4 h-4" />;
      case 'timeout':
        return <Clock className="w-4 h-4" />;
      case 'validation':
        return <FileText className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };
  const formatTimestamp = timestamp => {
    return new Date(timestamp).toLocaleString();
  };
  const toggleErrorExpansion = errorId => {
    const newExpanded = new Set(expandedErrors);
    if (newExpanded.has(errorId)) {
      newExpanded.delete(errorId);
    } else {
      newExpanded.add(errorId);
    }
    setExpandedErrors(newExpanded);
  };
  const exportErrorLogs = () => {
    const exportData = {
      errors: errorList,
      stats: errorStats,
      exportedAt: Date.now(),
      testResults: testResults.map(r => ({
        id: r.id,
        status: r.status,
        timestamp: r.endTime
      }))
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const clearAllErrors = () => {
    if (confirm('确定要清除所有错误日志吗？此操作不可恢复。')) {
      onClear && onClear();
      setSelectedError(null);
      setExpandedErrors(new Set());
    }
  };
  return <div className="space-y-6">
      {/* 错误统计概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              错误日志分析
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportErrorLogs}>
                <Download className="w-4 h-4 mr-2" />
                导出日志
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllErrors}>
                <Trash2 className="w-4 h-4 mr-2" />
                清除
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{errorStats.total}</div>
              <div className="text-xs text-muted-foreground">总错误数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{errorStats.critical}</div>
              <div className="text-xs text-muted-foreground">严重</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{errorStats.high}</div>
              <div className="text-xs text-muted-foreground">高</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{errorStats.medium}</div>
              <div className="text-xs text-muted-foreground">中</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{errorStats.low}</div>
              <div className="text-xs text-muted-foreground">低</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 过滤和搜索 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="搜索错误信息..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="network">网络错误</SelectItem>
                  <SelectItem value="timeout">超时错误</SelectItem>
                  <SelectItem value="validation">验证错误</SelectItem>
                  <SelectItem value="system">系统错误</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showDetails ? '隐藏详情' : '显示详情'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 错误列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>错误列表 ({filteredErrors.length})</span>
            {filteredErrors.length !== errorList.length && <Badge variant="secondary">
              已过滤 {filteredErrors.length}/{errorList.length}
            </Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredErrors.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
              <p>{errorList.length === 0 ? '暂无错误日志' : '没有符合过滤条件的错误'}</p>
            </div> : <ScrollArea className="h-96">
              <div className="space-y-3">
                {filteredErrors.map(error => <div key={error.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getSeverityIcon(error.severity)}
                        <div>
                          <h4 className="font-medium text-sm">{error.key}</h4>
                          <p className="text-xs text-muted-foreground">
                            {formatTimestamp(error.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(error.severity)}
                        <Button variant="ghost" size="sm" onClick={() => toggleErrorExpansion(error.id)}>
                          {expandedErrors.has(error.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2">
                      {error.message}
                    </div>

                    {expandedErrors.has(error.id) && showDetails && <div className="mt-3 pt-3 border-t space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-medium">错误类型: </span>
                            <span>{error.type}</span>
                          </div>
                          <div>
                            <span className="font-medium">严重程度: </span>
                            <span>{error.severity}</span>
                          </div>
                          {error.source && <div>
                              <span className="font-medium">来源: </span>
                              <span>{error.source}</span>
                            </div>}
                          {error.code && <div>
                              <span className="font-medium">错误代码: </span>
                              <span>{error.code}</span>
                            </div>}
                        </div>

                        {error.stack && <div>
                            <h5 className="font-medium text-xs mb-2">堆栈跟踪:</h5>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap">
                              {error.stack}
                            </pre>
                          </div>}

                        {error.context && <div>
                            <h5 className="font-medium text-xs mb-2">上下文信息:</h5>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(error.context, null, 2)}
                            </pre>
                          </div>}

                        {error.suggestions && <div>
                            <h5 className="font-medium text-xs mb-2">建议解决方案:</h5>
                            <ul className="text-xs space-y-1">
                              {error.suggestions.map((suggestion, index) => <li key={index} className="flex items-start gap-2">
                                  <span className="text-green-500">•</span>
                                  <span>{suggestion}</span>
                                </li>)}
                            </ul>
                          </div>}
                      </div>}
                  </div>)}
              </div>
            </ScrollArea>}
        </CardContent>
      </Card>

      {/* 错误类型分布 */}
      {Object.keys(errorStats.byType).length > 0 && <Card>
          <CardHeader>
            <CardTitle>错误类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(errorStats.byType).map(([type, count]) => <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(type)}
                    <span className="text-sm font-medium">{type}</span>
                  </div>
                  <Badge variant="outline">{count}</Badge>
                </div>)}
            </div>
          </CardContent>
        </Card>}
    </div>;
}
export default ErrorLogViewer;