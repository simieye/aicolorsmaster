// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Settings, Users, CalendarAlt, GraduationCap, Bell, Heart, CalendarCheck, ChalkboardTeacher, Bullhorn, Plus, EllipsisVertical, Exclamation, Info, Check, UserCheck, TrendingUp, Award, Target, Lightbulb } from 'lucide-react';

export const CorporateCulture = ({
  onBack,
  onSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('culture');

  // 文化统计数据
  const [cultureStats] = useState([{
    id: 1,
    title: '员工总数',
    value: 156,
    icon: Users,
    color: 'bg-blue-500',
    change: '+12 本月',
    changeColor: 'text-green-400'
  }, {
    id: 2,
    title: '本月活动',
    value: 24,
    icon: CalendarAlt,
    color: 'bg-purple-500',
    change: '+8 vs 上月',
    changeColor: 'text-green-400'
  }, {
    id: 3,
    title: '培训课程',
    value: 18,
    icon: GraduationCap,
    color: 'bg-green-500',
    change: '+3 本月',
    changeColor: 'text-green-400'
  }, {
    id: 4,
    title: '参与率',
    value: 89,
    icon: Heart,
    color: 'bg-yellow-500',
    change: '+5.2%',
    changeColor: 'text-green-400'
  }]);

  // 文化活动数据
  const [cultureActivities] = useState([{
    id: 1,
    title: '团队建设活动',
    description: '增强团队凝聚力，提升协作效率',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop',
    date: '2024-01-15'
  }, {
    id: 2,
    title: '技能培训大会',
    description: '提升专业技能，分享最新技术',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    date: '2024-01-10'
  }, {
    id: 3,
    title: '年度庆典',
    description: '庆祝成就，展望未来',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    date: '2024-01-05'
  }]);

  // 员工风采数据
  const [employeeShowcase] = useState([{
    id: 1,
    name: '张明',
    position: '技术总监',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }, {
    id: 2,
    name: '李娜',
    position: '市场经理',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  }, {
    id: 3,
    name: '王强',
    position: '产品经理',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }, {
    id: 4,
    name: '刘芳',
    position: '设计总监',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }]);

  // 活动列表数据
  const [activities] = useState([{
    id: 1,
    title: '团队建设活动',
    date: '2024-01-20 14:00',
    type: 'team',
    icon: Users,
    color: 'bg-blue-500',
    status: '进行中',
    statusColor: 'bg-blue-500/20 text-blue-300'
  }, {
    id: 2,
    title: '技能培训',
    date: '2024-01-25 09:00',
    type: 'training',
    icon: GraduationCap,
    color: 'bg-green-500',
    status: '即将开始',
    statusColor: 'bg-yellow-500/20 text-yellow-300'
  }]);

  // 培训课程数据
  const [trainingCourses] = useState([{
    id: 1,
    title: 'AI技术基础培训',
    description: '学习AI基础知识，了解行业应用',
    progress: 65,
    startDate: '2024-01-01',
    status: '进行中',
    statusColor: 'bg-green-500/20 text-green-300'
  }, {
    id: 2,
    title: '客户服务技巧',
    description: '提升客户服务质量，增强满意度',
    progress: 100,
    endDate: '2024-01-10',
    status: '已完成',
    statusColor: 'bg-blue-500/20 text-blue-300'
  }]);

  // 内部通知数据
  const [notifications] = useState([{
    id: 1,
    title: '重要通知：系统维护',
    content: '系统将于本周六凌晨2点进行维护，预计持续2小时',
    time: '2024-01-15 10:30',
    type: 'important',
    icon: Exclamation,
    color: 'bg-red-500',
    isNew: true
  }, {
    id: 2,
    title: '新功能上线',
    content: 'AI智能客服系统正式上线，欢迎体验',
    time: '2024-01-14 15:20',
    type: 'info',
    icon: Info,
    color: 'bg-blue-500',
    isNew: false
  }, {
    id: 3,
    title: '培训完成通知',
    content: '恭喜您完成AI技术基础培训',
    time: '2024-01-13 09:15',
    type: 'success',
    icon: Check,
    color: 'bg-green-500',
    isNew: false
  }]);

  // 核心价值观
  const [coreValues] = useState([{
    title: '创新驱动',
    description: '持续技术创新，引领行业发展',
    color: 'bg-blue-400'
  }, {
    title: '客户至上',
    description: '以客户需求为中心，提供优质服务',
    color: 'bg-green-400'
  }, {
    title: '团队协作',
    description: '共同成长，共创辉煌',
    color: 'bg-purple-400'
  }, {
    title: '诚信经营',
    description: '诚实守信，赢得客户信赖',
    color: 'bg-yellow-400'
  }]);

  // 文化标语
  const [cultureSlogans] = useState(['智能美发，美丽未来', '科技赋能，服务至上', '创新引领，品质保证']);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理活动详情
  const handleActivityDetail = activityId => {
    toast({
      title: "活动详情",
      description: "正在查看活动详情"
    });
  };

  // 处理继续学习
  const handleContinueLearning = courseId => {
    toast({
      title: "继续学习",
      description: "正在进入培训课程"
    });
  };

  // 处理查看证书
  const handleViewCertificate = courseId => {
    toast({
      title: "查看证书",
      description: "正在生成培训证书"
    });
  };

  // 渲染统计卡片
  const renderStatCard = stat => {
    const Icon = stat.icon;
    return <div key={stat.id} className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
        <div className="text-white/60">{stat.title}</div>
        <div className={`text-sm mt-2 ${stat.changeColor}`}>{stat.change}</div>
      </div>;
  };

  // 渲染文化活动卡片
  const renderCultureActivityCard = activity => {
    return <Card key={activity.id} className="culture-card bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
        <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-2">{activity.title}</h3>
          <p className="text-white/60 text-sm mb-3">{activity.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">{activity.date}</span>
            <Button variant="ghost" size="sm" onClick={() => handleActivityDetail(activity.id)} className="text-blue-400 hover:text-blue-300">
              查看详情
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染员工风采
  const renderEmployeeShowcase = employee => {
    return <div key={employee.id} className="text-center">
        <img src={employee.avatar} alt={employee.name} className="w-24 h-24 rounded-full mx-auto mb-3" />
        <h4 className="text-white font-medium">{employee.name}</h4>
        <p className="text-white/60 text-sm">{employee.position}</p>
      </div>;
  };

  // 渲染活动项
  const renderActivityItem = activity => {
    const Icon = activity.icon;
    return <div key={activity.id} className="activity-item bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${activity.color} rounded-full flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{activity.title}</h3>
              <p className="text-white/60 text-sm">{activity.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${activity.statusColor} px-2 py-1 rounded-full text-sm`}>
              {activity.status}
            </span>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>;
  };

  // 渲染培训课程卡片
  const renderTrainingCard = course => {
    return <Card key={course.id} className="training-card bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">{course.title}</h3>
            <span className={`${course.statusColor} px-2 py-1 rounded-full text-sm`}>
              {course.status}
            </span>
          </div>
          <p className="text-white/60 text-sm mb-4">{course.description}</p>
          <div className="mb-4">
            <div className="flex justify-between text-white/60 text-sm mb-1">
              <span>进度</span>
              <span>{course.progress}%</span>
            </div>
            <div className="bg-white/20 rounded-full h-2">
              <div className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-400' : 'bg-blue-400'}`} style={{
              width: `${course.progress}%`
            }}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">
              {course.progress === 100 ? `完成时间: ${course.endDate}` : `开始时间: ${course.startDate}`}
            </span>
            <Button variant="ghost" size="sm" onClick={() => course.progress === 100 ? handleViewCertificate(course.id) : handleContinueLearning(course.id)} className="text-blue-400 hover:text-blue-300">
              {course.progress === 100 ? '查看证书' : '继续学习'}
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染通知项
  const renderNotificationItem = notification => {
    const Icon = notification.icon;
    return <div key={notification.id} className="bg-white/10 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">{notification.title}</h3>
              <p className="text-white/60 text-sm mb-2">{notification.content}</p>
              <span className="text-white/40 text-xs">{notification.time}</span>
            </div>
          </div>
          {notification.isNew && <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>}
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">AI企业文化管理</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">系统正常</span>
            </div>
            <Button onClick={onSettings} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
          </div>
        </div>
      </header>

      {/* 文化统计概览 */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cultureStats.map(renderStatCard)}
      </section>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'culture' ? 'default' : 'ghost'} onClick={() => handleTabChange('culture')} className={`flex-1 ${activeTab === 'culture' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Heart className="w-4 h-4 mr-2" />
          文化展示
        </Button>
        <Button variant={activeTab === 'activities' ? 'default' : 'ghost'} onClick={() => handleTabChange('activities')} className={`flex-1 ${activeTab === 'activities' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CalendarCheck className="w-4 h-4 mr-2" />
          员工活动
        </Button>
        <Button variant={activeTab === 'training' ? 'default' : 'ghost'} onClick={() => handleTabChange('training')} className={`flex-1 ${activeTab === 'training' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <ChalkboardTeacher className="w-4 h-4 mr-2" />
          培训管理
        </Button>
        <Button variant={activeTab === 'notifications' ? 'default' : 'ghost'} onClick={() => handleTabChange('notifications')} className={`flex-1 ${activeTab === 'notifications' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Bullhorn className="w-4 h-4 mr-2" />
          内部通知
        </Button>
      </div>

      {/* 文化展示内容 */}
      {activeTab === 'culture' && <div className="space-y-8">
          {/* 企业文化介绍 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">企业文化理念</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">我们的使命</h3>
                  <p className="text-white/80 mb-6">
                    通过AI智能技术，为美发行业提供最专业的解决方案，帮助门店提升服务质量，实现数字化转型，让每一位客户都能享受到个性化的美发体验。
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">核心价值观</h3>
                  <div className="space-y-3">
                    {coreValues.map((value, index) => <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${value.color} rounded-full`}></div>
                        <span className="text-white/80">{value.title} - {value.description}</span>
                      </div>)}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">企业愿景</h3>
                  <p className="text-white/80 mb-6">
                    成为全球领先的美发行业AI解决方案提供商，推动整个行业的智能化升级，让美发变得更加简单、精准、个性化。
                  </p>
                  
                  <div className="bg-white/10 rounded-xl p-6">
                    <h4 className="text-white font-semibold mb-4">文化标语</h4>
                    <div className="space-y-2">
                      {cultureSlogans.map((slogan, index) => <p key={index} className="text-white/80 italic">
                          "{slogan}"
                        </p>)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 文化活动展示 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">文化活动展示</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cultureActivities.map(renderCultureActivityCard)}
              </div>
            </CardContent>
          </Card>

          {/* 员工风采 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">员工风采</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {employeeShowcase.map(renderEmployeeShowcase)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 员工活动内容 */}
      {activeTab === 'activities' && <div className="space-y-8">
          {/* 活动日历 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">活动日历</h2>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  新建活动
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['日', '一', '二', '三', '四', '五', '六'].map(day => <div key={day} className="text-center text-white/60 text-sm">
                    {day}
                  </div>)}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({
              length: 35
            }, (_, i) => <div key={i} className="bg-white/10 rounded-lg p-2 text-center hover:bg-white/20 cursor-pointer">
                    <div className="text-white/60 text-sm">{i + 1}</div>
                    {i === 14 && <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>}
                    {i === 20 && <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>}
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* 活动列表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">活动列表</h2>
              <div className="space-y-4">
                {activities.map(renderActivityItem)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 培训管理内容 */}
      {activeTab === 'training' && <div className="space-y-8">
          {/* 培训统计 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">156</div>
              <div className="text-white/60">总培训人次</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">92%</div>
              <div className="text-white/60">完成率</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">4.8</div>
              <div className="text-white/60">平均评分</div>
            </div>
          </div>

          {/* 培训课程 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">培训课程</h2>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  新建课程
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingCourses.map(renderTrainingCard)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 内部通知内容 */}
      {activeTab === 'notifications' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">内部通知</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                发布通知
              </Button>
            </div>
            
            <div className="space-y-4">
              {notifications.map(renderNotificationItem)}
            </div>
          </CardContent>
        </Card>}
    </div>;
};