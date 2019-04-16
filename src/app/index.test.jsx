import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '.';
import { GoogleMap, Wrapper } from '../google-map';

describe("App", () => {
  it("renders the Google Map", ()=>{
    // arrange

    // action
    const wrapper = shallow(<App />);

    // assert
    // "Wrapper" is the GoogleApiWrapper
    expect(wrapper.find("Wrapper")).toHaveLength(1);
  });

  it("renders the RouteEditor and passes all the props", ()=>{
    // arrange

    // action
    const wrapper = shallow(<App />);

    // assert
    const app = wrapper.instance();
    expect(wrapper.find({
      markers: app.state.markers,
      addNewMarkerCallback: app.addNewMarker
    })).toHaveLength(1);
  });

  it("adds new marker", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const newName = "marker X";
    const id = markers.length + 1;
    const mockMapCenter = {
      lat: 123,
      lng: 321
    }

    const wrapper = mount(<App />);
    const app = wrapper.instance();
    app.onNewCenter(mockMapCenter);
    
    app.setState({
      markers: markers
    });
    const expectedMarkers = markers.slice();
    expectedMarkers.push({
      id: id,
      name: newName,
      position: mockMapCenter
    });

    // action
    app.addNewMarker(newName);

    // assert
    expect(app.state.markers).toEqual(expectedMarkers);
  });

  it("updates dragged marker position", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const id = 2;
    const position = {
      lat: 3,
      lng: 4
    }
    const expectedMarkers = markers.slice();
    expectedMarkers[1].position = position;

    const app = shallow(<App />).instance();
    app.setState({
      markers: markers
    });

    // action
    app.onMarkerUpdate(id, position);

    // assert
    expect(app.state.markers).toEqual(expectedMarkers);
  });

  it("deletes marker", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const id = 2;
    const index = markers.findIndex(marker => marker.id === id);

    const wrapper = mount(<App />);
    const app = wrapper.instance();

    app.setState({
      markers: markers
    });
    const expectedMarkers = markers.slice(0, index);

    // action
    app.deleteMarker(id);

    // assert
    expect(app.state.markers).toEqual(expectedMarkers);
  })
})
