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
})
