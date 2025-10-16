// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Button } from '@/components/ui';
// @ts-ignore;
import { Edit, Eye, Star } from 'lucide-react';

export function EmployeeCard({
  employee,
  onEdit,
  onView
}) {
  const getStatusColor = status => {
    switch (status) {
      case '在职':
        return 'bg-green-100 text-green-800';
      case '休假':
        return 'bg-yellow-100 text-yellow-800';
      case '离职':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full" />
          <div>
            <h4 className="font-semibold">{employee.name}</h4>
            <p className="text-sm text-gray-600">{employee.position}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">电话：</span>
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">入职时间：</span>
            <span>{employee.joinDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">今日订单：</span>
            <span className="font-medium">{employee.todayOrders}单</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">本月订单：</span>
            <span className="font-medium">{employee.monthlyOrders}单</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">客户评分：</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span className="font-medium text-purple-600">{employee.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(employee.status)}`}>
            {employee.status}
          </span>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(employee)}>
              <Edit className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onView(employee)}>
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
}