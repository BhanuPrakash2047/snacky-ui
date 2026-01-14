import React from 'react';

// Base skeleton component with shimmer animation
export const SkeletonLoader = ({ className = '', width = '100%', height = '20px', borderRadius = '0.375rem' }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius,
        backgroundImage: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 4.5s infinite',
      }}
    />
  );
};

// CSS for shimmer animation
const shimmerCSS = `
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerCSS;
  document.head.appendChild(style);
}

export default SkeletonLoader;
