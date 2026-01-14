import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';

export const ProductLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <SkeletonLoader width="300px" height="32px" borderRadius="0.5rem" />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 space-y-4 hover:shadow-md transition-shadow">
            <SkeletonLoader width="100%" height="240px" borderRadius="0.5rem" />
            <SkeletonLoader width="100%" height="20px" borderRadius="0.375rem" />
            <SkeletonLoader width="80%" height="20px" borderRadius="0.375rem" />
            <div className="flex justify-between pt-2">
              <SkeletonLoader width="60px" height="24px" borderRadius="0.375rem" />
              <SkeletonLoader width="80px" height="36px" borderRadius="0.375rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
