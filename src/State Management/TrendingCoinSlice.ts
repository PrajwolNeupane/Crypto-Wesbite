import { createSlice,PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    trendingcoin:Array<any>
}

const initialState:InitialState = {
    trendingcoin:[]
}
const TrendinCoinSlice = createSlice({
    name:"CoinList",
    initialState,
    reducers:{
        addTrendingCoin:(state,action: PayloadAction<Array<any>>) => {
            state.trendingcoin = action.payload;
        }
    }
});

export default TrendinCoinSlice.reducer;
export const {addTrendingCoin} = TrendinCoinSlice.actions; 