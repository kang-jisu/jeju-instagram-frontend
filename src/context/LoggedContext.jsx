import React from 'react';

const LoggedContext = React.createContext({
    logged:false,
    onLogin: ()=>{},
    onLogout: ()=>{},
});

export default LoggedContext;