import { Skeleton } from "@/components/ui/skeleton";

const UsersSkeleton = () => {
  return (
    <div className="p-6">
      {/* Page Heading Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Filters and Export Button Skeleton */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        <div className="flex flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-16" />
            <div className="flex gap-2 bg-white p-1 rounded-md shadow">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table Header */}
        <div className="border-b bg-gray-50">
          <div className="grid grid-cols-7 gap-4 p-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        {/* Table Rows */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="border-b last:border-b-0">
            <div className="grid grid-cols-7 gap-4 p-4 items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-5 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default UsersSkeleton;