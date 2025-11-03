// @ts-ignore;
import React, { useState, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { FileText, Download, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, BarChart3, TrendingUp, TrendingDown, Eye, Filter, RefreshCw } from 'lucide-react';

export function TestReportViewer({
  reports = [],
  testResults = [],
  onExport
}) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // 使用 useMemo 优化报告列表
  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // 状态过滤
    if (filterStatus !== 'all') {
      filtered = filtered.filter(report => report.summary.status === filterStatus);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.generatedAt - a.generatedAt;
        case 'duration':
          return b.summary.duration - a.summary.duration;
        case 'passRate':
          const passRateA = a.summary.passedTests / a.summary.totalTests * 100;
          const passRateB = b.summary.passedTests / b.summary.totalTests * 100;
          return passRateB - passRateA;
        default:
          return b.generatedAt - a.generatedAt;
      }
    });
    return filtered;
  }, [reports, filterStatus, sortBy]);

  // 使用 useMemo 优化统计数据
  const reportStats = useMemo(() => {
    const stats = {
      total: reports.length,
      passed: reports.filter(r => r.summary.status === 'passed').length,
      failed: reports.filter(r => r.summary.status === 'failed').length,
      avgDuration: reports.length > 0 ? reports.reduce((sum, r) => sum + r.summary.duration, 0) / reports.length : 0,
      totalTests: reports.reduce((sum, r) => sum + r.summary.totalTests, 0),
      totalPassed: reports.reduce((sum, r) => sum + r.summary.passedTests, 0)
    };
    stats.overallPassRate = stats.totalTests > 0 ? stats.totalPassed / stats.totalTests * 100 : 0;
    return stats;
  }, [reports]);

  // 获取状态徽章
  const getStatusBadge = useCallback(status => {
    switch (status) {
      case 'passed':
        return <Badge variant="default" className="bg-green-500">通过</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      case 'partial':
        return <Badge variant="secondary">部分通过</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  }, []);

  // 获取状态图标
  const getStatusIcon = useCallback(status => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  }, []);

  // 格式化持续时间
  const formatDuration = useCallback(duration => {
    if (!duration) return 'N/A';
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  }, []);

  // 导出报告
  const exportReport = useCallback(report => {
    if (onExport) {
      onExport(report);
    } else {
      // 默认导出逻辑
      const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-report-${report.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [onExport]);

  // 查看报告详情
  const viewReportDetails = useCallback(report => {
    setSelectedReport(report);
  }, []);
  return <div className="space-y-6">
      {/* 报告统计概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              测试报告
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="passed">通过</SelectItem>
                  <SelectItem value="failed">失败</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">按日期</SelectItem>
                  <SelectItem value="duration">按时长</SelectItem>
                  <SelectItem value="passRate">按通过率</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{reportStats.total}</div>
              <div className="text-xs text-muted-foreground">总报告数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{reportStats.passed}</div>
              <div className="text-xs text-muted-foreground">通过</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{reportStats.failed}</div>
              <div className="text-xs text-muted-foreground">失败</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatDuration(reportStats.avgDuration)}</div>
              <div className="text-xs text-muted-foreground">平均时长</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{reportStats.overallPassRate.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">总体通过率</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 报告列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle>报告列表 ({filteredReports.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-3">
                {filteredReports.length === 0 ? <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4" />
                    <p>暂无测试报告</p>
                  </div> : filteredReports.map(report => <div key={report.id} className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => viewReportDetails(report)}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.summary.status)}
                        <span className="font-medium text-sm">报告 #{report.id.slice(-8)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.summary.status)}
                        <Button variant="ghost" size="sm" onClick={e => {
                      e.stopPropagation();
                      exportReport(report);
                    }}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>测试数: {report.summary.totalTests}</div>
                      <div>通过: {report.summary.passedTests}</div>
                      <div>失败: {report.summary.failedTests}</div>
                      <div>时长: {formatDuration(report.summary.duration)}</div>
                    </div>
                    <div className="mt-2">
                      <Progress value={report.summary.passedTests / report.summary.totalTests * 100} className="w-full h-2" />
                    </div>
                  </div>)}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 报告详情 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              报告详情
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedReport ? <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">报告 #{selectedReport.id.slice(-8)}</h3>
                  {getStatusBadge(selectedReport.summary.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">生成时间:</span>
                    <div>{new Date(selectedReport.generatedAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">测试ID:</span>
                    <div>{selectedReport.testId}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">总测试数:</span>
                    <div>{selectedReport.summary.totalTests}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">通过率:</span>
                    <div>{(selectedReport.summary.passedTests / selectedReport.summary.totalTests * 100).toFixed(1)}%</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">测试套件结果</h4>
                  <div className="space-y-2">
                    {selectedReport.details?.map((detail, index) => <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(detail.status)}
                          <span className="text-sm">{detail.suite}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {detail.passed}/{detail.tests}
                          </span>
                          <Badge variant={detail.status === 'passed' ? 'default' : 'destructive'}>
                            {detail.status}
                          </Badge>
                        </div>
                      </div>)}
                  </div>
                </div>

                {selectedReport.performance && <div>
                    <h4 className="font-medium mb-2">性能指标</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedReport.performance).map(([key, value]) => <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
                        </div>)}
                    </div>
                  </div>}
              </div> : <div className="text-center py-8 text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-4" />
                <p>选择一个报告查看详情</p>
              </div>}
          </CardContent>
        </Card>
      </div>
    </div>;
}
export default TestReportViewer;