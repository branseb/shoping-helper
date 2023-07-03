import { Button, Link, TableCell, TableRow } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { makeStyles } from "tss-react/mui";
import { Device, devicesAtom } from "../store/copareAtom";
import { loginUserAtom } from "../store/loginAtom";
import { useLoginUserSettings } from "../store/settingsAtom";
import { Delete, Edit, Language} from "@mui/icons-material";


const useStyles = makeStyles({name:'device-item'})(theme=>({
    root:{
        '& .buttons': {
        visibility: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        paddingLeft: 15,
        cursor: 'pointer'
    },
    '&:hover':{
        '& .buttons': {
            visibility: 'visible'
            
        }
    }
    }
    
    
}))

type DeviceItemTypeProps={
    device:Device;
    onEditButtonClick:()=>void;
}

export const DeviceItem = (props:DeviceItemTypeProps) => {
    const {device} = props;
    const loginUser = useAtomValue(loginUserAtom);
    const userSettings = useLoginUserSettings(loginUser.id);
    const setDevicesList =useSetAtom(devicesAtom);
    const {classes} = useStyles();
    const onDeleteDeviceButtonClick = () => {

        setDevicesList(prev=> prev.filter(dev=>dev.id!==device.id))
        console.log(`delete ${device.id}`)
    }


    if(userSettings===undefined){
        return;
    }
    return(
        <TableRow 
        className={classes.root}
        //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell align="left">{device.brand}</TableCell>
        <TableCell align="left">{device.model}</TableCell>
        <TableCell align="right">{device.price}</TableCell>
        <TableCell align="right">{device.consumptionPerYear}</TableCell>
        <TableCell align="right">{device.consumptionPerYear * userSettings.electricityPrice * 5}</TableCell>
        <TableCell align="right">{device.consumptionPerYear * userSettings.electricityPrice * 10}</TableCell>
        <TableCell align="right">{device.consumptionPerYear * userSettings.electricityPrice * 5 + device.price}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell >
            <div className={'buttons'}>
                <a href={device.url} target="_blank"><Language/></a>
                <Edit
                onClick={()=>props.onEditButtonClick()}
                />
                <Delete
                onClick={onDeleteDeviceButtonClick}
                />
            </div>
            
        </TableCell>
        
    </TableRow>
    )
    
}