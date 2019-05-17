const ratios = {
  ranges: {
    threshold: [ -100, 0 ],
    knee: [ 0, 40 ],
    ratio: [ 1, 20 ],
    reduction: [ -20, 0 ],
    attack: [ 0, 1 ],
    release: [ 0, 1 ],
  },
  calculateRatio ( range, rate ) {
    const r = this.ranges[ range ];
    const min = r[ 0 ];
    const max = r[ 1 ];
    return parseFloat( (( max - min ) * ( rate * .01 )) + min );
  },
  volumeArrayAverage ( arr, scale ) {
    let numbers;
    let sum	= 0;
    let average	= 0;
    if ( arr[ 0 ] instanceof Array ) {
      numbers = arr[ 0 ];
    }
    else if ( typeof arr[ 0 ] == 'number' ) {
      numbers = arr;
    }
    for ( let i = 0; i < numbers.length; i++ ) {
      sum += numbers[ i ];
    }
    average = sum / numbers.length;
    return average / scale;
  }
};

export default ratios;