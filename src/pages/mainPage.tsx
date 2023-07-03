import { Dialog, Drawer, Typography, Tab, Switch } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { AddNewCompare } from "../components/addNewCompare";
import { Header } from "../components/header";
import { SideMenu } from "../components/sideMenu";
import { newCompareForm, selectedCompareAtom } from '../store/copareAtom';
import { loginUserAtom } from "../store/loginAtom";
import { LoginForm } from "../components/loginForm";
import { SignInForm } from "../components/signInForm";
import { TabContext, TabList, TabPanel } from '@mui/lab';

const useStyles = makeStyles({ name: 'homePage' })(theme => ({
    loginWindow: {
        display: 'flex',
        flexDirection:'column',
        width: '100%',
        padding: '10%',
        justifyContent: 'center',
        alignItems:'center'
    }

}))

export const MainPage = () => {
    const { classes } = useStyles();
    const [showMenuDraWer, setShowMenuDrawer] = useState<boolean>(false);
    const [showAddNewCompare, setShowAddNewCompare] = useAtom(newCompareForm);
    const loginUser = useAtomValue(loginUserAtom);
    const [form, setForm] = useState<string>('login');

    const onTabHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setForm(newValue)
    }

    return (

        <Fragment>
            <Header
                onMenuButtonClick={() => setShowMenuDrawer(true)}
            />
            {!loginUser.id&&<div className={classes.loginWindow}>
                <TabContext value={form}>
                    <TabList onChange={onTabHandleChange}>
                        <Tab label='Log In' value='login' />
                        <Tab label='Sign In' value='signin' />
                    </TabList>
                    <TabPanel value='login'>
                        <LoginForm />
                    </TabPanel>
                    <TabPanel value='signin'>
                        <SignInForm onSignIn={()=>setForm('login')} />
                    </TabPanel>
                </TabContext>
            </div>}
            <Fragment>
                <Drawer
                    open={showMenuDraWer}
                    onClose={() => setShowMenuDrawer(false)}>
                    <SideMenu onCloseButtonClick={() => setShowMenuDrawer(false)} />
                </Drawer>
                <Dialog
                    open={showAddNewCompare}
                    onClose={() => setShowAddNewCompare(false)}>
                    <AddNewCompare />
                </Dialog>
            </Fragment>
            <Outlet />
        </Fragment>
    )
}