import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoading = () => {
  return (
    <div className="px-5 min-h-[90vh] max-w-4xl mx-auto space-y-4 py-7 mt-1">
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-[80%]" />
      </div>
      <div className="py-3 mt-16 flex flex-wrap flex-row gap-7">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-24 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-lg" />
      </div>
      <Skeleton className="h-[640px] w-full rounded-xl" />
      <div className=" space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-7 w-full rounded-lg" />
          <Skeleton className="h-7 w-[90%] rounded-lg" />
          <Skeleton className="h-7 w-[85%] rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-7 w-full rounded-lg" />
          <Skeleton className="h-7 w-[90%] rounded-lg" />
          <Skeleton className="h-7 w-[95%] rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
