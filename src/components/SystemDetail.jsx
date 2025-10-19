// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Share2, Heart, Star, Truck, Shield, Check, Brain, Palette, HandPointer, ThermometerHalf, Package, MessageCircle, ThumbsUp, Store, GraduationCap, Building, Home, Zap, Crown, Settings } from 'lucide-react';

export const SystemDetail = ({
  system,
  onBack,
  onPurchase,
  onContactSupport
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // 处理分享
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: system.name,
        text: system.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "链接已复制",
        description: "系统详情链接已复制到剪贴板"
      });
    }
  };

  // 处理收藏
  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "已取消收藏" : "已添加收藏",
      description: isFavorited ? "系统已从收藏中移除" : "系统已添加到收藏"
    });
  };

  // 处理图片选择
  const handleImageSelect = index => {
    setSelectedImage(index);
  };

  // 处理购买方案选择
  const handleSelectPlan = plan => {
    if (onPurchase) {
      onPurchase(system, plan);
    } else {
      toast({
        title: "选择方案",
        description: `已选择${plan.name}，正在跳转到购买页面...`
      });
    }
  };

  // 获取系统图标
  const getSystemIcon = systemId => {
    const icons = {
      1: Brain,
      2: Palette,
      3: HandPointer,
      4: Store,
      5: Heart,
      6: Settings
    };
    return icons[systemId] || Package;
  };

  // 获取系统颜色
  const getSystemColor = systemId => {
    const colors = {
      1: 'text-blue-400',
      2: 'text-green-400',
      3: 'text-purple-400',
      4: 'text-orange-400',
      5: 'text-red-400',
      6: 'text-cyan-400'
    };
    return colors[systemId] || 'text-gray-400';
  };

  // 获取系统背景色
  const getSystemBgColor = systemId => {
    const colors = {
      1: 'bg-blue-500',
      2: 'bg-green-500',
      3: 'bg-purple-500',
      4: 'bg-orange-500',
      5: 'bg-red-500',
      6: 'bg-cyan-500'
    };
    return colors[systemId] || 'bg-gray-500';
  };
  const Icon = getSystemIcon(system.id);
  const colorClass = getSystemColor(system.id);
  const bgColorClass = getSystemBgColor(system.id);
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">系统详情</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleShare} className="text-white/80 hover:text-white">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleToggleFavorite} className={`${isFavorited ? 'text-red-400' : 'text-white/80'} hover:text-red-400`}>
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* 产品概览 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {/* 主图片 */}
              <div className="aspect-video bg-white/10 rounded-xl overflow-hidden mb-6">
                <img src={system.images?.[selectedImage] || system.image} alt={system.name} className="w-full h-full object-cover" />
              </div>
              
              {/* 缩略图 */}
              {system.images && system.images.length > 1 && <div className="grid grid-cols-4 gap-2">
                  {system.images.map((image, index) => <div key={index} className={`aspect-video bg-white/10 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-white/50 ${selectedImage === index ? 'ring-2 ring-white/50' : ''}`} onClick={() => handleImageSelect(index)}>
                      <img src={image} alt={`${system.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>)}
                </div>}
            </div>
            
            <div>
              {/* 标签和状态 */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`${bgColorClass}/20 ${colorClass} px-3 py-1 rounded-full text-sm`}>
                  {system.category}
                </span>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                  现货
                </span>
              </div>
              
              {/* 产品名称 */}
              <h1 className="text-3xl font-bold text-white mb-4">{system.name}</h1>
              
              {/* 评分和销量 */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-2 text-white">{system.rating}</span>
                </div>
                <span className="text-white/60">{system.reviews}条评价</span>
                <span className="text-white/60">月销{system.monthlySales}+</span>
              </div>
              
              {/* 价格 */}
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-red-400">¥{system.price.toLocaleString()}</span>
                {system.originalPrice && <span className="text-white/60 line-through text-xl">¥{system.originalPrice.toLocaleString()}</span>}
                {system.originalPrice && <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-sm">限时优惠</span>}
              </div>
              
              {/* 描述 */}
              <p className="text-white/80 text-lg mb-6">{system.description}</p>
              
              {/* 服务保障 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white text-sm">免费配送</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-white text-sm">一年质保</p>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <Button onClick={() => handleSelectPlan({
                name: '标准版',
                price: system.price
              })} className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  立即购买
                </Button>
                <Button variant="ghost" onClick={onContactSupport} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
                  咨询客服
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 功能特性 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-400 mr-3" />
            核心功能特性
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {system.features.map((feature, index) => {
            const featureIcons = [Brain, Palette, HandPointer, ThermometerHalf];
            const featureColors = ['text-blue-400', 'text-green-400', 'text-purple-400', 'text-orange-400'];
            const FeatureIcon = featureIcons[index % featureIcons.length];
            return <div key={index} className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className={`w-16 h-16 ${bgColorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <FeatureIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature}</h3>
                <p className="text-white/60 text-sm">专业的{feature}功能，提供最佳用户体验</p>
              </div>;
          })}
          </div>
        </CardContent>
      </Card>

      {/* 详细信息标签页 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">产品介绍</TabsTrigger>
              <TabsTrigger value="specs" className="text-white data-[state=active]:bg-white/20">技术规格</TabsTrigger>
              <TabsTrigger value="usage" className="text-white data-[state=active]:bg-white/20">使用场景</TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-white/20">用户评价</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">产品介绍</h3>
              <p className="text-white/80 mb-6">{system.description}</p>
              <h4 className="text-lg font-semibold text-white mb-3">核心优势</h4>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <span>智能发质分析，精准识别发质类型和受损程度，准确率达98%以上</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <span>自动调色系统，确保每次调色的一致性，减少人为误差</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <span>云端配方库，实时更新流行色彩趋势，包含1000+专业配方</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <span>操作简单，培训成本低，普通员工经过简单培训即可熟练使用</span>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">技术规格</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Object.entries(system.specifications || {}).slice(0, 4).map(([key, value]) => <div key={key} className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white">{value}</span>
                    </div>)}
                </div>
                <div className="space-y-4">
                  {Object.entries(system.specifications || {}).slice(4).map(([key, value]) => <div key={key} className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white">{value}</span>
                    </div>)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">使用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                  <Store className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">美发沙龙</h4>
                  <p className="text-white/60 text-sm">
                    适用于各类美发沙龙，提高染发效率，减少客户等待时间，提升服务质量
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                  <GraduationCap className="w-8 h-8 text-green-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">美发培训学校</h4>
                  <p className="text-white/60 text-sm">
                    用于教学演示，帮助学生理解染发原理，提高学习效果
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                  <Building className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">连锁美发店</h4>
                  <p className="text-white/60 text-sm">
                    标准化染发流程，确保各分店服务质量一致，提升品牌形象
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                  <Home className="w-8 h-8 text-orange-400 mb-4" />
                  <h4 className="text-white font-semibold mb-2">个人工作室</h4>
                  <p className="text-white/60 text-sm">
                    适合个人美发师使用，提高工作效率，扩大服务范围
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">用户评价</h3>
              <div className="space-y-4">
                {system.reviews?.map(review => <div key={review.id} className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full overflow-hidden">
                          <img src={review.avatar} alt={review.userName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{review.userName}</h4>
                          <div className="flex text-yellow-400 text-sm">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-white/60 text-sm">{review.date}</span>
                    </div>
                    <p className="text-white/80">{review.content}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        有用
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        回复
                      </Button>
                    </div>
                  </div>)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 价格方案 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">价格方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-white font-semibold mb-2">基础版</h3>
              <div className="text-3xl font-bold text-white mb-4">¥{Math.floor(system.price * 0.8).toLocaleString()}</div>
              <ul className="space-y-2 text-white/60 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  基础功能
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  100个基础配方
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  标准支持
                </li>
              </ul>
              <Button onClick={() => handleSelectPlan({
              name: '基础版',
              price: Math.floor(system.price * 0.8)
            })} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
                选择方案
              </Button>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 border-2 border-blue-400 relative hover:bg-white/15 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Crown className="w-3 h-3 mr-1" />
                推荐
              </div>
              <h3 className="text-white font-semibold mb-2">专业版</h3>
              <div className="text-3xl font-bold text-white mb-4">¥{system.price.toLocaleString()}</div>
              <ul className="space-y-2 text-white/60 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  完整功能
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  500个专业配方
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  云端同步
                </li>
              </ul>
              <Button onClick={() => handleSelectPlan({
              name: '专业版',
              price: system.price
            })} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                选择方案
              </Button>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-white font-semibold mb-2">企业版</h3>
              <div className="text-3xl font-bold text-white mb-4">¥{Math.floor(system.price * 1.4).toLocaleString()}</div>
              <ul className="space-y-2 text-white/60 text-sm mb-6">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  高级功能
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  无限配方库
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  定制化服务
                </li>
              </ul>
              <Button onClick={() => handleSelectPlan({
              name: '企业版',
              price: Math.floor(system.price * 1.4)
            })} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
                选择方案
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};