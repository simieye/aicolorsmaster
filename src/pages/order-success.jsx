// @ts-ignore;
import React, { useEffect, useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Home, Package, ArrowLeft, Clock, MapPin, CreditCard } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function OrderSuccessPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    page
  } = props;
  const {
    toast
  } = useToast();
  const [orderNumber, setOrderNumber] = useState('');
  const [countdown, setCountdown] = useState(10);

  // 从URL参数获取订单号
  useEffect(() => {
    const orderId = page?.dataset?.params?.orderNumber;
    if (orderId) {
      setOrderNumber(orderId);
    } else {
      // 生成默认订单号
      setOrderNumber(`ORD${Date.now()}`);
    }
  }, [page?.dataset?.params?.orderNumber]);

  // 倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 处理返回首页
  const handleGoHome = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'home',
        params: {}
      });
    }
  };

  // 处理查看订单
  const handleViewOrder = () => {
    if ($w.utils && $w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'orders',
        params: {}
      });
    } else {
      toast({
        title: "订单管理",
        description: "正在跳转到订单管理页面..."
      });
    }
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
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleGoHome} className="text-white/80 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-white">订单成功</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 成功提示 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">订单提交成功！</h2>
              <p className="text-white/80 mb-6">感谢您的购买，我们会尽快为您处理订单</p>
              
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-white/60 text-sm mb-2">订单号</p>
                <p className="text-white font-mono text-lg">{orderNumber}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-4">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-white text-sm">预计送达</p>
                  <p className="text-white font-medium">3-5个工作日</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <Package className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-white text-sm">配送方式</p>
                  <p className="text-white font-medium">快递配送</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <CreditCard className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-white text-sm">支付方式</p>
                  <p className="text-white font-medium">在线支付</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 订单详情 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white">订单详情</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <span className="text-white/60">订单状态</span>
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">待发货</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <span className="text-white/60">下单时间</span>
                <span className="text-white">{new Date().toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <span className="text-white/60">收货地址</span>
                <span className="text-white text-right max-w-[200px]">北京市朝阳区xxx街道xxx号</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/60">联系电话</span>
                <span className="text-white">138****8888</span>
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={handleViewOrder} variant="outline" className="border-white/20 text-white hover:bg-white/20">
              查看订单详情
            </Button>
            <Button onClick={handleContinueShopping} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              继续购物
            </Button>
          </div>

          {/* 自动跳转提示 */}
          {countdown > 0 && <div className="text-center mt-6">
              <p className="text-white/60 text-sm">
                {countdown}秒后自动返回首页
              </p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{
              width: `${countdown / 10 * 100}%`
            }}></div>
              </div>
            </div>}
        </div>
      </main>

      {/* 底部导航 */}
      <TabBar currentPage="order-success" />
    </div>;
}