// @ts-ignore;
import React, { useState, useMemo, useCallback, useRef } from 'react';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const searchTimeoutRef = useRef(null);

  // 安全的错误数据转换 - 使用 useMemo 优化
  const errorList = useMemo(() => {
    try {
      const list = [];

      // 处理不同格式的错误数据
      if (typeof errors === 'object' && errors !== null) {
        Object.entries(errors).forEach(([key, error]) => {
          if (error && typeof error === 'object') {
            list.push({
              id: key || `error_${Date.now()}_${Math.random()}`,
              key: key,
              ...error,
              timestamp: error.timestamp || Date.now(),
              type: error.type || 'error',
              severity: error.severity || 'medium',
              message: error.message || error.description || '未知错误'
            });
          }
        });
      }

      // 从测试结果中提取错误
      if (Array.isArray(testResults)) {
        testResults.forEach((result, index) => {
          if (result && result.errors && typeof result.errors === 'object') {
            Object.entries(result.errors).forEach(([key, error]) => {
              if (error && typeof error === 'object') {
                list.push({
                  id: `test_${index}_${key}`,
                  key: key,
                  ...error,
                  timestamp: error.timestamp || result.endTime || Date.now(),
                  type: error.type || 'error',
                  severity: error.severity || 'medium',
                  message: error.message || error.description || '未知错误',
                  source: `测试结果 ${index + 1}`
                });
              }
            });
          }

          // 处理测试结果中的错误状态
          if (result && (result.status === 'failed' || result.status === 'error')) {
            list.push({
              id: `test_status_${index}`,
              key: `test_${index}_status`,
              timestamp: result.endTime || Date.now(),
              type: 'error',
              severity: 'high',
              message: result.error || `测试执行${result.status}`,
              source: `测试 ${index + 1}`,
              context: {
                testId: result.id,
                scenario: result.scenario,
                duration: result.duration
              }
            });
          }
        });
      }
      return list.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error processing error data:', error);
      return [];
    }
  }, [errors, testResults]);

  // 防抖搜索 - 使用 useCallback 优化
  const handleSearchChange = useCallback(value => {
    setSearchTerm(value);

    // 清除之前的搜索定时器
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // 设置新的搜索定时器
    searchTimeoutRef.current = setTimeout(() => {
      setIsProcessing(false);
    }, 300);
  }, []);

  // 过滤和搜索错误 - 使用 useMemo 优化
  const filteredErrors = useMemo(() => {
    setIsProcessing(true);
    return errorList.filter(error => {
      if (!error || !error.message) return false;

      // 类型过滤
      if (filterType !== 'all' && error.type !== filterType) {
        return false;
      }

      // 搜索过滤
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return error.message.toLowerCase().includes(searchLower) || error.key && error.key.toLowerCase().includes(searchLower) || error.source && error.source.toLowerCase().includes(searchLower);
      }
      return true;
    });
  }, [errorList, filterType, searchTerm]);

  // 错误统计 - 使用 useMemo 优化
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
      if (error.type) {
        stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      }
    });
    return stats;
  }, [errorList]);

  // 使用 useCallback 优化图标获取
  const getSeverityIcon = useCallback(severity => {
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
  }, []);

  // 使用 useCallback 优化徽章获取
  const getSeverityBadge = useCallback(severity => {
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
  }, []);

  // 使用 useCallback 优化类型图标获取
  const getTypeIcon = useCallback(type => {
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
  }, []);

  // 使用 useCallback 优化时间戳格式化
  const formatTimestamp = useCallback(timestamp => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch (error) {
      return '无效时间戳';
    }
  }, []);

  // 切换错误展开状态
  const toggleErrorExpansion = useCallback(errorId => {
    const newExpanded = new Set(expandedErrors);
    if (newExpanded.has(errorId)) {
      newExpanded.delete(errorId);
    } else {
      newExpanded.add(errorId);
    }
    setExpandedErrors(newExpanded);
  }, [expandedErrors]);

  // 导出错误日志
  const exportErrorLogs = useCallback(() => {
    try {
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
    } catch (error) {
      console.error('Export error:', error);
      alert('导出失败，请重试');
    }
  }, [errorList, errorStats, testResults]);

  // 清除所有错误
  const clearAllErrors = useCallback(() => {
    if (confirm('确定要清除所有错误日志吗？此操作不可恢复。')) {
      onClear && onClear();
      setSelectedError(null);
      setExpandedErrors(new Set());
      setSearchTerm('');
      setFilterType('all');
    }
  }, [onClear]);

  // 重置过滤器
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setFilterType('all');
    setShowDetails(true);
  }, []);

  // 清理搜索定时器
  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
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
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <RefreshCw className="w-4 h-4 mr-2" />
                重置过滤
              </Button>
              <Button variant="outline" size="sm" onClick={exportErrorLogs} disabled={errorList.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                导出日志
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllErrors} disabled={errorList.length === 0}>
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
                <Input placeholder="搜索错误信息..." value={searchTerm} onChange={e => handleSearchChange(e.target.value)} className="pl-10" />
                {isProcessing && <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>}
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
                          <h4 className="font-medium text-sm">{error.key || '未知错误'}</h4>
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
                            <span>{error.type || '未知'}</span>
                          </div>
                          <div>
                            <span className="font-medium">严重程度: </span>
                            <span>{error.severity || '未知'}</span>
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