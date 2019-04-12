import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '.';

describe("App", () => {
  it("renders the Google Map and the RouteEditor", ()=>{
    // arrange

    // action
    const wrapper = shallow(<App />);

    // assert
    // "Wrapper" is the GoogleApiWrapper
    expect(wrapper.find("Wrapper")).toHaveLength(1);
    expect(wrapper.find("RouteEditor")).toHaveLength(1);
  });
})
