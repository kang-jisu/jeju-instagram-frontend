import React, { useState, Fragment,useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import {Carousel,FailDialog} from '../../components/main';
import jAPI from '../../jejuAPIs/JejuAPIs';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function Update(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openLoad, setOpenLoad] = useState(false);
    const [openFail,setOpenFail] = useState(false);
    const [board, setBoard] = useState({});
    
    useEffect(()=>{
        setOpenLoad(true);
        jAPI.get(`/posts/${props.match.params.boardId}`)
        .then(res=>{
            if(res.data.nickname!==props.logged.id){
                alert('수정권한이 없는 사용자입니다! 피드로 돌아갑니다.')
                props.history.push("/");
            }
            else{
            setOpenLoad(false);
            console.log(res.data);
            setBoard(res.data);
            }
        })
        .catch(error=>{
            setOpenLoad(false);
            if(error.response){
            if(error.response.status===401){
                alert("알수없는 회원정보. 로그아웃시킴");
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("id");
                props.history.push("/sign/in");
            }
            else if(error.response.status===404){
                alert('수정할 게시글을 찾을 수 없습니다! 피드로 돌아갑니다.')
                props.history.push("/");
            }
            }
            console.log(error);
        })
    },[props.match.params.boardId,props.history,props.logged]);


    const goBack=()=>{
        props.history.goBack();
    }

    const handleTextChange=(e)=>{
        setBoard({...board,content:e.target.value});
    }

    const updateForm=(e)=>{
        setOpen(true);
        jAPI({
            method: 'put',
            url: `/posts/${props.match.params.boardId}`,
            data: {
                content: board.content,
                image_url: board.image_url,
            }
        })
        .then(res=>{
            setOpen(false);
            props.history.push(`/board/${props.match.params.boardId}`)
        })
        .catch(error=>{
            setOpen(false);
            setOpenFail(true);
            setTimeout(()=>setOpenFail(false),1000);
            console.log(error);

            if(error.response!==undefined){
            if(error.response.status===401){
                alert("알수없는 회원정보. 로그아웃시킴");
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("id");
                props.history.push("/sign/in");
            }
            else if(error.response.status===403){
                alert('수정 권한이 없는 사용자입니다! 피드로 돌아갑니다.')
                props.history.push("/");
            }
            else if(error.response.status===404){
                alert('수정할 게시글을 찾을 수 없습니다! 피드로 돌아갑니다.')
                props.history.push("/");
            }
            }   
            else {
            console.log(error);
            }

        })
    }

    const renderUpdateButton=(text)=>{
        if(text==="") {
            return (
            <Tooltip title="글을 작성해주세요" placement="bottom" onClick={e=>document.getElementById("content").focus()}>
                <span >수정</span>
            </Tooltip>
            )
        }   
        else return <Link to="#" onClick={updateForm}>수정</Link> 
    }

    return (
        <Fragment>
            <FailDialog
            open={openFail}
            failState="수정"
            />
            <Backdrop className={classes.backdrop} open={open}>
            <span>
                <CircularProgress color="inherit" /> <br/>
                <b>수정중 ... </b>
            </span>
            </Backdrop>
            <Backdrop className={classes.backdrop} open={openLoad}>
            <span>
                <CircularProgress color="inherit" /> <br/>
                <b>로딩중 ... </b>
            </span>
            </Backdrop>
            <div className="nav-bar header">
                <div className="nav-block">
                    <Link to="#" onClick={goBack}>이전</Link>
                </div>
                <div className="nav-block font-smaller">
                    <span >새로운 사진 게시물</span>
                </div>
                <div className="nav-block">
                    {renderUpdateButton(board.content)}
                </div>
            </div>
            
            <div className="main-content">
            <form >
                <div className="form-wrapper">
                    {Carousel(board.image_url===undefined?[]:board.image_url)}
                    <div className="text-div">
                        <textarea 
                        name="content" 
                        id = "content"
                        value={board.content} 
                        onChange={handleTextChange}
                        placeholder="문구 입력..."
                        />
                    </div>
                </div>
            </form>
            </div>
        </Fragment>
    );
}

export default withRouter(Update);
