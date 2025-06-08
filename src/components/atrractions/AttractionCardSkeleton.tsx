import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AttractionCardSkeleton = () => (
  <Card className="overflow-hidden h-full">
    <div className="h-48 overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
    <CardContent className="p-6">
      <div className="mb-2">
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <Skeleton className="h-4 w-20 mt-4" />
    </CardContent>
  </Card>
);

export default AttractionCardSkeleton;
