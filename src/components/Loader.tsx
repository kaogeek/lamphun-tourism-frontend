import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return <div className={cn('animate-spin rounded-full h-16 w-16 border-b-2 border-primary', className)}></div>;
};

export default Loader;
