import styled from 'styled-components';

export const Container = styled.div`
    background-color: #fff;
    padding:5px;
    box-shadow: 2px 2px 2px #e3e5eb;
    position: fixed;
    z-index: 999;
    opacity: 0.8;
    padding: 20px 50px;
    top: 200px;
    @media (max-width: 600px) {
        top:300px;
    }
`;

export const Message = styled.div`
    color: #000;
    font-size: 18px;
    font-weight: bold;
`;