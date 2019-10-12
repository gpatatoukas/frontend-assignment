import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import MarkerCounter from './MarkerCounter'
import { findByTestAttr } from '../../test/testUtils'

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(<MarkerCounter {...props}/>)
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-marker-counter')
  expect(component.length).toBe(1);
})