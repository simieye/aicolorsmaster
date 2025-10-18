// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Heart, MessageCircle, Share2, Bookmark, Eye, MoreHorizontal, Users, Award } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export const PostCard = ({
  post,
  onLike,
  onBookmark,
  onShare,
  onComment
}) => {
  // 获取角色标签
  const getRoleLabel = role => {
    const roleMap = {
      admin: '管理员',
      designer: '设计师',
      professional: '专业人士',
      user: '用户'
    };
    return roleMap[role] || '用户';
  };

  // 获取角色颜色
  const getRoleColor = role => {
    const colorMap = {
      admin: 'bg-red-500',
      designer: 'bg-purple-500',
      professional: 'bg-blue-500',
      user: 'bg-gray-500'
    };
    return colorMap[role] || 'bg-gray-500';
  };

  // 格式化时间
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days}天前`;
    } else if (hours > 0) {
      return `${hours}小时前`;
    } else {
      return '刚刚';
    }
  };
  return <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
      {/* 用户信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-white/20" />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-medium">{post.author.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs text-white ${getRoleColor(post.author.role)}`}>
                {getRoleLabel(post.author.role)}
              </span>
              {post.author.verified && <Award className="w-4 h-4 text-yellow-400" />}
            </div>
            <p className="text-white/60 text-sm">{formatTime(post.createdAt)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white p-1">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* 帖子内容 */}
      <h2 className="text-white font-medium text-lg mb-2">{post.title}</h2>
      <p className="text-white/80 mb-3 line-clamp-3">{post.content}</p>

      {/* 图片 */}
      {post.images && post.images.length > 0 && <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {post.images.map((image, index) => <img key={index} src={image} alt={`图片${index + 1}`} className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer" />)}
        </div>}

      {/* 标签 */}
      {post.tags && post.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 hover:bg-white/20 transition-colors cursor-pointer">
              #{tag}
            </span>)}
        </div>}

      {/* 统计信息 */}
      <div className="flex items-center justify-between pt-3 border-t border-white/20">
        <div className="flex items-center space-x-4">
          <button onClick={() => onLike && onLike(post.id)} className={`flex items-center space-x-1 text-sm transition-colors ${post.isLiked ? 'text-red-400' : 'text-white/60 hover:text-red-400'}`}>
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.stats.likes}</span>
          </button>
          <button onClick={() => onComment && onComment(post.id)} className="flex items-center space-x-1 text-sm text-white/60 hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.stats.comments}</span>
          </button>
          <button onClick={() => onShare && onShare(post.id)} className="flex items-center space-x-1 text-sm text-white/60 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
            <span>{post.stats.shares}</span>
          </button>
          <button onClick={() => onBookmark && onBookmark(post.id)} className={`flex items-center space-x-1 text-sm transition-colors ${post.isBookmarked ? 'text-yellow-400' : 'text-white/60 hover:text-yellow-400'}`}>
            <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="flex items-center space-x-1 text-sm text-white/60">
          <Eye className="w-4 h-4" />
          <span>{post.stats.views}</span>
        </div>
      </div>
    </div>;
};
export default PostCard;