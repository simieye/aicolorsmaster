
# 染发专家应用 - 测试文档

## 测试概述

本项目包含全面的单元测试和集成测试，确保应用的质量和稳定性。

## 测试结构

```
tests/
├── setup.js                    # Jest 测试环境配置
├── components/                 # 组件单元测试
│   ├── LoadingStates.test.jsx
│   ├── TabBar.test.jsx
│   ├── ShoppingCart.test.jsx
│   ├── AuthProvider.test.jsx
│   └── consultation/
│       └── ChatInterface.test.jsx
├── hooks/                      # 自定义 Hook 测试
│   └── useDataCache.test.js
├── lib/                        # 工具库测试
│   └── DataCache.test.js
└── integration/                # 集成测试
    └── App.test.jsx
```

## 运行测试

### 安装依赖
```bash
npm install
```

### 运行所有测试
```bash
npm test
```

### 运行测试并生成覆盖率报告
```bash
npm run test:coverage
```

### 监视模式运行测试
```bash
npm run test:watch
```

### CI 环境运行测试
```bash
npm run test:ci
```

## 测试覆盖率

项目设置了最低测试覆盖率要求：
- 分支覆盖率：70%
- 函数覆盖率：70%
- 行覆盖率：70%
- 语句覆盖率：70%

## 测试组件

### LoadingStates 组件
- ✅ LoadingSpinner 渲染和状态
- ✅ PageLoading 页面加载状态
- ✅ 各种骨架屏组件
- ✅ EmptyState 和 ErrorState 状态
- ✅ DataLoader 数据加载包装器
- ✅ LoadingButton 加载按钮

### TabBar 组件
- ✅ 导航项渲染
- ✅ 活动状态高亮
- ✅ 点击导航功能
- ✅ 通知徽章显示
- ✅ 响应式设计

### ShoppingCart 组件
- ✅ 购物车商品显示
- ✅ 数量更新功能
- ✅ 商品删除功能
- ✅ 总价计算
- ✅ 结算流程
- ✅ 空购物车状态

### AuthProvider 组件
- ✅ 用户登录/登出
- ✅ 认证状态管理
- ✅ 本地存储持久化
- ✅ 错误处理

### ChatInterface 组件
- ✅ 消息渲染
- ✅ 输入处理
- ✅ 发送消息功能
- ✅ 连接状态显示
- ✅ 评分功能

## 测试工具和库

### Jest
JavaScript 测试框架，用于运行测试和生成覆盖率报告。

### React Testing Library
提供 React 组件测试工具，专注于用户行为测试。

### Mock 策略
- **API 调用**: 使用 `jest.fn()` 模拟 fetch 和云开发 API
- **本地存储**: 模拟 localStorage 和 sessionStorage
- **浏览器 API**: 模拟 IntersectionObserver、ResizeObserver 等
- **路由**: 模拟 react-router-dom 导航功能

## 测试最佳实践

### 1. 组件测试原则
- 测试用户行为而非实现细节
- 使用可访问性查询（getByRole、getByLabelText）
- 避免测试内部状态

### 2. 异步测试
- 使用 `waitFor` 等待异步操作完成
- 正确处理 Promise 和回调
- 测试加载和错误状态

### 3. Mock 策略
- 只 mock 外部依赖
- 保持 mock 的一致性
- 在每个测试后清理 mock

### 4. 测试覆盖率
- 确保关键路径被测试
- 关注边界情况
- 定期检查覆盖率报告

## 持续集成

测试在 CI/CD 流水线中自动运行：
- 每次提交代码时运行测试
- 生成覆盖率报告
- 确保测试通过才能合并代码

## 调试测试

### 调试单个测试
```bash
npm test -- --testNamePattern="LoadingSpinner"
```

### 调试测试文件
```bash
npm test -- tests/components/LoadingStates.test.jsx
```

### 生成详细报告
```bash
npm run test:coverage -- --verbose
```

## 添加新测试

1. 在相应目录创建测试文件
2. 遵循现有测试模式
3. 确保测试覆盖率不下降
4. 更新文档

## 常见问题

### Q: 测试失败怎么办？
A: 检查控制台错误信息，确认 mock 设置正确，验证测试数据。

### Q: 如何测试异步组件？
A: 使用 `waitFor` 和 `act` 包装异步操作。

### Q: Mock 不生效怎么办？
A: 确保在测试文件顶部正确 mock，检查 mock 路径。

## 贡献指南

提交代码前请确保：
- 所有测试通过
- 测试覆盖率不降低
- 新功能包含相应测试
- 遵循现有测试模式
