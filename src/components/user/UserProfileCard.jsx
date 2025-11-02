// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, Shield, Award } from 'lucide-react';

// @ts-ignore;
import { ButtonLoading, InlineLoading } from '@/components/LoadingStates';
export function UserProfileCard({
  userInfo,
  isUploadingAvatar,
  onUploadAvatar,
  onEdit
}) {
  if (!userInfo) {
    return <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* 头像 */}
          <div className="relative">
            <img src={userInfo.avatar} alt={userInfo.name} className="w-24 h-24 rounded-full object-cover border-4 border-primary/20" />
            <Button size="sm" className="absolute bottom-0 right-0 w-8 h-8 p-0 rounded-full" onClick={onUploadAvatar} disabled={isUploadingAvatar}>
              {isUploadingAvatar ? <ButtonLoading /> : <Camera className="w-4 h-4" />}
            </Button>
          </div>

          {/* 基本信息 */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">{userInfo.name}</h2>
            {userInfo.nickName && <p className="text-muted-foreground">@{userInfo.nickName}</p>}
            <div className="flex items-center justify-center gap-2 mt-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-600">
                {userInfo.memberLevel === 'gold' ? '黄金会员' : userInfo.memberLevel === 'silver' ? '白银会员' : '普通会员'}
              </span>
            </div>
          </div>

          {/* 详细信息 */}
          <div className="w-full space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{userInfo.email}</span>
              {userInfo.verification?.email && <Shield className="w-4 h-4 text-green-500" />}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{userInfo.phone}</span>
              {userInfo.verification?.phone && <Shield className="w-4 h-4 text-green-500" />}
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{userInfo.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>注册于 {new Date(userInfo.memberSince).toLocaleDateString()}</span>
            </div>
          </div>

          {/* 操作按钮 */}
          <Button onClick={onEdit} className="w-full">
            <Edit className="w-4 h-4 mr-2" />
            编辑资料
          </Button>
        </div>
      </CardContent>
    </Card>;
}