// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { ThumbsUp, ThumbsDown, MessageSquare, Eye, EyeOff, Star, TrendingUp, TrendingDown, Filter, Search, Download, Calendar, BarChart3, PieChart, Users, Target, Clock, CheckCircle, AlertCircle, RefreshCw, Settings } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
// @ts-ignore;

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function FeedbackManagementPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [feedbackData, setFeedbackData] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = $w?.auth?.currentUser;
  useEffect(() => {
    loadFeedbackData();
    loadStatistics();
    loadTrendData();
  }, []);
  const loadFeedbackData = async () => {
    setIsLoading(true);
    try {
      // 模拟从数据源获取反馈数据
      const mockFeedback = generateMockFeedbackData();
      setFeedbackData(mockFeedback);
    } catch (error) {
      console.error('加载反馈数据失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取反馈数据",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const generateMockFeedbackData = () => {
    const feedbackTypes = ['like', 'dislike', 'not_interested', 'detailed'];
    const reasons = ['价格过高', '不感兴趣', '已购买过', '质量不好', '不符合需求', '推荐重复', '信息准确', '推荐准确'];
    const products = ['AI智能染发剂', '天然染发套装', '专业染发工具', '染后护理套装', '染发手套'];
    const algorithms = ['collaborative_filtering', 'content_based', 'deep_learning', 'hybrid'];
    const data = [];
    for (let i = 0; i < 100; i++) {
      const type = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)];
      data.push({
        id: `fb_${String(i + 1).padStart(3, '0')}`,
        userId: `USER_${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`,
        productId: `PROD_${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')}`,
        productName: products[Math.floor(Math.random() * products.length)],
        recommendationId: `REC_${String(Math.floor(Math.random() * 1000) + 1).padStart(4, '0')}`,
        algorithm: algorithms[Math.floor(Math.random() * algorithms.length)],
        confidence: Math.random() * 0.5 + 0.5,
        feedbackType: type,
        feedbackValue: Math.random() > 0.3,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        rating: Math.floor(Math.random() * 5) + 1,
        comment: type === 'detailed' ? `这是我的详细反馈意见 ${i + 1}` : '',
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        processed: Math.random() > 0.3
      });
    }
    return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };
  const loadStatistics = async () => {
    const mockStats = {
      totalFeedback: 1250,
      positiveRate: 68.5,
      negativeRate: 18.2,
      neutralRate: 13.3,
      averageRating: 4.2,
      responseRate: 45.6,
      processedRate: 78.9,
      topReasons: [{
        reason: '推荐准确',
        count: 342,
        percentage: 27.4
      }, {
        reason: '价格过高',
        count: 234,
        percentage: 18.7
      }, {
        reason: '不感兴趣',
        count: 189,
        percentage: 15.1
      }, {
        reason: '已购买过',
        count: 156,
        percentage: 12.5
      }, {
        reason: '质量不好',
        count: 123,
        percentage: 9.8
      }],
      algorithmPerformance: [{
        algorithm: '深度学习',
        positiveRate: 72.3,
        totalFeedback: 450
      }, {
        algorithm: '协同过滤',
        positiveRate: 65.8,
        totalFeedback: 380
      }, {
        algorithm: '内容推荐',
        positiveRate: 68.9,
        totalFeedback: 320
      }, {
        algorithm: '混合算法',
        positiveRate: 71.2,
        totalFeedback: 100
      }]
    };
    setStatistics(mockStats);
  };
  const loadTrendData = async () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      data.push({
        date: date.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        }),
        positive: Math.floor(Math.random() * 50) + 20,
        negative: Math.floor(Math.random() * 20) + 5,
        neutral: Math.floor(Math.random() * 15) + 3,
        total: Math.floor(Math.random() * 80) + 30
      });
    }
    setTrendData(data);
  };
  const handleExportData = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `feedback_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "导出成功",
      description: "反馈数据已导出为CSV文件"
    });
  };
  const generateCSV = () => {
    const headers = ['ID', '用户ID', '产品名称', '算法', '反馈类型', '反馈值', '原因', '评分', '评论', '时间戳', '已处理'];
    const rows = feedbackData.map(item => [item.id, item.userId, item.productName, item.algorithm, item.feedbackType, item.feedbackValue, item.reason, item.rating, item.comment, item.timestamp, item.processed ? '是' : '否']);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };
  const filteredFeedback = feedbackData.filter(item => {
    const matchesType = filterType === 'all' || item.feedbackType === filterType;
    const matchesSearch = !searchTerm || item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || item.reason.toLowerCase().includes(searchTerm.toLowerCase()) || item.algorithm.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });
  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'];
  if (activeTab === 'overview') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="反馈管理" showBack={true} />
          
          <div className="pb-20">
            {/* 统计卡片 */}
            <div className="p-4 space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <MessageSquare className="w-8 h-8 text-blue-500" />
                      <span className="text-sm text-muted-foreground">总反馈数</span>
                    </div>
                    <div className="text-2xl font-bold">{statistics.totalFeedback?.toLocaleString()}</div>
                    <div className="text-xs text-green-600">+12.5%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <ThumbsUp className="w-8 h-8 text-green-500" />
                      <span className="text-sm text-muted-foreground">好评率</span>
                    </div>
                    <div className="text-2xl font-bold">{statistics.positiveRate}%</div>
                    <div className="text-xs text-green-600">+3.2%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">平均评分</span>
                    </div>
                    <div className="text-2xl font-bold">{statistics.averageRating}/5</div>
                    <div className="text-xs text-green-600">+0.3</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 text-purple-500" />
                      <span className="text-sm text-muted-foreground">处理率</span>
                    </div>
                    <div className="text-2xl font-bold">{statistics.processedRate}%</div>
                    <div className="text-xs text-green-600">+5.8%</div>
                  </CardContent>
                </Card>
              </div>

              {/* 反馈趋势 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>反馈趋势</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="#10b981" name="好评" />
                      <Area type="monotone" dataKey="neutral" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="中性" />
                      <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#ef4444" name="差评" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 反馈原因分布 */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>反馈原因分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsPieChart>
                        <Pie data={statistics.topReasons?.map(reason => ({
                        name: reason.reason,
                        value: reason.count
                      }))} cx="50%" cy="50%" labelLine={false} label={({
                        name,
                        percent
                      }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                          {statistics.topReasons?.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>算法表现对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={statistics.algorithmPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="algorithm" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="positiveRate" fill="#10b981" name="好评率" />
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
                <button onClick={() => setActiveTab('list')} className={`flex flex-col items-center py-2 ${activeTab === 'list' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs mt-1">反馈列表</span>
                </button>
                <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center py-2 ${activeTab === 'settings' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <Settings className="w-5 h-5" />
                  <span className="text-xs mt-1">设置</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'list') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="反馈列表" showBack={true} />
          
          <div className="pb-20">
            {/* 搜索和筛选 */}
            <div className="bg-card border-b p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="搜索反馈..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">全部类型</option>
                      <option value="like">点赞</option>
                      <option value="dislike">点踩</option>
                      <option value="not_interested">不感兴趣</option>
                      <option value="detailed">详细反馈</option>
                    </select>
                  </div>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" />
                  导出数据
                </Button>
              </div>
            </div>

            {/* 反馈列表 */}
            <div className="p-4 space-y-4">
              {isLoading ? <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2">加载中...</span>
                </div> : filteredFeedback.slice(0, 20).map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {item.feedbackType === 'like' && <ThumbsUp className="w-4 h-4 text-green-500" />}
                            {item.feedbackType === 'dislike' && <ThumbsDown className="w-4 h-4 text-red-500" />}
                            {item.feedbackType === 'not_interested' && <EyeOff className="w-4 h-4 text-gray-500" />}
                            {item.feedbackType === 'detailed' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                            <span className="font-medium">{item.productName}</span>
                            <span className="text-sm text-muted-foreground">({item.algorithm})</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            用户: {item.userId} | 置信度: {(item.confidence * 100).toFixed(1)}%
                          </div>
                          {item.reason && <div className="text-sm mb-2">
                              <span className="font-medium">原因:</span> {item.reason}
                            </div>}
                          {item.rating > 0 && <div className="flex items-center space-x-1 mb-2">
                              <span className="text-sm font-medium">评分:</span>
                              {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= item.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}
                            </div>}
                          {item.comment && <div className="text-sm mb-2">
                              <span className="font-medium">评论:</span> {item.comment}
                            </div>}
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{new Date(item.timestamp).toLocaleString()}</span>
                            <span className={`px-2 py-1 rounded ${item.processed ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                              {item.processed ? '已处理' : '待处理'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
            </div>
          </div>

          {/* 底部导航 */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="grid grid-cols-3 p-2">
              <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center py-2 ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground'}`}>
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs mt-1">概览</span>
              </button>
              <button onClick={() => setActiveTab('list')} className={`flex flex-col items-center py-2 ${activeTab === 'list' ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs mt-1">反馈列表</span>
              </button>
              <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center py-2 ${activeTab === 'settings' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Settings className="w-5 h-5" />
                <span className="text-xs mt-1">设置</span>
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>;
  }
  if (activeTab === 'settings') {
    return <ErrorBoundary $w={$w}>
        <div className="min-h-screen bg-background">
          <TopNavigation title="反馈设置" showBack={true} />
          
          <div className="pb-20 p-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>反馈收集设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">启用快速反馈</div>
                    <div className="text-sm text-muted-foreground">在推荐结果旁显示快速反馈按钮</div>
                  </div>
                  <Button variant="default" size="sm">已启用</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">自动处理反馈</div>
                    <div className="text-sm text-muted-foreground">自动分析反馈并优化推荐算法</div>
                  </div>
                  <Button variant="default" size="sm">已启用</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">反馈通知</div>
                    <div className="text-sm text-muted-foreground">收到负面反馈时发送通知</div>
                  </div>
                  <Button variant="outline" size="sm">已禁用</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>数据处理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重新分析所有反馈
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  导出反馈报告
                </Button>
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
              <button onClick={() => setActiveTab('list')} className={`flex flex-col items-center py-2 ${activeTab === 'list' ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs mt-1">反馈列表</span>
              </button>
              <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center py-2 ${activeTab === 'settings' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Settings className="w-5 h-5" />
                <span className="text-xs mt-1">设置</span>
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