// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Star, ThumbsUp, MessageSquare, Share, Flag, TrendingUp, BarChart3, Bug, Lightbulb, Heart, Upload, PaperPlane, History, Pen, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

export const UserReviewFeedback = ({
  onBack,
  onWriteReview,
  onSubmitFeedback
}) => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [replyBoxes, setReplyBoxes] = useState({});
  const [replyContent, setReplyContent] = useState({});
  const fileInputRef = useRef(null);

  // 评价数据
  const [reviews] = useState([{
    id: 1,
    userName: '张店长',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    productName: 'AI智能调色宝机',
    rating: 5,
    title: '效果超出预期，强烈推荐！',
    content: '使用AI智能调色宝机已经三个月了，效果真的超出预期。染发效率提升了300%，客户满意度也大幅提升。操作简单，员工上手很快，最重要的是染发效果非常精准，几乎没有失败的情况。投资回报率很高，强烈推荐给同行！',
    images: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=150&fit=crop', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=150&fit=crop', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=150&fit=crop'],
    date: '2024-01-15',
    verified: true,
    helpful: 23,
    replies: 5,
    isLiked: false
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
    replies: 3,
    isLiked: false
  }]);

  // 评分统计
  const [reviewStats] = useState({
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
  });

  // 评价关键词
  const [reviewKeywords] = useState(['效果好', '操作简单', '性价比高', '客服专业', '发货快', '质量好']);

  // 反馈类型选项
  const [feedbackTypes] = useState([{
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
  }]);

  // 产品选项
  const [productOptions] = useState([{
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
  }]);

  // 处理标签切换
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  // 处理筛选
  const handleFilterChange = rating => {
    setSelectedRating(rating);
  };

  // 处理点赞
  const handleLike = reviewId => {
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          isLiked: !review.isLiked,
          helpful: review.isLiked ? review.helpful - 1 : review.helpful + 1
        };
      }
      return review;
    });
    // 这里应该更新状态，但由于是只读的，我们只显示toast
    toast({
      title: "点赞成功",
      description: "感谢您的反馈"
    });
  };

  // 处理回复框切换
  const toggleReplyBox = reviewId => {
    setReplyBoxes(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // 处理回复内容变化
  const handleReplyChange = (reviewId, content) => {
    setReplyContent(prev => ({
      ...prev,
      [reviewId]: content
    }));
  };

  // 处理回复提交
  const handleReplySubmit = reviewId => {
    const content = replyContent[reviewId];
    if (!content || content.trim() === '') {
      toast({
        title: "请输入回复内容",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "回复成功",
      description: "您的回复已发布"
    });

    // 清空回复内容并关闭回复框
    setReplyContent(prev => ({
      ...prev,
      [reviewId]: ''
    }));
    setReplyBoxes(prev => ({
      ...prev,
      [reviewId]: false
    }));
  };

  // 处理分享
  const handleShare = reviewId => {
    toast({
      title: "分享功能",
      description: "分享链接已复制到剪贴板"
    });
  };

  // 处理举报
  const handleReport = reviewId => {
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
    setUploadedImages([]);
  };

  // 处理文件上传
  const handleFileUpload = e => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).slice(0, 5); // 最多5张图片
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 处理拖拽上传
  const handleDragOver = e => {
    e.preventDefault();
  };
  const handleDrop = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const newImages = Array.from(files).slice(0, 5);
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  // 渲染星级评分
  const renderStars = rating => {
    return <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= rating ? 'fill-current text-yellow-400' : 'text-gray-400'}`} />)}
      </div>;
  };

  // 渲染评价卡片
  const renderReviewCard = review => {
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
              {review.images.map((image, index) => <img key={index} src={image} alt="评价图片" className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" />)}
            </div>}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => handleLike(review.id)} className={`text-white/60 hover:text-white flex items-center space-x-1 ${review.isLiked ? 'text-blue-400' : ''}`}>
                <ThumbsUp className="w-4 h-4" />
                <span>有帮助 ({review.helpful})</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => toggleReplyBox(review.id)} className="text-white/60 hover:text-white flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>回复 ({review.replies})</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare(review.id)} className="text-white/60 hover:text-white flex items-center space-x-1">
                <Share className="w-4 h-4" />
                <span>分享</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleReport(review.id)} className="text-white/60 hover:text-white flex items-center space-x-1">
              <Flag className="w-4 h-4" />
              <span>举报</span>
            </Button>
          </div>
          
          {/* 回复框 */}
          <div className={`reply-box mt-4 ${replyBoxes[review.id] ? 'open' : ''}`}>
            <div className="bg-white/5 rounded-lg p-4">
              <textarea value={replyContent[review.id] || ''} onChange={e => handleReplyChange(review.id, e.target.value)} placeholder="写下您的回复..." className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50 resize-none" rows={3} />
              <div className="flex justify-end mt-2">
                <Button onClick={() => handleReplySubmit(review.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  发送回复
                </Button>
              </div>
            </div>
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
  const renderStatCard = (title, value, icon, color, subtitle) => {
    const Icon = icon;
    return <div className="stat-card bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
        <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{value}</div>
        <div className="text-white/60">{title}</div>
        {subtitle && <div className="text-white/60 text-sm mt-2">{subtitle}</div>}
      </div>;
  };
  return <div className="space-y-8">
      {/* 头部���航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">用户评价和反馈系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onWriteReview} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Pen className="w-4 h-4 mr-2" />
              写评价
            </Button>
            <Button onClick={onSubmitFeedback} className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <MessageSquare className="w-4 h-4 mr-2" />
              提反馈
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
        <Button variant={activeTab === 'stats' ? 'default' : 'ghost'} onClick={() => handleTabChange('stats')} className={`flex-1 ${activeTab === 'stats' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <BarChart3 className="w-4 h-4 mr-2" />
          评分统计
        </Button>
        <Button variant={activeTab === 'feedback' ? 'default' : 'ghost'} onClick={() => handleTabChange('feedback')} className={`flex-1 ${activeTab === 'feedback' ? 'bg-white/20 border-b-2 border-blue-400' : 'text-white/70 hover:text-white'}`}>
          <MessageSquare className="w-4 h-4 mr-2" />
          反馈收集
        </Button>
      </div>

      {/* 评价展示内容 */}
      {activeTab === 'reviews' && <div className="space-y-8">
          {/* 评分统计概览 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {renderStatCard('基于 2,456 条评价', reviewStats.averageRating, Star, 'bg-yellow-500', renderStars(reviewStats.averageRating))}
            {renderStatCard('推荐率', `${reviewStats.recommendationRate}%`, ThumbsUp, 'bg-green-500')}
            {renderStatCard('本月新增评价', reviewStats.monthlyReviews, MessageSquare, 'bg-blue-500')}
            {renderStatCard('平均回复时间', reviewStats.averageResponseTime, History, 'bg-purple-500')}
          </div>

          {/* 筛选和排序 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {['all', '5', '4', '3', 'hasImage', 'verified'].map(rating => <Button key={rating} variant="ghost" size="sm" onClick={() => handleFilterChange(rating)} className={`px-3 py-1 rounded-full text-sm ${selectedRating === rating ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/30'}`}>
                      {rating === 'all' ? '全部' : rating === 'hasImage' ? '有图' : rating === 'verified' ? '已验证购买' : `${rating}星`}
                    </Button>)}
                </div>
                <div className="flex items-center space-x-4">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                    <option value="latest">最新评价</option>
                    <option value="rating">评分最高</option>
                    <option value="helpful">最有帮助</option>
                    <option value="verified">已验证购买</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="搜索评价..." className="bg-white/10 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 评价列表 */}
          <div className="space-y-6">
            {reviews.map(renderReviewCard)}
          </div>
          
          {/* 分页 */}
          <div className="flex items-center justify-center space-x-2">
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
        </div>}

      {/* 评分统计内容 */}
      {activeTab === 'stats' && <div className="space-y-8">
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

          {/* 趋势分析 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">评价趋势分析</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">月度评价趋势</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                      <p className="text-white/60">月度评价趋势图表</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">产品评分对比</h3>
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-24 h-24 text-green-400 mx-auto mb-4" />
                      <p className="text-white/60">产品评分对比图表</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}

      {/* 反馈收集内容 */}
      {activeTab === 'feedback' && <div className="space-y-8">
          {/* 反馈类型选择 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">选择反馈类型</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feedbackTypes.map(renderFeedbackTypeCard)}
              </div>
            </CardContent>
          </Card>

          {/* 反馈表单 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">提交反馈</h2>
              
              <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm mb-2 block">反馈类型</label>
                    <select value={feedbackType} onChange={e => setFeedbackType(e.target.value)} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                      <option value="">请选择反馈类型</option>
                      {feedbackTypes.map(type => <option key={type.value} value={type.value} className="bg-gray-800">
                          {type.label}
                        </option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white text-sm mb-2 block">相关产品</label>
                    <select className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                      <option value="">请选择相关产品</option>
                      {productOptions.map(option => <option key={option.value} value={option.value} className="bg-gray-800">
                          {option.label}
                        </option>)}
                      <option value="all" className="bg-gray-800">全部产品</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">反馈标题</label>
                  <input type="text" value={feedbackTitle} onChange={e => setFeedbackTitle(e.target.value)} placeholder="请简要描述您的反馈" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">详细描述</label>
                  <textarea value={feedbackContent} onChange={e => setFeedbackContent(e.target.value)} placeholder="请详细描述您的问题或建议..." rows={6} className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">上传截图</label>
                  <div className="upload-area border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-400/10 transition-all" onClick={handleUploadClick} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">点击或拖拽图片到此处上传</p>
                    <p className="text-white/40 text-sm">支持 JPG、PNG 格式，最多上传5张图片</p>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                  </div>
                  {uploadedImages.length > 0 && <div className="mt-4 flex flex-wrap gap-2">
                      {uploadedImages.map((image, index) => <div key={index} className="bg-white/10 rounded-lg p-2">
                          <img src={URL.createObjectURL(image)} alt={`上传图片${index + 1}`} className="w-16 h-16 object-cover rounded" />
                        </div>)}
                    </div>}
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">联系方式</label>
                  <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="请输入您的邮箱地址" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <PaperPlane className="w-4 h-4 mr-2" />
                    提交反馈
                  </Button>
                  <Button type="button" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
                    <History className="w-4 h-4 mr-2" />
                    查看历史
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>}
    </div>;
};