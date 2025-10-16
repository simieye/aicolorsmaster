// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Users, MessageSquare, Heart, Star, TrendingUp, Search, Filter, Plus, Camera, Image as ImageIcon, Calendar, Eye, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function Community(props) {
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
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // 分类选项
  const categories = [{
    value: 'all',
    label: '全部'
  }, {
    value: 'trending',
    label: '热门'
  }, {
    value: 'tutorial',
    label: '教程'
  }, {
    value: 'showcase',
    label: '作品展示'
  }, {
    value: 'question',
    label: '问答'
  }, {
    value: 'discussion',
    label: '讨论'
  }];

  // 模拟数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟帖子数据
        setPosts([{
          id: 1,
          title: '春季玫瑰金染发教程分享',
          author: {
            name: '色彩达人小美',
            avatar: 'https://picsum.photos/seed/user1/50/50',
            level: '高级造型师'
          },
          content: '今天给大家分享一款超美的春季玫瑰金染发教程，这个颜色特别适合白皙皮肤...',
          images: ['https://picsum.photos/seed/post1/300/200', 'https://picsum.photos/seed/post2/300/200'],
          tags: ['玫瑰金', '春季', '教程'],
          stats: {
            likes: 234,
            comments: 45,
            views: 1234,
            shares: 23
          },
          createdAt: '2小时前',
          isLiked: false,
          isBookmarked: false
        }, {
          id: 2,
          title: '新手必看：家庭染发注意事项',
          author: {
            name: '美发师小李',
            avatar: 'https://picsum.photos/seed/user2/50/50',
            level: '专业美发师'
          },
          content: '很多朋友想在家自己染发，但是又担心效果不好。今天整理了一些家庭染发的注意事项...',
          images: ['https://picsum.photos/seed/post3/300/200'],
          tags: ['新手', '家庭染发', '注意事项'],
          stats: {
            likes: 189,
            comments: 32,
            views: 892,
            shares: 15
          },
          createdAt: '5小时前',
          isLiked: true,
          isBookmarked: false
        }, {
          id: 3,
          title: '2024年流行色彩趋势预测',
          author: {
            name: '时尚造型师Tony',
            avatar: 'https://picsum.photos/seed/user3/50/50',
            level: '资深造型师'
          },
          content: '根据国际色彩机构的预测，2024年将会有哪些流行色彩趋势呢？让我来为大家详细分析...',
          images: ['https://picsum.photos/seed/post4/300/200', 'https://picsum.photos/seed/post5/300/200', 'https://picsum.photos/seed/post6/300/200'],
          tags: ['2024', '流行趋势', '色彩预测'],
          stats: {
            likes: 456,
            comments: 78,
            views: 2341,
            shares: 67
          },
          createdAt: '1天前',
          isLiked: false,
          isBookmarked: true
        }]);

        // 模拟教程数据
        setTutorials([{
          id: 1,
          title: '渐变染发完整教程',
          author: '专业美发学院',
          duration: '45分钟',
          difficulty: '中等',
          rating: 4.8,
          students: 1234,
          image: 'https://picsum.photos/seed/tutorial1/300/200'
        }, {
          id: 2,
          title: '挑染技巧入门指南',
          author: '美发培训中心',
          duration: '30分钟',
          difficulty: '简单',
          rating: 4.6,
          students: 892,
          image: 'https://picsum.photos/seed/tutorial2/300/200'
        }]);

        // 模拟挑战数据
        setChallenges([{
          id: 1,
          title: '春季色彩创作挑战',
          description: '以"春日花开"为主题创作染发作品',
          prize: '价值500元染发产品套装',
          participants: 234,
          daysLeft: 7,
          image: 'https://picsum.photos/seed/challenge1/300/200'
        }, {
          id: 2,
          title: '复古风格重现挑战',
          description: '重现经典复古染发风格',
          prize: '专业美发工具套装',
          participants: 156,
          daysLeft: 14,
          image: 'https://picsum.photos/seed/challenge2/300/200'
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

  // 点赞处理
  const handleLike = postId => {
    setPosts(prev => prev.map(post => post.id === postId ? {
      ...post,
      isLiked: !post.isLiked,
      stats: {
        ...post.stats,
        likes: post.isLiked ? post.stats.likes - 1 : post.stats.likes + 1
      }
    } : post));
  };

  // 收藏处理
  const handleBookmark = postId => {
    setPosts(prev => prev.map(post => post.id === postId ? {
      ...post,
      isBookmarked: !post.isBookmarked
    } : post));
  };

  // 分享处理
  const handleShare = postId => {
    toast({
      title: "分享成功",
      description: "链接已复制到剪贴板"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('community.title', '社区')}
          </h1>
          <p className="text-gray-600">
            {t('community.subtitle', '分享作品，交流经验，共同成长')}
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="搜索帖子、教程或用户..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="flex gap-2">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              {categories.map(category => <option key={category.value} value={category.value}>
                  {category.label}
                </option>)}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
        </div>

        {/* 标签页 */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[{
            id: 'posts',
            name: '帖子',
            icon: MessageSquare
          }, {
            id: 'tutorials',
            name: '教程',
            icon: Star
          }, {
            id: 'challenges',
            name: '挑战',
            icon: TrendingUp
          }].map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-purple-600 font-medium' : 'text-gray-600'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>;
          })}
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'posts' && <div className="space-y-6">
            {posts.map(post => <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-gray-600">{post.author.level} · {post.createdAt}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  
                  {/* 图片 */}
                  {post.images.length > 0 && <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                      {post.images.map((image, index) => <img key={index} src={image} alt={`${post.title} ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />)}
                    </div>}
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-600 text-sm rounded-full">
                        {tag}
                      </span>)}
                  </div>
                  
                  {/* 互动按钮 */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}>
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.stats.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm">{post.stats.comments}</span>
                      </button>
                      <button onClick={() => handleShare(post.id)} className="flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.stats.shares}</span>
                      </button>
                    </div>
                    <button onClick={() => handleBookmark(post.id)} className={`flex items-center space-x-1 ${post.isBookmarked ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600`}>
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {activeTab === 'tutorials' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map(tutorial => <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={tutorial.image} alt={tutorial.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {tutorial.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tutorial.author}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{tutorial.rating}</span>
                    </div>
                    <span className="text-gray-600">{tutorial.students} 学生</span>
                  </div>
                  <div className="mt-3">
                    <span className={`px-2 py-1 text-xs rounded ${tutorial.difficulty === '简单' ? 'bg-green-100 text-green-600' : tutorial.difficulty === '中等' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {activeTab === 'challenges' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map(challenge => <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={challenge.image} alt={challenge.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>{challenge.participants} 参与者</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>{challenge.daysLeft} 天后结束</span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg mb-3">
                    <p className="text-sm font-medium text-purple-800">奖品</p>
                    <p className="text-sm text-purple-600">{challenge.prize}</p>
                  </div>
                  <Button className="w-full">
                    参与挑战
                  </Button>
                </CardContent>
              </Card>)}
          </div>}

        {/* 发布按钮 */}
        <button className="fixed bottom-24 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="community" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}