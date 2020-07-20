import React from 'react';
import './App.css';
import {Main} from './container';
import ScrollToTop from './ScrollToTop';

function App() {
  return (

    <ScrollToTop>
    <div className="App">
      <Main />
    </div>
    </ScrollToTop>
  );
}

export default App;
