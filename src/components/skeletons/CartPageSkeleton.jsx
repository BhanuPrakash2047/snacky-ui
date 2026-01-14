import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const CartPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <SkeletonLoader width="200px" height="36px" borderRadius="0.5rem" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {/* Product Image */}
                  <div className="sm:col-span-1">
                    <SkeletonLoader width="100%" height="120px" borderRadius="0.5rem" />
                  </div>

                  {/* Product Details */}
                  <div className="sm:col-span-2 space-y-3">
                    <SkeletonLoader width="80%" height="20px" borderRadius="0.375rem" />
                    <SkeletonLoader width="60%" height="18px" borderRadius="0.375rem" />
                    <SkeletonLoader width="100px" height="24px" borderRadius="0.375rem" />
                  </div>

                  {/* Quantity and Actions */}
                  <div className="sm:col-span-1 space-y-3">
                    <SkeletonLoader width="100%" height="32px" borderRadius="0.375rem" />
                    <SkeletonLoader width="100%" height="36px" borderRadius="0.375rem" />
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <SkeletonLoader width="150px" height="24px" borderRadius="0.375rem" />
              <div className="flex gap-2">
                <SkeletonLoader width="100%" height="44px" borderRadius="0.375rem" />
                <SkeletonLoader width="100px" height="44px" borderRadius="0.375rem" />
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-lg p-6 h-fit sticky top-4 space-y-4">
            <SkeletonLoader width="120px" height="28px" borderRadius="0.5rem" />

            {/* Summary Items */}
            <div className="space-y-3 border-b pb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <SkeletonLoader width="60px" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="50px" height="16px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between py-4 border-b">
              <SkeletonLoader width="60px" height="20px" borderRadius="0.375rem" />
              <SkeletonLoader width="80px" height="24px" borderRadius="0.375rem" />
            </div>

            {/* Checkout Button */}
            <SkeletonLoader width="100%" height="44px" borderRadius="0.375rem" />
            <SkeletonLoader width="100%" height="44px" borderRadius="0.375rem" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPageSkeleton;
