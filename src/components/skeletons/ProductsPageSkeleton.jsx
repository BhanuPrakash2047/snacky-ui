import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const ProductsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <SkeletonLoader width="200px" height="36px" borderRadius="0.5rem" />
          <SkeletonLoader width="300px" height="20px" borderRadius="0.375rem" className="mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Filters Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 space-y-6">
              {/* Filter Title */}
              <SkeletonLoader width="80px" height="24px" borderRadius="0.375rem" />

              {/* Filter Groups */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <SkeletonLoader width="100%" height="20px" borderRadius="0.375rem" />
                  {[...Array(3)].map((_, j) => (
                    <SkeletonLoader key={j} width="100%" height="18px" borderRadius="0.375rem" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="lg:col-span-4">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6 gap-4">
              <SkeletonLoader width="150px" height="36px" borderRadius="0.375rem" />
              <SkeletonLoader width="120px" height="36px" borderRadius="0.375rem" />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 space-y-4 hover:shadow-md transition-shadow">
                  <SkeletonLoader width="100%" height="280px" borderRadius="0.5rem" />
                  <SkeletonLoader width="100%" height="20px" borderRadius="0.375rem" />
                  <SkeletonLoader width="80%" height="18px" borderRadius="0.375rem" />
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, j) => (
                      <SkeletonLoader key={j} width="16px" height="16px" borderRadius="50%" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <SkeletonLoader width="70px" height="24px" borderRadius="0.375rem" />
                    <SkeletonLoader width="100px" height="36px" borderRadius="0.375rem" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(5)].map((_, i) => (
                <SkeletonLoader key={i} width="36px" height="36px" borderRadius="0.375rem" />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPageSkeleton;
