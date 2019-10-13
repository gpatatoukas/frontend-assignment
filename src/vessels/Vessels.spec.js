import React from 'react';
import { shallow } from 'enzyme';

import Vessels from './Vessels';
import * as S from './styled';

describe('<Vessels />', () => {
    const props = { selectionDisabled: false, setPositions: () => {}, setSelectionDisabled: () => {} };

    it("renders", () => {
        shallow(<Vessels {...props} />)
    });

    it('renders correct number of Button components', () => {
        const component = shallow(<Vessels {...props} />);

        expect(component.find(S.Button)).toHaveLength(4);
    });

    it('renders disabled Buttons components when prop selectionDisabled is true', () => {
        const props = {
            ...props,
            selectionDisabled: true
        }
        const component = shallow(<Vessels {...props} />);

        expect(component.find(S.Button).filterWhere(
            item => item.prop('disabled') === true
        )).toHaveLength(4);
    });
});