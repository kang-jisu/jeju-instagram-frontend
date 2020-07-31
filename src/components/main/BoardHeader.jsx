import React, {useState} from 'react';
import "./board.css";
import {Link,withRouter} from 'react-router-dom';

import {CardHeader} from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import {BoardDialog ,FailDialog} from './';

import jAPI from '../../jejuAPIs/JejuAPIs';
import LoggedContext from '../../context/LoggedContext';


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
      jAPI.delete(`/posts/${id}`)
      .then(res=>{
          setOpenBackDrop(false);
          if(props.location.pathname!=="/") props.history.push('/'); // 디테일페이지->피드
          else props.refresh(); // 피드->피드 
      })
      .catch(error=>{
        console.log(error.response);
        setOpenBackDrop(false);
        setOpenFail(true);
        setTimeout(()=>setOpenFail(false),1000);
        if(error.response!==undefined){
        if(error.response.status===401){
          alert("알수없는 회원정보. 로그아웃시킴");
          window.localStorage.removeItem("accessToken");
          window.localStorage.removeItem("id");
          props.history.push("/sign/in");
        }
        else if(error.response.status===403){
            alert('삭제 권한이 없는 사용자입니다! 피드로 돌아갑니다.')
            props.history.push("/");
        }
        else if(error.response.status===404){
            alert('삭제할 게시글을 찾을 수 없습니다! 피드로 돌아갑니다.')
            props.history.push("/");
        }
        }
      })
  }

  const classes = useStyles();  
    return (
        <LoggedContext.Consumer>
          {logged=>{return(
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
         handleClose={handleClose}
         handleUpdate={()=>handleUpdate(props.board.post_id)}
         handleDeleteDialog={handleDeleteDialog}
         handleDeleteClose={handleDeleteClose}
         handleDelete={()=>handleDelete(props.board.post_id)}
        />
        <CardHeader className="bg-white">
             <Link to={{
                 pathname:`/${props.board.nickname}`,
                 }} className="text-body font-weight-bold text-monospace" >
                 {props.board.nickname}
             </Link>
             {logged.logged===false?null:logged.id===props.board.nickname?
             <IconButton className={classes.menu} onClick={handleClickOpen}>
                <MenuIcon />
            </IconButton>
            :null}
        </CardHeader>
        </>
        )}}
        </LoggedContext.Consumer>
    );
}

export default withRouter(BoardHeader);