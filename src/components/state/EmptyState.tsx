import { Info } from 'lucide-react';
import React, { ReactElement, isValidElement } from 'react';

interface EmptyStateProps {
  title: string;
  msg: string;
  icon?: ReactElement;
  showIcon?: boolean;
  action?: ReactElement;
}

const EmptyState = ({ title, msg, icon, showIcon = true, action }: EmptyStateProps) => {
  return (
    <div className="container min-h-[60vh] flex flex-col justify-center items-center">
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
