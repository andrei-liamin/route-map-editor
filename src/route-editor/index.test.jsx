import React from 'react';
import { shallow, mount } from 'enzyme';

import RouteEditor from '.';

describe("Route Editor", () => {
  it("renders input", () => {
    // arrange

    // action
    const wrapper = shallow(<RouteEditor />);

    // assert
    expect(wrapper.find("input")).toHaveLength(1);
  })

  it("creates new Marker on enter", () => {
    // arrange
    const mockAddNewMarkerCallback = jest.fn();
    const wrapper = shallow(<RouteEditor addNewMarkerCallback={mockAddNewMarkerCallback} />);
    const wrapperInput = wrapper.find("input");
    const name = "marker 01";
    const eventChange = {
      target: { value: name }
    };
    const eventEnter = {
      key: "Enter"
    };
    wrapperInput.simulate("change", eventChange);

    // action
    wrapperInput.simulate("keydown", eventEnter);

    // assert
    expect(mockAddNewMarkerCallback).toHaveBeenCalledWith(name);
  })

  it("ignores any key down if it's not enter", () => {
    // arrange
    const mockAddNewMarkerCallback = jest.fn();
    const wrapper = shallow(<RouteEditor addNewMarkerCallback={mockAddNewMarkerCallback} />);
    const wrapperInput = wrapper.find("input");
    const event = {
      key: ""
    }

    // action
    wrapperInput.simulate("keydown", event);

    // assert
    expect(mockAddNewMarkerCallback).toHaveBeenCalledTimes(0);
  })

  it("ignores empty input value on enter", () => {
    // arrange
    const mockAddNewMarkerCallback = jest.fn();
    const wrapper = shallow(<RouteEditor addNewMarkerCallback={mockAddNewMarkerCallback} />);
    const wrapperInput = wrapper.find("input");
    const event = {
      key: "Enter",
    }

    // action
    wrapperInput.simulate("keydown", event);

    // assert
    expect(mockAddNewMarkerCallback).toHaveBeenCalledTimes(0);
  })

  it("clears input value on enter", () => {
    // arrange
    const mockAddNewMarkerCallback = jest.fn();
    const wrapper = shallow(<RouteEditor addNewMarkerCallback={mockAddNewMarkerCallback} />);
    const name = "marker 01"
    const eventChange = {
      target: { value: name }
    };
    const eventEnter = {
      key: "Enter"
    };

    // action
    wrapper.find("input").simulate("change", eventChange);
    expect(wrapper.find("input").props().value).not.toEqual("");
    wrapper.find("input").simulate("keydown", eventEnter);

    // assert
    expect(wrapper.find("input").props().value).toEqual("");
  })

  it("renders list of all Markers with delete buttons", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];

    // action
    const wrapper = shallow(<RouteEditor markers={markers} />)

    // assert
    markers.forEach((marker) => {
      expect(wrapper
        .containsMatchingElement(
          <li draggable>{marker.name}<button>X</button></li>
        )
      ).toBe(true);
    })
  })

  it("deletes Marker on nested button click", () => {
    // arrange
    const mockDeleteMarkerCallback = jest.fn();
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];

    const wrapper = shallow(<RouteEditor markers={markers} deleteMarkerCallback={mockDeleteMarkerCallback} />);

    const buttonWrappers = wrapper.find("li > button");

    // action
    buttonWrappers.forEach((button) => {
      button.simulate("click");
    });

    // assert
    expect(mockDeleteMarkerCallback).toHaveBeenCalledTimes(markers.length);
    expect(mockDeleteMarkerCallback.mock.calls).toEqual([[markers[0].id], [markers[1].id]]);
  })

  it("saves a marker to the field on drag start", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const wrapper = shallow(<RouteEditor markers={markers}  />);
    const markerIndexToDrag = 1;
    const liWrapper = wrapper.find("li").at(markerIndexToDrag);
    const instance = wrapper.instance();

    // action
    liWrapper.simulate("DragStart");

    // assert
    expect(instance.draggedMarker)
      .toEqual(markers[markerIndexToDrag]);
  });

  it("sends reordered markers on drag over", () => {
    // arrange
    const mockUpdateMarkersOrderCallback = jest.fn();
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];
    const expectedMarkers = [markers[1], markers[0]];
    const wrapper = shallow(<RouteEditor markers={markers}
      updateMarkersOrderCallback={mockUpdateMarkersOrderCallback} />);
    const markerIndexToDrag = 1;
    const markerIndexToDragOver = 0;
    const draggedLiWrapper = wrapper.find("li").at(markerIndexToDrag);
    const dragOverLiWrapper = wrapper.find("li").at(markerIndexToDragOver);
    draggedLiWrapper.simulate("DragStart");

    // action
    dragOverLiWrapper.simulate("DragOver");

    // assert
    expect(mockUpdateMarkersOrderCallback)
      .toHaveBeenCalledWith(expectedMarkers);
  });
})