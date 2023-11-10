import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push(newItem);
        state.totalQuantity++;
      } else {
        existingItem.quantity += newItem.quantity;
        state.totalAmount = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
        state.totalQuantity--;
        state.totalAmount = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      } else {
        existingItem.quantity--;
        state.totalAmount = state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    deleteItemFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      state.totalAmount = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity--;
    },
    deleteCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, deleteFromCart, deleteItemFromCart, deleteCart } =
  cartSlice.actions;

export default cartSlice.reducer;
