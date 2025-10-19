// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Star } from 'lucide-react';

export const UserTestimonials = () => {
  // 用户评价数据
  const testimonials = [{
    name: '陈店长',
    company: '时尚美发沙龙',
    avatar: 'https://picsum.photos/seed/salon1/50/50.jpg',
    rating: 5,
    comment: 'AI预约系统让我们的预约管理变得智能化，客户满意度大幅提升，员工工作效率也明显提高。'
  }, {
    name: '李经理',
    company: '美丽人生美容院',
    avatar: 'https://picsum.photos/seed/beauty1/50/50.jpg',
    rating: 4,
    comment: '智能推荐功能很实用，能够根据客户历史和技师专长自动推荐最佳时间，大大减少了人工安排的工作量。'
  }, {
    name: '王总监',
    company: '舒缓SPA中心',
    avatar: 'https://picsum.photos/seed/spa1/50/50.jpg',
    rating: 5,
    comment: '系统稳定可靠，自动提醒功能让客户不再错过预约，冲突检测机制避免了时间安排上的混乱。'
  }];
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">用户评价</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            来自真实用户的使用反馈和评价
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt="用户头像" className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
              </div>
              <p className="text-gray-600">{testimonial.comment}</p>
            </div>)}
        </div>
      </div>
    </div>;
};