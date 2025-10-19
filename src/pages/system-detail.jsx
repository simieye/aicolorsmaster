// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { SystemDetail } from '@/components/SystemDetail';
export default function SystemDetailPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    page
  } = props;
  const {
    toast
  } = useToast();
  const [system, setSystem] = useState(null);
  const [loading, setLoading] = useState(true);

  // 从URL参数获取系统ID
  const systemId = page?.dataset?.params?.systemId;

  // 6大AI美发系统数据
  const systems = {
    1: {
      id: 1,
      name: 'AI智能染发自动调色宝机',
      category: '智能设备',
      price: 4980,
      originalPrice: 5980,
      description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程，大幅提升门店效率。采用先进的AI算法和传感器技术，为美发行业带来革命性变革。',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'],
      stock: 50,
      rating: 4.9,
      reviews: 256,
      monthlySales: 500,
      features: ['AI发质识别', '精准自动调色', '一键操作', '智能温控'],
      specifications: {
        model: 'AI-HC-2024',
        dimensions: '350×280×450mm',
        weight: '8.5kg',
        power: '150W',
        workingTemp: '15-35°C',
        warranty: '1年',
        accuracy: '98.5%',
        mixingTime: '≤30秒',
        capacity: '500ml'
      },
      reviews: [{
        id: 1,
        userName: '张店长',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-15',
        content: '这个设备真的太棒了！大大提高了我们店的染发效率，顾客满意度也提升了很多。AI发质识别功能很准确，调色效果一致性好，节省了很多时间。'
      }, {
        id: 2,
        userName: '李发型师',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-12',
        content: '作为一名专业发型师，我对这个设备非常满意。操作简单，功能强大，特别是AI推荐功能，能够根据客户需求推荐最适合的颜色方案。'
      }]
    },
    2: {
      id: 2,
      name: 'AI品牌染发膏管理系统',
      category: '管理软件',
      price: 1680,
      originalPrice: 1980,
      description: '专业染发膏库存管理系统，智能预警、批次追踪、成本控制，让染发产品管理更高效。支持多品牌、多门店统一管理，实现库存数字化、智能化管理。',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'],
      stock: 999,
      rating: 4.7,
      reviews: 128,
      monthlySales: 300,
      features: ['智能库存管理', '批次追踪', '成本分析', '预警提醒'],
      specifications: {
        model: 'AI-IM-2024',
        version: 'v2.0',
        license: '永久授权',
        support: '7×24小时',
        update: '免费升级',
        warranty: '终身维护',
        database: '云端存储',
        backup: '自动备份'
      },
      reviews: [{
        id: 1,
        userName: '王经理',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-10',
        content: '库存管理变得如此简单！系统能够实时监控库存状态，自动提醒补货，大大减少了库存积压和缺货情况。'
      }]
    },
    3: {
      id: 3,
      name: 'AI客户配方管理系统',
      category: '管理软件',
      price: 2680,
      originalPrice: 3180,
      description: '智能客户染发配方管理，记录客户偏好、历史配方、过敏信息，提供个性化服务体验。建立完整的客户档案，提升服务质量和客户满意度。',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop'],
      stock: 999,
      rating: 4.8,
      reviews: 189,
      monthlySales: 250,
      features: ['客户档案管理', '配方历史记录', '过敏信息提醒', '个性化推荐'],
      specifications: {
        model: 'AI-CM-2024',
        version: 'v3.0',
        license: '永久授权',
        database: '云端存储',
        backup: '自动备份',
        warranty: '终身维护',
        encryption: '银行级加密',
        sync: '实时同步'
      },
      reviews: [{
        id: 1,
        userName: '刘店长',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-08',
        content: '客户管理变得如此轻松！系统能够记录每个客户的详细信息和偏好，让我们的服务更加个性化和专业。'
      }]
    },
    4: {
      id: 4,
      name: 'AI美发连锁门店管理系统',
      category: '管理软件',
      price: 3680,
      originalPrice: 4180,
      description: '专为美发连锁店设计的一体化管理解决方案，涵盖预约、员工、财务、营销等全方位管理。实现多店统一管理，提升运营效率和管理水平。',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'],
      stock: 999,
      rating: 4.6,
      reviews: 167,
      monthlySales: 180,
      features: ['多店统一管理', '智能预约系统', '员工绩效管理', '财务报表分析'],
      specifications: {
        model: 'AI-SM-2024',
        version: 'v4.0',
        license: '永久授权',
        stores: '支持多门店',
        support: '7×24小时',
        warranty: '终身维护',
        cloud: '云端部署',
        mobile: '移动端支持'
      },
      reviews: [{
        id: 1,
        userName: '陈总',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-05',
        content: '连锁管理变得如此简单！系统能够统一管理所有门店，实时监控运营数据，让管理更加高效和精准。'
      }]
    },
    5: {
      id: 5,
      name: 'AI美发客户管理系统CRM',
      category: '管理软件',
      price: 6800,
      originalPrice: 7800,
      description: '专业美发行业CRM系统，客户关系维护、营销自动化、数据分析，助力门店业绩增长。深度整合客户数据，提供精准营销和客户洞察。',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop'],
      stock: 999,
      rating: 4.8,
      reviews: 234,
      monthlySales: 120,
      features: ['客户关系管理', '营销自动化', '数据分析洞察', '会员积分系统'],
      specifications: {
        model: 'AI-CRM-2024',
        version: 'v5.0',
        license: '永久授权',
        users: '不限用户数',
        support: '7×24小时',
        warranty: '终身维护',
        analytics: '高级分析',
        integration: 'API集成'
      },
      reviews: [{
        id: 1,
        userName: '赵经理',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-03',
        content: 'CRM系统让我们的客户管理提升到了新的高度！营销自动化功能帮助我们节省了大量时间，客户满意度显著提升。'
      }]
    },
    6: {
      id: 6,
      name: 'AI染发色彩大师AI原生开源SaaS系统',
      category: 'SaaS平台',
      price: 8800,
      originalPrice: 9800,
      description: '基于AI原生技术开发的染发色彩管理SaaS平台，开源架构、云端部署、支持定制化开发。提供完整的色彩管理解决方案，满足不同规模企业的需求。',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop'],
      stock: 999,
      rating: 4.9,
      reviews: 312,
      monthlySales: 80,
      features: ['AI原生架构', '开源可定制', '云端SaaS部署', 'API接口丰富'],
      specifications: {
        model: 'AI-SaaS-2024',
        version: 'v6.0',
        license: '开源授权',
        deployment: '云端部署',
        support: '7×24小时',
        warranty: '终身维护',
        scalability: '弹性扩展',
        customization: '深度定制'
      },
      reviews: [{
        id: 1,
        userName: '技术总监',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        rating: 5,
        date: '2024-01-01',
        content: '这个SaaS平台太强大了！AI原生架构让系统性能卓越，开源特性让我们能够根据业务需求进行深度定制。'
      }]
    }
  };

  // 加载系统数据
  useEffect(() => {
    const loadSystem = async () => {
      try {
        setLoading(true);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        const systemData = systems[systemId] || systems[1];
        setSystem(systemData);
      } catch (error) {
        console.error('加载系统详情失败:', error);
        toast({
          title: "加载失败",
          description: "系统详情加载失败，请稍后重试",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    if (systemId) {
      loadSystem();
    }
  }, [systemId, toast]);

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

  // 处理购买
  const handlePurchase = (system, plan) => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'checkout',
        params: {
          systemId: system.id,
          plan: plan.name,
          price: plan.price
        }
      });
    } else {
      toast({
        title: "购买方案",
        description: `已选择${plan.name}，价格：¥${plan.price.toLocaleString()}`
      });
    }
  };

  // 处理联系客服
  const handleContactSupport = () => {
    toast({
      title: "联系客服",
      description: "客服热线：400-888-8888"
    });
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>加载系统详情中...</p>
        </div>
      </div>;
  }
  if (!system) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-semibold mb-4">系统不存在</h2>
          <p className="text-white/60 mb-4">请检查系统ID是否正确</p>
          <Button onClick={handleBack} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
            返回首页
          </Button>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="system-detail" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <SystemDetail system={system} onBack={handleBack} onPurchase={handlePurchase} onContactSupport={handleContactSupport} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="system-detail" />
    </div>;
}