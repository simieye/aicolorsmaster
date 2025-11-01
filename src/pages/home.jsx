// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, ShoppingCart, Heart, Star, Sparkles, TrendingUp, Clock, Eye, RefreshCw, Settings, Loader2, Brain, BookOpen, Calendar, Gift, Users, Zap } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { HomeHero } from '@/components/HomeHero';
// @ts-ignore;
import { StatsCards } from '@/components/StatsCards';
// @ts-ignore;
import { ProductShowcase } from '@/components/ProductShowcase';
// @ts-ignore;
import { QuickActions } from '@/components/QuickActions';
// @ts-ignore;
import { RecentActivity } from '@/components/RecentActivity';

// @ts-ignore;

export default function HomePage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [recommendations, setRecommendations] = useState({
    products: [],
    services: [],
    content: [],
    activities: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userBehavior, setUserBehavior] = useState({
    viewedProducts: [],
    purchaseHistory: [],
    favorites: [],
    searchHistory: [],
    timeSpent: {}
  });
  useEffect(() => {
    loadUserBehavior();
    loadPersonalizedRecommendations();
  }, []);
  const loadUserBehavior = () => {
    // 从本地存储或用户数据中获取行为数据
    const saved = localStorage.getItem('userBehavior');
    if (saved) {
      setUserBehavior(JSON.parse(saved));
    } else {
      // 模拟用户行为数据
      setUserBehavior({
        viewedProducts: ['PROD001', 'PROD003', 'PROD005'],
        purchaseHistory: ['PROD002'],
        favorites: ['PROD001', 'PROD004'],
        searchHistory: ['染发剂', '天然染发', 'AI染发'],
        timeSpent: {
          'PROD001': 120,
          'PROD003': 85
        }
      });
    }
  };
  const loadPersonalizedRecommendations = async () => {
    setIsLoading(true);
    try {
      const currentUser = $w?.auth?.currentUser;
      const userProfile = {
        userId: currentUser?.userId,
        userName: currentUser?.nickName || currentUser?.name,
        behavior: userBehavior,
        preferences: {
          categories: ['hair-dye', 'tools'],
          priceRange: '100-300',
          brandPreference: ['AI智能', '天然'],
          colorPreference: ['棕色', '黑色']
        }
      };

      // 生成多维度推荐
      const [productRecs, serviceRecs, contentRecs, activityRecs] = await Promise.allSettled([generateProductRecommendations(userProfile), generateServiceRecommendations(userProfile), generateContentRecommendations(userProfile), generateActivityRecommendations(userProfile)]);
      setRecommendations({
        products: productRecs.status === 'fulfilled' ? productRecs.value : [],
        services: serviceRecs.status === 'fulfilled' ? serviceRecs.value : [],
        content: contentRecs.status === 'fulfilled' ? contentRecs.value : [],
        activities: activityRecs.status === 'fulfilled' ? activityRecs.value : []
      });
    } catch (error) {
      console.error('加载个性化推荐失败:', error);
      // 设置默认推荐
      setDefaultRecommendations();
    } finally {
      setIsLoading(false);
    }
  };
  const generateProductRecommendations = async userProfile => {
    try {
      const response = await deepseekService.getProductRecommendations(userProfile, {
        type: 'home_page',
        limit: 6
      });
      return response.recommendations || [];
    } catch (error) {
      // 返回默认产品推荐
      return [{
        name: 'AI智能染发剂',
        reason: '基于您的浏览历史推荐',
        price: 199,
        rating: 4.8,
        image: 'https://picsum.photos/seed/home-rec1/200/200.jpg',
        productId: 'PROD001',
        tags: ['AI推荐', '热销']
      }];
    }
  };
  const generateServiceRecommendations = async userProfile => {
    try {
      const prompt = `基于用户信息推荐相关服务：
用户信息：${JSON.stringify(userProfile)}
请推荐3-4个适合的服务，包含服务名称、描述、推荐理由、价格等信息。
以JSON格式返回。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的服务推荐专家，根据用户需求推荐最适合的服务。'
      }, {
        role: 'user',
        content: prompt
      }]);
      try {
        return JSON.parse(response);
      } catch (e) {
        return getDefaultServiceRecommendations();
      }
    } catch (error) {
      return getDefaultServiceRecommendations();
    }
  };
  const generateContentRecommendations = async userProfile => {
    try {
      const prompt = `基于用户兴趣推荐相关内容：
用户信息：${JSON.stringify(userProfile)}
请推荐3-4篇相关文章或教程，包含标题、简介、推荐理由、阅读时间等。
以JSON格式返回。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的内容推荐专家，根据用户兴趣推荐有价值的内容。'
      }, {
        role: 'user',
        content: prompt
      }]);
      try {
        return JSON.parse(response);
      } catch (e) {
        return getDefaultContentRecommendations();
      }
    } catch (error) {
      return getDefaultContentRecommendations();
    }
  };
  const generateActivityRecommendations = async userProfile => {
    try {
      const prompt = `基于用户行为推荐相关活动：
用户信息：${JSON.stringify(userProfile)}
请推荐2-3个适合的活动，包含活动名称、描述、时间、推荐理由等。
以JSON格式返回。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的活动推荐专家，根据用户兴趣推荐有价值的活动。'
      }, {
        role: 'user',
        content: prompt
      }]);
      try {
        return JSON.parse(response);
      } catch (e) {
        return getDefaultActivityRecommendations();
      }
    } catch (error) {
      return getDefaultActivityRecommendations();
    }
  };
  const getDefaultServiceRecommendations = () => {
    return [{
      name: 'AI染发咨询',
      description: '专业AI顾问为您提供个性化染发建议',
      reason: '根据您的浏览记录推荐',
      price: '免费',
      icon: <Brain className="w-6 h-6" />,
      tags: ['AI服务', '免费咨询']
    }, {
      name: '色彩搭配服务',
      description: '专业色彩师为您定制专属配色方案',
      reason: '适合追求个性化的您',
      price: '¥99',
      icon: <Sparkles className="w-6 h-6" />,
      tags: ['专业服务', '定制化']
    }];
  };
  const getDefaultContentRecommendations = () => {
    return [{
      title: '2024年染发趋势解析',
      description: '了解今年最流行的染发色彩和技巧',
      reason: '基于您对染发的兴趣推荐',
      readTime: '5分钟',
      category: '趋势分析',
      image: 'https://picsum.photos/seed/content1/300/200.jpg'
    }, {
      title: '天然染发剂使用指南',
      description: '详细介绍天然染发剂的选择和使用方法',
      reason: '您关注天然染发产品',
      readTime: '8分钟',
      category: '使用指南',
      image: 'https://picsum.photos/seed/content2/300/200.jpg'
    }];
  };
  const getDefaultActivityRecommendations = () => {
    return [{
      name: 'AI染发体验日',
      description: '现场体验AI智能染发技术，享受专属优惠',
      reason: '新用户专享活动',
      date: '2024-01-15',
      location: '北京旗舰店',
      tags: ['线下活动', '新用户']
    }];
  };
  const setDefaultRecommendations = () => {
    setRecommendations({
      products: [{
        name: 'AI智能染发剂',
        reason: '基于您的浏览历史推荐',
        price: 199,
        rating: 4.8,
        image: 'https://picsum.photos/seed/home-rec1/200/200.jpg',
        productId: 'PROD001',
        tags: ['AI推荐', '热销']
      }],
      services: getDefaultServiceRecommendations(),
      content: getDefaultContentRecommendations(),
      activities: getDefaultActivityRecommendations()
    });
  };
  const handleRefreshRecommendations = () => {
    loadPersonalizedRecommendations();
  };
  const handleRecommendationClick = (type, item) => {
    // 记录用户点击行为
    const newBehavior = {
      ...userBehavior,
      [`${type}Clicks`]: [...(userBehavior[`${type}Clicks`] || []), item.id || item.name]
    };
    setUserBehavior(newBehavior);
    localStorage.setItem('userBehavior', JSON.stringify(newBehavior));

    // 根据类型跳转到相应页面
    if ($w && $w.utils) {
      switch (type) {
        case 'products':
          if (item.productId) {
            $w.utils.navigateTo({
              pageId: 'product-detail',
              params: {
                productId: item.productId
              }
            });
          }
          break;
        case 'services':
          $w.utils.navigateTo({
            pageId: 'ai-chat'
          });
          break;
        case 'content':
          // 跳转到文章详情页
          break;
        case 'activities':
          // 跳转到活动详情页
          break;
        default:
          break;
      }
    }
  };
  const handleFeedback = (type, itemId, feedback) => {
    // 记录用户反馈
    console.log('推荐反馈:', type, itemId, feedback);
    toast({
      title: "感谢反馈",
      description: "您的反馈将帮助我们改进推荐算法"
    });
  };
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation showSearch={true} />
        
        <div className="pb-20">
          {/* 个性化推荐头部 */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-8 h-8" />
                  <h1 className="text-2xl font-bold">为您推荐</h1>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    AI智能分析
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRefreshRecommendations} disabled={isLoading} className="text-white hover:bg-white/10">
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-blue-100">
                基于您的浏览历史和偏好，AI为您精选最合适的产品和服务
              </p>
            </div>
          </div>

          {/* 产品推荐 */}
          {recommendations.products.length > 0 && <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                  <span>推荐产品</span>
                </h2>
                <Button variant="outline" size="sm" onClick={() => $w?.utils?.navigateTo({
              pageId: 'products'
            })}>
                  查看更多
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recommendations.products.map((product, index) => <div key={index} className="bg-card border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('products', product)}>
                    <div className="relative mb-2">
                      <img src={product.image || 'https://picsum.photos/seed/home-product' + index + '/200/200.jpg'} alt={product.name} className="w-full h-24 object-cover rounded" />
                      <div className="absolute top-1 right-1 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI推荐</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.reason}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-red-500">¥{product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-1">
                      <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                  e.stopPropagation();
                  handleFeedback('products', product.id, 'like');
                }}>
                        👍
                      </Button>
                      <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                  e.stopPropagation();
                  handleFeedback('products', product.id, 'dislike');
                }}>
                        👎
                      </Button>
                    </div>
                  </div>)}
              </div>
            </div>}

          {/* 服务推荐 */}
          {recommendations.services.length > 0 && <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>推荐服务</span>
                </h2>
                <Button variant="outline" size="sm" onClick={() => $w?.utils?.navigateTo({
              pageId: 'ai-chat'
            })}>
                  查看更多
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendations.services.map((service, index) => <div key={index} className="bg-card border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('services', service)}>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{service.price}</span>
                          <div className="flex flex-wrap gap-1">
                            {service.tags?.map((tag, tagIndex) => <span key={tagIndex} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                                {tag}
                              </span>)}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{service.reason}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {/* 内容推荐 */}
          {recommendations.content.length > 0 && <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <span>推荐阅读</span>
                </h2>
                <Button variant="outline" size="sm">
                  查看更多
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendations.content.map((content, index) => <div key={index} className="bg-card border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('content', content)}>
                    <div className="flex">
                      <img src={content.image || 'https://picsum.photos/seed/home-content' + index + '/150/100.jpg'} alt={content.title} className="w-32 h-24 object-cover" />
                      <div className="flex-1 p-3">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{content.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{content.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">{content.category}</span>
                            <span className="text-xs text-muted-foreground">{content.readTime}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{content.reason}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {/* 活动推荐 */}
          {recommendations.activities.length > 0 && <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span>推荐活动</span>
                </h2>
                <Button variant="outline" size="sm">
                  查看更多
                </Button>
              </div>
              <div className="space-y-4">
                {recommendations.activities.map((activity, index) => <div key={index} className="bg-card border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('activities', activity)}>
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                        <Gift className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{activity.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{activity.date}</span>
                            </div>
                            {activity.location && <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{activity.location}</span>
                              </div>}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {activity.tags?.map((tag, tagIndex) => <span key={tagIndex} className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                                {tag}
                              </span>)}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{activity.reason}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}

          {/* 原有的首页内容 */}
          <HomeHero />
          <StatsCards />
          <ProductShowcase />
          <QuickActions />
          <RecentActivity />
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}