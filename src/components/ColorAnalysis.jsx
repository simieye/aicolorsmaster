// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Camera, Upload, Palette, Sun, Cloud, Snowflake, Flower, CheckCircle, AlertCircle } from 'lucide-react';

export function ColorAnalysis({
  onAnalysisComplete,
  onSkinToneDetected
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('skin');

  // 模拟肤色分析
  const analyzeSkinTone = async () => {
    setIsAnalyzing(true);

    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockResult = {
      skinTone: '暖色调',
      skinUndertone: '黄色调',
      season: '春季',
      recommendedColors: ['樱花粉', '蜜桃橙', '奶茶棕', '焦糖色'],
      avoidColors: ['冷蓝色', '银灰色', '纯白色'],
      confidence: 85,
      analysis: {
        warmth: 75,
        brightness: 60,
        contrast: 45
      }
    };
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    onAnalysisComplete(mockResult);
    onSkinToneDetected(mockResult.skinTone);
  };

  // 模拟发质分析
  const analyzeHairType = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockResult = {
      hairType: '细软发质',
      damageLevel: '轻度受损',
      porosity: '中等',
      elasticity: '良好',
      recommendedColors: ['浅色调', '柔和色系'],
      processingTime: '25-30分钟',
      aftercare: ['深层护理', '护色洗发水', '定期发膜']
    };
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    onAnalysisComplete(mockResult);
  };
  const handleImageUpload = type => {
    // 模拟图片上传和分析
    if (type === 'skin') {
      analyzeSkinTone();
    } else {
      analyzeHairType();
    }
  };
  const getSeasonIcon = season => {
    switch (season) {
      case '春季':
        return <Flower className="w-5 h-5 text-pink-500" />;
      case '夏季':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case '秋季':
        return <Cloud className="w-5 h-5 text-orange-500" />;
      case '冬季':
        return <Snowflake className="w-5 h-5 text-blue-500" />;
      default:
        return <Palette className="w-5 h-5 text-gray-500" />;
    }
  };
  return <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          智能色彩分析
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 分析类型选择 */}
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setActiveTab('skin')} className={`flex-1 py-2 px-4 rounded-lg transition-colors ${activeTab === 'skin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            肤色分析
          </button>
          <button onClick={() => setActiveTab('hair')} className={`flex-1 py-2 px-4 rounded-lg transition-colors ${activeTab === 'hair' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            发质分析
          </button>
        </div>

        {/* 分析内容 */}
        {activeTab === 'skin' ? <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                上传您的照片，我们将分析您的肤色特征，为您推荐最适合的发色
              </p>
            </div>

            {!analysisResult ? <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => handleImageUpload('skin')} disabled={isAnalyzing} className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Camera className="w-6 h-6" />
                    <span className="text-sm">拍照分析</span>
                  </Button>
                  <Button variant="outline" onClick={() => handleImageUpload('skin')} disabled={isAnalyzing} className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">上传照片</span>
                  </Button>
                </div>

                {isAnalyzing && <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">正在分析您的肤色特征...</p>
                  </div>}
              </div> : <div className="space-y-4">
                {/* 分析结果 */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">分析结果</h3>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">分析完成</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">肤色类型</p>
                      <p className="font-medium">{analysisResult.skinTone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">肤色基调</p>
                      <p className="font-medium">{analysisResult.skinUndertone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">适合季节</p>
                      <div className="flex items-center">
                        {getSeasonIcon(analysisResult.season)}
                        <span className="font-medium ml-1">{analysisResult.season}型</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">匹配度</p>
                      <p className="font-medium">{analysisResult.confidence}%</p>
                    </div>
                  </div>
                </div>

                {/* 推荐色彩 */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">推荐色彩</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.recommendedColors.map((color, index) => <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {color}
                      </span>)}
                  </div>
                </div>

                {/* 避免色彩 */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">避免色彩</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.avoidColors.map((color, index) => <span key={index} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                        {color}
                      </span>)}
                  </div>
                </div>

                <Button onClick={() => setAnalysisResult(null)} variant="outline" className="w-full">
                  重新分析
                </Button>
              </div>}
          </div> : <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                分析您的发质状况，为您推荐最合适的染发方案和护理建议
              </p>
            </div>

            {!analysisResult ? <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => handleImageUpload('hair')} disabled={isAnalyzing} className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Camera className="w-6 h-6" />
                    <span className="text-sm">拍照分析</span>
                  </Button>
                  <Button variant="outline" onClick={() => handleImageUpload('hair')} disabled={isAnalyzing} className="h-24 flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">上传照片</span>
                  </Button>
                </div>

                {isAnalyzing && <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">正在分析您的发质状况...</p>
                  </div>}
              </div> : <div className="space-y-4">
                {/* 发质分析结果 */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">发质分析结果</h3>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">分析完成</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">发质类型</p>
                      <p className="font-medium">{analysisResult.hairType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">受损程度</p>
                      <p className="font-medium">{analysisResult.damageLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">孔隙度</p>
                      <p className="font-medium">{analysisResult.porosity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">弹性</p>
                      <p className="font-medium">{analysisResult.elasticity}</p>
                    </div>
                  </div>
                </div>

                {/* 处理建议 */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">推荐色彩</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.recommendedColors.map((color, index) => <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {color}
                      </span>)}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">处理时间</h4>
                  <p className="text-sm text-gray-600">{analysisResult.processingTime}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">护理建议</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysisResult.aftercare.map((item, index) => <li key={index} className="flex items-center">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </li>)}
                  </ul>
                </div>

                <Button onClick={() => setAnalysisResult(null)} variant="outline" className="w-full">
                  重新分析
                </Button>
              </div>}
          </div>}
      </CardContent>
    </Card>;
}