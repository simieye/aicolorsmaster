// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Edit, Trash2, AlertTriangle, Package } from 'lucide-react';

export function InventoryTable({
  inventory,
  onEdit,
  onDelete,
  onRestock
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'low':
        return '库存不足';
      case 'high':
        return '库存过多';
      default:
        return '未知';
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="w-5 h-5 mr-2" />
          库存列表
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">商品名称</th>
                <th className="text-left py-3 px-4">分类</th>
                <th className="text-left py-3 px-4">当前库存</th>
                <th className="text-left py-3 px-4">安全库存</th>
                <th className="text-left py-3 px-4">单价</th>
                <th className="text-left py-3 px-4">供应商</th>
                <th className="text-left py-3 px-4">状态</th>
                <th className="text-center py-3 px-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${item.currentStock <= item.minStock ? 'text-orange-600' : 'text-gray-800'}`}>
                      {item.currentStock} {item.unit}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.minStock} {item.unit}</td>
                  <td className="py-3 px-4">¥{item.price}</td>
                  <td className="py-3 px-4 text-sm">{item.supplier}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      {item.status === 'low' && <Button size="sm" onClick={() => onRestock(item)}>
                          补货
                        </Button>}
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>;
}