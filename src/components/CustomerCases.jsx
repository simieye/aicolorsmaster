// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Search, Filter, Star, Store, Smile, TrendingUp, Award, Play, MessageCircle, ThumbsUp, Eye, Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';

export const CustomerCases = ({
  onBack,
  onCaseDetail,
  onContactSales
}) => {
  const {
    toast
  } = useToast();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedStats, setAnimatedStats] = useState(false);

  // 案例数据
  const [cases] = useState([{
    id: 1,
    title: '时尚造型沙龙 - 数字化转型成功案例',
    description: '通过引入AI智能调色宝机，该沙龙实现了染发效率提升300%，客户满意度达到99%',
    category: 'AI智能调色宝机',
    categoryColor: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=225&fit=crop',
    customerName: '张店长',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    customerTitle: '时尚造型沙龙',
    rating: 5,
    stats: {
      efficiency: 300,
      costReduction: 40,
      satisfaction: 99
    },
    tags: ['数字化转型', '效率提升', '客户满意'],
    date: '2024-01-15',
    location: '上海',
    views: 1250,
    likes: 89
  }, {
    id: 2,
    title: '美丽连锁 - 库存管理优化案例',
    description: '10家连锁店统一管理，库存准确率提升至99.5%，浪费减少80%',
    category: '染发膏管理系统',
    categoryColor: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=225&fit=crop',
    customerName: '李经理',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    customerTitle: '美丽连锁',
    rating: 4.5,
    stats: {
      accuracy: 99.5,
      wasteReduction: 80,
      costSaving: 25
    },
    tags: ['连锁管理', '库存优化', '成本控制'],
    date: '2024-01-12',
    location: '北京',
    views: 980,
    likes: 67
  }, {
    id: 3,
    title: '高端美发会所 - 客户体验升级案例',
    description: '个性化配方管理让客户回头率提升60%，客单价增长35%',
    category: '客户配方管理',
    categoryColor: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop',
    customerName: '王总监',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    customerTitle: '高端美发会所',
    rating: 5,
    stats: {
      returnRate: 60,
      avgOrderValue: 35,
      satisfaction: 95
    },
    tags: ['客户体验', '个性化服务', '业��增长'],
    date: '2024-01-10',
    location: '深圳',
    views: 1560,
    likes: 123
  }, {
    id: 4,
    title: '潮流美发连锁 - 全面数字化升级',
    description: '引入全套AI美发系统，实现全流程数字化管理，业绩增长200%',
    category: '连锁门店管理',
    categoryColor: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop',
    customerName: '陈总',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    customerTitle: '潮流美发连锁',
    rating: 5,
    stats: {
      revenue: 200,
      efficiency: 250,
      satisfaction: 97
    },
    tags: ['全面升级', '业绩增长', '连锁管理'],
    date: '2024-01-08',
    location: '广州',
    views: 2100,
    likes: 156
  }, {
    id: 5,
    title: '艺术美发工作室 - CRM系统应用案例',
    description: '通过CRM系统精准营销，客户留存率提升80%，复购率增长120%',
    category: 'CRM系统',
    categoryColor: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
    customerName: '刘经理',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    customerTitle: '艺术美发工作室',
    rating: 4.5,
    stats: {
      retention: 80,
      repurchase: 120,
      satisfaction: 96
    },
    tags: ['CRM系统', '精准营销', '客户留存'],
    date: '2024-01-05',
    location: '成都',
    views: 890,
    likes: 78
  }, {
    id: 6,
    title: '创新美发集团 - SaaS平台部署案例',
    description: '部署AI原生SaaS平台，实现多店协同，运营效率提升400%',
    category: 'SaaS平台',
    categoryColor: 'bg-cyan-500',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    customerName: '赵总',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    customerTitle: '创新美发集团',
    rating: 5,
    stats: {
      efficiency: 400,
      collaboration: 350,
      satisfaction: 98
    },
    tags: ['SaaS平台', '多店协同', '云端部署'],
    date: '2024-01-03',
    location: '杭州',
    views: 1870,
    likes: 134
  }]);

  // 客户评价数据
  const [testimonials] = useState([{
    id: 1,
    customerName: '张店长',
    customerTitle: '时尚造型沙龙',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    content: 'AI智能调色宝机彻底改变了我们的工作方式。现在染发时间缩短了一半，但效果却更加精准。客户满意度大幅提升，生意也越来越好！'
  }, {
    id: 2,
    customerName: '李经理',
    customerTitle: '美丽连锁',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    rating: 4.5,
    content: '染发膏管理系统让我们的库存管理变得如此简单。10家店的库存情况一目了然，浪费大大减少，成本控制得更好了。'
  }, {
    id: 3,
    customerName: '王总监',
    customerTitle: '高端美发会所',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    content: '客户配方管理系统帮助我们建立了完整的客户档案。现在每个客户都能享受到个性化的服务，回头率和客单价都有明显提升。'
  }]);

  // 统计数据
  const [stats] = useState([{
    icon: Store,
    value: '1,200+',
    label: '合作门店',
    description: '遍布全国200+城市',
    color: 'bg-blue-500'
  }, {
    icon: Smile,
    value: '98%',
    label: '客户满意度',
    description: '超过10万客户好评',
    color: 'bg-green-500'
  }, {
    icon: TrendingUp,
    value: '300%',
    label: '平均效率提升',
    description: '显著降低运营成本',
    color: 'bg-purple-500'
  }, {
    icon: Award,
    value: '50+',
    label: '行业奖项',
    description: '获得多项技术专利',
    color: 'bg-orange-500'
  }]);

  // 筛选选项
  const filterOptions = [{
    value: 'all',
    label: '全部案例'
  }, {
    value: 'AI智能调色宝机',
    label: 'AI智能调色宝机'
  }, {
    value: '染发膏管理系统',
    label: '染发膏管理系统'
  }, {
    value: '客户配方管理',
    label: '客户配方管理'
  }, {
    value: '连锁门店管理',
    label: '连锁门店管理'
  }, {
    value: 'CRM系统',
    label: 'CRM系统'
  }, {
    value: 'SaaS平台',
    label: 'SaaS平台'
  }];

  // 排序选项
  const sortOptions = [{
    value: 'latest',
    label: '最新案例'
  }, {
    value: 'popular',
    label: '热门案例'
  }, {
    value: 'rating',
    label: '评分最高'
  }];

  // 处理筛选
  const handleFilter = filter => {
    setSelectedFilter(filter);
  };

  // 处理排序
  const handleSort = sort => {
    setSortBy(sort);
  };

  // 处理搜索
  const handleSearch = term => {
    setSearchTerm(term);
  };

  // 处理案例详情
  const handleCaseDetail = caseItem => {
    if (onCaseDetail) {
      onCaseDetail(caseItem);
    } else {
      toast({
        title: "案例详情",
        description: `查看 ${caseItem.title} 的详细信息`
      });
    }
  };

  // 处理联系销售
  const handleContactSales = () => {
    if (onContactSales) {
      onContactSales();
    } else {
      toast({
        title: "联系销售",
        description: "销售顾问将尽快与您联系"
      });
    }
  };

  // 筛选案例
  const filteredCases = cases.filter(caseItem => {
    const matchesFilter = selectedFilter === 'all' || caseItem.category === selectedFilter;
    const matchesSearch = searchTerm === '' || caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 排序案例
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // 启动数字动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 渲染星级评分
  const renderStars = rating => {
    return <div className="flex text-yellow-400 text-sm">
        {[...Array(5)].map((_, index) => <Star key={index} className={`w-3 h-3 ${index < rating ? 'fill-current' : ''}`} />)}
      </div>;
  };

  // 渲染统计数据
  const renderStatNumber = (value, index) => {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/\d/g, '');
    return <span className={animatedStats ? 'stat-number' : ''}>
        {animatedStats ? numericValue.toLocaleString() + suffix : '0' + suffix}
      </span>;
  };
  return <div className="space-y-8">
      {/* 头部导航 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">客户案例</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Search className="w-4 h-4 mr-2" />
              搜索案例
            </Button>
            <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border border-white/30">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
        </div>
      </header>

      {/* 页面标题和统计 */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">成功案例展示</h1>
        <p className="text-xl text-white/80 mb-8">看看AI美发系统如何帮助门店实现数字化转型</p>
        
        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          return <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {renderStatNumber(stat.value, index)}
              </div>
              <div className="text-white/60">{stat.label}</div>
              <div className="text-white/80 text-sm mt-2">{stat.description}</div>
            </div>;
        })}
        </div>
      </section>

      {/* 筛选器 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => <Button key={option.value} variant={selectedFilter === option.value ? 'default' : 'ghost'} onClick={() => handleFilter(option.value)} className={`${selectedFilter === option.value ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'} px-4 py-2 rounded-full`}>
                  {option.label}
                </Button>)}
            </div>
            <select value={sortBy} onChange={e => handleSort(e.target.value)} className="bg-white/10 border border-white/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-white/50">
              {sortOptions.map(option => <option key={option.value} value={option.value} className="bg-gray-800">
                  {option.label}
                </option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 案例列表 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCases.map(caseItem => <Card key={caseItem.id} className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
            <div className="relative">
              <div className="aspect-video bg-gray-800 overflow-hidden">
                <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover" />
              </div>
              <div className={`absolute top-4 left-4 ${caseItem.categoryColor} text-white px-3 py-1 rounded-full text-sm`}>
                {caseItem.category}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{caseItem.title}</h3>
              <p className="text-white/60 text-sm mb-4">{caseItem.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img src={caseItem.customerAvatar} alt={caseItem.customerName} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-white text-sm">{caseItem.customerName}</p>
                    <p className="text-white/60 text-xs">{caseItem.customerTitle}</p>
                  </div>
                </div>
                {renderStars(caseItem.rating)}
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-white/80 text-sm mb-4">
                {Object.entries(caseItem.stats).map(([key, value]) => <div key={key}>
                    <div className="font-bold text-white">{value}%</div>
                    <div className="text-xs">{key === 'efficiency' ? '效率提升' : key === 'costReduction' ? '成本降低' : key === 'satisfaction' ? '满意度' : key === 'accuracy' ? '准确率' : key === 'wasteReduction' ? '浪费减少' : key === 'costSaving' ? '成本节省' : key === 'returnRate' ? '回头率' : key === 'avgOrderValue' ? '客单价增长' : key === 'revenue' ? '营收增长' : key === 'retention' ? '留存率' : key === 'repurchase' ? '复购率' : key === 'collaboration' ? '协同效率' : '指标'}</div>
                  </div>)}
              </div>
              
              <div className="flex items-center justify-between text-white/60 text-xs mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {caseItem.views}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {caseItem.likes}
                  </span>
                </div>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {caseItem.date}
                </span>
              </div>
              
              <Button onClick={() => handleCaseDetail(caseItem)} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
                查看详情
              </Button>
            </CardContent>
          </Card>)}
      </section>

      {/* 客户评价 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">客户真实评价</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => <div key={testimonial.id} className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={testimonial.customerAvatar} alt={testimonial.customerName} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="text-white font-medium">{testimonial.customerName}</h4>
                    <p className="text-white/60 text-sm">{testimonial.customerTitle}</p>
                  </div>
                </div>
                {renderStars(testimonial.rating)}
                <p className="text-white/80 mt-3">{testimonial.content}</p>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 成功数据展示 */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">成功数据展示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            return <div key={index} className="text-center">
                <div className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {renderStatNumber(stat.value, index)}
                </div>
                <div className="text-white/60">{stat.label}</div>
                <div className="text-white/80 text-sm mt-2">{stat.description}</div>
              </div>;
          })}
          </div>
          
          <div className="text-center mt-8">
            <Button onClick={handleContactSales} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8">
              <MessageCircle className="w-4 h-4 mr-2" />
              联系销售顾问
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};