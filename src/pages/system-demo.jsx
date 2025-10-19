// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { SystemDemo } from '@/components/SystemDemo';
export default function SystemDemoPage(props) {
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
      description: '新一代AI智能染发设备，自动识别发质、精准调色，一键完成专业染发过程，大幅提升门店效率。采用先进的AI算法和传感器技术，为美发行业带来革命性变革。',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
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
      }
    },
    2: {
      id: 2,
      name: 'AI品牌染发膏管理系统',
      category: '管理软件',
      price: 1680,
      description: '专业染发膏库存管理系统，智能预警、批次追踪、成本控制，让染发产品管理更高效。支持多品牌、多门店统一管理，实现库存数字化、智能化管理。',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
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
      }
    },
    3: {
      id: 3,
      name: 'AI客户配方管理系统',
      category: '管理软件',
      price: 2680,
      description: '智能客户染发配方管理，记录客户偏好、历史配方、过敏信息，提供个性化服务体验。建立完整的客户档案，提升服务质量和客户满意度。',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
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
      }
    },
    4: {
      id: 4,
      name: 'AI美发连锁门店管理系统',
      category: '管理软件',
      price: 3680,
      description: '专为美发连锁店设计的一体化管理解决方案，涵盖预约、员工、财务、营销等全方位管理。实现多店统一管理，提升运营效率和管理水平。',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
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
      }
    },
    5: {
      id: 5,
      name: 'AI美发客户管理系统CRM',
      category: '管理软件',
      price: 6800,
      description: '专业美发行业CRM系统，客户关系维护、营销自动化、数据分析，助力门店业绩增长。深度整合客户数据，提供精准营销和客户洞察。',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
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
      }
    },
    6: {
      id: 6,
      name: 'AI染发色彩大师AI原生开源SaaS系统',
      category: 'SaaS平台',
      price: 8800,
      description: '基于AI原生技术开发的染发色彩管理SaaS平台，开源架构、云端部署、支持定制化开发。提供完整的色彩管理解决方案，满足不同规模企业的需求。',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
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
      }
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

  // 处理开始演示
  const handleStartDemo = () => {
    toast({
      title: "开始演示",
      description: "正在启动系统演示，请稍候..."
    });
  };

  // 处理显示帮助
  const handleShowHelp = () => {
    toast({
      title: "使用帮助",
      description: "如需帮助，请联系客服：400-888-8888"
    });
  };
  if (loading) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>加载演示系统中...</p>
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
      <TopNavigation currentPage="system-demo" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <SystemDemo system={system} onBack={handleBack} onStartDemo={handleStartDemo} onShowHelp={handleShowHelp} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="system-demo" />
    </div>;
}