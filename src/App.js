import React, { useEffect, useState } from 'react';
import './App.css';
import {withRouter,Route,Switch} from 'react-router-dom';
import {Main,Sign} from './container';
import ScrollToTop from './ScrollToTop';

function App(props) {
  const [auth, setAuth] = useState(false);

  // useEffect( ()=>{
  //   if(!window.location.pathname.match("sign")){
  //     const token = window.localStorage.getItem("accessToken");
  //     if(token===null){
  //       props.history.push('/sign');
  //       console.log("토큰 존재 X 로그아웃 ");
  //       setAuth(false);
  //     }
  //     // 토큰 유효 X 검사
  //   }
  //   else{
  //     const token = window.localStorage.getItem("accessToken");
  //     if(token!==null){
  //       props.history.push('/');
  //       setAuth(true);
  //     }
  //   }
  // },[auth,props.history]);

  return (
    <ScrollToTop>
    <div className="App">
      <Switch>
        <Route path="/sign" component={Sign}/>
        <Route path="/" component={Main}/>
        {/* render={auth?
                props=>{ return(<Main auth={auth}/>)}
               :props=>{ return(<Sign/>)}}/> */}
      </Switch>
    </div>
    </ScrollToTop>
  );
}

export default withRouter(App);
