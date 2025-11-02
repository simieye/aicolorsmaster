// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, AlertTriangle, Database, Bug, Clock, Zap } from 'lucide-react';

export function TestScenarioSelector({
  scenarios,
  selectedScenario,
  onScenarioChange,
  disabled = false
}) {
  const getScenarioIcon = scenario => {
    const iconMap = {
      normal: <CheckCircle className="w-4 h-4 text-green-500" />,
      empty: <Database className="w-4 h-4 text-blue-500" />,
      partial: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      network: <Bug className="w-4 h-4 text-red-500" />,
      slow: <Clock className="w-4 h-4 text-orange-500" />,
      concurrent: <Zap className="w-4 h-4 text-purple-500" />
    };
    return iconMap[scenario] || <CheckCircle className="w-4 h-4" />;
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(scenarios).map(([key, scenario]) => <Button key={key} variant={selectedScenario === key ? 'default' : 'outline'} className="h-auto p-4 flex flex-col items-start text-left" onClick={() => onScenarioChange(key)} disabled={disabled}>
        <div className="flex items-center gap-2 mb-2">
          {getScenarioIcon(key)}
          <span className="font-medium">{scenario.name}</span>
        </div>
        <p className="text-xs text-muted-foreground">{scenario.description}</p>
        <div className="mt-2 text-xs text-muted-foreground">
          {scenario.configs?.length || 0} 个数据加载器
        </div>
      </Button>)}
    </div>;
}