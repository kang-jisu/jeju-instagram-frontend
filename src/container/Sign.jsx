import React  from 'react';
import {Route, Switch} from 'react-router-dom';
import {SignUp, Login} from '../pages/sign';
import LoggedContext from '../context/LoggedContext';
function Sign(props) {

    return (
        <LoggedContext.Consumer>
            {(logged)=>(
        <div >
        <section className="sign">
            <Switch>
            <Route exact path="/sign/up" component={SignUp}/>
            <Route exact path="/sign/in" render={props=>{return(<Login onLogin={logged.onLogin}/>)}}/>
            <Route path="/sign" render={props=>{return(<Login onLogin={logged.onLogin}/>)}}/>
            </Switch>
        </section>
        </div>
            )}
        </LoggedContext.Consumer>
    );
}

export default Sign;
