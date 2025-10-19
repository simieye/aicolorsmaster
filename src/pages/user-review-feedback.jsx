// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { UserReviewFeedback } from '@/components/UserReviewFeedback';
export default function UserReviewFeedbackPage(props) {
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

  // 处理写评价
  const handleWriteReview = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'user-feedback-system',
        params: {
          tab: 'reviews',
          action: 'write'
        }
      });
    } else {
      toast({
        title: "写评价",
        description: "打开评价编写页面"
      });
    }
  };

  // 处理提交反馈
  const handleSubmitFeedback = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'user-feedback-system',
        params: {
          tab: 'feedback',
          action: 'submit'
        }
      });
    } else {
      toast({
        title: "提反馈",
        description: "打开反馈提交页面"
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="user-review-feedback" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <UserReviewFeedback onBack={handleBack} onWriteReview={handleWriteReview} onSubmitFeedback={handleSubmitFeedback} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="user-review-feedback" />
    </div>;
}