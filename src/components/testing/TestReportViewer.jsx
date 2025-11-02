// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { FileText, Download, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, BarChart3, TrendingUp, TrendingDown, Eye, EyeOff, Filter } from 'lucide-react';

export function TestReportViewer({
  reports,
  testResults,
  onExport
}) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedSections, setExpandedSections] = useState({});
  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const filteredReports = reports.filter(report => {
    if (filterStatus === 'all') return true;
    return report.summary.status === filterStatus;
  });
  const getStatusIcon = status => {
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
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'passed':
        return <Badge variant="default">通过</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      case 'partial':
        return <Badge variant="secondary">部分通过</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  const calculateSuccessRate = summary => {
    if (summary.totalTests === 0) return 0;
    return (summary.passedTests / summary.totalTests * 100).toFixed(1);
  };
  const formatDuration = ms => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };
  const getPerformanceTrend = (current, baseline) => {
    if (!baseline) return null;
    const change = (current - baseline) / baseline * 100;
    return {
      value: change.toFixed(1),
      isPositive: change < 0,
      // 对于性能指标，负值表示改善
      trend: change < 0 ? 'down' : 'up'
    };
  };
  return <div className="space-y-6">
      {/* 报告列表和筛选 */}
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
                  <SelectItem value="partial">部分通过</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredReports.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p>暂无测试报告</p>
            </div> : <div className="space-y-3">
              {filteredReports.map(report => <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(report.summary.status)}
                      <div>
                        <h4 className="font-medium">报告 #{report.id.split('_')[1]}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.generatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(report.summary.status)}
                      <Button variant="ghost" size="sm" onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}>
                        {selectedReport?.id === report.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onExport(report)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">总测试数: </span>
                      <span className="font-medium">{report.summary.totalTests}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">通过: </span>
                      <span className="font-medium text-green-500">{report.summary.passedTests}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">失败: </span>
                      <span className="font-medium text-red-500">{report.summary.failedTests}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">成功率: </span>
                      <span className="font-medium">{calculateSuccessRate(report.summary)}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">耗时: </span>
                      <span className="font-medium">{formatDuration(report.summary.duration)}</span>
                    </div>
                  </div>

                  {/* 成功率进度条 */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">成功率</span>
                      <span className="text-xs font-medium">{calculateSuccessRate(report.summary)}%</span>
                    </div>
                    <Progress value={parseFloat(calculateSuccessRate(report.summary))} className="w-full h-2" />
                  </div>
                </div>)}
            </div>}
        </CardContent>
      </Card>

      {/* 详细报告查看 */}
      {selectedReport && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              详细报告 - #{selectedReport.id.split('_')[1]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 测试概览 */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  测试概览
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-500">{selectedReport.summary.totalTests}</div>
                    <div className="text-sm text-muted-foreground">总测试数</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-500">{selectedReport.summary.passedTests}</div>
                    <div className="text-sm text-muted-foreground">通过测试</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-500">{selectedReport.summary.failedTests}</div>
                    <div className="text-sm text-muted-foreground">失败测试</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-500">{formatDuration(selectedReport.summary.duration)}</div>
                    <div className="text-sm text-muted-foreground">总耗时</div>
                  </div>
                </div>
              </div>

              {/* 性能指标 */}
              {selectedReport.performance && <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    性能指标
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(selectedReport.performance).map(([key, value]) => {
                if (typeof value !== 'object') return null;
                return <div key={key} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{key}</span>
                            <span className="text-sm text-muted-foreground">
                              {typeof value === 'number' ? value.toFixed(2) : JSON.stringify(value)}
                            </span>
                          </div>
                        </div>;
              })}
                  </div>
                </div>}

              {/* 详细测试结果 */}
              {selectedReport.details && <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    详细测试结果
                  </h4>
                  <div className="space-y-3">
                    {selectedReport.details.map((detail, index) => <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(detail.status)}
                            <span className="font-medium">{detail.suite}</span>
                          </div>
                          <Badge variant={detail.status === 'passed' ? 'default' : 'destructive'}>
                            {detail.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">测试数: </span>
                            <span>{detail.tests}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">通过: </span>
                            <span className="text-green-500">{detail.passed}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">失败: </span>
                            <span className="text-red-500">{detail.failed}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">耗时: </span>
                            <span>{formatDuration(detail.duration)}</span>
                          </div>
                        </div>

                        {/* 测试套件进度条 */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">通过率</span>
                            <span className="text-xs font-medium">
                              {detail.tests > 0 ? (detail.passed / detail.tests * 100).toFixed(1) : 0}%
                            </span>
                          </div>
                          <Progress value={detail.tests > 0 ? detail.passed / detail.tests * 100 : 0} className="w-full h-2" />
                        </div>
                      </div>)}
                  </div>
                </div>}
            </div>
          </CardContent>
        </Card>}

      {/* 统计信息 */}
      {reports.length > 0 && <Card>
          <CardHeader>
            <CardTitle>统计信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{reports.length}</div>
                <div className="text-sm text-muted-foreground">总报告数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {reports.filter(r => r.summary.status === 'passed').length}
                </div>
                <div className="text-sm text-muted-foreground">成功报告</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {reports.filter(r => r.summary.status === 'failed').length}
                </div>
                <div className="text-sm text-muted-foreground">失败报告</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {reports.length > 0 ? (reports.reduce((sum, r) => sum + r.summary.totalTests, 0) / reports.length).toFixed(0) : 0}
                </div>
                <div className="text-sm text-muted-foreground">平均测试数</div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
}