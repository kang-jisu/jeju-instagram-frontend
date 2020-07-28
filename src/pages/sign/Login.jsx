import React, { useState } from 'react';
import {Link,withRouter} from 'react-router-dom';

import { Form, FormGroup, Label, Input} from 'reactstrap';

const TRUE = 1;
const FALSE = 0;
const NULL = -1;

function Login(props) {
    const [user, setUser] = useState({email:'',password:''});
    const [userValid, setUserValid] = useState({email:NULL,password:NULL})
    const [denied, setDenied] = useState(false);

    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        if(e.target.value!=="")
        setUserValid({
            ...userValid,
            [e.target.name]:TRUE
        });       
    }

    const checkInput=()=>{
        // 이메일이 입력되지 않았을 때
        if(user.email===""){
            document.getElementById("email").focus();
            setUserValid({
                ...userValid,
                email:FALSE
            })
        }
        // 비밀번호가 입력되지 않았을 때
        else if(user.password===""){
            document.getElementById("password").focus();
            setUserValid({
                ...userValid,
                password:FALSE
            })
        }
        // 둘다 입력 됨 -> 로그인 요청 
        else requestLogin();
    }

    const requestLogin=()=>{
        // axios 요청 할 부분
        let httpStatus = 200;

        switch(httpStatus){
            case 200:
                login("accessToken");
                break;
            case 404:
                setDenied(true);
                break;
            default:
                break;
        }
    }

    const login=(accessToken)=>{
        window.localStorage.setItem("accessToken",accessToken);
        props.onLogin();
        props.history.push("/");
    }
    return (
        <div className="container"  >
        <div className="row justify-content-center"> 
        <Form className="text-left p-5 col-lg-4 col-md-auto sign-form">
            <p className="h4 mb-4 title-text" >로그인</p>
            
            <FormGroup >
                <Label for="exampleEmail">이메일</Label>
                <Input 
                 name="email"
                 id="email"
                 onChange={handleChange}
                 invalid={userValid.email===FALSE?true:false}
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">비밀번호</Label>
                <Input 
                 type="password"
                 name="password"
                 id="password"
                 onChange={handleChange}
                 invalid={userValid.password===FALSE?true:false}
                />
            </FormGroup>
            <div className="text-center">
                <Link to="#">비밀번호를 잊으셨나요?</Link>
            </div>
            <button type="button" className={`btn ${!denied?"btn-info":"btn-danger"} btn-block my-4`} onClick={checkInput}>로그인</button>
            
            {denied? // 로그인 거부 메세지 ( 비번/이메일 안맞아서 )
            <div className="text-center text-danger mb-3">
                <small><b>잘못된 입력입니다. <br/>이메일 또는 비밀번호를 다시 확인하여주세요.</b></small>
            </div>
            :null}

            <div className="text-center">계정이 없으신가요?
                <Link to="/sign/up" >가입하기</Link>
            </div>
        </Form>

        </div>
        </div>
    );
}

export default withRouter(Login);