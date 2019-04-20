const ratios = {
  ranges: {
    threshold: [ -100, 0 ],
    knee: [ 0, 40 ],
    ratio: [ 1, 20 ],
    reduction: [ -20, 0 ],
    attack: [ 0, 1 ],
    release: [ 0, 1 ],
  },
  calculateRatio( range, rate ) {
    const r = this.ranges[ range ];
    const min = r[ 0 ];
    const max = r[ 1 ];
    return (( max - min ) * ( rate * .01 )) + min;
  }
};

export default ratios;