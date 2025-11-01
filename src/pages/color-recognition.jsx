// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Camera, Upload, Palette, Eye, Droplets, Sparkles, Loader2, RefreshCw, Download, Share2, AlertTriangle } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function ColorRecognitionPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "请选择小于10MB的图片文件",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        setImagePreview(reader.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCameraCapture = () => {
    // 这里可以集成相机功能
    fileInputRef.current?.click();
  };
  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "请先选择图片",
        description: "需要上传图片才能进行颜色分析",
        variant: "destructive"
      });
      return;
    }
    setIsAnalyzing(true);
    try {
      // 创建图片描述（实际应用中可能需要使用图像识别API）
      const imageDescription = `用户上传了一张染发相关的图片，需要分析颜色和提供染发建议。图片文件名：${selectedImage.name}`;
      const userRequirements = {
        goal: 'color_analysis',
        preferences: {
          style: 'natural',
          maintenance: 'easy'
        }
      };
      const analysis = await deepseekService.analyzeColor(imageDescription, userRequirements);
      setAnalysisResult({
        id: Date.now(),
        imageInfo: {
          name: selectedImage.name,
          size: selectedImage.size,
          type: selectedImage.type
        },
        analysis: analysis,
        analyzedAt: new Date()
      });
      toast({
        title: "分析完成",
        description: "AI已为您完成颜色分析"
      });
    } catch (error) {
      console.error('颜色分析失败:', error);
      toast({
        title: "分析失败",
        description: "请检查网络连接后重试",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleShareResult = async () => {
    if (!analysisResult) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: '颜色分析结果',
          text: analysisResult.analysis
        });
      } else {
        await navigator.clipboard.writeText(analysisResult.analysis);
        toast({
          title: "已复制到剪贴板",
          description: "分析结果已复制"
        });
      }
    } catch (error) {
      console.log('分享失败:', error);
    }
  };
  const handleDownloadResult = () => {
    if (!analysisResult) return;
    const content = `颜色分析结果\n\n${analysisResult.analysis}\n\n分析时间：${analysisResult.analyzedAt.toLocaleString()}`;
    const blob = new Blob([content], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `颜色分析_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="AI颜色识别" showBack={true} />
        
        <div className="pb-20">
          {/* 头部介绍 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI颜色识别</h1>
              </div>
              <p className="text-indigo-100">
                上传染发图片，AI为您分析颜色特征并提供专业的染发建议
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* 图片上传区域 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>图片上传</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!imagePreview ? <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      上传染发图片进行颜色分析
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        选择图片
                      </Button>
                      <Button variant="outline" onClick={handleCameraCapture}>
                        <Camera className="w-4 h-4 mr-2" />
                        拍照上传
                      </Button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <p className="text-xs text-muted-foreground mt-4">
                      支持 JPG、PNG 格式，文件大小不超过 10MB
                    </p>
                  </div> : <div className="space-y-4">
                    <div className="relative">
                      <img src={imagePreview} alt="预览" className="w-full max-h-96 object-contain rounded-lg bg-muted" />
                      <Button variant="destructive" size="sm" onClick={handleReset} className="absolute top-2 right-2">
                        重新选择
                      </Button>
                    </div>
                    <div className="flex space-x-4">
                      <Button onClick={analyzeImage} disabled={isAnalyzing} className="flex-1">
                        {isAnalyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />正在分析...</> : <><Eye className="w-4 h-4 mr-2" />开始分析</>}
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重置
                      </Button>
                    </div>
                  </div>}
              </CardContent>
            </Card>

            {/* 分析结果 */}
            {analysisResult && <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>分析结果</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleShareResult}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadResult}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{analysisResult.analysis}</pre>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>图片：{analysisResult.imageInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4" />
                      <span>大小：{(analysisResult.imageInfo.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="w-4 h-4" />
                      <span>分析时间：{analysisResult.analyzedAt.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {/* 使用提示 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>使用提示</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">拍照建议</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 在自然光下拍摄</li>
                      <li>• 确保光线充足均匀</li>
                      <li>• 避免阴影和反光</li>
                      <li>• 距离适中，清晰对焦</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">图片要求</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 支持 JPG、PNG 格式</li>
                      <li>• 文件大小不超过 10MB</li>
                      <li>• 建议分辨率 800x600 以上</li>
                      <li>• 避免过度处理的照片</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}