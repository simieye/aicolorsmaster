// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Menu, X, ChevronDown, Bot, HeadphonesIcon, Calendar, GraduationCap, Briefcase, Megaphone, ShoppingBag, Home, Users, Settings, Phone, Mail, MapPin, Star, ArrowRight } from 'lucide-react';

export function TopNavigation({
  className = ''
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // AI系统导航数据
  const aiSystems = {
    'customer-service': {
      name: 'AI客服系统',
      icon: HeadphonesIcon,
      description: '24小时智能客服，自动回复',
      color: 'purple',
      price: '¥1,680',
      pageId: 'ai-customer-service-detail'
    },
    'appointment': {
      name: 'AI预约系统',
      icon: Calendar,
      description: '智能预约管理，自动提醒',
      color: 'blue',
      price: '¥1,680',
      pageId: 'ai-appointment-system-detail'
    },
    'training': {
      name: 'AI培训系统',
      icon: GraduationCap,
      description: '个性化培训方案，技能提升',
      color: 'green',
      price: '¥3,680',
      pageId: 'ai-employee-training-detail'
    },
    'recruitment': {
      name: 'AI招聘系统',
      icon: Briefcase,
      description: '智能招聘代理，人才匹配',
      color: 'indigo',
      price: '¥2,680',
      pageId: 'ai-recruitment-detail'
    },
    'marketing': {
      name: 'AI营销系统',
      icon: Megaphone,
      description: '全网社媒营销，内容生成',
      color: 'pink',
      price: '¥2,680',
      pageId: 'ai-marketing-detail'
    },
    'store': {
      name: 'AI微店系统',
      icon: ShoppingBag,
      description: '开店通商城，店铺管理',
      color: 'orange',
      price: '¥4,980',
      pageId: 'ai-micro-store-detail'
    }
  };

  // 导航菜单分类
  const navigationCategories = [{
    title: 'AI智能系统',
    items: [{
      ...aiSystems['customer-service'],
      category: 'customer-service'
    }, {
      ...aiSystems['appointment'],
      category: 'appointment'
    }, {
      ...aiSystems['training'],
      category: 'training'
    }, {
      ...aiSystems['recruitment'],
      category: 'recruitment'
    }]
  }, {
    title: '商业应用',
    items: [{
      ...aiSystems['marketing'],
      category: 'marketing'
    }, {
      ...aiSystems['store'],
      category: 'store'
    }]
  }];

  // 快速链接
  const quickLinks = [{
    name: '首页',
    icon: Home,
    pageId: 'home'
  }, {
    name: '产品中心',
    icon: ShoppingBag,
    pageId: 'products'
  }, {
    name: 'AI助手',
    icon: Bot,
    pageId: 'ai-chat'
  }, {
    name: '系统演示',
    icon: Star,
    pageId: 'system-demo'
  }, {
    name: '客户案例',
    icon: Users,
    pageId: 'customer-cases'
  }, {
    name: '在线咨询',
    icon: Phone,
    pageId: 'online-consultation'
  }];

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-50'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-50'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:bg-green-50'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        hover: 'hover:bg-indigo-50'
      },
      pink: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        border: 'border-pink-200',
        hover: 'hover:bg-pink-50'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        hover: 'hover:bg-orange-50'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  // 处理页面跳转
  const handleNavigation = pageId => {
    // 这里应该使用实际的导航方法
    console.log(`Navigate to: ${pageId}`);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };
  return <nav className={`bg-white shadow-lg border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AI智能系统</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* AI系统下拉菜单 */}
            <div className="relative">
              <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors" onMouseEnter={() => setActiveDropdown('ai-systems')} onMouseLeave={() => setActiveDropdown(null)}>
                AI系统
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'ai-systems' && <div className="absolute left-0 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl border border-gray-200 z-50" onMouseEnter={() => setActiveDropdown('ai-systems')} onMouseLeave={() => setActiveDropdown(null)}>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {navigationCategories.map((category, index) => <div key={index}>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
                          <div className="space-y-3">
                            {category.items.map(item => {
                        const Icon = item.icon;
                        const colors = getColorClasses(item.color);
                        return <button key={item.category} onClick={() => handleNavigation(item.pageId)} className={`w-full flex items-center p-3 rounded-lg ${colors.hover} transition-colors text-left`}>
                                  <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center mr-3`}>
                                    <Icon className={`w-5 h-5 ${colors.text}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">{item.description}</div>
                                    <div className="text-xs text-green-600 font-semibold">{item.price}</div>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-gray-400" />
                                </button>;
                      })}
                          </div>
                        </div>)}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">需要帮助选择？</h4>
                          <p className="text-sm text-gray-500">我们的专家团队为您提供专业建议</p>
                        </div>
                        <Button onClick={() => handleNavigation('online-consultation')} className="bg-blue-600 hover:bg-blue-700 text-white">
                          免费咨询
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>

            {/* 快速链接 */}
            {quickLinks.map(link => {
            const Icon = link.icon;
            return <button key={link.name} onClick={() => handleNavigation(link.pageId)} className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  <Icon className="w-4 h-4 mr-1" />
                  {link.name}
                </button>;
          })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={() => handleNavigation('system-demo')} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              系统演示
            </Button>
            <Button onClick={() => handleNavigation('online-consultation')} className="bg-blue-600 hover:bg-blue-700 text-white">
              立即咨询
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* AI系统移动端菜单 */}
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">AI智能系统</h3>
              <div className="space-y-1">
                {Object.values(aiSystems).map(system => {
              const Icon = system.icon;
              const colors = getColorClasses(system.color);
              return <button key={system.name} onClick={() => handleNavigation(system.pageId)} className={`w-full flex items-center p-2 rounded-lg ${colors.hover} transition-colors`}>
                      <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center mr-3`}>
                        <Icon className={`w-4 h-4 ${colors.text}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-sm">{system.name}</div>
                        <div className="text-xs text-gray-500">{system.description}</div>
                        <div className="text-xs text-green-600 font-semibold">{system.price}</div>
                      </div>
                    </button>;
            })}
              </div>
            </div>

            {/* 快速链接移动端菜单 */}
            <div className="px-3 py-2 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">快速导航</h3>
              <div className="space-y-1">
                {quickLinks.map(link => {
              const Icon = link.icon;
              return <button key={link.name} onClick={() => handleNavigation(link.pageId)} className="w-full flex items-center p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Icon className="w-4 h-4 mr-3" />
                      <span className="text-sm font-medium">{link.name}</span>
                    </button>;
            })}
              </div>
            </div>

            {/* CTA按钮移动端 */}
            <div className="px-3 py-2 border-t border-gray-200 space-y-2">
              <Button variant="outline" onClick={() => handleNavigation('system-demo')} className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                系统演示
              </Button>
              <Button onClick={() => handleNavigation('online-consultation')} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                立即咨询
              </Button>
            </div>
          </div>
        </div>}
    </nav>;
}