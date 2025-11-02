// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, Heart } from 'lucide-react';

// @ts-ignore;
import { InlineLoading } from '@/components/LoadingStates';
export function ProductStats({
  filteredCount,
  cartCount,
  favoritesCount,
  isFromCache,
  isFiltering
}) {
  return <div className="mb-6 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        共找到 {filteredCount} 个产品
        {isFiltering && <InlineLoading text="筛选中..." className="ml-2" />}
        {isFromCache && <span className="ml-2 text-green-600">📦 来自缓存</span>}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Package className="w-4 h-4" />
        <span>购物车: {cartCount}</span>
        <Heart className="w-4 h-4 ml-2" />
        <span>收藏: {favoritesCount}</span>
      </div>
    </div>;
}