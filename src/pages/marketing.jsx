// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, Users, Eye, Heart, Share2, MessageCircle, Target, BarChart3, Zap, Edit, Copy, Download, Star, Clock, ArrowUp, ArrowDown } from 'lucide-react';

export default function Marketing(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('wechat');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [abTestData, setAbTestData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roiData, setRoiData] = useState(null);
  const [products] = useState([{
    id: 1,
    name: '微潮紫渐变',
    category: '微潮色系',
    popularity: 95,
    conversionRate: 12.5,
    revenue: 45600
  }, {
    id: 2,
    name: '樱花粉日系',
    category: '日系色',
    popularity: 88,
    conversionRate: 10.2,
    revenue: 38900
  }, {
    id: 3,
    name: '薄荷绿清新',
    category: '潮色系',
    popularity: 76,
    conversionRate: 8.8,
    revenue: 32100
  }]);
  const [platforms] = useState([{
    id: 'wechat',
    name: '微信朋友圈',
    icon: '💬',
    userCount: '800万+',
    avgEngagement: '8.5%'
  }, {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    userCount: '500万+',
    avgEngagement: '12.3%'
  }, {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '📝',
    userCount: '300万+',
    avgEngagement: '15.7%'
  }, {
    id: 'douyin',
    name: '抖音',
    icon: '🎵',
    userCount: '1200万+',
    avgEngagement: '6.8%'
  }]);
  const [contentTemplates] = useState([{
    id: 1,
    name: '新品发布模板',
    category: '产品推广',
    platforms: ['wechat', 'instagram'],
    performance: {
      avgCTR: 8.5,
      avgConversion: 3.2,
      usage: 156
    }
  }, {
    id: 2,
    name: '用户见证模板',
    category: '口碑营销',
    platforms: ['xiaohongshu', 'douyin'],
    performance: {
      avgCTR: 12.3,
      avgConversion: 5.8,
      usage: 89
    }
  }, {
    id: 3,
    name: '促销活动模板',
    category: '活动营销',
    platforms: ['wechat', 'instagram', 'xiaohongshu'],
    performance: {
      avgCTR: 15.7,
      avgConversion: 8.9,
      usage: 234
    }
  }]);
  useEffect(() => {
    // 模拟加载ROI数据
    const mockRoiData = {
      overview: {
        totalRevenue: 284600,
        totalCost: 45800,
        roi: 521,
        conversionRate: 11.2,
        avgOrderValue: 289
      },
      platforms: [{
        name: '微信朋友圈',
        revenue: 125000,
        cost: 18000,
        roi: 594,
        users: 45600,
        engagement: 8.5
      }, {
        name: 'Instagram',
        revenue: 89600,
        cost: 15600,
        roi: 475,
        users: 32100,
        engagement: 12.3
      }, {
        name: '小红书',
        revenue: 45800,
        cost: 8200,
        roi: 459,
        users: 18900,
        engagement: 15.7
      }, {
        name: '抖音',
        revenue: 24200,
        cost: 4000,
        roi: 505,
        users: 67800,
        engagement: 6.8
      }],
      trends: [{
        date: '2024-01',
        revenue: 42000,
        conversion: 9.8
      }, {
        date: '2024-02',
        revenue: 48600,
        conversion: 10.2
      }, {
        date: '2024-03',
        revenue: 52300,
        conversion: 11.5
      }, {
        date: '2024-04',
        revenue: 58900,
        conversion: 12.1
      }, {
        date: '2024-05',
        revenue: 63400,
        conversion: 12.8
      }, {
        date: '2024-06',
        revenue: 68400,
        conversion: 13.2
      }]
    };
    setRoiData(mockRoiData);
  }, []);
  const generateContent = async () => {
    if (!selectedProduct) {
      toast({
        title: "请选择产品",
        description: "请先选择要推广的产品",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);

    // 模拟AI生成内容
    setTimeout(() => {
      const mockContent = {
        id: Date.now(),
        product: selectedProduct,
        platform: selectedPlatform,
        title: `${selectedProduct.name} - 2024春夏最火发型！`,
        content: `✨ 刚刚染了${selectedProduct.name}，效果绝了！\n\n🎨 色彩超级显白，朋友都问我要链接\n💇‍♀️ 发型师技术超赞，全程无推销\n💰 价格也很合理，性价比超高\n\n地址：XX沙龙\n#染发 #${selectedProduct.category} #美发分享`,
        hashtags: [`#${selectedProduct.name}`, `#${selectedProduct.category}`, '#染发推荐', '#美发沙龙'],
        images: ['before.jpg', 'after.jpg'],
        estimatedCTR: 8.5,
        estimatedConversion: 3.2,
        suggestedPostTime: '19:30-21:00',
        kolEndorsement: '雅米：这个颜色真的很OK！'
      };
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      toast({
        title: "内容生成成功",
        description: "Aftercare Agent 已为您生成专属营销内容"
      });
    }, 2000);
  };
  const startABTest = () => {
    if (!generatedContent) {
      toast({
        title: "请先生成内容",
        description: "请先生成营销内容后再进行A/B测试",
        variant: "destructive"
      });
      return;
    }

    // 模拟A/B测试数据
    const mockABData = {
      id: Date.now(),
      status: 'running',
      duration: '7天',
      participants: 2000,
      variants: [{
        id: 'A',
        name: '原版文案',
        content: generatedContent.content,
        metrics: {
          impressions: 1250,
          clicks: 98,
          conversions: 12,
          ctr: 7.84,
          conversionRate: 12.24
        }
      }, {
        id: 'B',
        name: '优化版文案',
        content: `🔥 ${selectedProduct.name}火爆来袭！\n\n✨ 2024年最in颜色，显白又高级\n💇‍♀️ 专业发型师推荐，效果有保障\n🎁 限时优惠，快来体验吧！\n\n${generatedContent.content}`,
        metrics: {
          impressions: 1250,
          clicks: 142,
          conversions: 21,
          ctr: 11.36,
          conversionRate: 14.79
        }
      }],
      winner: 'B',
      improvement: '47%',
      confidence: 95
    };
    setAbTestData(mockABData);
    toast({
      title: "A/B测试已启动",
      description: "测试将运行7天，系统会自动分析结果"
    });
  };
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    toast({
      title: "复制成功",
      description: "内容已复制到剪贴板"
    });
  };
  const publishContent = () => {
    toast({
      title: "发布成功",
      description: "内容已发布到选定平台"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Agentic 营销中心</h1>
          <p className="text-xl text-gray-600">Aftercare Agent 智能营销，ROI提升47%</p>
        </div>

        {/* 标签导航 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['overview', 'content', 'abtest', 'roi', 'templates'].map(tab => <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'bg-purple-600 hover:bg-purple-700' : ''}>
              {tab === 'overview' && '📊 营销总览'}
              {tab === 'content' && '✍️ 内容生成'}
              {tab === 'abtest' && '🧪 A/B测试'}
              {tab === 'roi' && '📈 ROI仪表盘'}
              {tab === 'templates' && '📋 模板管理'}
            </Button>)}
        </div>

        {activeTab === 'overview' && <>
            {/* ROI总览 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">总收入</p>
                      <p className="text-2xl font-bold text-green-600">￥{roiData?.overview.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-600 flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +23.5%
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className="text-2xl font-bold text-purple-600">{roiData?.overview.roi}%</p>
                      <p className="text-xs text-purple-600 flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +15.2%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">转化率</p>
                      <p className="text-2xl font-bold text-blue-600">{roiData?.overview.conversionRate}%</p>
                      <p className="text-xs text-blue-600 flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +8.7%
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">客单价</p>
                      <p className="text-2xl font-bold text-orange-600">￥{roiData?.overview.avgOrderValue}</p>
                      <p className="text-xs text-orange-600 flex items-center">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        +5.3%
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 平台表现 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="mr-2" />
                  平台表现
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {roiData?.platforms.map((platform, index) => <div key={index} className="text-center">
                      <h4 className="font-semibold mb-3">{platform.name}</h4>
                      <div className="space-y-2">
                        <div className="bg-purple-50 p-3 rounded">
                          <p className="text-xs text-purple-600">收入</p>
                          <p className="font-bold text-purple-700">￥{platform.revenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <p className="text-xs text-green-600">ROI</p>
                          <p className="font-bold text-green-700">{platform.roi}%</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-xs text-blue-600">互动率</p>
                          <p className="font-bold text-blue-700">{platform.engagement}%</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 热门产品 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2" />
                  热门推广产品
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product, index) => <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-purple-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">￥{product.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">转化率 {product.conversionRate}%</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </>}

        {activeTab === 'content' && <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：内容生成设置 */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Edit className="mr-2" />
                      内容生成设置
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">选择产品</label>
                      <Select value={selectedProduct?.id} onValueChange={value => setSelectedProduct(products.find(p => p.id == value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择要推广的产品" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map(product => <SelectItem key={product.id} value={product.id}>
                              {product.name} - {product.category}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">发布平台</label>
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择发布平台" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map(platform => <SelectItem key={platform.id} value={platform.id}>
                              <div className="flex items-center">
                                <span className="mr-2">{platform.icon}</span>
                                {platform.name}
                              </div>
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">内容风格</label>
                      <Select defaultValue="casual">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">轻松日常</SelectItem>
                          <SelectItem value="professional">专业权威</SelectItem>
                          <SelectItem value="trendy">时尚潮流</SelectItem>
                          <SelectItem value="emotional">情感共鸣</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={generateContent} disabled={isGenerating || !selectedProduct} className="w-full bg-purple-600 hover:bg-purple-700">
                      {isGenerating ? <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          AI生成中...
                        </> : <>
                          <Zap className="mr-2 w-4 h-4" />
                          一键生成内容
                        </>}
                    </Button>
                  </CardContent>
                </Card>

                {/* 平台数据 */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>平台数据</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {platforms.map(platform => <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{platform.icon}</span>
                            <div>
                              <p className="font-semibold">{platform.name}</p>
                              <p className="text-sm text-gray-600">{platform.userCount}用户</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-purple-600">{platform.avgEngagement}</p>
                            <p className="text-sm text-gray-600">平均互动</p>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：生成的内容 */}
              <div>
                {generatedContent ? <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>生成的内容</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedContent.content)}>
                            <Copy className="w-4 h-4 mr-1" />
                            复制
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => downloadContent(generatedContent)}>
                            <Download className="w-4 h-4 mr-1" />
                            下载
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">标题</label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-semibold">{generatedContent.title}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">内容</label>
                        <div className="p-3 bg-gray-50 rounded-lg min-h-[120px]">
                          <p className="whitespace-pre-line">{generatedContent.content}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">标签</label>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.hashtags.map((tag, index) => <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {tag}
                            </span>)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-xs text-blue-600">预计点击率</p>
                          <p className="font-bold text-blue-700">{generatedContent.estimatedCTR}%</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <p className="text-xs text-green-600">预计转化率</p>
                          <p className="font-bold text-green-700">{generatedContent.estimatedConversion}%</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-3 rounded">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">KOL评价</p>
                        <p className="text-sm text-yellow-700">"{generatedContent.kolEndorsement}"</p>
                      </div>

                      <div className="bg-purple-50 p-3 rounded">
                        <p className="text-sm font-semibold text-purple-800 mb-1">建议发布时间</p>
                        <p className="text-sm text-purple-700">{generatedContent.suggestedPostTime}</p>
                      </div>

                      <Button onClick={publishContent} className="w-full bg-purple-600 hover:bg-purple-700">
                        <Share2 className="mr-2 w-4 h-4" />
                        发布到平台
                      </Button>
                    </CardContent>
                  </Card> : <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-500">
                        <Edit className="w-12 h-12 mx-auto mb-3" />
                        <p>选择产品并点击"一键生成内容"开始创作</p>
                      </div>
                    </CardContent>
                  </Card>}
              </div>
            </div>
          </>}

        {activeTab === 'abtest' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">A/B测试</h2>
              <p className="text-gray-600">对比不同文案效果，优化营销策略</p>
            </div>

            {!abTestData ? <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">开始A/B测试</h3>
                    <p className="text-gray-600 mb-6">先生成营销内容，然后系统会自动创建A/B测试</p>
                    <Button onClick={() => setActiveTab('content')} className="bg-purple-600 hover:bg-purple-700">
                      去生成内容
                    </Button>
                  </div>
                </CardContent>
              </Card> : <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>测试结果</span>
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2">
                          进行中
                        </span>
                        <Clock className="w-4 h-4 text-gray-600 mr-1" />
                        <span className="text-sm text-gray-600">剩余3天</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {abTestData.variants.map(variant => <div key={variant.id} className={`p-4 rounded-lg border-2 ${variant.id === abTestData.winner ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{variant.name}</h4>
                            {variant.id === abTestData.winner && <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                              胜出
                            </span>}
                          </div>
                          <div className="bg-white p-3 rounded mb-3 min-h-[80px]">
                            <p className="text-sm">{variant.content}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">展示次数</p>
                              <p className="font-semibold">{variant.metrics.impressions}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">点击次数</p>
                              <p className="font-semibold">{variant.metrics.clicks}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">转化次数</p>
                              <p className="font-semibold">{variant.metrics.conversions}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">点击率</p>
                              <p className="font-semibold">{variant.metrics.ctr}%</p>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>测试统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{abTestData.improvement}</p>
                        <p className="text-sm text-gray-600">转化率提升</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{abTestData.confidence}%</p>
                        <p className="text-sm text-gray-600">统计显著性</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{abTestData.participants}</p>
                        <p className="text-sm text-gray-600">测试用户</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{abTestData.duration}</p>
                        <p className="text-sm text-gray-600">测试周期</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button onClick={startABTest} className="bg-purple-600 hover:bg-purple-700">
                    <Target className="mr-2 w-4 h-4" />
                    开始新测试
                  </Button>
                </div>
              </div>}
          </>}

        {activeTab === 'roi' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ROI仪表盘</h2>
              <p className="text-gray-600">Insight Agent 实时追踪营销效果</p>
            </div>

            {/* 趋势图表 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>收入趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {roiData?.trends.map((trend, index) => <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t" style={{
                  height: `${trend.revenue / 70000 * 100}%`
                }}></div>
                      <p className="text-xs mt-2">{trend.date}</p>
                      <p className="text-xs text-gray-600">￥{(trend.revenue / 1000).toFixed(1)}k</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 详细数据 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">平台ROI对比</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roiData?.platforms.map((platform, index) => <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{platform.name}</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{
                        width: `${platform.roi / 600 * 100}%`
                      }}></div>
                          </div>
                          <span className="text-sm font-semibold">{platform.roi}%</span>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">转化率分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roiData?.trends.slice(-4).map((trend, index) => <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{trend.date}</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{
                        width: `${trend.conversion / 15 * 100}%`
                      }}></div>
                          </div>
                          <span className="text-sm font-semibold">{trend.conversion}%</span>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">用户增长</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">+47%</p>
                    <p className="text-gray-600">月度用户增长</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>新用户</span>
                        <span className="font-semibold">12,456</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>活跃用户</span>
                        <span className="font-semibold">89,234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>付费用户</span>
                        <span className="font-semibold">23,567</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>}

        {activeTab === 'templates' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">模板管理</h2>
              <p className="text-gray-600">营销内容模板库，提升创作效率</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTemplates.map(template => <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">支持平台：</p>
                      <div className="flex flex-wrap gap-1">
                        {template.platforms.map(platform => <span key={platform} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {platforms.find(p => p.id === platform)?.name || platform}
                          </span>)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs text-blue-600">CTR</p>
                        <p className="font-bold text-blue-700">{template.performance.avgCTR}%</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-xs text-green-600">转化</p>
                        <p className="font-bold text-green-700">{template.performance.avgConversion}%</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-xs text-purple-600">使用</p>
                        <p className="font-bold text-purple-700">{template.performance.usage}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        使用
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            <div className="text-center mt-8">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Edit className="mr-2 w-4 h-4" />
                创建新模板
              </Button>
            </div>
          </>}
      </div>
    </div>;
}