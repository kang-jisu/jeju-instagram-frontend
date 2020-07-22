import React from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import {Main,Sign} from './container';
import ScrollToTop from './ScrollToTop';

function App(props) {
  return (
    <ScrollToTop>
    <div className="App">
      <Switch>
        <Route path="/sign" component={Sign}/>
        <Route path="/" component={Main}/>
        {/* render={auth?
                props=>{ return(<Main auth={auth}/>)}
               :props=>{ return(<Sign/>)}}/> */}
      </Switch>
    </div>
    </ScrollToTop>
  );
}

export default App;
