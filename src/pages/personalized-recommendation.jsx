// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Sparkles, Heart, Star, TrendingUp, Palette, Camera, Settings, Filter, Search, ChevronRight, X, Check, AlertCircle, Zap, Award, Clock, Share2, Download, Eye, BarChart3, Users, Target } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function PersonalizedRecommendation(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [activeTab, setActiveTab] = useState('recommendations');
  const [recommendations, setRecommendations] = useState([]);
  const [trendingColors, setTrendingColors] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    skinTone: 'medium',
    style: 'natural',
    occasion: 'daily',
    colorFamily: 'warm'
  });
  const [favorites, setFavorites] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // 初始化数据
  useEffect(() => {
    // 模拟个性化推荐数据
    setRecommendations([{
      id: 1,
      name: '微潮紫渐变',
      hex: '#9B59B6',
      gradient: 'linear-gradient(135deg, #9B59B6 0%, #E6E6FA 100%)',
      match: 95,
      reason: '根据您的肤色分析，紫色系能够很好地衬托您的气质',
      season: '春季',
      popularity: 89,
      tags: ['渐变', '优雅', '时尚'],
      price: 680,
      duration: '120分钟',
      difficulty: '中等'
    }, {
      id: 2,
      name: '奶茶棕亚麻',
      hex: '#D2B48C',
      gradient: 'linear-gradient(135deg, #D2B48C 0%, #F5DEB3 100%)',
      match: 92,
      reason: '温暖的自然色调，非常适合您的日常风格',
      season: '四季',
      popularity: 85,
      tags: ['自然', '温和', '百搭'],
      price: 580,
      duration: '90分钟',
      difficulty: '简单'
    }, {
      id: 3,
      name: '樱花粉蜜桃',
      hex: '#FFB6C1',
      gradient: 'linear-gradient(135deg, #FFB6C1 0%, #FFE4E1 100%)',
      match: 88,
      reason: '柔和的粉色系，能够很好地提升您的亲和力',
      season: '春季',
      popularity: 92,
      tags: ['甜美', '温柔', '青春'],
      price: 620,
      duration: '100分钟',
      difficulty: '中等'
    }, {
      id: 4,
      name: '雾霾蓝灰',
      hex: '#778899',
      gradient: 'linear-gradient(135deg, #778899 0%, #B0C4DE 100%)',
      match: 86,
      reason: '高级感的蓝灰色，展现您的独特品味',
      season: '秋冬',
      popularity: 78,
      tags: ['高级', '独特', '知性'],
      price: 750,
      duration: '140分钟',
      difficulty: '困难'
    }]);

    // 模拟流行色彩数据
    setTrendingColors([{
      id: 1,
      name: '薄荷绿',
      hex: '#98FB98',
      trend: '+25%',
      season: '夏季',
      popularity: 94
    }, {
      id: 2,
      name: '珊瑚橙',
      hex: '#FF7F50',
      trend: '+18%',
      season: '夏季',
      popularity: 89
    }, {
      id: 3,
      name: '薰衣草紫',
      hex: '#E6E6FA',
      trend: '+15%',
      season: '春季',
      popularity: 87
    }, {
      id: 4,
      name: '焦糖棕',
      hex: '#CD853F',
      trend: '+12%',
      season: '秋季',
      popularity: 82
    }]);

    // 模拟收藏数据
    setFavorites([1, 3]);
  }, []);

  // 处理收藏
  const handleFavorite = colorId => {
    setFavorites(prev => {
      if (prev.includes(colorId)) {
        toast({
          title: "已取消收藏",
          description: "色彩方案已从收藏中移除"
        });
        return prev.filter(id => id !== colorId);
      } else {
        toast({
          title: "收藏成功",
          description: "色彩方案已添加到收藏"
        });
        return [...prev, colorId];
      }
    });
  };

  // 处理色彩选择
  const handleColorSelect = color => {
    setSelectedColor(color);
    setShowAnalysis(true);
  };

  // 处理偏好设置
  const handlePreferenceChange = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "偏好已更新",
      description: "正在重新生成推荐..."
    });

    // 模拟重新生成推荐
    setTimeout(() => {
      toast({
        title: "推荐已更新",
        description: "基于您的新偏好生成了新的推荐"
      });
    }, 1500);
  };

  // 获取匹配度颜色
  const getMatchColor = match => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 80) return 'text-blue-600 bg-blue-100';
    if (match >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  // 获取难度颜色
  const getDifficultyColor = difficulty => {
    const colors = {
      '简单': 'text-green-600 bg-green-100',
      '中等': 'text-yellow-600 bg-yellow-100',
      '困难': 'text-red-600 bg-red-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  // 过滤推荐
  const filteredRecommendations = recommendations.filter(color => {
    const matchesSearch = color.name.toLowerCase().includes(searchTerm.toLowerCase()) || color.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterCategory === 'all' || color.tags.includes(filterCategory);
    return matchesSearch && matchesFilter;
  });

  // 渲染推荐页面
  const renderRecommendations = () => {
    return <div className="space-y-6">
        {/* 个性化推荐头部 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  为您推荐
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">基于您的肤色分析和偏好设置</p>
              </div>
              <Button onClick={() => setShowSettings(true)} variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                调整偏好
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">匹配度算法</span>
              </div>
              <div className="flex-1 bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{
                width: '92%'
              }}></div>
              </div>
              <span className="text-sm font-bold text-purple-800">92%</span>
            </div>
          </CardContent>
        </Card>

        {/* 搜索和筛选 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索色彩方案..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">全部分类</option>
              <option value="渐变">渐变</option>
              <option value="自然">自然</option>
              <option value="甜美">甜美</option>
              <option value="高级">高级</option>
            </select>
          </div>
        </div>

        {/* 推荐列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecommendations.map(color => <Card key={color.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{color.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getMatchColor(color.match)}`}>
                        {color.match}% 匹配
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{color.reason}</p>
                  </div>
                  <button onClick={() => handleFavorite(color.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <Heart className={`w-5 h-5 ${favorites.includes(color.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>

                {/* 色彩展示 */}
                <div className="w-full h-32 rounded-lg mb-4" style={{
              background: color.gradient
            }}></div>

                {/* 标签和信息 */}
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {color.tags.map((tag, index) => <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                      </span>)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">季节</span>
                      <span className="font-medium">{color.season}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">流行度</span>
                      <span className="font-medium">{color.popularity}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">价格</span>
                      <span className="font-medium">¥{color.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">时长</span>
                      <span className="font-medium">{color.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(color.difficulty)}`}>
                      {color.difficulty}
                    </span>
                    <Button onClick={() => handleColorSelect(color)} size="sm" className="bg-purple-600 hover:bg-purple-700">
                      查看详情
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>;
  };

  // 渲染趋势页面
  const renderTrends = () => {
    return <div className="space-y-6">
        {/* 趋势概览 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              流行趋势
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">基于行业大数据和用户行为分析</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">+24%</p>
                <p className="text-sm text-gray-600">本月增长</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">12.5K</p>
                <p className="text-sm text-gray-600">活跃用户</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Palette className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">186</p>
                <p className="text-sm text-gray-600">色彩方案</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">4.8</p>
                <p className="text-sm text-gray-600">平均评分</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 热门色彩 */}
        <Card>
          <CardHeader>
            <CardTitle>热门色彩排行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingColors.map((color, index) => <div key={color.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-lg" style={{
                  backgroundColor: color.hex
                }}></div>
                    <div>
                      <h4 className="font-semibold">{color.name}</h4>
                      <p className="text-sm text-gray-600">{color.season}推荐</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="font-medium">{color.trend}</span>
                    </div>
                    <p className="text-sm text-gray-600">流行度 {color.popularity}%</p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 季节推荐 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                春季流行
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['薄荷绿', '樱花粉', '薰衣草紫'].map((color, index) => <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
                      <span className="font-medium">{color}</span>
                    </div>
                    <span className="text-sm text-green-600">热门</span>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                明星同款
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['微潮紫', '奶茶棕', '雾霾蓝'].map((color, index) => <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                      <span className="font-medium">{color}</span>
                    </div>
                    <span className="text-sm text-purple-600">明星推荐</span>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染收藏页面
  const renderFavorites = () => {
    const favoriteColors = recommendations.filter(color => favorites.includes(color.id));
    return <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              我的收藏
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">您收藏的色彩方案</p>
          </CardHeader>
          <CardContent>
            {favoriteColors.length === 0 ? <div className="text-center py-8">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无收藏</h3>
                <p className="text-gray-600">收藏您喜欢的色彩方案，方便随时查看</p>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteColors.map(color => <div key={color.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{color.name}</h4>
                      <button onClick={() => handleFavorite(color.id)} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="w-full h-24 rounded-lg mb-3" style={{
                background: color.gradient
              }}></div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full ${getMatchColor(color.match)}`}>
                        {color.match}% 匹配
                      </span>
                      <Button onClick={() => handleColorSelect(color)} size="sm" variant="outline">
                        查看详情
                      </Button>
                    </div>
                  </div>)}
              </div>}
          </CardContent>
        </Card>

        {/* 对比分析 */}
        {favoriteColors.length >= 2 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                对比分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteColors.slice(0, 3).map((color, index) => <div key={color.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full" style={{
                  backgroundColor: color.hex
                }}></div>
                      <span className="font-medium">{color.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">匹配度 {color.match}%</span>
                      <span className="text-sm text-gray-600">¥{color.price}</span>
                    </div>
                  </div>)}
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  详细对比
                </Button>
              </div>
            </CardContent>
          </Card>}
      </div>;
  };

  // 渲染设置页面
  const renderSettings = () => {
    return <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              偏好设置
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">调整您的偏好以获得更精准的推荐</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 肤色选择 */}
              <div>
                <h4 className="font-medium mb-3">肤色类型</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['白皙', '自然', '小麦', '健康'].map((tone, index) => <button key={index} onClick={() => handlePreferenceChange('skinTone', tone)} className={`p-3 border rounded-lg text-center ${userPreferences.skinTone === tone ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300'}`}>
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${tone === '白皙' ? 'bg-gray-100' : tone === '自然' ? 'bg-orange-100' : tone === '小麦' ? 'bg-yellow-100' : 'bg-orange-200'}`}></div>
                      <span className="text-sm">{tone}</span>
                    </button>)}
                </div>
              </div>

              {/* 风格偏好 */}
              <div>
                <h4 className="font-medium mb-3">风格偏好</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['自然', '时尚', '优雅', '个性'].map((style, index) => <button key={index} onClick={() => handlePreferenceChange('style', style)} className={`p-3 border rounded-lg text-center ${userPreferences.style === style ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300'}`}>
                      <span className="text-sm">{style}</span>
                    </button>)}
                </div>
              </div>

              {/* 场合需求 */}
              <div>
                <h4 className="font-medium mb-3">场合需求</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['日常', '商务', '约会', '派对'].map((occasion, index) => <button key={index} onClick={() => handlePreferenceChange('occasion', occasion)} className={`p-3 border rounded-lg text-center ${userPreferences.occasion === occasion ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300'}`}>
                      <span className="text-sm">{occasion}</span>
                    </button>)}
                </div>
              </div>

              {/* 色彩家族 */}
              <div>
                <h4 className="font-medium mb-3">色彩家族</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['暖色', '冷色', '中性', '多彩'].map((family, index) => <button key={index} onClick={() => handlePreferenceChange('colorFamily', family)} className={`p-3 border rounded-lg text-center ${userPreferences.colorFamily === family ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-300'}`}>
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${family === '暖色' ? 'bg-red-200' : family === '冷色' ? 'bg-blue-200' : family === '中性' ? 'bg-gray-200' : 'bg-gradient-to-r from-red-200 via-yellow-200 to-blue-200'}`}></div>
                      <span className="text-sm">{family}</span>
                    </button>)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI设置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              AI推荐设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">智能学习</h4>
                  <p className="text-sm text-gray-600">根据您的反馈不断优化推荐</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">趋势权重</h4>
                  <p className="text-sm text-gray-600">考虑流行趋势因素</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">个性化程度</h4>
                  <p className="text-sm text-gray-600">高度个性化推荐</p>
                </div>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>高</option>
                  <option>中</option>
                  <option>低</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">个性化推荐</h1>
          <p className="text-gray-600">AI智能推荐，找到最适合您的色彩</p>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'recommendations',
            name: '为您推荐',
            icon: Sparkles
          }, {
            id: 'trends',
            name: '流行趋势',
            icon: TrendingUp
          }, {
            id: 'favorites',
            name: '我的收藏',
            icon: Heart
          }, {
            id: 'settings',
            name: '偏好设置',
            icon: Settings
          }].map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>;
          })}
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'trends' && renderTrends()}
        {activeTab === 'favorites' && renderFavorites()}
        {activeTab === 'settings' && renderSettings()}
      </div>

      {/* 色彩分析弹窗 */}
      {showAnalysis && selectedColor && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">色彩分析详情</h2>
                <button onClick={() => setShowAnalysis(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* 色彩展示 */}
                <div className="w-full h-48 rounded-xl" style={{
              background: selectedColor.gradient
            }}></div>

                {/* 基本信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">基本信息</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">色彩名称</span>
                        <span className="font-medium">{selectedColor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">色彩代码</span>
                        <span className="font-medium font-mono">{selectedColor.hex}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">适合季节</span>
                        <span className="font-medium">{selectedColor.season}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">流行度</span>
                        <span className="font-medium">{selectedColor.popularity}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">服务信息</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">服务价格</span>
                        <span className="font-medium">¥{selectedColor.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">服务时长</span>
                        <span className="font-medium">{selectedColor.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">操作难度</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(selectedColor.difficulty)}`}>
                          {selectedColor.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">匹配度</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getMatchColor(selectedColor.match)}`}>
                          {selectedColor.match}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 推荐理由 */}
                <div>
                  <h3 className="font-semibold mb-3">推荐理由</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedColor.reason}</p>
                </div>

                {/* 标签 */}
                <div>
                  <h3 className="font-semibold mb-3">特色标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedColor.tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                        {tag}
                      </span>)}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <Button onClick={() => handleFavorite(selectedColor.id)} className="flex-1">
                    <Heart className={`w-4 h-4 mr-2 ${favorites.includes(selectedColor.id) ? 'fill-current' : ''}`} />
                    {favorites.includes(selectedColor.id) ? '已收藏' : '收藏'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 底部导航 */}
      <TabBar currentPage="personalized-recommendation" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}