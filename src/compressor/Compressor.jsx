import React, { Component } from 'react';
import Meter from '../meter/Meter';

class Compressor extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    console.log( this.props.context.destination );
  }

  handleChange( e ) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="range"
          onChange={ this.handleChange.bind( this ) }>
        </input>
        <Meter value={ this.state.value }></Meter>
      </div>
    );
  }
};

export default Compressor;
