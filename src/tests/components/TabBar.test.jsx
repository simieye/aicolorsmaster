// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { render, screen, fireEvent } from '@testing-library/react';
// @ts-ignore;
import '@testing-library/jest-dom';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';

// Mock the navigateTo function
const mockNavigateTo = jest.fn();
const defaultProps = {
  $w: {
    utils: {
      navigateTo: mockNavigateTo
    }
  }
};
describe('TabBar Component', () => {
  beforeEach(() => {
    mockNavigateTo.mockClear();
  });
  it('renders all navigation items', () => {
    render(<TabBar {...defaultProps} />);
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('产品')).toBeInTheDocument();
    expect(screen.getByText('社区')).toBeInTheDocument();
    expect(screen.getByText('我的')).toBeInTheDocument();
  });
  it('highlights active tab correctly', () => {
    render(<TabBar {...defaultProps} activeTab="products" />);
    const productsTab = screen.getByText('产品');
    expect(productsTab.closest('.text-primary')).toBeInTheDocument();
  });
  it('navigates to correct page when tab is clicked', () => {
    render(<TabBar {...defaultProps} />);
    const productsTab = screen.getByText('产品');
    fireEvent.click(productsTab);
    expect(mockNavigateTo).toHaveBeenCalledWith({
      pageId: 'products',
      params: {}
    });
  });
  it('shows notification badge when count > 0', () => {
    render(<TabBar {...defaultProps} notificationCount={5} />);
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-500');
  });
  it('does not show notification badge when count is 0', () => {
    render(<TabBar {...defaultProps} notificationCount={0} />);
    const badge = document.querySelector('.bg-red-500');
    expect(badge).not.toBeInTheDocument();
  });
  it('applies custom className when provided', () => {
    render(<TabBar {...defaultProps} className="custom-tabbar" />);
    const tabBar = screen.getByRole('navigation');
    expect(tabBar).toHaveClass('custom-tabbar');
  });
  it('renders with custom style', () => {
    const customStyle = {
      backgroundColor: 'red'
    };
    render(<TabBar {...defaultProps} style={customStyle} />);
    const tabBar = screen.getByRole('navigation');
    expect(tabBar).toHaveStyle('background-color: red');
  });
  it('handles missing navigateTo function gracefully', () => {
    const propsWithoutNavigate = {
      $w: {
        utils: {}
      }
    };
    render(<TabBar {...propsWithoutNavigate} />);
    const homeTab = screen.getByText('首页');
    expect(() => fireEvent.click(homeTab)).not.toThrow();
  });
});