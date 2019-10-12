import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import InfoWindow from './InfoWindow'
import { findByTestAttr } from '../../test/testUtils'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(<InfoWindow {...props}/>)
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-infoWindow')
  expect(component.length).toBe(1);
})