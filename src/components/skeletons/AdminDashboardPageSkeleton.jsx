import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const AdminDashboardPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 lg:pt-28">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <SkeletonLoader width="200px" height="32px" borderRadius="0.5rem" />
            <SkeletonLoader width="300px" height="16px" borderRadius="0.375rem" />
          </div>
          <SkeletonLoader width="120px" height="40px" borderRadius="0.5rem" />
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <SkeletonLoader width="48px" height="48px" borderRadius="0.75rem" />
                <SkeletonLoader width="60px" height="24px" borderRadius="1rem" />
              </div>
              <div className="space-y-2">
                <SkeletonLoader width="80px" height="14px" borderRadius="0.375rem" />
                <SkeletonLoader width="120px" height="28px" borderRadius="0.375rem" />
              </div>
            </div>
          ))}
        </div>

        {/* Time-based Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <SkeletonLoader width="40px" height="40px" borderRadius="0.5rem" />
                <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
              </div>
              <SkeletonLoader width="80px" height="24px" borderRadius="0.375rem" />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders by Status - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <SkeletonLoader width="40px" height="40px" borderRadius="0.5rem" />
                <SkeletonLoader width="140px" height="20px" borderRadius="0.375rem" />
              </div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <SkeletonLoader width="16px" height="16px" borderRadius="50%" />
                      <SkeletonLoader width="100px" height="14px" borderRadius="0.375rem" />
                    </div>
                    <SkeletonLoader width="40px" height="24px" borderRadius="1rem" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders List - Right Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <SkeletonLoader width="100%" height="40px" borderRadius="0.5rem" className="flex-1" />
                <SkeletonLoader width="150px" height="40px" borderRadius="0.5rem" />
                <SkeletonLoader width="150px" height="40px" borderRadius="0.5rem" />
              </div>

              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-6 gap-4 px-4 py-3 bg-slate-50 rounded-lg mb-4">
                <SkeletonLoader width="80px" height="14px" borderRadius="0.375rem" />
                <SkeletonLoader width="100px" height="14px" borderRadius="0.375rem" />
                <SkeletonLoader width="80px" height="14px" borderRadius="0.375rem" />
                <SkeletonLoader width="60px" height="14px" borderRadius="0.375rem" />
                <SkeletonLoader width="80px" height="14px" borderRadius="0.375rem" />
                <SkeletonLoader width="80px" height="14px" borderRadius="0.375rem" />
              </div>

              {/* Order Rows */}
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors">
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center">
                      {/* Order Number */}
                      <div className="space-y-1">
                        <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
                        <SkeletonLoader width="80px" height="12px" borderRadius="0.375rem" />
                      </div>
                      {/* Customer */}
                      <div className="space-y-1">
                        <SkeletonLoader width="90px" height="14px" borderRadius="0.375rem" />
                        <SkeletonLoader width="70px" height="12px" borderRadius="0.375rem" />
                      </div>
                      {/* Status */}
                      <SkeletonLoader width="80px" height="24px" borderRadius="1rem" />
                      {/* Amount */}
                      <SkeletonLoader width="70px" height="16px" borderRadius="0.375rem" />
                      {/* Date */}
                      <SkeletonLoader width="90px" height="14px" borderRadius="0.375rem" />
                      {/* Actions */}
                      <div className="flex gap-2">
                        <SkeletonLoader width="32px" height="32px" borderRadius="0.375rem" />
                        <SkeletonLoader width="32px" height="32px" borderRadius="0.375rem" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                <SkeletonLoader width="150px" height="14px" borderRadius="0.375rem" />
                <div className="flex gap-2">
                  <SkeletonLoader width="80px" height="36px" borderRadius="0.375rem" />
                  <SkeletonLoader width="80px" height="36px" borderRadius="0.375rem" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
