import "chart.js/auto";
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../StateHooks'
import '../index.css';
import Chart from "chart.js/auto";
import axios from "axios";
import { Stack, Button } from "@mui/material";


interface Props {
  id: any
};

let BarChat: React.FC<Props> = ({ id }) => {


  var table = "myChart";
  const [days, setDays] = useState<number>(1);
  const [historyData, setHistoryData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { currency } = useAppSelector(state => state.Currency)



  useEffect(() => {
    const getHistoryData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
        setHistoryData(res.data.prices);
        setLoading(false);
      } catch (e) {
      }

    }
    getHistoryData();

  }, [days,currency]);

  useEffect(() => {
    if (!loading) {
      var myChart = new Chart(table, {
        type: "line",
        data: {
          labels: historyData?.map((coin: any) => coin[0]).map((coin: any) => {
            let date = new Date(coin);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              label: `Price in ${currency}`,
              data: historyData?.map((coin: any) => coin[1]),
              backgroundColor: "#fce46a",
              borderColor: "#fce46a",
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 3,
            },
          ],
        },

        options: {
          plugins: {
            legend: {
              labels: {
                color: "#ff4655",
                font: {
                  size: 16,
                  family: "'Poppins', sans-serif"
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: "#ff4655",
                font: {
                  size: 12,
                  family: "'Poppins', sans-serif"
                }
              },
              display: true,
              grid: {
                display: true
              }
            },
            y: {
              ticks: {
                color: "#ff4655",
                font: {
                  size: 12,
                  family: "'Poppins', sans-serif"
                }
              },
              display: true,
              grid: {
                display: true
              }
            }
          },
        }
      });
      return () => {
        myChart.destroy()
      }
    }
  }, [loading])


  return (
    <Stack sx={{ padding: { lg: "50px 5%", md: "40px 4%", sm: "30px 3%", xs: "20px 1%" }, backgroundColor: "primary.main", gap: "30px" }}>
      <canvas id="myChart"></canvas>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between",width:{lg:"100%",md:"92%",sm:"94%",xs:"98%"} }}>
        <Button sx={{
          backgroundColor: `${days == 1 ? "text.secondary" : "transparent"}`, border: `${days == 1 ? "none" : "1px solid white"}`, fontSize: "14px", fontWeight: "600", color: "text.primary", transition: ".5s", width: `${days == 1 ? "15rem" : "100px"}`, "&:hover": {
            backgroundColor: "text.secondary"
          }
        }} onClick={() => { setDays(1) }}>
          24 Hours
        </Button>
        <Button sx={{
          backgroundColor: `${days == 30 ? "text.secondary" : "transparent"}`, border: `${days == 30 ? "none" : "1px solid white"}`, fontSize: "14px", fontWeight: "600", color: "text.primary", transition: ".5s", width: `${days == 30 ? "15rem" : "100px"}`, "&:hover": {
            backgroundColor: "text.secondary"
          }
        }} onClick={() => { setDays(30) }}>
          30 Days
        </Button>
        <Button sx={{
          backgroundColor: `${days == 90 ? "text.secondary" : "transparent"}`, border: `${days == 90 ? "none" : "1px solid white"}`, fontSize: "14px", fontWeight: "600", transition: ".5s", width: `${days == 90 ? "15rem" : "100px"}`, color: "text.primary", "&:hover": {
            backgroundColor: "text.secondary"
          }
        }} onClick={() => { setDays(90) }}>
          3 Months
        </Button>
        <Button sx={{
          backgroundColor: `${days == 365 ? "text.secondary" : "transparent"}`, border: `${days == 365 ? "none" : "1px solid white"}`, fontSize: "14px", fontWeight: "600", transition: ".5s", width: `${days == 365 ? "15rem" : "100px"}`, color: "text.primary", "&:hover": {
            backgroundColor: "text.secondary"
          }
        }} onClick={() => { setDays(365) }}>
          1 Year
        </Button>
      </Stack>
    </Stack>
  )

}
export default BarChat;