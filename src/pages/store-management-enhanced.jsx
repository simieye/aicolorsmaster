// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, Users, ShoppingCart, TrendingUp, Calendar, MessageSquare, CreditCard, UserCheck, Heart, Crown, BarChart3, Package, DollarSign, Target, Zap, Shield, Database, HeadphonesIcon, Clock } from 'lucide-react';

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

  // 处理设置
  const handleSettings = () => {
    toast({
      title: "门店设置",
      description: "打开门店管理设置"
    });
  };

  // 处理AI管理系统导航
  const handleAIManagementNavigation = (systemId, systemName, pageId) => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    } else {
      toast({
        title: "AI管理系统",
        description: `正在前往${systemName}`
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="store-management-enhanced" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <StoreManagementEnhanced onBack={handleBack} onSettings={handleSettings} onAIManagementNavigation={handleAIManagementNavigation} />
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="store-management-enhanced" />
    </div>;
}