import React from 'react';
import {Link} from 'react-router-dom';

function Login(props) {
    const login=()=>{
        window.localStorage.setItem("accessToken","Zz");
        props.history.push("/");
    }
    return (
        <div className="container"  >
        <div className="row justify-content-center"> 
        <form className="text-center p-5 col-lg-4 col-md-auto sign-form" action="#!">
            <p className="h4 mb-4 title-text" >로그인</p>
        
            <input type="email" className="form-control mb-4" placeholder="이메일"/>
        
            <input type="password" className="form-control mb-4" placeholder="비밀번호"/>
        
            <div className="d-flex justify-content-around">
                <div>
                    <Link to="#">비밀번호를 잊으셨나요?</Link>
                </div>
            </div>
            <button className="btn btn-info btn-block my-4 " onClick={login}>로그인</button>
        
            <p>계정이 없으신가요?
                <Link to="/sign/up" >가입하기</Link>
            </p>

        </form>
        </div>
        </div>
    );
}

export default Login;