import React from 'react';
import {Carousel, BoardBody,BoardHeader} from './';
import {Card} from 'reactstrap';
function Board(props) {
    return (
    <Card className="post-card" >
        <BoardHeader board={props.board} refresh={props.refresh}/>
        {/* {Carousel(props.board.image_url)}  */}
        {Carousel([])} 
        <BoardBody board={props.board}/>        
     </Card> 
    );
}

export default Board;