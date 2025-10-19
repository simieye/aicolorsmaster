// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus } from 'lucide-react';

export const BudgetManagement = ({
  budgetData,
  budgetExecution
}) => {
  const {
    toast
  } = useToast();

  // 处理新建预算
  const handleCreateBudget = () => {
    toast({
      title: "新建预算",
      description: "正在打开预算创建界面"
    });
  };

  // 渲染预算卡片
  const renderBudgetCard = budget => {
    return <div key={budget.title} className="bg-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">{budget.title}</h3>
        <div className="text-3xl font-bold text-white mb-2">¥{budget.total.toLocaleString()}</div>
        <div className="mb-4">
          <div className="flex justify-between text-white/60 text-sm mb-1">
            <span>已使用</span>
            <span>{budget.percentage}%</span>
          </div>
          <div className="bg-white/20 rounded-full h-3">
            <div className={`budget-progress h-3 rounded-full ${budget.color}`} style={{
            width: `${budget.percentage}%`
          }}></div>
          </div>
        </div>
        <div className="text-white/60 text-sm">剩余预算: ¥{budget.remaining.toLocaleString()}</div>
      </div>;
  };

  // 获取状态颜色
  const getStatusColor = status => {
    switch (status) {
      case '正常':
        return 'bg-green-500/20 text-green-300';
      case '超支':
        return 'bg-red-500/20 text-red-300';
      case '节约':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };
  return <div className="space-y-8">
      {/* 预算概览 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">预算管理</h2>
            <Button onClick={handleCreateBudget} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              新建预算
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {budgetData.map(renderBudgetCard)}
          </div>
        </CardContent>
      </Card>

      {/* 预算执行情况 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">预算执行情况</h2>
          <div className="bg-white/10 rounded-xl p-6">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">预算项目</th>
                  <th className="text-right py-3 px-4">预算金额</th>
                  <th className="text-right py-3 px-4">实际支出</th>
                  <th className="text-right py-3 px-4">执行率</th>
                  <th className="text-right py-3 px-4">状态</th>
                </tr>
              </thead>
              <tbody>
                {budgetExecution.map((item, index) => <tr key={index} className="border-b border-white/10">
                    <td className="py-3 px-4">{item.item}</td>
                    <td className="text-right py-3 px-4">¥{item.budget.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">¥{item.actual.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{item.percentage}%</td>
                    <td className="text-right py-3 px-4">
                      <span className={`${getStatusColor(item.status)} px-2 py-1 rounded-full text-sm`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
};