// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { HomeHero } from '@/components/HomeHero';
// @ts-ignore;
import { StatsCards } from '@/components/StatsCards';
// @ts-ignore;
import { ProductShowcase } from '@/components/ProductShowcase';
// @ts-ignore;
import { QuickActions } from '@/components/QuickActions';
// @ts-ignore;
import { RecentActivity } from '@/components/RecentActivity';
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 用户状态
  const [user] = useState({
    name: '访客用户',
    lastLogin: new Date().toISOString()
  });
  const [isAuthenticated] = useState(false);

  // 产品数据 - 6大AI美发系统
  const [products] = useState([{
    id: 1,
    name: 'AI智能染发自动调色宝机',
    category: '智能设备',
    price: 4980,
    description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程，大幅提升门店效率',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop',
    stock: 50,
    rating: 4.9,
    reviews: 256,
    features: ['AI发质识别', '精准自动调色', '一键操作', '智能温控'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }, {
    id: 2,
    name: 'AI品牌染发膏管理系统',
    category: '管理软件',
    price: 1680,
    description: '专业染发膏库存管理系统，智能预警、批次追踪、成本控制，让染发产品管理更高效',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.7,
    reviews: 128,
    features: ['智能库存管理', '批次追踪', '成本分析', '预警提醒'],
    createdAt: '2024-01-10T15:30:00Z',
    updatedAt: '2024-01-10T15:30:00Z'
  }, {
    id: 3,
    name: 'AI客户配方管理系统',
    category: '管理软件',
    price: 2680,
    description: '智能客户染发配方管理，记录客户偏好、历史配方、过敏信息，提供个性化服务体验',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.8,
    reviews: 189,
    features: ['客户档案管理', '配方历史记录', '过敏信息提醒', '个性化推荐'],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z'
  }, {
    id: 4,
    name: 'AI美发连锁门店管理系统',
    category: '管理软件',
    price: 3680,
    description: '专为美发连锁店设计的一体化管理解决方案，涵盖预约、员工、财务、营销等全方位管理',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.6,
    reviews: 167,
    features: ['多店统一管理', '智能预约系统', '员工绩效管理', '财务报表分析'],
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-05T14:20:00Z'
  }, {
    id: 5,
    name: 'AI美发客户管理系统CRM',
    category: '管理软件',
    price: 6800,
    description: '专业美发行业CRM系统，客户关系维护、营销自动化、数据分析，助力门店业绩增长',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.8,
    reviews: 234,
    features: ['客户关系管理', '营销自动化', '数据分析洞察', '会员积分系统'],
    createdAt: '2024-01-03T11:45:00Z',
    updatedAt: '2024-01-03T11:45:00Z'
  }, {
    id: 6,
    name: 'AI染发色彩大师AI原生开源SaaS系统',
    category: 'SaaS平台',
    price: 8800,
    description: '基于AI原生技术开发的染发色彩管理SaaS平台，开源架构、云端部署、支持定制化开发',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    stock: 999,
    rating: 4.9,
    reviews: 312,
    features: ['AI原生架构', '开源可定制', '云端SaaS部署', 'API接口丰富'],
    createdAt: '2024-01-01T16:30:00Z',
    updatedAt: '2024-01-01T16:30:00Z'
  }]);

  // 统计数据
  const [stats] = useState({
    totalProducts: 6,
    totalFormulas: 156,
    totalColors: 89,
    totalUsers: 128
  });

  // 处理产品点击
  const handleProductClick = product => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'product-detail',
        params: {
          productId: product.id
        }
      });
    } else {
      toast({
        title: "产品详情",
        description: `查看 ${product.name} 的详细信息`
      });
    }
  };

  // 快速操作处理
  const handleQuickAction = action => {
    switch (action) {
      case 'ai-chat':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'ai-chat',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "AI聊天功能正在开发中，敬请期待"
          });
        }
        break;
      case 'qr-scanner':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'qr-scanner',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "扫码功能正在开发中，敬请期待"
          });
        }
        break;
      case 'color-recognition':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'color-recognition',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "色彩识别功能正在开发中，敬请期待"
          });
        }
        break;
      case 'formula-generation':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'formula-generation',
            params: {}
          });
        } else {
          toast({
            title: "功能开发中",
            description: "配方生成功能正在开发中，敬请期待"
          });
        }
        break;
      case 'store-management':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'store-management-system',
            params: {}
          });
        } else {
          toast({
            title: "门店管理",
            description: "正在跳转到门店管理系统"
          });
        }
        break;
      case 'customer-management':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'user-management',
            params: {}
          });
        } else {
          toast({
            title: "客户管理",
            description: "正在跳转到客户管理系统"
          });
        }
        break;
      case 'inventory-management':
        if ($w.utils && $w.utils.navigateTo) {
          $w.utils.navigateTo({
            pageId: 'store-management',
            params: {}
          });
        } else {
          toast({
            title: "库存管理",
            description: "正在跳转到库存管理系统"
          });
        }
        break;
      default:
        toast({
          title: "功能开发中",
          description: "该功能正在开发中，敬请期待"
        });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="home" />

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* 欢迎区域 */}
        <HomeHero isAuthenticated={isAuthenticated} user={user} onQuickAction={handleQuickAction} />

        {/* 统计数据卡片 */}
        <StatsCards stats={stats} />

        {/* 6大AI美发系统展示 */}
        <ProductShowcase products={products} onProductClick={handleProductClick} />

        {/* 快速操作 */}
        <QuickActions onQuickAction={handleQuickAction} />

        {/* 最近活动 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* 这里可以添加更多内容，比如图表、新闻等 */}
            <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">系统优势</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">AI智能算法</h3>
                  <p className="text-white/60 text-sm">采用先进的AI算法，精准识别发质，智能推荐最佳染发方案</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">云端数据同步</h3>
                  <p className="text-white/60 text-sm">实时同步客户数据和配方信息，确保多店数据一致性</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">安全可靠</h3>
                  <p className="text-white/60 text-sm">银行级数据加密，确保客户隐私和商业数据安全</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">专业支持</h3>
                  <p className="text-white/60 text-sm">7×24小时专业技术支持，确保系统稳定运行</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <RecentActivity />
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="home" />
    </div>;
}