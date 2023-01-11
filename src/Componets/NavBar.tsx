import { Stack, Typography, Button, Modal, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../StateHooks'
import { addCurrency ,addSymbol} from '../State Management/CurrencySlice';
import { currencies } from '../currenciesData';

interface Props {

};

let NavBar: React.FC<Props> = ({ }) => {

    const Navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const { currency } = useAppSelector(state => state.Currency)
    const { symbol } = useAppSelector(state => state.Currency)
    const [curr, setCurrency] = useState(currency);
    const dispatch = useAppDispatch()

    const findSymbol = (array:Array<any>,value:string) => {
        var symbol = null;
        array.forEach((val:any)=>{
            if(val.value == value){
                symbol = val.label;
            }
        });
        return symbol;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
        localStorage.setItem("currency", event.target.value);
        localStorage.setItem("symbol", `${findSymbol(currencies,event.target.value)}`);
        dispatch(addCurrency(event.target.value));
        dispatch(addSymbol(`${localStorage.getItem("symbol") === null ? "€" : localStorage.getItem("symbol")}`))
    };

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'JPY',
            label: '¥',
        }, {
            value: "INR",
            label: "₹"
        }, {
            value: "GBP",
            label: "£"
        }
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 3,
    };


    return (
        <>
            <Stack sx={{ width: "90%", padding: "10px 5%", backgroundColor: "primary.main", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h1" sx={{
                    fontSize: "20px", textAlign: "left", color: "text.primary", transition: ".2s", cursor: "pointer", "&:hover": {
                        color: "text.secondary"
                    }
                }} onClick={() => { Navigate("/") }}>
                    MERO CRYPTO
                </Typography>
                <Button sx={{
                    backgroundColor: "text.secondary", fontSize: "14px", fontWeight: "600", border: "none", color: "text.primary", "&:hover": {
                        backgroundColor: "text.secondary"
                    }
                }} onClick={() => { setOpen(true) }}>
                   {`( ${currency} ${symbol} ) Set Currency`}
                </Button>
            </Stack>
            <Modal open={open} onClose={() => { setOpen(false) }}>
                <Stack sx={{ ...style, backgroundColor: "primary.light", width: { lg: "40%", md: "50%", sm: "60%", xs: "70%" } }}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={currency}
                        onChange={handleChange}
                        helperText="Please Select Currency"
                        InputLabelProps={{
                            style: { color: '#ff4655', fontSize: "18px" },
                        }}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value} sx={{ color: "primary.main" }}>
                                {option.value + " ( " + option.label + " ) "}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </Modal>
        </>
    )

}
export default NavBar;