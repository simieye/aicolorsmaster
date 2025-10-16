// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Sparkles, Heart, Bookmark, Share2, Filter, Search, TrendingUp, Settings, User, Palette, Star, ChevronRight, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { RecommendationCard } from '@/components/RecommendationCard';
// @ts-ignore;
import { ColorAnalysis } from '@/components/ColorAnalysis';
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
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState([]);

  // 分类选项
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'warm',
    name: '暖色调'
  }, {
    id: 'cool',
    name: '冷色调'
  }, {
    id: 'neutral',
    name: '中性色调'
  }, {
    id: 'trendy',
    name: '潮流色'
  }, {
    id: 'natural',
    name: '自然色'
  }];

  // 季节选项
  const seasons = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'spring',
    name: '春季'
  }, {
    id: 'summer',
    name: '夏季'
  }, {
    id: 'autumn',
    name: '秋季'
  }, {
    id: 'winter',
    name: '冬季'
  }];

  // 初始化数据
  useEffect(() => {
    loadUserProfile();
    loadRecommendations();
    loadUserPreferences();
  }, []);

  // 加载用户画像
  const loadUserProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // 模拟用户画像
      const mockProfile = {
        skinTone: '暖色调',
        season: '春季',
        preferences: {
          style: '自然',
          boldness: '中等',
          maintenance: '低'
        },
        history: [{
          color: '奶茶棕',
          rating: 5,
          date: '2024-01-10'
        }, {
          color: '樱花粉',
          rating: 4,
          date: '2024-01-05'
        }]
      };
      setUserProfile(mockProfile);
    }
  };

  // 加载推荐数据
  const loadRecommendations = async () => {
    setLoading(true);

    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockRecommendations = [{
      id: 1,
      colorName: '蜜桃橙',
      colorHex: '#FFB347',
      matchScore: 95,
      category: 'warm',
      season: 'spring',
      description: '温暖甜美的蜜桃橙色，非常适合春季暖色调肤色，给人温柔甜美的感觉',
      reasons: ['与您的暖色调肤色完美匹配', '春季流行色彩，时尚感强', '适合日常妆容，自然不夸张'],
      trending: true,
      isNew: false,
      price: 288,
      popularity: 892
    }, {
      id: 2,
      colorName: '樱花粉',
      colorHex: '#FFB6C1',
      matchScore: 92,
      category: 'warm',
      season: 'spring',
      description: '浪漫温柔的樱花粉色，显白效果极佳，适合追求甜美风格的用户',
      reasons: ['显白效果突出，提升气色', '符合您的春季色彩特征', '温柔甜美，适合各种场合'],
      trending: true,
      isNew: true,
      price: 268,
      popularity: 1256
    }, {
      id: 3,
      colorName: '奶茶棕',
      colorHex: '#D2B48C',
      matchScore: 88,
      category: 'neutral',
      season: 'autumn',
      description: '自然低调的奶茶棕色，日常百搭，适合追求自然风格的用户',
      reasons: ['自然低调，适合日常使用', '与您的肤色特征协调', '维护成本低，持久度高'],
      trending: false,
      isNew: false,
      price: 198,
      popularity: 2341
    }, {
      id: 4,
      colorName: '雾霾蓝',
      colorHex: '#778899',
      matchScore: 75,
      category: 'cool',
      season: 'winter',
      description: '高级感十足的雾霾蓝色，适合追求个性时尚的用户',
      reasons: ['高级感强，时尚前卫', '适合冬季使用，显白效果好', '独特个性，不易撞色'],
      trending: true,
      isNew: false,
      price: 328,
      popularity: 567
    }, {
      id: 5,
      colorName: '焦糖色',
      colorHex: '#CD853F',
      matchScore: 85,
      category: 'warm',
      season: 'autumn',
      description: '温暖醇厚的焦糖色，秋季首选，给人温暖舒适的感觉',
      reasons: ['温暖醇厚，适合秋季使用', '与您的暖色调肤色匹配', '成熟稳重，适合职场女性'],
      trending: false,
      isNew: true,
      price: 258,
      popularity: 789
    }, {
      id: 6,
      colorName: '薄荷绿',
      colorHex: '#98FB98',
      matchScore: 70,
      category: 'cool',
      season: 'summer',
      description: '清新自然的薄荷绿色，夏季首选，给人清爽舒适的感觉',
      reasons: ['清新自然，夏季首选', '独特个性，不易撞色', '适合年轻用户，活力十足'],
      trending: true,
      isNew: false,
      price: 298,
      popularity: 445
    }];
    setRecommendations(mockRecommendations);
    setFilteredRecommendations(mockRecommendations);
    setLoading(false);
  };

  // 加载用户偏好
  const loadUserPreferences = () => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedLikes = localStorage.getItem('likes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedLikes) {
      setLikes(JSON.parse(savedLikes));
    }
  };

  // 筛选推荐
  useEffect(() => {
    let filtered = recommendations;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(rec => rec.category === selectedCategory);
    }

    // 按季节筛选
    if (selectedSeason !== 'all') {
      filtered = filtered.filter(rec => rec.season === selectedSeason);
    }

    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(rec => rec.colorName.toLowerCase().includes(searchTerm.toLowerCase()) || rec.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'price':
          return a.price - b.price;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        default:
          return 0;
      }
    });
    setFilteredRecommendations(filtered);
  }, [recommendations, selectedCategory, selectedSeason, searchTerm, sortBy]);

  // 处理分析完成
  const handleAnalysisComplete = result => {
    // 根据分析结果更新推荐
    const updatedRecommendations = recommendations.map(rec => {
      let newMatchScore = rec.matchScore;
      if (result.skinTone === '暖色调' && rec.category === 'warm') {
        newMatchScore = Math.min(100, rec.matchScore + 10);
      } else if (result.skinTone === '冷色调' && rec.category === 'cool') {
        newMatchScore = Math.min(100, rec.matchScore + 10);
      } else if (result.skinTone === '暖色调' && rec.category === 'cool') {
        newMatchScore = Math.max(0, rec.matchScore - 10);
      } else if (result.skinTone === '冷色调' && rec.category === 'warm') {
        newMatchScore = Math.max(0, rec.matchScore - 10);
      }
      return {
        ...rec,
        matchScore: newMatchScore
      };
    });
    setRecommendations(updatedRecommendations);
    toast({
      title: "分析完成",
      description: "已根据您的分析结果更新推荐"
    });
  };

  // 处理点赞
  const handleLike = id => {
    const newLikes = likes.includes(id) ? likes.filter(likeId => likeId !== id) : [...likes, id];
    setLikes(newLikes);
    localStorage.setItem('likes', JSON.stringify(newLikes));
    toast({
      title: likes.includes(id) ? "取消点赞" : "点赞成功",
      description: likes.includes(id) ? "已取消点赞" : "已添加到喜欢列表"
    });
  };

  // 处理收藏
  const handleFavorite = id => {
    const newFavorites = favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    toast({
      title: favorites.includes(id) ? "取消收藏" : "收藏成功",
      description: favorites.includes(id) ? "已取消收藏" : "已添加到收藏列表"
    });
  };

  // 处理分享
  const handleShare = recommendation => {
    if (navigator.share) {
      navigator.share({
        title: `${recommendation.colorName} - 个性化推荐`,
        text: recommendation.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${recommendation.colorName}: ${recommendation.description}`);
      toast({
        title: "复制成功",
        description: "推荐信息已复制到剪贴板"
      });
    }
  };

  // 处理查看详情
  const handleView = recommendation => {
    // 跳转到详情页面
    $w.utils.navigateTo({
      pageId: 'products',
      params: {
        productId: recommendation.id,
        colorName: recommendation.colorName
      }
    });
  };

  // 刷新推荐
  const refreshRecommendations = () => {
    setLoading(true);
    loadRecommendations();
    toast({
      title: "推荐已更新",
      description: "已为您刷新个性化推荐"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">个性化色彩推荐</h1>
          <p className="text-gray-600">基于AI算法和您的特征，为您推荐最适合的色彩方案</p>
        </div>

        {/* 用户画像卡片 */}
        {userProfile && <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                您的色彩画像
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">肤色类型</p>
                  <p className="font-medium">{userProfile.skinTone}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">适合季节</p>
                  <p className="font-medium">{userProfile.season}型</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">风格偏好</p>
                  <p className="font-medium">{userProfile.preferences.style}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600">历史评价</p>
                  <p className="font-medium">4.5分</p>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* 智能分析 */}
        <div className="mb-8">
          <ColorAnalysis onAnalysisComplete={handleAnalysisComplete} onSkinToneDetected={skinTone => {
          setUserProfile(prev => prev ? {
            ...prev,
            skinTone
          } : null);
        }} />
        </div>

        {/* 筛选和搜索 */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="搜索色彩名称或描述..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              {/* 分类筛选 */}
              <div className="flex gap-2">
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>

                <select value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {seasons.map(season => <option key={season.id} value={season.id}>{season.name}</option>)}
                </select>

                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="match">匹配度</option>
                  <option value="popularity">人气</option>
                  <option value="price">价格</option>
                  <option value="trending">热门</option>
                </select>

                <Button onClick={refreshRecommendations} disabled={loading} variant="outline" className="flex items-center">
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 推荐列表 */}
        {loading ? <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">正在为您生成个性化推荐...</p>
          </div> : <>
            {filteredRecommendations.length === 0 ? <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">没有找到匹配的推荐</p>
                <Button onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedSeason('all');
          }} variant="outline" className="mt-4">
                  清除筛选条件
                </Button>
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecommendations.map(recommendation => <RecommendationCard key={recommendation.id} recommendation={recommendation} onLike={handleLike} onFavorite={handleFavorite} onView={handleView} onShare={handleShare} />)}
              </div>}
          </>}

        {/* 推荐统计 */}
        {!loading && filteredRecommendations.length > 0 && <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              为您找到 <span className="font-medium text-purple-600">{filteredRecommendations.length}</span> 个个性化推荐
              {likes.length > 0 && <>，已喜欢 <span className="font-medium text-red-500">{likes.length}</span> 个</>}
              {favorites.length > 0 && <>，已收藏 <span className="font-medium text-yellow-500">{favorites.length}</span> 个</>}
            </p>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="personalized-recommendation" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}