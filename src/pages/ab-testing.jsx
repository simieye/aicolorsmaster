// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Play, Pause, Square, BarChart3, Users, Target, TrendingUp, Settings, Eye, Edit, Trash2, Copy, Download, Filter, Calendar, Clock, CheckCircle, AlertCircle, XCircle, Activity, DollarSign, MousePointer, Star, Split, GitBranch } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
// @ts-ignore;

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function ABTestingPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeView, setActiveView] = useState('list');
  const [tests, setTests] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const currentUser = $w?.auth?.currentUser;
  useEffect(() => {
    loadTests();
  }, []);
  const loadTests = async () => {
    setIsLoading(true);
    try {
      // 模拟从数据源获取A/B测试列表
      const mockTests = generateMockTests();
      setTests(mockTests);
    } catch (error) {
      console.error('加载A/B测试失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取A/B测试列表",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const generateMockTests = () => {
    return [{
      id: 'TEST001',
      name: '推荐算法对比测试',
      description: '对比AI智能推荐算法与传统推荐算法的效果',
      status: 'running',
      createdAt: '2024-01-15',
      startDate: '2024-01-16',
      endDate: '2024-02-15',
      trafficAllocation: {
        control: 50,
        variant: 50
      },
      groups: [{
        id: 'control',
        name: '对照组',
        algorithm: 'traditional',
        users: 1250
      }, {
        id: 'variant',
        name: '实验组',
        algorithm: 'ai_smart',
        users: 1275
      }],
      metrics: {
        clickRate: {
          control: 8.5,
          variant: 12.3,
          improvement: 44.7
        },
        conversionRate: {
          control: 2.8,
          variant: 4.1,
          improvement: 46.4
        },
        satisfaction: {
          control: 82.5,
          variant: 89.2,
          improvement: 8.1
        },
        revenue: {
          control: 45678,
          variant: 67890,
          improvement: 48.5
        }
      },
      confidence: 95.2,
      significance: true
    }, {
      id: 'TEST002',
      name: '价格敏感度测试',
      description: '测试不同价格区间对推荐效果的影响',
      status: 'completed',
      createdAt: '2024-01-10',
      startDate: '2024-01-11',
      endDate: '2024-01-25',
      trafficAllocation: {
        control: 33,
        variant1: 33,
        variant2: 34
      },
      groups: [{
        id: 'control',
        name: '低价组',
        priceRange: '0-100',
        users: 890
      }, {
        id: 'variant1',
        name: '中价组',
        priceRange: '100-500',
        users: 912
      }, {
        id: 'variant2',
        name: '高价组',
        priceRange: '500+',
        users: 934
      }],
      metrics: {
        clickRate: {
          control: 15.2,
          variant1: 12.8,
          variant2: 8.9
        },
        conversionRate: {
          control: 4.5,
          variant1: 3.9,
          variant2: 2.1
        },
        satisfaction: {
          control: 88.5,
          variant1: 85.2,
          variant2: 79.8
        }
      },
      confidence: 98.7,
      significance: true
    }, {
      id: 'TEST003',
      name: '界面布局测试',
      description: '测试不同推荐界面布局对用户行为的影响',
      status: 'draft',
      createdAt: '2024-01-20',
      startDate: null,
      endDate: null,
      trafficAllocation: {
        control: 50,
        variant: 50
      },
      groups: [{
        id: 'control',
        name: '网格布局',
        layout: 'grid',
        users: 0
      }, {
        id: 'variant',
        name: '列表布局',
        layout: 'list',
        users: 0
      }],
      metrics: {},
      confidence: 0,
      significance: false
    }];
  };
  const handleCreateTest = () => {
    setShowCreateForm(true);
    setActiveView('create');
  };
  const handleStartTest = async testId => {
    try {
      // 调用API启动测试
      setTests(prev => prev.map(test => test.id === testId ? {
        ...test,
        status: 'running',
        startDate: new Date().toISOString().split('T')[0]
      } : test));
      toast({
        title: "测试已启动",
        description: "A/B测试已开始运行"
      });
    } catch (error) {
      toast({
        title: "启动失败",
        description: "无法启动测试",
        variant: "destructive"
      });
    }
  };
  const handlePauseTest = async testId => {
    try {
      setTests(prev => prev.map(test => test.id === testId ? {
        ...test,
        status: 'paused'
      } : test));
      toast({
        title: "测试已暂停",
        description: "A/B测试已暂停运行"
      });
    } catch (error) {
      toast({
        title: "暂停失败",
        description: "无法暂停测试",
        variant: "destructive"
      });
    }
  };
  const handleStopTest = async testId => {
    try {
      setTests(prev => prev.map(test => test.id === testId ? {
        ...test,
        status: 'completed',
        endDate: new Date().toISOString().split('T')[0]
      } : test));
      toast({
        title: "测试已停止",
        description: "A/B测试已停止运行"
      });
    } catch (error) {
      toast({
        title: "停止失败",
        description: "无法停止测试",
        variant: "destructive"
      });
    }
  };
  const handleViewResults = test => {
    setCurrentTest(test);
    generateTestResults(test);
    setActiveView('results');
  };
  const generateTestResults = test => {
    // 生成模拟的测试结果数据
    const dailyData = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      dailyData.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        controlUsers: Math.floor(Math.random() * 100) + 50,
        variantUsers: Math.floor(Math.random() * 100) + 50,
        controlClicks: Math.floor(Math.random() * 20) + 5,
        variantClicks: Math.floor(Math.random() * 30) + 10,
        controlConversions: Math.floor(Math.random() * 5) + 1,
        variantConversions: Math.floor(Math.random() * 8) + 2
      });
    }
    setTestResults({
      dailyData,
      summary: test.metrics
    });
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'paused':
        return '已暂停';
      case 'completed':
        return '已完成';
      case 'draft':
        return '草稿';
      default:
        return '未知';
    }
  };
  const filteredTests = tests.filter(test => filterStatus === 'all' || test.status === filterStatus);
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  if (activeView === 'list') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="A/B测试管理" showBack={true} />
          
          <div className="pb-20">
            {/* 操作栏 */}
            <div className="bg-card border-b p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <Button onClick={handleCreateTest}>
                    <Plus className="w-4 h-4 mr-2" />
                    创建测试
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">全部状态</option>
                      <option value="running">运行中</option>
                      <option value="paused">已暂停</option>
                      <option value="completed">已完成</option>
                      <option value="draft">草稿</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    导出报告
                  </Button>
                </div>
              </div>
            </div>

            {/* 测试列表 */}
            <div className="p-4 space-y-4">
              {isLoading ? <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2">加载中...</span>
                </div> : filteredTests.map(test => <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(test.status)}
                            <span className="text-sm text-muted-foreground">{getStatusText(test.status)}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{test.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>创建: {test.createdAt}</span>
                          </div>
                          {test.startDate && <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>开始: {test.startDate}</span>
                            </div>}
                          {test.endDate && <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>结束: {test.endDate}</span>
                            </div>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {test.status === 'draft' && <Button size="sm" onClick={() => handleStartTest(test.id)}>
                            <Play className="w-4 h-4 mr-1" />
                            启动
                          </Button>}
                        {test.status === 'running' && <>
                            <Button size="sm" variant="outline" onClick={() => handlePauseTest(test.id)}>
                              <Pause className="w-4 h-4 mr-1" />
                              暂停
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleStopTest(test.id)}>
                              <Square className="w-4 h-4 mr-1" />
                              停止
                            </Button>
                          </>}
                        {test.status === 'paused' && <>
                            <Button size="sm" onClick={() => handleStartTest(test.id)}>
                              <Play className="w-4 h-4 mr-1" />
                              继续
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleStopTest(test.id)}>
                              <Square className="w-4 h-4 mr-1" />
                              停止
                            </Button>
                          </>}
                        <Button size="sm" variant="outline" onClick={() => handleViewResults(test)}>
                            <BarChart3 className="w-4 h-4 mr-1" />
                            结果
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* 流量分配 */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Split className="w-4 h-4" />
                          <span>流量分配</span>
                        </h4>
                        <div className="space-y-2">
                          {test.groups.map(group => <div key={group.id} className="flex justify-between text-sm">
                              <span>{group.name}</span>
                              <span className="font-medium">{test.trafficAllocation[group.id]}%</span>
                            </div>)}
                        </div>
                      </div>

                      {/* 测试指标 */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>核心指标</span>
                        </h4>
                        {test.metrics.clickRate && <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>点击率</span>
                              <span className="font-medium">{test.metrics.clickRate.variant}%</span>
                            </div>
                            {test.metrics.clickRate.improvement && <div className="text-xs text-green-600">
                                +{test.metrics.clickRate.improvement}% 提升
                              </div>}
                          </div>}
                      </div>

                      {/* 统计显著性 */}
                      <div>
                        <h4 className="font-medium mb-2 flex items-center space-x-2">
                          <Activity className="w-4 h-4" />
                          <span>统计显著性</span>
                        </h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>置信度</span>
                            <span className="font-medium">{test.confidence}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {test.significance ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-red-500" />}
                            <span className="text-xs">{test.significance ? '显著' : '不显著'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  if (activeView === 'create') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="创建A/B测试" showBack={true} />
          
          <div className="pb-20 p-4">
            <Card>
              <CardHeader>
                <CardTitle>创建新的A/B测试</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">测试名称</label>
                  <input type="text" placeholder="输入测试名称" className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">测试描述</label>
                  <textarea placeholder="详细描述测试目标和假设" rows={3} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">测试类型</label>
                  <select className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="algorithm">算法对比</option>
                    <option value="ui">界面优化</option>
                    <option value="content">内容策略</option>
                    <option value="pricing">价格策略</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">流量分配</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">对照组 (%)</label>
                      <input type="number" min="0" max="100" defaultValue="50" className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">实验组 (%)</label>
                      <input type="number" min="0" max="100" defaultValue="50" className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">测试指标</label>
                  <div className="space-y-2">
                    {['点击率', '转化率', '用户满意度', '收入增长'].map(metric => <label key={metric} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={metric === '点击率' || metric === '转化率'} className="rounded" />
                        <span className="text-sm">{metric}</span>
                      </label>)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">测试时长</label>
                  <select className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="7">7天</option>
                    <option value="14">14天</option>
                    <option value="30">30天</option>
                    <option value="60">60天</option>
                  </select>
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1">创建测试</Button>
                  <Button variant="outline" onClick={() => setActiveView('list')}>取消</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  if (activeView === 'results' && currentTest && testResults) {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title={`${currentTest.name} - 测试结果`} showBack={true} />
          
          <div className="pb-20 p-4 space-y-6">
            {/* 测试概览 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>测试概览</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentTest.groups.reduce((sum, group) => sum + group.users, 0).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">总用户数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentTest.metrics.clickRate?.variant || 0}%</div>
                    <div className="text-sm text-muted-foreground">实验组点击率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{currentTest.metrics.conversionRate?.variant || 0}%</div>
                    <div className="text-sm text-muted-foreground">实验组转化率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{currentTest.confidence}%</div>
                    <div className="text-sm text-muted-foreground">统计置信度</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 趋势图表 */}
            <Card>
              <CardHeader>
                <CardTitle>每日趋势对比</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={testResults.dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="controlClicks" stroke="#3b82f6" name="对照组点击" />
                    <Line type="monotone" dataKey="variantClicks" stroke="#10b981" name="实验组点击" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 指标对比 */}
            <Card>
              <CardHeader>
                <CardTitle>核心指标对比</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(testResults.summary).map(([metric, data]) => {
                  if (typeof data !== 'object' || !data.control) return null;
                  return <div key={metric} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{metric === 'clickRate' ? '点击率' : metric === 'conversionRate' ? '转化率' : metric === 'satisfaction' ? '满意度' : '收入'}</h4>
                          {data.improvement && <div className="text-green-600 text-sm font-medium">
                              +{data.improvement}% 提升
                            </div>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">对照组</div>
                            <div className="text-xl font-bold">{data.control}{metric === 'satisfaction' ? '%' : metric === 'revenue' ? '' : '%'}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">实验组</div>
                            <div className="text-xl font-bold text-green-600">{data.variant}{metric === 'satisfaction' ? '%' : metric === 'revenue' ? '' : '%'}</div>
                          </div>
                        </div>
                      </div>;
                })}
                </div>
              </CardContent>
            </Card>

            {/* 用户分布 */}
            <Card>
              <CardHeader>
                <CardTitle>用户分布</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={currentTest.groups.map(group => ({
                    name: group.name,
                    value: group.users
                  }))} cx="50%" cy="50%" labelLine={false} label={({
                    name,
                    percent
                  }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {currentTest.groups.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex space-x-4">
              <Button onClick={() => setActiveView('list')}>
                返回列表
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出报告
              </Button>
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                复制测试
              </Button>
            </div>
          </div>

          <TabBar />
        </div>
      </ErrorBoundary>;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p>页面加载中...</p>
        </div>
      </div>
    </ErrorBoundary>;
}