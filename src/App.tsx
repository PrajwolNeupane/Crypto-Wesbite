import { useAppSelector, useAppDispatch } from './StateHooks'
import NavBar from './Componets/NavBar';
import HomePage from './Page/HomePage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addCoinList } from './State Management/CoinListSlice';
import { addTrendingCoin } from './State Management/TrendingCoinSlice';
import { addCurrency, addSymbol } from './State Management/CurrencySlice';
import { Routes, Route } from 'react-router-dom';
import SingleCoinPage from './Page/SingleCoinPage';

function App() {

  const dispatch = useAppDispatch()
  const { currency } = useAppSelector(state => state.Currency);

  useEffect(() => {
    dispatch(addCurrency(`${localStorage.getItem("currency") === null ? "EUR" : localStorage.getItem("currency")}`))
    dispatch(addSymbol(`${localStorage.getItem("symbol") === null ? "€" : localStorage.getItem("symbol")}`))
  }, []);

  useEffect(() => {
    const getAllCoinData = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        dispatch(addCoinList(res.data));
      } catch (e) {

      }
    }
    const getTrendingCoinData = async () => {
      try {

        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${localStorage.getItem("currency") === null ? "EUR" : localStorage.getItem("currency")}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
        dispatch(addTrendingCoin(res.data));

      } catch (e) {
        console.log(e);
      }
    }
    getTrendingCoinData();
    getAllCoinData();

  }, [currency]);

  return (
    <Routes>
      <Route path='/' element={<>
        <NavBar />
        <HomePage /></>} />
      <Route path='/:id' element={<>
        <NavBar />
        <SingleCoinPage />
      </>} />
    </Routes>
  );
}

export default App;
