// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Input } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Tag, CreditCard, Package } from 'lucide-react';

// @ts-ignore;
import { useCart } from '@/components/ShoppingCart';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function ShoppingCartPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // 购物车功能
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getOriginalPrice,
    getSavings,
    getTotalItems
  } = useCart();

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'products',
        params: {}
      });
    }
  };

  // 处理结算
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "购物车为空",
        description: "请先添加商品到购物车",
        variant: "destructive"
      });
      return;
    }
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'checkout',
        params: {}
      });
    } else {
      toast({
        title: "跳转结算",
        description: "正在跳转到结算页面..."
      });
    }
  };

  // 处理应用优惠码
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast({
        title: "请输入优惠码",
        description: "优惠码不能为空",
        variant: "destructive"
      });
      return;
    }
    setIsApplyingPromo(true);
    // 模拟优惠码验证
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SAVE10') {
        toast({
          title: "优惠码应用成功",
          description: "已享受9折优惠"
        });
      } else {
        toast({
          title: "优惠码无效",
          description: "请检查优惠码是否正确",
          variant: "destructive"
        });
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  // 处理继续购物
  const handleContinueShopping = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'products',
        params: {}
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-white/80 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-white">购物车</h1>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {getTotalItems()}件商品
              </span>
            </div>
            {cartItems.length > 0 && <Button variant="ghost" size="sm" onClick={clearCart} className="text-white/80 hover:text-red-400">
                清空
              </Button>}
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 pb-32">
        {cartItems.length === 0 ? <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-white/60 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">购物车是空的</h2>
            <p className="text-white/60 mb-8">快去挑选心仪的AI美发产品吧！</p>
            <Button onClick={handleContinueShopping} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8">
              去购物
            </Button>
          </div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 购物车商品列表 */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => <Card key={item.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      {/* 商品图片 */}
                      <div className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* 商品信息 */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white text-lg mb-1">{item.name}</h3>
                            <p className="text-white/60 text-sm">{item.category}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* 价格和数量控制 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center bg-white/10 rounded-lg border border-white/20">
                              <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="text-white/80 hover:text-white px-3 py-2">
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-white px-3 min-w-[40px] text-center font-medium">{item.quantity}</span>
                              <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="text-white/80 hover:text-white px-3 py-2">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-white/60 text-sm">
                              库存: {item.stock > 10 ? '充足' : `仅剩 ${item.stock} 件`}
                            </span>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-red-400 font-bold text-lg">¥{(item.price * item.quantity).toLocaleString()}</div>
                            {item.originalPrice && item.originalPrice > item.price && <div className="text-white/60 line-through text-sm">
                                ¥{(item.originalPrice * item.quantity).toLocaleString()}
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* 订单汇总 */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    订单汇总
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 优惠码 */}
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm">优惠码</label>
                    <div className="flex space-x-2">
                      <Input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="输入优惠码" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                      <Button onClick={handleApplyPromo} disabled={isApplyingPromo} variant="outline" className="border-white/20 text-white hover:bg-white/20">
                        {isApplyingPromo ? '应用中...' : '应用'}
                      </Button>
                    </div>
                  </div>

                  {/* 价格明细 */}
                  <div className="space-y-2 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">商品总价</span>
                      <span className="text-white">¥{getOriginalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">运费</span>
                      <span className="text-green-400">免运费</span>
                    </div>
                    {getSavings() > 0 && <div className="flex justify-between text-sm">
                        <div className="flex items-center text-green-400">
                          <Tag className="w-4 h-4 mr-1" />
                          <span>优惠</span>
                        </div>
                        <span className="text-green-400">-¥{getSavings().toLocaleString()}</span>
                      </div>}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
                      <span className="text-white">合计</span>
                      <span className="text-red-400">¥{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 结算按钮 */}
                  <Button onClick={handleCheckout} className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3">
                    <CreditCard className="w-4 h-4 mr-2" />
                    去结算 ({getTotalItems()}件)
                  </Button>

                  {/* 继续购物 */}
                  <Button variant="ghost" onClick={handleContinueShopping} className="w-full text-white/80 hover:text-white">
                    继续购物
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>}
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="shopping-cart" />
    </div>;
}