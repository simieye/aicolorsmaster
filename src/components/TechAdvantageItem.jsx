// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';

export function TechAdvantageItem({
  tech
}) {
  const getColorClasses = color => {
    const colorMap = {
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-200'
      }
    };
    return colorMap[color] || colorMap.green;
  };
  const colors = getColorClasses(tech.color);
  const Icon = tech.icon;
  return <div className={`flex items-center space-x-4 p-4 rounded-lg border ${colors.border} hover:shadow-md transition-all duration-300 hover:translate-x-2`}>
      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{tech.title}</h4>
        <p className="text-gray-600">{tech.description}</p>
      </div>
    </div>;
}