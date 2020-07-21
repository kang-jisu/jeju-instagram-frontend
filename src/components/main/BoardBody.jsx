import React from 'react';
import "./board.css";
import {Link} from 'react-router-dom';
import {CardBody} from 'reactstrap';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';

function BoardBody(props) {
    return (
        <CardBody className="pt-2 pb-1 border-bottom border-gray">
             <section>
                 <span>
                    <FavoriteBorderRoundedIcon fontSize="large"/>
                 </span>
                 <Link to={`./board/${props.board.id}`} className="pl-2" >
                     <TextsmsOutlinedIcon fontSize="large"/>
                 </Link>
             </section> 

                <span className="card-title font-weight-bold title-size">
                <Link to={{
                 pathname:`./${props.board.nickname}`,
                 }} className="text-body font-weight-bold text-monospace" >
                 {props.board.nickname}
             </Link>
                </span> 
                 <span className="card-text text-size">
                     {props.board.content}
                 </span><br/>
             {/* <div className="overflow-auto comment">
                 댓글
             </div> */}
             <Link to={`./board/${props.board.id}`} className="small mb-0 text-muted">{props.board.review_date}</Link>
        </CardBody>
    );
}

export default BoardBody;