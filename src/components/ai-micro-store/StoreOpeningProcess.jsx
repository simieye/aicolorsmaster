// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { User, Settings, Package, DollarSign } from 'lucide-react';

export const StoreOpeningProcess = () => {
  // 开店流程数据
  const openingProcess = [{
    step: 1,
    title: '注册账号',
    description: '快速注册，填写基本信息，完成身份验证',
    color: 'orange',
    icon: User
  }, {
    step: 2,
    title: '店铺设置',
    description: '个性化店铺，品牌形象设计，店铺装修',
    color: 'blue',
    icon: Settings
  }, {
    step: 3,
    title: '商品上架',
    description: '批量上传，智能分类管理，价格设置',
    color: 'green',
    icon: Package
  }, {
    step: 4,
    title: '开始营业',
    description: '营销推广，接单赚钱，数据分析',
    color: 'purple',
    icon: DollarSign
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
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">开店流程</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            简单四步，快速开启您的电商之旅
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {openingProcess.map((step, index) => {
          const Icon = step.icon;
          const colors = getColorClasses(step.color);
          return <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center transition-all duration-300 hover:transform hover:translate-x-2 hover:bg-gray-50">
                <div className={`w-16 h-16 ${colors.light} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-2xl font-bold ${colors.text}`}>{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>;
        })}
        </div>
      </div>
    </div>;
};