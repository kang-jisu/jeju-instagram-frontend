import React  from 'react';
import {Route, Switch} from 'react-router-dom';
import {SignUp, Login} from '../pages/sign';
function Sign(props) {

    ////// 로그인 권한 검증 -> 아니면 로그아웃 시킬 거  /////////
    // useEffect( ()=>{
    //     if(window.localStorage.getItem("accessToken")===null){
    //         props.history.push('/sign');
    //     }
    // });
    ////////////////////////////////////////////////
    return (
        <div >
        <section className="sign">
            <Switch>
            <Route exact path="/sign/up" component={SignUp}/>
            <Route exact path="/sign/in" component={Login}/>
            <Route path="/sign" component={Login}/>
            </Switch>
        </section>
        </div>
    );
}

export default Sign;
