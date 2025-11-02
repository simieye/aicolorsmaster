// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { SlidersHorizontal, Search, Grid, List } from 'lucide-react';

// @ts-ignore;
import { InlineLoading } from '@/components/LoadingStates';
export function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  categories,
  showFilters,
  onToggleFilters,
  isFiltering,
  viewMode,
  onViewModeChange
}) {
  return <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 搜索框 */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input type="text" placeholder="搜索产品名称、品牌..." value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        {/* 筛选按钮 */}
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onToggleFilters} className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            筛选
            {isFiltering && <InlineLoading text="筛选中..." />}
          </Button>

          {/* 视图切换 */}
          <div className="flex border rounded-lg">
            <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => onViewModeChange('grid')} className="rounded-r-none">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => onViewModeChange('list')} className="rounded-l-none">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 高级筛选 */}
      {showFilters && <div className="mt-4 pt-4 border-t space-y-4">
          {/* 分类筛选 */}
          <div>
            <label className="block text-sm font-medium mb-2">产品分类</label>
            <div className="flex flex-wrap gap-2">
              {(categories || []).map(category => <Button key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} size="sm" onClick={() => onCategoryChange(category.id)} className="flex items-center gap-2">
                  {category.name}
                  {category.count > 0 && <span className="text-xs bg-muted px-1 rounded">
                      {category.count}
                    </span>}
                </Button>)}
            </div>
          </div>

          {/* 价格范围 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              价格范围: ¥{priceRange[0]} - ¥{priceRange[1]}
            </label>
            <div className="flex items-center gap-4">
              <input type="range" min="0" max="1000" value={priceRange[0]} onChange={e => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])} className="flex-1" />
              <input type="range" min="0" max="1000" value={priceRange[1]} onChange={e => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])} className="flex-1" />
            </div>
          </div>

          {/* 排序 */}
          <div>
            <label className="block text-sm font-medium mb-2">排序方式</label>
            <select value={sortBy} onChange={e => onSortByChange(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="name">名称</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="rating">评分</option>
            </select>
          </div>
        </div>}
    </div>;
}