// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';

export function LearningPath({
  path,
  index
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
  const colors = getColorClasses(path.color);
  return <div className={`bg-gradient-to-r ${index === 0 ? 'from-green-50 to-blue-50' : 'from-blue-50 to-purple-50'} rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{path.title}</h3>
          <p className="text-gray-600">{path.description}</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${colors.text}`}>{path.duration}</div>
          <div className="text-gray-600">完成周期</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {path.steps.map((step, stepIndex) => {
        const stepColors = getColorClasses(step.color);
        const StepIcon = step.icon;
        return <div key={stepIndex} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stepColors.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <StepIcon className={`w-6 h-6 ${stepColors.text}`} />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.duration}</p>
            </div>;
      })}
      </div>
    </div>;
}