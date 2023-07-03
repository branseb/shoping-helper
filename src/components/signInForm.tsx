import { Button, TextField } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { User, loginUserAtom, useLogin, useRegisterAndLogin, useRegisterValidation, usersAtom } from "../store/loginAtom";

const useStyles = makeStyles({ name: 'login-form' })(theme => ({
    loginDialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 15,
    }
}));

type SignInFormTypeProps = {
    onSignIn: () => void;
}

export const SignInForm = (props: SignInFormTypeProps) => {
    const { classes } = useStyles();
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [verificationPassword, setVerificationPassword] = useState<string>('');
    const { nameError, passwordError, wrongVeriPasswordError, userExists } = useRegisterValidation(name, password, verificationPassword);
    const valid = useMemo(() => !nameError && !passwordError && !wrongVeriPasswordError && !userExists,
        [nameError, passwordError, wrongVeriPasswordError, userExists]);

    const registerAndLogin = useRegisterAndLogin()

    const onSignInButtonClick = useCallback(() => {
        if (valid)
            registerAndLogin(name, password);
    }, [valid, name, password]);

    return (
        <div className={classes.loginDialogContent}>
            <TextField
                label='Name'
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
                error={nameError || userExists}
                helperText={nameError ? 'Wrong User Name!' : userExists ? 'User Name exist!' : 'Minimum 6 characters'} />
            <TextField
                label='Password'
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                error={passwordError}
                helperText={passwordError ? 'Minimum 6 Charecters!' : 'Minimum 6 Charecters'}>

            </TextField>
            <TextField
                label='Password'
                value={verificationPassword}
                onChange={(e) => {
                    setVerificationPassword(e.target.value);
                }}
                error={wrongVeriPasswordError}
                helperText={wrongVeriPasswordError ? 'Passwords must be the same!' : ' Please write the same password'}>

            </TextField>

            <Button
                variant="contained"
                disabled={!valid}
                onClick={onSignInButtonClick}
            >Sign in</Button>
        </div>
    )
}