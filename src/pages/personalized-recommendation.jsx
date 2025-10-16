// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { Sparkles, Heart, Star, TrendingUp, Filter, ChevronLeft, Palette, Users, BarChart3, Zap } from 'lucide-react';

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
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  // 模拟用户数据
  useEffect(() => {
    setUserProfile({
      skinTone: 'warm',
      hairType: 'normal',
      preferences: ['purple', 'blue', 'pink'],
      history: ['微潮紫', '樱花粉', '雾霾蓝'],
      season: 'spring'
    });

    // 模拟推荐数据
    setRecommendations([{
      id: 1,
      name: '薰衣草紫',
      hex: '#E6E6FA',
      category: 'purple',
      match: 95,
      reason: '根据您的肤色历史偏好推荐',
      trend: 'up',
      popularity: 89,
      image: 'https://images.unsplash.com/photo-1562322140-3b7c543c6b0e?w=300&h=200&fit=crop'
    }, {
      id: 2,
      name: '薄荷绿',
      hex: '#98FB98',
      category: 'green',
      match: 88,
      reason: '春季流行色彩，适合您的肤色',
      trend: 'up',
      popularity: 76,
      image: 'https://images.unsplash.com/photo-1560069007-1cbae254d414?w=300&h=200&fit=crop'
    }, {
      id: 3,
      name: '珊瑚橙',
      hex: '#FF7F50',
      category: 'orange',
      match: 82,
      reason: '与您的历史偏好相似',
      trend: 'stable',
      popularity: 68,
      image: 'https://images.unsplash.com/photo-1549558943-7162b4c5b6c5?w=300&h=200&fit=crop'
    }, {
      id: 4,
      name: '雾霾蓝',
      hex: '#778899',
      category: 'blue',
      match: 78,
      reason: '适合您的肤色类型',
      trend: 'down',
      popularity: 71,
      image: 'https://images.unsplash.com/photo-1562322140-3b7c543c6b0e?w=300&h=200&fit=crop'
    }, {
      id: 5,
      name: '奶茶棕',
      hex: '#D2B48C',
      category: 'brown',
      match: 75,
      reason: '自然低调，适合日常',
      trend: 'up',
      popularity: 85,
      image: 'https://images.unsplash.com/photo-1562322140-3b7c543c6b0e?w=300&h=200&fit=crop'
    }, {
      id: 6,
      name: '樱花粉',
      hex: '#FFB6C1',
      category: 'pink',
      match: 92,
      reason: '您的历史偏好色系',
      trend: 'stable',
      popularity: 79,
      image: 'https://images.unsplash.com/photo-1549558943-7162b4c5b6c5?w=300&h=200&fit=crop'
    }]);
  }, []);
  const categories = [{
    id: 'all',
    name: '全部',
    icon: Palette
  }, {
    id: 'purple',
    name: '紫色系',
    icon: Sparkles
  }, {
    id: 'blue',
    name: '蓝色系',
    icon: Zap
  }, {
    id: 'pink',
    name: '粉色系',
    icon: Heart
  }, {
    id: 'green',
    name: '绿色系',
    icon: TrendingUp
  }, {
    id: 'orange',
    name: '橙色系',
    icon: Star
  }, {
    id: 'brown',
    name: '棕色系',
    icon: Users
  }];
  const filteredRecommendations = selectedCategory === 'all' ? recommendations : recommendations.filter(item => item.category === selectedCategory);
  const handleColorSelect = color => {
    toast({
      title: "色彩选择",
      description: `您选择了${color.name}，正在生成配方...`
    });
  };
  const handleLike = colorId => {
    setRecommendations(prev => prev.map(item => item.id === colorId ? {
      ...item,
      liked: !item.liked
    } : item));
    toast({
      title: "收藏成功",
      description: "已添加到您的收藏"
    });
  };
  const refreshRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "刷新成功",
        description: "已更新推荐内容"
      });
    }, 1500);
  };
  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => $w.utils.navigateBack()} className="p-2 hover:bg-gray-100 rounded-lg mr-3">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h1 className="text-lg font-semibold">个性化推荐</h1>
            </div>
          </div>
          <button onClick={refreshRecommendations} className="p-2 hover:bg-gray-100 rounded-lg" disabled={loading}>
            <Filter className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 用户画像 */}
        {userProfile && <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">您的色彩画像</h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  AI分析
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-600">肤色类型</div>
                  <div className="font-medium">暖色调</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">发质类型</div>
                  <div className="font-medium">正常发质</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">偏好色系</div>
                  <div className="font-medium">紫色系</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">季节推荐</div>
                  <div className="font-medium">春季</div>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* 分类筛选 */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => {
            const Icon = category.icon;
            return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === category.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:border-purple-500'}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </button>;
          })}
          </div>
        </div>

        {/* 推荐列表 */}
        <div className="space-y-4">
          {filteredRecommendations.map(color => <Card key={color.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <img src={color.image} alt={color.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{color.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300" style={{
                        backgroundColor: color.hex
                      }}></div>
                          <span className="text-sm text-gray-600">{color.hex}</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {color.match}% 匹配
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleLike(color.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Heart className={`w-5 h-5 ${color.liked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{color.reason}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(color.trend)}
                          <span className="text-xs text-gray-600">趋势</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-600">{color.popularity}% 热度</span>
                        </div>
                      </div>
                      <Button onClick={() => handleColorSelect(color)} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        选择
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 加载更多 */}
        <div className="text-center mt-8">
          <Button variant="outline" className="bg-white hover:bg-gray-50" onClick={refreshRecommendations} disabled={loading}>
            {loading ? '加载中...' : '加载更多推荐'}
          </Button>
        </div>
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