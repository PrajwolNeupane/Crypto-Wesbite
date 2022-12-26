import { Theme, createTheme, } from "@mui/material";


const font = "'Poppins', sans-serif";
const theme : Theme = createTheme({
    palette:{
        primary:{
        main: "#272729",
        light: "#3a3a3d"
        },
        secondary:{
        main:"#f5f0ec",
        light:"#fce46a",
        },
        text:{
          primary:"#ffffff",
          secondary:"#ff4655"
        }
        // text:{
        //   light:"#8e9e9d"
        // },
        // otherColor:{
        // main:"#999"
        // }
    },
    // overrides: {
    //     MuiAppBar: {
    //       colorPrimary: {
    //         backgroundColor: "#232f3e",
    //       },
    //     },
    //   },
    components:{
      MuiTypography:{
        defaultProps:{
          
        },
      }
    },
      typography:{
        button: {
          textTransform: 'none'
        },
        fontFamily:font,
        h1:{fontWeight:700},
        h2:{fontWeight:600},
        h3:{fontWeight:500},
        h4:{fontWeight:400},
        h5:{fontWeight:300},
        h6:{fontWeight:300},
      },
        
}) ;
export default theme;