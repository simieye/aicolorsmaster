// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { AIBookingSystem } from '@/components/AIBookingSystem';
export default function AIBookingSystemPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'store-management-enhanced',
        params: {}
      });
    }
  };

  // 处理新建预约
  const handleNewAppointment = () => {
    toast({
      title: "新建预约",
      description: "打开新建预约页面"
    });
  };

  // 处理提醒设置
  const handleReminderSettings = () => {
    toast({
      title: "提醒设置",
      description: "打开提醒设置页面"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="ai-booking-system" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <AIBookingSystem onBack={handleBack} onNewAppointment={handleNewAppointment} onReminderSettings={handleReminderSettings} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-booking-system" />
    </div>;
}