import { createSlice,PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    coinlist:Array<any>
}

const initialState:InitialState = {
    coinlist:[]
}
const CoinListSlice = createSlice({
    name:"CoinList",
    initialState,
    reducers:{
        addCoinList:(state,action: PayloadAction<Array<any>>) => {
            state.coinlist = action.payload;
        }
    }
});

export default CoinListSlice.reducer;
export const {addCoinList} = CoinListSlice.actions; 