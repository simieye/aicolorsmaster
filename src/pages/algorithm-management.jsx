// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Settings, Sliders, Target, Brain, TrendingUp, Eye, Save, RotateCcw, Download, Upload, Play, Pause, BarChart3, Zap, Shield, Users, Clock, CheckCircle, AlertCircle, Info, RefreshCw, Copy, Trash2, Edit, Plus, Minus, GitBranch, Activity, DollarSign, Star, Filter, Search } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
// @ts-ignore;

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function AlgorithmManagementPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [algorithms, setAlgorithms] = useState([]);
  const [currentConfig, setCurrentConfig] = useState({});
  const [previewResults, setPreviewResults] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [configHistory, setConfigHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const currentUser = $w?.auth?.currentUser;
  useEffect(() => {
    loadAlgorithms();
    loadCurrentConfig();
    loadPerformanceData();
    loadConfigHistory();
  }, []);
  const loadAlgorithms = async () => {
    setIsLoading(true);
    try {
      const mockAlgorithms = generateMockAlgorithms();
      setAlgorithms(mockAlgorithms);
    } catch (error) {
      console.error('加载算法失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取算法列表",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const generateMockAlgorithms = () => {
    return [{
      id: 'collaborative_filtering',
      name: '协同过滤算法',
      description: '基于用户行为相似性进行推荐',
      type: 'traditional',
      status: 'active',
      weight: 30,
      performance: {
        accuracy: 85.2,
        coverage: 78.5,
        diversity: 72.3,
        responseTime: 120
      },
      config: {
        similarity: 'cosine',
        neighbors: 50,
        minRating: 3
      }
    }, {
      id: 'content_based',
      name: '内容推荐算法',
      description: '基于产品特征相似性进行推荐',
      type: 'traditional',
      status: 'active',
      weight: 25,
      performance: {
        accuracy: 82.1,
        coverage: 85.7,
        diversity: 68.9,
        responseTime: 95
      },
      config: {
        features: ['category', 'brand', 'price', 'color'],
        threshold: 0.7
      }
    }, {
      id: 'deep_learning',
      name: '深度学习算法',
      description: '基于神经网络的个性化推荐',
      type: 'ai',
      status: 'active',
      weight: 35,
      performance: {
        accuracy: 91.5,
        coverage: 88.2,
        diversity: 79.6,
        responseTime: 200
      },
      config: {
        model: 'transformer',
        layers: 6,
        embedding: 128
      }
    }, {
      id: 'hybrid',
      name: '混合推荐算法',
      description: '结合多种算法的综合推荐',
      type: 'hybrid',
      status: 'active',
      weight: 10,
      performance: {
        accuracy: 88.7,
        coverage: 92.1,
        diversity: 85.3,
        responseTime: 150
      },
      config: {
        methods: ['collaborative', 'content', 'deep'],
        combination: 'weighted'
      }
    }];
  };
  const loadCurrentConfig = async () => {
    const mockConfig = {
      strategy: 'balanced',
      weights: {
        collaborative_filtering: 30,
        content_based: 25,
        deep_learning: 35,
        hybrid: 10
      },
      filters: {
        priceRange: {
          enabled: true,
          min: 0,
          max: 1000
        },
        category: {
          enabled: true,
          categories: ['hair-dye', 'tools', 'accessories']
        },
        brand: {
          enabled: false,
          brands: []
        }
      },
      boost: {
        newProducts: 1.2,
        popularProducts: 1.5,
        highMargin: 1.1
      },
      diversity: {
        enabled: true,
        threshold: 0.3
      },
      freshness: {
        enabled: true,
        decay: 0.95
      }
    };
    setCurrentConfig(mockConfig);
  };
  const loadPerformanceData = async () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      data.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        collaborative_filtering: Math.random() * 20 + 80,
        content_based: Math.random() * 15 + 75,
        deep_learning: Math.random() * 10 + 85,
        hybrid: Math.random() * 12 + 82
      });
    }
    setPerformanceData(data);
  };
  const loadConfigHistory = async () => {
    const history = [{
      id: 'config_001',
      timestamp: '2024-01-20 10:30:00',
      operator: 'admin',
      changes: ['调整深度学习权重从30%到35%', '启用多样性过滤'],
      status: 'active'
    }, {
      id: 'config_002',
      timestamp: '2024-01-19 15:45:00',
      operator: 'admin',
      changes: ['添加新产品加权', '修改价格范围过滤'],
      status: 'reverted'
    }, {
      id: 'config_003',
      timestamp: '2024-01-18 09:20:00',
      operator: 'system',
      changes: ['自动优化算法权重'],
      status: 'auto'
    }];
    setConfigHistory(history);
  };
  const handleWeightChange = (algorithmId, newWeight) => {
    setCurrentConfig(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [algorithmId]: newWeight
      }
    }));
    setHasChanges(true);
    updatePreview();
  };
  const handleStrategyChange = strategy => {
    setCurrentConfig(prev => ({
      ...prev,
      strategy
    }));
    setHasChanges(true);
    updatePreview();
  };
  const handleConfigSave = async () => {
    setIsLoading(true);
    try {
      // 保存配置到数据源
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      toast({
        title: "保存成功",
        description: "算法配置已更新并生效"
      });
      loadConfigHistory();
    } catch (error) {
      toast({
        title: "保存失败",
        description: "无法保存配置，请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleConfigReset = () => {
    loadCurrentConfig();
    setHasChanges(false);
    toast({
      title: "已重置",
      description: "配置已恢复为默认值"
    });
  };
  const updatePreview = () => {
    // 生成预览结果
    const mockPreview = [{
      id: 'preview_1',
      name: 'AI智能染发剂',
      algorithm: 'deep_learning',
      confidence: 0.92,
      reason: '基于您的购买历史和偏好'
    }, {
      id: 'preview_2',
      name: '天然染发套装',
      algorithm: 'collaborative_filtering',
      confidence: 0.87,
      reason: '相似用户喜欢此产品'
    }, {
      id: 'preview_3',
      name: '专业染发工具',
      algorithm: 'content_based',
      confidence: 0.79,
      reason: '与您浏览的产品相似'
    }];
    setPreviewResults(mockPreview);
  };
  const handleAlgorithmToggle = algorithmId => {
    setAlgorithms(prev => prev.map(algo => algo.id === algorithmId ? {
      ...algo,
      status: algo.status === 'active' ? 'inactive' : 'active'
    } : algo));
    setHasChanges(true);
  };
  const handleConfigExport = () => {
    const configStr = JSON.stringify(currentConfig, null, 2);
    const blob = new Blob([configStr], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'algorithm-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleConfigImport = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const config = JSON.parse(e.target.result);
          setCurrentConfig(config);
          setHasChanges(true);
          toast({
            title: "导入成功",
            description: "配置已导入，请检查并保存"
          });
        } catch (error) {
          toast({
            title: "导入失败",
            description: "配置文件格式不正确",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };
  const handleRollback = configId => {
    // 回滚到指定配置
    toast({
      title: "回滚成功",
      description: "配置已回滚到指定版本"
    });
    loadCurrentConfig();
    setHasChanges(false);
  };
  const strategies = [{
    id: 'balanced',
    name: '平衡策略',
    description: '综合考虑准确性和多样性'
  }, {
    id: 'accuracy',
    name: '准确性优先',
    description: '优先推荐最相关的产品'
  }, {
    id: 'diversity',
    name: '多样性优先',
    description: '增加推荐结果的多样性'
  }, {
    id: 'novelty',
    name: '新颖性优先',
    description: '推荐更多新产品和新品牌'
  }, {
    id: 'business',
    name: '商业目标优先',
    description: '优先推荐高利润产品'
  }];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  if (activeTab === 'overview') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="算法管理" showBack={true} />
          
          <div className="pb-20">
            {/* 概览卡片 */}
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Brain className="w-8 h-8 text-blue-500" />
                      <span className="text-sm text-muted-foreground">活跃算法</span>
                    </div>
                    <div className="text-2xl font-bold">{algorithms.filter(a => a.status === 'active').length}</div>
                    <div className="text-xs text-green-600">运行正常</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-8 h-8 text-green-500" />
                      <span className="text-sm text-muted-foreground">平均准确率</span>
                    </div>
                    <div className="text-2xl font-bold">87.3%</div>
                    <div className="text-xs text-green-600">+2.1%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">响应时间</span>
                    </div>
                    <div className="text-2xl font-bold">142ms</div>
                    <div className="text-xs text-green-600">-15ms</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 text-purple-500" />
                      <span className="text-sm text-muted-foreground">日推荐量</span>
                    </div>
                    <div className="text-2xl font-bold">1.2M</div>
                    <div className="text-xs text-green-600">+18%</div>
                  </CardContent>
                </Card>
              </div>

              {/* 算法性能趋势 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>算法性能趋势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="collaborative_filtering" stroke="#3b82f6" name="协同过滤" />
                      <Line type="monotone" dataKey="content_based" stroke="#10b981" name="内容推荐" />
                      <Line type="monotone" dataKey="deep_learning" stroke="#f59e0b" name="深度学习" />
                      <Line type="monotone" dataKey="hybrid" stroke="#ef4444" name="混合算法" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 算法列表 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>算法列表</span>
                    </div>
                    <Button variant="outline" onClick={() => setActiveTab('config')}>
                      <Edit className="w-4 h-4 mr-2" />
                      配置
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {algorithms.map(algorithm => <div key={algorithm.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium">{algorithm.name}</h3>
                            <p className="text-sm text-muted-foreground">{algorithm.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs ${algorithm.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                              {algorithm.status === 'active' ? '运行中' : '已停止'}
                            </span>
                            <Button size="sm" variant="outline" onClick={() => handleAlgorithmToggle(algorithm.id)}>
                              {algorithm.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">准确率</div>
                            <div className="font-medium">{algorithm.performance.accuracy}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">覆盖率</div>
                            <div className="font-medium">{algorithm.performance.coverage}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">多样性</div>
                            <div className="font-medium">{algorithm.performance.diversity}%</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">响应时间</div>
                            <div className="font-medium">{algorithm.performance.responseTime}ms</div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 底部导航 */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
              <div className="grid grid-cols-4 p-2">
                <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-xs mt-1">概览</span>
                </button>
                <button onClick={() => setActiveTab('config')} className={`flex flex-col items-center py-2 ${activeTab === 'config' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Sliders className="w-5 h-5" />
                  <span className="text-xs mt-1">配置</span>
                </button>
                <button onClick={() => setActiveTab('preview')} className={`flex flex-col items-center py-2 ${activeTab === 'preview' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Eye className="w-5 h-5" />
                  <span className="text-xs mt-1">预览</span>
                </button>
                <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Clock className="w-5 h-5" />
                  <span className="text-xs mt-1">历史</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'config') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="算法配置" showBack={true} />
          
          <div className="pb-20 p-4 space-y-6">
            {/* 策略选择 */}
            <Card>
              <CardHeader>
                <CardTitle>推荐策略</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {strategies.map(strategy => <button key={strategy.id} onClick={() => handleStrategyChange(strategy.id)} className={`p-3 border rounded-lg text-left transition-colors ${currentConfig.strategy === strategy.id ? 'border-primary bg-primary/10' : 'border-muted hover:bg-accent'}`}>
                      <div className="font-medium">{strategy.name}</div>
                      <div className="text-sm text-muted-foreground">{strategy.description}</div>
                    </button>)}
                </div>
              </CardContent>
            </Card>

            {/* 权重调整 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sliders className="w-5 h-5" />
                  <span>算法权重调整</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {algorithms.map(algorithm => <div key={algorithm.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{algorithm.name}</div>
                        <div className="text-sm text-muted-foreground">{algorithm.description}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleWeightChange(algorithm.id, Math.max(0, (currentConfig.weights[algorithm.id] || 0) - 5))}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{currentConfig.weights[algorithm.id] || 0}%</span>
                        <Button size="sm" variant="outline" onClick={() => handleWeightChange(algorithm.id, Math.min(100, (currentConfig.weights[algorithm.id] || 0) + 5))}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="range" min="0" max="100" value={currentConfig.weights[algorithm.id] || 0} onChange={e => handleWeightChange(algorithm.id, parseInt(e.target.value))} className="w-full" />
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full transition-all" style={{
                        width: `${currentConfig.weights[algorithm.id] || 0}%`
                      }}></div>
                        </div>
                      </div>
                    </div>
                  </div>)}
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">总权重</span>
                    <span className={`font-medium ${Object.values(currentConfig.weights || {}).reduce((sum, weight) => sum + weight, 0) === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {Object.values(currentConfig.weights || {}).reduce((sum, weight) => sum + weight, 0)}%
                    </span>
                  </div>
                  {Object.values(currentConfig.weights || {}).reduce((sum, weight) => sum + weight, 0) !== 100 && <div className="text-sm text-red-600 mt-1">
                      权重总和必须等于100%
                    </div>}
                </div>
              </CardContent>
            </Card>

            {/* 过滤器配置 */}
            <Card>
              <CardHeader>
                <CardTitle>过滤器配置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-medium">价格范围过滤</label>
                    <Button variant={currentConfig.filters?.priceRange?.enabled ? "default" : "outline"} size="sm" onClick={() => setCurrentConfig(prev => ({
                    ...prev,
                    filters: {
                      ...prev.filters,
                      priceRange: {
                        ...prev.filters.priceRange,
                        enabled: !prev.filters.priceRange?.enabled
                      }
                    }
                  }))}>
                      {currentConfig.filters?.priceRange?.enabled ? '已启用' : '已禁用'}
                    </Button>
                  </div>
                  {currentConfig.filters?.priceRange?.enabled && <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-1">最低价格</label>
                        <input type="number" value={currentConfig.filters.priceRange.min} onChange={e => setCurrentConfig(prev => ({
                      ...prev,
                      filters: {
                        ...prev.filters,
                        priceRange: {
                          ...prev.filters.priceRange,
                          min: parseInt(e.target.value)
                        }
                      }
                    }))} className="w-full px-3 py-2 bg-background border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-1">最高价格</label>
                        <input type="number" value={currentConfig.filters.priceRange.max} onChange={e => setCurrentConfig(prev => ({
                      ...prev,
                      filters: {
                        ...prev.filters,
                        priceRange: {
                          ...prev.filters.priceRange,
                          max: parseInt(e.target.value)
                        }
                      }
                    }))} className="w-full px-3 py-2 bg-background border rounded-lg" />
                      </div>
                    </div>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-medium">多样性过滤</label>
                    <Button variant={currentConfig.diversity?.enabled ? "default" : "outline"} size="sm" onClick={() => setCurrentConfig(prev => ({
                    ...prev,
                    diversity: {
                      ...prev.diversity,
                      enabled: !prev.diversity?.enabled
                    }
                  }))}>
                      {currentConfig.diversity?.enabled ? '已启用' : '已禁用'}
                    </Button>
                  </div>
                  {currentConfig.diversity?.enabled && <div className="mt-2">
                      <label className="block text-sm text-muted-foreground mb-1">多样性阈值</label>
                      <input type="range" min="0" max="1" step="0.1" value={currentConfig.diversity.threshold} onChange={e => setCurrentConfig(prev => ({
                    ...prev,
                    diversity: {
                      ...prev.diversity,
                      threshold: parseFloat(e.target.value)
                    }
                  }))} className="w-full" />
                      <div className="text-sm text-muted-foreground mt-1">{currentConfig.diversity.threshold}</div>
                    </div>}
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex space-x-4">
              <Button onClick={handleConfigSave} disabled={isLoading || !hasChanges} className="flex-1">
                {isLoading ? '保存中...' : <><Save className="w-4 h-4 mr-2" />保存配置</>}
              </Button>
              <Button variant="outline" onClick={handleConfigReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
              <Button variant="outline" onClick={handleConfigExport}>
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('config-import').click()}>
                <Upload className="w-4 h-4 mr-2" />
                导入
              </Button>
              <input id="config-import" type="file" accept=".json" onChange={handleConfigImport} className="hidden" />
            </div>
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-4 p-2">
              <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs mt-1">概览</span>
              </button>
              <button onClick={() => setActiveTab('config')} className={`flex flex-col items-center py-2 ${activeTab === 'config' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Sliders className="w-5 h-5" />
                <span className="text-xs mt-1">配置</span>
              </button>
              <button onClick={() => setActiveTab('preview')} className={`flex flex-col items-center py-2 ${activeTab === 'preview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Eye className="w-5 h-5" />
                <span className="text-xs mt-1">预览</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Clock className="w-5 h-5" />
                <span className="text-xs mt-1">历史</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'preview') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="效果预览" showBack={true} />
          
          <div className="pb-20 p-4 space-y-6">
            {/* 预览设置 */}
            <Card>
              <CardHeader>
                <CardTitle>预览设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">用户类型</label>
                    <select className="w-full px-3 py-2 bg-background border rounded-lg">
                      <option value="new">新用户</option>
                      <option value="active">活跃用户</option>
                      <option value="vip">VIP用户</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">产品类别</label>
                    <select className="w-full px-3 py-2 bg-background border rounded-lg">
                      <option value="all">全部类别</option>
                      <option value="hair-dye">染发剂</option>
                      <option value="tools">染发工具</option>
                    </select>
                  </div>
                </div>
                <Button onClick={updatePreview} className="w-full mt-4">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新预览
                </Button>
              </CardContent>
            </Card>

            {/* 预览结果 */}
            <Card>
              <CardHeader>
                <CardTitle>推荐结果预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {previewResults.map((item, index) => <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-muted-foreground">算法: {item.algorithm}</span>
                            <span className="text-sm text-muted-foreground">置信度: {(item.confidence * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <Brain className="w-8 h-8 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 算法贡献度 */}
            <Card>
              <CardHeader>
                <CardTitle>算法贡献度分析</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={algorithms.map(algo => ({
                    name: algo.name,
                    value: currentConfig.weights[algo.id] || 0
                  }))} cx="50%" cy="50%" labelLine={false} label={({
                    name,
                    percent
                  }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {algorithms.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-4 p-2">
              <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs mt-1">概览</span>
              </button>
              <button onClick={() => setActiveTab('config')} className={`flex flex-col items-center py-2 ${activeTab === 'config' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Sliders className="w-5 h-5" />
                <span className="text-xs mt-1">配置</span>
              </button>
              <button onClick={() => setActiveTab('preview')} className={`flex flex-col items-center py-2 ${activeTab === 'preview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Eye className="w-5 h-5" />
                <span className="text-xs mt-1">预览</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Clock className="w-5 h-5" />
                <span className="text-xs mt-1">历史</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'history') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="配置历史" showBack={true} />
          
          <div className="pb-20 p-4 space-y-4">
            {configHistory.map(config => <Card key={config.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{config.timestamp}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${config.status === 'active' ? 'bg-green-100 text-green-600' : config.status === 'reverted' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {config.status === 'active' ? '当前版本' : config.status === 'reverted' ? '已回滚' : '自动优化'}
                      </span>
                      {config.status !== 'active' && <Button size="sm" variant="outline" onClick={() => handleRollback(config.id)}>
                        <RotateCcw className="w-4 h-4 mr-1" />
                        回滚
                      </Button>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">操作者: {config.operator}</div>
                    <div className="text-sm">
                      <div className="font-medium mb-1">变更内容:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {config.changes.map((change, index) => <li key={index} className="text-muted-foreground">{change}</li>)}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-4 p-2">
              <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs mt-1">概览</span>
              </button>
              <button onClick={() => setActiveTab('config')} className={`flex flex-col items-center py-2 ${activeTab === 'config' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Sliders className="w-5 h-5" />
                <span className="text-xs mt-1">配置</span>
              </button>
              <button onClick={() => setActiveTab('preview')} className={`flex flex-col items-center py-2 ${activeTab === 'preview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Eye className="w-5 h-5" />
                <span className="text-xs mt-1">预览</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center py-2 ${activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Clock className="w-5 h-5" />
                <span className="text-xs mt-1">历史</span>
              </button>
            </div>
          </div>
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