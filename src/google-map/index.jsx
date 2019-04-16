import React from 'react';

import { Map, Marker, InfoWindow, Polyline, GoogleApiWrapper } from 'google-maps-react';
import './index.css';

export class GoogleMap extends React.Component {
  state = {
    activeMarker: null,
    infoWindowVisibility: false,
    selectedMarkerName: ""
  }

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
      const markerId = marker.id;
      return (
        <Marker
          key={marker.id}
          name={marker.name}
          position={marker.position}
          draggable
          onDragend={(mapProps, map) => { 
            this.handleMarkerDragend(mapProps, map, markerId) }}
          onClick={this.handleMarkerClick} />
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
          onClick={this.handleMapClick}
          google={this.props.google}
          initialCenter={this.initialCenter}
          zoom={this.zoom} >
          <Polyline path={polylineCoords} />
          {markers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.infoWindowVisibility} ><h1>{this.state.selectedMarkerName}</h1>
          </InfoWindow>
        </Map>
      </div>
    );
  }

  handleMapClick = (props) => {
    if (this.state.infoWindowVisibility) {
      this.setState({
        activeMarker: null,
        infoWindowVisibility: false,
        selectedMarkerName: ""
      });
    }
  }

  handleMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      infoWindowVisibility: true,
      selectedMarkerName: props.name
    });
  }

  handleMarkerDragend = (mapProps, map, markerId) => {
    this.props.onMarkerUpdateCallback(markerId, map.position);
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