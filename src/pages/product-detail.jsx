// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, MessageCircle, Brain, Sparkles, TrendingUp, Package, Shield, Zap, ThumbsUp, ThumbsDown, RefreshCw, Info, CheckCircle, AlertCircle } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { ShoppingCart as ShoppingCartComponent } from '@/components/ShoppingCart';
// @ts-ignore;

export default function ProductDetailPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState({
    similar: [],
    complementary: [],
    upgrade: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState({});
  const [recommendationStats, setRecommendationStats] = useState({
    totalViews: 0,
    clickRate: 0,
    satisfactionRate: 0
  });
  const productId = props.$w?.page?.dataset?.params?.productId || 'PROD001';
  useEffect(() => {
    loadProductDetail();
    loadRecommendations();
    updateRecommendationStats();
  }, [productId]);
  const loadProductDetail = async () => {
    try {
      // 模拟产品数据，实际应该从API获取
      const mockProduct = {
        id: productId,
        name: 'AI智能染发剂',
        description: '采用先进AI技术，根据您的发质和肤色智能调配最适合的染发剂',
        price: 199,
        originalPrice: 299,
        rating: 4.8,
        reviews: 256,
        images: ['https://picsum.photos/seed/product1/400/400.jpg', 'https://picsum.photos/seed/product2/400/400.jpg'],
        category: 'hair-dye',
        brand: 'AI智能',
        color: '棕色',
        features: ['AI智能调配', '天然成分', '持久显色', '温和不刺激'],
        specifications: {
          weight: '100ml',
          usage: '2-3次',
          shelfLife: '3年'
        },
        stock: 50,
        sales: 1234
      };
      setProduct(mockProduct);
    } catch (error) {
      console.error('加载产品详情失败:', error);
    }
  };
  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const currentUser = $w?.auth?.currentUser;
      const userProfile = {
        userId: currentUser?.userId,
        userName: currentUser?.nickName || currentUser?.name,
        preferences: await loadUserPreferences()
      };

      // 生成多种类型的推荐
      const [similarRecs, complementaryRecs, upgradeRecs] = await Promise.allSettled([generateSimilarRecommendations(product, userProfile), generateComplementaryRecommendations(product, userProfile), generateUpgradeRecommendations(product, userProfile)]);
      setRecommendations({
        similar: similarRecs.status === 'fulfilled' ? similarRecs.value : [],
        complementary: complementaryRecs.status === 'fulfilled' ? complementaryRecs.value : [],
        upgrade: upgradeRecs.status === 'fulfilled' ? upgradeRecs.value : []
      });
    } catch (error) {
      console.error('加载推荐失败:', error);
      setDefaultRecommendations();
    } finally {
      setIsLoading(false);
    }
  };
  const loadUserPreferences = async () => {
    try {
      // 从推荐偏好数据模型加载用户偏好
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'hair_dye_recommendation_preferences',
        methodName: 'wedaGetItemV2',
        params: {
          filter: {
            where: {
              user_id: {
                $eq: $w?.auth?.currentUser?.userId
              }
            }
          },
          select: {
            $master: true
          }
        }
      });
      return response || {};
    } catch (error) {
      console.error('加载用户偏好失败:', error);
      return {};
    }
  };
  const generateSimilarRecommendations = async (currentProduct, userProfile) => {
    try {
      const prompt = `基于当前产品推荐相似产品：
当前产品信息：${JSON.stringify(currentProduct)}
用户偏好：${JSON.stringify(userProfile.preferences)}

请推荐3-4个相似产品，基于以下标准：
1. 相同类别和功能
2. 相似的价格区间
3. 相似的品牌定位
4. 相同的颜色偏好

以JSON格式返回，包含产品名称、价格、推荐理由、匹配度评分等信息。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的产品推荐专家，能够基于产品特征和用户偏好推荐最合适的相似产品。'
      }, {
        role: 'user',
        content: prompt
      }], {
        temperature: 0.3,
        max_tokens: 1000
      });
      try {
        return JSON.parse(response);
      } catch (e) {
        return getDefaultSimilarRecommendations();
      }
    } catch (error) {
      return getDefaultSimilarRecommendations();
    }
  };
  const generateComplementaryRecommendations = async (currentProduct, userProfile) => {
    try {
      const prompt = `基于当前产品推荐互补产品：
当前产品信息：${JSON.stringify(currentProduct)}
用户偏好：${JSON.stringify(userProfile.preferences)}

请推荐2-3个互补产品，这些产品可以与当前产品配合使用，提升整体效果：
1. 染发工具（梳子、手套等）
2. 护理产品（洗发水、护发素等）
3. 配套用品（围布、耳罩等）

以JSON格式返回，包含产品名称、价格、推荐理由、互补性说明等信息。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的产品搭配专家，能够推荐与当前产品完美搭配的互补产品。'
      }, {
        role: 'user',
        content: prompt
      }], {
        temperature: 0.4,
        max_tokens: 800
      });
      try {
        return JSON.parse(response);
      } catch (e) {
        return getDefaultComplementaryRecommendations();
      }
    } catch (error) {
      return getDefaultComplementaryRecommendations();
    }
  };
  const generateUpgradeRecommendations = async (currentProduct, userProfile) => {
    try {
      const prompt = `基于当前产品推荐升级产品：
当前产品信息：${JSON.stringify(currentProduct)}
用户偏好：${JSON.stringify(userProfile.preferences)}

请推荐2-3个升级产品，这些产品是当前产品的升级版本或高端替代品：
1. 更高品质的成分
2. 更先进的技术
3. 更好的使用体验
4. 更持久的效果

以JSON格式返回，包含产品名称、价格、推荐理由、升级优势等信息。`;
      const response = await deepseekService.chatCompletion([{
        role: 'system',
        content: '你是一个专业的产品升级顾问，能够推荐当前产品的高端升级版本。'
      }, {
        role: 'user',
        content: prompt
      }], {
        temperature: 0.3,
        max_tokens: 800
      });
      try {
        return JSON.parse(response);
      } catch (e) {
        return getDefaultUpgradeRecommendations();
      }
    } catch (error) {
      return getDefaultUpgradeRecommendations();
    }
  };
  const getDefaultSimilarRecommendations = () => {
    return [{
      name: 'AI智能染发剂-黑色',
      price: 199,
      originalPrice: 299,
      rating: 4.7,
      image: 'https://picsum.photos/seed/similar1/200/200.jpg',
      productId: 'PROD002',
      reason: '同系列产品，不同颜色选择',
      matchScore: 95,
      tags: ['相似产品', '同系列']
    }, {
      name: 'AI智能染发剂-金色',
      price: 219,
      originalPrice: 329,
      rating: 4.6,
      image: 'https://picsum.photos/seed/similar2/200/200.jpg',
      productId: 'PROD003',
      reason: '同品牌同类型，颜色不同',
      matchScore: 88,
      tags: ['相似产品', '热门']
    }];
  };
  const getDefaultComplementaryRecommendations = () => {
    return [{
      name: '专业染发工具套装',
      price: 89,
      originalPrice: 129,
      rating: 4.8,
      image: 'https://picsum.photos/seed/complementary1/200/200.jpg',
      productId: 'TOOL001',
      reason: '专业染发必备工具，提升染发效果',
      complementarity: '工具配套',
      tags: ['配套工具', '专业']
    }, {
      name: '染后护理套装',
      price: 159,
      originalPrice: 239,
      rating: 4.9,
      image: 'https://picsum.photos/seed/complementary2/200/200.jpg',
      productId: 'CARE001',
      reason: '染后专用护理，延长颜色持久度',
      complementarity: '护理配套',
      tags: ['护理产品', '必备']
    }];
  };
  const getDefaultUpgradeRecommendations = () => {
    return [{
      name: 'AI智能染发剂Pro版',
      price: 399,
      originalPrice: 599,
      rating: 4.9,
      image: 'https://picsum.photos/seed/upgrade1/200/200.jpg',
      productId: 'PROD101',
      reason: '升级版AI算法，更精准的颜色匹配',
      upgradeAdvantage: 'AI算法升级',
      tags: ['升级版', '高端']
    }];
  };
  const setDefaultRecommendations = () => {
    setRecommendations({
      similar: getDefaultSimilarRecommendations(),
      complementary: getDefaultComplementaryRecommendations(),
      upgrade: getDefaultUpgradeRecommendations()
    });
  };
  const updateRecommendationStats = () => {
    setRecommendationStats(prev => ({
      ...prev,
      totalViews: prev.totalViews + 1
    }));
  };
  const handleRecommendationClick = (type, item) => {
    // 记录推荐点击
    const feedbackKey = `${type}_${item.productId}`;
    setUserFeedback(prev => ({
      ...prev,
      [feedbackKey]: {
        ...prev[feedbackKey],
        clicked: true,
        clickTime: new Date()
      }
    }));

    // 更新点击率统计
    setRecommendationStats(prev => ({
      ...prev,
      clickRate: (prev.clickRate * prev.totalViews + 1) / (prev.totalViews + 1) * 100
    }));

    // 跳转到产品详情页
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          productId: item.productId
        }
      });
    }
  };
  const handleFeedback = (type, item, feedback) => {
    const feedbackKey = `${type}_${item.productId}`;
    setUserFeedback(prev => ({
      ...prev,
      [feedbackKey]: {
        ...prev[feedbackKey],
        feedback: feedback,
        feedbackTime: new Date()
      }
    }));

    // 更新满意度统计
    if (feedback === 'like') {
      setRecommendationStats(prev => ({
        ...prev,
        satisfactionRate: Math.min(100, prev.satisfactionRate + 2)
      }));
    } else if (feedback === 'dislike') {
      setRecommendationStats(prev => ({
        ...prev,
        satisfactionRate: Math.max(0, prev.satisfactionRate - 1)
      }));
    }
    toast({
      title: "感谢反馈",
      description: "您的反馈将帮助我们改进推荐算法"
    });
  };
  const handleRefreshRecommendations = () => {
    loadRecommendations();
  };
  const handleAddToCart = item => {
    // 添加到购物车逻辑
    toast({
      title: "已添加到购物车",
      description: `${item.name} 已加入购物车`
    });
  };
  const handleShare = () => {
    // 分享产品逻辑
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href
      });
    }
  };
  const handleFavorite = () => {
    // 收藏产品逻辑
    toast({
      title: "已收藏",
      description: `${product?.name} 已添加到收藏`
    });
  };
  if (!product) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>加载中...</p>
        </div>
      </div>;
  }
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="产品详情" showBack={true} />
        
        <div className="pb-20">
          {/* 产品基本信息 */}
          <div className="bg-card p-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 产品图片 */}
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>)}
                </div>
              </div>

              {/* 产品信息 */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="text-muted-foreground">销量 {product.sales}</div>
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-3xl font-bold text-red-500">¥{product.price}</div>
                    <div className="text-xl text-muted-foreground line-through">¥{product.originalPrice}</div>
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                      省¥{product.originalPrice - product.price}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      加入购物车
                    </Button>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" onClick={handleFavorite}>
                        <Heart className="w-4 h-4 mr-1" />
                        收藏
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-1" />
                        分享
                      </Button>
                      <Button variant="outline" onClick={() => $w?.utils?.navigateTo({
                      pageId: 'ai-chat'
                    })}>
                        <MessageCircle className="w-4 h-4 mr-1" />
                        咨询
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 产品特性 */}
                <div className="space-y-3">
                  <h3 className="font-semibold">产品特性</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => <div key={index} className="flex items-center space-x-2 bg-muted p-2 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>)}
                  </div>
                </div>

                {/* 产品规格 */}
                <div className="space-y-3">
                  <h3 className="font-semibold">产品规格</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">重量：</span>
                      <span>{product.specifications.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">使用次数：</span>
                      <span>{product.specifications.usage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">保质期：</span>
                      <span>{product.specifications.shelfLife}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">库存：</span>
                      <span className={product.stock > 20 ? 'text-green-600' : 'text-orange-600'}>
                        {product.stock > 20 ? '充足' : `仅剩${product.stock}件`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI智能推荐 */}
          <div className="p-4 space-y-6">
            {/* 推荐头部 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Brain className="w-6 h-6" />
                  <h2 className="text-xl font-bold">AI智能推荐</h2>
                  <div className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    基于深度学习
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRefreshRecommendations} disabled={isLoading} className="text-white hover:bg-white/10">
                  {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <RefreshCw className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-blue-100 text-sm">
                基于当前产品特征和您的偏好，AI为您精选最合适的相关产品
              </p>
              <div className="flex items-center space-x-4 mt-3 text-xs">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>点击率: {recommendationStats.clickRate.toFixed(1)}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>满意度: {recommendationStats.satisfactionRate.toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* 相似产品推荐 */}
            {recommendations.similar.length > 0 && <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span>相似产品</span>
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      AI匹配
                    </div>
                  </h3>
                  <Button variant="outline" size="sm">
                    查看更多
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendations.similar.map((item, index) => <div key={index} className="bg-card border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('similar', item)}>
                      <div className="relative mb-2">
                        <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded" />
                        <div className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.matchScore}%
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.reason}</p>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold text-red-500">¥{item.price}</span>
                          {item.originalPrice && <span className="text-xs text-muted-foreground line-through ml-1">¥{item.originalPrice}</span>}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags?.map((tag, tagIndex) => <span key={tagIndex} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>)}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}>
                          购买
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleFeedback('similar', item, 'like');
                  }}>
                          👍
                        </Button>
                      </div>
                    </div>)}
                </div>
              </div>}

            {/* 互补产品推荐 */}
            {recommendations.complementary.length > 0 && <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span>互补产品</span>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                      完美搭配
                    </div>
                  </h3>
                  <Button variant="outline" size="sm">
                    查看更多
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {recommendations.complementary.map((item, index) => <div key={index} className="bg-card border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('complementary', item)}>
                      <div className="relative mb-2">
                        <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded" />
                        <div className="absolute top-1 right-1 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.complementarity}
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.reason}</p>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold text-red-500">¥{item.price}</span>
                          {item.originalPrice && <span className="text-xs text-muted-foreground line-through ml-1">¥{item.originalPrice}</span>}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags?.map((tag, tagIndex) => <span key={tagIndex} className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>)}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}>
                          购买
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleFeedback('complementary', item, 'like');
                  }}>
                          👍
                        </Button>
                      </div>
                    </div>)}
                </div>
              </div>}

            {/* 升级产品推荐 */}
            {recommendations.upgrade.length > 0 && <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>升级产品</span>
                    <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                      高端选择
                    </div>
                  </h3>
                  <Button variant="outline" size="sm">
                    查看更多
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {recommendations.upgrade.map((item, index) => <div key={index} className="bg-card border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRecommendationClick('upgrade', item)}>
                      <div className="relative mb-2">
                        <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded" />
                        <div className="absolute top-1 right-1 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          {item.upgradeAdvantage}
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.reason}</p>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold text-red-500">¥{item.price}</span>
                          {item.originalPrice && <span className="text-xs text-muted-foreground line-through ml-1">¥{item.originalPrice}</span>}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags?.map((tag, tagIndex) => <span key={tagIndex} className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>)}
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}>
                          购买
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1 text-xs" onClick={e => {
                    e.stopPropagation();
                    handleFeedback('upgrade', item, 'like');
                  }}>
                          👍
                        </Button>
                      </div>
                    </div>)}
                </div>
              </div>}

            {/* 推荐说明 */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-sm">AI推荐说明</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                我们的AI推荐系统基于深度学习算法，分析产品特征、用户偏好和市场趋势，为您提供最合适的产品推荐。
                推荐结果会根据您的反馈不断优化，点击👍或👎可以帮助我们改进推荐准确性。
              </p>
            </div>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}