import React,{useState, useEffect, useCallback} from 'react';
import jAPI from '../jejuAPIs/JejuAPIs';

const WithRequestGet=(props,WrappedComponent)=>{
    const [data, setData] = useState(null);
    const initialize=useCallback(()=>{
        jAPI.get(props.url)
        .then(res=>{
            console.log(res.data);
            setData(res.data.sort(function(a,b){
                return parseFloat(b.post_id)-parseFloat(a.post_id);
            }));
        })
        .catch(error=>{
            if(error.response!==undefined){
            if(error.response.status===401){
                alert("알수없는 회원정보. 로그아웃시킴");
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("id");
                props.history.push("/sign/in");
            }
            }
            console.log(`${error} with request get ${props.url}`);
        })
    },[props.url,props.history])

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