import { Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Device, devicesAtom } from "../store/copareAtom";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";

const useStyles = makeStyles({ name: 'add-new-dialog-content' })(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 15
    }
}))

type AddNewDeviceTypeProps = {
    onAdd: () => void,
    idOfCompare: string,
    device?: Device
}

export const AddNewDevice = (props: AddNewDeviceTypeProps) => {

    const { classes } = useStyles();
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [consumptionPerYear, setConsumptionPerYear] = useState<number>();
    const [devicesList, setDevicesList] = useAtom(devicesAtom);

    useMemo(() => {
        if (props.device) {
            setBrand(props.device.brand);
            setModel(props.device.model);
            setUrl(props.device.url);
            setPrice(props.device.price);
            setConsumptionPerYear(props.device.consumptionPerYear);
        }
    }, [props.device])


    const device: Device = {
        id: "",
        brand: "",
        model: "",
        url: "",
        price: 0,
        consumptionPerYear: 0,
        idOfCompare: ""
    }

    const onAddDeviceButtonClick = () => {
        if (price && consumptionPerYear)
            if (props.device) {
                const otherDevices = devicesList.filter(device => device.id !== props.device?.id);
                setDevicesList([...otherDevices, {
                    id: props.device.id,
                    brand,
                    model,
                    url,
                    price,
                    consumptionPerYear,
                    idOfCompare: props.device.idOfCompare
                }])

            }
            else {
                setDevicesList([...devicesList,
                {
                    id: Math.random().toString(25),
                    brand,
                    model,
                    url,
                    price,
                    consumptionPerYear,
                    idOfCompare: props.idOfCompare
                }]);
            }

        props.onAdd();
    }

    return (
        <div className={classes.root} >
            <Typography>New Device</Typography>
            <TextField
                label='Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <TextField
                label='Model'
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
            <TextField
                label='URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <TextField
                label='Price'
                value={price??''}
                type="number"
                onChange={(e) => setPrice(+e.target.value)}
            />

            <TextField
                label='Consumption per Year'
                value={consumptionPerYear??''}
                type='number'
                onChange={(e) => setConsumptionPerYear(+e.target.value)}
            />

            <Button
                disabled={!price || !consumptionPerYear}
                variant="contained"
                onClick={onAddDeviceButtonClick}
            >{props.device?'Save':'Add'}</Button>
        </div>
    )
}