class WebAudio {
  constructor () {
    this.dataArray = [];
    this.initWebAudio();
    this.createAnalyserNode = this.createAnalyserNode.bind( this );
    this.analyseAudio = this.analyseAudio.bind( this );
  }

  initWebAudio() {
    this.window = window;
    this.WAA = ( this.window.AudioContext || this.window.webkitAudioContext );
    if ( this.WAA ) {
      this.audioContext = new this.WAA();
    }
  }

  createAnalyserNode() {
    this.analyser = this.audioContext.createAnalyser();
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray =  new Uint8Array( this.bufferLength );
    this.analyser.getByteTimeDomainData( this.dataArray );
  }

  analyseAudio() {
    console.log( 'analyze' );
    this.dataArray.forEach( transient => {
      console.log( transient );
    });
  }

}

export default WebAudio;
