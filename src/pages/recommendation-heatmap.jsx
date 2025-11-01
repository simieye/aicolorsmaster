// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Activity, MousePointer, TrendingUp, Users, Target, Calendar, Filter, Download, RefreshCw, Eye, Clock, Zap, Map, Grid, Thermometer, Heatmap, Settings, ChevronDown, ChevronUp, Maximize2, Info, AlertCircle } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, ScatterChart, Scatter } from 'recharts';
// @ts-ignore;

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function RecommendationHeatmapPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [heatmapData, setHeatmapData] = useState({
    clickHeatmap: [],
    conversionHeatmap: [],
    behaviorHeatmap: [],
    timeHeatmap: [],
    categoryHeatmap: [],
    algorithmHeatmap: []
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHeatmap, setSelectedHeatmap] = useState(null);
  const currentUser = $w?.auth?.currentUser;
  useEffect(() => {
    loadHeatmapData();
  }, [selectedTimeRange, selectedCategory]);
  const loadHeatmapData = async () => {
    setIsLoading(true);
    try {
      // 模拟从数据源获取热力图数据
      const mockData = generateMockHeatmapData();
      setHeatmapData(mockData);
    } catch (error) {
      console.error('加载热力图数据失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取热力图数据",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const generateMockHeatmapData = () => {
    // 生成点击热力图数据
    const clickHeatmap = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 8; j++) {
        clickHeatmap.push({
          x: i,
          y: j,
          value: Math.floor(Math.random() * 100) + 20,
          label: `位置${i}-${j}`,
          clicks: Math.floor(Math.random() * 500) + 100,
          impressions: Math.floor(Math.random() * 2000) + 500
        });
      }
    }

    // 生成转化热力图数据
    const conversionHeatmap = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 8; j++) {
        conversionHeatmap.push({
          x: i,
          y: j,
          value: Math.random() * 15 + 2,
          label: `位置${i}-${j}`,
          conversions: Math.floor(Math.random() * 50) + 5,
          clicks: Math.floor(Math.random() * 300) + 100
        });
      }
    }

    // 生成用户行为热力图数据
    const behaviorHeatmap = [];
    const behaviors = ['点击', '悬停', '滚动', '停留', '分享', '收藏'];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 7; j++) {
        behaviorHeatmap.push({
          hour: i,
          day: j,
          value: Math.floor(Math.random() * 100) + 10,
          behavior: behaviors[Math.floor(Math.random() * behaviors.length)],
          users: Math.floor(Math.random() * 200) + 50
        });
      }
    }

    // 生成时间热力图数据
    const timeHeatmap = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      timeHeatmap.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        hour: Math.floor(Math.random() * 24),
        value: Math.floor(Math.random() * 100) + 20,
        recommendations: Math.floor(Math.random() * 1000) + 200,
        clicks: Math.floor(Math.random() * 200) + 50
      });
    }

    // 生成类别热力图数据
    const categoryHeatmap = [{
      category: '染发剂',
      value: 85,
      clicks: 2340,
      conversions: 156,
      revenue: 45678
    }, {
      category: '染发工具',
      value: 72,
      clicks: 1890,
      conversions: 98,
      revenue: 23456
    }, {
      category: '护理产品',
      value: 68,
      clicks: 1567,
      conversions: 89,
      revenue: 34567
    }, {
      category: '配件用品',
      value: 45,
      clicks: 890,
      conversions: 34,
      revenue: 12345
    }, {
      category: '套装组合',
      value: 92,
      clicks: 3456,
      conversions: 234,
      revenue: 67890
    }];

    // 生成算法热力图数据
    const algorithmHeatmap = [{
      algorithm: '协同过滤',
      value: 78,
      accuracy: 85.2,
      coverage: 78.5,
      responseTime: 120
    }, {
      algorithm: '内容推荐',
      value: 72,
      accuracy: 82.1,
      coverage: 85.7,
      responseTime: 95
    }, {
      algorithm: '深度学习',
      value: 91,
      accuracy: 91.5,
      coverage: 88.2,
      responseTime: 200
    }, {
      algorithm: '混合算法',
      value: 85,
      accuracy: 88.7,
      coverage: 92.1,
      responseTime: 150
    }];
    return {
      clickHeatmap,
      conversionHeatmap,
      behaviorHeatmap,
      timeHeatmap,
      categoryHeatmap,
      algorithmHeatmap
    };
  };
  const handleExportData = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `heatmap_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "导出成功",
      description: "热力图数据已导出为CSV文件"
    });
  };
  const generateCSV = () => {
    const headers = ['类型', 'X坐标', 'Y坐标', '数值', '标签', '点击数', '转化数', '用户数'];
    const rows = [];
    heatmapData.clickHeatmap.forEach(item => {
      rows.push(['点击热力图', item.x, item.y, item.value, item.label, item.clicks, '', '']);
    });
    heatmapData.conversionHeatmap.forEach(item => {
      rows.push(['转化热力图', item.x, item.y, item.value, item.label, '', item.conversions, '']);
    });
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };
  const getHeatmapColor = (value, max) => {
    const intensity = value / max;
    if (intensity < 0.2) return 'bg-blue-200';
    if (intensity < 0.4) return 'bg-blue-300';
    if (intensity < 0.6) return 'bg-blue-400';
    if (intensity < 0.8) return 'bg-blue-500';
    return 'bg-blue-600';
  };
  const timeRanges = [{
    value: '24h',
    label: '24小时'
  }, {
    value: '7d',
    label: '7天'
  }, {
    value: '30d',
    label: '30天'
  }, {
    value: '90d',
    label: '90天'
  }];
  const categories = [{
    value: 'all',
    label: '全部类别'
  }, {
    value: 'hair-dye',
    label: '染发剂'
  }, {
    value: 'tools',
    label: '染发工具'
  }, {
    value: 'care',
    label: '护理产品'
  }, {
    value: 'accessories',
    label: '配件用品'
  }];
  if (activeTab === 'overview') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="推荐热力图" showBack={true} />
          
          <div className="pb-20">
            {/* 控制面板 */}
            <div className="bg-card border-b p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      {timeRanges.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      {categories.map(category => <option key={category.value} value={category.value}>{category.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => loadHeatmapData()} disabled={isLoading}>
                    {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div> : <RefreshCw className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    导出数据
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* 统计概览 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <MousePointer className="w-8 h-8 text-blue-500" />
                      <span className="text-sm text-muted-foreground">总点击数</span>
                    </div>
                    <div className="text-2xl font-bold">12.5K</div>
                    <div className="text-xs text-green-600">+15.3%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="w-8 h-8 text-green-500" />
                      <span className="text-sm text-muted-foreground">转化率</span>
                    </div>
                    <div className="text-2xl font-bold">8.7%</div>
                    <div className="text-xs text-green-600">+2.1%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-8 h-8 text-purple-500" />
                      <span className="text-sm text-muted-foreground">活跃用户</span>
                    </div>
                    <div className="text-2xl font-bold">3.2K</div>
                    <div className="text-xs text-green-600">+8.7%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Activity className="w-8 h-8 text-orange-500" />
                      <span className="text-sm text-muted-foreground">平均停留</span>
                    </div>
                    <div className="text-2xl font-bold">45s</div>
                    <div className="text-xs text-green-600">+12s</div>
                  </CardContent>
                </Card>
              </div>

              {/* 热力图网格 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 点击热力图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MousePointer className="w-5 h-5 text-blue-500" />
                      <span>点击热力图</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="grid grid-cols-10 gap-1">
                        {heatmapData.clickHeatmap.slice(0, 50).map((item, index) => {
                        const maxValue = Math.max(...heatmapData.clickHeatmap.map(d => d.value));
                        return <div key={index} className={`aspect-square rounded ${getHeatmapColor(item.value, maxValue)} hover:opacity-80 transition-opacity cursor-pointer`} title={`${item.label}: ${item.value}次点击`}></div>;
                      })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">最高点击位置</span>
                      <span className="font-medium">位置3-4</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => {
                    setSelectedHeatmap('click');
                    setActiveTab('detail');
                  }}>
                      <Eye className="w-4 h-4 mr-2" />
                      查看详情
                    </Button>
                  </CardContent>
                </Card>

                {/* 转化热力图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-green-500" />
                      <span>转化热力图</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="grid grid-cols-10 gap-1">
                        {heatmapData.conversionHeatmap.slice(0, 50).map((item, index) => {
                        const maxValue = Math.max(...heatmapData.conversionHeatmap.map(d => d.value));
                        return <div key={index} className={`aspect-square rounded ${getHeatmapColor(item.value, maxValue)} hover:opacity-80 transition-opacity cursor-pointer`} title={`${item.label}: ${item.value.toFixed(1)}%转化率`}></div>;
                      })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">最高转化位置</span>
                      <span className="font-medium">位置2-3</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => {
                    setSelectedHeatmap('conversion');
                    setActiveTab('detail');
                  }}>
                      <Eye className="w-4 h-4 mr-2" />
                      查看详情
                    </Button>
                  </CardContent>
                </Card>

                {/* 用户行为热力图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-500" />
                      <span>行为热力图</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="grid grid-cols-7 gap-1">
                        {heatmapData.behaviorHeatmap.slice(0, 35).map((item, index) => {
                        const maxValue = Math.max(...heatmapData.behaviorHeatmap.map(d => d.value));
                        return <div key={index} className={`aspect-square rounded ${getHeatmapColor(item.value, maxValue)} hover:opacity-80 transition-opacity cursor-pointer`} title={`${item.hour}时: ${item.value}次交互`}></div>;
                      })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">最活跃时段</span>
                      <span className="font-medium">14:00-16:00</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => {
                    setSelectedHeatmap('behavior');
                    setActiveTab('detail');
                  }}>
                      <Eye className="w-4 h-4 mr-2" />
                      查看详情
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 类别和算法热力图 */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* 类别热力图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Grid className="w-5 h-5 text-orange-500" />
                      <span>类别热力图</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={heatmapData.categoryHeatmap}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#f59e0b" name="热度值" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* 算法热力图 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-red-500" />
                      <span>算法热力图</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={heatmapData.algorithmHeatmap}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="algorithm" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#ef4444" name="效果值" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 底部导航 */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
              <div className="grid grid-cols-3 p-2">
                <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-xs mt-1">概览</span>
                </button>
                <button onClick={() => setActiveTab('detail')} className={`flex flex-col items-center py-2 ${activeTab === 'detail' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Heatmap className="w-5 h-5" />
                  <span className="text-xs mt-1">详情</span>
                </button>
                <button onClick={() => setActiveTab('analysis')} className={`flex flex-col items-center py-2 ${activeTab === 'analysis' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Activity className="w-5 h-5" />
                  <span className="text-xs mt-1">分析</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'detail' && selectedHeatmap) {
    const renderHeatmapDetail = () => {
      switch (selectedHeatmap) {
        case 'click':
          return <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MousePointer className="w-5 h-5 text-blue-500" />
                    <span>点击热力图详情</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="grid grid-cols-10 gap-1">
                      {heatmapData.clickHeatmap.map((item, index) => {
                      const maxValue = Math.max(...heatmapData.clickHeatmap.map(d => d.value));
                      return <div key={index} className={`aspect-square rounded ${getHeatmapColor(item.value, maxValue)} hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-xs font-medium text-white`} title={`${item.label}: ${item.value}次点击`}>
                            {item.value > 50 ? item.value : ''}
                          </div>;
                    })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">总点击数</span>
                    <span className="font-medium">{heatmapData.clickHeatmap.reduce((sum, item) => sum + item.clicks, 0).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>点击趋势分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={heatmapData.timeHeatmap.slice(0, 20)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="clicks" stroke="#3b82f6" fill="#3b82f6" name="点击数" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>;
        case 'conversion':
          return <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span>转化热力图详情</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="grid grid-cols-10 gap-1">
                      {heatmapData.conversionHeatmap.map((item, index) => {
                      const maxValue = Math.max(...heatmapData.conversionHeatmap.map(d => d.value));
                      return <div key={index} className={`aspect-square rounded ${getHeatmapColor(item.value, maxValue)} hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-xs font-medium text-white`} title={`${item.label}: ${item.value.toFixed(1)}%转化率`}>
                            {item.value > 10 ? `${item.value.toFixed(1)}%` : ''}
                          </div>;
                    })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">平均转化率</span>
                    <span className="font-medium">{(heatmapData.conversionHeatmap.reduce((sum, item) => sum + item.value, 0) / heatmapData.conversionHeatmap.length).toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>转化趋势分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={heatmapData.timeHeatmap.slice(0, 20)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="conversions" stroke="#10b981" name="转化数" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>;
        case 'behavior':
          return <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span>用户行为热力图详情</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="grid grid-cols-24 gap-1">
                      {heatmapData.behaviorHeatmap.map((item, index) => {
                      const maxValue = Math.max(...heatmapData.behaviorHeatmap.map(d => d.value));
                      return <div key={index} className={`aspect-square rounded ${getHeatmapColor(item.value, maxValue)} hover:opacity-80 transition-opacity cursor-pointer`} title={`${item.hour}时: ${item.value}次交互`}></div>;
                    })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">最活跃时段</span>
                    <span className="font-medium">14:00-16:00</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>行为分布分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={[{
                      name: '点击',
                      value: 45
                    }, {
                      name: '悬停',
                      value: 25
                    }, {
                      name: '滚动',
                      value: 15
                    }, {
                      name: '停留',
                      value: 10
                    }, {
                      name: '分享',
                      value: 3
                    }, {
                      name: '收藏',
                      value: 2
                    }]} cx="50%" cy="50%" labelLine={false} label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        <Cell fill="#3b82f6" />
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#ec4899" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>;
        default:
          return null;
      }
    };
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title={`${selectedHeatmap === 'click' ? '点击' : selectedHeatmap === 'conversion' ? '转化' : '行为'}热力图详情`} showBack={true} />
          
          <div className="pb-20 p-4">
            {renderHeatmapDetail()}
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-3 p-2">
              <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs mt-1">概览</span>
              </button>
              <button onClick={() => setActiveTab('detail')} className={`flex flex-col items-center py-2 ${activeTab === 'detail' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Heatmap className="w-5 h-5" />
                <span className="text-xs mt-1">详情</span>
              </button>
              <button onClick={() => setActiveTab('analysis')} className={`flex flex-col items-center py-2 ${activeTab === 'analysis' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Activity className="w-5 h-5" />
                <span className="text-xs mt-1">分析</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'analysis') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="热力图分析" showBack={true} />
          
          <div className="pb-20 p-4 space-y-6">
            {/* 时间分析 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>时间维度分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={heatmapData.timeHeatmap}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="recommendations" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="推荐数" />
                    <Area type="monotone" dataKey="clicks" stackId="2" stroke="#10b981" fill="#10b981" name="点击数" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 类别分析 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid className="w-5 h-5 text-green-500" />
                  <span>类别效果分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={heatmapData.categoryHeatmap}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clicks" fill="#3b82f6" name="点击数" />
                    <Bar dataKey="conversions" fill="#10b981" name="转化数" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 算法分析 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <span>算法效果分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={heatmapData.algorithmHeatmap}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="accuracy" name="准确率" />
                    <YAxis dataKey="coverage" name="覆盖率" />
                    <Tooltip cursor={{
                    strokeDasharray: '3 3'
                  }} />
                    <Scatter name="算法效果" data={heatmapData.algorithmHeatmap} fill="#8884d8">
                      {heatmapData.algorithmHeatmap.map((entry, index) => <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index]} />)}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 优化建议 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-orange-500" />
                  <span>优化建议</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium">优化推荐位置</div>
                      <div className="text-sm text-muted-foreground">将高转化产品放置在位置2-3，可提升整体转化率15%</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">调整推荐策略</div>
                      <div className="text-sm text-muted-foreground">在14:00-16:00时段增加推荐频率，用户活跃度最高</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium">算法优化</div>
                      <div className="text-sm text-muted-foreground">深度学习算法表现最佳，建议提升其权重至40%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-3 p-2">
              <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs mt-1">概览</span>
              </button>
              <button onClick={() => setActiveTab('detail')} className={`flex flex-col items-center py-2 ${activeTab === 'detail' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Heatmap className="w-5 h-5" />
                <span className="text-xs mt-1">详情</span>
              </button>
              <button onClick={() => setActiveTab('analysis')} className={`flex flex-col items-center py-2 ${activeTab === 'analysis' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Activity className="w-5 h-5" />
                <span className="text-xs mt-1">分析</span>
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