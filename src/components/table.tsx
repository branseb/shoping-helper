import { AddCircleOutline } from '@mui/icons-material';
import { Button, Dialog, Paper, TableBody, TableCell, TableContainer, TableHead, Table as TableMui, TableRow, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from 'tss-react/mui';
import { Device, selectedCompareAtom, useDevicesByCompareId } from "../store/copareAtom";
import { AddNewDevice } from "./AddNewDevice";
import { DeviceItem } from "./deviceItem";
import { loginUserAtom } from '../store/loginAtom';

const useStyles = makeStyles({ name: 'table' })(theme => ({
    root: {
        padding: '5%'
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '15px',

    }
}))
export const Table = () => {
    const { id = '' } = useParams();
    const [openAddNewDeviceDialog, setOpenAddNewDeviceDialog] = useState<boolean>(false);
    const selectedCompare = useAtomValue(selectedCompareAtom);
    const devices = useDevicesByCompareId(id);
    const [editDialog, setEditDialog] = useState<Device | undefined>(undefined);
    const { classes } = useStyles();
    const loginUser = useAtomValue(loginUserAtom);


    return (
        <Fragment>
            {loginUser.id && <div className={classes.root} >
                <Typography variant="h5">Compare : {selectedCompare.name}</Typography>
                <TableContainer component={Paper}>
                    <TableMui>
                        <TableHead>
                            <TableRow>
                                <TableCell >Brand</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell align='right'>Price (€)</TableCell>
                                <TableCell align='right'>Consumption per Year (kw)</TableCell>
                                <TableCell align='right'>Price of electricity per 5Years (€)</TableCell>
                                <TableCell align='right'>Price of electricity per 10Years (€)</TableCell>
                                <TableCell align='right'>Total price per 5Years (€)</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devices.map(device =>
                                <DeviceItem
                                    key={device.id}
                                    device={device}
                                    onEditButtonClick={() => { setEditDialog(device) }} />
                            )}
                        </TableBody>
                    </TableMui>
                </TableContainer>
                <div className={classes.addButton}>
                    <Button

                        size='small'
                        variant='contained'
                        onClick={() => setOpenAddNewDeviceDialog(true)}>
                        <AddCircleOutline />
                    </Button>
                </div>

                <Dialog
                    open={openAddNewDeviceDialog}
                    onClose={() => setOpenAddNewDeviceDialog(false)}>
                    <AddNewDevice
                        idOfCompare={id}
                        onAdd={() => setOpenAddNewDeviceDialog(false)} />
                </Dialog>
                <Dialog
                    open={editDialog !== undefined}
                    onClose={() => setEditDialog(undefined)}>
                    <AddNewDevice
                        device={editDialog}
                        idOfCompare={id}
                        onAdd={() => setEditDialog(undefined)} />
                </Dialog>
            </div>
            
            }
        </Fragment>
    )
}