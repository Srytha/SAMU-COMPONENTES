import React from 'react';
import { StatCardProps } from '../../types/estadisticasTypes';

const colorClasses: Record<'blue' | 'red' | 'green' | 'yellow' | 'purple', string> = {
  blue: 'border-blue-500 text-blue-500',
  red: 'border-red-500 text-red-500',
  green: 'border-green-500 text-green-500',
  yellow: 'border-yellow-500 text-yellow-500',
  purple: 'border-purple-500 text-purple-500',
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'blue' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 ${colorClasses[color]}`} />
      </div>
    </div>
  );
};

export default StatCard;
