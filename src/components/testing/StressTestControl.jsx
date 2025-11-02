// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Progress, Badge, Alert, AlertDescription, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Zap, Play, Pause, Square, Activity, Cpu, HardDrive, Wifi, Users, Clock, TrendingUp, AlertTriangle, Settings, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { StressTestConfig } from './stress/StressTestConfig';
// @ts-ignore;
import { StressTestMetrics } from './stress/StressTestMetrics';
// @ts-ignore;
import { StressTestCharts } from './stress/StressTestCharts';
// @ts-ignore;
import { StressTestHistory } from './stress/StressTestHistory';
export function StressTestControl({
  isActive,
  onActiveChange
}) {
  const [testConfig, setTestConfig] = useState({
    concurrentUsers: 100,
    duration: 300,
    // 5分钟
    rampUpTime: 30,
    // 30秒
    testType: 'load',
    targetEndpoint: '/api/products',
    requestRate: 10 // 每秒请求数
  });
  const [testMetrics, setTestMetrics] = useState({
    currentUsers: 0,
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    currentRPS: 0,
    errorRate: 0,
    cpuUsage: 0,
    memoryUsage: 0
  });
  const [testHistory, setTestHistory] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testPhase, setTestPhase] = useState('idle'); // idle, ramping, running, cooling, completed
  const intervalRef = useRef(null);
  const metricsIntervalRef = useRef(null);
  const testTypes = {
    load: {
      name: '负载测试',
      description: '模拟正常用户负载',
      icon: <Users className="w-4 h-4" />
    },
    stress: {
      name: '压力测试',
      description: '测试系统极限性能',
      icon: <Zap className="w-4 h-4" />
    },
    spike: {
      name: '峰值测试',
      description: '模拟突发流量',
      icon: <TrendingUp className="w-4 h-4" />
    },
    endurance: {
      name: '耐久测试',
      description: '长时间稳定性测试',
      icon: <Clock className="w-4 h-4" />
    }
  };
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      stopTest();
    }
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isActive, timeRemaining]);
  useEffect(() => {
    if (isActive) {
      metricsIntervalRef.current = setInterval(() => {
        updateTestMetrics();
      }, 1000);
    } else {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    }
    return () => {
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, [isActive, testConfig]);
  const updateTestMetrics = () => {
    // 模拟实时指标更新
    const progress = (testConfig.duration - timeRemaining) / testConfig.duration;
    const currentPhase = progress < testConfig.rampUpTime / testConfig.duration ? 'ramping' : progress < 0.9 ? 'running' : 'cooling';
    setTestPhase(currentPhase);
    setTestMetrics(prev => {
      const newRequests = Math.floor(Math.random() * testConfig.requestRate) + 5;
      const successRate = 0.95 + Math.random() * 0.04; // 95-99% 成功率
      const successful = Math.floor(newRequests * successRate);
      const failed = newRequests - successful;
      return {
        currentUsers: Math.floor(testConfig.concurrentUsers * Math.min(progress * 2, 1)),
        totalRequests: prev.totalRequests + newRequests,
        successfulRequests: prev.successfulRequests + successful,
        failedRequests: prev.failedRequests + failed,
        averageResponseTime: 50 + Math.random() * 200 + (currentPhase === 'stress' ? 100 : 0),
        currentRPS: newRequests,
        errorRate: failed / newRequests * 100,
        cpuUsage: Math.min(30 + progress * 40 + Math.random() * 20, 95),
        memoryUsage: Math.min(40 + progress * 30 + Math.random() * 15, 85)
      };
    });
  };
  const startTest = () => {
    setTimeRemaining(testConfig.duration);
    setTestPhase('ramping');
    setTestMetrics({
      currentUsers: 0,
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      currentRPS: 0,
      errorRate: 0,
      cpuUsage: 0,
      memoryUsage: 0
    });
    onActiveChange(true);
  };
  const stopTest = () => {
    setTestPhase('completed');
    onActiveChange(false);

    // 保存测试历史
    const testResult = {
      id: `stress_${Date.now()}`,
      timestamp: Date.now(),
      config: testConfig,
      metrics: testMetrics,
      duration: testConfig.duration - timeRemaining,
      status: testMetrics.errorRate < 5 ? 'success' : 'warning'
    };
    setTestHistory(prev => [...prev, testResult]);
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const getPhaseBadge = phase => {
    const phaseConfig = {
      idle: {
        label: '空闲',
        variant: 'outline'
      },
      ramping: {
        label: '启动中',
        variant: 'secondary'
      },
      running: {
        label: '运行中',
        variant: 'default'
      },
      cooling: {
        label: '冷却中',
        variant: 'secondary'
      },
      completed: {
        label: '已完成',
        variant: 'outline'
      }
    };
    const config = phaseConfig[phase] || phaseConfig.idle;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };
  return <div className="space-y-6">
      {/* 测试控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              压力测试控制
            </div>
            <div className="flex items-center gap-2">
              {getPhaseBadge(testPhase)}
              {isActive && <div className="text-sm text-muted-foreground">
                  剩余时间: {formatTime(timeRemaining)}
                </div>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            {!isActive ? <Button onClick={startTest} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                开始测试
              </Button> : <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => onActiveChange(false)}>
                  <Pause className="w-4 h-4 mr-2" />
                  暂停
                </Button>
                <Button variant="destructive" onClick={stopTest}>
                  <Square className="w-4 h-4 mr-2" />
                  停止
                </Button>
              </div>}
            
            <div className="flex-1">
              {isActive && <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>测试进度</span>
                    <span>{((testConfig.duration - timeRemaining) / testConfig.duration * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(testConfig.duration - timeRemaining) / testConfig.duration * 100} className="w-full" />
                </div>}
            </div>
          </div>

          <StressTestConfig config={testConfig} onConfigChange={setTestConfig} disabled={isActive} />
        </CardContent>
      </Card>

      {/* 实时指标监控 */}
      <StressTestMetrics metrics={testMetrics} config={testConfig} isActive={isActive} />

      {/* 性能图表 */}
      <StressTestCharts metrics={testMetrics} testHistory={testHistory} />

      {/* 测试历史 */}
      <StressTestHistory history={testHistory} />
    </div>;
}