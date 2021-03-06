import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';

class Meter extends Component {
  render() {
    return (
      <div>
        <Gauge
          value={ this.props.value }
          width={ 180 }
          height={ 100 }
          topLabelStyle={ { display: 'none' } }
          valueLabelStyle={ { display: 'none' } }
          minMaxLabelStyle={ { display: 'none' } }
          color={ this.props.primary }
          backgroundColor={ this.props.secondary }
        />
      </div>
    );
  }
};

export default Meter;
