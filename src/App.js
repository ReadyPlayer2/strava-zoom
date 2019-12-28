import React, { Component } from 'react';
import connect from './icons/btn_connect_strava.png';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            -- strava-zoom --
          </p>
          <button className="Strava-connect"><img src={connect} alt="Connect with Strava" onClick={this.connectWithStrava} /></button>
          <p>
            Powered by Strava.
          </p>
        </header>
      </div>
    )
  }
}

export default App;
