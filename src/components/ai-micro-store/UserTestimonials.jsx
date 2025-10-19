// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Star } from 'lucide-react';

export const UserTestimonials = () => {
  // 用户评价数据
  const testimonials = [{
    name: '刘店长',
    company: '美发用品店',
    avatar: 'https://picsum.photos/seed/shop1/50/50.jpg',
    rating: 5,
    comment: 'AI微店系统让我们的线上业务快速增长，智能商品管理功能大大节省了人力成本，营销工具效果显著。'
  }, {
    name: '张经理',
    company: '时尚饰品店',
    avatar: 'https://picsum.photos/seed/shop2/50/50.jpg',
    rating: 4,
    comment: '系统操作简单，功能完善，特别是批量上传和智能分类功能，让商品管理变得非常高效。'
  }, {
    name: '王总',
    company: '连锁美妆店',
    avatar: 'https://picsum.photos/seed/shop3/50/50.jpg',
    rating: 5,
    comment: '多店管理功能很实用，统一管理多个店铺，数据分析功能帮助我们更好地了解客户需求。'
  }];

  // 渲染星级评分
  const renderStars = rating => {
    return [...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);
  };
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">用户评价</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            来自真实商家用户的使用反馈和评价
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
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600">{testimonial.comment}</p>
            </div>)}
        </div>
      </div>
    </div>;
};