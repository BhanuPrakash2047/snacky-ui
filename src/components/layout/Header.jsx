import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Badge, Avatar, Drawer } from '../common';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiPackage, FiLogOut, FiSearch } from 'react-icons/fi';
import { Heart, Bell, Zap } from 'lucide-react';
import { getUnreadNotificationCount } from '../../store/thunks/notificationThunks';
import {  logoutUser } from '@/store/thunks/authThunks';
import { showToast } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
export const Header = () => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const { user, token } = useSelector(state => state.auth);
  const { items: cartItems } = useSelector(state => state.cart);
  const { unreadCount } = useSelector(state => state.notifications);
  const cartCount = cartItems.length;

  const isAuthenticated = !!token && !!user;

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUnreadNotificationCount());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logoutUser());
      showToast('Logged out successfully', 'success');
      navigate('/');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Products', href: '/products', icon: FiPackage },
  ];

  return (
    <>


      {/* MAIN HEADER */}
      <header className="bg-gradient-to-b from-white to-orange-50/40 border-b-2 border-orange-100 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20 gap-2 md:gap-4">
            
            {/* LOGO/BRAND - PREMIUM STYLE */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              <div className="relative">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                {/* Logo Container */}
                <div className="relative p-1.5 rounded-s-lg">
                  <img 
                    src="/Logo1.png" 
                    alt="Snacky Logo" 
                    className="w-8 h-8 md:w-12 md:h-12 rounded-xl object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-shrink-0">
                <span className="text-base md:text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">SNACKY</span>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest hidden md:inline">Crunch & Munch</span>
              </div>
            </Link>

            {/* SEARCH BAR - CENTER (Desktop Only) */}
            {/* <div className="hidden md:flex flex-1 mx-8 max-w-md">
              <div className={`w-full relative transition-all duration-300 ${searchFocus ? 'scale-105' : ''}`}>
                <FiSearch className={`absolute left-4 top-3.5 w-5 h-5 transition-colors ${searchFocus ? 'text-orange-600' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search snacks..."
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                  className={`w-full pl-12 pr-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
                    searchFocus
                      ? 'border-orange-500 bg-white shadow-lg'
                      : 'border-slate-200 bg-slate-50 hover:border-orange-300'
                  } focus:outline-none text-sm font-medium`}
                />
                {searchFocus && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl p-3 z-50">
                    <p className="text-xs text-slate-500 text-center">🔍 Search for your favorite snacks...</p>
                  </div>
                )}
              </div>
            </div> */}

            {/* RIGHT SIDE - ACTIONS */}
            <div className="flex items-center gap-1 md:gap-4">
              
              {/* NOTIFICATIONS */}
              <Link
                to="/notifications"
                className="flex items-center justify-center relative group transition-all duration-300 hover:scale-110"
              >
                <div className="relative p-1.5 md:p-2 rounded-lg hover:bg-orange-100 transition-colors">
                  <Bell className="w-5 md:w-6 h-5 md:h-6 text-slate-600 group-hover:text-orange-600 transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 -right-1.5 min-w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* CART ICON - Premium Style */}
              <Link
                to="/cart"
                className="relative group transition-all duration-300 hover:scale-110"
              >
                <div className="p-2 rounded-lg hover:bg-orange-100 transition-colors">
                  <div className="relative">
                    <FiShoppingCart className="w-6 h-6 text-slate-600 group-hover:text-orange-600 transition-colors" />
                    {cartCount > 0 && (
                      <div className="absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                        {cartCount}
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* AUTH - Desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-4 ml-2 pl-4 border-l-2 border-orange-200">
                  <div 
                    className="relative"
                    ref={profileMenuRef}
                  >
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-100 transition-all duration-300"
                    >
                      <Avatar size="sm" name={user?.email || 'User'} />
                      <span className="text-sm font-bold text-slate-700 hidden lg:block">
                        {user?.name?.split(' ')[0]}
                      </span>
                      <Zap className="w-4 h-4 text-blue-100 hover:opacity-100 transition-opacity" />
                    </button>

                    {/* Premium Dropdown */}
                    <div className={`absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border-2 border-orange-100 overflow-hidden transition-all duration-300 ${
                      isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                      {/* Dropdown Header */}
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3">
                        <p className="font-bold">{user?.name}</p>
                        <p className="text-xs opacity-90">{user?.email}</p>
                      </div>

                      {/* Dropdown Items */}
                      <div className="p-2 space-y-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm"
                        >
                          <FiUser className="w-4 h-4" /> My Profile
                        </Link>
                        <Link
                          to="/notifications"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm relative"
                        >
                          <Bell className="w-4 h-4" /> Notifications
                          {unreadCount > 0 && (
                            <Badge variant="danger" className="ml-auto text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm"
                        >
                          <FiPackage className="w-4 h-4" /> My Orders
                        </Link>
                        <Link
                          to="/cart"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm"
                        >
                          <FiShoppingCart className="w-4 h-4" /> My Cart
                        </Link>
                      </div>

                      <div className="border-t-2 border-orange-100 p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-semibold text-sm"
                        >
                          <FiLogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex gap-2 ml-2 pl-4 border-l-2 border-orange-200">
                  <Button 
                    asChild 
                    className="!px-4 !py-2 !text-sm border-2 bg-gradient-to-r from-orange-500 to-red-500 text-orange-600 hover:bg-orange-50 font-bold transition-all"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="!px-4 !py-2 !text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:shadow-lg transition-all"
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* HAMBURGER MENU - Mobile */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden p-2 hover:bg-orange-100 rounded-lg transition-all"
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6 text-slate-700" />
              </button>
            </div>
          </div>

          {/* DESKTOP NAV - Optimized */}
          <nav className="hidden md:flex items-center gap-4 md:gap-8 pb-3 md:pb-4 pt-2 border-t-2 border-orange-100/50">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-slate-700 font-bold hover:text-orange-600 transition-colors duration-300 relative group text-sm uppercase tracking-wide"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
              <Zap className="w-3 h-3" /> FLASH SALE LIVE
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE DRAWER - Enhanced */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="🍿 SNACKY"
        side="right"
        width="w-80"
      >
        {/* Drawer Header - Minimal, Professional */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 -m-6 mb-0 rounded-none flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">SNACKY</h2>
            <p className="text-xs text-slate-500">Crunch & Munch</p>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close menu"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {/* Search - Mobile */}
          {/* <div className="mb-3 px-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search snacks..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-orange-500 focus:outline-none text-sm"
              />
            </div>
          </div> */}

          {/* Divider */}
          <div className="h-px bg-slate-200 my-2"></div>

          {/* Navigation Links */}
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px bg-slate-200 my-2"></div>

          {isAuthenticated ? (
            <>
              {/* User Profile Section - Compact */}
              <div className="bg-slate-100 rounded-lg p-2.5 mb-3">
                <p className="font-semibold text-slate-900 text-xs truncate">{user?.name}</p>
                <p className="text-xs text-slate-600 truncate">{user?.email}</p>
              </div>

              <Link
                to="/profile"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm"
              >
                <FiUser className="w-4 h-4" />
                My Profile
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm"
              >
                <FiPackage className="w-4 h-4" />
                My Orders
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all font-semibold text-sm relative"
              >
                <FiShoppingCart className="w-4 h-4" />
                My Cart
                {cartCount > 0 && (
                  <span className="absolute right-3 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Divider */}
              <div className="h-px bg-slate-200 my-2"></div>

              <button
                onClick={() => {
                  handleLogout();
                  setIsDrawerOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all font-semibold text-sm"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2 mt-3">
              <Button 
                asChild 
                className="w-full !border-2 !border-orange-300 !text-orange-600 !bg-white !font-semibold hover:!bg-orange-50 text-sm py-2"
              >
                <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button 
                asChild 
                className="w-full !bg-gradient-to-r !from-orange-500 !to-red-500 !text-white !font-semibold text-sm py-2"
              >
                <Link to="/signup" onClick={() => setIsDrawerOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </nav>
      </Drawer>
    </>
  );
};

export default Header;
