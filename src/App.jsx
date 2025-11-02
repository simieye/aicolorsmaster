
// @ts-ignore;
import React, { useEffect } from 'react';
// @ts-ignore;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { PerformanceMonitorWidget } from '@/components/PerformanceMonitor';
// @ts-ignore;
import performanceMonitor from '@/lib/PerformanceMonitor';

// 页面组件
// @ts-ignore;
import Home from '@/pages/home';
// @ts-ignore;
import Products from '@/pages/products';
// @ts-ignore;
import ProductDetail from '@/pages/product-detail';
// @ts-ignore;
import ShoppingCart from '@/pages/shopping-cart';
// @ts-ignore;
import Checkout from '@/pages/checkout';
// @ts-ignore;
import OrderSuccess from '@/pages/order-success';
// @ts-ignore;
import Orders from '@/pages/orders';
// @ts-ignore;
import User from '@/pages/user';
// @ts-ignore;
import Login from '@/pages/login';
// @ts-ignore;
import OnlineConsultation from '@/pages/online-consultation';
// @ts-ignore;
import PerformanceMonitoring from '@/pages/performance-monitoring';

// 导入其他页面组件...
// @ts-ignore;
import ColorRecognition from '@/pages/color-recognition';
// @ts-ignore;
import FormulaGeneration from '@/pages/formula-generation';
// @ts-ignore;
import MixingSimulation from '@/pages/mixing-simulation';
// @ts-ignore;
import Community from '@/pages/community';
// @ts-ignore;
import Marketing from '@/pages/marketing';
// @ts-ignore;
import UserManagement from '@/pages/user-management';
// @ts-ignore;
import FormulaManagement from '@/pages/formula-management';
// @ts-ignore;
import ColorLibrary from '@/pages/color-library';
// @ts-ignore;
import LanguageSettings from '@/pages/language-settings';
// @ts-ignore;
import StoreManagement from '@/pages/store-management';
// @ts-ignore;
import QRScanner from '@/pages/qr-scanner';
// @ts-ignore;
import PersonalizedRecommendation from '@/pages/personalized-recommendation';
// @ts-ignore;
import StoreManagementSystem from '@/pages/store-management-system';
// @ts-ignore;
import SystemDetail from '@/pages/system-detail';
// @ts-ignore;
import SystemDemo from '@/pages/system-demo';
// @ts-ignore;
import CustomerCases from '@/pages/customer-cases';
// @ts-ignore;
import OnlineConsultationPage from '@/pages/online-consultation';
// @ts-ignore;
import ProductComparison from '@/pages/product-comparison';
// @ts-ignore;
import UserFeedback from '@/pages/user-feedback';
// @ts-ignore;
import StoreManagementEnhanced from '@/pages/store-management-enhanced';
// @ts-ignore;
import FinanceManagement from '@/pages/finance-management';
// @ts-ignore;
import AttendanceManagement from '@/pages/attendance-management';
// @ts-ignore;
import UserFeedbackComplete from '@/pages/user-feedback-complete';
// @ts-ignore;
import CorporateCulture from '@/pages/corporate-culture';
// @ts-ignore;
import FinanceManagementDetailed from '@/pages/finance-management-detailed';
// @ts-ignore;
import AttendanceManagementDetailed from '@/pages/attendance-management-detailed';
// @ts-ignore;
import AICustomerServiceDetail from '@/pages/ai-customer-service-detail';
// @ts-ignore;
import AIAppointmentSystemDetail from '@/pages/ai-appointment-system-detail';
// @ts-ignore;
import AIEmployeeTrainingDetail from '@/pages/ai-employee-training-detail';
// @ts-ignore;
import AIMicroStoreDetail from '@/pages/ai-micro-store-detail';
// @ts-ignore;
import RecommendationAnalytics from '@/pages/recommendation-analytics';
// @ts-ignore;
import ABTesting from '@/pages/ab-testing';
// @ts-ignore;
import AlgorithmManagement from '@/pages/algorithm-management';
// @ts-ignore;
import FeedbackManagement from '@/pages/feedback-management';
// @ts-ignore;
import RecommendationHeatmap from '@/pages/recommendation-heatmap';

