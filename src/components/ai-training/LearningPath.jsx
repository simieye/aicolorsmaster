// @ts-ignore;
import React, { useEffect, useState } from 'react';
// @ts-ignore;
import { Target, BarChart } from 'lucide-react';

export const LearningPath = () => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // 学习路径数据
  const learningPath = [{
    step: 1,
    title: '能力评估',
    description: 'AI智能评估员工当前技能水平，识别知识盲点',
    status: 'completed',
    statusColor: 'bg-green-50',
    statusText: '已完成',
    stepColor: 'bg-green-500'
  }, {
    step: 2,
    title: '课程推荐',
    description: '基于评估结果，推荐最适合的学习课程和资源',
    status: 'in-progress',
    statusColor: 'bg-blue-50',
    statusText: '进行中',
    stepColor: 'bg-blue-500'
  }, {
    step: 3,
    title: '学习实践',
    description: '通过理论学习、案例分析、实操练习巩固知识',
    status: 'pending',
    statusColor: 'bg-purple-50',
    statusText: '待开始',
    stepColor: 'bg-gray-300'
  }, {
    step: 4,
    title: '效果评估',
    description: '考试测评，检验学习成果，生成能力报告',
    status: 'pending',
    statusColor: 'bg-yellow-50',
    statusText: '待开始',
    stepColor: 'bg-gray-300'
  }];

  // 技能进度数据
  const skillProgress = [{
    name: '专业技能',
    progress: 85,
    color: 'bg-green-500'
  }, {
    name: '管理能力',
    progress: 70,
    color: 'bg-blue-500'
  }, {
    name: '沟通协作',
    progress: 90,
    color: 'bg-purple-500'
  }, {
    name: '创新思维',
    progress: 60,
    color: 'bg-yellow-500'
  }];

  // 动画效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(75);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">学习路径</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI驱动的个性化学习路径，让每个员工都能获得最适合的培训体验
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">智能学习路径</h3>
            <div className="space-y-4">
              {learningPath.map((step, index) => <div key={index} className={`rounded-lg p-4 border-l-4 ${step.status === 'completed' ? 'bg-green-50 border-green-500' : step.status === 'in-progress' ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'} transition-all duration-300 hover:transform hover:translate-x-2`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{step.step}. {step.title}</h4>
                    <span className={`text-sm ${step.status === 'completed' ? 'text-green-600' : step.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'}`}>
                      {step.statusText}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>)}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">学习进度统计</h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">总体完成度</span>
                <span className="text-green-600 font-semibold">{animatedProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full transition-all duration-1000" style={{
                width: `${animatedProgress}%`
              }}></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {skillProgress.map((skill, index) => <div key={index} className="transition-all duration-300 hover:transform hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className={`${skill.color.replace('bg-', 'text-')} font-semibold`}>{skill.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className={`${skill.color} h-2 rounded-full transition-all duration-1000`} style={{
                  width: `${skill.progress}%`
                }}></div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};