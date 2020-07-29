import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import { Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import jAPI from '../../jejuAPIs/JejuAPIs';

const TRUE = 1;
const FALSE = 0;
const NULL = -1;
const EXIST = 2;

function SignUp(props) {
    const [user, setUser] = useState({email:'',nickname:'',name:'',password:''})
    const [userValid, setUserValid] = useState({email:NULL,nickname:NULL,name:NULL,password:NULL})
    const [status, setStatus] = useState(200);

    const regExp = {
        email:/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        nickname:/^[a-zA-Z0-9-_]{4,20}$/,
        name:/^.{2,20}$/,
        password:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
    };

    const signUp=(e)=>{
        e.preventDefault();
        jAPI({
            method: 'post',
            url: '/users',
            data: user,
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
        })
        .then(res=>{
            console.log("성공");
            props.history.push("/sign/in");
        })
        .catch(error=>{
            if(error.response.status===400){
                // 입력되지 않은 정보가 있을 때 
                setStatus(400);
            }
            else if(error.response.status===404){
                // 이미 존재하는 아이디 일 때
                setStatus(404);
            }
            else {
                setStatus(500);
            }
        })
    }

    const renderSubmitBtn= ()=>{
        if( userValid.email===TRUE &&
            userValid.nickname===TRUE &&
            userValid.name===TRUE &&
            userValid.password===TRUE) return false;
        else return true;
    }
    const validRegExp=(e)=>{

        setUserValid({
            ...userValid,
            [e.target.name]:regExp[e.target.name].test(user[e.target.name])?TRUE:FALSE
        })
        // 위에 내용이 밑에꺼 요약(?)해서 적은건데 나중에 이메일, 닉네임 중복확인하게되면 다시 풀어서 써야할수도 있음..
        // switch(e.target.name){
        //     case "nickname":{
        //         setUserValid({
        //             ...userValid,
        //             nickname:nicknameRegExp.test(user.nickname)?TRUE:FALSE
        //         });
        //         break;
        //     }
        //     default:
        //         break;
        // }
    }
    
    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
        setStatus(200);
        
    }

    return (
        <div className="container"  >
        <div className="row justify-content-center"> 
        
        <Form className="text-left p-5 col-lg-4 col-md-auto sign-form">
            <p className="h4 mb-4 title-text" >회원가입</p>
            <FormGroup >
                <Label>이메일</Label>
                <Input 
                 type="email"
                 valid={userValid.email===TRUE?true:false} 
                 invalid={userValid.email===FALSE||userValid.email===EXIST?true:false}
                 name="email" 
                 onChange={handleChange}
                 onBlur={validRegExp}
                />
              <FormText>{userValid.email===EXIST?"이미 존재하는 이메일입니다.":"이메일을 입력해주세요."}</FormText>
            </FormGroup>
            <FormGroup>
                <Label >닉네임(계정 ID)</Label>
                <Input 
                 valid={userValid.nickname===TRUE?true:false} 
                 invalid={userValid.nickname===FALSE||userValid.nickname===EXIST?true:false} 
                 name="nickname"
                 onChange={handleChange}
                 onBlur={validRegExp}
                 />
                <FormText>{userValid.nickname===EXIST?"이미 존재하는 닉네임입니다.":"4~20자(영문, 숫자, _ , - 만 가능)를 입력해주세요."}</FormText>
            
            </FormGroup> 
            <FormGroup>
                <Label >이름</Label>
                <Input 
                 valid={userValid.name===TRUE?true:false} 
                 invalid={userValid.name===FALSE?true:false} 
                 name="name"
                 onChange={handleChange}
                 onBlur={validRegExp}
                 />

            {userValid.name===FALSE?<FormText>허용 글자수는 2자이상 20자 이하입니다.</FormText>:null}
            </FormGroup>
            <FormGroup>
                <Label >비밀번호</Label>
                <Input 
                 type="password"
                 valid={userValid.password===TRUE?true:false} 
                 invalid={userValid.password===FALSE?true:false}
                 name="password"
                 onChange={handleChange}
                 onBlur={validRegExp}
                 />
            <FormText>8~15자 영문+숫자 조합으로 입력해주세요.</FormText>
            </FormGroup>
            <button 
             id="submitBtn"
             className={`btn ${status===200?"btn-info":"btn-danger"} btn-block my-4`}
             onClick={signUp}
             disabled={renderSubmitBtn()}
            >가입하기</button>
            {status!==200?
            <p style={{color:"red"}}>
                {status===400?"입력되지 않은 정보가 있습니다.":status===404?"이미 존재하는 이메일 혹은 닉네임입니다.":"서버와의 연결에 실패했습니다."}
            </p>
            :null}
            <div className="text-center">
                <Link to="/sign/in" className="text-center">로그인하기</Link>
            </div>
        </Form>
        </div>
        </div>
    );
}

export default SignUp;