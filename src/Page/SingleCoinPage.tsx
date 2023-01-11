import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { Markup } from 'interweave';
import '../index.css';
import BarChat from '../Componets/BarChat';

interface Props {

};
interface DataType {
    image: {
        large?: string
    },
    description: {
        en?: string
    },
    name?: string,
    symbol?: string,
    links: {
        homepage: Array<string>
    }
}


let SingleCoinPage: React.FC<Props> = ({ }) => {
    const { id } = useParams();
    const [data, setData] = useState<DataType>({ image: {}, description: {}, links: { homepage: [""] } });
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const getAllCoinData = async () => {
            try {
                const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
                setData(res.data);
                setLoading(false);
            } catch (e) {

            }
        }
        getAllCoinData();
    }, []);

    return (
        <>
            <Stack sx={{ backgroundColor: "text.secondary", padding: "2% 3%", flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" }, gap: "50px" }}>
                {
                    loading ? <></> : <><Stack sx={{ alignItems: "center", gap: "5px", justifyContent: "center" }}>
                        <Avatar src={data?.image?.large} sx={{ width: "20rem", height: "20rem" }} />
                        <Typography variant='h2' sx={{ color: "primary.main", fontSize: "40px" }}>{data?.symbol?.toUpperCase()}</Typography>
                        <a href={data?.links?.homepage[0]} target={"blank"}>Official Site</a>
                    </Stack>
                        <Stack>
                            <Typography variant='h3' sx={{ color: "primary.main", fontSize: "30px" }}>{data?.name}</Typography>
                            <Markup content={data?.description?.en} className="markup-text" />
                        </Stack></>
                }
            </Stack>
            <BarChat id={id} />
        </>
    )
}

export default SingleCoinPage;