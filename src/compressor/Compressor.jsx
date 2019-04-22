import React, { Component } from 'react';
import './Compressor.css';
import Meter from '../meter/Meter';
import ratios from './compression-rations';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/lab/Slider';

class Compressor extends Component {
  constructor() {
    super();
    this.state = {
      meterValue: 100,
      sliderValue: 90
    };
    this.meterConstants = {
      volumeRange: 110,
      volumeScale: 12,
      reductionScale: 1.5
    };
  }

  componentDidMount() {
    this.createCompressor();
  }

  componentDidUpdate( prevProps ) {
    prevProps.context !== this.props.context &&
    this.createCompressor();
  }

  createCompressor() {
    this.compressor = this.props.context.createDynamicsCompressor();
    this.props.source.connect( this.compressor );
    this.compressor.connect( this.props.context.destination );
    this.createAnalyser();
  }

  createAnalyser() {
    this.analyser = this.props.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 1024;
    this.createScriptProcessor();
    this.props.source.connect( this.analyser );
  }

  createScriptProcessor() {
    this.node = this.props.context.createScriptProcessor( 2048, 1, 1 );
    this.node.onaudioprocess = () => {
      var array = new Uint8Array( this.analyser.frequencyBinCount );
      this.analyser.getByteFrequencyData( array );
      this.setState({
        meterValue: this.generateMeterReduction( array )
      });
    }
    this.node.connect( this.props.context.destination );
  }

  generateMeterReduction( volumeArr ) {
    return (
      this.meterConstants.volumeRange -
      ratios.volumeArrayAverage(
        volumeArr,
        this.meterConstants.volumeScale
      ) +
      (
        this.compressor.reduction /
        this.meterConstants.reductionScale
      )
    );
  }

  handleChange( _, v ) {
    const value = Math.abs( v );
    const scaledValue = Math.abs( v - 100 );
    this.setState({
      sliderValue: +value
    });
    this.compressor.ratio.setValueAtTime(
      ratios.calculateRatio( 'ratio', scaledValue ),
      this.props.context.currentTime
    );
    this.compressor.threshold.setValueAtTime(
      ratios.calculateRatio( 'threshold', scaledValue ),
      this.props.context.currentTime
    );
    this.compressor.knee.setValueAtTime(
      ratios.calculateRatio( 'knee', scaledValue ),
      this.props.context.currentTime
    );
    this.compressor.attack.setValueAtTime(
      ratios.calculateRatio( 'attack', scaledValue ),
      this.props.context.currentTime
    );
    this.compressor.release.setValueAtTime(
      ratios.calculateRatio( 'release', scaledValue ),
      this.props.context.currentTime
    );
  }

  render() {
    return (
      <Grid className={ this.props.classes.container + ' compressor-container' } container>
        <Grid item sm={ 2 }>
          <Switch
          />
        </Grid>
        <Grid className="compressor-control" item sm={ 4 }>
          <Slider
            value={ this.state.sliderValue }
            onChange={ this.handleChange.bind( this ) }
            min={ 0 } // -100
            max={ 90 } // -10
          />
        </Grid>
        <Grid item sm={ 6 }>
          <Meter value={ this.state.meterValue }>
          </Meter>
        </Grid>
      </Grid>
    );
  }
};

export default Compressor;
