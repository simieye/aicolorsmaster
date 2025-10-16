// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Beaker, Clock, Zap, Play, Pause, RotateCcw, CheckCircle, Droplets } from 'lucide-react';

export default function MixingSimulation(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isMixing, setIsMixing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const mixingSteps = [{
    name: '初始化系统',
    duration: 5,
    description: 'MixColor Agent 启动硬件设备'
  }, {
    name: '准备原料',
    duration: 10,
    description: '12原色气罐准备就绪'
  }, {
    name: '精确配比',
    duration: 20,
    description: '0.2g精度控制，99%挤出率'
  }, {
    name: '混合搅拌',
    duration: 10,
    description: '智能搅拌，确保均匀'
  }, {
    name: '完成出料',
    duration: 5,
    description: '染膏调配完成'
  }];
  const formula = {
    name: '微潮紫',
    proportions: {
      '紫色剂': 60,
      '漂染霜': 25,
      '护色素': 10,
      '营养精华': 5
    },
    totalAmount: 100
  };
  useEffect(() => {
    let interval;
    if (isMixing && !isPaused && !completed) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setCompleted(true);
            setIsMixing(false);
            return 100;
          }
          return newProgress;
        });
        setTimeRemaining(prev => {
          const newTime = Math.max(0, prev - 1);
          if (newTime === 0) {
            setCompleted(true);
            setIsMixing(false);
          }
          return newTime;
        });

        // 更新当前步骤
        const stepProgress = 100 / mixingSteps.length;
        const newStep = Math.min(Math.floor(progress / stepProgress), mixingSteps.length - 1);
        setCurrentStep(newStep);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMixing, isPaused, progress, completed]);
  const startMixing = () => {
    setIsMixing(true);
    setIsPaused(false);
    setProgress(0);
    setTimeRemaining(50);
    setCurrentStep(0);
    setCompleted(false);
    toast({
      title: "调配开始",
      description: "MixColor Agent 正在执行精准调配"
    });
  };
  const pauseMixing = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "继续调配" : "暂停调配",
      description: isPaused ? "调配已继续" : "调配已暂停"
    });
  };
  const resetMixing = () => {
    setIsMixing(false);
    setIsPaused(false);
    setProgress(0);
    setTimeRemaining(50);
    setCurrentStep(0);
    setCompleted(false);
    toast({
      title: "重置完成",
      description: "调配器已重置到初始状态"
    });
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">智能调配模拟</h1>
          <p className="text-gray-600">MixColor Agent 50秒精准调配，0.2g误差控制</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：配方信息 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Beaker className="mr-2" />
                  当前配方
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-lg">{formula.name}</h3>
                    <p className="text-sm text-gray-600">总用量: {formula.totalAmount}g</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">配方比例</h4>
                    {Object.entries(formula.proportions).map(([ingredient, percentage]) => <div key={ingredient} className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{ingredient}</span>
                          <span className="text-sm font-semibold">
                            {(formula.totalAmount * percentage / 100).toFixed(1)}g
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{
                        width: `${percentage}%`
                      }}></div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 控制面板 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>控制面板</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {!isMixing && !completed && <Button onClick={startMixing} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Play className="mr-2 w-4 h-4" />
                      开始调配
                    </Button>}
                  
                  {isMixing && <Button onClick={pauseMixing} className="w-full bg-yellow-600 hover:bg-yellow-700">
                      {isPaused ? <>
                          <Play className="mr-2 w-4 h-4" />
                          继续
                        </> : <>
                          <Pause className="mr-2 w-4 h-4" />
                          暂停
                        </>}
                    </Button>}
                  
                  <Button onClick={resetMixing} variant="outline" className="w-full">
                    <RotateCcw className="mr-2 w-4 h-4" />
                    重置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间：调配动画 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2" />
                  调配状态
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 时间显示 */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {formatTime(timeRemaining)}
                    </div>
                    <p className="text-gray-600">剩余时间</p>
                  </div>

                  {/* 进度条 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">调配进度</span>
                      <span className="text-sm font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-1000" style={{
                      width: `${progress}%`
                    }}></div>
                    </div>
                  </div>

                  {/* 调配器动画 */}
                  <div className="relative h-48 bg-gradient-to-b from-purple-100 to-purple-50 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* 调配器主体 */}
                        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                          {isMixing && !isPaused ? <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-purple-600"></div> : completed ? <CheckCircle className="w-16 h-16 text-green-600" /> : <Beaker className="w-16 h-16 text-gray-400" />}
                        </div>
                        
                        {/* 液体动画 */}
                        {isMixing && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{
                            animationDelay: '0.1s'
                          }}></div>
                              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{
                            animationDelay: '0.2s'
                          }}></div>
                            </div>
                          </div>}
                      </div>
                    </div>
                    
                    {/* 状态文字 */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <p className="text-sm font-semibold text-purple-700">
                        {completed ? '调配完成' : isMixing ? '正在调配...' : '等待开始'}
                      </p>
                    </div>
                  </div>

                  {/* 当前步骤 */}
                  <div>
                    <h4 className="font-semibold mb-2">当前步骤</h4>
                    <div className="space-y-2">
                      {mixingSteps.map((step, index) => <div key={index} className={`p-3 rounded-lg border-2 transition-all ${index === currentStep && isMixing ? 'border-purple-500 bg-purple-50' : index < currentStep ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{step.name}</span>
                            <span className="text-xs text-gray-600">{step.duration}s</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                        </div>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：实时数据 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="mr-2" />
                  实时数据
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 mb-1">精度控制</p>
                      <p className="text-lg font-bold text-blue-700">±0.2g</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-600 mb-1">挤出率</p>
                      <p className="text-lg font-bold text-green-700">99%</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-purple-600 mb-1">节约成本</p>
                      <p className="text-lg font-bold text-purple-700">20%+</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-orange-600 mb-1">效率提升</p>
                      <p className="text-lg font-bold text-orange-700">2x</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">系统状态</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">MQTT连接</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">正常</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">硬件状态</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">在线</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">温度监控</span>
                        <span className="text-sm font-semibold">35.2°C</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">压力监控</span>
                        <span className="text-sm font-semibold">2.1 bar</span>
                      </div>
                    </div>
                  </div>

                  {completed && <div className="border-t pt-4">
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">调配完成！</h4>
                        <p className="text-sm text-gray-700 mb-3">
                          染膏已精准调配完成，可以开始染发流程
                        </p>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="mr-2 w-4 h-4" />
                          开始染发
                        </Button>
                      </div>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}