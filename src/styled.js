import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #051e6b;
        color: #FFF;
    }

    * {
        font-size: 14px;
        font-family: courier; 
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Map = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    width: 100%;
`;
