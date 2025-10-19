// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Plus, Bell, CalendarAlt, Users, Scissors, Search, Phone, Mail, History, Clock, Palette, Fire, Spa, Robot, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const AIBookingSystem = ({
  onBack,
  onNewAppointment,
  onReminderSettings
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [searchTerm, setSearchTerm] = useState('');

  // 今日预约数据
  const [todayAppointments] = useState([{
    id: 1,
    customerName: '张女士',
    time: '10:00',
    services: '染发 + 护理'
  }, {
    id: 2,
    customerName: '李先生',
    time: '14:00',
    services: '剪发 + 造型'
  }, {
    id: 3,
    customerName: '王女士',
    time: '16:00',
    services: '烫发 + 染发'
  }]);

  // 预约统计数据
  const [appointmentStats] = useState({
    today: 8,
    week: 45,
    month: 186,
    completionRate: 95
  });

  // AI推荐时间段
  const [aiRecommendations] = useState([{
    time: '明天 10:00',
    reason: '空闲率高',
    reasonColor: 'text-green-400'
  }, {
    time: '明天 15:00',
    reason: '客户偏好',
    reasonColor: 'text-green-400'
  }]);

  // 时间段数据
  const [timeSlots] = useState([{
    time: '09:00',
    status: 'available',
    statusText: '可预约'
  }, {
    time: '10:00',
    status: 'available',
    statusText: '可预约'
  }, {
    time: '11:00',
    status: 'selected',
    statusText: '已选择'
  }, {
    time: '14:00',
    status: 'booked',
    statusText: '已预约'
  }, {
    time: '15:00',
    status: 'available',
    statusText: '可预约'
  }, {
    time: '16:00',
    status: 'available',
    statusText: '可预约'
  }]);

  // 客户数据
  const [customers] = useState([{
    id: 1,
    name: '张女士',
    type: 'VIP客户',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c1ca?w=60&h=60&fit=crop&crop=face',
    phone: '138****5678',
    email: 'zhang@email.com',
    lastVisit: '3天前',
    totalVisits: 28,
    preferences: '染发、护理'
  }, {
    id: 2,
    name: '李先生',
    type: '普通客户',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    phone: '139****1234',
    email: 'li@email.com',
    lastVisit: '1周前',
    totalVisits: 15,
    preferences: '剪发、造型'
  }, {
    id: 3,
    name: '王女士',
    type: '新客户',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    phone: '137****9876',
    email: 'wang@email.com',
    lastVisit: '2周前',
    totalVisits: 3,
    preferences: '烫发、染发'
  }]);

  // 服务分类数据
  const [serviceCategories] = useState([{
    title: '剪发服务',
    icon: Scissors,
    iconColor: 'bg-blue-500',
    count: 15
  }, {
    title: '染发服务',
    icon: Palette,
    iconColor: 'bg-green-500',
    count: 12
  }, {
    title: '烫发服务',
    icon: Fire,
    iconColor: 'bg-purple-500',
    count: 8
  }, {
    title: '护理服务',
    icon: Spa,
    iconColor: 'bg-orange-500',
    count: 10
  }]);

  // 服务项目数据
  const [services] = useState([{
    id: 1,
    title: '精剪造型',
    description: '专业剪发，个性化造型设计',
    price: 88,
    duration: '45分钟',
    icon: Scissors,
    gradient: 'from-blue-500 to-purple-500'
  }, {
    id: 2,
    title: '全头染发',
    description: '进口染发剂，色彩持久亮丽',
    price: 288,
    duration: '120分钟',
    icon: Palette,
    gradient: 'from-green-500 to-teal-500'
  }, {
    id: 3,
    title: '数码烫发',
    description: '最新烫发技术，效果自然持久',
    price: 388,
    duration: '150分钟',
    icon: Fire,
    gradient: 'from-purple-500 to-pink-500'
  }]);

  // 今日提醒数据
  const [todayReminders] = useState([{
    id: 1,
    title: '张女士 - 预约提醒',
    time: '10:00',
    content: '明天10:00染发预约，请准时到店',
    type: 'appointment',
    badgeColor: 'bg-green-400'
  }, {
    id: 2,
    title: '李先生 - 生日提醒',
    time: '全天',
    content: '客户生日，可发送祝福和优惠',
    type: 'birthday',
    badgeColor: 'bg-yellow-400'
  }, {
    id: 3,
    title: '王女士 - 护理提醒',
    time: '14:00',
    content: '距离上次护理已过3周，建议预约',
    type: 'care',
    badgeColor: 'bg-blue-400'
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理日期选择
  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  // 处理时间选择
  const handleTimeSelect = time => {
    setSelectedTime(time);
  };

  // 处理客户搜索
  const handleCustomerSearch = term => {
    setSearchTerm(term);
  };

  // 处理客户详情
  const handleCustomerDetail = customerId => {
    toast({
      title: "客户详情",
      description: `查看客户 ${customerId} 的详细信息`
    });
  };

  // 处理服务预订
  const handleServiceBooking = serviceId => {
    toast({
      title: "服务预订",
      description: `预订服务 ${serviceId}`
    });
  };

  // 处理提醒操作
  const handleReminderAction = (reminderId, action) => {
    toast({
      title: "提醒操作",
      description: `${action}提醒 ${reminderId}`
    });
  };

  // 渲染日历日期
  const renderCalendarDay = day => {
    const hasAppointment = [15, 18, 22].includes(day);
    const isSelected = day === selectedDate;
    return <div key={day} onClick={() => handleDateSelect(day)} className={`calendar-day bg-white/5 rounded-lg p-3 text-center cursor-pointer hover:bg-white/15 transition-all duration-300 ${isSelected ? 'selected' : ''} ${hasAppointment ? 'has-appointment' : ''}`}>
        <div className="text-white text-sm">{day > 0 && day <= 31 ? day : ''}</div>
      </div>;
  };

  // 渲染时间段
  const renderTimeSlot = slot => {
    const isSelected = slot.time === selectedTime;
    return <div key={slot.time} onClick={() => slot.status !== 'booked' && handleTimeSelect(slot.time)} className={`time-slot bg-white/10 rounded-lg p-3 cursor-pointer transition-all duration-300 ${slot.status === 'booked' ? 'disabled opacity-50 cursor-not-allowed' : 'hover:bg-white/15'} ${isSelected ? 'selected' : ''}`}>
        <div className="text-white text-sm font-medium">{slot.time}</div>
        <div className="text-white/60 text-xs">{slot.statusText}</div>
      </div>;
  };

  // 渲染客户卡片
  const renderCustomerCard = customer => {
    return <Card key={customer.id} className="customer-card bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <img src={customer.avatar} alt={customer.name} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-white font-semibold">{customer.name}</h3>
              <p className="text-white/60 text-sm">{customer.type}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-white/60">
              <Phone className="w-4 h-4 mr-2" />
              {customer.phone}
            </div>
            <div className="flex items-center text-white/60">
              <Mail className="w-4 h-4 mr-2" />
              {customer.email}
            </div>
            <div className="flex items-center text-white/60">
              <History className="w-4 h-4 mr-2" />
              最近预约：{customer.lastVisit}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs">总预约次数</span>
              <span className="text-white text-xs">{customer.totalVisits}次</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/60 text-xs">偏好服务</span>
              <span className="text-white text-xs">{customer.preferences}</span>
            </div>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染服务分类
  const renderServiceCategory = category => {
    const Icon = category.icon;
    return <Card key={category.title} className="bg-white/10 backdrop-blur-md border-white/20 text-center">
        <CardContent className="p-6">
          <div className={`w-16 h-16 ${category.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-white font-semibold mb-2">{category.title}</h3>
          <p className="text-white/60 text-sm">{category.count}个项目</p>
        </CardContent>
      </Card>;
  };

  // 渲染服务项目
  const renderServiceItem = service => {
    const Icon = service.icon;
    return <Card key={service.id} className="service-item bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
        <div className={`h-32 bg-gradient-to-r ${service.gradient} flex items-center justify-center`}>
          <Icon className="w-16 h-16 text-white" />
        </div>
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-2">{service.title}</h3>
          <p className="text-white/60 text-sm mb-4">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-white text-lg font-bold">¥{service.price}</span>
            <span className="text-white/60 text-sm">{service.duration}</span>
          </div>
        </CardContent>
      </Card>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">AI客户预约系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onNewAppointment} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Plus className="w-4 h-4 mr-2" />
              新建预约
            </Button>
            <Button onClick={onReminderSettings} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Bell className="w-4 h-4 mr-2" />
              提醒设置
            </Button>
          </div>
        </div>
      </header>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'calendar' ? 'default' : 'ghost'} onClick={() => handleTabChange('calendar')} className={`flex-1 ${activeTab === 'calendar' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CalendarAlt className="w-4 h-4 mr-2" />
          预约日历
        </Button>
        <Button variant={activeTab === 'customers' ? 'default' : 'ghost'} onClick={() => handleTabChange('customers')} className={`flex-1 ${activeTab === 'customers' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Users className="w-4 h-4 mr-2" />
          客户管理
        </Button>
        <Button variant={activeTab === 'services' ? 'default' : 'ghost'} onClick={() => handleTabChange('services')} className={`flex-1 ${activeTab === 'services' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Scissors className="w-4 h-4 mr-2" />
          服务项目
        </Button>
        <Button variant={activeTab === 'reminders' ? 'default' : 'ghost'} onClick={() => handleTabChange('reminders')} className={`flex-1 ${activeTab === 'reminders' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Bell className="w-4 h-4 mr-2" />
          提醒管理
        </Button>
      </div>

      {/* 预约日历内容 */}
      {activeTab === 'calendar' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 日历视图 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">2024年1月</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {['日', '一', '二', '三', '四', '五', '六'].map(day => <div key={day} className="text-white/60 text-sm">{day}</div>)}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({
                length: 35
              }, (_, i) => renderCalendarDay(i - 2))}
                </div>
              </CardContent>
            </Card>
            
            {/* 时间段选择 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">选择时间段</h3>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(renderTimeSlot)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 今日预约 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">今日预约</h3>
                <div className="space-y-3">
                  {todayAppointments.map(appointment => <div key={appointment.id} className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{appointment.customerName}</span>
                        <span className="text-white/60 text-xs">{appointment.time}</span>
                      </div>
                      <div className="text-white/60 text-xs">{appointment.services}</div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            {/* 预约统计 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">预约统计</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">今日预约</span>
                    <span className="text-white text-sm">{appointmentStats.today}个</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">本周预约</span>
                    <span className="text-white text-sm">{appointmentStats.week}个</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">本月预约</span>
                    <span className="text-white text-sm">{appointmentStats.month}个</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">完成率</span>
                    <span className="text-white text-sm">{appointmentStats.completionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* AI智能推荐 */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">AI智能推荐</h3>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Robot className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm font-medium">最佳时间段</span>
                  </div>
                  <p className="text-white/60 text-xs mb-3">基于历史数据分析，推荐以下时间段：</p>
                  <div className="space-y-2">
                    {aiRecommendations.map((rec, index) => <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                        <span className="text-white text-xs">{rec.time}</span>
                        <span className={rec.reasonColor + ' text-xs'}>{rec.reason}</span>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>}

      {/* 客户管理内容 */}
      {activeTab === 'customers' && <div className="space-y-8">
          {/* 客户搜索 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <input type="text" value={searchTerm} onChange={e => handleCustomerSearch(e.target.value)} placeholder="搜索客户姓名、电话..." className="w-full bg-white/10 border border-white/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
                  <Plus className="w-4 h-4 mr-2" />
                  添加客户
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 客户列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customers.map(renderCustomerCard)}
          </div>
        </div>}

      {/* 服务项目内容 */}
      {activeTab === 'services' && <div className="space-y-8">
          {/* 服务分类 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {serviceCategories.map(renderServiceCategory)}
          </div>

          {/* 服务列表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">服务项目</h2>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                  <Plus className="w-4 h-4 mr-2" />
                  添加服务
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(renderServiceItem)}
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 提醒管理内容 */}
      {activeTab === 'reminders' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">提醒设置</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-white text-sm mb-2 block">预约提醒时间</label>
                  <select className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="1">提前1小时</option>
                    <option value="2">提前2小时</option>
                    <option value="24">提前1天</option>
                    <option value="48">提前2天</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">提醒方式</label>
                  <div className="space-y-2">
                    {['短信提醒', '微信提醒', '电话提醒'].map(method => <label key={method} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={method === '短信提醒' || method === '微信提醒'} className="rounded" />
                        <span className="text-white text-sm">{method}</span>
                      </label>)}
                  </div>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">提醒模板</label>
                  <textarea placeholder="输入提醒内容模板..." rows={4} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
                  保存设置
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">今日提醒</h2>
              <div className="space-y-4">
                {todayReminders.map(reminder => <div key={reminder.id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`reminder-badge w-2 h-2 ${reminder.badgeColor} rounded-full`}></div>
                        <span className="text-white text-sm font-medium">{reminder.title}</span>
                      </div>
                      <span className="text-white/60 text-xs">{reminder.time}</span>
                    </div>
                    <p className="text-white/60 text-xs">{reminder.content}</p>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
};