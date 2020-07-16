import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './comp.css';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

class MenuBar extends Component {
    render(){
        return (
            <div className="nav-bar menu-bar">
                <div className="nav-block link-block"><Link to="/" className="nav-span" onClick={e=>this.props.changePage("feed")}>{this.props.page==="feed"?<HomeIcon/>:<HomeOutlinedIcon/>}</Link> </div>
                <div className="nav-block link-block"><Link to="#" className="nav-span" onClick={this.props.clickAddButton}><AddCircleOutlineOutlinedIcon/></Link> </div>
                <div className="nav-block link-block"><Link to="/profile" className="nav-span" onClick={e=>this.props.changePage("profile")}>{this.props.page==="profile"?<PersonIcon/>:<PersonOutlineOutlinedIcon/>}</Link></div>
            </div>
        );
    }
};

export default MenuBar;
