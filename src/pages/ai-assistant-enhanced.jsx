// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Bot, Bell, Settings, ArrowLeft, Headphones, CalendarCheck, GraduationCap, Store, Plus, AlertCircle, CheckCircle, Clock, Users, Lightbulb, TrendingUp, MessageSquare, CalendarPlus, PlusCircle, Package, Palette, Shield, Languages, Robot } from 'lucide-react';

export default function AIAssistantEnhancedPage(props) {
  const {
    $w,
    style
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [taskSettings, setTaskSettings] = useState({
    taskReminder: true,
    systemNotification: true,
    marketingPush: false
  });
  const [aiSettings, setAiSettings] = useState({
    smartRecommendation: true,
    autoLearning: true
  });

  // 集成系统数据
  const integratedSystems = [{
    id: 'customer-service',
    name: 'AI客服系统',
    description: '智能客服，24小时在线服务',
    icon: Headphones,
    color: 'purple',
    status: 'running',
    todayCount: 128,
    unit: '次'
  }, {
    id: 'appointment',
    name: 'AI预约系统',
    description: '智能预约，高效时间管理',
    icon: CalendarCheck,
    color: 'blue',
    status: 'running',
    todayCount: 45,
    unit: '个'
  }, {
    id: 'training',
    name: 'AI培训系统',
    description: '智能培训，个性化学习',
    icon: GraduationCap,
    color: 'green',
    status: 'updating',
    todayCount: 234,
    unit: '人'
  }, {
    id: 'micro-store',
    name: 'AI微店系统',
    description: '智能电商，一站式开店',
    icon: Store,
    color: 'orange',
    status: 'running',
    todayCount: 89,
    unit: '单'
  }];

  // 任务数据
  const tasks = [{
    id: 1,
    title: '客服系统升级',
    description: '更新AI客服系统至最新版本，添加新功能',
    priority: 'urgent',
    priorityColor: 'red',
    priorityText: '紧急',
    deadline: '今天 18:00',
    system: 'customer-service',
    color: 'purple'
  }, {
    id: 2,
    title: '预约数据备份',
    description: '备份本周预约数据，确保数据安全',
    priority: 'important',
    priorityColor: 'yellow',
    priorityText: '重要',
    deadline: '明天 12:00',
    system: 'appointment',
    color: 'blue'
  }, {
    id: 3,
    title: '培训课程审核',
    description: '审核新上传的培训课程内容',
    priority: 'normal',
    priorityColor: 'blue',
    priorityText: '普通',
    deadline: '本周五',
    system: 'training',
    color: 'green'
  }, {
    id: 4,
    title: '微店商品更新',
    description: '更新微店商品信息和价格',
    priority: 'normal',
    priorityColor: 'blue',
    priorityText: '普通',
    deadline: '下周一',
    system: 'micro-store',
    color: 'orange'
  }];

  // 任务统计
  const taskStats = {
    pending: 4,
    inProgress: 2,
    completed: 18
  };

  // 智能推荐数据
  const recommendations = [{
    id: 1,
    type: '功能推荐',
    typeColor: 'purple',
    title: '启用智能客服',
    description: '根据您的业务需求，建议启用AI客服系统以提升客户满意度',
    icon: Lightbulb,
    color: 'purple'
  }, {
    id: 2,
    type: '效率提升',
    typeColor: 'blue',
    title: '优化预约流程',
    description: '分析显示您的预约效率可提升30%，建议优化时间安排',
    icon: TrendingUp,
    color: 'blue'
  }, {
    id: 3,
    type: '培训建议',
    typeColor: 'green',
    title: '员工技能提升',
    description: '推荐为员工安排专业技能培训，提升团队整体能力',
    icon: Users,
    color: 'green'
  }];

  // 快速操作数据
  const quickActions = [{
    icon: MessageSquare,
    title: '开启对话',
    color: 'purple',
    action: () => handleQuickAction('chat')
  }, {
    icon: CalendarPlus,
    title: '新建预约',
    color: 'blue',
    action: () => handleQuickAction('appointment')
  }, {
    icon: PlusCircle,
    title: '添加课程',
    color: 'green',
    action: () => handleQuickAction('course')
  }, {
    icon: Package,
    title: '上架商品',
    color: 'orange',
    action: () => handleQuickAction('product')
  }];

  // 获取状态标签样式
  const getStatusBadge = status => {
    const statusMap = {
      running: {
        bg: 'bg-green-500',
        text: '运行中'
      },
      updating: {
        bg: 'bg-yellow-500',
        text: '更新中'
      },
      stopped: {
        bg: 'bg-red-500',
        text: '已停止'
      }
    };
    return statusMap[status] || statusMap.running;
  };

  // 获取颜色类
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        light: 'bg-purple-100',
        text: 'text-purple-600',
        bg: 'bg-purple-600'
      },
      blue: {
        light: 'bg-blue-100',
        text: 'text-blue-600',
        bg: 'bg-blue-600'
      },
      green: {
        light: 'bg-green-100',
        text: 'text-green-600',
        bg: 'bg-green-600'
      },
      orange: {
        light: 'bg-orange-100',
        text: 'text-orange-600',
        bg: 'bg-orange-600'
      },
      red: {
        light: 'bg-red-100',
        text: 'text-red-600',
        bg: 'bg-red-600'
      },
      yellow: {
        light: 'bg-yellow-100',
        text: 'text-yellow-600',
        bg: 'bg-yellow-600'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  // 处理系统点击
  const handleSystemClick = systemId => {
    if ($w.utils.navigateTo) {
      const pageMap = {
        'customer-service': 'ai-customer-service-detail',
        'appointment': 'ai-appointment-system-detail',
        'training': 'ai-employee-training-detail',
        'micro-store': 'ai-micro-store-detail'
      };
      $w.utils.navigateTo({
        pageId: pageMap[systemId] || 'home'
      });
    }
  };

  // 处理任务操作
  const handleTaskAction = taskId => {
    console.log('处理任务:', taskId);
    // 这里可以添加任务处理逻辑
  };

  // 处理快速操作
  const handleQuickAction = action => {
    console.log('快速操作:', action);
    // 这里可以添加快速操作逻辑
  };

  // 处理设置变更
  const handleSettingChange = (setting, value) => {
    if (setting.includes('.')) {
      const [category, key] = setting.split('.');
      if (category === 'task') {
        setTaskSettings(prev => ({
          ...prev,
          [key]: value
        }));
      } else if (category === 'ai') {
        setAiSettings(prev => ({
          ...prev,
          [key]: value
        }));
      }
    } else {
      if (setting === 'theme') {
        setSelectedTheme(value);
      }
    }
  };

  // 计算完成进度
  const completionRate = Math.round(taskStats.completed / (taskStats.pending + taskStats.inProgress + taskStats.completed) * 100);
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => $w.utils.navigateBack()} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">AI全能助手</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                </button>
                {notifications > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>}
              </div>
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* AI助手概览 */}
        <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="animate-bounce mb-6">
                <Bot className="w-24 h-24 mx-auto" />
              </div>
              <h1 className="text-4xl font-bold mb-4">AI全能助手</h1>
              <p className="text-xl mb-8 text-purple-100">
                集成多个AI系统，提供全方位的智能服务，让工作更高效，生活更便捷
              </p>
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-purple-200">集成系统</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-purple-200">核心功能</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-purple-200">全天候服务</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 标签切换 */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {['overview', 'tasks', 'settings', 'recommendations'].map(tab => {
              const tabLabels = {
                overview: '系统概览',
                tasks: '任务管理',
                settings: '个性化设置',
                recommendations: '智能推荐'
              };
              return <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    {tabLabels[tab]}
                  </button>;
            })}
            </div>
          </div>
        </section>

        {/* 系统概览 */}
        {activeTab === 'overview' && <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">集成系统</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  四大AI系统无缝集成，为您提供全方位的智能服务
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {integratedSystems.map(system => {
              const Icon = system.icon;
              const colors = getColorClasses(system.color);
              const statusBadge = getStatusBadge(system.status);
              return <div key={system.id} onClick={() => handleSystemClick(system.id)} className="bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl">
                      <div className="relative">
                        <div className={`w-16 h-16 ${colors.light} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className={`w-8 h-8 ${colors.text}`} />
                        </div>
                        <span className={`absolute top-0 right-0 ${statusBadge.bg} text-white text-xs px-2 py-1 rounded-full`}>
                          {statusBadge.text}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{system.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">今日处理</span>
                        <span className={`${colors.text} font-semibold`}>{system.todayCount}{system.unit}</span>
                      </div>
                    </div>;
            })}
              </div>
            </div>
          </section>}

        {/* 任务管理 */}
        {activeTab === 'tasks' && <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">任务管理中心</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  统一管理各系统任务，智能提醒，高效处理
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">待办任务</h3>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Plus className="w-4 h-4 inline mr-2" />
                        新建任务
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {tasks.map(task => {
                    const colors = getColorClasses(task.color);
                    const priorityColors = getColorClasses(task.priorityColor);
                    return <div key={task.id} className={`${colors.light} rounded-lg p-4 border-l-4 ${colors.bg} transition-all duration-300 hover:transform hover:translate-x-5`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{task.title}</h4>
                              <span className={`${priorityColors.light} ${priorityColors.text} px-2 py-1 rounded text-xs`}>
                                {task.priorityText}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">截止时间：{task.deadline}</span>
                              <button onClick={() => handleTaskAction(task.id)} className={`${colors.text} hover:opacity-80`}>
                                开始处理
                              </button>
                            </div>
                          </div>;
                  })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">任务统计</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">待处理</span>
                        <span className="text-red-600 font-semibold">{taskStats.pending}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">进行中</span>
                        <span className="text-yellow-600 font-semibold">{taskStats.inProgress}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">已完成</span>
                        <span className="text-green-600 font-semibold">{taskStats.completed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">完成进度</h3>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="54" stroke="#8b5cf6" strokeWidth="8" fill="none" strokeDasharray="339.292" strokeDashoffset={339.292 - 339.292 * completionRate / 100} className="transition-all duration-500" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">{completionRate}%</span>
                      </div>
                    </div>
                    <p className="text-center text-gray-600">今日任务完成率</p>
                  </div>
                </div>
              </div>
            </div>
          </section>}

        {/* 个性化设置 */}
        {activeTab === 'settings' && <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">个性化设置</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  定制您的AI助手，打造专属的智能体验
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 主题设置 */}
                <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">主题设置</h3>
                  <p className="text-gray-600 text-sm mb-4">自定义界面主题和颜色</p>
                  <div className="space-y-2">
                    {['default', 'dark', 'custom'].map(theme => <label key={theme} className="flex items-center">
                        <input type="radio" name="theme" value={theme} checked={selectedTheme === theme} onChange={e => handleSettingChange('theme', e.target.value)} className="mr-2" />
                        <span className="text-sm">
                          {theme === 'default' ? '默认主题' : theme === 'dark' ? '深色主题' : '自定义主题'}
                        </span>
                      </label>)}
                  </div>
                </div>
                
                {/* 通知设置 */}
                <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">通知设置</h3>
                  <p className="text-gray-600 text-sm mb-4">管理通知偏好和提醒方式</p>
                  <div className="space-y-2">
                    {[{
                  key: 'taskReminder',
                  label: '任务提醒'
                }, {
                  key: 'systemNotification',
                  label: '系统通知'
                }, {
                  key: 'marketingPush',
                  label: '营销推送'
                }].map(item => <label key={item.key} className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        <input type="checkbox" checked={taskSettings[item.key]} onChange={e => handleSettingChange(`task.${item.key}`, e.target.checked)} className="toggle" />
                      </label>)}
                  </div>
                </div>
                
                {/* 语言设置 */}
                <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Languages className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">语言设置</h3>
                  <p className="text-gray-600 text-sm mb-4">选择界面语言和地区</p>
                  <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                    <option>简体中文</option>
                    <option>繁体中文</option>
                    <option>English</option>
                    <option>日本語</option>
                  </select>
                </div>
                
                {/* 工作时间设置 */}
                <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-xl">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">工作时间</h3>
                  <p className="text-gray-600 text-sm mb-4">设置工作时间和休息时间</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>工作时间</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>休息时间</span>
                      <span>12:00 - 13:00</span>
                    </div>
                  </div>
                </div>
                
                {/* 隐私设置 */}
                <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">隐私设置</h3>
                  <p className="text-gray-600 text-sm mb-4">管理数据隐私和安全设置</p>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">数据加密</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">双重验证</span>
                      <input type="checkbox" className="toggle" />
                    </label>
                  </div>
                </div>
                
                {/* AI设置 */}
                <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-102 hover:shadow-xl">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Robot className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI设置</h3>
                  <p className="text-gray-600 text-sm mb-4">配置AI助手行为和响应</p>
                  <div className="space-y-2">
                    {[{
                  key: 'smartRecommendation',
                  label: '智能推荐'
                }, {
                  key: 'autoLearning',
                  label: '自动学习'
                }].map(item => <label key={item.key} className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        <input type="checkbox" checked={aiSettings[item.key]} onChange={e => handleSettingChange(`ai.${item.key}`, e.target.checked)} className="toggle" />
                      </label>)}
                  </div>
                </div>
              </div>
            </div>
          </section>}

        {/* 智能推荐 */}
        {activeTab === 'recommendations' && <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">智能推荐</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  基于您的使用习惯，AI为您推荐最适合的功能和优化建议
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(rec => {
              const Icon = rec.icon;
              const colors = getColorClasses(rec.color);
              const typeColors = getColorClasses(rec.typeColor);
              return <div key={rec.id} className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-10 h-10 ${colors.light} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <span className={`${typeColors.light} ${typeColors.text} px-2 py-1 rounded text-xs`}>
                          {rec.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                      <button className={`${colors.text} hover:opacity-80 text-sm font-medium`}>
                        了解详情 →
                      </button>
                    </div>;
            })}
              </div>
            </div>
          </section>}

        {/* 快速操作 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">快速操作</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                常用功能快速入口，一键直达
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colors = getColorClasses(action.color);
              return <button key={index} onClick={action.action} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
                    <Icon className={`w-8 h-8 ${colors.text} mb-3 mx-auto`} />
                    <p className="text-gray-900 font-medium">{action.title}</p>
                  </button>;
            })}
            </div>
          </div>
        </section>
      </main>
    </div>;
}