import { Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from './StateHooks'
import NavBar from './Componets/NavBar';
import HomePage from './Page/HomePage';

function App() {

  const numOfCakes = useAppSelector(state => state.CoinList)
  const dispatch = useAppDispatch()

  return (
    <>
    <NavBar />
    <HomePage/>
    </>
  );
}

export default App;
