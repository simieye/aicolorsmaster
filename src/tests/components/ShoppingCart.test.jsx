// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// @ts-ignore;
import '@testing-library/jest-dom';
// @ts-ignore;
import { ShoppingCart } from '@/components/ShoppingCart';

// Mock toast
const mockToast = jest.fn();
jest.mock('@/components/ui', () => ({
  useToast: () => ({
    toast: mockToast
  })
}));

// Mock data cache
const mockCacheUtils = {
  batchGet: jest.fn(),
  batchSet: jest.fn()
};
jest.mock('@/lib/DataCache', () => ({
  cacheUtils: mockCacheUtils,
  CACHE_KEYS: {
    CART: 'cart'
  }
}));
const defaultProps = {
  $w: {
    auth: {
      currentUser: {
        userId: 'test-user',
        name: 'Test User'
      }
    },
    utils: {
      navigateTo: jest.fn()
    }
  }
};
const mockCartItems = [{
  id: 1,
  name: '测试产品1',
  price: 100,
  quantity: 2,
  image: 'test-image-1.jpg'
}, {
  id: 2,
  name: '测试产品2',
  price: 200,
  quantity: 1,
  image: 'test-image-2.jpg'
}];
describe('ShoppingCart Component', () => {
  beforeEach(() => {
    mockToast.mockClear();
    mockCacheUtils.batchGet.mockReturnValue({
      cart: mockCartItems
    });
  });
  it('renders cart with items', () => {
    render(<ShoppingCart {...defaultProps} />);
    expect(screen.getByText('购物车')).toBeInTheDocument();
    expect(screen.getByText('测试产品1')).toBeInTheDocument();
    expect(screen.getByText('测试产品2')).toBeInTheDocument();
    expect(screen.getByText('¥100')).toBeInTheDocument();
    expect(screen.getByText('¥200')).toBeInTheDocument();
  });
  it('displays empty cart when no items', () => {
    mockCacheUtils.batchGet.mockReturnValue({
      cart: []
    });
    render(<ShoppingCart {...defaultProps} />);
    expect(screen.getByText('购物车是空的')).toBeInTheDocument();
    expect(screen.getByText('快去选购心仪的产品吧')).toBeInTheDocument();
  });
  it('calculates total price correctly', () => {
    render(<ShoppingCart {...defaultProps} />);
    const totalPrice = 100 * 2 + 200 * 1;
    expect(screen.getByText(`总计: ¥${totalPrice}`)).toBeInTheDocument();
  });
  it('updates quantity when quantity changes', async () => {
    render(<ShoppingCart {...defaultProps} />);
    const quantityInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(quantityInput, {
      target: {
        value: '3'
      }
    });
    await waitFor(() => {
      expect(mockCacheUtils.batchSet).toHaveBeenCalled();
    });
  });
  it('removes item when remove button is clicked', async () => {
    render(<ShoppingCart {...defaultProps} />);
    const removeButtons = screen.getAllByText('删除');
    fireEvent.click(removeButtons[0]);
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "删除成功",
        description: "商品已从购物车移除"
      });
    });
  });
  it('navigates to checkout when checkout button is clicked', () => {
    render(<ShoppingCart {...defaultProps} />);
    const checkoutButton = screen.getByText('去结算');
    fireEvent.click(checkoutButton);
    expect(defaultProps.$w.utils.navigateTo).toHaveBeenCalledWith({
      pageId: 'checkout',
      params: {}
    });
  });
  it('continues shopping when continue button is clicked', () => {
    render(<ShoppingCart {...defaultProps} />);
    const continueButton = screen.getByText('继续购物');
    fireEvent.click(continueButton);
    expect(defaultProps.$w.utils.navigateTo).toHaveBeenCalledWith({
      pageId: 'products',
      params: {}
    });
  });
  it('clears cart when clear button is clicked', async () => {
    render(<ShoppingCart {...defaultProps} />);
    const clearButton = screen.getByText('清空购物车');
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "清空成功",
        description: "购物车已清空"
      });
    });
  });
  it('handles user not logged in', () => {
    const propsWithoutUser = {
      $w: {
        auth: {
          currentUser: null
        },
        utils: {
          navigateTo: jest.fn()
        }
      }
    };
    render(<ShoppingCart {...propsWithoutUser} />);
    expect(screen.getByText('请先登录')).toBeInTheDocument();
  });
  it('applies custom className', () => {
    render(<ShoppingCart {...defaultProps} className="custom-cart" />);
    const cart = screen.getByTestId('shopping-cart');
    expect(cart).toHaveClass('custom-cart');
  });
  it('applies custom style', () => {
    const customStyle = {
      backgroundColor: 'red'
    };
    render(<ShoppingCart {...defaultProps} style={customStyle} />);
    const cart = screen.getByTestId('shopping-cart');
    expect(cart).toHaveStyle('background-color: red');
  });
});