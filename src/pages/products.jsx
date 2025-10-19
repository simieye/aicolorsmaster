// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Bot, HeadphonesIcon, Calendar, GraduationCap, Briefcase, Megaphone, ShoppingBag, Star, Users, Check, ArrowRight, Filter, Search, TrendingUp, Award, Shield, Zap, Clock, DollarSign, Eye, Heart, Share2, MessageSquare } from 'lucide-react';

export default function ProductsPage(props) {
  const {
    $w
  } = props;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  // 产品数据
  const products = [{
    id: 'customer-service',
    name: 'AI客服系统',
    description: '24小时智能客服，自动回复，提升客户满意度',
    icon: HeadphonesIcon,
    category: 'customer-service',
    price: 1680,
    originalPrice: 2680,
    rating: 4.9,
    reviews: 2156,
    users: '15,000+',
    features: ['智能对话', '自动回复', '多语言支持', '数据分析'],
    tags: ['客服', '自动化', '24小时'],
    badge: '热销',
    color: 'purple',
    stats: {
      satisfaction: '98%',
      responseTime: '&lt;2秒',
      dailyChats: '10万+'
    },
    pageId: 'ai-customer-service-detail'
  }, {
    id: 'appointment',
    name: 'AI预约系统',
    description: '智能预约管理，自动提醒，提升预约效率',
    icon: Calendar,
    category: 'appointment',
    price: 1680,
    originalPrice: 2680,
    rating: 4.8,
    reviews: 1834,
    users: '12,000+',
    features: ['智能排班', '自动提醒', '客户管理', '数据分析'],
    tags: ['预约', '管理', '效率'],
    badge: '推荐',
    color: 'blue',
    stats: {
      efficiency: '85%',
      noShow: '&lt;5%',
      dailyBookings: '5000+'
    },
    pageId: 'ai-appointment-system-detail'
  }, {
    id: 'training',
    name: 'AI培训系统',
    description: '个性化培训方案，提升员工技能，降低培训成本',
    icon: GraduationCap,
    category: 'training',
    price: 3680,
    originalPrice: 5680,
    rating: 4.9,
    reviews: 1247,
    users: '8,000+',
    features: ['个性化学习', '进度跟踪', '考试测评', '证书颁发'],
    tags: ['培训', '学习', '技能'],
    badge: '新品',
    color: 'green',
    stats: {
      completion: '92%',
      skillImprovement: '76%',
      costReduction: '60%'
    },
    pageId: 'ai-employee-training-detail'
  }, {
    id: 'recruitment',
    name: 'AI招聘系统',
    description: '智能招聘代理，自动筛选简历，精准匹配人才',
    icon: Briefcase,
    category: 'recruitment',
    price: 2680,
    originalPrice: 3680,
    rating: 4.7,
    reviews: 892,
    users: '10,000+',
    features: ['简历筛选', '智能匹配', '面试安排', '人才库管理'],
    tags: ['招聘', '人才', '匹配'],
    badge: '热门',
    color: 'indigo',
    stats: {
      matchRate: '89%',
      timeToHire: '-65%',
      qualityScore: '4.8/5'
    },
    pageId: 'ai-recruitment-detail'
  }, {
    id: 'marketing',
    name: 'AI营销系统',
    description: '全网社媒营销，内容生成，提升品牌影响力',
    icon: Megaphone,
    category: 'marketing',
    price: 2680,
    originalPrice: 3680,
    rating: 4.8,
    reviews: 1567,
    users: '6,000+',
    features: ['内容生成', '社媒管理', '数据分析', '营销自动化'],
    tags: ['营销', '社媒', '内容'],
    badge: '新品',
    color: 'pink',
    stats: {
      engagement: '+120%',
      contentGen: '10x速度',
      roi: '280%'
    },
    pageId: 'ai-marketing-detail'
  }, {
    id: 'store',
    name: 'AI微店系统',
    description: '开店通商城，店铺管理，一站式电商解决方案',
    icon: ShoppingBag,
    category: 'ecommerce',
    price: 4980,
    originalPrice: 6980,
    rating: 4.9,
    reviews: 2103,
    users: '20,000+',
    features: ['店铺搭建', '商品管理', '订单处理', '数据分析'],
    tags: ['电商', '店铺', '管理'],
    badge: '爆款',
    color: 'orange',
    stats: {
      setupTime: '10分钟',
      conversion: '+45%',
      revenue: '+180%'
    },
    pageId: 'ai-micro-store-detail'
  }];

  // 分类数据
  const categories = [{
    id: 'all',
    name: '全部产品',
    icon: Bot,
    count: products.length
  }, {
    id: 'customer-service',
    name: '客服系统',
    icon: HeadphonesIcon,
    count: products.filter(p => p.category === 'customer-service').length
  }, {
    id: 'appointment',
    name: '预约管理',
    icon: Calendar,
    count: products.filter(p => p.category === 'appointment').length
  }, {
    id: 'training',
    name: '培训系统',
    icon: GraduationCap,
    count: products.filter(p => p.category === 'training').length
  }, {
    id: 'recruitment',
    name: '招聘系统',
    icon: Briefcase,
    count: products.filter(p => p.category === 'recruitment').length
  }, {
    id: 'marketing',
    name: '营销系统',
    icon: Megaphone,
    count: products.filter(p => p.category === 'marketing').length
  }, {
    id: 'ecommerce',
    name: '电商系统',
    icon: ShoppingBag,
    count: products.filter(p => p.category === 'ecommerce').length
  }];

  // 排序选项
  const sortOptions = [{
    id: 'popular',
    name: '最受欢迎'
  }, {
    id: 'price-low',
    name: '价格从低到高'
  }, {
    id: 'price-high',
    name: '价格从高到低'
  }, {
    id: 'rating',
    name: '评分最高'
  }, {
    id: 'newest',
    name: '最新上架'
  }];

  // 筛选产品
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()) || product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-50',
        badge: 'bg-purple-500'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-50',
        badge: 'bg-blue-500'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:bg-green-50',
        badge: 'bg-green-500'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        hover: 'hover:bg-indigo-50',
        badge: 'bg-indigo-500'
      },
      pink: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        border: 'border-pink-200',
        hover: 'hover:bg-pink-50',
        badge: 'bg-pink-500'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        hover: 'hover:bg-orange-50',
        badge: 'bg-orange-500'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  // 处理产品点击
  const handleProductClick = productId => {
    const product = products.find(p => p.id === productId);
    if (product && product.pageId) {
      $w.utils.navigateTo && $w.utils.navigateTo({
        pageId: product.pageId
      });
    }
  };

  // 渲染产品卡片
  const renderProductCard = product => {
    const Icon = product.icon;
    const colors = getColorClasses(product.color);
    return <Card key={product.id} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1" onClick={() => handleProductClick(product.id)}>
        <CardContent className="p-6">
          {/* 产品头部 */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center`}>
              <Icon className={`w-8 h-8 ${colors.text}`} />
            </div>
            <div className="flex items-center space-x-2">
              {product.badge && <span className={`px-2 py-1 text-xs font-semibold text-white ${colors.badge} rounded-full`}>
                  {product.badge}
                </span>}
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 产品信息 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            
            {/* 标签 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.map((tag, index) => <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {tag}
                </span>)}
            </div>

            {/* 评分和用户数 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                </div>
                <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
              </div>
              <span className="text-sm text-gray-500">{product.users} 用户</span>
            </div>

            {/* 特性列表 */}
            <div className="space-y-1 mb-4">
              {product.features.slice(0, 3).map((feature, index) => <div key={index} className="flex items-center text-sm text-gray-600">
                  <Check className="w-3 h-3 text-green-500 mr-2" />
                  {feature}
                </div>)}
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(product.stats).map(([key, value]) => <div key={key} className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500">{key === 'satisfaction' ? '满意度' : key === 'responseTime' ? '响应时间' : key === 'dailyChats' ? '日咨询量' : key === 'efficiency' ? '效率提升' : key === 'noShow' ? '爽约率' : key === 'dailyBookings' ? '日预约量' : key === 'completion' ? '完成率' : key === 'skillImprovement' ? '技能提升' : key === 'costReduction' ? '成本降低' : key === 'matchRate' ? '匹配率' : key === 'timeToHire' ? '招聘周期' : key === 'qualityScore' ? '质量评分' : key === 'engagement' ? '互动提升' : key === 'contentGen' ? '内容生成' : key === 'roi' ? '投资回报' : key === 'setupTime' ? '搭建时间' : key === 'conversion' ? '转化率' : '收入增长'}</div>
                  <div className="text-sm font-semibold text-gray-900">{value}</div>
                </div>)}
            </div>
          </div>

          {/* 价格和操作 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">¥{product.price}</span>
                {product.originalPrice > product.price && <span className="text-sm text-gray-500 line-through">¥{product.originalPrice}</span>}
              </div>
              <div className="text-xs text-green-600 font-semibold">
                节省 ¥{product.originalPrice - product.price}
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              查看详情
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>;
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">AI智能产品中心</h1>
            <p className="text-xl mb-8 text-blue-100">全方位AI解决方案，助力企业数字化转型</p>
            
            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索产品名称、功能或标签..." className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" />
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{products.length}</div>
                <div className="text-blue-100">AI产品</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">71,000+</div>
                <div className="text-blue-100">企业用户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">满意度</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">技术支持</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 筛选和排序 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
            const Icon = category.icon;
            return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${selectedCategory === category.id ? 'bg-blue-700' : 'bg-gray-200'}`}>
                    {category.count}
                  </span>
                </button>;
          })}
          </div>

          {/* 排序和视图 */}
          <div className="flex items-center space-x-4">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {sortOptions.map(option => <option key={option.id} value={option.id}>
                  {option.name}
                </option>)}
            </select>
            
            <div className="flex items-center space-x-2">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                </div>
              </Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                <div className="w-4 h-4 space-y-1">
                  <div className="bg-current h-0.5"></div>
                  <div className="bg-current h-0.5"></div>
                  <div className="bg-current h-0.5"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* 产品列表 */}
        <div className="mb-8">
          {filteredProducts.length === 0 ? <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">未找到相关产品</h3>
              <p className="text-gray-600">请尝试其他搜索词或筛选条件</p>
            </div> : <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map(product => viewMode === 'grid' ? renderProductCard(product) : <div key={product.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleProductClick(product.id)}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${getColorClasses(product.color).bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <product.icon className={`w-6 h-6 ${getColorClasses(product.color).text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">¥{product.price}</div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>)}
            </div>}
        </div>

        {/* 推荐产品 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">需要帮助选择合适的产品？</h2>
            <p className="text-gray-600 mb-6">我们的专业顾问团队为您提供个性化的产品推荐和解决方案</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
              pageId: 'system-demo'
            })} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Zap className="w-4 h-4 mr-2" />
                免费演示
              </Button>
              <Button variant="outline" onClick={() => $w.utils.navigateTo && $w.utils.navigateTo({
              pageId: 'online-consultation'
            })} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Users className="w-4 h-4 mr-2" />
                专业咨询
              </Button>
            </div>
          </div>

          {/* 优势展示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">7天免费试用</h3>
              <p className="text-sm text-gray-600">所有产品均提供7天免费试用期，无需信用卡</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">专业实施支持</h3>
              <p className="text-sm text-gray-600">专业团队协助部署，确保快速上线使用</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7技术支持</h3>
              <p className="text-sm text-gray-600">全天候技术支持，随时解决使用问题</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}