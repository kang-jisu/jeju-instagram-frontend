import React from 'react';
import LoggedContext from '../context/LoggedContext';
import {Sign} from '../container';
const withLogin=(WrappedComponent) =>{
    return function IsLogin(props){
        return (
            <LoggedContext.Consumer>
                {logged=>{
                    if(logged.logged===false){
                        props.history.push("/sign/in");
                        return <Sign/>
                    }
                    else return <WrappedComponent/>
                }}
            </LoggedContext.Consumer>
        );
    }
}

export default withLogin;