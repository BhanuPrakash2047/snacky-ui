import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const CheckoutPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <SkeletonLoader width="40px" height="40px" borderRadius="50%" className="mb-2" />
                <SkeletonLoader width="80px" height="16px" borderRadius="0.375rem" />
              </div>
              {i < 3 && <SkeletonLoader width="40px" height="2px" borderRadius="0.25rem" className="flex-1 mx-4 mt-4" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address Section */}
            <div className="bg-white rounded-lg p-6">
              <SkeletonLoader width="180px" height="28px" borderRadius="0.5rem" className="mb-6" />

              {/* Address Cards */}
              <div className="space-y-3 mb-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-2">
                    <SkeletonLoader width="100px" height="18px" borderRadius="0.375rem" />
                    <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                    <SkeletonLoader width="80%" height="16px" borderRadius="0.375rem" />
                    <div className="flex gap-2 pt-2">
                      <SkeletonLoader width="60px" height="32px" borderRadius="0.375rem" />
                      <SkeletonLoader width="60px" height="32px" borderRadius="0.375rem" />
                    </div>
                  </div>
                ))}
              </div>

              <SkeletonLoader width="140px" height="40px" borderRadius="0.375rem" />
            </div>

            {/* Add Address Form */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <SkeletonLoader width="180px" height="28px" borderRadius="0.5rem" className="mb-4" />
              
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                    <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
                  </div>
                ))}
              </div>

              <SkeletonLoader width="140px" height="44px" borderRadius="0.375rem" className="mt-4" />
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-lg p-6">
              <SkeletonLoader width="160px" height="28px" borderRadius="0.5rem" className="mb-6" />
              
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 mb-3 flex items-center gap-3">
                  <SkeletonLoader width="20px" height="20px" borderRadius="50%" />
                  <SkeletonLoader width="150px" height="18px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 h-fit sticky top-4 space-y-4">
            <SkeletonLoader width="140px" height="28px" borderRadius="0.5rem" />

            {/* Items */}
            <div className="space-y-3 max-h-48 overflow-y-auto border-b pb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-2">
                  <SkeletonLoader width="60px" height="60px" borderRadius="0.375rem" />
                  <div className="flex-1 space-y-1">
                    <SkeletonLoader width="100%" height="14px" borderRadius="0.375rem" />
                    <SkeletonLoader width="60%" height="12px" borderRadius="0.375rem" />
                    <SkeletonLoader width="50px" height="14px" borderRadius="0.375rem" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Summary */}
            <div className="space-y-2 border-b pb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <SkeletonLoader width="70px" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="60px" height="16px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between py-4">
              <SkeletonLoader width="60px" height="20px" borderRadius="0.375rem" />
              <SkeletonLoader width="80px" height="24px" borderRadius="0.375rem" />
            </div>

            {/* Place Order Button */}
            <SkeletonLoader width="100%" height="44px" borderRadius="0.375rem" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPageSkeleton;
