// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Ticket, Percent, Share2, Users, Bell, TrendingUp, Check } from 'lucide-react';

export const MarketingTools = () => {
  // 营销工具数据
  const marketingTools = [{
    icon: Ticket,
    title: '优惠券管理',
    description: '多种优惠券类型，精准营销投放',
    features: ['满减券', '折扣券', '新人券'],
    color: 'orange'
  }, {
    icon: Percent,
    title: '促销活动',
    description: '丰富促销活动，提升转化率',
    features: ['秒杀活动', '拼团活动', '满减活动'],
    color: 'blue'
  }, {
    icon: Share2,
    title: '社交分享',
    description: '一键分享，社交裂变营销',
    features: ['微信分享', '朋友圈推广', '邀请有礼'],
    color: 'green'
  }, {
    icon: Users,
    title: '会员管理',
    description: '会员等级管理，积分体系',
    features: ['会员等级', '积分商城', '生日特权'],
    color: 'purple'
  }, {
    icon: Bell,
    title: '消息推送',
    description: '精准消息推送，提升复购率',
    features: ['短信通知', '微信推送', 'APP推送'],
    color: 'yellow'
  }, {
    icon: TrendingUp,
    title: '数据分析',
    description: '营销数据分析，效果追踪',
    features: ['转化分析', '用户画像', 'ROI分析'],
    color: 'red'
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
      },
      yellow: {
        light: 'bg-yellow-100',
        text: 'text-yellow-600'
      },
      red: {
        light: 'bg-red-100',
        text: 'text-red-600'
      }
    };
    return colorMap[color] || colorMap.orange;
  };
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">营销工具</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            丰富的营销工具，助力店铺业绩增长
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingTools.map((tool, index) => {
          const Icon = tool.icon;
          const colors = getColorClasses(tool.color);
          return <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                <div className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {tool.features.map((item, idx) => <li key={idx}>
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