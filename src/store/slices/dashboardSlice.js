import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getUsers, getOrders } from '../../services/api';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    const [products, users, orders] = await Promise.all([
      getProducts(),
      getUsers(),
      getOrders()
    ]);
    return { products, users, orders };
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    products: [],
    users: [],
    orders: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.users = action.payload.users;
        state.orders = action.payload.orders;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default dashboardSlice.reducer;
