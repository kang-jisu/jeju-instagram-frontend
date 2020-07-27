import React, { useState, useEffect } from 'react';
import {Board} from '.';
import jAPI from '../../jejuAPIs/JejuAPIs';

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
function BoardsList(props) {
    const [boardsList,setBoardsList] = useState([]);

    useEffect(()=>{
        setBoardsList(props.data.reverse());
    },[props.data]);

    const getRequest=()=>{
        jAPI.get("/boards")
        .then(res=>{
            setBoardsList(res.data.reverse());
        })
        .catch(error=>{
            // console.log("서버 오류 dialog 추가")
            console.log("목업서버 실행 X")
            setBoardsList(test);
        })
    }
    return (
        <>
            {boardsList.map(board=>{
                return(
                    <Board board={board} key={board.id} refresh={getRequest}/>
                )
            })}
        </>
    );
}

export default BoardsList;

