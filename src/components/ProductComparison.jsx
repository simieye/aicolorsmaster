// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Download, ShareAlt, Robot, Box, Users, Store, TrendingUp, Cloud, Check, X, Minus, Star, Phone, MessageCircle } from 'lucide-react';

export const ProductComparison = ({
  onBack,
  onSystemDetail,
  onContactSales
}) => {
  const {
    toast
  } = useToast();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [storeType, setStoreType] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [budget, setBudget] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  // 系统数据
  const systems = [{
    id: 1,
    name: 'AI智能调色宝机',
    category: '智能设备',
    icon: Robot,
    color: 'bg-blue-500',
    price: 4980,
    description: '智能染发设备，AI发质识别和精准调色',
    features: {
      aiRecognition: true,
      smartColoring: true,
      inventoryManagement: false,
      customerManagement: false,
      multiStoreManagement: false,
      marketingAutomation: false,
      cloudDeployment: false,
      apiIntegration: false
    },
    pricing: {
      basic: 3980,
      professional: 4980,
      enterprise: 6980
    },
    specs: {
      deployment: '本地部署',
      userLimit: '不限',
      dataStorage: '本地',
      mobileSupport: false,
      apiSupport: false,
      customization: false
    }
  }, {
    id: 2,
    name: '染发膏管理系统',
    category: '管理软件',
    icon: Box,
    color: 'bg-green-500',
    price: 1680,
    description: '专业染发膏库存管理和批次追踪',
    features: {
      aiRecognition: false,
      smartColoring: false,
      inventoryManagement: true,
      customerManagement: false,
      multiStoreManagement: false,
      marketingAutomation: false,
      cloudDeployment: true,
      apiIntegration: false
    },
    pricing: {
      basic: 1280,
      professional: 1680,
      enterprise: 2480
    },
    specs: {
      deployment: '云端/本地',
      userLimit: '5-20',
      dataStorage: '云端',
      mobileSupport: true,
      apiSupport: false,
      customization: false
    }
  }, {
    id: 3,
    name: '客户配方管理',
    category: '管理软件',
    icon: Users,
    color: 'bg-purple-500',
    price: 2680,
    description: '客户染发配方管理和个性化服务',
    features: {
      aiRecognition: false,
      smartColoring: true,
      inventoryManagement: true,
      customerManagement: true,
      multiStoreManagement: false,
      marketingAutomation: false,
      cloudDeployment: true,
      apiIntegration: false
    },
    pricing: {
      basic: 2180,
      professional: 2680,
      enterprise: 3680
    },
    specs: {
      deployment: '云端/本地',
      userLimit: '10-50',
      dataStorage: '云端',
      mobileSupport: true,
      apiSupport: false,
      customization: false
    }
  }, {
    id: 4,
    name: '连锁门店管理',
    category: '管理软件',
    icon: Store,
    color: 'bg-orange-500',
    price: 3680,
    description: '多店统一管理和运营效率提升',
    features: {
      aiRecognition: false,
      smartColoring: false,
      inventoryManagement: true,
      customerManagement: true,
      multiStoreManagement: true,
      marketingAutomation: true,
      cloudDeployment: true,
      apiIntegration: false
    },
    pricing: {
      basic: 3180,
      professional: 3680,
      enterprise: 5680
    },
    specs: {
      deployment: '云端/本地',
      userLimit: '20-100',
      dataStorage: '云端',
      mobileSupport: true,
      apiSupport: false,
      customization: false
    }
  }, {
    id: 5,
    name: 'CRM系统',
    category: '管理软件',
    icon: TrendingUp,
    color: 'bg-red-500',
    price: 6800,
    description: '客户关系管理和营销自动化',
    features: {
      aiRecognition: false,
      smartColoring: false,
      inventoryManagement: true,
      customerManagement: true,
      multiStoreManagement: true,
      marketingAutomation: true,
      cloudDeployment: true,
      apiIntegration: true
    },
    pricing: {
      basic: 5800,
      professional: 6800,
      enterprise: 9800
    },
    specs: {
      deployment: '云端/本地',
      userLimit: '50-500',
      dataStorage: '云端',
      mobileSupport: true,
      apiSupport: true,
      customization: false
    }
  }, {
    id: 6,
    name: 'SaaS平台',
    category: '云平台',
    icon: Cloud,
    color: 'bg-cyan-500',
    price: 8800,
    description: 'AI原生开源SaaS平台，支持定制开发',
    features: {
      aiRecognition: true,
      smartColoring: true,
      inventoryManagement: true,
      customerManagement: true,
      multiStoreManagement: true,
      marketingAutomation: true,
      cloudDeployment: true,
      apiIntegration: true
    },
    pricing: {
      basic: 7800,
      professional: 8800,
      enterprise: 12800
    },
    specs: {
      deployment: '云端',
      userLimit: '不限',
      dataStorage: '云端',
      mobileSupport: true,
      apiSupport: true,
      customization: true
    }
  }];

  // 筛选选项
  const filterOptions = [{
    value: 'all',
    label: '全部功能'
  }, {
    value: 'hardware',
    label: '智能设备'
  }, {
    value: 'software',
    label: '管理软件'
  }, {
    value: 'chain',
    label: '连锁店适用'
  }, {
    value: 'value',
    label: '高性价比'
  }];

  // 需求选项
  const requirementOptions = [{
    value: 'efficiency',
    label: '提高染发效率'
  }, {
    value: 'inventory',
    label: '库存管理'
  }, {
    value: 'customer',
    label: '客户管理'
  }, {
    value: 'marketing',
    label: '营销推广'
  }, {
    value: 'multistore',
    label: '多店统一管理'
  }];

  // 处理筛选
  const handleFilter = filter => {
    setSelectedFilter(filter);
  };

  // 处理需求选择
  const handleRequirementChange = value => {
    setRequirements(prev => prev.includes(value) ? prev.filter(req => req !== value) : [...prev, value]);
  };

  // 获取推荐
  const handleGetRecommendation = () => {
    if (!storeType || requirements.length === 0 || !budget) {
      toast({
        title: "请完善信息",
        description: "请选择门店类型、主要需求和预算范围",
        variant: "destructive"
      });
      return;
    }

    // 简单的推荐算法
    let recommendedSystem = null;
    let alternativeSystem = null;
    if (requirements.includes('efficiency') && requirements.includes('customer')) {
      recommendedSystem = systems[0]; // AI智能调色宝机
      alternativeSystem = systems[2]; // 客户配方管理
    } else if (requirements.includes('multistore')) {
      recommendedSystem = systems[3]; // 连锁门店管理
      alternativeSystem = systems[5]; // SaaS平台
    } else if (requirements.includes('inventory')) {
      recommendedSystem = systems[1]; // 染发膏管理系统
      alternativeSystem = systems[3]; // 连锁门店管理
    } else if (requirements.includes('marketing')) {
      recommendedSystem = systems[4]; // CRM系统
      alternativeSystem = systems[5]; // SaaS平台
    } else {
      recommendedSystem = systems[2]; // 客户配方管理
      alternativeSystem = systems[1]; // 染发膏管理系统
    }
    setRecommendation({
      primary: recommendedSystem,
      alternative: alternativeSystem,
      totalPrice: recommendedSystem.price + (alternativeSystem?.price || 0),
      savings: 300
    });
    toast({
      title: "推荐生成成功",
      description: "已为您生成个性化推荐方案"
    });
  };

  // 处理导出对比
  const handleExport = () => {
    toast({
      title: "导出对比",
      description: "正在生成对比报告..."
    });
  };

  // 处理分享对比
  const handleShare = () => {
    toast({
      title: "分享对比",
      description: "对比链接已复制到剪贴板"
    });
  };

  // 渲染功能图标
  const renderFeatureIcon = hasFeature => {
    if (hasFeature === true) {
      return <Check className="w-5 h-5 text-green-400" />;
    } else if (hasFeature === false) {
      return <X className="w-5 h-5 text-red-400" />;
    } else {
      return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  // 渲染系统卡片
  const renderSystemCard = system => {
    const Icon = system.icon;
    return <div key={system.id} className="system-card bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${system.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white font-semibold mb-2">{system.name}</h3>
        <p className="text-white/60 text-sm mb-4">{system.category}</p>
        <div className="text-2xl font-bold text-white mb-2">¥{system.price.toLocaleString()}</div>
        <div className="text-white/60 text-xs mb-4">起</div>
        <Button onClick={() => onSystemDetail && onSystemDetail(system)} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
          查看详情
        </Button>
      </div>;
  };

  // 渲染价格卡片
  const renderPriceCard = system => {
    return <div key={system.id} className="price-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <h3 className="text-white font-semibold mb-4">{system.name}</h3>
        <div className="space-y-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-white/60 text-xs mb-1">基础版</div>
            <div className="text-xl font-bold text-white">¥{system.pricing.basic.toLocaleString()}</div>
          </div>
          <div className={`${system.color}/20 rounded-lg p-3 border ${system.color.replace('bg-', 'border-')}`}>
            <div className="text-white/60 text-xs mb-1">专业版</div>
            <div className="text-xl font-bold text-white">¥{system.pricing.professional.toLocaleString()}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-white/60 text-xs mb-1">企业版</div>
            <div className="text-xl font-bold text-white">¥{system.pricing.enterprise.toLocaleString()}</div>
          </div>
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">产品对比</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleExport} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Download className="w-4 h-4 mr-2" />
              导出对比
            </Button>
            <Button onClick={handleShare} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <ShareAlt className="w-4 h-4 mr-2" />
              分享对比
            </Button>
          </div>
        </div>
      </header>

      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">AI美发系统对比</h1>
        <p className="text-xl text-white/80 mb-8">选择最适合您需求的AI美发解决方案</p>
        
        {/* 快速筛选 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filterOptions.map(option => <Button key={option.value} variant={selectedFilter === option.value ? 'default' : 'ghost'} onClick={() => handleFilter(option.value)} className={`${selectedFilter === option.value ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 hover:bg-white/20'} text-white border border-white/30 px-4 py-2 rounded-full`}>
              {option.label}
            </Button>)}
        </div>
      </section>

      {/* 系统概览卡片 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {systems.map(renderSystemCard)}
      </section>

      {/* 功能对比表格 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-2xl">功能对比</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-white min-w-[800px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4">功能特性</th>
                  {systems.map(system => <th key={system.id} className="text-center py-4 px-4 text-sm">
                      {system.name}
                    </th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">AI发质识别</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.aiRecognition)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">智能调色</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.smartColoring)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">库存管理</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.inventoryManagement)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">客户管理</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.customerManagement)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">多店管理</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.multiStoreManagement)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">营销自动化</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.marketingAutomation)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">云端部署</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.cloudDeployment)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">API接口</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.features.apiIntegration)}
                    </td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 价格对比 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-2xl">价格方案对比</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {systems.map(renderPriceCard)}
          </div>
        </CardContent>
      </Card>

      {/* 智能推荐 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-2xl">智能推荐</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 需求选择 */}
            <div>
              <h3 className="text-white font-semibold mb-4">选择您的需求</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">门店类型</label>
                  <select value={storeType} onChange={e => setStoreType(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="">请选择门店类型</option>
                    <option value="single">单店经营</option>
                    <option value="chain">连锁门店</option>
                    <option value="studio">个人工作室</option>
                    <option value="high-end">高端会所</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">主要需求</label>
                  <div className="space-y-2">
                    {requirementOptions.map(option => <label key={option.value} className="flex items-center text-white">
                        <input type="checkbox" checked={requirements.includes(option.value)} onChange={() => handleRequirementChange(option.value)} className="mr-2" />
                        <span>{option.label}</span>
                      </label>)}
                  </div>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">预算范围</label>
                  <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="">请选择预算范围</option>
                    <option value="0-2000">¥2,000以下</option>
                    <option value="2000-5000">¥2,000-5,000</option>
                    <option value="5000-10000">¥5,000-10,000</option>
                    <option value="10000+">¥10,000以上</option>
                  </select>
                </div>
                
                <Button onClick={handleGetRecommendation} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  获取推荐
                </Button>
              </div>
            </div>
            
            {/* 推荐结果 */}
            <div>
              <h3 className="text-white font-semibold mb-4">推荐方案</h3>
              {recommendation ? <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-6 border-2 border-blue-400">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">
                        推荐方案：{recommendation.primary.name} + {recommendation.alternative?.name}
                      </h4>
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                        最佳匹配
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mb-4">
                      基于您的需求，我们推荐这套组合方案，能够有效提升染发效率和客户管理水平。
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-white/60 text-sm">组合价格</div>
                        <div className="text-2xl font-bold text-white">¥{recommendation.totalPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">节省</div>
                        <div className="text-xl font-bold text-green-400">¥{recommendation.savings.toLocaleString()}</div>
                      </div>
                    </div>
                    <Button onClick={() => onContactSales && onContactSales()} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      立即咨询
                    </Button>
                  </div>
                  
                  {recommendation.alternative && <div className="bg-white/10 rounded-xl p-6">
                      <h4 className="text-white font-medium mb-2">备选方案</h4>
                      <p className="text-white/60 text-sm mb-4">{recommendation.alternative.name}</p>
                      <div className="text-xl font-bold text-white mb-4">¥{recommendation.alternative.price.toLocaleString()}</div>
                      <Button onClick={() => onSystemDetail && onSystemDetail(recommendation.alternative)} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
                        查看详情
                      </Button>
                    </div>}
                </div> : <div className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-white/60">请选择您的需求以获取个性化推荐</p>
                </div>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技术规格对比 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-2xl">技术规格对比</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-white min-w-[800px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4">技术参数</th>
                  {systems.map(system => <th key={system.id} className="text-center py-4 px-4 text-sm">
                      {system.name}
                    </th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">部署方式</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4 text-sm">
                      {system.specs.deployment}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">用户数限制</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4 text-sm">
                      {system.specs.userLimit}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">数据存储</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4 text-sm">
                      {system.specs.dataStorage}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">移动端支持</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.specs.mobileSupport)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">API接口</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.specs.apiSupport)}
                    </td>)}
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 font-medium">定制开发</td>
                  {systems.map(system => <td key={system.id} className="text-center py-4 px-4">
                      {renderFeatureIcon(system.specs.customization)}
                    </td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
};