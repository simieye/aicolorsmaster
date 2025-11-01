// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ChevronRight } from 'lucide-react';

// @ts-ignore;

export function MenuList({
  items,
  title
}) {
  return <div className="space-y-2">
      {items.map((item, index) => <div key={index} onClick={item.onClick} className="flex items-center justify-between p-4 bg-card border rounded-lg cursor-pointer hover:bg-accent">
          <div className="flex items-center space-x-3">
            <div className="text-primary">
              {item.icon}
            </div>
            <div>
              <div className="font-medium text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {item.badge && <div className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                {item.badge}
              </div>}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>)}
    </div>;
}