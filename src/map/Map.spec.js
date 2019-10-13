import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Marker, Polyline } from 'react-leaflet';

import Map from './Map';

jest.useFakeTimers();

describe('<Map />', () => {
    const props = {
        positions: [{
            LAT: '0',
            LON: '0',
            SPEED: '',
            TIMESTAMP: '',
            STATUS: ''
        },
        {
            LAT: '10',
            LON: '10',
            SPEED: '',
            TIMESTAMP: '',
            STATUS: ''
        }],
        setSelectionDisabled: () => {}
    };

    it("renders", () => {
        shallow(<Map {...props} />)
    });

    it('renders correct number of Marker components', () => {
        let component;
        act(() => {
            component = mount(<Map {...props} />);
            jest.runAllTimers();
            component.update();
        })

        expect(component.find(Marker)).toHaveLength(2);
    });

    it('renders correct number of Polyline components', () => {
        let component;
        act(() => {
            component = mount(<Map {...props} />);
            jest.runAllTimers();
            component.update();
        })

        expect(component.find(Polyline)).toHaveLength(1);
    });
})