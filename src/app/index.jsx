import React from 'react';

import GoogleMap from '../google-map'
import RouteEditor from '../route-editor'
import './index.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <GoogleMap />
        <RouteEditor />
      </div>
    );
  }
}