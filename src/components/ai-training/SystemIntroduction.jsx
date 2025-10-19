// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Brain, TrendingUp, Award, ClipboardCheck, UserPlus, Tools, UsersCog, Shield } from 'lucide-react';

export const SystemIntroduction = () => {
  // 核心优势数据
  const coreAdvantages = [{
    icon: Brain,
    title: 'AI智能推荐',
    description: '基于员工能力和岗位需求，智能推荐个性化学习内容',
    color: 'green'
  }, {
    icon: TrendingUp,
    title: '进度跟踪',
    description: '实时监控学习进度和效果，数据可视化展示培训成果',
    color: 'blue'
  }, {
    icon: Award,
    title: '证书管理',
    description: '自动颁发培训证书，支持多种证书模板和验证功能',
    color: 'purple'
  }, {
    icon: ClipboardCheck,
    title: '考试测评',
    description: '在线考试系统，自动评分，智能分析学习效果',
    color: 'yellow'
  }];

  // 适用场景数据
  const scenarios = [{
    icon: UserPlus,
    title: '新员工培训',
    description: '入职培训、企业文化、规章制度，快速融入团队',
    color: 'green'
  }, {
    icon: Tools,
    title: '技能提升',
    description: '专业技能培训、技术认证、能力提升计划',
    color: 'blue'
  }, {
    icon: UsersCog,
    title: '管理培训',
    description: '领导力培养、管理技能、团队建设能力提升',
    color: 'purple'
  }, {
    icon: Shield,
    title: '合规培训',
    description: '法律法规、合规要求、风险防范培训',
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
  return <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">系统介绍</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            基于AI技术的智能培训管理系统，为企业提供全方位的员工培训解决方案
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