import React, { Component } from 'react';

export default class RouteEditor extends Component {
  state = {
    inputValue: ""
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

  render() {
    const markers = !this.props.markers ? [] : this.props.markers.map((marker) => {
      return (
        <li key={marker.id}>
          {marker.name}
          <button
            onClick={() => {this.props.deleteMarkerCallback(marker.id)}}>X</button>
        </li>
      )
    })

    return(
      <div>
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
}