// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Clock, Users, Star } from 'lucide-react';

export const TrainingCourses = () => {
  // 课程数据
  const courses = [{
    title: '新员工入职培训',
    type: '必修',
    typeColor: 'bg-green-100 text-green-800',
    rating: 4.5,
    hours: 12,
    students: 156,
    description: '企业文化、规章制度、岗位职责等基础培训'
  }, {
    title: '领导力提升',
    type: '选修',
    typeColor: 'bg-blue-100 text-blue-800',
    rating: 5,
    hours: 8,
    students: 89,
    description: '管理技能、团队建设、决策能力培养'
  }, {
    title: '专业技能提升',
    type: '进阶',
    typeColor: 'bg-purple-100 text-purple-800',
    rating: 4,
    hours: 16,
    students: 234,
    description: '行业知识、技术技能、实操能力训练'
  }, {
    title: '沟通与协作',
    type: '热门',
    typeColor: 'bg-yellow-100 text-yellow-800',
    rating: 4.5,
    hours: 6,
    students: 178,
    description: '有效沟通、团队协作、冲突处理技巧'
  }, {
    title: '安全生产培训',
    type: '认证',
    typeColor: 'bg-red-100 text-red-800',
    rating: 5,
    hours: 10,
    students: 267,
    description: '安全意识、应急处理、风险防范知识'
  }, {
    title: '创新思维训练',
    type: '定制',
    typeColor: 'bg-indigo-100 text-indigo-800',
    rating: 4,
    hours: 14,
    students: 92,
    description: '创新方法、思维模式、问题解决能力'
  }];

  // 渲染星级评分
  const renderStars = rating => {
    return [...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);
  };
  return <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">培训课程</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            丰富的课程资源，满足不同岗位和层级的培训需求
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${course.typeColor}`}>
                  {course.type}
                </span>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4" />
                  <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.hours}小时
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students}人
                </span>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};