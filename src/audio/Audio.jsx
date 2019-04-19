import React, { Component } from 'react';

class Audio extends Component {
  constructor() {
    super();
    this.src = 'https://s3-us-west-1.amazonaws.com/orbitr-video/nebula_demo_loop.mp3';
  }

  componentDidMount() {
    this.window = window;
    this.context = new ( this.window.AudioContext || this.window.webkitAudioContext )();
    this.window.fetch( this.src )
      .then( res => res.arrayBuffer() )
      .then( buffer => this.context.decodeAudioData( buffer ) )
      .then( buffer => this.buffer = buffer );
  }
  play() {
    const source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.connect( this.context.destination );
    source.start();
  }

  render() {
    return(
      <div>
        <button onClick={ this.play.bind( this ) }>play</button>
      </div>
    );
  }

}

export default Audio;
