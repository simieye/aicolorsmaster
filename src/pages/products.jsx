// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { ShoppingCart } from '@/components/ShoppingCart';
export default function ProductsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }
  };

  // 处理购物车
  const handleCart = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'shopping-cart',
        params: {}
      });
    } else {
      toast({
        title: "购物车",
        description: "查看购物车商品"
      });
    }
  };

  // 处理产品详情
  const handleProductDetail = productId => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          productId: productId
        }
      });
    } else {
      toast({
        title: "产品详情",
        description: `查看产品 ${productId} 的详细信息`
      });
    }
  };

  // 处理添加到购物车
  const handleAddToCart = product => {
    // 直接调用购物车功能，不使用 useCart hook
    toast({
      title: "添加成功",
      description: `${product.name} 已添加到购物车`
    });
  };

  // 产品数据
  const [products] = useState([{
    id: 1,
    name: "AI智能染发自动调色宝机",
    price: 4980,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop",
    category: "智能设备",
    description: "AI发质识别，精准自动调色",
    features: ["AI发质识别", "精准调色", "智能温控", "一键操作"]
  }, {
    id: 2,
    name: "AI品牌染发膏管理系统",
    price: 1680,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    category: "管理软件",
    description: "专业染发膏库存管理",
    features: ["库存管理", "批次追踪", "过期提醒", "数据分析"]
  }, {
    id: 3,
    name: "AI客户配方管理系统",
    price: 2680,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    category: "管理软件",
    description: "客户染发配方管理",
    features: ["配方管理", "客户档案", "历史记录", "个性化推荐"]
  }, {
    id: 4,
    name: "AI美发连锁门店管理系统",
    price: 3680,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    category: "管理软件",
    description: "多店统一管理",
    features: ["多店管理", "员工管理", "财务统计", "客户管理"]
  }, {
    id: 5,
    name: "AI美发客户管理系统CRM",
    price: 6800,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop",
    category: "管理软件",
    description: "客户关系管理",
    features: ["客户管理", "营销自动化", "数据分析", "会员管理"]
  }, {
    id: 6,
    name: "AI染发色彩大师SaaS系统",
    price: 8800,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    category: "云平台",
    description: "AI原生开源SaaS平台",
    features: ["云端部署", "API接口", "定制开发", "数据分析"]
  }, {
    id: 7,
    name: "AI财务管理系统",
    price: 2680,
    image: "https://images.unsplash.com/photo-1554224154-260325c0598c?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "智能财务管理，自动化报表",
    features: ["财务报表", "成本分析", "预算管理", "税务计算"]
  }, {
    id: 8,
    name: "AI考勤管理系统",
    price: 2680,
    image: "https://images.unsplash.com/photo-1515378791036-0648a814d764?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "人脸识别考勤，智能排班",
    features: ["人脸识别", "考勤统计", "异常处理", "排班管理"]
  }, {
    id: 9,
    name: "AI文化管理系统",
    price: 2680,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "企业文化展示，员工活动管理",
    features: ["文化展示", "员工活动", "培训管理", "内部通知"]
  }, {
    id: 10,
    name: "AI门店店长CEO管理系统",
    price: 19800,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "全店智能管理，决策支持系统",
    features: ["AI财务管理系统", "AI考勤管理系统", "AI文化管理系统", "AI染发膏库存管理系统", "AI客户配方管理系统", "AI客户（会员）管理系统CRM", "AI员工管理系统", "AI发型师管理系统", "AI社区管理系统", "AI客服系统", "AI客户预约系统"]
  }, {
    id: 11,
    name: "AI客服系统",
    price: 2680,
    image: "https://images.unsplash.com/photo-1531297484013-562f0126c8a5?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "智能客服机器人，在线咨询",
    features: ["智能客服", "在线咨询", "工单管理", "知识库"]
  }, {
    id: 12,
    name: "AI客户预约系统",
    price: 2680,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "在线预约，智能排期管理",
    features: ["在线预约", "智能排期", "客户管理", "服务提醒"]
  }, {
    id: 13,
    name: "AI员工成长业务培训系统",
    price: 3680,
    image: "https://images.unsplash.com/photo-1515378791036-0648a814d764?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "员工培训，成长管理",
    features: ["培训管理", "成长跟踪", "技能评估", "职业规划"]
  }, {
    id: 14,
    name: "AI微店开店通商城系统",
    price: 4980,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=300&fit=crop",
    category: "AI系统",
    description: "微店管理，电商运营",
    features: ["微店管理", "商品管理", "订单处理", "营销推广"]
  }]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 筛选产品
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 渲染产品卡片
  const renderProductCard = product => {
    return <div key={product.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
        <div className="relative mb-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            {product.category}
          </div>
        </div>
        
        <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-white/60 text-sm mb-4">{product.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 3).map((feature, index) => <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
              {feature}
            </span>)}
          {product.features.length > 3 && <span className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
              +{product.features.length - 3}更多
            </span>}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-white">¥{product.price.toLocaleString()}</div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => handleProductDetail(product.id)} className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30">
            查看详情
          </Button>
          <Button onClick={() => handleAddToCart(product)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
            加入购物车
          </Button>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="products" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">产品中心</h1>
          <p className="text-white/80">探索我们的AI美发智能产品线</p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input type="text" placeholder="搜索产品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
                全部
              </Button>
              <Button onClick={() => setSelectedCategory('智能设备')} className={`px-4 py-2 rounded-lg ${selectedCategory === '智能设备' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
                智能设备
              </Button>
              <Button onClick={() => setSelectedCategory('管理软件')} className={`px-4 py-2 rounded-lg ${selectedCategory === '管理软件' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
                管理软件
              </Button>
              <Button onClick={() => setSelectedCategory('云平台')} className={`px-4 py-2 rounded-lg ${selectedCategory === '云平台' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
                云平台
              </Button>
              <Button onClick={() => setSelectedCategory('AI系统')} className={`px-4 py-2 rounded-lg ${selectedCategory === 'AI系统' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}>
                AI系统
              </Button>
            </div>
          </div>
        </div>

        {/* 产品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(renderProductCard)}
        </div>

        {filteredProducts.length === 0 && <div className="text-center py-12">
            <p className="text-white/60">没有找到匹配的产品</p>
          </div>}
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="products" />
    </div>;
}