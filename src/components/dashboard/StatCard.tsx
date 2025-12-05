import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
  loading?: boolean;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-500',
    text: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100/50',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'bg-green-500',
    text: 'text-green-600',
    gradient: 'from-green-50 to-green-100/50',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-500',
    text: 'text-purple-600',
    gradient: 'from-purple-50 to-purple-100/50',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'bg-orange-500',
    text: 'text-orange-600',
    gradient: 'from-orange-50 to-orange-100/50',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  loading = false,
}) => {
  const colors = colorClasses[color];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-br rounded-xl border border-gray-100 shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
        `${colors.gradient}`
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words leading-tight">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-semibold',
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">vs bulan lalu</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'w-14 h-14 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0',
            colors.icon
          )}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
};
