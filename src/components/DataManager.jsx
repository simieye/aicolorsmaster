// @ts-ignore;
import React, { createContext, useContext, useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const DataContext = createContext();
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
export const DataProvider = ({
  children
}) => {
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState([]);
  const [formulas, setFormulas] = useState([]);
  const [colors, setColors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    loadInitialData();
  }, []);

  // 加载初始数据
  const loadInitialData = async () => {
    setLoading(true);
    try {
      // 模拟从API加载数据
      const [productsData, formulasData, colorsData, ordersData, usersData] = await Promise.all([loadProducts(), loadFormulas(), loadColors(), loadOrders(), loadUsers()]);
      setProducts(productsData);
      setFormulas(formulasData);
      setColors(colorsData);
      setOrders(ordersData);
      setUsers(usersData);
    } catch (error) {
      console.error('加载数据失败:', error);
      toast({
        title: "数据加载失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 加载产品数据
  const loadProducts = async () => {
    // 模拟产品数据
    return [{
      id: 1,
      name: '智能调色机 Pro',
      category: '设备',
      price: 29999,
      description: '高精度智能调色设备，支持AI辅助调色',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
      stock: 50,
      rating: 4.8,
      reviews: 128,
      features: ['AI智能调色', '高精度传感器', '云端同步', '移动端控制'],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    }, {
      id: 2,
      name: '色彩分析仪 Lite',
      category: '设备',
      price: 8999,
      description: '便携式色彩分析工具，专业级色彩识别',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
      stock: 120,
      rating: 4.6,
      reviews: 89,
      features: ['便携设计', '专业级精度', '蓝牙连接', 'APP控制'],
      createdAt: '2024-01-10T15:30:00Z',
      updatedAt: '2024-01-10T15:30:00Z'
    }, {
      id: 3,
      name: '配方管理系统',
      category: '软件',
      price: 4999,
      description: '全面的配方管理和分析系统',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      stock: 999,
      rating: 4.7,
      reviews: 56,
      features: ['配方管理', '成本分析', '库存管理', '报表生成'],
      createdAt: '2024-01-08T09:15:00Z',
      updatedAt: '2024-01-08T09:15:00Z'
    }];
  };

  // 加载配方数据
  const loadFormulas = async () => {
    return [{
      id: 1,
      name: '天空蓝标准配方',
      type: '水性涂料',
      color: '#87CEEB',
      ingredients: [{
        name: '钛白粉',
        amount: 45,
        unit: 'kg'
      }, {
        name: '蓝色颜料',
        amount: 12,
        unit: 'kg'
      }, {
        name: '添加剂',
        amount: 3,
        unit: 'kg'
      }, {
        name: '水',
        amount: 40,
        unit: 'kg'
      }],
      totalWeight: 100,
      cost: 156.8,
      createdBy: 1,
      createdAt: '2024-01-12T14:20:00Z',
      usage: 234
    }, {
      id: 2,
      name: '森林绿环保配方',
      type: '环保涂料',
      color: '#228B22',
      ingredients: [{
        name: '环保树脂',
        amount: 50,
        unit: 'kg'
      }, {
        name: '绿色颜料',
        amount: 8,
        unit: 'kg'
      }, {
        name: '天然填料',
        amount: 30,
        unit: 'kg'
      }, {
        name: '水',
        amount: 12,
        unit: 'kg'
      }],
      totalWeight: 100,
      cost: 189.5,
      createdBy: 1,
      createdAt: '2024-01-11T16:45:00Z',
      usage: 156
    }];
  };

  // 加载色彩数据
  const loadColors = async () => {
    return [{
      id: 1,
      name: '天空蓝',
      hex: '#87CEEB',
      rgb: '135, 206, 235',
      category: '蓝色系',
      pantone: '290 C',
      usage: 89,
      popularity: 4.7,
      description: '清新明亮的天空蓝色，适合室内装饰',
      combinations: ['#FFFFFF', '#F0F8FF', '#4682B4'],
      createdAt: '2024-01-05T11:30:00Z'
    }, {
      id: 2,
      name: '森林绿',
      hex: '#228B22',
      rgb: '34, 139, 34',
      category: '绿色系',
      pantone: '355 C',
      usage: 67,
      popularity: 4.5,
      description: '自然深沉的森林绿色，环保涂料首选',
      combinations: ['#FFFFFF', '#F5DEB3', '#8B4513'],
      createdAt: '2024-01-06T13:15:00Z'
    }, {
      id: 3,
      name: '珊瑚红',
      hex: '#FF7F50',
      rgb: '255, 127, 80',
      category: '红色系',
      pantone: '164 C',
      usage: 45,
      popularity: 4.3,
      description: '温暖活力的珊瑚红色，现代装饰流行色',
      combinations: ['#FFFFFF', '#FFE4B5', '#FF6347'],
      createdAt: '2024-01-07T10:45:00Z'
    }];
  };

  // 加载订单数据
  const loadOrders = async () => {
    return [{
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerId: 2,
      customerName: '张三',
      items: [{
        productId: 1,
        productName: '智能调色机 Pro',
        quantity: 1,
        price: 29999
      }],
      totalAmount: 29999,
      status: 'pending',
      paymentStatus: 'paid',
      shippingAddress: '北京市朝阳区xxx街道xxx号',
      createdAt: '2024-01-18T10:30:00Z',
      estimatedDelivery: '2024-01-25T00:00:00Z'
    }, {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerId: 2,
      customerName: '李四',
      items: [{
        productId: 2,
        productName: '色彩分析仪 Lite',
        quantity: 2,
        price: 8999
      }],
      totalAmount: 17998,
      status: 'shipped',
      paymentStatus: 'paid',
      shippingAddress: '上海市浦东新区xxx路xxx号',
      createdAt: '2024-01-17T14:20:00Z',
      estimatedDelivery: '2024-01-22T00:00:00Z'
    }];
  };

  // 加载用户数据
  const loadUsers = async () => {
    return [{
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      name: '管理员',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '13800138000',
      address: '北京市朝阳区',
      joinDate: '2023-01-01T00:00:00Z',
      lastLogin: '2024-01-18T09:00:00Z',
      status: 'active'
    }, {
      id: 2,
      username: 'user',
      email: 'user@example.com',
      name: '普通用户',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      phone: '13900139000',
      address: '上海市浦东新区',
      joinDate: '2023-06-15T00:00:00Z',
      lastLogin: '2024-01-17T16:30:00Z',
      status: 'active'
    }];
  };

  // CRUD 操作
  const createProduct = async productData => {
    try {
      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "产品创建成功",
        description: `产品 ${newProduct.name} 已创建`
      });
      return newProduct;
    } catch (error) {
      toast({
        title: "创建失败",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  const updateProduct = async (id, productData) => {
    try {
      setProducts(prev => prev.map(product => product.id === id ? {
        ...product,
        ...productData,
        updatedAt: new Date().toISOString()
      } : product));
      toast({
        title: "产品更新成功",
        description: `产品信息已更新`
      });
    } catch (error) {
      toast({
        title: "更新失败",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  const deleteProduct = async id => {
    try {
      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: "产品删除成功",
        description: `产品已删除`
      });
    } catch (error) {
      toast({
        title: "删除失败",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  const value = {
    // 数据
    products,
    formulas,
    colors,
    orders,
    users,
    loading,
    // 产品操作
    createProduct,
    updateProduct,
    deleteProduct,
    loadProducts,
    // 配方操作
    createFormula: async formulaData => {
      const newFormula = {
        ...formulaData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        usage: 0
      };
      setFormulas(prev => [...prev, newFormula]);
      return newFormula;
    },
    // 色彩操作
    createColor: async colorData => {
      const newColor = {
        ...colorData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        usage: 0,
        popularity: 0
      };
      setColors(prev => [...prev, newColor]);
      return newColor;
    },
    // 订单操作
    createOrder: async orderData => {
      const newOrder = {
        ...orderData,
        id: Date.now(),
        orderNumber: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    },
    // 刷新数据
    refreshData: loadInitialData
  };
  return <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>;
};