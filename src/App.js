import React, { useState, useEffect } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import {Main,Sign} from './container';
import ScrollToTop from './ScrollToTop';
import LoggedContext from './context/LoggedContext';
function App(props) {

  const onLogin=(id)=>{
    setLogged(state=>{return{...state,logged:true,id:id}});
  }

  const onLogout=()=>{
    setLogged(state=>{return{...state,logged:false,id:null}});
  }
  const initialState={
    logged:window.localStorage.getItem("accessToken")?true:false,
    id:window.localStorage.getItem("id"),
    onLogin,
    onLogout,
  }
  const [logged,setLogged]=useState(initialState);

  useEffect( ()=>{
    if(window.localStorage.getItem("accessToken")){
      console.log("app.use");
      onLogin(window.localStorage.getItem("id"));
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
