// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';

// @ts-ignore;
import { ProductListLoading } from '@/components/LoadingStates';
export function FavoritesList({
  favorites,
  onViewProduct,
  onAddToCart
}) {
  if (!favorites) {
    return <ProductListLoading count={4} />;
  }
  if (favorites.length === 0) {
    return <Card>
        <CardContent className="p-6 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">暂无收藏商品</p>
        </CardContent>
      </Card>;
  }
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {favorites.map(product => <Card key={product.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 space-y-2">
                <h4 className="font-medium line-clamp-1">{product.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <p className="font-medium text-primary">¥{product.price}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={() => onViewProduct(product)} className="flex-1">
                <Eye className="w-3 h-3 mr-1" />
                查看
              </Button>
              <Button size="sm" onClick={() => onAddToCart(product)} className="flex-1">
                <ShoppingCart className="w-3 h-3 mr-1" />
                加入购物车
              </Button>
            </div>
          </CardContent>
        </Card>)}
    </div>;
}