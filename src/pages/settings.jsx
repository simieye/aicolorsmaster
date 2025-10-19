// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast, Button } from '@/components/ui';
// @ts-ignore;
import { Settings, User, Bell, Shield, Database, Smartphone, Monitor, Moon, Sun, Globe, Lock, HelpCircle, LogOut } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;

export default function SettingsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

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

  // 处理设置项点击
  const handleSettingClick = setting => {
    toast({
      title: "设置项",
      description: `打开${setting}设置`
    });
  };

  // 处理退出登录
  const handleLogout = () => {
    toast({
      title: "退出登录",
      description: "正在退出系统..."
    });
  };

  // 设置分类
  const settingCategories = [{
    id: 'profile',
    title: '个人资料',
    icon: User,
    items: [{
      label: '基本信息',
      description: '修改姓名、头像等基本信息'
    }, {
      label: '账号安全',
      description: '密码、手机号、邮箱等安全设置'
    }, {
      label: '隐私设置',
      description: '数据隐私和权限管理'
    }]
  }, {
    id: 'notifications',
    title: '通知设置',
    icon: Bell,
    items: [{
      label: '推送通知',
      description: '管理应用推送通知'
    }, {
      label: '邮件通知',
      description: '设置邮件提醒规则'
    }, {
      label: '短信通知',
      description: '配置短信提醒服务'
    }]
  }, {
    id: 'system',
    title: '系统设置',
    icon: Monitor,
    items: [{
      label: '界面主题',
      description: '切换明暗主题模式'
    }, {
      label: '语言设置',
      description: '选择系统显示语言'
    }, {
      label: '时区设置',
      description: '配置系统时区'
    }]
  }, {
    id: 'security',
    title: '安全设置',
    icon: Shield,
    items: [{
      label: '登录安全',
      description: '双重认证、登录记录'
    }, {
      label: '数据加密',
      description: '数据传输和存储加密'
    }, {
      label: '访问控制',
      description: '权限管理和访问控制'
    }]
  }];

  // 渲染设置分类
  const renderSettingCategory = category => {
    const Icon = category.icon;
    return <div key={category.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-semibold text-lg">{category.title}</h3>
        </div>
        <div className="space-y-3">
          {category.items.map((item, index) => <div key={index} onClick={() => handleSettingClick(item.label)} className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{item.label}</h4>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
                <div className="text-white/40">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>)}
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 顶部导航 */}
      <TopNavigation currentPage="settings" />
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="space-y-8">
          {/* 页面标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">系统设置</h1>
            <p className="text-white/60">管理您的账户和系统偏好设置</p>
          </div>

          {/* 快速设置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {darkMode ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                  <span className="text-white font-medium">深色模式</span>
                </div>
                <Button variant={darkMode ? "default" : "outline"} size="sm" onClick={() => setDarkMode(!darkMode)} className={darkMode ? "bg-blue-500 text-white" : "border-white/30 text-white"}>
                  {darkMode ? '开启' : '关闭'}
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">推送通知</span>
                </div>
                <Button variant={notifications ? "default" : "outline"} size="sm" onClick={() => setNotifications(!notifications)} className={notifications ? "bg-blue-500 text-white" : "border-white/30 text-white"}>
                  {notifications ? '开启' : '关闭'}
                </Button>
              </div>
            </div>
          </div>

          {/* 设置分类 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingCategories.map(renderSettingCategory)}
          </div>

          {/* 其他操作 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-4">其他操作</h3>
            <div className="space-y-3">
              <div onClick={() => handleSettingClick('帮助中心')} className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">帮助中心</span>
                  </div>
                  <div className="text-white/40">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div onClick={handleLogout} className="bg-red-500/20 rounded-lg p-4 cursor-pointer hover:bg-red-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">退出登录</span>
                  </div>
                  <div className="text-red-400/40">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="settings" />
    </div>;
}