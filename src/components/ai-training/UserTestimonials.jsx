// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Star } from 'lucide-react';

export const UserTestimonials = () => {
  // 用户评价数据
  const testimonials = [{
    name: '张总监',
    company: '人力资源部',
    avatar: 'https://picsum.photos/seed/hr1/50/50.jpg',
    rating: 5,
    comment: 'AI培训系统大大提升了我们的培训效率，个性化推荐功能让每个员工都能获得最适合自己的学习内容。'
  }, {
    name: '李经理',
    company: '培训部',
    avatar: 'https://picsum.photos/seed/manager1/50/50.jpg',
    rating: 4,
    comment: '智能学习路径设计很科学，进度跟踪功能让管理者能够实时了解培训效果，大大提升了培训质量。'
  }, {
    name: '王总',
    company: '科技公司',
    avatar: 'https://picsum.photos/seed/ceo1/50/50.jpg',
    rating: 5,
    comment: '系统功能完善，特别是证书管理和考试测评功能，为我们的培训体系提供了强有力的技术支撑。'
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
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600">{testimonial.comment}</p>
            </div>)}
        </div>
      </div>
    </div>;
};