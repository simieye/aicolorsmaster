// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { X, ShoppingCart, Plus, Minus, Trash2, Tag } from 'lucide-react';

// @ts-ignore;
import { useCart } from './ShoppingCart';
export const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getOriginalPrice,
    getSavings,
    getTotalItems
  } = useCart();
  const handleCheckout = () => {
    // 跳转到结算页面
    setIsCartOpen(false);
    // 这里应该调用导航到结算页面的方法
    console.log('跳转到结算页面');
  };
  if (!isCartOpen) return null;
  return <>
      {/* 遮罩层 */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsCartOpen(false)}></div>
      
      {/* 购物车侧边栏 */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">购物车</h2>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {getTotalItems()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {cartItems.length > 0 && <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-500 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>}
            <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 购物车内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">购物车是空的</p>
              <Button onClick={() => setIsCartOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white">
                去购物
              </Button>
            </div> : <div className="space-y-4">
              {cartItems.map(item => <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      {/* 商品图片 */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* 商品信息 */}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                        
                        {/* 价格 */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-red-500 font-bold">¥{item.price.toLocaleString()}</span>
                          {item.originalPrice && item.originalPrice > item.price && <>
                              <span className="text-gray-400 line-through text-sm">
                                ¥{item.originalPrice.toLocaleString()}
                              </span>
                              <span className="bg-red-100 text-red-600 text-xs px-1 rounded">
                                {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                              </span>
                            </>}
                        </div>
                        
                        {/* 数量控制 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-8 h-8 p-0">
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="w-8 h-8 p-0">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}
        </div>

        {/* 底部结算 */}
        {cartItems.length > 0 && <div className="border-t border-gray-200 p-4 space-y-3">
            {/* 优惠信息 */}
            {getSavings() > 0 && <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-green-600">
                  <Tag className="w-4 h-4 mr-1" />
                  <span>已优惠</span>
                </div>
                <span className="text-green-600 font-medium">-¥{getSavings().toLocaleString()}</span>
              </div>}
            
            {/* 价格汇总 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>商品总价</span>
                <span>¥{getOriginalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>运费</span>
                <span className="text-green-600">免运费</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>合计</span>
                <span className="text-red-500">¥{getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
            
            {/* 结算按钮 */}
            <Button onClick={handleCheckout} className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
              去结算 ({getTotalItems()}件)
            </Button>
          </div>}
      </div>
    </>;
};