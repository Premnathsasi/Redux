import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        additems(state, action)  {
            const newItem = action.payload;
            const existingItems = state.items.find((item) => item.id === newItem.id);
            if (existingItems) {
                state.items.pudh({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItems.quantity++;
                existingItems.totalPrice = existingItems.totalPrice + newItem.price;
            }

        },
        removeItems() {

        }
    }
})