import { Button, InputAdornment, TextField } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { Fragment, useState } from "react";
import { loginUserAtom } from "../store/loginAtom";
import { UserSettingsType, usersSettingsAtom } from "../store/settingsAtom";

export const UserSettings = () => {
    const [usersSettings, setUsersSettings] = useAtom(usersSettingsAtom);
    const loginUser = useAtomValue(loginUserAtom);
    const loginUserSettings = usersSettings.find(userSettings => userSettings.idOfUser === loginUser.id)
    const [electricityPrice, setElecticityPrice] = useState<number>(loginUserSettings?.electricityPrice??0)
    

    const onSaveButtonClick = () =>{
        if(electricityPrice){
        const otherUsersSettings = usersSettings.filter(us => us.idOfUser !== loginUser.id) 
        const newUserSettings:UserSettingsType = {
            idOfUser:loginUser.id,
            electricityPrice:electricityPrice
        };
        setUsersSettings([...otherUsersSettings,newUserSettings])}
        else throw new Error;
    };

    

    if (!loginUserSettings)
        return null

    return (
        <Fragment>
            <p>{loginUser.name}</p>
            <TextField
                required
                label='Electricity Price'
                value={electricityPrice}
                InputProps={{ endAdornment: <InputAdornment position="end">€/kwh</InputAdornment>, }}
                type="number"
                onChange={(e) => setElecticityPrice(+e.target.value)}
            />
            <Button
                variant="contained"
                onClick={onSaveButtonClick}
                disabled={loginUserSettings?.electricityPrice===electricityPrice||electricityPrice===undefined}>
                Save
            </Button>
        </Fragment>
    )
}