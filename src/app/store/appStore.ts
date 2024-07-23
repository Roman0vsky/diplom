import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../../features/auth/authService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { inspectorApi } from "../../features/inspector/inspectorService";
import { adminApi } from "../../features/admin/adminService";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      inspectorApi.middleware,
      adminApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
