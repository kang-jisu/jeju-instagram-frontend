import React, { Fragment ,useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import jAPI from '../../jejuAPIs/JejuAPIs';

function Profile(props) {
    const [user, setUser] = useState(null);
    const [message,setMessage] = useState("");
    useEffect( ()=>{
        setMessage("로딩중..");
        jAPI.get(`/users/${props.match.params.nickname}`)
        .then(res=>{
            setUser(res.data);
            setMessage("");
        })
        .catch(error=>{
            console.log(error);
            setMessage("해당하는 아이디의 유저를 찾을 수 없습니다.");
        })
    },[props.match.params.nickname]);
    
    const logout=()=>{
        window.localStorage.removeItem("accessToken");
        props.onLogout();
        props.history.push("/sign/in");
    }

    const handleProfileUpdate=()=>{
        props.history.push("/edit");
    }
    
    return (
        <Fragment>
        <div className="nav-bar header">
            <div className="nav-block">
                <span >설정</span>
            </div>
            <div className="nav-block">
                <span ><b>{user===null?"아이디":user.nickname}</b></span>
            </div>
            <div className="nav-block">
            </div>
        </div>
        <div className="main-content" >
            {user===null?
            null
            :
            <>
            <div style={{textAlign:"left",minWidth:"300px", maxWidth:"700px",padding:"30px"}}>
            <h3>아이디 : {user.nickname}</h3>
            <h4>이름 : {user.name}</h4>
            <h4>이메일 : {user.email}</h4>
            </div>
            <button className="btn btn-primary" onClick={handleProfileUpdate}>정보 수정</button>
            <button className="btn btn-info " onClick={logout}>로그아웃</button>
            <br/>
            </>
            }
            {message}
        </div>

    </Fragment>
    );
}

export default withRouter(Profile);