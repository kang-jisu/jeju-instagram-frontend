import React, { useState } from 'react';
import {Link,withRouter} from 'react-router-dom';
import jAPI from '../../jejuAPIs/JejuAPIs';
import { Form, FormGroup, Label, Input} from 'reactstrap';

const TRUE = 1;
const FALSE = 0;
const NULL = -1;

function Login(props) {
    const [user, setUser] = useState({email:'',password:''});
    const [userValid, setUserValid] = useState({email:NULL,password:NULL})
    const [status, setStatus] = useState(200);

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
        setStatus(200);
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
        jAPI({
            method:'post',
            url:'/login',
            data:user
        })
        .then(res=>{
            const data = {token:'token',nickname:'97js_'};
            //login(res.data)로 바꿀것
            login(data);
        })
        .catch(error=>{
            if(error.response.status===400){
                // 알 수 없는 정보일 때
                setStatus(400);
            }
            else {
                setStatus(500);
            }
        })
    }

    const login=(data)=>{
        window.localStorage.setItem("accessToken",data.token);
        window.localStorage.setItem("id",data.nickname);
        props.onLogin(data.nickname);
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
            <button type="button" className={`btn ${status===200?"btn-info":"btn-danger"} btn-block my-4`} onClick={checkInput}>로그인</button>
            
            {status!==200? // 로그인 거부 메세지 ( 비번/이메일 안맞아서 )
            <div className="text-center text-danger mb-3">
                {status===400?<small><b>잘못된 입력입니다. <br/>이메일 또는 비밀번호를 다시 확인하여주세요.</b></small>
                :<small><b>서버와의 통신이 실패했습니다.</b></small>}
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