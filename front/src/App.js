import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import VideoContainer from '../src/components/VideoContainer'
import 'antd/dist/antd.css';


function init() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}



class App extends Component {

  state = {
    data: null
  };

  render() {
    return (
      <Router basename="bv8">
        <Switch>
          <Route path="/video/:videoId" component={VideoContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
