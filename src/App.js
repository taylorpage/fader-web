import React, { Component } from 'react';
// import Upload from './upload/Upload';
import Compressor from './compressor/Compressor';
import Audio from './audio/Audio';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Audio></Audio>
        <Compressor></Compressor>
      </div>
    );
  }
}

export default App;
