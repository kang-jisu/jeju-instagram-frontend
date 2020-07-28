import React, { useState, useEffect } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import {Main,Sign} from './container';
import ScrollToTop from './ScrollToTop';
import LoggedContext from './context/LoggedContext';
function App(props) {

  const onLogin=()=>{
    console.log("로그인");
    setLogged(state=>{return{...state,logged:true}});
  }

  const onLogout=()=>{
    console.log("로그아웃");
    setLogged(state=>{return{...state,logged:false}});
  }
  const initialState={
    logged:window.localStorage.getItem("accessToken")?true:false,
    onLogin,
    onLogout,
  }
  const [logged,setLogged]=useState(initialState);

  useEffect( ()=>{
    if(window.localStorage.getItem("accessToken")){
      onLogin();
    }
    else {
      onLogout();
    }
  },[]);

  return (
    <ScrollToTop>
    <LoggedContext.Provider value={logged}>
    <div className="App">
      <Switch>
        <Route path="/sign" component={Sign}/>
        <Route path="/" component={Main}/>
      </Switch>
    </div>
    </LoggedContext.Provider>
    </ScrollToTop>
  );
}

export default App;
