// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Download, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';

export const AttendanceStatistics = ({
  attendanceRecords,
  onExport
}) => {
  const {
    toast
  } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // 处理导出
  const handleExport = () => {
    onExport();
  };

  // 获取状态颜色
  const getStatusColor = status => {
    switch (status) {
      case '正常':
        return 'bg-green-500/20 text-green-300';
      case '迟到':
        return 'bg-yellow-500/20 text-yellow-300';
      case '早退':
        return 'bg-orange-500/20 text-orange-300';
      case '缺勤':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };
  return <div className="space-y-8">
      {/* 考勤统计图表 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">考勤统计分析</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">本月考勤趋势</h3>
              <div className="bg-white/10 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                  <p className="text-white/60">考勤趋势图表</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">部门出勤对比</h3>
              <div className="bg-white/10 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-24 h-24 text-green-400 mx-auto mb-4" />
                  <p className="text-white/60">部门出勤对比图表</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 考勤数据表格 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
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
              </select>
              <Button onClick={handleExport} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">员工姓名</th>
                  <th className="text-left py-3 px-4">部门</th>
                  <th className="text-left py-3 px-4">上班打卡</th>
                  <th className="text-left py-3 px-4">下班打卡</th>
                  <th className="text-left py-3 px-4">工作时长</th>
                  <th className="text-left py-3 px-4">状态</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => <tr key={index} className="border-b border-white/10">
                    <td className="py-3 px-4">{record.name}</td>
                    <td className="py-3 px-4">{record.department}</td>
                    <td className="py-3 px-4">{record.clockIn}</td>
                    <td className="py-3 px-4">{record.clockOut}</td>
                    <td className="py-3 px-4">{record.workHours}</td>
                    <td className="py-3 px-4">
                      <span className={`${getStatusColor(record.status)} px-2 py-1 rounded-full text-sm`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
};