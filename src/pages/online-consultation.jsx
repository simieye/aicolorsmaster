// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { OnlineConsultation } from '@/components/OnlineConsultation';
export default function OnlineConsultationPage(props) {
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
        pageId: 'home',
        params: {}
      });
    }
  };

  // 处理电话咨询
  const handlePhoneCall = () => {
    toast({
      title: "电话咨询",
      description: "正在拨打客服电话：400-888-8888"
    });
  };

  // 处理视频通话
  const handleVideoCall = () => {
    toast({
      title: "视频通话",
      description: "正在连接视频客服，请稍候..."
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="online-consultation" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <OnlineConsultation onBack={handleBack} onPhoneCall={handlePhoneCall} onVideoCall={handleVideoCall} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="online-consultation" />
    </div>;
}