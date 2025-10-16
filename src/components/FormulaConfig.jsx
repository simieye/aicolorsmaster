// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Palette, Droplet } from 'lucide-react';

export function FormulaConfig({
  currentColor,
  targetColor,
  hairType,
  desiredEffect,
  onCurrentColorChange,
  onTargetColorChange,
  onHairTypeChange,
  onDesiredEffectChange
}) {
  // 预设颜色
  const presetColors = [{
    name: '自然黑',
    code: '#000000'
  }, {
    name: '深棕',
    code: '#4A2C2A'
  }, {
    name: '巧克力',
    code: '#3B2F2F'
  }, {
    name: '铜色',
    code: '#B87333'
  }, {
    name: '金色',
    code: '#FFD700'
  }, {
    name: '玫瑰金',
    code: '#B76E79'
  }, {
    name: '雾霾蓝',
    code: '#778899'
  }, {
    name: '薄荷绿',
    code: '#98FB98'
  }];

  // 发质类型
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

  // 期望效果
  const desiredEffects = [{
    value: 'natural',
    label: '自然效果'
  }, {
    value: 'vibrant',
    label: '鲜艳效果'
  }, {
    value: 'gradient',
    label: '渐变效果'
  }, {
    value: 'highlight',
    label: '挑染效果'
  }, {
    value: 'full',
    label: '全染效果'
  }];
  return <div className="space-y-6">
      {/* 颜色选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            颜色配置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              当前颜色
            </label>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg border-2 border-gray-300" style={{
              backgroundColor: currentColor
            }} />
              <input type="color" value={currentColor} onChange={e => onCurrentColorChange(e.target.value)} className="h-10 w-20" />
              <span className="text-sm font-mono">{currentColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              目标颜色
            </label>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-lg border-2 border-gray-300" style={{
              backgroundColor: targetColor
            }} />
              <input type="color" value={targetColor} onChange={e => onTargetColorChange(e.target.value)} className="h-10 w-20" />
              <span className="text-sm font-mono">{targetColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              预设颜色
            </label>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map(color => <button key={color.code} onClick={() => onTargetColorChange(color.code)} className="relative group" title={color.name}>
                  <div className="w-full h-12 rounded-lg border-2 border-gray-300 hover:border-purple-500 transition-colors" style={{
                backgroundColor: color.code
              }} />
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {color.name}
                  </span>
                </button>)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 发质设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Droplet className="w-5 h-5 mr-2" />
            发质设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              发质类型
            </label>
            <select value={hairType} onChange={e => onHairTypeChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              {hairTypes.map(type => <option key={type.value} value={type.value}>
                  {type.label}
                </option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              期望效果
            </label>
            <select value={desiredEffect} onChange={e => onDesiredEffectChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              {desiredEffects.map(effect => <option key={effect.value} value={effect.value}>
                  {effect.label}
                </option>)}
            </select>
          </div>
        </CardContent>
      </Card>
    </div>;
}