import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const OrderHistoryPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <SkeletonLoader width="250px" height="36px" borderRadius="0.5rem" className="mb-8" />

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SkeletonLoader width="100%" height="44px" borderRadius="0.375rem" />
          <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 border-b pb-4">
                <div className="flex-1">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <SkeletonLoader width="200px" height="20px" borderRadius="0.375rem" />
                      <SkeletonLoader width="150px" height="16px" borderRadius="0.375rem" />
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <SkeletonLoader width="100px" height="24px" borderRadius="1rem" />
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-b">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex gap-3">
                    <SkeletonLoader width="80px" height="80px" borderRadius="0.375rem" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                      <SkeletonLoader width="80%" height="14px" borderRadius="0.375rem" />
                      <SkeletonLoader width="60px" height="14px" borderRadius="0.375rem" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
                <div className="space-y-2">
                  <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="120px" height="20px" borderRadius="0.375rem" />
                </div>
                <div className="flex gap-2">
                  <SkeletonLoader width="120px" height="40px" borderRadius="0.375rem" />
                  <SkeletonLoader width="120px" height="40px" borderRadius="0.375rem" />
                </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistoryPageSkeleton;
