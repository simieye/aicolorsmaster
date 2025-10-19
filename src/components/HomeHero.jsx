// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Bot, Shield } from 'lucide-react';

export const HomeHero = ({
  isAuthenticated,
  user,
  onQuickAction
}) => {
  return <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-8 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {isAuthenticated ? `欢迎回来，${user?.name}！` : '欢迎来到AI美发智能系统'}
          </h1>
          <p className="text-xl text-white/80 mb-6">
            {isAuthenticated ? '探索AI美发的无限可能，开启智能美发新时代' : '专业美发行业数字化解决方案提供商'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => onQuickAction('store-management')} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6">
              <BarChart3 className="w-5 h-5 mr-2" />
              门店管理系统
            </Button>
            <Button onClick={() => onQuickAction('ai-chat')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6">
              <Bot className="w-5 h-5 mr-2" />
              AI染发顾问
            </Button>
            <Button onClick={() => onQuickAction('qr-scanner')} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6">
              <Shield className="w-5 h-5 mr-2" />
              扫码识别
            </Button>
          </div>
        </div>
        
        {isAuthenticated && <div className="text-right">
            <p className="text-white/60 text-sm">上次登录</p>
            <p className="text-white">{new Date(user?.lastLogin || Date.now()).toLocaleDateString()}</p>
          </div>}
      </div>
    </header>;
};