// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { CorporateCulture } from '@/components/CorporateCulture';
export default function CorporateCulturePage(props) {
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
      title: "企业文化设置",
      description: "打开企业文化管理设置"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="corporate-culture" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <CorporateCulture onBack={handleBack} onSettings={handleSettings} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="corporate-culture" />
    </div>;
}