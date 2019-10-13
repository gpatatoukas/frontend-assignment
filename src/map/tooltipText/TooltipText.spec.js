import React from 'react';
import { shallow } from 'enzyme';

import TooltipText from './TooltipText';

describe('<TooltipText />', () => {
    const props = { status: '', speed: '', timestamp: '' };
    
    it("renders", () => {
        shallow(<TooltipText {...props} />)
    });
});