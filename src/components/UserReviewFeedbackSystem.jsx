
// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, History, Bell, Star, ThumbsUp, MessageSquare, Flag, Bug, Lightbulb, Heart, BarChart3, Users, TrendingUp, CheckCircle, Search, Cogs, PaperPlane, ChevronLeft, ChevronRight, Filter, CommentDots, ThumbsDown } from 'lucide-react';

export const UserReviewFeedbackSystem = ({
  onBack,
  onMyReviews,
  onNotifications
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [reportedReviews, setReportedReviews] = useState(new Set());

  // 评价数据
  const [reviews] = useState([{
    id: 1,
    userName: '张店长',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    productName: 'AI智能调色宝机',
    rating: 5,
    title: '效果超出预期，强烈推荐！',
    content: '使用AI智能调色宝机已经三个月了，效果真的超出预期。染发效率提升了300%，客户满意度也大幅提升。操作简单，员工上手很快，最重要的���染发效果非常精准，几乎没有失败的情况。投资回报率很高，强烈推荐给同行！',
    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=150&fit=crop'],
    date: '2024-01-15',
    verified: true,
    helpful: 23,
    replies: 5
  }, {
    id: 2,
    userName: '李经理',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    productName: '染发膏管理系统',
    rating: 4,
    title: '库存管理变得如此简单',
    content: '作为一家10家连锁店的经营者，库存管理一直是个头疼的问题。自从使用了染发膏管理系统，库存准确率提升到了99.5%，浪费减少了80%。系统界面简洁，操作方便，员工培训成本很低。客服响应也很及时，遇到问题都能快速解决。',
    images: [],
    date: '2024-01-12',
    verified: true,
    helpful: 18,
    replies: 3
  }]);

  // 产品选项
  const productOptions = [{
    value: '1',
    label: 'AI智能染发自动调色宝机'
  }, {
    value: '2',
    label: 'AI品牌染发膏管理系统'
  }, {
    value: '3',
    label: 'AI客户配方管理系统'
  }, {
    value: '4',
    label: 'AI美发连锁门店管理系统'
  }, {
    value: '5',
    label: 'AI美发客户管理系统CRM'
  }, {
    value: '6',
    label: 'AI染发色彩大师SaaS系统'
  }];

  // 反馈类型选项
  const feedbackTypes = [{
    value: 'bug',
    label: '问题反馈',
    icon: Bug,
    color: 'text-red-400'
  }, {
    value: 'feature',
    label: '功能建议',
    icon: Lightbulb,
    color: 'text-yellow-400'
  }, {
    value: 'other',
    label: '其他反馈',
    icon: Heart,
    color: 'text-pink-400'
  }];

  // 评价统计
  const reviewStats = {
    averageRating: 4.8,
    totalReviews: 2456,
    recommendationRate: 98,
    monthlyReviews: 186,
    averageResponseTime: '2h',
    ratingDistribution: {
      5: 75,
      4: 15,
      3: 7,
      2: 2,
      1: 1
    }
  };

  // 数据统计
  const dataStats = {
    averageRating: 4.8,
    totalReviews: 2456,
    totalFeedback: 186,
    resolutionRate: 95
  };

  // 互动统计
  const interactionStats = {
    totalLikes: 1234,
    totalReplies: 567,
    totalReports: 12
  };

  // 评价关键词
  const reviewKeywords = ['效果好', '操作简单', '性价比高', '客服专业', '发货快', '质量好'];

  // 热门评价
  const hotReviews = [{
    id: 1,
    userName: '张店长',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    title: '效果超出预期，强烈推荐！',
    likes: 156,
    replies: 23
  }, {
    id: 2,
    userName: '李经理',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    title: '库存管理变得如此简单',
    likes: 98,
    replies: 15
  }];

  // 举报管理
  const reportManagement = [{
    id: 1,
    content: '不当言论',
    reporter: '王五',
    date: '2024-01-15'
  }];

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理星级评分
  const handleRatingClick = rating => {
    setSelectedRating(rating);
  };
  const handleRatingHover = rating => {
    setHoverRating(rating);
  };
  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  // 处理点赞
  const handleLike = reviewId => {
    const newLikedReviews = new Set(likedReviews);
    if (newLikedReviews.has(reviewId)) {
      newLikedReviews.delete(reviewId);
    } else {
      newLikedReviews.add(reviewId);
    }
    setLikedReviews(newLikedReviews);
  };

  // 处理举报
  const handleReport = reviewId => {
    const newReportedReviews = new Set(reportedReviews);
    if (newReportedReviews.has(reviewId)) {
      newReportedReviews.delete(reviewId);
    } else {
      newReportedReviews.add(reviewId);
    }
    setReportedReviews(newReportedReviews);
    toast({
      title: "举报成功",
      description: "我们会在24小时内处理您的举报"
    });
  };

  // 处理反馈提交
  const handleFeedbackSubmit = e => {
    e.preventDefault();
    if (!feedbackType || !feedbackTitle || !feedbackContent || !contactEmail) {
      toast({
        title: "请完善信息",
        description: "请填写所有必填项",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "反馈提交成功",
      description: "我们会在24小时内回复您的反馈"
    });
    // 重置表单
    setFeedbackType('');
    setFeedbackTitle('');
    setFeedbackContent('');
    setContactEmail('');
    setSelectedProduct('');
  };

  // 渲染星级评分
  const renderStars = (rating, interactive = false) => {
    return <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-5 h-5 ${star <= (interactive ? hoverRating || selectedRating : rating) ? 'fill-current text-yellow-400' : 'text-gray-400'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`} onClick={interactive ? () => handleRatingClick(star) : undefined} onMouseEnter={interactive ? () => handleRatingHover(star) : undefined} onMouseLeave={interactive ? handleRatingLeave : undefined} />)}
      </div>;
  };

  // 渲染评价卡片
  const renderReviewCard = review => {
    const isLiked = likedReviews.has(review.id);
    const isReported = reportedReviews.has(review.id);
    return <Card key={review.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="text-white font-medium">{review.userName}</h4>
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  <span className="text-white/60 text-sm">{review.productName}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm">{review.date}</div>
              {review.verified && <div className="text-green-400 text-sm">已验证购买</div>}
            </div>
          </div>
          
          <h5 className="text-white font-medium mb-2">{review.title}</h5>
          <p className="text-white/80 mb-4">{review.content}</p>
          
          {review.images.length > 0 && <div className="grid grid-cols-3 gap-2 mb-4">
              {review.images.map((image, index) => <img key={index} src={image} alt="评价图片" className="w-full h-20 object-cover rounded-lg" />)}
            </div>}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => handleLike(review.id)} className={`text-white/60 hover:text-white ${isLiked ? 'text-blue-400' : ''}`}>
                <ThumbsUp className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                有帮助 ({review.helpful + (isLiked ? 1 : 0)})
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <MessageSquare className="w-4 h-4 mr-1" />
                回复 ({review.replies})
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleReport(review.id)} className={`text-white/60 hover:text-white ${isReported ? 'text-red-400' : ''}`}>
              <Flag className={`w-4 h-4 mr-1 ${isReported ? 'fill-current' : ''}`} />
              举报
            </Button>
          </div>
        </CardContent>
      </Card>;
  };

  // 渲染反馈类型卡片
  const renderFeedbackTypeCard = type => {
    const Icon = type.icon;
    return <Button key={type.value} variant="ghost" onClick={() => setFeedbackType(type.value)} className={`p-6 text-left justify-start h-auto ${feedbackType === type.value ? 'bg-white/20 border-2 border-blue-400' : 'bg-white/10 hover:bg-white/20'}`}>
        <Icon className={`${type.color} text-2xl mb-3`} />
        <div>
          <h3 className="text-white font-semibold mb-2">{type.label}</h3>
          <p className="text-white/60 text-sm">
            {type.value === 'bug' ? '报告产品问题或错误' : type.value === 'feature' ? '提出新功能或改进建议' : '其他意见和建议'}
          </p>
        </div>
      </Button>;
  };

  // 渲染统计卡片
  const renderStatCard = (title, value, icon, color) => {
    const Icon = icon;
    return <div className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{value}</div>
        <div className="text-white/60">{title}</div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">用户评价和反馈系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onMyReviews} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <History className="w-4 h-4 mr-2" />
              我的评价
            </Button>
            <Button onClick={onNotifications} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Bell className="w-4 h-4 mr-2" />
              通知
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">3</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 标签切换 */}
      <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <Button variant={activeTab === 'reviews' ? 'default' : 'ghost'} onClick={() => handleTabChange('reviews')} className={`flex-1 ${activeTab === 'reviews' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Star className="w-4 h-4 mr-2" />
          评价展示
        </Button>
        <Button variant={activeTab === 'feedback' ? 'default' : 'ghost'} onClick={() => handleTabChange('feedback')} className={`flex-1 ${activeTab === 'feedback' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <CommentDots className="w-4 h-4 mr-2" />
          反馈收集
        </Button>
        <Button variant={activeTab === 'stats' ? 'default' : 'ghost'} onClick={() => handleTabChange('stats')} className={`flex-1 ${activeTab === 'stats' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <BarChart3 className="w-4 h-4 mr-2" />
          统计面板
        </Button>
        <Button variant={activeTab === 'interaction' ? 'default' : 'ghost'} onClick={() => handleTabChange('interaction')} className={`flex-1 ${activeTab === 'interaction' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <Users className="w-4 h-4 mr-2" />
          互动功能
        </Button>
      </div>

      {/* 评价展示内容 */}
      {activeTab === 'reviews' && <div className="space-y-8">
          {/* 评价统计概览 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {renderStatCard('基于 2,456 条评价', reviewStats.averageRating, Star, 'bg-yellow-500')}
            {renderStatCard('推荐率', `${reviewStats.recommendationRate}%`, ThumbsUp, 'bg-green-500')}
            {renderStatCard('本月新增评价', reviewStats.monthlyReviews, MessageSquare, 'bg-blue-500')}
            {renderStatCard('平均回复时间', reviewStats.averageResponseTime, History, 'bg-purple-500')}
          </div>

          {/* 评分分布 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">评分分布</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {Object.entries(reviewStats.ratingDistribution).reverse().map(([stars, percentage]) => <div key={stars} className="flex items-center space-x-3">
                      <span className="text-white/60 w-12">{stars}星</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`h-3 rounded-full ${stars === 5 ? 'bg-green-400' : stars === 4 ? 'bg-blue-400' : stars === 3 ? 'bg-yellow-400' : stars === 2 ? 'bg-orange-400' : 'bg-red-400'}`} style={{
                    width: `${percentage}%`
                  }}></div>
                      </div>
                      <span className="text-white/60 w-12 text-right">{percentage}%</span>
                    </div>)}
                </div>
                
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">评价关键词</h3>
                  <div className="flex flex-wrap gap-2">
                    {reviewKeywords.map((keyword, index) => {
                  const colors = ['bg-green-500/20 text-green-300', 'bg-blue-500/20 text-blue-300', 'bg-purple-500/20 text-purple-300', 'bg-yellow-500/20 text-yellow-300', 'bg-pink-500/20 text-pink-300', 'bg-indigo-500/20 text-indigo-300'];
                  return <span key={index} className={`${colors[index % colors.length]} px-3 py-1 rounded-full text-sm`}>
                        {keyword}
                      </span>;
                })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 评价列表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">用户评价</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex gap-2">
                    {['all', '5', '4', '3', 'hasImage'].map(rating => <Button key={rating} variant="ghost" size="sm" onClick={() => setFilterRating(rating)} className={`px-3 py-1 rounded-full text-sm ${filterRating === rating ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/30'}`}>
                        {rating === 'all' ? '全部' : rating === 'hasImage' ? '有图' : `${rating}星`}
                      </Button>)}
                  </div>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="latest">最新评价</option>
                    <option value="rating">评分最高</option>
                    <option value="helpful">最有帮助</option>
                    <option value="verified">已验证购买</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map(renderReviewCard)}
              </div>
              
              {/* 分页 */}
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="default" size="sm" className="bg-blue-500">1</Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">2</Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">3</Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">...</Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">10</Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>}

     