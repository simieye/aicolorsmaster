// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, Fingerprint, BarChart3, AlertTriangle, CalendarAlt, FileAlt, UserCheck, TrendingUp, TrendingDown, Clock, UserTimes, Percent } from 'lucide-react';

// 导入子组件
// @ts-ignore;
import { FaceRecognition } from './attendance/FaceRecognition';
// @ts-ignore;
import { AttendanceStatistics } from './attendance/AttendanceStatistics';
// @ts-ignore;
import { ExceptionHandling } from './attendance/ExceptionHandling';
// @ts-ignore;
import { ScheduleManagement } from './attendance/ScheduleManagement';
// @ts-ignore;
import { LeaveApproval } from './attendance/LeaveApproval';
export const AttendanceManagementDetailed = ({
  onBack,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('clock-in');

  // 考勤统计数据
  const [attendanceStats] = useState([{
    id: 1,
    title: '今日出勤',
    value: 24,
    icon: UserCheck,
    color: 'bg-green-500',
    status: '正常出勤',
    statusColor: 'text-green-400'
  }, {
    id: 2,
    title: '迟到人数',
    value: 2,
    icon: Clock,
    color: 'bg-yellow-500',
    status: '需要关注',
    statusColor: 'text-yellow-400'
  }, {
    id: 3,
    title: '缺勤人数',
    value: 1,
    icon: UserTimes,
    color: 'bg-red-500',
    status: '请假中',
    statusColor: 'text-red-400'
  }, {
    id: 4,
    title: '出勤率',
    value: 96,
    icon: Percent,
    color: 'bg-blue-500',
    status: '+2.1%',
    statusColor: 'text-green-400'
  }]);

  // 今日打卡状态
  const [todayStatus] = useState({
    clockIn: '08:45 已打卡',
    clockOut: '未打卡',
    workHours: '7小时15分钟'
  });

  // 实时考勤动态
  const [realTimeUpdates] = useState([{
    id: 1,
    title: '张三 刚刚完成上班打卡',
    department: '技术部',
    time: '08:45',
    icon: UserCheck,
    color: 'bg-green-500',
    status: '正常',
    textColor: 'text-green-400'
  }, {
    id: 2,
    title: '李四 迟到 10 分钟',
    department: '美发部',
    time: '09:10',
    icon: Clock,
    color: 'bg-yellow-500',
    status: '迟到',
    textColor: 'text-yellow-400'
  }, {
    id: 3,
    title: '王五 刚刚完成下班打卡',
    department: '客服部',
    time: '18:30',
    icon: TrendingDown,
    color: 'bg-blue-500',
    status: '正常',
    textColor: 'text-blue-400'
  }]);

  // 考勤记录
  const [attendanceRecords] = useState([{
    id: 1,
    name: '张三',
    department: '技术部',
    clockIn: '08:45',
    clockOut: '18:30',
    workHours: '9小时45分钟',
    status: '正常'
  }, {
    id: 2,
    name: '李四',
    department: '美发部',
    clockIn: '09:10',
    clockOut: '-',
    workHours: '-',
    status: '迟到'
  }]);

  // 异常统计数据
  const [exceptionStats] = useState({
    pending: 5,
    late: 12,
    absent: 3
  });

  // 异常列表
  const [exceptionList] = useState([{
    id: 1,
    title: '张三 - 未打卡',
    description: '技术部 - 2024-01-15',
    priority: '高优先级',
    icon: AlertTriangle,
    color: 'bg-red-500'
  }, {
    id: 2,
    title: '李四 - 迟到',
    description: '美发部 - 迟到15分钟',
    priority: '中优先级',
    icon: Clock,
    color: 'bg-yellow-500'
  }]);

  // 排班数据
  const [shiftSettings] = useState([{
    name: '早班',
    time: '08:00 - 16:00',
    staffCount: 8,
    manager: '张三'
  }, {
    name: '晚班',
    time: '16:00 - 24:00',
    staffCount: 6,
    manager: '李四'
  }]);

  // 请假统计数据
  const [leaveStats] = useState({
    pending: 3,
    approved: 15,
    rejected: 2,
    monthly: 8
  });

  // 请假申请
  const [leaveApplications] = useState([{
    id: 1,
    name: '张三',
    type: '事假',
    department: '技术部',
    dateRange: '2024-01-16 至 2024-01-17',
    status: '待审批',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  }, {
    id: 2,
    name: '李四',
    type: '病假',
    department: '美发部',
    dateRange: '2024-01-15 至 2024-01-16',
    status: '已批准',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  }]);

  // 处理打卡
  const handleClockIn = () => {
    toast({
      title: "打卡成功",
      description: "上班打卡已完成"
    });
  };
  const handleClockOut = () => {
    toast({
      title: "打卡成功",
      description: "下班打卡已完成"
    });
  };

  // 处理导出
  const handleExport = () => {
    toast({
      title: "导出考勤记录",
      description: "正在生成考勤报表"
    });
  };

  // 处理异常
  const handleException = exceptionId => {
    toast({
      title: "处理异常",
      description: `正在处理异常 ${exceptionId}`
    });
  };

  // 处理创建排班
  const handleCreateSchedule = () => {
    toast({
      title: "创建排班",
      description: "正在打开排班创建界面"
    });
  };

  // 处理请假审批
  const handleApprove = applicationId => {
    toast({
      title: "批准请假",
      description: `已批准请假申请 ${applicationId}`
    });
  };
  const handleReject = applicationId => {
    toast({
      title: "拒绝请假",
      description: `已拒绝请假申请 ${applicationId}`
    });
  };
  const handleView = applicationId => {
    toast({
      title: "查看详情",
      description: `正在查看请假申请 ${applicationId} 的详情`
    });
  };

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">AI考勤管理系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">系统正常</span>
            </div>
            <Button onClick={onSettings} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      {/* 考勤统计概览 */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {attendanceStats.map(stat => {
        const Icon = stat.icon;
        return <div key={stat.id} className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
            <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-white/60">{stat.title}</div>
            <div className={`text-sm mt-2 ${stat.statusColor}`}>{stat.status}</div>
          </div>;
      })}
      </section>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'clock-in' ? 'default' : 'ghost'} onClick={() => handleTabChange('clock-in')} className={`flex-1 ${activeTab === 'clock-in' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Fingerprint className="w-4 h-4 mr-2" />
          人脸打卡
        </Button>
        <Button variant={activeTab === 'statistics' ? 'default' : 'ghost'} onClick={() => handleTabChange('statistics')} className={`flex-1 ${activeTab === 'statistics' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <BarChart3 className="w-4 h-4 mr-2" />
          考勤统计
        </Button>
        <Button variant={activeTab === 'exceptions' ? 'default' : 'ghost'} onClick={() => handleTabChange('exceptions')} className={`flex-1 ${activeTab === 'exceptions' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <AlertTriangle className="w-4 h-4 mr-2" />
          异常处理
        </Button>
        <Button variant={activeTab === 'schedule' ? 'default' : 'ghost'} onClick={() => handleTabChange('schedule')} className={`flex-1 ${activeTab === 'schedule' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CalendarAlt className="w-4 h-4 mr-2" />
          排班管理
        </Button>
        <Button variant={activeTab === 'leave' ? 'default' : 'ghost'} onClick={() => handleTabChange('leave')} className={`flex-1 ${activeTab === 'leave' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <FileAlt className="w-4 h-4 mr-2" />
          请假审批
        </Button>
      </div>

      {/* 标签内容 */}
      {activeTab === 'clock-in' && <FaceRecognition todayStatus={todayStatus} realTimeUpdates={realTimeUpdates} onClockIn={handleClockIn} onClockOut={handleClockOut} />}
      
      {activeTab === 'statistics' && <AttendanceStatistics attendanceRecords={attendanceRecords} onExport={handleExport} />}
      
      {activeTab === 'exceptions' && <ExceptionHandling exceptionStats={exceptionStats} exceptionList={exceptionList} onHandleException={handleException} />}
      
      {activeTab === 'schedule' && <ScheduleManagement scheduleData={{}} shiftSettings={shiftSettings} onCreateSchedule={handleCreateSchedule} />}
      
      {activeTab === 'leave' && <LeaveApproval leaveStats={leaveStats} leaveApplications={leaveApplications} onApprove={handleApprove} onReject={handleReject} onView={handleView} />}
    </div>;
};