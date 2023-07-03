import { Typography } from "@mui/material"
import { useRouteError } from "react-router-dom";

export const ErrorPage = () =>{

const error:any = useRouteError();

    return(
        <>
<Typography>Ups... Something its wrong!</Typography>
<h2>{error.message}</h2>
</>
    )
}