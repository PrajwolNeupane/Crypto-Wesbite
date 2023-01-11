import { Stack, Typography, Avatar } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../StateHooks'
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
    const Navigate = useNavigate();

    const settings = {
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        draggable: false,
        arrows: false,
        useCSS: true
    };
    const responsive = [
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
            }
        },
    ]

    const { trendingcoin } = useAppSelector(state => state.TrendingCoin)
    const { symbol } = useAppSelector(state => state.Currency)


    return (
        <Stack sx={{ height: "450px", background: "linear-gradient(to Left,rgb(255, 70, 85,.6), rgb(255, 70, 85,1)) ,url(https://usa.visa.com/content/dam/VCOM/regional/na/us/Solutions/visa-crypto-opportunities-1920x720.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
            <Slider {...settings} className="slide" responsive={responsive} slidesToShow={3} slidesToScroll={1}>
                {
                    trendingcoin.map((curr: any, index: number) => (
                        <Stack sx={{ height: "100rem", padding: "75px 0px", alignItems: 'center', gap: "100px" }}>
                            <Avatar src={curr?.image} sx={{
                                width: "12rem", height: "12rem", marginLeft: "50%", transform: "translateX(-50%)", backgroundColor: "white", border: "5px solid white", transition: "0.25s", ":hover": {
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", border: "5px solid #272729"
                                }, cursor: "pointer"
                            }} onClick={() => { Navigate(curr?.id) }} />
                            <Typography sx={{ textAlign: "center", fontSize: "30px" }} variant="h2">{curr?.symbol.toUpperCase()}</Typography>
                            <Typography sx={{ textAlign: "center", fontSize: "20px" }} variant="h3">{curr?.name}</Typography>
                            <Typography variant="h4" sx={{ textAlign: "center", fontSize: "16px" }}>{`Current Price : ${symbol} ` + numberWithCommas(curr?.current_price)}</Typography>
                            <Typography variant="h4" sx={{ textAlign: "center", fontSize: "16px" }}>{`Market Cap : ${symbol} ` + numberWithCommas(Math.trunc(curr?.market_cap / 10000)) + "M"}</Typography>
                        </Stack>
                    ))
                }
            </Slider>
        </Stack>
    )

}
export default Header;