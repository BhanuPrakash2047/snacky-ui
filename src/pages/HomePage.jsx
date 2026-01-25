/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { ProductCard } from '@/components/features';
import { Button } from '@/components/common';
import { fetchAllProducts, fetchProductImages } from '@/store/thunks/productThunks';
import { ToastContainer } from '@/components/common/Toast';
import { ProductLoadingSkeleton } from '@/components/skeletons';
import { Flame, TrendingUp, Gift, Zap, Star, ArrowRight, ChevronRight, Sparkles, Truck, Shield, Award, Clock, Heart, Package, Check } from 'lucide-react';

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading, productImages } = useSelector(state => state.products);
  const [displayCount, setDisplayCount] = useState(8);
  const [scrollY, setScrollY] = useState(0);

  // Fetch all products
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch images for all products after they load
  useEffect(() => {
    if (products && products.length > 0) {
      products.forEach(product => {
        if (!productImages[product.id]) {
          dispatch(fetchProductImages(product.id))
            .catch(err => {
              console.error(`Failed to fetch images for product ${product.id}`, err);
            });
        }
      });
    }
  }, [products, dispatch, productImages]);

  // Merge products with their stored images from Redux
  const displayProducts = products.map(product => {
    const imageUrl = productImages[product.id] && productImages[product.id].length > 0 
      ? productImages[product.id][0] 
      : product.image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(product.name || 'Product');
    
    return {
      ...product,
      image: imageUrl
    };
  });

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.4), 0 0 60px rgba(249, 115, 22, 0.2); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6), 0 0 80px rgba(249, 115, 22, 0.3); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { opacity: 1; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes count-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in-up { animation: slide-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-gradient-shift { animation: gradient-shift 4s ease infinite; background-size: 200% 200%; }
        .animate-scale-pulse { animation: scale-pulse 2s ease-in-out infinite; }
        .animate-count-up { animation: count-up 0.5s ease-out forwards; }
        
        /* Smooth scroll behavior */
        html { scroll-behavior: smooth; }
        
        /* Custom gradient backgrounds */
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      <ToastContainer />
      <Header />

      {/* ULTRA PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-white pt-8 pb-12 md:pt-24 md:pb-32">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-200/40 to-red-200/40 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)` }}
          ></div>
          <div 
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 rounded-full blur-3xl"
            style={{ transform: `translate(${-scrollY * 0.2}px, ${-scrollY * 0.3}px)` }}
          ></div>
          <div className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-slate-200/50 to-transparent"></div>
          <div className="absolute top-0 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Hero Content - Mobile: Second, Desktop: First */}
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-200/50 rounded-full backdrop-blur-sm animate-slide-in-left">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Premium Snacks Delivered Fresh</span>
              </div>

              {/* Main Headline with Gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <span className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 bg-clip-text text-transparent">
                  Cravings Meet
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent animate-gradient-shift">
                  Perfection
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                Artisan snacks crafted with premium ingredients. <span className="font-semibold text-slate-900">Fresh, authentic, and delivered to your door.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-in-left justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
                <button
                  onClick={() => navigate('/products')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-glow-pulse"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-2 justify-center">
                    Shop Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button
                  onClick={() => navigate('/products?sort=rating')}
                  className="group px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Star className="w-5 h-5" />
                    Top Rated
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 md:gap-6 pt-4 animate-slide-in-left justify-center lg:justify-start" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">100% Fresh</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Hero Image - Mobile: First, Desktop: Second */}
            <div className="relative order-1 lg:order-2 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-square md:aspect-auto md:h-[500px] lg:h-[600px]">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-200/30 via-red-200/30 to-orange-200/30 rounded-3xl blur-2xl animate-scale-pulse"></div>
                
                {/* Main image container */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border border-white/50 group bg-gradient-to-br from-orange-50 to-red-50">
                  <img
                    src="/hero.png"
                    alt="Premium Artisan Snacks"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-orange-100 animate-float">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-slate-900">4.9/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <span className="text-xs font-medium">Scroll to explore</span>
            <ChevronRight className="w-4 h-4 rotate-90 animate-bounce" />
          </div>
        </div>
      </section>

      {/* URGENCY BANNER */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 md:gap-6 text-white text-center flex-wrap">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="text-sm md:text-base font-bold">Limited Time: Free Delivery on Orders ₹500+</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Same Day Delivery Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Curated Selection</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Premium Snack Collection
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hand-picked artisan snacks made with authentic recipes and premium ingredients
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <ProductLoadingSkeleton />
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {displayProducts.length > 0 ? (
                  displayProducts.map((product, idx) => (
                    <div 
                      key={product.id} 
                      className="group relative animate-bounce-in hover:-translate-y-2 transition-all duration-300"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {idx < 4 && (
                        <div className="absolute -top-3 -right-3 z-10">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-md animate-pulse"></div>
                            <div className="relative px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              HOT
                            </div>
                          </div>
                        </div>
                      )}
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className="inline-flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                        <Package className="w-10 h-10 text-orange-400" />
                      </div>
                      <p className="text-slate-600 text-lg font-medium">No products available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* View All CTA */}
              {displayProducts.length > 0 && (
                <div className="text-center pt-8">
                  <button
                    onClick={() => navigate('/products')}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SOCIAL PROOF - STATS SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 to-orange-50/30 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '50K+', label: 'Happy Customers', icon: Heart },
              { number: '100%', label: 'Authentic Products', icon: Shield },
              { number: '4.9/5', label: 'Average Rating', icon: Star },
              { number: '24/7', label: 'Customer Support', icon: Award },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 animate-count-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-orange-100 to-red-100">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - BENEFITS */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/20 to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 animate-slide-in-up">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Why Choose Snacky?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're committed to delivering the finest snacking experience
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: '100% Authentic',
                description: 'Every product is sourced directly and verified for authenticity',
                color: 'text-emerald-600',
                bgColor: 'from-emerald-50 to-emerald-100'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Handpicked ingredients and traditional recipes for the best taste',
                color: 'text-orange-600',
                bgColor: 'from-orange-50 to-red-100'
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Same-day delivery available with secure packaging',
                color: 'text-blue-600',
                bgColor: 'from-blue-50 to-blue-100'
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-orange-200 hover:shadow-xl transition-all duration-300 animate-slide-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${benefit.color}`} strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS - ELEGANT CAROUSEL */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <style>{`
          @keyframes scroll-reviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .reviews-track { animation: scroll-reviews 60s linear infinite; }
          .reviews-container:hover .reviews-track { animation-play-state: paused; }
        `}</style>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 px-4 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white uppercase tracking-wide">Customer Reviews</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Loved by Thousands
            </h2>
            
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join our community of happy customers who trust Snacky for their snacking needs
            </p>
          </div>

          {/* Reviews Carousel */}
          <div className="reviews-container overflow-hidden">
            <div className="reviews-track flex gap-6 pb-4">
              {[
                { name: "Amit S.", rating: 5, review: "Authentic homemade taste. Fresh, crunchy, and perfectly sweet.", verified: true },
                { name: "Sneha R.", rating: 5, review: "Feels hand-made with love. Goes great with chai!", verified: true },
                { name: "Rahul K.", rating: 5, review: "Premium quality, not oily, and very well packed.", verified: true },
                { name: "Priya M.", rating: 5, review: "Traditional thekua done right. Will reorder for sure.", verified: true },
                { name: "Vikram P.", rating: 5, review: "Best snacks I've had in years. Definitely worth it!", verified: true },
                { name: "Anjali N.", rating: 5, review: "Fresh as if just made. Amazing packaging too!", verified: true },
                { name: "Deepak M.", rating: 5, review: "Tastes like my grandmother made it. Divine!", verified: true },
                { name: "Pooja S.", rating: 5, review: "Fast delivery and excellent quality. Recommended!", verified: true },
                // Duplicate for seamless loop
                { name: "Amit S.", rating: 5, review: "Authentic homemade taste. Fresh, crunchy, and perfectly sweet.", verified: true },
                { name: "Sneha R.", rating: 5, review: "Feels hand-made with love. Goes great with chai!", verified: true },
                { name: "Rahul K.", rating: 5, review: "Premium quality, not oily, and very well packed.", verified: true },
                { name: "Priya M.", rating: 5, review: "Traditional thekua done right. Will reorder for sure.", verified: true },
              ].map((review, idx) => (
                <div 
                  key={idx}
                  className="flex-shrink-0 w-80 md:w-96"
                >
                  <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array(review.rating).fill(null).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-white/90 text-base mb-5 leading-relaxed">
                      "{review.review}"
                    </p>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">{review.name}</p>
                        {review.verified && (
                          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Purchase
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="text-center mt-8 px-4">
            <p className="text-sm text-slate-400 font-medium">Hover to pause • Swipe to explore more reviews</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-200/40 to-red-200/40 rounded-full blur-3xl animate-scale-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-in-up">
          {/* Special Offer Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full mb-6 shadow-lg">
            <Gift className="w-4 h-4" />
            <span className="text-sm font-bold">Special Offer: Free Delivery on Orders ₹500+</span>
          </div> */}

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900 bg-clip-text text-transparent">
              Ready to Elevate Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent animate-gradient-shift">
              Snacking Experience?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of satisfied customers. Order now and taste the difference that quality makes.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/products')}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-bold text-lg rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow-pulse"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2 justify-center">
                Start Shopping Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <div className="flex items-center gap-2 text-slate-600">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">100% Secure Checkout</span>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-slate-600">Money-back Guarantee</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">Free Returns</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-slate-600">Made with Love</span>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 p-4 shadow-2xl z-50 animate-slide-in-up">
        <button
          onClick={() => navigate('/products')}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" />
          Shop Premium Snacks
        </button>
      </div>

      {/* Add padding to account for mobile sticky button */}
      <div className="h-24 md:h-0"></div>

      <Footer />
    </div>
  );
};

export default HomePage