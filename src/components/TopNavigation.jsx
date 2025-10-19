// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Menu, X, Home, ShoppingBag, Users, MessageSquare, Settings, CreditCard, UserCheck, Heart, Crown, ChevronDown } from 'lucide-react';

export const TopNavigation = ({
  currentPage
}) => {
  const {
    toast
  } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // AI管理系统菜单项
  const aiManagementSystems = [{
    id: 'finance',
    name: 'AI财务管理系统',
    price: '2680',
    icon: CreditCard,
    pageId: 'finance-management',
    description: '智能财务管理，提升效率'
  }, {
    id: 'attendance',
    name: 'AI考勤管理系统',
    price: '2680',
    icon: UserCheck,
    pageId: 'attendance-management',
    description: '人脸识别打卡，智能考勤'
  }, {
    id: 'culture',
    name: 'AI文化管理系统',
    price: '2680',
    icon: Heart,
    pageId: 'corporate-culture',
    description: '企业文化管理，员工活动'
  }, {
    id: 'ceo',
    name: 'AI门店店长CEO管理系统',
    price: '19800',
    icon: Crown,
    pageId: 'store-management-enhanced',
    description: '全方位门店管理，CEO视角'
  }];

  // 主要导航项
  const mainNavItems = [{
    id: 'home',
    name: '首页',
    icon: Home,
    pageId: 'home'
  }, {
    id: 'products',
    name: '产品',
    icon: ShoppingBag,
    pageId: 'products'
  }, {
    id: 'community',
    name: '社区',
    icon: Users,
    pageId: 'community'
  }, {
    id: 'consultation',
    name: '咨询',
    icon: MessageSquare,
    pageId: 'online-consultation'
  }];

  // 处理导航点击
  const handleNavClick = (pageId, systemName) => {
    if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
      window.$w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    } else {
      toast({
        title: "导航",
        description: `正在前往${systemName || pageId}`
      });
    }
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // 处理移动端菜单切换
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 处理下拉菜单切换
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 渲染导航项
  const renderNavItem = (item, isMobile = false) => {
    const Icon = item.icon;
    const isActive = currentPage === item.pageId;
    return <button key={item.id} onClick={() => handleNavClick(item.pageId, item.name)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border border-white/30' : 'text-white/80 hover:text-white hover:bg-white/10'} ${isMobile ? 'w-full justify-start' : ''}`}>
        <Icon className="w-4 h-4" />
        <span>{item.name}</span>
      </button>;
  };

  // 渲染AI管理系统项
  const renderAIManagementItem = (system, isMobile = false) => {
    const Icon = system.icon;
    const isActive = currentPage === system.pageId;
    return <button key={system.id} onClick={() => handleNavClick(system.pageId, system.name)} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/20 text-white border border-white/30' : 'text-white/80 hover:text-white hover:bg-white/10'} ${isMobile ? 'w-full justify-start' : ''}`}>
        <div className={`w-8 h-8 ${isActive ? 'bg-blue-500' : 'bg-white/10'} rounded-lg flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="font-medium">{system.name}</div>
          <div className="text-xs opacity-70">¥{system.price}</div>
        </div>
      </button>;
  };
  return <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-white font-semibold text-lg">美发智能系统</span>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            {mainNavItems.map(item => renderNavItem(item))}
            
            {/* AI管理系统下拉菜单 */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                <Crown className="w-4 h-4" />
                <span>AI管理系统</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold mb-3">AI管理系统</h3>
                    <div className="space-y-2">
                      {aiManagementSystems.map(system => <div key={system.id} className="group">
                          {renderAIManagementItem(system)}
                          <p className="text-xs text-gray-600 ml-11 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {system.description}
                          </p>
                        </div>)}
                    </div>
                  </div>
                </div>}
            </div>
          </nav>

          {/* 移动端菜单按钮 */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white/80 hover:text-white p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 移动端导航菜单 */}
        {isMobileMenuOpen && <div className="md:hidden border-t border-white/20">
            <nav className="py-4 space-y-2">
              {mainNavItems.map(item => renderNavItem(item, true))}
              
              {/* AI管理系统移动端 */}
              <div className="pt-4 border-t border-white/20">
                <h3 className="text-white/60 text-sm font-medium px-3 mb-2">AI管理系统</h3>
                <div className="space-y-2">
                  {aiManagementSystems.map(system => renderAIManagementItem(system, true))}
                </div>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};