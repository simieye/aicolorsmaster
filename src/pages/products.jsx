// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Star, Users, Zap, Shield, CreditCard, UserCheck, Heart, Crown, TrendingUp, Award, Target, Lightbulb, MessageSquare, Calendar, Database, User, Settings, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;

export default function ProductsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // AI管理系统产品数据
  const aiManagementProducts = [{
    id: 'finance-management',
    name: 'AI财务管理系统',
    price: 2680,
    originalPrice: 3680,
    description: '智能财务管理，提升效率',
    features: ['智能记账', '财务报表', '成本分析', '预算管理'],
    icon: CreditCard,
    color: 'from-blue-500 to-cyan-600',
    rating: 4.8,
    reviews: 156,
    badge: '热销',
    pageId: 'finance-management'
  }, {
    id: 'attendance-management',
    name: 'AI考勤管理系统',
    price: 2680,
    originalPrice: 3680,
    description: '人脸识别打卡，智能考勤',
    features: ['人脸识别', '考勤统计', '异常处理', '排班管理'],
    icon: UserCheck,
    color: 'from-green-500 to-emerald-600',
    rating: 4.7,
    reviews: 142,
    badge: '新品',
    pageId: 'attendance-management'
  }, {
    id: 'culture-management',
    name: 'AI文化管理系统',
    price: 2680,
    originalPrice: 3680,
    description: '企业文化管理，员工活动',
    features: ['文化展示', '员工活动', '培训管理', '内部通知'],
    icon: Heart,
    color: 'from-purple-500 to-pink-600',
    rating: 4.6,
    reviews: 98,
    badge: '推荐',
    pageId: 'corporate-culture'
  }, {
    id: 'ceo-management',
    name: 'AI门店店长CEO管理系统',
    price: 19800,
    originalPrice: 29800,
    description: '全方位门店管理，CEO视角',
    features: ['AI财务管理系统', 'AI考勤管理系统', 'AI文化管理系统', 'AI染发膏库存管理系统', 'AI客户配方管理系统', 'AI客户（会员）管理系统CRM', 'AI员工管理系统', 'AI发型师管理系统', 'AI社区管理系统', 'AI客服系统', 'AI客户预约系统'],
    icon: Crown,
    color: 'from-yellow-500 to-orange-600',
    rating: 4.9,
    reviews: 89,
    badge: '旗舰',
    pageId: 'store-management-enhanced'
  }];

  // 原有产品数据
  const [products] = useState([{
    id: 1,
    name: 'AI智能染发自动调色宝机',
    price: 12800,
    originalPrice: 16800,
    description: '革命性的AI染发调色设备，精准匹配色彩',
    features: ['AI色彩识别', '自动调色', '精准配比', '智能控制'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 256,
    category: 'equipment',
    badge: '热销'
  }, {
    id: 2,
    name: 'AI品牌染发膏管理系统',
    price: 8800,
    originalPrice: 12800,
    description: '智能染发膏库存管理，降低成本提升效率',
    features: ['库存监控', '自动补货', '批次管理', '成本分析'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 189,
    category: 'software'
  }, {
    id: 3,
    name: 'AI客户配方管理系统',
    price: 6800,
    originalPrice: 9800,
    description: '个性化客户配方管理，提升服务质量',
    features: ['配方记录', '客户档案', '历史查询', '个性化推荐'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 167,
    category: 'software'
  }, {
    id: 4,
    name: 'AI美发连锁门店管理系统',
    price: 15800,
    originalPrice: 22800,
    description: '全方位连锁门店管理解决方案',
    features: ['多店管理', '数据同步', '统一管控', '业绩分析'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 203,
    category: 'software',
    badge: '推荐'
  }, {
    id: 5,
    name: 'AI美发客户管理系统CRM',
    price: 9800,
    originalPrice: 13800,
    description: '智能化客户关系管理，提升客户满意度',
    features: ['客户档案', '消费记录', '偏好分析', '营销推送'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 145,
    category: 'software'
  }, {
    id: 6,
    name: 'AI染发色彩大师SaaS系统',
    price: 18800,
    originalPrice: 28800,
    description: '云端色彩管理系统，随时随地管理',
    features: ['云端存储', '多端同步', '实时更新', '数据安全'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 178,
    category: 'saas',
    badge: '新品'
  }]);

  // 分类选项
  const categories = [{
    id: 'all',
    name: '全部产品',
    icon: ShoppingCart
  }, {
    id: 'ai-management',
    name: 'AI管理系统',
    icon: Crown
  }, {
    id: 'equipment',
    name: '智能设备',
    icon: Zap
  }, {
    id: 'software',
    name: '软件系统',
    icon: Shield
  }, {
    id: 'saas',
    name: 'SaaS服务',
    icon: Database
  }];

  // 处理分类切换
  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  // 处理产品点击
  const handleProductClick = (productId, pageId) => {
    if (pageId && $w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    } else {
      toast({
        title: "产品详情",
        description: "正在查看产品详情"
      });
    }
  };

  // 处理购买
  const handlePurchase = productId => {
    toast({
      title: "购买产品",
      description: "正在处理购买请求"
    });
  };

  // 处理加入购物车
  const handleAddToCart = productId => {
    toast({
      title: "加入购物车",
      description: "产品已加入购物车"
    });
  };

  // 渲染产品卡片
  const renderProductCard = product => {
    const isAIManagement = aiManagementProducts.find(p => p.id === product.id);
    const productData = isAIManagement || product;
    const Icon = productData.icon;
    return <div key={productData.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
        {/* 产品图片/图标 */}
        <div className={`h-48 bg-gradient-to-br ${productData.color} flex items-center justify-center relative`}>
          {productData.image ? <img src={productData.image} alt={productData.name} className="w-full h-full object-cover" /> : <Icon className="w-20 h-20 text-white" />}
          
          {/* 徽章 */}
          {productData.badge && <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {productData.badge}
            </div>}
        </div>

        {/* 产品信息 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{productData.name}</h3>
          <p className="text-white/70 text-sm mb-4">{productData.description}</p>

          {/* 功能特性 */}
          <div className="mb-4">
            {productData.features.slice(0, isAIManagement ? 4 : 4).map((feature, index) => <div key={index} className="flex items-center space-x-2 text-white/60 text-sm mb-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>{feature}</span>
              </div>)}
            {isAIManagement && productData.features.length > 4 && <div className="text-white/40 text-xs mt-2">
                +{productData.features.length - 4} 个更多功能
              </div>}
          </div>

          {/* 评分和评论 */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-white font-medium">{productData.rating}</span>
            </div>
            <span className="text-white/60 text-sm">({productData.reviews} 条评价)</span>
          </div>

          {/* 价格 */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-white">¥{productData.price.toLocaleString()}</div>
              {productData.originalPrice && <div className="text-white/60 text-sm line-through">
                  ¥{productData.originalPrice.toLocaleString()}
                </div>}
            </div>
            {productData.originalPrice && <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-sm">
                省¥{(productData.originalPrice - productData.price).toLocaleString()}
              </div>}
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-3">
            <Button onClick={() => handleProductClick(productData.id, productData.pageId)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              查看详情
            </Button>
            <Button onClick={() => handleAddToCart(productData.id)} variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>;
  };

  // 过滤产品
  const filteredProducts = () => {
    if (selectedCategory === 'all') {
      return [...products, ...aiManagementProducts];
    } else if (selectedCategory === 'ai-management') {
      return aiManagementProducts;
    } else {
      return products.filter(product => product.category === selectedCategory);
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="products" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI美发智能产品</h1>
          <p class="text-white/80 text-lg">全方位智能化解决方案，助力美发行业数字化转型</p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => {
          const Icon = category.icon;
          return <button key={category.id} onClick={() => handleCategoryChange(category.id)} className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${selectedCategory === category.id ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'}`}>
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>;
        })}
        </div>

        {/* AI管理系统特别展示区域 */}
        {selectedCategory === 'all' || selectedCategory === 'ai-management' ? <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">AI管理系统</h2>
              <p class="text-white/80">智能化管理工具，提升门店运营效率</p>
            </div>
            
            {/* CEO管理系统特别推荐 */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-8 mb-8 border border-yellow-400/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">旗舰产品</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">AI门店店长CEO管理系统</h3>
                  <p className="text-white/80 text-lg mb-6">
                    全方位门店管理解决方案，包含11大核心系统，CEO视角掌控全局
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {aiManagementProducts[3].features.slice(0, 6).map((feature, index) => <div key={index} className="flex items-center space-x-2 text-white/80">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-3xl font-bold text-white">¥19,800</div>
                      <div className="text-white/60 line-through">¥29,800</div>
                    </div>
                    <Button onClick={() => handleProductClick('ceo-management', 'store-management-enhanced')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3">
                      立即查看
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {aiManagementProducts.slice(0, 3).map(system => {
                const Icon = system.icon;
                return <div key={system.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300">
                      <div className={`w-12 h-12 bg-gradient-to-br ${system.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-medium text-sm mb-1">{system.name}</h4>
                      <div className="text-yellow-400 font-bold">¥{system.price}</div>
                    </div>;
              })}
                </div>
              </div>
            </div>
          </div> : null}

        {/* 产品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts().map(product => renderProductCard(product))}
        </div>

        {/* 空状态 */}
        {filteredProducts().length === 0 && <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">暂无产品</h3>
            <p className="text-white/60">该分类下暂时没有产品</p>
          </div>}
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="products" />
    </div>;
}