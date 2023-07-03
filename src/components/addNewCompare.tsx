import { Button, TextField } from "@mui/material"
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Fragment, useState } from "react"
import { makeStyles } from "tss-react/mui";
import { comparesAtom, newCompareForm } from "../store/copareAtom";
import { loginUserAtom } from "../store/loginAtom";

const useStyles = makeStyles({name:'add-new-compare'})(theme=>({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        padding: 10
    }
}))

export const AddNewCompare = () => {
    const [compares, setCompares] = useAtom(comparesAtom);
    const [newCompareName, setNewCompareName] = useState<string>('');
    const {classes} = useStyles();
    const loginUser = useAtomValue(loginUserAtom);
    const openAddNewCompareForm = useSetAtom(newCompareForm);

    const addNewCampare = () => {
        setCompares([...compares, {name:newCompareName, id:Math.random().toString(23), ownerId:loginUser.id}]);
        setNewCompareName('');
        openAddNewCompareForm(false);


    }

    return(
        <div className={classes.dialogContent}>
                    
                         <Fragment>
                            <TextField
                                label='new Compare'
                                value={newCompareName}
                                onChange={(e) => setNewCompareName(e.target.value)}></TextField>
                            <Button
                                variant="contained"
                                disabled={newCompareName.trim().length < 5}
                                onClick={addNewCampare}
                            >Save</Button>
                        </Fragment>
                    

                </div>
    )
}