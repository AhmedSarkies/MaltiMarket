import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  cart: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// Total Amount Handler
const totalAmountHandler = (state) => {
  state.totalAmount = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add To Cart Reducer
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push(newItem);
        state.totalQuantity++;
      } else {
        existingItem.quantity += newItem.quantity;
      }
      totalAmountHandler(state);
    },
    // Delete From Cart Reducer
    deleteFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
      }
      totalAmountHandler(state);
    },
    // Delete Item From Cart Reducer
    deleteItemFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      state.totalAmount = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity--;
    },
    // Delete Cart Reducer
    deleteCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Exporting Actions
export const { addToCart, deleteFromCart, deleteItemFromCart, deleteCart } =
  cartSlice.actions;

// Exporting Reducer
export default cartSlice.reducer;
