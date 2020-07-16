import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import {Feed,Profile,Insert,Detail} from '../pages';
import {MenuBar,InsertMenuBar} from '../components';
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
                <Switch>
                    <Route path="/insert" component={InsertMenuBar}/>
                    <Route component={MenuBar}/>
                </Switch>
            </div>
        );
    }
}

export default Main;