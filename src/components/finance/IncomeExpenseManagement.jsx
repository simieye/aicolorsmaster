// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Download, Cut, ShoppingCart, Crown, Box, Users, Home } from 'lucide-react';

export const IncomeExpenseManagement = ({
  incomeRecords,
  expenseRecords,
  incomeCategories,
  expenseCategories
}) => {
  const {
    toast
  } = useToast();

  // 处理添加收入
  const handleAddIncome = () => {
    toast({
      title: "添加收入",
      description: "正在打开收入添加界面"
    });
  };

  // 处理添加支出
  const handleAddExpense = () => {
    toast({
      title: "添加支出",
      description: "正在打开支出添加界面"
    });
  };

  // 处理导出
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出财务数据"
    });
  };

  // 渲染收支记录
  const renderTransactionRecord = record => {
    const Icon = record.icon;
    return <div key={record.id} className="transaction-item bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${record.color} rounded-full flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">{record.title}</h4>
              <p className="text-white/60 text-sm">{record.time}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`${record.color === 'bg-green-500' ? 'text-green-400' : 'text-red-400'} font-semibold`}>
              {record.color === 'bg-green-500' ? '+' : '-'}¥{record.amount.toLocaleString()}
            </div>
            <div className="text-white/60 text-sm">{record.category}</div>
          </div>
        </div>
      </div>;
  };

  // 渲染分类统计
  const renderCategoryStat = (category, isIncome = true) => {
    return <div key={category.name} className="flex items-center justify-between">
        <span className="text-white/60">{category.name}</span>
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-white/20 rounded-full h-3">
            <div className={`progress-bar h-3 rounded-full ${isIncome ? 'bg-green-400' : 'bg-red-400'}`} style={{
            width: `${category.percentage}%`
          }}></div>
          </div>
          <span className="text-white font-medium">¥{category.amount.toLocaleString()}</span>
        </div>
      </div>;
  };
  return <div className="space-y-8">
      {/* 收支记录 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">收支记录</h2>
            <div className="flex items-center space-x-4">
              <Button onClick={handleAddIncome} className="bg-green-500 hover:bg-green-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                收入
              </Button>
              <Button onClick={handleAddExpense} className="bg-red-500 hover:bg-red-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                支出
              </Button>
              <Button onClick={handleExport} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 收入记录 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">最近收入</h3>
              <div className="space-y-3">
                {incomeRecords.map(renderTransactionRecord)}
              </div>
            </div>
            
            {/* 支出记录 */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">最近支出</h3>
              <div className="space-y-3">
                {expenseRecords.map(renderTransactionRecord)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 收支分类统计 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">收支分类统计</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">收入分类</h3>
              <div className="space-y-3">
                {incomeCategories.map(category => renderCategoryStat(category, true))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">支出分类</h3>
              <div className="space-y-3">
                {expenseCategories.map(category => renderCategoryStat(category, false))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};