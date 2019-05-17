import React, { Component } from 'react';
import Audio from './components/audio/Audio';
import './App.css';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item sm={ 3 }></Grid>
          <Grid item sm={ 6 }>
            <div className="App">
              <Audio></Audio>
            </div>
          </Grid>
          <Grid item sm={ 3 }></Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
