// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { FlaskConical, Droplet, Play, Pause, RotateCcw, Save, Share2, Download, Eye, Settings, Sliders, Zap, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function MixingSimulation(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [mixingRatio, setMixingRatio] = useState({});
  const [simulationResult, setSimulationResult] = useState(null);
  const [simulationHistory, setSimulationHistory] = useState([]);

  // 预设颜色
  const presetColors = [{
    id: 1,
    name: '自然黑',
    code: '#000000',
    type: 'base'
  }, {
    id: 2,
    name: '深棕',
    code: '#4A2C2A',
    type: 'base'
  }, {
    id: 3,
    name: '巧克力',
    code: '#3B2F2F',
    type: 'base'
  }, {
    id: 4,
    name: '铜色',
    code: '#B87333',
    type: 'accent'
  }, {
    id: 5,
    name: '金色',
    code: '#FFD700',
    type: 'accent'
  }, {
    id: 6,
    name: '玫瑰金',
    code: '#B76E79',
    type: 'accent'
  }, {
    id: 7,
    name: '雾霾蓝',
    code: '#778899',
    type: 'trend'
  }, {
    id: 8,
    name: '薄荷绿',
    code: '#98FB98',
    type: 'trend'
  }];

  // 添加颜色到混合
  const addColorToMix = color => {
    if (selectedColors.find(c => c.id === color.id)) {
      toast({
        title: "颜色已存在",
        description: "该颜色已在混合列表中",
        variant: "destructive"
      });
      return;
    }
    if (selectedColors.length >= 4) {
      toast({
        title: "达到上限",
        description: "最多只能混合4种颜色",
        variant: "destructive"
      });
      return;
    }
    setSelectedColors(prev => [...prev, color]);
    setMixingRatio(prev => ({
      ...prev,
      [color.id]: 25
    }));
  };

  // 移除颜色
  const removeColorFromMix = colorId => {
    setSelectedColors(prev => prev.filter(c => c.id !== colorId));
    setMixingRatio(prev => {
      const newRatio = {
        ...prev
      };
      delete newRatio[colorId];
      return newRatio;
    });
  };

  // 调整混合比例
  const adjustMixingRatio = (colorId, ratio) => {
    setMixingRatio(prev => ({
      ...prev,
      [colorId]: ratio
    }));
  };

  // 开始模拟
  const startSimulation = async () => {
    if (selectedColors.length < 2) {
      toast({
        title: "颜色不足",
        description: "请至少选择2种颜色进行混合",
        variant: "destructive"
      });
      return;
    }
    setIsSimulating(true);
    setSimulationProgress(0);
    try {
      // 模拟混合过程
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setSimulationProgress(i);
      }

      // 生成模拟结果
      const mockResult = {
        id: Date.now(),
        finalColor: '#8B4513',
        colorName: '混合棕色',
        rgb: 'rgb(139, 69, 19)',
        hsl: 'hsl(30, 76%, 31%)',
        ingredients: selectedColors.map(color => ({
          ...color,
          ratio: mixingRatio[color.id] || 25
        })),
        properties: {
          vibrancy: 75,
          longevity: 85,
          coverage: 90,
          naturalness: 80
        },
        recommendations: ['建议在自然光下观察最终效果', '可适当增加暖色调提升自然感', '建议使用护发产品保护发质']
      };
      setSimulationResult(mockResult);
      setSimulationHistory(prev => [mockResult, ...prev.slice(0, 9)]);
      toast({
        title: "模拟完成",
        description: "颜色混合模拟成功"
      });
    } catch (error) {
      toast({
        title: "模拟失败",
        description: "请重试",
        variant: "destructive"
      });
    } finally {
      setIsSimulating(false);
      setSimulationProgress(0);
    }
  };

  // 重置模拟
  const resetSimulation = () => {
    setSelectedColors([]);
    setMixingRatio({});
    setSimulationResult(null);
    setSimulationProgress(0);
    setIsSimulating(false);
  };

  // 保存模拟结果
  const saveSimulation = () => {
    if (!simulationResult) return;
    toast({
      title: "保存成功",
      description: "模拟结果已保存"
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('mixingSimulation.title', '混合模拟')}
          </h1>
          <p className="text-gray-600">
            {t('mixingSimulation.subtitle', '虚拟混合颜色，预览染发效果')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 颜色选择 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplet className="w-5 h-5 mr-2" />
                  颜色选择
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['base', 'accent', 'trend'].map(type => <div key={type}>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        {type === 'base' ? '基础色' : type === 'accent' ? '强调色' : '流行色'}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {presetColors.filter(color => color.type === type).map(color => <button key={color.id} onClick={() => addColorToMix(color)} className={`relative group p-3 rounded-lg border-2 transition-all ${selectedColors.find(c => c.id === color.id) ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <div className="w-full h-12 rounded mb-2" style={{
                        backgroundColor: color.code
                      }} />
                            <p className="text-xs font-medium">{color.name}</p>
                            {selectedColors.find(c => c.id === color.id) && <div className="absolute top-1 right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>}
                          </button>)}
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 混合控制 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sliders className="w-5 h-5 mr-2" />
                  混合控制
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedColors.length === 0 ? <div className="text-center py-8">
                    <FlaskConical className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">请选择要混合的颜色</p>
                  </div> : <>
                    {selectedColors.map(color => <div key={color.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded" style={{
                    backgroundColor: color.code
                  }} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{color.name}</p>
                          <div className="flex items-center space-x-2">
                            <input type="range" min="0" max="100" value={mixingRatio[color.id] || 25} onChange={e => adjustMixingRatio(color.id, parseInt(e.target.value))} className="flex-1" />
                            <span className="text-sm font-mono w-12">{mixingRatio[color.id] || 25}%</span>
                          </div>
                        </div>
                        <button onClick={() => removeColorFromMix(color.id)} className="text-red-500 hover:text-red-700">
                          ×
                        </button>
                      </div>)}

                    <div className="pt-4 border-t">
                      <div className="flex space-x-2">
                        <Button onClick={startSimulation} disabled={isSimulating || selectedColors.length < 2} className="flex-1">
                          {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                          {isSimulating ? '模拟中...' : '开始模拟'}
                        </Button>
                        <Button variant="outline" onClick={resetSimulation}>
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* 进度条 */}
                    {isSimulating && <div className="mt-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>模拟进度</span>
                          <span>{simulationProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{
                      width: `${simulationProgress}%`
                    }} />
                        </div>
                      </div>}
                  </>}
              </CardContent>
            </Card>
          </div>

          {/* 模拟结果 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  模拟结果
                </CardTitle>
              </CardHeader>
              <CardContent>
                {simulationResult ? <div className="space-y-4">
                    {/* 最终颜色 */}
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 shadow-inner" style={{
                    backgroundColor: simulationResult.finalColor
                  }} />
                      <h3 className="font-semibold">{simulationResult.colorName}</h3>
                      <p className="text-sm text-gray-600">{simulationResult.code}</p>
                      <p className="text-xs text-gray-500">{simulationResult.rgb}</p>
                      <p className="text-xs text-gray-500">{simulationResult.hsl}</p>
                    </div>

                    {/* 属性评分 */}
                    <div>
                      <h4 className="font-medium mb-3">属性评分</h4>
                      <div className="space-y-2">
                        {Object.entries(simulationResult.properties).map(([key, value]) => <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {key === 'vibrancy' ? '鲜艳度' : key === 'longevity' ? '持久度' : key === 'coverage' ? '遮盖度' : '自然度'}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{
                            width: `${value}%`
                          }} />
                              </div>
                              <span className="text-sm font-medium">{value}%</span>
                            </div>
                          </div>)}
                      </div>
                    </div>

                    {/* 建议 */}
                    <div>
                      <h4 className="font-medium mb-3">专业建议</h4>
                      <div className="space-y-2">
                        {simulationResult.recommendations.map((rec, index) => <div key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                            <p className="text-sm text-gray-600">{rec}</p>
                          </div>)}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button variant="outline" size="sm" onClick={saveSimulation} className="flex-1">
                        <Save className="w-4 h-4 mr-1" />
                        保存
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="w-4 h-4 mr-1" />
                        分享
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        下载
                      </Button>
                    </div>
                  </div> : <div className="text-center py-8">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">等待模拟结果</p>
                  </div>}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 历史记录 */}
        {simulationHistory.length > 0 && <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  模拟历史
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {simulationHistory.map(result => <div key={result.id} className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 shadow-inner" style={{
                  backgroundColor: result.finalColor
                }} />
                      <p className="text-xs font-medium">{result.colorName}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="mixing-simulation" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}