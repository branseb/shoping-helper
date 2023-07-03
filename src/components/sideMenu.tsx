import { Button, Divider, MenuList } from '@mui/material';
import { Compare, comparesAtom, newCompareForm, selectedCompareAtom } from '../store/copareAtom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { SideMenuItem } from './sideMenuItem';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { loginUserAtom } from '../store/loginAtom';


const useStyles = makeStyles({ name: 'side-menu-panel' })(theme => ({
    item: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    },
    selectedItem: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
        border: '2px solid',
        borderRadius: 5,
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexGrow: 1
    }
}))

type SideMenuTypeProps = {
    onCloseButtonClick: () => void;
    classes?: Partial<ReturnType<typeof useStyles>['classes']>
}

export const SideMenu = (props: SideMenuTypeProps) => {
    const [compares,setCompares] = useAtom(comparesAtom);
    const [selectedCompare, setSelectedCompare] = useAtom(selectedCompareAtom);
    const logingUser = useAtomValue(loginUserAtom);
    const openAddNewCompare = useSetAtom(newCompareForm);
    const { classes } = useStyles(undefined, { props });
    const navigate = useNavigate();
    const userCompares = compares.filter(compare => compare.ownerId === logingUser.id);

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

    const onDeleteButtonClick = (compareId : string) => {
        setCompares(prev => prev.filter(dev => dev.id !== compareId))
    }

    const onSettingsButtonClick = () => {
        navigate('/settings');
        props.onCloseButtonClick()
    }

    return (
        <div className={classes.root}>
            <h1>Side Menu</h1>
            <div className={classes.items} >
                <MenuList>
                    {userCompares.map((compare) =>
                        <SideMenuItem
                            key={compare.id}
                            name={compare.name}
                            selected={compare === selectedCompare}
                            onItemClick={() => onItemClick(compare)}
                            onEditButtonClick={() => onEditButtonClick(compare)}
                            onSettingsButtonClick={() => onItemSettingsButtonClick(compare)}
                            onDeleteButtonClick={() => onDeleteButtonClick(compare.id)} />

                    )}
                    <div className={classes.item}>
                        <Button
                            variant='contained'
                            onClick={() => openAddNewCompare(true)}>
                            <AddCircleOutlineIcon />
                        </Button>
                    </div>
                </MenuList>
            </div>
            <div className={classes.item}>
                <Button
                    variant='contained'
                    onClick={() => onSettingsButtonClick()}>
                    Settings
                </Button>
            </div >
        </div>
    )
}