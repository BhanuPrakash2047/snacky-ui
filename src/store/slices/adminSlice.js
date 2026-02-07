import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAdminStats,
  fetchAdminOrderDetails,
  markPaymentSuccess,
  markPaymentFailed
} from '../thunks/adminThunks';

const initialState = {
  stats: null,
  selectedOrder: null,
  loading: false,
  actionLoading: false,
  error: null,
  actionError: null,
  lastUpdated: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
      state.actionError = null;
    },
    resetAdmin: (state) => {
      state.stats = null;
      state.selectedOrder = null;
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
      state.actionError = null;
      state.lastUpdated = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    }
  },
  extraReducers: (builder) => {
    // FETCH ADMIN STATS
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // FETCH ADMIN ORDER DETAILS
    builder
      .addCase(fetchAdminOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchAdminOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // MARK PAYMENT SUCCESS
    builder
      .addCase(markPaymentSuccess.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(markPaymentSuccess.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Update the order in stats if it exists
        if (state.stats?.recentOrders) {
          state.stats.recentOrders = state.stats.recentOrders.map(order =>
            order.id === action.payload.orderId
              ? { ...order, status: action.payload.orderStatus }
              : order
          );
        }
        if (state.stats?.allOrders) {
          state.stats.allOrders = state.stats.allOrders.map(order =>
            order.id === action.payload.orderId
              ? { ...order, status: action.payload.orderStatus }
              : order
          );
        }
      })
      .addCase(markPaymentSuccess.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });

    // MARK PAYMENT FAILED
    builder
      .addCase(markPaymentFailed.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(markPaymentFailed.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Update the order in stats if it exists
        if (state.stats?.recentOrders) {
          state.stats.recentOrders = state.stats.recentOrders.map(order =>
            order.id === action.payload.orderId
              ? { ...order, status: action.payload.orderStatus }
              : order
          );
        }
        if (state.stats?.allOrders) {
          state.stats.allOrders = state.stats.allOrders.map(order =>
            order.id === action.payload.orderId
              ? { ...order, status: action.payload.orderStatus }
              : order
          );
        }
      })
      .addCase(markPaymentFailed.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  }
});

export const { clearAdminError, resetAdmin, clearSelectedOrder } = adminSlice.actions;
export default adminSlice.reducer;
