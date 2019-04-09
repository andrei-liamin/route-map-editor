import React, { Component } from 'react';

export default class RouteEditor extends Component {
  handleChange = (event) => {
    if (event.key === 'Enter') {
      const name = event.target.value;
      this.props.addNewMarkerCallback(name);
    }
  }

  render() {
    const markers = !this.props.markers ? [] : this.props.markers.map((marker) => {
      return (
        <li key={marker.id}>{marker.name}</li>
      )
    })

    return(
      <div>
        <input
          onChange={(event) => this.handleChange(event)}
        />
        <ol>
          {markers}
        </ol>
      </div>
    )
  }
}