import { Stack, Typography ,Button} from "@mui/material"
import '../index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

interface Props{

}

interface Data_Type {
    market_cap_rank: number
    name: string
};
interface All_Data extends Array<Data_Type> { };

export function numberWithCommas(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


let Table: React.FC<Props> =  ({ }) => {

    const [data, setData] = useState<All_Data>([]);
    const[searchCoin,setSearchCoin] = useState<string>("");

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchCoin(e.currentTarget.value);
      }

    useEffect(() => {
        const getAllData = async () => {
            try {
                const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=100&page=1&sparkline=false");
                setData(res.data);
            } catch (e) {

            }
        }
        getAllData();

    }, []);


    return (
        <Stack sx={{ backgroundColor: "primary.main" ,gap:"25px",padding:"25px 0px"}}>
            <input placeholder="Search For a Crypto Currency" style={{width:"88%",margin:"0px  auto",padding:"8px 1%",backgroundColor:"white",border:"none",outline:"none",fontWeight:500,fontSize:"14px"}} onChange={onChange}/>
            <Button sx={{backgroundColor:"text.secondary",width:"150px",fontSize:"14px",fontWeight:"600",border:"none",color:"text.primary",marginLeft:"95%",transform: "translate(-100%, 0px)","&:hover":{
                backgroundColor:"text.secondary"
            }}}>
                Set Currency
            </Button>
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Coin</th>
                    <th>Current Price (EUR)</th>
                    <th>24h Change</th>
                    <th>Market Cap</th>
                </tr>
                {
                    data?.filter((val)=>{
                        if(searchCoin == ""){
                            return val;
                        }else if (val.name.toLowerCase().includes(searchCoin.toLowerCase())){
                            return val;
                        }
                    }).map((curr: any, indx: Number) => (
                        <>
                            <tr>
                                <td><Typography variant="h3" sx={{ color: "text.primary", fontSize: "16px" }}>{curr?.market_cap_rank}</Typography></td>
                                <td>
                                    <Avatar src={curr?.image} sx={{ float: "left", width: "45px", height: "45px" }} />
                                    <Stack sx={{ justifyContent: "space-between", paddingLeft: "10px" }}>
                                        <Typography variant="h3" sx={{ color: "text.primary", fontSize: "18px" }}>{curr?.symbol.toUpperCase()}</Typography>
                                        <Typography variant="h4" sx={{ color: "text.primary", fontSize: "16px" }}>{curr?.name}</Typography>
                                    </Stack>
                                </td>
                                <td><Typography variant="h4" sx={{ color: "text.primary", fontSize: "16px" }}>{"€ "+ numberWithCommas(curr?.current_price)}</Typography></td>
                                <td><Typography variant="h4" sx={{ color:`${curr?.market_cap_change_percentage_24h < 0 ? "#ff4655":"#50C878"}`, fontSize: "16px" }}>{curr?.market_cap_change_percentage_24h +" %"}</Typography></td>
                                <td><Typography variant="h4" sx={{ color: "text.primary", fontSize: "16px" }}>{"€ "+ numberWithCommas(Math.trunc(curr?.market_cap / 10000))+"M"}</Typography></td>
                            </tr>
                        </>
                    ))
                }
            </table>
        </Stack>
    )


}

export default Table;