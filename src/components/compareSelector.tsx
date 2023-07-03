import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { loginUserAtom } from "../store/loginAtom"
import { Compare, comparesAtom, devicesAtom, newCompareForm, selectedCompareAtom } from "../store/copareAtom";
import { SideMenuItem } from "./sideMenuItem";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: 'compare-selector' })(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10%',
        gap: 15,
    }
}))

export const CompareSelector = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const loginUser = useAtomValue(loginUserAtom);
    const [compares, setCompares] = useAtom(comparesAtom);
    const [selectedCompare, setSelectedCompare] = useAtom(selectedCompareAtom);
    const openAddNewCompare = useSetAtom(newCompareForm);
    const setDevices = useSetAtom(devicesAtom);
    const comparesByLoginUserId = compares.filter(compare => compare.ownerId === loginUser.id);

    const onEditButtonClick = (compare: Compare) => {
        console.log('click')
        navigate(`/edit/:${compare.id}`)

    };

    const onItemSettingsButtonClick = (compare: Compare) => {
        navigate(`/table/:${compare.id}`);
    };

    const onItemClick = (compare: Compare) => {
        setSelectedCompare(compare)
        navigate(`table/${compare.id}`)
    };

    const onDeleteButtonClick = (compareId: string) => {
        setCompares(prev => prev.filter(compare => compare.id !== compareId))
        setDevices(prev => prev.filter(device => device.idOfCompare !== compareId))
    }

    return (
        <div>
            {loginUser.id && <div className={classes.root}>
                {comparesByLoginUserId.length < 1
                    ? <Typography>You don`t have any compares</Typography>
                    : <Typography>Your compare{comparesByLoginUserId.length > 1 && 's'}:</Typography>
                }

                {comparesByLoginUserId.map(compare => <SideMenuItem
                    key={compare.id}
                    name={compare.name}
                    selected={compare === selectedCompare}
                    onItemClick={() => onItemClick(compare)}
                    onEditButtonClick={() => onEditButtonClick(compare)}
                    onSettingsButtonClick={() => onItemSettingsButtonClick(compare)}
                    onDeleteButtonClick={() => onDeleteButtonClick(compare.id)}
                ></SideMenuItem>)}
                <Button
                    variant='contained'
                    onClick={() => openAddNewCompare(true)}>
                    <AddCircleOutline />
                </Button>
            </div>}
        </div>
    )
}