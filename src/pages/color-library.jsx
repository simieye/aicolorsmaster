// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Palette, Search, Filter, Eye, Heart, Star, TrendingUp, Clock, Users, Zap, Sparkles, ChevronRight, Grid, List, X, Check, CheckCircle } from 'lucide-react';

export default function ColorLibrary(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeason, setFilterSeason] = useState('all');
  const [filterSkin, setFilterSkin] = useState('all');
  const [filterStyle, setFilterStyle] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [colorLibrary] = useState({
    japanese: {
      name: '日系色',
      count: 192,
      description: '温柔甜美，适合亚洲肤色',
      colors: [{
        id: 1,
        name: '樱花粉',
        hex: '#FFB6C1',
        season: 'spring',
        skin: 'fair',
        style: 'sweet',
        popularity: 95,
        kol: true,
        description: '温柔甜美的樱花粉色，春季首选'
      }, {
        id: 2,
        name: '薰衣草紫',
        hex: '#E6E6FA',
        season: 'summer',
        skin: 'medium',
        style: 'elegant',
        popularity: 88,
        kol: true,
        description: '浪漫优雅的薰衣草紫色'
      }, {
        id: 3,
        name: '蜜桃橙',
        hex: '#FFDAB9',
        season: 'summer',
        skin: 'fair',
        style: 'sweet',
        popularity: 92,
        kol: false,
        description: '活力四射的蜜桃橙色'
      }, {
        id: 4,
        name: '奶茶棕',
        hex: '#D2B48C',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 94,
        kol: true,
        description: '自然低调的奶茶棕色'
      }, {
        id: 5,
        name: '焦糖色',
        hex: '#CD853F',
        season: 'autumn',
        skin: 'medium',
        style: 'warm',
        popularity: 87,
        kol: true,
        description: '温暖醇厚的焦糖色'
      }, {
        id: 6,
        name: '珊瑚粉',
        hex: '#FF7F50',
        season: 'spring',
        skin: 'fair',
        style: 'sweet',
        popularity: 85,
        kol: false,
        description: '温暖活泼的珊瑚粉色'
      }, {
        id: 7,
        name: '玫瑰金',
        hex: '#B76E79',
        season: 'all',
        skin: 'medium',
        style: 'elegant',
        popularity: 90,
        kol: true,
        description: '优雅高贵的玫瑰金色'
      }, {
        id: 8,
        name: '亚麻金',
        hex: '#F0E68C',
        season: 'summer',
        skin: 'fair',
        style: 'natural',
        popularity: 93,
        kol: false,
        description: '轻盈明亮的亚麻金色'
      }]
    },
    trendy: {
      name: '潮色系',
      count: 268,
      description: '时尚前卫，个性十足',
      colors: [{
        id: 9,
        name: '雾霾蓝',
        hex: '#778899',
        season: 'all',
        skin: 'all',
        style: 'cool',
        popularity: 89,
        kol: true,
        description: '高级感十足的雾霾蓝色'
      }, {
        id: 10,
        name: '薄荷绿',
        hex: '#98FB98',
        season: 'summer',
        skin: 'fair',
        style: 'fresh',
        popularity: 82,
        kol: true,
        description: '清新自然的薄荷绿色'
      }, {
        id: 11,
        name: '宝蓝色',
        hex: '#4169E1',
        season: 'all',
        skin: 'medium',
        style: 'cool',
        popularity: 78,
        kol: false,
        description: '清新活力的宝蓝色'
      }, {
        id: 12,
        name: '银灰色',
        hex: '#C0C0C0',
        season: 'all',
        skin: 'all',
        style: 'cool',
        popularity: 76,
        kol: true,
        description: '时尚前卫的银灰色'
      }, {
        id: 13,
        name: '青木色',
        hex: '#4A5D23',
        season: 'spring',
        skin: 'medium',
        style: 'natural',
        popularity: 71,
        kol: false,
        description: '自然清新的青木色'
      }, {
        id: 14,
        name: '海洋蓝',
        hex: '#006994',
        season: 'summer',
        skin: 'fair',
        style: 'cool',
        popularity: 84,
        kol: true,
        description: '深邃神秘的海洋蓝色'
      }, {
        id: 15,
        name: '紫罗兰',
        hex: '#8B008B',
        season: 'all',
        skin: 'medium',
        style: 'mysterious',
        popularity: 86,
        kol: false,
        description: '神秘优雅的紫罗兰色'
      }, {
        id: 16,
        name: '玫瑰红',
        hex: '#FF1493',
        season: 'all',
        skin: 'fair',
        style: 'bold',
        popularity: 79,
        kol: true,
        description: '浪漫甜美的玫瑰红色'
      }]
    },
    microTrendy: {
      name: '微潮色',
      count: 189,
      description: '低调时尚，日常百搭',
      colors: [{
        id: 17,
        name: '微潮紫',
        hex: '#9B59B6',
        season: 'all',
        skin: 'all',
        style: 'trendy',
        popularity: 91,
        kol: true,
        description: '时尚个性的微潮紫色'
      }, {
        id: 18,
        name: '浅棕灰',
        hex: '#BCBDBA',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 83,
        kol: false,
        description: '自然低调的浅棕灰色'
      }, {
        id: 19,
        name: '米金色',
        hex: '#F5DEB3',
        season: 'all',
        skin: 'fair',
        style: 'warm',
        popularity: 88,
        kol: true,
        description: '温暖自然的米金色'
      }, {
        id: 20,
        name: '亚麻灰',
        hex: '#D3D3D3',
        season: 'all',
        skin: 'medium',
        style: 'cool',
        popularity: 85,
        kol: false,
        description: '优雅高级的亚麻灰色'
      }, {
        id: 21,
        name: '奶茶灰',
        hex: '#C8B88B',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 89,
        kol: true,
        description: '温柔自然的奶茶灰色'
      }, {
        id: 22,
        name: '浅咖色',
        hex: '#A0826D',
        season: 'autumn',
        skin: 'medium',
        style: 'warm',
        popularity: 84,
        kol: false,
        description: '温暖舒适的浅咖色'
      }, {
        id: 23,
        name: '粉棕色',
        hex: '#C19A6B',
        season: 'all',
        skin: 'fair',
        style: 'sweet',
        popularity: 87,
        kol: true,
        description: '温柔甜美的粉棕色'
      }, {
        id: 24,
        name: '灰金色',
        hex: '#E5E4E2',
        season: 'all',
        skin: 'all',
        style: 'elegant',
        popularity: 82,
        kol: false,
        description: '高级优雅的灰金色'
      }]
    },
    life: {
      name: '生活色系',
      count: 42,
      description: '自然实用，适合日常',
      colors: [{
        id: 25,
        name: '自然黑',
        hex: '#000000',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 95,
        kol: true,
        description: '经典永恒的自然黑色'
      }, {
        id: 26,
        name: '深棕',
        hex: '#3B2F2F',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 92,
        kol: false,
        description: '沉稳大气的深棕色'
      }, {
        id: 27,
        name: '栗色',
        hex: '#8B4513',
        season: 'autumn',
        skin: 'medium',
        style: 'warm',
        popularity: 89,
        kol: true,
        description: '温暖自然的栗色'
      }, {
        id: 28,
        name: '金褐色',
        hex: '#D2691E',
        season: 'all',
        skin: 'fair',
        style: 'warm',
        popularity: 86,
        kol: false,
        description: '温暖自然的金褐色'
      }, {
        id: 29,
        name: '巧克力色',
        hex: '#3B2F2F',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 93,
        kol: true,
        description: '醇厚浓郁的巧克力色'
      }, {
        id: 30,
        name: '咖啡色',
        hex: '#6F4E37',
        season: 'all',
        skin: 'medium',
        style: 'natural',
        popularity: 88,
        kol: false,
        description: '经典耐看的咖啡色'
      }]
    },
    whiteCover: {
      name: '盖白发色系',
      count: 8,
      description: '强效遮盖，持久不褪',
      colors: [{
        id: 31,
        name: '深灰棕',
        hex: '#4A4A4A',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 94,
        kol: true,
        description: '完美遮盖白发的深灰棕色'
      }, {
        id: 32,
        name: '自然黑2号',
        hex: '#1C1C1C',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 96,
        kol: true,
        description: '强效遮盖的自然黑色'
      }, {
        id: 33,
        name: '深棕2号',
        hex: '#2F1B14',
        season: 'all',
        skin: 'all',
        style: 'natural',
        popularity: 91,
        kol: false,
        description: '遮盖效果佳的深棕色'
      }, {
        id: 34,
        name: '栗色2号',
        hex: '#5D4037',
        season: 'all',
        skin: 'medium',
        style: 'natural',
        popularity: 89,
        kol: true,
        description: '自然遮盖的栗色'
      }]
    }
  });
  const [trendingColors] = useState([{
    id: 1,
    name: '蜜桃橙',
    trend: 'up',
    increase: '+23%',
    season: 'summer'
  }, {
    id: 2,
    name: '雾霾蓝',
    trend: 'stable',
    increase: '+5%',
    season: 'all'
  }, {
    id: 3,
    name: '奶茶棕',
    trend: 'up',
    increase: '+18%',
    season: 'all'
  }, {
    id: 4,
    name: '微潮紫',
    trend: 'up',
    increase: '+15%',
    season: 'all'
  }, {
    id: 5,
    name: '薄荷绿',
    trend: 'down',
    increase: '-3%',
    season: 'summer'
  }]);
  useEffect(() => {
    // 模拟加载收藏的颜色
    const mockFavorites = [1, 4, 9, 17, 25];
    setFavoriteColors(mockFavorites);
  }, []);
  const getAllColors = () => {
    const allColors = [];
    Object.values(colorLibrary).forEach(category => {
      allColors.push(...category.colors);
    });
    return allColors;
  };
  const getFilteredColors = () => {
    let colors = getAllColors();

    // 按分类筛选
    if (selectedCategory !== 'all') {
      colors = colorLibrary[selectedCategory]?.colors || [];
    }

    // 按搜索词筛选
    if (searchTerm) {
      colors = colors.filter(color => color.name.toLowerCase().includes(searchTerm.toLowerCase()) || color.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // 按季节筛选
    if (filterSeason !== 'all') {
      colors = colors.filter(color => color.season === filterSeason || color.season === 'all');
    }

    // 按肤色筛选
    if (filterSkin !== 'all') {
      colors = colors.filter(color => color.skin === filterSkin || color.skin === 'all');
    }

    // 按风格筛选
    if (filterStyle !== 'all') {
      colors = colors.filter(color => color.style === filterStyle);
    }
    return colors;
  };
  const handleColorSelect = color => {
    setSelectedColor(color);
    setShowPreview(true);
    toast({
      title: "颜色预览",
      description: `正在预览${color.name}的效果`
    });
  };
  const handleFavorite = colorId => {
    setFavoriteColors(prev => {
      if (prev.includes(colorId)) {
        toast({
          title: "取消收藏",
          description: "已从收藏中移除"
        });
        return prev.filter(id => id !== colorId);
      } else {
        toast({
          title: "添加收藏",
          description: "已添加到收藏"
        });
        return [...prev, colorId];
      }
    });
  };
  const handleTryColor = color => {
    toast({
      title: "试用颜色",
      description: `正在准备${color.name}的配方`
    });
    // 跳转到配方生成页面
    $w.utils.navigateTo({
      pageId: 'formula-generation',
      params: {
        colorId: color.id,
        colorName: color.name,
        colorHex: color.hex
      }
    });
  };
  const getSeasonIcon = season => {
    switch (season) {
      case 'spring':
        return '🌸';
      case 'summer':
        return '☀️';
      case 'autumn':
        return '🍂';
      case 'winter':
        return '❄️';
      default:
        return '🌈';
    }
  };
  const getStyleIcon = style => {
    switch (style) {
      case 'sweet':
        return '🍭';
      case 'elegant':
        return '👑';
      case 'natural':
        return '🌿';
      case 'cool':
        return '❄️';
      case 'warm':
        return '🔥';
      case 'bold':
        return '💥';
      case 'fresh':
        return '🍃';
      case 'mysterious':
        return '🌙';
      case 'trendy':
        return '✨';
      default:
        return '🎨';
    }
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">711颜色库</h1>
          <p className="text-xl text-gray-600">探索无限色彩可能，找到最适合你的完美色调</p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(colorLibrary).map(([key, category]) => <Card key={key} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCategory(key)}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{category.count}</div>
                <div className="text-sm text-gray-600">{category.name}</div>
              </CardContent>
            </Card>)}
        </div>

        {/* 标签导航 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['overview', 'browse', 'trending', 'favorites', 'preview'].map(tab => <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'bg-purple-600 hover:bg-purple-700' : ''}>
              {tab === 'overview' && '🎨 总览'}
              {tab === 'browse' && '🔍 浏览'}
              {tab === 'trending' && '🔥 潮流'}
              {tab === 'favorites' && '❤️ 收藏'}
              {tab === 'preview' && '👁️ 预览'}
            </Button>)}
        </div>

        {activeTab === 'overview' && <>
            {/* 分类概览 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(colorLibrary).map(([key, category]) => <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            setSelectedCategory(key);
            setActiveTab('browse');
          }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {category.count}种
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.colors.slice(0, 6).map(color => <div key={color.id} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{
                  backgroundColor: color.hex
                }} title={color.name}></div>)}
                      {category.colors.length > 6 && <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          +{category.colors.length - 6}
                        </div>}
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* 潮流色彩 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2" />
                  本季潮流色彩
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {trendingColors.map(trend => {
                const color = getAllColors().find(c => c.name === trend.name);
                return <div key={trend.id} className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 shadow-lg" style={{
                    backgroundColor: color?.hex || '#ccc'
                  }}></div>
                      <p className="font-semibold text-sm">{trend.name}</p>
                      <p className={`text-xs ${trend.trend === 'up' ? 'text-green-600' : trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                        {trend.increase}
                      </p>
                    </div>;
              })}
                </div>
              </CardContent>
            </Card>
          </>}

        {activeTab === 'browse' && <>
            {/* 筛选和搜索 */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" placeholder="搜索颜色..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部分类</SelectItem>
                    {Object.entries(colorLibrary).map(([key, category]) => <SelectItem key={key} value={key}>
                        {category.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterSeason} onValueChange={setFilterSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="季节" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部季节</SelectItem>
                    <SelectItem value="spring">春季</SelectItem>
                    <SelectItem value="summer">夏季</SelectItem>
                    <SelectItem value="autumn">秋季</SelectItem>
                    <SelectItem value="winter">冬季</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSkin} onValueChange={setFilterSkin}>
                  <SelectTrigger>
                    <SelectValue placeholder="肤色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部肤色</SelectItem>
                    <SelectItem value="fair">白皙</SelectItem>
                    <SelectItem value="medium">中等</SelectItem>
                    <SelectItem value="dark">深色</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStyle} onValueChange={setFilterStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="风格" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部风格</SelectItem>
                    <SelectItem value="sweet">甜美</SelectItem>
                    <SelectItem value="elegant">优雅</SelectItem>
                    <SelectItem value="natural">自然</SelectItem>
                    <SelectItem value="cool">冷艳</SelectItem>
                    <SelectItem value="warm">温暖</SelectItem>
                    <SelectItem value="bold">大胆</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 视图切换 */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                找到 {getFilteredColors().length} 种颜色
              </div>
              <div className="flex gap-2">
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 颜色列表 */}
            {viewMode === 'grid' ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {getFilteredColors().map(color => <Card key={color.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleColorSelect(color)}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full mx-auto mb-3 shadow-lg border-4 border-white" style={{
                  backgroundColor: color.hex
                }}></div>
                        <h4 className="font-semibold text-sm mb-1">{color.name}</h4>
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-xs mr-1">{getSeasonIcon(color.season)}</span>
                          <span className="text-xs mr-1">{getStyleIcon(color.style)}</span>
                          {color.kol && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="flex items-center text-yellow-500">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            <span className="text-xs">{color.popularity}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                          <Button size="sm" variant="ghost" onClick={e => {
                    e.stopPropagation();
                    handleFavorite(color.id);
                  }}>
                        <Heart className={`w-4 h-4 ${favoriteColors.includes(color.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div> : <div className="space-y-4">
                {getFilteredColors().map(color => <Card key={color.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleColorSelect(color)}>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full mr-4 shadow-lg border-4 border-white" style={{
                  backgroundColor: color.hex
                }}></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{color.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{color.description}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs">{getSeasonIcon(color.season)} {color.season}</span>
                            <span className="text-xs">{getStyleIcon(color.style)} {color.style}</span>
                            <div className="flex items-center text-yellow-500">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              <span className="text-xs">{color.popularity}%</span>
                            </div>
                            {color.kol && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" onClick={e => {
                    e.stopPropagation();
                    handleFavorite(color.id);
                  }}>
                            <Heart className={`w-4 h-4 ${favoriteColors.includes(color.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                          <Button size="sm" onClick={e => {
                    e.stopPropagation();
                    handleTryColor(color);
                  }}>
                            试用
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </>}

        {activeTab === 'trending' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">潮流趋势分析</h2>
              <p className="text-gray-600">实时追踪色彩流行趋势，把握时尚脉搏</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingColors.map(trend => {
            const color = getAllColors().find(c => c.name === trend.name);
            return <Card key={trend.id}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg" style={{
                    backgroundColor: color?.hex || '#ccc'
                  }}></div>
                      <h3 className="text-xl font-bold mb-2">{trend.name}</h3>
                      <div className="flex items-center justify-center mb-4">
                        {trend.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600 mr-2" />}
                        {trend.trend === 'down' && <TrendingUp className="w-5 h-5 text-red-600 mr-2 rotate-180" />}
                        {trend.trend === 'stable' && <div className="w-5 h-5 bg-gray-400 rounded-full mr-2" />}
                        <span className={`font-semibold ${trend.trend === 'up' ? 'text-green-600' : trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                          {trend.increase}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{color?.description}</p>
                      <Button onClick={() => color && handleColorSelect(color)} className="w-full bg-purple-600 hover:bg-purple-700">
                        查看详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>;
          })}
            </div>
          </>}

        {activeTab === 'favorites' && <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">我的收藏</h2>
              <p className="text-gray-600">快速访问您喜爱的颜色</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {getAllColors().filter(color => favoriteColors.includes(color.id)).map(color => <Card key={color.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleColorSelect(color)}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full mx-auto mb-3 shadow-lg border-4 border-white" style={{
                  backgroundColor: color.hex
                }}></div>
                      <h4 className="font-semibold text-sm mb-1">{color.name}</h4>
                      <div className="flex items-center justify-center">
                        <Button size="sm" variant="ghost" onClick={e => {
                    e.stopPropagation();
                    handleFavorite(color.id);
                  }}>
                          <Heart className="w-4 h-4 fill-current text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {favoriteColors.length === 0 && <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">还没有收藏任何颜色</p>
                <Button onClick={() => setActiveTab('browse')} className="mt-4 bg-purple-600 hover:bg-purple-700">
                  去浏览颜色
                </Button>
              </div>}
          </>}

        {activeTab === 'preview' && selectedColor && <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{selectedColor.name}</h2>
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 左侧：颜色展示 */}
                  <div>
                    <div className="text-center mb-6">
                      <div className="w-48 h-48 rounded-full mx-auto mb-4 shadow-xl" style={{
                    backgroundColor: selectedColor.hex
                  }}></div>
                      <h3 className="text-xl font-bold mb-2">{selectedColor.name}</h3>
                      <p className="text-gray-600">{selectedColor.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">色彩代码</span>
                        <span className="font-mono font-semibold">{selectedColor.hex}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">适合季节</span>
                        <span className="text-sm">{getSeasonIcon(selectedColor.season)} {selectedColor.season}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">适合肤色</span>
                        <span className="text-sm">{selectedColor.skin}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">风格类型</span>
                        <span className="text-sm">{getStyleIcon(selectedColor.style)} {selectedColor.style}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">人气指数</span>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          <span className="font-semibold">{selectedColor.popularity}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右侧：效果预览和操作 */}
                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">效果预览</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full mx-auto mb-2 bg-gradient-to-b from-gray-300 to-gray-400 relative overflow-hidden">
                            <div className="absolute inset-0" style={{
                          backgroundColor: selectedColor.hex,
                          opacity: 0.8
                        }}></div>
                          </div>
                          <p className="text-sm">白皙肤色</p>
                        </div>
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full mx-auto mb-2 bg-gradient-to-b from-gray-400 to-gray-500 relative overflow-hidden">
                            <div className="absolute inset-0" style={{
                          backgroundColor: selectedColor.hex,
                          opacity: 0.8
                        }}></div>
                          </div>
                          <p className="text-sm">中等肤色</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">搭配建议</h4>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-purple-50 rounded">
                          <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                          <span className="text-sm">适合搭配简约妆容</span>
                        </div>
                        <div className="flex items-center p-2 bg-blue-50 rounded">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm">建议使用同色系服装</span>
                        </div>
                        <div className="flex items-center p-2 bg-green-50 rounded">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm">适合日常和职场场合</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleFavorite(selectedColor.id)} variant="outline" className="flex-1">
                        <Heart className={`w-4 h-4 mr-2 ${favoriteColors.includes(selectedColor.id) ? 'fill-current text-red-500' : ''}`} />
                        {favoriteColors.includes(selectedColor.id) ? '已收藏' : '收藏'}
                      </Button>
                      <Button onClick={() => handleTryColor(selectedColor)} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Zap className="w-4 h-4 mr-2" />
                        试用颜色
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </div>;
}