import React, { Component } from 'react';

class Audio extends Component {
  constructor() {
    super();
    this.playing = false;
    this.state = {
      played: false
    };
    this.src = 'https://s3-us-west-1.amazonaws.com/orbitr-video/nebula_demo_loop.mp3';
  }

  componentDidMount() {
    this.setupAudioContext();
  }

  setupAudioContext() {
    this.window = window;
    this.context = new ( this.window.AudioContext || this.window.webkitAudioContext )();
    return this.window.fetch( this.src )
      .then( res => res.arrayBuffer() )
      .then( buffer => this.context.decodeAudioData( buffer ) )
      .then( buffer => this.buffer = buffer )
      .then( () => {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect( this.context.destination );
      });
  }

  play() {
    this.setState({
      played: true
    }, () => this.source.start());
  }

  prePlay() {
    !this.playing && ( this.state.played
      ? this.setupAudioContext().then( () => this.play() )
      : this.play() );
    this.playing = true;
  }

  stop() {
    this.playing = false;
    this.setState({
      playing: false,
    }, () => this.source.stop());
  }

  render() {
    return(
      <div>
        <button onClick={ this.prePlay.bind( this ) }>play</button>
        <button onClick={ this.stop.bind( this ) }>pause</button>
      </div>
    );
  }

}

export default Audio;
