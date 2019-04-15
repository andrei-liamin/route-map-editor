import React from 'react';

import { Map, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';
import './index.css';

export class GoogleMap extends React.Component {
  initialCenter = {
    lat: 55.734319,
    lng: 37.624176
  };
  zoom = 18;


  componentDidMount() {
    if (this.props.onNewCenterCallback) {
      this.props.onNewCenterCallback(this.initialCenter);
    }
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

    let polylineCoords = [];
    if (this.props.markers) {
      this.props.markers.forEach((marker) => {
        polylineCoords.push(marker.position);
      });
    }

    return (
      <div className="map">
        <Map
          onDragend={this.handleDragend}
          google={this.props.google}
          initialCenter={this.initialCenter}
          zoom={this.zoom} >
          <Polyline path={polylineCoords} />
          {markers}
        </Map>
      </div>
    );
  }

  handleDragend = (mapProps, map) => {
    const getCenterValue = map.getCenter();
    const position = {
      lat: getCenterValue.lat(),
      lng: getCenterValue.lng(),
    };
    this.props.onNewCenterCallback(position);
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCc-EsvzIi-fvx3sZLYUML659aIzodUQhE")
})(GoogleMap);