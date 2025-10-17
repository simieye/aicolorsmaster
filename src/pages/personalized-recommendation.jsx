// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Sparkles, User, Palette, Camera, Heart, Star, TrendingUp, Clock, Filter, Search, Settings, ChevronRight, CheckCircle, XCircle, AlertCircle, BarChart3, Target, Zap, Award, ThumbsUp, ThumbsDown, Share2, Bookmark, Eye, MessageCircle, Globe } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function PersonalizedRecommendation(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();

  // 状态管理
  const [activeTab, setActiveTab] = useState('recommendations');
  const [userProfile, setUserProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorDetail, setShowColorDetail] = useState(false);
  const [showSkinAnalysis, setShowSkinAnalysis] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');

  // 支持的语言列表
  const languages = [{
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳'
  }, {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵'
  }, {
    code: 'ko-KR',
    name: '한국어',
    flag: '🇰🇷'
  }];

  // 多语言文本
  const getText = key => {
    const texts = {
      'zh-CN': {
        title: '个性化推荐',
        subtitle: '基于AI算法的智能色彩推荐系统',
        recommendations: '智能推荐',
        history: '历史记录',
        feedback: '反馈中心',
        trends: '流行趋势',
        personalizedColorRecommendation: '个性化色彩推荐',
        preferenceSettings: '偏好设置',
        skinAnalysis: '肤色分析',
        satisfaction: '满意度',
        historyCount: '历史记录',
        highMatch: '高匹配度',
        favoriteCount: '收藏数量',
        skinToneFeatures: '您的肤色特征',
        skinTone: '肤色色调',
        undertone: '底色调',
        contrast: '对比度',
        analysisConfidence: '分析置信度',
        recommendedColorTypes: '推荐色彩类型',
        reanalyze: '重新分析',
        searchColor: '搜索色彩...',
        allCategories: '全部分类',
        filter: '筛选',
        match: '匹配',
        viewDetails: '查看详情',
        share: '分享',
        collect: '收藏',
        collected: '已收藏',
        colorInfo: '色彩信息',
        colorCode: '色号',
        category: '分类',
        difficulty: '难度',
        priceRange: '价格区间',
        recommendationReason: '推荐理由',
        popularTrends: '流行趋势',
        suitableOccasions: '适用场合',
        smartSkinAnalysis: '智能肤色分析',
        basedOnAI: '基于AI技术的精准肤色识别',
        analysisResult: '分析结果',
        recommendedColors: '推荐色彩',
        complete: '完成',
        reanalyzeAgain: '重新分析',
        uploadClearPhoto: '请上传清晰的面部照片',
        stylePreference: '风格偏好',
        usageOccasions: '使用场合',
        budgetRange: '预算范围',
        maintenanceFrequency: '维护频率',
        saveSettings: '保存设置',
        cancel: '取消',
        yourHistoryRecords: '您的历史染发记录将在这里显示',
        viewManageFeedback: '查看和管理您的反馈记录',
        latestColorTrends: '了解最新的染发色彩趋势',
        collectSuccess: '收藏成功',
        collectSuccessDesc: '已添加到收藏夹',
        feedbackSuccess: '反馈成功',
        feedbackSuccessDesc: '感谢您的反馈',
        shareSuccess: '分享成功',
        shareSuccessDesc: '正在分享色彩推荐',
        analyzing: '正在进行智能肤色分析...',
        fashionTrend: '时尚潮流',
        gentleSweet: '温柔甜美',
        freshNatural: '清新自然',
        naturalElegant: '自然优雅',
        personalityDistinct: '个性鲜明',
        daily: '日常',
        work: '工作',
        party: '聚会',
        date: '约会',
        vacation: '度假',
        sports: '运动',
        simple: '简单',
        medium: '中等',
        lowMaintenance: '低维护',
        months: '个月'
      },
      'en-US': {
        title: 'Personalized Recommendations',
        subtitle: 'AI-powered intelligent color recommendation system',
        recommendations: 'Smart Recommendations',
        history: 'History',
        feedback: 'Feedback Center',
        trends: 'Trends',
        personalizedColorRecommendation: 'Personalized Color Recommendation',
        preferenceSettings: 'Preference Settings',
        skinAnalysis: 'Skin Analysis',
        satisfaction: 'Satisfaction',
        historyCount: 'History Count',
        highMatch: 'High Match',
        favoriteCount: 'Favorite Count',
        skinToneFeatures: 'Your Skin Tone Features',
        skinTone: 'Skin Tone',
        undertone: 'Undertone',
        contrast: 'Contrast',
        analysisConfidence: 'Analysis Confidence',
        recommendedColorTypes: 'Recommended Color Types',
        reanalyze: 'Reanalyze',
        searchColor: 'Search colors...',
        allCategories: 'All Categories',
        filter: 'Filter',
        match: 'Match',
        viewDetails: 'View Details',
        share: 'Share',
        collect: 'Collect',
        collected: 'Collected',
        colorInfo: 'Color Information',
        colorCode: 'Color Code',
        category: 'Category',
        difficulty: 'Difficulty',
        priceRange: 'Price Range',
        recommendationReason: 'Recommendation Reason',
        popularTrends: 'Popular Trends',
        suitableOccasions: 'Suitable Occasions',
        smartSkinAnalysis: 'Smart Skin Analysis',
        basedOnAI: 'Precise skin tone recognition based on AI technology',
        analysisResult: 'Analysis Result',
        recommendedColors: 'Recommended Colors',
        complete: 'Complete',
        reanalyzeAgain: 'Reanalyze',
        uploadClearPhoto: 'Please upload a clear facial photo',
        stylePreference: 'Style Preference',
        usageOccasions: 'Usage Occasions',
        budgetRange: 'Budget Range',
        maintenanceFrequency: 'Maintenance Frequency',
        saveSettings: 'Save Settings',
        cancel: 'Cancel',
        yourHistoryRecords: 'Your hair dye history will be displayed here',
        viewManageFeedback: 'View and manage your feedback records',
        latestColorTrends: 'Learn about the latest hair color trends',
        collectSuccess: 'Collection Successful',
        collectSuccessDesc: 'Added to favorites',
        feedbackSuccess: 'Feedback Successful',
        feedbackSuccessDesc: 'Thank you for your feedback',
        shareSuccess: 'Share Successful',
        shareSuccessDesc: 'Sharing color recommendation...',
        analyzing: 'Performing intelligent skin analysis...',
        fashionTrend: 'Fashion Trend',
        gentleSweet: 'Gentle Sweet',
        freshNatural: 'Fresh Natural',
        naturalElegant: 'Natural Elegant',
        personalityDistinct: 'Personality Distinct',
        daily: 'Daily',
        work: 'Work',
        party: 'Party',
        date: 'Date',
        vacation: 'Vacation',
        sports: 'Sports',
        simple: 'Simple',
        medium: 'Medium',
        lowMaintenance: 'Low Maintenance',
        months: 'months'
      },
      'ja-JP': {
        title: 'パーソナライズ推薦',
        subtitle: 'AIアルゴリズムベースのインテリジェント色彩推薦システム',
        recommendations: 'スマート推薦',
        history: '履歴',
        feedback: 'フィードバックセンター',
        trends: 'トレンド',
        personalizedColorRecommendation: 'パーソナライズ色彩推薦',
        preferenceSettings: '設定設定',
        skinAnalysis: '肌色分析',
        satisfaction: '満足度',
        historyCount: '履歴数',
        highMatch: '高マッチ',
        favoriteCount: 'お気に入り数',
        skinToneFeatures: 'あなたの肌色特徴',
        skinTone: '肌色トーン',
        undertone: 'アンダートーン',
        contrast: 'コントラスト',
        analysisConfidence: '分析信頼度',
        recommendedColorTypes: '推薦色彩タイプ',
        reanalyze: '再分析',
        searchColor: '色彩を検索...',
        allCategories: '全カテゴリ',
        filter: 'フィルター',
        match: 'マッチ',
        viewDetails: '詳細を見る',
        share: '共有',
        collect: 'コレクション',
        collected: 'コレクション済み',
        colorInfo: '色彩情報',
        colorCode: 'カラーコード',
        category: 'カテゴリ',
        difficulty: '難易度',
        priceRange: '価格帯',
        recommendationReason: '推薦理由',
        popularTrends: '人気トレンド',
        suitableOccasions: '適切な場面',
        smartSkinAnalysis: 'スマート肌色分析',
        basedOnAI: 'AI技術ベースの精密肌色認識',
        analysisResult: '分析結果',
        recommendedColors: '推薦色彩',
        complete: '完了',
        reanalyzeAgain: '再分析',
        uploadClearPhoto: '鮮明な顔写真をアップロードしてください',
        stylePreference: 'スタイル設定',
        usageOccasions: '使用場面',
        budgetRange: '予算帯',
        maintenanceFrequency: 'メンテナンス頻度',
        saveSettings: '設定を保存',
        cancel: 'キャンセル',
        yourHistoryRecords: 'あなたのヘアダイ履歴がここに表示されます',
        viewManageFeedback: 'フィードバック記録を表示・管理',
        latestColorTrends: '最新のヘアカラートレンドを学ぶ',
        collectSuccess: 'コレクション成功',
        collectSuccessDesc: 'お気に入りに追加されました',
        feedbackSuccess: 'フィードバック成功',
        feedbackSuccessDesc: 'フィードバックありがとうございます',
        shareSuccess: '共有成功',
        shareSuccessDesc: '色彩推薦を共有中...',
        analyzing: 'インテリジェント肌色分析を実行中...',
        fashionTrend: 'ファッショントレンド',
        gentleSweet: '優しい甘い',
        freshNatural: 'フレッシュナチュラル',
        naturalElegant: 'ナチュラルエレガント',
        personalityDistinct: '個性鮮明',
        daily: '日常',
        work: '仕事',
        party: 'パーティー',
        date: 'デート',
        vacation: '休暇',
        sports: 'スポーツ',
        simple: 'シンプル',
        medium: 'ミディアム',
        lowMaintenance: '低メンテナンス',
        months: 'ヶ月'
      },
      'ko-KR': {
        title: '개인화 추천',
        subtitle: 'AI 알고리즘 기반 지능형 색상 추천 시스템',
        recommendations: '스마트 추천',
        history: '기록',
        feedback: '피드백 센터',
        trends: '트렌드',
        personalizedColorRecommendation: '개인화 색상 추천',
        preferenceSettings: '선호도 설정',
        skinAnalysis: '피부톤 분석',
        satisfaction: '만족도',
        historyCount: '기록 수',
        highMatch: '높은 일치',
        favoriteCount: '즐겨찾기 수',
        skinToneFeatures: '당신의 피부톤 특징',
        skinTone: '피부톤',
        undertone: '언더톤',
        contrast: '대비',
        analysisConfidence: '분석 신뢰도',
        recommendedColorTypes: '추천 색상 타입',
        reanalyze: '재분석',
        searchColor: '색상 검색...',
        allCategories: '모든 카테고리',
        filter: '필터',
        match: '일치',
        viewDetails: '상세 보기',
        share: '공유',
        collect: '수집',
        collected: '수집됨',
        colorInfo: '색상 정보',
        colorCode: '색상 코드',
        category: '카테고리',
        difficulty: '난이도',
        priceRange: '가격대',
        recommendationReason: '추천 이유',
        popularTrends: '인기 트렌드',
        suitableOccasions: '적합한 상황',
        smartSkinAnalysis: '스마트 피부톤 분석',
        basedOnAI: 'AI 기술 기반 정밀 피부톤 인식',
        analysisResult: '분석 결과',
        recommendedColors: '추천 색상',
        complete: '완료',
        reanalyzeAgain: '재분석',
        uploadClearPhoto: '선명한 얼굴 사진을 업로드하세요',
        stylePreference: '스타일 선호도',
        usageOccasions: '사용 상황',
        budgetRange: '예산 범위',
        maintenanceFrequency: '유지보수 빈도',
        saveSettings: '설정 저장',
        cancel: '취소',
        yourHistoryRecords: '당신의 염색 기록이 여기에 표시됩니다',
        viewManageFeedback: '피드백 기록 보기 및 관리',
        latestColorTrends: '최신 헤어 컬러 트렌드 알아보기',
        collectSuccess: '수집 성공',
        collectSuccessDesc: '즐겨찾기에 추가됨',
        feedbackSuccess: '피드백 성공',
        feedbackSuccessDesc: '피드백 감사합니다',
        shareSuccess: '공유 성공',
        shareSuccessDesc: '색상 추천 공유 중...',
        analyzing: '지능형 피부톤 분석 수행 중...',
        fashionTrend: '패션 트렌드',
        gentleSweet: '부드러운 달콤함',
        freshNatural: '상쾌한 자연',
        naturalElegant: '자연스러운 우아함',
        personalityDistinct: '개성 뚜렷함',
        daily: '일상',
        work: '업무',
        party: '파티',
        date: '데이트',
        vacation: '휴가',
        sports: '스포츠',
        simple: '간단',
        medium: '중간',
        lowMaintenance: '낮은 유지보수',
        months: '개월'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key] || key;
  };

  // 初始化数据
  useEffect(() => {
    // 模拟用户画像数据
    setUserProfile({
      name: '时尚达人',
      age: 25,
      skinTone: '暖色调',
      style: '时尚潮流',
      profession: '创意工作者',
      preferences: ['大胆创新', '时尚前卫', '个性鲜明'],
      historyCount: 12,
      satisfactionRate: 92,
      lastUpdate: '2024-01-15'
    });

    // 模拟推荐数据
    setRecommendations([{
      id: 1,
      name: '微潮紫',
      hex: '#9B59B6',
      category: getText('fashionTrend'),
      match: 95,
      reason: '适合您的暖色调肤色，符合时尚前卫风格',
      trends: ['2024春季流行', '明星同款', '社交媒体热门'],
      occasions: [getText('daily'), getText('party'), getText('work')],
      difficulty: getText('medium'),
      price: '¥280-380',
      image: 'https://images.unsplash.com/photo-1560066985-274c6a8a3f5a?w=300&h=400&fit=crop',
      favorite: false,
      feedback: {
        likes: 245,
        dislikes: 12,
        comments: 38
      }
    }, {
      id: 2,
      name: '樱花粉',
      hex: '#FFB6C1',
      category: getText('gentleSweet'),
      match: 88,
      reason: '温柔甜美风格，适合春季氛围',
      trends: ['春季主打', '韩流风尚', '温柔系'],
      occasions: [getText('date'), '购物', getText('leisure')],
      difficulty: getText('simple'),
      price: '¥200-300',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop',
      favorite: true,
      feedback: {
        likes: 189,
        dislikes: 8,
        comments: 25
      }
    }, {
      id: 3,
      name: '薄荷绿',
      hex: '#98FB98',
      category: getText('freshNatural'),
      match: 82,
      reason: '清新自然，适合春夏季节',
      trends: ['夏季清新', '自然风', '小众推荐'],
      occasions: [getText('vacation'), getText('outdoor'), getText('sports')],
      difficulty: getText('simple'),
      price: '¥180-280',
      image: 'https://images.unsplash.com/photo-1559568495-17e4a6ca8c0f?w=300&h=400&fit=crop',
      favorite: false,
      feedback: {
        likes: 156,
        dislikes: 15,
        comments: 19
      }
    }, {
      id: 4,
      name: '焦糖棕',
      hex: '#CD853F',
      category: getText('naturalElegant'),
      match: 78,
      reason: '自然优雅，适合职场环境',
      trends: ['职场经典', '成熟稳重', '百搭色'],
      occasions: [getText('work'), '商务', '正式'],
      difficulty: getText('simple'),
      price: '¥150-250',
      image: 'https://images.unsplash.com/photo-1559409645-6e5d2b0c2a5a?w=300&h=400&fit=crop',
      favorite: false,
      feedback: {
        likes: 203,
        dislikes: 6,
        comments: 31
      }
    }]);

    // 模拟肤色分析数据
    setSkinAnalysis({
      skinTone: '暖色调',
      undertone: '黄色调',
      contrast: '中等对比度',
      suitableColors: ['暖色系', '大地色系', '柔和色调'],
      avoidColors: ['冷色系', '过于鲜艳的颜色'],
      bestMatches: ['微潮紫', '焦糖棕', '奶茶色'],
      analysisDate: '2024-01-15',
      confidence: 94
    });

    // 模拟偏好设置数据
    setPreferences({
      style: [getText('fashionTrend'), getText('personalityDistinct')],
      occasions: [getText('daily'), getText('party'), getText('work')],
      colorFamilies: ['紫色系', '粉色系', '棕色系'],
      intensity: getText('medium'),
      maintenance: getText('lowMaintenance'),
      budget: '200-400',
      frequency: '3-6' + getText('months')
    });

    // 模拟反馈数据
    setFeedback([{
      id: 1,
      colorName: '微潮紫',
      rating: 5,
      comment: '非常满意！颜色很衬肤色，朋友都说好看',
      date: '2024-01-15',
      helpful: 12
    }, {
      id: 2,
      colorName: '樱花粉',
      rating: 4,
      comment: '颜色很温柔，就是保持时间有点短',
      date: '2024-01-12',
      helpful: 8
    }]);
  }, [selectedLanguage]);

  // 处理色彩选择
  const handleColorSelect = color => {
    setSelectedColor(color);
    setShowColorDetail(true);
  };

  // 处理收藏
  const handleFavorite = colorId => {
    setRecommendations(prev => prev.map(color => color.id === colorId ? {
      ...color,
      favorite: !color.favorite
    } : color));
    toast({
      title: getText('collectSuccess'),
      description: getText('collectSuccessDesc')
    });
  };

  // 处理反馈
  const handleFeedback = (colorId, type) => {
    setRecommendations(prev => prev.map(color => {
      if (color.id === colorId) {
        if (type === 'like') {
          return {
            ...color,
            feedback: {
              ...color.feedback,
              likes: color.feedback.likes + 1
            }
          };
        } else {
          return {
            ...color,
            feedback: {
              ...color.feedback,
              dislikes: color.feedback.dislikes + 1
            }
          };
        }
      }
      return color;
    }));
    toast({
      title: getText('feedbackSuccess'),
      description: getText('feedbackSuccessDesc')
    });
  };

  // 处理分享
  const handleShare = color => {
    toast({
      title: getText('shareSuccess'),
      description: getText('shareSuccessDesc')
    });
  };

  // 处理肤色分析
  const handleSkinAnalysis = () => {
    setShowSkinAnalysis(true);
    toast({
      title: getText('skinAnalysis'),
      description: getText('analyzing')
    });
  };

  // 处理偏好设置
  const handlePreferences = () => {
    setShowPreferences(true);
  };

  // 过滤推荐
  const filteredRecommendations = recommendations.filter(color => {
    const matchesSearch = color.name.toLowerCase().includes(searchTerm.toLowerCase()) || color.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || color.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // 渲染推荐列表
  const renderRecommendations = () => {
    return <div className="space-y-6">
        {/* 用户画像卡片 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{userProfile?.name}</h3>
                  <p className="text-sm text-gray-600">{getText('personalizedColorRecommendation')}</p>
                </div>
              </div>
              <Button onClick={handlePreferences} variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                {getText('preferenceSettings')}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{userProfile?.satisfactionRate}%</p>
                <p className="text-sm text-gray-600">{getText('satisfaction')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{userProfile?.historyCount}</p>
                <p className="text-sm text-gray-600">{getText('historyCount')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{recommendations.filter(r => r.match >= 90).length}</p>
                <p className="text-sm text-gray-600">{getText('highMatch')}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{recommendations.filter(r => r.favorite).length}</p>
                <p className="text-sm text-gray-600">{getText('favoriteCount')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 肤色分析卡片 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Camera className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold">{getText('skinAnalysis')}</h3>
              </div>
              <Button onClick={handleSkinAnalysis} className="bg-purple-600 hover:bg-purple-700">
                <Camera className="w-4 h-4 mr-2" />
                {getText('reanalyze')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">{getText('skinToneFeatures')}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{getText('skinTone')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.skinTone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{getText('undertone')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.undertone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{getText('contrast')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.contrast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{getText('analysisConfidence')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.confidence}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">{getText('recommendedColorTypes')}</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{skinAnalysis?.suitableColors.join('、')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{skinAnalysis?.avoidColors.join('、')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder={getText('searchColor')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              
              <div className="flex space-x-2">
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="all">{getText('allCategories')}</option>
                  <option value={getText('fashionTrend')}>{getText('fashionTrend')}</option>
                  <option value={getText('gentleSweet')}>{getText('gentleSweet')}</option>
                  <option value={getText('freshNatural')}>{getText('freshNatural')}</option>
                  <option value={getText('naturalElegant')}>{getText('naturalElegant')}</option>
                </select>
                
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  {getText('filter')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 推荐色彩列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map(color => <Card key={color.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img src={color.image} alt={color.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium">{color.match}% {getText('match')}</span>
                  </div>
                  <button onClick={() => handleFavorite(color.id)} className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className={`w-4 h-4 ${color.favorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{color.name}</h3>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300" style={{
                  backgroundColor: color.hex
                }}></div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {color.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {color.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{color.reason}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{color.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{(color.feedback.likes / (color.feedback.likes + color.feedback.dislikes) * 5).toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={() => handleColorSelect(color)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Eye className="w-4 h-4 mr-2" />
                      {getText('viewDetails')}
                    </Button>
                    <Button onClick={() => handleShare(color)} variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-3">
                      <button onClick={() => handleFeedback(color.id, 'like')} className="flex items-center space-x-1 text-green-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{color.feedback.likes}</span>
                      </button>
                      <button onClick={() => handleFeedback(color.id, 'dislike')} className="flex items-center space-x-1 text-red-600">
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm">{color.feedback.dislikes}</span>
                      </button>
                    </div>
                    <button className="flex items-center space-x-1 text-blue-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{color.feedback.comments}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>;
  };

  // 渲染色彩详情
  const renderColorDetail = () => {
    if (!selectedColor) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{selectedColor.name}</h3>
              <button onClick={() => setShowColorDetail(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={selectedColor.image} alt={selectedColor.name} className="w-full h-64 object-cover rounded-lg" />
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-300" style={{
                  backgroundColor: selectedColor.hex
                }}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{getText('colorInfo')}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{getText('colorCode')}</span>
                      <span className="text-sm font-medium">{selectedColor.hex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{getText('category')}</span>
                      <span className="text-sm font-medium">{selectedColor.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{getText('difficulty')}</span>
                      <span className="text-sm font-medium">{selectedColor.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{getText('priceRange')}</span>
                      <span className="text-sm font-medium">{selectedColor.price}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{getText('recommendationReason')}</h4>
                  <p className="text-sm text-gray-600">{selectedColor.reason}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{getText('popularTrends')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedColor.trends.map((trend, index) => <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {trend}
                      </span>)}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{getText('suitableOccasions')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedColor.occasions.map((occasion, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {occasion}
                      </span>)}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={() => handleFavorite(selectedColor.id)} className="flex-1">
                    <Heart className={`w-4 h-4 mr-2 ${selectedColor.favorite ? 'fill-current' : ''}`} />
                    {selectedColor.favorite ? getText('collected') : getText('collect')}
                  </Button>
                  <Button onClick={() => handleShare(selectedColor)} variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    {getText('share')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };

  // 渲染肤色分析弹窗
  const renderSkinAnalysisModal = () => {
    if (!showSkinAnalysis) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{getText('skinAnalysis')}</h3>
              <button onClick={() => setShowSkinAnalysis(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-16 h-16 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{getText('smartSkinAnalysis')}</h4>
              <p className="text-sm text-gray-600">{getText('basedOnAI')}</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium mb-2">{getText('analysisResult')}</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{getText('skinTone')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.skinTone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">{getText('undertone')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.undertone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">{getText('contrast')}</span>
                    <span className="text-sm font-medium">{skinAnalysis?.contrast}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-medium mb-2">{getText('recommendedColors')}</h5>
                <div className="flex flex-wrap gap-2">
                  {skinAnalysis?.bestMatches.map((color, index) => <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {color}
                    </span>)}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={() => setShowSkinAnalysis(false)} className="flex-1">
                  {getText('complete')}
                </Button>
                <Button onClick={() => {
                setShowSkinAnalysis(false);
                toast({
                  title: getText('reanalyze'),
                  description: getText('uploadClearPhoto')
                });
              }} variant="outline" className="flex-1">
                  {getText('reanalyzeAgain')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };

  // 渲染偏好设置弹窗
  const renderPreferencesModal = () => {
    if (!showPreferences) return null;
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{getText('preferenceSettings')}</h3>
              <button onClick={() => setShowPreferences(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">{getText('stylePreference')}</h4>
                <div className="space-y-2">
                  {[getText('fashionTrend'), getText('gentleSweet'), getText('freshNatural'), getText('naturalElegant'), getText('personalityDistinct')].map(style => <label key={style} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={preferences?.style.includes(style)} className="rounded" />
                      <span className="text-sm">{style}</span>
                    </label>)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">{getText('usageOccasions')}</h4>
                <div className="space-y-2">
                  {[getText('daily'), getText('work'), getText('party'), getText('date'), getText('vacation'), getText('sports')].map(occasion => <label key={occasion} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={preferences?.occasions.includes(occasion)} className="rounded" />
                      <span className="text-sm">{occasion}</span>
                    </label>)}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">{getText('budgetRange')}</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>100-200</option>
                  <option>200-400</option>
                  <option>400-600</option>
                  <option>600+</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">{getText('maintenanceFrequency')}</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>1-2{getText('months')}</option>
                  <option>3-6{getText('months')}</option>
                  <option>6-12{getText('months')}</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={() => setShowPreferences(false)} className="flex-1">
                  {getText('saveSettings')}
                </Button>
                <Button onClick={() => setShowPreferences(false)} variant="outline" className="flex-1">
                  {getText('cancel')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  };
  return <>
      <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
        <div className="container mx-auto px-4 py-8">
          {/* 页面头部 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{getText('title')}</h1>
              <p className="text-gray-600">{getText('subtitle')}</p>
            </div>
            
            {/* 语言切换 */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {languages.map(lang => <button key={lang.code} onClick={() => setSelectedLanguage(lang.code)} className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${selectedLanguage === lang.code ? 'bg-purple-50' : ''}`}>
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>)}
              </div>
            </div>
          </div>

          {/* 标签导航 */}
          <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {[{
              id: 'recommendations',
              name: getText('recommendations'),
              icon: Sparkles
            }, {
              id: 'history',
              name: getText('history'),
              icon: Clock
            }, {
              id: 'feedback',
              name: getText('feedback'),
              icon: MessageCircle
            }, {
              id: 'trends',
              name: getText('trends'),
              icon: TrendingUp
            }].map(tab => {
              const Icon = tab.icon;
              return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>;
            })}
            </div>
          </div>

          {/* 内容区域 */}
          {activeTab === 'recommendations' && renderRecommendations()}
          {activeTab === 'history' && <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{getText('history')}</h3>
              <p className="text-gray-600">{getText('yourHistoryRecords')}</p>
            </div>}
          {activeTab === 'feedback' && <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{getText('feedback')}</h3>
              <p className="text-gray-600">{getText('viewManageFeedback')}</p>
            </div>}
          {activeTab === 'trends' && <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{getText('trends')}</h3>
              <p className="text-gray-600">{getText('latestColorTrends')}</p>
            </div>}
        </div>
      </div>

      {/* 色彩详情弹窗 */}
      {showColorDetail && renderColorDetail()}

      {/* 肤色分析弹窗 */}
      {showSkinAnalysis && renderSkinAnalysisModal()}

      {/* 偏好设置弹窗 */}
      {showPreferences && renderPreferencesModal()}

      {/* 底部导航 */}
      <TabBar currentPage="personalized-recommendation" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </>;
}