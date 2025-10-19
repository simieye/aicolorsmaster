// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { CustomerCases } from '@/components/CustomerCases';
export default function CustomerCasesPage(props) {
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

  // 处理案例详情
  const handleCaseDetail = caseItem => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'case-detail',
        params: {
          caseId: caseItem.id
        }
      });
    } else {
      toast({
        title: "案例详情",
        description: `查看 ${caseItem.title} 的详细信息`
      });
    }
  };

  // 处理联系销售
  const handleContactSales = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'contact-sales',
        params: {}
      });
    } else {
      toast({
        title: "联系销售",
        description: "销售顾问将尽快与您联系，请提供您的联系方式"
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="customer-cases" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <CustomerCases onBack={handleBack} onCaseDetail={handleCaseDetail} onContactSales={handleContactSales} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="customer-cases" />
    </div>;
}