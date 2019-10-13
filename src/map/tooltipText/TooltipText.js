import React from 'react';
import PropTypes from 'prop-types';

import * as C from './constants';
import * as S from './styled';

const TooltipText = ({ status, speed, timestamp }) => (
    <S.Container>
        <S.Date>{new Date(timestamp).toUTCString()}</S.Date>
        <S.Info>STATUS: {C.STATUS[status]}</S.Info>
        <S.Info>SPEED: {speed}</S.Info>
    </S.Container>
);

TooltipText.propTypes = {
    status: PropTypes.string.isRequired,
    speed: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
}

export default TooltipText;