function App() {
  // 初始化性能监控
  useEffect(() => {
    // 设置性能监控配置
    if (process.env.NODE_ENV === 'production') {
      performanceMonitor.config.sampleRate = 0.1; // 生产环境10%采样
      performanceMonitor.config.enableConsoleLog = false; // 生产环境关闭控制台日志
    } else {
      performanceMonitor.config.sampleRate = 1.0; // 开发环境100%采样
      performanceMonitor.config.enableConsoleLog = true; // 开发环境启用控制台日志
    }

    // 清理函数
    return () => {
      performanceMonitor.cleanup();
    };
  }, []);

  return <Router>
      <div className="App">
        <ErrorBoundary>
          <Routes>
            {/* 主要业务路由 */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/consultation" element={<OnlineConsultation />} />
            <Route path="/performance" element={<PerformanceMonitoring />} />

            {/* 染发相关功能路由 */}
            <Route path="/color-recognition" element={<ColorRecognition />} />
            <Route path="/formula-generation" element={<FormulaGeneration />} />
            <Route path="/mixing-simulation" element={<MixingSimulation />} />
            <Route path="/community" element={<Community />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/formula-management" element={<FormulaManagement />} />
            <Route path="/color-library" element={<ColorLibrary />} />
            <Route path="/language-settings" element={<LanguageSettings />} />
            <Route path="/store-management" element={<StoreManagement />} />
            <Route path="/qr-scanner" element={<QRScanner />} />
            <Route path="/personalized-recommendation" element={<PersonalizedRecommendation />} />

            {/* 系统管理路由 */}
            <Route path="/store-management-system" element={<StoreManagementSystem />} />
            <Route path="/system-detail" element={<SystemDetail />} />
            <Route path="/system-demo" element={<SystemDemo />} />
            <Route path="/customer-cases" element={<CustomerCases />} />
            <Route path="/online-consultation-page" element={<OnlineConsultationPage />} />
            <Route path="/product-comparison" element={<ProductComparison />} />
            <Route path="/user-feedback" element={<UserFeedback />} />
            <Route path="/store-management-enhanced" element={<StoreManagementEnhanced />} />
            <Route path="/finance-management" element={<FinanceManagement />} />
            <Route path="/attendance-management" element={<AttendanceManagement />} />
            <Route path="/user-feedback-complete" element={<UserFeedbackComplete />} />
            <Route path="/corporate-culture" element={<CorporateCulture />} />
            <Route path="/finance-management-detailed" element={<FinanceManagementDetailed />} />
            <Route path="/attendance-management-detailed" element={<AttendanceManagementDetailed />} />

            {/* AI功能路由 */}
            <Route path="/ai-customer-service-detail" element={<AICustomerServiceDetail />} />
            <Route path="/ai-appointment-system-detail" element={<AIAppointmentSystemDetail />} />
            <Route path="/ai-employee-training-detail" element={<AIEmployeeTrainingDetail />} />
            <Route path="/ai-micro-store-detail" element={<AIMicroStoreDetail />} />

            {/* 推荐系统路由 */}
            <Route path="/recommendation-analytics" element={<RecommendationAnalytics />} />
            <Route path="/ab-testing" element={<ABTesting />} />
            <Route path="/algorithm-management" element={<AlgorithmManagement />} />
            <Route path="/feedback-management" element={<FeedbackManagement />} />
            <Route path="/recommendation-heatmap" element={<RecommendationHeatmap />} />

            {/* 默认重定向 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>

        {/* 性能监控悬浮窗 - 仅在开发环境显示 */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitorWidget position="bottom-right" />}
      </div>
    </Router>;
}

export default App;
