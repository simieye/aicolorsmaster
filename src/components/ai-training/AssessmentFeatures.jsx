// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ClipboardCheck, BarChart, Award, Trophy, Check } from 'lucide-react';

export const AssessmentFeatures = () => {
  // 考核评估数据
  const assessmentFeatures = [{
    icon: ClipboardCheck,
    title: '在线考试',
    description: '多种题型支持，自动评分系统',
    features: ['单选题', '多选题', '判断题'],
    color: 'green'
  }, {
    icon: BarChart,
    title: '成绩分析',
    description: '详细的成绩统计和分析报告',
    features: ['成绩趋势', '知识掌握度', '能力提升'],
    color: 'blue'
  }, {
    icon: Award,
    title: '证书颁发',
    description: '自动生成培训证书，支持验证',
    features: ['电子证书', '在线验证', '批量生成'],
    color: 'purple'
  }, {
    icon: Trophy,
    title: '激励机制',
    description: '多样化的激励措施，提升学习积极性',
    features: ['积分奖励', '排行榜', '徽章系统'],
    color: 'yellow'
  }];

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
      green: {
        light: 'bg-green-100',
        text: 'text-green-600'
      },
      blue: {
        light: 'bg-blue-100',
        text: 'text-blue-600'
      },
      purple: {
        light: 'bg-purple-100',
        text: 'text-purple-600'
      },
      yellow: {
        light: 'bg-yellow-100',
        text: 'text-yellow-600'
      }
    };
    return colorMap[color] || colorMap.green;
  };
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">考核评估</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            完善的考核体系，科学评估学习效果，确保培训质量
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assessmentFeatures.map((feature, index) => {
          const Icon = feature.icon;
          const colors = getColorClasses(feature.color);
          return <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                <div className={`w-16 h-16 ${colors.light} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${colors.text}`} />
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