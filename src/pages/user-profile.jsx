// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Phone, Mail, Calendar, MapPin, Shield, Settings, LogOut, Camera, Edit3, Save, X, Eye, EyeOff, Lock, Bell, Globe, HelpCircle, ChevronRight, Star, Award, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { LanguageSelector } from '@/components/LanguageSelector';
export default function UserProfile(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // 获取用户信息
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const parsed = JSON.parse(savedUserInfo);
      setUserInfo(parsed);
      setEditForm(parsed);
    }
  }, []);

  // 保存用户信息
  const saveUserInfo = async () => {
    setIsLoading(true);
    try {
      // 模拟保存请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('userInfo', JSON.stringify(editForm));
      setUserInfo(editForm);
      setIsEditing(false);
      toast({
        title: "保存成功",
        description: "个人信息已更新"
      });
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    toast({
      title: "退出成功",
      description: "您已安全退出登录"
    });
    $w.utils.navigateTo({
      pageId: 'login',
      params: {}
    });
  };

  // 处理头像上传
  const handleAvatarUpload = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "头像大小不能超过5MB",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        setEditForm(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 用户统计数据
  const userStats = {
    totalFormulas: 23,
    favoriteColors: 15,
    communityPosts: 8,
    loginDays: 45,
    achievementPoints: 1280,
    level: '高级用户'
  };
  if (!userInfo) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading', '加载中...')}</p>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('user.title', '个人中心')}</h1>
          <p className="text-gray-600">{t('user.subtitle', '管理您的个人信息和设置')}</p>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'profile',
            name: t('user.profile', '个人资料'),
            icon: User
          }, {
            id: 'stats',
            name: t('user.stats', '数据统计'),
            icon: TrendingUp
          }, {
            id: 'settings',
            name: t('user.settings', '账户设置'),
            icon: Settings
          }, {
            id: 'security',
            name: t('user.security', '安全设置'),
            icon: Shield
          }].map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>;
          })}
          </div>
        </div>

        {/* 个人资料 */}
        {activeTab === 'profile' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {t('user.profileInfo', '个人信息')}
                  </CardTitle>
                  <div className="flex space-x-2">
                    {isEditing ? <>
                        <Button variant="outline" size="sm" onClick={() => {
                    setEditForm(userInfo);
                    setIsEditing(false);
                  }}>
                          <X className="w-4 h-4 mr-1" />
                          {t('common.cancel', '取消')}
                        </Button>
                        <Button size="sm" onClick={saveUserInfo} disabled={isLoading}>
                          {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                          {t('common.save', '保存')}
                        </Button>
                      </> : <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit3 className="w-4 h-4 mr-1" />
                        {t('common.edit', '编辑')}
                      </Button>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 头像 */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                      {editForm.avatar ? <img src={editForm.avatar} alt="头像" className="w-full h-full object-cover" /> : <User className="w-full h-full text-gray-400 p-6" />}
                    </div>
                    {isEditing && <>
                        <button onClick={() => document.getElementById('avatar-upload').click()} className="absolute bottom-0 right-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700">
                          <Camera className="w-3 h-3" />
                        </button>
                        <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </>}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{editForm.nickname || t('user.defaultNickname', '用户')}</h3>
                    <p className="text-sm text-gray-600">{editForm.phone || editForm.email || t('user.noContact', '未设置联系方式')}</p>
                  </div>
                </div>

                {/* 基本信息 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.nickname', '昵称')}
                    </label>
                    <input type="text" value={editForm.nickname || ''} onChange={e => setEditForm(prev => ({
                  ...prev,
                  nickname: e.target.value
                }))} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.phone', '手机号')}
                    </label>
                    <input type="tel" value={editForm.phone || ''} onChange={e => setEditForm(prev => ({
                  ...prev,
                  phone: e.target.value
                }))} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.email', '邮箱')}
                    </label>
                    <input type="email" value={editForm.email || ''} onChange={e => setEditForm(prev => ({
                  ...prev,
                  email: e.target.value
                }))} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.location', '地区')}
                    </label>
                    <input type="text" value={editForm.location || ''} onChange={e => setEditForm(prev => ({
                  ...prev,
                  location: e.target.value
                }))} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" />
                  </div>
                </div>

                {/* 个人简介 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('user.bio', '个人简介')}
                  </label>
                  <textarea value={editForm.bio || ''} onChange={e => setEditForm(prev => ({
                ...prev,
                bio: e.target.value
              }))} disabled={!isEditing} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50" placeholder={t('user.bioPlaceholder', '介绍一下自己...')} />
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 数据统计 */}
        {activeTab === 'stats' && <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.totalFormulas}</div>
                  <div className="text-sm text-gray-600">{t('user.totalFormulas', '创建配方')}</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.favoriteColors}</div>
                  <div className="text-sm text-gray-600">{t('user.favoriteColors', '收藏颜色')}</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.communityPosts}</div>
                  <div className="text-sm text-gray-600">{t('user.communityPosts', '社区帖子')}</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.achievementPoints}</div>
                  <div className="text-sm text-gray-600">{t('user.achievementPoints', '成就积分')}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {t('user.activityStats', '活跃度统计')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('user.loginDays', '连续登录天数')}</span>
                    <span className="font-medium">{userStats.loginDays} {t('common.days', '天')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('user.userLevel', '用户等级')}</span>
                    <span className="font-medium text-purple-600">{userStats.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('user.joinDate', '注册时间')}</span>
                    <span className="font-medium">{new Date(userInfo.registerTime || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 账户设置 */}
        {activeTab === 'settings' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  {t('user.accountSettings', '账户设置')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{t('user.language', '语言设置')}</p>
                      <p className="text-sm text-gray-600">{t('user.languageDesc', '选择应用显示语言')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LanguageSelector variant="dropdown" size="sm" />
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{t('user.notifications', '通知设置')}</p>
                      <p className="text-sm text-gray-600">{t('user.notificationsDesc', '管理推送通知偏好')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{t('user.help', '帮助中心')}</p>
                      <p className="text-sm text-gray-600">{t('user.helpDesc', '获取使用帮助和支持')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 安全设置 */}
        {activeTab === 'security' && <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  {t('user.securitySettings', '安全设置')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => setShowPasswordModal(true)}>
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{t('user.changePassword', '修改密码')}</p>
                      <p className="text-sm text-gray-600">{t('user.changePasswordDesc', '定期更换密码保护账户安全')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{t('user.phoneBinding', '手机绑定')}</p>
                      <p className="text-sm text-gray-600">{userInfo.phone ? t('user.bound', '已绑定') : t('user.unbound', '未绑定')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{t('user.emailBinding', '邮箱绑定')}</p>
                      <p className="text-sm text-gray-600">{userInfo.email ? t('user.bound', '已绑定') : t('user.unbound', '未绑定')}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <LogOut className="w-5 h-5 mr-2" />
                  {t('user.dangerZone', '危险操作')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('user.logout', '退出登录')}
                </Button>
              </CardContent>
            </Card>
          </div>}

        {/* 修改密码弹窗 */}
        {showPasswordModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{t('user.changePassword', '修改密码')}</h2>
                  <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.currentPassword', '当前密码')}
                    </label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.newPassword', '新密码')}
                    </label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('user.confirmNewPassword', '确认新密码')}
                    </label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" className="flex-1" onClick={() => setShowPasswordModal(false)}>
                    {t('common.cancel', '取消')}
                  </Button>
                  <Button className="flex-1">
                    {t('user.confirmChange', '确认修改')}
                  </Button>
                </div>
              </div>
            </div>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="user" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}