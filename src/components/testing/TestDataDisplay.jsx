// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Database, FileText, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export function TestDataDisplay({
  batchLoader,
  currentScenario
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const toggleExpanded = key => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const getDataIcon = type => {
    const iconMap = {
      products: <ShoppingCart className="w-4 h-4" />,
      users: <Users className="w-4 h-4" />,
      orders: <FileText className="w-4 h-4" />,
      analytics: <TrendingUp className="w-4 h-4" />
    };
    return iconMap[type] || <Database className="w-4 h-4" />;
  };
  const formatDataSize = data => {
    if (!data) return '0 B';
    const size = JSON.stringify(data).length;
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };
  const renderDataPreview = (data, type) => {
    if (!data) return <div className="text-muted-foreground">无数据</div>;
    if (Array.isArray(data)) {
      return <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            数组长度: {data.length}
          </div>
          {data.length > 0 && <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-2 text-xs font-medium">
                数据预览 (前3项)
              </div>
              <div className="max-h-60 overflow-y-auto">
                {data.slice(0, 3).map((item, index) => <div key={index} className="border-b last:border-b-0 p-3">
                    <div className="text-xs font-medium mb-1">项目 {index + 1}</div>
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </div>)}
                {data.length > 3 && <div className="p-3 text-center text-sm text-muted-foreground">
                    ... 还有 {data.length - 3} 项
                  </div>}
              </div>
            </div>}
        </div>;
    } else {
      return <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            对象数据
          </div>
          <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto max-h-60 overflow-y-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>;
    }
  };
  return <div className="space-y-4">
      {Object.entries(batchLoader).map(([key, loader]) => {
      if (!loader || typeof loader !== 'object') return null;
      return <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getDataIcon(loader.type)}
                  <span>{key}</span>
                  <Badge variant="outline">{loader.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  {loader.data && <span className="text-xs text-muted-foreground">
                      {formatDataSize(loader.data)}
                    </span>}
                  <Button variant="ghost" size="sm" onClick={() => toggleExpanded(key)}>
                    {expandedItems[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            {expandedItems[key] && <CardContent>
                {loader.loading ? <div className="text-center py-4 text-muted-foreground">
                    加载中...
                  </div> : loader.error ? <div className="text-center py-4 text-red-500">
                    加载失败: {loader.error.message}
                  </div> : renderDataPreview(loader.data, loader.type)}
              </CardContent>}
          </Card>;
    })}
      
      {Object.keys(batchLoader).length === 0 && <Card>
          <CardContent className="text-center py-8">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">暂无数据</h3>
            <p className="text-muted-foreground">
              请先选择测试场景并运行测试
            </p>
          </CardContent>
        </Card>}
    </div>;
}