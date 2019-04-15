import React from 'react';

import GoogleMap from '../google-map'
import RouteEditor from '../route-editor'
import './index.css';

export default class App extends React.Component {
  state = {
    markers: []
  }
  mapCenterPosition = {
    lat: 0,
    lng: 0
  };

  render() {
    return (
      <div className="app-container">
        <GoogleMap
          onNewCenterCallback={this.onNewCenter}
          markers={this.state.markers} />
        <RouteEditor
          markers={this.state.markers}
          addNewMarkerCallback={this.addNewMarker} />
      </div>
    );
  }

  onNewCenter = (newCenterPosition) => {
    this.mapCenterPosition = newCenterPosition;
  }

  addNewMarker = (name) => {
    const newMarkers = this.state.markers.slice();
    const id = this.state.markers.length + 1;
    const marker = {
      id: id,
      name: name,
      position: this.mapCenterPosition
    };
    newMarkers.push(marker);

    this.setState({
      markers: newMarkers
    })
  }
}