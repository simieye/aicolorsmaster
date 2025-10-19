// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Star, TrendingUp, Clock, User } from 'lucide-react';

export const CustomerManagement = () => {
  // 客户数据
  const customers = [{
    name: '张女士',
    type: 'VIP客户',
    appointments: 12,
    avatar: 'https://picsum.photos/seed/customer1/40/40.jpg',
    nextAppointment: '明天 14:00',
    status: 'next'
  }, {
    name: '李先生',
    type: '新客户',
    appointments: 2,
    avatar: 'https://picsum.photos/seed/customer2/40/40.jpg',
    lastAppointment: '3天前',
    status: 'recent'
  }, {
    name: '王女士',
    type: '老客户',
    appointments: 8,
    avatar: 'https://picsum.photos/seed/customer3/40/40.jpg',
    pendingAppointment: '后天 10:00',
    status: 'pending'
  }];
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">客户管理</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            全面的客户信息管理，提供个性化服务
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">客户档案</h3>
            <div className="space-y-4">
              {customers.map((customer, index) => <div key={index} className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <img src={customer.avatar} alt="客户头像" className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{customer.name}</h4>
                      <p className="text-sm text-gray-600">{customer.type} · 预约{customer.appointments}次</p>
                    </div>
                    <div className="text-right">
                      {customer.status === 'next' && <>
                          <span className="text-sm text-blue-600">下次预约</span>
                          <p className="text-xs text-gray-500">{customer.nextAppointment}</p>
                        </>}
                      {customer.status === 'recent' && <>
                          <span className="text-sm text-green-600">最近预约</span>
                          <p className="text-xs text-gray-500">{customer.lastAppointment}</p>
                        </>}
                      {customer.status === 'pending' && <>
                          <span className="text-sm text-yellow-600">待确认</span>
                          <p className="text-xs text-gray-500">{customer.pendingAppointment}</p>
                        </>}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">偏好管理</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">服务偏好</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">染发</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">护理</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">造型</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">时间偏好</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">周末</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">下午</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">技师偏好</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Tony老师</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">Amy老师</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">消费记录</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">总消费金额</span>
                    <span className="font-medium text-gray-900">¥3,580</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">平均消费</span>
                    <span className="font-medium text-gray-900">¥298</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">消费频率</span>
                    <span className="font-medium text-gray-900">每月2次</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};