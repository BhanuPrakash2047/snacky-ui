import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const OrderDetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <SkeletonLoader width="200px" height="36px" borderRadius="0.5rem" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Status Card */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <SkeletonLoader width="140px" height="24px" borderRadius="0.5rem" />
              
              {/* Status Badge and Timeline */}
              <div className="flex items-center justify-between">
                <SkeletonLoader width="100px" height="24px" borderRadius="1rem" />
                <SkeletonLoader width="80px" height="20px" borderRadius="0.375rem" />
              </div>

              {/* Timeline */}
              <div className="flex gap-4 my-6">
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                      <SkeletonLoader width="32px" height="32px" borderRadius="50%" className="mb-2" />
                      <SkeletonLoader width="60px" height="12px" borderRadius="0.375rem" />
                    </div>
                    {i < 3 && <SkeletonLoader width="20px" height="1px" borderRadius="0.25rem" className="mt-4" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Items in Order */}
            <div className="bg-white rounded-lg p-6">
              <SkeletonLoader width="150px" height="24px" borderRadius="0.5rem" className="mb-6" />
              
              <div className="space-y-4 border-b pb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <SkeletonLoader width="100px" height="100px" borderRadius="0.5rem" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLoader width="100%" height="18px" borderRadius="0.375rem" />
                      <SkeletonLoader width="80%" height="16px" borderRadius="0.375rem" />
                      <div className="flex justify-between pt-2">
                        <SkeletonLoader width="50px" height="16px" borderRadius="0.375rem" />
                        <SkeletonLoader width="70px" height="18px" borderRadius="0.375rem" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
                    <SkeletonLoader width="80px" height="16px" borderRadius="0.375rem" />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Billing Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                  <SkeletonLoader width="140px" height="20px" borderRadius="0.5rem" />
                  <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="80%" height="16px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Info Summary */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <SkeletonLoader width="120px" height="24px" borderRadius="0.5rem" />
              
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2 pb-3 border-b last:border-b-0">
                  <SkeletonLoader width="100px" height="14px" borderRadius="0.375rem" />
                  <SkeletonLoader width="100%" height="18px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg p-6 space-y-3">
              <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
              <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
              <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
            </div>

            {/* Help Card */}
            <div className="bg-orange-50 rounded-lg p-6 space-y-3 border border-orange-200">
              <SkeletonLoader width="120px" height="20px" borderRadius="0.5rem" />
              <SkeletonLoader width="100%" height="14px" borderRadius="0.375rem" />
              <SkeletonLoader width="100%" height="14px" borderRadius="0.375rem" />
              <SkeletonLoader width="80px" height="36px" borderRadius="0.375rem" className="mt-3" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetailPageSkeleton;
