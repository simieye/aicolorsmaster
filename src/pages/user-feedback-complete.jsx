// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { UserFeedbackComplete } from '@/components/UserFeedbackComplete';
export default function UserFeedbackCompletePage(props) {
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

  // 处理我的评价
  const handleMyReviews = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'my-reviews',
        params: {}
      });
    } else {
      toast({
        title: "我的评价",
        description: "查看您的评价历史"
      });
    }
  };

  // 处理通知
  const handleNotifications = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'notifications',
        params: {}
      });
    } else {
      toast({
        title: "通知中心",
        description: "查看系统通知和回复"
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="user-feedback-complete" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <UserFeedbackComplete onBack={handleBack} onMyReviews={handleMyReviews} onNotifications={handleNotifications} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="user-feedback-complete" />
    </div>;
}