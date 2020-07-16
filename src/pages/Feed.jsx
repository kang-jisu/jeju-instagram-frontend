import React, { Component, Fragment } from 'react';
import './pages.css';

class feed extends Component {
    scrollToTop=()=>{
        window.scrollTo(0,0);
    }
    render() {
        return (
            <Fragment>
                <div className="nav-bar header">
                    <div className="nav-block">
                        <span className="header-logo" onClick={this.scrollToTop} >Jeju-instagram</span>
                    </div>
                </div>
                <div className="main-content">
                <div style={{height:"400px", backgroundColor:"#E6E6F8"}}> board list
                 </div>
                 <div style={{height:"400px", backgroundColor:"#FCF5F5"}}> board list
                 </div>
                 <div style={{height:"400px", backgroundColor:"#E6E6F8"}}> board list
                 </div>
                 <div style={{height:"400px", backgroundColor:"#FCF5F5"}}> board list
                 </div>
                 </div>
            </Fragment>
        );
    }
}

export default feed;