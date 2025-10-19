// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { GraduationCap, Share2, Heart, Play, Phone } from 'lucide-react';

// @ts-ignore;
import { SystemIntroduction } from '@/components/ai-training/SystemIntroduction';
// @ts-ignore;
import { TrainingCourses } from '@/components/ai-training/TrainingCourses';
// @ts-ignore;
import { LearningPath } from '@/components/ai-training/LearningPath';
// @ts-ignore;
import { AssessmentFeatures } from '@/components/ai-training/AssessmentFeatures';
// @ts-ignore;
import { PricingPlans } from '@/components/ai-training/PricingPlans';
// @ts-ignore;
import { UserTestimonials } from '@/components/ai-training/UserTestimonials';
export default function AIEmployeeTrainingDetailPage(props) {
  const {
    $w,
    style
  } = props;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('introduction');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理购买
  const handlePurchase = planId => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'checkout',
        params: {
          productId: 'ai-employee-training',
          planId
        }
      });
    }
  };

  // 处理试用
  const handleTrial = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          productId: 'ai-employee-training'
        }
      });
    }
  };

  // 处理联系
  const handleContact = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'online-consultation'
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/95' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => $w.utils.navigateBack()} className="text-gray-600 hover:text-gray-900">
                <i className="fas fa-arrow-left text-xl"></i>
              </button>
              <h1 className="text-xl font-bold text-gray-900">AI员工成长业务培训系统</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 产品头部 */}
        <section className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">新品上市</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">AI驱动</span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">智能学习</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">AI员工成长业务培训系统</h1>
                <p className="text-xl mb-6 text-green-100">
                  智能化培训管理，个性化学习路径，提升员工技能，促进业务发展
                </p>
                <div className="flex items-center space-x-6 mb-8">
                  <div>
                    <div className="text-3xl font-bold">¥3,680</div>
                    <div className="text-green-200">一次性购买</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">4.9</div>
                    <div className="text-green-200">用户评分</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">234+</div>
                    <div className="text-green-200">客户选择</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handlePurchase('professional')} className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                    立即购买
                  </button>
                  <button onClick={handleTrial} className="bg-green-700 text-white hover:bg-green-800 px-8 py-3 rounded-lg font-medium transition-colors">
                    免费试用
                  </button>
                  <button className="border border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 rounded-lg font-medium transition-colors">
                    <Play className="w-4 h-4 inline mr-2" />
                    观看演示
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="animate-bounce">
                  <GraduationCap className="w-24 h-24 mx-auto mb-4" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">智能</div>
                    <div className="text-green-200 text-sm">个性化推荐</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">实时</div>
                    <div className="text-green-200 text-sm">进度跟踪</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">自动</div>
                    <div className="text-green-200 text-sm">证书颁发</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签切换 */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {['introduction', 'courses', 'path', 'assessment', 'pricing', 'reviews'].map(tab => {
              const tabLabels = {
                introduction: '系统介绍',
                courses: '培训课程',
                path: '学习路径',
                assessment: '考核评估',
                pricing: '价格方案',
                reviews: '用户评价'
              };
              return <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tabLabels[tab]}
                </button>;
            })}
            </div>
          </div>
        </section>

        {/* 动态内容区域 */}
        {activeTab === 'introduction' && <SystemIntroduction />}
        {activeTab === 'courses' && <TrainingCourses />}
        {activeTab === 'path' && <LearningPath />}
        {activeTab === 'assessment' && <AssessmentFeatures />}
        {activeTab === 'pricing' && <PricingPlans onPurchase={handlePurchase} />}
        {activeTab === 'reviews' && <UserTestimonials />}

        {/* 购买咨询 */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好提升员工能力了吗？</h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              立即体验AI员工成长业务培训系统，让您的培训管理更智能、更高效、更精准
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button onClick={() => handlePurchase('professional')} className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                立即购买
              </button>
              <button onClick={handleTrial} className="bg-green-700 text-white hover:bg-green-800 px-8 py-3 rounded-lg font-medium transition-colors">
                免费试用
              </button>
              <button onClick={handleContact} className="border border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 rounded-lg font-medium transition-colors">
                <Phone className="w-4 h-4 inline mr-2" />
                联系我们
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>;
}