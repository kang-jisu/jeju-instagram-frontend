import React, {useState,useEffect } from 'react';
import {Route, Switch,withRouter} from 'react-router-dom';

import {Feed,Profile,Insert,Detail} from '../pages';
import {MenuBar,InsertMenuBar} from '../components';

const maxFileNumber = 5; // 인스타 한 게시글에 올릴 수 있는 파일 개수 . 일단 3개정도로만 해둠

function Main(props) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [page, setPage] = useState("feed");

    ////// 로그인 권한 검증 -> 아니면 로그아웃 시킬 거  /////////
    useEffect( ()=>{
        if(window.localStorage.getItem("accessToken")===null){
            props.history.push('/sign');
        }
    });
    ////////////////////////////////////////////////
    
    useEffect( ()=>{
        if(props.location.pathname==="/"){
            setPage("feed");
        }
        else if(props.location.pathname==="/insert" && selectedFiles.length===0){ 
            // 사진 선택 페이지에서 새로고침해서 selectedFileds가 초기화됐을경우 메인페이지로 돌아감 
            props.history.push("/");
            setPage("feed");
        }
        else if(props.location.pathname.match("/board")){
            setPage("detail");
        }
        else {
            setPage("profile");
        }
    },[props.location.pathname,selectedFiles,props.history]);

    useEffect( ()=>{
        if(selectedFiles.length!==0){
            // console.log("Add버튼 눌리고 파일도 선택됨");
            props.history.push("/insert");
        }
    },[selectedFiles,props.history]);

    const successInsert=()=>{
        alert("등록되었습니다!");
        props.history.push("/");
        setSelectedFiles([]);
        setPage("feed");
    }

    const changePage=(page)=>{
        setPage(page);
    }

    const handleFilesChange=(e)=>{
        // 선택된 사진은 앞에서 (maxFileNumber)장까지만 선택됨
        let fileList = [];
        for(let i=0; i<Math.min(e.target.files.length,maxFileNumber); i++){
            fileList.push(e.target.files[i]);
        }
        setSelectedFiles(fileList);
    }

    const clickAddButton=()=>{
        document.getElementById("file").click();
    }
    return (
        <>
        {props.auth?(  // 로그아웃된상태에서는 unmount시키려고 추가함 
        <div >
        <section className="main">
            <input type="file" id="file" name="imagesList" accept="image/*" multiple onChange={handleFilesChange} hidden/>
            <Switch>
            <Route path="/insert" render={props=>{ return(<Insert imagesList={selectedFiles} successInsert={successInsert}/>)}}/>
            <Route path="/board/:boardId" component={Detail}/>
            <Route path="/:nickname" component={Profile}/>
            <Route path="/" component={Feed}/>
            </Switch>
        </section>
        <Switch>
            <Route path="/insert" component={InsertMenuBar}/>
            <Route render={props=>{ return(<MenuBar changePage={changePage} page={page} clickAddButton={clickAddButton}/>)}}/>
        </Switch>
        </div>
        ):null}
        </>
    );
}

export default withRouter(Main);