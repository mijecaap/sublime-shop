import { getLocalStorage, setLocalStorage } from "../../utilities";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: getLocalStorage("cart")
    ? JSON.parse(JSON.parse(getLocalStorage("cart")))
    : [],
  reducers: {
    addProduct: (state, action) => {
      const updatedCart = [...state, action.payload];
      setLocalStorage("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    removeProduct: (state, action) => {
      const updatedCart = state.filter(
        (product) => product.id !== action.payload.id
      );
      setLocalStorage("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    clearCart: () => {
      setLocalStorage("cart", JSON.stringify([]));
      return [];
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
