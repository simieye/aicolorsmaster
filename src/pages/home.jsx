// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Palette, Beaker, Users, Camera, Mic, Search, Sparkles, TrendingUp, Star, MessageSquare, ChevronRight, Zap, Heart, Eye, ArrowRight } from 'lucide-react';

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

  // 状态管理
  const [isLoading, setIsLoading] = useState(false);
  const [trendingColors, setTrendingColors] = useState([]);
  const [recommendedFormulas, setRecommendedFormulas] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);

  // 模拟数据加载
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrendingColors([{
          id: 1,
          name: '玫瑰金',
          code: '#B76E79',
          trend: '+15%',
          image: 'https://picsum.photos/seed/rosegold/200/200'
        }, {
          id: 2,
          name: '雾霾蓝',
          code: '#778899',
          trend: '+12%',
          image: 'https://picsum.photos/seed/mistyblue/200/200'
        }, {
          id: 3,
          name: '奶茶棕',
          code: '#C8A882',
          trend: '+8%',
          image: 'https://picsum.photos/seed/milktea/200/200'
        }, {
          id: 4,
          name: '薄荷绿',
          code: '#98FB98',
          trend: '+6%',
          image: 'https://picsum.photos/seed/mintgreen/200/200'
        }]);
        setRecommendedFormulas([{
          id: 1,
          name: '自然渐变配方',
          difficulty: '简单',
          rating: 4.8,
          uses: 1234
        }, {
          id: 2,
          name: '时尚挑染配方',
          difficulty: '中等',
          rating: 4.6,
          uses: 892
        }, {
          id: 3,
          name: '复古铜色配方',
          difficulty: '困难',
          rating: 4.9,
          uses: 567
        }]);
        setCommunityPosts([{
          id: 1,
          title: '春季流行色分享',
          author: '色彩达人',
          likes: 234,
          comments: 45
        }, {
          id: 2,
          title: '新手染发技巧',
          author: '美发师小李',
          likes: 189,
          comments: 32
        }, {
          id: 3,
          title: '色彩搭配心得',
          author: '创意造型师',
          likes: 156,
          comments: 28
        }]);
      } catch (error) {
        toast({
          title: "加载失败",
          description: "请检查网络连接",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [toast]);

  // 快捷操作处理
  const handleQuickAction = action => {
    switch (action) {
      case 'ai-chat':
        $w.utils.navigateTo({
          pageId: 'ai-chat',
          params: {}
        });
        break;
      case 'camera':
        $w.utils.navigateTo({
          pageId: 'color-recognition',
          params: {
            mode: 'camera'
          }
        });
        break;
      case 'voice':
        toast({
          title: "语音助手",
          description: "语音功能开发中..."
        });
        break;
      case 'search':
        toast({
          title: "智能搜索",
          description: "搜索功能开发中..."
        });
        break;
      default:
        break;
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 头部欢迎区域 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('home.title', 'AI染发色彩大师')}
          </h1>
          <p className="text-gray-600">
            {t('home.subtitle', '智能色彩识别，专业配方生成')}
          </p>
        </div>

        {/* AI对话入口 */}
        <Card className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  AI智能色彩对话
                </h2>
                <p className="text-purple-100 mb-4">
                  个性化色彩推荐，专业染发建议
                </p>
                <Button onClick={() => handleQuickAction('ai-chat')} className="bg-white text-purple-600 hover:bg-purple-50">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  开始对话
                </Button>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷操作 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button onClick={() => handleQuickAction('camera')} variant="outline" className="h-20 flex flex-col space-y-2">
            <Camera className="w-6 h-6" />
            <span className="text-sm">拍照识色</span>
          </Button>
          <Button onClick={() => handleQuickAction('voice')} variant="outline" className="h-20 flex flex-col space-y-2">
            <Mic className="w-6 h-6" />
            <span className="text-sm">语音助手</span>
          </Button>
          <Button onClick={() => handleQuickAction('search')} variant="outline" className="h-20 flex flex-col space-y-2">
            <Search className="w-6 h-6" />
            <span className="text-sm">智能搜索</span>
          </Button>
          <Button onClick={() => $w.utils.navigateTo({
          pageId: 'formula-generation',
          params: {}
        })} variant="outline" className="h-20 flex flex-col space-y-2">
            <Beaker className="w-6 h-6" />
            <span className="text-sm">配方生成</span>
          </Button>
        </div>

        {/* 流行色彩 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                {t('home.trendingColors', '流行色彩')}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
              pageId: 'color-library',
              params: {}
            })}>
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingColors.map(color => <div key={color.id} className="text-center">
                  <div className="relative mb-2">
                    <img src={color.image} alt={color.name} className="w-full h-24 object-cover rounded-lg" />
                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                      {color.trend}
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">{color.name}</h3>
                  <p className="text-xs text-gray-500">{color.code}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 推荐配方 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                {t('home.recommendedFormulas', '推荐配方')}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
              pageId: 'formula-management',
              params: {}
            })}>
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedFormulas.map(formula => <div key={formula.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">{formula.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>难度: {formula.difficulty}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {formula.rating}
                      </div>
                      <span>{formula.uses} 次使用</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 社区动态 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {t('home.communityPosts', '社区动态')}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
              pageId: 'community',
              params: {}
            })}>
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityPosts.map(post => <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{post.author}</span>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="home" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}