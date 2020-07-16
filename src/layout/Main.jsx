import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';

import Feed from '../pages/Feed'
import Profile from '../pages/Profile';
import Insert from '../pages/Insert';
import Detail from '../pages/Detail';
import MenuBar from '../components/MenuBar';

class Main extends Component {
    render() {
        return (
            <div >
                <section className="main">
                    <Switch>
                    <Route path="/insert" component={Insert}/>
                    <Route path="/board/:boardId" component={Detail}/>
                    <Route path="/:nickname" component={Profile}/>
                    <Route path="/" component={Feed}/>
                    </Switch>
                </section>
                <MenuBar></MenuBar>
            </div>
        );
    }
}

export default Main;