import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Badge, Button, Skeleton } from '../common';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { showToast } from '../common/Toast';
import { addToCart } from '@/store/thunks/cartThunks';

/**
 * ProductCard Component - Premium Edition
 * Displays individual product with stunning animations and beautiful styling
 */
export const ProductCard = ({
  product,
  categoryGradient = 'from-brand-500 to-accent-600',
  loading = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (loading) {
    return (
      <Card padding="p-0 overflow-hidden" className="h-80">
        <Skeleton height="h-40" width="w-full" />
        <div className="p-4 space-y-2">
          <Skeleton height="h-4" width="w-3/4" />
          <Skeleton height="h-3" width="w-full" />
          <Skeleton height="h-3" width="w-1/2" />
          <Skeleton height="h-8" width="w-full" />
        </div>
      </Card>
    );
  }

  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!user) {
      showToast('Please login to add items to cart', 'info');
      navigate('/login');
      return;
    }
    
    setIsAddingToCart(true);
    try {
      await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
      showToast(`${product.name} added to cart!`, 'success');
    } catch (error) {
      showToast(error || 'Failed to add to cart', 'error');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="group relative overflow-hidden h-full flex flex-col transition-all duration-500 ease-out hover:shadow-2xl hover:border-brand-400 transform hover:-translate-y-2 will-change-transform"
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Glow Background - Premium Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 -z-10`} />

      {/* Image Container - Full Width, No Padding */}
      <div className="relative h-32 md:h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 -m-0">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
          <div className="absolute w-40 h-40 bg-brand-500 rounded-full -top-20 -right-20 blur-3xl" />
          <div className="absolute w-40 h-40 bg-accent-500 rounded-full -bottom-20 -left-20 blur-3xl" />
        </div>

        {/* Product Image with Zoom Effect */}
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=Product'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-[600ms] ease-out will-change-transform ${
            isHovered ? 'scale-[1.15]' : 'scale-100'
          }`}
        />

        {/* Floating Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${categoryGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out pointer-events-none`} />

        {/* Premium Badges with Animation */}
        <div className="absolute top-2 left-2 z-10">
          {product.price < product.originalPrice && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-md whitespace-nowrap">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Premium Quick View Overlay - Desktop Only */}
        <Link
          to={`/products/${product.id}`}
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent hidden md:flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 z-20 p-4`}
        >
          <div className="transform transition-transform duration-400 ease-out translate-y-8 group-hover:translate-y-0">
            <Button 
              variant="cta" 
              size="sm"
              className="!bg-white !text-slate-900 font-bold hover:!bg-orange-100 shadow-lg"
            >
              View Details
            </Button>
          </div>
        </Link>
      </div>

      {/* Content Section - Clean & Professional */}
      <div className="flex-1 flex flex-col p-3 md:p-4 gap-3 md:gap-4 bg-white">
        {/* Category Label - Minimal */}
        {product.category && (
          <div className="inline-flex items-center w-fit">
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-tight bg-orange-50 px-2 py-1 rounded">
              {product.category}
            </p>
          </div>
        )}

        {/* Product Name - Clear Hierarchy */}
        <h3 className="text-sm md:text-base font-bold transition-all duration-300 line-clamp-2 text-slate-900 group-hover:text-orange-600">
          {product.name}
        </h3>

        {/* Rating Section - Aligned */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
            </div>
            <span className="text-xs text-slate-600 font-medium">
              {product.rating.toFixed(1)} <span className="text-gray-400">({product.reviewCount || 0})</span>
            </span>
          </div>
        )}

        {/* Price Section - Clean Layout */}
        <div className="flex items-baseline gap-2 py-2">
          <span className="text-xl md:text-2xl font-black text-orange-600">
            ₹{product.price?.toFixed(0) || '0'}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xs text-slate-500 line-through">
                ₹{product.originalPrice?.toFixed(0)}
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>

        {/* CTA Button - Full Width, No Padding */}
        <Button
          variant="cta"
          size="sm"
          fullWidth
          loading={isAddingToCart}
          disabled={!product.isAvailable}
          onClick={handleAddToCart}
          icon={FiShoppingCart}
          className={`mt-auto -m-3 md:m-0 rounded-none md:rounded transition-all duration-300 ${
            product.isAvailable
              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
