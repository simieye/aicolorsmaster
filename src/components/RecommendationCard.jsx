// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button } from '@/components/ui';
// @ts-ignore;
import { Heart, Star, TrendingUp, Palette, Eye, Share2, Bookmark } from 'lucide-react';

export function RecommendationCard({
  recommendation,
  onLike,
  onFavorite,
  onView,
  onShare
}) {
  const {
    id,
    colorName,
    colorHex,
    matchScore,
    category,
    season,
    description,
    reasons,
    trending,
    isNew
  } = recommendation;
  return <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* 色彩展示 */}
      <div className="relative h-48" style={{
      backgroundColor: colorHex
    }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* 标签 */}
        <div className="absolute top-3 left-3 flex gap-2">
          {trending && <div className="flex items-center bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              热门
            </div>}
          {isNew && <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              新品
            </div>}
        </div>
        
        {/* 匹配度 */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{matchScore}%</span>
          </div>
        </div>
        
        {/* 色彩信息 */}
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="text-lg font-bold">{colorName}</h3>
          <p className="text-sm opacity-90">{colorHex}</p>
        </div>
      </div>

      {/* 内容 */}
      <CardContent className="p-4">
        {/* 分类和季节 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
              {category}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
              {season}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Palette className="w-4 h-4 mr-1" />
            个性化推荐
          </div>
        </div>

        {/* 描述 */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {/* 推荐理由 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">推荐理由：</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {reasons?.slice(0, 2).map((reason, index) => <li key={index} className="flex items-start">
                <span className="text-purple-500 mr-1">•</span>
                {reason}
              </li>)}
          </ul>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onLike(id)} className="text-gray-600 hover:text-red-500">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onFavorite(id)} className="text-gray-600 hover:text-yellow-500">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onShare(recommendation)} className="text-gray-600 hover:text-blue-500">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          <Button size="sm" onClick={() => onView(recommendation)} className="bg-purple-600 hover:bg-purple-700">
            <Eye className="w-4 h-4 mr-1" />
            查看详情
          </Button>
        </div>
      </CardContent>
    </Card>;
}