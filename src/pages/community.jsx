// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Users, Plus, Search, TrendingUp, Clock, Filter } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { PostCard } from '@/components/PostCard';
// @ts-ignore;
import { CreatePostModal } from '@/components/CreatePostModal';
// @ts-ignore;
import { useAuth } from '@/components/AuthProvider';
export default function CommunityPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    user
  } = useAuth();
  const {
    toast
  } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hot');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // 分类选项
  const categories = [{
    value: 'all',
    label: '全部'
  }, {
    value: 'discussion',
    label: '讨论'
  }, {
    value: 'showcase',
    label: '展示'
  }, {
    value: 'question',
    label: '问答'
  }, {
    value: 'tutorial',
    label: '教程'
  }, {
    value: 'news',
    label: '资讯'
  }];

  // 模拟帖子数据
  const mockPosts = [{
    id: '1',
    title: '现代简约风格客厅色彩搭配分享',
    content: '最近完成了一个现代简约风格的客厅装修，想和大家分享一下色彩搭配的心得。主色调选择了温暖的米白色，搭配深灰色的沙发和原木色的茶几，整体效果非常和谐。墙面使用了美涂士的环保内墙漆，颜色选择了温暖的米白色，不仅环保无味，而且遮盖力很强，两遍就达到了理想效果。',
    author: {
      id: 'user_001',
      name: '设计师小王',
      avatar: 'https://picsum.photos/seed/user1/200/200.jpg',
      role: 'designer',
      verified: true
    },
    category: 'showcase',
    tags: ['色彩搭配', '作品展示'],
    images: ['https://picsum.photos/seed/living1/600/400.jpg', 'https://picsum.photos/seed/living2/600/400.jpg'],
    stats: {
      likes: 156,
      comments: 23,
      shares: 12,
      views: 892
    },
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-15T10:30:00Z'
  }, {
    id: '2',
    title: '外墙防水涂料施工注意事项',
    content: '在多年的施工经验中，总结了一些外墙防水涂料施工的关键注意事项，希望对大家有帮助：\n1. 基层处理是关键：必须确保墙面平整、干燥、无油污\n2. 天气条件很重要：避免在雨天或湿度大于85%的环境施工\n3. 涂刷厚度要均匀：每遍厚度控制在0.1-0.15mm\n4. 接缝处理要仔细：阴阳角、窗框四周要重点处理\n5. 养护时间要充足：每遍间隔至少4小时',
    author: {
      id: 'user_002',
      name: '施工专家李工',
      avatar: 'https://picsum.photos/seed/user2/200/200.jpg',
      role: 'professional',
      verified: true
    },
    category: 'tutorial',
    tags: ['施工技巧', '防水涂料'],
    images: [],
    stats: {
      likes: 89,
      comments: 15,
      shares: 8,
      views: 456
    },
    isLiked: true,
    isBookmarked: false,
    createdAt: '2024-01-14T15:20:00Z'
  }, {
    id: '3',
    title: '求助：如何选择适合潮湿环境的涂料？',
    content: '家住南方，气候比较潮湿，特别是梅雨季节墙面容易发霉。想请教一下有经验的朋友，应该选择什么样的涂料？有什么品牌推荐吗？预算大概在300-500元/桶。另外，施工时有什么特别需要注意的地方吗？',
    author: {
      id: 'user_003',
      name: '装修新手',
      avatar: 'https://picsum.photos/seed/user3/200/200.jpg',
      role: 'user',
      verified: false
    },
    category: 'question',
    tags: ['问题求助', '产品推荐'],
    images: ['https://picsum.photos/seed/moisture/600/400.jpg'],
    stats: {
      likes: 23,
      comments: 34,
      shares: 2,
      views: 178
    },
    isLiked: false,
    isBookmarked: true,
    createdAt: '2024-01-13T09:15:00Z'
  }, {
    id: '4',
    title: '2024年涂料行业发展趋势分析',
    content: '根据最新的市场调研数据，2024年涂料行业呈现以下几个发展趋势：\n1. 环保化：水性涂料、无甲醛涂料成为主流\n2. 功能化：防水、防火、抗菌等功能性涂料需求增长\n3. 个性化：定制色彩、艺术涂料受到年轻消费者青睐\n4. 智能化：智能调色、在线配色工具普及\n5. 服务化：从卖产品向提供整体解决方案转变',
    author: {
      id: 'user_004',
      name: '行业观察员',
      avatar: 'https://picsum.photos/seed/user4/200/200.jpg',
      role: 'professional',
      verified: true
    },
    category: 'news',
    tags: ['行业资讯', '趋势分析'],
    images: ['https://picsum.photos/seed/industry/600/400.jpg'],
    stats: {
      likes: 67,
      comments: 18,
      shares: 25,
      views: 523
    },
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-12T14:45:00Z'
  }];

  // 加载帖子数据
  useEffect(() => {
    loadPosts();
  }, [activeTab, searchTerm, selectedCategory]);
  const loadPosts = async () => {
    try {
      setLoading(true);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      let filteredPosts = [...mockPosts];

      // 按分类筛选
      if (selectedCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
      }

      // 按搜索词筛选
      if (searchTerm) {
        filteredPosts = filteredPosts.filter(post => post.title.includes(searchTerm) || post.content.includes(searchTerm) || post.tags.some(tag => tag.includes(searchTerm)));
      }

      // 排序
      if (activeTab === 'hot') {
        filteredPosts.sort((a, b) => b.stats.likes - a.stats.likes);
      } else if (activeTab === 'latest') {
        filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      setPosts(filteredPosts);
    } catch (error) {
      console.error('加载帖子失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载社区内容",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 创建帖子
  const handleCreatePost = async postData => {
    try {
      const newPost = {
        id: Date.now().toString(),
        title: postData.title,
        content: postData.content,
        category: postData.category,
        tags: postData.tags,
        author: {
          id: user?._id,
          name: user?.username,
          avatar: user?.avatarUrl || 'https://picsum.photos/seed/default/200/200.jpg',
          role: user?.role || 'user',
          verified: user?.role === 'admin' || user?.role === 'professional'
        },
        images: [],
        stats: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0
        },
        isLiked: false,
        isBookmarked: false,
        createdAt: new Date().toISOString()
      };
      setPosts(prev => [newPost, ...prev]);
      setShowCreatePost(false);
      toast({
        title: "发布成功",
        description: "您的帖子已成功发布"
      });
    } catch (error) {
      console.error('发布帖子失败:', error);
      toast({
        title: "发布失败",
        description: "无法发布帖子，请稍后重试",
        variant: "destructive"
      });
    }
  };

  // 点赞
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

  // 收藏
  const handleBookmark = postId => {
    setPosts(prev => prev.map(post => post.id === postId ? {
      ...post,
      isBookmarked: !post.isBookmarked
    } : post));
  };

  // 分享
  const handleShare = postId => {
    toast({
      title: "分享成功",
      description: "帖子链接已复制到剪贴板"
    });
  };

  // 评论
  const handleComment = postId => {
    toast({
      title: "评论功能",
      description: "评论功能开发中，敬请期待"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-orange-600 via-pink-600 to-purple-600">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-xl font-bold text-white">涂料社区</h1>
                <p className="text-sm text-white/80">分享经验，交流心得</p>
              </div>
            </div>
            
            <Button onClick={() => setShowCreatePost(true)} className="bg-white text-purple-600 hover:bg-white/90">
              <Plus className="w-4 h-4 mr-2" />
              发布帖子
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* 搜索和筛选 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索框 */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input placeholder="搜索帖子、标签或用户..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-white/40 focus:outline-none" />
              </div>

              {/* 分类筛选 */}
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-white/40 focus:outline-none">
                {categories.map(category => <option key={category.value} value={category.value} className="text-gray-800">
                    {category.label}
                  </option>)}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* 标签页 */}
        <div className="flex space-x-1 mb-6 bg-white/10 rounded-lg p-1">
          <button onClick={() => setActiveTab('hot')} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'hot' ? 'bg-white text-purple-600' : 'text-white/80 hover:text-white'}`}>
            <TrendingUp className="w-4 h-4 inline mr-2" />
            热门
          </button>
          <button onClick={() => setActiveTab('latest')} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'latest' ? 'bg-white text-purple-600' : 'text-white/80 hover:text-white'}`}>
            <Clock className="w-4 h-4 inline mr-2" />
            最新
          </button>
          <button onClick={() => setActiveTab('following')} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${activeTab === 'following' ? 'bg-white text-purple-600' : 'text-white/80 hover:text-white'}`}>
            <Users className="w-4 h-4 inline mr-2" />
            关注
          </button>
        </div>

        {/* 帖子列表 */}
        {loading ? <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div> : posts.length === 0 ? <div className="text-center py-12">
            <Users className="w-16 h-16 text-white/60 mx-auto mb-4" />
            <p className="text-white/80 text-lg">暂无帖子</p>
            <p className="text-white/60">快来发布第一个帖子吧！</p>
          </div> : <div className="space-y-4">
            {posts.map(post => <PostCard key={post.id} post={post} onLike={handleLike} onBookmark={handleBookmark} onShare={handleShare} onComment={handleComment} />)}
          </div>}
      </main>

      {/* 发布帖子模态框 */}
      <CreatePostModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} onSubmit={handleCreatePost} />

      {/* 底部导航 */}
      <TabBar currentPage="community" />
    </div>;
}