// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Palette, Droplets, Clock, CheckCircle, TrendingUp, Beaker, Sparkles, Filter, Eye, Heart, Star } from 'lucide-react';

export default function Products(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or detail
  const [baseColors] = useState([{
    id: 1,
    name: '自然黑',
    hex: '#000000',
    description: '经典东方黑，完美遮盖白发',
    features: ['强效遮白发', '持久不褪色', '天然植物成分'],
    formula: {
      base: 100,
      developer: 120,
      processingTime: '35分钟',
      temperature: '35-40°C'
    },
    aftercare: ['使用护色洗发水', '避免高温吹风', '每周使用发膜'],
    popularity: 95
  }, {
    id: 2,
    name: '金褐色',
    hex: '#D2691E',
    description: '温暖自然，适合各种肤色',
    features: ['显白效果', '光泽度高', '营养护发'],
    formula: {
      base: 80,
      developer: 100,
      processingTime: '30分钟',
      temperature: '30-35°C'
    },
    aftercare: ['使用护色洗发水', '定期深层护理', '避免紫外线'],
    popularity: 88
  }, {
    id: 3,
    name: '紫罗兰',
    hex: '#8B008B',
    description: '神秘优雅，时尚潮流',
    features: ['时尚前卫', '持久显色', '修复受损'],
    formula: {
      base: 90,
      developer: 110,
      processingTime: '40分钟',
      temperature: '35-40°C'
    },
    aftercare: ['使用紫色洗发水', '避免频繁洗头', '定期营养护理'],
    popularity: 92
  }, {
    id: 4,
    name: '宝蓝色',
    hex: '#4169E1',
    description: '清新活力，夏日首选',
    features: ['清新自然', '抗氧化', '深层滋养'],
    formula: {
      base: 85,
      developer: 105,
      processingTime: '45分钟',
      temperature: '35-40°C'
    },
    aftercare: ['使用护色洗发水', '避免高温造型', '定期使用发膜'],
    popularity: 78
  }, {
    id: 5,
    name: '玫瑰红',
    hex: '#FF1493',
    description: '浪漫甜美，减龄必备',
    features: ['减龄效果', '光泽饱满', '温和配方'],
    formula: {
      base: 75,
      developer: 95,
      processingTime: '25分钟',
      temperature: '30-35°C'
    },
    aftercare: ['使用护色洗发水', '避免高温吹风', '每周护理'],
    popularity: 85
  }, {
    id: 6,
    name: '薄荷绿',
    hex: '#98FB98',
    description: '清新自然，个性十足',
    features: ['个性时尚', '植物萃取', '温和不刺激'],
    formula: {
      base: 70,
      developer: 90,
      processingTime: '30分钟',
      temperature: '30-35°C'
    },
    aftercare: ['使用护色洗发水', '避免高温造型', '定期营养护理'],
    popularity: 72
  }, {
    id: 7,
    name: '珊瑚橙',
    hex: '#FF7F50',
    description: '温暖活泼，元气满满',
    features: ['活力四射', '显白提气色', '营养配方'],
    formula: {
      base: 80,
      developer: 100,
      processingTime: '25分钟',
      temperature: '30-35°C'
    },
    aftercare: ['使用护色洗发水', '避免高温吹风', '定期护理'],
    popularity: 80
  }, {
    id: 8,
    name: '亚麻金',
    hex: '#F0E68C',
    description: '轻盈明亮，显白效果佳',
    features: ['显白效果', '轻盈自然', '光泽度高'],
    formula: {
      base: 60,
      developer: 80,
      processingTime: '20分钟',
      temperature: '25-30°C'
    },
    aftercare: ['使用护色洗发水', '避免高温造型', '定期深层护理'],
    popularity: 90
  }, {
    id: 9,
    name: '奶茶棕',
    hex: '#D2B48C',
    description: '自然低调，日常百搭',
    features: ['自然百搭', '温和配方', '持久护色'],
    formula: {
      base: 85,
      developer: 105,
      processingTime: '30分钟',
      temperature: '30-35°C'
    },
    aftercare: ['使用护色洗发水', '定期护理', '避免高温'],
    popularity: 94
  }, {
    id: 10,
    name: '焦糖色',
    hex: '#CD853F',
    description: '温暖醇厚，秋冬必备',
    features: ['温暖自然', '光泽饱满', '营养护发'],
    formula: {
      base: 90,
      developer: 110,
      processingTime: '35分钟',
      temperature: '35-40°C'
    },
    aftercare: ['使用护色洗发水', '定期深层护理', '避免高温'],
    popularity: 87
  }, {
    id: 11,
    name: '巧克力色',
    hex: '#3B2F2F',
    description: '沉稳大气，职场首选',
    features: ['沉稳大气', '持久不褪色', '天然成分'],
    formula: {
      base: 95,
      developer: 115,
      processingTime: '40分钟',
      temperature: '35-40°C'
    },
    aftercare: ['使用护色洗发水', '定期护理', '避免高温造型'],
    popularity: 91
  }, {
    id: 12,
    name: '银灰色',
    hex: '#C0C0C0',
    description: '时尚前卫，个性十足',
    features: ['时尚前卫', '抗氧化', '持久显色'],
    formula: {
      base: 65,
      developer: 85,
      processingTime: '45分钟',
      temperature: '35-40°C'
    },
    aftercare: ['使用银色洗发水', '避免高温造型', '定期护理'],
    popularity: 76
  }]);
  const [colorCategories] = useState([{
    id: 'japanese',
    name: '日系色',
    count: 192,
    description: '温柔甜美，适合亚洲肤色',
    colors: ['樱花粉', '薰衣草紫', '蜜桃橙', '奶茶棕', '焦糖色']
  }, {
    id: 'trendy',
    name: '潮色系',
    count: 268,
    description: '时尚前卫，个性十足',
    colors: ['雾霾蓝', '薄荷绿', '珊瑚粉', '宝蓝色', '玫瑰红']
  }, {
    id: 'micro-trendy',
    name: '微潮色',
    count: 189,
    description: '低调时尚，日常百搭',
    colors: ['亚麻金', '奶茶棕', '焦糖色', '巧克力色', '自然黑']
  }, {
    id: 'life',
    name: '生活色系',
    count: 42,
    description: '自然实用，适合日常',
    colors: ['自然黑', '深棕', '栗色', '金褐色', '巧克力色']
  }, {
    id: 'white-cover',
    name: '盖白发色系',
    count: 8,
    description: '强效遮盖，持久不褪',
    colors: ['深灰棕', '自然黑', '巧克力色', '深棕']
  }]);
  const [dynamicFormulas] = useState([{
    id: 1,
    name: '微潮紫渐变',
    category: '微潮色系',
    difficulty: '中级',
    time: '45分钟',
    cost: '￥89',
    rating: 4.8,
    formula: {
      name: '微潮紫渐变',
      targetColor: '微潮紫',
      baseColor: '自然深棕',
      proportions: {
        '紫色剂': 60,
        '漂染霜': 25,
        '护色素': 10,
        '营养精华': 5
      },
      steps: ['1. 将头发分为4个区域', '2. 紫色剂和漂染霜混合10秒', '3. 从发根到发梢均匀涂抹', '4. 等待35分钟', '5. 清洗并使用护色素'],
      processingTime: '35分钟',
      temperature: '35-40°C',
      tools: ['染发碗', '染发刷', '保鲜膜', '手套'],
      notes: ['避免接触头皮', '定期检查颜色', '注意时间控制']
    },
    aftercare: {
      immediate: ['立即使用护色素', '避免高温吹风', '48小时内不要洗头'],
      daily: ['使用护色洗发水', '避免频繁洗头', '使用防晒产品'],
      weekly: ['使用深层发膜', '营养护理', '颜色修复'],
      monthly: ['专业护理', '颜色补染', '深层清洁']
    },
    popularity: 2341,
    reviews: 156
  }, {
    id: 2,
    name: '樱花粉日系',
    category: '日系色',
    difficulty: '初级',
    time: '30分钟',
    cost: '￥79',
    rating: 4.9,
    formula: {
      name: '樱花粉日系',
      targetColor: '樱花粉',
      baseColor: '浅棕色',
      proportions: {
        '粉色剂': 70,
        '漂染霜': 20,
        '护色素': 8,
        '营养精华': 2
      },
      steps: ['1. 预处理头发', '2. 调配染发剂', '3. 分区涂抹', '4. 等待25分钟', '5. 清洗护理'],
      processingTime: '25分钟',
      temperature: '30-35°C',
      tools: ['染发碗', '染发刷', '分区夹', '手套'],
      notes: ['先做皮肤测试', '避免过度漂染', '注意时间控制']
    },
    aftercare: {
      immediate: ['使用护色素', '低温吹干', '避免造型产品'],
      daily: ['温和洗发', '使用护发素', '避免高温'],
      weekly: ['使用发膜', '深层护理', '颜色保养'],
      monthly: ['专业护理', '颜色维护', '营养补充']
    },
    popularity: 1892,
    reviews: 98
  }]);
  const filteredColors = baseColors.filter(color => {
    if (selectedCategory === 'all') return true;
    // 简化分类逻辑
    return true;
  });
  const handleColorSelect = color => {
    setSelectedColor(color);
    setViewMode('detail');
    toast({
      title: "查看详情",
      description: `正在查看${color.name}的详细信息`
    });
  };
  const handleTryFormula = formula => {
    toast({
      title: "试用配方",
      description: `正在准备${formula.name}配方`
    });
    // 跳转到配方生成页面
    $w.utils.navigateTo({
      pageId: 'formula-generation',
      params: {
        formulaId: formula.id
      }
    });
  };
  const handleBackToGrid = () => {
    setViewMode('grid');
    setSelectedColor(null);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI智能染发产品</h1>
          <p className="text-xl text-gray-600">12原色 × 711色调，R&D Agent 精准配方</p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Palette className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600">原色染发剂</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Sparkles className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-pink-600">711</p>
            <p className="text-sm text-gray-600">独特色调</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <Beaker className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">0.2g</p>
            <p className="text-sm text-gray-600">精准调配</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">99%</p>
            <p className="text-sm text-gray-600">客户满意度</p>
          </div>
        </div>

        {/* 筛选和视图切换 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部原色</SelectItem>
                {colorCategories.map(category => <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count}种色调)
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} onClick={() => setViewMode('grid')} className="bg-purple-600 hover:bg-purple-700">
              <Filter className="mr-2 w-4 h-4" />
              网格视图
            </Button>
            <Button variant={viewMode === 'detail' ? 'default' : 'outline'} onClick={() => setViewMode('detail')}>
              <Eye className="mr-2 w-4 h-4" />
              详情视图
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? <>
            {/* 12原色展示 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Palette className="mr-2" />
                12原色染发剂
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredColors.map(color => <Card key={color.id} className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl" onClick={() => handleColorSelect(color)}>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg" style={{
                    backgroundColor: color.hex
                  }}></div>
                        <h3 className="font-semibold text-lg mb-2">{color.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{color.description}</p>
                        <div className="flex items-center justify-center mb-3">
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(color.popularity / 20) ? 'fill-current' : ''}`} />)}
                            <span className="ml-1 text-sm text-gray-600">{color.popularity}%</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          查看详情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* 711色调分类 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="mr-2" />
                711色调分类
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colorCategories.map(category => <Card key={category.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {category.count}种
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.colors.map((color, index) => <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {color}
                          </span>)}
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        查看全部
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* 动态配方示例 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Beaker className="mr-2" />
                动态配方示例
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dynamicFormulas.map(formula => <Card key={formula.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{formula.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm">{formula.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-sm">
                          <span className="text-gray-600">难度：</span>
                          <span className="font-semibold">{formula.difficulty}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">时间：</span>
                          <span className="font-semibold">{formula.time}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">成本：</span>
                          <span className="font-semibold text-green-600">{formula.cost}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">人气：</span>
                          <span className="font-semibold">{formula.popularity}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">配方比例</h4>
                        {Object.entries(formula.formula.proportions).slice(0, 2).map(([ingredient, percentage]) => <div key={ingredient} className="flex items-center justify-between text-sm mb-1">
                            <span>{ingredient}</span>
                            <span className="font-semibold">{percentage}%</span>
                          </div>)}
                      </div>
                      <Button onClick={() => handleTryFormula(formula)} className="w-full bg-purple-600 hover:bg-purple-700">
                        试用此配方
                      </Button>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </> : <>
            {/* 详情视图 */}
            {selectedColor && <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <Button onClick={handleBackToGrid} variant="outline">
                    ← 返回列表
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Heart className="mr-2 w-4 h-4" />
                      收藏
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      试用配方
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 左侧：颜色展示 */}
                  <div>
                    <Card>
                      <CardContent className="p-8">
                        <div className="text-center">
                          <div className="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl" style={{
                      backgroundColor: selectedColor.hex
                    }}></div>
                          <h2 className="text-3xl font-bold mb-2">{selectedColor.name}</h2>
                          <p className="text-gray-600 mb-4">{selectedColor.description}</p>
                          <div className="flex items-center justify-center mb-6">
                            <div className="flex items-center text-yellow-500">
                              {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(selectedColor.popularity / 20) ? 'fill-current' : ''}`} />)}
                              <span className="ml-2 text-lg font-semibold">{selectedColor.popularity}%</span>
                            </div>
                          </div>
                          <div className="text-left bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">产品特性</h4>
                            <ul className="space-y-1">
                              {selectedColor.features.map((feature, index) => <li key={index} className="flex items-center text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                  {feature}
                                </li>)}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 右侧：配方详情 */}
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Beaker className="mr-2" />
                          配方详情
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">基础配方</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-purple-50 p-3 rounded">
                                <p className="text-sm text-purple-600">染发剂</p>
                                <p className="font-bold">{selectedColor.formula.base}g</p>
                              </div>
                              <div className="bg-blue-50 p-3 rounded">
                                <p className="text-sm text-blue-600">双氧奶</p>
                                <p className="font-bold">{selectedColor.formula.developer}g</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">处理参数</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-green-50 p-3 rounded">
                                <p className="text-sm text-green-600">处理时间</p>
                                <p className="font-bold">{selectedColor.formula.processingTime}</p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded">
                                <p className="text-sm text-orange-600">最佳温度</p>
                                <p className="font-bold">{selectedColor.formula.temperature}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">调配步骤</h4>
                            <ol className="text-sm space-y-2">
                              <li className="flex items-start">
                                <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                                <span>将染发剂和双氧奶按比例混合</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                                <span>搅拌均匀至无颗粒状态</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                                <span>分区涂抹，确保覆盖均匀</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                                <span>等待指定时间后清洗</span>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* 染后护理建议 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets className="mr-2" />
                      染后护理建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-purple-600">立即护理</h4>
                        <ul className="space-y-2 text-sm">
                          {selectedColor.aftercare.slice(0, 2).map((care, index) => <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{care}</span>
                            </li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-600">日常护理</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>使用护色洗发水</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>避免高温吹风</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">定期护理</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>每周使用发膜</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>定期营养护理</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
          </>}
      </div>
    </div>;
}