import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api';

/**
 * Fetch admin order statistics with optional filters
 * 
 * @param {Object} params - Filter parameters
 * @param {string} params.startDate - Start date (yyyy-MM-dd)
 * @param {string} params.endDate - End date (yyyy-MM-dd)
 * @param {string} params.status - Order status filter
 * @param {boolean} params.includeRecentOrders - Include recent orders (default: true)
 * @param {boolean} params.includeTopProducts - Include top products (default: false)
 * @param {number} params.recentOrdersLimit - Number of recent orders (default: 10)
 * @param {boolean} params.includeAllOrders - Include all filtered orders (default: false)
 */
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.status) queryParams.append('status', params.status);
      if (params.includeRecentOrders !== undefined) {
        queryParams.append('includeRecentOrders', params.includeRecentOrders);
      }
      if (params.includeTopProducts !== undefined) {
        queryParams.append('includeTopProducts', params.includeTopProducts);
      }
      if (params.recentOrdersLimit) {
        queryParams.append('recentOrdersLimit', params.recentOrdersLimit);
      }
      if (params.includeAllOrders !== undefined) {
        queryParams.append('includeAllOrders', params.includeAllOrders);
      }

      const queryString = queryParams.toString();
      const url = `/orders/admin/stats${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      if (error.status === 403) {
        return rejectWithValue('ACCESS_FORBIDDEN');
      }
      return rejectWithValue(error.message || 'Failed to fetch admin stats');
    }
  }
);

/**
 * Fetch order details for admin (can view any order)
 */
export const fetchAdminOrderDetails = createAsyncThunk(
  'admin/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/orders/admin/${orderId}`);
      return response.data;
    } catch (error) {
      if (error.status === 403) {
        return rejectWithValue('ACCESS_FORBIDDEN');
      }
      return rejectWithValue(error.message || 'Failed to fetch order details');
    }
  }
);

/**
 * Mark payment as successful (admin manual override)
 */
export const markPaymentSuccess = createAsyncThunk(
  'admin/markPaymentSuccess',
  async ({ orderId, verificationNote }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/admin/payments/${orderId}/mark-success`, {
        verificationNote: verificationNote || 'Verified in Razorpay dashboard'
      });
      return response.data;
    } catch (error) {
      if (error.status === 403) {
        return rejectWithValue('ACCESS_FORBIDDEN');
      }
      return rejectWithValue(error.data?.message || error.message || 'Failed to mark payment as success');
    }
  }
);

/**
 * Mark payment as failed (admin manual override)
 */
export const markPaymentFailed = createAsyncThunk(
  'admin/markPaymentFailed',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/admin/payments/${orderId}/mark-failed`, {
        reason: reason || 'Admin manual override'
      });
      return response.data;
    } catch (error) {
      if (error.status === 403) {
        return rejectWithValue('ACCESS_FORBIDDEN');
      }
      return rejectWithValue(error.data?.message || error.message || 'Failed to mark payment as failed');
    }
  }
);
