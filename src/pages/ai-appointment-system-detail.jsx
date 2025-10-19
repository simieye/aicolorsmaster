// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Calendar, Share2, Heart, Play, Phone } from 'lucide-react';

// @ts-ignore;
import { SystemIntroduction } from '@/components/ai-appointment/SystemIntroduction';
// @ts-ignore;
import { AppointmentProcess } from '@/components/ai-appointment/AppointmentProcess';
// @ts-ignore;
import { ManagementFeatures } from '@/components/ai-appointment/ManagementFeatures';
// @ts-ignore;
import { CustomerManagement } from '@/components/ai-appointment/CustomerManagement';
// @ts-ignore;
import { PricingPlans } from '@/components/ai-appointment/PricingPlans';
// @ts-ignore;
import { UserTestimonials } from '@/components/ai-appointment/UserTestimonials';
export default function AIAppointmentSystemDetailPage(props) {
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
          productId: 'ai-appointment-system',
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
          productId: 'ai-appointment-system'
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
              <h1 className="text-xl font-bold text-gray-900">AI客户预约系统</h1>
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
        <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">推荐产品</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">智能调度</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">高效管理</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">AI客户预约系统</h1>
                <p className="text-xl mb-6 text-blue-100">
                  智能预约管理解决方案，基于AI技术优化时间安排，提升服务效率，改善客户体验
                </p>
                <div className="flex items-center space-x-6 mb-8">
                  <div>
                    <div className="text-3xl font-bold">¥2,680</div>
                    <div className="text-blue-200">一次性购买</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="text-blue-200">用户评分</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">300+</div>
                    <div className="text-blue-200">门店选择</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => handlePurchase('professional')} className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                    立即购买
                  </button>
                  <button onClick={handleTrial} className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-lg font-medium transition-colors">
                    免费试用
                  </button>
                  <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors">
                    <Play className="w-4 h-4 inline mr-2" />
                    观看演示
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="animate-bounce">
                  <Calendar className="w-24 h-24 mx-auto mb-4" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold">智能</div>
                    <div className="text-blue-200 text-sm">时间推荐</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">自动</div>
                    <div className="text-blue-200 text-sm">冲突检测</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">实时</div>
                    <div className="text-blue-200 text-sm">提醒通知</div>
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
              {['introduction', 'process', 'management', 'customers', 'pricing', 'reviews'].map(tab => {
              const tabLabels = {
                introduction: '系统介绍',
                process: '预约流程',
                management: '管理功能',
                customers: '客户管理',
                pricing: '价格方案',
                reviews: '用户评价'
              };
              return <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tabLabels[tab]}
                </button>;
            })}
            </div>
          </div>
        </section>

        {/* 动态内容区域 */}
        {activeTab === 'introduction' && <SystemIntroduction />}
        {activeTab === 'process' && <AppointmentProcess />}
        {activeTab === 'management' && <ManagementFeatures />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'pricing' && <PricingPlans onPurchase={handlePurchase} />}
        {activeTab === 'reviews' && <UserTestimonials />}

        {/* 购买咨询 */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">准备好优化您的预约管理了吗？</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              立即体验AI客户预约系统，让您的预约管理更智能、更高效、更便捷
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button onClick={() => handlePurchase('professional')} className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
                立即购买
              </button>
              <button onClick={handleTrial} className="bg-blue-700 text-white hover:bg-blue-800 px-8 py-3 rounded-lg font-medium transition-colors">
                免费试用
              </button>
              <button onClick={handleContact} className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors">
                <Phone className="w-4 h-4 inline mr-2" />
                联系我们
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>;
}