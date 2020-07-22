import React, { useState, Fragment,useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import {Carousel,FailDialog} from '../../components/main';
import jAPI from '../../jejuAPIs/JejuAPIs';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/ko';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function Update(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openFail,setOpenFail] = useState(false);
    const [board, setBoard] = useState({});
    
    useEffect(()=>{
        jAPI.get(`/boards/${props.match.params.boardId}`)
        .then(res=>{
            console.log(res.data);
            setBoard(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[props.match.params.boardId]);


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
            url: `/boards/${props.match.params.boardId}`,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            data: {
                nickname: board.nickname,
                content: board.content,
                image_url: board.image_url,
                review_date : moment(new Date()).format('YYYY-MM-DD'),
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
