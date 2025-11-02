// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Users, Zap, TrendingUp, Clock, Settings, Activity } from 'lucide-react';

export function StressTestConfig({
  config,
  onConfigChange,
  disabled = false
}) {
  const testTypes = {
    load: {
      name: '负载测试',
      description: '模拟正常用户负载，验证系统在预期负载下的性能',
      icon: <Users className="w-4 h-4" />,
      defaultUsers: 100,
      defaultDuration: 300
    },
    stress: {
      name: '压力测试',
      description: '测试系统极限性能，找到性能瓶颈',
      icon: <Zap className="w-4 h-4" />,
      defaultUsers: 500,
      defaultDuration: 600
    },
    spike: {
      name: '峰值测试',
      description: '模拟突发流量，测试系统应对流量突增的能力',
      icon: <TrendingUp className="w-4 h-4" />,
      defaultUsers: 1000,
      defaultDuration: 180
    },
    endurance: {
      name: '耐久测试',
      description: '长时间运行测试，验证系统稳定性',
      icon: <Clock className="w-4 h-4" />,
      defaultUsers: 50,
      defaultDuration: 3600
    }
  };
  const handleTestTypeChange = testType => {
    const typeConfig = testTypes[testType];
    onConfigChange({
      ...config,
      testType,
      concurrentUsers: typeConfig.defaultUsers,
      duration: typeConfig.defaultDuration
    });
  };
  const currentTypeConfig = testTypes[config.testType];
  return <div className="space-y-4">
      {/* 测试类型选择 */}
      <div>
        <label className="text-sm font-medium mb-3 block">测试类型</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(testTypes).map(([key, type]) => <div key={key} className={`p-3 border rounded-lg cursor-pointer transition-colors ${config.testType === key ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`} onClick={() => !disabled && handleTestTypeChange(key)}>
              <div className="flex items-center gap-2 mb-2">
                {type.icon}
                <span className="font-medium text-sm">{type.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{type.description}</p>
            </div>)}
        </div>
      </div>

      {/* 基础配置 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">并发用户数</label>
          <input type="number" className="w-full p-2 border rounded-md" value={config.concurrentUsers} onChange={e => onConfigChange({
          ...config,
          concurrentUsers: parseInt(e.target.value) || 0
        })} disabled={disabled} min="1" max="10000" />
          <p className="text-xs text-muted-foreground mt-1">同时在线的用户数量</p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">测试持续时间</label>
          <Select value={config.duration.toString()} onValueChange={value => onConfigChange({
          ...config,
          duration: parseInt(value)
        })} disabled={disabled}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">1分钟</SelectItem>
              <SelectItem value="180">3分钟</SelectItem>
              <SelectItem value="300">5分钟</SelectItem>
              <SelectItem value="600">10分钟</SelectItem>
              <SelectItem value="1800">30分钟</SelectItem>
              <SelectItem value="3600">1小时</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">测试运行的总时间</p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">启动时间</label>
          <Select value={config.rampUpTime.toString()} onValueChange={value => onConfigChange({
          ...config,
          rampUpTime: parseInt(value)
        })} disabled={disabled}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10秒</SelectItem>
              <SelectItem value="30">30秒</SelectItem>
              <SelectItem value="60">1分钟</SelectItem>
              <SelectItem value="120">2分钟</SelectItem>
              <SelectItem value="300">5分钟</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">逐步增加用户数的时间</p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">请求频率</label>
          <input type="number" className="w-full p-2 border rounded-md" value={config.requestRate} onChange={e => onConfigChange({
          ...config,
          requestRate: parseInt(e.target.value) || 0
        })} disabled={disabled} min="1" max="1000" />
          <p className="text-xs text-muted-foreground mt-1">每秒请求数 (RPS)</p>
        </div>
      </div>

      {/* 高级配置 */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">高级配置</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">目标端点</label>
            <input type="text" className="w-full p-2 border rounded-md" value={config.targetEndpoint} onChange={e => onConfigChange({
            ...config,
            targetEndpoint: e.target.value
          })} disabled={disabled} placeholder="/api/products" />
            <p className="text-xs text-muted-foreground mt-1">测试的目标API端点</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">请求方法</label>
            <Select defaultValue="GET" disabled={disabled}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">HTTP请求方法</p>
          </div>
        </div>
      </div>

      {/* 测试类型说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            {currentTypeConfig.name} 说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{currentTypeConfig.description}</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-medium">推荐用户数: </span>
              <span>{currentTypeConfig.defaultUsers}</span>
            </div>
            <div>
              <span className="font-medium">推荐时长: </span>
              <span>{currentTypeConfig.defaultDuration >= 3600 ? `${currentTypeConfig.defaultDuration / 3600}小时` : `${currentTypeConfig.defaultDuration / 60}分钟`}</span>
            </div>
            <div>
              <span className="font-medium">适用场景: </span>
              <span>{config.testType === 'load' ? '日常性能监控' : config.testType === 'stress' ? '系统容量规划' : config.testType === 'spike' ? '营销活动准备' : '系统稳定性验证'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}