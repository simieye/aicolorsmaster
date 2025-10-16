// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Heart, Eye, Star, Zap } from 'lucide-react';

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  viewMode = 'grid'
}) {
  return <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
      {/* 产品图片 */}
      <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-48'} bg-gray-100`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        {/* 热销标签 */}
        {product.isHot && <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            热销
          </div>}
        
        {/* 折扣标签 */}
        {product.discount && <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            -{product.discount}%
          </div>}
        
        {/* 悬停操作 */}
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button size="sm" variant="secondary" onClick={() => onAddToWishlist(product)}>
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* 产品信息 */}
      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
          <div className={viewMode === 'list' ? 'flex-1' : ''}>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            
            {/* 产品特性 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.features.slice(0, 2).map((feature, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">
                  {feature}
                </span>)}
            </div>
            
            {/* 评分和销量 */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span>{product.rating}</span>
                <span className="text-gray-400 ml-1">({product.reviews})</span>
              </div>
              <span>已售 {product.sales}</span>
            </div>
          </div>
          
          {/* 价格和操作 */}
          <div className={`${viewMode === 'list' ? 'ml-4 text-right' : ''}`}>
            <div className="mb-2">
              {product.originalPrice && <span className="text-sm text-gray-400 line-through mr-2">
                  ¥{product.originalPrice}
                </span>}
              <span className="text-xl font-bold text-red-600">¥{product.price}</span>
            </div>
            <Button onClick={() => onAddToCart(product)} className="w-full" size={viewMode === 'list' ? 'sm' : 'default'}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              加入购物车
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
}