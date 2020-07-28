import React from 'react';
import {Link} from 'react-router-dom';

import './menu.css';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import LoggedContext from '../../context/LoggedContext';
function MenuBar(props){
    return (
        <LoggedContext.Consumer>
            {logged=>{
                if(logged.logged===false){
                    return(
                    <div className="nav-bar menu-bar">
                    <div className="nav-block link-block"><Link to="/sign/in" className="nav-span">{props.page==="feed"||props.page==="detail"?<HomeIcon/>:<HomeOutlinedIcon/>} </Link></div>
                    <div className="nav-block link-block"><Link to="/sign/in" className="nav-span"><AddCircleOutlineOutlinedIcon/></Link></div>
                    <div className="nav-block link-block"><Link to="/sign/in" className="nav-span">{props.page==="profile"?<PersonIcon/>:<PersonOutlineOutlinedIcon/>}</Link></div>
                    </div>
                    )
                }
                else {
                    return(
                    <div className="nav-bar menu-bar">
                    <div className="nav-block link-block"><Link to="/" className="nav-span" onClick={e=>props.changePage("feed")}>{props.page==="feed"||props.page==="detail"?<HomeIcon/>:<HomeOutlinedIcon/>}</Link> </div>
                    <div className="nav-block link-block"><Link to="#" className="nav-span" onClick={props.clickAddButton}><AddCircleOutlineOutlinedIcon/></Link> </div>
                    <div className="nav-block link-block"><Link to={`/${logged.id}`} className="nav-span" onClick={e=>props.changePage("profile")}>{props.page==="profile"?<PersonIcon/>:<PersonOutlineOutlinedIcon/>}</Link></div>
                    </div>
                    )
                }
            }}

        </LoggedContext.Consumer>
    );
};

export default MenuBar;
