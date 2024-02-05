import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./states";

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
