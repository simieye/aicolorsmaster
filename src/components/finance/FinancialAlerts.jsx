// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const FinancialAlerts = ({
  alertStats,
  financialAlerts
}) => {
  const {
    toast
  } = useToast();

  // 处理预警详情
  const handleAlertDetail = alertId => {
    toast({
      title: "预警详情",
      description: `正在查看预警 ${alertId} 的详细信息`
    });
  };

  // 渲染预警统计卡片
  const renderAlertStatCard = (title, count, color, icon) => {
    const Icon = icon;
    return <div className={`${color} border rounded-xl p-6`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-current rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
        <div className="text-2xl font-bold text-white mb-2">{count}</div>
        <div className="text-white/60 text-sm">
          {title === '高风险' ? '需要立即处理' : title === '中风险' ? '需要关注' : '需要监控'}
        </div>
      </div>;
  };

  // 渲染预警项
  const renderAlertItem = alert => {
    const Icon = alert.icon;
    return <div key={alert.id} className={`alert-item ${alert.levelColor} rounded-xl p-4 border`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 ${alert.level === 'high' ? 'bg-red-500' : alert.level === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">{alert.title}</h3>
              <p className="text-white/60 text-sm mb-2">{alert.description}</p>
              <div className="flex items-center space-x-4">
                <span className="text-white/40 text-xs">触发时间: {alert.time}</span>
                <span className={`${alert.levelTextColor} px-2 py-1 rounded-full text-xs`}>
                  {alert.levelText}
                </span>
              </div>
            </div>
          </div>
          <Button onClick={() => handleAlertDetail(alert.id)} variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 预警概览 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">财务预警</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">{alertStats.total}个活跃预警</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderAlertStatCard('高风险', alertStats.high, 'bg-red-500/20 border-red-400/30', AlertTriangle)}
            {renderAlertStatCard('中风险', alertStats.medium, 'bg-yellow-500/20 border-yellow-400/30', AlertCircle)}
            {renderAlertStatCard('低风险', alertStats.low, 'bg-blue-500/20 border-blue-400/30', Info)}
          </div>
        </CardContent>
      </Card>

      {/* 预警详情 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">预警详情</h2>
          <div className="space-y-4">
            {financialAlerts.map(renderAlertItem)}
          </div>
        </CardContent>
      </Card>
    </div>;
};