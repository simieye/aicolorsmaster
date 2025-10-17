// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Palette, Beaker, Clock, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';

export default function FormulaGeneration(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [generatedFormula, setGeneratedFormula] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const colorCategories = [{
    id: 'japanese',
    name: '日系色',
    count: 192,
    colors: [{
      id: 1,
      name: '樱花粉',
      hex: '#FFB6C1',
      description: '温柔甜美，适合春季'
    }, {
      id: 2,
      name: '薰衣草紫',
      hex: '#E6E6FA',
      description: '浪漫优雅，显白效果佳'
    }, {
      id: 3,
      name: '蜜桃橙',
      hex: '#FFDAB9',
      description: '活力四射，减龄必备'
    }]
  }, {
    id: 'trendy',
    name: '潮色系',
    count: 268,
    colors: [{
      id: 4,
      name: '雾霾蓝',
      hex: '#778899',
      description: '高级感十足，时尚前卫'
    }, {
      id: 5,
      name: '薄荷绿',
      hex: '#98FB98',
      description: '清新自然，夏日首选'
    }, {
      id: 6,
      name: '珊瑚粉',
      hex: '#FF7F50',
      description: '温暖活泼，元气满满'
    }]
  }, {
    id: 'micro-trendy',
    name: '微潮色',
    count: 189,
    colors: [{
      id: 7,
      name: '奶茶棕',
      hex: '#D2B48C',
      description: '自然低调，日常百搭'
    }, {
      id: 8,
      name: '焦糖色',
      hex: '#CD853F',
      description: '温暖醇厚，秋冬必备'
    }, {
      id: 9,
      name: '亚麻金',
      hex: '#F0E68C',
      description: '轻盈明亮，显白提气色'
    }]
  }, {
    id: 'life',
    name: '生活色系',
    count: 42,
    colors: [{
      id: 10,
      name: '自然黑',
      hex: '#000000',
      description: '经典永恒，东方美'
    }, {
      id: 11,
      name: '深棕',
      hex: '#3B2F2F',
      description: '沉稳大气，职场首选'
    }, {
      id: 12,
      name: '栗色',
      hex: '#8B4513',
      description: '温暖自然，亲和力强'
    }]
  }, {
    id: 'white-cover',
    name: '盖白发色系',
    count: 8,
    colors: [{
      id: 13,
      name: '深灰棕',
      hex: '#4A4A4A',
      description: '完美遮盖白发'
    }, {
      id: 14,
      name: '自然黑',
      hex: '#1C1C1C',
      description: '强效遮白发'
    }]
  }];
  const generateFormula = async () => {
    if (!selectedColor) {
      toast({
        title: "请选择颜色",
        description: "请先选择一个目标颜色",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);

    // 模拟R&D Agent生成配方
    setTimeout(() => {
      const mockFormula = {
        id: Date.now(),
        colorName: selectedColor.name,
        colorHex: selectedColor.hex,
        proportions: {
          '紫色剂': 60,
          '漂染霜': 25,
          '护色素': 10,
          '营养精华': 5
        },
        steps: ['将紫色剂和漂染霜混合10秒', '加入护色素继续搅拌5秒', '最后加入营养精华轻柔混合', '静置2分钟后开始涂抹'],
        processingTime: '25分钟',
        temperature: '35-40°C',
        aftercare: ['使用护色洗发水', '避免高温吹风', '每周使用发膜护理', '避免频繁洗头'],
        roi: {
          costSaving: '23%',
          timeSaving: '40%',
          satisfactionRate: '96%'
        }
      };
      setGeneratedFormula(mockFormula);
      setIsGenerating(false);
      toast({
        title: "配方生成成功",
        description: "R&D Agent 已为您生成专属配方"
      });
    }, 2000);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI配方生成</h1>
          <p className="text-gray-600">R&D Agent 智能生成个性化染发配方</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：色系选择 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2" />
                  选择色系
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择色系" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorCategories.map(category => <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count}种)
                        </SelectItem>)}
                    </SelectContent>
                  </Select>

                  {selectedCategory && <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-700">可选颜色</h4>
                      {colorCategories.find(cat => cat.id === selectedCategory)?.colors.map(color => <div key={color.id} className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedColor?.id === color.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`} onClick={() => setSelectedColor(color)}>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full mr-3" style={{
                        backgroundColor: color.hex
                      }}></div>
                              <div className="flex-1">
                                <p className="font-semibold">{color.name}</p>
                                <p className="text-xs text-gray-600">{color.description}</p>
                              </div>
                            </div>
                          </div>)}
                    </div>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间：配方生成 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Beaker className="mr-2" />
                  配方生成
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedColor ? <div className="space-y-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3" style={{
                    backgroundColor: selectedColor.hex
                  }}></div>
                      <h3 className="font-semibold text-lg">{selectedColor.name}</h3>
                      <p className="text-sm text-gray-600">{selectedColor.description}</p>
                    </div>

                    <Button onClick={generateFormula} disabled={isGenerating} className="w-full bg-purple-600 hover:bg-purple-700">
                      {isGenerating ? <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          AI生成中...
                        </> : <>
                          <Sparkles className="mr-2 w-4 h-4" />
                          生成专属配方
                        </>}
                    </Button>

                    {isGenerating && <div className="text-center text-sm text-gray-600">
                        <p>R&D Agent 正在分析您的需求...</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{
                      width: '60%'
                    }}></div>
                        </div>
                      </div>}
                  </div> : <div className="text-center text-gray-500 py-8">
                    <Palette className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>请先选择一个目标颜色</p>
                  </div>}
              </CardContent>
            </Card>

            {generatedFormula && <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 text-green-600" />
                    配方详情
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">配方比例</h4>
                      {Object.entries(generatedFormula.proportions).map(([ingredient, percentage]) => <div key={ingredient} className="flex items-center justify-between py-2">
                          <span className="text-sm">{ingredient}</span>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{
                          width: `${percentage}%`
                        }}></div>
                            </div>
                            <span className="text-sm font-semibold">{percentage}%</span>
                          </div>
                        </div>)}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">调配步骤</h4>
                      <ol className="text-sm space-y-1">
                        {generatedFormula.steps.map((step, index) => <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-2">{index + 1}.</span>
                            <span>{step}</span>
                          </li>)}
                      </ol>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600">处理时间</p>
                        <p className="font-semibold">{generatedFormula.processingTime}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-600">最佳温度</p>
                        <p className="font-semibold">{generatedFormula.temperature}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}
          </div>

          {/* 右侧：染后护理和ROI分析 */}
          <div className="lg:col-span-1">
            {generatedFormula && <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2" />
                      染后护理建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedFormula.aftercare.map((care, index) => <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{care}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2" />
                      ROI 分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm">成本节约</span>
                        <span className="font-semibold text-green-600">{generatedFormula.roi.costSaving}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm">时间节约</span>
                        <span className="font-semibold text-blue-600">{generatedFormula.roi.timeSaving}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm">满意度</span>
                        <span className="font-semibold text-purple-600">{generatedFormula.roi.satisfactionRate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                      <p className="text-xs text-center text-purple-700">
                        Insight Agent 预测：此配方可提升复购率 33%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>}
          </div>
        </div>
      </div>
    </div>;
}