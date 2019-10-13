import React, { Fragment, useState } from 'react';
import ReactDOM from "react-dom";

import Map from './map';
import Vessels from './vessels';
import * as S from './styled';

const App = () => {
    const [positions, setPositions] = useState([]);
    const [selectionDisabled, setSelectionDisabled] = useState(false);

    return (
        <Fragment>
            <S.GlobalStyle />
            <S.Content>
                <S.Header>
                    <Vessels setPositions={setPositions} selectionDisabled={selectionDisabled} setSelectionDisabled={setSelectionDisabled} />
                </S.Header>
                <S.Map>
                    <Map positions={positions} setSelectionDisabled={setSelectionDisabled} />
                </S.Map>
            </S.Content>
        </Fragment>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
