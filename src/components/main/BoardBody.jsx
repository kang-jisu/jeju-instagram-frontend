import React from 'react';
import "./board.css";
import {Link} from 'react-router-dom';
import {CardBody} from 'reactstrap';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';

import moment from 'moment';
import 'moment/locale/ko';

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
                     {props.board.content.split('\n').map( (line,index) => {
                    return (<span key={index}>{line}<br/></span>)})
                     }
                 </span><br/>
             {/* <div className="overflow-auto comment">
                 댓글
             </div> */}
             <Link to={`./board/${props.board.id}`} className="small mb-0 text-muted">{moment(props.board.created).format("YYYY-MM-DD")}</Link>
        </CardBody>
    );
}

export default BoardBody;