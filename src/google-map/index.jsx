import React from 'react';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
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
    const markers = !this.props.markers ? [] : this.props.markers.map((marker) => {
      return (
        <Marker
          key={marker.id}
          name={marker.name}
          position={marker.position} /> 
      );
    })

    return (
      <Map
        google={this.props.google}
        initialCenter={this.state.initialCenter}
        zoom={this.state.zoom} >
        {markers}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCc-EsvzIi-fvx3sZLYUML659aIzodUQhE")
})(GoogleMap);