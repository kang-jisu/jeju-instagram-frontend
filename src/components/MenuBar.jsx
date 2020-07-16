import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './comp.css';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state={
            page:'feed'
        }
    }
    componentDidMount=()=>{
        this.setState({
            page:this.props.location.pathname==="/"?'feed':'profile'
        })
    }
    componentDidUpdate=(prevProps,prevState)=>{
        if(this.props.location.pathname!==prevProps.location.pathname){
            this.setState({
                page:this.props.location.pathname==="/"?'feed':'profile'
            })
        }
    }
    render(){
        return (
            <div className="nav-bar menu-bar">
                <div className="nav-block link-block"><Link to="/" className="nav-span">{this.state.page==="feed"?<HomeIcon/>:<HomeOutlinedIcon/>}</Link> </div>
                <div className="nav-block link-block"><Link to="/insert" className="nav-span"><AddCircleOutlineOutlinedIcon/></Link> </div>
                <div className="nav-block link-block"><Link to="/profile" className="nav-span">{this.state.page==="profile"?<PersonIcon/>:<PersonOutlineOutlinedIcon/>}</Link></div>
            </div>
        );
    }
};

// MenuBar.propTypes = {
    
// };

export default MenuBar;
