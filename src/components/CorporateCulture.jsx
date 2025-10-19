// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Bell, CalendarPlus, Heart, CalendarAlt, GraduationCap, Bullhorn, Lightbulb, Users, Award, Eye, Flag, Clock, MapPin, User, Robot, HandSparkles, TrendingUp, Exclamation, CalendarCheck, Plus, PaperPlane, Search, Filter } from 'lucide-react';

export const CorporateCulture = ({
  onBack,
  onPublishNotification,
  onCreateActivity
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('culture');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [notificationPriority, setNotificationPriority] = useState('normal');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');

  // 企业价值观数据
  const [cultureValues] = useState([{
    id: 1,
    title: '创新',
    description: '持续创新，引领行业发展',
    icon: Lightbulb,
    color: 'bg-blue-500'
  }, {
    id: 2,
    title: '团队',
    description: '团结协作，共同成长',
    icon: Users,
    color: 'bg-green-500'
  }, {
    id: 3,
    title: '品质',
    description: '追求卓越，品质第一',
    icon: Award,
    color: 'bg-purple-500'
  }, {
    id: 4,
    title: '服务',
    description: '客户至上，用心服务',
    icon: Heart,
    color: 'bg-orange-500'
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
    title: '技术分享会',
    description: '分享最新技术，促进知识交流',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    date: '2024-01-10'
  }, {
    id: 3,
    title: '年度庆典',
    description: '庆祝成就，展望未来',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    date: '2023-12-31'
  }]);

  // 员工活动数据
  const [employeeActivities] = useState([{
    id: 1,
    title: '团队建设活动',
    description: '增强团队凝聚力，提升协作效率',
    date: '1月15日',
    time: '14:00-17:00',
    location: '会议室A',
    participants: 45,
    status: '即将开始',
    statusColor: 'bg-green-500/20 text-green-300',
    icon: Users,
    iconColor: 'bg-blue-500'
  }, {
    id: 2,
    title: '技术分享会',
    description: '分享最新技术，促进知识交流',
    date: '1月22日',
    time: '10:00-12:00',
    location: '培训室',
    participants: 28,
    status: '报名中',
    statusColor: 'bg-blue-500/20 text-blue-300',
    icon: Robot,
    iconColor: 'bg-green-500'
  }]);

  // 培训课程数据
  const [trainingCourses] = useState([{
    id: 1,
    title: 'AI技术应用培训',
    description: '学习AI在美发行业的应用技术',
    type: '技术培训',
    typeColor: 'bg-blue-500/20 text-blue-300',
    status: '进行中',
    statusColor: 'bg-green-500/20 text-green-300',
    instructor: '张老师',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face',
    icon: Robot,
    gradient: 'from-blue-500 to-purple-500'
  }, {
    id: 2,
    title: '客户服务技巧',
    description: '提升客户服务质量的专业技能',
    type: '服务培训',
    typeColor: 'bg-green-500/20 text-green-300',
    status: '即将开始',
    statusColor: 'bg-yellow-500/20 text-yellow-300',
    instructor: '李老师',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face',
    icon: HandSparkles,
    gradient: 'from-green-500 to-teal-500'
  }, {
    id: 3,
    title: '门店运营管理',
    description: '学习高效的门店运营管理方法',
    type: '管理培训',
    typeColor: 'bg-purple-500/20 text-purple-300',
    status: '已完成',
    statusColor: 'bg-blue-500/20 text-blue-300',
    instructor: '王老师',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=24&h=24&fit=crop&crop=face',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500'
  }]);

  // 通知数据
  const [notifications] = useState([{
    id: 1,
    title: '系统维护通知',
    content: '系统将于今晚22:00-24:00进行维护升级，期间服务可能暂时无法使用，请提前做好准备。',
    type: '公告通知',
    typeColor: 'bg-blue-500/20 text-blue-300',
    priority: '紧急',
    priorityColor: 'bg-red-500/20 text-red-300',
    author: '管理员',
    date: '2024-01-15',
    readCount: 156,
    icon: Exclamation,
    iconColor: 'bg-red-500'
  }, {
    id: 2,
    title: '春节放假安排',
    content: '根据国家法定假期安排，结合公司实际情况，现将春节放假安排通知如下：2月9日至2月17日放假，共9天。',
    type: '活动通知',
    typeColor: 'bg-green-500/20 text-green-300',
    priority: '重要',
    priorityColor: 'bg-yellow-500/20 text-yellow-300',
    author: '人事部',
    date: '2024-01-10',
    readCount: 234,
    icon: CalendarCheck,
    iconColor: 'bg-green-500'
  }]);

  // 学习进度数据
  const [learningProgress] = useState([{
    title: 'AI技术应用培训',
    progress: 65
  }, {
    title: '客户服务技巧',
    progress: 30
  }]);

  // 学习统计数据
  const [learningStats] = useState({
    completedCourses: 12,
    studyHours: 48,
    certificates: 8,
    averageScore: 4.8
  });

  // 活动统计数据
  const [activityStats] = useState({
    monthlyActivities: 8,
    participants: 156,
    satisfaction: 4.8
  });

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理活动详情
  const handleActivityDetail = activityId => {
    toast({
      title: "活动详情",
      description: `查看活动 ${activityId} 的详细信息`
    });
  };

  // 处理课程学习
  const handleCourseLearning = (courseId, action) => {
    toast({
      title: "课程操作",
      description: `${action}课程 ${courseId}`
    });
  };

  // 处理通知标记已读
  const handleMarkAsRead = notificationId => {
    toast({
      title: "标记已读",
      description: `通知 ${notificationId} 已标记为已读`
    });
  };

  // 处理通知发布
  const handleNotificationPublish = e => {
    e.preventDefault();
    if (!notificationType || !notificationTitle || !notificationContent) {
      toast({
        title: "请完善信息",
        description: "请填写所有必填项",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "通知发布成功",
      description: "通知已成功发布给指定员工"
    });

    // 重置表单
    setNotificationType('');
    setNotificationPriority('normal');
    setNotificationTitle('');
    setNotificationContent('');
  };

  // 渲染企业价值观卡片
  const renderCultureValueCard = value => {
    const Icon = value.icon;
    return <div key={value.id} className="culture-value culture-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white font-semibold mb-2">{value.title}</h3>
        <p className="text-white/60 text-sm">{value.description}</p>
      </div>;
  };

  // 渲染文化活动卡片
  const renderCultureActivityCard = activity => {
    return <Card key={activity.id} className="culture-card bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
        <div className="relative">
          <img src={activity.image} alt={activity.title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-2">{activity.title}</h3>
          <p className="text-white/60 text-sm mb-4">{activity.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">{activity.date}</span>
            <Button variant="ghost" size="sm" onClick={() => handleActivityDetail(activity.id)} className="text-blue-400 hover:text-blue-300">
              查看详情
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染员工活动项
  const renderEmployeeActivityItem = activity => {
    const Icon = activity.icon;
    return <div key={activity.id} className="activity-item bg-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 ${activity.iconColor} rounded-full flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{activity.title}</h3>
              <p className="text-white/60 text-sm mb-2">{activity.description}</p>
              <div className="flex items-center space-x-4 text-white/40 text-xs">
                <span>
                  <CalendarAlt className="w-3 h-3 inline mr-1" />
                  {activity.date}
                </span>
                <span>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {activity.time}
                </span>
                <span>
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {activity.location}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`${activity.statusColor} px-2 py-1 rounded-full text-xs`}>
              {activity.status}
            </span>
            <div className="text-white/60 text-sm mt-2">{activity.participants}人参与</div>
          </div>
        </div>
      </div>;
  };

  // 渲染培训课程卡片
  const renderTrainingCourseCard = course => {
    const Icon = course.icon;
    return <Card key={course.id} className="training-card bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
        <div className={`h-32 bg-gradient-to-r ${course.gradient} flex items-center justify-center`}>
          <Icon className="w-16 h-16 text-white" />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className={course.typeColor}>{course.type}</span>
            <span className={course.statusColor}>{course.status}</span>
          </div>
          <h3 className="text-white font-semibold mb-2">{course.title}</h3>
          <p className="text-white/60 text-sm mb-4">{course.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full" />
              <span className="text-white/40 text-xs">{course.instructor}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleCourseLearning(course.id, course.status === '已完成' ? '查看回放' : course.status === '即将开始' ? '立即报名' : '立即学习')} className="text-blue-400 hover:text-blue-300">
              {course.status === '已完成' ? '查看回放' : course.status === '即将开始' ? '立即报名' : '立即学习'}
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染通知项
  const renderNotificationItem = notification => {
    const Icon = notification.icon;
    return <div key={notification.id} className="notification-item bg-white/10 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`w-10 h-10 ${notification.iconColor} rounded-full flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={notification.priorityColor}>{notification.priority}</span>
                <span className={notification.typeColor}>{notification.type}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{notification.title}</h3>
              <p className="text-white/60 text-sm mb-2">{notification.content}</p>
              <div className="flex items-center space-x-4 text-white/40 text-xs">
                <span>
                  <User className="w-3 h-3 inline mr-1" />
                  {notification.author}
                </span>
                <span>
                  <CalendarAlt className="w-3 h-3 inline mr-1" />
                  {notification.date}
                </span>
                <span>
                  <Eye className="w-3 h-3 inline mr-1" />
                  {notification.readCount}人已读
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)} className="text-blue-400 hover:text-blue-300">
            标记已读
          </Button>
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
            <Button onClick={onPublishNotification} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Bell className="w-4 h-4 mr-2" />
              发布通知
            </Button>
            <Button onClick={onCreateActivity} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <CalendarPlus className="w-4 h-4 mr-2" />
              创建活动
            </Button>
          </div>
        </div>
      </header>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'culture' ? 'default' : 'ghost'} onClick={() => handleTabChange('culture')} className={`flex-1 ${activeTab === 'culture' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Heart className="w-4 h-4 mr-2" />
          企业文化
        </Button>
        <Button variant={activeTab === 'activities' ? 'default' : 'ghost'} onClick={() => handleTabChange('activities')} className={`flex-1 ${activeTab === 'activities' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CalendarAlt className="w-4 h-4 mr-2" />
          员工活动
        </Button>
        <Button variant={activeTab === 'training' ? 'default' : 'ghost'} onClick={() => handleTabChange('training')} className={`flex-1 ${activeTab === 'training' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <GraduationCap className="w-4 h-4 mr-2" />
          培训系统
        </Button>
        <Button variant={activeTab === 'notifications' ? 'default' : 'ghost'} onClick={() => handleTabChange('notifications')} className={`flex-1 ${activeTab === 'notifications' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Bullhorn className="w-4 h-4 mr-2" />
          内部通知
        </Button>
      </div>

      {/* 企业文化内容 */}
      {activeTab === 'culture' && <div className="space-y-8">
          {/* 企业价值观 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">企业价值观</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cultureValues.map(renderCultureValueCard)}
              </div>
            </CardContent>
          </Card>

          {/* 企业愿景使命 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">愿景与使命</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">企业愿景</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    成为全球领先的AI美发智能解决方案提供商，通过科技创新推动美发行业的数字化转型，让每一位美发从业者都能享受到AI技术带来的便利和效率提升。
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Flag className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">企业使命</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    通过AI技术赋能美发行业，提供智能化、个性化的解决方案，帮助美发企业提升服务质量、降低运营成本、增强竞争力，创造更大的商业价值。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 文化活动展示 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">文化活动展示</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cultureActivities.map(renderCultureActivityCard)}
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
                <Button onClick={onCreateActivity} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  创建活动
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white/10 rounded-xl p-6">
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {['日', '一', '二', '三', '四', '五', '六'].map(day => <div key={day} className="text-white/60 text-sm">{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({
                    length: 35
                  }, (_, i) => <div key={i} className="bg-white/5 rounded-lg p-2 text-center hover:bg-white/10 cursor-pointer">
                          <div className="text-white/60 text-sm">{i - 2 > 0 && i - 2 <= 31 ? i - 2 : ''}</div>
                          {i === 15 && <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>}
                          {i === 22 && <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>}
                        </div>)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-3">即将举行</h3>
                    <div className="space-y-3">
                      {employeeActivities.slice(0, 2).map(activity => <div key={activity.id} className="activity-item bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-white/10">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <div className="flex-1">
                              <div className="text-white text-sm">{activity.title}</div>
                              <div className="text-white/40 text-xs">{activity.date} {activity.time.split('-')[0]}</div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-3">活动统计</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">本月活动</span>
                        <span className="text-white text-sm">{activityStats.monthlyActivities}场</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">参与人数</span>
                        <span className="text-white text-sm">{activityStats.participants}人</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">满意度</span>
                        <span className="text-white text-sm">{activityStats.satisfaction}分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 活动列表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">活动列表</h2>
              <div className="space-y-4">
                {employeeActivities.map(renderEmployeeActivityItem)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 培训系统内容 */}
      {activeTab === 'training' && <div className="space-y-8">
          {/* 培训课程 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">培训课程</h2>
                <div className="flex items-center space-x-4">
                  <select value={selectedCourseType} onChange={e => setSelectedCourseType(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="">全部课程</option>
                    <option value="tech">技术培训</option>
                    <option value="service">服务培训</option>
                    <option value="management">管理培训</option>
                  </select>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    创建课程
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingCourses.map(renderTrainingCourseCard)}
              </div>
            </CardContent>
          </Card>

          {/* 学习进度 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">我的学习进度</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">当前学习</h3>
                  <div className="space-y-4">
                    {learningProgress.map((course, index) => <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm">{course.title}</span>
                          <span className="text-white/60 text-sm">{course.progress}%</span>
                        </div>
                        <div className="bg-white/20 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full transition-all duration-500" style={{
                      width: `${course.progress}%`
                    }}></div>
                        </div>
                      </div>)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">学习统计</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{learningStats.completedCourses}</div>
                      <div className="text-white/60 text-sm">已完成课程</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{learningStats.studyHours}h</div>
                      <div className="text-white/60 text-sm">学习时长</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{learningStats.certificates}</div>
                      <div className="text-white/60 text-sm">获得证书</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{learningStats.averageScore}</div>
                      <div className="text-white/60 text-sm">平均评分</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 内部通知内容 */}
      {activeTab === 'notifications' && <div className="space-y-8">
          {/* 通知发布 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">发布通知</h2>
                <Button onClick={onPublishNotification} className="bg-blue-500 hover:bg-blue-600 text-white">
                  <PaperPlane className="w-4 h-4 mr-2" />
                  立即发布
                </Button>
              </div>
              
              <form onSubmit={handleNotificationPublish} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm mb-2 block">通知类型</label>
                    <select value={notificationType} onChange={e => setNotificationType(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                      <option value="">请选择通知类型</option>
                      <option value="announcement">公告通知</option>
                      <option value="policy">政策更新</option>
                      <option value="activity">活动通知</option>
                      <option value="holiday">假期安排</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm mb-2 block">优先级</label>
                    <select value={notificationPriority} onChange={e => setNotificationPriority(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                      <option value="normal">普通</option>
                      <option value="important">重要</option>
                      <option value="urgent">紧急</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">通知标题</label>
                  <input type="text" value={notificationTitle} onChange={e => setNotificationTitle(e.target.value)} placeholder="请输入通知标题" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">通知内容</label>
                  <textarea value={notificationContent} onChange={e => setNotificationContent(e.target.value)} placeholder="请输入通知内容..." rows={6} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">接收对象</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['全体员工', '技术部', '美发部', '管理部'].map(dept => <label key={dept} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-white text-sm">{dept}</span>
                      </label>)}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* 通知列表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">通知列表</h2>
              <div className="space-y-4">
                {notifications.map(renderNotificationItem)}
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
};