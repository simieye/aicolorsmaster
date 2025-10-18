// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Users, Heart, MessageCircle, Share2, TrendingUp, Star, Camera, Filter } from 'lucide-react';

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
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">1000万+</p>
                <p className="text-sm text-gray-600">美业者</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">50万+</p>
                <p className="text-sm text-gray-600">作品</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">33%</p>
                <p className="text-sm text-gray-600">复购提升</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-600">平均评分</p>
              </div>
            </div>
          </div>
        </div>

        {/* 作品展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* 作者信息 */}
              <div className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-xs text-gray-600">{post.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">{post.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{post.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* 对比图片 */}
              <div className="relative h-64">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative">
                    <img src={post.beforeImage} alt="染发前" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      染发前
                    </div>
                  </div>
                  <div className="w-1/2 relative">
                    <img src={post.afterImage} alt="染发后" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      染发后
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  {post.color}
                </div>
              </div>

              {/* 内容 */}
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{post.description}</p>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      #{tag}
                    </span>)}
                </div>

                {/* KOL评价 */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-semibold">KOL评价：</span>
                    <span className="text-sm text-orange-600 ml-1">"{post.kolRating}"</span>
                  </div>
                </div>

                {/* 互动按钮 */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <button onClick={() => handleLike(post.id)} className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button onClick={() => handleShare(post)} className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 className="w-4 h-4 mr-1" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 加载更多 */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8">
            加载更多作品
          </Button>
        </div>
      </div>
    </div>;
}