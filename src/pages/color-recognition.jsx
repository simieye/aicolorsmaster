// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Upload, Palette, Droplet, Eye, Zap, RefreshCw, Download, Share2, Heart, Star, MessageSquare, Search, Filter } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function ColorRecognition(props) {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [similarColors, setSimilarColors] = useState([]);
  const [recommendedFormulas, setRecommendedFormulas] = useState([]);
  const fileInputRef = useRef(null);

  // 处理图片上传
  const handleImageUpload = file => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "图片大小不能超过10MB",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage(e.target.result);
        setRecognitionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // 拍照功能
  const handleCameraCapture = () => {
    // 模拟拍照功能
    toast({
      title: "相机功能",
      description: "正在启动相机..."
    });
  };

  // 分析颜色
  const analyzeColor = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    try {
      // 模拟颜色分析
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResult = {
        primaryColor: {
          name: '玫瑰金',
          code: '#B76E79',
          rgb: 'rgb(183, 110, 121)',
          hsl: 'hsl(350, 34%, 57%)',
          confidence: 95
        },
        colorPalette: [{
          name: '深玫瑰',
          code: '#8B4513',
          percentage: 35
        }, {
          name: '浅玫瑰',
          code: '#FFB6C1',
          percentage: 25
        }, {
          name: '金色',
          code: '#FFD700',
          percentage: 20
        }, {
          name: '棕色',
          code: '#A0522D',
          percentage: 20
        }]
      };
      setRecognitionResult(mockResult);

      // 设置相似颜色
      setSimilarColors([{
        id: 1,
        name: '珊瑚粉',
        code: '#F88379',
        similarity: 92
      }, {
        id: 2,
        name: '桃红色',
        code: '#E6A8C7',
        similarity: 88
      }, {
        id: 3,
        name: '酒红色',
        code: '#722F37',
        similarity: 85
      }, {
        id: 4,
        name: '铜棕色',
        code: '#B87333',
        similarity: 82
      }]);

      // 设置推荐配方
      setRecommendedFormulas([{
        id: 1,
        name: '玫瑰金渐变配方',
        difficulty: '中等',
        rating: 4.8,
        match: 96
      }, {
        id: 2,
        name: '暖色调混合配方',
        difficulty: '简单',
        rating: 4.6,
        match: 89
      }, {
        id: 3,
        name: '时尚挑染配方',
        difficulty: '困难',
        rating: 4.9,
        match: 85
      }]);
      toast({
        title: "分析完成",
        description: "成功识别颜色信息"
      });
    } catch (error) {
      toast({
        title: "分析失败",
        description: "请重试或更换图片",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 重新分析
  const resetAnalysis = () => {
    setSelectedImage(null);
    setRecognitionResult(null);
    setSimilarColors([]);
    setRecommendedFormulas([]);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('colorRecognition.title', '颜色识别')}
          </h1>
          <p className="text-gray-600">
            {t('colorRecognition.subtitle', '上传图片或拍照，AI智能识别颜色信息')}
          </p>
        </div>

        {/* 图片上传区域 */}
        {!selectedImage ? <Card className="mb-6">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Palette className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {t('colorRecognition.uploadTitle', '上传图片进行颜色识别')}
                </h2>
                <p className="text-gray-600 mb-6">
                  支持 JPG、PNG 格式，文件大小不超过 10MB
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()} className="flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    {t('colorRecognition.uploadImage', '上传图片')}
                  </Button>
                  <Button variant="outline" onClick={handleCameraCapture} className="flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    {t('colorRecognition.takePhoto', '拍照识色')}
                  </Button>
                </div>
                
                <input ref={fileInputRef} type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0])} className="hidden" />
              </div>
            </CardContent>
          </Card> : <div className="space-y-6">
            {/* 图片预览 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    {t('colorRecognition.imagePreview', '图片预览')}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={resetAnalysis}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      重新选择
                    </Button>
                    <Button onClick={analyzeColor} disabled={isAnalyzing}>
                      {isAnalyzing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                      {isAnalyzing ? '分析中...' : '开始分析'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <img src={selectedImage} alt="上传的图片" className="max-w-full h-auto rounded-lg shadow-lg max-h-96" />
                </div>
              </CardContent>
            </Card>

            {/* 分析结果 */}
            {recognitionResult && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplet className="w-5 h-5 mr-2" />
                    {t('colorRecognition.recognitionResult', '识别结果')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 主要颜色 */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">主要颜色</h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg shadow-inner" style={{
                  backgroundColor: recognitionResult.primaryColor.code
                }} />
                      <div>
                        <p className="font-medium">{recognitionResult.primaryColor.name}</p>
                        <p className="text-sm text-gray-600">{recognitionResult.primaryColor.code}</p>
                        <p className="text-xs text-gray-500">{recognitionResult.primaryColor.rgb}</p>
                        <p className="text-xs text-gray-500">{recognitionResult.primaryColor.hsl}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
                            <div className="bg-purple-600 h-2 rounded-full" style={{
                        width: `${recognitionResult.primaryColor.confidence}%`
                      }} />
                          </div>
                          <span className="ml-2 text-sm text-gray-600">{recognitionResult.primaryColor.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 色彩板 */}
                  <div>
                    <h3 className="font-semibold mb-3">色彩组成</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {recognitionResult.colorPalette.map((color, index) => <div key={index} className="text-center">
                          <div className="w-full h-16 rounded-lg shadow-inner mb-2" style={{
                    backgroundColor: color.code
                  }} />
                          <p className="text-sm font-medium">{color.name}</p>
                          <p className="text-xs text-gray-600">{color.percentage}%</p>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {/* 相似颜色 */}
            {similarColors.length > 0 && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    {t('colorRecognition.similarColors', '相似颜色')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {similarColors.map(color => <div key={color.id} className="text-center">
                        <div className="w-full h-16 rounded-lg shadow-inner mb-2" style={{
                  backgroundColor: color.code
                }} />
                        <p className="text-sm font-medium">{color.name}</p>
                        <p className="text-xs text-gray-600">{color.code}</p>
                        <p className="text-xs text-purple-600">{color.similarity}% 相似</p>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {/* 推荐配方 */}
            {recommendedFormulas.length > 0 && <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      {t('colorRecognition.recommendedFormulas', '推荐配方')}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
                pageId: 'formula-generation',
                params: {}
              })}>
                      查看全部
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendedFormulas.map(formula => <div key={formula.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h3 className="font-medium">{formula.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>难度: {formula.difficulty}</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              {formula.rating}
                            </div>
                            <span className="text-purple-600">{formula.match}% 匹配</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}
          </div>}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="color-recognition" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}