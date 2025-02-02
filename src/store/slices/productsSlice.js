import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services/api"; // Ensure the correct path to api

// Fetch products asynchronously
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await getProducts();
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
