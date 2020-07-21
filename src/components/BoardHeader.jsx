import React from 'react';
import "./board.css";
import {Link} from 'react-router-dom';
import {CardHeader} from 'reactstrap';

function BoardHeader(props) {
    return (
        <CardHeader className="bg-white">
             <Link to={{
                 pathname:`./${props.board.nickname}`,
                 }} className="text-body font-weight-bold text-monospace" >
                 {props.board.nickname}
             </Link>
        </CardHeader>
    );
}

export default BoardHeader;