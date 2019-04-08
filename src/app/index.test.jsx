import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '.';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders the Google Map", () => {
    // arrange
    // action
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const center = instance.state.center;
    const zoom = instance.state.zoom;

    // assert
    expect(wrapper.find({
      defaultCenter: center,
      defaultZoom: zoom
    })).toHaveLength(1);
  });

  it("renders the RouteEditor", ()=>{
    // arrange

    // action
    const wrapper = shallow(<App />);

    // assert
    expect(wrapper.find('RouteEditor')).toHaveLength(1);
  });
})
