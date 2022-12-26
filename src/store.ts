import { configureStore } from '@reduxjs/toolkit';
import CoinListSlice from './State Management/CoinListSlice';

const store = configureStore({
    reducer: {
        CoinList: CoinListSlice,
    }, middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
