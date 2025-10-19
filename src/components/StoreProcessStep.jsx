// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';

export function StoreProcessStep({
  step,
  index
}) {
  const getColorClasses = color => {
    const colorMap = {
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600'
      }
    };
    return colorMap[color] || colorMap.orange;
  };
  const colors = getColorClasses(step.color);
  const Icon = step.icon;
  return <div className="text-center">
      <div className="relative mb-6">
        <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto`}>
          <Icon className={`w-10 h-10 ${colors.text}`} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
      <p className="text-gray-600 mb-4">{step.description}</p>
      <ul className="space-y-2 text-left">
        {step.items.map((item, idx) => <li key={idx} className="flex items-center text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {item}
          </li>)}
      </ul>
    </div>;
}