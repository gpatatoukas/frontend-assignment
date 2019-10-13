import React from 'react';
import { shallow } from 'enzyme';

import Notification from './Notification';

describe('<Notification />', () => {
    it("renders", () => {
        shallow(<Notification />)
    });
});