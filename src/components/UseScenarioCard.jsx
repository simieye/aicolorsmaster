// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';

export function UseScenarioCard({
  scenario
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
  const colors = getColorClasses(scenario.color);
  const Icon = scenario.icon;
  return <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <Icon className={`w-10 h-10 ${colors.text}`} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{scenario.title}</h3>
        <p className="text-gray-600 mb-6">{scenario.description}</p>
        <ul className="space-y-3 text-left">
          {scenario.features.map((feature, idx) => <li key={idx} className="flex items-center text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              {feature}
            </li>)}
        </ul>
      </CardContent>
    </Card>;
}