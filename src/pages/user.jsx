// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { User, Settings, Heart, ShoppingBag, Clock, Star, Package, ChevronRight, Brain, Sliders, Tag, DollarSign, Palette, Save, RotateCcw, Download, Upload, Zap, Shield, Bell, BarChart3, Target, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { deepseekService } from '@/lib/deepseek';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { UserStats } from '@/components/UserStats';
// @ts-ignore;
import { OrderStatusGrid } from '@/components/OrderStatusGrid';
// @ts-ignore;
import { MenuList } from '@/components/MenuList';
// @ts-ignore;

export default function UserPage(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [recommendationSettings, setRecommendationSettings] = useState({
    enabled: true,
    algorithm: 'balanced',
    sensitivity: 'medium',
    categories: [],
    priceRange: {
      min: 0,
      max: 1000
    },
    brands: [],
    colors: [],
    frequency: 'daily',
    notifications: true,
    learning: true,
    privacy: 'standard'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const currentUser = $w?.auth?.currentUser;
  const handleNavigation = (pageId, params = {}) => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId,
        params
      });
    }
  };
  useEffect(() => {
    loadRecommendationSettings();
  }, []);
  const loadRecommendationSettings = () => {
    // 从本地存储或API加载推荐设置
    const saved = localStorage.getItem('recommendationSettings');
    if (saved) {
      setRecommendationSettings(JSON.parse(saved));
    } else {
      // 设置默认值
      setRecommendationSettings({
        enabled: true,
        algorithm: 'balanced',
        sensitivity: 'medium',
        categories: ['hair-dye', 'tools'],
        priceRange: {
          min: 50,
          max: 500
        },
        brands: ['AI智能', '天然'],
        colors: ['棕色', '黑色'],
        frequency: 'daily',
        notifications: true,
        learning: true,
        privacy: 'standard'
      });
    }
  };
  const saveRecommendationSettings = async () => {
    setIsSaving(true);
    try {
      // 保存到本地存储
      localStorage.setItem('recommendationSettings', JSON.stringify(recommendationSettings));

      // 可以调用API保存到服务器
      // await $w.cloud.callFunction({
      //   name: 'saveUserPreferences',
      //   data: { userId: currentUser?.userId, settings: recommendationSettings }
      // });

      setHasChanges(false);
      toast({
        title: "保存成功",
        description: "您的推荐偏好设置已保存"
      });
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  const resetToDefaults = () => {
    setRecommendationSettings({
      enabled: true,
      algorithm: 'balanced',
      sensitivity: 'medium',
      categories: ['hair-dye', 'tools'],
      priceRange: {
        min: 50,
        max: 500
      },
      brands: ['AI智能', '天然'],
      colors: ['棕色', '黑色'],
      frequency: 'daily',
      notifications: true,
      learning: true,
      privacy: 'standard'
    });
    setHasChanges(true);
    toast({
      title: "已重置",
      description: "推荐设置已恢复为默认值"
    });
  };
  const exportSettings = () => {
    const dataStr = JSON.stringify(recommendationSettings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'recommendation-settings.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  const importSettings = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const imported = JSON.parse(e.target.result);
          setRecommendationSettings(imported);
          setHasChanges(true);
          toast({
            title: "导入成功",
            description: "推荐设置已导入"
          });
        } catch (error) {
          toast({
            title: "导入失败",
            description: "文件格式不正确",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };
  const updateSetting = (key, value) => {
    setRecommendationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };
  const updateNestedSetting = (parentKey, childKey, value) => {
    setRecommendationSettings(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
    setHasChanges(true);
  };
  const toggleArrayItem = (key, item) => {
    setRecommendationSettings(prev => {
      const currentArray = prev[key] || [];
      const newArray = currentArray.includes(item) ? currentArray.filter(i => i !== item) : [...currentArray, item];
      return {
        ...prev,
        [key]: newArray
      };
    });
    setHasChanges(true);
  };
  const categories = [{
    id: 'hair-dye',
    name: '染发剂',
    icon: '🎨'
  }, {
    id: 'tools',
    name: '染发工具',
    icon: '🔧'
  }, {
    id: 'accessories',
    name: '配件用品',
    icon: '✨'
  }, {
    id: 'kits',
    name: '套装组合',
    icon: '📦'
  }, {
    id: 'natural',
    name: '天然产品',
    icon: '🌿'
  }, {
    id: 'professional',
    name: '专业产品',
    icon: '💼'
  }];
  const brands = ['AI智能', '天然', '专业', '温和', '持久', '快速', '经济', '高端'];
  const colors = ['黑色', '棕色', '金色', '红色', '紫色', '蓝色', '灰色', '粉色', '绿色', '自定义'];
  const algorithms = [{
    id: 'balanced',
    name: '平衡推荐',
    description: '综合考虑多种因素'
  }, {
    id: 'price-focused',
    name: '价格优先',
    description: '优先推荐性价比高的产品'
  }, {
    id: 'quality-focused',
    name: '品质优先',
    description: '优先推荐高品质产品'
  }, {
    id: 'trending',
    name: '热门趋势',
    description: '优先推荐热门产品'
  }, {
    id: 'personalized',
    name: '个性化',
    description: '基于个人行为深度定制'
  }];
  const menuItems = [{
    id: 'profile',
    label: '个人资料',
    icon: <User className="w-5 h-5" />
  }, {
    id: 'orders',
    label: '我的订单',
    icon: <Package className="w-5 h-5" />
  }, {
    id: 'favorites',
    label: '我的收藏',
    icon: <Heart className="w-5 h-5" />
  }, {
    id: 'recommendations',
    label: '推荐设置',
    icon: <Brain className="w-5 h-5" />
  }, {
    id: 'settings',
    label: '账户设置',
    icon: <Settings className="w-5 h-5" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background">
        <TopNavigation title="个人中心" showBack={true} />
        
        <div className="pb-20">
          {/* 用户信息头部 */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{currentUser?.nickName || currentUser?.name || '用户'}</h1>
                <p className="text-purple-100">{currentUser?.userId || '未登录'}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">VIP会员</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">已购 12 件</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 菜单标签 */}
          <div className="bg-card border-b">
            <div className="flex">
              {menuItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === item.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>)}
            </div>
          </div>

          {/* 推荐设置页面 */}
          {activeTab === 'recommendations' && <div className="p-4 space-y-6">
              {/* 基本设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sliders className="w-5 h-5" />
                    <span>基本设置</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">启用个性化推荐</div>
                      <div className="text-sm text-muted-foreground">基于您的偏好提供智能推荐</div>
                    </div>
                    <Button variant={recommendationSettings.enabled ? "default" : "outline"} onClick={() => updateSetting('enabled', !recommendationSettings.enabled)}>
                      {recommendationSettings.enabled ? '已启用' : '已禁用'}
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">推荐算法</label>
                    <select value={recommendationSettings.algorithm} onChange={e => updateSetting('algorithm', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      {algorithms.map(algo => <option key={algo.id} value={algo.id}>
                          {algo.name} - {algo.description}
                        </option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">推荐敏感度</label>
                    <div className="flex space-x-2">
                      {['low', 'medium', 'high'].map(level => <Button key={level} variant={recommendationSettings.sensitivity === level ? "default" : "outline"} onClick={() => updateSetting('sensitivity', level)} className="flex-1">
                          {level === 'low' ? '保守' : level === 'medium' ? '平衡' : '积极'}
                        </Button>)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">推荐频率</label>
                    <div className="flex space-x-2">
                      {['realtime', 'daily', 'weekly'].map(freq => <Button key={freq} variant={recommendationSettings.frequency === freq ? "default" : "outline"} onClick={() => updateSetting('frequency', freq)} className="flex-1">
                          {freq === 'realtime' ? '实时' : freq === 'daily' ? '每日' : '每周'}
                        </Button>)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 产品类别偏好 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>产品类别偏好</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map(category => <button key={category.id} onClick={() => toggleArrayItem('categories', category.id)} className={`p-3 rounded-lg border transition-colors ${recommendationSettings.categories.includes(category.id) ? 'border-primary bg-primary/10' : 'border-muted hover:bg-accent'}`}>
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                      </button>)}
                  </div>
                </CardContent>
              </Card>

              {/* 价格区间偏好 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>价格区间偏好</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">最低价格: ¥{recommendationSettings.priceRange.min}</label>
                    <input type="range" min="0" max="1000" step="10" value={recommendationSettings.priceRange.min} onChange={e => updateNestedSetting('priceRange', 'min', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">最高价格: ¥{recommendationSettings.priceRange.max}</label>
                    <input type="range" min="0" max="2000" step="10" value={recommendationSettings.priceRange.max} onChange={e => updateNestedSetting('priceRange', 'max', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => updateSetting('priceRange', {
                  min: 0,
                  max: 100
                })}>
                      经济型
                    </Button>
                    <Button variant="outline" onClick={() => updateSetting('priceRange', {
                  min: 100,
                  max: 500
                })}>
                      中档
                    </Button>
                    <Button variant="outline" onClick={() => updateSetting('priceRange', {
                  min: 500,
                  max: 2000
                })}>
                      高端
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 品牌偏好 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>品牌偏好</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => <button key={brand} onClick={() => toggleArrayItem('brands', brand)} className={`px-3 py-2 rounded-full border transition-colors ${recommendationSettings.brands.includes(brand) ? 'border-primary bg-primary/10' : 'border-muted hover:bg-accent'}`}>
                        {brand}
                      </button>)}
                  </div>
                </CardContent>
              </Card>

              {/* 颜色偏好 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>颜色偏好</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {colors.map(color => <button key={color} onClick={() => toggleArrayItem('colors', color)} className={`p-2 rounded-lg border text-sm transition-colors ${recommendationSettings.colors.includes(color) ? 'border-primary bg-primary/10' : 'border-muted hover:bg-accent'}`}>
                        {color}
                      </button>)}
                  </div>
                </CardContent>
              </Card>

              {/* 高级设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>高级设置</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">推送通知</div>
                      <div className="text-sm text-muted-foreground">接收推荐更新通知</div>
                    </div>
                    <Button variant={recommendationSettings.notifications ? "default" : "outline"} onClick={() => updateSetting('notifications', !recommendationSettings.notifications)}>
                      {recommendationSettings.notifications ? '已启用' : '已禁用'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">智能学习</div>
                      <div className="text-sm text-muted-foreground">AI持续学习您的偏好</div>
                    </div>
                    <Button variant={recommendationSettings.learning ? "default" : "outline"} onClick={() => updateSetting('learning', !recommendationSettings.learning)}>
                      {recommendationSettings.learning ? '已启用' : '已禁用'}
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">隐私级别</label>
                    <select value={recommendationSettings.privacy} onChange={e => updateSetting('privacy', e.target.value)} className="w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="basic">基础 - 最少数据收集</option>
                      <option value="standard">标准 - 平衡体验与隐私</option>
                      <option value="advanced">高级 - 最佳推荐体验</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <Button onClick={saveRecommendationSettings} disabled={isSaving || !hasChanges} className="flex-1">
                  {isSaving ? '保存中...' : <><Save className="w-4 h-4 mr-2" />保存设置</>}
                </Button>
                <Button variant="outline" onClick={resetToDefaults}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  重置默认
                </Button>
                <Button variant="outline" onClick={exportSettings}>
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button variant="outline" onClick={() => document.getElementById('import-settings').click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  导入
                </Button>
                <input id="import-settings" type="file" accept=".json" onChange={importSettings} className="hidden" />
              </div>
            </div>}

          {/* 其他标签页内容保持不变 */}
          {activeTab === 'profile' && <div className="p-4">
              <UserStats />
            </div>}

          {activeTab === 'orders' && <div className="p-4">
              <OrderStatusGrid />
            </div>}

          {activeTab === 'favorites' && <div className="p-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>暂无收藏内容</p>
                  </div>
                </CardContent>
              </Card>
            </div>}

          {activeTab === 'settings' && <div className="p-4">
              <MenuList />
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}