// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { FlaskConical, Palette, Droplets, Beaker, Clock, AlertTriangle, CheckCircle, Loader2, Sparkles, Download, Share2 } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;

export default function FormulaGenerationPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [requirements, setRequirements] = useState({
    targetColor: '',
    hairType: 'normal',
    hairLength: 'medium',
    desiredEffect: 'natural',
    allergyInfo: '',
    previousColor: '',
    specialRequirements: ''
  });
  const [generatedFormula, setGeneratedFormula] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedFormulas, setSavedFormulas] = useState([]);
  const handleInputChange = (field, value) => {
    setRequirements(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleGenerateFormula = async () => {
    if (!requirements.targetColor) {
      toast({
        title: "请输入目标颜色",
        description: "目标颜色是生成配方的必要信息",
        variant: "destructive"
      });
      return;
    }
    setIsGenerating(true);
    try {
      const formula = await deepseekService.generateHairDyeFormula(requirements);
      setGeneratedFormula({
        id: Date.now(),
        requirements: {
          ...requirements
        },
        formula: formula,
        createdAt: new Date(),
        createdBy: $w?.auth?.currentUser?.name || '用户'
      });
      toast({
        title: "配方生成成功",
        description: "AI已为您生成专属染发配方"
      });
    } catch (error) {
      console.error('生成配方失败:', error);
      toast({
        title: "生成失败",
        description: "请检查网络连接后重试",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };
  const handleSaveFormula = () => {
    if (!generatedFormula) return;
    setSavedFormulas(prev => [generatedFormula, ...prev]);
    toast({
      title: "保存成功",
      description: "配方已保存到历史记录"
    });
  };
  const handleShareFormula = async () => {
    if (!generatedFormula) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI染发配方',
          text: generatedFormula.formula
        });
      } else {
        await navigator.clipboard.writeText(generatedFormula.formula);
        toast({
          title: "已复制到剪贴板",
          description: "配方内容已复制"
        });
      }
    } catch (error) {
      console.log('分享失败:', error);
    }
  };
  const handleDownloadFormula = () => {
    if (!generatedFormula) return;
    const blob = new Blob([generatedFormula.formula], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `染发配方_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const colorOptions = [{
    value: 'black',
    label: '黑色'
  }, {
    value: 'brown',
    label: '棕色'
  }, {
    value: 'blonde',
    label: '金色'
  }, {
    value: 'red',
    label: '红色'
  }, {
    value: 'purple',
    label: '紫色'
  }, {
    value: 'blue',
    label: '蓝色'
  }, {
    value: 'gray',
    label: '灰色'
  }, {
    value: 'custom',
    label: '自定义'
  }];
  const hairTypes = [{
    value: 'normal',
    label: '正常发质'
  }, {
    value: 'dry',
    label: '干性发质'
  }, {
    value: 'oily',
    label: '油性发质'
  }, {
    value: 'damaged',
    label: '受损发质'
  }, {
    value: 'colored',
    label: '已染发'
  }];
  const hairLengths = [{
    value: 'short',
    label: '短发'
  }, {
    value: 'medium',
    label: '中等长度'
  }, {
    value: 'long',
    label: '长发'
  }, {
    value: 'very_long',
    label: '超长发'
  }];
  const effects = [{
    value: 'natural',
    label: '自然效果'
  }, {
    value: 'vibrant',
    label: '鲜艳效果'
  }, {
    value: 'subtle',
    label: '微妙效果'
  }, {
    value: 'dramatic',
    label: '夸张效果'
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="AI配方生成" showBack={true} />
        
        <div className="pb-20">
          {/* 头部介绍 */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <FlaskConical className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI配方生成</h1>
              </div>
              <p className="text-green-100">
                基于您的需求和发质状况，AI为您生成安全、有效的专属染发配方
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* 需求输入 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>染发需求</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      目标颜色 *
                    </label>
                    <select value={requirements.targetColor} onChange={e => handleInputChange('targetColor', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">请选择目标颜色</option>
                      {colorOptions.map(color => <option key={color.value} value={color.value}>
                          {color.label}
                        </option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      发质类型
                    </label>
                    <select value={requirements.hairType} onChange={e => handleInputChange('hairType', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      {hairTypes.map(type => <option key={type.value} value={type.value}>
                          {type.label}
                        </option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      发发长度
                    </label>
                    <select value={requirements.hairLength} onChange={e => handleInputChange('hairLength', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      {hairLengths.map(length => <option key={length.value} value={length.value}>
                          {length.label}
                        </option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      期望效果
                    </label>
                    <select value={requirements.desiredEffect} onChange={e => handleInputChange('desiredEffect', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      {effects.map(effect => <option key={effect.value} value={effect.value}>
                          {effect.label}
                        </option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    之前染发颜色
                  </label>
                  <input type="text" value={requirements.previousColor} onChange={e => handleInputChange('previousColor', e.target.value)} placeholder="如无请留空" className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    过敏信息
                  </label>
                  <textarea value={requirements.allergyInfo} onChange={e => handleInputChange('allergyInfo', e.target.value)} placeholder="请描述已知的过敏情况，如无请留空" className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={3} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    特殊要求
                  </label>
                  <textarea value={requirements.specialRequirements} onChange={e => handleInputChange('specialRequirements', e.target.value)} placeholder="其他特殊要求或注意事项" className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" rows={3} />
                </div>
                
                <Button onClick={handleGenerateFormula} disabled={isGenerating || !requirements.targetColor} className="w-full">
                  {isGenerating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />正在生成配方...</> : <><Sparkles className="w-4 h-4 mr-2" />生成配方</>}
                </Button>
              </CardContent>
            </Card>

            {/* 生成的配方 */}
            {generatedFormula && <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Beaker className="w-5 h-5" />
                    <span>生成的配方</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSaveFormula}>
                      保存
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShareFormula}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadFormula}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{generatedFormula.formula}</pre>
                  </div>
                  <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>生成时间：{generatedFormula.createdAt.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>}

            {/* 安全提示 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>安全提示</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>请在使用前进行皮肤过敏测试</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>建议在专业发型师指导下使用</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>使用前请仔细阅读产品说明书</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>如有不适请立即停止使用并就医</span>
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