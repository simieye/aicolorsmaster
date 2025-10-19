// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';

export function TrainingFeatureCard({
  feature
}) {
  const getColorClasses = color => {
    const colorMap = {
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600'
      }
    };
    return colorMap[color] || colorMap.green;
  };
  const colors = getColorClasses(feature.color);
  const Icon = feature.icon;
  return <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-6`}>
          <Icon className={`w-8 h-8 ${colors.text}`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-600 mb-4">{feature.description}</p>
        <ul className="space-y-2 text-sm text-gray-600">
          {feature.features.map((item, idx) => <li key={idx} className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {item}
            </li>)}
        </ul>
      </CardContent>
    </Card>;
}