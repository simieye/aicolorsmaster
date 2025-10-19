// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Fingerprint, SignOutAlt, CalendarPlus, ExchangeAlt, Clock, FileAlt, Bell, Info, UserCheck } from 'lucide-react';

export const FaceRecognition = ({
  todayStatus,
  realTimeUpdates,
  onClockIn,
  onClockOut
}) => {
  const {
    toast
  } = useToast();
  const [isScanning, setIsScanning] = useState(false);

  // 处理打卡
  const handleClockIn = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onClockIn();
    }, 2000);
  };
  const handleClockOut = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onClockOut();
    }, 2000);
  };

  // 处理快速操作
  const handleQuickAction = action => {
    toast({
      title: "快速操作",
      description: `正在打开${action}页面`
    });
  };
  return <div className="space-y-8">
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
                <Button onClick={handleClockIn} className={`w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold ${isScanning ? 'animate-pulse' : ''}`}>
                  <Fingerprint className="w-5 h-5 mr-2" />
                  上班打卡
                </Button>
                <Button onClick={handleClockOut} className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-lg text-lg font-semibold">
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
                    <span className="text-green-400">{todayStatus.clockIn}</span>
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
                  <Button onClick={() => handleQuickAction('请假申请')} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white justify-start h-auto p-3">
                    <CalendarPlus className="w-4 h-4 mr-2" />
                    <span className="text-sm">请假申请</span>
                  </Button>
                  <Button onClick={() => handleQuickAction('调班申请')} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white justify-start h-auto p-3">
                    <ExchangeAlt className="w-4 h-4 mr-2" />
                    <span className="text-sm">调班申请</span>
                  </Button>
                  <Button onClick={() => handleQuickAction('加班申请')} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white justify-start h-auto p-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">加班申请</span>
                  </Button>
                  <Button onClick={() => handleQuickAction('考勤说明')} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white justify-start h-auto p-3">
                    <FileAlt className="w-4 h-4 mr-2" />
                    <span className="text-sm">考勤说明</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实时考勤动态 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">实时考勤动态</h2>
          <div className="space-y-4">
            {realTimeUpdates.map((update, index) => {
            const Icon = update.icon;
            return <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-lg p-4">
                <div className={`w-10 h-10 ${update.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{update.title}</h4>
                  <p className="text-white/60 text-sm">{update.department} - {update.time}</p>
                </div>
                <span className={`${update.textColor} text-sm`}>{update.status}</span>
              </div>;
          })}
          </div>
        </CardContent>
      </Card>
    </div>;
};