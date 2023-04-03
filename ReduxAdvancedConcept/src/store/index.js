import {configureStore} from '@reduxjs/toolkit';
import uiSlice from './UiSlice';

const store = configureStore({
    reducer: {ui: uiSlice.reducer}
});

export default store;