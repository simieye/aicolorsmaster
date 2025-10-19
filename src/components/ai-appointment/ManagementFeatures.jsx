// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, Users, ConciergeBell, Bell, AlertTriangle, BarChart, Check } from 'lucide-react';

export const ManagementFeatures = () => {
  // 管理功能数据
  const managementFeatures = [{
    icon: Calendar,
    title: '预约日历',
    description: '可视化日历界面，直观展示预约安排',
    features: ['拖拽调整时间', '多视图切换', '快速筛选'],
    color: 'blue'
  }, {
    icon: Users,
    title: '员工管理',
    description: '员工排班管理，技能匹配分配',
    features: ['技能标签', '工作时长设置', '自动分配'],
    color: 'green'
  }, {
    icon: ConciergeBell,
    title: '服务管理',
    description: '服务项目配置，价格时长设置',
    features: ['服务分类', '价格策略', '时长设置'],
    color: 'purple'
  }, {
    icon: Bell,
    title: '提醒通知',
    description: '多渠道提醒，降低爽约率',
    features: ['短信提醒', '微信通知', '邮件提醒'],
    color: 'yellow'
  }, {
    icon: AlertTriangle,
    title: '冲突检测',
    description: '智能检测时间冲突，避免重复预约',
    features: ['实时检测', '自动提醒', '解决方案'],
    color: 'red'
  }, {
    icon: BarChart,
    title: '数据统计',
    description: '预约数据统计分析，业务洞察',
    features: ['预约趋势', '客户分析', '收入统计'],
    color: 'indigo'
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
      },
      red: {
        light: 'bg-red-100',
        text: 'text-red-600'
      },
      indigo: {
        light: 'bg-indigo-100',
        text: 'text-indigo-600'
      }
    };
    return colorMap[color] || colorMap.blue;
  };
  return <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">管理功能</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            强大的管理功能，让预约管理更高效
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementFeatures.map((feature, index) => {
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