import React, { Component } from 'react';
import './Upload.css';
import { extensionValidator } from '../utils';
import WebAudio from '../WebAudio';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      validFile: false,
      webAudio: new WebAudio(),
    }
    this.upload = this.upload.bind( this );
    this.setAudio = this.setAudio.bind( this );
  }

  upload( e ) {
    e.preventDefault();
    const valid = extensionValidator( this.input.value );
    valid && this.setAudio();
  }

  setAudio() {
    const reader = new FileReader();
    reader.onload = ( e ) => this.audio.src = e.target.result;
    reader.readAsDataURL( this.input.files[ 0 ] );
    this.state.webAudio.createAnalyserNode();
  }

  render() {
    return (
      <div>
        <form className="upload" onSubmit={ this.upload }>
          <input type="file" ref={ el => this.input = el } />
          <button type="submit">Upload</button>
          <audio id="audio" ref={ el => this.audio = el } controls={ true } />
        </form>
        <button onClick={ this.state.webAudio.analyseAudio }>Analyze</button>
      </div>
    );
  }
}

export default Upload;