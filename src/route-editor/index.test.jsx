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
    const wrapper = shallow(<RouteEditor addNewMarkerCallback={mockAddNewMarkerCallback}/>);
    const wrapperInput = wrapper.find("input");
    const name = "marker 01"
    const event = {
      key: "Enter",
      target: { value: name }
    }

    // action
    wrapperInput.simulate("change", event);

    // assert
    expect(mockAddNewMarkerCallback).toHaveBeenCalledWith(name);
  })

  it("ignores any input value if it's not enter", () => {
    // arrange
    const mockAddNewMarkerCallback = jest.fn();
    const wrapper = shallow(<RouteEditor addNewMarkerCallback={mockAddNewMarkerCallback} />);
    const wrapperInput = wrapper.find("input");
    const name = "marker 01"
    const event = {
      key: "",
      target: { value: name }
    }

    // action
    wrapperInput.simulate("change", event);

    // assert
    expect(mockAddNewMarkerCallback).toHaveBeenCalledTimes(0);
  })

  it("renders list of all Markers", () => {
    // arrange
    const markers = [
      { id: 1, name: "first", position: { lat: 7, lng: 8 } },
      { id: 2, name: "second", position: { lat: 8, lng: 9 } }
    ];

    // action
    const wrapper = shallow(<RouteEditor markers={markers}/>)

    // assert
    markers.forEach((marker) => {
      expect(wrapper.
        containsMatchingElement(
          <li>{marker.name}</li>
        )
      ).toBe(true);
    })
  })
})