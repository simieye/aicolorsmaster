// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { HoverCard } from '@/components/HoverEffects';
// @ts-ignore;

export function QuickActions({
  items
}) {
  // 添加安全检查，确保 items 是数组
  if (!items || !Array.isArray(items)) {
    return <div className="text-center text-muted-foreground p-4">
        暂无快捷功能
      </div>;
  }
  return <div className="grid grid-cols-2 gap-4">
      {items.slice(0, 4).map((item, index) => {
      // 确保每个 item 都有必要的属性
      if (!item || !item.onClick) {
        return null;
      }
      return <HoverCard key={index} onClick={item.onClick} className="flex items-center space-x-3 p-4 bg-card border rounded-lg cursor-pointer hover:bg-accent">
            <div className="text-primary">
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{item.label || '未命名'}</div>
              <div className="text-xs text-muted-foreground">{item.description || ''}</div>
            </div>
            {item.badge && <div className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                {item.badge}
              </div>}
          </HoverCard>;
    })}
    </div>;
}