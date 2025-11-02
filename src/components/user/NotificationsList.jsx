// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Bell, Package, Star, Heart, Gift, AlertCircle, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { ListItemLoading } from '@/components/LoadingStates';
export function NotificationsList({
  notifications
}) {
  const getNotificationIcon = type => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'favorite':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'promotion':
        return <Gift className="w-4 h-4 text-purple-500" />;
      case 'system':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };
  if (!notifications) {
    return <ListItemLoading count={5} />;
  }
  if (notifications.length === 0) {
    return <Card>
        <CardContent className="p-6 text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">暂无通知</p>
        </CardContent>
      </Card>;
  }
  return <div className="space-y-3">
      {notifications.map(notification => <Card key={notification.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {notification.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
              {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>}
            </div>
          </CardContent>
        </Card>)}
    </div>;
}