import { t } from 'i18next';
import Loader from '../Loader';

const LoadingState = () => {
  return (
    <>
      <div className="container min-h-[60vh] flex flex-col justify-center items-center">
        <Loader className="mx-auto mb-4" />
        <h3 className="text-xl font-medium">{t('common.loading')}</h3>
      </div>
    </>
  );
};

export default LoadingState;
