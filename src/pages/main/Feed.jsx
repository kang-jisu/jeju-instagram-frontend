import React,{Fragment} from 'react';
import withRequestGet from '../../hoc/withRequestGet';
import {BoardsList} from '../../components/main';
import './pages.css';

import withLogin from '../../hoc/withLogin';
function Feed(props) {
    const FeedWithRequestGet =withRequestGet({url:`/posts`},BoardsList);
    const scrollToTop=()=>{
        window.scrollTo(0,0);
    }

    return (
        <Fragment>
        <div className="nav-bar header">
            <div className="nav-block">
                <span className="header-logo" onClick={scrollToTop} >Jeju-instagram</span>
            </div>
        </div>
        <div className="main-content">
           <FeedWithRequestGet/>
         </div>
        </Fragment>
    )
}

export default withLogin(Feed);