// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, Clock, UserTimes } from 'lucide-react';

export const ExceptionHandling = ({
  exceptionStats,
  exceptionList,
  onHandleException
}) => {
  const {
    toast
  } = useToast();

  // 处理异常
  const handleException = exceptionId => {
    onHandleException(exceptionId);
  };

  // 获取优先级颜色
  const getPriorityColor = priority => {
    switch (priority) {
      case '高优先级':
        return 'bg-red-500/20 text-red-300';
      case '中优先级':
        return 'bg-yellow-500/20 text-yellow-300';
      case '低优先级':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  // 渲染异常统计卡片
  const renderExceptionStatCard = (title, count, icon, color) => {
    const Icon = icon;
    return <div key={title} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-bold text-white mb-2">{count}</div>
        <div className="text-white/60">{title}</div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 异常统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderExceptionStatCard('待处理异常', exceptionStats.pending, AlertTriangle, 'bg-red-500')}
        {renderExceptionStatCard('本月迟到', exceptionStats.late, Clock, 'bg-yellow-500')}
        {renderExceptionStatCard('本月缺勤', exceptionStats.absent, UserTimes, 'bg-blue-500')}
      </div>

      {/* 异常列表 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">异常处理列表</h2>
          <div className="space-y-4">
            {exceptionList.map(exception => {
            const Icon = exception.icon;
            return <div key={exception.id} className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${exception.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{exception.title}</h4>
                      <p className="text-white/60 text-sm">{exception.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`${getPriorityColor(exception.priority)} px-2 py-1 rounded-full text-sm`}>
                      {exception.priority}
                    </span>
                    <Button onClick={() => handleException(exception.id)} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                      处理
                    </Button>
                  </div>
                </div>
              </div>;
          })}
          </div>
        </CardContent>
      </Card>
    </div>;
};