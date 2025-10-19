// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, ShoppingCart, Bullhorn, PieChart, Store, Smartphone, Link, Gift } from 'lucide-react';

export const SystemIntroduction = () => {
  // 核心优势数据
  const coreAdvantages = [{
    icon: Package,
    title: '智能商品管理',
    description: 'AI辅助商品上架，智能分类，库存预警',
    color: 'orange'
  }, {
    icon: ShoppingCart,
    title: '自动化订单处理',
    description: '智能订单分配，物流跟踪，售后管理',
    color: 'blue'
  }, {
    icon: Bullhorn,
    title: '精准营销推广',
    description: 'AI营销策略，用户画像分析，精准投放',
    color: 'green'
  }, {
    icon: PieChart,
    title: '数据分析洞察',
    description: '销售数据统计，用户行为分析，经营建议',
    color: 'purple'
  }];

  // 适用场景数据
  const scenarios = [{
    icon: Store,
    title: '美发产品店',
    description: '美发用品、设备销售，专业美发产品电商',
    color: 'orange'
  }, {
    icon: Smartphone,
    title: '移动电商',
    description: '手机端商城，便捷购物，移动优先设计',
    color: 'blue'
  }, {
    icon: Link,
    title: '多店管理',
    description: '连锁店统一管理，多店铺协同运营',
    color: 'green'
  }, {
    icon: Gift,
    title: '礼品定制',
    description: '个性化礼品定制销售，定制化服务',
    color: 'purple'
  }];

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
      orange: {
        light: 'bg-orange-100',
        text: 'text-orange-600'
      },
      blue: {
        light: 'bg-blue-100',
        text: 'text-blue-600'
      },
      green: {
        light: 'bg-green-100',
        text: 'text-green-600'
      },
      purple: {
        light: 'bg-purple-100',
        text: 'text-purple-600'
      }
    };
    return colorMap[color] || colorMap.orange;
  };
  return <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">系统介绍</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            基于AI技术的智能电商管理系统，为商家提供全方位的线上店铺解决方案
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">核心优势</h3>
            <div className="space-y-4">
              {coreAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              const colors = getColorClasses(advantage.color);
              return <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 ${colors.light} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{advantage.title}</h4>
                      <p className="text-sm text-gray-600">{advantage.description}</p>
                    </div>
                  </div>;
            })}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">适用场景</h3>
            <div className="grid grid-cols-2 gap-4">
              {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              const colors = getColorClasses(scenario.color);
              return <div key={index} className={`text-center p-4 ${colors.light} rounded-lg`}>
                    <div className={`w-12 h-12 ${colors.light} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{scenario.title}</h4>
                    <p className="text-sm text-gray-600">{scenario.description}</p>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </div>
    </div>;
};