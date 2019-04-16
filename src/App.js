import React, { Component } from 'react';
import Upload from './upload/Upload';
import Compressor from './compressor/Compressor';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      webAudio: null
    }
  }

  setWebAudioAPI( webAudio ) {
    this.setState({
      webAudio: webAudio,
    }, () => {
      // this.state.webAudio && this.state.webAudio.play();
    });
  }
  render() {
    return (
      <div className="App">
        <Upload setWebAudioAPI={ this.setWebAudioAPI.bind( this ) } ></Upload>
        <Compressor></Compressor>
      </div>
    );
  }
}

export default App;
