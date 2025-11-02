// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Alert, AlertDescription, Switch } from '@/components/ui';
// @ts-ignore;
import { TestTube, Play, Pause, Settings, Clock, CheckCircle, XCircle, AlertTriangle, RotateCcw } from 'lucide-react';

export function TestSuiteManager({
  config,
  onConfigChange,
  testResults,
  isRunning
}) {
  const [expandedSuite, setExpandedSuite] = useState(null);
  const testSuiteDefinitions = {
    unit: {
      name: '单元测试',
      description: '测试单个组件和函数的功能',
      icon: <TestTube className="w-4 h-4" />,
      tests: ['Component Tests', 'Utility Functions', 'Hooks Tests', 'Service Tests'],
      estimatedTime: '2-5分钟',
      coverage: '85-95%'
    },
    integration: {
      name: '集成测试',
      description: '测试组件间的交互和数据流',
      icon: <Settings className="w-4 h-4" />,
      tests: ['API Integration', 'Database Integration', 'Component Integration', 'State Management'],
      estimatedTime: '5-10分钟',
      coverage: '70-85%'
    },
    e2e: {
      name: '端到端测试',
      description: '模拟用户完整操作流程',
      icon: <Play className="w-4 h-4" />,
      tests: ['User Registration', 'Product Purchase', 'Order Management', 'Admin Operations'],
      estimatedTime: '10-20分钟',
      coverage: '60-75%'
    },
    performance: {
      name: '性能测试',
      description: '测试应用性能和响应时间',
      icon: <Clock className="w-4 h-4" />,
      tests: ['Load Time', 'Render Performance', 'Memory Usage', 'API Response Time'],
      estimatedTime: '3-8分钟',
      coverage: 'N/A'
    }
  };
  const toggleTestSuite = suite => {
    const newSuites = config.testSuites.includes(suite) ? config.testSuites.filter(s => s !== suite) : [...config.testSuites, suite];
    onConfigChange({
      ...config,
      testSuites: newSuites
    });
  };
  const getSuiteStatus = suite => {
    const latestResult = testResults.filter(r => r.config && r.config.testSuites.includes(suite)).sort((a, b) => b.endTime - a.endTime)[0];
    if (!latestResult) return 'none';
    if (latestResult.status === 'passed') return 'passed';
    if (latestResult.status === 'failed') return 'failed';
    return 'running';
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <Pause className="w-4 h-4 text-blue-500 animate-pulse" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };
  const getLatestResult = suite => {
    return testResults.filter(r => r.config && r.config.testSuites.includes(suite)).sort((a, b) => b.endTime - a.endTime)[0];
  };
  return <div className="space-y-6">
      {/* 测试配置 */}
      <Card>
        <CardHeader>
          <CardTitle>测试配置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">环境</label>
              <select className="w-full p-2 border rounded-md" value={config.environment} onChange={e => onConfigChange({
              ...config,
              environment: e.target.value
            })} disabled={isRunning}>
                <option value="development">开发环境</option>
                <option value="staging">测试环境</option>
                <option value="production">生产环境</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch checked={config.parallel} onCheckedChange={checked => onConfigChange({
              ...config,
              parallel: checked
            })} disabled={isRunning} />
              <label className="text-sm font-medium">并行执行</label>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">最大并发数</label>
              <input type="number" className="w-full p-2 border rounded-md" value={config.maxConcurrency} onChange={e => onConfigChange({
              ...config,
              maxConcurrency: parseInt(e.target.value)
            })} disabled={isRunning} min="1" max="8" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">超时时间(ms)</label>
              <input type="number" className="w-full p-2 border rounded-md" value={config.timeout} onChange={e => onConfigChange({
              ...config,
              timeout: parseInt(e.target.value)
            })} disabled={isRunning} min="5000" step="5000" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 测试套件列表 */}
      <div className="space-y-4">
        {Object.entries(testSuiteDefinitions).map(([key, suite]) => {
        const status = getSuiteStatus(key);
        const latestResult = getLatestResult(key);
        const isSelected = config.testSuites.includes(key);
        return <Card key={key} className={`transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {suite.icon}
                      <h3 className="font-semibold">{suite.name}</h3>
                    </div>
                    <Badge variant="outline">{key}</Badge>
                    {getStatusIcon(status)}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch checked={isSelected} onCheckedChange={() => toggleTestSuite(key)} disabled={isRunning} />
                    <Button variant="ghost" size="sm" onClick={() => setExpandedSuite(expandedSuite === key ? null : key)}>
                      {expandedSuite === key ? '收起' : '展开'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{suite.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">预计时间</p>
                    <p className="text-sm font-medium">{suite.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">覆盖率</p>
                    <p className="text-sm font-medium">{suite.coverage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">测试数量</p>
                    <p className="text-sm font-medium">{suite.tests.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">状态</p>
                    <Badge variant={status === 'passed' ? 'default' : status === 'failed' ? 'destructive' : 'outline'}>
                      {status}
                    </Badge>
                  </div>
                </div>

                {latestResult && <div className="mb-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">最近执行结果</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(latestResult.endTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">耗时: </span>
                        <span>{latestResult.duration}ms</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">状态: </span>
                        <span>{latestResult.status}</span>
                      </div>
                      {latestResult.results && latestResult.results[0] && <>
                        <div>
                          <span className="text-muted-foreground">通过: </span>
                          <span>{latestResult.results[0].passed || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">失败: </span>
                          <span>{latestResult.results[0].failed || 0}</span>
                        </div>
                      </>}
                    </div>
                  </div>}

                {expandedSuite === key && <div className="space-y-3">
                    <h4 className="text-sm font-medium">包含的测试:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suite.tests.map((test, index) => <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-sm">{test}</span>
                        </div>)}
                    </div>
                  </div>}
              </CardContent>
            </Card>;
      })}
      </div>

      {/* 测试统计 */}
      {testResults.length > 0 && <Card>
          <CardHeader>
            <CardTitle>测试统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{testResults.length}</div>
                <div className="text-xs text-muted-foreground">总测试次数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {testResults.filter(r => r.status === 'passed').length}
                </div>
                <div className="text-xs text-muted-foreground">成功次数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {testResults.filter(r => r.status === 'failed').length}
                </div>
                <div className="text-xs text-muted-foreground">失败次数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {testResults.length > 0 ? (testResults.reduce((sum, r) => sum + r.duration, 0) / testResults.length).toFixed(0) : 0}ms
                </div>
                <div className="text-xs text-muted-foreground">平均耗时</div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
}