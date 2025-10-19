// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Calendar } from 'lucide-react';

export const ScheduleManagement = ({
  scheduleData,
  shiftSettings,
  onCreateSchedule
}) => {
  const {
    toast
  } = useToast();

  // 处理创建排班
  const handleCreateSchedule = () => {
    onCreateSchedule();
  };

  // 渲染班次卡片
  const renderShiftCard = shift => {
    return <div key={shift.name} className="bg-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">{shift.name}</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/60">时间</span>
            <span className="text-white">{shift.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/60">人数</span>
            <span className="text-white">{shift.staffCount}人</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/60">负责人</span>
            <span className="text-white">{shift.manager}</span>
          </div>
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 排班日历 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">排班管理</h2>
            <Button onClick={handleCreateSchedule} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              新增排班
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['日', '一', '二', '三', '四', '五', '六'].map(day => <div key={day} className="text-center text-white/60 text-sm">
                {day}
              </div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({
            length: 35
          }, (_, i) => <div key={i} className="bg-white/10 rounded-lg p-2 text-center hover:bg-white/20 cursor-pointer">
                <div className="text-white/60 text-sm">{i + 1}</div>
                {i === 14 && <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>}
                {i === 20 && <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>}
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 班次设置 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">班次设置</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shiftSettings.map(renderShiftCard)}
          </div>
        </CardContent>
      </Card>
    </div>;
};