import React, { Component } from 'react';
import Meter from '../meter/Meter';
import ratios from './compression-rations';

class Compressor extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
  }

  createCompressor() {
    this.compressor = this.props.context.createDynamicsCompressor();
    this.props.source.connect( this.compressor );
    this.compressor.connect( this.props.context.destination );
  }

  handleChange( e ) {
    this.compressor.ratio.setValueAtTime(
      ratios.calculateRatio( 'ratio', e.target.value ),
      this.props.context.currentTime
    );
    this.compressor.threshold.setValueAtTime(
      ratios.calculateRatio( 'threshold', e.target.value ),
      this.props.context.currentTime
    );
    this.compressor.knee.setValueAtTime(
      ratios.calculateRatio( 'knee', e.target.value ),
      this.props.context.currentTime
    );
    this.compressor.attack.setValueAtTime(
      ratios.calculateRatio( 'attack', e.target.value ),
      this.props.context.currentTime
    );
    this.compressor.release.setValueAtTime(
      ratios.calculateRatio( 'release', e.target.value ),
      this.props.context.currentTime
    );
    console.log( this.compressor.reduction );
  }

  render() {
    this.createCompressor();
    return (
      <div>
        <input
          type="range"
          onChange={ this.handleChange.bind( this ) }
          min="0"
          max="100"
        >
        </input>
        <Meter value={ this.state.value }></Meter>
      </div>
    );
  }
};

export default Compressor;
