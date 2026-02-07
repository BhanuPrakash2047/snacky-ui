/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart3,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  RefreshCw,
  Calendar,
  Filter,
  Search,
  ChevronRight,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle,
  X
} from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button, Card, Badge, Input } from '@/components/common';
import { AdminDashboardPageSkeleton } from '@/components/skeletons';
import { fetchAdminStats, markPaymentSuccess, markPaymentFailed } from '@/store/thunks/adminThunks';
import { clearAdminError } from '@/store/slices/adminSlice';
import { showToast } from '@/utils/toast';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stats, loading, actionLoading, error, actionError, lastUpdated } = useSelector(state => state.admin);
  const { user } = useSelector(state => state.auth);

  // Filter states
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllOrders, setShowAllOrders] = useState(false);

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({ show: false, type: '', orderId: null, orderNumber: '' });

  // Check admin access
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'ADMIN') {
      navigate('/forbidden');
      return;
    }
  }, [user, navigate]);

  // Fetch stats on mount and when filters change
  const fetchStats = useCallback(() => {
    const params = {
      includeRecentOrders: true,
      includeTopProducts: true,
      recentOrdersLimit: 20,
      includeAllOrders: showAllOrders
    };
    
    if (filterStatus) params.status = filterStatus;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    dispatch(fetchAdminStats(params))
      .unwrap()
      .catch(err => {
        if (err === 'ACCESS_FORBIDDEN') {
          navigate('/forbidden');
        } else {
          showToast(err || 'Failed to load stats', 'error');
        }
      });
  }, [dispatch, filterStatus, startDate, endDate, showAllOrders, navigate]);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchStats();
    }
  }, [user, fetchStats]);

  // Handle payment actions
  const handlePaymentAction = (type, orderId, orderNumber) => {
    setConfirmModal({ show: true, type, orderId, orderNumber });
  };

  const confirmPaymentAction = async () => {
    const { type, orderId } = confirmModal;
    
    try {
      if (type === 'success') {
        const result = await dispatch(markPaymentSuccess({ orderId, verificationNote: 'Verified in Razorpay dashboard' })).unwrap();
        
        // Check if shipment was successful or failed
        if (result.shipmentSuccess) {
          showToast(`Payment confirmed & shipment created. Tracking: ${result.trackingNumber}`, 'success');
        } else {
          // Shipment failed - show the actual Delhivery error message
          showToast(
            `Payment confirmed, but shipment failed: ${result.shipmentError || 'Unknown error'}. Will retry automatically.`,
            'warning'
          );
        }
      } else {
        await dispatch(markPaymentFailed({ orderId, reason: 'Admin manual override' })).unwrap();
        showToast('Payment marked as failed, order cancelled', 'success');
      }
      // Refresh stats after action
      fetchStats();
    } catch (err) {
      if (err === 'ACCESS_FORBIDDEN') {
        navigate('/forbidden');
      } else {
        showToast(err || `Failed to mark payment as ${type}`, 'error');
      }
    }
    
    setConfirmModal({ show: false, type: '', orderId: null, orderNumber: '' });
  };

  // Filter orders by search term
  const getFilteredOrders = () => {
    const orders = showAllOrders ? stats?.allOrders : stats?.recentOrders;
    if (!orders) return [];
    
    if (!searchTerm) return orders;
    
    return orders.filter(order =>
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toString().includes(searchTerm) ||
      order.receiverName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Format helpers
  const formatAmount = (amount) => {
    if (!amount) return '₹0';
    return `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)).join(' ');
  };

  const getStatusColor = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'CREATED':
      case 'PAYMENT_PENDING':
        return 'warning';
      case 'PAID':
      case 'CONFIRMED':
        return 'primary';
      case 'SHIPPED':
        return 'info';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
      case 'RETURNED':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'CREATED':
      case 'PAYMENT_PENDING':
        return <Clock className="w-4 h-4" />;
      case 'PAID':
      case 'CONFIRMED':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'SHIPPED':
        return <Truck className="w-4 h-4" />;
      case 'DELIVERED':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'CANCELLED':
      case 'RETURNED':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (loading && !stats) {
    return <AdminDashboardPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 via-white to-emerald-50 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { opacity: 1; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-float { animation: float 3s cubic-bezier(0.4, 0.0, 0.2, 1) infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-8 md:pt-12 md:pb-16 pt-18 lg:pt-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-linear-to-r from-orange-100 to-red-100 text-orange-700 px-2.5 md:px-4 py-1.5 md:py-2 rounded-full w-fit border border-orange-200">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm font-semibold">Admin Dashboard</span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black bg-linear-to-r from-orange-600 via-red-500 to-emerald-600 bg-clip-text text-transparent">
                Order Statistics
              </h1>
              {lastUpdated && (
                <p className="text-xs md:text-sm text-slate-500">
                  Last updated: {formatDate(lastUpdated)}
                </p>
              )}
            </div>
            <Button
              onClick={fetchStats}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2 border-orange-300 hover:border-orange-400"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      {/* STATS CARDS */}
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Total Orders */}
            <Card className="p-4 md:p-6 bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Total Orders</p>
              <p className="text-xl md:text-3xl font-bold text-slate-900">{stats?.totalOrders || 0}</p>
            </Card>

            {/* Total Revenue */}
            <Card className="p-4 md:p-6 bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Total Revenue</p>
              <p className="text-xl md:text-3xl font-bold text-slate-900">{formatAmount(stats?.totalRevenue)}</p>
            </Card>

            {/* Average Order Value */}
            <Card className="p-4 md:p-6 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Avg Order Value</p>
              <p className="text-xl md:text-3xl font-bold text-slate-900">{formatAmount(stats?.averageOrderValue)}</p>
            </Card>

            {/* Items Sold */}
            <Card className="p-4 md:p-6 bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Items Sold</p>
              <p className="text-xl md:text-3xl font-bold text-slate-900">{stats?.totalItemsSold || 0}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* TIME-BASED STATS */}
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Today */}
            <Card className="p-4 md:p-5 bg-linear-to-br from-orange-50 to-white border border-orange-200">
              <h3 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Today
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Orders</p>
                  <p className="text-lg font-bold text-slate-900">{stats?.ordersToday || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Revenue</p>
                  <p className="text-lg font-bold text-emerald-600">{formatAmount(stats?.revenueToday)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Delivered</p>
                  <p className="text-lg font-bold text-green-600">{stats?.deliveredToday || 0}</p>
                </div>
              </div>
            </Card>

            {/* This Week */}
            <Card className="p-4 md:p-5 bg-linear-to-br from-blue-50 to-white border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> This Week
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Orders</p>
                  <p className="text-lg font-bold text-slate-900">{stats?.ordersThisWeek || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Revenue</p>
                  <p className="text-lg font-bold text-emerald-600">{formatAmount(stats?.revenueThisWeek)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Delivered</p>
                  <p className="text-lg font-bold text-green-600">{stats?.deliveredThisWeek || 0}</p>
                </div>
              </div>
            </Card>

            {/* This Month */}
            <Card className="p-4 md:p-5 bg-linear-to-br from-emerald-50 to-white border border-emerald-200">
              <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> This Month
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Orders</p>
                  <p className="text-lg font-bold text-slate-900">{stats?.ordersThisMonth || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Revenue</p>
                  <p className="text-lg font-bold text-emerald-600">{formatAmount(stats?.revenueThisMonth)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ORDER STATUS BREAKDOWN */}
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Orders by Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
            {stats?.ordersByStatus && Object.entries(stats.ordersByStatus).map(([status, count]) => (
              <Card
                key={status}
                className={`p-3 md:p-4 cursor-pointer transition-all hover:shadow-md ${
                  filterStatus === status ? 'ring-2 ring-orange-500 bg-orange-50' : 'bg-white'
                }`}
                onClick={() => setFilterStatus(filterStatus === status ? '' : status)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(status)}
                  <Badge variant={getStatusColor(status)} size="sm">
                    {formatStatus(status)}
                  </Badge>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-900">{count}</p>
                {stats?.revenueByStatus?.[status] && (
                  <p className="text-xs text-slate-500 mt-1">{formatAmount(stats.revenueByStatus[status])}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK STATS ROW */}
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* Pending Deliveries */}
            <Card className="p-4 bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">Pending Deliveries</span>
              </div>
              <p className="text-2xl font-bold text-yellow-800">{stats?.pendingDeliveries || 0}</p>
            </Card>

            {/* Payment Pending */}
            <Card className="p-4 bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Payment Pending</span>
              </div>
              <p className="text-2xl font-bold text-orange-800">{stats?.paymentPending || 0}</p>
            </Card>

            {/* Cancelled */}
            <Card className="p-4 bg-red-50 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">Cancelled</span>
              </div>
              <p className="text-2xl font-bold text-red-800">{stats?.cancelledOrders || 0}</p>
              <p className="text-xs text-red-600">{formatAmount(stats?.cancelledOrdersValue)}</p>
            </Card>

            {/* Returned */}
            <Card className="p-4 bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Returned</span>
              </div>
              <p className="text-2xl font-bold text-purple-800">{stats?.returnedOrders || 0}</p>
              <p className="text-xs text-purple-600">{formatAmount(stats?.returnedOrdersValue)}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FILTERS SECTION */}
      <section className="py-4 md:py-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-orange-500"
              >
                <option value="">All Statuses</option>
                <option value="CREATED">Created</option>
                <option value="PAYMENT_PENDING">Payment Pending</option>
                <option value="PAID">Paid</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="RETURNED">Returned</option>
              </select>
            </div>

            {/* Date Range */}
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              className="text-sm"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
              className="text-sm"
            />
          </div>

          {/* Toggle all orders */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAllOrders}
                onChange={(e) => setShowAllOrders(e.target.checked)}
                className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-slate-700">Show all filtered orders</span>
            </label>
            {(filterStatus || startDate || endDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterStatus('');
                  setStartDate('');
                  setEndDate('');
                }}
                className="text-orange-600 hover:text-orange-700"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {getFilteredOrders().length === 0 ? (
              <Card className="p-8 text-center border-2 border-dashed border-slate-200">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">No orders found</p>
              </Card>
            ) : (
              getFilteredOrders().map((order, index) => (
                <Card
                  key={order.id}
                  className="p-4 bg-white border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all animate-bounce-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{order.orderNumber}</h3>
                        <Badge variant={getStatusColor(order.status)} size="sm" className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {formatStatus(order.status)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                        <span>ID: #{order.id}</span>
                        <span>{formatDate(order.createdAt)}</span>
                        {order.receiverName && <span>{order.receiverName}</span>}
                        <span className="font-semibold text-slate-900">{formatAmount(order.totalAmount)}</span>
                        <span>{order.itemCount} items</span>
                      </div>
                      {order.trackingNumber && (
                        <p className="text-xs text-slate-500 mt-1">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Payment Actions - Only for PAYMENT_PENDING */}
                      {order.status === 'PAYMENT_PENDING' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-300 hover:bg-green-50 hover:border-green-400"
                            onClick={() => handlePaymentAction('success', order.id, order.orderNumber)}
                            disabled={actionLoading}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Paid
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                            onClick={() => handlePaymentAction('failed', order.id, order.orderNumber)}
                            disabled={actionLoading}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Mark Failed
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="text-slate-600 hover:text-orange-600"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* TOP PRODUCTS */}
      {stats?.topProducts && stats.topProducts.length > 0 && (
        <section className="py-4 md:py-6 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Top Selling Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {stats.topProducts.slice(0, 5).map((product, index) => (
                <Card key={product.productId} className="p-4 bg-white border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full text-orange-600 font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate text-sm">{product.productName}</p>
                      <p className="text-xs text-slate-500">{product.quantitySold} sold</p>
                      <p className="text-xs font-semibold text-emerald-600">{formatAmount(product.revenue)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 bg-white animate-bounce-in">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                confirmModal.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {confirmModal.type === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {confirmModal.type === 'success' ? 'Mark Payment as Successful?' : 'Mark Payment as Failed?'}
              </h3>
              <p className="text-slate-600 mb-6">
                Order: <span className="font-semibold">{confirmModal.orderNumber}</span>
                <br />
                <span className="text-sm text-slate-500">
                  {confirmModal.type === 'success'
                    ? 'This will confirm the order and create a shipment.'
                    : 'This will cancel the order and release the stock.'}
                </span>
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setConfirmModal({ show: false, type: '', orderId: null, orderNumber: '' })}
                  disabled={actionLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant={confirmModal.type === 'success' ? 'primary' : 'danger'}
                  onClick={confirmPaymentAction}
                  disabled={actionLoading}
                  className={confirmModal.type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                >
                  {actionLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {confirmModal.type === 'success' ? 'Confirm Payment' : 'Mark as Failed'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
