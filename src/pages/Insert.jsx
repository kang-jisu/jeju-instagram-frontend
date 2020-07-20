import React, { useState, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

import {Carousel} from '../components';


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
        alert(String(props.imagesList.length)+content);
    
        // axios -> [POST] /boards 
        // 성공하면 
        // this.props.history.push("/")
        // 실패 
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
