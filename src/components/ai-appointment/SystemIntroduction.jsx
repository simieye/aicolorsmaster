// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Brain, Clock, Bell, TrendingUp, Scissors, Sparkles, HotTub, UserTie } from 'lucide-react';

export const SystemIntroduction = () => {
  // 核心优势数据
  const coreAdvantages = [{
    icon: Brain,
    title: 'AI智能推荐',
    description: '基于历史数据和客户偏好，智能推荐最佳预约时间',
    color: 'blue'
  }, {
    icon: Clock,
    title: '时间优化',
    description: '自动优化时间安排，最大化服务效率',
    color: 'green'
  }, {
    icon: Bell,
    title: '智能提醒',
    description: '自动发送预约提醒，减少爽约率',
    color: 'purple'
  }, {
    icon: TrendingUp,
    title: '数据分析',
    description: '深度分析预约数据，优化业务策略',
    color: 'yellow'
  }];

  // 适用场景数据
  const scenarios = [{
    icon: Scissors,
    title: '美发沙龙',
    description: '洗剪吹、染发烫发',
    color: 'blue'
  }, {
    icon: Sparkles,
    title: '美容院',
    description: '面部护理、美甲美睫',
    color: 'green'
  }, {
    icon: HotTub,
    title: 'SPA中心',
    description: '按摩水疗、身体护理',
    color: 'purple'
  }, {
    icon: UserTie,
    title: '造型工作室',
    description: '个人造型、妆容服务',
    color: 'yellow'
  }];

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
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
      },
      yellow: {
        light: 'bg-yellow-100',
        text: 'text-yellow-600'
      }
    };
    return colorMap[color] || colorMap.blue;
  };
  return <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">系统介绍</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            基于AI技术的智能预约管理系统，为美发行业提供全方位的预约解决方案
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