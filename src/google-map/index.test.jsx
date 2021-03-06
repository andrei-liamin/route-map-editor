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
        initialCenter: instance.initialCenter,
        zoom: instance.zoom,
        onDragend: instance.handleDragend
      })).toHaveLength(1);
  });

  it("contains all Markers", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];

    // action
    const wrapper = mount(<GoogleMap markers={markers} />);

    // assert
    markers.forEach((marker) => {
      expect(wrapper.find({
        draggable: true,
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

  it("passes center of the map to the App on drag end", () => {
    // arrange
    const mockOnNewCenterCallback = jest.fn();
    const wrapper = shallow(<GoogleMap
      onNewCenterCallback={mockOnNewCenterCallback} />);
    const instance = wrapper.instance();
    const expected = { lat: 1.23, lng: 3.21 };
    const mockMap = {
      getCenter: () => {
        return {
          lat: () => expected.lat,
          lng: () => expected.lng,
        }
      }
    };

    // action
    instance.handleDragend(null, mockMap);

    // assert
    expect(mockOnNewCenterCallback).toHaveBeenCalledWith(expected);
  });

  it("passes center position when map is ready", () => {
    // arrange
    // action
    const mockOnNewCenterCallback = jest.fn();
    const instance = shallow(<GoogleMap
      onNewCenterCallback={mockOnNewCenterCallback} />).instance();
    const expected = instance.initialCenter;

    // assert
    expect(mockOnNewCenterCallback).toHaveBeenCalledWith(expected);
  });

  it("passes new position of dragged marker", () => {
    // arrange
    const mockOnMarkerUpdateCallback = jest.fn();
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const expectedPosition = { lat: 1, lng: 2 };
    const expectedId = 2;
    const wrapper = shallow(<GoogleMap markers={markers} onMarkerUpdateCallback={mockOnMarkerUpdateCallback} />);
    const wrapperMarker = wrapper.find({
      name: markers[1].name
    });

    // action
    wrapperMarker.simulate("Dragend", {}, {position: expectedPosition});

    // assert
    expect(mockOnMarkerUpdateCallback).toHaveBeenCalledWith(expectedId, expectedPosition);
  })

  it("opens InfoWindow on Marker click", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const wrapper = shallow(<GoogleMap markers={markers}/>);
    const markersWrapper = wrapper.find("Marker");
    expect(wrapper.find({
      marker: null,
      visible: false
    })).toHaveLength(1);

    // action
    markersWrapper.forEach((marker, i) => {
      marker.simulate("click", {name: markers[i].name}, marker);
    });

    // assert
    markersWrapper.forEach((marker, i) => {
      expect(wrapper.find({
        marker: marker,
        visible: true
      })).toHaveLength(1);
    });
  })

  it("closes InfoWindow on Map click", () => {
    // arrange
    const wrapper = shallow(<GoogleMap />);
    const mapWrapper = wrapper.find("Map");
    
    const instance = wrapper.instance();
    instance.setState({
      infoWindowVisibility: true,
      selectedMarkerName: "marker X"
    })

    // action
    mapWrapper.simulate("click");

    // assert
    expect(wrapper.find({
      marker: null,
      visible: false
    })).toHaveLength(1);
  })
})