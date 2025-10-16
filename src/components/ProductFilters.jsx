// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Filter, Search, Grid, List, ChevronDown } from 'lucide-react';

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange
}) {
  const sortOptions = [{
    value: 'popular',
    name: '最受欢迎'
  }, {
    value: 'price-low',
    name: '价格从低到高'
  }, {
    value: 'price-high',
    name: '价格从高到低'
  }, {
    value: 'rating',
    name: '评分最高'
  }, {
    value: 'newest',
    name: '最新上架'
  }];
  return <div className="space-y-4">
      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input type="text" placeholder="搜索产品..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => <button key={category.id} onClick={() => onCategoryChange(category.id)} className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          {category.name}
        </button>)}
      </div>

      {/* 排序和视图 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">排序:</span>
          <select value={sortBy} onChange={e => onSortChange(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
            {sortOptions.map(option => <option key={option.value} value={option.value}>
                {option.name}
              </option>)}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => onViewModeChange('grid')}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => onViewModeChange('list')}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 价格范围 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">价格范围</span>
          <span className="text-sm font-medium">¥{priceRange[0]} - ¥{priceRange[1]}</span>
        </div>
        <div className="flex items-center space-x-2">
          <input type="range" min="0" max="1000" value={priceRange[0]} onChange={e => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])} className="flex-1" />
          <input type="range" min="0" max="1000" value={priceRange[1]} onChange={e => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])} className="flex-1" />
        </div>
      </div>
    </div>;
}