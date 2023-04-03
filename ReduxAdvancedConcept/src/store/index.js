import {configureStore} from '@reduxjs/toolkit';
import uiSlice from './UiSlice';
import cartSlice from './CartSlice';

const store = configureStore({
    reducer: {ui: uiSlice.reducer, cart: cartSlice.reducer}
});

export default store;