import React, { Component } from 'react';
import Meter from '../meter/Meter';
import ratios from './compression-rations';

class Compressor extends Component {
  constructor() {
    super();
    this.state = {
      meterValue: 100,
      sliderValue: -100
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

  generateMeterReduction ( volumeArr ) {
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

  handleChange( e ) {
    const value = Math.abs( e.target.value );
    this.setState({
      sliderValue: e.target.value
    });
    this.compressor.ratio.setValueAtTime(
      ratios.calculateRatio( 'ratio', value ),
      this.props.context.currentTime
    );
    this.compressor.threshold.setValueAtTime(
      ratios.calculateRatio( 'threshold', value ),
      this.props.context.currentTime
    );
    this.compressor.knee.setValueAtTime(
      ratios.calculateRatio( 'knee', value ),
      this.props.context.currentTime
    );
    this.compressor.attack.setValueAtTime(
      ratios.calculateRatio( 'attack', value ),
      this.props.context.currentTime
    );
    this.compressor.release.setValueAtTime(
      ratios.calculateRatio( 'release', value ),
      this.props.context.currentTime
    );
  }

  render() {
    return (
      <div>
        <input
          type="range"
          onChange={ this.handleChange.bind( this ) }
          min="-100"
          max="-10"
          value={ this.state.sliderValue }
        >
        </input>
        <Meter value={ this.state.meterValue }></Meter>
      </div>
    );
  }
};

export default Compressor;
