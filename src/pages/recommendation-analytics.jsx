// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, Users, MousePointer, ShoppingCart, Star, Calendar, Filter, Download, RefreshCw, Eye, ThumbsUp, Target, Activity, DollarSign, Package, Clock, AlertCircle, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
// @ts-ignore;

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function RecommendationAnalyticsPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [timeRange, setTimeRange] = useState('7d');
  const [dimension, setDimension] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    overview: {},
    trends: [],
    categoryAnalysis: [],
    userSegmentAnalysis: [],
    productPerformance: [],
    detailedMetrics: []
  });
  const [kpiMetrics, setKpiMetrics] = useState({
    totalRecommendations: 0,
    clickRate: 0,
    conversionRate: 0,
    satisfactionRate: 0,
    revenueGenerated: 0,
    activeUsers: 0
  });
  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, dimension]);
  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // 模拟从数据源获取分析数据
      const mockData = await generateMockAnalyticsData();
      setAnalyticsData(mockData);
      setKpiMetrics(mockData.overview);
    } catch (error) {
      console.error('加载分析数据失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取推荐分析数据",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const generateMockAnalyticsData = async () => {
    // 生成模拟的分析数据
    const trends = generateTrendData();
    const categoryAnalysis = generateCategoryAnalysis();
    const userSegmentAnalysis = generateUserSegmentAnalysis();
    const productPerformance = generateProductPerformance();
    const detailedMetrics = generateDetailedMetrics();
    return {
      overview: {
        totalRecommendations: 45678,
        clickRate: 12.5,
        conversionRate: 3.8,
        satisfactionRate: 87.2,
        revenueGenerated: 234567,
        activeUsers: 8934
      },
      trends,
      categoryAnalysis,
      userSegmentAnalysis,
      productPerformance,
      detailedMetrics
    };
  };
  const generateTrendData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        recommendations: Math.floor(Math.random() * 2000) + 500,
        clicks: Math.floor(Math.random() * 300) + 100,
        conversions: Math.floor(Math.random() * 80) + 20,
        revenue: Math.floor(Math.random() * 10000) + 2000,
        satisfaction: Math.random() * 20 + 80
      });
    }
    return data;
  };
  const generateCategoryAnalysis = () => {
    return [{
      category: '染发剂',
      recommendations: 15678,
      clicks: 2145,
      conversions: 567,
      revenue: 123456,
      satisfaction: 88.5
    }, {
      category: '染发工具',
      recommendations: 8934,
      clicks: 1123,
      conversions: 234,
      revenue: 45678,
      satisfaction: 85.2
    }, {
      category: '护理产品',
      recommendations: 12345,
      clicks: 1567,
      conversions: 445,
      revenue: 67890,
      satisfaction: 89.1
    }, {
      category: '配件用品',
      recommendations: 5678,
      clicks: 678,
      conversions: 123,
      revenue: 23456,
      satisfaction: 86.7
    }, {
      category: '套装组合',
      recommendations: 3043,
      clicks: 389,
      conversions: 89,
      revenue: 34567,
      satisfaction: 91.2
    }];
  };
  const generateUserSegmentAnalysis = () => {
    return [{
      segment: '新用户',
      users: 2345,
      recommendations: 8901,
      clicks: 1234,
      conversions: 234,
      satisfaction: 82.3
    }, {
      segment: '活跃用户',
      users: 4567,
      recommendations: 23456,
      clicks: 3456,
      conversions: 789,
      satisfaction: 89.5
    }, {
      segment: 'VIP用户',
      users: 1234,
      recommendations: 6789,
      clicks: 1234,
      conversions: 456,
      satisfaction: 94.2
    }, {
      segment: '流失用户',
      users: 788,
      recommendations: 3456,
      clicks: 234,
      conversions: 45,
      satisfaction: 76.8
    }];
  };
  const generateProductPerformance = () => {
    return [{
      productId: 'PROD001',
      name: 'AI智能染发剂',
      recommendations: 3456,
      clicks: 567,
      conversions: 123,
      revenue: 45678,
      satisfaction: 92.1
    }, {
      productId: 'PROD002',
      name: '天然染发剂',
      recommendations: 2890,
      clicks: 445,
      conversions: 98,
      revenue: 34567,
      satisfaction: 87.6
    }, {
      productId: 'PROD003',
      name: '专业染发套装',
      recommendations: 2134,
      clicks: 334,
      conversions: 76,
      revenue: 28901,
      satisfaction: 89.3
    }, {
      productId: 'PROD004',
      name: '染发工具套装',
      recommendations: 1678,
      clicks: 223,
      conversions: 45,
      revenue: 12345,
      satisfaction: 85.4
    }, {
      productId: 'PROD005',
      name: '染后护理套装',
      recommendations: 1456,
      clicks: 198,
      conversions: 34,
      revenue: 9876,
      satisfaction: 90.2
    }];
  };
  const generateDetailedMetrics = () => {
    const metrics = [];
    const categories = ['染发剂', '染发工具', '护理产品', '配件用品', '套装组合'];
    for (let i = 0; i < 30; i++) {
      metrics.push({
        id: i + 1,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        category: categories[Math.floor(Math.random() * categories.length)],
        productId: `PROD${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`,
        productName: `产品${i + 1}`,
        userId: `USER${String(Math.floor(Math.random() * 10000) + 1).padStart(5, '0')}`,
        recommendationType: ['similar', 'complementary', 'upgrade'][Math.floor(Math.random() * 3)],
        clicked: Math.random() > 0.7,
        converted: Math.random() > 0.9,
        satisfaction: Math.floor(Math.random() * 5) + 1,
        revenue: Math.floor(Math.random() * 500) + 50
      });
    }
    return metrics;
  };
  const handleExportData = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `recommendation_analytics_${timeRange}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "导出成功",
      description: "数据已导出为CSV文件"
    });
  };
  const generateCSV = () => {
    const headers = ['日期', '类别', '产品ID', '产品名称', '用户ID', '推荐类型', '是否点击', '是否转化', '满意度', '收入'];
    const rows = analyticsData.detailedMetrics.map(metric => [metric.date, metric.category, metric.productId, metric.productName, metric.userId, metric.recommendationType, metric.clicked ? '是' : '否', metric.converted ? '是' : '否', metric.satisfaction, metric.revenue]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };
  const handleRefresh = () => {
    loadAnalyticsData();
  };
  const timeRanges = [{
    value: '7d',
    label: '最近7天'
  }, {
    value: '30d',
    label: '最近30天'
  }, {
    value: '90d',
    label: '最近90天'
  }];
  const dimensions = [{
    value: 'overview',
    label: '总览',
    icon: <Activity className="w-4 h-4" />
  }, {
    value: 'category',
    label: '类别分析',
    icon: <Package className="w-4 h-4" />
  }, {
    value: 'user',
    label: '用户分析',
    icon: <Users className="w-4 h-4" />
  }, {
    value: 'product',
    label: '产品分析',
    icon: <Target className="w-4 h-4" />
  }];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="推荐效果分析" showBack={true} />
        
        <div className="pb-20">
          {/* 控制面板 */}
          <div className="bg-card border-b p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    {timeRanges.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <div className="flex space-x-1">
                    {dimensions.map(dim => <button key={dim.value} onClick={() => setDimension(dim.value)} className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${dimension === dim.value ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'}`}>
                        {dim.icon}
                        <span className="text-sm">{dim.label}</span>
                      </button>)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
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
            {/* KPI 指标卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">总推荐数</span>
                  </div>
                  <div className="text-2xl font-bold">{kpiMetrics.totalRecommendations.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointer className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">点击率</span>
                  </div>
                  <div className="text-2xl font-bold">{kpiMetrics.clickRate}%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.3%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <ShoppingCart className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-muted-foreground">转化率</span>
                  </div>
                  <div className="text-2xl font-bold">{kpiMetrics.conversionRate}%</div>
                  <div className="flex items-center text-xs text-red-600 mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -0.8%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-muted-foreground">满意度</span>
                  </div>
                  <div className="text-2xl font-bold">{kpiMetrics.satisfactionRate}%</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">收入</span>
                  </div>
                  <div className="text-2xl font-bold">¥{(kpiMetrics.revenueGenerated / 1000).toFixed(1)}K</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18.7%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">活跃用户</span>
                  </div>
                  <div className="text-2xl font-bold">{kpiMetrics.activeUsers.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 趋势图表 */}
            <Card>
              <CardHeader>
                <CardTitle>推荐趋势分析</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="recommendations" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="推荐数" />
                    <Area type="monotone" dataKey="clicks" stackId="2" stroke="#10b981" fill="#10b981" name="点击数" />
                    <Area type="monotone" dataKey="conversions" stackId="3" stroke="#f59e0b" fill="#f59e0b" name="转化数" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 维度分析 */}
            {dimension === 'category' && <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>类别推荐分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={analyticsData.categoryAnalysis} cx="50%" cy="50%" labelLine={false} label={({
                      category,
                      percent
                    }) => `${category} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="recommendations">
                          {analyticsData.categoryAnalysis.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>类别转化率对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.categoryAnalysis}>
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
              </div>}

            {dimension === 'user' && <Card>
                <CardHeader>
                  <CardTitle>用户群体分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={analyticsData.userSegmentAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#3b82f6" name="用户数" />
                      <Bar dataKey="recommendations" fill="#10b981" name="推荐数" />
                      <Bar dataKey="conversions" fill="#f59e0b" name="转化数" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>}

            {dimension === 'product' && <Card>
                <CardHeader>
                  <CardTitle>产品表现排行</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.productPerformance.map((product, index) => <div key={product.productId} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.productId}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">推荐数</div>
                            <div className="font-bold">{product.recommendations.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">转化率</div>
                            <div className="font-bold">{(product.conversions / product.recommendations * 100).toFixed(1)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">满意度</div>
                            <div className="font-bold">{product.satisfaction}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">收入</div>
                            <div className="font-bold">¥{product.revenue.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {/* 详细数据表格 */}
            <Card>
              <CardHeader>
                <CardTitle>详细数据</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">日期</th>
                        <th className="text-left p-2">类别</th>
                        <th className="text-left p-2">产品</th>
                        <th className="text-left p-2">推荐类型</th>
                        <th className="text-center p-2">点击</th>
                        <th className="text-center p-2">转化</th>
                        <th className="text-center p-2">满意度</th>
                        <th className="text-right p-2">收入</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.detailedMetrics.slice(0, 10).map(metric => <tr key={metric.id} className="border-b">
                          <td className="p-2">{metric.date}</td>
                          <td className="p-2">{metric.category}</td>
                          <td className="p-2">{metric.productName}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${metric.recommendationType === 'similar' ? 'bg-blue-100 text-blue-600' : metric.recommendationType === 'complementary' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                              {metric.recommendationType === 'similar' ? '相似' : metric.recommendationType === 'complementary' ? '互补' : '升级'}
                            </span>
                          </td>
                          <td className="p-2 text-center">
                            {metric.clicked ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <AlertCircle className="w-4 h-4 text-gray-300 mx-auto" />}
                          </td>
                          <td className="p-2 text-center">
                            {metric.converted ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <AlertCircle className="w-4 h-4 text-gray-300 mx-auto" />}
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center">
                              <Star className={`w-4 h-4 ${metric.satisfaction >= 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                              <span className="ml-1">{metric.satisfaction}</span>
                            </div>
                          </td>
                          <td className="p-2 text-right">¥{metric.revenue}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}