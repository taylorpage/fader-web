import React, { Component } from 'react';
// import Upload from './upload/Upload';
import Compressor from './compressor/Compressor';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Compressor></Compressor>
      </div>
    );
  }
}

export default App;
