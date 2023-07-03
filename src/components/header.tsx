import { Menu as MenuIcon } from '@mui/icons-material';
import { Avatar, Button } from "@mui/material";
import { useAtom } from "jotai";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { loginUserAtom } from "../store/loginAtom";

const useStyles = makeStyles({ name: 'header' })(theme => ({
    header: {
        display: 'flex',
        //width: '100%',
        backgroundColor: theme.palette.secondary.main,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
    },
    navigationPanel: {
        display: 'flex',
        gap: 10
    },
    loginContent:{
        display:'flex',
        flexDirection:'row',
        gap:15,
    }
}));
type HeaderTypeProps = {
    onMenuButtonClick: () => void
}

export const Header = (props: HeaderTypeProps) => {

    const { classes } = useStyles();
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useAtom(loginUserAtom)

    const emptyUser = {
        id: '',
        name: '',
        password: ''
    }

    return (
        <Fragment>
            <div id='header' className={classes.header}>
                <div className={classes.navigationPanel} >
                    {loginUser.id && <Button onClick={() => props.onMenuButtonClick()}><MenuIcon /></Button>}
                    <Button color='primary' variant="contained" onClick={() => { navigate('/') }}>Home</Button>
                </div>
                {loginUser.id
                    &&<div className={classes.loginContent}>
                    <Avatar>{loginUser.name.toLocaleUpperCase()[0]}</Avatar> 
                    <Button variant="outlined" onClick={() => setLoginUser(emptyUser)}>Logout</Button>
                    </div>
                }
            </div>
        </Fragment>
    )


}