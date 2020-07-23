import React ,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import jAPI from '../../jejuAPIs/JejuAPIs';

const TRUE = 1;
const FALSE = 0;
const NULL = -1;
const EXIST = 2;

function EditInfo(props) {
    const [user, setUser] = useState({email:'',nickname:'',name:'',password:''})
    const [userValid, setUserValid] = useState({email:NULL,nickname:NULL,name:NULL,password:NULL})

    useEffect( ()=>{
        //axios 현재 로그인중인 사용자 아이디 받아와서 정보 요청 , ,
        jAPI.get(`/users/97js_`)
        .then(res=>{
            console.log(res.data);
            setUser(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[]);
    

    const regExp = {
        email:/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        nickname:/^[a-zA-Z0-9-_]{4,20}$/,
        name:/^.{2,20}$/,
        password:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
    };

    const renderSubmitBtn= ()=>{
        if( (userValid.email===TRUE || userValid.email===NULL) &&
            (userValid.nickname===TRUE || userValid.nickname===NULL)&&
            (userValid.name===TRUE || userValid.name===NULL)&&
            (userValid.password===TRUE || userValid.password===NULL)) return false;
        else return true;
    }
    const validRegExp=(e)=>{

        setUserValid({
            ...userValid,
            [e.target.name]:regExp[e.target.name].test(user[e.target.name])?TRUE:FALSE
        })
    }
    
    const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        
    }
    const submit=(e)=>{
        e.preventDefault();
        jAPI({
            method: 'put',
            url: `/users/${user.id}`,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            data: user
        })
        .then(res=>{
            console.log("성공");
            props.history.push(`/${user.nickname}`);
        })
        .catch(error=>{
            console.log("실패");
        })
    }

    const goBack=()=>{
        props.history.goBack();
    }
    return (
        <>
         <Form className="text-left mt-5 pl-5 pr-5 pb-5 pt-2 col-lg-4 col-md-auto sign-form">
            <p className="h4 mb-4 title-text" >프로필 수정</p>
            <FormGroup >
                <Label>이메일</Label>
                <Input 
                 value={user.email}
                 name="email" 
                 disabled
                />
            </FormGroup>
            <FormGroup>
                <Label >닉네임(계정 ID)</Label>
                <Input 
                 value={user.nickname}
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
                 value={user.name}
                 valid={userValid.name===TRUE?true:false} 
                 invalid={userValid.name===FALSE?true:false} 
                 name="name"
                 onChange={handleChange}
                 onBlur={validRegExp}
                 />

            {userValid.name===FALSE?<FormText>허용 글자수는 2자이상 20자 이하입니다.</FormText>:null}
            </FormGroup>
           
            <button 
             className="btn btn-info btn-block my-4 " 
             onClick={submit}
             disabled={renderSubmitBtn()}
            >수정하기</button>
        
            <div className="text-center">
                <Link to="#" className="text-center" onClick={goBack}>돌아가기</Link>
            </div>
        </Form>
        </>
    );
}

export default EditInfo;