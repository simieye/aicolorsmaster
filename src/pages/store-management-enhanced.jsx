// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { StoreManagementEnhanced } from '@/components/StoreManagementEnhanced';
export default function StoreManagementEnhancedPage(props) {
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

  // 处理导航到各个AI系统
  const handleNavigateToSystem = systemId => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: systemId,
        params: {}
      });
    } else {
      toast({
        title: "系统导航",
        description: `正在打开${systemId}系统`
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="store-management-enhanced" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <StoreManagementEnhanced onBack={handleBack} onNavigateToSystem={handleNavigateToSystem} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="store-management-enhanced" />
    </div>;
}