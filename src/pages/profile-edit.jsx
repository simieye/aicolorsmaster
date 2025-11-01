// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Camera, Mail, Phone, MapPin, Calendar, Save, X, CheckCircle, AlertCircle } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

// @ts-ignore;

export default function ProfileEditPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const currentUser = $w?.auth?.currentUser;
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    avatar: currentUser?.avatarUrl || '',
    nickName: currentUser?.nickName || '',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    gender: currentUser?.gender || '',
    birthday: currentUser?.birthday || '',
    address: currentUser?.address || '',
    bio: currentUser?.bio || ''
  });
  const [previewAvatar, setPreviewAvatar] = useState(formData.avatar);
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "请选择小于5MB的图片文件",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 这里可以调用API保存用户信息
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "保存成功",
        description: "个人资料已更新"
      });
    } catch (error) {
      toast({
        title: "保存失败",
        description: error.message || "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleNavigation = (pageId, params = {}) => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId,
        params
      });
    }
  };
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="编辑资料" showBack={true} />
        
        <div className="pb-20">
          <div className="max-w-2xl mx-auto p-4 space-y-6">
            {/* 头像编辑 */}
            <Card>
              <CardHeader>
                <CardTitle>头像</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                      {previewAvatar ? <img src={previewAvatar} alt="头像预览" className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-muted-foreground" />}
                    </div>
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0" onClick={() => fileInputRef.current?.click()}>
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">
                      点击相机图标更换头像，支持JPG、PNG格式，文件大小不超过5MB
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {
                    setPreviewAvatar('');
                    setFormData(prev => ({
                      ...prev,
                      avatar: ''
                    }));
                  }}>
                      移除头像
                    </Button>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </CardContent>
            </Card>

            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    昵称
                  </label>
                  <input type="text" value={formData.nickName} onChange={e => handleInputChange('nickName', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入昵称" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    真实姓名
                  </label>
                  <input type="text" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入真实姓名" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    性别
                  </label>
                  <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="">请选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    生日
                  </label>
                  <input type="date" value={formData.birthday} onChange={e => handleInputChange('birthday', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
              </CardContent>
            </Card>

            {/* 联系方式 */}
            <Card>
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    邮箱
                  </label>
                  <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入邮箱地址" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    手机号
                  </label>
                  <input type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入手机号" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    地址
                  </label>
                  <textarea value={formData.address} onChange={e => handleInputChange('address', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={3} placeholder="请输入详细地址" />
                </div>
              </CardContent>
            </Card>

            {/* 个人简介 */}
            <Card>
              <CardHeader>
                <CardTitle>个人简介</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea value={formData.bio} onChange={e => handleInputChange('bio', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={4} placeholder="介绍一下自己..." maxLength={200} />
                <div className="text-right text-sm text-muted-foreground mt-1">
                  {formData.bio.length}/200
                </div>
              </CardContent>
            </Card>

            {/* 保存按钮 */}
            <div className="flex space-x-4">
              <Button onClick={handleSave} disabled={isLoading} className="flex-1">
                {isLoading ? '保存中...' : '保存'}
                <Save className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => handleNavigation('user')} className="flex-1">
                取消
                <X className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}