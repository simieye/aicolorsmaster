// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { HourglassHalf, Check, X, Calendar } from 'lucide-react';

export const LeaveApproval = ({
  leaveStats,
  leaveApplications,
  onApprove,
  onReject,
  onView
}) => {
  const {
    toast
  } = useToast();

  // 处理审批
  const handleApprove = applicationId => {
    onApprove(applicationId);
  };

  // 处理拒绝
  const handleReject = applicationId => {
    onReject(applicationId);
  };

  // 处理查看
  const handleView = applicationId => {
    onView(applicationId);
  };

  // 获取状态颜色
  const getStatusColor = status => {
    switch (status) {
      case '待审批':
        return 'bg-yellow-500/20 text-yellow-300';
      case '已批准':
        return 'bg-green-500/20 text-green-300';
      case '已拒绝':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  // 渲染请假统计卡片
  const renderLeaveStatCard = (title, count, icon, color) => {
    const Icon = icon;
    return <div key={title} className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-bold text-white mb-2">{count}</div>
        <div className="text-white/60">{title}</div>
      </div>;
  };

  // 渲染请假申请项
  const renderLeaveApplication = application => {
    return <div key={application.id} className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={application.avatar} alt={application.name} className="w-10 h-10 rounded-full" />
            <div>
              <h4 className="text-white font-medium">{application.name} - {application.type}</h4>
              <p className="text-white/60 text-sm">{application.department} - {application.dateRange}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${getStatusColor(application.status)} px-2 py-1 rounded-full text-sm`}>
              {application.status}
            </span>
            {application.status === '待审批' ? <>
                <Button onClick={() => handleApprove(application.id)} variant="ghost" className="bg-green-500/20 hover:bg-green-500/30 text-green-300">
                  <Check className="w-4 h-4" />
                </Button>
                <Button onClick={() => handleReject(application.id)} variant="ghost" className="bg-red-500/20 hover:bg-red-500/30 text-red-300">
                  <X className="w-4 h-4" />
                </Button>
              </> : <Button onClick={() => handleView(application.id)} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                查看
              </Button>}
          </div>
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 请假统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {renderLeaveStatCard('待审批', leaveStats.pending, HourglassHalf, 'bg-blue-500')}
        {renderLeaveStatCard('已批准', leaveStats.approved, Check, 'bg-green-500')}
        {renderLeaveStatCard('已拒绝', leaveStats.rejected, X, 'bg-red-500')}
        {renderLeaveStatCard('本月请假', leaveStats.monthly, Calendar, 'bg-purple-500')}
      </div>

      {/* 请假申请列表 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">请假申请</h2>
          <div className="space-y-4">
            {leaveApplications.map(renderLeaveApplication)}
          </div>
        </CardContent>
      </Card>
    </div>;
};