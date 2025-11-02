// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Alert, AlertDescription, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from '@/components/ui';
// @ts-ignore;
import { GitBranch, Github, Gitlab, Bitbucket, Server, Clock, CheckCircle, XCircle, AlertTriangle, Settings, Play, RefreshCw } from 'lucide-react';

export function CICDIntegration({
  config,
  onConfigChange,
  status,
  onTrigger
}) {
  const [expandedSection, setExpandedSection] = useState(null);
  const cicdProviders = {
    github: {
      name: 'GitHub Actions',
      icon: <Github className="w-4 h-4" />,
      description: '使用GitHub Actions进行自动化CI/CD',
      configTemplate: {
        workflow: '.github/workflows/test.yml',
        runners: 'ubuntu-latest',
        cache: true
      }
    },
    gitlab: {
      name: 'GitLab CI/CD',
      icon: <Gitlab className="w-4 h-4" />,
      description: '使用GitLab内置的CI/CD功能',
      configTemplate: {
        configFile: '.gitlab-ci.yml',
        runners: 'docker',
        cache: true
      }
    },
    bitbucket: {
      name: 'Bitbucket Pipelines',
      icon: <Bitbucket className="w-4 h-4" />,
      description: '使用Bitbucket Pipelines进行持续集成',
      configTemplate: {
        configFile: 'bitbucket-pipelines.yml',
        runners: 'docker',
        cache: true
      }
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'success':
        return <Badge variant="default">成功</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      case 'running':
        return <Badge variant="secondary">运行中</Badge>;
      case 'error':
        return <Badge variant="destructive">错误</Badge>;
      default:
        return <Badge variant="outline">空闲</Badge>;
    }
  };
  const generateWorkflowFile = provider => {
    const templates = {
      github: `name: Automated Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Run performance tests
      run: npm run test:performance
    
    - name: Generate test report
      run: npm run test:report
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info`,
      gitlab: `stages:
  - test
  - performance
  - report

variables:
  NODE_VERSION: "16"

cache:
  paths:
    - node_modules/
    - .npm/

test:
  stage: test
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run test:ci
  coverage: '/Lines\\s*:\\s*(\\d+\\.\\d+)%/'
  artifacts:
    reports:
      junit: junit.xml
    paths:
      - coverage/
    expire_in: 1 week

performance:
  stage: performance
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run test:performance
  artifacts:
    reports:
      performance: performance.json
    paths:
      - performance-reports/
    expire_in: 1 week

report:
  stage: report
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run test:report
  artifacts:
    paths:
      - test-reports/
    expire_in: 1 week`,
      bitbucket: `pipelines:
  default:
    - step:
        name: Install dependencies
        caches:
          - node
        script:
          - npm ci
    - step:
        name: Run tests
        caches:
          - node
        script:
          - npm run test:ci
    - step:
        name: Performance tests
        caches:
          - node
        script:
          - npm run test:performance
        artifacts:
          - performance-reports/**
    - step:
        name: Generate reports
        caches:
          - node
        script:
          - npm run test:report
        artifacts:
          - test-reports/**`
    };
    return templates[provider] || '';
  };
  const currentProvider = cicdProviders[config.provider];
  return <div className="space-y-6">
      {/* CI/CD状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            CI/CD集成状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {currentProvider.icon}
                <span className="font-medium">{currentProvider.name}</span>
              </div>
              {getStatusIcon(status)}
              {getStatusBadge(status)}
            </div>
            
            <Button onClick={onTrigger} disabled={status === 'running'}>
              {status === 'running' ? <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  触发中...
                </> : <>
                  <Play className="w-4 h-4 mr-2" />
                  手动触发
                </>}
            </Button>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">仓库: </span>
              <span className="font-medium">{config.repository}</span>
            </div>
            <div>
              <span className="text-muted-foreground">分支: </span>
              <span className="font-medium">{config.branch}</span>
            </div>
            <div>
              <span className="text-muted-foreground">最后触发: </span>
              <span className="font-medium">-</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CI/CD配置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            CI/CD配置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 提供商选择 */}
            <div>
              <label className="text-sm font-medium mb-2 block">CI/CD提供商</label>
              <Select value={config.provider} onValueChange={value => onConfigChange({
              ...config,
              provider: value
            })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cicdProviders).map(([key, provider]) => <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        {provider.icon}
                        {provider.name}
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* 仓库配置 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">仓库地址</label>
                <input type="text" className="w-full p-2 border rounded-md" value={config.repository} onChange={e => onConfigChange({
                ...config,
                repository: e.target.value
              })} placeholder="owner/repository" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">默认分支</label>
                <input type="text" className="w-full p-2 border rounded-md" value={config.branch} onChange={e => onConfigChange({
                ...config,
                branch: e.target.value
              })} placeholder="main" />
              </div>
            </div>

            {/* 触发条件 */}
            <div className="space-y-3">
              <label className="text-sm font-medium">触发条件</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch checked={config.triggerOnPush} onCheckedChange={checked => onConfigChange({
                  ...config,
                  triggerOnPush: checked
                })} />
                  <label className="text-sm">代码推送时触发</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={config.triggerOnPR} onCheckedChange={checked => onConfigChange({
                  ...config,
                  triggerOnPR: checked
                })} />
                  <label className="text-sm">Pull Request时触发</label>
                </div>
              </div>
            </div>

            {/* 测试命令 */}
            <div>
              <label className="text-sm font-medium mb-2 block">测试命令</label>
              <input type="text" className="w-full p-2 border rounded-md" value={config.testCommand} onChange={e => onConfigChange({
              ...config,
              testCommand: e.target.value
            })} placeholder="npm run test:ci" />
            </div>

            {/* 报告路径 */}
            <div>
              <label className="text-sm font-medium mb-2 block">报告输出路径</label>
              <input type="text" className="w-full p-2 border rounded-md" value={config.reportPath} onChange={e => onConfigChange({
              ...config,
              reportPath: e.target.value
            })} placeholder="./test-reports" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 工作流配置文件 */}
      <Card>
        <CardHeader>
          <CardTitle>工作流配置文件</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {currentProvider.configTemplate.configFile}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentProvider.description}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setExpandedSection(expandedSection === 'workflow' ? null : 'workflow')}>
                {expandedSection === 'workflow' ? '收起' : '展开'}
              </Button>
            </div>

            {expandedSection === 'workflow' && <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                    {generateWorkflowFile(config.provider)}
                  </pre>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    将此配置文件添加到您的仓库根目录中，CI/CD流程将自动生效。
                  </AlertDescription>
                </Alert>
              </div>}
          </div>
        </CardContent>
      </Card>

      {/* 集成步骤 */}
      <Card>
        <CardHeader>
          <CardTitle>集成步骤</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[{
            title: '1. 配置CI/CD提供商',
            description: '选择并配置您的CI/CD提供商'
          }, {
            title: '2. 添加工作流文件',
            description: '将生成的工作流配置文件添加到仓库'
          }, {
            title: '3. 配置环境变量',
            description: '设置必要的环境变量和密钥'
          }, {
            title: '4. 测试集成',
            description: '手动触发一次测试验证配置'
          }, {
            title: '5. 启用自动化',
            description: '配置触发条件，启用自动化流程'
          }].map((step, index) => <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}