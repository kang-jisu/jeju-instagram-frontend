import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialogList:{
        backgroundColor:'#2E2E2Ee1',
        width:'300px'
    },
    dialogListTitle:{
        textAlign:'center',
        borderBottom:'1px solid gray',
        color:'white',
    },
    dialogListItem:{
        textAlign:'center',
        color:'white'
    },
    dialogListDeleteItem:{
        color:'#e57373',
        borderTop:'1px solid gray',
        textAlign:'center'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
  

function BoardDialog(props) {
  const classes = useStyles();
    return (
        <>
        <Backdrop className={classes.backdrop} open={props.openBackDrop}>
            <span>
                <CircularProgress color="inherit" /> <br/>
                <b>삭제중 ... </b>
            </span>
        </Backdrop>
        <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-label="default Menu Dialog"
        >
        <List className={classes.dialogList}>
            <ListItem button className={classes.dialogListItem} onClick={props.handleUpdate}>
                <ListItemText >수정</ListItemText>
            </ListItem>
            <ListItem button className={classes.dialogListDeleteItem} onClick={props.handleDeleteDialog}>
                <ListItemText >삭제</ListItemText>
            </ListItem>
        </List>
        </Dialog>

        <Dialog
        open={props.openDelete}
        keepMounted
        onClose={props.handleDeleteClose}
        TransitionComponent={Transition}
        aria-label="delete Dialog"
        >
        <List className={classes.dialogList}>
            <ListItem className={classes.dialogListTitle}>
                <ListItemText >게시물을 삭제하시겠어요?</ListItemText>
            </ListItem>
            <ListItem button className={classes.dialogListItem} onClick={props.handleDeleteClose}>
                <ListItemText >취소</ListItemText>
            </ListItem>
            <ListItem button className={classes.dialogListDeleteItem} onClick={props.handleDelete}>
                <ListItemText >삭제</ListItemText>
            </ListItem>
        </List>
        </Dialog>
        </>
    );
}

export default BoardDialog;