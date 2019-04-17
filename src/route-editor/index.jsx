import React, { Component } from 'react';

import "./index.css";

export default class RouteEditor extends Component {
  state = {
    inputValue: ""
  }
  draggedMarker = null; // value from this.props.markers array

  render() {
    const markers = !this.props.markers ? [] : this.props.markers.map((marker, markerIndex) => {
      return (
        <li 
          draggable
          key={marker.id} 
          onDragStart={() => this.onDragStart(markerIndex) }
          onDragOver={() => this.onDragOver(markerIndex)}>
          <span>{marker.name}</span>
          <button
            onClick={() => {this.props.deleteMarkerCallback(marker.id)}}>X</button>
        </li>
      )
    })

    return(
      <div className="route-editor-container">
        <input
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
          value={this.state.inputValue}
        />
        <ol>
          {markers}
        </ol>
      </div>
    )
  }

  onDragOver(markerIndex) {
    const draggedOverMarker = this.props.markers[markerIndex];
    if (this.draggedMarker === draggedOverMarker) {
      return;
    }
    let markers = this.props.markers.filter(marker => marker !== this.draggedMarker);

    markers.splice(markerIndex, 0, this.draggedMarker);

    this.props.updateMarkersOrderCallback(markers);
  }

  onDragStart(markerIndex) {
    this.draggedMarker = this.props.markers[markerIndex];
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter' && this.state.inputValue !== '') {
      this.props.addNewMarkerCallback(this.state.inputValue);
      this.setState({
        inputValue: ""
      });
    };
  }
}