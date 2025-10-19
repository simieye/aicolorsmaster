// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Download, ChartBar, Balance, Water } from 'lucide-react';

export const FinancialReports = ({
  financialReports,
  profitStatement
}) => {
  const {
    toast
  } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // 处理生成报表
  const handleGenerateReport = reportType => {
    toast({
      title: "生成报表",
      description: `正在生成${reportType}`
    });
  };

  // 处理导出
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出财务报表"
    });
  };

  // 渲染报表卡片
  const renderReportCard = report => {
    const Icon = report.icon;
    return <div key={report.id} className="finance-card bg-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all duration-300">
        <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-white font-semibold mb-2">{report.title}</h3>
        <p className="text-white/60 text-sm mb-4">{report.description}</p>
        <Button onClick={() => handleGenerateReport(report.title)} variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
          生成报表 →
        </Button>
      </div>;
  };
  return <div className="space-y-8">
      {/* 报表类型选择 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">财务报表</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialReports.map(renderReportCard)}
          </div>
        </CardContent>
      </Card>

      {/* 报表预览 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">利润表预览</h2>
            <div className="flex items-center space-x-4">
              <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)} className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/50">
                <option value="month">本月</option>
                <option value="quarter">本季度</option>
                <option value="year">本年度</option>
              </select>
              <Button onClick={handleExport} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white">
                <Download className="w-4 h-4 mr-2" />
                导出Excel
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-6">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">项目</th>
                  <th className="text-right py-3 px-4">本月金额</th>
                  <th className="text-right py-3 px-4">上月金额</th>
                  <th className="text-right py-3 px-4">同比增长</th>
                </tr>
              </thead>
              <tbody>
                {profitStatement.map((row, index) => <tr key={index} className="border-b border-white/10">
                    <td className="py-3 px-4">{row.item}</td>
                    <td className="text-right py-3 px-4">¥{row.currentMonth.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">¥{row.lastMonth.toLocaleString()}</td>
                    <td className={`text-right py-3 px-4 ${row.growthColor}`}>{row.growth}</td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
};