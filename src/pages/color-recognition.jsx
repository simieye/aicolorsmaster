// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Upload, Palette, Droplets, CheckCircle, AlertCircle } from 'lucide-react';

export default function ColorRecognition(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      analyzeImage(file);
    }
  };
  const analyzeImage = async file => {
    setIsAnalyzing(true);

    // 模拟AI分析过程
    setTimeout(() => {
      const mockResult = {
        rgb: [120, 80, 60],
        hex: '#78503C',
        baseColor: '自然深棕',
        condition: '轻微受损',
        porosity: '中等',
        recommendations: ['建议先进行发质修复', '适合选择暖色调染发', '需要使用护色洗发水'],
        suitableColors: [{
          name: '奶茶棕',
          hex: '#D2B48C',
          match: '95%'
        }, {
          name: '焦糖色',
          hex: '#CD853F',
          match: '92%'
        }, {
          name: '巧克力色',
          hex: '#3B2F2F',
          match: '88%'
        }]
      };
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      toast({
        title: "分析完成",
        description: "BaseColor Agent 已完成头发底色分析"
      });
    }, 3000);
  };
  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI智能色彩识别</h1>
          <p className="text-gray-600">BaseColor Agent 精准分析您的头发底色</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：图片上传区域 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2" />
                  拍照识别
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                  {isAnalyzing ? <div className="space-y-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
                      <p className="text-gray-600">AI正在分析中...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{
                      width: '70%'
                    }}></div>
                      </div>
                    </div> : <div className="space-y-4">
                      <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
                        <Camera className="w-12 h-12 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">上传头发照片</h3>
                        <p className="text-gray-600 text-sm mb-4">请确保光线充足，头发清晰可见</p>
                      </div>
                      <div className="flex gap-4 justify-center">
                        <Button onClick={handleCameraCapture} className="bg-purple-600 hover:bg-purple-700">
                          <Camera className="mr-2 w-4 h-4" />
                          拍照
                        </Button>
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2 w-4 h-4" />
                          上传
                        </Button>
                      </div>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：分析结果 */}
          <div>
            {analysisResult ? <div className="space-y-6">
                {/* RGB分析结果 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="mr-2" />
                      色彩分析结果
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">RGB值：</span>
                        <span className="font-mono font-semibold">
                          {analysisResult.rgb.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">HEX值：</span>
                        <span className="font-mono font-semibold">
                          {analysisResult.hex}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">底色判断：</span>
                        <span className="font-semibold">{analysisResult.baseColor}</span>
                      </div>
                      <div className="h-16 rounded-lg shadow-inner" style={{
                    backgroundColor: analysisResult.hex
                  }}></div>
                    </div>
                  </CardContent>
                </Card>

                {/* 发质分析 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets className="mr-2" />
                      发质分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">发质状况：</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${analysisResult.condition === '健康' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {analysisResult.condition}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">孔隙度：</span>
                        <span className="font-semibold">{analysisResult.porosity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 推荐色彩 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2" />
                      推荐色彩
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.suitableColors.map((color, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full mr-3" style={{
                        backgroundColor: color.hex
                      }}></div>
                            <div>
                              <p className="font-semibold">{color.name}</p>
                              <p className="text-sm text-gray-600">匹配度 {color.match}</p>
                            </div>
                          </div>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            选择
                          </Button>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                {/* 注意事项 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-2">染发建议</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {analysisResult.recommendations.map((rec, index) => <li key={index}>• {rec}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div> : <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Palette className="w-8 h-8" />
                    </div>
                    <p>请上传照片进行AI分析</p>
                  </div>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
}