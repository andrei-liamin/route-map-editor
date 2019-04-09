import React from 'react';

import { Map, GoogleApiWrapper } from 'google-maps-react';
import './index.css';

export class GoogleMap extends React.Component {
  state = {
    initialCenter: {
      lat: 55.734319,
      lng: 37.624176
    },
    zoom: 18
  }

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={this.state.initialCenter}
        zoom={this.state.zoom} ></Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCc-EsvzIi-fvx3sZLYUML659aIzodUQhE")
})(GoogleMap);