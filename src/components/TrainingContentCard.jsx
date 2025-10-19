// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';

export function TrainingContentCard({
  content
}) {
  const getColorClasses = color => {
    const colorMap = {
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        light: 'bg-green-50'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        light: 'bg-blue-50'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        light: 'bg-purple-50'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        light: 'bg-yellow-50'
      }
    };
    return colorMap[color] || colorMap.green;
  };
  const colors = getColorClasses(content.color);
  const Icon = content.icon;
  return <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardContent className="p-8">
        <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-6`}>
          <Icon className={`w-8 h-8 ${colors.text}`} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{content.title}</h3>
        <p className="text-gray-600 mb-6">{content.description}</p>
        <ul className="space-y-3 text-left mb-6">
          {content.courses.map((course, idx) => <li key={idx} className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              {course}
            </li>)}
        </ul>
        <div className={`${colors.light} rounded-lg p-3`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${colors.text}`}>课程数量</span>
            <span className={`font-semibold ${colors.text}`}>{content.courseCount}门</span>
          </div>
        </div>
      </CardContent>
    </Card>;
}