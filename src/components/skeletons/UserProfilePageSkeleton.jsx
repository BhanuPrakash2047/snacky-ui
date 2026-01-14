import React from 'react';
import { Header, Footer } from '@/components/layout';
import { SkeletonLoader } from './SkeletonLoader';

export const UserProfilePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-emerald-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <SkeletonLoader width="200px" height="36px" borderRadius="0.5rem" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 space-y-2 sticky top-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonLoader key={i} width="100%" height="40px" borderRadius="0.375rem" />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Info Section */}
            <div className="bg-white rounded-lg p-8">
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                {/* Avatar */}
                <SkeletonLoader width="120px" height="120px" borderRadius="50%" />
                
                {/* Profile Info */}
                <div className="flex-1 space-y-4 w-full">
                  <SkeletonLoader width="200px" height="28px" borderRadius="0.5rem" />
                  <SkeletonLoader width="250px" height="18px" borderRadius="0.375rem" />
                  <SkeletonLoader width="80px" height="36px" borderRadius="0.375rem" />
                </div>
              </div>

              {/* Divider */}
              <div className="border-b my-8" />

              {/* Profile Form */}
              <div className="space-y-6">
                <SkeletonLoader width="160px" height="24px" borderRadius="0.5rem" />
                
                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" />
                      <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <div className="flex gap-2 pt-4">
                  <SkeletonLoader width="120px" height="44px" borderRadius="0.375rem" />
                  <SkeletonLoader width="120px" height="44px" borderRadius="0.375rem" />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-lg p-8">
              <SkeletonLoader width="200px" height="24px" borderRadius="0.5rem" className="mb-6" />

              {/* Current Password */}
              <div className="space-y-6 mb-6">
                <div className="space-y-2">
                  <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <SkeletonLoader width="100px" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <SkeletonLoader width="130px" height="16px" borderRadius="0.375rem" />
                  <SkeletonLoader width="100%" height="40px" borderRadius="0.375rem" />
                </div>
              </div>

              {/* Change Password Button */}
              <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
            </div>

            {/* Preferences Section */}
            <div className="bg-white rounded-lg p-8">
              <SkeletonLoader width="160px" height="24px" borderRadius="0.5rem" className="mb-6" />

              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-2">
                      <SkeletonLoader width="150px" height="16px" borderRadius="0.375rem" />
                      <SkeletonLoader width="100%" height="14px" borderRadius="0.375rem" />
                    </div>
                    <SkeletonLoader width="50px" height="24px" borderRadius="1rem" />
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-lg p-8 border border-red-200">
              <SkeletonLoader width="160px" height="24px" borderRadius="0.5rem" className="mb-4" />
              <SkeletonLoader width="100%" height="16px" borderRadius="0.375rem" className="mb-6" />
              <SkeletonLoader width="150px" height="44px" borderRadius="0.375rem" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfilePageSkeleton;
