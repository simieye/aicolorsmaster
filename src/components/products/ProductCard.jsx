// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';

// @ts-ignore;
import { ButtonLoading } from '@/components/LoadingStates';
export function ProductCard({
  product,
  viewMode = 'grid',
  favorites,
  isAddingToCart,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
  onCompare
}) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };
  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };
  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };
  const handleCompare = () => {
    if (onCompare) {
      onCompare(product);
    }
  };
  if (viewMode === 'list') {
    return <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* 产品图片 */}
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />

            {/* 产品信息 */}
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">¥{product.price}</span>
                  {product.originalPrice > product.price && <span className="text-sm text-muted-foreground line-through">
                      ¥{product.originalPrice}
                    </span>}
                </div>

                <div className={`flex items-center gap-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">
                    {product.inStock ? '有库存' : '缺货'}
                  </span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={handleAddToCart} disabled={!product.inStock || isAddingToCart[product.id]}>
                {isAddingToCart[product.id] ? <ButtonLoading text="添加中..." /> : <>
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    加入购物车
                  </>}
              </Button>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={handleToggleFavorite} className="flex-1">
                  <Heart className={`w-3 h-3 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleQuickView} className="flex-1">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>;
  }
  return <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {/* 产品图片 */}
        <div className="relative mb-3">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
          
          {/* 产品标签 */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                新品
              </span>}
            {product.isBestseller && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                热销
              </span>}
            {product.discount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </span>}
          </div>

          {/* 操作按钮 */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={handleToggleFavorite} className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
              <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleQuickView} className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 产品信息 */}
        <div className="space-y-2">
          <div>
            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          </div>

          {/* 评分 */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* 价格 */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">¥{product.price}</span>
            {product.originalPrice > product.price && <span className="text-xs text-muted-foreground line-through">
                ¥{product.originalPrice}
              </span>}
          </div>

          {/* 库存状态 */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs">
              {product.inStock ? '有库存' : '缺货'}
            </span>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock || isAddingToCart[product.id]}>
              {isAddingToCart[product.id] ? <ButtonLoading text="添加中..." /> : <>
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  加入购物车
                </>}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCompare}>
              对比
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
}