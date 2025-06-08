import { t } from 'i18next';
import { CircleX } from 'lucide-react';
import { ReactElement } from 'react';
import EmptyState from './EmptyState';

interface ErrorStateProps {
  title?: string;
  msg?: string;
  icon?: ReactElement;
  showIcon?: boolean;
  action?: ReactElement;
}

const ErrorState = ({ title, msg, icon, showIcon = true, action }: ErrorStateProps) => {
  return (
    <EmptyState
      title={title || t('common.error.defaultTitle')}
      msg={msg || t('common.error.defaultMessage')}
      icon={!icon ? <CircleX /> : icon}
      showIcon={showIcon}
      action={action}
    ></EmptyState>
  );
};

export default ErrorState;
