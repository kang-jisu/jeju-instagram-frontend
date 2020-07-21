import React, { Fragment } from 'react';

function Profile(props) {
    const logout=()=>{
        window.localStorage.removeItem("accessToken");
        props.history.push("/sign/in");
    }
    return (
        <Fragment>
        <div className="nav-bar header">
            <div className="nav-block">
                <span >설정</span>
            </div>
            <div className="nav-block">
                <span >아이디</span>
            </div>
            <div className="nav-block">
            </div>
        </div>
        <div className="main-content">
            <button className="btn btn-info " onClick={logout}>로그아웃</button>
        </div>
    </Fragment>
    );
}

export default Profile;