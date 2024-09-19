import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shippexApi } from "./services/api";
import shipmentsReducer from "./features/shipmentsSlice";

export const store = configureStore({
  reducer: {
    shipment: shipmentsReducer,
    [shippexApi.reducerPath]: shippexApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shippexApi.middleware),
});

setupListeners(store.dispatch);
