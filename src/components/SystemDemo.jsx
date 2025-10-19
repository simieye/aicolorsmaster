// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Play, InfoCircle, Video, HandPointer, ListOl, Brain, Palette, Database, TrendingUp, ExchangeAlt, ChevronLeft, ChevronRight, RotateCcw, Camera, Check, X, Volume2, Settings, Star, Pause } from 'lucide-react';

export const SystemDemo = ({
  system,
  onBack,
  onStartDemo,
  onShowHelp
}) => {
  const {
    toast
  } = useToast();
  const [demoMode, setDemoMode] = useState('video'); // video, interactive, steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const videoRef = useRef(null);

  // 演示视频列表
  const demoVideos = [{
    id: 1,
    title: '系统介绍和基本操作',
    duration: '05:30',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=320&h=180&fit=crop',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }, {
    id: 2,
    title: 'AI发质识别功能演示',
    duration: '03:45',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=320&h=180&fit=crop',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }, {
    id: 3,
    title: '智能调色配方生成',
    duration: '04:20',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=320&h=180&fit=crop',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }, {
    id: 4,
    title: '实际操作案例分析',
    duration: '06:15',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=320&h=180&fit=crop',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }];

  // 演示步骤
  const demoSteps = [{
    id: 1,
    title: '发质检测',
    description: '请将发质样本放置在检测区域',
    icon: Camera,
    action: '开始检测'
  }, {
    id: 2,
    title: '颜色选择',
    description: '选择目标颜色和染发效果',
    icon: Palette,
    action: '选择颜色'
  }, {
    id: 3,
    title: '配方生成',
    description: 'AI自动生成最佳染发配方',
    icon: Brain,
    action: '生成配方'
  }, {
    id: 4,
    title: '调色执行',
    description: '按照配方进行精确调色',
    icon: Settings,
    action: '开始调色'
  }];

  // 功能特性
  const features = [{
    id: 1,
    title: 'AI发质识别',
    description: '智能识别发质类型、受损程度和颜色基础',
    icon: Brain,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500'
  }, {
    id: 2,
    title: '精准调色',
    description: '根据发质分析结果，自动计算最佳配方',
    icon: Palette,
    color: 'text-green-400',
    bgColor: 'bg-green-500'
  }, {
    id: 3,
    title: '配方库',
    description: '包含1000+专业染发配方，实时更新',
    icon: Database,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500'
  }, {
    id: 4,
    title: '效果分析',
    description: '实时分析染发效果，提供优化建议',
    icon: TrendingUp,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500'
  }];

  // 处理视频播放
  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 处理视频选择
  const handleVideoSelect = index => {
    setSelectedVideo(index);
    setIsPlaying(false);
  };

  // 处理步骤切换
  const handleStepChange = step => {
    if (step >= 1 && step <= demoSteps.length) {
      setCurrentStep(step);
      setDetectionResult(null);
    }
  };

  // 处理发质检测
  const handleDetection = () => {
    setIsDetecting(true);
    // 模拟检测过程
    setTimeout(() => {
      setDetectionResult({
        hairType: '细软发质',
        damageLevel: '轻度受损',
        naturalColor: '深棕色',
        recommendations: ['使用6%双氧奶', '添加护发精华', '处理时间25分钟']
      });
      setIsDetecting(false);
      toast({
        title: "检测完成",
        description: "发质分析已完成，请查看结果"
      });
    }, 3000);
  };

  // 处理功能演示
  const handleFeatureDemo = featureId => {
    toast({
      title: "功能演示",
      description: `正在演示${features.find(f => f.id === featureId)?.title}功能`
    });
  };

  // 获取当前步骤信息
  const currentStepInfo = demoSteps[currentStep - 1];
  const StepIcon = currentStepInfo?.icon;
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">系统演示</h1>
              <p className="text-white/60 text-sm">{system.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onStartDemo} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              <Play className="w-4 h-4 mr-2" />
              开始演示
            </Button>
            <Button variant="ghost" onClick={onShowHelp} className="text-white/80 hover:text-white">
              <InfoCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* 系统信息 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{system.name}</h1>
              <p className="text-white/80 text-lg">交互式功能演示 - 体验AI染发的革命性技术</p>
            </div>
          </div>
          
          {/* 演示模式选择 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button onClick={() => setDemoMode('video')} className={`p-6 text-left justify-start h-auto ${demoMode === 'video' ? 'bg-white/20 border-2 border-blue-400' : 'bg-white/10 hover:bg-white/20'}`}>
              <Video className="text-blue-400 text-2xl mb-3" />
              <div>
                <h3 className="text-white font-semibold mb-2">视频演示</h3>
                <p className="text-white/60 text-sm">观看完整的功能演示视频，了解系统操作流程</p>
              </div>
            </Button>
            <Button onClick={() => setDemoMode('interactive')} className={`p-6 text-left justify-start h-auto ${demoMode === 'interactive' ? 'bg-white/20 border-2 border-green-400' : 'bg-white/10 hover:bg-white/20'}`}>
              <HandPointer className="text-green-400 text-2xl mb-3" />
              <div>
                <h3 className="text-white font-semibold mb-2">交互式演示</h3>
                <p className="text-white/60 text-sm">亲手操作体验系统功能，感受AI智能调色过程</p>
              </div>
            </Button>
            <Button onClick={() => setDemoMode('steps')} className={`p-6 text-left justify-start h-auto ${demoMode === 'steps' ? 'bg-white/20 border-2 border-purple-400' : 'bg-white/10 hover:bg-white/20'}`}>
              <ListOl className="text-purple-400 text-2xl mb-3" />
              <div>
                <h3 className="text-white font-semibold mb-2">步骤演示</h3>
                <p className="text-white/60 text-sm">分步骤学习系统操作，掌握每个功能的使用方法</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 视频演示区 */}
      {demoMode === 'video' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Video className="text-blue-400 mr-3" />
              视频演示
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 主视频播放器 */}
              <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
                  <iframe src={demoVideos[selectedVideo].url} title="AI智能染发自动调色宝机演示视频" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                  </iframe>
                </div>
                
                {/* 视频控制 */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={handleVideoPlay} className="text-white/80 hover:text-white">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                      <Volume2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="text-white/60 text-sm">
                    <span>00:00 / {demoVideos[selectedVideo].duration}</span>
                  </div>
                </div>
              </div>
              
              {/* 视频列表 */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4">演示视频列表</h3>
                <div className="space-y-3">
                  {demoVideos.map((video, index) => <div key={video.id} className={`bg-white/10 rounded-lg p-4 hover:bg-white/20 cursor-pointer transition-colors ${selectedVideo === index ? 'border-2 border-blue-400' : ''}`} onClick={() => handleVideoSelect(index)}>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 h-12 bg-black rounded-lg overflow-hidden">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{index + 1}. {video.title}</h4>
                          <p className="text-white/60 text-xs">{video.duration}</p>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 交互式演示区 */}
      {demoMode === 'interactive' && <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <HandPointer className="text-green-400 mr-3" />
              交互式演示
            </h2>
            
            {/* 步骤指示器 */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              {demoSteps.map((step, index) => <div key={step.id} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${currentStep > index + 1 ? 'bg-green-500' : currentStep === index + 1 ? 'bg-blue-500 scale-110' : 'bg-white/20'}`}>
                    {currentStep > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < demoSteps.length - 1 && <div className={`w-16 h-1 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-white/20'}`}></div>}
                </div>)}
            </div>
            
            {/* 模拟设备界面 */}
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">AI智能调色宝机 - 模拟界面</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              {/* 当前步骤内容 */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h4 className="text-white text-lg mb-2">步骤 {currentStep}: {currentStepInfo?.title}</h4>
                  <p className="text-gray-400">{currentStepInfo?.description}</p>
                </div>
                
                {/* 模拟检测区域 */}
                <div className="bg-gray-700 rounded-lg p-8 mb-6 text-center border-2 border-dashed border-gray-600 hover:border-blue-400 transition-colors">
                  <StepIcon className="text-blue-400 text-4xl mb-4 mx-auto" />
                  <p className="text-white mb-4">点击{currentStepInfo?.action}</p>
                  <Button onClick={currentStep === 1 ? handleDetection : () => {}} disabled={isDetecting} className="bg-blue-500 hover:bg-blue-600 text-white">
                    {isDetecting ? <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        检测中...
                      </> : <>
                        <Play className="w-4 h-4 mr-2" />
                        {currentStepInfo?.action}
                      </>}
                  </Button>
                </div>
                
                {/* 检测结果 */}
                {detectionResult && <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-2">检测结果</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                          <span>发质类型:</span>
                          <span>{detectionResult.hairType}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>受损程度:</span>
                          <span>{detectionResult.damageLevel}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>天然颜色:</span>
                          <span>{detectionResult.naturalColor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-2">推荐方案</h5>
                      <div className="space-y-2 text-sm">
                        {detectionResult.recommendations.map((rec, index) => <div key={index} className="text-gray-300">
                            <Check className="w-3 h-3 text-green-400 inline mr-2" />
                            {rec}
                          </div>)}
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
            
            {/* 操作控制 */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="ghost" onClick={() => handleStepChange(currentStep - 1)} disabled={currentStep === 1} className="bg-white/10 hover:bg-white/20 text-white">
                <ChevronLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
              <Button onClick={() => handleStepChange(currentStep + 1)} disabled={currentStep === demoSteps.length} className="bg-blue-500 hover:bg-blue-600 text-white">
                下一步
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="ghost" onClick={() => handleStepChange(1)} className="bg-white/10 hover:bg-white/20 text-white">
                <RotateCcw className="w-4 h-4 mr-2" />
                重新开始
              </Button>
            </div>
          </CardContent>
        </Card>}

      {/* 功能特性展示 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="text-yellow-400 mr-3" />
            核心功能特性
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(feature => {
            const Icon = feature.icon;
            return <div key={feature.id} className="bg-white/10 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm mb-4">{feature.description}</p>
                <Button variant="ghost" size="sm" onClick={() => handleFeatureDemo(feature.id)} className={`${feature.color} hover:opacity-80`}>
                  查看演示 <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>;
          })}
          </div>
        </CardContent>
      </Card>

      {/* 效果对比 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <ExchangeAlt className="text-purple-400 mr-3" />
            效果对比
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">传统染发方式</h3>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=225&fit=crop" alt="传统染发" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 text-white/80">
                  <div className="flex items-center">
                    <X className="w-4 h-4 text-red-400 mr-2" />
                    <span>依赖经验，准确性低</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-4 h-4 text-red-400 mr-2" />
                    <span>调色时间长，效率低</span>
                  </div>
                  <div className="flex items-center">
                    <X className="w-4 h-4 text-red-400 mr-2" />
                    <span>容易出错，成本高</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">AI智能染发系统</h3>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=225&fit=crop" alt="AI智能染发" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 text-white/80">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    <span>AI分析，准确率98%+</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    <span>快速调色，效率提升300%</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    <span>精准配方，成本降低40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};