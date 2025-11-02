// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { render, screen } from '@testing-library/react';
// @ts-ignore;
import '@testing-library/jest-dom';
// @ts-ignore;
import { LoadingSpinner, PageLoading, CardSkeleton, ListItemSkeleton, TableSkeleton, ProductLoading, OrderLoading, UserLoading, StatsLoading, EmptyState, ErrorState, DataLoader, LoadingButton } from '@/components/LoadingStates';
describe('LoadingStates Components', () => {
  describe('LoadingSpinner', () => {
    it('renders with default props', () => {
      render(<LoadingSpinner />);
      expect(screen.getByText('加载中...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
    it('renders with custom text', () => {
      render(<LoadingSpinner text="自定义加载文本" />);
      expect(screen.getByText('自定义加载文本')).toBeInTheDocument();
    });
    it('renders with different sizes', () => {
      const {
        rerender
      } = render(<LoadingSpinner size="small" />);
      expect(screen.getByRole('status')).toHaveClass('w-4', 'h-4');
      rerender(<LoadingSpinner size="large" />);
      expect(screen.getByRole('status')).toHaveClass('w-8', 'h-8');
    });
  });
  describe('PageLoading', () => {
    it('renders page loading component', () => {
      render(<PageLoading />);
      expect(screen.getByText('页面加载中...')).toBeInTheDocument();
      expect(screen.getByText('请稍候，正在为您准备内容...')).toBeInTheDocument();
    });
    it('renders with custom message', () => {
      render(<PageLoading message="自定义页面加载" />);
      expect(screen.getByText('自定义页面加载')).toBeInTheDocument();
    });
  });
  describe('CardSkeleton', () => {
    it('renders specified number of skeleton cards', () => {
      render(<CardSkeleton count={3} />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
    it('renders single skeleton by default', () => {
      render(<CardSkeleton />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
  describe('ListItemSkeleton', () => {
    it('renders specified number of list items', () => {
      render(<ListItemSkeleton count={5} />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
  describe('TableSkeleton', () => {
    it('renders table skeleton with specified rows and columns', () => {
      render(<TableSkeleton rows={3} columns={4} />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
  describe('Specialized Loading Components', () => {
    it('renders ProductLoading component', () => {
      render(<ProductLoading />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
    it('renders OrderLoading component', () => {
      render(<OrderLoading />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
    it('renders UserLoading component', () => {
      render(<UserLoading />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
    it('renders StatsLoading component', () => {
      render(<StatsLoading />);
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
  describe('EmptyState', () => {
    it('renders empty state with default props', () => {
      render(<EmptyState />);
      expect(screen.getByText('暂无数据')).toBeInTheDocument();
      expect(screen.getByText('当前没有相关数据')).toBeInTheDocument();
    });
    it('renders empty state with custom props', () => {
      render(<EmptyState title="自定义标题" description="自定义描述" action={<button>操作按钮</button>} />);
      expect(screen.getByText('自定义标题')).toBeInTheDocument();
      expect(screen.getByText('自定义描述')).toBeInTheDocument();
      expect(screen.getByText('操作按钮')).toBeInTheDocument();
    });
  });
  describe('ErrorState', () => {
    it('renders error state with default props', () => {
      render(<ErrorState />);
      expect(screen.getByText('加载失败')).toBeInTheDocument();
      expect(screen.getByText('数据加载失败，请稍后重试')).toBeInTheDocument();
    });
    it('renders error state with custom props', () => {
      const mockRetry = jest.fn();
      render(<ErrorState title="自定义错误" description="自定义错误描述" onRetry={mockRetry} />);
      expect(screen.getByText('自定义错误')).toBeInTheDocument();
      expect(screen.getByText('自定义错误描述')).toBeInTheDocument();
      const retryButton = screen.getByText('重试');
      retryButton.click();
      expect(mockRetry).toHaveBeenCalled();
    });
    it('displays error details when provided', () => {
      const error = new Error('Test error');
      render(<ErrorState error={error} />);
      const details = screen.getByText('错误详情');
      expect(details).toBeInTheDocument();
    });
  });
  describe('DataLoader', () => {
    it('renders loading component when loading', () => {
      render(<DataLoader loading={true} error={null} data={null} loadingComponent={<div>加载中...</div>} />);
      expect(screen.getByText('加载中...')).toBeInTheDocument();
    });
    it('renders error component when error', () => {
      render(<DataLoader loading={false} error={new Error('Test error')} data={null} errorComponent={<div>错误发生</div>} />);
      expect(screen.getByText('错误发生')).toBeInTheDocument();
    });
    it('renders empty component when no data', () => {
      render(<DataLoader loading={false} error={null} data={[]} emptyComponent={<div>暂无数据</div>} />);
      expect(screen.getByText('暂无数据')).toBeInTheDocument();
    });
    it('renders children when data is available', () => {
      render(<DataLoader loading={false} error={null} data={[{
        id: 1
      }]}>
          <div>数据内容</div>
        </DataLoader>);
      expect(screen.getByText('数据内容')).toBeInTheDocument();
    });
  });
  describe('LoadingButton', () => {
    it('renders button with children', () => {
      render(<LoadingButton>按钮文本</LoadingButton>);
      expect(screen.getByText('按钮文本')).toBeInTheDocument();
    });
    it('shows loading spinner when loading', () => {
      render(<LoadingButton loading>按钮文本</LoadingButton>);
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
    it('disables button when loading', () => {
      render(<LoadingButton loading>按钮文本</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
    it('applies custom className', () => {
      render(<LoadingButton className="custom-class">按钮</LoadingButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });
});