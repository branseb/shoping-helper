import { Delete, Edit, Settings } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: 'side-menu-item' })(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        width: '100%',
        '& .buttons': {
            visibility: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            paddingLeft: 15
        },
        '&:hover': {
            '& .buttons': {
                visibility: 'visible'
            }
        }
    }
}))

type SideMenuItemTypeProps = {
    name: string;
    onItemClick: () => void;
    onSettingsButtonClick: () => void;
    onEditButtonClick: () => void;
    onDeleteButtonClick: () => void;
    selected?: boolean;

}

export const SideMenuItem = (props: SideMenuItemTypeProps) => {

    const { classes } = useStyles();

    return (
        <MenuItem selected={props.selected} >
            <div className={classes.root} onClick={props.onItemClick}>
                {props.name}
                <div className={'buttons'}>
                    <Edit onClick={e => { props.onEditButtonClick(); e.stopPropagation() }} />
                    <Settings onClick={(e) => { props.onSettingsButtonClick(); e.stopPropagation() }} />
                    <Delete onClick={(e) => { props.onDeleteButtonClick(); e.stopPropagation() }}></Delete>
                </div>
            </div>
        </MenuItem>
    )

}