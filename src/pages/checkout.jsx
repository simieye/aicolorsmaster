// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, CreditCard, Truck, Shield, User, MapPin, Phone, Mail, Check } from 'lucide-react';

// @ts-ignore;
import { useCart } from '@/components/ShoppingCart';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function CheckoutPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // 表单数据
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [orderNotes, setOrderNotes] = useState('');

  // 购物车功能
  const {
    cartItems,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  // 处理返回
  const handleBack = () => {
    if ($w.utils && $w.utils.navigateBack) {
      $w.utils.navigateBack();
    } else if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'shopping-cart',
        params: {}
      });
    }
  };

  // 验证表单
  const validateForm = () => {
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      toast({
        title: "信息不完整",
        description: "请填写完整的收货信息",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  // 处理下一步
  const handleNextStep = () => {
    if (currentStep === 1 && !validateForm()) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // 处理上一步
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // 处理提交订单
  const handleSubmitOrder = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      // 模拟订单处理
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 生成订单号
      const orderNumber = `ORD${Date.now()}`;
      toast({
        title: "订单提交成功",
        description: `订单号：${orderNumber}`,
        variant: "default"
      });

      // 清空购物车
      clearCart();

      // 跳转到订单成功页面
      if ($w.utils && $w.utils.navigateTo) {
        $w.utils.navigateTo({
          pageId: 'order-success',
          params: {
            orderNumber
          }
        });
      }
    } catch (error) {
      console.error('订单提交失败:', error);
      toast({
        title: "订单提交失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // 省份列表
  const provinces = ['北京', '上海', '广东', '江苏', '浙江', '四川', '湖北', '湖南', '河南', '山东'];
  if (cartItems.length === 0) {
    return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-semibold mb-4">购物车为空</h2>
          <Button onClick={handleBack} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
            返回购物车
          </Button>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-white/80 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-white">结算</h1>
            </div>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map(step => <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'}`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>)}
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：表单内容 */}
          <div className="lg:col-span-2">
            {/* 步骤1：收货信息 */}
            {currentStep === 1 && <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    收货信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">收货人姓名 *</label>
                      <Input value={shippingInfo.name} onChange={e => setShippingInfo({
                    ...shippingInfo,
                    name: e.target.value
                  })} placeholder="请输入收货人姓名" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">手机号码 *</label>
                      <Input value={shippingInfo.phone} onChange={e => setShippingInfo({
                    ...shippingInfo,
                    phone: e.target.value
                  })} placeholder="请输入手机号码" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">邮箱地址</label>
                    <Input value={shippingInfo.email} onChange={e => setShippingInfo({
                  ...shippingInfo,
                  email: e.target.value
                })} placeholder="请输入邮箱地址" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">省份 *</label>
                      <Select value={shippingInfo.province} onValueChange={value => setShippingInfo({
                    ...shippingInfo,
                    province: value
                  })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="选择省份" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map(province => <SelectItem key={province} value={province} className="text-gray-800">
                              {province}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">城市</label>
                      <Input value={shippingInfo.city} onChange={e => setShippingInfo({
                    ...shippingInfo,
                    city: e.target.value
                  })} placeholder="请输入城市" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">邮政编码</label>
                      <Input value={shippingInfo.postalCode} onChange={e => setShippingInfo({
                    ...shippingInfo,
                    postalCode: e.target.value
                  })} placeholder="请输入邮政编码" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block">详细地址 *</label>
                    <Input value={shippingInfo.address} onChange={e => setShippingInfo({
                  ...shippingInfo,
                  address: e.target.value
                })} placeholder="请输入详细地址" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block">订单备注</label>
                    <Input value={orderNotes} onChange={e => setOrderNotes(e.target.value)} placeholder="选填，请输入您的特殊要求" className="bg-white/10 border-white/20 text-white placeholder-white/60" />
                  </div>
                </CardContent>
              </Card>}

            {/* 步骤2：支付方式 */}
            {currentStep === 2 && <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    支付方式
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'alipay' ? 'bg-blue-500/20 border-blue-400' : 'bg-white/10 border-white/20'}`} onClick={() => setPaymentMethod('alipay')}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">支</span>
                          </div>
                          <span className="text-white">支付宝</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'alipay' ? 'bg-blue-500 border-blue-500' : 'border-white/60'}`}>
                          {paymentMethod === 'alipay' && <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <Check className="w-3 h-3 text-blue-500" />
                            </div>}
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'wechat' ? 'bg-green-500/20 border-green-400' : 'bg-white/10 border-white/20'}`} onClick={() => setPaymentMethod('wechat')}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">微</span>
                          </div>
                          <span className="text-white">微信支付</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'wechat' ? 'bg-green-500 border-green-500' : 'border-white/60'}`}>
                          {paymentMethod === 'wechat' && <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <Check className="w-3 h-3 text-green-500" />
                            </div>}
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'bg-purple-500/20 border-purple-400' : 'bg-white/10 border-white/20'}`} onClick={() => setPaymentMethod('card')}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-8 h-8 text-purple-400" />
                          <span className="text-white">银行卡支付</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'card' ? 'bg-purple-500 border-purple-500' : 'border-white/60'}`}>
                          {paymentMethod === 'card' && <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <Check className="w-3 h-3 text-purple-500" />
                            </div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">安全保障</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-white/80 text-sm">
                        <Shield className="w-4 h-4 mr-2 text-green-400" />
                        <span>SSL加密传输</span>
                      </div>
                      <div className="flex items-center text-white/80 text-sm">
                        <Shield className="w-4 h-4 mr-2 text-green-400" />
                        <span>支付信息加密存储</span>
                      </div>
                      <div className="flex items-center text-white/80 text-sm">
                        <Shield className="w-4 h-4 mr-2 text-green-400" />
                        <span>7×24小时交易监控</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {/* 步骤3：订单确认 */}
            {currentStep === 3 && <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">订单确认</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 收货信息确认 */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">收货信息</h4>
                    <div className="space-y-2 text-white/80">
                      <p><span className="text-white/60">收货人：</span>{shippingInfo.name}</p>
                      <p><span className="text-white/60">电话：</span>{shippingInfo.phone}</p>
                      <p><span className="text-white/60">地址：</span>{shippingInfo.province} {shippingInfo.city} {shippingInfo.address}</p>
                    </div>
                  </div>

                  {/* 支付方式确认 */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">支付方式</h4>
                    <p className="text-white/80">
                      {paymentMethod === 'alipay' && '支付宝'}
                      {paymentMethod === 'wechat' && '微信支付'}
                      {paymentMethod === 'card' && '银行卡支付'}
                    </p>
                  </div>

                  {/* 商品列表 */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">商品清单</h4>
                    <div className="space-y-3">
                      {cartItems.map(item => <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <p className="text-white text-sm">{item.name}</p>
                              <p className="text-white/60 text-xs">数量: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-white font-medium">¥{(item.price * item.quantity).toLocaleString()}</span>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {/* 操作按钮 */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1} className="border-white/20 text-white hover:bg-white/20">
                上一步
              </Button>
              {currentStep < 3 ? <Button onClick={handleNextStep} className="bg-blue-500 hover:bg-blue-600 text-white">
                  下一步
                </Button> : <Button onClick={handleSubmitOrder} disabled={isProcessing} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                  {isProcessing ? <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      处理中...
                    </> : '提交订单'}
                </Button>}
            </div>
          </div>

          {/* 右侧：订单汇总 */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">订单汇总</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 商品统计 */}
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">商品数量</span>
                  <span className="text-white">{getTotalItems()}件</span>
                </div>

                {/* 价格明细 */}
                <div className="space-y-2 pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">商品总价</span>
                    <span className="text-white">¥{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">运费</span>
                    <span className="text-green-400">免运费</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20">
                    <span className="text-white">应付金额</span>
                    <span className="text-red-400">¥{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                {/* 配送信息 */}
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center text-white/80 text-sm">
                    <Truck className="w-4 h-4 mr-2 text-blue-400" />
                    <span>预计3-5个工作日送达</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="checkout" />
    </div>;
}