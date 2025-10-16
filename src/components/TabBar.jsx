// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Home, Palette, Beaker, Users, User, MessageSquare, Bell, Settings, Search, Plus, Camera, Mic, ChevronUp, Zap, Heart, Star, TrendingUp, Package, ShoppingCart, HelpCircle, LogOut, Menu, X, FlaskConical, Layers, Store, Megaphone, UsersCog } from 'lucide-react';

export function TabBar({
  currentPage,
  onPageChange,
  unreadMessages = 0,
  unreadNotifications = 0
}) {
  const [activeTab, setActiveTab] = useState(currentPage || 'home');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const tabbarRef = useRef(null);

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 监听触摸事件
  useEffect(() => {
    const handleTouchStart = e => {
      setTouchStartY(e.touches[0].clientY);
    };
    const handleTouchEnd = e => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // 上滑显示快捷操作
      if (deltaY > 50 && !showQuickActions) {
        setShowQuickActions(true);
      }
      // 下滑隐藏快捷操作
      else if (deltaY < -50 && showQuickActions) {
        setShowQuickActions(false);
      }
    };
    const tabbarElement = tabbarRef.current;
    if (tabbarElement) {
      tabbarElement.addEventListener('touchstart', handleTouchStart);
      tabbarElement.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (tabbarElement) {
        tabbarElement.removeEventListener('touchstart', handleTouchStart);
        tabbarElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStartY, showQuickActions]);

  // 导航项配置 - 扩展为8个主要功能
  const navItems = [{
    id: 'home',
    name: '首页',
    icon: Home,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    badge: 0
  }, {
    id: 'color-recognition',
    name: '识色',
    icon: Palette,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    badge: 0
  }, {
    id: 'formula-generation',
    name: '配方',
    icon: Beaker,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    badge: 0
  }, {
    id: 'mixing-simulation',
    name: '模拟',
    icon: FlaskConical,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    badge: 0
  }, {
    id: 'community',
    name: '社区',
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    badge: unreadMessages
  }, {
    id: 'products',
    name: '产品',
    icon: Package,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    badge: 0
  }, {
    id: 'marketing',
    name: '营销',
    icon: Megaphone,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    badge: 0
  }, {
    id: 'user-management',
    name: '管理',
    icon: UsersCog,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    badge: unreadNotifications
  }];

  // 快捷操作配置
  const quickActions = [{
    id: 'ai-chat',
    name: 'AI对话',
    icon: MessageSquare,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    action: () => {
      // 打开AI对话
      console.log('打开AI对话');
    }
  }, {
    id: 'camera',
    name: '拍照识色',
    icon: Camera,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    action: () => {
      // 打开相机
      console.log('打开相机');
    }
  }, {
    id: 'voice',
    name: '语音助手',
    icon: Mic,
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    action: () => {
      // 打开语音助手
      console.log('打开语音助手');
    }
  }, {
    id: 'search',
    name: '智能搜索',
    icon: Search,
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    action: () => {
      // 打开搜索
      console.log('打开搜索');
    }
  }];

  // 处理导航切换
  const handleTabChange = tabId => {
    if (tabId === activeTab) return;
    setIsAnimating(true);
    setActiveTab(tabId);

    // 触发页面切换动画
    setTimeout(() => {
      onPageChange && onPageChange(tabId);
      setIsAnimating(false);
    }, 300);
  };

  // 获取导航项样式
  const getNavItemStyle = item => {
    const isActive = activeTab === item.id;
    return `
      relative flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all duration-300 transform
      ${isActive ? `${item.color} ${item.bgColor} scale-110 shadow-lg` : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
      ${isAnimating ? 'pointer-events-none' : ''}
    `;
  };
  return <>
      {/* 快捷操作面板 */}
      <div className={`fixed bottom-20 left-0 right-0 z-40 transition-all duration-500 transform ${showQuickActions ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-100 pointer-events-none'}`}>
        <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">快捷操作</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowQuickActions(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map(action => {
              const Icon = action.icon;
              return <button key={action.id} onClick={action.action} className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105">
                    <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-gray-700 font-medium">{action.name}</span>
                  </button>;
            })}
            </div>
          </div>
        </div>
      </div>

      {/* 消息面板 */}
      {showMessagePanel && <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-96 overflow-y-auto animate-slide-up">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">消息中心</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowMessagePanel(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">系统消息</p>
                    <p className="text-xs text-gray-600">您有新的配方推荐</p>
                  </div>
                  <span className="text-xs text-blue-600">刚刚</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">社区互动</p>
                    <p className="text-xs text-gray-600">有人回复了您的评论</p>
                  </div>
                  <span className="text-xs text-green-600">5分钟前</span>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 通知面板 */}
      {showNotificationPanel && <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-96 overflow-y-auto animate-slide-up">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">通知中心</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNotificationPanel(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">版本更新</p>
                    <p className="text-xs text-gray-600">新版本已发布，快来体验</p>
                  </div>
                  <span className="text-xs text-purple-600">1小时前</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">趋势提醒</p>
                    <p className="text-xs text-gray-600">春季流行色已更新</p>
                  </div>
                  <span className="text-xs text-orange-600">2小时前</span>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* 主导航栏 - 适配8个导航项 */}
      <div ref={tabbarRef} className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30" style={{
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
        <div className="relative">
          {/* 导航内容 */}
          <div className="flex items-center justify-around py-1">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return <button key={item.id} onClick={() => handleTabChange(item.id)} className={getNavItemStyle(item)} style={{
              minWidth: isMobile ? '40px' : '60px'
            }}>
                  {/* 激活状态背景 */}
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg animate-pulse" />}
                  
                  {/* 图标容器 */}
                  <div className="relative">
                    <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`} />
                    
                    {/* 徽章 */}
                    {item.badge > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>}
                    
                    {/* 激活状态指示器 */}
                    {isActive && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-pulse" />}
                  </div>
                  
                  {/* 文字标签 - 缩小字体以适应8个导航项 */}
                  <span className={`text-xs mt-1 font-medium transition-all duration-300 ${isActive ? 'opacity-100 transform scale-105' : 'opacity-70'}`}>
                    {item.name}
                  </span>
                  
                  {/* 触摸反馈波纹 */}
                  {isActive && <div className="absolute inset-0 rounded-lg animate-ping bg-current opacity-20" />}
                </button>;
          })}
          </div>
          
          {/* 快捷操作提示 */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className={`flex items-center space-x-1 bg-gray-800 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 ${showQuickActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              <ChevronUp className="w-3 h-3" />
              <span>上滑显示更多</span>
            </div>
          </div>
        </div>
      </div>

      {/* 样式定义 */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>;
}

// 默认导出
export default TabBar;