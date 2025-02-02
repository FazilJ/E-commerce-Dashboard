import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await axios.get("https://fakestoreapi.com/carts");
  return response.data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: { orders: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default ordersSlice.reducer;
