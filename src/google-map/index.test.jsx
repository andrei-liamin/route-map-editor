import React from 'react';
import { shallow, mount } from 'enzyme';
import { GoogleMap } from "../google-map";

describe("GoogleMap component", () => {
  it("renders Map with initial props", () => {
    // arrange

    // action
    const wrapper = shallow(<GoogleMap />);
    const instance = wrapper.instance();

    // assert
    expect(
      wrapper.find({
        initialCenter: instance.state.initialCenter,
        zoom: instance.state.zoom
      })).toHaveLength(1);
  });

  it("contains all Markers", () => {
    // arrange
    const markers = [
      {id: 1, name: "first", position: {lat: 7, lng: 8}},
      { id: 2, name: "second", position: {lat: 8, lng: 9}}
    ];

    // action
    const wrapper = mount(<GoogleMap markers={markers}/>);

    // assert
    markers.forEach((marker) => {
      expect(wrapper.find({
        name: marker.name,
        position: marker.position
      })).toHaveLength(1);
    })
  });

  it("draws a Polyline based on markers", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    let polylineCoords = [];
    markers.forEach((marker) => {
      polylineCoords.push(marker.position);
    });

    // action
    const wrapper = mount(<GoogleMap markers={markers} />);

    // assert
    expect(wrapper.find({
      path: polylineCoords
    })).toHaveLength(1);
  });
})