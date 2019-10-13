import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    margin: 5px;
    border:none;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #000;
    background-color: ${props => (props.selected ? '#051e6b' :  '#fff')};
    color: ${props => (props.selected ? '#fff' :  '#000')};
    
    :hover {
        cursor: pointer;
        background-color: #051e6b;
        color: #fff;
    }

    :focus {
        outline: none;
    }

    :disabled {
        cursor: default;
        background-color: #cccccc;
        color: #000;
    }

`;

export const Buttons = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const Message = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 1px #000;
`;