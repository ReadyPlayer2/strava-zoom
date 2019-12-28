import React, { Component } from 'react';
import connect from './icons/btn_connect_strava.png';
import './App.css';

class App extends Component {
  
  connectWithStrava = async () => {
    console.log("Connecting to Strava...");

    // client_id for my Strava application as listed at https://www.strava.com/settings/api when logged in
    window.location.replace('https://www.strava.com/oauth/authorize?client_id=41064&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=activity:read');
  }
  
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
