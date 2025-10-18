// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, Star, ShoppingCart, Grid, List, ArrowUpDown, X, Check, AlertCircle } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ProtectedRoute } from '@/components/ProtectedRoute';
// @ts-ignore;
import { useAuth } from '@/components/AuthProvider';
export default function ProductsPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    user,
    hasPermission
  } = useAuth();
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // 表单配置
  const form = useForm({
    defaultValues: {
      name: '',
      category: 'paint',
      brand: '',
      description: '',
      price: '',
      unit: 'L',
      stock: '',
      status: 'active'
    }
  });

  // 产品分类
  const categories = [{
    value: 'all',
    label: '全部分类'
  }, {
    value: 'paint',
    label: '油漆'
  }, {
    value: 'coating',
    label: '涂料'
  }, {
    value: 'primer',
    label: '底漆'
  }, {
    value: 'additive',
    label: '添加剂'
  }, {
    value: 'tool',
    label: '工具'
  }];

  // 加载产品数据
  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);
  const loadProducts = async () => {
    try {
      setLoading(true);

      // 构建查询条件
      let filter = {};
      if (selectedCategory !== 'all') {
        filter.category = selectedCategory;
      }
      if (searchTerm) {
        filter.$or = [{
          name: {
            $search: searchTerm
          }
        }, {
          brand: {
            $search: searchTerm
          }
        }, {
          description: {
            $search: searchTerm
          }
        }];
      }
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'products',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: filter
          },
          select: {
            $master: true
          },
          orderBy: [{
            [sortBy]: sortOrder
          }],
          pageSize: 50
        }
      });
      setProducts(result.records || []);
    } catch (error) {
      console.error('加载产品失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载产品数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 添加或更新产品
  const handleSubmit = async data => {
    try {
      const productData = {
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        images: [`https://picsum.photos/seed/${data.name}/400/300.jpg`],
        specifications: {
          color: '白色',
          viscosity: '中等',
          coverage: '12-15㎡/L',
          dryingTime: '2小时'
        },
        tags: [data.category],
        rating: 0,
        reviews: 0
      };
      if (editingProduct) {
        // 更新产品
        await $w.cloud.callDataSource({
          dataSourceName: 'products',
          methodName: 'wedaUpdateV2',
          params: {
            data: productData,
            filter: {
              where: {
                _id: editingProduct._id
              }
            }
          }
        });
        toast({
          title: "更新成功",
          description: "产品信息已更新"
        });
      } else {
        // 添加产品
        await $w.cloud.callDataSource({
          dataSourceName: 'products',
          methodName: 'wedaCreateV2',
          params: {
            data: productData
          }
        });
        toast({
          title: "添加成功",
          description: "新产品已添加"
        });
      }
      setShowAddModal(false);
      setEditingProduct(null);
      form.reset();
      loadProducts();
    } catch (error) {
      console.error('保存产品失败:', error);
      toast({
        title: "保存失败",
        description: "无法保存产品信息",
        variant: "destructive"
      });
    }
  };

  // 删除产品
  const handleDelete = async productId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'products',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: productId
            }
          }
        }
      });
      toast({
        title: "删除成功",
        description: "产品已删除"
      });
      setShowDeleteConfirm(null);
      loadProducts();
    } catch (error) {
      console.error('删除产品失败:', error);
      toast({
        title: "删除失败",
        description: "无法删除产品",
        variant: "destructive"
      });
    }
  };

  // 编辑产品
  const handleEdit = product => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      brand: product.brand,
      description: product.description,
      price: product.price.toString(),
      unit: product.unit,
      stock: product.stock.toString(),
      status: product.status
    });
    setShowAddModal(true);
  };

  // 格式化日期
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  return <ProtectedRoute requiredPermission="write">
      <div style={style} className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* 头部导航 */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="w-8 h-8 text-white" />
                <div>
                  <h1 className="text-xl font-bold text-white">产品管理</h1>
                  <p className="text-sm text-white/80">管理所有产品信息</p>
                </div>
              </div>
              
              {hasPermission('write') && <Button onClick={() => setShowAddModal(true)} className="bg-white text-purple-600 hover:bg-white/90">
                  <Plus className="w-4 h-4 mr-2" />
                  添加产品
                </Button>}
            </div>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="container mx-auto px-4 py-6 pb-24">
          {/* 搜索和筛选 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* 搜索框 */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input placeholder="搜索产品名称、品牌或描述..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                </div>

                {/* 分类筛选 */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-40 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => <SelectItem key={category.value} value={category.value} className="text-gray-800">
                        {category.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                {/* 排序 */}
                <div className="flex items-center space-x-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt" className="text-gray-800">创建时间</SelectItem>
                      <SelectItem value="name" className="text-gray-800">名称</SelectItem>
                      <SelectItem value="price" className="text-gray-800">价格</SelectItem>
                      <SelectItem value="rating" className="text-gray-800">评分</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* 视图切换 */}
                <div className="flex items-center space-x-2">
                  <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" className="text-white hover:bg-white/20" onClick={() => setViewMode('grid')}>
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" className="text-white hover:bg-white/20" onClick={() => setViewMode('list')}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 产品列表 */}
          {loading ? <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div> : products.length === 0 ? <div className="text-center py-12">
              <Package className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <p className="text-white/80 text-lg">暂无产品数据</p>
              <p className="text-white/60">请添加新产品或调整筛选条件</p>
            </div> : viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => <Card key={product._id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="aspect-square bg-white/20 rounded-lg mb-2 flex items-center justify-center">
                      <Package className="w-12 h-12 text-white/60" />
                    </div>
                    <CardTitle className="text-white text-sm truncate">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-white/80 text-sm">{product.brand}</p>
                      <p className="text-white/60 text-xs truncate">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">¥{product.price}</span>
                        <span className="text-white/60 text-sm">库存: {product.stock}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/60 text-sm">
                          <Star className="w-3 h-3 mr-1" />
                          {product.rating}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {product.status === 'active' ? '在售' : '停售'}
                        </span>
                      </div>
                      {hasPermission('write') && <div className="flex space-x-2 pt-2">
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 flex-1" onClick={() => handleEdit(product)}>
                            <Edit className="w-3 h-3 mr-1" />
                            编辑
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/20 flex-1" onClick={() => setShowDeleteConfirm(product._id)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            删除
                          </Button>
                        </div>}
                    </div>
                  </CardContent>
                </Card>)}
            </div> : <div className="space-y-3">
              {products.map(product => <Card key={product._id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{product.name}</h3>
                        <p className="text-white/80 text-sm">{product.brand}</p>
                        <p className="text-white/60 text-sm truncate">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">¥{product.price}</p>
                        <p className="text-white/60 text-sm">库存: {product.stock}</p>
                        <div className="flex items-center text-white/60 text-sm">
                          <Star className="w-3 h-3 mr-1" />
                          {product.rating}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {product.status === 'active' ? '在售' : '停售'}
                        </span>
                        {hasPermission('write') && <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1" onClick={() => handleEdit(product)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/20 p-1" onClick={() => setShowDeleteConfirm(product._id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>}
        </main>

        {/* 添加/编辑产品模态框 */}
        {showAddModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {editingProduct ? '编辑产品' : '添加产品'}
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => {
                setShowAddModal(false);
                setEditingProduct(null);
                form.reset();
              }}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" rules={{
                  required: '请输入产品名称'
                }} render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white">产品名称</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入产品名称" {...field} className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                    <FormField control={form.control} name="category" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white">产品分类</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="选择分类" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="paint" className="text-gray-800">油漆</SelectItem>
                            <SelectItem value="coating" className="text-gray-800">涂料</SelectItem>
                            <SelectItem value="primer" className="text-gray-800">底漆</SelectItem>
                            <SelectItem value="additive" className="text-gray-800">添加剂</SelectItem>
                            <SelectItem value="tool" className="text-gray-800">工具</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                    <FormField control={form.control} name="brand" rules={{
                  required: '请输入品牌'
                }} render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white">品牌</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入品牌" {...field} className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                    <FormField control={form.control} name="description" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white">产品描述</FormLabel>
                        <FormControl>
                          <Input placeholder="请输入产品描述" {...field} className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="price" rules={{
                    required: '请输入价格'
                  }} render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">价格</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0.00" {...field} className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />

                      <FormField control={form.control} name="stock" rules={{
                    required: '请输入库存'
                  }} render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">库存</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-white/40" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button type="submit" className="flex-1 bg-white text-purple-600 hover:bg-white/90">
                        {editingProduct ? '更新' : '添加'}
                      </Button>
                      <Button type="button" variant="ghost" className="flex-1 text-white hover:bg-white/20" onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    form.reset();
                  }}>
                        取消
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>}

        {/* 删除确认模态框 */}
        {showDeleteConfirm && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">确认删除</h3>
                  <p className="text-white/60 text-sm mb-6">确定要删除这个产品吗？此操作不可撤销。</p>
                  <div className="flex space-x-3">
                    <Button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                      删除
                    </Button>
                    <Button variant="ghost" className="flex-1 text-white hover:bg-white/20" onClick={() => setShowDeleteConfirm(null)}>
                      取消
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}

        {/* 底部导航 */}
        <TabBar currentPage="products" />
      </div>
    </ProtectedRoute>;
}