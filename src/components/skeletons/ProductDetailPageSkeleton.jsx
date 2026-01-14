import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const ProductDetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex gap-2 mb-8">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              {i > 0 && <SkeletonLoader width="20px" height="20px" borderRadius="0.375rem" />}
              <SkeletonLoader width="80px" height="20px" borderRadius="0.375rem" />
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <SkeletonLoader width="100%" height="400px" borderRadius="0.75rem" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <SkeletonLoader key={i} width="100%" height="80px" borderRadius="0.5rem" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title */}
            <SkeletonLoader width="90%" height="32px" borderRadius="0.5rem" />

            {/* Rating */}
            <div className="flex gap-2 items-center">
              {[...Array(5)].map((_, i) => (
                <SkeletonLoader key={i} width="20px" height="20px" borderRadius="50%" />
              ))}
              <SkeletonLoader width="60px" height="20px" borderRadius="0.375rem" />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <SkeletonLoader width="150px" height="28px" borderRadius="0.375rem" />
              <SkeletonLoader width="100px" height="20px" borderRadius="0.375rem" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
              <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
              <SkeletonLoader width="80%" height="16px" borderRadius="0.375rem" />
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 py-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonLoader width="70%" height="14px" borderRadius="0.375rem" />
                  <SkeletonLoader width="80%" height="18px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>

            {/* Quantity and Buttons */}
            <div className="flex gap-4">
              <SkeletonLoader width="120px" height="44px" borderRadius="0.375rem" />
              <SkeletonLoader width="200px" height="44px" borderRadius="0.375rem" />
              <SkeletonLoader width="50px" height="44px" borderRadius="0.375rem" />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SkeletonLoader width="120px" height="28px" borderRadius="0.5rem" className="mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 space-y-3">
                  <SkeletonLoader width="150px" height="18px" borderRadius="0.375rem" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <SkeletonLoader key={j} width="16px" height="16px" borderRadius="50%" />
                    ))}
                  </div>
                  <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="90%" height="16px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <SkeletonLoader width="140px" height="28px" borderRadius="0.5rem" className="mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-3 space-y-2">
                  <SkeletonLoader width="100%" height="120px" borderRadius="0.5rem" />
                  <SkeletonLoader width="80%" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="60px" height="18px" borderRadius="0.375rem" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPageSkeleton;
