import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const OrderTrackingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <SkeletonLoader width="250px" height="36px" borderRadius="0.5rem" className="mb-4" />
        <SkeletonLoader width="200px" height="20px" borderRadius="0.375rem" className="mb-8" />

        {/* Order Info Card */}
        <div className="bg-white rounded-lg p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
                <SkeletonLoader width="100%" height="20px" borderRadius="0.375rem" />
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <SkeletonLoader width="140px" height="24px" borderRadius="0.5rem" className="mb-8" />
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Timeline Steps */}
            <div className="space-y-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="relative pl-20">
                  {/* Timeline Dot */}
                  <SkeletonLoader width="24px" height="24px" borderRadius="50%" className="absolute left-0 top-0" />
                  
                  {/* Timeline Content */}
                  <div className="space-y-2">
                    <SkeletonLoader width="150px" height="18px" borderRadius="0.375rem" />
                    <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                    <SkeletonLoader width="80%" height="14px" borderRadius="0.375rem" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <SkeletonLoader width="140px" height="24px" borderRadius="0.5rem" className="mb-4" />
          <SkeletonLoader width="100%" height="300px" borderRadius="0.75rem" />
        </div>

        {/* Items in Order */}
        <div className="bg-white rounded-lg p-6">
          <SkeletonLoader width="160px" height="24px" borderRadius="0.5rem" className="mb-6" />
          
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border rounded-lg">
                <SkeletonLoader width="100px" height="100px" borderRadius="0.5rem" />
                <div className="flex-1 space-y-2">
                  <SkeletonLoader width="100%" height="18px" borderRadius="0.375rem" />
                  <SkeletonLoader width="80%" height="16px" borderRadius="0.375rem" />
                  <div className="flex justify-between pt-2">
                    <SkeletonLoader width="60px" height="16px" borderRadius="0.375rem" />
                    <SkeletonLoader width="70px" height="18px" borderRadius="0.375rem" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
          <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTrackingPageSkeleton;
