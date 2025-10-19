// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, UserCheck as UserCheckIcon, Clock, UserTimes, Percent, Fingerprint, CalendarAlt, CalendarCheck, BarChart3, Bell, Info, CalendarPlus, ExchangeAlt, FileAlt, SignOutAlt, Download, Plus, TrendingUp, ChartPie, AlertTriangle } from 'lucide-react';

export const AttendanceManagement = ({
  onBack,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('clock-in');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const fileInputRef = useRef(null);

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
    clockIn: '08:45',
    clockOut: '未打卡',
    workHours: '7小时15分钟'
  });

  // 部门出勤情况
  const [departmentAttendance] = useState([{
    name: '技术部',
    present: 8,
    total: 8
  }, {
    name: '美发部',
    present: 12,
    total: 12
  }, {
    name: '客服部',
    present: 3,
    total: 4
  }, {
    name: '管理部',
    present: 2,
    total: 2
  }]);

  // 异常情况
  const [abnormalCases] = useState([{
    name: '张三',
    type: '迟到',
    detail: '迟到 10 分钟',
    color: 'bg-yellow-400'
  }, {
    name: '李四',
    type: '请假',
    detail: '请假',
    color: 'bg-red-400'
  }, {
    name: '王五',
    type: '迟到',
    detail: '迟到 5 分钟',
    color: 'bg-yellow-400'
  }]);

  // 实时动态
  const [realTimeUpdates] = useState([{
    name: '赵六',
    action: '上班打卡',
    icon: UserCheckIcon,
    color: 'text-green-400'
  }, {
    name: '钱七',
    action: '下班打卡',
    icon: SignOutAlt,
    color: 'text-blue-400'
  }, {
    name: '孙八',
    action: '打卡异常',
    icon: AlertTriangle,
    color: 'text-yellow-400'
  }]);

  // 考勤记录
  const [attendanceRecords] = useState([{
    id: 1,
    name: '张三',
    department: '技术部',
    clockIn: '08:45',
    clockOut: '18:30',
    workHours: '9小时45分钟',
    status: '正常',
    statusColor: 'bg-green-500/20 text-green-300'
  }, {
    id: 2,
    name: '李四',
    department: '美发部',
    clockIn: '09:10',
    clockOut: '-',
    workHours: '-',
    status: '迟到',
    statusColor: 'bg-yellow-500/20 text-yellow-300'
  }]);

  // 排班数据
  const [scheduleData] = useState({
    weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    schedules: {
      '周一': [{
        name: '张三',
        time: '09:00-18:00'
      }, {
        name: '李四',
        time: '10:00-19:00'
      }],
      '周二': [{
        name: '王五',
        time: '09:00-18:00'
      }, {
        name: '赵六',
        time: '10:00-19:00'
      }]
    }
  });

  // 快速操作
  const [quickActions] = useState([{
    id: 1,
    name: '请假申请',
    icon: CalendarPlus,
    color: 'text-blue-400'
  }, {
    id: 2,
    name: '调班申请',
    icon: ExchangeAlt,
    color: 'text-green-400'
  }, {
    id: 3,
    name: '加班申请',
    icon: Clock,
    color: 'text-yellow-400'
  }, {
    id: 4,
    name: '考勤说明',
    icon: FileAlt,
    color: 'text-purple-400'
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理打卡
  const handleClockIn = type => {
    setIsScanning(true);
    // 模拟人脸识别扫描
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "打卡成功",
        description: `${type === 'in' ? '上班' : '下班'}打卡已完成`
      });
    }, 2000);
  };

  // 处理快速操作
  const handleQuickAction = action => {
    toast({
      title: "快速操作",
      description: `正在打开${action.name}页面`
    });
  };

  // 处理导出
  const handleExport = () => {
    toast({
      title: "导出考勤记录",
      description: "正在生成考勤报表..."
    });
  };

  // 渲染统计卡片
  const renderStatCard = stat => {
    const Icon = stat.icon;
    return <div key={stat.id} className="attendance-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
        <div className="text-white/60">{stat.title}</div>
        <div className={`text-sm mt-2 ${stat.statusColor}`}>{stat.status}</div>
      </div>;
  };

  // 渲染排班项
  const renderScheduleItem = (item, index) => {
    return <div key={index} className="schedule-item bg-white/5 rounded-lg p-2 cursor-pointer hover:bg-white/15 hover:translate-x-1 transition-all duration-300">
        <div className="text-white text-sm">{item.name}</div>
        <div className="text-white/60 text-xs">{item.time}</div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">AI考勤打卡管理</h1>
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map(renderStatCard)}
      </section>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'clock-in' ? 'default' : 'ghost'} onClick={() => handleTabChange('clock-in')} className={`flex-1 ${activeTab === 'clock-in' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Fingerprint className="w-4 h-4 mr-2" />
          打卡签到
        </Button>
        <Button variant={activeTab === 'records' ? 'default' : 'ghost'} onClick={() => handleTabChange('records')} className={`flex-1 ${activeTab === 'records' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CalendarAlt className="w-4 h-4 mr-2" />
          考勤记录
        </Button>
        <Button variant={activeTab === 'schedule' ? 'default' : 'ghost'} onClick={() => handleTabChange('schedule')} className={`flex-1 ${activeTab === 'schedule' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CalendarCheck className="w-4 h-4 mr-2" />
          排班管理
        </Button>
        <Button variant={activeTab === 'stats' ? 'default' : 'ghost'} onClick={() => handleTabChange('stats')} className={`flex-1 ${activeTab === 'stats' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <BarChart3 className="w-4 h-4 mr-2" />
          统计分析
        </Button>
      </div>

      {/* 打卡签到内容 */}
      {activeTab === 'clock-in' && <div className="space-y-8">
          {/* 人脸识别打卡 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">人脸识别打卡</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className={`face-scan w-64 h-64 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden ${isScanning ? 'scanning' : ''}`}>
                    <div className="text-center">
                      <UserCheck className="w-24 h-24 text-white/60 mx-auto mb-4" />
                      <p className="text-white/60">请将面部对准摄像头</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button onClick={() => handleClockIn('in')} className={`w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold ${isScanning ? 'animate-pulse' : ''}`}>
                      <Fingerprint className="w-5 h-5 mr-2" />
                      上班打卡
                    </Button>
                    <Button onClick={() => handleClockIn('out')} className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg text-lg font-semibold">
                      <SignOutAlt className="w-5 h-5 mr-2" />
                      下班打卡
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">今日打卡状态</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">上班打卡</span>
                        <span className="text-green-400">{todayStatus.clockIn} 已打卡</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">下班打卡</span>
                        <span className="text-white/40">{todayStatus.clockOut}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">工作时长</span>
                        <span className="text-white">{todayStatus.workHours}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">打卡提醒</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/60">距离下班还有 45 分钟</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Info className="w-4 h-4 text-blue-400" />
                        <span className="text-white/60">记得按时打卡哦</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">快速操作</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {quickActions.map(action => {
                    const Icon = action.icon;
                    return <Button key={action.id} variant="ghost" onClick={() => handleQuickAction(action)} className="bg-white/10 hover:bg-white/20 text-white justify-start h-auto p-3">
                          <Icon className={`${action.color} w-4 h-4 mr-2`} />
                          <span className="text-sm">{action.name}</span>
                        </Button>;
                  })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 今日考勤概览 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">今日考勤概览</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">部门出勤情况</h3>
                  <div className="space-y-3">
                    {departmentAttendance.map((dept, index) => <div key={index} className="flex items-center justify-between">
                        <span className="text-white/60">{dept.name}</span>
                        <span className={dept.present === dept.total ? 'text-green-400' : 'text-yellow-400'}>
                          {dept.present}/{dept.total}
                        </span>
                      </div>)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">异常情况</h3>
                  <div className="space-y-3">
                    {abnormalCases.map((case_, index) => <div key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 ${case_.color} rounded-full`}></div>
                        <span className="text-white/60">{case_.name} - {case_.detail}</span>
                      </div>)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">实时动态</h3>
                  <div className="space-y-3">
                    {realTimeUpdates.map((update, index) => {
                  const Icon = update.icon;
                  return <div key={index} className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${update.color}`} />
                        <span className="text-white/60 text-sm">{update.name} 刚刚完成{update.action}</span>
                      </div>;
                })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 考勤记录内容 */}
      {activeTab === 'records' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">考勤记录</h2>
              <div className="flex items-center space-x-4">
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50" />
                <select value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                  <option value="">全部员工</option>
                  <option value="tech">技术部</option>
                  <option value="hair">美发部</option>
                  <option value="service">客服部</option>
                  <option value="manage">管理部</option>
                </select>
                <Button onClick={handleExport} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">员工姓名</th>
                    <th className="text-left py-3 px-4">部门</th>
                    <th className="text-left py-3 px-4">上班打卡</th>
                    <th className="text-left py-3 px-4">下班打卡</th>
                    <th className="text-left py-3 px-4">工作时长</th>
                    <th className="text-left py-3 px-4">状态</th>
                    <th className="text-left py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map(record => <tr key={record.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4">{record.name}</td>
                      <td className="py-3 px-4">{record.department}</td>
                      <td className="py-3 px-4">{record.clockIn}</td>
                      <td className="py-3 px-4">{record.clockOut}</td>
                      <td className="py-3 px-4">{record.workHours}</td>
                      <td className="py-3 px-4">
                        <span className={`status-badge ${record.statusColor} px-2 py-1 rounded-full text-sm`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          详情
                        </Button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>}

      {/* 排班管理内容 */}
      {activeTab === 'schedule' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">排班管理</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新增排班
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {scheduleData.weekDays.map((day, index) => <div key={index} className="bg-white/10 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-3 text-center">{day}</h3>
                  <div className="space-y-2">
                    {(scheduleData.schedules[day] || []).map((item, itemIndex) => renderScheduleItem(item, itemIndex))}
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>}

      {/* 统计分析内容 */}
      {activeTab === 'stats' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">考勤统计分析</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">本月考勤趋势</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                    <p className="text-white/60">考勤趋势图表</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">部门出勤对比</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <ChartPie className="w-24 h-24 text-green-400 mx-auto mb-4" />
                    <p className="text-white/60">部门出勤对比图表</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
};