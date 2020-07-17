import React, { Component, Fragment } from 'react';
import './pages.css';
import {Carousel} from '../components';

class feed extends Component {
    constructor(props){
        super(props);
        this.state={
            boardsList:[],
        }
    }
    componentDidMount=()=>{
        //axios
        this.setState({
            boardsList:[
                {
                    "board_id": 33,
                    "nickname" : "boyun",
                    "content": "땅스타그램 ㅎㅇㅎㅇ",
                    "image_url": ["https://bit.ly/2CkGs6H","https://bit.ly/397eGq4","https://bit.ly/3fBBVva"],
                    "review_date": "2020-07-18"
                },
                {
                    "board_id": 12,
                    "nickname" : "97js_",
                    "content": "졸귀",
                    "image_url": ["https://bit.ly/32rltd3","https://bit.ly/3eCLQ2b"],
                    "review_date": "2020-07-10"
                }
            ],
        })
    }
    scrollToTop=()=>{
        window.scrollTo(0,0);
    }
    render() {
        return (
            <Fragment>
                <div className="nav-bar header">
                    <div className="nav-block">
                        <span className="header-logo" onClick={this.scrollToTop} >Jeju-instagram</span>
                    </div>
                </div>
                <div className="main-content">
                    {this.state.boardsList.map(board=>{
                        return(
                            <div style={{marginTop:"30px"}}>
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
}

export default feed;