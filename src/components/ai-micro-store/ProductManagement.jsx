// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Upload, Tags, Warehouse, DollarSign, Check } from 'lucide-react';

export const ProductManagement = () => {
  // 商品管理功能数据
  const productFeatures = [{
    icon: Upload,
    title: '批量上传',
    description: '支持Excel批量导入，快速上架商品',
    features: ['Excel导入', '图片批量处理', '模板下载'],
    color: 'orange'
  }, {
    icon: Tags,
    title: '智能分类',
    description: 'AI自动分类，多级分类管理',
    features: ['自动识别', '多级分类', '标签管理'],
    color: 'blue'
  }, {
    icon: Warehouse,
    title: '库存管理',
    description: '实时库存监控，智能预警提醒',
    features: ['实时监控', '库存预警', '自动补货'],
    color: 'green'
  }, {
    icon: DollarSign,
    title: '价格策略',
    description: '灵活定价，促销活动管理',
    features: ['批量调价', '会员价', '限时促销'],
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">商品管理</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            全方位的商品管理功能，让您的商品管理更高效
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productFeatures.map((feature, index) => {
          const Icon = feature.icon;
          const colors = getColorClasses(feature.color);
          return <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
                <div className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {feature.features.map((item, idx) => <li key={idx}>
                      <Check className="w-4 h-4 text-green-500 inline mr-2" />
                      {item}
                    </li>)}
                </ul>
              </div>;
        })}
        </div>
      </div>
    </div>;
};