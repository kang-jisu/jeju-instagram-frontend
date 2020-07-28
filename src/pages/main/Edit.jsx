import React from 'react';
import {Route,Switch,Link,withRouter} from 'react-router-dom';
import {EditInfo} from '../../components/sign';
import withLogin from '../../hoc/withLogin';

function Edit(props) {
    const goBack=()=>{
        props.history.goBack();
    }
    return (
        <>
        <div className="nav-bar header">
            <div className="nav-block">
                <span ><Link to="#" onClick={goBack}>이전</Link></span>
            </div>
            <div className="nav-block">
                <span >정보 수정</span>
            </div>

            <div className="nav-block">
                <span ></span>
            </div>
        </div>
        <div className="container"  >
        <div className="row justify-content-center"> 
            <Switch>
            <Route path="/edit/profile" component={EditInfo}/>
            <Route path="/edit" component={EditInfo}/>
            </Switch>
        </div>
        </div>
        </>
    );
}

export default withLogin(withRouter(Edit));