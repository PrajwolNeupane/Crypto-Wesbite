import { Stack, Typography } from "@mui/material"
import '../index.css';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '../StateHooks';
import { useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

interface Props {

}


export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


let Table: React.FC<Props> = ({ }) => {

    const Navigate = useNavigate();

    const { coinlist } = useAppSelector(state => state.CoinList)
    const { symbol } = useAppSelector(state => state.Currency)

    const [searchCoin, setSearchCoin] = useState<string>("");

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchCoin(e.currentTarget.value);
    }



    return (
        <Stack sx={{ backgroundColor: "primary.main", gap: "25px", padding: "25px 0px" }}>
            <input placeholder="Search For a Crypto Currency" onChange={onChange} className="search-bar" />
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Coin</th>
                    <th>Current Price (EUR)</th>
                    <th>24h Change</th>
                    <th>Market Cap</th>
                </tr>
                {
                    coinlist?.filter((val) => {
                        if (searchCoin == "") {
                            return val;
                        } else if (val.name.toLowerCase().includes(searchCoin.toLowerCase())) {
                            return val;
                        }
                    }).map((curr: any, indx: Number) => (
                        <>
                            <tr className="tr-hover">
                                <td><Typography variant="h3" sx={{ color: "text.primary", fontSize: { lg: "16px", md: "14px", sm: "12px", xs: "12px" } }}>{curr?.market_cap_rank}</Typography></td>
                                <td onClick={() => { Navigate(curr?.id) }} style={{ cursor: "pointer" }}>
                                    <Avatar src={curr?.image} sx={{ float: "left", width: { lg: "45px", md: "40px", sm: "35px", xs: "30px" }, height: { lg: "45px", md: "40px", sm: "35px", xs: "30px" } }} />
                                    <Stack sx={{ justifyContent: "space-between", paddingLeft: "10px" }}>
                                        <Typography variant="h3" sx={{ color: "text.primary", fontSize: { lg: "18px", md: "16px", sm: "14px", xs: "12px" } }}>{curr?.symbol.toUpperCase()}</Typography>
                                        <Typography variant="h4" sx={{ color: "text.primary", fontSize: { lg: "16px", md: "14px", sm: "12px", xs: "12px" } }}>{curr?.name}</Typography>
                                    </Stack>
                                </td>
                                <td><Typography variant="h4" sx={{ color: "text.primary", fontSize: { lg: "16px", md: "14px", sm: "12px", xs: "12px" } }}>{symbol + " " + numberWithCommas(curr?.current_price)}</Typography></td>
                                <td><Typography variant="h4" sx={{ color: `${curr?.market_cap_change_percentage_24h < 0 ? "#ff4655" : "#50C878"}`, fontSize: { lg: "16px", md: "14px", sm: "12px", xs: "12px" } }}>{curr?.market_cap_change_percentage_24h + " %"}</Typography></td>
                                <td><Typography variant="h4" sx={{ color: "text.primary", fontSize: { lg: "16px", md: "14px", sm: "12px", xs: "12px" } }}>{symbol + " " + numberWithCommas(Math.trunc(curr?.market_cap / 10000)) + "M"}</Typography></td>
                            </tr>
                        </>
                    ))
                }
            </table>
        </Stack>
    )


}

export default Table;