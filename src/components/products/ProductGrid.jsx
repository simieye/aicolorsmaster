// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Package } from 'lucide-react';

// @ts-ignore;
import { ProductCard } from './ProductCard';
// @ts-ignore;
import { ButtonLoading } from '@/components/LoadingStates';
export function ProductGrid({
  products,
  viewMode,
  favorites,
  isAddingToCart,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
  onCompare,
  hasMore,
  onLoadMore,
  loading
}) {
  if (products.length === 0) {
    return <div className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">未找到产品</h3>
        <p className="text-muted-foreground mb-4">
          尝试调整搜索关键词或筛选条件
        </p>
      </div>;
  }
  return <>
      {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {products.map(product => <ProductCard key={product.id} product={product} viewMode={viewMode} favorites={favorites} isAddingToCart={isAddingToCart} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} onQuickView={onQuickView} onCompare={onCompare} />)}
        </div> : <div className="space-y-4 mb-6">
          {products.map(product => <ProductCard key={product.id} product={product} viewMode={viewMode} favorites={favorites} isAddingToCart={isAddingToCart} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} onQuickView={onQuickView} onCompare={onCompare} />)}
        </div>}

      {/* 加载更多 */}
      {hasMore && <div className="text-center">
          <Button variant="outline" onClick={onLoadMore} disabled={loading}>
            {loading ? <ButtonLoading text="加载中..." /> : '加载更多'}
          </Button>
        </div>}
    </>;
}