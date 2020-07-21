import React from 'react';
import {Link} from 'react-router-dom';

function SignUp(props) {
    return (
        <div className="container"  >
        <div className="row justify-content-center"> 
        <form className="text-center p-5 col-lg-4 col-md-auto sign-form" action="#!">
            <p className="h4 mb-4 title-text" >회원가입</p>
            
            <input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail"/>

           
            <input type="text"  class="form-control" placeholder="계정이름(닉네임)" />
            <small id="defaultRegisterFormPhoneHelpBlock" class="form-text text-muted mb-2">
                Optional - for two step authentication
            </small>
            <input type="text"  class="form-control mb-4" placeholder="이름" />

            <input type="text" id="defaultRegisterPhonePassword" class="form-control" placeholder="Phone number" aria-describedby="defaultRegisterFormPhoneHelpBlock"/>
            <small id="defaultRegisterFormPhoneHelpBlock" class="form-text text-muted mb-2">
                Optional - for two step authentication
            </small>
            <input type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"/>
            <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                At least 8 characters and 1 digit
            </small>
            <button className="btn btn-info btn-block my-4 " onClick={e=>props.history.push("/sign/in")}>가입하기</button>
        
            <div>
                <Link to="/sign/in" >로그인하기</Link>
            </div>

        </form>
        </div>
        </div>
    );
}

export default SignUp;