import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Badge, Avatar, Drawer } from '../common';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiPackage, FiLogOut, FiSearch, FiChevronDown } from 'react-icons/fi';
import { Heart, Bell, Zap, BarChart3 } from 'lucide-react';
import { getUnreadNotificationCount } from '../../store/thunks/notificationThunks';
import { logoutUser } from '@/store/thunks/authThunks';
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
      {/* MAIN HEADER - Professional & Clean Design */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section - Simplified & Professional */}
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-0.5 shadow-md group-hover:shadow-lg transition-shadow">
                  <div className="w-full h-full rounded-xl bg-white p-1.5">
                    <img 
                      src="/Logo1.png" 
                      alt="Snacky Logo" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div>
                <span className="block text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                  SNACKY
                </span>
                <span className="hidden sm:block text-[10px] lg:text-xs font-medium text-orange-600 tracking-wider">
                  Premium Snacks
                </span>
              </div>
            </Link>

            {/* Center Navigation - Desktop Only */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              
              {/* Notifications */}
              {isAuthenticated && (
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              >
                <FiShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Desktop Auth */}
              {isAuthenticated ? (
                <div className="hidden lg:block relative " ref={profileMenuRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200 bg-gradient-to-r from-orange-500 to-red-600"
                  >
                    <Avatar size="sm" name={user?.email || 'User'} />
                    <span className="hidden xl:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <FiChevronDown className={`w-4 h-4 text-amber-50 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500">
                        <p className="font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-white/90 truncate">{user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* Admin Dashboard - Only for ADMIN users */}
                        {user?.role === 'ADMIN' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-orange-600 hover:bg-orange-50 transition-colors border-b border-gray-100 mb-1"
                          >
                            <BarChart3 className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <FiUser className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          to="/notifications"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Bell className="w-4 h-4" />
                          Notifications
                          {unreadCount > 0 && (
                            <span className="ml-auto text-xs font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full">
                              {unreadCount}
                            </span>
                          )}
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <FiPackage className="w-4 h-4" />
                          My Orders
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          My Cart
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Button 
                    asChild 
                    className="!px-4 !py-2 !text-sm !font-medium !bg-white !text-gray-700 !border !border-gray-200 hover:!bg-gray-50 !rounded-lg transition-colors"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    asChild 
                    className="!px-4 !py-2 !text-sm !font-medium !bg-gradient-to-r !from-orange-500 !to-red-500 !text-white !rounded-lg hover:!shadow-md transition-all"
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER - Clean & Professional */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Menu"
        side="right"
        width="w-80"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 -m-6 mb-6 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 p-0.5">
              <div className="w-full h-full rounded-lg bg-white p-1.5">
                <img 
                  src="/Logo1.png" 
                  alt="Snacky Logo" 
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">SNACKY</h2>
              <p className="text-xs text-gray-500">Premium Snacks</p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Drawer Content */}
        <nav className="flex flex-col gap-1">
          {/* User Info - If Authenticated */}
          {isAuthenticated && (
            <>
              <div className="px-4 py-3 mb-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <p className="font-semibold text-white text-sm truncate">{user?.name}</p>
                <p className="text-xs text-white/90 truncate">{user?.email}</p>
              </div>
              <div className="h-px bg-gray-100 my-2" />
            </>
          )}

          {/* Navigation Links */}
          {navLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setIsDrawerOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <div className="h-px bg-gray-100 my-2" />
              
              {/* Admin Dashboard - Only for ADMIN users */}
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors mb-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              )}
              
              <Link
                to="/profile"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <FiUser className="w-5 h-5" />
                My Profile
              </Link>
              <Link
                to="/notifications"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-auto text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <FiPackage className="w-5 h-5" />
                My Orders
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                My Cart
                {cartCount > 0 && (
                  <span className="ml-auto text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="h-px bg-gray-100 my-2" />

              <button
                onClick={() => {
                  handleLogout();
                  setIsDrawerOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="h-px bg-gray-100 my-4" />
              <div className="space-y-2">
                <Button 
                  asChild 
                  className="w-full !bg-white !text-gray-700 !border !border-gray-200 hover:!bg-gray-50 !font-medium !rounded-lg"
                >
                  <Link to="/login" onClick={() => setIsDrawerOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full !bg-gradient-to-r !from-orange-500 !to-red-500 !text-white !font-medium !rounded-lg"
                >
                  <Link to="/signup" onClick={() => setIsDrawerOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </>
          )}
        </nav>
      </Drawer>
    </>
  );
};

export default Header;