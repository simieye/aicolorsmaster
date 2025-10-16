// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Cloud, Database, TrendingUp, Zap, Beaker, Star, Heart, Share2, Download, Upload, Filter, Search, Eye, Edit, Trash2, BarChart3, Target, Clock, Users, MessageCircle, CheckCircle, AlertCircle, RefreshCw, Plus } from 'lucide-react';

export default function FormulaManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formulas, setFormulas] = useState([]);
  const [trendingColors, setTrendingColors] = useState([]);
  const [optimizationData, setOptimizationData] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  useEffect(() => {
    // 模拟加载配方数据
    const mockFormulas = [{
      id: 1,
      name: '微潮紫渐变',
      category: '微潮色系',
      difficulty: '中级',
      popularity: 95,
      successRate: 92,
      cost: 280,
      time: '45分钟',
      creator: 'Tony老师',
      createdAt: '2024-06-01',
      version: '2.1',
      isCloudSynced: true,
      tags: ['热门', '夏季推荐', '显白'],
      description: '适合亚洲肤色的微潮紫色，自然渐变效果',
      proportions: {
        '紫色剂': 60,
        '漂染霜': 25,
        '护色素': 10,
        '营养精华': 5
      },
      steps: ['预处理头发', '调配染发剂', '分区涂抹', '等待处理', '清洗护理'],
      feedback: {
        rating: 4.8,
        reviews: 234,
        satisfaction: 95
      }
    }, {
      id: 2,
      name: '樱花粉日系',
      category: '日系色',
      difficulty: '初级',
      popularity: 88,
      successRate: 89,
      cost: 220,
      time: '30分钟',
      creator: 'Lisa造型师',
      createdAt: '2024-05-15',
      version: '1.5',
      isCloudSynced: true,
      tags: ['温柔', '减龄', '春季'],
      description: '温柔甜美的樱花粉色，适合年轻女性',
      proportions: {
        '粉色剂': 70,
        '漂染霜': 20,
        '护色素': 8,
        '营养精华': 2
      },
      steps: ['皮肤测试', '调配染发剂', '分区涂抹', '等待处理', '清洗护理'],
      feedback: {
        rating: 4.6,
        reviews: 189,
        satisfaction: 88
      }
    }, {
      id: 3,
      name: '薄荷绿清新',
      category: '潮色系',
      difficulty: '高级',
      popularity: 76,
      successRate: 85,
      cost: 350,
      time: '60分钟',
      creator: 'Kevin总监',
      createdAt: '2024-04-20',
      version: '3.0',
      isCloudSynced: false,
      tags: ['个性', '夏季', '时尚'],
      description: '清新自然的薄荷绿色，个性十足',
      proportions: {
        '绿色剂': 55,
        '漂染霜': 30,
        '护色素': 10,
        '营养精华': 5
      },
      steps: ['深度预处理', '调配染发剂', '分区涂抹', '等待处理', '深度护理'],
      feedback: {
        rating: 4.4,
        reviews: 156,
        satisfaction: 82
      }
    }];
    const mockTrendingColors = [{
      id: 1,
      name: '蜜桃橙',
      category: '潮色系',
      trend: '上升',
      popularity: 89,
      season: '夏季',
      kolRecommended: true,
      description: '温暖活力的蜜桃橙色，夏日首选',
      increase: '+23%'
    }, {
      id: 2,
      name: '雾霾蓝',
      category: '潮色系',
      trend: '稳定',
      popularity: 85,
      season: '四季',
      kolRecommended: true,
      description: '高级感的雾霾蓝色，时尚百搭',
      increase: '+5%'
    }, {
      id: 3,
      name: '奶茶棕',
      category: '生活色系',
      trend: '上升',
      popularity: 94,
      season: '四季',
      kolRecommended: false,
      description: '自然低调的奶茶棕色，日常百搭',
      increase: '+18%'
    }];
    const mockOptimizationData = {
      overview: {
        totalFormulas: 1247,
        optimizedFormulas: 892,
        improvementRate: 71.5,
        avgSuccessRate: 91.2
      },
      optimizations: [{
        formulaName: '微潮紫渐变',
        originalSuccessRate: 85,
        optimizedSuccessRate: 94,
        improvement: '+9%',
        optimizationDate: '2024-06-10',
        factors: ['调整漂染霜比例', '优化处理时间', '增加护色素']
      }, {
        formulaName: '樱花粉日系',
        originalSuccessRate: 82,
        optimizedSuccessRate: 91,
        improvement: '+9%',
        optimizationDate: '2024-06-08',
        factors: ['改进调配比例', '优化涂抹技巧', '加强护理步骤']
      }]
    };
    setFormulas(mockFormulas);
    setTrendingColors(mockTrendingColors);
    setOptimizationData(mockOptimizationData);
  }, []);
  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) || formula.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || formula.category === filterCategory;
    return matchesSearch && matchesFilter;
  });
  const handleFormulaSelect = formula => {
    setSelectedFormula(formula);
    setActiveTab('detail');
    toast({
      title: "查看配方详情",
      description: `正在查看${formula.name}的详细信息`
    });
  };
  const handleCloudSync = formula => {
    toast({
      title: "云端同步",
      description: `正在同步${formula.name}到云端...`
    });
    // 模拟云端同步
    setTimeout(() => {
      toast({
        title: "同步成功",
        description: `${formula.name}已成功同步到云端`
      });
    }, 2000);
  };
  const handleOptimize = async formula => {
    setIsOptimizing(true);
    toast({
      title: "开始优化",
      description: "AI正在分析配方数据，寻找优化方案..."
    });

    // 模拟AI优化过程
    setTimeout(() => {
      setIsOptimizing(false);
      toast({
        title: "优化完成",
        description: "配方已优化，成功率提升9%"
      });
    }, 3000);
  };
  const handleShare = formula => {
    toast({
      title: "分享配方",
      description: `${formula.name}已分享到社区`
    });
  };
  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case '初级':
        return 'bg-green-100 text-green-800';
      case '中级':
        return 'bg-yellow-100 text-yellow-800';
      case '高级':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getTrendIcon = trend => {
    switch (trend) {
      case '上升':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case '下降':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">配方管理中心</h1>
          <p className="text-xl text-gray-600">CloudFormula Agent 智能云端配方管理，潮流更新实时同步</p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">云端配方</p>
                  <p className="text-2xl font-bold text-purple-600">{formulas.filter(f => f.isCloudSynced).length}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </p>
                </div>
                <Cloud className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">优化配方</p>
                  <p className="text-2xl font-bold text-green-600">{optimizationData?.optimizedFormulas || 0}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.3%
                  </p>
                </div>
                <Zap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">平均成功率</p>
                  <p className="text-2xl font-bold text-blue-600">{optimizationData?.avgSuccessRate || 0}%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.2%
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">潮流色彩</p>
                  <p className="text-2xl font-bold text-orange-600">{trendingColors.length}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15.2%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 标签导航 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['overview', 'cloud', 'trending', 'optimization', 'sharing'].map(tab => <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'bg-purple-600 hover:bg-purple-700' : ''}>
              {tab === 'overview' && '📋 配方总览'}
              {tab === 'cloud' && '☁️ 云端存储'}
              {tab === 'trending' && '🔥 潮流更新'}
              {tab === 'optimization' && '⚡ 配方优化'}
              {tab === 'sharing' && '🤝 配方分享'}
            </Button>)}
        </div>

        {activeTab === 'overview' && <>
            {/* 搜索和筛选 */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="搜索配方名称或分类..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="筛选分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="日系色">日系色</SelectItem>
                  <SelectItem value="潮色系">潮色系</SelectItem>
                  <SelectItem value="微潮色系">微潮色系</SelectItem>
                  <SelectItem value="生活色系">生活色系</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 w-4 h-4" />
                创建配方
              </Button>
            </div>

            {/* 配方列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormulas.map(formula => <Card key={formula.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleFormulaSelect(formula)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{formula.name}</h3>
                        <p className="text-sm text-gray-600">{formula.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {formula.isCloudSynced && <Cloud className="w-4 h-4 text-blue-600" />}
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(formula.difficulty)}`}>
                          {formula.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        创建者: {formula.creator}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        时间: {formula.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-2" />
                        成功率: {formula.successRate}%
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {formula.tags.slice(0, 2).map((tag, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {tag}
                        </span>)}
                      {formula.tags.length > 2 && <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{formula.tags.length - 2}
                        </span>}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(formula.feedback.rating) ? 'fill-current' : ''}`} />)}
                          <span className="ml-1 text-sm">{formula.feedback.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">成本</p>
                        <p className="font-semibold text-green-600">￥{formula.cost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </>}

        {activeTab === 'cloud' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">云端配方存储</h2>
              <p className="text-gray-600">安全可靠的云端存储，实时同步多设备访问</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 存储统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2" />
                    存储统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">总配方数</span>
                      <span className="font-semibold">{formulas.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">已同步</span>
                      <span className="font-semibold text-blue-600">{formulas.filter(f => f.isCloudSynced).length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm">待同步</span>
                      <span className="font-semibold text-yellow-600">{formulas.filter(f => !f.isCloudSynced).length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">存储空间</span>
                      <span className="font-semibold text-green-600">2.3GB / 10GB</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    <Upload className="mr-2 w-4 h-4" />
                    批量同步
                  </Button>
                </CardContent>
              </Card>

              {/* 同步管理 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RefreshCw className="mr-2" />
                    同步管理
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formulas.map(formula => <div key={formula.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${formula.isCloudSynced ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <p className="font-medium">{formula.name}</p>
                            <p className="text-sm text-gray-600">版本 {formula.version}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {formula.isCloudSynced ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Button size="sm" onClick={() => handleCloudSync(formula)} className="bg-blue-600 hover:bg-blue-700">
                              同步
                            </Button>}
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>}

        {activeTab === 'trending' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">潮流色彩更新</h2>
              <p className="text-gray-600">实时追踪流行趋势，KOL推荐色彩</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingColors.map(color => <Card key={color.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{color.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(color.trend)}
                        <span className="text-green-600 font-semibold">{color.increase}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">分类:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {color.category}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">季节:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {color.season}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">人气:</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{
                        width: `${color.popularity}%`
                      }}></div>
                          </div>
                          <span>{color.popularity}%</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{color.description}</p>

                    {color.kolRecommended && <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-sm font-semibold">KOL推荐</span>
                        </div>
                      </div>}

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Eye className="w-4 h-4 mr-1" />
                        查看详情
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Heart className="w-4 h-4 mr-1" />
                        收藏
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </>}

        {activeTab === 'optimization' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">AI配方优化</h2>
              <p className="text-gray-600">智能算法优化配方，提升成功率和客户满意度</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 优化概览 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2" />
                    优化概览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">{optimizationData?.improvementRate || 0}%</p>
                      <p className="text-gray-600">优化提升率</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-purple-600">{optimizationData?.totalFormulas || 0}</p>
                        <p className="text-sm text-gray-600">总配方数</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-blue-600">{optimizationData?.optimizedFormulas || 0}</p>
                        <p className="text-sm text-gray-600">已优化</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 优化历史 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2" />
                    最近优化
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {optimizationData?.optimizations.map((opt, index) => <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{opt.formulaName}</h4>
                          <span className="text-green-600 font-semibold">{opt.improvement}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                          <div>
                            <span className="text-gray-600">原成功率:</span>
                            <span className="font-semibold">{opt.originalSuccessRate}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">优化后:</span>
                            <span className="font-semibold text-green-600">{opt.optimizedSuccessRate}%</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">{opt.optimizationDate}</p>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 配方优化操作 */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>一键优化</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formulas.map(formula => <div key={formula.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{formula.name}</h4>
                          <span className="text-sm text-gray-600">{formula.successRate}%</span>
                        </div>
                        <Button size="sm" onClick={() => handleOptimize(formula)} disabled={isOptimizing} className="w-full bg-green-600 hover:bg-green-700">
                          {isOptimizing ? <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              优化中...
                            </> : <>
                              <Zap className="w-4 h-4 mr-2" />
                              优化配方
                            </>}
                        </Button>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>}

        {activeTab === 'sharing' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">配方分享社区</h2>
              <p className="text-gray-600">专业发型师交流平台，经验传承与技术创新</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 热门分享 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2" />
                    热门分享
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formulas.slice(0, 3).map(formula => <div key={formula.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">{formula.name}</h4>
                          <p className="text-sm text-gray-600">by {formula.creator}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-red-500">
                            <Heart className="w-4 h-4 mr-1" />
                            <span className="text-sm">{Math.floor(Math.random() * 500) + 100}</span>
                          </div>
                          <div className="flex items-center text-blue-500">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm">{Math.floor(Math.random() * 50) + 10}</span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              {/* 分享统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Share2 className="mr-2" />
                    分享统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">1,247</p>
                      <p className="text-gray-600">总分享数</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-xl font-bold text-red-600">3,456</p>
                        <p className="text-sm text-gray-600">获赞数</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-blue-600">892</p>
                        <p className="text-sm text-gray-600">评论数</p>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Share2 className="mr-2 w-4 h-4" />
                      分享我的配方
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>}

        {/* 配方详情弹窗 */}
        {selectedFormula && activeTab === 'detail' && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedFormula.name}</h2>
                <Button variant="outline" onClick={() => setActiveTab('overview')}>
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* 基本信息 */}
                <div>
                  <h3 className="font-semibold mb-2">基本信息</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">分类:</span>
                      <span className="ml-2">{selectedFormula.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">难度:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getDifficultyColor(selectedFormula.difficulty)}`}>
                        {selectedFormula.difficulty}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">成功率:</span>
                      <span className="ml-2 font-semibold">{selectedFormula.successRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">成本:</span>
                      <span className="ml-2 font-semibold">￥{selectedFormula.cost}</span>
                    </div>
                  </div>
                </div>

                {/* 配方比例 */}
                <div>
                  <h3 className="font-semibold mb-2">配方比例</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedFormula.proportions).map(([ingredient, percentage]) => <div key={ingredient} className="flex items-center justify-between">
                        <span>{ingredient}</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{
                        width: `${percentage}%`
                      }}></div>
                          </div>
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* 操作步骤 */}
                <div>
                  <h3 className="font-semibold mb-2">操作步骤</h3>
                  <ol className="space-y-2">
                    {selectedFormula.steps.map((step, index) => <li key={index} className="flex items-start">
                        <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>)}
                  </ol>
                </div>

                {/* 用户反馈 */}
                <div>
                  <h3 className="font-semibold mb-2">用户反馈</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedFormula.feedback.rating) ? 'fill-current' : ''}`} />)}
                        <span className="ml-1">{selectedFormula.feedback.rating}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">满意度:</span>
                      <span className="ml-2 font-semibold">{selectedFormula.feedback.satisfaction}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">评价数:</span>
                      <span className="ml-2 font-semibold">{selectedFormula.feedback.reviews}</span>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <Button onClick={() => handleOptimize(selectedFormula)} disabled={isOptimizing} className="bg-green-600 hover:bg-green-700">
                    {isOptimizing ? '优化中...' : 'AI优化'}
                  </Button>
                  <Button onClick={() => handleCloudSync(selectedFormula)} className="bg-blue-600 hover:bg-blue-700">
                    <Cloud className="w-4 h-4 mr-2" />
                    云端同步
                  </Button>
                  <Button onClick={() => handleShare(selectedFormula)} variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}