import React from 'react';
import {Carousel, BoardBody,BoardHeader} from './';
import {Card} from 'reactstrap';
function Board(props) {
    return (
    <Card className="post-card" >
        <BoardHeader board={props.board}/>
        {Carousel(props.board.image_url)} 
        <BoardBody board={props.board}/>        
     </Card> 
    );
}

export default Board;