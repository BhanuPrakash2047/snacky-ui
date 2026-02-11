/**
 * Admin shipping label API service
 * Handles downloading shipping labels and batch operations
 */
import apiClient from '@/store/api';

export const shippingLabelAPI = {
  /**
   * Download a single order's shipping label
   * @param {number} orderId - Order ID
   * @returns {Promise<Blob>} PDF file blob
   */
  downloadOrderLabel: async (orderId) => {
    const response = await apiClient.get(
      `/admin/shipping-labels/${orderId}/download`,
      { responseType: 'blob' }
    );
    return response.data;
  },

  /**
   * Download all shipping labels as a ZIP file
   * @param {string} orderIds - Comma-separated order IDs (optional)
   * @param {string} status - Order status filter (default: SHIPPED)
   * @returns {Promise<Blob>} ZIP file blob
   */
  downloadBatchLabels: async (orderIds = null, status = 'SHIPPED') => {
    let url = `/admin/shipping-labels/batch/download?status=${status}`;
    if (orderIds) {
      url += `&orderIds=${orderIds}`;
    }
    const response = await apiClient.get(url, { responseType: 'blob' });
    return response.data;
  },

  /**
   * Preview which orders will be included in batch download
   * @param {string} orderIds - Comma-separated order IDs (optional)
   * @param {string} status - Order status filter (default: SHIPPED)
   * @returns {Promise<Object>} List of orders that will be downloaded
   */
  previewBatchLabels: async (orderIds = null, status = 'SHIPPED') => {
    let url = `/admin/shipping-labels/batch/preview?status=${status}`;
    if (orderIds) {
      url += `&orderIds=${orderIds}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  },

  /**
   * Regenerate all missing shipping labels
   * @returns {Promise<Object>} Regeneration statistics
   */
  regenerateAllLabels: async () => {
    const response = await apiClient.post('/admin/shipping-labels/regenerate-all', {});
    return response.data;
  },

  /**
   * Helper function to trigger file download
   * @param {Blob} fileBlob - File blob from API
   * @param {string} filename - Filename for the download
   */
  downloadFile: (fileBlob, filename) => {
    const url = window.URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }
};
