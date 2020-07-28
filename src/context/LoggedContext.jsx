import React from 'react';

const LoggedContext = React.createContext({
    logged:false,
    id:null,
    onLogin: ()=>{},
    onLogout: ()=>{},
});

export default LoggedContext;