import React,{useState, useEffect, useCallback} from 'react';
import jAPI from '../jejuAPIs/JejuAPIs';

const WithRequestGet=(props,WrappedComponent)=>{
    const [data, setData] = useState(null);

    const initialize=useCallback(()=>{
        jAPI.get(props.url)
        .then(res=>{
            setData(res.data);
        })
        .catch(error=>{
            console.log(`${error} with request get ${props.url}`);
        })
    },[props.url])

    useEffect(()=>{
        initialize();
    },[initialize]);

    return function RequestGetComponent(props){
        if(data===null){
            return (<div>로딩중..</div>);
        }
        return <WrappedComponent {...props} data={data}/>;
    }
}

export default WithRequestGet;