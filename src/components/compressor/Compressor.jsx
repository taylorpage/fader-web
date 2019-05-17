import React, { Component } from 'react';
import './Compressor.css';
import Meter from '../meter/Meter';
import ratios from './compression-utils';

// Material UI imports
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/lab/Slider';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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
    this.createTheme();
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

  createTheme () {
    this.setState({
      theme: createMuiTheme({
        typography: {
          useNextVariants: true,
        },
        palette: {
          primary: {
            main: this.props.styles.themePrimary,
          },
          secondary: {
            main: this.props.styles.themeSecondary,
          },
        }
      })
    });
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
      <div>
        {
          this.state.theme &&
          <MuiThemeProvider theme={ this.state.theme }>
            <Grid
              className={ `compressor-container ${ this.props.styles.backgroundClass }` }
              container
            >
              <Grid item sm={ 2 }>
                <Switch
                  className="compressor-switch"
                  color="secondary"
                  checked={ this.props.selected }
                />
              </Grid>
              <Grid item sm={ 4 }>

                {/** Title Row */}
                <Grid container>
                  <Grid className="compressor-title-container" item sm={ 12 }>
                    <h1>{ this.props.title }</h1>
                    <h5>{ this.props.subtitle }</h5>
                  </Grid>
                </Grid>

                {/** Switch and Slider Row */}
                <Grid container>
                  <Grid className="compressor-control" item sm={ 12 }>
                    { this.state.theme && (
                      <Slider
                        className="compressor-slider"
                        value={ this.state.sliderValue }
                        onChange={ this.handleChange.bind( this ) }
                        min={ 0 }
                        max={ 90 }
                      /> )
                    }
                  </Grid>
                </Grid>
              </Grid>

              {/** Meter Row */}
              <Grid item sm={ 6 }>
                <Meter
                  value={ this.state.meterValue }
                  primary={ this.props.styles.meterPrimaryColor }
                  secondary={ this.props.styles.meterSecondaryColor }
                >
                </Meter>
              </Grid>
            </Grid>
          </MuiThemeProvider>
        }
      </div>
    );
  }
};

export default Compressor;
