import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import productsReducer from "./slices/productsSlice";
import usersReducer from "./slices/usersSlice";
import ordersReducer from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
  },
});

export default store;
