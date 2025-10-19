// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { AICustomerService } from '@/components/AICustomerService';
export default function AICustomerServicePage(props) {
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

  // 处理设置
  const handleSettings = () => {
    toast({
      title: "客服设置",
      description: "打开客服系统设置"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="ai-customer-service" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <AICustomerService onBack={handleBack} onSettings={handleSettings} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="ai-customer-service" />
    </div>;
}