// @ts-ignore;
import React, { useState, useCallback, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Alert, AlertDescription, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { GitBranch, Github, Gitlab, Bitbucket, Play, Settings, CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw, Terminal, FileText } from 'lucide-react';

export function CICDIntegration({
  config = {},
  onConfigChange,
  status = 'idle',
  onTrigger
}) {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('configuration');

  // 使用 useMemo 优化CI/CD提供商配置
  const providers = useMemo(() => [{
    value: 'github',
    label: 'GitHub',
    icon: <Github className="w-4 h-4" />
  }, {
    value: 'gitlab',
    label: 'GitLab',
    icon: <Gitlab className="w-4 h-4" />
  }, {
    value: 'bitbucket',
    label: 'Bitbucket',
    icon: <Bitbucket className="w-4 h-4" />
  }], []);

  // 使用 useMemo 优化当前提供商配置
  const currentProvider = useMemo(() => {
    return providers.find(p => p.value === config.provider) || providers[0];
  }, [config.provider, providers]);

  // 获取状态徽章
  const getStatusBadge = useCallback(status => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">成功</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      case 'running':
        return <Badge variant="secondary">运行中</Badge>;
      case 'error':
        return <Badge variant="destructive">错误</Badge>;
      default:
        return <Badge variant="outline">未配置</Badge>;
    }
  }, []);

  // 获取状态图标
  const getStatusIcon = useCallback(status => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  }, []);

  // 触发CI/CD流程
  const triggerCICD = useCallback(async () => {
    if (onTrigger) {
      // 添加日志
      const startLog = {
        timestamp: Date.now(),
        message: `开始触发 ${currentProvider.label} CI/CD 流程...`,
        type: 'info'
      };
      setLogs([startLog]);
      try {
        await onTrigger();
        const successLog = {
          timestamp: Date.now(),
          message: 'CI/CD 流程触发成功',
          type: 'success'
        };
        setLogs(prev => [...prev, successLog]);
      } catch (error) {
        const errorLog = {
          timestamp: Date.now(),
          message: `CI/CD 触发失败: ${error.message}`,
          type: 'error'
        };
        setLogs(prev => [...prev, errorLog]);
      }
    }
  }, [onTrigger, currentProvider]);

  // 测试连接
  const testConnection = useCallback(async () => {
    setIsConfiguring(true);
    try {
      // 模拟连接测试
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('连接测试成功！');
    } catch (error) {
      alert('连接测试失败：' + error.message);
    } finally {
      setIsConfiguring(false);
    }
  }, []);

  // 保存配置
  const saveConfiguration = useCallback(() => {
    setIsConfiguring(true);
    setTimeout(() => {
      setIsConfiguring(false);
      alert('配置已保存！');
    }, 1000);
  }, []);
  return <div className="space-y-6">
      {/* CI/CD 状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              CI/CD 集成
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(status)}
              <Button onClick={triggerCICD} disabled={status === 'running'}>
                {status === 'running' ? <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    运行中...
                  </> : <>
                    <Play className="w-4 h-4 mr-2" />
                    触发构建
                  </>}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            {currentProvider.icon}
            <div className="flex-1">
              <h3 className="font-medium">{currentProvider.label}</h3>
              <p className="text-sm text-muted-foreground">
                {config.repository || '未配置仓库'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(status)}
              <span className="text-sm">{status}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 配置和日志 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuration">配置</TabsTrigger>
          <TabsTrigger value="triggers">触发器</TabsTrigger>
          <TabsTrigger value="logs">日志</TabsTrigger>
        </TabsList>

        {/* 配置 */}
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                CI/CD 配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="provider">代码托管平台</Label>
                    <Select value={config.provider || 'github'} onValueChange={value => onConfigChange && onConfigChange({
                    ...config,
                    provider: value
                  })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map(provider => <SelectItem key={provider.value} value={provider.value}>
                            <div className="flex items-center gap-2">
                              {provider.icon}
                              {provider.label}
                            </div>
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="repository">仓库地址</Label>
                    <Input id="repository" placeholder="owner/repository" value={config.repository || ''} onChange={e => onConfigChange && onConfigChange({
                    ...config,
                    repository: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="branch">主分支</Label>
                    <Input id="branch" placeholder="main" value={config.branch || 'main'} onChange={e => onConfigChange && onConfigChange({
                    ...config,
                    branch: e.target.value
                  })} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testCommand">测试命令</Label>
                    <Input id="testCommand" placeholder="npm run test:ci" value={config.testCommand || 'npm run test:ci'} onChange={e => onConfigChange && onConfigChange({
                    ...config,
                    testCommand: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="reportPath">报告路径</Label>
                    <Input id="reportPath" placeholder="./test-reports" value={config.reportPath || './test-reports'} onChange={e => onConfigChange && onConfigChange({
                    ...config,
                    reportPath: e.target.value
                  })} />
                  </div>
                  <div>
                    <Label htmlFor="buildCommand">构建命令</Label>
                    <Input id="buildCommand" placeholder="npm run build" value={config.buildCommand || 'npm run build'} onChange={e => onConfigChange && onConfigChange({
                    ...config,
                    buildCommand: e.target.value
                  })} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button onClick={testConnection} disabled={isConfiguring}>
                  {isConfiguring ? <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      测试中...
                    </> : <>
                      <Terminal className="w-4 h-4 mr-2" />
                      测试连接
                    </>}
                </Button>
                <Button variant="outline" onClick={saveConfiguration} disabled={isConfiguring}>
                  <FileText className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 触发器 */}
        <TabsContent value="triggers">
          <Card>
            <CardHeader>
              <CardTitle>自动触发器</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="triggerOnPush">代码推送时触发</Label>
                  <p className="text-sm text-muted-foreground">当代码推送到主分支时自动触发CI/CD</p>
                </div>
                <Switch id="triggerOnPush" checked={config.triggerOnPush || false} onCheckedChange={checked => onConfigChange && onConfigChange({
                ...config,
                triggerOnPush: checked
              })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="triggerOnPR">创建PR时触发</Label>
                  <p className="text-sm text-muted-foreground">当创建或更新Pull Request时自动触发</p>
                </div>
                <Switch id="triggerOnPR" checked={config.triggerOnPR || false} onCheckedChange={checked => onConfigChange && onConfigChange({
                ...config,
                triggerOnPR: checked
              })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="triggerOnSchedule">定时触发</Label>
                  <p className="text-sm text-muted-foreground">按计划定时执行CI/CD流程</p>
                </div>
                <Switch id="triggerOnSchedule" checked={config.triggerOnSchedule || false} onCheckedChange={checked => onConfigChange && onConfigChange({
                ...config,
                triggerOnSchedule: checked
              })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 日志 */}
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                执行日志
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.length === 0 ? <div className="text-center py-8 text-muted-foreground">
                    <Terminal className="w-12 h-12 mx-auto mb-4" />
                    <p>暂无日志记录</p>
                  </div> : logs.map((log, index) => <div key={index} className="flex items-start gap-2 p-2 border rounded">
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${log.type === 'success' ? 'bg-green-500' : log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
                    <span className="text-sm">{log.message}</span>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}
export default CICDIntegration;