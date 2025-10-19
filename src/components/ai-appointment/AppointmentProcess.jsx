// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, Clock, CheckCircle, Bell, Users } from 'lucide-react';

export const AppointmentProcess = () => {
  // 预约流程数据
  const appointmentProcess = [{
    step: 1,
    title: '选择服务',
    description: '客户选择所需服务类型',
    color: 'blue',
    icon: Calendar
  }, {
    step: 2,
    title: '选择时间',
    description: 'AI推荐最佳时间段',
    color: 'green',
    icon: Clock
  }, {
    step: 3,
    title: '确认预约',
    description: '填写信息并确认',
    color: 'purple',
    icon: CheckCircle
  }, {
    step: 4,
    title: '接收提醒',
    description: '自动发送预约提醒',
    color: 'yellow',
    icon: Bell
  }, {
    step: 5,
    title: '到店服务',
    description: '准时到店享受服务',
    color: 'red',
    icon: Users
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
      }
    };
    return colorMap[color] || colorMap.blue;
  };
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">预约流程</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            简化预约流程，提升客户体验
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {appointmentProcess.map((step, index) => {
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