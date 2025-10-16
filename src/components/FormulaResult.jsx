// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Beaker, Save, RefreshCw } from 'lucide-react';

export function FormulaResult({
  formula,
  onSave,
  onReset
}) {
  if (!formula) {
    return <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Beaker className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">等待生成配方</h3>
          <p className="text-gray-600">
            请在左侧配置颜色和发质信息，然后点击生成配方
          </p>
        </CardContent>
      </Card>;
  }
  return <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Beaker className="w-5 h-5 mr-2" />
            配方结果
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="w-4 h-4 mr-1" />
              保存
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RefreshCw className="w-4 h-4 mr-1" />
              重置
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 配方信息 */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{formula.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">处理时间:</span>
              <span className="ml-2 font-medium">{formula.processingTime}</span>
            </div>
            <div>
              <span className="text-gray-600">难度等级:</span>
              <span className="ml-2 font-medium">{formula.difficulty}</span>
            </div>
            <div>
              <span className="text-gray-600">成功率:</span>
              <span className="ml-2 font-medium text-green-600">{formula.successRate}%</span>
            </div>
          </div>
        </div>

        {/* 配料表 */}
        <div>
          <h4 className="font-semibold mb-3">配料表</h4>
          <div className="space-y-2">
            {formula.ingredients.map((ingredient, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{ingredient.name}</p>
                  <p className="text-sm text-gray-600">{ingredient.percentage}</p>
                </div>
                <span className="font-mono text-sm">{ingredient.amount}</span>
              </div>)}
          </div>
        </div>

        {/* 操作步骤 */}
        <div>
          <h4 className="font-semibold mb-3">操作步骤</h4>
          <div className="space-y-2">
            {formula.steps.map((step, index) => <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </div>)}
          </div>
        </div>

        {/* 注意事项 */}
        {formula.warnings.length > 0 && <div>
            <h4 className="font-semibold mb-3 text-red-600">注意事项</h4>
            <div className="space-y-2">
              {formula.warnings.map((warning, index) => <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-sm text-red-700">{warning}</p>
                </div>)}
            </div>
          </div>}
      </CardContent>
    </Card>;
}