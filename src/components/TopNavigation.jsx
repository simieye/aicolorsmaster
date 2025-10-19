// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Scissors, Robot, Palette, Users, Store, Heart, Cloud, ChevronDown, Phone, ShoppingCart, Menu, X, Star, Shield, Zap } from 'lucide-react';

export const TopNavigation = ({
  currentPage
}) => {
  const {
    toast
  } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 6大AI美发系统产品数据
  const products = [{
    id: 1,
    name: 'AI智能染发自动调色宝机',
    shortName: 'AI智能调色宝机',
    price: 4980,
    icon: Robot,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    description: '新一代AI智能染发设备，自动识别发质、精准调色',
    features: ['AI发质识别', '精准自动调色', '一键操作', '智能温控'],
    pageId: 'product-detail'
  }, {
    id: 2,
    name: 'AI品牌染发膏管理系统',
    shortName: '染发膏管理系统',
    price: 1680,
    icon: Palette,
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    description: '专业染发膏库存管理系统，智能预警、批次追踪',
    features: ['智能库存管理', '批次追踪', '成本分析', '预警提醒'],
    pageId: 'product-detail'
  }, {
    id: 3,
    name: 'AI客户配方管理系统',
    shortName: '客户配方管理',
    price: 2680,
    icon: Users,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    description: '智能客户染发配方管理，记录客户偏好、历史配方',
    features: ['客户档案管理', '配方历史记录', '过敏信息提醒', '个性化推荐'],
    pageId: 'product-detail'
  }, {
    id: 4,
    name: 'AI美发连锁门店管理系统',
    shortName: '连锁门店管理',
    price: 3680,
    icon: Store,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    description: '专为美发连锁店设计的一体化管理解决方案',
    features: ['多店统一管理', '智能预约系统', '员工绩效管理', '财务报表分析'],
    pageId: 'product-detail'
  }, {
    id: 5,
    name: 'AI美发客户管理系统CRM',
    shortName: '客户管理系统CRM',
    price: 6800,
    icon: Heart,
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    description: '专业美发行业CRM系统，客户关系维护、营销自动化',
    features: ['客户关系管理', '营销自动化', '数据分析洞察', '会员积分系统'],
    pageId: 'product-detail'
  }, {
    id: 6,
    name: 'AI染发色彩大师AI原生开源SaaS系统',
    shortName: '色彩大师SaaS',
    price: 8800,
    icon: Cloud,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500',
    description: '基于AI原生技术开发的染发色彩管理SaaS平台',
    features: ['AI原生架构', '开源可定制', '云端SaaS部署', 'API接口丰富'],
    pageId: 'product-detail'
  }];

  // 处理导航点击
  const handleNavigation = (pageId, params = {}) => {
    if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
      window.$w.utils.navigateTo({
        pageId: pageId,
        params: params
      });
    } else {
      console.log('Navigate to:', pageId, params);
      toast({
        title: "页面跳转",
        description: `正在跳转到 ${pageId} 页面`
      });
    }
  };

  // 处理产品点击
  const handleProductClick = product => {
    handleNavigation(product.pageId, {
      productId: product.id
    });
    setActiveDropdown(null);
  };

  // 处理立即购买
  const handleBuyNow = product => {
    handleNavigation('product-detail', {
      productId: product.id,
      action: 'buy'
    });
    setActiveDropdown(null);
  };

  // 处理联系客服
  const handleContactSupport = () => {
    toast({
      title: "联系客服",
      description: "客服热线：400-888-8888"
    });
  };

  // 处理移动端菜单切换
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 处理下拉菜单
  const toggleDropdown = productId => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };
  return <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo和品牌 */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Scissors className="text-purple-600 text-xl" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">AI美发智能系统</h1>
              <p className="text-white/60 text-xs">专业美发数字化解决方案</p>
            </div>
          </div>

          {/* 主导航菜单 - 桌面端 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {products.map(product => {
            const Icon = product.icon;
            return <div key={product.id} className="relative dropdown">
                  <button className="nav-item bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20 flex items-center space-x-2 transition-all duration-300" onClick={() => toggleDropdown(product.id)}>
                    <Icon className={`w-4 h-4 ${product.color}`} />
                    <div className="text-left">
                      <div className="text-sm font-medium">{product.shortName}</div>
                      <div className="text-xs text-white/60">¥{product.price.toLocaleString()}</div>
                    </div>
                    <ChevronDown className={`w-3 h-3 text-white/60 transition-transform ${activeDropdown === product.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* 下拉菜单 */}
                  {activeDropdown === product.id && <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 ${product.bgColor} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                            <p className="text-red-500 font-bold">¥{product.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs mb-3">{product.description}</p>
                        <div className="space-y-1 mb-3">
                          {product.features.slice(0, 2).map((feature, index) => <div key={index} className="flex items-center text-gray-700 text-xs">
                              <Star className="w-3 h-3 text-yellow-400 mr-1" />
                              {feature}
                            </div>)}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleProductClick(product)} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                            查看详情
                          </Button>
                          <Button size="sm" onClick={() => handleBuyNow(product)} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                            立即购买
                          </Button>
                        </div>
                      </div>
                    </div>}
                </div>;
          })}
          </nav>

          {/* 右侧操作区 */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" onClick={handleContactSupport} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Phone className="w-4 h-4 mr-2" />
              联系我们
            </Button>
            <Button onClick={() => handleNavigation('products')} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              立即购买
            </Button>
          </div>

          {/* 移动端菜单按钮 */}
          <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && <div className="lg:hidden border-t border-white/20">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {products.map(product => {
            const Icon = product.icon;
            return <div key={product.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => handleProductClick(product)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${product.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-sm">{product.shortName}</h4>
                          <p className="text-white/60 text-xs">{product.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-400 font-bold">¥{product.price.toLocaleString()}</div>
                        <ChevronDown className="w-4 h-4 text-white/60 mx-auto" />
                      </div>
                    </div>
                  </div>;
          })}
              
              <div className="pt-4 border-t border-white/20 space-y-2">
                <Button variant="ghost" onClick={handleContactSupport} className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30">
                  <Phone className="w-4 h-4 mr-2" />
                  联系我们
                </Button>
                <Button onClick={() => handleNavigation('products')} className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  查看所有产品
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </header>;
};