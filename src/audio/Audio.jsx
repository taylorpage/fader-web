import React, { Component } from 'react';
import Compressor from '../compressor/Compressor';

class Audio extends Component {
  constructor() {
    super();
    this.playing = false;
    this.state = {
      played: false,
      context: null
    };
    this.src = 'https://s3-us-west-1.amazonaws.com/orbitr-video/nebula_demo_loop.mp3';
  }

  componentDidMount() {
    this.setupAudioContext();
  }

  setupAudioContext() {
    this.window = window;
    this.context = new (
      this.window.AudioContext ||
      this.window.webkitAudioContext
    )();
    return this.window.fetch( this.src )
      .then( res => res.arrayBuffer() )
      .then( buffer => this.context.decodeAudioData( buffer ) )
      .then( buffer => this.buffer = buffer )
      .then( () => {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect( this.context.destination );
        this.setAudioContextToState();
      });
  }

  setAudioContextToState() {
    this.setState({
      context: this.context,
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
        {
          this.state.context && (
            <Compressor
              source={ this.source }
              context={ this.state.context }
            ></Compressor>
          )
        }
      </div>
    );
  }

}

export default Audio;
