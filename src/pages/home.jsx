// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Palette, Sparkles, TrendingUp, Users, Star, ArrowRight, Mic, Camera, Image as ImageIcon, Zap, Shield } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();
  const [showAIChat, setShowAIChat] = useState(false);

  // AI对话入口组件
  const AIChatEntry = () => <div className="fixed bottom-24 right-4 z-40">
      <button onClick={() => setShowAIChat(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
        <MessageCircle className="w-6 h-6" />
      </button>
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        AI
      </div>
    </div>;

  // AI对话弹窗
  const AIChatModal = () => {
    if (!showAIChat) return null;
    return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">AI色彩助手</h3>
                <p className="text-xs text-gray-500">智能色彩对话 • 个性化推荐</p>
              </div>
            </div>
            <button onClick={() => setShowAIChat(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              ×
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">AI智能色彩对话</h4>
              <p className="text-sm text-gray-600 mb-6">
                支持语音、图片、拍照等多模态交互方式
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                  <Mic className="w-4 h-4" />
                  <span className="text-sm">语音咨询</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">拍照分析</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm">图片识别</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm">色彩推荐</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="输入您的问题..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      {/* Hero区域 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">AI染发色彩大师</h1>
            <p className="text-xl mb-8 text-purple-100">
              智能色彩识别 • 专业配方生成 • 虚拟染发模拟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => $w.utils.navigateTo({
              pageId: 'color-recognition',
              params: {}
            })} className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold">
                <Palette className="w-5 h-5 mr-2" />
                开始识别
              </Button>
              <Button onClick={() => setShowAIChat(true)} className="bg-purple-700 text-white hover:bg-purple-800 px-8 py-3 rounded-lg font-semibold">
                <MessageCircle className="w-5 h-5 mr-2" />
                AI对话
              </Button>
            </div>
          </div>
        </div>
        
        {/* 装饰性元素 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* 功能特色 */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">核心功能</h2>
          <p className="text-gray-600">AI驱动的专业染发解决方案</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">智能色彩识别</h3>
              <p className="text-sm text-gray-600">AI精准识别发色，提供专业分析</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">配方智能生成</h3>
              <p className="text-sm text-gray-600">根据发质和目标色生成最佳配方</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">虚拟染发模拟</h3>
              <p className="text-sm text-gray-600">预览染发效果，避免试错成本</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">色彩趋势分析</h3>
              <p className="text-sm text-gray-600">掌握最新流行色彩趋势</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10万+</div>
              <div className="text-gray-600">活跃用户</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">色彩配方</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">识别准确率</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">AI服务</div>
            </div>
          </div>
        </div>
      </div>

      {/* 用户评价 */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">用户评价</h2>
          <p className="text-gray-600">听听用户怎么说</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">美发师小李</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "AI色彩识别功能太强大了，准确率很高，大大提高了我的工作效率！"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">顾客小王</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "虚拟染发模拟功能让我能提前看到效果，再也不怕染出不满意的颜色了！"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">沙龙老板</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "配方生成功能很专业，节省了很多调色时间，顾客满意度也提升了！"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI对话入口 */}
      <AIChatEntry />
      <AIChatModal />

      {/* 底部导航 */}
      <TabBar currentPage="home" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}