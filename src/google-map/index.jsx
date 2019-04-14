import React from 'react';

import { Map, Marker, Polyline, GoogleApiWrapper } from 'google-maps-react';
import './index.css';

export class GoogleMap extends React.Component {
  state = {
    initialCenter: {
      lat: 55.734319,
      lng: 37.624176
    },
    zoom: 18
  }

  logCenter = () => {
    console.log(this.getCenter());
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
          google={this.props.google}
          initialCenter={this.state.initialCenter}
          zoom={this.state.zoom} >
          <button style={{position: "absolute"}} onClick={() => { 
            console.log(this.props.google.maps.LatLng()) }} >LOG CENTER!</button>
          <Polyline path={polylineCoords} />
          {markers}
        </Map>
      </div>
    );
  }

  getCenter = () => {
    // TODO
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCc-EsvzIi-fvx3sZLYUML659aIzodUQhE")
})(GoogleMap);
