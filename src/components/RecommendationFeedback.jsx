// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';
// @ts-ignore;
import { ThumbsUp, ThumbsDown, MessageSquare, X, Eye, EyeOff, Heart, Star, AlertCircle, CheckCircle, Send, ChevronDown, ChevronUp, Flag, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

// @ts-ignore;
export function RecommendationFeedback({
  recommendationId,
  productId,
  productName,
  algorithm,
  confidence,
  onFeedbackSubmit,
  className = "",
  showDetailed = false
}) {
  const {
    toast
  } = useToast();
  const [feedback, setFeedback] = useState({
    like: null,
    notInterested: false,
    detailed: false,
    reason: '',
    rating: 0,
    comment: ''
  });
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    loadFeedbackHistory();
  }, [recommendationId]);
  const loadFeedbackHistory = async () => {
    try {
      // 模拟加载反馈历史
      const mockHistory = [{
        id: 'fb_001',
        type: 'like',
        timestamp: '2024-01-20 10:30:00',
        reason: '推荐很准确'
      }, {
        id: 'fb_002',
        type: 'dislike',
        timestamp: '2024-01-19 15:45:00',
        reason: '价格过高'
      }];
      setFeedbackHistory(mockHistory);
    } catch (error) {
      console.error('加载反馈历史失败:', error);
    }
  };
  const handleLike = async () => {
    if (feedback.like === true) {
      // 取消点赞
      setFeedback(prev => ({
        ...prev,
        like: null
      }));
      await submitFeedback('like', false);
    } else {
      // 点赞
      setFeedback(prev => ({
        ...prev,
        like: true,
        notInterested: false
      }));
      await submitFeedback('like', true);
    }
  };
  const handleDislike = async () => {
    if (feedback.like === false) {
      // 取消点踩
      setFeedback(prev => ({
        ...prev,
        like: null
      }));
      await submitFeedback('dislike', false);
    } else {
      // 点踩
      setFeedback(prev => ({
        ...prev,
        like: false,
        notInterested: false
      }));
      setShowDetails(true);
    }
  };
  const handleNotInterested = async () => {
    setFeedback(prev => ({
      ...prev,
      notInterested: !prev.notInterested,
      like: null
    }));
    await submitFeedback('not_interested', !feedback.notInterested);
  };
  const submitFeedback = async (type, value) => {
    setIsSubmitting(true);
    try {
      const feedbackData = {
        recommendation_id: recommendationId,
        product_id: productId,
        product_name: productName,
        algorithm: algorithm,
        confidence: confidence,
        feedback_type: type,
        feedback_value: value,
        reason: feedback.reason,
        rating: feedback.rating,
        comment: feedback.comment,
        timestamp: new Date().toISOString()
      };

      // 调用API保存反馈
      console.log('提交反馈:', feedbackData);
      toast({
        title: "反馈成功",
        description: "感谢您的反馈，我们将持续优化推荐算法"
      });
      if (onFeedbackSubmit) {
        onFeedbackSubmit(feedbackData);
      }
    } catch (error) {
      console.error('提交反馈失败:', error);
      toast({
        title: "反馈失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDetailedFeedback = async () => {
    if (!feedback.reason && !feedback.comment && feedback.rating === 0) {
      toast({
        title: "请提供反馈",
        description: "请选择原因或填写评论",
        variant: "destructive"
      });
      return;
    }
    await submitFeedback('detailed', {
      reason: feedback.reason,
      rating: feedback.rating,
      comment: feedback.comment
    });
    setShowDetails(false);
    setFeedback(prev => ({
      ...prev,
      reason: '',
      rating: 0,
      comment: ''
    }));
  };
  const feedbackReasons = ['价格过高', '不感兴趣', '已购买过', '质量不好', '不符合需求', '推荐重复', '信息不准确', '其他'];
  return <div className={`space-y-2 ${className}`}>
      {/* 快速反馈按钮 */}
      <div className="flex items-center space-x-2">
        <Button variant={feedback.like === true ? "default" : "outline"} size="sm" onClick={handleLike} disabled={isSubmitting} className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4" />
          <span>有用</span>
          {feedback.like === true && <CheckCircle className="w-3 h-3 ml-1" />}
        </Button>

        <Button variant={feedback.like === false ? "default" : "outline"} size="sm" onClick={handleDislike} disabled={isSubmitting} className="flex items-center space-x-1">
          <ThumbsDown className="w-4 h-4" />
          <span>没用</span>
          {feedback.like === false && <X className="w-3 h-3 ml-1" />}
        </Button>

        <Button variant={feedback.notInterested ? "default" : "outline"} size="sm" onClick={handleNotInterested} disabled={isSubmitting} className="flex items-center space-x-1">
          <EyeOff className="w-4 h-4" />
          <span>不感兴趣</span>
          {feedback.notInterested && <CheckCircle className="w-3 h-3 ml-1" />}
        </Button>

        <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)} className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4" />
          <span>详细反馈</span>
        </Button>

        {showDetailed && <Button variant="outline" size="sm" onClick={() => setShowHistory(!showHistory)} className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>历史</span>
          </Button>}
      </div>

      {/* 详细反馈面板 */}
      {showDetails && <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">详细反馈</h4>
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* 反馈原因选择 */}
            <div>
              <label className="block text-sm font-medium mb-2">反馈原因</label>
              <div className="grid grid-cols-2 gap-2">
                {feedbackReasons.map(reason => <Button key={reason} variant={feedback.reason === reason ? "default" : "outline"} size="sm" onClick={() => setFeedback(prev => ({
              ...prev,
              reason
            }))} className="text-xs justify-start">
                    {reason}
                  </Button>)}
              </div>
            </div>

            {/* 评分 */}
            <div>
              <label className="block text-sm font-medium mb-2">推荐质量评分</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(star => <button key={star} onClick={() => setFeedback(prev => ({
              ...prev,
              rating: star
            }))} className="p-1">
                    <Star className={`w-5 h-5 ${star <= feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                  </button>)}
                <span className="ml-2 text-sm text-muted-foreground">
                  {feedback.rating > 0 ? `${feedback.rating}/5` : '请评分'}
                </span>
              </div>
            </div>

            {/* 评论 */}
            <div>
              <label className="block text-sm font-medium mb-2">详细评论</label>
              <textarea value={feedback.comment} onChange={e => setFeedback(prev => ({
            ...prev,
            comment: e.target.value
          }))} placeholder="请分享您的想法..." rows={3} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>

            {/* 提交按钮 */}
            <div className="flex space-x-2">
              <Button onClick={handleDetailedFeedback} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? '提交中...' : <>
                    <Send className="w-4 h-4 mr-2" />
                    提交反馈
                  </>}
              </Button>
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>}

      {/* 反馈历史 */}
      {showHistory && feedbackHistory.length > 0 && <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">反馈历史</h4>
              <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {feedbackHistory.map(item => <div key={item.id} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                  <div className="flex items-center space-x-2">
                    {item.type === 'like' && <ThumbsUp className="w-4 h-4 text-green-500" />}
                    {item.type === 'dislike' && <ThumbsDown className="w-4 h-4 text-red-500" />}
                    {item.type === 'not_interested' && <EyeOff className="w-4 h-4 text-gray-500" />}
                    <span>{item.reason}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                </div>)}
            </div>
          </CardContent>
        </Card>}
    </div>;
}