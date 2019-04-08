import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import RouteEditor from '../route-editor'
import './index.css';

class App extends Component {
  state = {
    center: {
      lat: 55.7448,
      lng: 37.6277
    },
    zoom: 13
  }

  render() {
    return (
      <div className="app-container">
        <div className="map-container">
          <GoogleMapReact
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
          </GoogleMapReact>
        </div>
        <RouteEditor />
      </div>
    );
  }
}

export default App;
