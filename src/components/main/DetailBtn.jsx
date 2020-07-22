import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    web: {
        width:'400px'
    },
    mobile: {
        width:'99%'
    }
  }));
  
function DetailBtn(props) {

  const classes = useStyles();
    return (
        <div className={classes.root}>
        <ButtonGroup 
         color="primary"
         orientation={props.screen==="web"?"horizontal":"vertical"}
         className={props.screen==="mobile"?classes.mobile:null}
        >
            <Button className={props.screen==="web"?classes.web:classes.mobile}>수정</Button>
            <Button className={props.screen==="web"?classes.web:classes.mobile}>삭제</Button>
        </ButtonGroup>
        </div>
    );
}

export default DetailBtn;