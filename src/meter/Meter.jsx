import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';

class Meter extends Component {
  render() {
    return (
      <div>
        <Gauge
          value={ this.props.value }
          width={ 400 }
          height={ 320 }
          topLabelStyle={ { display: 'none' } }
          valueLabelStyle={ { display: 'none' } }
          minMaxLabelStyle={ { display: 'none' } }
        />
      </div>
    );
  }
};

export default Meter;
