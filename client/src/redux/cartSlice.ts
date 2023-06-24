// redux/cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: {
    [productID: string]: {
      data: any;
      quantity: number;
    };
  };
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const item = action.payload;

      if (state.items[item.id]) {
        state.items[item.id].quantity += 1;
      } else {
        state.items[item.id] = { data: item, quantity: 1 };
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    adjustQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      if (state.items[id]) {
        state.items[id].quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, adjustQuantity } = cartSlice.actions;

export default cartSlice.reducer;
