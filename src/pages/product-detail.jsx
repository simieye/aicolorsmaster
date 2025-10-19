// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Share2, Heart, Star, ShoppingCart, Truck, Shield, Check, Brain, Palette, HandPointer, ThermometerHalf, Package, MessageCircle, ThumbsUp, Plus, Minus } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { useCart } from '@/components/ShoppingCart';
// @ts-ignore;
import { CartSidebar } from '@/components/CartSidebar';
export default function ProductDetailPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    page
  } = props;
  const {
    toast
  } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState({});

  // 购物车功能
  const {
    addToCart,
    buyNow,
    isLoading: cartLoading
  } = useCart();

  // 从URL参数获取产品ID
  const productId = page?.dataset?.params?.productId;

  // 模拟产品数据
  const mockProducts = {
    1: {
      id: 1,
      name: 'AI智能染发自动调色宝机',
      category: '智能设备',
      price: 4980,
      originalPrice: 5980,
      description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程，大幅提升门店效率',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'],
      stock: 50,
      rating: 4.9,
      reviews: 256,
      monthlySales: 500,
      features: ['AI发质识别', '精准自动调色', '一键操作', '智能温控'],
      status: '现货',
      specifications: {
        model: 'AI-HC-2024',
        dimensions: '350×280×450mm',
        weight: '8.5kg',
        power: '150W',
        workingTemp: '15-35°C',
        warranty: '1年'
      },
      usage: [{
        step: 1,
        title: '发质检测',
        description: '将发质传感器放置在顾客头发上，进行发质分析'
      }, {
        step: 2,
        title: '选择色彩',
        description: '根据顾客需求选择目标色彩或使用AI推荐'
      }, {
        step: 3,
        title: '自动调色',
        description: '设备自动计算配方比例，进行精准调色'
      }, {
        step: 4,
        title: '完成染发',
        description: '按照标准流程进行染发操作'
      }],
      reviews: [{
        id: 1,
        userName: '张店长',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-15',
        content: '这个设备真的太棒了！大大提高了我们店的染发效率，顾客满意度也提升了很多。'
      }, {
        id: 2,
        userName: '李发型师',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-12',
        content: 'AI发质识别功能很准确，调色效果一致性好，节省了很多时间。'
      }],
      relatedProducts: [{
        id: 2,
        name: 'AI品牌染发膏管理系统',
        price: 1680,
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&h=100&fit=crop'
      }, {
        id: 3,
        name: 'AI客户配方管理系统',
        price: 2680,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=100&fit=crop'
      }]
    },
    2: {
      id: 2,
      name: 'AI品牌染发膏管理系统',
      category: '管理软件',
      price: 1680,
      originalPrice: 1980,
      description: '专业染发膏库存管理系统，智能预警、批次追踪、成本控制，让染发产品管理更高效',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'],
      stock: 999,
      rating: 4.7,
      reviews: 128,
      monthlySales: 300,
      features: ['智能库存管理', '批次追踪', '成本分析', '预警提醒'],
      status: '现货',
      isDigital: true,
      specifications: {
        model: 'AI-IM-2024',
        version: 'v2.0',
        license: '永久授权',
        support: '7×24小时',
        update: '免费升级',
        warranty: '终身维护'
      }
    },
    3: {
      id: 3,
      name: 'AI客户配方管理系统',
      category: '管理软件',
      price: 2680,
      originalPrice: 3180,
      description: '智能客户染发配方管理，记录客户偏好、历史配方、过敏信息，提供个性化服务体验',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'],
      stock: 999,
      rating: 4.8,
      reviews: 189,
      monthlySales: 250,
      features: ['客户档案管理', '配方历史记录', '过敏信息提醒', '个性化推荐'],
      status: '现货',
      isDigital: true,
      specifications: {
        model: 'AI-CM-2024',
        version: 'v3.0',
        license: '永久授权',
        database: '云端存储',
        backup: '自动备份',
        warranty: '终身维护'
      }
    },
    4: {
      id: 4,
      name: 'AI美发连锁门店管理系统',
      category: '管理软件',
      price: 3680,
      originalPrice: 4180,
      description: '专为美发连锁店设计的一体化管理解决方案，涵盖预约、员工、财务、营销等全方位管理',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'],
      stock: 999,
      rating: 4.6,
      reviews: 167,
      monthlySales: 180,
      features: ['多店统一管理', '智能预约系统', '员工绩效管理', '财务报表分析'],
      status: '现货',
      isDigital: true,
      specifications: {
        model: 'AI-SM-2024',
        version: 'v4.0',
        license: '永久授权',
        stores: '支持多门店',
        support: '7×24小时',
        warranty: '终身维护'
      }
    },
    5: {
      id: 5,
      name: 'AI美发客户管理系统CRM',
      category: '管理软件',
      price: 6800,
      originalPrice: 7800,
      description: '专业美发行业CRM系统，客户关系维护、营销自动化、数据分析，助力门店业绩增长',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'],
      stock: 999,
      rating: 4.8,
      reviews: 234,
      monthlySales: 120,
      features: ['客户关系管理', '营销自动化', '数据分析洞察', '会员积分系统'],
      status: '现货',
      isDigital: true,
      specifications: {
        model: 'AI-CRM-2024',
        version: 'v5.0',
        license: '永久授权',
        users: '不限用户数',
        support: '7×24小时',
        warranty: '终身维护'
      }
    },
    6: {
      id: 6,
      name: 'AI染发色彩大师AI原生开源SaaS系统',
      category: 'SaaS平台',
      price: 8800,
      originalPrice: 9800,
      description: '基于AI原生技术开发的染发色彩管理SaaS平台，开源架构、云端部署、支持定制化开发',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop'],
      stock: 999,
      rating: 4.9,
      reviews: 312,
      monthlySales: 80,
      features: ['AI原生架构', '开源可定制', '云端SaaS部署', 'API接口丰富'],
      status: '现货',
      isDigital: true,
      specifications: {
        model: 'AI-SaaS-2024',
        version: 'v6.0',
        license: '开源授权',
        deployment: '云端部署',
        support: '7×24小时',
        warranty: '终身维护'
      }
    }
  };

  // 加载产品数据
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        const productData = mockProducts[productId] || mockProducts[1];
        setProduct(productData);

        // 重置数量为1
        setQuantity(1);
      } catch (error) {
        console.error('加载产品失败:', error);
        toast({
          title: "加载失败",
          description: "产品信息加载失败，请稍后重试",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      loadProduct();
    }
  }, [productId, toast]);

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'products',
        params: {}
      });
    }
  };

  // 处理分享
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href
      });
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "链接已复制",
        description: "产品链接已复制到剪贴板"
      });
    }
  };

  // 处理收藏
  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "已取消收藏" : "已添加收藏",
      description: isFavorited ? "产品已从收藏中移除" : "产品已添加到收藏"
    });
  };

  // 处理加入购物车
  const handleAddToCart = () => {
    if (!product) return;

    // 检查库存
    if (quantity > product.stock) {
      toast({
        title: "库存不足",
        description: `商品库存仅剩 ${product.stock} 件`,
        variant: "destructive"
      });
      return;
    }
    addToCart(product, quantity);
  };

  // 处理立即购买
  const handleBuyNow = () => {
    if (!product) return;

    // 检查库存
    if (quantity > product.stock) {
      toast({
        title: "库存不足",
        description: `商品库存仅剩 ${product.stock} 件`,
        variant: "destructive"
      });
      return;
    }
    buyNow(product, quantity);
  };

  // 处理数量变化
  const handleQuantityChange = delta => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 999)) {
      setQuantity(newQuantity);
    } else if (newQuantity > (product?.stock || 999)) {
      toast({
        title: "库存不足",
        description: `商品库存仅剩 ${product?.stock || 999} 件`,
        variant: "destructive"
      });
    }
  };

  // 图片轮播
  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex(prev => (prev + 1) % product.images.length);
    }
  };
  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  // 计算总价
  const calculateTotalPrice = () => {
    if (!product) return 0;
    const price = selectedSpecs.price || product.price;
    return price * quantity;
  };

  // 计算节省金额
  const calculateSavings = () => {
    if (!product) return 0;
    const originalPrice = selectedSpecs.originalPrice || product.originalPrice || product.price;
    const currentPrice = selectedSpecs.price || product.price;
    return (originalPrice - currentPrice) * quantity;
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>加载产品详情中...</p>
        </div>
      </div>;
  }
  if (!product) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <Package className="w-16 h-16 text-white/60 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">产品不存在</h2>
          <p className="text-white/60 mb-4">请检查产品ID是否正确</p>
          <Button onClick={handleBack} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
            返回产品列表
          </Button>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-white truncate max-w-[200px]">{product.name}</h1>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleShare} className="text-white/80 hover:text-white">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleToggleFavorite} className={`${isFavorited ? 'text-red-400' : 'text-white/80'} hover:text-red-400`}>
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 pb-32">
        {/* 产品图片轮播 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <div className="aspect-video bg-white/10 rounded-xl overflow-hidden">
                <img src={product.images?.[currentImageIndex] || product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              
              {/* 轮播控制 */}
              {product.images && product.images.length > 1 && <>
                  <Button variant="ghost" size="sm" onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white">
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Button>
                </>}

              {/* 图片指示器 */}
              {product.images && product.images.length > 1 && <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>)}
                </div>}
            </div>
          </CardContent>
        </Card>

        {/* 产品基本信息 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1">{product.rating}</span>
                    <span className="text-white/60 ml-1">({product.reviews}评价)</span>
                  </div>
                  <span className="text-white/60">月销 {product.monthlySales}+</span>
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">{product.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-3xl font-bold text-red-400">¥{product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-white/60 line-through">¥{product.originalPrice.toLocaleString()}</span>}
              {product.originalPrice && <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs">
                  限时优惠 ¥{(product.originalPrice - product.price).toLocaleString()}
                </span>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-white">免费配送</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-white">{product.specifications?.warranty || '一年质保'}</p>
              </div>
            </div>

            {/* 库存信息 */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">库存</span>
              <span className={`${product.stock > 10 ? 'text-green-400' : 'text-orange-400'}`}>
                {product.stock > 10 ? '充足' : `仅剩 ${product.stock} 件`}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 产品特色 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              产品特色
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {product.features?.map((feature, index) => {
              const icons = [Brain, Palette, HandPointer, ThermometerHalf];
              const colors = ['text-purple-400', 'text-blue-400', 'text-green-400', 'text-orange-400'];
              const Icon = icons[index % icons.length];
              return <div key={index} className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors">
                  <Icon className={`w-6 h-6 ${colors[index % colors.length]} mb-2`} />
                  <p className="text-sm font-medium text-white">{feature}</p>
                </div>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* 详细信息标签页 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
                <TabsTrigger value="description" className="text-white data-[state=active]:bg-white/20">产品介绍</TabsTrigger>
                <TabsTrigger value="specs" className="text-white data-[state=active]:bg-white/20">规格参数</TabsTrigger>
                <TabsTrigger value="usage" className="text-white data-[state=active]:bg-white/20">使用说明</TabsTrigger>
                <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-white/20">用户评价</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <h4 className="font-semibold text-white mb-3">产品介绍</h4>
                <p className="text-white/80 leading-relaxed mb-4">{product.description}</p>
                <h4 className="font-semibold text-white mb-3">核心优势</h4>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>智能发质分析，精准识别发质类型和受损程度</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>自动调色系统，确保每次调色的一致性</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                    <span>云端配方库，实时更新流行色彩趋势</span>
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <h4 className="font-semibold text-white mb-3">技术规格</h4>
                <div className="space-y-3">
                  {Object.entries(product.specifications || {}).map(([key, value]) => <div key={key} className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-white">{value}</span>
                    </div>)}
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <h4 className="font-semibold text-white mb-3">使用步骤</h4>
                <div className="space-y-4">
                  {product.usage?.map(step => <div key={step.step} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <p className="font-medium text-white">{step.title}</p>
                        <p className="text-white/60 text-sm">{step.description}</p>
                      </div>
                    </div>)}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">用户评价</h4>
                  <Button variant="ghost" size="sm" className="text-blue-400">
                    写评价
                  </Button>
                </div>
                <div className="space-y-4">
                  {product.reviews?.map(review => <div key={review.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full overflow-hidden">
                            <img src={review.avatar} alt={review.userName} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-white">{review.userName}</span>
                          <div className="flex text-yellow-400 text-sm">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
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

        {/* 推荐产品 */}
        {product.relatedProducts && <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">相关推荐</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.relatedProducts.map(relatedProduct => <div key={relatedProduct.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => {
              if ($w.utils && $w.utils.navigateTo) {
                $w.utils.navigateTo({
                  pageId: 'product-detail',
                  params: {
                    productId: relatedProduct.id
                  }
                });
              }
            }}>
                    <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-20 object-cover rounded mb-2" />
                    <p className="text-sm font-medium text-white truncate">{relatedProduct.name}</p>
                    <p className="text-red-400 font-bold">¥{relatedProduct.price.toLocaleString()}</p>
                  </div>)}
              </div>
            </CardContent>
          </Card>}
      </main>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 p-4 z-40">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            {/* 数量选择 */}
            <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
              <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="text-white/80 hover:text-white px-3">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-white px-3 min-w-[40px] text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock} className="text-white/80 hover:text-white px-3">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* 价格显示 */}
            <div className="flex-1 text-right">
              <div className="text-xs text-white/60 line-through">
                {product.originalPrice && `¥${(product.originalPrice * quantity).toLocaleString()}`}
              </div>
              <div className="text-lg font-bold text-red-400">
                ¥{calculateTotalPrice().toLocaleString()}
              </div>
              {calculateSavings() > 0 && <div className="text-xs text-green-400">
                  已省 ¥{calculateSavings().toLocaleString()}
                </div>}
            </div>

            {/* 操作按钮 */}
            <Button onClick={handleAddToCart} disabled={cartLoading} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6">
              {cartLoading ? <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  添加中...
                </> : <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  加入购物车
                </>}
            </Button>
            <Button onClick={handleBuyNow} disabled={cartLoading} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8">
              {cartLoading ? <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  处理中...
                </> : '立即购买'}
            </Button>
          </div>
        </div>
      </div>

      {/* 购物车侧边栏 */}
      <CartSidebar />
    </div>;
}