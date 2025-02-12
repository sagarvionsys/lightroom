export const ProductCardSkeleton = () => {
  return (
    <div className="w-full md:w-72 bg-gray-900 text-white shadow-xl rounded-2xl overflow-hidden animate-pulse">
      <figure className="relative">
        <div className="relative w-full bg-gray-700" style={{ aspectRatio: 1 }}>
          <div className="absolute inset-0 bg-gray-700 rounded-2xl" />
        </div>
      </figure>
      <div className="p-5 flex flex-col gap-3">
        <div className="h-6 w-4/5 bg-gray-700 rounded"></div>
        <div className="h-4 w-3/5 bg-gray-700 rounded"></div>
        <div className="flex justify-between items-center mt-1">
          <div className="h-5 w-20 bg-gray-700 rounded"></div>
          <div className="h-4 w-14 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-200 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div className="space-y-4">
          <div
            className="relative w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            style={{ aspectRatio: "1 / 1" }}
          >
            <div className="absolute inset-0 bg-gray-700 rounded-lg" />
          </div>
          <div className="h-4 w-32 mx-auto bg-gray-700 rounded"></div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <div className="h-10 w-3/4 bg-gray-700 rounded"></div>
          {/* Description */}
          <div className="h-6 w-full bg-gray-700 rounded"></div>
          <div className="h-6 w-5/6 bg-gray-700 rounded"></div>

          {/* Variants Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-48 bg-gray-700 rounded"></div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="card bg-neutral-800 border border-gray-700 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="h-5 w-40 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-6 w-12 bg-gray-700 rounded"></div>
                  <div className="h-10 w-24 bg-gray-700 rounded"></div>
                  <div className="h-10 w-10 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CartCardSkeleton = () => {
  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6 animate-pulse">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        {/* Image Skeleton */}
        <div
          className="relative rounded-lg overflow-hidden bg-gray-700"
          style={{ width: "120px", aspectRatio: "1 / 1" }}
        >
          <div className="absolute inset-0 bg-gray-600 rounded-lg" />
        </div>

        {/* Product Details Skeleton */}
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <div>
            <div className="h-6 w-3/4 bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded mt-2"></div>
          </div>
          <div className="h-10 w-24 bg-gray-700 rounded"></div>

          <div className="flex items-center gap-4">
            <div className="h-6 w-32 bg-gray-700 rounded"></div>
            <div className="h-6 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MyOrderCardSkeleton = () => {
  return (
    <div className=" text-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg animate-pulse">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col w-32 h-6 bg-gray-700 rounded"></div>
              <div className="flex flex-col w-32 h-6 bg-gray-700 rounded"></div>
              <div className="flex flex-col w-32 h-6 bg-gray-700 rounded"></div>
              <div className="flex flex-col w-32 h-6 bg-gray-700 rounded"></div>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6 mt-6">
              <div className="w-32 h-32 bg-gray-700 rounded-lg"></div>
              <div className="flex-grow flex flex-col gap-3">
                <div className="w-56 h-6 bg-gray-700 rounded"></div>
                <div className="w-32 h-6 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserCardSkeleton = () => {};
