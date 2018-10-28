import React, { Component } from 'react';
import './Upload.css';
import { extensionValidator } from '../utils';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      validFile: false
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
  }

  render() {
    return (
      <form className="upload" onSubmit={ this.upload }>
        <input type="file" ref={ el => this.input = el } />
        <button type="submit">Upload</button>
        <audio id="audio" ref={ el => this.audio = el } controls={ true } />
      </form>
    );
  }
}

export default Upload;