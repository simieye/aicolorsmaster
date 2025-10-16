// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button } from '@/components/ui';
// @ts-ignore;
import { Heart, MessageCircle, Share2, Star, User } from 'lucide-react';

export function PostCard({
  post,
  onLike,
  onShare
}) {
  const handleLike = () => {
    onLike(post.id);
  };
  const handleShare = () => {
    onShare(post);
  };
  return <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
              {tag}
            </span>)}
        </div>

        {/* KOL评分 */}
        <div className="flex items-center justify-between mb-3 p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded">
          <span className="text-sm font-medium">KOL评分</span>
          <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
            {post.kolRating}
          </span>
        </div>

        {/* 互动按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button onClick={handleShare} className="flex items-center text-gray-600 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4 mr-1" />
              <span className="text-sm">{post.shares}</span>
            </button>
          </div>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            查看详情
          </Button>
        </div>
      </CardContent>
    </Card>;
}