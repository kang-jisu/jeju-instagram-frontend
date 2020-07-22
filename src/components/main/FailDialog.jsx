import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BlockIcon from '@material-ui/icons/Block';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialog:{
        backgroundColor:'white',
    },
}));
  

function FailDialog(props) {
  const classes = useStyles();
    return (
        <>
        <Dialog
        open={props.open}
        keepMounted
        // onClose={props.handleDeleteClose}
        TransitionComponent={Transition}
        aria-label="fail dialog"
        >
        <List className={classes.dialog}>
            <ListItem >
                <ListItemText ><BlockIcon style={{ color: 'e57373' }}/> {props.failState}에 실패했습니다</ListItemText>
            </ListItem>
        </List>
        </Dialog>
        </>
    );
}

export default FailDialog;