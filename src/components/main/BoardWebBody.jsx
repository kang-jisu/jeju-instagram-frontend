
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {CardBody,CardFooter} from 'reactstrap';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
function BoardWebBody(props) {
    return (
    <Fragment>
        <CardBody className="commentbody">
    
             <div className="overflow-auto comment-d pb-3 pr-3 pt-3" name="right" >
                 <span className="card-title font-weight-bold title-size">
                     {props.board.nickname}
                 </span>  
                 <span className="card-text text-size">
                    {props.board.content.split('\n').map( (line,index) => {
                    return (<span key={index}>{line}<br/></span>)})
                     }
                 </span><br/>
             </div>
        </CardBody>
        <CardBody className="detail-icon-body">
             <section>
                 <span>
                    <FavoriteBorderRoundedIcon fontSize="large"/>
                 </span>
                 <Link to={`./board/${props.board.id}`} className="pl-2" >
                     <TextsmsOutlinedIcon fontSize="large"/>
                 </Link>
             </section> 


             <Link to={`./board/${props.board.id}`} className="small mb-0 text-muted">{props.board.review_date}</Link>
        </CardBody>
        <CardFooter className="cardfoot"> 
            댓글 등록 기능 
        </CardFooter>
    </Fragment>
    );
}

export default BoardWebBody;