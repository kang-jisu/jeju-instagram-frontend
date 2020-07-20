import React, { Fragment, useState, useEffect } from 'react';
import './pages.css';
import {Board} from '../components';
import jAPI from '../jejuAPIs/JejuAPIs';

const test= [
    {
      "id": 33,
      "nickname": "boyun",
      "content": "땅스타그램 ㅎㅇㅎㅇ",
      "image_url": [
        "https://bit.ly/2CkGs6H",
        "https://bit.ly/397eGq4",
        "https://bit.ly/3fBBVva"
      ],
      "review_date": "2020-07-18"
    },
    {
      "id": 12,
      "nickname": "97js_",
      "content": "졸귀",
      "image_url": [
        "https://bit.ly/3eCLQ2b",
        "https://bit.ly/3eCLQ2b"
      ],
      "review_date": "2020-07-10"
    }
];
function Feed(props) {
    const [boardsList,setBoardsList] = useState([]);

    useEffect(()=>{
        jAPI.get("/boards")
        .then(res=>{
            setBoardsList(res.data);
        })
        .catch(error=>{
            // console.log("서버 오류 dialog 추가")
            console.log("목업서버 실행 X")
            setBoardsList(test);
        })
    },[]);

    const scrollToTop=()=>{
        window.scrollTo(0,0);
    }

    return (
        <Fragment>
        <div className="nav-bar header">
            <div className="nav-block">
                <span className="header-logo" onClick={scrollToTop} >Jeju-instagram</span>
            </div>
        </div>
        <div className="main-content">
            {boardsList.map(board=>{
                return(
                    <Board board={board} key={board.id}/>
                )
            })}
         </div>
    </Fragment>
    );
}

export default Feed;

