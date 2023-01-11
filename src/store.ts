import { configureStore } from '@reduxjs/toolkit';
import CoinListSlice from './State Management/CoinListSlice';
import TrendingCoinSlice from './State Management/TrendingCoinSlice';
import CurrencySlice from './State Management/CurrencySlice';

const store = configureStore({
    reducer: {
        CoinList: CoinListSlice,
        TrendingCoin: TrendingCoinSlice,
        Currency:CurrencySlice
    }, middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
