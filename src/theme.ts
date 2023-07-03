import { createTheme } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";

export const darkTheme = createTheme({
   /* palette:{
        text:{
            primary:'#fff',
            secondary:'rgba(255, 255, 255, 0.7)',
            disabled:'rgba(255, 255, 255, 0.5)',
        },
        action:{
            active:'#fff',
            hover:'rgba(255, 255, 255, 0.08)',
            selected:'rgba(255, 255, 255, 0.16)',
            disabled:'rgba(255, 255, 255, 0.3)',
            disabledBackground:'rgba(255, 255, 255, 0.12)',
        },
        background:{
            default:'#121212',
            paper:'#121212',
        },
        //divider:'rgba(255, 255, 255, 0.12)',
    }*/
    palette:{
        primary: deepOrange,
        secondary: {
            main: '#0b2027'
        },
        divider: grey[900],
        error: deepOrange,
        background: {
          default: deepOrange[900],
          paper: deepOrange[700],
        },
        text: {
          primary: '#fff',
          secondary: '#fff',
        },
    },
})