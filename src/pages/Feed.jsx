import React, { Fragment, useState, useEffect } from 'react';
import './pages.css';
import {Carousel} from '../components';
import jAPI from '../jejuAPIs/JejuAPIs';

function Feed(props) {
    const [boardsList,setBoardsList] = useState([]);

    useEffect(()=>{
        jAPI.get("/boards")
        .then(res=>{
            setBoardsList(res.data);
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
                    <div style={{marginTop:"30px"}} key={board.board_id}>
                    <div style={{height:"30px",border:"1px solid gray"}}>{board.nickname}</div>
                    {Carousel(board.image_url)}
                    <div style={{height:"30px",border:"1px solid gray"}}>{board.content}</div>
                    <div style={{height:"30px",border:"1px solid gray"}}>{board.review_date}</div>
                    </div>
                )
            })}
         </div>
    </Fragment>
    );
}

export default Feed;

