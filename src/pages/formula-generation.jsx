// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Zap, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { FormulaConfig } from '@/components/FormulaConfig';
// @ts-ignore;
import { FormulaResult } from '@/components/FormulaResult';
export default function FormulaGeneration(props) {
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
  const [currentColor, setCurrentColor] = useState('#000000');
  const [targetColor, setTargetColor] = useState('#B76E79');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFormula, setGeneratedFormula] = useState(null);
  const [savedFormulas, setSavedFormulas] = useState([]);
  const [hairType, setHairType] = useState('normal');
  const [desiredEffect, setDesiredEffect] = useState('natural');

  // 生成配方
  const generateFormula = async () => {
    setIsGenerating(true);
    try {
      // 模拟配方生成
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockFormula = {
        id: Date.now(),
        name: `${hairType === 'normal' ? '正常' : hairType === 'dry' ? '干性' : hairType === 'oily' ? '油性' : hairType === 'damaged' ? '受损' : '已染'}发质${desiredEffect === 'natural' ? '自然' : desiredEffect === 'vibrant' ? '鲜艳' : desiredEffect === 'gradient' ? '渐变' : desiredEffect === 'highlight' ? '挑染' : '全染'}配方`,
        currentColor: currentColor,
        targetColor: targetColor,
        ingredients: [{
          name: '染发剂A',
          amount: '50ml',
          percentage: '30%'
        }, {
          name: '染发剂B',
          amount: '30ml',
          percentage: '20%'
        }, {
          name: '双氧奶',
          amount: '60ml',
          percentage: '40%'
        }, {
          name: '护发素',
          amount: '10ml',
          percentage: '10%'
        }],
        steps: ['1. 将头发清洗干净并擦干', '2. 将染发剂A和B按比例混合', '3. 加入双氧奶搅拌均匀', '4. 均匀涂抹在头发上', '5. 等待30-45分钟', '6. 清洗并使用护发素'],
        processingTime: '30-45分钟',
        difficulty: hairType === 'damaged' ? '困难' : '中等',
        successRate: 85,
        warnings: hairType === 'damaged' ? ['发质受损，建议先做护理', '降低双氧奶浓度'] : []
      };
      setGeneratedFormula(mockFormula);
      toast({
        title: "配方生成成功",
        description: "已为您生成专属染发配方"
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: "请重试或调整参数",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // 保存配方
  const saveFormula = () => {
    if (!generatedFormula) return;
    const newFormula = {
      ...generatedFormula,
      savedAt: new Date().toISOString()
    };
    setSavedFormulas(prev => [newFormula, ...prev]);
    toast({
      title: "保存成功",
      description: "配方已保存到我的配方"
    });
  };

  // 重置配方
  const resetFormula = () => {
    setGeneratedFormula(null);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('formulaGeneration.title', '配方生成')}
          </h1>
          <p className="text-gray-600">
            {t('formulaGeneration.subtitle', '智能分析发质，生成专业染发配方')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 配置区域 */}
          <div>
            <FormulaConfig currentColor={currentColor} targetColor={targetColor} hairType={hairType} desiredEffect={desiredEffect} onCurrentColorChange={setCurrentColor} onTargetColorChange={setTargetColor} onHairTypeChange={setHairType} onDesiredEffectChange={setDesiredEffect} />

            {/* 生成按钮 */}
            <Button onClick={generateFormula} disabled={isGenerating} className="w-full py-3 mt-6">
              {isGenerating ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : <Zap className="w-5 h-5 mr-2" />}
              {isGenerating ? '生成中...' : '生成配方'}
            </Button>
          </div>

          {/* 结果区域 */}
          <div>
            <FormulaResult formula={generatedFormula} onSave={saveFormula} onReset={resetFormula} />
          </div>
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="formula-generation" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}