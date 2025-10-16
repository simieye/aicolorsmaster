// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Filter } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { PostCard } from '@/components/PostCard';
// @ts-ignore;
import { CommunityStats } from '@/components/CommunityStats';
export default function Community(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [posts, setPosts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  useEffect(() => {
    // 模拟加载社区数据
    const mockPosts = [{
      id: 1,
      author: '雅米',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      role: '资深发型师',
      title: '微潮紫染发教程分享',
      beforeImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop',
      color: '微潮紫',
      category: '微潮色系',
      likes: 2341,
      comments: 156,
      shares: 89,
      rating: 4.8,
      description: '使用Agentic HairAI调配的微潮紫，效果很棒！客户非常满意',
      tags: ['微潮紫', '春季流行', '显白'],
      kolRating: '很OK',
      createdAt: '2小时前'
    }, {
      id: 2,
      author: 'Tony老师',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: '创意总监',
      title: '樱花粉日系风格',
      beforeImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1562352263-3e9a9c35b4a3?w=300&h=400&fit=crop',
      color: '樱花粉',
      category: '日系色',
      likes: 1892,
      comments: 98,
      shares: 67,
      rating: 4.9,
      description: '日系樱花粉搭配空气刘海，甜美可爱风',
      tags: ['樱花粉', '日系', '甜美'],
      kolRating: '推荐',
      createdAt: '5小时前'
    }, {
      id: 3,
      author: 'Lisa造型师',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: '高级造型师',
      title: '薄荷绿夏日清新',
      beforeImage: 'https://images.unsplash.com/photo-1559598351-9ca162612bc0?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1534534573828-da4a8dc8b49c?w=300&h=400&fit=crop',
      color: '薄荷绿',
      category: '潮色系',
      likes: 1567,
      comments: 76,
      shares: 45,
      rating: 4.7,
      description: '夏日薄荷绿，清爽自然，回头率超高',
      tags: ['薄荷绿', '夏日', '清新'],
      kolRating: '不错',
      createdAt: '1天前'
    }, {
      id: 4,
      author: 'Kevin总监',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      role: '技术总监',
      title: '奶茶棕自然百搭',
      beforeImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      color: '奶茶棕',
      category: '微潮色系',
      likes: 2103,
      comments: 124,
      shares: 78,
      rating: 4.6,
      description: '奶茶棕真的很显白，而且很日常，上班族首选',
      tags: ['奶茶棕', '日常', '显白'],
      kolRating: '推荐',
      createdAt: '3天前'
    }, {
      id: 5,
      author: 'Amy设计师',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      role: '首席设计师',
      title: '焦糖色秋冬温暖',
      beforeImage: 'https://images.unsplash.com/photo-1562322145-93d8e9a1c7b6?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop',
      color: '焦糖色',
      category: '微潮色系',
      likes: 1876,
      comments: 92,
      shares: 56,
      rating: 4.8,
      description: '秋冬必备焦糖色，温暖又有气质',
      tags: ['焦糖色', '秋冬', '温暖'],
      kolRating: '很OK',
      createdAt: '4天前'
    }, {
      id: 6,
      author: 'David造型师',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      role: '高级造型师',
      title: '雾霾蓝高级感',
      beforeImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop',
      color: '雾霾蓝',
      category: '潮色系',
      likes: 1654,
      comments: 87,
      shares: 43,
      rating: 4.5,
      description: '雾霾蓝真的很有高级感，适合追求个性的客户',
      tags: ['雾霾蓝', '高级感', '个性'],
      kolRating: '不错',
      createdAt: '5天前'
    }];
    setPosts(mockPosts);
  }, []);
  const handleLike = postId => {
    setPosts(posts.map(post => post.id === postId ? {
      ...post,
      likes: post.likes + 1
    } : post));
    toast({
      title: "点赞成功",
      description: "您已为这个作品点赞"
    });
  };
  const handleShare = post => {
    toast({
      title: "分享成功",
      description: `已分享${post.author}的作品到社区`
    });
  };
  const filteredPosts = posts.filter(post => {
    if (filterCategory === 'all') return true;
    return post.category === filterCategory;
  });
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'trending') return b.likes - a.likes;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'recent') return 0; // 简化处理
    return 0;
  });
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">社区分享</h1>
          <p className="text-gray-600">Share Agent 连接1000万美业者，展示您的创意作品</p>
        </div>

        {/* 筛选和排序 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="选择色系" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="日系色">日系色</SelectItem>
                <SelectItem value="潮色系">潮色系</SelectItem>
                <SelectItem value="微潮色系">微潮色系</SelectItem>
                <SelectItem value="生活色系">生活色系</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">热门推荐</SelectItem>
                <SelectItem value="rating">评分最高</SelectItem>
                <SelectItem value="recent">最新发布</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Camera className="mr-2 w-4 h-4" />
            发布作品
          </Button>
        </div>

        {/* 统计信息 */}
        <CommunityStats />

        {/* 作品展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map(post => <PostCard key={post.id} post={post} onLike={handleLike} onShare={handleShare} />)}
        </div>
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