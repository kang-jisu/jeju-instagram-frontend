import React, {useState} from 'react';
import "./board.css";
import {Link,withRouter} from 'react-router-dom';

import {CardHeader} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import {BoardDialog ,FailDialog} from './';

import jAPI from '../../jejuAPIs/JejuAPIs';


const useStyles = makeStyles((theme) => ({
    menu:{
        position:'absolute',
        right: '0',
        top: '0',
        padding: '12px 20px'
    },
}));
  

function BoardHeader(props) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openBackDrop,setOpenBackDrop] = useState(false);
  const [openFail,setOpenFail] = useState(false);

  // 기본 메뉴 다이얼로그
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 삭제 다이얼로그
  const handleDeleteDialog = () =>{
    setOpen(false);
    setOpenDelete(true);
  }
  const handleDeleteClose = () =>{
    setOpenDelete(false);
  }

  //수정
  const handleUpdate=(id)=>{
    setOpen(false);
    props.history.push(`/update/${id}`)
  }

  //삭제
  const handleDelete=(id)=>{
      setOpenDelete(false);
      setOpenBackDrop(true);

      jAPI.delete(`/boards/${id}`)
      .then(res=>{
          setOpenBackDrop(false);
          props.history.push('/');
          props.refresh();
      })
      .catch(error=>{
          console.log(error.response);
          setOpenBackDrop(false);
          setOpenFail(true);
          setTimeout(()=>setOpenFail(false),1000);
      })
  }


  const classes = useStyles();
    return (
        <>
        <FailDialog
        open={openFail}
        failState="삭제"
        />
        <BoardDialog
         open={open}
         openDelete={openDelete}
         openBackDrop={openBackDrop}
         handleClickOpen={handleClickOpen}
         hanldeClose={handleClose}
         handleUpdate={()=>handleUpdate(props.board.id)}
         handleDeleteDialog={handleDeleteDialog}
         handleDeleteClose={handleDeleteClose}
         handleDelete={()=>handleDelete(props.board.id)}
        />
        <CardHeader className="bg-white">
             <Link to={{
                 pathname:`./${props.board.nickname}`,
                 }} className="text-body font-weight-bold text-monospace " >
                 {props.board.nickname}
             </Link>
             <IconButton className={classes.menu} onClick={handleClickOpen}>
                <MenuIcon />
            </IconButton>
        </CardHeader>
        </>
    );
}

export default withRouter(BoardHeader);