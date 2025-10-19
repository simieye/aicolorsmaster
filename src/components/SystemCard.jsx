// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowRight } from 'lucide-react';

export const SystemCard = ({
  system,
  onClick,
  isSelected
}) => {
  const getColorClasses = color => {
    const colorMap = {
      purple: {
        bg: 'from-purple-600 to-blue-600',
        light: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        badge: 'bg-purple-100 text-purple-700'
      },
      blue: {
        bg: 'from-blue-600 to-cyan-600',
        light: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700'
      },
      green: {
        bg: 'from-green-600 to-teal-600',
        light: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-700'
      },
      orange: {
        bg: 'from-orange-600 to-red-600',
        light: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-700'
      }
    };
    return colorMap[color] || colorMap.purple;
  };
  const colors = getColorClasses(system.color);
  const Icon = system.icon;
  return <div onClick={() => onClick(system)} className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${isSelected ? 'ring-2 ring-' + system.color + '-500' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-16 h-16 ${colors.light} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-8 h-8 ${colors.text}`} />
        </div>
        {system.badge && <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
            {system.badge}
          </span>}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{system.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">¥{system.price}</span>
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>;
};