import { Stack, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import '../index.css';

interface Props {

};

interface Data_Type {
    market_cap_rank: number
    name: string
};
interface All_Data extends Array<Data_Type> { };

export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



let Header: React.FC<Props> = ({ }) => {

    const [data, setData] = useState<All_Data>([]);

    const settings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        draggable: false,
        arrows: false,
        useCSS: true
    };

    useEffect(() => {
        const getData = async () => {
            try {

                const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h");
                setData(res.data);

            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    return (
        <Stack sx={{ height: "500px", backgroundColor: "text.secondary" }}>
            <Slider {...settings} className="slide">
                {
                    data.map((curr: any, index: number) => (
                        <Stack sx={{ flexDirection: "row", alignItems: "center", width: { md: "96%", sm: "98%", lg: "90%" }, height: "400px", padding: "50px 100px" }}>
                            <Stack sx={{ float: "left", height: "100%", width: "30%", alignItems: "center", justifyContent: "space-between" }}>
                                <Avatar src={curr?.image} sx={{ width: "300px", height: "300px", objectFit: "center", backgroundColor: "white" }} />
                                <Typography variant="h3" sx={{ fontSize: "22px" }}>
                                    <span style={{ fontWeight: 600 }}>Current Pirce :</span> € {numberWithCommas(curr?.current_price)}
                                </Typography>
                            </Stack>
                            <Stack sx={{ flexDirection: "column", gap:"5px",marginLeft:"40%",justifyContent:"center",height:"100%"}}>
                                <Typography variant='h2' sx={{ color: "otherColor.main", fontSize: { lg: "60px", md: "50px", sm: "30px" } }}>
                                    {curr?.symbol.toUpperCase()}
                                </Typography>
                                <Typography variant='h3' sx={{ color: "otherColor.main", fontSize: { lg: "40px", md: "30px", sm: "20px" } }}>
                                    {curr?.name}
                                </Typography>
                                <Typography variant='h4' sx={{ color: "otherColor.main", fontSize: { lg: "20px", md: "18px", sm: "16px" } }}>
                                Rank : {curr?.market_cap_rank}
                                </Typography>
                                <Typography variant='h4' sx={{ color: "otherColor.main", fontSize: { lg: "20px", md: "18px", sm: "16px" } }}>
                                24h Change : {curr?.price_change_percentage_24h}
                                </Typography>
                                <Typography variant='h4' sx={{ color: "otherColor.main", fontSize: { lg: "20px", md: "18px", sm: "16px" } }}>
                                Market Capital : € {numberWithCommas(curr?.market_cap)}
                                </Typography>
                            </Stack>
                        </Stack>
                    ))
                }
            </Slider>
        </Stack>
    )

}
export default Header;