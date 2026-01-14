import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section Skeleton */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Hero Text */}
            <div className="space-y-6">
              <SkeletonLoader width="80%" height="40px" borderRadius="0.5rem" />
              <SkeletonLoader width="90%" height="24px" borderRadius="0.375rem" />
              <SkeletonLoader width="85%" height="24px" borderRadius="0.375rem" />
              <div className="flex gap-4 pt-4">
                <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
                <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
              </div>
            </div>
            
            {/* Hero Image */}
            <SkeletonLoader width="100%" height="400px" borderRadius="1rem" />
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-16">
          <SkeletonLoader width="300px" height="32px" borderRadius="0.5rem" className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 space-y-4">
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

        {/* Benefits Section Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="flex justify-center">
                <SkeletonLoader width="60px" height="60px" borderRadius="50%" />
              </div>
              <SkeletonLoader width="70%" height="24px" borderRadius="0.375rem" className="mx-auto" />
              <SkeletonLoader width="90%" height="16px" borderRadius="0.375rem" className="mx-auto" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePageSkeleton;
