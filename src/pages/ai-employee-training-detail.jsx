// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { GraduationCap, Book, Users, FolderOpen, ClipboardCheck, Scissors, Star, Crown, UserPlus, TrendingUp, Brain, Video, BarChart3, Certificate, Phone, Calendar, Download, Play, Check, CheckCircle, Award } from 'lucide-react';

// @ts-ignore;
import { TrainingFeatureCard } from '@/components/TrainingFeatureCard';
// @ts-ignore;
import { TrainingContentCard } from '@/components/TrainingContentCard';
// @ts-ignore;
import { LearningPath } from '@/components/LearningPath';
// @ts-ignore;
import { UseScenarioCard } from '@/components/UseScenarioCard';
// @ts-ignore;
import { TechAdvantageItem } from '@/components/TechAdvantageItem';
export default function AIEmployeeTrainingDetailPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('features');

  // 系统核心功能数据
  const coreFeatures = [{
    icon: Book,
    title: '课程管理',
    description: '完整的课程创建和管理系统，支持多媒体内容，分类管理，版本控制',
    features: ['课程创建', '分类管理', '版本控制'],
    color: 'green'
  }, {
    icon: GraduationCap,
    title: '学习中心',
    description: '个性化学习路径推荐，学习进度跟踪，学习效果评估，智能学习提醒',
    features: ['进度跟踪', '学习统计', '智能推荐'],
    color: 'blue'
  }, {
    icon: FolderOpen,
    title: '培训资料',
    description: '丰富的培训资料库，文档、视频、音频等多种格式，支持在线预览和下载',
    features: ['资料管理', '下载功能', '在线预览'],
    color: 'purple'
  }, {
    icon: ClipboardCheck,
    title: '考试测评',
    description: '在线考试系统，自动评分，成绩统计，证书颁发，培训效果评估',
    features: ['在线考试', '成绩统计', '证书颁发'],
    color: 'yellow'
  }];

  // 培训内容数据
  const trainingContent = [{
    icon: Scissors,
    title: '美发技术培训',
    description: '专业的美发技术培训，涵盖剪发、染发、烫发、造型等核心技术',
    courses: ['基础剪发技术', '染发烫发技术', '造型设计技巧', '发质护理知识'],
    courseCount: 48,
    color: 'green'
  }, {
    icon: Users,
    title: '服务培训',
    description: '客户服务技能培训，提升服务质量，增强客户满意度和忠诚度',
    courses: ['客户沟通技巧', '服务流程标准', '投诉处理方法', '客户关系维护'],
    courseCount: 32,
    color: 'blue'
  }, {
    icon: TrendingUp,
    title: '管理培训',
    description: '门店管理培训，提升管理能力，优化运营效率，实现业绩增长',
    courses: ['团队管理技巧', '财务管理基础', '营销策略制定', '数据分析应用'],
    courseCount: 28,
    color: 'purple'
  }];

  // 学习路径数据
  const learningPaths = [{
    title: '新员工入门路径',
    description: '适合刚入职的新员工，快速掌握基础技能',
    duration: '3个月',
    color: 'green',
    steps: [{
      icon: Book,
      title: '基础理论',
      duration: '2周',
      color: 'green'
    }, {
      icon: Scissors,
      title: '技术实操',
      duration: '6周',
      color: 'blue'
    }, {
      icon: Users,
      title: '服务培训',
      duration: '3周',
      color: 'purple'
    }, {
      icon: Certificate,
      title: '考核认证',
      duration: '1周',
      color: 'yellow'
    }]
  }, {
    title: '技能提升路径',
    description: '适合有经验的员工，提升专业技能水平',
    duration: '6个月',
    color: 'blue',
    steps: [{
      icon: Star,
      title: '高级技术',
      duration: '8周',
      color: 'blue'
    }, {
      icon: Crown,
      title: '创意设计',
      duration: '10周',
      color: 'purple'
    }, {
      icon: Star,
      title: '品质管理',
      duration: '4周',
      color: 'green'
    }, {
      icon: Award,
      title: '专业认证',
      duration: '2周',
      color: 'yellow'
    }]
  }];

  // 使用场景数据
  const useScenarios = [{
    icon: UserPlus,
    title: '新员工培训',
    description: '为新入职员工提供系统化的培训，快速掌握岗位技能，融入团队',
    features: ['入职引导培训', '岗位技能培训', '企业文化培训'],
    color: 'green'
  }, {
    icon: TrendingUp,
    title: '技能提升',
    description: '为在职员工提供技能提升培训，保持技术领先，提高服务质量',
    features: ['技术更新培训', '服务技能提升', '行业趋势学习'],
    color: 'blue'
  }, {
    icon: Crown,
    title: '管理培训',
    description: '为管理人员提供领导力培训，提升管理能力，推动业务发展',
    features: ['领导力培训', '团队管理技巧', '经营管理培训'],
    color: 'purple'
  }];

  // 技术优势数据
  const techAdvantages = [{
    icon: Brain,
    title: '个性化学习算法',
    description: '基于AI的个性化学习路径推荐，提升学习效果',
    color: 'green'
  }, {
    icon: Video,
    title: '多媒体教学内容',
    description: '支持视频、音频、文档等多种教学媒体格式',
    color: 'blue'
  }, {
    icon: BarChart3,
    title: '智能学习跟踪',
    description: '实时跟踪学习进度，智能分析学习效果',
    color: 'purple'
  }, {
    icon: Certificate,
    title: '证书自动颁发',
    description: '完成培训后自动颁发证书，认可学习成果',
    color: 'yellow'
  }];

  // 客户案例数据
  const customerCases = [{
    name: '时尚造型美发店',
    rating: 5.0,
    comment: 'AI培训系统让我们的员工技能提升效果达到65%，培训完成率78%，大大降低了培训成本！',
    author: '王经理',
    duration: '使用10个月',
    avatar: 'salon7'
  }, {
    name: '美丽时光连锁',
    rating: 5.0,
    comment: '个性化学习路径推荐非常精准，员工学习积极性明显提高，整体服务质量大幅提升。',
    author: '李总监',
    duration: '使用1年',
    avatar: 'salon8'
  }, {
    name: '艺剪工作室',
    rating: 4.8,
    comment: '系统功能丰富，特别是多媒体教学内容和智能学习跟踪，让培训管理变得简单高效。',
    author: '张主管',
    duration: '使用8个月',
    avatar: 'salon9'
  }];

  // 处理购买
  const handlePurchase = () => {
    console.log('购买AI员工培训系统');
    // 这里可以跳转到购买页面或打开购买对话框
  };

  // 处理演示
  const handleDemo = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'system-demo',
        params: {
          system: 'ai-employee-training'
        }
      });
    }
  };

  // 处理下载
  const handleDownload = () => {
    console.log('下载AI员工培训系统资料');
    // 这里可以下载产品资料
  };

  // 处理咨询
  const handleConsultation = () => {
    if ($w.utils.navigateTo) {
      $w.utils.navigateTo({
        pageId: 'online-consultation'
      });
    }
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 系统概览 */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">智能培训管理解决方案</span>
              </div>
              <h1 className="text-5xl font-bold mb-6">AI员工成长业务培训系统</h1>
              <p className="text-xl text-white/90 mb-8">
                专为美发行业打造的智能培训管理系统，个性化学习路径，提升员工技能，降低培训成本
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <div>
                  <div className="text-4xl font-bold">¥3,680</div>
                  <div className="text-white/80">一次性购买</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">78%</div>
                  <div className="text-white/80">培训完成率</div>
                </div>
                <div className="border-l border-white/30 pl-6">
                  <div className="text-2xl font-semibold">65%</div>
                  <div className="text-white/80">技能提升效果</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                  立即购买
                </Button>
                <Button onClick={handleDemo} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                  <Play className="w-4 h-4 mr-2" />
                  在线演示
                </Button>
                <Button onClick={handleDownload} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                  <Download className="w-4 h-4 mr-2" />
                  下载资料
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="animate-pulse">
                <div className="w-96 h-96 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap className="w-32 h-32 text-white/80" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              全方位的培训管理功能，满足美发行业的各种培训需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => <TrainingFeatureCard key={index} feature={feature} />)}
          </div>
        </div>
      </section>

      {/* 培训内容 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">培训内容体系</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              完整的美发行业培训内容，从基础技能到高级管理，全方位提升员工能力
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingContent.map((content, index) => <TrainingContentCard key={index} content={content} />)}
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">个性化学习路径</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于AI算法的个性化学习路径推荐，让每个员工都能找到最适合自己的成长路线
            </p>
          </div>
          
          <div className="space-y-8">
            {learningPaths.map((path, index) => <LearningPath key={index} path={path} index={index} />)}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">使用场景</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              适用于美发行业的多种培训场景，提供定制化的培训解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useScenarios.map((scenario, index) => <UseScenarioCard key={index} scenario={scenario} />)}
          </div>
        </div>
      </section>

      {/* 技术优势 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">技术优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于先进的AI技术，提供智能化、个性化的培训管理服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">核心技术</h3>
              <div className="space-y-4">
                {techAdvantages.map((tech, index) => <TechAdvantageItem key={index} tech={tech} />)}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">性能指标</h3>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
                    <div className="text-gray-600">系统稳定性</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">&lt;3s</div>
                    <div className="text-gray-600">视频加载</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
                    <div className="text-gray-600">培训完成率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">65%</div>
                    <div className="text-gray-600">技能提升率</div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">系统架构</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">前端框架</span>
                      <span className="text-gray-900">React + TypeScript</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">后端服务</span>
                      <span className="text-gray-900">Node.js + Express</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">视频服务</span>
                      <span className="text-gray-900">AWS S3 + CDN</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">数据库</span>
                      <span className="text-gray-900">MongoDB + Redis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 客户案例 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">客户案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              已为众多美发企业提供智能培训解决方案，获得客户一致好评
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerCases.map((caseItem, index) => <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={`https://picsum.photos/seed/${caseItem.avatar}/60/60.jpg`} alt={caseItem.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{caseItem.name}</h4>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(caseItem.rating) ? 'fill-current' : ''}`} />)}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">{caseItem.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">"{caseItem.comment}"</p>
                  <div className="text-sm text-gray-500">
                    <span>{caseItem.author}</span> • <span>{caseItem.duration}</span>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* 价格方案 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">价格方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              透明合理的价格，一次性购买，终身使用
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">AI员工成长业务培训系统</h3>
                <p className="text-white/80">完整功能版本，无隐藏费用</p>
              </div>
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2">¥3,680</div>
                <div className="text-white/80 text-lg">一次性购买 • 终身使用</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-semibold mb-3">包含功能</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      课程管理系统
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      学习进度跟踪
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      培训资料管理
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      考试测评系统
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">服务支持</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      免费安装部署
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      1年技术支持
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      在线培训指导
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      免费系统升级
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handlePurchase} className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                  立即购买
                </Button>
                <Button onClick={handleConsultation} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                  联系销售
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 购买咨询 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">准备开始使用AI培训系统？</h2>
            <p className="text-xl mb-8 text-white/80">
              专业团队为您提供一对一咨询服务，解答所有疑问
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={handleConsultation} className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                <Phone className="w-4 h-4 mr-2" />
                免费咨询
              </Button>
              <Button onClick={handleDemo} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                预约演示
              </Button>
              <Button onClick={handleDownload} variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
                <Download className="w-4 h-4 mr-2" />
                下载资料
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
}