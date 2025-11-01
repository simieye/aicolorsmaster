// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Users, Award, Clock, TrendingUp, Star, ArrowRight, CheckCircle, Zap, Shield, Target, BarChart, Play, FileText, Headphones, Monitor } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner } from '@/components/LoadingSpinner';
// @ts-ignore;
import { HoverCard } from '@/components/HoverEffects';
// @ts-ignore;

export default function AIEmployeeTrainingDetail(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const handleTabChange = tab => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };
  const handleTryNow = () => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId: 'ai-training',
        params: {
          service: 'employee-training'
        }
      });
    }
  };
  const features = [{
    icon: <BookOpen className="w-6 h-6" />,
    title: '智能课程推荐',
    description: '基于员工能力和岗位需求，智能推荐个性化培训课程'
  }, {
    icon: <Users className="w-6 h-6" />,
    title: '学习路径规划',
    description: '为每位员工制定专属的学习发展路径'
  }, {
    icon: <Award className="w-6 h-6" />,
    title: '技能认证',
    description: '提供专业技能认证和证书管理'
  }, {
    icon: <Monitor className="w-6 h-6" />,
    title: '在线学习',
    description: '支持多种学习形式，随时随地学习'
  }, {
    icon: <Shield className="w-6 h-6" />,
    title: '学习数据安全',
    description: '企业级安全保障，保护学习隐私数据'
  }, {
    icon: <BarChart className="w-6 h-6" />,
    title: '学习分析',
    description: '实时分析学习数据，提供培训效果评估'
  }];
  const techAdvantages = [{
    title: 'AI学习分析',
    description: '采用机器学习算法分析学习行为，优化培训效果'
  }, {
    title: '知识图谱',
    description: '构建完整的知识图谱，支持个性化学习推荐'
  }, {
    title: '智能评估',
    description: '基于AI的智能评估系统，准确衡量学习成果'
  }, {
    title: '多平台支持',
    description: '支持PC、移动端多平台学习，无缝切换'
  }];
  const stats = [{
    label: '学习效率',
    value: '提升60%',
    icon: <Zap className="w-5 h-5" />
  }, {
    label: '完成率',
    value: '92%',
    icon: <CheckCircle className="w-5 h-5" />
  }, {
    label: '满意度',
    value: '95%',
    icon: <Star className="w-5 h-5" />
  }, {
    label: '培训成本',
    value: '降低40%',
    icon: <BarChart className="w-5 h-5" />
  }];
  const learningPaths = [{
    title: '新员工入职',
    description: '帮助新员工快速融入团队',
    icon: <Users className="w-6 h-6" />
  }, {
    title: '技能提升',
    description: '提升专业技能和工作能力',
    icon: <Target className="w-6 h-6" />
  }, {
    title: '管理培训',
    description: '培养管理能力和领导力',
    icon: <Award className="w-6 h-6" />
  }, {
    title: '职业发展',
    description: '规划职业发展路径',
    icon: <TrendingUp className="w-6 h-6" />
  }];
  const useScenarios = [{
    title: '企业内训',
    description: '企业内部员工培训和发展',
    icon: <Monitor className="w-6 h-6" />
  }, {
    title: '在线教育',
    description: '在线教育平台和培训机构',
    icon: <BookOpen className="w-6 h-6" />
  }, {
    title: '技能认证',
    description: '专业技能认证和考试',
    icon: <Award className="w-6 h-6" />
  }, {
    title: '知识管理',
    description: '企业知识管理和传承',
    icon: <FileText className="w-6 h-6" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="AI员工培训系统" showBack={true} />
        
        <div className="pb-20">
          {/* 头部介绍 */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="w-8 h-8" />
                <h1 className="text-2xl font-bold">AI员工培训系统</h1>
              </div>
              <p className="text-purple-100 mb-6">
                基于人工智能的智能员工培训解决方案，提供个性化学习推荐、
                智能评估、学习路径规划等功能，提升培训效果，降低培训成本。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleTryNow} className="bg-white text-purple-600 hover:bg-purple-50">
                  立即体验
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  了解更多
                </Button>
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => <HoverCard key={index} className="bg-card border rounded-lg p-4 text-center hover:shadow-lg">
                  <div className="flex justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </HoverCard>)}
            </div>

            {/* 功能特点 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>核心功能</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 学习路径 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>学习路径</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {learningPaths.map((path, index) => <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-3">
                        {path.icon}
                      </div>
                      <h3 className="font-medium text-foreground mb-1">{path.title}</h3>
                      <p className="text-xs text-muted-foreground">{path.description}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 技术优势 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>技术优势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {techAdvantages.map((tech, index) => <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h3 className="font-semibold text-foreground">{tech.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground pl-7">{tech.description}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 应用场景 */}
            <Card>
              <CardHeader>
                <CardTitle>应用场景</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {useScenarios.map((scenario, index) => <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {scenario.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{scenario.title}</h3>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}