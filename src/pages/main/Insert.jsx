import React, { useState, Fragment } from 'react';
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

function Insert(props) {
    // backdrop material-ui
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openFail,setOpenFail] = useState(false);

    // main code 
    const setPreviewList = () =>{
        let previewList =  [];
        for(let i =0; i<props.imagesList.length; i++){
            previewList.push(String(URL.createObjectURL(props.imagesList[i])))
        }       
        return previewList;
    }

    const [content, setContent] = useState("");
    const [previewList] = useState(setPreviewList);

    const goBack=()=>{
        // TODO 알아보기 ==> 뒤로가기하면 한번 더 전송되는거같기도하고 ,, /?
        props.history.goBack();
    }

    const handleTextChange=(e)=>{
        setContent(e.target.value);
    }

    const insertForm=(e)=>{
        // mock으로 테스트할때는 raw로
        // const formData = new FormData();
        // formData.append("nickname",window.localStorage.getItem("accessToken"));
        // formData.append("content",content);
        // for(let i=0; i<props.imagesList.length; i++){
        //     formData.append("imagesList",imagesList[i]);
        // }
        // formData.append('image_url',previewList);
        // formData.append("review_date","2020-07-30");
        // jAPI.post("/boards",formData)
        // .then(res=>{
        //     console.log(String(props.imagesList.length)+content+"성공");
        // })
        // .catch(error=>{
        //     console.log("실패"+error.response);
        // })
        setOpen(true);
        jAPI({
            method: 'post',
            url: '/posts',
            data:{
                content: content,
                image_url: previewList,
            },
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
        })
        .then(res=>{
            setOpen(false);
            props.successInsert();
        })
        .catch(error=>{
            setOpen(false);
            setOpenFail(true);
            setTimeout(()=>setOpenFail(false),1000);
            if(error.response.status===401){
                alert("알수없는 회원정보. 로그아웃시킴");
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("id");
                props.history.push("/sign/in");
            }
            else {
            console.log(error);
            }
        })
        

    }

    const renderInsertButton=(text)=>{
        if(text==="") {
            return (
            <Tooltip title="글을 작성해주세요" placement="bottom" onClick={e=>document.getElementById("content").focus()}>
                <span >등록</span>
            </Tooltip>
            )
        }   
        else return <Link to="#" onClick={insertForm}>등록</Link> 
    }

    return (
        <Fragment>
            <FailDialog
            open={openFail}
            failState="등록"
            />
            <Backdrop className={classes.backdrop} open={open}>
            <span>
                <CircularProgress color="inherit" /> <br/>
                <b>등록중 ... </b>
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
                    {renderInsertButton(content)}
                </div>
            </div>
            
            <div className="main-content">
            <form >
                <div className="form-wrapper">
                    {Carousel(previewList)}
                    <div className="text-div">
                        <textarea 
                        name="content" 
                        id = "content"
                        value={content} 
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

export default withRouter(Insert);
