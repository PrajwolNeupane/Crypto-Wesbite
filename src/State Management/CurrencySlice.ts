import { createSlice,PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    currency?:string,
    symbol?:string
}

const initialState:InitialState = {
    currency:undefined,
    symbol:undefined
}
const CurrencySlice = createSlice({
    name:"Currency",
    initialState,
    reducers:{
        addCurrency:(state,action: PayloadAction<string>) => {
            state.currency = action.payload;
        },
        addSymbol:(state,action: PayloadAction<string>) => {
            state.symbol = action.payload;
        }
    }
});

export default CurrencySlice.reducer;
export const {addCurrency,addSymbol} = CurrencySlice.actions; 