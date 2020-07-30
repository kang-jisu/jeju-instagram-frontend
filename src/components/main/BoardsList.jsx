import React, { useState, useEffect } from 'react';
import {Board} from '.';
import jAPI from '../../jejuAPIs/JejuAPIs';

function BoardsList(props) {
    const [boardsList,setBoardsList] = useState([]);

    useEffect(()=>{
        setBoardsList(props.data);
    },[props.data]);

    const getRequest=()=>{
        jAPI.get("/posts")
        .then(res=>{
            console.log(res.data);
            setBoardsList(res.data.sort(function(a,b){
                return parseFloat(b.post_id)-parseFloat(a.post_id);
            }))
        })
        .catch(error=>{
            if(error.response!==undefined){
            if(error.response.status===401){
                alert("알수없는 회원정보. 로그아웃시킴");
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("id");
                props.history.push("/sign/in");
            }
            }
            console.log(error);
        })
    }
    return (
        <>
            {boardsList.map(board=>{
                return(
                    <Board board={board} key={board.post_id} refresh={getRequest}/>
                )
            })}
        </>
    );
}

export default BoardsList;

