import { Stack, Typography } from "@mui/material"

interface Props{

};

let NavBar:React.FC<Props> = ({}) => {

    return (
        <Stack sx={{width:"90%",padding:"10px 5%",backgroundColor:"primary.main",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Typography variant="h1" sx={{fontSize:"20px",textAlign:"left",color:"text.primary",transition:".2s","&:hover":{
            color:"text.secondary"
        }}}>
                MERO<br/>CRYPTO
            </Typography>
            <Typography variant="h3" sx={{fontSize:"16px",textAlign:"left",color:"text.primary",transition:".2s","&:hover":{
            color:"text.secondary"
        }}}>
                Agents
            </Typography>
            <Typography variant="h3" sx={{fontSize:"16px",textAlign:"left",color:"text.primary",transition:".2s","&:hover":{
            color:"text.secondary"
        }}}>
                Maps
            </Typography>
            <Typography variant="h3" sx={{fontSize:"16px",textAlign:"left",color:"text.primary",transition:".2s","&:hover":{
            color:"text.secondary"
        }}}>
                Agents
            </Typography>

        </Stack>
    )

}
export default NavBar;