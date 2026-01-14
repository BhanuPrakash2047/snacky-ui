import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const NotificationsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <SkeletonLoader width="250px" height="36px" borderRadius="0.5rem" />
          <div className="flex gap-2 mt-4 sm:mt-0">
            <SkeletonLoader width="120px" height="40px" borderRadius="0.375rem" />
            <SkeletonLoader width="120px" height="40px" borderRadius="0.375rem" />
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SkeletonLoader width="100%" height="44px" borderRadius="0.375rem" />
          <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
        </div>

        {/* Notifications Tabs */}
        <div className="flex gap-2 mb-6 border-b overflow-x-auto pb-2">
          {[...Array(5)].map((_, i) => (
            <SkeletonLoader key={i} width="100px" height="40px" borderRadius="0.375rem" />
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border-l-4 border-orange-400 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Icon/Avatar */}
                <SkeletonLoader width="48px" height="48px" borderRadius="50%" />

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Title and Timestamp */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 space-y-1">
                      <SkeletonLoader width="80%" height="18px" borderRadius="0.375rem" />
                      <SkeletonLoader width="150px" height="14px" borderRadius="0.375rem" />
                    </div>
                    <SkeletonLoader width="60px" height="14px" borderRadius="0.375rem" />
                  </div>

                  {/* Message */}
                  <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="95%" height="16px" borderRadius="0.375rem" />

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <SkeletonLoader width="80px" height="32px" borderRadius="0.375rem" />
                    <SkeletonLoader width="80px" height="32px" borderRadius="0.375rem" />
                  </div>
                </div>

                {/* Unread Indicator */}
                <SkeletonLoader width="12px" height="12px" borderRadius="50%" />
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

        {/* Empty State (Optional) */}
        <div className="hidden text-center py-12">
          <SkeletonLoader width="200px" height="48px" borderRadius="0.75rem" className="mx-auto mb-4" />
          <SkeletonLoader width="250px" height="20px" borderRadius="0.375rem" className="mx-auto" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotificationsPageSkeleton;
