import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api';

// FETCH ADDRESSES
export const fetchAddresses = createAsyncThunk(
  'addresses/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/addresses');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to fetch addresses'
      );
    }
  }
);

// ADD ADDRESS
export const addAddress = createAsyncThunk(
  'addresses/add',
  async (addressData, { rejectWithValue }) => {
    try {
      const { fullName, phoneNumber, addressLine1, city, state, zipCode, country = 'India', isDefault = false } = addressData;
      
      // Client-side validation
      if (!fullName || !fullName.trim()) {
        return rejectWithValue('Full name is required');
      }
      if (!phoneNumber || !phoneNumber.trim()) {
        return rejectWithValue('Phone number is required');
      }
      if (!addressLine1 || !addressLine1.trim()) {
        return rejectWithValue('Address is required');
      }
      if (!city || !city.trim()) {
        return rejectWithValue('City is required');
      }
      if (!state || !state.trim()) {
        return rejectWithValue('State is required');
      }
      if (!zipCode || !zipCode.trim()) {
        return rejectWithValue('Zip code is required');
      }

      const response = await apiClient.post('/addresses', {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        addressLine1: addressLine1.trim(),
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
        country: country || 'India',
        isDefault: isDefault || false
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to add address'
      );
    }
  }
);

// UPDATE ADDRESS
export const updateAddress = createAsyncThunk(
  'addresses/update',
  async (addressData, { rejectWithValue }) => {
    try {
      const { addressId, fullName, phoneNumber, addressLine1, city, state, zipCode, country = 'India', isDefault = false } = addressData;
      
      if (!addressId) {
        return rejectWithValue('Address ID is required');
      }
      
      // Client-side validation
      if (fullName && !fullName.trim()) {
        return rejectWithValue('Full name cannot be empty');
      }
      if (phoneNumber && !phoneNumber.trim()) {
        return rejectWithValue('Phone number cannot be empty');
      }
      if (addressLine1 && !addressLine1.trim()) {
        return rejectWithValue('Address cannot be empty');
      }
      if (zipCode && !zipCode.trim()) {
        return rejectWithValue('Zip code cannot be empty');
      }

      const response = await apiClient.put(`/addresses/${addressId}`, {
        fullName: fullName?.trim(),
        phoneNumber: phoneNumber?.trim(),
        addressLine1: addressLine1?.trim(),
        city: city?.trim(),
        state: state?.trim(),
        zipCode: zipCode?.trim(),
        country: country || 'India',
        isDefault
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to update address'
      );
    }
  }
);

// DELETE ADDRESS
export const deleteAddress = createAsyncThunk(
  'addresses/delete',
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/addresses/${addressId}`);
      return { id: addressId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to delete address'
      );
    }
  }
);

// SET DEFAULT ADDRESS
export const setDefaultAddress = createAsyncThunk(
  'addresses/setDefault',
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/addresses/${addressId}/default`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 
        error.message || 
        'Failed to set default address'
      );
    }
  }
);

// ALIAS for backward compatibility
export const createAddress = addAddress;
