import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Notification from '../notification';
import * as C from './constants';
import * as U from './utils';
import * as S from './styled';

const Vessels = ({ selectionDisabled, setSelectionDisabled, setPositions }) => {
    const [state, setState] = useState({
        selected: '',
        notification: ''
    });

    const handleClick = useCallback(mmis => axios
        .get(U.getURL(mmis))
        .then(response => {
            if (Array.isArray(response.data)) {
                setPositions(response.data);
                setSelectionDisabled(true);
                setState({
                    selected: mmis,
                    notification: ''
                });
            } else {
                if (response.data.errors && response.data.errors[0]) {
                    setState({
                        selected: '',
                        notification: response.data.errors[0].detail
                    });
                }
            }
        })
        .catch(_ => setState({
            selected: '',
            notification: C.ERROR_MESSAGE
        })),
        []);

    return (
        <S.Container>
            <S.Message>
                {C.MESSAGE}
            </S.Message>
            <S.Buttons>
                {
                    U.getVessels().map((vessel, index) => (
                        <S.Button
                            key={index} onClick={handleClick.bind(null, vessel.MMIS)}
                            disabled={selectionDisabled}
                            selected={vessel.MMIS === state.selected}>
                            {vessel.name}
                        </S.Button>
                    ))
                }
            </S.Buttons>
            <Notification message={state.notification} />
        </S.Container>

    )
};

Vessels.propTypes = {
    selectionDisabled: PropTypes.bool.isRequired,
    setSelectionDisabled: PropTypes.func.isRequired,
    setPositions: PropTypes.func.isRequired
}

export default memo(Vessels);