// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Package, Bot, Users, User, ShoppingCart, MessageCircle, Settings, QrCode, Palette, Beaker, Store } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export function TabBar({
  currentPage = 'home'
}) {
  const {
    toast
  } = useToast();

  // 导航菜单配置
  const menuItems = [{
    id: 'home',
    label: '首页',
    icon: Home,
    pageId: 'home',
    badge: null,
    color: 'text-green-400'
  }, {
    id: 'products',
    label: '产品',
    icon: Package,
    pageId: 'products',
    badge: null,
    color: 'text-blue-400'
  }, {
    id: 'ai-chat',
    label: 'AI',
    icon: Bot,
    pageId: 'ai-chat',
    badge: 3,
    color: 'text-purple-400'
  }, {
    id: 'community',
    label: '社区',
    icon: Users,
    pageId: 'community',
    badge: null,
    color: 'text-orange-400'
  }, {
    id: 'user',
    label: '我的',
    icon: User,
    pageId: 'user-management',
    badge: null,
    color: 'text-pink-400'
  }];

  // 扩展菜单配置（包含更多页面）
  const extendedMenuItems = [...menuItems, {
    id: 'marketing',
    label: '营销',
    icon: ShoppingCart,
    pageId: 'marketing',
    badge: null,
    color: 'text-yellow-400'
  }, {
    id: 'formula',
    label: '配方',
    icon: Beaker,
    pageId: 'formula-management',
    badge: null,
    color: 'text-cyan-400'
  }, {
    id: 'color',
    label: '色彩',
    icon: Palette,
    pageId: 'color-library',
    badge: null,
    color: 'text-indigo-400'
  }, {
    id: 'qr-scanner',
    label: '扫码',
    icon: QrCode,
    pageId: 'qr-scanner',
    badge: null,
    color: 'text-emerald-400'
  }, {
    id: 'store',
    label: '门店',
    icon: Store,
    pageId: 'store-management',
    badge: null,
    color: 'text-red-400'
  }];

  // 获取当前显示的菜单项
  const getCurrentMenuItems = () => {
    // 根据当前页面显示相关的菜单项
    const pageSpecificMenus = {
      'marketing': [menuItems[0], menuItems[1], extendedMenuItems[5], menuItems[3], menuItems[4]],
      'formula-management': [menuItems[0], menuItems[1], extendedMenuItems[6], menuItems[3], menuItems[4]],
      'color-library': [menuItems[0], menuItems[1], extendedMenuItems[7], menuItems[3], menuItems[4]],
      'qr-scanner': [menuItems[0], menuItems[1], extendedMenuItems[8], menuItems[3], menuItems[4]],
      'store-management': [menuItems[0], menuItems[1], extendedMenuItems[9], menuItems[3], menuItems[4]],
      'color-recognition': [menuItems[0], menuItems[1], extendedMenuItems[7], menuItems[3], menuItems[4]],
      'formula-generation': [menuItems[0], menuItems[1], extendedMenuItems[6], menuItems[3], menuItems[4]],
      'mixing-simulation': [menuItems[0], menuItems[1], extendedMenuItems[6], menuItems[3], menuItems[4]],
      'personalized-recommendation': [menuItems[0], menuItems[1], extendedMenuItems[6], menuItems[3], menuItems[4]]
    };
    return pageSpecificMenus[currentPage] || menuItems;
  };
  const handleNavigation = item => {
    // 使用系统API进行页面跳转
    if (window.$w && window.$w.utils && window.$w.utils.navigateTo) {
      window.$w.utils.navigateTo({
        pageId: item.pageId,
        params: {}
      });
    } else {
      // 降级处理：使用window.location
      console.log(`导航到页面: ${item.pageId}`);
      // 显示提示信息
      toast({
        title: "页面跳转",
        description: `正在跳转到${item.label}页面`
      });
    }
  };
  const currentMenuItems = getCurrentMenuItems();
  const activeItem = currentMenuItems.find(item => item.pageId === currentPage) || menuItems[0];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 z-50">
      {/* 主导航区域 */}
      <div className="flex justify-around items-center py-2">
        {currentMenuItems.map(item => {
        const Icon = item.icon;
        const isActive = item.pageId === currentPage || item.id === currentPage;
        return <button key={item.id} onClick={() => handleNavigation(item)} className={`
                nav-item flex flex-col items-center p-2 relative transition-all duration-300
                ${isActive ? `${item.color} transform scale-110` : 'text-white/70 hover:text-white hover:transform hover:-translate-y-1'}
              `}>
              {/* 图标 */}
              <div className={`
                icon text-xl mb-1 transition-all duration-300
                ${isActive ? 'animate-pulse' : ''}
              `}>
                <Icon className={`
                    w-6 h-6
                    ${isActive ? 'drop-shadow-lg' : ''}
                  `} />
              </div>
              
              {/* 标签 */}
              <span className="text-xs font-medium">
                {item.label}
              </span>
              
              {/* 徽章 */}
              {item.badge && item.badge > 0 && <span className="badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>}
              
              {/* 活动指示器 */}
              {isActive && <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-current to-current rounded-full"></div>}
            </button>;
      })}
      </div>

      {/* 活动指示器条 */}
      <div className="flex justify-center pb-2">
        <div className={`
            h-1 rounded-full transition-all duration-300
            ${activeItem ? `${activeItem.color.replace('text-', 'bg-')} w-16` : 'bg-green-400 w-12'}
          `}></div>
      </div>

      {/* 样式定义 */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05); 
          }
        }
        
        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-3px); 
          }
        }
        
        .nav-item {
          position: relative;
        }
        
        .nav-item:hover .icon {
          transform: scale(1.1);
        }
        
        .badge {
          animation: bounce 1s infinite;
        }
        
        .icon.animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </nav>;
}
export default TabBar;