import React from 'react';

import GoogleMap from '../google-map'
import RouteEditor from '../route-editor'
import './index.css';

export default class App extends React.Component {
  state = {
    markers: []
  }

  addNewMarker = (name) => {
    const newMarkers = this.state.markers.slice();
    const id = this.state.markers.length + 1;
    const marker = {
      id: id,
      name: name
    }
    newMarkers.push(marker);

    this.setState({
      markers: newMarkers
    })
  }

  render() {
    return (
      <div className="app-container">
        <GoogleMap markers={this.state.markers}/>
        <RouteEditor
          markers={this.state.markers}
          addNewMarkerCallback={this.addNewMarker} />
      </div>
    );
  }
}