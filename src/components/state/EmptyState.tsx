import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import React, { ReactElement, isValidElement } from 'react';

interface EmptyStateProps {
  title: string;
  msg: string;
  icon?: ReactElement;
  showIcon?: boolean;
  action?: ReactElement;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClassMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'min-h-[30vh]',
  md: 'min-h-[60vh]',
  lg: 'min-h-[80vh]',
};

const EmptyState = ({ title, msg, icon, showIcon = true, action, size = 'md' }: EmptyStateProps) => {
  return (
    <div className={cn('container flex flex-col justify-center items-center', sizeClassMap[size])}>
      {showIcon && (
        <div className="mx-auto mb-4">
          {isValidElement(icon) ? (
            React.cloneElement(icon as ReactElement, { className: 'w-20 h-20 text-gray-400' })
          ) : (
            <Info className="w-20 h-20 text-gray-400" />
          )}
        </div>
      )}
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-gray-500">{msg}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
