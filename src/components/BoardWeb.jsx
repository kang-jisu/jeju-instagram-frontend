import React from 'react';
import {Carousel, BoardWebBody,BoardHeader} from '.';
import {Card,Col,Row} from 'reactstrap';
function BoardWeb(props) {
    return (
    <Card className="post-detail-card" >
        <Row className="no-gutters">
            <Col md="8">
                {Carousel(props.board.image_url)} 
            </Col>
            <Col md="4" className="card-detail-right">
                <BoardHeader board={props.board}/>
                <BoardWebBody board={props.board}/> 
            </Col>
        </Row>       
     </Card> 
    );
}

export default BoardWeb;