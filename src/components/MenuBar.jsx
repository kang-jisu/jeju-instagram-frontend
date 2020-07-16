import React from 'react';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MenuBar = props => {
    return (
        <div className="menu-bar">
            <Link to="/">메인</Link> 
            <Link to="/insert">등록</Link> 
            <Link to="/profile">프로필</Link>
        </div>
    );
};

// MenuBar.propTypes = {
    
// };

export default MenuBar;