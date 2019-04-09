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
})