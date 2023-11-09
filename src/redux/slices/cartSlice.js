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
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.cart.push({
          id: newItem.id,
          productName: newItem.name,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += +existingItem.totalPrice + +newItem.price;
        state.totalAmount = state.cart.reduce(
          (total, item) => total + +newItem.price * +item.quantity
        );
      }
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
