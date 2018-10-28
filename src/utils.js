export function extensionValidator( fileName ) {
  return !!fileName.match( /\.(?:wav|mp3)$/i )
};
