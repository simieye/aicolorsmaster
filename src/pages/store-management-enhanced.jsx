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

  // 处理模块点击
  const handleModuleClick = module => {
    if ($w.utils && $w.utils.navigateTo) {
      const moduleMap = {
        'AI财务管理': 'finance-management',
        'AI考勤管理': 'attendance-management',
        'AI企业文化': 'culture-management',
        'AI客服系统': 'customer-service',
        'AI预约系统': 'appointment-system'
      };
      const pageId = moduleMap[module.name];
      if (pageId) {
        $w.utils.navigateTo({
          pageId: pageId,
          params: {
            moduleId: module.id
          }
        });
      } else {
        toast({
          title: "模块功能",
          description: `正在打开${module.name}模块`
        });
      }
    } else {
      toast({
        title: "模块功能",
        description: `正在打开${module.name}模块`
      });
    }
  };

  // 处理快速操作
  const handleQuickAction = action => {
    if ($w.utils && $w.utils.navigateTo) {
      const actionMap = {
        '新建工单': 'create-ticket',
        '员工排班': 'schedule-management',
        '生成报表': 'report-generation',
        '发送通知': 'send-notification'
      };
      const pageId = actionMap[action.name];
      if (pageId) {
        $w.utils.navigateTo({
          pageId: pageId,
          params: {
            actionId: action.id
          }
        });
      } else {
        toast({
          title: "快速操作",
          description: `正在执行${action.name}操作`
        });
      }
    } else {
      toast({
        title: "快速操作",
        description: `正在执行${action.name}操作`
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="store-management-enhanced" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <StoreManagementEnhanced onBack={handleBack} onModuleClick={handleModuleClick} onQuickAction={handleQuickAction} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="store-management-enhanced" />
    </div>;
}