import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Books
  favorites: [],
  cartItems: [], // New property for cart items
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.items = action.payload;
    },
    addToFavorites: (state, action) => {
      const bookToAdd = action.payload;
      state.favorites.push(bookToAdd);
    },
    removeFromFavorites: (state, action) => {
      const bookToRemoveId = action.payload;
      state.favorites = state.favorites.filter(
        (book) => book.id !== bookToRemoveId
      );
    },
    addToCart: (state, action) => {
      const bookToAddToCart = action.payload;
      state.cartItems.push({...bookToAddToCart, quantity: 1});
    },
    removeFromCart: (state, action) => {
      const bookToRemoveFromCartId = action.payload;
      state.cartItems = state.cartItems.filter(
        (book) => book.id !== bookToRemoveFromCartId
      );
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const parsedQuantity = parseInt(quantity); // Convert quantity to number
      const bookToUpdateIndex = state.cartItems.findIndex(
        (book) => book.id === itemId
      );
      if (bookToUpdateIndex !== -1 && !isNaN(parsedQuantity)) {
        state.cartItems[bookToUpdateIndex].quantity = parsedQuantity;
      }
    },
  },
});

export const {
  setBooks,
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
  updateQuantity,
} = bookSlice.actions;
export default bookSlice.reducer;
