// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Calendar, Star, Clock, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// @ts-ignore;
import { StatsLoading, ChartEmpty } from '@/components/LoadingStates';
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
export const ServiceStats = ({
  serviceStats,
  loading
}) => {
  if (loading) {
    return <div className="p-4 space-y-6">
        <StatsLoading />
      </div>;
  }
  return <div className="p-4 space-y-6">
      {/* 统计卡片 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-muted-foreground">总咨询量</span>
            </div>
            <div className="text-2xl font-bold">{serviceStats.totalConsultations?.toLocaleString()}</div>
            <div className="text-xs text-green-600">+12.5%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-500" />
              <span className="text-sm text-muted-foreground">今日咨询</span>
            </div>
            <div className="text-2xl font-bold">{serviceStats.todayConsultations}</div>
            <div className="text-xs text-green-600">+8.3%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-muted-foreground">满意度</span>
            </div>
            <div className="text-2xl font-bold">{serviceStats.satisfactionRate}%</div>
            <div className="text-xs text-green-600">+2.1%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-muted-foreground">平均时长</span>
            </div>
            <div className="text-2xl font-bold">{serviceStats.averageDuration}分钟</div>
            <div className="text-xs text-green-600">-1.2分钟</div>
          </CardContent>
        </Card>
      </div>

      {/* 咨询趋势 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>咨询趋势</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {serviceStats.dailyTrend && serviceStats.dailyTrend.length > 0 ? <ResponsiveContainer width="100%" height={300}>
              <LineChart data={serviceStats.dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consultations" stroke="#3b82f6" name="咨询量" />
                <Line type="monotone" dataKey="satisfaction" stroke="#10b981" name="满意度" />
              </LineChart>
            </ResponsiveContainer> : <ChartEmpty />}
        </CardContent>
      </Card>

      {/* 主题分布 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>咨询主题分布</CardTitle>
          </CardHeader>
          <CardContent>
            {serviceStats.topicDistribution && serviceStats.topicDistribution.length > 0 ? <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={serviceStats.topicDistribution} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="count">
                    {serviceStats.topicDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer> : <ChartEmpty />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>服务性能指标</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">准确率</span>
                  <span className="text-sm font-medium">{serviceStats.performanceMetrics?.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                  width: `${serviceStats.performanceMetrics?.accuracy}%`
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">响应速度</span>
                  <span className="text-sm font-medium">{serviceStats.performanceMetrics?.responseSpeed}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{
                  width: `${serviceStats.performanceMetrics?.responseSpeed}%`
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">问题解决率</span>
                  <span className="text-sm font-medium">{serviceStats.performanceMetrics?.problemSolving}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{
                  width: `${serviceStats.performanceMetrics?.problemSolving}%`
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">用户满意度</span>
                  <span className="text-sm font-medium">{serviceStats.performanceMetrics?.userSatisfaction}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{
                  width: `${serviceStats.performanceMetrics?.userSatisfaction}%`
                }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};