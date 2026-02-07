/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home, Lock } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/common';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-red-50 via-white to-orange-50 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .animate-float { animation: float 3s cubic-bezier(0.4, 0.0, 0.2, 1) infinite; }
        .animate-shake { animation: shake 0.6s ease-in-out; }
        .animate-pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
      `}</style>

      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16 pt-24 lg:pt-32">
        <div className="max-w-lg w-full text-center">
          {/* Floating background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Icon with pulse effect */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-red-400/30 rounded-full animate-pulse-ring"></div>
            <div className="relative bg-linear-to-br from-red-500 to-orange-500 p-6 rounded-full shadow-xl animate-shake">
              <ShieldX className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Error code */}
          <div className="mb-4">
            <span className="inline-block bg-red-100 text-red-700 text-sm font-bold px-4 py-2 rounded-full">
              ERROR 403
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Access Forbidden
          </h1>

          {/* Description */}
          <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>

          {/* Lock icon decoration */}
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-8">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium">Admin Access Required</span>
            <Lock className="w-5 h-5" />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-300 hover:border-slate-400"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Additional help text */}
          <p className="mt-8 text-sm text-slate-500">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForbiddenPage;
