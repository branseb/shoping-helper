import { useAtom } from "jotai";
import { useLogin, usersAtom } from "../store/loginAtom";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({name:'login-form'})(theme=>({
    loginDialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 15,
    },
    buttons:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:20
    }
}))


export const LoginForm = () => {
    const {classes} = useStyles();
    const [usersList] = useAtom(usersAtom);
    const login = useLogin();
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const onLoginButtonClick = () => {
        if (usersList.find(user => user.name === name && user.password === password)) {
            login(name, password);
            setName('');
            setPassword('');
        }
        else if (usersList.find(user => user.name === name && user.password !== password)) {
            setPassword('');
            setPasswordError(true);
        }
        else if (!usersList.find(user => user.name === name)) {
            setNameError(true);
            setName('');
            setPassword('');
        }
    };

    return(
        <div className={classes.loginDialogContent}>
            <div className={classes.buttons}>
                
            </div>
            <TextField
                label='Name'
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                }}
                error={nameError}
                helperText={nameError && 'Wrong User Name!'} />
            <TextField
                label='Password'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                }}
                error={passwordError}
                helperText={passwordError && 'Wrong Password'}>

            </TextField>
            <Button
                variant="contained"
                disabled={name.length < 6 || password.length < 6}
                onClick={onLoginButtonClick}
            >Login</Button>
        </div>
    )
}