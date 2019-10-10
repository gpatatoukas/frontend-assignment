import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Map from './Map'
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import { findByTestAttr } from '../test/testUtils'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {

  const mockStore = configureStore()

  const initialState = {
    loading: false,
    waypointsList: []
  }
  const store = mockStore(initialState)
  return mount(<Provider store={store}><Map /></Provider>)
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-Map')
  expect(component.length).toBe(1);
})