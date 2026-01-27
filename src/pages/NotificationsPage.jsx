import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bell,
  CheckCircle2,
  Package,
  Truck,
  Lock,
  AlertCircle,
  Trash2,
  Check,
  Clock,
  Filter
} from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { Button, Card, Spinner, Badge } from '@/components/common';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadNotificationCount
} from '@/store/thunks/notificationThunks';
import { showToast } from '@/utils/toast';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: notifications, loading, error, unreadCount } = useSelector(state => state.notifications);

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleting, setDeleting] = useState({});

  // Load notifications on mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(fetchNotifications())
      .unwrap()
      .catch(err => {
        showToast(err || 'Failed to load notifications', 'error');
      });
  }, [user, dispatch, navigate]);

  // Filter notifications
  useEffect(() => {
    const notificationsList = Array.isArray(notifications) 
      ? notifications 
      : (notifications?.data && Array.isArray(notifications.data))
      ? notifications.data
      : [];
    
    let result = [...notificationsList];

    if (filterStatus === 'unread') {
      result = result.filter(n => !n.isRead);
    } else if (filterStatus === 'read') {
      result = result.filter(n => n.isRead);
    }

    if (filterType !== 'all') {
      result = result.filter(n => n.type?.toLowerCase() === filterType.toLowerCase());
    }

    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredNotifications(result);
  }, [notifications, filterType, filterStatus]);

  // Notification type icons and colors
  const getNotificationIcon = (type) => {
    const typeUpper = type?.toUpperCase();
    switch (typeUpper) {
      case 'PAYMENT_RECEIVED':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'SHIPMENT_CREATED':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'ORDER_DELIVERED':
        return <Package className="w-5 h-5 text-green-500" />;
      case 'PASSWORD_CHANGED':
        return <Lock className="w-5 h-5 text-orange-500" />;
      case 'ADMIN_SHIPMENT_FAILED':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    const typeUpper = type?.toUpperCase();
    switch (typeUpper) {
      case 'PAYMENT_RECEIVED':
        return 'success';
      case 'SHIPMENT_CREATED':
        return 'primary';
      case 'ORDER_DELIVERED':
        return 'success';
      case 'PASSWORD_CHANGED':
        return 'warning';
      case 'ADMIN_SHIPMENT_FAILED':
        return 'danger';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const handleMarkAsRead = (notificationId, isRead) => {
    if (!isRead) {
      dispatch(markNotificationAsRead(notificationId))
        .unwrap()
        .catch(err => {
          showToast(err || 'Failed to mark as read', 'error');
        });
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead())
      .unwrap()
      .then(() => {
        showToast('All notifications marked as read', 'success');
      })
      .catch(err => {
        showToast(err || 'Failed to mark all as read', 'error');
      });
  };

  const handleDelete = (notificationId) => {
    setDeleting(prev => ({ ...prev, [notificationId]: true }));
    dispatch(deleteNotification(notificationId))
      .unwrap()
      .then(() => {
        showToast('Notification deleted', 'success');
      })
      .catch(err => {
        showToast(err || 'Failed to delete notification', 'error');
      })
      .finally(() => {
        setDeleting(prev => ({ ...prev, [notificationId]: false }));
      });
  };

  const notificationTypes = [
    { value: 'all', label: 'All', icon: Bell },
    { value: 'payment_received', label: 'Payments', icon: CheckCircle2 },
    { value: 'shipment_created', label: 'Shipments', icon: Truck },
    { value: 'order_delivered', label: 'Deliveries', icon: Package },
    { value: 'password_changed', label: 'Security', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16 lg:pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Notifications
              </h1>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                <Bell className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
            </div>
            <p className="text-sm lg:text-base text-gray-600">
              {unreadCount > 0 
                ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` 
                : 'You\'re all caught up!'}
            </p>
          </div>

          {/* Filters Section */}
          <div className="mb-6">
            {/* Type Filters */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by type</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {notificationTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setFilterType(type.value)}
                      className={`inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        filterType === type.value
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:shadow-sm'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Filters & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex gap-2">
                {['all', 'unread', 'read'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                      filterStatus === status
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {unreadCount > 0 && (
                <Button
                  onClick={handleMarkAllAsRead}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 !bg-emerald-500 hover:!bg-emerald-600 !text-white !font-medium !px-4 !py-2 !rounded-lg !text-sm"
                >
                  <Check className="w-4 h-4" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card className="p-8 text-center border-red-200 bg-red-50">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-red-600 font-semibold mb-4">{error}</p>
              <Button
                onClick={() => dispatch(fetchNotifications())}
                className="!bg-white !text-red-600 !border-2 !border-red-200 hover:!bg-red-50"
              >
                Try Again
              </Button>
            </Card>
          )}

          {/* Empty State */}
          {!loading && filteredNotifications.length === 0 && !error && (
            <Card className="p-12 text-center bg-white border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filterStatus === 'unread' && filterType === 'all'
                  ? 'All caught up!'
                  : 'No notifications'}
              </h3>
              <p className="text-gray-500 text-sm">
                {filterStatus === 'read' && filterType === 'all'
                  ? 'You have no read notifications'
                  : filterStatus === 'unread' && filterType === 'all'
                  ? 'You have no unread notifications'
                  : 'No notifications match your current filters'}
              </p>
            </Card>
          )}

          {/* Notifications List */}
          {!loading && !error && filteredNotifications.length > 0 && (
            <div className="space-y-3">
              {filteredNotifications.map(notification => (
                <Card
                  key={notification.id}
                  className={`group relative overflow-hidden transition-all duration-200 ${
                    !notification.isRead
                      ? 'bg-blue-50/50 border-l-4 border-orange-500 hover:shadow-md'
                      : 'bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="p-4 lg:p-5">
                    <div className="flex items-start gap-3 lg:gap-4">
                      
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className={`font-semibold text-base lg:text-lg pr-2 ${
                            !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                          )}
                        </div>

                        <p className="text-sm lg:text-base text-gray-600 mb-3 pr-12">
                          {notification.message}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                          <Badge variant={getTypeColor(notification.type)} size="sm">
                            {notification.type?.replace(/_/g, ' ')}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(notification.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-start gap-1 flex-shrink-0">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id, notification.isRead)}
                            className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          disabled={deleting[notification.id]}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting[notification.id] ? (
                            <Spinner className="w-4 h-4 lg:w-5 lg:h-5" />
                          ) : (
                            <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Results Summary */}
          {!loading && !error && filteredNotifications.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotificationsPage;