// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Package, ShoppingCart, Star, Filter, TrendingUp, Zap, Shield, Award, ChevronRight } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ProductCard } from '@/components/ProductCard';
// @ts-ignore;
import { ProductFilters } from '@/components/ProductFilters';
export default function Products(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isLoading, setIsLoading] = useState(false);

  // 产品分类
  const productCategories = [{
    id: 'all',
    name: '全部产品'
  }, {
    id: 'hair-color',
    name: '染发剂'
  }, {
    id: 'bleach',
    name: '漂发剂'
  }, {
    id: 'peroxide',
    name: '双氧奶'
  }, {
    id: 'care',
    name: '护理产品'
  }, {
    id: 'tools',
    name: '美发工具'
  }];

  // 模拟数据加载
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockProducts = [{
          id: 1,
          name: '专业染发剂套装',
          category: 'hair-color',
          price: 299,
          originalPrice: 399,
          rating: 4.8,
          reviews: 234,
          sales: 1234,
          image: 'https://picsum.photos/seed/product1/300/300',
          description: '专业级染发剂，色彩持久，护发配方',
          features: ['持久显色', '护发配方', '易操作'],
          inStock: true,
          isHot: true,
          discount: 25
        }, {
          id: 2,
          name: '温和漂发剂',
          category: 'bleach',
          price: 189,
          originalPrice: 239,
          rating: 4.6,
          reviews: 156,
          sales: 892,
          image: 'https://picsum.photos/seed/product2/300/300',
          description: '温和配方，减少发质损伤',
          features: ['温和配方', '快速漂白', '护发成分'],
          inStock: true,
          isHot: false,
          discount: 21
        }, {
          id: 3,
          name: '9%双氧奶',
          category: 'peroxide',
          price: 79,
          originalPrice: 99,
          rating: 4.7,
          reviews: 89,
          sales: 2341,
          image: 'https://picsum.photos/seed/product3/300/300',
          description: '稳定双氧奶，配合染发剂使用',
          features: ['稳定配方', '多种浓度', '专业品质'],
          inStock: true,
          isHot: false,
          discount: 20
        }, {
          id: 4,
          name: '深层修复护发素',
          category: 'care',
          price: 129,
          originalPrice: 169,
          rating: 4.9,
          reviews: 345,
          sales: 1567,
          image: 'https://picsum.photos/seed/product4/300/300',
          description: '深层修复，滋养受损发质',
          features: ['深层修复', '天然成分', '持久滋养'],
          inStock: true,
          isHot: true,
          discount: 24
        }, {
          id: 5,
          name: '专业染发碗套装',
          category: 'tools',
          price: 59,
          originalPrice: 79,
          rating: 4.5,
          reviews: 67,
          sales: 445,
          image: 'https://picsum.photos/seed/product5/300/300',
          description: '专业染发工具，精准调配',
          features: ['精准刻度', '易清洗', '耐用材质'],
          inStock: true,
          isHot: false,
          discount: 25
        }, {
          id: 6,
          name: '色彩锁色洗发水',
          category: 'care',
          price: 89,
          originalPrice: 119,
          rating: 4.6,
          reviews: 123,
          sales: 789,
          image: 'https://picsum.photos/seed/product6/300/300',
          description: '锁色固色，延长色彩持久度',
          features: ['锁色固色', '温和清洁', '护发配方'],
          inStock: true,
          isHot: false,
          discount: 25
        }];
        setProducts(mockProducts);
        setCategories(productCategories);
      } catch (error) {
        toast({
          title: "加载失败",
          description: "请检查网络连接",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [toast]);

  // 过滤产品
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // 排序产品
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'popular':
      default:
        return b.sales - a.sales;
    }
  });

  // 添加到购物车
  const addToCart = product => {
    toast({
      title: "添加成功",
      description: `${product.name} 已添加到购物车`
    });
  };

  // 添加到收藏
  const addToWishlist = product => {
    toast({
      title: "收藏成功",
      description: `${product.name} 已添加到收藏`
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('products.title', '产品商城')}
          </h1>
          <p className="text-gray-600">
            {t('products.subtitle', '专业染发产品，品质保证')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 筛选侧边栏 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2" />
                  筛选
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductFilters categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} searchQuery={searchQuery} onSearchChange={setSearchQuery} viewMode={viewMode} onViewModeChange={setViewMode} sortBy={sortBy} onSortChange={setSortBy} priceRange={priceRange} onPriceRangeChange={setPriceRange} />
              </CardContent>
            </Card>
          </div>

          {/* 产品列表 */}
          <div className="lg:col-span-3">
            {/* 促销横幅 */}
            <Card className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      <Zap className="w-6 h-6 mr-2" />
                      限时优惠
                    </h2>
                    <p className="text-purple-100">全场染发产品满299减50，满599减120</p>
                  </div>
                  <Button className="bg-white text-purple-600 hover:bg-purple-50">
                    立即抢购
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 产品网格 */}
            {isLoading ? <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div> : <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {sortedProducts.map(product => <ProductCard key={product.id} product={product} viewMode={viewMode} onAddToCart={addToCart} onAddToWishlist={addToWishlist} />)}
            </div>}

            {/* 空状态 */}
            {sortedProducts.length === 0 && !isLoading && <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">暂无产品</h3>
                <p className="text-gray-500">请尝试调整筛选条件</p>
              </div>}
          </div>
        </div>

        {/* 品质保证 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">品质保证</h3>
              <p className="text-sm text-gray-600">所有产品均经过严格质量检测</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">专业认证</h3>
              <p className="text-sm text-gray-600">获得行业权威认证和许可</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">售后无忧</h3>
              <p className="text-sm text-gray-600">7天无理由退换货保障</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="products" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}