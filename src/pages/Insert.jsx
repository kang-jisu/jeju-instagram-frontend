import React, { useState, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import {Carousel} from '../components';
import jAPI from '../jejuAPIs/JejuAPIs';


function Insert(props) {
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
        props.history.goBack();
    }

    const handleTextChange=(e)=>{
        setContent(e.target.value);
    }

    const insertForm=(e)=>{
        // mock으로 테스트할때는 raw로
        // const formData = new FormData();
        // formData.append("nickname","kangjisu");
        // formData.append("content",content);
        // for(let i=0; i<props.imagesList.length; i++){
        //     formData.append("imagesList",imagesList[i]);
        // }
        // formData.append("review_date","2020-07-30");
        // jAPI.post("/boards",formData)
        // .then(res=>{
        //     console.log(String(props.imagesList.length)+content+"성공");
        // })
        // .catch(error=>{
        //     console.log("실패"+error.response);
        // })

        jAPI({
            method: 'post',
            url: '/boards',
            header: {
                'Content-Type': 'multipart/form-data',
            },
            data: {
                nickname: 'kangjisu',
                content: content,
                image_url: previewList,
                review_date : '2020-08-01'
            }
        })
        .then(res=>{
            console.log(String(props.imagesList.length)+content+"성공");
            props.successInsert();
        })
        .catch(error=>{
            console.log("실패");
            console.log(error);
            // 실패했을때 dialog 띄우기 
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
