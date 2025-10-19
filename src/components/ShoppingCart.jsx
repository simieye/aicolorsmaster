// @ts-ignore;
import React, { createContext, useContext, useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

const CartContext = createContext();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
export const CartProvider = ({
  children
}) => {
  const {
    toast
  } = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 从本地存储加载购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('解析购物车数据失败:', error);
        localStorage.removeItem('shoppingCart');
      }
    }
  }, []);

  // 保存购物车数据到本地存储
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 添加商品到购物车
  const addToCart = (product, quantity = 1) => {
    setIsLoading(true);
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          // 商品已存在，更新数量
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity > product.stock) {
            toast({
              title: "库存不足",
              description: `商品库存仅剩 ${product.stock} 件`,
              variant: "destructive"
            });
            return prevItems;
          }
          const updatedItems = prevItems.map(item => item.id === product.id ? {
            ...item,
            quantity: newQuantity
          } : item);
          toast({
            title: "数量已更新",
            description: `${product.name} 数量已更新为 ${newQuantity}`
          });
          return updatedItems;
        } else {
          // 新商品，添加到购物车
          if (quantity > product.stock) {
            toast({
              title: "库存不足",
              description: `商品库存仅剩 ${product.stock} 件`,
              variant: "destructive"
            });
            return prevItems;
          }
          const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            quantity,
            stock: product.stock,
            addedAt: new Date().toISOString()
          };
          toast({
            title: "添加成功",
            description: `${product.name} 已添加到购物车`
          });
          return [...prevItems, newItem];
        }
      });

      // 自动打开购物车侧边栏
      setTimeout(() => setIsCartOpen(true), 300);
    } catch (error) {
      console.error('添加到购物车失败:', error);
      toast({
        title: "添加失败",
        description: "商品添加失败，请重试",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 更新商品数量
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item && newQuantity > item.stock) {
        toast({
          title: "库存不足",
          description: `商品库存仅剩 ${item.stock} 件`,
          variant: "destructive"
        });
        return prevItems;
      }
      return prevItems.map(item => item.id === productId ? {
        ...item,
        quantity: newQuantity
      } : item);
    });
  };

  // 从购物车移除商品
  const removeFromCart = productId => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      const updatedItems = prevItems.filter(item => item.id !== productId);
      if (item) {
        toast({
          title: "已移除",
          description: `${item.name} 已从购物车移除`
        });
      }
      return updatedItems;
    });
  };

  // 清空购物车
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "购物车已清空",
      description: "所有商品已从购物车移除"
    });
  };

  // 计算购物车总价
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // 计算原价总价
  const getOriginalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.originalPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // 计算节省金额
  const getSavings = () => {
    return getOriginalPrice() - getTotalPrice();
  };

  // 获取购物车商品总数
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 立即购买
  const buyNow = (product, quantity = 1) => {
    // 先添加到购物车，然后跳转到结算页面
    addToCart(product, quantity);
    setTimeout(() => {
      // 这里应该跳转到结算页面
      toast({
        title: "准备结算",
        description: "正在跳转到结算页面..."
      });
    }, 500);
  };
  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getOriginalPrice,
    getSavings,
    getTotalItems,
    buyNow
  };
  return <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>;
};