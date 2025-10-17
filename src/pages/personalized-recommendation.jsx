// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Sparkles, User, Palette, Camera, Heart, Star, TrendingUp, Clock, Filter, Search, Settings, ChevronRight, CheckCircle, XCircle, AlertCircle, BarChart3, Target, Zap, Award, ThumbsUp, ThumbsDown, Share2, Bookmark, Eye, MessageCircle } from 'lucide-react';

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
  const [userProfile, setUserProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorDetail, setShowColorDetail] = useState(false);
  const [showSkinAnalysis, setShowSkinAnalysis] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // 初始化数据
  useEffect(() => {
    // 模拟用户画像数据
    setUserProfile({
      name: '时尚达人',
      age: 25,
      skinTone: '暖色调',
      style: '时尚潮流',
      profession: '创意工作者',
      preferences: ['大胆创新', '时尚前卫', '个性鲜明'],
      historyCount: 12,
      satisfactionRate: 92,
      lastUpdate: '2024-01-15'
    });

    // 模拟推荐数据
    setRecommendations([{
      id: 1,
      name: '微潮紫',
      hex: '#9B59B6',
      category: '时尚潮流',
      match: 95,
      reason: '适合您的暖色调肤色，符合时尚前卫风格',
      trends: ['2024春季流行', '明星同款', '社交媒体热门'],
      occasions: ['日常', '聚会', '工作'],
      difficulty: '中等',
      price: '¥280-380',
      image: 'https://images.unsplash.com/photo-1560066985-274c6a8a3f5a?w=300&h=400&fit=crop',
      favorite: false,
      feedback: {
        likes: 245,
        dislikes: 12,
        comments: 38
      }
    }, {
      id: 2,
      name: '樱花粉',
      hex: '#FFB6C1',
      category: '温柔甜美',
      match: 88,
      reason: '温柔甜美风格，适合春季氛围',
      trends: ['春季主打', '韩流风尚', '温柔系'],
      occasions: ['约会', '购物', '休闲'],
      difficulty: '简单',
      price: '¥200-300',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop',
      favorite: true,
      feedback: {
        likes: 189,
        dislikes: 8,
        comments: 25
      }
    }, {
      id: 3,
      name: '薄荷绿',
      hex: '#98FB98',
      category: '清新自然',
      match: 82,
      reason: '清新自然，适合春夏季节',
      trends: ['夏季清新', '自然风', '小众推荐'],
      occasions: ['度假', '户外', '运动'],
      difficulty: '简单',
      price: '¥180-280',
      image: 'https://images.unsplash.com/photo-1559568495-17e4a6ca8c0f?w=300&h=400&fit=crop',
      favorite: false,
      feedback: {
        likes: 156,
        dislikes: 15,
        comments: 19
      }
    }, {
      id: 4,
      name: '焦糖棕',
      hex: '#CD853F',
      category: '自然优雅',
      match: 78,
      reason: '自然优雅，适合职场环境',
      trends: ['职场经典', '成熟稳重', '百搭色'],
      occasions: ['工作', '商务', '正式'],
      difficulty: '简单',
      price: '¥150-250',
      image: 'https://images.unsplash.com/photo-1559409645-6e5d2b0c2a5a?w=300&h=400&fit=crop',
      favorite: false,
      feedback: {
        likes: 203,
        dislikes: 6,
        comments: 31
      }
    }]);

    // 模拟肤色分析数据
    setSkinAnalysis({
      skinTone: '暖色调',
      undertone: '黄色调',
      contrast: '中等对比度',
      suitableColors: ['暖色系', '大地色系', '柔和色调'],
      avoidColors: ['冷色系', '过于鲜艳的颜色'],
      bestMatches: ['微潮紫', '焦糖棕', '奶茶色'],
      analysisDate: '2024-01-15',
      confidence: 94
    });

    // 模拟偏好设置数据
    setPreferences({
      style: ['时尚潮流', '个性鲜明'],
      occasions: ['日常', '聚会', '工作'],
      colorFamilies: ['紫色系', '粉色系', '棕色系'],
      intensity: '中等',
      maintenance: '低维护',
      budget: '200-400',
      frequency: '3-6个月'
    });

    // 模拟反馈数据
    setFeedback([{
      id: 1,
      colorName: '微潮紫',
      rating: 5,
      comment: '非常满意！颜色很衬肤色，朋友都说好看',
      date: '2024-01-15',
      helpful: 12
    }, {
      id: 2,
      colorName: '樱花粉',
      rating: 4,
      comment: '颜色很温柔，就是保持时间有点短',
      date: '2024-01-12',
      helpful: 8
    }]);
  }, []);

  // 处理色彩选择
  const handleColorSelect = color => {
    setSelectedColor(color);
    setShowColorDetail(true);
  };

  // 处理收藏
  const handleFavorite = colorId => {
    setRecommendations(prev => prev.map(color => color.id === colorId ? {
      ...color,
      favorite: !color.favorite
    } : color));
    toast({
      title: "收藏成功",
      description: "已添加到收藏夹"
    });
  };

  // 处理反馈
  const handleFeedback = (colorId, type) => {
    setRecommendations(prev => prev.map(color => {
      if (color.id === colorId) {
        if (type === 'like') {
          return {
            ...color,
            feedback: {
              ...color.feedback,
              likes: color.feedback.likes + 1
            }
          };
        } else {
          return {
            ...color,
            feedback: {
              ...color.feedback,
              dislikes: color.feedback.dislikes + 1
            }
          };
        }
      }
      return color;
    }));
    toast({
      title: "反馈成功",
      description: "感谢您的反馈"
    });
  };

  // 处理分享
  const handleShare = color => {
    toast({
      title: "分享成功",
      description: `正在分享${color.name}的色彩推荐`
    });
  };

  // 处理肤色分析
  const handleSkinAnalysis = () => {
    setShowSkinAnalysis(true);
    toast({
      title: "肤色分析",
      description: "正在进行智能肤色分析..."
    });
  };

  // 处理偏好设置
  const handlePreferences = () => {
    setShowPreferences(true);
  };

  // 过滤推荐
  const filteredRecommendations = recommendations.filter(color => {
    const matchesSearch = color.name.toLowerCase().includes(searchTerm.toLowerCase()) || color.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || color.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // 渲染推荐列表
  const renderRecommendations = () => {
    return <div className="space-y-6">
        {/* 用户画像卡片 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{userProfile?.name}</h3>
                  <p className="text-sm text-gray-600">个性化色彩推荐</p>
                </div>
              </div>
              <Button onClick={handlePreferences} variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                偏好设置
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{userProfile?.satisfactionRate}%</p>
                <p className="text-sm text-gray-600">满意度</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{userProfile?.historyCount}</p>
                <p className="text-sm text-gray-600">历史记录</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{recommendations.filter(r => r.match >= 90).length}</p>
                <p className="text-sm text-gray-600">高匹配度</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{recommendations.filter(r => r.favorite).length}</p>
                <p className="text-sm text-gray-600">收藏数量</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 肤色分析卡片 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Camera className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold">肤色分析</h3>
              </div>
              <Button onClick={handleSkinAnalysis} className="bg-purple-600 hover:bg-purple-700">
                <Camera className="w-4 h-4 mr-2" />
                重新分析
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">您的肤色特征</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">肤色色调</span>
                    <span className="text-sm font-medium">{skinAnalysis?.skinTone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">底色调</span>
                    <span className="text-sm font-medium">{skinAnalysis?.undertone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">对比度</span>
                    <span className="text-sm font-medium">{skinAnalysis?.contrast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">分析置信度</span>
                    <span className="text-sm font-medium">{skinAnalysis?.confidence}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">推荐色彩类型</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{skinAnalysis?.suitableColors.join('、')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{skinAnalysis?.avoidColors.join('、')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="搜索色彩..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              
              <div className="flex space-x-2">
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">全部分类</option>
                  <option value="时尚潮流">时尚潮流</option>
                  <option value="温柔甜美">温柔甜美</option>
                  <option value="清新自然">清新自然</option>
                  <option value="自然优雅">自然优雅</option>
                </select>
                
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 推荐色彩列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map(color => <Card key={color.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img src={color.image} alt={color.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium">{color.match}% 匹配</span>
                  </div>
                  <button onClick={() => handleFavorite(color.id)} className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className={`w-4 h-4 ${color.favorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{color.name}</h3>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300" style={{
                  backgroundColor: color.hex
                }}></div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {color.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {color.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{color.reason}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{color.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{(color.feedback.likes / (color.feedback.likes + color.feedback.dislikes) * 5).toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={() => handleColorSelect(color)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Eye className="w-4 h-4 mr-2" />
                      查看详情
                    </Button>
                    <Button onClick={() => handleShare(color)} variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-3">
                      <button onClick={() => handleFeedback(color.id, 'like')} className="flex items-center space-x-1 text-green-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{color.feedback.likes}</span>
                      </button>
                      <button onClick={() => handleFeedback(color.id, 'dislike')} className="flex items-center space-x-1 text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm">{color.feedback.dislikes}</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-1 text-blue-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{color.feedback.comments}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>;
  };

  // 渲染色彩详情
  const renderColorDetail = () => {
    if (!selectedColor) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{selectedColor.name}</h3>
              <button onClick={() => setShowColorDetail(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={selectedColor.image} alt={selectedColor.name} className="w-full h-64 object-cover rounded-lg" />
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-300" style={{
                  backgroundColor: selectedColor.hex
                }}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">色彩信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">色号</span>
                      <span className="text-sm font-medium">{selectedColor.hex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">分类</span>
                      <span className="text-sm font-medium">{selectedColor.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">难度</span>
                      <span className="text-sm font-medium">{selectedColor.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">价格区间</span>
                      <span className="text-sm font-medium">{selectedColor.price}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">推荐理由</h4>
                  <p className="text-sm text-gray-600">{selectedColor.reason}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">流行趋势</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedColor.trends.map((trend, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {trend}
                      </span>)}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">适用场合</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedColor.occasions.map((occasion, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {occasion}
                      </span>)}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={() => handleFavorite(selectedColor.id)} className="flex-1">
                    <Heart className={`w-4 h-4 mr-2 ${selectedColor.favorite ? 'fill-current' : ''}`} />
                    {selectedColor.favorite ? '已收藏' : '收藏'}
                  </Button>
                  <Button onClick={() => handleShare(selectedColor)} variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };

  // 渲染肤色分析弹窗
  const renderSkinAnalysisModal = () => {
    if (!showSkinAnalysis) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">肤色分析</h3>
              <button onClick={() => setShowSkinAnalysis(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-16 h-16 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">智能肤色分析</h4>
              <p className="text-sm text-gray-600">基于AI技术的精准肤色识别</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium mb-2">分析结果</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">肤色色调</span>
                    <span className="text-sm font-medium">{skinAnalysis?.skinTone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">底色调</span>
                    <span className="text-sm font-medium">{skinAnalysis?.undertone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">对比度</span>
                    <span className="text-sm font-medium">{skinAnalysis?.contrast}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium mb-2">推荐色彩</h5>
                <div className="flex flex-wrap gap-2">
                  {skinAnalysis?.bestMatches.map((color, index) => <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {color}
                    </span>)}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={() => setShowSkinAnalysis(false)} className="flex-1">
                  完成
                </Button>
                <Button onClick={() => {
                setShowSkinAnalysis(false);
                toast({
                  title: "重新分析",
                  description: "请上传清晰的面部照片"
                });
              }} variant="outline" className="flex-1">
                  重新分析
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };

  // 渲染偏好设置弹窗
  const renderPreferencesModal = () => {
    if (!showPreferences) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">偏好设置</h3>
              <button onClick={() => setShowPreferences(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">风格偏好</h4>
                <div className="space-y-2">
                  {['时尚潮流', '温柔甜美', '清新自然', '自然优雅', '个性鲜明'].map(style => <label key={style} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={preferences?.style.includes(style)} className="rounded" />
                      <span className="text-sm">{style}</span>
                    </label>)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">使用场合</h4>
                <div className="space-y-2">
                  {['日常', '工作', '聚会', '约会', '度假', '运动'].map(occasion => <label key={occasion} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={preferences?.occasions.includes(occasion)} className="rounded" />
                      <span className="text-sm">{occasion}</span>
                    </label>)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">预算范围</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>100-200</option>
                  <option>200-400</option>
                  <option>400-600</option>
                  <option>600+</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">维护频率</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>1-2个月</option>
                  <option>3-6个月</option>
                  <option>6-12个月</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={() => setShowPreferences(false)} className="flex-1">
                  保存设置
                </Button>
                <Button onClick={() => setShowPreferences(false)} variant="outline" className="flex-1">
                  取消
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };
  return <>
      <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
        <div className="container mx-auto px-4 py-8">
          {/* 页面头部 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">个性化推荐</h1>
            <p className="text-gray-600">基于AI算法的智能色彩推荐系统</p>
          </div>

          {/* 标签导航 */}
          <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {[{
              id: 'recommendations',
              name: '智能推荐',
              icon: Sparkles
            }, {
              id: 'history',
              name: '历史记录',
              icon: Clock
            }, {
              id: 'feedback',
              name: '反馈中心',
              icon: MessageCircle
            }, {
              id: 'trends',
              name: '流行趋势',
              icon: TrendingUp
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
          {activeTab === 'history' && <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">历史记录</h3>
              <p className="text-gray-600">您的历史染发记录将在这里显示</p>
            </div>}
          {activeTab === 'feedback' && <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">反馈中心</h3>
              <p className="text-gray-600">查看和管理您的反馈记录</p>
            </div>}
          {activeTab === 'trends' && <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">流行趋势</h3>
              <p className="text-gray-600">了解最新的染发色彩趋势</p>
            </div>}
        </div>
      </div>

      {/* 色彩详情弹窗 */}
      {showColorDetail && renderColorDetail()}

      {/* 肤色分析弹窗 */}
      {showSkinAnalysis && renderSkinAnalysisModal()}

      {/* 偏好设置弹窗 */}
      {showPreferences && renderPreferencesModal()}

      {/* 底部导航 */}
      <TabBar currentPage="personalized-recommendation" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </>;
}