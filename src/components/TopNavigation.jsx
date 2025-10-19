// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Menu, X, Home, ShoppingBag, Store, Users, MessageSquare, Settings, CreditCard, UserCheck, Heart, HeadphonesIcon, Calendar, DollarSign, Crown } from 'lucide-react';

export const TopNavigation = ({
  currentPage,
  onNavigate
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigationItems = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'products',
    label: '产品中心',
    icon: ShoppingBag
  }, {
    id: 'store-management',
    label: '门店管理',
    icon: Store
  }, {
    id: 'user-management',
    label: '用户管理',
    icon: Users
  }, {
    id: 'community',
    label: '社区',
    icon: MessageSquare
  }, {
    id: 'ai-systems',
    label: 'AI系统',
    icon: Settings,
    isDropdown: true,
    dropdownItems: [{
      id: 'finance-management',
      label: 'AI财务管理系统',
      icon: DollarSign,
      price: '2680'
    }, {
      id: 'attendance-management',
      label: 'AI考勤管理系统',
      icon: UserCheck,
      price: '2680'
    }, {
      id: 'corporate-culture',
      label: 'AI文化管理系统',
      icon: Heart,
      price: '2680'
    }, {
      id: 'ceo-management',
      label: 'AI店长CEO管理系统',
      icon: Crown,
      price: '19800'
    }, {
      id: 'customer-service',
      label: 'AI客服系统',
      icon: HeadphonesIcon,
      price: '待定'
    }, {
      id: 'appointment-system',
      label: 'AI客户预约系统',
      icon: Calendar,
      price: '待定'
    }]
  }];
  const handleNavigation = pageId => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    setIsMenuOpen(false);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">美发智能系统</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map(item => {
            const Icon = item.icon;
            if (item.isDropdown) {
              return <div key={item.id} className="relative group">
                    <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage?.startsWith('ai-') || currentPage === 'ai-systems' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.dropdownItems.map(dropdownItem => {
                    const DropdownIcon = dropdownItem.icon;
                    return <button key={dropdownItem.id} onClick={() => handleNavigation(dropdownItem.id)} className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors">
                            <DropdownIcon className="w-4 h-4 text-purple-600" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{dropdownItem.label}</div>
                              {dropdownItem.price && <div className="text-xs text-gray-500">¥{dropdownItem.price}</div>}
                            </div>
                          </button>;
                  })}
                    </div>
                  </div>;
            }
            return <button key={item.id} onClick={() => handleNavigation(item.id)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === item.id ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>;
          })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg text-gray-700 hover:bg-gray-100">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map(item => {
            const Icon = item.icon;
            if (item.isDropdown) {
              return <div key={item.id}>
                      <button className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${currentPage?.startsWith('ai-') || currentPage === 'ai-systems' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                      <div className="pl-6 space-y-1">
                        {item.dropdownItems.map(dropdownItem => {
                    const DropdownIcon = dropdownItem.icon;
                    return <button key={dropdownItem.id} onClick={() => handleNavigation(dropdownItem.id)} className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                              <DropdownIcon className="w-4 h-4 text-purple-600" />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{dropdownItem.label}</div>
                                {dropdownItem.price && <div className="text-xs text-gray-500">¥{dropdownItem.price}</div>}
                              </div>
                            </button>;
                  })}
                      </div>
                    </div>;
            }
            return <button key={item.id} onClick={() => handleNavigation(item.id)} className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${currentPage === item.id ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>;
          })}
            </div>
          </div>}
      </div>
    </nav>;
};