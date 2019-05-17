import React, { Component } from 'react';
import Compressor from '../compressor/Compressor';
import compressors from '../compressor/data';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

class Audio extends Component {
  constructor() {
    super();
    this.playing = false;
    this.state = {
      played: false,
      context: null
    };
    // this.src = 'https://s3-us-west-1.amazonaws.com/orbitr-video/nebula_demo_loop.mp3';
    this.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3';
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
        <Fab
          color="primary"
          children={
            <Icon>play_arrow</Icon>
          }
          onClick={ () => console.log( 'test' ) }
        />
        {/* <button onClick={ this.prePlay.bind( this ) }>play</button>
        <button onClick={ this.stop.bind( this ) }>pause</button> */}
        {
          this.state.context &&
          compressors.map( ( compressor, i ) => {
            return (
              <Compressor
                key={ `compressor-${i}` }
                source={ this.source }
                context={ this.state.context }
                classes={ { container: 'blue-metal' } }
                selected={ compressor.selected }
                title={ compressor.title }
                styles={ compressor.styles }
              ></Compressor>
            );
          })
        }
      </div>
    );
  }

}

export default Audio;
