// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Check } from 'lucide-react';

export const PricingPlans = ({
  onPurchase
}) => {
  // 价格方案数据
  const pricingPlans = [{
    id: 'basic',
    name: '基础版',
    price: 2680,
    features: ['基础培训功能', '50个用户账号', '基础课程管理', '7×8小时技术支持'],
    color: 'bg-gray-100 text-gray-700'
  }, {
    id: 'professional',
    name: '专业版',
    price: 3680,
    badge: '推荐',
    features: ['完整培训功能', '200个用户账号', 'AI智能推荐', '高级数据分析', '7×24小时技术支持'],
    color: 'bg-gradient-to-br from-green-600 to-teal-600 text-white',
    popular: true
  }, {
    id: 'enterprise',
    name: '企业版',
    price: 5980,
    features: ['定制化功能', '无限用户账号', '企业级安全', '专属客户经理', '私有化部署'],
    color: 'bg-gray-100 text-gray-700'
  }];
  return <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">价格方案</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            透明的价格体系，选择最适合您需求的方案
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => <div key={plan.id} className={`rounded-xl p-8 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl ${plan.popular ? 'transform scale-105 ring-2 ring-green-600' : ''} ${plan.color.includes('gradient') ? plan.color : 'bg-white'}`}>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <h3 className={`text-xl font-semibold ${plan.color.includes('gradient') ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  {plan.badge && <span className="bg-yellow-400 text-green-900 px-2 py-1 rounded-full text-sm ml-2">{plan.badge}</span>}
                </div>
                <div className={`text-3xl font-bold mb-2 ${plan.color.includes('gradient') ? 'text-white' : 'text-gray-900'}`}>¥{plan.price.toLocaleString()}</div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => <li key={idx} className={`flex items-center ${plan.color.includes('gradient') ? 'text-white' : 'text-gray-600'}`}>
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </li>)}
              </ul>
              <button onClick={() => onPurchase(plan.id)} className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-white text-green-600 hover:bg-gray-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                选择方案
              </button>
            </div>)}
        </div>
      </div>
    </div>;
};