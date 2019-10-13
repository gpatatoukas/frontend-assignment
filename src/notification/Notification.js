import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import * as S from './styled';

const root = document.getElementById('notification');

const Notification = ({ message }) => {
    return !!message ? ReactDOM.createPortal(
        <S.Container>
            <S.Message>{message}</S.Message>
        </S.Container>
        , root) :
        null
};

Notification.propTypes = {
    message: PropTypes.string
};

Notification.defaultProps = {
    message: ''
};

export default Notification;