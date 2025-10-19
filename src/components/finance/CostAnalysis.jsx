// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { TrendingUp } from 'lucide-react';

export const CostAnalysis = ({
  costStructure,
  costComparison
}) => {
  // 渲染成本结构
  const renderCostStructure = () => {
    return <div>
        <h3 className="text-xl font-semibold text-white mb-4">成本构成</h3>
        <div className="space-y-3">
          {costStructure.map((cost, index) => <div key={index} className="flex items-center justify-between">
              <span className="text-white/60">{cost.name}</span>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-white/20 rounded-full h-3">
                  <div className={`progress-bar h-3 rounded-full ${cost.color}`} style={{
                width: `${cost.percentage}%`
              }}></div>
                </div>
                <span className="text-white font-medium">{cost.percentage}%</span>
              </div>
            </div>)}
        </div>
      </div>;
  };

  // 渲染成本对比
  const renderCostComparison = () => {
    return <div>
        <h3 className="text-xl font-semibold text-white mb-4">成本对比</h3>
        <div className="bg-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">本月成本</span>
              <span className="text-white font-medium">¥{costComparison.currentMonth.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">上月成本</span>
              <span className="text-white font-medium">¥{costComparison.lastMonth.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">同比增长</span>
              <span className="text-red-400 font-medium">+{costComparison.growth}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">成本率</span>
              <span className="text-yellow-400 font-medium">{costComparison.costRate}%</span>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 成本趋势分析 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">成本趋势分析</h2>
          <div className="bg-white/10 rounded-lg p-6 h-64 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-24 h-24 text-blue-400 mx-auto mb-4" />
              <p className="text-white/60">成本趋势图表</p>
              <p className="text-white/40 text-sm mt-2">显示最近6个月的成本变化趋势</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 成本结构分析 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">成本结构分析</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {renderCostStructure()}
            {renderCostComparison()}
          </div>
        </CardContent>
      </Card>
    </div>;
};