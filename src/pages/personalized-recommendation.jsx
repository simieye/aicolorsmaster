// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Sparkles, User, Palette, Heart, Star, TrendingUp, Loader2, RefreshCw, Filter, Search } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function PersonalizedRecommendationPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    hairType: 'normal',
    skinTone: 'medium',
    preferredColors: [],
    previousProducts: [],
    allergies: []
  });
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    brand: 'all'
  });
  useEffect(() => {
    loadRecommendations();
  }, []);
  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const currentUser = $w?.auth?.currentUser;
      const userProfileData = {
        hairType: userProfile.hairType,
        skinTone: userProfile.skinTone,
        preferredColors: userProfile.preferredColors,
        previousProducts: userProfile.previousProducts,
        allergies: userProfile.allergies,
        userId: currentUser?.userId,
        userName: currentUser?.nickName || currentUser?.name
      };
      const aiRecommendations = await deepseekService.getProductRecommendations(userProfileData, filters);
      setRecommendations(aiRecommendations.recommendations || []);
    } catch (error) {
      console.error('加载推荐失败:', error);
      toast({
        title: "加载失败",
        description: "无法获取个性化推荐",
        variant: "destructive"
      });
      // 设置默认推荐
      setRecommendations([{
        name: 'AI智能染发剂',
        reason: '基于您的偏好推荐',
        suitable: '所有发质',
        notes: '请按照说明书使用',
        price: 199,
        rating: 4.8,
        image: 'https://picsum.photos/seed/ai-dye/200/200.jpg'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRefresh = () => {
    loadRecommendations();
  };
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="个性化推荐" showBack={true} />
        
        <div className="pb-20">
          {/* 用户信息卡片 */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI个性化推荐</h1>
              </div>
              <p className="text-purple-100 mb-4">
                基于您的个人信息和偏好，AI为您推荐最适合的产品
              </p>
              
              {/* 用户偏好设置 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">发质类型</label>
                  <select value={userProfile.hairType} onChange={e => handleProfileUpdate('hairType', e.target.value)} className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <option value="normal">正常发质</option>
                    <option value="dry">干性发质</option>
                    <option value="oily">油性发质</option>
                    <option value="damaged">受损发质</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">肤色</label>
                  <select value={userProfile.skinTone} onChange={e => handleProfileUpdate('skinTone', e.target.value)} className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <option value="fair">白皙</option>
                    <option value="medium">中等</option>
                    <option value="olive">橄榄色</option>
                    <option value="dark">深色</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">价格范围</label>
                  <select value={filters.priceRange} onChange={e => handleFilterChange('priceRange', e.target.value)} className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <option value="all">全部</option>
                    <option value="0-100">0-100元</option>
                    <option value="100-300">100-300元</option>
                    <option value="300+">300元以上</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">产品类别</label>
                  <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)} className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <option value="all">全部</option>
                    <option value="dye">染发剂</option>
                    <option value="tools">工具</option>
                    <option value="accessories">配件</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-4">
            {/* 操作按钮 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">为您推荐</h2>
              <Button onClick={handleRefresh} disabled={isLoading} variant="outline">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                刷新推荐
              </Button>
            </div>

            {/* 推荐列表 */}
            {isLoading ? <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div> : recommendations.length === 0 ? <div className="text-center py-12">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">暂无推荐产品</p>
                <Button className="mt-4" onClick={loadRecommendations}>
                  重新加载
                </Button>
              </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((product, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={product.image || 'https://picsum.photos/seed/product' + index + '/200/200.jpg'} alt={product.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        AI推荐
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{product.rating || '4.5'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reason}</p>
                        <div className="text-sm">
                          <span className="font-medium">适合：</span>{product.suitable}
                        </div>
                        {product.price && <div className="text-lg font-semibold text-purple-600">
                            ¥{product.price}
                          </div>}
                      </div>
                      <div className="text-xs text-muted-foreground mb-4">
                        <strong>注意事项：</strong>{product.notes}
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1">
                          查看详情
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}